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
  "Preview Generated",
  "Needs Review",
  "Approved to Send",
  "Sent",
  "Discovery Booked",
  "Project Initiated",
  "Building",
  "Delivered",
  "Won",
  "Lost"
] as const;

export type PreviewIndustry = (typeof previewIndustryOptions)[number];
export type PreviewLeadSource = (typeof previewLeadSourceOptions)[number];
export type PreviewProblem = (typeof previewProblemOptions)[number];
export type PreviewLeadVolume = (typeof previewLeadVolumeOptions)[number];
export type PreviewSubmissionStatus = (typeof previewSubmissionStatuses)[number];
export type PreviewPackageName = "Starter" | "Growth" | "Custom Agent System";

export type PreviewSubmissionInput = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: PreviewIndustry;
  mainLeadSources: PreviewLeadSource[];
  currentProblem: PreviewProblem;
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
  fitScore: number;
  painPoints: string[];
  approvalNote: string;
};

export type PreviewManagerNotes = {
  prospectSummary: string;
  fitScore: number;
  painPointsDetected: string[];
  recommendedPackage: PreviewPackageName;
  draftEmail: {
    subject: string;
    body: string;
    approvalStatus: "Needs owner approval";
  };
  kickoffChecklist: string[];
  buildPlan: {
    phase: string;
    work: string;
  }[];
};

export type PreviewSubmission = PreviewSubmissionInput & {
  id: string;
  createdAt: string;
  previewData: PreviewData;
  managerNotes: PreviewManagerNotes;
  status: PreviewSubmissionStatus;
  ownerApproved: boolean;
};
