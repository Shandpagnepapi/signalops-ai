import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  FileText,
  Gauge,
  GitBranch,
  Inbox,
  MessageSquareReply,
  MousePointer2,
  RefreshCcw,
  Route,
  Send,
  Sparkles,
  TableProperties,
  Workflow,
  Zap
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Accent = "emerald" | "sky" | "amber" | "pink";

const shell = "mx-auto max-w-[1500px] px-5 sm:px-9 lg:px-11";
const mobileShell = "mx-auto max-w-[24rem] px-4";
const muted = "text-[#ead0df]/74";

const accentMap: Record<Accent, { border: string; bg: string; fill: string; text: string; glow: string }> = {
  amber: {
    bg: "bg-amber-300/10",
    border: "border-amber-300/22",
    fill: "bg-amber-300 text-slate-950",
    glow: "shadow-amber-950/20",
    text: "text-amber-100"
  },
  emerald: {
    bg: "bg-emerald-300/10",
    border: "border-emerald-300/22",
    fill: "bg-emerald-300 text-slate-950",
    glow: "shadow-emerald-950/20",
    text: "text-emerald-100"
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
    glow: "shadow-sky-950/20",
    text: "text-sky-100"
  }
};

const sourceNodes = [
  { label: "Website forms", icon: FileText, accent: "pink" },
  { label: "Missed calls", icon: BellRing, accent: "amber" },
  { label: "Texts", icon: MessageSquareReply, accent: "sky" },
  { label: "Instagram / Facebook DMs", icon: Send, accent: "pink" },
  { label: "Google Business Profile", icon: MousePointer2, accent: "amber" },
  { label: "Quote requests", icon: ClipboardList, accent: "pink" }
] satisfies Array<{ label: string; icon: LucideIcon; accent: Accent }>;

const coreSteps = [
  { label: "Reply", detail: "Fast first response", icon: Zap },
  { label: "Intake", detail: "Smart questions", icon: ClipboardList },
  { label: "Priority", detail: "Sort next action", icon: Gauge },
  { label: "Handoff", detail: "Owner/team alert", icon: Route },
  { label: "Follow-up", detail: "Keep it moving", icon: RefreshCcw }
] satisfies Array<{ label: string; detail: string; icon: LucideIcon }>;

const outputNodes = [
  { label: "Owner alert", icon: BellRing, accent: "amber" },
  { label: "Command center", icon: TableProperties, accent: "pink" },
  { label: "Quote / booking handoff", icon: CalendarCheck2, accent: "sky" },
  { label: "Follow-up queue", icon: RefreshCcw, accent: "emerald" },
  { label: "Build plan / next action", icon: Workflow, accent: "pink" }
] satisfies Array<{ label: string; icon: LucideIcon; accent: Accent }>;

