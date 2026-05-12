import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  AlertTriangle,
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Edit3,
  FileText,
  Gauge,
  Hand,
  MessageCircle,
  RefreshCcw,
  Route,
  Sparkles,
  UserRoundCheck,
  Workflow,
  Wrench
} from "lucide-react";
import { LeadOSSelector } from "@/components/site/mobile-os/LeadOSSelector";
import {
  ConsolidateLeadStackSection,
  WhatsIncludedSection
} from "@/components/site/signalops-stack-sections";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS, type AnalyticsEventName } from "@/lib/analytics";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

const shellStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "24rem",
  width: "calc(100vw - 2rem)"
} satisfies CSSProperties;

const accentButtonStyle = {
  backgroundImage: "linear-gradient(135deg,#ff6f9c,#ff9f75 46%,#ffb36d)",
  color: "#ffffff",
  whiteSpace: "nowrap"
} satisfies CSSProperties;

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
    copy: "What your AI Lead Manager should handle, watch, and hand off.",
    icon: Workflow
  },
  {
    title: "Build Plan",
    copy: "The intake questions, guardrails, and setup path SignalOps would shape.",
    icon: Wrench
  },
  {
    title: "Next Steps",
    copy: "What to connect first and when the owner should review.",
    icon: ArrowRight
  }
];

export function MobileSignalOpsHome() {
  return (
    <div
      data-mobile-home
      className="relative overflow-hidden bg-[#100818] pb-[calc(2rem+env(safe-area-inset-bottom))] text-white md:hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 16% -4%, rgba(255,111,156,0.28), transparent 18rem), radial-gradient(circle at 90% 4%, rgba(255,179,109,0.18), transparent 16rem), linear-gradient(180deg,#100818 0%,#17122d 48%,#100818 100%)"
        }}
      />
      <div className="relative">
        <MobileHeader />
        <Hero />
        <LeadHandoffVisual />
        <OwnerTriageCard />
        <LeadOSSelector />
        <ConsolidateLeadStackSection compact />
        <WhatYouGet />
        <WhatsIncludedSection compact />
        <PersonalTouch />
        <TinyTeasers />
        <PlansLine />
        <FinalCta />
      </div>
    </div>
  );
}

