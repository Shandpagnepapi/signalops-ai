import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  Mail,
  MessageSquareText,
  PhoneCall,
  RefreshCcw,
  Route,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const artifactCards = [
  {
    title: "Preview Report",
    label: "Report",
    copy: "Lead flow findings, bottlenecks, and the recommended response system.",
    icon: FileText
  },
  {
    title: "Proposal Draft",
    label: "Scope",
    copy: "Package fit, build scope, and the next steps for implementation.",
    icon: ClipboardList
  },
  {
    title: "Email Draft",
    label: "Review",
    copy: "A customer-facing draft that waits for internal approval.",
    icon: Mail
  }
];

const journeyConversation = [
  {
    speaker: "Customer",
    tone: "customer",
    text: "Can you quote mobile repair for two damaged wheels?"
  },
  {
    speaker: "SignalOps AI",
    tone: "ai",
    text: "Yes. Send photos, vehicle details, and your preferred appointment window."
  },
  {
    speaker: "Owner alert",
    tone: "system",
    text: "Warm quote request. Needs photos. Suggested action is ready."
  }
] satisfies Array<{
  speaker: string;
  tone: "customer" | "ai" | "system";
  text: string;
}>;

const journeyFields = [
  ["Service", "Curb rash repair"],
  ["Intent", "Quote request"],
  ["Needs", "Photos + mobile window"],
  ["Priority", "Warm / high intent"]
];

const journeyTimeline = [
  { title: "Captured", icon: MessageSquareText },
  { title: "Qualified", icon: ClipboardList },
  { title: "Routed", icon: Route },
  { title: "Follow-up", icon: RefreshCcw },
  { title: "Booking", icon: CalendarCheck2 }
];

const beforeItems = [
  { title: "Missed calls", icon: PhoneCall },
  { title: "Slow replies", icon: Clock3 },
  { title: "Scattered notes", icon: ClipboardList },
  { title: "No follow-up", icon: XCircle },
  { title: "Leads go cold", icon: RefreshCcw }
];

const afterItems = [
  { title: "Instant response", icon: CheckCircle2 },
  { title: "Structured intake", icon: ClipboardList },
  { title: "Owner alerts", icon: BellRing },
  { title: "Follow-up automation", icon: RefreshCcw },
  { title: "Clean booking handoff", icon: CalendarCheck2 }
];