const includedLayers = [
  {
    layer: "Instant Reply",
    handles: "New inquiries from forms, calls, texts, DMs, and quote requests.",
    replaces: "Missed-call text-back tools, simple webchat, manual first replies.",
    cost: "$50-$200/mo",
    included: "Starter+",
    accent: "pink",
    icon: Zap
  },
  {
    layer: "Smart Intake",
    handles: "Collects the right details, service needs, timing, locations, and contact info.",
    replaces: "Long manual back-and-forth, intake forms, scattered notes.",
    cost: "$50-$150/mo",
    included: "Starter+",
    accent: "emerald",
    icon: ClipboardList
  },
  {
    layer: "Priority Routing",
    handles: "Sorts urgent, high-value, or ready leads and prepares owner/team handoff.",
    replaces: "Manual triage, spreadsheet sorting, missed internal alerts.",
    cost: "$50-$200/mo",
    included: "Growth+",
    accent: "amber",
    icon: Route
  },
  {
    layer: "Follow-Up",
    handles: "Quote follow-up, missing-details reminders, no-reply nudges, booking/callback reminders.",
    replaces: "Reminder tools, manual texting, basic campaign automations.",
    cost: "$100-$300/mo",
    included: "Growth+",
    accent: "sky",
    icon: RefreshCcw
  },
  {
    layer: "Command Center",
    handles: "Lead view, status, source, priority, next action, follow-up queue.",
    replaces: "Basic CRM views, spreadsheets, scattered owner notes.",
    cost: "$100-$300/mo",
    included: "Growth+",
    accent: "pink",
    icon: TableProperties
  },
  {
    layer: "Manager Build Plan",
    handles: "Maps what your AI Lead Manager should handle before setup.",
    replaces: "Generic AI consulting, unclear automation plans, trial-and-error setup.",
    cost: "Varies",
    included: "Free starting path",
    accent: "pink",
    icon: Workflow
  },
  {
    layer: "Custom Agent / Integration Layer",
    handles: "Advanced routing, dashboards, CRM/job-management integration, internal AI workflows.",
    replaces: "Custom ops tools, manual admin workflows, custom integration projects.",
    cost: "Custom",
    included: "Custom",
    accent: "amber",
    icon: GitBranch
  }
] satisfies Array<{
  layer: string;
  handles: string;
  replaces: string;
  cost: string;
  included: string;
  accent: Accent;
  icon: LucideIcon;
}>;

const beforeItems = ["Missed calls", "Scattered DMs", "Forgotten quote follow-up", "Manual reminders", "No clear owner handoff"];
const afterItems = ["Reply", "Intake", "Priority", "Handoff", "Follow-up", "Command center"];

export function ConsolidateLeadStackSection({
  className,
  compact = false
}: {
  className?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <section className={cn("py-6", className)} aria-labelledby="mobile-lead-stack-title">
        <div className={mobileShell}>
          <div className="overflow-hidden rounded-[1.85rem] border border-white/15 bg-white/[0.075] p-4 shadow-2xl shadow-black/25">
            <SectionHeading
              eyebrow="AI Lead Manager"
              id="mobile-lead-stack-title"
              title="One manager for the messy middle."
              copy="Forms, calls, DMs, quotes, follow-up, and handoffs move through one supervised lead workflow."
              compact
            />
            <LeadStackVisual compact />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("border-y border-white/10 bg-[#17122d]/34 py-9", className)} aria-labelledby="lead-stack-title">
      <div className={shell}>
        <div className="grid gap-7 xl:grid-cols-[0.78fr_1.22fr] xl:items-center">
          <SectionHeading
            eyebrow="AI Lead Manager"
            id="lead-stack-title"
            title="Consolidate your lead stack."
            copy="Forms, calls, DMs, quotes, follow-up, and handoffs move through one AI Lead Manager instead of scattered tools and manual work."
          >
            <TrackedLink
              href={PRIMARY_CTA.href}
              eventName={ANALYTICS_EVENTS.previewCtaClicked}
              eventProperties={{ location: "lead_stack_section" }}
              className={`${buttonVariants({ size: "lg" })} mt-6`}
            >
              See Your AI Lead Manager
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
          </SectionHeading>
          <LeadStackVisual />
        </div>
      </div>
    </section>
  );
}

