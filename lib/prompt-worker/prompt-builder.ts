import type { PreviewSubmission, PreviewSubmissionInput } from "@/lib/preview-types";
import { classifyPreviewIntake } from "@/lib/prompt-worker/intake-classifier";
import { packageBaselines, packageDecisionRules } from "@/lib/prompt-worker/package-baselines";
import type { ClientBuildPromptResult, PromptWorkerResult } from "@/lib/prompt-worker/prompt-types";
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

function requestedOutputsText() {
  return [
    "Create these outputs in this exact order:",
    "1. Customer-facing Preview Report",
    "2. Proposal Draft",
    "3. Email Draft",
    "4. Recommended Package",
    "5. Missing Info",
    "6. Next Steps",
    "7. Internal Notes for Dillon",
    "8. Implementation Build Outline if the customer pays",
    "",
    "Formatting requirements:",
    "- Use clear headings.",
    "- Keep customer-facing language concise and practical.",
    "- Keep internal notes separate from customer-facing sections.",
    "- Include assumptions only when labeled as assumptions.",
    "- Do not include fake testimonials, fake results, fake logos, or unsupported claims.",
    "- Do not say the system is already built.",
    "- Include a simple visual description for three preview artifacts Dillon could turn into images or screenshots: AI Receptionist Interface, Lead Command Center, Booking Handoff Flow."
  ].join("\n");
}

export function buildSignalOpsChatPrompt(submission: PreviewSubmission | PreviewSubmissionInput): PromptWorkerResult {
  const input = asSubmissionInput(submission);
  const classification = classifyPreviewIntake(input);
  const template = systemTemplates[classification.recommendedSystemTemplate];
  const title = `${input.businessName} ChatGPT Free Preview Prompt`;
  const summary =
    `${input.businessName} is classified as ${classification.businessType} using ${classification.recommendedSystemTemplate}. Recommended package: ${classification.recommendedPackage}.`;
  const nextAction =
    classification.missingInfo.length > 0
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
    requestedOutputsText()
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
      "11. Risks / missing info for Dillon"
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
