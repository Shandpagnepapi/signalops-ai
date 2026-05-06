import "server-only";

import type { LeadSubmission } from "@/lib/lead-scoring";
import {
  createIntegrationResult,
  isConfigured,
  type IntegrationResult
} from "@/lib/integrations/common";

function hasResendConfig() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export async function sendEmailCustomerReply(
  lead: LeadSubmission,
  message: string
): Promise<IntegrationResult> {
  if (!lead.email) {
    return createIntegrationResult({
      ok: false,
      action: "customer_reply",
      provider: "email",
      mode: "mock",
      status: "skipped",
      message: "Email customer reply skipped because the lead does not include an email address."
    });
  }

  if (!hasResendConfig()) {
    return createIntegrationResult({
      ok: true,
      action: "customer_reply",
      provider: "resend",
      mode: "mock",
      status: "mocked",
      message: "Mock email customer reply prepared. Configure RESEND_API_KEY for live delivery.",
      metadata: {
        hasEmail: true,
        leadPriority: lead.priority,
        messageLength: message.length
      }
    });
  }

  return createIntegrationResult({
    ok: true,
    action: "customer_reply",
    provider: "resend",
    mode: "configured",
    status: "prepared",
    message: "Resend email customer reply is ready for live implementation. No outbound email was sent.",
    metadata: {
      hasEmail: true,
      leadPriority: lead.priority,
      messageLength: message.length
    }
  });
}

export async function sendEmailOwnerAlert(
  lead: LeadSubmission,
  internalNote: string
): Promise<IntegrationResult> {
  if (!isConfigured(process.env.OWNER_ALERT_EMAIL)) {
    return createIntegrationResult({
      ok: true,
      action: "owner_alert",
      provider: "email",
      mode: "mock",
      status: "mocked",
      message: "Mock owner email alert prepared. Configure OWNER_ALERT_EMAIL and RESEND_API_KEY for live delivery.",
      metadata: {
        leadPriority: lead.priority,
        score: lead.score,
        internalNoteLength: internalNote.length
      }
    });
  }

  if (!hasResendConfig()) {
    return createIntegrationResult({
      ok: true,
      action: "owner_alert",
      provider: "resend",
      mode: "mock",
      status: "mocked",
      message: "Mock owner email alert prepared because RESEND_API_KEY is not configured.",
      metadata: {
        ownerAlertEmailConfigured: true,
        leadPriority: lead.priority,
        score: lead.score,
        internalNoteLength: internalNote.length
      }
    });
  }

  return createIntegrationResult({
    ok: true,
    action: "owner_alert",
    provider: "resend",
    mode: "configured",
    status: "prepared",
    message: "Resend owner alert email is ready for live implementation. No outbound email was sent.",
    metadata: {
      ownerAlertEmailConfigured: true,
      leadPriority: lead.priority,
      score: lead.score,
      internalNoteLength: internalNote.length
    }
  });
}
