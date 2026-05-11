import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  ClipboardCheck,
  Clock3,
  FileQuestion,
  Gauge,
  Inbox,
  Layers3,
  Mail,
  MessageSquareText,
  PhoneMissed,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Wrench
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { getEmailHref, PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LeadLeakPreviewBuilder } from "./LeadLeakPreviewBuilder";
import styles from "./mobile-test-2.module.css";

export const metadata: Metadata = {
  title: "Mobile Test 2 | SignalOps Lead Leak Scanner",
  description:
    "A premium mobile-first SignalOps test concept that scans local business lead flow for missed calls, slow replies, quote follow-up gaps, and booking handoff leaks.",
  robots: {
    index: false,
    follow: false
  }
};

const scanRows = [
  ["Lead Flow Scan", "Running", "accent"],
  ["Missed Call Risk", "High", "high"],
  ["Quote Follow-Up", "Weak", "weak"],
  ["Speed-to-Lead", "4.3s with SignalOps", "good"],
  ["Recovery Opportunity", "+29% more lead conversations", "good"],
  ["Status", "Preview ready", "accent"]
] satisfies Array<[string, string, "accent" | "high" | "weak" | "good"]>;

const leakPoints = [
  {
    leak: "Customer calls while the shop is busy",
    pain: "Missed calls turn into price shoppers before anyone replies.",
    fix: "AI text-back starts the conversation instantly.",
    pill: "Recovered in seconds",
    icon: PhoneMissed
  },
  {
    leak: "Website form sits too long",
    pain: "The customer is still comparing options while your form waits.",
    fix: "SignalOps responds, qualifies, and routes the lead.",
    pill: "Speed restored",
    icon: Inbox
  },
  {
    leak: "Photos never arrive",
    pain: "Quote requests stall when customers forget the missing details.",
    fix: "Automated reminders request photos and vehicle info.",
    pill: "Photos requested",
    icon: FileQuestion
  },
  {
    leak: "Quote gets no follow-up",
    pain: "Good opportunities fade after the first estimate.",
    fix: "Follow-up nudges keep the decision moving.",
    pill: "Follow-up active",
    icon: TimerReset
  },
  {
    leak: "Hot lead buried in texts or DMs",
    pain: "The lead exists, but nobody knows it needs action now.",
    fix: "A dashboard flags priority, source, next step, and owner handoff.",
    pill: "Priority visible",
    icon: MessageSquareText
  }
];

const apexOutput = [
  ["Service", "Curb rash repair"],
  ["Vehicle", "2018 BMW, 19-inch wheels"],
  ["Intent", "Quote request"],
  ["Needs photos", "Yes"],
  ["Mobile repair", "Requested"],
  ["Priority", "Warm / high intent"],
  ["Next action", "Request photos + offer appointment window"]
];

const responseLayers = [
  {
    title: "AI Receptionist",
    copy: "Replies instantly across forms, calls, texts, and DMs.",
    icon: MessageSquareText
  },
  {
    title: "AI Qualifier",
    copy: "Asks the right questions and structures the lead.",
    icon: ClipboardCheck
  },
  {
    title: "Follow-Up Engine",
    copy: "Nudges quotes, photo requests, and no-replies.",
    icon: TimerReset
  },
  {
    title: "Booking Handoff",
    copy: "Moves ready leads toward calendar, callback, or sales handoff.",
    icon: CalendarCheck2
  },
  {
    title: "Dashboard",
    copy: "Shows what came in, what is hot, and what needs action.",
    icon: BarChart3
  }
];

const previewIncludes = [
  { title: "Your current lead flow", icon: Route },
  { title: "Where leads are leaking", icon: AlertTriangle },
  { title: "Recommended AI receptionist flow", icon: MessageSquareText },
  { title: "Intake questions", icon: ClipboardCheck },
  { title: "Follow-up timeline", icon: Clock3 },
  { title: "Package recommendation", icon: Layers3 }
];

const credibilityCards = [
  "Built for local service businesses",
  "Designed around real quote requests",
  "Human review when AI is unsure",
  "Works with the tools you already use",
  "Starts with a preview before buildout"
];

export default function MobileTestTwoPage() {
  return (
    <div className={cn(styles.page, "mobile-test-2-page min-h-screen pb-24")}>
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <TopHeader />
        <Hero />
      </div>

      <LeakMap />

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <LeadLeakPreviewBuilder />
      </div>

      <ApexExample />
      <ResponseLayer />
      <RevenueMeter />
      <PreviewIncludes />
      <CredibilitySection />
      <FinalCTA />
      <StickyCTA />
    </div>
  );
}

