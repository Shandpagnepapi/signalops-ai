import {
  EnvoAppIcon,
  EnvoDarkCard,
  EnvoFeatureStack,
  EnvoGlassCard,
  EnvoLogo,
  EnvoSection,
  envoBrandTokens
} from "@/components/site/envo/envo-brand";
import { cn } from "@/lib/utils";

const logoVariationCards = [
  {
    label: "White",
    className: "border-[#D8E2F7] bg-white",
    logoTone: "light"
  },
  {
    label: "Lavender",
    className: "border-[#D8E2F7] bg-[#EEEAFE]",
    logoTone: "light"
  },
  {
    label: "Navy",
    className: "border-[#17264A] bg-[#071126]",
    logoTone: "dark"
  },
  {
    label: "Black",
    className: "border-black bg-black",
    logoTone: "dark"
  }
] as const;

export function EnvoMiniBrandBoard({ className }: { className?: string }) {
  return (
    <EnvoSection className={cn("border-y border-[#D8E2F7] bg-[#FBFAF7]", className)}>
      <div className="mx-auto max-w-6xl">
        <EnvoGlassCard className="p-5 sm:p-7">
          <div className="flex flex-col gap-3 border-b border-[#D8E2F7] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <EnvoLogo size="md" />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-[#2563EB]">
                RESPOND FASTER. AUTOMATE SMARTER.
              </p>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#647084]">
              Premium, friendly, glass-like identity for an AI employee built around busy businesses.
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[0.72fr_1.04fr_1.04fr]">
            <EnvoGlassCard className="flex min-h-[17rem] items-center justify-center bg-[#F8FAFF]/82 p-8">
              <EnvoAppIcon className="w-full max-w-[12rem]" />
            </EnvoGlassCard>

            <EnvoDarkCard className="flex min-h-[17rem] flex-col justify-between p-6">
              <EnvoLogo size="md" tone="dark" />
              <div>
                <p className="text-4xl font-black leading-tight tracking-normal text-white">
                  Smarter conversations.
                  <br />
                  Stronger connections.
                </p>
                <div className="mt-5 h-1.5 w-24 rounded-full bg-[linear-gradient(90deg,#328BFF,#6F4DFF)]" />
              </div>
            </EnvoDarkCard>

            <EnvoFeatureStack />
          </div>

          <div className="mt-5 grid gap-3 border-t border-[#D8E2F7] pt-5 sm:grid-cols-2 lg:grid-cols-4">
            {logoVariationCards.map((card) => (
              <div
                key={card.label}
                className={cn("rounded-[1.2rem] border p-4 shadow-sm", card.className)}
              >
                <EnvoLogo size="sm" tone={card.logoTone} />
                <p
                  className={cn(
                    "mt-4 text-xs font-black uppercase tracking-[0.16em]",
                    card.logoTone === "dark" ? "text-white/58" : "text-[#647084]"
                  )}
                >
                  {card.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {Object.entries(envoBrandTokens).map(([name, color]) => (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-[#D8E2F7] bg-white/72 px-3 py-2 text-xs font-bold text-[#647084]"
              >
                <span className="size-3 rounded-full border border-black/8" style={{ backgroundColor: color }} />
                {name}
              </span>
            ))}
          </div>
        </EnvoGlassCard>
      </div>
    </EnvoSection>
  );
}

export {
  EnvoAppIcon,
  EnvoBrandHero,
  EnvoCtaButton,
  EnvoDarkCard,
  EnvoFeaturePill,
  EnvoFeatureStack,
  EnvoGlassCard,
  EnvoLogo,
  EnvoMark,
  EnvoSection,
  EnvoWordmark,
  envoBrandTokens,
  envoFeatureItems
} from "@/components/site/envo/envo-brand";
