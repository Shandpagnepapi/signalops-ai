import { DM_Sans, Space_Grotesk } from "next/font/google";
import { ShuffleEnvoPage } from "@/components/site/envo/shuffle-envo-page";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  serviceOfferingJsonLd,
  webPageJsonLd
} from "@/lib/seo";

const description =
  "Envo is the AI Lead Manager for small businesses, trained to answer calls, texts, and forms, collect lead details, follow up, support booking, and keep every opportunity organized.";

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

export const metadata = createPageMetadata({
  title: "Envo by SignalOpsAI | AI Lead Manager for Small Businesses",
  description,
  path: "/envo",
  absoluteTitle: true
});

export default function EnvoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: "Envo by SignalOpsAI | AI Lead Manager for Small Businesses",
            description,
            path: "/envo",
            absoluteTitle: true
          }),
          serviceOfferingJsonLd({
            name: "Envo by SignalOpsAI",
            description,
            path: "/envo",
            serviceType:
              "AI Lead Manager, AI lead response, AI appointment booking, automated lead follow-up, missed call text back, AI receptionist, AI front desk, and customer lead dashboard"
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Envo", path: "/envo" }
          ])
        ])}
      />
      <div className={`${envoBody.variable} ${envoHeading.variable}`}>
        <ShuffleEnvoPage />
      </div>
    </>
  );
}
