import "server-only";

import { PACKAGE_NAMES } from "@/lib/constants";
import {
  getDemoTemplate,
  preferredTones,
  type DemoTemplate,
  type IndustryId,
  type PreferredTone,
  type TemplatePackage
} from "@/lib/demo-templates";

type UnknownRecord = Record<string, unknown>;

export type LiveDemoInput = {
  businessName: string;
  industry: IndustryId | string;
  cityState: string;
  servicesOffered: string;
  mainLeadProblem: string;
  currentLeadHandling: string;
  averageCustomerValue: number;
  preferredTone: PreferredTone;
  websiteUrl?: string;
};

export type GeneratedLiveDemo = {
  id: string;
  generatedAt: string;
  generatedBy: "template" | "ai-enhanced";
  templateId: IndustryId;
  industryLabel: string;
  businessName: string;
  cityState: string;
  installTitle: string;
  headline: string;
  subheadline: string;
  strategySummary: string;
  leadIntakeQuestions: string[];
  instantReplyMessage: string;
  internalSalesNote: string;
  leadScoringLogic: {
    label: string;
    rule: string;
    impact: string;
  }[];
  followUpSequence: {
    timing: string;
    message: string;
    goal: string;
  }[];
  dashboardPreviewCards: {
    label: string;
    value: string;
    note: string;
  }[];
  recommendedAutomations: string[];
  beforeAfter: {
    before: string;
    after: string;
  }[];
  suggestedPackage: {
    name: TemplatePackage;
    price: string;
    reason: string;
  };
  copyText: string;
};

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_MODEL = "gpt-4o-mini";

const demoSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    headline: { type: "string" },
    subheadline: { type: "string" },
    strategySummary: { type: "string" },
    leadIntakeQuestions: {
      type: "array",
      minItems: 5,
      maxItems: 8,
      items: { type: "string" }
    },
    instantReplyMessage: { type: "string" },
    internalSalesNote: { type: "string" },
    leadScoringLogic: {
      type: "array",
      minItems: 4,
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          label: { type: "string" },
          rule: { type: "string" },
          impact: { type: "string" }
        },
        required: ["label", "rule", "impact"]
      }
    },
    followUpSequence: {
      type: "array",
      minItems: 4,
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          timing: { type: "string" },
          message: { type: "string" },
          goal: { type: "string" }
        },
        required: ["timing", "message", "goal"]
      }
    },
    dashboardPreviewCards: {
      type: "array",
      minItems: 4,
      maxItems: 6,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          label: { type: "string" },
          value: { type: "string" },
          note: { type: "string" }
        },
        required: ["label", "value", "note"]
      }
    },
    recommendedAutomations: {
      type: "array",
      minItems: 5,
      maxItems: 8,
      items: { type: "string" }
    },
    beforeAfter: {
      type: "array",
      minItems: 2,
      maxItems: 4,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          before: { type: "string" },
          after: { type: "string" }
        },
        required: ["before", "after"]
      }
    },
    suggestedPackage: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
          enum: ["Starter", "Growth", "Custom Agent System"]
        },
        reason: { type: "string" }
      },
      required: ["name", "reason"]
    }
  },
  required: [
    "headline",
    "subheadline",
    "strategySummary",
    "leadIntakeQuestions",
    "instantReplyMessage",
    "internalSalesNote",
    "leadScoringLogic",
    "followUpSequence",
    "dashboardPreviewCards",
    "recommendedAutomations",
    "beforeAfter",
    "suggestedPackage"
  ]
} as const;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getOpenAIKey() {
  if (process.env.LIVE_DEMO_AI_GENERATION !== "enabled") {
    return "";
  }

  return process.env.OPENAI_API_KEY?.trim() ?? "";
}

function createDemoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `demo-${Date.now()}`;
}

function normalizeTone(value: string): PreferredTone {
  return preferredTones.includes(value as PreferredTone) ? (value as PreferredTone) : "professional";
}

