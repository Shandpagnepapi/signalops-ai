import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  FileText,
  Gauge,
  LayoutDashboard,
  Mail,
  MessageCircle,
  MessageSquareText,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRoundCheck,
  Workflow
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

const shell = "mx-auto w-full max-w-md px-4";
const accentButtonStyle = {
  backgroundColor: "#dfff5f",
  color: "#071018",
  whiteSpace: "nowrap"
} satisfies CSSProperties;
const darkInkStyle = { color: "#071018" } satisfies CSSProperties;
const darkButtonStyle = { backgroundColor: "#071018", color: "#ffffff" } satisfies CSSProperties;
const lightSectionStyle = { backgroundColor: "#f8fafc", color: "#071018" } satisfies CSSProperties;

const steps = [
  {
    title: "Lead comes in",
    copy: "Forms, calls, DMs, quote requests.",
    icon: MessageCircle
  },
  {
    title: "AI handles the first response",
    copy: "Replies, asks questions, scores urgency.",
    icon: Bot
  },
  {
    title: "Your team gets the handoff",
    copy: "Summary, next action, follow-up, booking path.",
    icon: UserRoundCheck
  }
];

const commandViews: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "green" | "blue" | "yellow";
  metrics: Array<[string, string]>;
}> = [
  {
    title: "Pipeline View",
    description: "Lead status without a messy spreadsheet.",
    icon: LayoutDashboard,
    tone: "green",
    metrics: [
      ["New leads", "38"],
      ["Hot leads", "9"],
      ["Booked jobs", "12"],
      ["Follow-up due", "6"]
    ]
  },
  {
    title: "Conversation View",
    description: "See the next question and handoff state.",
    icon: MessageSquareText,
    tone: "blue",
    metrics: [
      ["AI reply", "Sent"],
      ["Customer answer", "Waiting"],
      ["Next question", "Photos"],
      ["Human handoff", "Ready"]
    ]
  },
  {
    title: "Owner View",
    description: "The few actions that matter today.",
    icon: BellRing,
    tone: "yellow",
    metrics: [
      ["Hot today", "7"],
      ["Missed opps", "3"],
      ["Next action", "Call"],
      ["Queue", "14"]
    ]
  }
];

const capabilities = [
  { title: "Instant replies", icon: Clock3 },
  { title: "Lead qualification", icon: ClipboardCheck },
  { title: "Follow-up sequences", icon: RefreshCcw },
  { title: "Booking handoff", icon: CalendarCheck2 },
  { title: "Dashboard visibility", icon: BarChart3 }
];

const previewSteps = [
  { title: "Review lead flow", copy: "Calls, forms, DMs, quote requests.", icon: Workflow },
  { title: "Draft the system preview", copy: "AI flow, package fit, handoff path.", icon: Sparkles },
  { title: "Email after review", copy: "Drafts are checked before sending.", icon: ShieldCheck }
];

const previewOutputs = [
  { title: "Preview Report", icon: FileText },
  { title: "Proposal Draft", icon: ClipboardList },
  { title: "Email Draft", icon: Mail }
];

const packageTeasers = [
  {
    name: "Starter",
    fit: "One core lead source.",
    price: "$297/mo",
    setup: "Setup from $750"
  },
  {
    name: "Growth",
    fit: "Multiple lead sources.",
    price: "$597/mo",
    setup: "Setup from $1,500"
  },
  {
    name: "Custom",
    fit: "Complex workflows.",
    price: "Custom",
    setup: "Buildout from $5,000+"
  }
];

export function MobileSignalOpsHome() {
  return (
    <div
      data-mobile-home
      className="relative overflow-hidden bg-slate-950 pb-[calc(8rem+env(safe-area-inset-bottom))] text-white md:hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% -5%, rgba(52, 211, 153, 0.24), transparent 18rem), radial-gradient(circle at 92% 8%, rgba(129, 140, 248, 0.2), transparent 17rem), linear-gradient(180deg, #020617 0%, #0f172a 46%, #020617 100%)"
        }}
      />
      <div className="relative">
        <MobileHeader />
        <Hero />
        <HeroVisual />
        <Steps />
        <CommandCenter />
        <Capabilities />
        <FreePreview />
        <DemoTeaser />
        <RoiTeaser />
        <PackageTeaser />
        <FinalCta />
        <StickyCta />
      </div>
    </div>
  );
}

