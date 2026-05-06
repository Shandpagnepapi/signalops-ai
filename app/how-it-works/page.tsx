import { HowItWorksDemo } from "@/components/site/how-it-works-demo";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  META_DESCRIPTION_TEMPLATES,
  PAGE_TITLE_TEMPLATES,
  serviceJsonLd,
  webPageJsonLd
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: PAGE_TITLE_TEMPLATES.howItWorks,
  description: META_DESCRIPTION_TEMPLATES.howItWorks,
  path: "/how-it-works"
});

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: PAGE_TITLE_TEMPLATES.howItWorks,
            description: META_DESCRIPTION_TEMPLATES.howItWorks,
            path: "/how-it-works"
          }),
          serviceJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE_TEMPLATES.howItWorks, path: "/how-it-works" }
          ])
        ])}
      />
      <HowItWorksDemo />
    </>
  );
}
