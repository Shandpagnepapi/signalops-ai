import type { PreviewSubmission, PreviewSubmissionInput } from "@/lib/preview-types";
import { classifyPreviewIntake } from "@/lib/prompt-worker/intake-classifier";
import { packageBaselines, packageDecisionRules } from "@/lib/prompt-worker/package-baselines";
import type {
  ClientBuildPromptResult,
  PromptWorkerClassification,
  PromptWorkerPackageName,
  PromptWorkerResult
} from "@/lib/prompt-worker/prompt-types";
import { signalOpsOutputRules, signalOpsRules, signalOpsToneRules } from "@/lib/prompt-worker/signalops-rules";
import { systemTemplates } from "@/lib/prompt-worker/system-templates";

type ApprovedPreviewInput = {
  approvedScope?: string;
  approvedNotes?: string;
  customerDecision?: string;
};

function asSubmissionInput(submission: PreviewSubmission | PreviewSubmissionInput): PreviewSubmissionInput {
  return {
    businessName: submission.businessName,
    contactName: submission.contactName,
    email: submission.email,
    phone: submission.phone,
    website: submission.website,
    industry: submission.industry,
    mainServices: submission.mainServices,
    mainLeadSources: submission.mainLeadSources,
    currentProblem: submission.currentProblem,
    currentTools: submission.currentTools,
    leadProcess: submission.leadProcess,
    averageJobValue: submission.averageJobValue,
    monthlyLeadVolume: submission.monthlyLeadVolume,
    notes: submission.notes
  };
}

