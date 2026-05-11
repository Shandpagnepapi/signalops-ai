import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function OSFlowStep({
  active = false,
  complete = false,
  icon: Icon,
  label,
  tone = "emerald"
}: {
  active?: boolean;
  complete?: boolean;
  icon: LucideIcon;
  label: string;
  tone?: "emerald" | "sky" | "amber";
}) {
  const toneClass = {
    emerald: active
      ? "bg-emerald-300 text-slate-950 shadow-emerald-300/20"
      : complete
        ? "border border-emerald-300/30 bg-emerald-300/16 text-emerald-50"
        : "border border-emerald-300/18 bg-emerald-300/10 text-emerald-100",
    sky: active
      ? "bg-sky-300 text-slate-950 shadow-sky-300/20"
      : complete
        ? "border border-sky-300/30 bg-sky-300/16 text-sky-50"
        : "border border-sky-300/18 bg-sky-300/10 text-sky-100",
    amber: active
      ? "bg-amber-300 text-slate-950 shadow-amber-300/20"
      : complete
        ? "border border-amber-300/30 bg-amber-300/16 text-amber-50"
        : "border border-amber-300/18 bg-amber-300/10 text-amber-100"
  }[tone];

  return (
    <div className="relative grid justify-items-center gap-2 text-center">
      <div className={cn("flex size-8 items-center justify-center rounded-2xl shadow-lg ring-1 ring-white/10", toneClass)}>
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <p className="text-[0.62rem] font-black uppercase leading-3 text-white/58">{label}</p>
    </div>
  );
}
