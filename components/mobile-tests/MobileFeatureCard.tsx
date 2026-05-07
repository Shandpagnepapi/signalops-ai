import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureTone = "dark" | "light" | "electric";

const featureTone = {
  dark: {
    card: "border-white/10 bg-white/[0.055] text-white",
    icon: "bg-[#69e6bd]/14 text-[#9df5d8]",
    result: "border-[#69e6bd]/20 bg-[#69e6bd]/10 text-[#caffec]"
  },
  light: {
    card: "border-[#17202a]/10 bg-white text-[#17202a]",
    icon: "bg-[#e4fbf5] text-[#0f766e]",
    result: "border-[#0f766e]/18 bg-[#e4fbf5] text-[#0f4f49]"
  },
  electric: {
    card: "border-white/12 bg-white/[0.06] text-white",
    icon: "bg-[#e6ff5b]/14 text-[#f6ffc2]",
    result: "border-[#e6ff5b]/22 bg-[#e6ff5b]/12 text-[#f6ffc2]"
  }
} satisfies Record<
  FeatureTone,
  {
    card: string;
    icon: string;
    result: string;
  }
>;

export function MobileFeatureCard({
  className,
  description,
  icon: Icon,
  result,
  title,
  tone = "dark"
}: {
  className?: string;
  description: string;
  icon: LucideIcon;
  result?: string;
  title: string;
  tone?: FeatureTone;
}) {
  const styles = featureTone[tone];

  return (
    <article className={cn("rounded-lg border p-4 shadow-xl", styles.card, className)}>
      <div className="flex items-start gap-3">
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-md", styles.icon)}>
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-5 tracking-normal">{title}</h3>
          <p className="mt-2 text-sm leading-6 opacity-70">{description}</p>
        </div>
      </div>
      {result ? (
        <div className={cn("mt-4 rounded-md border px-3 py-2 text-xs font-bold", styles.result)}>
          {result}
        </div>
      ) : null}
    </article>
  );
}
