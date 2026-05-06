import { RoiCalculator } from "@/components/site/roi-calculator";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  META_DESCRIPTION_TEMPLATES,
  OG_IMAGE_ASSETS,
  PAGE_TITLE_TEMPLATES,
  webPageJsonLd
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: PAGE_TITLE_TEMPLATES.roi,
  description: META_DESCRIPTION_TEMPLATES.roi,
  path: "/roi-calculator",
  image: OG_IMAGE_ASSETS.roi.path,
  imageAlt: OG_IMAGE_ASSETS.roi.alt
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
