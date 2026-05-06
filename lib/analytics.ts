export const ANALYTICS_EVENTS = {
  auditCtaClicked: "audit_cta_clicked",
  demoViewed: "demo_viewed",
  auditFormStarted: "audit_form_started",
  auditFormSubmitted: "audit_form_submitted",
  demoLeadSubmitted: "demo_lead_submitted",
  packageClicked: "package_clicked",
  contactClicked: "contact_clicked"
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsEventProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

type VercelAnalyticsCommand = (
  command: "event",
  event: {
    name: string;
    data?: Record<string, string | number | boolean>;
  }
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    lintrk?: (...args: unknown[]) => void;
    va?: VercelAnalyticsCommand;
  }
}

export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  linkedInPartnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID ?? ""
};

export function isAnalyticsConfigured() {
  return Boolean(
    analyticsConfig.gaId ||
      analyticsConfig.metaPixelId ||
      analyticsConfig.linkedInPartnerId
  );
}

function cleanProperties(properties: AnalyticsEventProperties = {}) {
  return Object.fromEntries(
    Object.entries(properties).filter((entry): entry is [string, string | number | boolean] => {
      const value = entry[1];
      return (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      );
    })
  );
}

export function trackEvent(
  eventName: AnalyticsEventName,
  properties: AnalyticsEventProperties = {}
) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = cleanProperties(properties);

  window.gtag?.("event", eventName, payload);
  window.fbq?.("trackCustom", eventName, payload);
  window.lintrk?.("track", payload);
  window.va?.("event", {
    name: eventName,
    data: payload
  });

  window.dispatchEvent(
    new CustomEvent("leadops:analytics", {
      detail: {
        eventName,
        properties: payload
      }
    })
  );
}
