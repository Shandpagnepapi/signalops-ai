import "server-only";

import type { LeadSubmission } from "@/lib/lead-scoring";
import { createIntegrationResult, type IntegrationResult } from "@/lib/integrations/common";

export async function sendCRMWebhook(lead: LeadSubmission): Promise<IntegrationResult> {
  if (!process.env.GHL_WEBHOOK_URL?.trim()) {
    return createIntegrationResult({
      ok: true,
      action: "crm_webhook",
      provider: "crm",
      mode: "mock",
      status: "mocked",
      message: "Mock CRM webhook prepared. Configure GHL_WEBHOOK_URL to enable a real CRM handoff.",
      metadata: {
        leadPriority: lead.priority,
        score: lead.score,
        status: lead.status
      }
    });
  }

  return createIntegrationResult({
    ok: true,
    action: "crm_webhook",
    provider: "go-high-level",
    mode: "configured",
    status: "prepared",
    message: "GoHighLevel webhook payload is ready for live implementation. No webhook was sent.",
    metadata: {
      leadPriority: lead.priority,
      score: lead.score,
      status: lead.status
    }
  });
}
