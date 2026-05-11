import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { BellRing, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Accent = "emerald" | "pink" | "amber" | "sky" | "lime";

const accentClasses: Record<Accent, { text: string; border: string; bg: string; glow: string; fill: string }> = {
  amber: {
    bg: "bg-amber-300/10",
    border: "border-amber-300/22",
    fill: "bg-amber-300 text-slate-950",
    glow: "shadow-amber-950/18",
    text: "text-amber-100"
  },
  emerald: {
    bg: "bg-emerald-300/10",
    border: "border-emerald-300/22",
    fill: "bg-emerald-300 text-slate-950",
    glow: "shadow-emerald-950/18",
    text: "text-emerald-100"
  },
  lime: {
    bg: "bg-lime-300/10",
    border: "border-lime-300/22",
    fill: "bg-lime-300 text-slate-950",
    glow: "shadow-lime-950/18",
    text: "text-lime-100"
  },
  pink: {
    bg: "bg-[#ff6f9c]/12",
    border: "border-[#ff9ec0]/24",
    fill: "bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] text-white",
    glow: "shadow-pink-950/20",
    text: "text-[#ffd7e6]"
  },
  sky: {
    bg: "bg-sky-300/10",
    border: "border-sky-300/22",
    fill: "bg-sky-300 text-slate-950",
    glow: "shadow-sky-950/18",
    text: "text-sky-100"
  }
};

export function ProductFrame({
  accent = "pink",
  children,
  className,
  eyebrow,
  title
}: {
  accent?: Accent;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
}) {
  const accentClass = accentClasses[accent];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.65rem] border border-white/12 bg-[#090e18]/86 p-4 shadow-2xl shadow-black/24 backdrop-blur-2xl",
        className
      )}
    >
      <div
        className={cn("absolute inset-x-0 top-0 h-px", accentClass.fill)}
        aria-hidden="true"
      />
      <div
        className={cn("pointer-events-none absolute -right-16 -top-24 size-56 rounded-full blur-3xl", accentClass.bg)}
        aria-hidden="true"
      />
      {(eyebrow || title) ? (
        <div className="relative mb-4 flex items-start justify-between gap-4">
          <div>
            {eyebrow ? (
              <p className={cn("text-xs font-semibold uppercase tracking-[0.16em]", accentClass.text)}>
                {eyebrow}
              </p>
            ) : null}
            {title ? <h3 className="mt-2 text-2xl font-semibold tracking-normal text-white">{title}</h3> : null}
          </div>
          <div className={cn("mt-1 size-2 rounded-full shadow-[0_0_22px_currentColor]", accentClass.text)} />
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}

export function CommandCard({
  accent = "pink",
  children,
  className
}: {
  accent?: Accent;
  children: ReactNode;
  className?: string;
}) {
  const accentClass = accentClasses[accent];

  return (
    <div
      className={cn(
        "rounded-2xl border bg-white/[0.045] p-4 shadow-xl backdrop-blur-xl",
        accentClass.border,
        accentClass.glow,
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatusPill({
  accent = "emerald",
  children,
  className
}: {
  accent?: Accent;
  children: ReactNode;
  className?: string;
}) {
  const accentClass = accentClasses[accent];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-wide",
        accentClass.bg,
        accentClass.border,
        accentClass.text,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", accentClass.fill)} aria-hidden="true" />
      {children}
    </span>
  );
}

export function MetricTile({
  accent = "pink",
  className,
  label,
  value
}: {
  accent?: Accent;
  className?: string;
  label: string;
  value: string;
}) {
  const accentClass = accentClasses[accent];

  return (
    <div className={cn("rounded-2xl border border-white/10 bg-white/[0.045] p-4", className)}>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/42">{label}</p>
      <p className={cn("mt-2 text-2xl font-semibold tracking-normal text-white", accentClass.text)}>{value}</p>
    </div>
  );
}

export function MessageBubble({
  children,
  label,
  tone = "system"
}: {
  children: ReactNode;
  label: string;
  tone?: "customer" | "system" | "owner";
}) {
  return (
    <div
      className={cn(
        "max-w-[92%] rounded-3xl p-3 text-sm leading-6",
        tone === "customer" && "ml-auto bg-white text-slate-950",
        tone === "system" && "mr-auto border border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
        tone === "owner" && "mr-auto border border-amber-300/20 bg-amber-300/10 text-amber-50"
      )}
    >
      <p className={cn("text-[0.62rem] font-black uppercase", tone === "customer" ? "text-slate-500" : "text-current/70")}>
        {label}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function OwnerAlertCard({
  action,
  className,
  title = "Owner alert",
  tone = "amber"
}: {
  action: string;
  className?: string;
  title?: string;
  tone?: Accent;
}) {
  const accentClass = accentClasses[tone];

  return (
    <CommandCard accent={tone} className={cn("bg-white/[0.055]", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={cn("text-xs font-semibold uppercase tracking-[0.14em]", accentClass.text)}>{title}</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-white">{action}</p>
        </div>
        <BellRing className={cn("size-5 shrink-0", accentClass.text)} aria-hidden="true" />
      </div>
    </CommandCard>
  );
}

export function HandoffTimeline({
  activeIndex,
  steps,
  tone = "emerald"
}: {
  activeIndex?: number;
  steps: Array<{ icon: LucideIcon; label: string }>;
  tone?: Accent;
}) {
  const accentClass = accentClasses[tone];
  const active = activeIndex ?? steps.length - 1;

  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index <= active;

        return (
          <div key={step.label} className="relative flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/45 p-2.5">
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-2xl",
                isActive ? accentClass.fill : "bg-white/8 text-white/46"
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.6rem] font-black uppercase tracking-wide text-white/32">
                0{index + 1}
              </p>
              <p className="text-xs font-black leading-4 text-white/74">{step.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SystemPreviewCard({
  accent = "pink",
  copy,
  icon: Icon,
  title
}: {
  accent?: Accent;
  copy: string;
  icon: LucideIcon;
  title: string;
}) {
  const accentClass = accentClasses[accent];

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <div className={cn("mb-4 flex size-11 items-center justify-center rounded-2xl shadow-lg", accentClass.fill)}>
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold tracking-normal text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#ead0df]/72">{copy}</p>
    </article>
  );
}

export function SignalOpsCommandLayer({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const steps = [
    "Incoming",
    "Response",
    "Details",
    "Priority",
    "Handoff",
    "Follow-up"
  ];

  return (
    <ProductFrame
      accent="lime"
      className={className}
      eyebrow="SignalOps Command Layer"
      title={compact ? "Incoming to handoff, one layer." : "One operating layer from lead to next action."}
    >
      <div className={cn("grid gap-4", compact ? "" : "lg:grid-cols-[1.05fr_0.95fr]")}>
        <div className={cn("rounded-3xl border border-white/10 bg-white/[0.045]", compact ? "p-3" : "p-4")}>
          <div className={cn("grid gap-2", compact ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-3")}>
            {steps.map((step, index) => (
              <div
                key={step}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/52",
                  compact ? "p-2.5" : "p-3"
                )}
              >
                <div className={cn("flex items-center justify-between gap-2", compact ? "mb-2" : "mb-3")}>
                  <span className="text-[0.62rem] font-black uppercase tracking-wide text-white/34">
                    0{index + 1}
                  </span>
                  <CheckCircle2 className="size-3.5 text-lime-300" aria-hidden="true" />
                </div>
                <p className={cn("font-semibold text-white", compact ? "text-xs" : "text-sm")}>{step}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#37f0bd,#dfff5f)]"
                    style={{ width: `${Math.min(100, 35 + index * 11)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cn("grid gap-3", compact ? "grid-cols-[0.85fr_1.15fr]" : "")}>
          <MetricTile accent="lime" label="Avg response" value="4.3s" />
          <OwnerAlertCard
            tone="lime"
            title="Priority view"
            action="Fleet quote has account details pending, owner alert ready, and follow-up queued."
          />
          <StatusPill accent="lime" className={compact ? "col-span-2 w-fit" : "w-fit"}>
            Dashboard updated
          </StatusPill>
        </div>
      </div>
    </ProductFrame>
  );
}
