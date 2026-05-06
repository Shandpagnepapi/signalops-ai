import { RoiCalculator } from "@/components/site/roi-calculator";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  META_DESCRIPTION_TEMPLATES,
  PAGE_TITLE_TEMPLATES,
  webPageJsonLd
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: PAGE_TITLE_TEMPLATES.roi,
  description: META_DESCRIPTION_TEMPLATES.roi,
  path: "/roi-calculator"
});

export default function RoiCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: PAGE_TITLE_TEMPLATES.roi,
            description: META_DESCRIPTION_TEMPLATES.roi,
            path: "/roi-calculator"
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE_TEMPLATES.roi, path: "/roi-calculator" }
          ])
        ])}
      />
      <RoiCalculator />
    </>
  );
}