function MobileHeader() {
  return (
    <header className="px-4 pt-3" style={shellStyle}>
      <div className="flex items-center justify-between gap-2 rounded-[1.55rem] border border-white/14 bg-white/[0.095] px-3 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl">
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
            className="inline-flex h-10 items-center justify-center rounded-2xl px-3 text-sm font-black shadow-lg shadow-pink-950/25"
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
    <section className="px-4 pt-9" style={shellStyle}>
      <p className="inline-flex items-center gap-2 rounded-full border border-[#ffb36d]/24 bg-[#ffb36d]/10 px-3 py-2 text-xs font-black uppercase tracking-wide text-[#ffe1bd]">
        <Sparkles className="size-4" aria-hidden="true" />
        AI Lead Manager for local businesses
      </p>
      <h1 className="mt-6 text-[2.42rem] font-black leading-[0.98] tracking-normal text-white">
        Your AI Lead Manager, right in your pocket.
      </h1>
      <p className="mt-5 text-base leading-7 text-[#ead0df]/76">
        It answers leads, asks the right questions, follows up, and shows you what needs approval or takeover.
      </p>
      <div className="mt-6 grid gap-3">
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_home_hero" }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black shadow-xl shadow-pink-950/28"
          style={accentButtonStyle}
        >
          See Your AI Lead Manager
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
        <TrackedLink
          href={SECONDARY_CTA.href}
          eventName={ANALYTICS_EVENTS.demoViewed}
          eventProperties={{ location: "mobile_home_hero_demo" }}
          className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/14 bg-white/[0.075] px-5 text-sm font-black text-white shadow-lg shadow-black/15"
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
      <div className="rounded-[1.85rem] border border-white/14 bg-white/[0.085] p-3 shadow-2xl shadow-black/22 backdrop-blur-2xl">
        <div className="overflow-hidden rounded-[1.45rem] bg-[#17122d]/94">
          <div className="border-b border-white/10 bg-white/[0.045] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#ffb36d]">Live handoff</p>
                <h2 className="mt-1 text-xl font-black leading-tight tracking-normal text-white">
                  A lead comes in. Your AI manager starts the work.
                </h2>
              </div>
              <span className="rounded-full bg-[#ffb36d]/16 px-3 py-1 text-xs font-black text-[#ffe1bd]">
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
                Absolutely. I will grab the details and flag the team if this needs a person.
              </LeadMessage>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.06] p-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-wide text-white/42">Progress</p>
                <span className="rounded-full bg-[#ffb36d]/12 px-2.5 py-1 text-[0.65rem] font-black text-[#ffe1bd]">
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
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
                  <p className="text-[0.62rem] font-black uppercase tracking-wide text-white/38">{label}</p>
                  <p className="mt-1 text-xs font-black text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-3xl border border-emerald-300/18 bg-emerald-300/10 p-3">
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

const triageLeads = [
  {
    title: "Fleet quote request",
    detail: "28 vans, two DFW locations, biweekly after-hours.",
    status: "Ready to send",
    tone: "ready",
    icon: CheckCircle2
  },
  {
    title: "Discount question",
    detail: "Customer asked for a lower monthly rate.",
    status: "Needs approval",
    tone: "approval",
    icon: Edit3
  },
  {
    title: "Urgent service issue",
    detail: "Outside normal service area and time window.",
    status: "Human review recommended",
    tone: "review",
    icon: AlertTriangle
  }
] satisfies Array<{
  detail: string;
  icon: LucideIcon;
  status: string;
  title: string;
  tone: "ready" | "approval" | "review";
}>;

function OwnerTriageCard() {
  return (
    <section className="px-4 pb-7" style={shellStyle} aria-labelledby="mobile-owner-triage-title">
      <div className="overflow-hidden rounded-[1.85rem] border border-white/14 bg-white/[0.085] p-4 shadow-2xl shadow-black/22 backdrop-blur-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#ffb36d]">Owner triage</p>
            <h2 id="mobile-owner-triage-title" className="mt-1 text-2xl font-black leading-tight tracking-normal text-white">
              Supervise the AI worker from your phone.
            </h2>
          </div>
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#ffb36d]/12 text-[#ffb36d]">
            <Hand className="size-5" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-white/62">
          Approve, edit, or take over when the lead needs owner judgment.
        </p>

        <div className="mt-5 grid gap-3">
          {triageLeads.map((lead) => (
            <TriageLeadCard key={lead.title} {...lead} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TriageLeadCard({
  detail,
  icon: Icon,
  status,
  title,
  tone
}: {
  detail: string;
  icon: LucideIcon;
  status: string;
  title: string;
  tone: "ready" | "approval" | "review";
}) {
  const toneClass =
    tone === "ready"
      ? "border-emerald-300/18 bg-emerald-300/10 text-emerald-100"
      : tone === "approval"
        ? "border-[#ffb36d]/20 bg-[#ffb36d]/10 text-[#ffe1bd]"
        : "border-amber-300/22 bg-amber-300/10 text-amber-100";

  return (
    <article className="rounded-3xl border border-white/10 bg-[#100818]/46 p-3">
      <div className="flex items-start gap-3">
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-2xl border", toneClass)}>
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-black text-white">{title}</h3>
            <span className={cn("rounded-full border px-2 py-1 text-[0.62rem] font-black", toneClass)}>{status}</span>
          </div>
          <p className="mt-2 text-xs leading-5 text-white/60">{detail}</p>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {["Approve", "Edit", "Take over"].map((action) => (
              <button
                key={action}
                type="button"
                className="h-9 rounded-2xl border border-white/10 bg-white/[0.055] px-2 text-[0.68rem] font-black text-white/78"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
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
          : "mr-auto border border-[#ffb36d]/20 bg-[#ffb36d]/10 text-[#ffe1bd]"
      )}
    >
      <p className={cn("text-xs font-black uppercase", tone === "customer" ? "text-slate-500" : "text-[#ffe1bd]/70")}>{label}</p>
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
    <div className="relative flex items-center gap-2 rounded-2xl border border-white/10 bg-[#100818]/45 p-2.5">
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-2xl",
          active ? "bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] text-white" : "bg-[#ffb36d]/12 text-[#ffe1bd]"
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
          <p className="text-xs font-black uppercase tracking-wide text-[#b84d69]">What you get back</p>
          <h2 id="mobile-outputs-title" className="mt-2 text-2xl font-black leading-tight tracking-normal">
            A clear picture of the AI Lead Manager that fits.
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Tell us about your business and SignalOps will map what your AI Lead Manager should handle, ask, escalate, and hand off.
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
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black text-white shadow-xl shadow-pink-950/20"
            style={accentButtonStyle}
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
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#100818] text-[#ffb36d]">
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
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#ffb36d]/12 text-[#ffb36d]">
            <Wrench className="size-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#ffb36d]">Done for you</p>
            <h2 id="mobile-personal-title" className="mt-1 text-2xl font-black leading-tight tracking-normal">
              Trained around your business.
            </h2>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/68">
          SignalOps shapes your AI Lead Manager around how your calls, forms, DMs, quotes, appointments, and team handoffs actually work.
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
          title="See how this works for a mobile fleet wash company."
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
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#ffb36d]/10 text-[#ffb36d]">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-wide text-[#ffb36d]">{eyebrow}</p>
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
          className="mt-2 inline-flex text-sm font-black text-[#ffb36d]"
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
            "radial-gradient(circle at 80% 0%, rgba(255,179,109,0.18), transparent 14rem), rgba(255,255,255,0.1)"
        }}
      >
        <h2 id="mobile-final-title" className="text-2xl font-black leading-tight tracking-normal">
          Want to see the AI Lead Manager your business should be using?
        </h2>
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_home_final" }}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black shadow-xl shadow-pink-950/24"
          style={accentButtonStyle}
        >
          Get Started
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </section>
  );
}
