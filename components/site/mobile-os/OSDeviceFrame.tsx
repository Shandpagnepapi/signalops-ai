import type { ReactNode } from "react";
import { BellRing, ClipboardList, Gauge, RefreshCcw, Route, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type OSAccent = "emerald" | "sky" | "amber";

const accentStyles: Record<OSAccent, { border: string; fill: string; glow: string; soft: string; text: string }> = {
  amber: {
    border: "border-amber-300/18",
    fill: "bg-amber-300 text-slate-950",
    glow: "radial-gradient(circle at 55% -6%, rgba(251,191,36,0.25), transparent 9rem)",
    soft: "bg-amber-300/10",
    text: "text-amber-200"
  },
  emerald: {
    border: "border-emerald-300/18",
    fill: "bg-emerald-300 text-slate-950",
    glow: "radial-gradient(circle at 8% 0%, rgba(52,211,153,0.24), transparent 9rem)",
    soft: "bg-emerald-300/10",
    text: "text-emerald-200"
  },
  sky: {
    border: "border-sky-300/18",
    fill: "bg-sky-300 text-slate-950",
    glow: "radial-gradient(circle at 90% 0%, rgba(125,211,252,0.24), transparent 9rem)",
    soft: "bg-sky-300/10",
    text: "text-sky-200"
  }
};

const coreSteps = [
  { label: "Reply", icon: Zap },
  { label: "Intake", icon: ClipboardList },
  { label: "Priority", icon: Gauge },
  { label: "Handoff", icon: Route },
  { label: "Follow-up", icon: RefreshCcw }
];

export function OSDeviceFrame({
  accent = "emerald",
  children,
  className,
  eyebrow,
  title
}: {
  accent?: OSAccent;
  children: ReactNode;
  className?: string;
  eyebrow: string;
  title: string;
}) {
  const style = accentStyles[accent];

  return (
    <div
      className={cn("relative overflow-hidden rounded-[1.85rem] border bg-slate-950 shadow-2xl shadow-black/30", style.border, style.text, className)}
      style={{ backgroundImage: style.glow }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.045] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-red-300/85" />
          <span className="size-2 rounded-full bg-amber-300/85" />
          <span className="size-2 rounded-full bg-emerald-300/85" />
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("size-1.5 rounded-full shadow-[0_0_16px_currentColor]", style.text)} />
          <p className="text-[0.62rem] font-black uppercase tracking-wide text-white/38">{eyebrow}</p>
        </div>
      </div>
      <div className="relative p-4">
        <h3 className="text-xl font-black leading-tight tracking-normal text-white">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function OSCorePipeline({ accent = "emerald" }: { accent?: OSAccent }) {
  const style = accentStyles[accent];

  return (
    <div className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[0.62rem] font-black uppercase tracking-wide text-white/40">SignalOps OS Core</p>
        <span className={cn("rounded-full px-2.5 py-1 text-[0.6rem] font-black", style.soft, style.text)}>
          Connected
        </span>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {coreSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.label} className="relative rounded-2xl border border-white/10 bg-slate-950/56 p-2 text-center">
              {index > 0 ? (
                <span className="absolute -left-1 top-1/2 h-px w-2 -translate-y-1/2 bg-white/20" aria-hidden="true" />
              ) : null}
              <div className={cn("mx-auto flex size-7 items-center justify-center rounded-2xl", index <= 3 ? style.fill : "bg-white/10 text-white/48")}>
                <Icon className="size-3.5" aria-hidden="true" />
              </div>
              <p className="mt-1.5 text-[0.55rem] font-black leading-3 text-white/68">{step.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function OSOwnerModeBar({
  accent = "emerald",
  detail,
  title
}: {
  accent?: OSAccent;
  detail: string;
  title: string;
}) {
  const style = accentStyles[accent];

  return (
    <div className={cn("mt-3 flex items-center gap-2 rounded-3xl border p-3", style.border, style.soft)}>
      <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-2xl", style.fill)}>
        <BellRing className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-black text-white">{title}</p>
        <p className="truncate text-xs leading-5 text-white/60">{detail}</p>
      </div>
    </div>
  );
}
