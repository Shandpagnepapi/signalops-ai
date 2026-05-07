import { ArrowRight, PlayCircle } from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

type StickyTone = "dark" | "light" | "electric";

const stickyTone = {
  dark: {
    wrap: "border-white/10 bg-[#080b0d]/90",
    primary: "bg-[#69e6bd] text-[#07100d] hover:bg-[#8bf2ce]",
    demo: "border-white/12 bg-white/[0.08] text-white hover:bg-white/14"
  },
  light: {
    wrap: "border-[#17202a]/10 bg-[#fbf7ef]/95",
    primary: "border border-[#0f766e]/20 bg-[#dff8f2] text-[#0f4f49] hover:bg-[#c8f2e9]",
    demo: "border-[#17202a]/12 bg-white text-[#17202a] hover:bg-[#eff5f3]"
  },
  electric: {
    wrap: "border-white/12 bg-[#101010]/95",
    primary: "bg-[#e6ff5b] text-[#111111] hover:bg-[#f1ff8f]",
    demo: "border-white/12 bg-white/[0.08] text-white hover:bg-white/14"
  }
} satisfies Record<
  StickyTone,
  {
    wrap: string;
    primary: string;
    demo: string;
  }
>;

export function MobileStickyCTA({
  className,
  label = PRIMARY_CTA.label,
  source,
  tone = "dark"
}: {
  className?: string;
  label?: string;
  source: string;
  tone?: StickyTone;
}) {
  const styles = stickyTone[tone];

  return (
    <div className={cn("fixed inset-x-0 bottom-0 z-50 border-t px-3 py-3 backdrop-blur-xl md:hidden", styles.wrap, className)}>
      <div className="mx-auto grid max-w-md grid-cols-[1fr_3.25rem] gap-2">
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: source }}
          className={cn(
            "inline-flex h-12 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition",
            styles.primary
          )}
        >
          {label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
        <TrackedLink
          href="/demo"
          eventName={ANALYTICS_EVENTS.demoViewed}
          eventProperties={{ location: `${source}_sticky_demo` }}
          aria-label="View SignalOps demo"
          className={cn(
            "inline-flex h-12 items-center justify-center rounded-lg border transition",
            styles.demo
          )}
        >
          <PlayCircle className="size-5" aria-hidden="true" />
        </TrackedLink>
      </div>
    </div>
  );
}
