import "server-only";

import type { LeadSubmission } from "@/lib/lead-scoring";
import {
  createIntegrationResult,
  isConfigured,
  type IntegrationResult
} from "@/lib/integrations/common";

function hasTwilioConfig() {
  return isConfigured(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    process.env.TWILIO_PHONE_NUMBER
  );
}

function createSmsResult(
  lead: LeadSubmission,
  action: IntegrationResult["action"],
  purpose: string
): IntegrationResult {
  if (!lead.phone) {
    return createIntegrationResult({
      ok: false,
      action,
      provider: "sms",
      mode: "mock",
      status: "skipped",
      message: `SMS ${purpose} skipped because the lead does not include a phone number.`
    });
  }

  if (!hasTwilioConfig()) {
    return createIntegrationResult({
      ok: true,
      action,
      provider: "twilio",
      mode: "mock",
      status: "mocked",
      message: `Mock SMS ${purpose} prepared. Configure Twilio env vars to enable live delivery.`,
      metadata: {
        hasPhone: true,
        leadPriority: lead.priority
      }
    });
  }

  return createIntegrationResult({
    ok: true,
    action,
    provider: "twilio",
    mode: "configured",
    status: "prepared",
    message: `Twilio SMS ${purpose} is ready for live implementation. No outbound SMS was sent.`,
    metadata: {
      hasPhone: true,
      leadPriority: lead.priority
    }
  });
}

export async function sendSmsCustomerReply(
  lead: LeadSubmission,
  message: string
): Promise<IntegrationResult> {
  const result = createSmsResult(lead, "customer_reply", "customer reply");

  return {
    ...result,
    metadata: {
      ...result.metadata,
      messageLength: message.length
    }
  };
}

export async function sendSmsOwnerAlert(
  lead: LeadSubmission,
  internalNote: string
): Promise<IntegrationResult> {
  if (!process.env.OWNER_ALERT_PHONE?.trim()) {
    return createIntegrationResult({
      ok: true,
      action: "owner_alert",
      provider: "twilio",
      mode: "mock",
      status: "mocked",
      message: "Mock owner SMS alert prepared. Configure OWNER_ALERT_PHONE and Twilio env vars for live delivery.",
      metadata: {
        leadPriority: lead.priority,
        internalNoteLength: internalNote.length
      }
    });
  }

  if (!hasTwilioConfig()) {
    return createIntegrationResult({
      ok: true,
      action: "owner_alert",
      provider: "twilio",
      mode: "mock",
      status: "mocked",
      message: "Mock owner SMS alert prepared because Twilio env vars are not fully configured.",
      metadata: {
        ownerAlertPhoneConfigured: true,
        leadPriority: lead.priority,
        score: lead.score,
        internalNoteLength: internalNote.length
      }
    });
  }

  return createIntegrationResult({
    ok: true,
    action: "owner_alert",
    provider: "twilio",
    mode: "configured",
    status: "prepared",
    message: "Twilio owner SMS alert is ready for live implementation. No outbound SMS was sent.",
    metadata: {
      ownerAlertPhoneConfigured: true,
      leadPriority: lead.priority,
      score: lead.score,
      internalNoteLength: internalNote.length
    }
  });
}
