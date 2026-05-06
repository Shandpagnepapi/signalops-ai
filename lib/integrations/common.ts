import "server-only";

import type { LeadSubmission } from "@/lib/lead-scoring";

export type IntegrationMode = "mock" | "configured" | "live";

export type IntegrationAction =
  | "customer_reply"
  | "owner_alert"
  | "crm_webhook"
  | "booking_link"
  | "follow_up_sequence";

export type IntegrationResult = {
  ok: boolean;
  action: IntegrationAction;
  provider: string;
  mode: IntegrationMode;
  status: "mocked" | "prepared" | "sent" | "failed" | "skipped";
  message: string;
  timestamp: string;
  metadata?: Record<string, string | number | boolean>;
};

export type LeadAutomationResult = {
  customerReply: IntegrationResult;
  ownerAlert: IntegrationResult;
  crmWebhook: IntegrationResult;
  bookingLink: IntegrationResult;
  followUpSequence: IntegrationResult;
  timeline: {
    time: string;
    event: string;
    status: IntegrationResult["status"];
  }[];
};

export function isConfigured(...values: Array<string | undefined>) {
  return values.every((value) => typeof value === "string" && value.trim().length > 0);
}

export function createIntegrationResult(
  result: Omit<IntegrationResult, "timestamp">
): IntegrationResult {
  return {
    ...result,
    timestamp: new Date().toISOString()
  };
}

export function logSafeMockAction(lead: LeadSubmission, result: IntegrationResult) {
  if (result.mode !== "mock") {
    return;
  }

  console.info("[LeadOps mock integration]", {
    leadId: lead.id,
    source: lead.source,
    priority: lead.priority,
    action: result.action,
    provider: result.provider,
    status: result.status
  });
}
