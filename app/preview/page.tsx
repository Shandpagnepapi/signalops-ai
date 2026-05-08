import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { PreviewRequestForm } from "@/components/site/preview-request-form";
import {
  BeforeAfterFlow,
  LeadJourneyVisual,
  PreviewArtifactShowcase
} from "@/components/site/product-story-visuals";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { SECONDARY_CTA } from "@/lib/constants";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  webPageJsonLd
} from "@/lib/seo";

const previewDescription =
  "Tell us how your leads come in and where things slow down. SignalOps builds a personalized preview of the AI lead system your business should be using.";

export const metadata = createPageMetadata({
  title: "Free Preview",
  description: previewDescription,
  path: "/preview"
});

const steps = [
  "Submit the Free Preview form",
  "SignalOps creates the draft package",
  "We review your preview before it is emailed"
];

export default function PreviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: "Free Preview",
            description: previewDescription,
            path: "/preview"
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Free Preview", path: "/preview" }
          ])
        ])}
      />
      <div className="overflow-x-hidden">
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="surface-grid absolute inset-0 opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,111,156,0.22),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(255,179,109,0.16),transparent_30%),linear-gradient(180deg,rgba(6,12,24,0.52),#100818_92%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <Badge className="mb-5 w-fit border border-[#ffb36d]/25 bg-[#ffb36d]/10 text-[#ffe1bd]">
                Free Preview
              </Badge>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
                Get Your Free Preview
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#ead0df]/78 sm:text-lg">
                {previewDescription}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#preview-form" className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}>
                  Start Free Preview
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <TrackedLink
                  href={SECONDARY_CTA.href}
                  eventName={ANALYTICS_EVENTS.demoViewed}
                  eventProperties={{ location: "preview_hero" }}
                  className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-white/18 bg-white/[0.045] sm:w-auto`}
                >
                  {SECONDARY_CTA.label}
                </TrackedLink>
              </div>
            </div>

            <PreviewArtifactShowcase />
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#17122d]/36">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <p className="font-semibold text-white">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 xl:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <LeadJourneyVisual />
          <BeforeAfterFlow />
        </section>

        <section id="preview-form" className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-[#ffb36d]/18 bg-[#ffb36d]/8 p-5">
              <Sparkles className="mb-4 size-7 text-[#ffb36d]" aria-hidden="true" />
              <h2 className="text-2xl font-semibold tracking-normal text-white">A preview before buildout.</h2>
              <p className="mt-3 text-sm leading-6 text-[#ead0df]/76">
                The form gives SignalOps enough context to draft the report, proposal, and email your business would receive after review.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
              <ShieldCheck className="mb-4 size-7 text-emerald-300" aria-hidden="true" />
              <h2 className="text-xl font-semibold tracking-normal text-white">What happens after submission</h2>
              <p className="mt-3 text-sm leading-6 text-[#ead0df]/76">
                SignalOps creates a personalized draft preview package, then reviews it internally before anything is sent.
              </p>
              <div className="mt-4 grid gap-2">
                {["Preview Report draft", "Proposal Draft", "Email Draft", "Human review before email"].map((item) => (
                  <p key={item} className="flex gap-2 text-sm text-[#ead0df]/74">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <PreviewRequestForm />
        </section>
      </div>
    </>
  );
}
