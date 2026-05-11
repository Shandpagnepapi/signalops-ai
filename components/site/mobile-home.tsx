import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  Clock3,
  FileText,
  Gauge,
  MessageCircle,
  RefreshCcw,
  Route,
  Sparkles,
  UserRoundCheck,
  Workflow,
  Wrench
} from "lucide-react";
import { LeadOSSelector } from "@/components/site/mobile-os/LeadOSSelector";
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

const handoffSteps = [
  { title: "Received", icon: MessageCircle, tone: "emerald" },
  { title: "Replied", icon: Clock3, tone: "emerald" },
  { title: "Details", icon: FileText, tone: "emerald" },
  { title: "Alert", icon: BellRing, tone: "emerald" },
  { title: "Follow-up", icon: RefreshCcw, tone: "emerald" },
  { title: "Handoff", icon: Route, tone: "active" }
];

const previewOutputs = [
  {
    title: "System Map",
    copy: "Your lead sources, slow spots, handoff points, and follow-up gaps.",
    icon: Workflow
  },
  {
    title: "Build Plan",
    copy: "The operating system SignalOps would shape around your business.",
    icon: Wrench
  },
  {
    title: "Next Steps",
    copy: "A clear path for what to connect, what to automate, and what comes first.",
    icon: ArrowRight
  }
];

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
            "radial-gradient(circle at 18% -6%, rgba(52,211,153,0.22), transparent 17rem), radial-gradient(circle at 92% 2%, rgba(129,140,248,0.18), transparent 16rem), linear-gradient(180deg,#020617 0%,#0f172a 44%,#020617 100%)"
        }}
      />
      <div className="relative">
        <MobileHeader />
        <Hero />
        <LeadHandoffVisual />
        <LeadOSSelector />
        <WhatYouGet />
        <PersonalTouch />
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
            Get Started
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
        AI lead systems for local businesses
      </p>
      <h1 className="mt-5 text-3xl font-black leading-[1.05] tracking-normal text-white">
        Every lead answered. Every follow-up handled.
      </h1>
      <p className="mt-4 text-base leading-7 text-white/70">
        SignalOps builds lead operating systems that reply fast, collect the right details, route priorities, and keep work moving.
      </p>
      <div className="mt-6 grid gap-3">
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_home_hero" }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-lime-300 px-5 text-sm font-black text-slate-950 shadow-xl shadow-lime-300/15"
          style={accentButtonStyle}
        >
          See Your System
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

function LeadHandoffVisual() {
  return (
    <section className="px-4 py-6" style={shellStyle} aria-label="SignalOps lead handoff example">
      <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/25 backdrop-blur-2xl">
        <div className="overflow-hidden rounded-[1.35rem] bg-slate-950">
          <div className="border-b border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-lime-300">Live handoff</p>
                <h2 className="mt-1 text-xl font-black leading-tight tracking-normal text-white">
                  A lead comes in. The next step is already moving.
                </h2>
              </div>
              <span className="rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-slate-950">
                4.3s
              </span>
            </div>
          </div>

          <div className="p-4">
            <div className="grid gap-3">
              <LeadMessage tone="customer" label="Customer">
                Can I get a quote this week?
              </LeadMessage>
              <LeadMessage tone="system" label="SignalOps">
                Absolutely. I will collect the details and send your request to the team with the best next step.
              </LeadMessage>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.06] p-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-wide text-white/42">Progress</p>
                <span className="rounded-full bg-lime-300/15 px-2.5 py-1 text-[0.65rem] font-black text-lime-100">
                  Moving
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {handoffSteps.map((step, index) => (
                  <HandoffTile key={step.title} index={index} {...step} />
                ))}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ["Source", "Website"],
                ["Priority", "Warm"],
                ["Next", "Callback"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                  <p className="text-[0.62rem] font-black uppercase tracking-wide text-white/38">{label}</p>
                  <p className="mt-1 text-xs font-black text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-3">
              <p className="flex items-center gap-2 text-sm font-black text-emerald-100">
                <UserRoundCheck className="size-4" aria-hidden="true" />
                Owner handoff
              </p>
              <p className="mt-2 text-xs leading-5 text-emerald-50/72">
                Source, details, priority, follow-up state, and next action are packaged for the team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadMessage({
  children,
  label,
  tone
}: {
  children: string;
  label: string;
  tone: "customer" | "system";
}) {
  return (
    <div
      className={cn(
        "max-w-xs rounded-3xl p-3 text-sm leading-6",
        tone === "customer"
          ? "ml-auto bg-white text-slate-950"
          : "mr-auto border border-emerald-300/20 bg-emerald-300/10 text-emerald-50"
      )}
    >
      <p className={cn("text-xs font-black uppercase", tone === "customer" ? "text-slate-500" : "text-emerald-100/70")}>{label}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

function HandoffTile({
  icon: Icon,
  index,
  title,
  tone
}: {
  icon: LucideIcon;
  index: number;
  title: string;
  tone: string;
}) {
  const active = tone === "active";

  return (
    <div className="relative flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/45 p-2.5">
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-2xl",
          active ? "bg-lime-300 text-slate-950" : "bg-emerald-300/12 text-emerald-100"
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-[0.6rem] font-black uppercase tracking-wide text-white/32">0{index + 1}</p>
        <p className="text-xs font-black leading-4 text-white/74">{title}</p>
      </div>
    </div>
  );
}

function WhatYouGet() {
  return (
    <section className="px-4 py-8 text-slate-950" style={lightSurfaceStyle} aria-labelledby="mobile-outputs-title">
      <div className="mx-auto max-w-md">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/10">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700">What you get back</p>
          <h2 id="mobile-outputs-title" className="mt-2 text-2xl font-black leading-tight tracking-normal">
            A clear picture of the system that fits.
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Tell us about your business and SignalOps will map the operating system that fits your lead flow.
          </p>

          <div className="mt-5 grid gap-2">
            {previewOutputs.map((output) => (
              <OutputCard key={output.title} {...output} />
            ))}
          </div>

          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_home_outputs" }}
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white"
            style={darkButtonStyle}
          >
            Get Started
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

function OutputCard({ copy, icon: Icon, title }: { copy: string; icon: LucideIcon; title: string }) {
  return (
    <article className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-lime-300">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-base font-black tracking-normal">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p>
      </div>
    </article>
  );
}

function PersonalTouch() {
  return (
    <section className="px-4 py-8" style={shellStyle} aria-labelledby="mobile-personal-title">
      <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20">
        <div className="flex items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-lime-300/12 text-lime-300">
            <Wrench className="size-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-lime-300">Done for you</p>
            <h2 id="mobile-personal-title" className="mt-1 text-2xl font-black leading-tight tracking-normal">
              Built around your business.
            </h2>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/68">
          SignalOps shapes the system around how your calls, forms, DMs, quotes, appointments, and team handoffs actually work.
        </p>
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
          Plans start at <span className="font-black text-white">$250/mo</span>.
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
        className="rounded-[1.75rem] border border-white/15 p-5"
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
          Get Started
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
        <p className="text-sm font-black text-white">Lead OS</p>
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
