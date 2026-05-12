import { ArrowRight, CheckCircle2, ClipboardList, FileText, Route, Sparkles, Workflow } from "lucide-react";
import { PreviewRequestForm } from "@/components/site/preview-request-form";
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
  "Tell us how your leads come in and where things slow down. SignalOps maps the lead operating system your business should be using.";

export const metadata = createPageMetadata({
  title: "See Your System",
  description: previewDescription,
  path: "/preview"
});

const mobilePreviewOutputs = [
  {
    title: "System Map",
    copy: "Lead sources, slow spots, handoffs, and follow-up gaps.",
    icon: Workflow
  },
  {
    title: "Build Plan",
    copy: "The operating system SignalOps would shape around your business.",
    icon: ClipboardList
  },
  {
    title: "Next Steps",
    copy: "What to connect, what to automate, and what comes first.",
    icon: Route
  }
];

export default function PreviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: "See Your System",
            description: previewDescription,
            path: "/preview"
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "See Your System", path: "/preview" }
          ])
        ])}
      />
      <div className="overflow-x-hidden pb-20 md:pb-0">
        <section className="relative isolate overflow-hidden border-b border-white/10 md:hidden">
          <div className="surface-grid absolute inset-0 opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,111,156,0.18),transparent_32%),linear-gradient(180deg,rgba(6,12,24,0.4),#100818_92%)]" />
          <div className="relative mx-auto max-w-md px-4 py-10">
            <Badge className="mb-4 w-fit border border-[#ffb36d]/25 bg-[#ffb36d]/10 text-[#ffe1bd]">
              Lead OS
            </Badge>
            <h2 className="text-4xl font-semibold leading-tight tracking-normal text-white">
              See Your System
            </h2>
            <p className="mt-4 text-base leading-7 text-[#ead0df]/78">
              Tell us how your leads come in and where things slow down. SignalOps maps the system that fits your business.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {mobilePreviewOutputs.map((output) => {
                const Icon = output.icon;

                return (
                  <div key={output.title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
                    <Icon className="size-4 text-[#ffb36d]" aria-hidden="true" />
                    <p className="mt-3 text-xs font-semibold leading-4 text-white">{output.title}</p>
                  </div>
                );
              })}
            </div>

            <a href="#preview-form" className={`${buttonVariants({ size: "lg" })} mt-6 w-full`}>
              Get Started
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="relative isolate hidden overflow-hidden border-b border-white/10 md:block">
          <div className="surface-grid absolute inset-0 opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,111,156,0.22),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(255,179,109,0.16),transparent_30%),linear-gradient(180deg,rgba(6,12,24,0.52),#100818_92%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <Badge className="mb-5 w-fit border border-[#ffb36d]/25 bg-[#ffb36d]/10 text-[#ffe1bd]">
                Lead OS
              </Badge>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
                See Your System
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#ead0df]/78 sm:text-lg">
                {previewDescription}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#preview-form" className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}>
                  Get Started
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

            <div className="grid gap-4 self-center rounded-[1.5rem] border border-white/12 bg-white/[0.055] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb36d]">What you get back</p>
              <div className="grid gap-3">
                {mobilePreviewOutputs.map((output) => {
                  const Icon = output.icon;

                  return (
                    <div key={output.title} className="rounded-2xl border border-white/10 bg-[#17122d]/62 p-4">
                      <Icon className="mb-3 size-5 text-[#ffb36d]" aria-hidden="true" />
                      <p className="font-semibold text-white">{output.title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#ead0df]/68">{output.copy}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="preview-form" className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:py-10 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div className="hidden gap-4 md:grid">
            <div className="rounded-2xl border border-[#ffb36d]/18 bg-[#ffb36d]/8 p-5">
              <Sparkles className="mb-4 size-7 text-[#ffb36d]" aria-hidden="true" />
              <h2 className="text-2xl font-semibold tracking-normal text-white">A preview before buildout.</h2>
              <p className="mt-3 text-sm leading-6 text-[#ead0df]/76">
                The form gives SignalOps enough context to map your lead flow, operating system, and next steps.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
              <FileText className="mb-4 size-7 text-[#ffb36d]" aria-hidden="true" />
              <h2 className="text-xl font-semibold tracking-normal text-white">What happens after submission</h2>
              <p className="mt-3 text-sm leading-6 text-[#ead0df]/76">
                SignalOps uses your answers to shape a practical operating system map for your business.
              </p>
              <div className="mt-4 grid gap-2">
                {["System Map", "Build Plan", "Recommended next step", "Done-for-you setup path"].map((item) => (
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
        <section className="px-4 pb-10 text-center text-xs leading-5 text-[#ead0df]/52 md:hidden">
          Built around your lead flow, tools, services, and team handoff.
        </section>
      </div>
    </>
  );
}
