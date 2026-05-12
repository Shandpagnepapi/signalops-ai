import {
  GlassPanel,
  GlowButton
} from "@/components/site/visual-system";
import { visualThemes } from "@/lib/visual-themes";

const theme = visualThemes.envoWarm;

export function EnvoFinalCta() {
  return (
    <section className="premium-section">
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <GlassPanel className="p-6 text-center sm:p-8 lg:p-10" theme={theme}>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[color:var(--vs-accent-3)]">Flagship AI worker</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-normal text-white sm:text-5xl">
            Ready to put Envo to work?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
            Preview how Envo could answer, qualify, follow up, route, and hand off leads inside your business.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:justify-center">
            <GlowButton className="w-full !px-3 sm:w-auto" href="/preview" theme={theme}>
              Preview Envo
            </GlowButton>
            <GlowButton className="w-full !px-3 sm:w-auto" href="/demo" icon={false} theme={theme}>
              View Demo
            </GlowButton>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
