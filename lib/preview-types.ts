import type {
  ClientBuildPromptResult,
  PromptWorkerPackageName,
  PromptWorkerClassification,
  PromptWorkerResult,
  PromptWorkerStatus,
  PromptWorkerSystemTemplateName
} from "@/lib/prompt-worker/prompt-types";

export const previewIndustryOptions = [
  "Wheel repair",
  "Auto repair",
  "Auto detailing",
  "Tint / wrap shop",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Well / water service",
  "Med spa",
  "Dental office",
  "Law firm",
  "Insurance agency",
  "Real estate team",
  "Other local service"
] as const;

export const previewLeadSourceOptions = [
  "Website form",
  "Phone calls",
  "Missed calls",
  "Text messages",
  "Facebook",
  "Instagram",
  "Google Business Profile",
  "Google LSA",
  "Yelp",
  "Angi/Thumbtack",
  "Other"
] as const;

export const previewProblemOptions = [
  "Slow replies",
  "Missed calls",
  "Leads forgotten",
  "No follow-up",
  "Bad lead quality",
  "No visibility into lead status",
  "Too much manual admin",
  "Not sure"
] as const;

export const previewLeadVolumeOptions = [
  "0-20",
  "21-75",
  "76-200",
  "200+",
  "Not sure"
] as const;

export const previewSubmissionStatuses = [
  "New",
  "Draft Generated",
  "Needs Review",
  "Approved",
  "Sent",
] as const;

export type PreviewIndustry = (typeof previewIndustryOptions)[number];
export type PreviewLeadSource = (typeof previewLeadSourceOptions)[number];
export type PreviewProblem = (typeof previewProblemOptions)[number];
export type PreviewLeadVolume = (typeof previewLeadVolumeOptions)[number];
export type PreviewSubmissionStatus = (typeof previewSubmissionStatuses)[number];
export type PreviewPackageName = "Starter" | "Growth" | "Custom";

export type PreviewSubmissionInput = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: PreviewIndustry;
  mainServices: string;
  mainLeadSources: PreviewLeadSource[];
  currentProblem: PreviewProblem;
  currentTools: string;
  leadProcess: string;
  averageJobValue: number;
  monthlyLeadVolume: PreviewLeadVolume;
  notes: string;
};

export type PreviewDashboardLead = {
  name: string;
  source: string;
  urgency: string;
  status: string;
  score: number;
  lastResponseTime: string;
  nextFollowUp: string;
  assignedOwner: string;
};

export type PreviewConversationMessage = {
  speaker: "Customer" | "SignalOps AI Receptionist";
  message: string;
};

export type PreviewVisualDraft = {
  id: "ai-receptionist" | "command-center" | "handoff-flow";
  title: string;
  description: string;
  prompt: string;
  imageUrl?: string;
  storagePath?: string;
  revisedPrompt?: string;
  generatedAt?: string;
  model?: string;
  status: "Pending" | "Generated" | "Failed";
  error?: string;
};

export type PreviewData = {
  headline: string;
  subheadline: string;
  receptionistTitle: string;
  conversation: PreviewConversationMessage[];
  dashboardLeads: PreviewDashboardLead[];
  leadFlow: string[];
  followUpTimeline: {
    time: string;
    action: string;
  }[];
  valueSnapshot: {
    averageJobValue: number;
    monthlyLeadVolume: PreviewLeadVolume;
    text: string;
    disclaimer: string;
  };
  recommendedPackage: {
    name: PreviewPackageName;
    reason: string;
    fit: string;
  };
  visualDrafts?: PreviewVisualDraft[];
  fitScore: number;
  painPoints: string[];
  approvalNote: string;
};

export type PreviewManagerNotes = {
  submissionDetails: {
    mainServices: string;
    currentTools: string;
    leadProcess: string;
    anythingElse: string;
  };
  prospectSummary: string;
  fitScore: number;
  painPointsDetected: string[];
  recommendedPackage: PreviewPackageName;
  previewReport: {
    title: string;
    executiveSummary: string;
    leadFlowFindings: string[];
    responseSystemRecommendation: string;
  };
  proposalDraft: {
    title: string;
    recommendedPackage: PreviewPackageName;
    scope: string[];
    nextSteps: string[];
  };
  emailDraft: {
    subject: string;
    body: string;
    approvalStatus: "Needs Review";
    deliveryStatus: "Draft only - not sent";
  };
  visualDrafts?: PreviewVisualDraft[];
  promptWorkerResult?: PromptWorkerResult;
  promptClassification?: PromptWorkerClassification;
  promptStatus?: PromptWorkerStatus;
  internalNotes?: string;
  selectedPackage?: PromptWorkerPackageName;
  selectedSystemTemplate?: PromptWorkerSystemTemplateName;
  generatedChatGPTPrompt?: string;
  buildPromptResult?: ClientBuildPromptResult;
  promptArchive?: PreviewPromptArchiveItem[];
  customerEmailSentAt?: string;
  markedPaidAt?: string;
  markedLostAt?: string;
  kickoffChecklist: string[];
  buildPlan: {
    phase: string;
    work: string;
  }[];
};

export type PreviewPromptArchiveItem = {
  type: "preview" | "build";
  title: string;
  createdAt: string;
  prompt: string;
};

export type PreviewSubmission = PreviewSubmissionInput & {
  id: string;
  createdAt: string;
  previewData: PreviewData;
  managerNotes: PreviewManagerNotes;
  status: PreviewSubmissionStatus;
  ownerApproved: boolean;
  promptWorkerResult?: PromptWorkerResult;
  promptStatus?: PromptWorkerStatus;
  internalNotes?: string;
  selectedPackage?: PromptWorkerPackageName;
  selectedSystemTemplate?: PromptWorkerSystemTemplateName;
  generatedChatGPTPrompt?: string;
  customerEmailSentAt?: string;
  markedPaidAt?: string;
  markedLostAt?: string;
};

export type PublicPreviewSubmission = Omit<
  PreviewSubmission,
  | "managerNotes"
  | "promptWorkerResult"
  | "promptStatus"
  | "internalNotes"
  | "selectedPackage"
  | "selectedSystemTemplate"
  | "generatedChatGPTPrompt"
  | "customerEmailSentAt"
  | "markedPaidAt"
  | "markedLostAt"
>;
