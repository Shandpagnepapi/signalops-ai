import type { PreviewSubmissionInput } from "@/lib/preview-types";
import type {
  PromptWorkerBusinessType,
  PromptWorkerClassification,
  PromptWorkerPackageName,
  PromptWorkerSystemTemplateName
} from "@/lib/prompt-worker/prompt-types";

function textBlob(input: PreviewSubmissionInput) {
  return [
    input.businessName,
    input.contactName,
    input.email,
    input.phone,
    input.website,
    input.industry,
    input.mainServices,
    input.mainLeadSources.join(" "),
    input.currentProblem,
    input.currentTools,
    input.leadProcess,
    input.notes
  ]
    .join(" ")
    .toLowerCase();
}

function hasAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function getTestSignals(input: PreviewSubmissionInput) {
  const text = textBlob(input);
  const signals: string[] = [];

  const phraseSignals = [
    "smoke test",
    "safe to delete",
    "safe-to-delete",
    "do not contact",
    "don't contact",
    "test submission",
    "testing submission",
    "fake submission",
    "spam submission",
    "duplicate submission"
  ];

  phraseSignals.forEach((phrase) => {
    if (text.includes(phrase)) {
      signals.push(`Contains "${phrase}"`);
    }
  });

  if (input.email.toLowerCase().includes("example.com") || input.website.toLowerCase().includes("example.com")) {
    signals.push("Uses example.com contact or website");
  }

  if (/\b555[-\s)]?\d{3,4}\b/.test(input.phone) || input.phone.includes("555-")) {
    signals.push("Uses a likely fake 555 phone number");
  }

  if (input.email.toLowerCase().includes("test@") || input.email.toLowerCase().includes("+test")) {
    signals.push("Uses a test-style email address");
  }

  return Array.from(new Set(signals));
}

function clampConfidence(value: number) {
  return Math.min(Math.max(Number(value.toFixed(2)), 0), 1);
}

function getBusinessType(input: PreviewSubmissionInput): {
  businessType: PromptWorkerBusinessType;
  template: PromptWorkerSystemTemplateName;
  reason: string;
} {
  const text = textBlob(input);
  const industry = input.industry;

  if (
    hasAny(text, ["multi-location", "multiple locations", "franchise", "custom routing", "deep integration", "internal agent", "custom dashboard"]) ||
    input.mainLeadSources.length >= 6
  ) {
    return {
      businessType: "custom_ops",
      template: "Custom Ops OS",
      reason: "The intake suggests custom routing, integrations, dashboards, or multi-source complexity."
    };
  }

  if (
    ["HVAC", "Plumbing", "Roofing", "Well / water service"].includes(industry) ||
    hasAny(text, ["emergency", "urgent", "after hours", "after-hours", "active leak", "no water", "no heat", "no cooling", "storm", "restoration"])
  ) {
    return {
      businessType: "emergency_service",
      template: "Emergency Response OS",
      reason: "The business or language points to urgent service response and hot callback routing."
    };
  }

  if (
    ["Med spa", "Dental office"].includes(industry) ||
    hasAny(text, ["appointment", "book", "booking", "consult", "consultation", "clinic", "treatment", "wellness"])
  ) {
    return {
      businessType: "appointment_based",
      template: "Appointment Booking OS",
      reason: "The intake points to appointment or consultation booking."
    };
  }

  if (
    ["Insurance agency", "Real estate team", "Law firm"].includes(industry) ||
    hasAny(text, ["policy", "coverage", "buyer", "seller", "showing", "renewal", "quote comparison", "case", "matter", "sales cycle", "nurture"])
  ) {
    return {
      businessType: "lead_nurture",
      template: "Lead Nurture OS",
      reason: "The intake points to a longer consideration cycle with lead nurturing and owner follow-up."
    };
  }

  if (
    ["Wheel repair", "Auto repair", "Auto detailing", "Tint / wrap shop"].includes(industry) ||
    hasAny(text, ["quote", "estimate", "photo", "photos", "repair", "detail", "wrap", "tint", "contractor", "service request"])
  ) {
    return {
      businessType: "quote_based",
      template: "Quote Intake OS",
      reason: "The intake points to quote requests, estimates, photos/details, and follow-up."
    };
  }

  return {
    businessType: "unknown",
    template: "Quote Intake OS",
    reason: "The intake is broad, so Quote Intake OS is the safest practical starting template."
  };
}

