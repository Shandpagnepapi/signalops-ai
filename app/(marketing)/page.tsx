import { MarketingHome } from "@/components/site/marketing-home";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  META_DESCRIPTION_TEMPLATES,
  OG_IMAGE_ASSETS,
  serviceJsonLd,
  webPageJsonLd
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "SignalOpsAI | Envo AI Worker for Customer Calls and Leads",
  description: META_DESCRIPTION_TEMPLATES.home,
  path: "/",
  image: OG_IMAGE_ASSETS.home.path,
  imageAlt: OG_IMAGE_ASSETS.home.alt,
  absoluteTitle: true
});

export default function MarketingHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: "SignalOpsAI | Envo AI Worker for Customer Calls and Leads",
            description: META_DESCRIPTION_TEMPLATES.home,
            path: "/",
            absoluteTitle: true
          }),
          serviceJsonLd(),
          breadcrumbJsonLd([{ name: "Home", path: "/" }])
        ])}
      />
      <MarketingHome />
    </>
  );
}
