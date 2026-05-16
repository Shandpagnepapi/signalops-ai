import { DM_Sans, Space_Grotesk } from "next/font/google";
import { DemoBusinessSwitcher } from "@/components/demo/demo-business-switcher";
import { demoBusinesses } from "@/lib/demo-businesses";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  jsonLdScript,
  META_DESCRIPTION_TEMPLATES,
  OG_IMAGE_ASSETS,
  PAGE_TITLE_TEMPLATES,
  webPageJsonLd
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Envo Demo | SignalOpsAI",
  description: META_DESCRIPTION_TEMPLATES.demo,
  path: "/demo",
  image: OG_IMAGE_ASSETS.demo.path,
  imageAlt: OG_IMAGE_ASSETS.demo.alt,
  absoluteTitle: true
});

const envoBody = DM_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-envo-body"
});

const envoHeading = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-envo-heading"
});

export default function DemoPage() {
  const demoFaqs = Object.values(demoBusinesses).flatMap((business) =>
    business.faqs.map((faq) => ({
      question: `${business.name}: ${faq.question}`,
      answer: faq.answer
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: "Envo Demo | SignalOpsAI",
            description: META_DESCRIPTION_TEMPLATES.demo,
            path: "/demo",
            absoluteTitle: true
          }),
          faqPageJsonLd(demoFaqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE_TEMPLATES.demo, path: "/demo" }
          ])
        ])}
      />
      <div className={`${envoBody.variable} ${envoHeading.variable}`}>
        <DemoBusinessSwitcher />
      </div>
    </>
  );
}