export function PreviewArtifactShowcase({ className = "" }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[1.55rem] border border-white/14 bg-white/[0.075] p-4 shadow-2xl shadow-black/24 backdrop-blur-2xl", className)}>
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#37f0bd,#ffb36d,transparent)]" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#37f0bd]">Free Preview package</p>
          <p className="mt-2 text-xl font-semibold tracking-normal text-white">Three draft artifacts, one review path.</p>
        </div>
        <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
          Needs Review
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {artifactCards.map((artifact, index) => (
          <ArtifactCard key={artifact.title} index={index} {...artifact} />
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
        <p className="flex gap-2 text-sm font-semibold text-emerald-100">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Draft-first by default. Nothing is emailed until it is reviewed.
        </p>
      </div>
    </div>
  );
}

export function LeadJourneyVisual({ className = "" }: { className?: string }) {
  return (
    <div className={cn("rounded-[1.55rem] border border-white/14 bg-[#0a0f18]/82 p-4 shadow-2xl shadow-black/22", className)}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#37f0bd]">Lead journey</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-normal text-white">From inquiry to booking handoff.</h3>
        </div>
        <Sparkles className="size-6 text-[#f7ff73]" aria-hidden="true" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <p className="text-sm font-semibold text-white">AI receptionist</p>
            <span className="rounded-full bg-[#37f0bd]/12 px-2.5 py-1 text-[0.68rem] font-semibold text-[#cffff2]">
              4.3s reply
            </span>
          </div>
          <div className="mt-3 grid gap-3">
            {journeyConversation.map((message) => (
              <div
                key={message.text}
                className={cn(
                  "max-w-[88%] rounded-3xl p-3 text-sm leading-6",
                  message.tone === "customer" && "ml-auto bg-white text-[#071018]",
                  message.tone === "ai" && "mr-auto border border-[#37f0bd]/18 bg-[#37f0bd]/12 text-[#eafff8]",
                  message.tone === "system" && "mr-auto border border-[#f7ff73]/18 bg-[#f7ff73]/10 text-[#fbffad]"
                )}
              >
                <p className={cn("text-[0.66rem] font-black uppercase", message.tone === "customer" ? "text-[#071018]/52" : "text-current/70")}>
                  {message.speaker}
                </p>
                <p className="mt-1">{message.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#37f0bd]">Lead score card</p>
                <p className="mt-2 text-lg font-semibold text-white">Warm quote request</p>
              </div>
              <span className="rounded-2xl border border-[#f7ff73]/20 bg-[#f7ff73]/12 px-3 py-2 text-lg font-black text-[#fbffad]">
                86
              </span>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {journeyFields.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-[#071018]/48 p-3">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/42">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/48">Operating flow</p>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {journeyTimeline.map((step) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="text-center">
                    <div className="mx-auto flex size-9 items-center justify-center rounded-2xl bg-[#37f0bd]/12 text-[#37f0bd]">
                      <Icon className="size-4" aria-hidden="true" />
                    </div>
                    <p className="mt-2 text-[0.62rem] font-semibold uppercase leading-4 text-white/58">{step.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardSnapshot({ className = "" }: { className?: string }) {
  return (
    <div className={cn("rounded-[1.55rem] border border-white/14 bg-white/[0.075] p-4 shadow-2xl shadow-black/20 backdrop-blur-2xl", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Command snapshot</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-normal text-white">Example lead operating view.</h3>
        </div>
        <TrendingUp className="size-6 text-[#ffb36d]" aria-hidden="true" />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          ["New leads", "38"],
          ["Avg response", "4.3s"],
          ["Follow-ups", "19"]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-[#17122d]/62 p-3">
            <p className="text-xl font-semibold text-white">{value}</p>
            <p className="mt-1 text-[0.64rem] font-semibold uppercase leading-4 text-[#ead0df]/48">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-[#17122d]/62 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ead0df]/48">Lead sources</p>
          <div className="mt-4 grid gap-2">
            {[
              ["Website form", "42%", "w-[72%]"],
              ["Missed calls", "27%", "w-[48%]"],
              ["Instagram DMs", "18%", "w-[34%]"],
              ["Google profile", "13%", "w-[24%]"]
            ].map(([label, value, width]) => (
              <div key={label} className="grid grid-cols-[6.2rem_1fr_2.4rem] items-center gap-2 text-xs">
                <span className="text-[#ead0df]/62">{label}</span>
                <span className="h-2 overflow-hidden rounded-full bg-white/8">
                  <span className={cn("block h-full rounded-full bg-[linear-gradient(90deg,#37f0bd,#ffb36d)]", width)} />
                </span>
                <span className="text-right font-semibold text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#f7ff73]/18 bg-[#f7ff73]/10 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-[#fbffad]">
            <BellRing className="size-4" aria-hidden="true" />
            Owner alert
          </p>
          <p className="mt-3 text-sm leading-6 text-[#fffbd5]/76">
            High-intent quote request needs photos and a mobile appointment window.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Warm", "Needs photos", "Follow-up queued"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[0.65rem] font-semibold text-white/72">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfterFlow({ className = "" }: { className?: string }) {
  return (
    <div className={cn("rounded-[1.55rem] border border-white/14 bg-white/[0.065] p-4 shadow-2xl shadow-black/18", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#37f0bd]">Before / after</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-normal text-white">The business flow gets cleaner.</h3>
        </div>
        <Workflow className="size-6 text-[#37f0bd]" aria-hidden="true" />
      </div>
      <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        <FlowColumn title="Before SignalOps" tone="before" items={beforeItems} />
        <div className="hidden items-center justify-center lg:flex">
          <div className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.06]">
            <ArrowRight className="size-5 text-[#37f0bd]" aria-hidden="true" />
          </div>
        </div>
        <FlowColumn title="After SignalOps" tone="after" items={afterItems} />
      </div>
    </div>
  );
}

function ArtifactCard({
  copy,
  icon: Icon,
  index,
  label,
  title
}: {
  copy: string;
  icon: LucideIcon;
  index: number;
  label: string;
  title: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#17122d]/62 p-4">
      <div className="absolute right-3 top-3 text-5xl font-black leading-none text-white/[0.035]">0{index + 1}</div>
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)]">
            <Icon className="size-5 text-white" aria-hidden="true" />
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[0.65rem] font-semibold uppercase text-[#ead0df]/56">
            {label}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-normal text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#ead0df]/68">{copy}</p>
      </div>
    </article>
  );
}

function FlowColumn({
  items,
  title,
  tone
}: {
  items: Array<{ title: string; icon: LucideIcon }>;
  title: string;
  tone: "before" | "after";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        tone === "before"
          ? "border-red-300/14 bg-red-400/[0.055]"
          : "border-emerald-300/18 bg-emerald-300/[0.075]"
      )}
    >
      <p className={cn("text-sm font-semibold", tone === "before" ? "text-red-100" : "text-emerald-100")}>{title}</p>
      <div className="mt-3 grid gap-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.045] p-3">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-xl",
                  tone === "before" ? "bg-red-300/10 text-red-100" : "bg-emerald-300/10 text-emerald-100"
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold text-white">{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
