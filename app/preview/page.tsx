import {
  EnvoBrandBoard,
  EnvoCtaButton,
  EnvoFeaturePill,
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

            <EnvoBrandBoard compact showVariations={false} />
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