function cleanString(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function cleanAverageCustomerValue(value: number) {
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
}

function splitServices(value: string, template: DemoTemplate) {
  const services = value
    .split(/[\n,]/g)
    .map((service) => service.trim())
    .filter(Boolean)
    .slice(0, 8);

  return services.length > 0 ? services : template.defaultServices;
}

function packagePrice(name: TemplatePackage) {
  return PACKAGE_NAMES.find((pkg) => pkg.name === name)?.price ?? "";
}

function includesAny(value: string, terms: string[]) {
  const normalized = value.toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function choosePackage(input: LiveDemoInput, template: DemoTemplate, services: string[]) {
  const combinedText = [
    input.mainLeadProblem,
    input.currentLeadHandling,
    input.servicesOffered,
    input.industry
  ]
    .join(" ")
    .toLowerCase();

  let name: TemplatePackage = template.packageBias;

  if (
    template.packageBias === "Custom Agent System" ||
    input.averageCustomerValue >= 5000 ||
    services.length >= 7 ||
    includesAny(combinedText, ["multi-location", "multiple locations", "compliance", "custom agent", "intake team", "complex"])
  ) {
    name = "Custom Agent System";
  } else if (
    template.packageBias === "Growth" ||
    input.averageCustomerValue >= 750 ||
    includesAny(combinedText, ["ads", "missed calls", "crm", "follow-up", "follow up", "multiple", "after hours", "booking"])
  ) {
    name = "Growth";
  } else {
    name = "Starter";
  }

  const reason =
    name === "Starter"
      ? "Start with one high-friction lead source and prove faster response plus cleaner follow-up."
      : name === "Growth"
        ? "Best fit for multiple lead sources, missed calls, routing, follow-up, and dashboard visibility."
        : "Best fit when intake rules, handoffs, compliance review, or custom workflows need a deeper build.";

  return {
    name,
    price: packagePrice(name),
    reason
  };
}

function tonePrefix(tone: PreferredTone) {
  const prefixes: Record<PreferredTone, string> = {
    professional: "clear, credible, and direct",
    friendly: "warm, helpful, and easy to understand",
    luxury: "polished, high-trust, and premium",
    urgent: "fast, reassuring, and action-oriented",
    local: "neighborly, practical, and locally grounded"
  };

  return prefixes[tone];
}

function buildHeadline(input: LiveDemoInput, template: DemoTemplate) {
  const businessName = cleanString(input.businessName, "Your business");

  if (input.preferredTone === "luxury") {
    return `${businessName} can turn every high-value inquiry into a polished next step.`;
  }

  if (input.preferredTone === "urgent") {
    return `${businessName} can respond faster when ready-to-book leads come in.`;
  }

  return `${businessName} can turn more ${template.serviceNoun}s into booked appointments.`;
}

function buildFallbackDemo(input: LiveDemoInput): GeneratedLiveDemo {
  const template = getDemoTemplate(input.industry);
  const businessName = cleanString(input.businessName, "Your business");
  const cityState = cleanString(input.cityState, "your local market");
  const mainLeadProblem = cleanString(input.mainLeadProblem, template.leadProblemAngle);
  const currentLeadHandling = cleanString(input.currentLeadHandling, "manual calls, form notifications, and inbox follow-up");
  const services = splitServices(input.servicesOffered, template);
  const suggestedPackage = choosePackage(input, template, services);
  const primaryService = services[0] ?? template.serviceNoun;

  const leadIntakeQuestions = Array.from(
    new Set([
      `Which service do you need: ${services.slice(0, 4).join(", ")}?`,
      ...template.intakeQuestions,
      "What is the best phone number or email for a fast response?"
    ])
  ).slice(0, 8);

  const recommendedAutomations = Array.from(
    new Set([
      ...template.recommendedAutomations,
      "Website form qualification",
      "Owner or sales rep alert",
      "No-response follow-up sequence",
      currentLeadHandling.toLowerCase().includes("missed") ? "Missed-call text back" : "Lead source tracking"
    ])
  ).slice(0, 8);

  const leadScoringLogic = [
    ...template.scoringRules,
    {
      label: "Contact completeness",
      rule: "Lead includes name plus phone or email.",
      impact: "+10 confidence"
    },
    {
      label: "Booking intent",
      rule: "Lead asks for availability, quote, callback, or appointment.",
      impact: "+15 intent"
    }
  ].slice(0, 6);

  const dashboardPreviewCards = [
    { label: "New leads", value: "24", note: "Captured across forms, calls, and ads" },
    ...template.dashboardCards,
    { label: "Follow-up due", value: "8", note: "Needs reminder or booking nudge" }
  ].slice(0, 6);

  const instantReplyMessage = `Thanks for reaching out to ${businessName}. We received your request for ${primaryService} in ${cityState}. To route this correctly, please confirm the best contact number, your preferred timing, and any details that would help us quote or schedule the next step.`;

  const internalSalesNote = `${businessName} lead from ${cityState}. Main issue: ${mainLeadProblem}. Current handling appears to rely on ${currentLeadHandling}. Route this as a ${template.label} lead, confirm service fit, and push the prospect toward the next available booking or estimate path.`;

  const strategySummary = `SignalOps would use the ${template.label} template as the base, then customize the intake questions, scoring rules, replies, alerts, and follow-up around ${businessName}'s services and current lead bottleneck. The goal is practical: faster response, cleaner qualification, and more booked next steps.`;

  const generatedAt = new Date().toISOString();
  const demo: GeneratedLiveDemo = {
    id: createDemoId(),
    generatedAt,
    generatedBy: "template",
    templateId: template.id,
    industryLabel: template.label,
    businessName,
    cityState,
    installTitle: `Here's what SignalOps would install for ${businessName}`,
    headline: buildHeadline({ ...input, preferredTone: normalizeTone(input.preferredTone) }, template),
    subheadline: `A ${tonePrefix(input.preferredTone)} lead response system for ${template.label.toLowerCase()} prospects in ${cityState}, built around ${services.slice(0, 3).join(", ")} and the follow-up gaps that cost appointments.`,
    strategySummary,
    leadIntakeQuestions,
    instantReplyMessage,
    internalSalesNote,
    leadScoringLogic,
    followUpSequence: template.followUpSequence,
    dashboardPreviewCards,
    recommendedAutomations,
    beforeAfter: template.beforeAfter,
    suggestedPackage,
    copyText: ""
  };

  return {
    ...demo,
    copyText: buildCopyText(demo)
  };
}

function toStringArray(value: unknown, fallback: string[], maxItems: number) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);

  return items.length > 0 ? items : fallback;
}

