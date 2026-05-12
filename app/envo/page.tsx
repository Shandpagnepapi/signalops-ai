import { EnvoPage as EnvoProductLandingPage } from "@/components/site/envo/envo-page";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  serviceOfferingJsonLd,
  webPageJsonLd
} from "@/lib/seo";

const description =
  "Meet Envo, the AI Lead Manager by SignalOps. Envo answers leads, asks intake questions, follows up, routes priority requests, and hands off to your team.";

export const metadata = createPageMetadata({
  title: "Envo by SignalOps | AI Lead Manager for Local Businesses",
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
            title: "Envo by SignalOps | AI Lead Manager for Local Businesses",
            description,
            path: "/envo",
            absoluteTitle: true
          }),
          serviceOfferingJsonLd({
            name: "Envo by SignalOps",
            description,
            path: "/envo",
            serviceType:
              "AI Lead Manager, AI lead response, AI appointment booking, automated lead follow-up, missed lead recovery, and local business lead automation"
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
