import { EnvoProductPage } from "@/components/site/envo-showcase";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  webPageJsonLd
} from "@/lib/seo";

const description =
  "Meet Envo by SignalOps, the AI Lead Manager for local businesses. Envo handles AI lead response, intake questions, automated follow-up, owner handoffs, and human escalation.";

export const metadata = createPageMetadata({
  title: "Envo AI Lead Manager",
  description,
  path: "/envo"
});

export default function EnvoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: "Envo AI Lead Manager",
            description,
            path: "/envo"
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Envo", path: "/envo" }
          ])
        ])}
      />
      <EnvoProductPage />
    </>
  );
}