function getMissingInfo(input: PreviewSubmissionInput) {
  const missing: string[] = [];

  if (!input.website) missing.push("Website URL");
  if (!input.phone) missing.push("Best phone number");
  if (!input.mainServices) missing.push("Main services");
  if (input.mainLeadSources.length === 0) missing.push("Main lead sources");
  if (!input.currentTools) missing.push("Current tools or CRM");
  if (!input.leadProcess) missing.push("What happens after a lead comes in");
  if (input.averageJobValue <= 0) missing.push("Average job value");
  if (input.monthlyLeadVolume === "Not sure") missing.push("Monthly lead volume");

  return missing;
}

function getRecommendedPackage(input: PreviewSubmissionInput, template: PromptWorkerSystemTemplateName): PromptWorkerPackageName {
  const text = textBlob(input);
  const sourceCount = input.mainLeadSources.length;
  const complex =
    template === "Custom Ops OS" ||
    sourceCount >= 6 ||
    hasAny(text, ["multi-location", "multiple locations", "franchise", "custom routing", "deep integration", "custom dashboard", "agent workflow"]);

  if (complex) {
    return "Custom";
  }

  const growth =
    sourceCount >= 3 ||
    input.monthlyLeadVolume === "21-75" ||
    input.monthlyLeadVolume === "76-200" ||
    input.monthlyLeadVolume === "200+" ||
    hasAny(text, ["photo", "photos", "quote", "follow up", "follow-up", "dashboard", "booking", "crm", "spreadsheet", "missed call"]);

  if (growth) {
    return "Growth";
  }

  return "Starter";
}

function getConfidence(
  input: PreviewSubmissionInput,
  missingInfo: string[],
  template: PromptWorkerSystemTemplateName,
  testSignals: string[]
) {
  let confidence = 0.58;

  if (input.industry !== "Other local service") confidence += 0.12;
  if (input.mainServices) confidence += 0.08;
  if (input.mainLeadSources.length > 0) confidence += 0.08;
  if (input.leadProcess) confidence += 0.08;
  if (input.currentTools) confidence += 0.04;
  if (template === "Custom Ops OS") confidence -= 0.04;
  confidence -= Math.min(missingInfo.length * 0.035, 0.18);
  if (testSignals.length > 0) confidence = Math.min(confidence, 0.24);

  return clampConfidence(confidence);
}

export function classifyPreviewIntake(input: PreviewSubmissionInput): PromptWorkerClassification {
  const typed = getBusinessType(input);
  const missingInfo = getMissingInfo(input);
  const testSignals = getTestSignals(input);
  const recommendedPackage = getRecommendedPackage(input, typed.template);
  const confidence = getConfidence(input, missingInfo, typed.template, testSignals);
  const testReason = testSignals.length > 0 ? ` Test/internal signals detected: ${testSignals.join("; ")}.` : "";

  return {
    businessType: typed.businessType,
    recommendedSystemTemplate: typed.template,
    recommendedPackage,
    confidence,
    suspectedTestSubmission: testSignals.length > 0,
    testSignals,
    missingInfo,
    reasoning:
      `${typed.reason} Recommended ${recommendedPackage} because the submission has ${input.mainLeadSources.length} lead source(s), ${input.monthlyLeadVolume.toLowerCase()} monthly lead volume, and the main bottleneck is ${input.currentProblem.toLowerCase()}.${testReason}`
  };
}