function MobileHeader() {
  return (
    <header className={`${shell} pt-3`}>
      <div className="flex items-center justify-between gap-2 rounded-3xl border border-white/15 bg-white/10 px-3 py-3 shadow-2xl shadow-black/25 backdrop-blur-2xl">
        <p className="shrink-0 text-base font-black tracking-normal">SignalOps</p>
        <nav className="flex min-w-0 items-center gap-2" aria-label="Mobile homepage navigation">
          <TrackedLink
            href={SECONDARY_CTA.href}
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "mobile_home_header_demo" }}
            className="inline-flex h-10 items-center justify-center rounded-2xl px-2 text-sm font-bold text-white/75"
          >
            Demo
          </TrackedLink>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_home_header" }}
            className="inline-flex h-10 items-center justify-center rounded-2xl bg-lime-300 px-3 text-sm font-black whitespace-nowrap text-slate-950 shadow-lg shadow-lime-300/15"
            style={accentButtonStyle}
          >
            Free Preview
          </TrackedLink>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className={`${shell} pt-8`}>
      <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-2 text-xs font-black uppercase tracking-wide text-emerald-100">
        <Sparkles className="size-4" aria-hidden="true" />
        AI lead response for local businesses
      </p>
      <h1 className="mt-5 text-4xl font-black leading-none tracking-normal text-white">
        Every lead answered. Every follow-up handled.
      </h1>
      <p className="mt-4 text-base leading-7 text-white/70">
        SignalOps builds AI systems that reply, qualify, route, follow up, and hand off ready-to-book leads.
      </p>
      <div className="mt-6 grid gap-3">
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_home_hero" }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-lime-300 px-5 text-sm font-black text-slate-950 shadow-xl shadow-lime-300/15"
          style={accentButtonStyle}
        >
          Free Preview
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
        <TrackedLink
          href={SECONDARY_CTA.href}
          eventName={ANALYTICS_EVENTS.demoViewed}
          eventProperties={{ location: "mobile_home_hero_demo" }}
          className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-5 text-sm font-black text-white"
        >
          View Demo
        </TrackedLink>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <section className={`${shell} py-6`} aria-label="SignalOps lead assistant example">
      <div className="rounded-3xl border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/25 backdrop-blur-2xl">
        <div className="rounded-3xl bg-slate-950 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-black">New lead received</p>
              <p className="mt-1 text-xs font-semibold text-white/48">Website quote request</p>
            </div>
            <span className="rounded-full bg-yellow-300/15 px-3 py-1 text-xs font-black text-yellow-100">
              Hot lead
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            <MessageBubble speaker="Customer" tone="customer">
              Can I get a quote this week?
            </MessageBubble>
            <MessageBubble speaker="SignalOps" tone="ai">
              Absolutely. I will grab a few details and send this to the team with your preferred time.
            </MessageBubble>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <StatusTile icon={Clock3} label="AI replied" value="4.3s" />
            <StatusTile icon={ClipboardCheck} label="Lead" value="Qualified" />
            <StatusTile icon={BellRing} label="Owner" value="Alerted" />
            <StatusTile icon={RefreshCcw} label="Follow-up" value="Ready" />
          </div>

          <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-3">
            <p className="text-sm font-black text-emerald-100">Needs callback</p>
            <p className="mt-1 text-xs leading-5 text-emerald-50/70">
              Summary, urgency, source, and next action are ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MessageBubble({
  children,
  speaker,
  tone
}: {
  children: string;
  speaker: string;
  tone: "customer" | "ai";
}) {
  return (
    <div
      className={cn(
        "max-w-xs rounded-3xl p-3 text-sm leading-6",
        tone === "customer"
          ? "ml-auto bg-white text-slate-950"
          : "mr-auto border border-emerald-300/20 bg-emerald-400/10 text-emerald-50"
      )}
      style={tone === "customer" ? darkInkStyle : undefined}
    >
      <p className={cn("text-xs font-black uppercase", tone === "customer" ? "text-slate-500" : "text-emerald-100/75")}>
        {speaker}
      </p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

function StatusTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
      <Icon className="size-4 text-lime-300" aria-hidden="true" />
      <p className="mt-3 text-xs font-black uppercase tracking-wide text-white/45">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}

function Steps() {
  return (
    <section className={`${shell} pb-8`}>
      <div className="grid gap-3">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-3xl border border-white/10 bg-white/10 p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                <step.icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-white/40">Step {index + 1}</p>
                <h2 className="mt-1 text-lg font-black tracking-normal">{step.title}</h2>
                <p className="mt-1 text-sm leading-6 text-white/62">{step.copy}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CommandCenter() {
  return (
    <section className={`${shell} pb-8`} aria-labelledby="mobile-command-title">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Command Center</p>
        <h2 id="mobile-command-title" className="mt-2 text-3xl font-black leading-tight tracking-normal">
          Your lead command center.
        </h2>
      </div>

      <div className="grid gap-3">
        {commandViews.map((view) => (
          <CommandView key={view.title} {...view} />
        ))}
      </div>
    </section>
  );
}

function CommandView({
  description,
  icon: Icon,
  metrics,
  title,
  tone
}: {
  description: string;
  icon: LucideIcon;
  metrics: string[][];
  title: string;
  tone: "green" | "blue" | "yellow";
}) {
  const toneClass = {
    green: "text-emerald-300 bg-emerald-400/10 border-emerald-300/20",
    blue: "text-indigo-200 bg-indigo-400/10 border-indigo-300/20",
    yellow: "text-lime-300 bg-lime-300/10 border-lime-300/20"
  }[tone];

  return (
    <article className="rounded-3xl border border-white/10 bg-white/10 p-4">
      <div className="flex items-start gap-3">
        <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-2xl border", toneClass)}>
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-black tracking-normal">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-white/60">{description}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
            <p className="text-xs font-black uppercase tracking-wide text-white/40">{label}</p>
            <p className="mt-1 text-sm font-black text-white">{value}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function Capabilities() {
  return (
    <section className="px-4 py-9 text-slate-950" style={lightSectionStyle} aria-labelledby="mobile-capabilities-title">
      <div className="mx-auto max-w-md">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-700">What SignalOps does</p>
        <h2 id="mobile-capabilities-title" className="mt-2 text-3xl font-black leading-tight tracking-normal">
          The lead work your team keeps chasing.
        </h2>
        <div className="mt-5 grid gap-2">
          {capabilities.map((capability) => (
            <article key={capability.title} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <capability.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-black tracking-normal">{capability.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FreePreview() {
  return (
    <section className="px-4 pb-9 text-slate-950" style={lightSectionStyle} aria-labelledby="mobile-preview-title">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/10">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Main path</p>
        <h2 id="mobile-preview-title" className="mt-2 text-3xl font-black leading-tight tracking-normal">
          Get your Free Preview.
        </h2>
        <div className="mt-5 grid gap-2">
          {previewSteps.map((step) => (
            <article key={step.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <step.icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-black">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{step.copy}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {previewOutputs.map((output) => (
            <div key={output.title} className="rounded-2xl border border-slate-200 bg-white p-3">
              <output.icon className="size-4 text-emerald-700" aria-hidden="true" />
              <p className="mt-3 text-xs font-black leading-4">{output.title}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 flex gap-2 rounded-2xl bg-emerald-50 p-3 text-sm font-bold leading-6 text-emerald-800">
          <ShieldCheck className="mt-1 size-4 shrink-0" aria-hidden="true" />
          Drafts are reviewed before anything is emailed.
        </p>

        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_home_preview" }}
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white"
          style={darkButtonStyle}
        >
          Start Free Preview
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </section>
  );
}

function DemoTeaser() {
  return (
    <section className={`${shell} bg-slate-950 py-9`} aria-labelledby="mobile-demo-title">
      <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-lime-300">Live demo</p>
        <h2 id="mobile-demo-title" className="mt-2 text-3xl font-black leading-tight tracking-normal">
          See it in a real service-business flow.
        </h2>
        <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-sm font-black">Apex Wheel Repair</p>
          <div className="mt-3 grid gap-2">
            {["Quote request", "Photos needed", "Mobile repair", "Follow-up", "Shop handoff"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/70">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <TrackedLink
          href={SECONDARY_CTA.href}
          eventName={ANALYTICS_EVENTS.demoViewed}
          eventProperties={{ location: "mobile_home_demo_teaser" }}
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-5 text-sm font-black text-white"
        >
          View Demo
        </TrackedLink>
      </div>
    </section>
  );
}

function RoiTeaser() {
  return (
    <section className={`${shell} pb-9`} aria-labelledby="mobile-roi-title">
      <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-lime-300/10 text-lime-300">
            <Gauge className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-lime-300">ROI teaser</p>
            <h2 id="mobile-roi-title" className="mt-1 text-2xl font-black leading-tight tracking-normal">
              How many jobs cover the system?
            </h2>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <MiniMetric label="Support" value="$597" />
          <MiniMetric label="Avg job" value="$250" />
          <MiniMetric label="Break-even" value="2.4" />
        </div>
        <p className="mt-3 text-xs leading-5 text-white/50">
          Estimate only. Results depend on your offer, market, and follow-up quality.
        </p>
        <TrackedLink
          href="/roi-calculator"
          eventName={ANALYTICS_EVENTS.roiCalculatorViewed}
          eventProperties={{ location: "mobile_home_roi_teaser" }}
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-5 text-sm font-black text-white"
        >
          Check ROI
        </TrackedLink>
      </div>
    </section>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
      <p className="text-lg font-black">{value}</p>
      <p className="mt-1 text-xs font-black uppercase leading-4 text-white/45">{label}</p>
    </div>
  );
}

function PackageTeaser() {
  return (
    <section className={`${shell} pb-9`} aria-labelledby="mobile-packages-title">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Packages</p>
        <h2 id="mobile-packages-title" className="mt-2 text-3xl font-black leading-tight tracking-normal">
          Start at the right level.
        </h2>
      </div>
      <div className="grid gap-3">
        {packageTeasers.map((plan) => (
          <article key={plan.name} className="rounded-3xl border border-white/15 bg-white/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-black">{plan.name}</h3>
                <p className="mt-1 text-sm leading-6 text-white/62">{plan.fit}</p>
              </div>
              <TrendingUp className="size-5 shrink-0 text-emerald-300" aria-hidden="true" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-black text-white/75">
                {plan.price}
              </span>
              <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-black text-white/75">
                {plan.setup}
              </span>
            </div>
          </article>
        ))}
      </div>
      <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_home_packages" }}
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-lime-300 px-5 text-sm font-black text-slate-950"
          style={accentButtonStyle}
      >
        Help me pick
        <ArrowRight className="size-4" aria-hidden="true" />
      </TrackedLink>
    </section>
  );
}

function FinalCta() {
  return (
    <section className={`${shell} pb-4`} aria-labelledby="mobile-final-title">
      <div
        className="rounded-3xl border border-white/15 p-5"
        style={{
          background:
            "radial-gradient(circle at 80% 0%, rgba(52, 211, 153, 0.18), transparent 14rem), rgba(255, 255, 255, 0.1)"
        }}
      >
        <h2 id="mobile-final-title" className="text-3xl font-black leading-tight tracking-normal">
          Want to see the system your business should be using?
        </h2>
        <div className="mt-5 grid gap-3">
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_home_final" }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-lime-300 px-5 text-sm font-black text-slate-950"
            style={accentButtonStyle}
          >
            Free Preview
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
          <TrackedLink
            href={SECONDARY_CTA.href}
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "mobile_home_final_demo" }}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-5 text-sm font-black text-white"
          >
            View Demo
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

function StickyCta() {
  return (
    <div
      data-mobile-sticky-cta
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-slate-950/95 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 text-white shadow-2xl backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] items-center gap-3">
        <div>
          <p className="text-xs font-black uppercase">Free Preview</p>
          <p className="text-xs text-white/52">Reviewed before email</p>
        </div>
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_home_sticky" }}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-lime-300 px-5 text-sm font-black text-slate-950"
          style={accentButtonStyle}
        >
          Start
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </div>
  );
}
