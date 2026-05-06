import { MarketingHome } from "@/components/site/marketing-home";
import { MARKETING_FAQS } from "@/lib/constants";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  jsonLdScript,
  META_DESCRIPTION_TEMPLATES,
  OG_IMAGE_ASSETS,
  PAGE_TITLE_TEMPLATES,
  serviceJsonLd,
  webPageJsonLd
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: PAGE_TITLE_TEMPLATES.home,
  description: META_DESCRIPTION_TEMPLATES.home,
  path: "/",
  image: OG_IMAGE_ASSETS.home.path,
  imageAlt: OG_IMAGE_ASSETS.home.alt
});

export default function MarketingHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: PAGE_TITLE_TEMPLATES.home,
            description: META_DESCRIPTION_TEMPLATES.home,
            path: "/"
          }),
          serviceJsonLd(),
          faqPageJsonLd(MARKETING_FAQS),
          breadcrumbJsonLd([{ name: "Home", path: "/" }])
        ])}
      />
      <MarketingHome />
    </>
  );
}
