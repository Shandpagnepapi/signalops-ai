import "server-only";

import type { LeadSubmission } from "@/lib/lead-scoring";
import { createIntegrationResult, type IntegrationResult } from "@/lib/integrations/common";

function getConfiguredCalendlyUrl() {
  return process.env.CALENDLY_URL?.trim() || process.env.CALENDLY_ROUTING_URL?.trim() || "";
}

export async function getBookingLink(lead: LeadSubmission): Promise<IntegrationResult> {
  const calendlyUrl = getConfiguredCalendlyUrl();

  if (!calendlyUrl) {
    return createIntegrationResult({
      ok: true,
      action: "booking_link",
      provider: "calendar",
      mode: "mock",
      status: "mocked",
      message: "Mock booking link prepared. Configure CALENDLY_URL for a real booking handoff.",
      metadata: {
        leadPriority: lead.priority,
        preferredTimeProvided: Boolean(lead.preferredTime)
      }
    });
  }

  return createIntegrationResult({
    ok: true,
    action: "booking_link",
    provider: "calendly",
    mode: "configured",
    status: "prepared",
    message: "Calendly booking link is ready to attach to customer replies.",
    metadata: {
      bookingUrlConfigured: true,
      leadPriority: lead.priority,
      preferredTimeProvided: Boolean(lead.preferredTime)
    }
  });
}

export async function scheduleFollowUpSequence(lead: LeadSubmission): Promise<IntegrationResult> {
  const needsPhotos = lead.tags.some((tag) => tag.includes("photo") || tag === "details-needed");
  const cadence = needsPhotos
    ? "Photo reminder at 2 hours, booking reminder on Day 1, nurture on Day 5."
    : "Day 1, Day 2, Day 5, Day 10, and long-term nurture.";

  return createIntegrationResult({
    ok: true,
    action: "follow_up_sequence",
    provider: "signalops-sequences",
    mode: "mock",
    status: "mocked",
    message: `Mock follow-up sequence started: ${cadence}`,
    metadata: {
      leadPriority: lead.priority,
      needsPhotos,
      sequenceDays: needsPhotos ? 3 : 5
    }
  });
}
