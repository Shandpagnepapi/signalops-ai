import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function OSMetricPill({
  className,
  icon: Icon,
  label,
  value
}: {
  className?: string;
  icon?: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-2.5 py-1.5", className)}>
      {Icon ? <Icon className="size-3.5 shrink-0" aria-hidden="true" /> : null}
      <span className="text-[0.64rem] font-black uppercase tracking-wide text-white/45">{label}</span>
      <span className="text-[0.72rem] font-black text-white">{value}</span>
    </div>
  );
}
