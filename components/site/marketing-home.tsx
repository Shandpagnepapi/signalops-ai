import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  MessageSquareReply,
  Route,
  SearchCheck
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/constants";

const pagePad = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const glass =
  "border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/25 backdrop-blur-xl";
const softText = "text-[#ead0df]/72";

const proof = [
  "< 60 sec reply target",
  "24/7 follow-up",
  "Works with current tools",
  "Built for local service teams"
];

const featureCards: Array<{ title: string; copy: string; icon: LucideIcon }> = [
  {
    title: "Instant Reply",
    copy: "Every new inquiry gets a useful first response.",
    icon: MessageSquareReply
  },
  {
    title: "AI Qualification",
    copy: "Service need, urgency, and fit are sorted automatically.",
    icon: SearchCheck
  },
  {
    title: "Smart Follow-Up",
    copy: "Photos, quotes, and no-replies stay on track.",
    icon: Route
  },
  {
    title: "Booking Handoff",
    copy: "Ready leads move to the next step with context.",
    icon: CalendarCheck2
  }
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$297/mo",
    bestFor: "Businesses getting started with faster lead response.",
    cta: "Start with Starter",
    items: [
      "1 lead source",
      "Instant reply workflow",
      "Basic lead qualification",
      "Simple follow-up reminders",
      "New lead alerts"
    ]
  },
  {
    name: "Growth",
    price: "$597/mo",
    bestFor: "Growing businesses that want stronger automation.",
    cta: "Choose Growth",
    highlight: true,
    items: [
      "Multiple lead sources",
      "Advanced qualification",
      "Follow-up sequences",
      "Booking handoff",
      "Dashboard visibility",
      "Monthly optimization"
    ]
  },
  {
    name: "Custom Agent System",
    price: "Custom",
    bestFor: "Complex workflows, teams, or multi-location businesses.",
    cta: "Discuss Custom",
    items: [
      "Custom AI workflows",
      "CRM/calendar integrations",
      "Advanced routing",
      "Team handoffs",
      "Custom reporting",
      "Dedicated buildout"
    ]
  }
];

const faqs = [
  {
    question: "Is this a chatbot?",
    answer: "No. SignalOps works behind your forms, missed calls, texts, DMs, and booking flow."
  },
  {
    question: "Do I need a CRM?",
    answer: "No. We can start with calls, texts, forms, and DMs, then connect a CRM later."
  },
  {
    question: "Will it replace my team?",
    answer: "No. It handles first response and reminders so your team can focus on serious leads."
  },
  {
    question: "Can it work with my current website?",
    answer: "Yes. Most builds start with your existing forms, quote requests, or missed-call flow."
  },
  {
    question: "What happens when AI is unsure?",
    answer: "Unclear or high-risk leads are routed to a person with notes for review."
  }
];

