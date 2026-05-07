import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  HelpCircle,
  Inbox,
  MessageSquareReply,
  SearchCheck,
  Send,
  Star,
  TimerReset,
  Wrench
} from "lucide-react";
import { LocalCloserStickyCTA } from "@/components/mobile-tests/LocalCloserStickyCTA";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import styles from "./mobile-test-2.module.css";

export const metadata: Metadata = {
  title: "Mobile Test 2 | SignalOps Local Business Closer",
  description:
    "A direct mobile-first SignalOps landing page concept for local businesses that need faster AI lead response, follow-up, and routing.",
  robots: {
    index: false,
    follow: false
  }
};

const painItems = [
  "People call while you are working",
  "Form leads sit too long",
  "Customers forget to send photos",
  "Quotes do not get followed up",
  "Good leads get buried in texts or DMs",
  "Nobody knows which lead is hottest"
];

const whatItDoes = [
  {
    title: "Answers fast",
    copy: "New calls, forms, texts, and DMs get a real response while the lead is still warm.",
    icon: TimerReset
  },
  {
    title: "Asks the right questions",
    copy: "It collects service, timeline, photos, location, and the details your team needs.",
    icon: SearchCheck
  },
  {
    title: "Scores the lead",
    copy: "Hot, urgent, and high-value jobs are separated from casual questions.",
    icon: Star
  },
  {
    title: "Sends the hot ones to you",
    copy: "The owner or rep gets a clean summary with what to do next.",
    icon: Send
  },
  {
    title: "Follows up automatically",
    copy: "Open quotes, no-replies, and missing photos keep getting handled.",
    icon: MessageSquareReply
  },
  {
    title: "Shows one dashboard",
    copy: "Your lead status, source, score, notes, and next step stay visible.",
    icon: ClipboardCheck
  }
];

const apexSteps = [
  "Customer asks about curb rash",
  "AI requests wheel photos",
  "AI checks number of wheels",
  "AI asks mobile or shop visit",
  "Bent or cracked wheel leads are flagged for human review",
  "Shop owner gets the summary"
];

const beforeItems = ["Missed calls", "Slow replies", "Scattered notes", "Manual follow-up"];
const afterItems = ["Instant replies", "Clean intake", "Hot lead alerts", "Follow-up handled"];

const packages = [
  {
    name: "Starter",
    bestFor: "One main lead source",
    copy: "Fast reply, simple qualification, owner alerts, and basic follow-up."
  },
  {
    name: "Growth",
    bestFor: "Busy multi-source shops",
    copy: "Calls, forms, DMs, scoring, follow-up, routing, and dashboard visibility."
  },
  {
    name: "Custom",
    bestFor: "Complex teams or workflows",
    copy: "Custom routing, CRM or calendar integrations, reporting, and advanced rules."
  }
];

const faqs = [
  {
    question: "Is this a chatbot?",
    answer:
      "Not the usual website widget. SignalOps works behind your calls, forms, texts, DMs, and quote requests so leads get handled faster."
  },
  {
    question: "Do I need a CRM?",
    answer:
      "No. SignalOps can start with your current workflow, then connect a CRM later if it helps."
  },
  {
    question: "Can it work with quote requests?",
    answer:
      "Yes. Quote intake is one of the best fits, especially when you need photos, service details, timing, or location."
  },
  {
    question: "What if AI is unsure?",
    answer:
      "Unclear, risky, or high-value leads can route to a person with the details already collected."
  },
  {
    question: "Can it ask customers for photos?",
    answer:
      "Yes. It can request photos, remind customers, and attach them to the lead summary for review."
  }
];

export default function MobileTestTwoPage() {
  return (
    <div className={cn(styles.page, "mobile-test-2-page min-h-screen overflow-hidden pb-24")}>
      <div
        className={cn(styles.clamp, "mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8")}
        style={{ width: "100vw", maxWidth: "100vw", boxSizing: "border-box" }}
      >
        <TopBar />
        <Hero />
      </div>

      <PainChecklist />
      <WhatSignalOpsDoes />
      <ApexExample />
      <BeforeAfter />
      <PackagePicker />
      <FAQSection />
      <FinalCTA />

      <LocalCloserStickyCTA source="mobile_test_2_local_closer_sticky" />
    </div>
  );
}

