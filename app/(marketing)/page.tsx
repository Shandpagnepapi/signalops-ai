import { MarketingHome } from "@/components/site/marketing-home";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  OG_IMAGE_ASSETS,
  webPageJsonLd
} from "@/lib/seo";

const title = "SignalOpsAI | Envo and Drone Services";
const description =
  "SignalOpsAI is the parent venture studio for Envo, the AI worker for customer calls and leads, plus separate FAA Part 107 Drone Services.";

export const metadata = createPageMetadata({
  title,
  description,
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
            title,
            description,
            path: "/",
            absoluteTitle: true
          }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }])
        ])}
      />
      <MarketingHome />
    </>
  );
}
