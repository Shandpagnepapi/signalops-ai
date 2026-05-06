import { NextResponse } from "next/server";
import { runLeadAutomation, type LeadAutomationResult } from "@/lib/integrations/notifications";
import { createLead, getLeadById, listLeads } from "@/lib/lead-store";
import type { LeadSubmission, LeadSubmissionDraft } from "@/lib/lead-scoring";
import { enforceRateLimit, parseLimitedJsonBody } from "@/lib/server/request-guards";

type IncomingPayload = Record<string, unknown>;

const VALID_DRIVABLE_VALUES = ["yes", "no", "unsure", ""] as const;
const MAX_LEAD_PAYLOAD_BYTES = 20_000;
const INTERNAL_TOKEN_HEADER = "x-signalops-internal-token";

function isRecord(value: unknown): value is IncomingPayload {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasContent(value: unknown) {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (typeof value === "number") {
    return Number.isFinite(value);
  }

  if (typeof value === "boolean") {
    return true;
  }

  return false;
}

function getString(payload: IncomingPayload, keys: string[]) {
  for (const key of keys) {
    const value = payload[key];

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed) {
        return trimmed;
      }
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return "";
}

function getNumber(payload: IncomingPayload, keys: string[]) {
  for (const key of keys) {
    const value = payload[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return Math.max(0, Math.round(value));
    }

    if (typeof value === "string") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return Math.max(0, Math.round(parsed));
      }
    }
  }

  return 0;
}

function getChoice(payload: IncomingPayload, keys: string[]) {
  const rawValue = getString(payload, keys).toLowerCase();

  if (VALID_DRIVABLE_VALUES.includes(rawValue as (typeof VALID_DRIVABLE_VALUES)[number])) {
    return rawValue as LeadSubmissionDraft["vehicleDrivable"];
  }

  if (rawValue.includes("not") || rawValue.includes("no")) {
    return "no";
  }

  if (rawValue.includes("unsure") || rawValue.includes("maybe") || rawValue.includes("vibration")) {
    return "unsure";
  }

  if (rawValue.includes("yes") || rawValue.includes("mobile preferred")) {
    return "yes";
  }

  const booleanValue = keys.map((key) => payload[key]).find((value) => typeof value === "boolean");
  if (typeof booleanValue === "boolean") {
    return booleanValue ? "yes" : "no";
  }

  return "";
}

function buildMessage(payload: IncomingPayload) {
  const messageParts = [
    getString(payload, ["message", "description", "notes"]),
    getString(payload, ["currentTools"]) ? `Current tools: ${getString(payload, ["currentTools"])}` : "",
    getString(payload, ["biggestProblem", "biggestLeadProblem"]) ? `Biggest problem: ${getString(payload, ["biggestProblem", "biggestLeadProblem"])}` : "",
    getString(payload, ["monthlyLeads", "approxMonthlyLeads"]) ? `Approx monthly leads: ${getString(payload, ["monthlyLeads", "approxMonthlyLeads"])}` : "",
    getString(payload, ["preferredContact", "preferredContactMethod"]) ? `Preferred contact: ${getString(payload, ["preferredContact", "preferredContactMethod"])}` : ""
  ];

  return messageParts.filter(Boolean).join("\n");
}

function normalizePayload(payload: IncomingPayload): LeadSubmissionDraft {
  return {
    source: getString(payload, ["source"]) || "website",
    name: getString(payload, ["name", "fullName", "full_name"]),
    email: getString(payload, ["email"]),
    phone: getString(payload, ["phone", "phoneNumber"]),
    businessName: getString(payload, ["businessName", "company", "business"]),
    website: getString(payload, ["website", "url"]),
    industry: getString(payload, ["industry", "businessType"]),
    message: buildMessage(payload),
    serviceNeeded: getString(payload, ["serviceNeeded", "service", "responseGoal"]),
    urgency: getString(payload, ["urgency"]),
    address: getString(payload, ["address", "serviceAddress"]),
    vehicleYearMakeModel: getString(payload, ["vehicleYearMakeModel", "vehicle", "yearMakeModel"]),
    wheelSize: getString(payload, ["wheelSize"]),
    damageType: getString(payload, ["damageType", "damage"]),
    numberOfWheels: getNumber(payload, ["numberOfWheels", "wheelCount", "numberOfWheelsDamaged"]),
    vehicleDrivable: getChoice(payload, ["vehicleDrivable", "drivable"]),
    needsMobileService: getChoice(payload, ["needsMobileService", "mobileService", "mobile"]),
    photoNotes: getString(payload, ["photoNotes", "photoNote", "photos", "photoDescription"]),
    preferredTime: getString(payload, ["preferredTime", "preferredAppointmentTime", "appointmentTime"])
  };
}

