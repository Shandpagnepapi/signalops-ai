import type { CSSProperties } from "react";
import { AmbientBackground } from "@/components/site/visual-system";
import { visualThemes } from "@/lib/visual-themes";
import { EnvoFinalCta } from "./envo-final-cta";
import { EnvoGuardrails } from "./envo-guardrails";
import { EnvoHero } from "./envo-hero";
import { EnvoLeadSources } from "./envo-lead-sources";
import { EnvoOwnerTriage } from "./envo-owner-triage";
import { EnvoPricing } from "./envo-pricing";
import { EnvoWhatEnvoDoes } from "./envo-what-envo-does";

const theme = visualThemes.envoWarm;
const themeStyle = {
  "--vs-bg": theme.colors.base,
  "--vs-bg-alt": theme.colors.baseAlt,
  "--vs-surface": theme.colors.surface,
  "--vs-surface-strong": theme.colors.surfaceStrong,
  "--vs-border": theme.colors.border,
  "--vs-text": theme.colors.text,
  "--vs-muted": theme.colors.muted,
  "--vs-accent": theme.colors.accent,
  "--vs-accent-2": theme.colors.accent2,
  "--vs-accent-3": theme.colors.accent3,
  "--vs-glow": theme.colors.glow,
  "--vs-glow-2": theme.colors.glow2,
  "--vs-success": theme.colors.success,
  "--vs-warning": theme.colors.warning,
  "--vs-page-gradient": theme.gradients.page,
  "--vs-panel-gradient": theme.gradients.panel,
  "--vs-button-gradient": theme.gradients.button,
  "--vs-border-gradient": theme.gradients.border,
  "--vs-orb-gradient": theme.gradients.orb,
  "--vs-spotlight-gradient": theme.gradients.spotlight
} as CSSProperties;

export function EnvoPage() {
  return (
    <main className="overflow-hidden bg-[#05030a] text-white" style={themeStyle}>
      <div className="relative">
        <AmbientBackground intensity="quiet" theme={theme} />
        <EnvoHero />
        <EnvoLeadSources />
        <EnvoWhatEnvoDoes />
        <EnvoOwnerTriage />
        <EnvoGuardrails />
        <EnvoPricing />
        <EnvoFinalCta />
      </div>
    </main>
  );
}
