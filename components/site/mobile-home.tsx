import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  FileText,
  Gauge,
  Mail,
  MessageCircle,
  RefreshCcw,
  Route,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS, type AnalyticsEventName } from "@/lib/analytics";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

const shellStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "23rem",
  width: "calc(100vw - 2rem)"
} satisfies CSSProperties;

const accentButtonStyle = {
  backgroundColor: "#dfff5f",
  color: "#071018",
  whiteSpace: "nowrap"
} satisfies CSSProperties;

const darkButtonStyle = { backgroundColor: "#071018", color: "#ffffff" } satisfies CSSProperties;
const lightSurfaceStyle = { backgroundColor: "#f8fafc", color: "#071018" } satisfies CSSProperties;

const steps = [
  {
    title: "Lead comes in",
    copy: "Forms, calls, DMs, quote requests.",
    icon: MessageCircle
  },
  {
    title: "AI handles the first reply",
    copy: "Replies, asks the right questions, and prepares the next step.",
    icon: Sparkles
  },
  {
    title: "Your team gets the handoff",
    copy: "Summary, owner alert, follow-up, booking path.",
    icon: Route
  }
];

const previewOutputs = [
  { title: "Preview Report", icon: FileText },
  { title: "Proposal Draft", icon: Workflow },
  { title: "Email Draft", icon: Mail }
];

const commandMetrics = [
  ["New leads", "18"],
  ["Response", "4.3s"],
  ["Follow-up due", "5"],
  ["Owner alerts", "3"]
];

const commandChips = ["Wheel Repair", "Med Spa", "Home Services"];

export function MobileSignalOpsHome() {
  return (
    <div
      data-mobile-home
      className="relative overflow-hidden bg-slate-950 pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-white md:hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% -6%, rgba(52,211,153,0.24), transparent 17rem), radial-gradient(circle at 92% 2%, rgba(129,140,248,0.19), transparent 16rem), linear-gradient(180deg,#020617 0%,#0f172a 44%,#020617 100%)"
        }}
      />
      <div className="relative">
        <MobileHeader />
        <Hero />
        <HeroVisual />
        <Steps />
        <FreePreview />
        <CommandCenter />
        <TinyTeasers />
        <PlansLine />
        <FinalCta />
      </div>
      <StickyCta />
    </div>
  );
}

