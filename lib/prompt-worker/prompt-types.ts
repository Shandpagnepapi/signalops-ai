export type PromptWorkerBusinessType =
  | "quote_based"
  | "appointment_based"
  | "emergency_service"
  | "lead_nurture"
  | "custom_ops"
  | "unknown";

export type PromptWorkerSystemTemplateName =
  | "Quote Intake OS"
  | "Appointment Booking OS"
  | "Emergency Response OS"
  | "Lead Nurture OS"
  | "Custom Ops OS";

export type PromptWorkerPackageName = "Starter" | "Growth" | "Custom";

export type PromptWorkerStatus =
  | "not_generated"
  | "generated"
  | "pasted_to_chatgpt"
  | "preview_drafted"
  | "sent_to_customer"
  | "paid"
  | "lost";

export type PromptWorkerClassification = {
  businessType: PromptWorkerBusinessType;
  recommendedSystemTemplate: PromptWorkerSystemTemplateName;
  recommendedPackage: PromptWorkerPackageName;
  confidence: number;
  suspectedTestSubmission: boolean;
  testSignals: string[];
  missingInfo: string[];
  reasoning: string;
};

export type PromptWorkerResult = {
  title: string;
  summary: string;
  classification: PromptWorkerClassification;
  copyPastePrompt: string;
  recommendedPackage: PromptWorkerPackageName;
  recommendedSystemTemplate: PromptWorkerSystemTemplateName;
  missingInfo: string[];
  nextAction: string;
  createdAt: string;
};

export type ClientBuildPromptResult = {
  title: string;
  summary: string;
  copyPastePrompt: string;
  recommendedPackage: PromptWorkerPackageName;
  recommendedSystemTemplate: PromptWorkerSystemTemplateName;
  nextAction: string;
  createdAt: string;
};
