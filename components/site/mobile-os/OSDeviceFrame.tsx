import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function OSDeviceFrame({
  accent = "emerald",
  children,
  className,
  eyebrow,
  title
}: {
  accent?: "emerald" | "sky" | "amber";
  children: ReactNode;
  className?: string;
  eyebrow: string;
  title: string;
}) {
  const accentClass = {
    emerald: "text-emerald-200 border-emerald-300/18",
    sky: "text-sky-200 border-sky-300/18",
    amber: "text-amber-200 border-amber-300/18"
  }[accent];

  const glow = {
    emerald: "radial-gradient(circle at 8% 0%, rgba(52,211,153,0.24), transparent 9rem)",
    sky: "radial-gradient(circle at 90% 0%, rgba(125,211,252,0.24), transparent 9rem)",
    amber: "radial-gradient(circle at 55% -6%, rgba(251,191,36,0.25), transparent 9rem)"
  }[accent];

  return (
    <div
      className={cn("overflow-hidden rounded-[1.85rem] border bg-slate-950 shadow-2xl shadow-black/30", accentClass, className)}
      style={{ backgroundImage: glow }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.045] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-red-300/85" />
          <span className="size-2 rounded-full bg-amber-300/85" />
          <span className="size-2 rounded-full bg-emerald-300/85" />
        </div>
        <p className="text-[0.62rem] font-black uppercase tracking-wide text-white/38">{eyebrow}</p>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-black leading-tight tracking-normal text-white">{title}</h3>
        {children}
      </div>
    </div>
  );
}
