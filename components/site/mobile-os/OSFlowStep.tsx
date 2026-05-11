import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function OSFlowStep({
  active = false,
  icon: Icon,
  label,
  tone = "emerald"
}: {
  active?: boolean;
  icon: LucideIcon;
  label: string;
  tone?: "emerald" | "sky" | "amber";
}) {
  const toneClass = {
    emerald: active ? "bg-emerald-300 text-slate-950" : "bg-emerald-300/12 text-emerald-100",
    sky: active ? "bg-sky-300 text-slate-950" : "bg-sky-300/12 text-sky-100",
    amber: active ? "bg-amber-300 text-slate-950" : "bg-amber-300/12 text-amber-100"
  }[tone];

  return (
    <div className="relative grid justify-items-center gap-2 text-center">
      <div className={cn("flex size-8 items-center justify-center rounded-2xl shadow-sm", toneClass)}>
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <p className="text-[0.62rem] font-black uppercase leading-3 text-white/58">{label}</p>
    </div>
  );
}
