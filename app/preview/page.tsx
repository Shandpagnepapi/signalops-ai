import { ClipboardList, Route, Workflow } from "lucide-react";
import {
  EnvoAppIcon,
  EnvoCtaButton,
  EnvoDarkCard,
  EnvoFeaturePill,
  EnvoFeatureStack,
  EnvoGlassCard,
  EnvoLogo,
  EnvoSection
} from "@/components/site/envo/envo-brand-system";
import { PreviewRequestForm } from "@/components/site/preview-request-form";
import { SECONDARY_CTA } from "@/lib/constants";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  webPageJsonLd
} from "@/lib/seo";

const previewDescription =
  "Tell us how customer calls, texts, forms, DMs, and follow-ups work today. SignalOpsAI maps how Envo should answer, organize, follow up, and hand off leads for your business.";

export const metadata = createPageMetadata({
  title: "Preview Envo | SignalOpsAI",
  description: previewDescription,
  path: "/preview",
  absoluteTitle: true
});

const mobilePreviewOutputs = [
  {
    title: "Lead Map",
    copy: "Where leads come from, where they slow down, and what Envo should handle.",
    icon: Workflow
  },
  {
    title: "Envo Build Plan",
    copy: "What Envo should answer, ask, log, follow up on, and escalate.",
    icon: ClipboardList
  },
  {
    title: "Next Steps",
    copy: "What to connect first and what rules Envo needs before going live.",
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
      <div className="overflow-x-hidden bg-[#071126]">
        <EnvoSection className="border-b border-[#D8E2F7] bg-[#FBFAF7]">
          <div className="grid gap-8 py-4 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-8">
            <div>
              <EnvoLogo size="lg" />
              <EnvoFeaturePill className="mt-6">Envo Preview</EnvoFeaturePill>
              <h1 className="mt-5 max-w-4xl text-[2.55rem] font-black leading-[0.95] tracking-normal text-[#071126] sm:text-6xl lg:text-7xl">
                Preview Envo for your business.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#647084] sm:text-xl">
                {previewDescription}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <EnvoCtaButton href="#preview-form">Preview Envo</EnvoCtaButton>
                <EnvoCtaButton href={SECONDARY_CTA.href} variant="secondary">
                  {SECONDARY_CTA.label}
                </EnvoCtaButton>
              </div>
            </div>

            <EnvoGlassCard className="p-4 sm:p-6">
              <div className="flex flex-col gap-4 border-b border-[#D8E2F7] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2563EB]">
                    What you get back
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#647084]">
                    A practical map for how Envo should answer, organize, follow up, and hand off.
                  </p>
                </div>
                <EnvoAppIcon className="size-20 shrink-0 rounded-[1.25rem]" />
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
                <EnvoDarkCard className="flex min-h-[17rem] flex-col justify-between p-5">
                  <EnvoLogo size="md" tone="dark" />
                  <div>
                    <p className="text-3xl font-black leading-tight tracking-normal text-white sm:text-4xl">
                      Smarter conversations.
                      <br />
                      Stronger connections.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {["Lead Map", "Build Plan", "Next Steps"].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-[#D7E2F7]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </EnvoDarkCard>

                <div className="grid gap-3">
                  {mobilePreviewOutputs.map((output) => {
                    const Icon = output.icon;

                    return (
                      <EnvoGlassCard key={output.title} className="p-4 shadow-[0_14px_42px_rgba(37,99,235,0.1)]">
                        <div className="flex gap-3">
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#2563EB]">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          <div>
                            <h2 className="text-base font-black text-[#071126]">{output.title}</h2>
                            <p className="mt-1 text-sm leading-6 text-[#647084]">{output.copy}</p>
                          </div>
                        </div>
                      </EnvoGlassCard>
                    );
                  })}
                </div>
              </div>

              <EnvoFeatureStack className="mt-4 lg:grid-cols-3" />
            </EnvoGlassCard>
          </div>
        </EnvoSection>

        <EnvoSection id="preview-form" className="border-b border-white/10 bg-[#071126]" tone="dark">
          <div className="mx-auto max-w-4xl">
            <PreviewRequestForm />
          </div>
        </EnvoSection>

        <section className="mx-auto max-w-4xl px-4 pb-12 pt-2 text-center text-xs leading-5 text-[#D7E2F7]/62 sm:px-6">
          Built around your lead flow, service area, pricing rules, guardrails, and team handoff. Questions? Email SignalOpsAI anytime.
        </section>
      </div>
    </>
  );
}
