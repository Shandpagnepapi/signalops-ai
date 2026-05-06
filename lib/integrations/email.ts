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

function getEmailDeliveryMode() {
  return process.env.EMAIL_DELIVERY_MODE?.trim().toLowerCase() || "draft";
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
      provider: "email-draft",
      mode: "mock",
      status: "mocked",
      message:
        "Customer email draft prepared for manual review. No customer email was sent.",
      metadata: {
        deliveryMode: getEmailDeliveryMode(),
        hasEmail: true,
        leadPriority: lead.priority,
        messageLength: message.length
      }
    });
  }

  return createIntegrationResult({
    ok: true,
    action: "customer_reply",
    provider: "email-draft",
    mode: "configured",
    status: "prepared",
    message:
      "Customer email draft prepared for manual review. RESEND_API_KEY is configured, but SignalOps is locked to draft-only email behavior.",
    metadata: {
      deliveryMode: getEmailDeliveryMode(),
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
      provider: "email-draft",
      mode: "mock",
      status: "mocked",
      message:
        "Owner alert email draft prepared. Configure OWNER_ALERT_EMAIL to route this draft to the review inbox.",
      metadata: {
        deliveryMode: getEmailDeliveryMode(),
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
      provider: "email-draft",
      mode: "mock",
      status: "mocked",
      message:
        "Owner alert email draft prepared for manual review. RESEND_API_KEY is not configured, so nothing was sent.",
      metadata: {
        deliveryMode: getEmailDeliveryMode(),
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
    provider: "email-draft",
    mode: "configured",
    status: "prepared",
    message:
      "Owner alert email draft prepared for manual review. RESEND_API_KEY is configured, but SignalOps is locked to draft-only email behavior.",
    metadata: {
      deliveryMode: getEmailDeliveryMode(),
      ownerAlertEmailConfigured: true,
      leadPriority: lead.priority,
      score: lead.score,
      internalNoteLength: internalNote.length
    }
  });
}
