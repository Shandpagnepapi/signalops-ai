import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Eye,
  FileText,
  MessageCircle,
  PhoneCall,
  Radio,
  RefreshCcw,
  Route,
  ShieldCheck,
  Sparkles,
  Tags,
  UserRoundCheck
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import styles from "./mobile-test-3.module.css";

export const metadata: Metadata = {
  title: "Mobile Test 3 | SignalOps AI Concierge App",
  description:
    "An app-like mobile SignalOps landing page concept showing AI receptionist, lead intake, follow-up, and booking handoff workflows.",
  robots: {
    index: false,
    follow: false
  }
};

const conversation = [
  {
    speaker: "Customer",
    tone: "customer",
    text: "We have 28 service vans across two locations. Can you quote biweekly after-hours washing?"
  },
  {
    speaker: "SignalOps AI",
    tone: "ai",
    text: "Yes - send the vehicle mix, service addresses, and preferred wash window. I can get the fleet quote path started."
  },
  {
    speaker: "Customer",
    tone: "customer",
    text: "Mostly HVAC vans, Dallas and Irving sites, weeknights are best."
  },
  {
    speaker: "SignalOps AI",
    tone: "ai",
    text: "Got it. I'll flag this as a recurring fleet account opportunity and send the owner the account details."
  }
] satisfies Array<{
  speaker: string;
  tone: "customer" | "ai";
  text: string;
}>;

const leadDetails = [
  ["Priority", "Recurring account opportunity"],
  ["Service", "Biweekly fleet washing"],
  ["Fleet", "28 HVAC service vans"],
  ["Locations", "Dallas + Irving"],
  ["Suggested action", "Confirm service area and send fleet quote path"]
];

const timelineSteps = [
  { title: "Lead captured", detail: "RouteWash fleet quote request received", icon: MessageCircle },
  { title: "AI replied in 4.3s", detail: "Customer got a useful first response", icon: Clock3 },
  { title: "Details collected", detail: "Fleet size, vehicle types, locations, and wash window", icon: ClipboardList },
  { title: "Site notes requested", detail: "AI keeps the quote moving", icon: FileText },
  { title: "Owner alerted", detail: "Recurring account summary sent with next action", icon: UserRoundCheck },
  { title: "Follow-up scheduled", detail: "Missing site notes and no-reply nudges ready", icon: RefreshCcw },
  { title: "Quote handoff ready", detail: "Route-friendly quote path can be offered", icon: CalendarCheck2 }
];

const chatbotItems = [
  {
    title: "Works behind every lead source",
    copy: "Forms, calls, texts, DMs, and quote requests can all feed the same response layer.",
    icon: Radio
  },
  {
    title: "Routes uncertain leads to humans",
    copy: "Risky, unclear, or high-value conversations get flagged before the wrong promise is made.",
    icon: ShieldCheck
  },
  {
    title: "Creates usable team notes",
    copy: "Your team sees the service, urgency, details, missing info, and next best action.",
    icon: FileText
  },
  {
    title: "Follows up automatically",
    copy: "Detail requests, quote reminders, and no-reply conversations keep moving.",
    icon: RefreshCcw
  }
];

const dashboardMetrics = [
  ["482", "leads"],
  ["127", "booked jobs"],
  ["4.3s", "response"],
  ["29%", "more lead conversations"]
];

const useCases = [
  {
    title: "Fleet wash quote intake",
    copy: "Fleet size, vehicle types, locations, wash frequency, and route windows.",
    icon: Tags
  },
  {
    title: "Missed-call text back",
    copy: "Answer while the owner is working, driving, or with another customer.",
    icon: PhoneCall
  },
  {
    title: "Med spa consultation booking",
    copy: "Collect treatment interest, timing, and consult readiness before handoff.",
    icon: CalendarCheck2
  },
  {
    title: "Contractor estimate requests",
    copy: "Capture photos, project type, location, urgency, and service area fit.",
    icon: ClipboardList
  },
  {
    title: "Insurance lead intake",
    copy: "Sort high-intent inquiries from low-fit shoppers before a producer calls.",
    icon: Route
  }
];

export default function MobileTestThreePage() {
  return (
    <div className={cn(styles.page, "mobile-test-3-page min-h-screen pb-24")}>
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <AppHeader />
        <Hero />
      </div>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <ConversationMockup />
        <div className="grid gap-4">
          <LeadCard />
          <Timeline />
        </div>
      </section>

      <NotAChatbot />
      <MiniDashboard />
      <UseCases />
      <FinalCTA />
      <MobileConciergeStickyCTA />
    </div>
  );
}

