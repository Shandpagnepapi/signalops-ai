import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  MessageSquareText,
  PhoneCall,
  RefreshCcw,
  Route,
  Sparkles,
  TrendingUp,
  Workflow,
  XCircle
} from "lucide-react";
import {
  CommandCard,
  HandoffTimeline,
  MessageBubble,
  MetricTile,
  OwnerAlertCard,
  ProductFrame,
  SignalOpsCommandLayer,
  StatusPill,
  SystemPreviewCard
} from "@/components/site/signalops-gui";
import { cn } from "@/lib/utils";

const artifactCards = [
  {
    title: "Lead Map",
    label: "Map",
    copy: "Where leads come from, where they slow down, and what Envo should handle.",
    icon: FileText
  },
  {
    title: "Envo Build Plan",
    label: "Plan",
    copy: "What Envo should answer, ask, log, follow up on, and escalate.",
    icon: ClipboardList
  },
  {
    title: "Next Steps",
    label: "Action",
    copy: "What to connect first and what rules Envo needs before going live.",
    icon: Route
  }
];

const journeyConversation = [
  {
    speaker: "Customer",
    tone: "customer",
    text: "Can you quote biweekly washing for 28 service vans?"
  },
  {
    speaker: "Envo",
    tone: "ai",
    text: "Yes. Send fleet size, vehicle types, locations, and your preferred wash window."
  },
  {
    speaker: "Owner alert",
    tone: "system",
    text: "Recurring account request. Owner handoff and follow-up are ready."
  }
] satisfies Array<{
  speaker: string;
  tone: "customer" | "ai" | "system";
  text: string;
}>;

const journeyFields = [
  ["Service", "Fleet wash plan"],
  ["Intent", "Recurring quote"],
  ["Needs", "Locations + wash window"],
  ["Priority", "High-intent account"]
];

const journeyTimeline = [
  { title: "Captured", icon: MessageSquareText },
  { title: "Sorted", icon: ClipboardList },
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
    <ProductFrame accent="emerald" className={className} eyebrow="Envo preview" title="Three practical outputs, one build path.">
      <div className="-mt-1 mb-4">
        <StatusPill accent="emerald">Mapped</StatusPill>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {artifactCards.map((artifact, index) => (
          <ArtifactCard key={artifact.title} index={index} {...artifact} />
        ))}
      </div>

      <CommandCard accent="emerald" className="mt-4">
        <p className="text-sm font-semibold leading-6 text-emerald-100">
          Built to show what Envo should handle, ask, escalate, and hand off before setup begins.
        </p>
      </CommandCard>
    </ProductFrame>
  );
}

export function LeadJourneyVisual({ className = "" }: { className?: string }) {
  return (
    <ProductFrame accent="emerald" className={className} eyebrow="Lead journey" title="From inquiry to booking handoff.">
      <Sparkles className="absolute right-5 top-5 size-6 text-[#f7ff73]" aria-hidden="true" />

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <p className="text-sm font-semibold text-white">AI receptionist</p>
            <StatusPill accent="emerald">4.3s reply</StatusPill>
          </div>
          <div className="mt-3 grid gap-3">
            {journeyConversation.map((message) => (
              <MessageBubble
                key={message.text}
                label={message.speaker}
                tone={message.tone === "customer" ? "customer" : message.tone === "system" ? "owner" : "system"}
              >
                {message.text}
              </MessageBubble>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <CommandCard accent="emerald" className="rounded-3xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#37f0bd]">Priority card</p>
                <p className="mt-2 text-lg font-semibold text-white">Warm quote request</p>
              </div>
              <span className="rounded-2xl border border-[#f7ff73]/20 bg-[#f7ff73]/12 px-3 py-2 text-lg font-black text-[#fbffad]">
                High
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
          </CommandCard>

          <CommandCard accent="lime" className="rounded-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/48">Operating flow</p>
            <div className="mt-4">
              <HandoffTimeline
                steps={journeyTimeline.map((step) => ({ icon: step.icon, label: step.title }))}
                tone="lime"
              />
            </div>
          </CommandCard>
        </div>
      </div>
    </ProductFrame>
  );
}

export function DashboardSnapshot({ className = "" }: { className?: string }) {
  return (
    <ProductFrame accent="amber" className={className} eyebrow="Command snapshot" title="Example lead operating view.">
      <TrendingUp className="absolute right-5 top-5 size-6 text-[#ffb36d]" aria-hidden="true" />

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          ["New leads", "38"],
          ["Avg response", "4.3s"],
          ["Follow-ups", "19"]
        ].map(([label, value]) => (
          <MetricTile key={label} accent="amber" className="p-3" label={label} value={value} />
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
          <OwnerAlertCard
            action="High-intent fleet quote request needs locations, wash window, and account handoff."
            className="border-white/10 bg-white/[0.055] shadow-none"
            tone="lime"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {["Recurring", "Needs site notes", "Follow-up queued"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[0.65rem] font-semibold text-white/72">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}

export function BeforeAfterFlow({ className = "" }: { className?: string }) {
  return (
    <ProductFrame accent="emerald" className={className} eyebrow="Before / after" title="The business flow gets cleaner.">
      <Workflow className="absolute right-5 top-5 size-6 text-[#37f0bd]" aria-hidden="true" />
      <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        <FlowColumn title="Before SignalOps" tone="before" items={beforeItems} />
        <div className="hidden items-center justify-center lg:flex">
          <div className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.06]">
            <ArrowRight className="size-5 text-[#37f0bd]" aria-hidden="true" />
          </div>
        </div>
        <FlowColumn title="After Envo" tone="after" items={afterItems} />
      </div>
    </ProductFrame>
  );
}

export { SignalOpsCommandLayer };

function ArtifactCard({
  copy,
  icon: Icon,
  index,
  title
}: {
  copy: string;
  icon: LucideIcon;
  index: number;
  title: string;
}) {
  return (
    <SystemPreviewCard accent={index === 0 ? "emerald" : index === 1 ? "pink" : "amber"} copy={copy} icon={Icon} title={title} />
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
