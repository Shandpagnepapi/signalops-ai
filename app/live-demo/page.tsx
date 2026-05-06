import { LiveDemoGenerator } from "@/components/site/live-demo-generator";
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
  title: PAGE_TITLE_TEMPLATES.liveDemo,
  description: META_DESCRIPTION_TEMPLATES.liveDemo,
  path: "/live-demo"
});

export default function LiveDemoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: PAGE_TITLE_TEMPLATES.liveDemo,
            description: META_DESCRIPTION_TEMPLATES.liveDemo,
            path: "/live-demo"
          }),
          serviceJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE_TEMPLATES.liveDemo, path: "/live-demo" }
          ])
        ])}
      />
      <LiveDemoGenerator />
    </>
  );
}