function AppHeader() {
  return (
    <header className={cn(styles.header, "rounded-2xl border px-3 py-3")}>
      <nav className="grid gap-3 sm:flex sm:items-center sm:justify-between" aria-label="SignalOps AI concierge navigation">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <Image src="/brand/signalops-logo-mark.svg" alt="" width={34} height={34} />
            <span className="text-base font-black tracking-normal">SignalOps</span>
          </div>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_test_3_header" }}
            className={cn(styles.headerCta, "inline-flex h-10 shrink-0 items-center justify-center rounded-full px-4 text-sm font-black transition sm:hidden")}
          >
            Free Preview
          </TrackedLink>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className={cn(styles.statusPill, "inline-flex min-h-9 items-center gap-2 rounded-full border px-3 text-xs font-black")}>
            <span className={styles.liveDot} aria-hidden="true" />
            AI Lead System Online
          </span>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_test_3_header_desktop" }}
            className={cn(styles.headerCta, "hidden h-10 shrink-0 items-center justify-center rounded-full px-4 text-sm font-black transition sm:inline-flex")}
          >
            Free Preview
          </TrackedLink>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="grid gap-6 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:py-12">
      <div>
        <div className={cn(styles.kicker, "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black")}>
          <Bot className="size-4" aria-hidden="true" />
          AI Concierge App Concept
        </div>
        <h1 className={cn(styles.heroTitle, "mt-5 max-w-3xl font-black tracking-normal")}>
          Meet the AI layer that answers leads before they go cold.
        </h1>
        <p className={cn(styles.heroCopy, "mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8")}>
          SignalOps builds AI receptionist, intake, follow-up, and booking systems for service businesses that cannot afford missed opportunities.
        </p>
      </div>

      <div className={cn(styles.heroPanel, "rounded-3xl border p-4")}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black">RouteWash Mobile Fleet Care</p>
            <p className={styles.mutedText}>Live fleet account preview</p>
          </div>
          <span className={cn(styles.reviewBadge, "rounded-full px-3 py-1 text-xs font-black")}>
            Owner handoff ready
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ["Intent", "High"],
            ["Source", "SMS"],
            ["Route", "Owner"]
          ].map(([label, value]) => (
            <div key={label} className={cn(styles.tinyMetric, "rounded-2xl border p-3")}>
              <p className={styles.mutedText}>{label}</p>
              <p className="mt-1 text-lg font-black">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConversationMockup() {
  return (
    <section className={cn(styles.phoneShell, "rounded-[2rem] border p-3 shadow-2xl")} aria-labelledby="live-conversation-title">
      <div className={cn(styles.appScreen, "rounded-[1.55rem] p-3")}>
        <div className="flex items-center justify-between gap-3 border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-3">
            <div className={cn(styles.aiAvatar, "flex size-10 items-center justify-center rounded-2xl")}>
              <Sparkles className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="live-conversation-title" className="text-sm font-black">
                Live conversation
              </h2>
              <p className={styles.screenMuted}>RouteWash fleet quote intake</p>
            </div>
          </div>
          <span className={cn(styles.onlineChip, "rounded-full px-2.5 py-1 text-[0.68rem] font-black")}>
            Online
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {conversation.map((message) => (
            <article
              key={message.text}
              className={cn(
                styles.chatBubble,
                message.tone === "ai" ? styles.aiBubble : styles.customerBubble,
                "rounded-3xl p-3"
              )}
            >
              <p className={cn(styles.bubbleSpeaker, "text-[0.68rem] font-black uppercase")}>
                {message.speaker}
              </p>
              <p className="mt-1 text-sm leading-6">{message.text}</p>
            </article>
          ))}
        </div>

        <div className={cn(styles.typingBar, "mt-4 flex items-center justify-between gap-3 rounded-full px-3 py-2")}>
          <span className={styles.screenMuted}>Summary is being prepared</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function LeadCard() {
  return (
    <section className={cn(styles.card, "rounded-3xl border p-4")} aria-labelledby="ai-lead-card-title">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>AI lead card</p>
          <h2 id="ai-lead-card-title" className="mt-1 text-2xl font-black tracking-normal">
            Fleet quote request, ready for owner handoff.
          </h2>
        </div>
        <div className={cn(styles.priorityIcon, "flex size-11 shrink-0 items-center justify-center rounded-2xl")}>
          <Eye className="size-5" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {leadDetails.map(([label, value]) => (
          <div key={label} className={cn(styles.detailRow, "grid gap-1 rounded-2xl border p-3 sm:grid-cols-[8rem_1fr]")}>
            <p className={cn(styles.mutedText, "text-xs font-black uppercase")}>{label}</p>
            <p className="text-sm font-black leading-5">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["recurring account", "after-hours", "fleet quote"].map((tag) => (
          <span key={tag} className={cn(styles.tag, "rounded-full border px-3 py-1 text-xs font-black")}>
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className={cn(styles.card, "rounded-3xl border p-4")} aria-labelledby="handoff-timeline-title">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>Handoff timeline</p>
          <h2 id="handoff-timeline-title" className="mt-1 text-2xl font-black tracking-normal">
            From first message to booking-ready.
          </h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {timelineSteps.map((step, index) => (
          <TimelineRow key={step.title} index={index} {...step} />
        ))}
      </div>
    </section>
  );
}

function TimelineRow({
  detail,
  icon: Icon,
  index,
  title
}: {
  detail: string;
  icon: LucideIcon;
  index: number;
  title: string;
}) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-3">
      <div className="relative flex justify-center">
        {index < timelineSteps.length - 1 ? <span className={styles.timelineLine} aria-hidden="true" /> : null}
        <div className={cn(styles.timelineIcon, "relative z-10 flex size-9 items-center justify-center rounded-2xl")}>
          <Icon className="size-4" aria-hidden="true" />
        </div>
      </div>
      <div className={cn(styles.timelineCard, "rounded-2xl border p-3")}>
        <p className="text-sm font-black">{title}</p>
        <p className={cn(styles.mutedText, "mt-1 text-xs leading-5")}>{detail}</p>
      </div>
    </div>
  );
}

function NotAChatbot() {
  return (
    <section className={styles.lightSection}>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>Not just a chatbot</p>
        <h2 className="mt-2 max-w-3xl text-3xl font-black leading-tight tracking-normal sm:text-4xl">
          It behaves like the response layer behind your business.
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {chatbotItems.map((item) => (
            <ActionCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ActionCard({
  copy,
  icon: Icon,
  title
}: {
  copy: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <article className={cn(styles.lightCard, "rounded-3xl border p-4")}>
      <div className={cn(styles.lightIcon, "flex size-11 items-center justify-center rounded-2xl")}>
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-black tracking-normal">{title}</h3>
      <p className={cn(styles.bodyText, "mt-2 text-sm leading-6")}>{copy}</p>
    </article>
  );
}

function MiniDashboard() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className={cn(styles.dashboard, "rounded-[2rem] border p-4")}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>Mini dashboard</p>
            <h2 className="mt-1 text-2xl font-black tracking-normal">Lead operations at a glance.</h2>
          </div>
          <CheckCircle2 className={cn(styles.greenIcon, "size-7 shrink-0")} aria-hidden="true" />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {dashboardMetrics.map(([value, label]) => (
            <div key={label} className={cn(styles.dashboardMetric, "rounded-3xl border p-4")}>
              <p className="text-3xl font-black tracking-normal">{value}</p>
              <p className={cn(styles.mutedText, "mt-1 text-xs font-black uppercase leading-5")}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className={styles.deepSection}>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className={cn(styles.deepEyebrow, "text-xs font-black uppercase")}>Use cases</p>
        <h2 className="mt-2 max-w-3xl text-3xl font-black leading-tight tracking-normal sm:text-4xl">
          Built for service businesses where every lead needs a next step.
        </h2>
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible">
          {useCases.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className={cn(styles.useCaseCard, "min-w-[16rem] rounded-3xl border p-4 md:min-w-0")}>
                <div className={cn(styles.deepIcon, "flex size-11 items-center justify-center rounded-2xl")}>
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-black tracking-normal">{item.title}</h3>
                <p className={cn(styles.deepMuted, "mt-2 text-sm leading-6")}>{item.copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className={cn(styles.finalPanel, "rounded-[2rem] border p-5 sm:p-7")}>
        <div className="max-w-3xl">
          <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>Free AI Preview</p>
          <h2 className="mt-2 text-3xl font-black leading-tight tracking-normal sm:text-5xl">
            See your AI lead system before we build it.
          </h2>
          <p className={cn(styles.heroCopy, "mt-3 text-sm leading-7")}>
            Get a realistic preview of the assistant, lead card, handoff rules, and follow-up path SignalOps would set up for your business.
          </p>
        </div>
        <div className="mt-6 grid gap-3 sm:max-w-xl sm:grid-cols-[1fr_auto]">
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_test_3_final" }}
            className={cn(styles.primaryButton, "inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black transition")}
          >
            Get My Free Preview
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
          <TrackedLink
            href="/demo"
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "mobile_test_3_final" }}
            className={cn(styles.secondaryButton, "inline-flex h-12 items-center justify-center gap-2 rounded-2xl border px-5 text-sm font-black transition")}
          >
            View Demo
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

function MobileConciergeStickyCTA() {
  return (
    <div className={cn(styles.stickyBar, "fixed inset-x-0 bottom-0 z-50 border-t px-3 py-3 backdrop-blur-xl md:hidden")}>
      <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] items-center gap-3">
        <div>
          <p className="text-xs font-black uppercase">Free AI Preview</p>
          <p className={styles.stickySubtext}>AI lead system mockup</p>
        </div>
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_test_3_sticky" }}
          className={cn(styles.primaryButton, "inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black transition")}
        >
          Start
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </div>
  );
}
