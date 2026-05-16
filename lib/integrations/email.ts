import "server-only";

import type { LeadSubmission } from "@/lib/lead-scoring";
import type { PreviewSubmission } from "@/lib/preview-types";
import {
  createIntegrationResult,
  isConfigured,
  type IntegrationResult
} from "@/lib/integrations/common";

const RESEND_EMAIL_ENDPOINT = "https://api.resend.com/emails";

type OwnerAlertEmail = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

type ResendResponseBody = {
  id?: string;
  message?: string;
  error?: string;
  name?: string;
};

function cleanEnv(value: string | undefined) {
  return value?.trim() || "";
}

function hasResendConfig() {
  return Boolean(cleanEnv(process.env.RESEND_API_KEY));
}

function getEmailDeliveryMode() {
  return cleanEnv(process.env.EMAIL_DELIVERY_MODE).toLowerCase() || "draft";
}

function getOwnerAlertEmail() {
  return cleanEnv(process.env.OWNER_ALERT_EMAIL);
}

function getSenderEmail() {
  return (
    cleanEnv(process.env.OWNER_ALERT_FROM_EMAIL) ||
    cleanEnv(process.env.RESEND_FROM_EMAIL) ||
    "SignalOpsAI <onboarding@resend.dev>"
  );
}

function getSiteUrl() {
  return cleanEnv(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character] ?? character;
  });
}

