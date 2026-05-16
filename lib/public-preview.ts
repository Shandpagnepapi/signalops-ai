import type { PublicPreviewSubmission, PreviewSubmission } from "@/lib/preview-types";

export function toPublicPreviewSubmission(submission: PreviewSubmission): PublicPreviewSubmission {
  const publicSubmission: Partial<PreviewSubmission> = { ...submission };

  delete publicSubmission.customerEmailSentAt;
  delete publicSubmission.contactAllowed;
  delete publicSubmission.generatedChatGPTPrompt;
  delete publicSubmission.internalNotes;
  delete publicSubmission.isTestSubmission;
  delete publicSubmission.managerNotes;
  delete publicSubmission.markedLostAt;
  delete publicSubmission.markedPaidAt;
  delete publicSubmission.promptStatus;
  delete publicSubmission.promptWorkerResult;
  delete publicSubmission.selectedPackage;
  delete publicSubmission.selectedSystemTemplate;
  delete publicSubmission.testReason;

  return publicSubmission as PublicPreviewSubmission;
}
