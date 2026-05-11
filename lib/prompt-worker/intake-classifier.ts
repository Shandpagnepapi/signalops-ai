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
    input.otherIndustry ?? "",
    input.mainServices,
    input.mainLeadSources.join(" "),
    input.otherLeadSource ?? "",
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

function getTestIndicators(input: PreviewSubmissionInput) {
  const text = textBlob(input);
  const indicators: string[] = [];

  const checks: Array<[string, boolean]> = [
    ["smoke-test", text.includes("smoke test")],
    ["test-submission", text.includes("test submission") || text.includes("testing submission")],
    ["safe-to-delete", text.includes("safe to delete") || text.includes("safe-to-delete")],
    ["do-not-contact", text.includes("do not contact") || text.includes("don't contact")],
    ["example.com", text.includes("example.com")],
    ["555 phone", text.includes("555-") || /\b555[-\s)]?\d{3,4}\b/.test(input.phone)],
    ["fake", text.includes("fake")],
    ["dummy", text.includes("dummy")]
  ];

  checks.forEach(([indicator, detected]) => {
    if (detected) indicators.push(indicator);
  });

  return Array.from(new Set(indicators));
}

function getTestReason(indicators: string[]) {
  if (indicators.length === 0) return null;

  const readable = indicators.map((indicator) => (indicator === "555 phone" ? "555 phone" : indicator));
  const last = readable.pop();
  const joined = readable.length ? `${readable.join(", ")}, and ${last}` : last;

  return `Submission includes ${joined} indicator${indicators.length === 1 ? "" : "s"}.`;
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
    ["Mobile fleet wash", "Auto repair", "Auto detailing", "Tint / wrap shop"].includes(industry) ||
    hasAny(text, ["quote", "estimate", "photo", "photos", "fleet", "recurring", "repair", "detail", "wrap", "tint", "contractor", "service request"])
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
  if (input.mainLeadSources.includes("Other") && !input.otherLeadSource) missing.push("Other lead source");
  if (input.industry === "Other local service" && !input.otherIndustry) missing.push("Other industry");
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
  testIndicators: string[]
) {
  let confidence = 0.58;

  if (input.industry !== "Other local service") confidence += 0.12;
  if (input.mainServices) confidence += 0.08;
  if (input.mainLeadSources.length > 0) confidence += 0.08;
  if (input.leadProcess) confidence += 0.08;
  if (input.currentTools) confidence += 0.04;
  if (template === "Custom Ops OS") confidence -= 0.04;
  confidence -= Math.min(missingInfo.length * 0.035, 0.18);
  if (testIndicators.length > 0) confidence = Math.min(confidence, 0.24);

  return clampConfidence(confidence);
}

export function classifyPreviewIntake(input: PreviewSubmissionInput): PromptWorkerClassification {
  const typed = getBusinessType(input);
  const missingInfo = getMissingInfo(input);
  const testIndicators = getTestIndicators(input);
  const isTestSubmission = testIndicators.length > 0;
  const recommendedPackage = getRecommendedPackage(input, typed.template);
  const confidence = getConfidence(input, missingInfo, typed.template, testIndicators);
  const testReason = getTestReason(testIndicators);

  return {
    businessType: typed.businessType,
    recommendedSystemTemplate: typed.template,
    recommendedPackage,
    confidence,
    missingInfo,
    isTestSubmission,
    contactAllowed: !isTestSubmission,
    testReason,
    reasoning:
      `${typed.reason} Recommended ${recommendedPackage} because the submission has ${input.mainLeadSources.length} lead source(s), ${input.monthlyLeadVolume.toLowerCase()} monthly lead volume, and the main bottleneck is ${input.currentProblem.toLowerCase()}.${testReason ? ` ${testReason}` : ""}`
  };
}
