import "server-only";

import type { LeadSubmission } from "@/lib/lead-scoring";
import {
  logSafeMockAction,
  type IntegrationResult,
  type LeadAutomationResult
} from "@/lib/integrations/common";
import { getBookingLink, scheduleFollowUpSequence } from "@/lib/integrations/calendar";
import { sendCRMWebhook } from "@/lib/integrations/crm";
import { sendEmailCustomerReply, sendEmailOwnerAlert } from "@/lib/integrations/email";
import { sendSmsCustomerReply, sendSmsOwnerAlert } from "@/lib/integrations/sms";

export type { IntegrationResult, LeadAutomationResult } from "@/lib/integrations/common";

export async function sendCustomerReply(lead: LeadSubmission, message: string) {
  if (lead.phone) {
    return sendSmsCustomerReply(lead, message);
  }

  return sendEmailCustomerReply(lead, message);
}

export async function sendOwnerAlert(lead: LeadSubmission, internalNote: string) {
  if (process.env.OWNER_ALERT_PHONE?.trim()) {
    return sendSmsOwnerAlert(lead, internalNote);
  }

  return sendEmailOwnerAlert(lead, internalNote);
}

function describeTimelineEvent(result: IntegrationResult) {
  const statusLabel = result.status === "sent" ? "sent" : "prepared";

  if (result.action === "customer_reply") {
    return `Customer reply ${statusLabel}`;
  }

  if (result.action === "owner_alert") {
    return `Owner alert ${statusLabel}`;
  }

  if (result.action === "crm_webhook") {
    return `CRM log ${statusLabel}`;
  }

  if (result.action === "booking_link") {
    return `Booking link ${statusLabel}`;
  }

  return "Follow-up sequence started";
}

export async function runLeadAutomation(lead: LeadSubmission): Promise<LeadAutomationResult> {
  const [customerReply, ownerAlert, crmWebhook, bookingLink, followUpSequence] = await Promise.all([
    sendCustomerReply(lead, lead.customerReply),
    sendOwnerAlert(lead, lead.internalNote),
    sendCRMWebhook(lead),
    getBookingLink(lead),
    scheduleFollowUpSequence(lead)
  ]);

  const results = [customerReply, ownerAlert, crmWebhook, bookingLink, followUpSequence];
  results.forEach((result) => logSafeMockAction(lead, result));

  return {
    customerReply,
    ownerAlert,
    crmWebhook,
    bookingLink,
    followUpSequence,
    timeline: [
      {
        time: "Lead",
        event: "Lead submitted",
        status: "sent"
      },
      {
        time: "AI",
        event: "AI prepared handoff",
        status: "sent"
      },
      ...results.map((result) => ({
        time: result.provider,
        event: describeTimelineEvent(result),
        status: result.status
      }))
    ]
  };
}
