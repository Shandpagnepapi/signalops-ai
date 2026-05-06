import "server-only";

import { scoreLead, type LeadSubmissionDraft, type QualifiedLeadResult } from "@/lib/lead-scoring";

export type { QualifiedLeadResult };

type UnknownRecord = Record<string, unknown>;

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4o-mini";

const qualificationSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    score: {
      type: "integer",
      minimum: 0,
      maximum: 100
    },
    priority: {
      type: "string",
      enum: ["hot", "warm", "cold", "junk"]
    },
    urgency: {
      type: "string",
      enum: ["emergency", "soon", "researching", "unknown"]
    },
    summary: {
      type: "string"
    },
    recommendedAction: {
      type: "string"
    },
    customerReply: {
      type: "string"
    },
    internalNote: {
      type: "string"
    },
    tags: {
      type: "array",
      items: {
        type: "string"
      }
    },
    confidence: {
      type: "number",
      minimum: 0,
      maximum: 1
    },
    needsHumanReview: {
      type: "boolean"
    }
  },
  required: [
    "score",
    "priority",
    "urgency",
    "summary",
    "recommendedAction",
    "customerReply",
    "internalNote",
    "tags",
    "confidence",
    "needsHumanReview"
  ]
} as const;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getOpenAIKey() {
  return process.env.OPENAI_API_KEY?.trim() ?? "";
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

function priorityIsValid(value: unknown): value is QualifiedLeadResult["priority"] {
  return value === "hot" || value === "warm" || value === "cold" || value === "junk";
}

function urgencyIsValid(value: unknown): value is QualifiedLeadResult["urgency"] {
  return value === "emergency" || value === "soon" || value === "researching" || value === "unknown";
}

function extractResponseText(payload: unknown) {
  if (!isRecord(payload)) {
    return "";
  }

  if (typeof payload.output_text === "string") {
    return payload.output_text;
  }

  if (!Array.isArray(payload.output)) {
    return "";
  }

  for (const outputItem of payload.output) {
    if (!isRecord(outputItem) || !Array.isArray(outputItem.content)) {
      continue;
    }

    for (const contentItem of outputItem.content) {
      if (isRecord(contentItem) && contentItem.type === "output_text" && typeof contentItem.text === "string") {
        return contentItem.text;
      }
    }
  }

  return "";
}

function toString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function toTags(value: unknown, fallbackTags: string[]) {
  if (!Array.isArray(value)) {
    return fallbackTags;
  }

  const tags = value
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) =>
      tag
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    )
    .filter(Boolean)
    .slice(0, 10);

  return tags.length > 0 ? Array.from(new Set(tags)) : fallbackTags;
}

function normalizeAIResult(value: unknown, fallback: QualifiedLeadResult): QualifiedLeadResult {
  if (!isRecord(value)) {
    return fallback;
  }

  const rawScore = typeof value.score === "number" ? value.score : Number(value.score);
  const rawConfidence = typeof value.confidence === "number" ? value.confidence : Number(value.confidence);

  return {
    score: Number.isFinite(rawScore) ? Math.round(clamp(rawScore, 0, 100)) : fallback.score,
    priority: priorityIsValid(value.priority) ? value.priority : fallback.priority,
    urgency: urgencyIsValid(value.urgency) ? value.urgency : fallback.urgency,
    summary: toString(value.summary, fallback.summary),
    recommendedAction: toString(value.recommendedAction, fallback.recommendedAction),
    customerReply: toString(value.customerReply, fallback.customerReply),
    internalNote: toString(value.internalNote, fallback.internalNote),
    tags: toTags(value.tags, fallback.tags),
    confidence: Number.isFinite(rawConfidence) ? Number(clamp(rawConfidence, 0, 1).toFixed(2)) : fallback.confidence,
    needsHumanReview: typeof value.needsHumanReview === "boolean" ? value.needsHumanReview : fallback.needsHumanReview
  };
}

function buildPrompt(leadInput: LeadSubmissionDraft) {
  return [
    "Qualify this inbound lead for SignalOps.",
    "Use the supplied JSON data only. Return conservative, practical sales-operations guidance.",
    "Do not make unsupported promises. For wheel repair leads, do not promise repair for bent or cracked wheels before inspection; recommend replacement if structurally unsafe.",
    "For well and water service leads, treat no-water and major pressure issues as urgent, route commercial or industrial requests to an owner, and avoid diagnosing equipment without human review.",
    "Flag missing contact details, emergency language, structural/safety risk, and high buying intent.",
    JSON.stringify(
      {
        leadInput
      },
      null,
      2
    )
  ].join("\n\n");
}

export async function qualifyLeadWithAI(leadInput: LeadSubmissionDraft): Promise<QualifiedLeadResult> {
  const fallback = scoreLead(leadInput);
  const apiKey = getOpenAIKey();

  if (!apiKey) {
    return fallback;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL,
        instructions:
          "You are an expert sales operations assistant for local service businesses. Be conservative, practical, and revenue-aware. Produce valid JSON that matches the schema.",
        input: buildPrompt(leadInput),
        store: false,
        temperature: 0.2,
        max_output_tokens: 900,
        text: {
          format: {
            type: "json_schema",
            name: "lead_qualification",
            strict: true,
            schema: qualificationSchema
          }
        }
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      return fallback;
    }

    const payload = (await response.json()) as unknown;
    const outputText = extractResponseText(payload);

    if (!outputText) {
      return fallback;
    }

    return normalizeAIResult(JSON.parse(outputText), fallback);
  } catch {
    return fallback;
  } finally {
    clearTimeout(timeout);
  }
}
