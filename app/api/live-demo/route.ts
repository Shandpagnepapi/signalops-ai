import { NextResponse } from "next/server";
import { generateLiveDemo, normalizeLiveDemoInput, type LiveDemoInput } from "@/lib/demo-generator";
import { enforceRateLimit, parseLimitedJsonBody } from "@/lib/server/request-guards";

type IncomingPayload = Record<string, unknown>;

const MAX_LIVE_DEMO_PAYLOAD_BYTES = 16_000;

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
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function buildInput(payload: IncomingPayload): LiveDemoInput {
  return normalizeLiveDemoInput({
    businessName: getString(payload, "businessName"),
    industry: getString(payload, "industry"),
    cityState: getString(payload, "cityState"),
    servicesOffered: getString(payload, "servicesOffered"),
    mainLeadProblem: getString(payload, "mainLeadProblem"),
    currentLeadHandling: getString(payload, "currentLeadHandling"),
    averageCustomerValue: getNumber(payload, "averageCustomerValue"),
    preferredTone: getString(payload, "preferredTone") as LiveDemoInput["preferredTone"],
    websiteUrl: getString(payload, "websiteUrl")
  });
}

function validateInput(input: LiveDemoInput) {
  const errors: string[] = [];

  if (!input.businessName) {
    errors.push("Business name is required.");
  }

  if (!input.cityState) {
    errors.push("City/state is required.");
  }

  if (!input.industry) {
    errors.push("Industry is required.");
  }

  if (!input.servicesOffered) {
    errors.push("Add at least one service so the demo can be tailored.");
  }

  if (!input.mainLeadProblem) {
    errors.push("Main lead problem is required.");
  }

  if (!input.currentLeadHandling) {
    errors.push("Current lead handling method is required.");
  }

  if (input.averageCustomerValue < 0) {
    errors.push("Average customer value cannot be negative.");
  }

  return errors;
}

export async function POST(request: Request) {
  const rateLimitResponse = enforceRateLimit(request, "live-demo", {
    maxRequests: 6,
    windowMs: 60_000
  });

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const body = await parseLimitedJsonBody(request, MAX_LIVE_DEMO_PAYLOAD_BYTES);

  if (!body.ok) {
    return body.response;
  }

  if (!isRecord(body.payload)) {
    return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const input = buildInput(body.payload);
  const errors = validateInput(input);

  if (errors.length > 0) {
    return NextResponse.json(
      {
        error: "Live demo request validation failed.",
        errors
      },
      { status: 400 }
    );
  }

  const demo = await generateLiveDemo(input);

  return NextResponse.json({
    demo
  });
}