function TopHeader() {
  return (
    <header className={cn(styles.header, "rounded-3xl border px-3 py-3")}>
      <nav className="flex items-center justify-between gap-3" aria-label="SignalOps lead leak scanner navigation">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image src="/brand/signalops-logo-mark.svg" alt="" width={34} height={34} />
          <span className={cn(styles.wordmark, "text-base font-black tracking-normal")}>SignalOps</span>
        </div>
        <span className={cn(styles.statusPill, "hidden min-h-9 items-center gap-2 rounded-full border px-3 text-xs font-black sm:inline-flex")}>
          <span className={styles.statusDot} aria-hidden="true" />
          Lead Leak Scanner
        </span>
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_test_2_header" }}
          className={cn(styles.primaryButton, "inline-flex h-10 shrink-0 items-center justify-center rounded-full px-4 text-sm font-black transition")}
        >
          Scan
        </TrackedLink>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="grid gap-7 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-14">
      <div>
        <div className={cn(styles.eyebrow, "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black")}>
          <Sparkles className="size-4" aria-hidden="true" />
          Free AI Lead System Preview
        </div>
        <h1 className={cn(styles.heroTitle, "mt-5 max-w-3xl font-black tracking-normal")}>
          Find the leads slipping through your business.
        </h1>
        <p className={cn(styles.heroCopy, "mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8")}>
          SignalOps maps your lead flow, finds the slow replies, missed calls, stale quote requests, and forgotten follow-ups, then builds the AI response system to fix them.
        </p>
        <div className="mt-6 grid gap-3 sm:max-w-xl sm:grid-cols-[1fr_auto]">
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_test_2_hero" }}
            className={cn(styles.primaryButton, "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-black transition")}
          >
            Run My Free Lead Leak Scan
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
          <TrackedLink
            href="/demo"
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "mobile_test_2_hero" }}
            className={cn(styles.secondaryButton, "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-5 py-4 text-sm font-black transition")}
          >
            View Live Demo
          </TrackedLink>
        </div>
      </div>

      <ScanCard />
    </section>
  );
}