export function MarketingHome() {
  return (
    <main className="overflow-hidden bg-[#140c20] text-white">
      <HeroSection />
      <ProofBar />
      <ProductStory />
      <PricingSection />
      <DemoAndFAQ />
      <FinalCTA />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,111,156,0.34),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(255,179,109,0.17),transparent_30%),linear-gradient(180deg,#28163a_0%,#140c20_68%,#100818_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,179,109,0.7),transparent)]" />
      <div className="absolute left-1/2 top-20 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-[#ff6f9c]/18 blur-3xl" />
      <div className={`${pagePad} relative pb-10 pt-12 sm:pb-16 sm:pt-20 lg:pt-24`}>
        <div className="mx-auto max-w-5xl text-center">
          <Badge className="mb-5 border border-[#ff9ec0]/25 bg-white/8 text-[#ffd7e6]">
            AI lead response for local service businesses
          </Badge>
          <h1 className="text-[3rem] font-semibold leading-[0.98] tracking-normal text-white sm:text-7xl lg:text-8xl">
            Respond faster.
            <span className="block bg-[linear-gradient(90deg,#fff,#ffd4e3,#ffb36d)] bg-clip-text text-transparent">
              Book more leads.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#f3ddec]/82 sm:text-xl sm:leading-8">
            SignalOps helps local service businesses reply instantly, qualify leads,
            follow up automatically, and turn more inquiries into booked jobs.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <TrackedLink
              href={PRIMARY_CTA.href}
              eventName={ANALYTICS_EVENTS.auditCtaClicked}
              eventProperties={{ location: "homepage_hero" }}
              className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
            >
              {PRIMARY_CTA.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href={SECONDARY_CTA.href}
              eventName={ANALYTICS_EVENTS.demoViewed}
              eventProperties={{ location: "homepage_hero_demo" }}
              className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-white/18 bg-white/7 sm:w-auto`}
            >
              View Demo
            </TrackedLink>
          </div>
        </div>

        <div className="relative mx-auto mt-11 max-w-6xl sm:mt-14">
          <div className="absolute inset-x-6 -bottom-6 h-24 rounded-full bg-[#ff6f9c]/22 blur-3xl" />
          <ProductWindow />
        </div>
      </div>
    </section>
  );
}

function ProductWindow() {
  return (
    <div className={`relative overflow-hidden rounded-[1.7rem] ${glass}`}>
      <div className="flex items-center justify-between border-b border-white/10 bg-[#100818]/78 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#ff6f9c]" />
          <span className="size-2.5 rounded-full bg-[#ffb36d]" />
          <span className="size-2.5 rounded-full bg-[#8d6bff]" />
        </div>
        <p className="hidden text-xs font-medium text-[#ead0df]/55 sm:block">
          SignalOps lead engine
        </p>
        <Badge className="border border-[#ffb36d]/24 bg-[#ffb36d]/12 text-[#ffe1bd]">
          Live workflow
        </Badge>
      </div>

      <div className="grid bg-[#100818]/72 lg:grid-cols-[15rem_1fr_19rem]">
        <aside className="hidden border-r border-white/10 bg-white/[0.025] p-4 lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">
            Sources
          </p>
          <div className="mt-4 space-y-2">
            {["Website forms", "Missed calls", "Facebook DMs", "Quote requests"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-[#f5ddec]/80">
                {item}
              </div>
            ))}
          </div>
        </aside>

        <section className="p-3 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Metric value="41s" label="reply target" />
            <Metric value="92" label="lead score" />
            <Metric value="3" label="next actions" />
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-[1fr_0.9fr]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff9ec0]">
                    New qualified lead
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-normal text-white">
                    Two wheels, mobile quote
                  </h2>
                  <p className={`mt-2 text-sm leading-6 ${softText}`}>
                    Customer wants curb rash repair, can send photos, and prefers this week.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#ffb36d]/30 bg-[#ffb36d]/12 px-3 py-2 text-center">
                  <p className="text-xl font-semibold text-white">Hot</p>
                  <p className="text-xs text-[#ffe1bd]">priority</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <MiniStatus icon={MessageSquareReply} title="Reply prepared" label="Asks for photos" />
                <MiniStatus icon={CalendarCheck2} title="Booking handoff" label="Mobile slot ready" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#1b1028]/82 p-4">
              <p className="text-sm font-semibold text-white">Follow-up timeline</p>
              <div className="mt-4 space-y-3">
                {[
                  ["Now", "AI reply sent"],
                  ["10 min", "Owner alert"],
                  ["Day 1", "Photo reminder"],
                  ["Day 3", "Booking nudge"]
                ].map(([time, event]) => (
                  <div key={time} className="grid grid-cols-[3.5rem_1fr] items-center gap-3 text-sm">
                    <span className="text-[#ffb36d]">{time}</span>
                    <div className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-[#f3ddec]/78">
                      {event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="border-t border-white/10 bg-white/[0.025] p-4 lg:border-l lg:border-t-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">
            Next best action
          </p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-[#1b1028]/82 p-4">
            <p className="text-sm font-semibold text-white">Send photo request</p>
            <p className={`mt-2 text-sm leading-6 ${softText}`}>
              Ask for wheel photos and offer two appointment windows.
            </p>
          </div>
          <div className="mt-3 rounded-2xl border border-[#ff6f9c]/20 bg-[#ff6f9c]/10 p-4">
            <p className="text-sm font-semibold text-white">Internal note</p>
            <p className={`mt-2 text-sm leading-6 ${softText}`}>
              Good mobile opportunity. Customer has clear intent and contact info.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ProofBar() {
  return (
    <section className="border-b border-white/10 bg-[#120a1c]">
      <div className={`${pagePad} flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between`}>
        <p className="text-sm font-medium text-[#ead0df]/62">
          Built for the lead moments that usually get missed.
        </p>
        <div className="flex flex-wrap gap-2">
          {proof.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-[#f5ddec]/76">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductStory() {
  return (
    <section id="how-it-works" className={`${pagePad} py-20 sm:py-28`}>
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <Badge className="border border-[#ff6f9c]/20 bg-[#ff6f9c]/12 text-[#ffc0d5]">
            What SignalOps does
          </Badge>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
            One system for the moments after a lead arrives.
          </h2>
          <p className={`mt-5 max-w-xl text-base leading-7 ${softText}`}>
            Capture the inquiry, qualify the person, keep follow-up moving, and hand off
            the leads worth chasing.
          </p>
        </div>

        <div className="grid gap-4">
          <div className={`rounded-[1.7rem] p-4 sm:p-5 ${glass}`}>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["Capture", "Forms, missed calls, ads, DMs, and quote requests enter one flow."],
                ["Qualify", "SignalOps asks what matters and scores the next step."],
                ["Book", "Ready leads move to a calendar, alert, or sales handoff."]
              ].map(([title, copy], index) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-[#160d22]/84 p-5">
                  <p className="text-xs font-semibold text-[#ffb36d]">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{title}</h3>
                  <p className={`mt-3 text-sm leading-6 ${softText}`}>{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featureCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-[1.35rem] border border-white/10 bg-white/[0.05] p-5 shadow-xl shadow-black/10">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#ffb36d]/14 text-[#ffca91]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className={`mt-3 text-sm leading-6 ${softText}`}>{feature.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="border-y border-white/10 bg-[linear-gradient(180deg,#1c1028,#100818)]">
      <div className={`${pagePad} py-20 sm:py-28`}>
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="border border-[#ff6f9c]/20 bg-[#ff6f9c]/12 text-[#ffc0d5]">
            Pricing
          </Badge>
          <h2 className="mt-5 text-4xl font-semibold tracking-normal text-white sm:text-6xl">
            Simple pricing. Serious results.
          </h2>
          <p className={`mx-auto mt-4 max-w-xl text-base leading-7 ${softText}`}>
            Choose the setup that fits your business today.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex min-h-full flex-col rounded-[1.6rem] border p-5 shadow-2xl shadow-black/15 sm:p-6 ${
                plan.highlight
                  ? "border-[#ffb36d]/55 bg-[linear-gradient(180deg,rgba(255,111,156,0.22),rgba(255,179,109,0.08),rgba(35,20,52,0.92))]"
                  : "border-white/10 bg-white/[0.055]"
              }`}
            >
              {plan.highlight ? (
                <Badge className="mb-5 w-fit border border-[#ffb36d]/30 bg-[#ffb36d]/16 text-[#ffe1bd]">
                  Most Popular
                </Badge>
              ) : null}
              <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
              <p className={`mt-2 min-h-12 text-sm leading-6 ${softText}`}>{plan.bestFor}</p>
              <div className="mt-6 border-y border-white/10 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">
                  Monthly price
                </p>
                <p className="mt-2 text-4xl font-semibold tracking-normal text-white">{plan.price}</p>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[#f2d9e8]/84">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#ffb36d]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <TrackedLink
                href={PRIMARY_CTA.href}
                eventName={ANALYTICS_EVENTS.packageClicked}
                eventProperties={{ package: plan.name, price: plan.price }}
                className={`${buttonVariants({ variant: plan.highlight ? "default" : "outline" })} mt-7 w-full`}
              >
                {plan.cta}
              </TrackedLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoFAQ() {
  return (
    <section className={`${pagePad} py-20 sm:py-28`}>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div id="demo" className={`rounded-[1.7rem] p-5 sm:p-7 ${glass}`}>
          <Badge className="border border-[#ff6f9c]/20 bg-[#ff6f9c]/12 text-[#ffc0d5]">
            Demo
          </Badge>
          <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
            From missed inquiry to booked job.
          </h2>
          <p className={`mt-4 text-sm leading-6 sm:text-base sm:leading-7 ${softText}`}>
            See a real-style local service workflow: new inquiry, AI reply,
            qualification, follow-up, and booking handoff.
          </p>
          <div className="mt-7 grid gap-2">
            {["New inquiry", "AI reply", "Qualified", "Follow-up", "Booked"].map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                <span className="flex size-8 items-center justify-center rounded-xl bg-[#ffb36d]/14 text-sm font-semibold text-[#ffe1bd]">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-white">{step}</span>
              </div>
            ))}
          </div>
          <TrackedLink
            href="/demo"
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "homepage_demo_panel" }}
            className={`${buttonVariants({ variant: "secondary", size: "lg" })} mt-7 w-full bg-white/8`}
          >
            View Demo
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
        </div>

        <div id="faq" className="rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
          <Badge className="border border-[#ff6f9c]/20 bg-[#ff6f9c]/12 text-[#ffc0d5]">
            FAQ
          </Badge>
          <div className="mt-5 grid gap-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-white/10 bg-white/[0.055] p-4 open:border-[#ffb36d]/25 open:bg-white/[0.075]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
                  <span>{faq.question}</span>
                  <span className="text-xl leading-none text-[#ffb36d] transition group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className={`mt-3 text-sm leading-6 ${softText}`}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoAndFAQ() {
  return <DemoFAQ />;
}