function validateLead(payload: IncomingPayload, lead: LeadSubmissionDraft) {
  const errors: string[] = [];
  const meaningfulValues = Object.entries(payload)
    .filter(([key]) => key !== "source")
    .map(([, value]) => value);

  if (!meaningfulValues.some(hasContent)) {
    errors.push("Submission cannot be empty. Include lead details before submitting.");
  }

  if (!lead.name) {
    errors.push("Name is required.");
  }

  if (!lead.email && !lead.phone) {
    errors.push("Provide at least an email or phone number.");
  }

  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    errors.push("Email must be a valid email address.");
  }

  return errors;
}

function responseForLead(lead: LeadSubmission, automation?: LeadAutomationResult) {
  const aiQualification = lead.aiQualification ?? {
    score: lead.score,
    priority: lead.priority,
    urgency: "unknown",
    summary: lead.aiSummary,
    recommendedAction: lead.recommendedAction,
    customerReply: lead.customerReply,
    internalNote: lead.internalNote,
    tags: lead.tags,
    confidence: 0.5,
    needsHumanReview: lead.priority === "junk"
  };

  return {
    lead,
    leadId: lead.id,
    receivedAt: lead.createdAt,
    automation,
    timeline:
      automation?.timeline ??
      [
        {
          time: "Lead",
          event: "Lead submitted",
          status: "sent"
        },
        {
          time: "AI",
          event: "AI qualified",
          status: "sent"
        }
      ],
    qualification: {
      score: lead.score,
      grade: lead.score >= 85 ? "A" : lead.score >= 70 ? "B" : lead.score >= 55 ? "C" : "D",
      priority: lead.priority,
      urgency: aiQualification.urgency,
      recommendedNextStep: lead.recommendedAction,
      aiSummary: lead.aiSummary,
      summary: aiQualification.summary,
      customerReply: lead.customerReply,
      internalNote: lead.internalNote,
      tags: lead.tags,
      confidence: aiQualification.confidence,
      needsHumanReview: aiQualification.needsHumanReview,
      reasons: lead.tags
    }
  };
}

function validateInternalRequest(request: Request) {
  const configuredToken = process.env.SIGNALOPS_INTERNAL_TOKEN?.trim();
  const providedToken = request.headers.get(INTERNAL_TOKEN_HEADER)?.trim();

  if (!configuredToken) {
    return NextResponse.json(
      {
        error: "Lead reads are disabled until internal API authentication is configured."
      },
      { status: 403 }
    );
  }

  if (!providedToken) {
    return NextResponse.json(
      {
        error: "Internal token is required."
      },
      { status: 401 }
    );
  }

  if (providedToken !== configuredToken) {
    return NextResponse.json(
      {
        error: "Invalid internal token."
      },
      { status: 403 }
    );
  }

  return null;
}

export async function GET(request: Request) {
  const unauthorizedResponse = validateInternalRequest(request);

  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const lead = await getLeadById(id);

    if (!lead) {
      return NextResponse.json({ error: `Lead ${id} was not found.` }, { status: 404 });
    }

    return NextResponse.json(responseForLead(lead));
  }

  const leads = await listLeads();
  return NextResponse.json({
    count: leads.length,
    leads
  });
}

export async function POST(request: Request) {
  const rateLimitResponse = enforceRateLimit(request, "lead-submission", {
    maxRequests: 10,
    windowMs: 60_000
  });

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const body = await parseLimitedJsonBody(request, MAX_LEAD_PAYLOAD_BYTES);

  if (!body.ok) {
    return body.response;
  }

  if (!isRecord(body.payload)) {
    return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const normalizedLead = normalizePayload(body.payload);
  const validationErrors = validateLead(body.payload, normalizedLead);

  if (validationErrors.length > 0) {
    return NextResponse.json(
      {
        error: "Lead submission validation failed.",
        errors: validationErrors
      },
      { status: 400 }
    );
  }

  const lead = await createLead(normalizedLead);
  const automation = await runLeadAutomation(lead);
  return NextResponse.json(responseForLead(lead, automation), { status: 201 });
}