function TopBar() {
  return (
    <header className={cn(styles.topBar, "rounded-lg border px-3 py-3 shadow-xl")}>
      <nav className={cn(styles.topNav, "flex items-center justify-between gap-3")} aria-label="SignalOps local business closer navigation">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image src="/brand/signalops-logo-mark.svg" alt="" width={32} height={32} />
          <p className={cn(styles.strongText, "text-base font-black tracking-normal")}>SignalOps</p>
        </div>
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_test_2_top_bar" }}
          className={cn(styles.primaryButton, "inline-flex h-10 shrink-0 items-center justify-center rounded-md px-3.5 text-sm font-black transition")}
        >
          Free Preview
        </TrackedLink>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="grid gap-6 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-14">
      <div>
        <div className={cn(styles.kicker, "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black")}>
          <AlertTriangle className="size-4" aria-hidden="true" />
          Free Instant AI Lead System Preview
        </div>
        <h1 className={cn(styles.title, styles.heroTitle, "mt-5 max-w-3xl font-black tracking-normal")}>
          Your next customer should not be waiting in a missed call, inbox, or form.
        </h1>
        <p className={cn(styles.bodyText, "mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8")}>
          SignalOps sets up AI-powered lead response so new inquiries get answered, qualified, followed up with, and routed before they go cold.
        </p>

        <div className="mt-6 grid gap-3 sm:max-w-xl sm:grid-cols-[1fr_auto]">
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_test_2_hero" }}
            className={cn(styles.primaryButton, "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-4 text-base font-black transition")}
          >
            Get My Free Preview
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
          <TrackedLink
            href="/demo"
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "mobile_test_2_hero_wheel_demo" }}
            className={cn(styles.secondaryButton, "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-5 py-4 text-base font-black shadow-lg transition")}
          >
            See the Wheel Repair Demo
          </TrackedLink>
        </div>
      </div>

      <LeadSnapshot />
    </section>
  );
}