function MobileHeader() {
  return (
    <header className="px-4 pt-3" style={shellStyle}>
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
            className="inline-flex h-10 items-center justify-center rounded-2xl bg-lime-300 px-3 text-sm font-black text-slate-950 shadow-lg shadow-lime-300/15"
            style={accentButtonStyle}
          >
            Preview
          </TrackedLink>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="px-4 pt-8" style={shellStyle}>
      <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-2 text-xs font-black uppercase tracking-wide text-emerald-100">
        <Sparkles className="size-4" aria-hidden="true" />
        AI lead response for local businesses
      </p>
      <h1 className="mt-5 text-3xl font-black leading-[1.05] tracking-normal text-white">
        Every lead answered. Every follow-up handled.
      </h1>
      <p className="mt-4 text-base leading-7 text-white/70">
        SignalOps replies fast, asks the right questions, routes priority leads, and keeps follow-up moving.
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
    <section className="px-4 py-6" style={shellStyle} aria-label="SignalOps lead assistant example">
      <div className="rounded-3xl border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/25 backdrop-blur-2xl">
        <div className="rounded-3xl bg-slate-950 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-black">New lead received</p>
              <p className="mt-1 text-xs font-semibold text-white/48">Website quote request</p>
            </div>
            <span className="rounded-full bg-yellow-300/15 px-3 py-1 text-xs font-black text-yellow-100">
              Priority
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
            <StatusTile icon={CheckCircle2} label="Details" value="Collected" />
            <StatusTile icon={BellRing} label="Owner" value="Alerted" />
            <StatusTile icon={RefreshCcw} label="Follow-up" value="Ready" />
          </div>

          <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-3">
            <p className="text-sm font-black text-emerald-100">Ready for handoff</p>
            <p className="mt-1 text-xs leading-5 text-emerald-50/70">
              The team gets the summary, source, priority, and next action.
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
    <section className="px-4 pb-6" style={shellStyle} aria-label="How SignalOps works">
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

function FreePreview() {
  return (
    <section className="px-4 py-8 text-slate-950" style={lightSurfaceStyle} aria-labelledby="mobile-preview-title">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/10">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-700">Main path</p>
        <h2 id="mobile-preview-title" className="mt-2 text-2xl font-black leading-tight tracking-normal">
          Get your Free Preview.
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Tell us how leads come in. We draft the system preview and review it before anything is emailed.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {previewOutputs.map((output) => (
            <div key={output.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
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
          Free Preview
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </section>
  );
}

function CommandCenter() {
  return (
    <section className="px-4 py-8" style={shellStyle} aria-labelledby="mobile-command-title">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-300">Command Center</p>
        <h2 id="mobile-command-title" className="mt-2 text-2xl font-black leading-tight tracking-normal">
          One clean view of what needs attention.
        </h2>
      </div>

      <div className="rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/20">
        <div className="flex flex-wrap gap-2">
          {commandChips.map((chip, index) => (
            <span
              key={chip}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-black",
                index === 0
                  ? "border-lime-300/30 bg-lime-300/15 text-lime-100"
                  : "border-white/10 bg-white/10 text-white/58"
              )}
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {commandMetrics.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
              <p className="text-xl font-black text-white">{value}</p>
              <p className="mt-1 text-xs font-black uppercase leading-4 text-white/42">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-2xl border border-emerald-300/15 bg-emerald-400/10 p-3">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-100/70">Owner alert</p>
          <p className="mt-2 text-sm leading-6 text-emerald-50">
            Curb rash quote request. Photos needed. Mobile repair requested. Offer callback window.
          </p>
        </div>

        <div className="mt-3 grid gap-2">
          {["AI reply sent", "Details collected", "Photo reminder queued", "Ready for owner handoff"].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/45 p-3 text-sm text-white/74">
              <CheckCircle2 className="size-4 shrink-0 text-lime-300" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TinyTeasers() {
  return (
    <section className="px-4 pb-8" style={shellStyle} aria-label="Demo and ROI teasers">
      <div className="grid gap-3">
        <TinyCard
          icon={CalendarCheck2}
          eyebrow="Demo"
          title="See how this works for Apex Wheel Repair."
          href={SECONDARY_CTA.href}
          label="View Demo"
          eventName={ANALYTICS_EVENTS.demoViewed}
          location="mobile_home_demo_teaser"
        />
        <TinyCard
          icon={Gauge}
          eyebrow="ROI"
          title="For many service businesses, recovering a few missed jobs can cover the system."
          href="/roi-calculator"
          label="Check ROI"
          eventName={ANALYTICS_EVENTS.roiCalculatorViewed}
          location="mobile_home_roi_teaser"
        />
      </div>
    </section>
  );
}

function TinyCard({
  eventName,
  eyebrow,
  href,
  icon: Icon,
  label,
  location,
  title
}: {
  eventName: AnalyticsEventName;
  eyebrow: string;
  href: string;
  icon: LucideIcon;
  label: string;
  location: string;
  title: string;
}) {
  return (
    <article className="rounded-3xl border border-white/15 bg-white/10 p-4">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-lime-300/10 text-lime-300">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-wide text-lime-300">{eyebrow}</p>
          <h2 className="mt-1 text-lg font-black leading-tight tracking-normal">{title}</h2>
        </div>
      </div>
      <TrackedLink
        href={href}
        eventName={eventName}
        eventProperties={{ location }}
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-5 text-sm font-black text-white"
      >
        {label}
      </TrackedLink>
    </article>
  );
}

function PlansLine() {
  return (
    <section className="px-4 pb-8" style={shellStyle} aria-label="Package starting price">
      <div className="rounded-3xl border border-white/12 bg-white/10 p-4 text-center">
        <p className="text-sm font-bold leading-6 text-white/78">
          Plans start at <span className="font-black text-white">$250/mo</span> after your Free Preview.
        </p>
        <TrackedLink
          href="/#pricing"
          eventName={ANALYTICS_EVENTS.packageClicked}
          eventProperties={{ location: "mobile_home_view_packages" }}
          className="mt-2 inline-flex text-sm font-black text-lime-300"
        >
          View packages
        </TrackedLink>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-4 pb-4" style={shellStyle} aria-labelledby="mobile-final-title">
      <div
        className="rounded-3xl border border-white/15 p-5"
        style={{
          background:
            "radial-gradient(circle at 80% 0%, rgba(52,211,153,0.18), transparent 14rem), rgba(255,255,255,0.1)"
        }}
      >
        <h2 id="mobile-final-title" className="text-2xl font-black leading-tight tracking-normal">
          Want to see the system your business should be using?
        </h2>
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_home_final" }}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-lime-300 px-5 text-sm font-black text-slate-950"
          style={accentButtonStyle}
        >
          Free Preview
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </section>
  );
}

function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/90 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <p className="text-sm font-black text-white">Free Preview</p>
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_home_sticky" }}
          className="inline-flex h-11 min-w-28 items-center justify-center rounded-2xl bg-lime-300 px-4 text-sm font-black text-slate-950"
          style={accentButtonStyle}
        >
          Start
        </TrackedLink>
      </div>
    </div>
  );
}
