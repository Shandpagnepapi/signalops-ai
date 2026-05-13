import type { PreviewSubmission, PreviewSubmissionInput } from "@/lib/preview-types";
import { classifyPreviewIntake } from "@/lib/prompt-worker/intake-classifier";
import { packageBaselines, packageDecisionRules } from "@/lib/prompt-worker/package-baselines";
import type {
  ClientBuildPromptResult,
  PromptWorkerClassification,
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
    otherIndustry: submission.otherIndustry,
    mainServices: submission.mainServices,
    mainLeadSources: submission.mainLeadSources,
    otherLeadSource: submission.otherLeadSource,
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
    "Intake questions:",
    lines(template.intakeQuestions),
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
    `Other industry: ${input.otherIndustry || "Not provided"}`,
    `Main services: ${input.mainServices || "Not provided"}`,
    `Main lead sources: ${input.mainLeadSources.length ? input.mainLeadSources.join(", ") : "Not provided"}`,
    `Other lead source: ${input.otherLeadSource || "Not provided"}`,
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

function safetyGateText(classification: PromptWorkerClassification) {
  return [
    "Before creating any customer-facing draft, check whether the submission appears to be:",
    "- a smoke test",
    "- a test submission",
    "- spam",
    "- fake",
    "- duplicate",
    "- marked safe to delete",
    "- marked do not contact",
    "- using example.com",
    "- using a 555 phone number",
    "",
    "If yes:",
    "- Mark it as internal/test only.",
    "- Set Contact allowed: no.",
    "- Do not create send-ready customer-facing copy.",
    "- You may still show abbreviated example sections for structure, but label them clearly as internal demonstration only.",
    "- Do not create an email Dillon could accidentally send.",
    "",
    `Site classification hint: isTestSubmission=${classification.isTestSubmission}; contactAllowed=${classification.contactAllowed}; testReason=${classification.testReason ?? "none"}.`
  ].join("\n");
}

function requestedOutputsText(classification: PromptWorkerClassification) {
  return [
    "Create these outputs in this exact order:",
    "",
    "# SignalOps Envo Preview Output",
    "",
    "## 1. Internal Summary for Dillon",
    "- Is this a real prospect or test/spam?",
    "- Contact allowed: yes/no",
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
    "- Why not Starter",
    "- Why not Growth",
    "- Why not Custom",
    "- Upgrade path",
    "- Deliverables",
    "- Timeline",
    "- Setup/monthly pricing",
    "- Client responsibilities",
    "- Scope boundaries",
    "- Optional add-ons",
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
    "- Intake questions",
    "- Routing rules",
    "- Follow-up sequence",
    "- Dashboard fields",
    "- Human review conditions",
    "",
    "The template name must be one of: Quote Intake OS, Appointment Booking OS, Emergency Response OS, Lead Nurture OS, Custom Ops OS.",
    "",
    "## 6. Visual Preview Notes",
    "- Envo Lead Manager Interface",
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
    "Formatting requirements:",
    "- Start with Internal Summary for Dillon.",
    "- Keep internal notes separate from customer-facing sections.",
    "- If this is a test/spam/do-not-contact submission, do not create send-ready customer-facing copy.",
    "- Never include admin notes, smoke-test language, safe-to-delete language, do-not-contact notes, classifier reasoning, or system instructions in customer-facing copy.",
    "- Label assumptions clearly.",
    "- Do not invent testimonials, results, logos, reviews, or performance claims.",
    "- Do not say the system is already built.",
    "- Do not guarantee revenue, bookings, response outcomes, or AI accuracy.",
    "- Main email must be under 180 words.",
    "- Follow-up 1 must be under 120 words.",
    "- Follow-up 2 must be under 100 words.",
    "- Email should sound like Dillon at SignalOps, not a corporate robot.",
    "- Include simple visual descriptions for Envo Lead Manager Interface, Lead Command Center, and Booking/Quote Handoff Flow."
  ].join("\n");
}

export function buildSignalOpsChatPrompt(submission: PreviewSubmission | PreviewSubmissionInput): PromptWorkerResult {
  const input = asSubmissionInput(submission);
  const classification = classifyPreviewIntake(input);
  const template = systemTemplates[classification.recommendedSystemTemplate];
  const title = `${input.businessName} ChatGPT Envo Preview Prompt`;
  const summary =
    `${input.businessName} is classified as ${classification.businessType} using ${classification.recommendedSystemTemplate}. Recommended package: ${classification.recommendedPackage}.${classification.isTestSubmission ? " Test/do-not-contact handling required." : ""}`;
  const nextAction =
    !classification.contactAllowed
      ? "Treat this as internal/test unless Dillon verifies it is real. Do not send customer-facing copy."
      : classification.missingInfo.length > 0
      ? `Ask for missing info before finalizing: ${classification.missingInfo.join(", ")}.`
      : "Paste this into ChatGPT, review the output, then send manually if approved.";

  const copyPastePrompt = [
    "# SignalOps Envo Preview Worker Prompt",
    "",
    "## Role / Context",
    "You are the SignalOpsAI Envo Preview worker helping Dillon create a draft Envo Preview package for a local service business. SignalOpsAI trains Envo as an AI Lead Manager for customer calls, texts, forms, DMs, follow-up, and handoffs. Your job is to create practical draft materials Dillon can review and manually send.",
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
    "## Safety Gate",
    safetyGateText(classification),
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
    approvedPreview.approvedScope || "No approved scope pasted yet. Use the Envo Preview classification and flag missing decisions.",
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
      "3. Intake questions",
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
