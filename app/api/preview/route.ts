import { NextResponse } from "next/server";
import { createPreviewSubmission, getPreviewSubmissionById } from "@/lib/preview-store";
import { toPublicPreviewSubmission } from "@/lib/public-preview";
import {
  previewIndustryOptions,
  previewLeadSourceOptions,
  previewLeadVolumeOptions,
  previewProblemOptions,
  type PreviewSubmissionInput
} from "@/lib/preview-types";
import { enforceRateLimit, parseLimitedJsonBody } from "@/lib/server/request-guards";

type IncomingPayload = Record<string, unknown>;

const MAX_PREVIEW_PAYLOAD_BYTES = 18_000;
const maxFieldLengths = {
  businessName: 120,
  contactName: 100,
  email: 180,
  phone: 40,
  website: 240,
  otherIndustry: 120,
  otherLeadSource: 240,
  mainServices: 500,
  currentTools: 500,
  leadProcess: 1400,
  notes: 1400
} as const;

export const maxDuration = 60;

function isRecord(value: unknown): value is IncomingPayload {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(payload: IncomingPayload, key: string) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function getNumber(payload: IncomingPayload, key: string) {
  const value = payload[key];

  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, value);
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
  }

  return 0;
}

function getStringArray(payload: IncomingPayload, key: string) {
  const value = payload[key];

  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
}

function isHoneypotFilled(payload: IncomingPayload) {
  return typeof payload.companyWebsite === "string" && payload.companyWebsite.trim().length > 0;
}

function normalizeInput(payload: IncomingPayload): PreviewSubmissionInput {
  const industry = getString(payload, "industry");
  const currentProblem = getString(payload, "currentProblem");
  const monthlyLeadVolume = getString(payload, "monthlyLeadVolume");
  const mainLeadSources = getStringArray(payload, "mainLeadSources");

  return {
    businessName: getString(payload, "businessName"),
    contactName: getString(payload, "contactName"),
    email: getString(payload, "email"),
    phone: getString(payload, "phone"),
    website: getString(payload, "website"),
    industry: (previewIndustryOptions as readonly string[]).includes(industry)
      ? (industry as PreviewSubmissionInput["industry"])
      : "Other local service",
    otherIndustry: getString(payload, "otherIndustry"),
    mainServices: getString(payload, "mainServices"),
    mainLeadSources: mainLeadSources.filter((source) =>
      (previewLeadSourceOptions as readonly string[]).includes(source)
    ) as PreviewSubmissionInput["mainLeadSources"],
    otherLeadSource: getString(payload, "otherLeadSource"),
    currentProblem: (previewProblemOptions as readonly string[]).includes(currentProblem)
      ? (currentProblem as PreviewSubmissionInput["currentProblem"])
      : "Not sure",
    averageJobValue: getNumber(payload, "averageJobValue"),
    monthlyLeadVolume: (previewLeadVolumeOptions as readonly string[]).includes(monthlyLeadVolume)
      ? (monthlyLeadVolume as PreviewSubmissionInput["monthlyLeadVolume"])
      : "Not sure",
    currentTools: getString(payload, "currentTools"),
    leadProcess: getString(payload, "leadProcess"),
    notes: getString(payload, "notes")
  };
}

function validateFieldLength(input: PreviewSubmissionInput, key: keyof typeof maxFieldLengths, label: string, errors: string[]) {
  const value = input[key];

  if (typeof value === "string" && value.length > maxFieldLengths[key]) {
    errors.push(`${label} must be ${maxFieldLengths[key]} characters or fewer.`);
  }
}

function validateInput(input: PreviewSubmissionInput) {
  const errors: string[] = [];

  if (!input.businessName) {
    errors.push("Business name is required.");
  }

  if (!input.contactName) {
    errors.push("Contact name is required.");
  }

  if (!input.email) {
    errors.push("Email is required.");
  }

  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push("Email must be a valid email address.");
  }

  if (input.mainLeadSources.length === 0) {
    errors.push("Choose at least one lead source.");
  }

  if (!input.mainServices) {
    errors.push("Main services are required.");
  }

  if (!input.leadProcess) {
    errors.push("Tell us what happens after a lead comes in.");
  }

  validateFieldLength(input, "businessName", "Business name", errors);
  validateFieldLength(input, "contactName", "Contact name", errors);
  validateFieldLength(input, "email", "Email", errors);
  validateFieldLength(input, "phone", "Phone", errors);
  validateFieldLength(input, "website", "Website", errors);
  validateFieldLength(input, "otherIndustry", "Other industry", errors);
  validateFieldLength(input, "otherLeadSource", "Other lead source", errors);
  validateFieldLength(input, "mainServices", "Main services", errors);
  validateFieldLength(input, "currentTools", "Current tools/CRM", errors);
  validateFieldLength(input, "leadProcess", "Lead process", errors);
  validateFieldLength(input, "notes", "Anything else", errors);

  if (input.mainLeadSources.length > 8) {
    errors.push("Choose no more than 8 lead sources.");
  }

  if (input.mainLeadSources.includes("Other") && !input.otherLeadSource) {
    errors.push("Other lead source is required when Other is selected.");
  }

  return errors;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")?.trim();

  if (!id) {
    return NextResponse.json({ error: "Preview id is required." }, { status: 400 });
  }

  const submission = await getPreviewSubmissionById(id);

  if (!submission) {
    return NextResponse.json({ error: "Preview not found." }, { status: 404 });
  }

  return NextResponse.json({ submission: toPublicPreviewSubmission(submission) });
}

export async function POST(request: Request) {
  const rateLimitResponse = enforceRateLimit(request, "preview-submission", {
    maxRequests: 8,
    windowMs: 60_000
  });

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const body = await parseLimitedJsonBody(request, MAX_PREVIEW_PAYLOAD_BYTES);

  if (!body.ok) {
    return body.response;
  }

  if (!isRecord(body.payload)) {
    return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  if (isHoneypotFilled(body.payload)) {
    return NextResponse.json({ error: "Preview request rejected." }, { status: 400 });
  }

  const input = normalizeInput(body.payload);
  const errors = validateInput(input);

  if (errors.length > 0) {
    return NextResponse.json(
      {
        error: "Preview request validation failed.",
        errors
      },
      { status: 400 }
    );
  }

  const submission = await createPreviewSubmission(input);
  const receipt = {
    id: submission.id,
    businessName: submission.businessName,
    industry: submission.industry,
    status: submission.status,
    recommendedPackage: submission.previewData.recommendedPackage.name
  };

  return NextResponse.json(
    {
      submission: receipt,
      previewUrl: `/preview/${submission.id}`,
      status: submission.status,
      message: "Your request was received. SignalOps will prepare your system map and next steps."
    },
    { status: 201 }
  );
}
