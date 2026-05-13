import { EnvoPage as EnvoProductLandingPage } from "@/components/site/envo/envo-page";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  serviceOfferingJsonLd,
  webPageJsonLd
} from "@/lib/seo";

const description =
  "Meet Envo, the AI worker trained to your business to organize customer calls, texts, new leads, follow-ups, and handoffs.";

export const metadata = createPageMetadata({
  title: "Envo by SignalOpsAI | AI Lead Manager for Small Businesses",
  description,
  path: "/envo",
  absoluteTitle: true
});

export default function EnvoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: "Envo by SignalOpsAI | AI Lead Manager for Small Businesses",
            description,
            path: "/envo",
            absoluteTitle: true
          }),
          serviceOfferingJsonLd({
            name: "Envo by SignalOpsAI",
            description,
            path: "/envo",
            serviceType:
              "AI Lead Manager, AI lead response, AI appointment booking, automated lead follow-up, missed call text back, AI receptionist, AI front desk, and customer lead dashboard"
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Envo", path: "/envo" }
          ])
        ])}
      />
      <EnvoProductLandingPage />
    </>
  );
}
