import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Mail,
  MessageSquareReply,
  PhoneMissed,
  PlayCircle,
  Route,
  SearchCheck,
  Send,
  Sparkles,
  Workflow,
  Zap
} from "lucide-react";
import { EnterpriseCommandDashboard } from "@/components/mobile-tests/EnterpriseCommandDashboard";
import { MobileCommandStickyCTA } from "@/components/mobile-tests/MobileCommandStickyCTA";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { getEmailHref, PRIMARY_CTA, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mobile Test 1 | SignalOps Enterprise Command Center",
  description:
    "A premium mobile-first SignalOps landing page concept for AI receptionist, lead response, intake, follow-up, and booking handoff systems.",
  robots: {
    index: false,
    follow: false
  }
};

const proofItems = [
  { label: "Instant replies", icon: Zap },
  { label: "Smart intake", icon: SearchCheck },
  { label: "Human handoff", icon: Route },
  { label: "Follow-up automation", icon: MessageSquareReply }
];

const problemCards = [
  {
    title: "Missed calls",
    copy: "A customer reaches out once, gets voicemail, and keeps shopping.",
    icon: PhoneMissed
  },
  {
    title: "Slow replies",
    copy: "A form fill waits too long before anyone asks the next question.",
    icon: Clock3
  },
  {
    title: "No follow-up",
    copy: "Quotes, photos, and booking intent sit open with no owner.",
    icon: MessageSquareReply
  }
];

const flowSteps = [
  {
    title: "Lead comes in",
    copy: "Calls, forms, texts, ads, DMs, and quote requests enter one response layer.",
    icon: Send
  },
  {
    title: "AI responds",
    copy: "SignalOps answers in seconds with the right intake path.",
    icon: Bot
  },
  {
    title: "AI collects details",
    copy: "Service, timing, urgency, photos, location, and fit are collected.",
    icon: ClipboardCheck
  },
  {
    title: "Hot leads get routed",
    copy: "Ready leads move to the owner, rep, calendar, or callback queue.",
    icon: Route
  },
  {
    title: "Follow-up keeps going",
    copy: "No-replies, open quotes, and stalled bookings keep moving.",
    icon: CalendarCheck2
  }
];

const packages = [
  {
    name: "Starter",
    copy: "One core lead source, instant reply, basic intake, and owner alerts."
  },
  {
    name: "Growth",
    copy: "Multi-source response, follow-up sequences, booking handoff, and reporting."
  },
  {
    name: "Custom",
    copy: "Advanced routing, CRM workflows, dashboards, locations, and custom rules."
  }
];

export default function MobileTestOnePage() {
  return (
    <div className="relative overflow-hidden bg-[#05070d] pb-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,20,36,0.98)_0%,#05070d_38%,#070b14_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.22),transparent_44%),linear-gradient(90deg,rgba(56,189,248,0.08),transparent_34%,rgba(52,211,153,0.08))]" />
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-[0.08]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <CommandNav />

        <section className="grid gap-6 pb-8 pt-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-16">
          <div className="max-w-xs sm:max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-semibold text-white/76 shadow-lg shadow-black/20">
              <Sparkles className="size-4 text-[#93c5fd]" aria-hidden="true" />
              Free Instant AI Lead System Preview
            </div>

            <h1 className="mt-4 max-w-xs text-4xl font-semibold leading-[1.05] tracking-normal text-white sm:max-w-3xl sm:text-6xl sm:leading-tight lg:text-7xl">
              Every lead answered. Every follow-up handled.
            </h1>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#cbd5e1] sm:max-w-2xl sm:text-lg sm:leading-8">
              SignalOps builds AI receptionist and lead response systems that capture, sort, route, follow up, and book local business leads automatically.
            </p>

            <div className="mt-5 grid max-w-xs gap-2.5 sm:max-w-xl sm:grid-cols-[1fr_auto]">
              <TrackedLink
                href={PRIMARY_CTA.href}
                eventName={ANALYTICS_EVENTS.previewCtaClicked}
                eventProperties={{ location: "mobile_test_1_enterprise_hero" }}
                className="inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-semibold shadow-2xl shadow-white/10 transition hover:bg-[#dbeafe]"
                style={{ color: "#05070d" }}
              >
                <span className="truncate">Get My Free Preview</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href="/demo"
                eventName={ANALYTICS_EVENTS.demoViewed}
                eventProperties={{ location: "mobile_test_1_enterprise_hero" }}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.055] px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                <PlayCircle className="size-4" aria-hidden="true" />
                View Live Demo
              </TrackedLink>
            </div>
          </div>

          <EnterpriseCommandDashboard />
        </section>

        <ProofStrip />
      </div>

      <ProblemSection />
      <SolutionSection />
      <PackagesTeaser />
      <ApexDemoTeaser />
      <FinalCTA />

      <MobileCommandStickyCTA source="mobile_test_1_enterprise_sticky" />
    </div>
  );
}

function CommandNav() {
  return (
    <header className="max-w-xs rounded-lg border border-white/10 bg-[#090e19]/80 px-3 py-3 shadow-2xl shadow-black/24 backdrop-blur-xl sm:max-w-none">
      <nav className="flex items-center justify-between gap-3" aria-label="SignalOps mobile test navigation">
        <div className="flex min-w-0 items-center gap-2">
          <Image src="/brand/signalops-logo-mark.svg" alt="" width={32} height={32} />
          <p className="text-base font-semibold leading-5 text-white">SignalOps</p>
        </div>

        <div className="flex min-w-0 shrink items-center gap-1.5">
          <TrackedLink
            href="/demo"
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "mobile_test_1_enterprise_nav" }}
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.045] px-2.5 text-xs font-semibold text-white/78 transition hover:bg-white/10"
          >
            Demo
          </TrackedLink>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_test_1_enterprise_nav" }}
            className="inline-flex h-9 min-w-0 items-center justify-center rounded-md bg-white px-2 text-xs font-semibold transition hover:bg-[#dbeafe]"
            style={{ color: "#05070d", fontSize: "0.68rem" }}
          >
            <span className="whitespace-nowrap">Get Free Preview</span>
          </TrackedLink>
        </div>
      </nav>
    </header>
  );
}