function LeadSnapshot() {
  return (
    <div className={cn(styles.card, "rounded-lg border p-4 shadow-2xl")}>
      <div className="flex items-center justify-between gap-3 border-b pb-3" style={{ borderColor: "rgba(17, 24, 39, 0.1)" }}>
        <div>
          <p className={cn(styles.strongText, "text-sm font-black")}>Today&apos;s lead board</p>
          <p className={cn(styles.mutedText, "mt-1 text-xs font-semibold")}>What a busy shop owner needs to see</p>
        </div>
        <span className={cn(styles.liveBadge, "rounded-full px-3 py-1 text-xs font-black")}>
          Live
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["18", "new leads"],
          ["6", "hot"],
          ["4.3s", "reply"]
        ].map(([value, label]) => (
          <div key={label} className={cn(styles.metricCard, "rounded-md border p-3")}>
            <p className={cn(styles.strongText, "text-2xl font-black")}>{value}</p>
            <p className={cn(styles.mutedText, "mt-1 text-[0.68rem] font-bold uppercase leading-4")}>{label}</p>
          </div>
        ))}
      </div>

      <div className={cn(styles.hotCard, "mt-3 rounded-lg border p-4")}>
        <div className="flex items-start gap-3">
          <div className={cn(styles.amberText, "flex size-10 shrink-0 items-center justify-center rounded-md bg-white")}>
            <Wrench className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className={cn(styles.strongText, "text-sm font-black")}>Hot lead: curb rash quote</p>
            <p className={cn(styles.bodyText, "mt-1 text-sm leading-6")}>
              Two wheels, photos requested, mobile repair preferred, owner summary ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PainChecklist() {
  return (
    <section className={cn(styles.whiteSection, "border-y")}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Lead leak check"
          title="If this sounds familiar, you are leaking leads."
        />
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {painItems.map((item) => (
            <div key={item} className={cn(styles.metricCard, "flex gap-3 rounded-lg border p-4")}>
              <CheckCircle2 className={cn(styles.greenText, "mt-0.5 size-5 shrink-0")} aria-hidden="true" />
              <p className={cn(styles.strongText, "text-base font-bold leading-6")}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatSignalOpsDoes() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="What SignalOps does"
        title="The first response, follow-up, and handoff stop depending on memory."
        description="Plain-English automation for real businesses: answer, qualify, route, follow up, and show the status."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {whatItDoes.map((item) => (
          <SimpleActionCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

function ApexExample() {
  return (
    <section className={cn(styles.darkSection, "border-y")}>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <div className={cn(styles.darkEyebrow, "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black")}>
            <Wrench className="size-4" aria-hidden="true" />
            Apex Wheel Repair example
          </div>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-normal sm:text-4xl">
            A wheel repair lead should arrive with the details already collected.
          </h2>
          <p className={cn(styles.darkMuted, "mt-3 text-sm leading-7")}>
            The customer gets helped immediately. The shop owner gets a clean summary instead of chasing details across calls, texts, and photos.
          </p>
          <TrackedLink
            href="/demo"
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "mobile_test_2_apex_example" }}
            className={cn(styles.lightButton, "mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-base font-black transition")}
          >
            See the Wheel Repair Demo
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
        </div>

        <div className={cn(styles.darkPanel, "rounded-lg border p-3")}>
          <div className="grid gap-2">
            {apexSteps.map((step, index) => (
              <div key={step} className={cn(styles.darkStep, "flex gap-3 rounded-md border p-3")}>
                <div className={cn(styles.stepBadge, "flex size-8 shrink-0 items-center justify-center rounded-md text-sm font-black")}>
                  {index + 1}
                </div>
                <p className="text-sm font-bold leading-6 text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Before and after"
        title="Same leads. Better handling."
      />
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <BeforeAfterCard title="Before" items={beforeItems} tone="bad" />
        <BeforeAfterCard title="After" items={afterItems} tone="good" />
      </div>
    </section>
  );
}

function PackagePicker() {
  return (
    <section className={cn(styles.whiteSection, "border-y")}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Pick a starting point"
          title="Start with the system level that fits your business."
        />
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {packages.map((plan) => (
            <article key={plan.name} className={cn(styles.packageCard, "min-w-[17rem] rounded-lg border p-5 shadow-xl md:min-w-0")}>
              <p className={cn(styles.strongText, "text-xl font-black")}>{plan.name}</p>
              <p className={cn(styles.amberText, "mt-2 text-xs font-black uppercase tracking-normal")}>{plan.bestFor}</p>
              <p className={cn(styles.bodyText, "mt-3 text-sm leading-6")}>{plan.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="FAQ" title="Short answers for busy owners." />
      <div className="mt-6 grid gap-3">
        {faqs.map((faq) => (
          <details key={faq.question} className={cn(styles.faqCard, "group rounded-lg border p-4 shadow-lg")}>
            <summary className={cn(styles.strongText, "flex cursor-pointer list-none items-center justify-between gap-3 text-base font-black")}>
              {faq.question}
              <HelpCircle className={cn(styles.mutedText, "size-5 shrink-0")} aria-hidden="true" />
            </summary>
            <p className={cn(styles.bodyText, "mt-3 text-sm leading-6")}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-4 pb-8 sm:px-6 lg:px-8">
      <div className={cn(styles.finalCta, "mx-auto max-w-7xl rounded-xl p-5 shadow-2xl")}>
        <h2 className="text-3xl font-black leading-tight tracking-normal">
          Want to see what this would look like for your business?
        </h2>
        <p className={cn(styles.darkMuted, "mt-3 text-sm leading-7")}>
          Get a free preview of the AI response system SignalOps would set up around your lead flow.
        </p>
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_test_2_final" }}
          className={cn(styles.lightButton, "mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg px-5 text-base font-black transition sm:w-auto")}
        >
          Get My Free Preview
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </section>
  );
}

function SectionTitle({
  description,
  eyebrow,
  title
}: {
  description?: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase tracking-normal")}>{eyebrow}</p>
      <h2 className={cn(styles.title, "mt-2 text-3xl font-black leading-tight tracking-normal sm:text-4xl")}>
        {title}
      </h2>
      {description ? <p className={cn(styles.bodyText, "mt-3 text-sm leading-7")}>{description}</p> : null}
    </div>
  );
}

function SimpleActionCard({
  copy,
  icon: Icon,
  title
}: {
  copy: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <article className={cn(styles.featureCard, "rounded-lg border p-4 shadow-xl")}>
      <div className={cn(styles.featureIcon, "flex size-11 items-center justify-center rounded-md")}>
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className={cn(styles.strongText, "mt-4 text-xl font-black")}>{title}</h3>
      <p className={cn(styles.bodyText, "mt-2 text-sm leading-6")}>{copy}</p>
    </article>
  );
}

function BeforeAfterCard({
  items,
  title,
  tone
}: {
  items: string[];
  title: string;
  tone: "bad" | "good";
}) {
  const Icon = tone === "bad" ? Inbox : CheckCircle2;
  const iconClass = tone === "bad" ? styles.amberText : styles.greenText;

  return (
    <article className={cn(styles.beforeAfterCard, "rounded-lg border p-4 shadow-xl")}>
      <h3 className={cn(styles.strongText, "text-xl font-black")}>{title}</h3>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <div key={item} className={cn(styles.listItem, "flex items-center gap-3 rounded-md p-3")}>
            <Icon className={cn("size-5 shrink-0", iconClass)} aria-hidden="true" />
            <p className={cn(styles.strongText, "text-sm font-bold")}>{item}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