function normalizeObjectArray<T extends Record<string, string>>(
  value: unknown,
  fallback: T[],
  keys: (keyof T)[],
  maxItems: number
) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const items = value
    .filter(isRecord)
    .map((item) => {
      return Object.fromEntries(
        keys.map((key) => {
          const rawValue = item[String(key)];
          return [key, typeof rawValue === "string" && rawValue.trim() ? rawValue.trim() : ""];
        })
      ) as T;
    })
    .filter((item) => keys.every((key) => item[key]))
    .slice(0, maxItems);

  return items.length > 0 ? items : fallback;
}

function normalizePackage(value: unknown, fallback: GeneratedLiveDemo["suggestedPackage"]) {
  if (!isRecord(value)) {
    return fallback;
  }

  const rawName = value.name;
  const name: TemplatePackage =
    rawName === "Starter" || rawName === "Growth" || rawName === "Custom Agent System"
      ? rawName
      : fallback.name;

  return {
    name,
    price: packagePrice(name),
    reason:
      typeof value.reason === "string" && value.reason.trim()
        ? value.reason.trim()
        : fallback.reason
  };
}

function normalizeAIResult(value: unknown, fallback: GeneratedLiveDemo): GeneratedLiveDemo {
  if (!isRecord(value)) {
    return fallback;
  }

  const demo: GeneratedLiveDemo = {
    ...fallback,
    generatedBy: "ai-enhanced",
    headline: typeof value.headline === "string" && value.headline.trim() ? value.headline.trim() : fallback.headline,
    subheadline: typeof value.subheadline === "string" && value.subheadline.trim() ? value.subheadline.trim() : fallback.subheadline,
    strategySummary:
      typeof value.strategySummary === "string" && value.strategySummary.trim()
        ? value.strategySummary.trim()
        : fallback.strategySummary,
    leadIntakeQuestions: toStringArray(value.leadIntakeQuestions, fallback.leadIntakeQuestions, 8),
    instantReplyMessage:
      typeof value.instantReplyMessage === "string" && value.instantReplyMessage.trim()
        ? value.instantReplyMessage.trim()
        : fallback.instantReplyMessage,
    internalSalesNote:
      typeof value.internalSalesNote === "string" && value.internalSalesNote.trim()
        ? value.internalSalesNote.trim()
        : fallback.internalSalesNote,
    leadScoringLogic: normalizeObjectArray(
      value.leadScoringLogic,
      fallback.leadScoringLogic,
      ["label", "rule", "impact"],
      6
    ),
    followUpSequence: normalizeObjectArray(
      value.followUpSequence,
      fallback.followUpSequence,
      ["timing", "message", "goal"],
      6
    ),
    dashboardPreviewCards: normalizeObjectArray(
      value.dashboardPreviewCards,
      fallback.dashboardPreviewCards,
      ["label", "value", "note"],
      6
    ),
    recommendedAutomations: toStringArray(value.recommendedAutomations, fallback.recommendedAutomations, 8),
    beforeAfter: normalizeObjectArray(value.beforeAfter, fallback.beforeAfter, ["before", "after"], 4),
    suggestedPackage: normalizePackage(value.suggestedPackage, fallback.suggestedPackage)
  };

  return {
    ...demo,
    copyText: buildCopyText(demo)
  };
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

function buildPrompt(input: LiveDemoInput, template: DemoTemplate, fallback: GeneratedLiveDemo) {
  return [
    "Create a tailored SignalOps live demo preview for a sales conversation.",
    "Use the stored industry template as the base. Do not generate a full website. Do not claim to inspect or scrape the optional website URL.",
    "Keep the output practical for a skeptical business owner: speed-to-lead, qualification, routing, follow-up, booked appointments, and human review when needed.",
    "Avoid hype, robot language, and unsupported revenue guarantees.",
    "Return valid JSON that matches the schema.",
    JSON.stringify(
      {
        userInput: input,
        storedTemplate: template,
        fallbackDraft: fallback
      },
      null,
      2
    )
  ].join("\n\n");
}

async function enhanceWithAI(input: LiveDemoInput, template: DemoTemplate, fallback: GeneratedLiveDemo) {
  const apiKey = getOpenAIKey();

  if (!apiKey) {
    return fallback;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 11000);

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
          "You are a senior sales operations strategist for local service businesses. Produce structured, conservative, business-owner-friendly SignalOps demo content.",
        input: buildPrompt(input, template, fallback),
        store: false,
        temperature: 0.35,
        max_output_tokens: 1400,
        text: {
          format: {
            type: "json_schema",
            name: "signalops_live_demo",
            strict: true,
            schema: demoSchema
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

export function normalizeLiveDemoInput(input: Partial<LiveDemoInput>): LiveDemoInput {
  return {
    businessName: cleanString(input.businessName, ""),
    industry: cleanString(String(input.industry ?? ""), "general-local-service"),
    cityState: cleanString(input.cityState, ""),
    servicesOffered: cleanString(input.servicesOffered, ""),
    mainLeadProblem: cleanString(input.mainLeadProblem, ""),
    currentLeadHandling: cleanString(input.currentLeadHandling, ""),
    averageCustomerValue: cleanAverageCustomerValue(Number(input.averageCustomerValue ?? 0)),
    preferredTone: normalizeTone(String(input.preferredTone ?? "professional")),
    websiteUrl: cleanString(input.websiteUrl, "")
  };
}

export function generateLiveDemoFallback(input: LiveDemoInput): GeneratedLiveDemo {
  return buildFallbackDemo(input);
}

export async function generateLiveDemo(input: LiveDemoInput): Promise<GeneratedLiveDemo> {
  const normalizedInput = normalizeLiveDemoInput(input);
  const template = getDemoTemplate(normalizedInput.industry);
  const fallback = buildFallbackDemo(normalizedInput);

  return enhanceWithAI(normalizedInput, template, fallback);
}

export function buildCopyText(demo: Omit<GeneratedLiveDemo, "copyText">) {
  return [
    demo.installTitle,
    "",
    demo.headline,
    demo.subheadline,
    "",
    "Strategy summary:",
    demo.strategySummary,
    "",
    "Suggested lead intake questions:",
    ...demo.leadIntakeQuestions.map((question) => `- ${question}`),
    "",
    "Instant reply:",
    demo.instantReplyMessage,
    "",
    "Internal sales note:",
    demo.internalSalesNote,
    "",
    "Lead scoring logic:",
    ...demo.leadScoringLogic.map((rule) => `- ${rule.label}: ${rule.rule} (${rule.impact})`),
    "",
    "Follow-up sequence:",
    ...demo.followUpSequence.map((step) => `- ${step.timing}: ${step.message} Goal: ${step.goal}`),
    "",
    "Recommended automations:",
    ...demo.recommendedAutomations.map((automation) => `- ${automation}`),
    "",
    `Suggested package: ${demo.suggestedPackage.name} (${demo.suggestedPackage.price})`,
    demo.suggestedPackage.reason
  ].join("\n");
}