function ProofStrip() {
  return (
    <section aria-label="SignalOps value proof" className="pb-10">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {proofItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex min-h-14 items-center gap-2 rounded-md border border-white/10 bg-white/[0.045] px-3 py-3">
              <Icon className="size-4 shrink-0 text-[#93c5fd]" aria-hidden="true" />
              <p className="text-xs font-semibold leading-4 text-white/78">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="relative border-y border-white/10 bg-[#070b14]/88">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionKicker>Problem</SectionKicker>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl">
          Leads do not usually disappear. They get delayed, buried, or forgotten.
        </h2>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {problemCards.map((card) => (
            <CompactCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-7xl gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <div>
          <SectionKicker>Solution</SectionKicker>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl">
            SignalOps becomes the response layer behind your business.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#94a3b8]">
            The system handles the operational middle: response, intake, routing, reminders, and handoff.
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-black/20">
          <div className="grid gap-2">
            {flowSteps.map((step, index) => (
              <FlowStep key={step.title} index={index + 1} {...step} isLast={index === flowSteps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagesTeaser() {
  return (
    <section className="border-y border-white/10 bg-[#070b14]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionKicker>Systems</SectionKicker>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-normal text-white">
              Start focused. Expand when the lead flow needs it.
            </h2>
          </div>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_test_1_packages_teaser" }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-semibold transition hover:bg-[#dbeafe]"
            style={{ color: "#05070d" }}
          >
            Help me pick the right system
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {packages.map((plan) => (
            <article key={plan.name} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
              <p className="text-lg font-semibold text-white">{plan.name}</p>
              <p className="mt-2 text-sm leading-6 text-[#94a3b8]">{plan.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApexDemoTeaser() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-[#38bdf8]/20 bg-[linear-gradient(135deg,rgba(56,189,248,0.12),rgba(99,102,241,0.08),rgba(255,255,255,0.04))] p-5 shadow-2xl shadow-black/24">
          <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-white/78">
            <Workflow className="size-4 text-[#7dd3fc]" aria-hidden="true" />
            Apex Wheel Repair demo
          </div>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-white">
            See quote intake automation in a real service workflow.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#cbd5e1]">
            See how a wheel repair shop can sort curb rash, bent wheel, cracked wheel, refinishing, and mobile repair quote requests automatically.
          </p>
          <TrackedLink
            href="/demo"
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "mobile_test_1_apex_teaser" }}
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/12 bg-white px-4 text-sm font-semibold transition hover:bg-[#dbeafe]"
            style={{ color: "#05070d" }}
          >
            View Apex Demo
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-5 pt-2 sm:px-6 lg:grid-cols-[1fr_auto_auto] lg:items-center lg:px-8">
      <div>
        <SectionKicker>Next step</SectionKicker>
        <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-white">
          Get the preview before you commit to a build.
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#94a3b8]">
          Prefer email? Send your lead flow, website, and goals to {SITE_CONFIG.email}.
        </p>
      </div>
      <TrackedLink
        href={PRIMARY_CTA.href}
        eventName={ANALYTICS_EVENTS.previewCtaClicked}
        eventProperties={{ location: "mobile_test_1_final" }}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold transition hover:bg-[#dbeafe]"
        style={{ color: "#05070d" }}
      >
        Get My Free Preview
        <ArrowRight className="size-4" aria-hidden="true" />
      </TrackedLink>
      <TrackedLink
        href={getEmailHref()}
        eventName={ANALYTICS_EVENTS.contactClicked}
        eventProperties={{ location: "mobile_test_1_final_email", type: "email" }}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.055] px-5 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        <Mail className="size-4" aria-hidden="true" />
        Email
      </TrackedLink>
    </section>
  );
}

function CompactCard({
  copy,
  icon: Icon,
  title
}: {
  copy: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-xl shadow-black/12">
      <div className="flex size-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.055]">
        <Icon className="size-5 text-[#93c5fd]" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#94a3b8]">{copy}</p>
    </article>
  );
}

function FlowStep({
  copy,
  icon: Icon,
  index,
  isLast,
  title
}: {
  copy: string;
  icon: LucideIcon;
  index: number;
  isLast: boolean;
  title: string;
}) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-md border border-white/10 bg-[#0b1020]/70 p-3">
      <div className="flex flex-col items-center">
        <div className="flex size-10 items-center justify-center rounded-md bg-white text-sm font-semibold" style={{ color: "#05070d" }}>
          {index}
        </div>
        {!isLast ? <div className="mt-2 h-7 w-px bg-white/10" /> : null}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Icon className="size-4 shrink-0 text-[#93c5fd]" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
        <p className="mt-1 text-xs leading-5 text-[#94a3b8]">{copy}</p>
      </div>
    </div>
  );
}

function SectionKicker({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-semibold uppercase text-[#93c5fd]">
      <CheckCircle2 className="size-3.5" aria-hidden="true" />
      {children}
    </div>
  );
}
