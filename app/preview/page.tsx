import {
  EnvoAssetImage,
  EnvoCtaButton,
  EnvoFeaturePill,
  EnvoGlassCard,
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
          <div className="py-2 lg:py-6">
            <EnvoGlassCard className="mx-auto max-w-6xl overflow-hidden bg-white/84 p-3 sm:p-4">
              <EnvoAssetImage
                asset="previewCockpit"
                alt="Envo preview cockpit with Lead Map, Envo Build Plan, and Next Steps."
                className="rounded-[1.45rem]"
                priority
                sizes="(min-width: 1024px) 1080px, 100vw"
              />
            </EnvoGlassCard>
            <EnvoGlassCard className="mx-auto mt-7 max-w-6xl bg-white/84 p-5 sm:p-7 lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
                <EnvoFeaturePill className="w-fit">Envo Preview</EnvoFeaturePill>
                <div>
                  <h1 className="max-w-4xl text-[2.45rem] font-black leading-[0.98] tracking-normal text-[#071126] sm:text-6xl lg:text-7xl">
                    Preview Envo for your business.
                  </h1>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-[#647084] sm:text-xl">
                    {previewDescription}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <EnvoCtaButton href="#preview-form">Preview Envo</EnvoCtaButton>
                    <EnvoCtaButton href={SECONDARY_CTA.href} variant="secondary">
                      {SECONDARY_CTA.label}
                    </EnvoCtaButton>
                  </div>
                </div>
              </div>
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
