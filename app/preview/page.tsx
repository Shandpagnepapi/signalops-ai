import { DM_Sans, Space_Grotesk } from "next/font/google";
import { PreviewRequestForm } from "@/components/site/preview-request-form";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  webPageJsonLd
} from "@/lib/seo";

const previewDescription =
  "Tell SignalOpsAI how leads move through your business so Envo can be mapped around your calls, forms, follow-ups, rules, and handoffs.";

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
  title: "Preview Envo | SignalOpsAI",
  description: previewDescription,
  path: "/preview",
  absoluteTitle: true
});

export default function PreviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: "Preview Envo | SignalOpsAI",
            description: previewDescription,
            path: "/preview",
            absoluteTitle: true
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Preview Envo", path: "/preview" }
          ])
        ])}
      />
      <div
        className={`${envoBody.variable} ${envoHeading.variable} envo-shuffle relative isolate min-h-screen overflow-x-hidden bg-zinc-950 font-body text-zinc-100`}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-12%,rgba(50,139,255,0.34),transparent_32%),radial-gradient(circle_at_18%_22%,rgba(111,77,255,0.2),transparent_30%),radial-gradient(circle_at_86%_88%,rgba(52,199,89,0.14),transparent_30%),linear-gradient(180deg,#050814_0%,#071126_46%,#030611_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(circle_at_50%_20%,black,transparent_72%)]" />
        <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[32rem] w-[32rem] translate-x-1/4 rounded-full bg-[#328BFF]/14 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-24 left-0 -z-10 h-[30rem] w-[30rem] -translate-x-1/4 rounded-full bg-[#6F4DFF]/16 blur-[90px]" />

        <section className="relative px-4 pb-12 pt-16 text-center sm:px-6 sm:pb-14 sm:pt-20 lg:px-8 lg:pb-16 lg:pt-24">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Map out your business.
              <br />
              <span className="bg-[linear-gradient(135deg,#8EBBFF,#328BFF_42%,#A99BFF)] bg-clip-text text-transparent">
                We&apos;ll build the AI.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg md:leading-8">
              Tell us how leads currently flow through your business. We&apos;ll use this information to construct a custom mockup demonstrating exactly how Envo will answer, organize, and follow up for you.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-4xl">
            <PreviewRequestForm />
          </div>
        </section>
      </div>
    </>
  );
}