function textToHtml(text: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#f6f8fb;color:#0b1024;font-family:Arial,Helvetica,sans-serif;">
    <main style="max-width:680px;margin:0 auto;padding:28px 18px;">
      <section style="border:1px solid #d8e2f7;border-radius:14px;background:#ffffff;padding:24px;">
        <pre style="white-space:pre-wrap;margin:0;font:14px/1.65 Arial,Helvetica,sans-serif;color:#0b1024;">${escapeHtml(text)}</pre>
      </section>
    </main>
  </body>
</html>`;
}

function section(title: string, rows: string[]) {
  const presentRows = rows.filter(Boolean);

  if (presentRows.length === 0) {
    return "";
  }

  return [`${title}:`, ...presentRows.map((row) => `- ${row}`)].join("\n");
}

function field(label: string, value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  return `${label}: ${value}`;
}

function buildLeadText(lead: LeadSubmission, internalNote: string) {
  const dashboardUrl = getSiteUrl() ? `${getSiteUrl()}/dashboard` : "";
  const replyLine = lead.email
    ? `Reply to this email to reach ${lead.name} at ${lead.email}.`
    : "This inquiry did not include an email address. Use the phone number below.";

  return [
    `New website inquiry from ${lead.name}`,
    replyLine,
    "",
    section("Contact", [
      field("Name", lead.name),
      field("Email", lead.email),
      field("Phone", lead.phone)
    ]),
    "",
    section("Business", [
      field("Business", lead.businessName),
      field("Website", lead.website),
      field("Industry", lead.industry),
      field("Source", lead.source)
    ]),
    "",
    section("Request", [
      field("Service needed", lead.serviceNeeded),
      field("Urgency", lead.urgency),
      field("Preferred time", lead.preferredTime),
      field("Address", lead.address),
      field("Vehicle / asset", lead.vehicleYearMakeModel),
      field("Request type", lead.damageType),
      field("Quantity", lead.numberOfWheels || ""),
      field("Message", lead.message),
      field("Photo / site notes", lead.photoNotes)
    ]),
    "",
    section("SignalOps handoff", [
      field("Priority", lead.priority),
      field("Score", lead.score),
      field("AI summary", lead.aiSummary),
      field("Recommended action", lead.recommendedAction),
      field("Internal note", internalNote || lead.internalNote),
      field("Tags", lead.tags.join(", "))
    ]),
    dashboardUrl ? `\nDashboard: ${dashboardUrl}` : "",
    `Lead ID: ${lead.id}`
  ]
    .filter(Boolean)
    .join("\n");
}

function buildLeadOwnerAlertEmail(lead: LeadSubmission, internalNote: string): OwnerAlertEmail {
  const business = lead.businessName ? ` - ${lead.businessName}` : "";
  const subject = `New ${lead.priority} lead: ${lead.name}${business}`;
  const text = buildLeadText(lead, internalNote);

  return {
    subject,
    text,
    html: textToHtml(text),
    replyTo: isValidEmail(lead.email) ? lead.email : undefined
  };
}

function buildPreviewText(submission: PreviewSubmission) {
  const siteUrl = getSiteUrl();
  const adminUrl = siteUrl ? `${siteUrl}/admin/manager` : "";
  const previewUrl = siteUrl ? `${siteUrl}/preview/${submission.id}` : "";
  const classification =
    submission.managerNotes.promptClassification ?? submission.promptWorkerResult?.classification;
  const replyLine = `Reply to this email to reach ${submission.contactName} at ${submission.email}.`;

  return [
    `New Envo Preview submission from ${submission.contactName}`,
    replyLine,
    "",
    section("Contact", [
      field("Name", submission.contactName),
      field("Email", submission.email),
      field("Phone", submission.phone)
    ]),
    "",
    section("Business context", [
      field("Business", submission.businessName),
      field("Website", submission.website),
      field("Industry", submission.otherIndustry ? `${submission.industry} - ${submission.otherIndustry}` : submission.industry),
      field("Main services", submission.mainServices),
      field("Average job value", submission.averageJobValue || ""),
      field("Monthly lead volume", submission.monthlyLeadVolume)
    ]),
    "",
    section("Lead flow", [
      field("Lead sources", submission.mainLeadSources.join(", ")),
      field("Other lead source", submission.otherLeadSource),
      field("Biggest bottleneck", submission.currentProblem),
      field("Current tools / CRM", submission.currentTools),
      field("After a lead comes in", submission.leadProcess),
      field("Anything else", submission.notes)
    ]),
    "",
    section("SignalOps handoff", [
      field("Recommended package", submission.selectedPackage ?? submission.managerNotes.recommendedPackage),
      field("System template", submission.selectedSystemTemplate),
      field("Fit score", submission.managerNotes.fitScore),
      field("Contact allowed", submission.contactAllowed),
      field("Classification", classification?.reasoning),
      field("Missing info", classification?.missingInfo.join(", ")),
      field("Test reason", submission.testReason)
    ]),
    adminUrl ? `\nAdmin queue: ${adminUrl}` : "",
    previewUrl ? `Preview: ${previewUrl}` : "",
    `Submission ID: ${submission.id}`
  ]
    .filter(Boolean)
    .join("\n");
}

function buildPreviewOwnerAlertEmail(submission: PreviewSubmission): OwnerAlertEmail {
  const subject = `New Envo Preview inquiry: ${submission.businessName}`;
  const text = buildPreviewText(submission);

  return {
    subject,
    text,
    html: textToHtml(text),
    replyTo: isValidEmail(submission.email) ? submission.email : undefined
  };
}

function getResendError(body: ResendResponseBody | null, status: number) {
  return body?.message || body?.error || body?.name || `Resend returned HTTP ${status}.`;
}

async function sendResendOwnerEmail(email: OwnerAlertEmail, idempotencyKey: string) {
  const response = await fetch(RESEND_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cleanEnv(process.env.RESEND_API_KEY)}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey
    },
    body: JSON.stringify({
      from: getSenderEmail(),
      to: getOwnerAlertEmail(),
      subject: email.subject,
      text: email.text,
      html: email.html,
      ...(email.replyTo ? { reply_to: email.replyTo } : {})
    })
  });

  const body = (await response.json().catch(() => null)) as ResendResponseBody | null;

  if (!response.ok) {
    return {
      ok: false as const,
      message: getResendError(body, response.status)
    };
  }

  return {
    ok: true as const,
    id: body?.id ?? ""
  };
}

function isLikelyTestLead(lead: LeadSubmission) {
  const text = [
    lead.source,
    lead.name,
    lead.email,
    lead.phone,
    lead.businessName,
    lead.website,
    lead.message,
    lead.serviceNeeded
  ]
    .join(" ")
    .toLowerCase();

  return (
    text.includes("example.com") ||
    text.includes(".example") ||
    text.includes("demo") ||
    text.includes("test") ||
    text.includes("safe to delete") ||
    text.includes("do not contact") ||
    text.includes("dummy") ||
    /\b555[-\s)]?\d{3,4}\b/.test(lead.phone)
  );
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
      "Customer email draft prepared for manual review. RESEND_API_KEY is configured, but SignalOps is locked to draft-only customer email behavior.",
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
  if (isLikelyTestLead(lead)) {
    return createIntegrationResult({
      ok: true,
      action: "owner_alert",
      provider: "email",
      mode: "mock",
      status: "skipped",
      message: "Owner alert skipped because the lead looks like demo or test data.",
      metadata: {
        leadPriority: lead.priority,
        score: lead.score
      }
    });
  }

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

  try {
    const ownerEmail = buildLeadOwnerAlertEmail(lead, internalNote);
    const result = await sendResendOwnerEmail(ownerEmail, `owner-alert-${lead.id}`);

    if (!result.ok) {
      return createIntegrationResult({
        ok: false,
        action: "owner_alert",
        provider: "resend",
        mode: "live",
        status: "failed",
        message: `Owner alert email failed: ${result.message}`,
        metadata: {
          ownerAlertEmailConfigured: true,
          leadPriority: lead.priority,
          score: lead.score
        }
      });
    }

    return createIntegrationResult({
      ok: true,
      action: "owner_alert",
      provider: "resend",
      mode: "live",
      status: "sent",
      message: "Owner alert email sent.",
      metadata: {
        ownerAlertEmailConfigured: true,
        leadPriority: lead.priority,
        score: lead.score,
        emailId: result.id
      }
    });
  } catch (error) {
    return createIntegrationResult({
      ok: false,
      action: "owner_alert",
      provider: "resend",
      mode: "live",
      status: "failed",
      message: error instanceof Error ? error.message : "Owner alert email failed.",
      metadata: {
        ownerAlertEmailConfigured: true,
        leadPriority: lead.priority,
        score: lead.score
      }
    });
  }
}

export async function sendPreviewOwnerAlert(submission: PreviewSubmission): Promise<IntegrationResult> {
  if (submission.isTestSubmission || submission.contactAllowed === false) {
    return createIntegrationResult({
      ok: true,
      action: "preview_owner_alert",
      provider: "email",
      mode: "mock",
      status: "skipped",
      message: "Preview owner alert skipped because the submission is marked test or do-not-contact.",
      metadata: {
        fitScore: submission.managerNotes.fitScore,
        contactAllowed: submission.contactAllowed
      }
    });
  }

  if (!isConfigured(process.env.OWNER_ALERT_EMAIL)) {
    return createIntegrationResult({
      ok: true,
      action: "preview_owner_alert",
      provider: "email-draft",
      mode: "mock",
      status: "mocked",
      message: "Preview owner alert draft prepared. Configure OWNER_ALERT_EMAIL to receive it.",
      metadata: {
        deliveryMode: getEmailDeliveryMode(),
        fitScore: submission.managerNotes.fitScore
      }
    });
  }

  if (!hasResendConfig()) {
    return createIntegrationResult({
      ok: true,
      action: "preview_owner_alert",
      provider: "email-draft",
      mode: "mock",
      status: "mocked",
      message:
        "Preview owner alert draft prepared for manual review. RESEND_API_KEY is not configured, so nothing was sent.",
      metadata: {
        deliveryMode: getEmailDeliveryMode(),
        ownerAlertEmailConfigured: true,
        fitScore: submission.managerNotes.fitScore
      }
    });
  }

  try {
    const ownerEmail = buildPreviewOwnerAlertEmail(submission);
    const result = await sendResendOwnerEmail(ownerEmail, `preview-owner-alert-${submission.id}`);

    if (!result.ok) {
      return createIntegrationResult({
        ok: false,
        action: "preview_owner_alert",
        provider: "resend",
        mode: "live",
        status: "failed",
        message: `Preview owner alert email failed: ${result.message}`,
        metadata: {
          ownerAlertEmailConfigured: true,
          fitScore: submission.managerNotes.fitScore
        }
      });
    }

    return createIntegrationResult({
      ok: true,
      action: "preview_owner_alert",
      provider: "resend",
      mode: "live",
      status: "sent",
      message: "Preview owner alert email sent.",
      metadata: {
        ownerAlertEmailConfigured: true,
        fitScore: submission.managerNotes.fitScore,
        emailId: result.id
      }
    });
  } catch (error) {
    return createIntegrationResult({
      ok: false,
      action: "preview_owner_alert",
      provider: "resend",
      mode: "live",
      status: "failed",
      message: error instanceof Error ? error.message : "Preview owner alert email failed.",
      metadata: {
        ownerAlertEmailConfigured: true,
        fitScore: submission.managerNotes.fitScore
      }
    });
  }
}
