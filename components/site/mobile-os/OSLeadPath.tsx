import type { LucideIcon } from "lucide-react";
import { OSFlowStep } from "@/components/site/mobile-os/OSFlowStep";
import { cn } from "@/lib/utils";

type Tone = "emerald" | "sky" | "amber";

type OSLeadPathStep = {
  icon: LucideIcon;
  label: string;
};

const connectorClass: Record<Tone, string> = {
  amber: "from-amber-300/70 via-amber-200/35 to-white/8",
  emerald: "from-emerald-300/65 via-teal-200/30 to-white/8",
  sky: "from-sky-300/70 via-cyan-200/35 to-white/8"
};

const badgeClass: Record<Tone, string> = {
  amber: "border-amber-300/24 bg-amber-300/10 text-amber-100",
  emerald: "border-emerald-300/24 bg-emerald-300/10 text-emerald-100",
  sky: "border-sky-300/24 bg-sky-300/10 text-sky-100"
};

export function OSLeadPath({
  activeIndex,
  steps,
  tone
}: {
  activeIndex: number;
  steps: OSLeadPathStep[];
  tone: Tone;
}) {
  return (
    <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.055] p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[0.65rem] font-black uppercase tracking-wide text-white/42">See the lead path</p>
        <span className={cn("rounded-full border px-2.5 py-1 text-[0.62rem] font-black", badgeClass[tone])}>
          Live flow
        </span>
      </div>
      <div className="relative grid grid-cols-5 gap-1.5">
        <div
          className={cn(
            "absolute left-[1.35rem] right-[1.35rem] top-4 h-px rounded-full bg-gradient-to-r",
            connectorClass[tone]
          )}
        />
        {steps.map((step, index) => (
          <div key={step.label} className="relative z-10">
            <OSFlowStep
              active={index === activeIndex}
              complete={index < activeIndex}
              icon={step.icon}
              label={step.label}
              tone={tone}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