function ScanCard() {
  return (
    <section className={cn(styles.scanCard, styles.scanGrid, "rounded-[2rem] border p-4")} aria-label="Lead Flow Scan status">
      <div className={styles.scanLine} aria-hidden="true" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3 border-b pb-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div>
            <p className="text-sm font-black text-white">Lead Flow Scan</p>
            <p className={cn(styles.heroCopy, "mt-1 text-xs")}>Revenue leak diagnostic</p>
          </div>
          <span className={cn(styles.miniPill, "rounded-full border px-3 py-1 text-xs font-black")}>
            Running
          </span>
        </div>

        <div className="mt-4 grid gap-2">
          {scanRows.map(([label, value, tone]) => (
            <div key={label} className={cn(styles.scanRow, "rounded-2xl border p-3")}>
              <div className="flex items-center justify-between gap-3">
                <p className={cn(styles.heroCopy, "text-xs font-black uppercase")}>{label}</p>
                <p
                  className={cn(
                    "text-sm font-black",
                    tone === "high" ? styles.riskHigh : tone === "weak" ? styles.riskWeak : tone === "good" ? styles.riskGood : styles.accent
                  )}
                >
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={cn(styles.outputCard, "mt-4 rounded-2xl border p-4")}>
          <div className="flex items-center gap-3">
            <Radar className={cn(styles.accent, "size-6")} aria-hidden="true" />
            <div>
              <p className="text-sm font-black text-white">Preview ready</p>
              <p className={cn(styles.heroCopy, "mt-1 text-xs leading-5")}>
                AI response system generated from your leak profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeakMap() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="leak-map-title">
      <SectionHeading
        eyebrow="Lead leak map"
        title="Every lost lead has a trail."
        copy="SignalOps turns that trail into a response system: capture, sort, follow up, and hand off."
      />
      <div className="mt-6 grid gap-3">
        {leakPoints.map((point, index) => (
          <LeakPoint key={point.leak} index={index + 1} {...point} />
        ))}
      </div>
    </section>
  );
}

function LeakPoint({
  fix,
  icon: Icon,
  index,
  leak,
  pain,
  pill
}: {
  fix: string;
  icon: LucideIcon;
  index: number;
  leak: string;
  pain: string;
  pill: string;
}) {
  return (
    <article className={cn(styles.leakCard, "rounded-[1.5rem] border p-4")}>
      <div className="grid grid-cols-[2.65rem_1fr] gap-3">
        <div className={cn(styles.leakIndex, "flex size-11 items-center justify-center rounded-2xl text-sm font-black")}>
          {index}
        </div>
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-black tracking-normal text-white">{leak}</h3>
              <p className={cn(styles.heroCopy, "mt-2 text-sm leading-6")}>{pain}</p>
            </div>
            <Icon className={cn(styles.accent, "mt-1 size-5 shrink-0")} aria-hidden="true" />
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
            <p className={cn(styles.fixText, "text-sm font-black leading-6")}>{fix}</p>
            <span className={cn(styles.miniPill, "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-black")}>
              {pill}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function ApexExample() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="apex-title">
      <div className={cn(styles.apexCard, "rounded-[2rem] border p-4 sm:p-6")}>
        <SectionHeading
          eyebrow="Apex Wheel Repair example"
          title="Example: a wheel repair quote that does not go cold."
          copy="The AI system keeps the quote moving before the customer disappears."
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-3">
            <article className={cn(styles.chatCustomer, "max-w-[88%] rounded-[1.35rem] p-4")}>
              <p className={cn(styles.speakerMutedDark, "text-xs font-black uppercase")}>Customer</p>
              <p className="mt-2 text-sm leading-6">I have curb rash on two wheels. Can you do mobile repair?</p>
            </article>
            <article className={cn(styles.chatAi, "max-w-[92%] rounded-[1.35rem] p-4")}>
              <p className={cn(styles.speakerMutedLight, "text-xs font-black uppercase")}>SignalOps</p>
              <p className="mt-2 text-sm leading-6">
                Send photos of both wheels and your vehicle details. I&apos;ll get your quote started and check mobile availability.
              </p>
            </article>
          </div>

          <div className={cn(styles.apexOutput, "rounded-[1.5rem] border p-4")}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>AI output</p>
                <h3 className="mt-1 text-2xl font-black tracking-normal text-white">Quote summary</h3>
              </div>
              <Wrench className={cn(styles.accent, "size-7 shrink-0")} aria-hidden="true" />
            </div>
            <div className="mt-4 grid gap-2">
              {apexOutput.map(([label, value]) => (
                <div key={label} className={cn(styles.outputRow, "grid gap-1 rounded-2xl border p-3 sm:grid-cols-[8rem_1fr]")}>
                  <p className={cn(styles.heroCopy, "text-xs font-black uppercase")}>{label}</p>
                  <p className="text-sm font-black leading-5 text-white">{value}</p>
                </div>
              ))}
            </div>
            <TrackedLink
              href="/demo"
              eventName={ANALYTICS_EVENTS.demoViewed}
              eventProperties={{ location: "mobile_test_2_apex" }}
              className={cn(styles.secondaryButton, "mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border px-5 text-sm font-black transition")}
            >
              View Apex Wheel Repair Demo
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResponseLayer() {
  return (
    <section className={styles.lightBand} aria-labelledby="response-layer-title">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>AI response system</p>
          <h2 id="response-layer-title" className={cn(styles.lightTitle, "mt-2 max-w-3xl text-3xl font-black leading-tight tracking-normal sm:text-5xl")}>
            Not one chatbot. A full response layer.
          </h2>
        </div>
        <div className="mt-6 grid gap-3">
          {responseLayers.map((layer, index) => (
            <LayerCard key={layer.title} index={index + 1} {...layer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LayerCard({
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
    <article className={cn(styles.layerCard, "relative overflow-hidden rounded-[1.5rem] border p-4")}>
      <div className={cn(styles.layerRail, "absolute bottom-0 left-0 top-0 w-1")} aria-hidden="true" />
      <div className="grid grid-cols-[2.65rem_1fr] gap-3">
        <div className={cn(styles.layerIndex, "flex size-11 items-center justify-center rounded-2xl text-sm font-black")}>
          {index}
        </div>
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-black tracking-normal">{title}</h3>
              <p className={cn(styles.lightMuted, "mt-2 text-sm leading-6")}>{copy}</p>
            </div>
            <Icon className={cn(styles.greenIcon, "mt-1 size-5 shrink-0")} aria-hidden="true" />
          </div>
        </div>
      </div>
    </article>
  );
}

function RevenueMeter() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="revenue-meter-title">
      <div className={cn(styles.meterCard, "rounded-[2rem] border p-4 sm:p-6")}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>Revenue recovery meter</p>
            <h2 id="revenue-meter-title" className="mt-2 max-w-3xl text-3xl font-black leading-tight tracking-normal text-white sm:text-5xl">
              How many jobs does the system need to recover?
            </h2>
          </div>
          <Gauge className={cn(styles.accent, "hidden size-8 shrink-0 sm:block")} aria-hidden="true" />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["Average job value", "$250"],
            ["Growth monthly support", "$500"],
            ["Break-even", "2.0 jobs/month"]
          ].map(([label, value]) => (
            <div key={label} className={cn(styles.scanRow, "rounded-2xl border p-4")}>
              <p className={cn(styles.heroCopy, "text-xs font-black uppercase")}>{label}</p>
              <p className="mt-2 text-2xl font-black tracking-normal text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className={cn(styles.meterTrack, "mt-5 h-3 overflow-hidden rounded-full")}>
          <div className={cn(styles.meterFill, "h-full rounded-full")} />
        </div>
        <p className={cn(styles.heroCopy, "mt-4 text-sm leading-7")}>
          For many service businesses, recovering just a few missed opportunities can cover the system.
        </p>
        <p className={cn(styles.disclaimer, "mt-3 text-xs leading-5")}>
          Estimate only. Results depend on your market, offer, sales process, and follow-up quality.
        </p>
      </div>
    </section>
  );
}

function PreviewIncludes() {
  return (
    <section className={styles.lightBand} aria-labelledby="preview-includes-title">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>Free preview</p>
        <h2 id="preview-includes-title" className={cn(styles.lightTitle, "mt-2 max-w-3xl text-3xl font-black leading-tight tracking-normal sm:text-5xl")}>
          Your free preview shows the system before we build it.
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-6">
          {previewIncludes.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className={cn(styles.previewLightCard, "rounded-[1.35rem] border p-4")}>
                <Icon className={cn(styles.greenIcon, "size-5")} aria-hidden="true" />
                <h3 className="mt-4 text-sm font-black leading-5">{item.title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CredibilitySection() {
  return (
    <section className={styles.lightBand} aria-labelledby="credibility-title">
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <h2 id="credibility-title" className={cn(styles.lightTitle, "max-w-3xl text-3xl font-black leading-tight tracking-normal sm:text-4xl")}>
          Built like business infrastructure, not a gimmick.
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-5">
          {credibilityCards.map((card) => (
            <article key={card} className={cn(styles.credibilityCard, "rounded-[1.35rem] border p-4")}>
              <ShieldCheck className={cn(styles.greenIcon, "size-5")} aria-hidden="true" />
              <p className="mt-4 text-sm font-black leading-6">{card}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className={cn(styles.finalPanel, "rounded-[2rem] border p-5 sm:p-7")}>
        <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>Next step</p>
        <h2 className="mt-2 max-w-3xl text-4xl font-black leading-tight tracking-normal text-white sm:text-6xl">
          Run the scan. See the system. Then decide.
        </h2>
        <p className={cn(styles.heroCopy, "mt-4 max-w-2xl text-sm leading-7 sm:text-base")}>
          Send your business details and SignalOps will generate a personalized AI lead system preview before anything is built.
        </p>
        <div className="mt-6 grid gap-3 sm:max-w-xl sm:grid-cols-[1fr_auto]">
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_test_2_final" }}
            className={cn(styles.primaryButton, "inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black transition")}
          >
            Run My Free Lead Leak Scan
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
          <TrackedLink
            href={getEmailHref()}
            eventName={ANALYTICS_EVENTS.contactClicked}
            eventProperties={{ location: "mobile_test_2_final_email", type: "email" }}
            className={cn(styles.emailButton, "inline-flex h-12 items-center justify-center gap-2 rounded-2xl border px-5 text-sm font-black transition")}
          >
            <Mail className="size-4" aria-hidden="true" />
            Email SignalOps
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

function StickyCTA() {
  return (
    <div className={cn(styles.stickyBar, "fixed inset-x-0 bottom-0 z-50 border-t px-3 py-3 backdrop-blur-xl md:hidden")}>
      <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] items-center gap-3">
        <div>
          <p className="text-xs font-black uppercase text-white">Free Lead Leak Scan</p>
          <p className={cn(styles.stickySubtext, "text-xs")}>Preview the system first</p>
        </div>
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_test_2_sticky" }}
          className={cn(styles.primaryButton, "inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black transition")}
        >
          Start Scan
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </div>
  );
}

function SectionHeading({
  copy,
  eyebrow,
  title
}: {
  copy?: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>{eyebrow}</p>
      <h2 className={cn(styles.sectionTitle, "mt-2 text-3xl font-black leading-tight tracking-normal sm:text-5xl")}>
        {title}
      </h2>
      {copy ? <p className={cn(styles.heroCopy, "mt-3 text-sm leading-7")}>{copy}</p> : null}
    </div>
  );
}
