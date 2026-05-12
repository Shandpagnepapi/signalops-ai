import type { CSSProperties } from "react";
import { BadgeCheck } from "lucide-react";
import {
  FloatingBadge,
  GlassPanel,
  GlowButton
} from "@/components/site/visual-system";
import { PRODUCT_FULL_NAME } from "@/lib/constants";
import { visualThemes } from "@/lib/visual-themes";
import { EnvoOrbVisual } from "./envo-orb-visual";

const theme = visualThemes.envoWarm;

export function EnvoHero() {
  return (
    <section className="premium-section min-h-[calc(100vh-6rem)]">
      <div className="absolute inset-0 bg-[image:var(--vs-page-gradient)]" style={{ "--vs-page-gradient": theme.gradients.page } as CSSProperties} />
      <div className="ambient-grid absolute inset-0 opacity-[0.12]" />
      <div className="gradient-noise absolute inset-0 opacity-[0.14]" />
      <div className="relative mx-auto max-w-[1450px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <GlassPanel className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:p-8" theme={theme}>
          <div className="py-4 lg:py-8">
            <FloatingBadge icon={BadgeCheck} theme={theme}>{PRODUCT_FULL_NAME}</FloatingBadge>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Meet Envo, your AI Lead Manager.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--vs-muted)] sm:text-xl">
              Envo answers leads instantly, asks the right intake questions, follows up automatically, and hands off
              to your team when it&apos;s time.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62">
              Built for AI lead response, AI appointment booking, automated lead follow-up, missed lead recovery, and
              local business lead automation without pretending every edge case should be handled by software.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex">
              <GlowButton className="w-full !px-3 sm:w-auto" href="/preview" theme={theme}>
                Preview Envo
              </GlowButton>
              <GlowButton className="w-full !px-3 sm:w-auto" href="/demo" icon={false} theme={theme}>
                View Demo
              </GlowButton>
            </div>
          </div>

          <EnvoOrbVisual />
        </GlassPanel>
      </div>
    </section>
  );
}