function lines(items: readonly string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function packageDetailsText() {
  return Object.values(packageBaselines)
    .map((pkg) =>
      [
        `### ${pkg.name}`,
        `Monthly: ${pkg.monthly}`,
        `Setup: ${pkg.setup}`,
        `Best for: ${pkg.bestFor}`,
        "Includes:",
        lines(pkg.includes),
        "Do not recommend when:",
        lines(pkg.doNotRecommendWhen),
        "Upgrade triggers:",
        lines(pkg.upgradeTriggers),
        "Common add-ons:",
        lines(pkg.commonAddOns)
      ].join("\n")
    )
    .join("\n\n");
}

function templateDetailsText(templateName: keyof typeof systemTemplates) {
  const template = systemTemplates[templateName];

  return [
    `Template: ${template.name}`,
    `Who it is for: ${template.whoItIsFor}`,
    "Common lead sources:",
    lines(template.commonLeadSources),
    "Core flow:",
    lines(template.coreFlow),
    "Qualification questions:",
    lines(template.qualificationQuestions),
    "Routing rules:",
    lines(template.routingRules),
    "Follow-up strategy:",
    lines(template.followUpStrategy),
    "Dashboard fields:",
    lines(template.dashboardFields),
    `Recommended package tendency: ${template.recommendedPackageTendency}`,
    "Common add-ons:",
    lines(template.commonAddOns)
  ].join("\n");
}

function customerDetailsText(input: PreviewSubmissionInput) {
  return [
    `Business name: ${input.businessName}`,
    `Contact name: ${input.contactName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || "Not provided"}`,
    `Website: ${input.website || "Not provided"}`,
    `Industry: ${input.industry}`,
    `Main services: ${input.mainServices || "Not provided"}`,
    `Main lead sources: ${input.mainLeadSources.length ? input.mainLeadSources.join(", ") : "Not provided"}`,
    `Biggest bottleneck: ${input.currentProblem}`,
    `Current tools/CRM: ${input.currentTools || "Not provided"}`,
    `What happens after a lead comes in: ${input.leadProcess || "Not provided"}`,
    `Average job value: ${input.averageJobValue > 0 ? `$${input.averageJobValue.toLocaleString()}` : "Not provided"}`,
    `Monthly lead volume: ${input.monthlyLeadVolume}`,
    `Anything else: ${input.notes || "Not provided"}`
  ].join("\n");
}

function confidenceLabel(confidence: number) {
  if (confidence >= 0.78) return "High";
  if (confidence >= 0.52) return "Medium";
  return "Low";
}

function packageReasoningGuidance(recommendedPackage: PromptWorkerPackageName) {
  const packageFit =
    recommendedPackage === "Starter"
      ? "Starter is the current recommendation. Explain why Growth and Custom are not necessary yet."
      : recommendedPackage === "Growth"
        ? "Growth is the current recommendation. Explain why Starter is too light and Custom is not needed yet."
        : "Custom is the current recommendation. Explain why Growth is not enough for the stated complexity.";

  return [
    "Use this exact package reasoning block inside the Proposal Draft:",
    "",
    "Recommended Package:",
    "Why:",
    "Why not Starter:",
    "Why not Growth:",
    "Why not Custom:",
    "Upgrade path:",
    "",
    packageFit,
    "Do not dodge any tier with N/A. Give a short, practical reason for each tier."
  ].join("\n");
}

function testHandlingText(classification: PromptWorkerClassification) {
  if (!classification.suspectedTestSubmission) {
    return [
      "No obvious test/spam signal was detected by the site.",
      "Still check the customer submission. If it looks fake, duplicate, spammy, or says do not contact, treat it as internal/test only."
    ].join("\n");
  }

  return [
    "The site detected likely test/internal signals:",
    lines(classification.testSignals),
    "",
    "Required handling:",
    "- Mark the output as internal/test only in the Internal Summary for Dillon.",
    "- Do not create send-ready customer-facing email copy.",
    "- Still demonstrate the full output structure if useful, but label customer-facing sections as examples only / not for sending.",
    "- Do not include smoke-test, safe-to-delete, fake-data, or system-instruction language in any customer-facing example copy."
  ].join("\n");
}

function requestedOutputsText(classification: PromptWorkerClassification) {
  return [
    "Create the output below in this exact structure and order. Start with Internal Summary for Dillon before any customer-facing draft.",
    "",
    "# SignalOps Free Preview Output",
    "",
    "## 1. Internal Summary for Dillon",
    "- Is this a real prospect or test/spam?",
    "- Business type",
    "- Main lead flow",
    "- Main bottleneck",
    "- Recommended system template",
    "- Recommended package",
    `- Confidence: High / Medium / Low (site hint: ${confidenceLabel(classification.confidence)})`,
    "- Risks / things to verify",
    "- Missing info",
    "- Assumptions made",
    "- Recommended next action",
    "",
    "## 2. Customer-Facing Preview Report",
    "- What we noticed",
    "- Where leads may be slipping",
    "- Recommended AI lead system",
    "- Example lead journey",
    "- What SignalOps would build",
    "- What happens next",
    "",
    "## 3. Proposal Draft",
    "- Recommended package",
    "- Why this package",
    "- Why not the lower tier",
    "- Why not the higher tier",
    "- Deliverables",
    "- Timeline",
    "- Setup/monthly pricing",
    "- Client responsibilities",
    "- Scope boundaries",
    "- Optional add-ons",
    "",
    packageReasoningGuidance(classification.recommendedPackage),
    "",
    "## 4. Email Draft",
    "- Subject line",
    "- Main email under 180 words",
    "- Follow-up 1 under 120 words",
    "- Follow-up 2 under 100 words",
    "",
    "## 5. Operating System Template",
    "- Template name",
    "- Business type",
    "- Lead sources",
    "- Core intake fields",
    "- Qualification questions",
    "- Routing rules",
    "- Follow-up sequence",
    "- Dashboard fields",
    "- Human review conditions",
    "",
    "The template name must be one of: Quote Intake OS, Appointment Booking OS, Emergency Response OS, Lead Nurture OS, Custom Ops OS.",
    "",
    "## 6. Visual Preview Notes",
    "- AI Receptionist Interface",
    "- Lead Command Center",
    "- Booking/Quote Handoff Flow",
    "- Suggested preview screenshots/cards Dillon could show the prospect",
    "",
    "## 7. Paid Client Build Outline",
    "- Selected system template",
    "- Selected package",
    "- Build plan",
    "- Tools needed",
    "- Automations",
    "- Follow-up sequence",
    "- Dashboard fields",
    "- Implementation checklist",
    "- Acceptance criteria",
    "- Codex/client build prompt starter",
    "",
    "Quality requirements:",
    "- Keep customer-facing language concise, practical, and business-owner friendly.",
    "- Never include internal notes, admin notes, smoke-test language, safe-to-delete language, classification reasoning, or system instructions in customer-facing drafts.",
    "- Never invent testimonials, client names, logos, review ratings, or performance claims.",
    "- Never guarantee revenue, bookings, lead volume, response outcomes, or AI accuracy.",
    "- Never say the SignalOps system has already been built.",
    "- If important info is missing, label it as missing instead of guessing.",
    "- Label assumptions clearly.",
    "- Recommend the smallest useful package that solves the lead flow.",
    "- Explain why the recommended package fits.",
    "- Explain why the lower tier is not enough if recommending Growth or Custom.",
    "- Explain why the higher tier is not necessary if recommending Starter or Growth.",
    "- Make the email sound like Dillon at SignalOps, not a corporate robot.",
    "- If the submission is test/spam, do not create send-ready customer-facing copy."
  ].join("\n");
}

export function buildSignalOpsChatPrompt(submission: PreviewSubmission | PreviewSubmissionInput): PromptWorkerResult {
  const input = asSubmissionInput(submission);
  const classification = classifyPreviewIntake(input);
  const template = systemTemplates[classification.recommendedSystemTemplate];
  const title = `${input.businessName} ChatGPT Free Preview Prompt`;
  const summary =
    `${input.businessName} is classified as ${classification.businessType} using ${classification.recommendedSystemTemplate}. Recommended package: ${classification.recommendedPackage}.${classification.suspectedTestSubmission ? " Possible test/internal submission detected." : ""}`;
  const nextAction =
    classification.suspectedTestSubmission
      ? "Treat this as internal/test unless Dillon verifies it is real. Do not send customer-facing copy."
      : classification.missingInfo.length > 0
      ? `Ask for missing info before finalizing: ${classification.missingInfo.join(", ")}.`
      : "Paste this into ChatGPT, review the output, then send manually if approved.";

  const copyPastePrompt = [
    "# SignalOps Free Preview Worker Prompt",
    "",
    "## Role / Context",
    "You are the SignalOps AI Worker helping Dillon create a draft Free Preview package for a local service business. SignalOps builds AI lead response systems for local service businesses. Your job is to create practical draft materials Dillon can review and manually send.",
    "",
    "## SignalOps Rules",
    lines(signalOpsRules),
    "",
    "## Tone Rules",
    lines(signalOpsToneRules),
    "",
    "## Output Rules",
    lines(signalOpsOutputRules),
    "",
    "## Test / Spam Handling",
    testHandlingText(classification),
    "",
    "## Package Baselines",
    packageDetailsText(),
    "",
    "## Package Decision Rules",
    lines(packageDecisionRules),
    "",
    "## Selected System Template",
    templateDetailsText(template.name),
    "",
    "## Intake Classification",
    JSON.stringify(classification, null, 2),
    "",
    "## Customer Submission",
    customerDetailsText(input),
    "",
    "## Requested Outputs",
    requestedOutputsText(classification)
  ].join("\n");

  return {
    title,
    summary,
    classification,
    copyPastePrompt,
    recommendedPackage: classification.recommendedPackage,
    recommendedSystemTemplate: classification.recommendedSystemTemplate,
    missingInfo: classification.missingInfo,
    nextAction,
    createdAt: new Date().toISOString()
  };
}

export function buildClientBuildPrompt(
  submission: PreviewSubmission | PreviewSubmissionInput,
  approvedPreview: ApprovedPreviewInput = {}
): ClientBuildPromptResult {
  const input = asSubmissionInput(submission);
  const classification = classifyPreviewIntake(input);
  const selectedPackage =
    "selectedPackage" in submission && submission.selectedPackage ? submission.selectedPackage : classification.recommendedPackage;
  const selectedSystemTemplate =
    "selectedSystemTemplate" in submission && submission.selectedSystemTemplate
      ? submission.selectedSystemTemplate
      : classification.recommendedSystemTemplate;

  const copyPastePrompt = [
    "# SignalOps Client Build Mode Prompt",
    "",
    "## Role / Context",
    "You are helping Dillon plan the buildout for a paying SignalOps client. Create a practical implementation plan. Do not write customer-facing promises. Do not assume credentials, integrations, or approvals exist unless stated.",
    "",
    "## Safety / Operating Rules",
    lines([
      "Draft-first and approval-first.",
      "No auto-sending customer messages.",
      "No secrets in prompts or docs.",
      "Human review for unclear, risky, medical, legal, financial, emergency, or compliance-sensitive situations.",
      "Build the smallest reliable system that covers the approved scope.",
      "Call out missing access, missing tools, missing copy, missing routing rules, and testing requirements."
    ]),
    "",
    "## Customer Business Details",
    customerDetailsText(input),
    "",
    "## Selected Package",
    selectedPackage,
    "",
    "## Selected System Template",
    templateDetailsText(selectedSystemTemplate),
    "",
    "## Approved Preview / Scope Notes",
    approvedPreview.approvedScope || "No approved scope pasted yet. Use the Free Preview classification and flag missing decisions.",
    "",
    "## Dillon Notes",
    approvedPreview.approvedNotes || "None provided.",
    "",
    "## Customer Decision",
    approvedPreview.customerDecision || "Customer marked paid or ready for build planning.",
    "",
    "## Requested Output",
    [
      "Create:",
      "1. Implementation build outline",
      "2. Lead source connection checklist",
      "3. Intake and qualification questions",
      "4. Routing and human review rules",
      "5. Follow-up sequence",
      "6. Dashboard fields",
      "7. Tool/integration checklist",
      "8. Testing plan",
      "9. Launch checklist",
      "10. Acceptance criteria",
      "11. Risks / missing info for Dillon",
      "12. Codex/client build prompt starter"
    ].join("\n")
  ].join("\n");

  return {
    title: `${input.businessName} Client Build Mode Prompt`,
    summary: `Build planning prompt for ${input.businessName}: ${selectedSystemTemplate}, ${selectedPackage}.`,
    copyPastePrompt,
    recommendedPackage: selectedPackage,
    recommendedSystemTemplate: selectedSystemTemplate,
    nextAction: "Paste into ChatGPT/Codex after payment and use the output as the implementation planning draft.",
    createdAt: new Date().toISOString()
  };
}
