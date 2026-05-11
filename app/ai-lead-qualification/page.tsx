import { SeoLandingPage } from "@/components/site/seo-landing-page";
import { getSeoLandingPage } from "@/lib/seo-landing-pages";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  jsonLdScript,
  webPageJsonLd
} from "@/lib/seo";

const page = getSeoLandingPage("ai-lead-qualification");

export const metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: page.path
});

export default function AiLeadQualificationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: page.metaTitle,
            description: page.metaDescription,
            path: page.path
          }),
          faqPageJsonLd(page.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "AI Lead Intake", path: page.path }
          ])
        ])}
      />
      <SeoLandingPage page={page} />
    </>
  );
}