export function WhatsIncludedSection({
  className,
  compact = false
}: {
  className?: string;
  compact?: boolean;
}) {
  if (compact) {
    const compactLayers = includedLayers.slice(0, 4);

    return (
      <section className={cn("py-8", className)} aria-labelledby="mobile-included-title">
        <div className={mobileShell}>
          <div className="rounded-[1.85rem] border border-white/14 bg-white/[0.08] p-4 shadow-2xl shadow-black/20">
            <SectionHeading
              eyebrow="Included layers"
              id="mobile-included-title"
              title="What's included with your AI Lead Manager"
              copy="One supervised lead workflow instead of scattered tools, inboxes, reminders, and manual follow-up."
              compact
            />
            <div className="mt-4 grid gap-3">
              {compactLayers.map((item) => (
                <IncludedLayerCard key={item.layer} item={item} compact />
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-white/50">
              More responsibilities are mapped in your preview when the workflow needs deeper routing, dashboards, or integrations.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="included" className={cn("border-y border-white/10 bg-[#17122d]/38 py-9", className)} aria-labelledby="included-title">
      <div className={shell}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb36d]">Included layers</p>
          <h2 id="included-title" className="mt-3 text-2xl font-semibold tracking-normal text-white sm:text-4xl">
            What&apos;s included with SignalOps
          </h2>
          <p className={`mt-3 text-sm leading-6 ${muted}`}>
            One AI Lead Manager instead of scattered tools, inboxes, reminders, and manual follow-up.
          </p>
        </div>

        <div className="mt-7 hidden overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.05] shadow-2xl shadow-black/18 lg:block">
          <div className="grid grid-cols-[0.95fr_1.35fr_1.35fr_0.75fr_0.72fr] border-b border-white/10 bg-white/[0.04] text-xs font-semibold uppercase tracking-[0.14em] text-white/44">
            <div className="p-4">Manager responsibility</div>
            <div className="p-4">What it handles</div>
            <div className="p-4">What it can replace</div>
            <div className="p-4">Typical separate-tool cost</div>
            <div className="p-4">Included in</div>
          </div>
          {includedLayers.map((item) => (
            <IncludedLayerRow key={item.layer} item={item} />
          ))}
        </div>

        <div className="mt-7 grid gap-4 lg:hidden">
          {includedLayers.map((item) => (
            <IncludedLayerCard key={item.layer} item={item} />
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm leading-6 text-[#ead0df]/72 sm:flex sm:items-center sm:justify-between sm:gap-5">
          <p>
            Costs are rough planning ranges for standalone tools. Actual tools and savings depend on your stack.
          </p>
          <TrackedLink
            href="/#pricing"
            eventName={ANALYTICS_EVENTS.packageClicked}
            eventProperties={{ location: "included_layers_view_packages" }}
            className={`${buttonVariants({ variant: "outline" })} mt-4 w-full border-white/18 bg-white/[0.045] sm:mt-0 sm:w-auto`}
          >
            View Packages
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

export function MessyMiddleSection({
  className,
  compact = false
}: {
  className?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <section className={cn("py-6", className)} aria-labelledby="mobile-messy-middle-title">
        <div className={mobileShell}>
          <div className="rounded-[1.75rem] border border-white/15 bg-white/[0.075] p-4 shadow-2xl shadow-black/20">
            <p className="text-xs font-black uppercase tracking-wide text-[#ffb36d]">The messy middle</p>
            <h2 id="mobile-messy-middle-title" className="mt-2 text-2xl font-black leading-tight tracking-normal text-white">
              Most businesses already have leads.
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/62">
              The mess is what happens between the inquiry and the next action.
            </p>
            <MessyMiddleVisual compact />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("px-5 py-8 sm:px-9 lg:px-11", className)} aria-labelledby="messy-middle-title">
      <div className="grid gap-5 rounded-[1.5rem] border border-white/12 bg-white/[0.055] p-5 shadow-2xl shadow-black/18 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb36d]">The messy middle</p>
          <h2 id="messy-middle-title" className="mt-3 text-2xl font-semibold tracking-normal text-white sm:text-3xl">
            Most businesses already have leads.
          </h2>
          <p className={`mt-3 text-sm leading-6 ${muted}`}>
            The mess is what happens between the inquiry and the next action. SignalOps turns that middle into a clear operating flow.
          </p>
        </div>
        <MessyMiddleVisual />
      </div>
    </section>
  );
}

function SectionHeading({
  children,
  compact = false,
  copy,
  eyebrow,
  id,
  title
}: {
  children?: ReactNode;
  compact?: boolean;
  copy: string;
  eyebrow: string;
  id: string;
  title: string;
}) {
  return (
    <div>
      <p className={cn("font-black uppercase tracking-wide", compact ? "text-xs text-[#ffb36d]" : "text-xs text-[#ffb36d]")}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-3 font-semibold leading-tight tracking-normal text-white",
          compact ? "text-2xl font-black" : "text-2xl sm:text-4xl"
        )}
      >
        {title}
      </h2>
      <p className={cn("mt-3 leading-6", compact ? "text-sm text-white/62" : `text-sm ${muted}`)}>
        {copy}
      </p>
      {children}
    </div>
  );
}

function LeadStackVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative mt-5 overflow-hidden rounded-[1.65rem] border border-white/12 bg-[#100818]/82 shadow-2xl shadow-black/22",
        compact ? "p-3" : "mt-0 p-5"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,111,156,0.18),transparent_16rem),radial-gradient(circle_at_82%_6%,rgba(255,179,109,0.14),transparent_16rem)]" />

      <div className="relative">
        <div className={cn("grid gap-4", compact ? "" : "xl:grid-cols-[0.92fr_1.18fr_0.9fr] xl:items-center")}>
          <NodeCluster label="Incoming sources" nodes={sourceNodes} compact={compact} />
          <OSCorePanel compact={compact} />
          <NodeCluster label="Outputs" nodes={outputNodes} compact={compact} />
        </div>
      </div>
    </div>
  );
}

function NodeCluster({
  compact,
  label,
  nodes
}: {
  compact?: boolean;
  label: string;
  nodes: Array<{ label: string; icon: LucideIcon; accent: Accent }>;
}) {
  const visibleNodes = compact ? nodes.slice(0, label === "Outputs" ? 4 : 5) : nodes;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[0.64rem] font-black uppercase tracking-wide text-white/42">{label}</p>
        <span className="rounded-full border border-white/10 bg-white/[0.055] px-2.5 py-1 text-[0.62rem] font-black text-white/50">
          Live
        </span>
      </div>
      <div className={cn("grid gap-2", compact ? "grid-cols-1" : "")}>
        {visibleNodes.map((node) => (
          <StackNode key={node.label} {...node} compact={compact} />
        ))}
      </div>
    </div>
  );
}

function StackNode({
  accent,
  compact,
  icon: Icon,
  label
}: {
  accent: Accent;
  compact?: boolean;
  icon: LucideIcon;
  label: string;
}) {
  const classes = accentMap[accent];

  return (
    <div className={cn("flex items-center gap-2 rounded-2xl border bg-[#100818]/54 px-3 py-2.5", classes.border)}>
      <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-2xl", classes.bg, classes.text)}>
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <p className={cn("min-w-0 font-black leading-4 text-white/78", compact ? "text-xs" : "text-sm")}>{label}</p>
    </div>
  );
}

function OSCorePanel({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[1.45rem] border border-[#ffb36d]/24 bg-[radial-gradient(circle_at_50%_0%,rgba(255,179,109,0.16),transparent_13rem),rgba(255,255,255,0.055)] p-3 shadow-2xl shadow-pink-950/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.64rem] font-black uppercase tracking-wide text-[#ffe1bd]/70">Manager core</p>
          <h3 className={cn("mt-1 font-black tracking-normal text-white", compact ? "text-lg" : "text-2xl")}>
            AI Lead Manager
          </h3>
        </div>
        <span className="rounded-full bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] px-2.5 py-1 text-[0.62rem] font-black text-white">
          Active
        </span>
      </div>

      <div className={cn("mt-4 grid gap-2", compact ? "grid-cols-1" : "sm:grid-cols-5 xl:grid-cols-1")}>
        {coreSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.label} className="relative rounded-2xl border border-white/10 bg-[#100818]/58 p-3">
              {index > 0 ? (
                <span className="absolute -top-2 left-1/2 h-2 w-px -translate-x-1/2 bg-[#ffb36d]/35 sm:hidden xl:block" aria-hidden="true" />
              ) : null}
              <div className="flex items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] text-white">
                  <Icon className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-white">{step.label}</p>
                  <p className="truncate text-[0.64rem] font-bold text-white/46">{step.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function IncludedLayerRow({ item }: { item: (typeof includedLayers)[number] }) {
  const Icon = item.icon;
  const classes = accentMap[item.accent];

  return (
    <div className="grid grid-cols-[0.95fr_1.35fr_1.35fr_0.75fr_0.72fr] border-b border-white/10 last:border-b-0">
      <div className="flex items-center gap-3 p-4">
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-2xl", classes.bg, classes.text)}>
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold leading-5 text-white">{item.layer}</p>
      </div>
      <p className="p-4 text-sm leading-6 text-[#ead0df]/74">{item.handles}</p>
      <p className="p-4 text-sm leading-6 text-[#ead0df]/74">{item.replaces}</p>
      <p className="p-4 text-sm font-semibold text-[#ffe1bd]">{item.cost}</p>
      <div className="p-4">
        <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-black", classes.bg, classes.border, classes.text)}>
          {item.included}
        </span>
      </div>
    </div>
  );
}

function IncludedLayerCard({ compact, item }: { compact?: boolean; item: (typeof includedLayers)[number] }) {
  const Icon = item.icon;
  const classes = accentMap[item.accent];

  return (
    <article className={cn("rounded-3xl border bg-[#100818]/54 p-4", classes.border)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-2xl", classes.bg, classes.text)}>
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className={cn("font-black leading-tight text-white", compact ? "text-base" : "text-lg")}>{item.layer}</h3>
            <p className="mt-1 text-xs font-black uppercase tracking-wide text-white/38">{item.cost}</p>
          </div>
        </div>
        <span className={cn("shrink-0 rounded-full border px-2 py-1 text-[0.62rem] font-black", classes.bg, classes.border, classes.text)}>
          {item.included}
        </span>
      </div>
      <div className="mt-4 grid gap-3">
        <LayerDetail label="Handles" value={item.handles} />
        <LayerDetail label="Can replace" value={item.replaces} />
      </div>
    </article>
  );
}

function LayerDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.62rem] font-black uppercase tracking-wide text-white/36">{label}</p>
      <p className="mt-1 text-sm leading-6 text-white/70">{value}</p>
    </div>
  );
}

function MessyMiddleVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("mt-5 grid gap-3", compact ? "" : "mt-0 sm:grid-cols-[1fr_auto_1.1fr] sm:items-center")}>
      <FlowList title="Before" items={beforeItems} tone="before" />
      <div className="hidden size-12 items-center justify-center rounded-full border border-[#ffb36d]/24 bg-[#ffb36d]/10 text-[#ffb36d] sm:flex">
        <ArrowRight className="size-5" aria-hidden="true" />
      </div>
      <FlowList title="SignalOps" items={afterItems} tone="after" />
    </div>
  );
}

function FlowList({ items, title, tone }: { items: string[]; title: string; tone: "before" | "after" }) {
  const active = tone === "after";

  return (
    <div className={cn("rounded-3xl border p-3", active ? "border-[#ffb36d]/20 bg-[#ffb36d]/10" : "border-white/10 bg-[#100818]/50")}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className={cn("text-xs font-black uppercase tracking-wide", active ? "text-[#ffe1bd]" : "text-white/42")}>{title}</p>
        {active ? <Sparkles className="size-4 text-[#ffb36d]" aria-hidden="true" /> : <Inbox className="size-4 text-white/34" aria-hidden="true" />}
      </div>
      <div className="grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#100818]/46 px-3 py-2">
            <CheckCircle2 className={cn("size-4 shrink-0", active ? "text-[#ffb36d]" : "text-white/34")} aria-hidden="true" />
            <span className="text-xs font-bold leading-5 text-white/72">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
