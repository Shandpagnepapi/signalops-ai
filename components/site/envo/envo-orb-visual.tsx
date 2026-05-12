import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  ClipboardCheck,
  MessageSquareText,
  RefreshCcw
} from "lucide-react";
import { GlassCard } from "@/components/site/visual-system";
import { visualThemes } from "@/lib/visual-themes";
import { cn } from "@/lib/utils";

const theme = visualThemes.envoWarm;

const orbActions = [
  {
    copy: "New inquiry gets a useful first reply while intent is hot.",
    icon: MessageSquareText,
    label: "Answers instantly"
  },
  {
    copy: "Envo asks for timing, scope, location, photos, and missing details.",
    icon: ClipboardCheck,
    label: "Asks smart questions"
  },
  {
    copy: "Quiet leads get thoughtful nudges instead of disappearing.",
    icon: RefreshCcw,
    label: "Follows up automatically"
  },
  {
    copy: "Your team gets the context, status, and recommended next action.",
    icon: BellRing,
    label: "Hands off to humans"
  }
] satisfies Array<{ copy: string; icon: LucideIcon; label: string }>;

export function EnvoOrbVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "floating-layer relative min-h-[34rem] overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/24 p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl",
        className
      )}
      style={{
        "--vs-border": theme.colors.border,
        "--vs-accent-3": theme.colors.accent3,
        "--vs-glow": theme.colors.glow,
        "--vs-muted": theme.colors.muted,
        "--vs-button-gradient": theme.gradients.button,
        "--vs-orb-gradient": theme.gradients.orb,
        "--vs-spotlight-gradient": theme.gradients.spotlight
      } as CSSProperties}
    >
      <div className="absolute inset-0 bg-[image:var(--vs-spotlight-gradient)]" />
      <div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--vs-border)] bg-[image:var(--vs-orb-gradient)] shadow-[0_0_110px_var(--vs-glow)] sm:size-56" />
      <div className="absolute left-1/2 top-1/2 size-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:size-80" />
      <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] sm:size-[26rem]" />
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="bg-[image:var(--vs-button-gradient)] bg-clip-text text-5xl font-black text-transparent sm:text-7xl">
          envo
        </p>
        <p className="mt-2 text-[0.65rem] font-black uppercase tracking-[0.28em] text-white/58">AI Lead Core</p>
      </div>

      <div className="relative z-20 grid min-h-[32rem] gap-3 sm:grid-cols-2">
        {orbActions.map((action, index) => {
          const Icon = action.icon;

          return (
            <GlassCard
              key={action.label}
              className={cn(
                "w-full max-w-[15.5rem] p-3",
                index === 0 && "self-start justify-self-start",
                index === 1 && "self-center justify-self-end",
                index === 2 && "self-center justify-self-start",
                index === 3 && "self-end justify-self-end"
              )}
              theme={theme}
            >
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--vs-button-gradient)] text-white">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-black text-white">{action.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-[color:var(--vs-muted)]">{action.copy}</span>
                </span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