function FinalCTA() {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#ffb36d]/24 bg-[radial-gradient(circle_at_22%_0%,rgba(255,111,156,0.26),transparent_32%),linear-gradient(135deg,rgba(255,111,156,0.16),rgba(255,179,109,0.10),rgba(35,20,52,0.9))] p-6 shadow-2xl shadow-black/20 sm:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb36d]">
            Free Lead Leak Audit
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
            Find the leads slipping through.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-[#f2d9e8]/82 sm:text-base sm:leading-7">
            We will review your calls, forms, texts, DMs, and follow-ups, then show
            where opportunities are getting missed.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <TrackedLink
              href={PRIMARY_CTA.href}
              eventName={ANALYTICS_EVENTS.auditCtaClicked}
              eventProperties={{ location: "homepage_final_cta" }}
              className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
            >
              {PRIMARY_CTA.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href="/demo"
              eventName={ANALYTICS_EVENTS.demoViewed}
              eventProperties={{ location: "homepage_final_demo" }}
              className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-white/18 bg-white/7 sm:w-auto`}
            >
              View Demo
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 sm:p-4">
      <p className="text-2xl font-semibold text-white sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-[#ead0df]/58">{label}</p>
    </div>
  );
}

function MiniStatus({
  icon: Icon,
  title,
  label
}: {
  icon: LucideIcon;
  title: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#ff6f9c]/14 text-[#ffc0d5]">
          <Icon className="size-4" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-[#ead0df]/58">{label}</p>
        </div>
      </div>
    </div>
  );
}
