import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  Mail,
  MessageSquareReply,
  PlayCircle,
  SearchCheck,
  Star,
  TrendingUp,
  UserRound,
  Workflow,
  Zap
} from "lucide-react";
import { BreakEvenCalculator } from "@/components/site/break-even-calculator";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import {
  EMAIL_CTA,
  getEmailHref,
  getPlanEmailHref,
  PRIMARY_CTA,
  SECONDARY_CTA,
  SITE_CONFIG
} from "@/lib/constants";

const shell = "mx-auto max-w-[1500px] px-3 sm:px-5 lg:px-8";
const glass =
  "border border-white/14 bg-white/[0.075] shadow-2xl shadow-black/28 backdrop-blur-2xl";
const muted = "text-[#ead0df]/76";

const features: Array<{ title: string; copy: string; result: string; icon: LucideIcon }> = [
  {
    title: "Instant Reply",
    copy: "AI answers new leads in seconds across calls, texts, forms, and DMs.",
    result: "Always on",
    icon: Zap
  },
  {
    title: "AI Qualification",
    copy: "It asks the right questions and collects the details your team needs.",
    result: "Better leads",
    icon: UserRound
  },
  {
    title: "Smart Follow-Up",
    copy: "Every quote, photo request, and no-reply gets a timely nudge.",
    result: "More conversations",
    icon: MessageSquareReply
  },
  {
    title: "Booking Handoff",
    copy: "Ready leads move toward a calendar, callback, or sales handoff.",
    result: "More bookings",
    icon: CalendarCheck2
  }
];

const pricing = [
  {
    id: "starter",
    name: "Starter",
    price: "$297",
    cadence: "/mo",
    setupFee: "Starting at $750 setup",
    bestFor: "A business that mainly needs faster replies and basic follow-up for one main lead source.",
    explanation:
      "We set up your first lead response workflow so new inquiries get answered fast and basic follow-up does not get forgotten.",
    cta: "Ask About Starter",
    items: [
      "1 main lead source",
      "Instant reply workflow",
      "Basic lead qualification questions",
      "Simple follow-up reminders",
      "Owner/new lead alerts",
      "Basic monthly check-in"
    ],
    examples: ["Website form", "Missed call/text flow", "Simple quote request", "Solo operator or small team"]
  },
  {
    id: "growth",
    name: "Growth",
    price: "$597",
    cadence: "/mo",
    setupFee: "Starting at $1,500 setup",
    bestFor: "A business that has multiple lead sources and wants stronger automation, follow-up, and visibility.",
    explanation:
      "We connect more of your lead flow, add smarter qualification, follow-up sequences, booking handoff, and better visibility into what is happening.",
    cta: "Ask About Growth",
    highlight: true,
    items: [
      "Multiple lead sources",
      "Smarter lead qualification",
      "Follow-up sequences",
      "Booking handoff",
      "CRM or spreadsheet logging",
      "Dashboard visibility",
      "Monthly optimization"
    ],
    examples: ["Website + calls + Facebook leads", "Quote requests with photos/details", "Team handoffs", "Growing service business"]
  },
  {
    id: "custom-agent-system",
    name: "Custom Agent System",
    price: "Custom",
    cadence: "",
    setupFee: "Starting at $5,000+ buildout",
    supportFee: "Custom monthly support",
    bestFor: "A business with complex workflows, multiple locations, custom tools, or advanced routing needs.",
    explanation:
      "We design and build a custom AI-powered lead operations system around your tools, team, services, routing rules, and sales process.",
    cta: "Ask About Custom",
    items: [
      "Custom AI workflows",
      "Multi-step lead qualification",
      "CRM/calendar/tool integrations",
      "Team/location routing",
      "Custom dashboards or reporting",
      "Advanced follow-up logic",
      "Ongoing optimization/support"
    ],
    examples: ["Multi-location businesses", "Larger teams", "Complex quote workflows", "Custom integrations"]
  }
];

const comparisonRows = [
  ["Lead sources", "1 main source", "Multiple sources", "Unlimited/custom"],
  ["Qualification", "Basic questions", "Smarter scoring", "Multi-step logic"],
  ["Follow-up", "Simple reminders", "Sequences", "Advanced branching"],
  ["Booking handoff", "Basic", "Included", "Custom"],
  ["CRM/logging", "Lightweight", "CRM or spreadsheet", "Deep integrations"],
  ["Dashboard", "Basic check-in", "Visibility included", "Custom reporting"],
  ["Custom integrations", "Not included", "Limited", "Advanced"],
  ["Monthly optimization", "Basic check-in", "Included", "Custom support"]
];

const faqs = [
  {
    question: "Is this a chatbot?",
    answer: "No. SignalOps works behind your lead flow: forms, missed calls, texts, DMs, quotes, and booking handoffs."
  },
  {
    question: "Do I need a CRM?",
    answer: "No. We can start with the way you already work, then connect a CRM later if it helps."
  },
  {
    question: "Will it replace my team?",
    answer: "No. It handles fast replies and follow-up so your team can focus on serious customers."
  },
  {
    question: "What happens when AI is unsure?",
    answer: "Unclear, urgent, or sensitive leads are routed to a person with notes for review."
  }
];

export function MarketingHome() {
  return (
    <main className="overflow-hidden bg-[#14102b] text-white">
      <section className="relative isolate px-3 py-5 sm:px-5 sm:py-7 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,111,156,0.24),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(255,179,109,0.22),transparent_30%),linear-gradient(135deg,#241641_0%,#2a1a48_44%,#241331_100%)]" />
        <div className="surface-grid absolute inset-0 opacity-[0.16]" />

        <div className={`${shell} relative`}>
          <div className="overflow-hidden rounded-[1.75rem] border border-white/18 bg-white/[0.055] shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:rounded-[2.25rem]">
            <HeroSection />
            <PricingSection />
            <FeatureSection />
            <HowItWorks />
            <DemoFaq />
            <FinalCTA />
            <ContactSection />
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pb-10 pt-9 sm:px-9 sm:pb-14 sm:pt-14 lg:px-11 lg:pt-16">
      <div className="absolute right-0 top-0 h-[32rem] w-[32rem] rounded-full bg-[#ff6f9c]/22 blur-3xl" />
      <div className="absolute right-16 top-20 h-64 w-64 rounded-full bg-[#ffb36d]/18 blur-3xl" />

      <div className="relative grid gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="max-w-2xl">
          <Badge className="border border-[#ff9ec0]/22 bg-white/8 px-3 py-1.5 text-[#ffd7e6]">
            Free Instant AI Lead System Preview
          </Badge>
          <h1 className="mt-8 text-[2.95rem] font-semibold leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-[5.35rem]">
            See the AI lead system
            <span className="block bg-[linear-gradient(90deg,#ffb36d,#ff6f9c,#d770ff)] bg-clip-text text-transparent">
              your business should already have.
            </span>
          </h1>
          <p className={`mt-6 max-w-xl text-base leading-7 sm:text-lg sm:leading-8 ${muted}`}>
            SignalOps builds done-for-you AI receptionist, lead response, qualification, follow-up, and booking handoff systems for local service businesses. Start with a free personalized preview before anything is built.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href={PRIMARY_CTA.href}
              eventName={ANALYTICS_EVENTS.previewCtaClicked}
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
              className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-white/20 bg-white/[0.045] sm:w-auto`}
            >
              {SECONDARY_CTA.label}
              <PlayCircle className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>

          <div className="mt-9 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-4">
            <HeroStat icon={ClipboardList} value="1" label="You tell us how leads come in" />
            <HeroStat icon={Workflow} value="2" label="We generate your AI Lead System Preview" />
            <HeroStat icon={CalendarCheck2} value="3" label="You approve the build plan before launch" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_78%_18%,rgba(255,111,156,0.42),transparent_36%),radial-gradient(circle_at_55%_78%,rgba(255,179,109,0.22),transparent_36%)] blur-2xl" />
          <ProductDashboard />
          <SocialProof />
        </div>
      </div>
    </section>
  );
}

function ProductDashboard() {
  return (
    <div className={`relative overflow-hidden rounded-[1.55rem] ${glass}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#ffb36d,#ff6f9c,transparent)]" />
      <div className="grid min-h-[23rem] bg-[#1a1434]/78 md:grid-cols-[10.5rem_1fr]">
        <aside className="hidden border-r border-white/10 bg-white/[0.035] p-4 md:block">
          <div className="flex items-center gap-2">
            <LogoSpark className="size-5" />
            <span className="text-sm font-semibold">SignalOps</span>
          </div>
          <div className="mt-7 space-y-2 text-xs">
            {["Overview", "Conversations", "Leads", "Bookings", "Follow-ups", "Analytics"].map((item, index) => (
              <div
                key={item}
                className={`rounded-2xl px-3 py-2 ${index === 0 ? "bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] text-white" : "text-[#ead0df]/70"}`}
              >
                {item}
              </div>
            ))}
          </div>
        </aside>

        <section className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold">Overview</p>
              <p className="text-xs text-[#ead0df]/58">This month</p>
            </div>
            <Badge className="border border-white/10 bg-white/8 text-[#ead0df]">Live</Badge>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            <MetricCard label="New Leads" value="482" delta="+29%" />
            <MetricCard label="Booked Jobs" value="127" delta="+24%" />
            <MetricCard label="Response Time" value="4.3s" delta="+72%" />
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_13rem]">
            <div className="rounded-xl border border-white/10 bg-[#17122d]/82 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-[#ead0df]/78">Leads over time</p>
                <BarChart3 className="size-4 text-[#ffb36d]" aria-hidden="true" />
              </div>
              <svg viewBox="0 0 420 180" className="h-40 w-full" role="img" aria-label="Leads over time increasing chart">
                <defs>
                  <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
                    <stop stopColor="#ffb36d" />
                    <stop offset="0.5" stopColor="#ff6f9c" />
                    <stop offset="1" stopColor="#d770ff" />
                  </linearGradient>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#ff6f9c" stopOpacity="0.32" />
                    <stop offset="1" stopColor="#ff6f9c" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 154H420M0 112H420M0 70H420M0 28H420" stroke="white" strokeOpacity="0.07" />
                <path d="M8 148C42 142 52 95 84 96C122 98 119 56 150 64C186 74 180 116 218 102C248 91 253 54 286 66C322 79 326 36 360 41C384 44 392 29 412 24" fill="none" stroke="url(#chartLine)" strokeWidth="7" strokeLinecap="round" />
                <path d="M8 148C42 142 52 95 84 96C122 98 119 56 150 64C186 74 180 116 218 102C248 91 253 54 286 66C322 79 326 36 360 41C384 44 392 29 412 24V180H8Z" fill="url(#chartFill)" />
              </svg>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#17122d]/82 p-4">
              <p className="text-xs font-semibold text-[#ead0df]/78">Lead source</p>
              <div className="mx-auto mt-4 flex size-28 items-center justify-center rounded-full bg-[conic-gradient(#ff6f9c_0_44%,#ffb36d_44%_70%,#d770ff_70%_86%,#7a5cff_86%_100%)]">
                <div className="flex size-20 flex-col items-center justify-center rounded-full bg-[#17122d]">
                  <span className="text-xs text-[#ead0df]/58">Total</span>
                  <span className="text-xl font-semibold">482</span>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-xs text-[#ead0df]/70">
                {["Google 48%", "Facebook 20%", "Website 16%", "Other 16%"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#ffb36d]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SocialProof() {
  return (
    <div className="mx-auto mt-5 flex w-fit flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
      <div className="flex -space-x-2">
        {["JD", "AV", "MK", "RS", "TB"].map((initials, index) => (
          <span
            key={initials}
            className="flex size-8 items-center justify-center rounded-full border-2 border-[#201636] bg-[linear-gradient(135deg,#ffb36d,#ff6f9c)] text-[10px] font-bold text-white"
            style={{ opacity: 1 - index * 0.04 }}
          >
            {initials}
          </span>
        ))}
      </div>
      <div>
        <div className="flex justify-center gap-0.5 text-[#ffb36d] sm:justify-start">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="size-3.5 fill-current" aria-hidden="true" />
          ))}
        </div>
        <p className="text-xs leading-5 text-[#ead0df]/72">Trusted by local service teams</p>
      </div>
    </div>
  );
}

function FeatureSection() {
  return (
    <section className="px-5 py-8 sm:px-9 lg:px-11">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-normal text-white sm:text-3xl">
          Everything you need.
        </h2>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="group rounded-2xl border border-white/12 bg-white/[0.055] p-5 shadow-xl shadow-black/15 transition hover:-translate-y-1 hover:border-[#ffb36d]/35 hover:bg-white/[0.075]">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] shadow-lg shadow-pink-950/25">
                <Icon className="size-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
              <p className={`mt-2 text-sm leading-6 ${muted}`}>{feature.copy}</p>
              <div className="mt-5 border-t border-white/10 pt-4 text-xs text-[#ffd7e6]">
                <CheckCircle2 className="mr-2 inline size-3.5 text-[#ffb36d]" aria-hidden="true" />
                {feature.result}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["We capture and respond", "AI instantly replies to every lead across your channels."],
    ["We qualify and nurture", "AI answers questions, collects info, and follows up automatically."],
    ["We book and hand off", "Hot leads get booked or routed to your team with context."]
  ];

  return (
    <section id="how-it-works" className="px-5 py-8 sm:px-9 lg:px-11">
      <h2 className="text-center text-2xl font-semibold tracking-normal text-white sm:text-3xl">
        How it works in 3 simple steps
      </h2>
      <div className="relative mt-8 rounded-2xl border border-white/12 bg-white/[0.045] p-5 sm:p-6">
        <div className="absolute left-10 right-10 top-9 hidden h-1 rounded-full bg-[linear-gradient(90deg,#d770ff,#ff6f9c,#ffb36d)] md:block" />
        <div className="relative grid gap-5 md:grid-cols-3">
          {steps.map(([title, copy], index) => (
            <div key={title} className="grid gap-3 md:pt-12">
              <div className="flex size-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d770ff,#ff6f9c,#ffb36d)] text-lg font-semibold shadow-lg shadow-pink-950/25 md:absolute md:top-[-0.15rem]">
                {index + 1}
              </div>
              <div className="flex gap-4 rounded-xl border border-white/10 bg-[#17122d]/62 p-4">
                <SearchCheck className="mt-1 size-6 shrink-0 text-[#ffb36d]" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className={`mt-1 text-sm leading-6 ${muted}`}>{copy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="border-y border-white/10 bg-[#17122d]/38 px-5 py-9 sm:px-9 lg:px-11">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-normal text-white sm:text-3xl">
          Choose the system level you need.
        </h2>
        <p className={`mt-3 text-sm leading-6 ${muted}`}>
          Clear monthly support, clear build fees, and a direct path to ask about the package that fits your business.
        </p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {pricing.map((plan) => (
          <div
            key={plan.name}
            id={plan.id}
            className={`relative flex min-h-full flex-col rounded-2xl border p-5 shadow-xl shadow-black/15 ${
              plan.highlight
                ? "border-[#ffb36d]/55 bg-[radial-gradient(circle_at_50%_0%,rgba(255,111,156,0.34),transparent_34%),linear-gradient(180deg,rgba(255,111,156,0.16),rgba(255,179,109,0.08),rgba(35,20,52,0.84))]"
                : "border-white/12 bg-white/[0.045]"
            }`}
          >
            {plan.highlight ? (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] text-white">
                Most Popular
              </Badge>
            ) : null}
            <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
            <p className={`mt-2 text-sm leading-6 ${muted}`}>
              <span className="font-semibold text-[#ffe1bd]">Best for: </span>
              {plan.bestFor}
            </p>
            <div className="mt-5">
              <span className="text-4xl font-semibold tracking-normal text-white">{plan.price}</span>
              <span className="ml-1 text-sm text-[#ead0df]/72">{plan.cadence}</span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#ffb36d]">
                {plan.setupFee}
              </p>
              {"supportFee" in plan ? (
                <p className="mt-1 text-xs text-[#ead0df]/58">{plan.supportFee}</p>
              ) : (
                <p className="mt-1 text-xs text-[#ead0df]/58">Monthly support billed separately from setup</p>
              )}
            </div>
            <div className="mt-5 rounded-xl border border-white/10 bg-[#17122d]/52 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ead0df]/50">What we build</p>
              <p className={`mt-2 text-sm leading-6 ${muted}`}>{plan.explanation}</p>
            </div>
            <ul className="mt-6 flex-1 space-y-2.5">
              {plan.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-[#f2d9e8]/84">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#ffb36d]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ead0df]/50">Good fit examples</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {plan.examples.map((example) => (
                  <span key={example} className="rounded-full border border-white/10 bg-[#17122d]/58 px-2.5 py-1 text-xs text-[#ead0df]/76">
                    {example}
                  </span>
                ))}
              </div>
            </div>
            <TrackedLink
              href={getPlanEmailHref(plan.name)}
              eventName={ANALYTICS_EVENTS.contactClicked}
              eventProperties={{ location: "pricing_card", type: "email", package: plan.name }}
              className={`${buttonVariants({ variant: plan.highlight ? "default" : "outline" })} mt-6 w-full`}
            >
              {plan.cta}
              <Mail className="size-4" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href="/audit"
              eventName={ANALYTICS_EVENTS.packageClicked}
              eventProperties={{ package: plan.name, price: plan.price }}
              className={`${buttonVariants({ variant: "ghost" })} mt-3 w-full border border-white/10 bg-white/[0.035]`}
            >
              Send Project Details
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.045]">
        <div className="border-b border-white/10 p-4">
          <p className="text-sm font-semibold text-white">Simple package comparison</p>
          <p className={`mt-1 text-xs leading-5 ${muted}`}>Use this to choose what to ask about first.</p>
        </div>
        <div className="grid divide-y divide-white/10 text-sm md:grid-cols-[1fr_repeat(3,0.9fr)] md:divide-x md:divide-y-0">
          <div className="hidden p-4 font-semibold text-[#ead0df]/58 md:block">Capability</div>
          {["Starter", "Growth", "Custom"].map((label) => (
            <div key={label} className="hidden p-4 font-semibold text-white md:block">
              {label}
            </div>
          ))}
          {comparisonRows.map(([label, starter, growth, custom]) => (
            <div key={label} className="contents">
              <div className="bg-[#17122d]/42 p-4 font-semibold text-white md:bg-transparent">{label}</div>
              {[starter, growth, custom].map((value, index) => (
                <div key={`${label}-${value}`} className="flex justify-between gap-4 p-4 text-[#ead0df]/76 md:block">
                  <span className="font-medium text-[#ead0df]/42 md:hidden">
                    {index === 0 ? "Starter" : index === 1 ? "Growth" : "Custom"}
                  </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[#ffb36d]/18 bg-[#ffb36d]/8 p-4 text-center text-sm leading-6 text-[#ffe1bd]">
        Not sure which package fits? Generate the free preview first, then email SignalOps when you are ready to talk through the build.
      </div>

      <BreakEvenCalculator className="mt-6" defaultAverageValue={250} defaultUnitLabel="jobs" />
    </section>
  );
}

function DemoFaq() {
  return (
    <section id="demo" className="grid gap-4 px-5 py-8 sm:px-9 lg:grid-cols-[0.86fr_1.14fr] lg:px-11">
      <div className="rounded-2xl border border-white/12 bg-white/[0.055] p-5">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] shadow-lg shadow-pink-950/25">
          <TrendingUp className="size-7 text-white" aria-hidden="true" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold tracking-normal text-white">
          See how a lead becomes a booked job.
        </h2>
        <p className={`mt-3 text-sm leading-6 ${muted}`}>
          Try the client demo to see instant reply, qualification, follow-up, routing, and dashboard visibility in action.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <TrackedLink
            href="/demo"
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "homepage_demo_card" }}
            className={`${buttonVariants({ size: "lg" })} w-full`}
          >
            View Live Demo
            <PlayCircle className="size-4" aria-hidden="true" />
          </TrackedLink>
        </div>
      </div>

      <div id="faq" className="rounded-2xl border border-white/12 bg-white/[0.045] p-5">
        <h2 className="text-xl font-semibold tracking-normal text-white">Quick answers</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-xl border border-white/10 bg-[#17122d]/62 p-4 open:border-[#ffb36d]/28">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white">
                <span>{faq.question}</span>
                <span className="text-xl text-[#ffb36d] transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className={`mt-3 text-sm leading-6 ${muted}`}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-5 pb-5 pt-4 sm:px-9 sm:pb-9 lg:px-11">
      <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.075] p-5 shadow-2xl shadow-black/18 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <div className="flex gap-4">
            <div className="hidden size-16 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] shadow-lg shadow-pink-950/25 sm:flex">
              <TrendingUp className="size-8 text-white" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-white">
                See the system before we build it.
              </h2>
              <p className={`mt-2 max-w-2xl text-sm leading-6 ${muted}`}>
                Get a personalized preview of the AI receptionist, lead dashboard, follow-up timeline, and package recommendation for your business.
              </p>
            </div>
          </div>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "homepage_final_cta" }}
            className={buttonVariants({ size: "lg" })}
          >
            {PRIMARY_CTA.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
          <TrackedLink
            href="/demo"
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "homepage_final_demo" }}
            className={`${buttonVariants({ variant: "outline", size: "lg" })} border-white/20 bg-white/[0.045]`}
          >
            {SECONDARY_CTA.label}
            <PlayCircle className="size-4" aria-hidden="true" />
          </TrackedLink>
        </div>
        <div className="mt-5 rounded-2xl border border-white/10 bg-[#17122d]/52 p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
            <p className="text-sm leading-6 text-[#ead0df]/76">
            Prefer email? Send your business, website, lead sources, and what you need help with.
          </p>
          <TrackedLink
            href={getEmailHref()}
            eventName={ANALYTICS_EVENTS.contactClicked}
            eventProperties={{ location: "homepage_prefer_email", type: "email" }}
            className={`${buttonVariants({ variant: "outline" })} mt-3 w-full border-white/18 bg-white/[0.045] sm:mt-0 sm:w-auto`}
          >
            <Mail className="size-4" aria-hidden="true" />
            {EMAIL_CTA.label}
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="px-5 pb-5 sm:px-9 sm:pb-9 lg:px-11">
      <div className="rounded-[1.5rem] border border-[#ffb36d]/20 bg-[radial-gradient(circle_at_20%_0%,rgba(255,179,109,0.12),transparent_36%),rgba(255,255,255,0.055)] p-5 shadow-2xl shadow-black/18 sm:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb36d]">Email SignalOps</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-white sm:text-3xl">
              Want to talk through the preview?
            </h2>
            <p className={`mt-2 max-w-2xl text-sm leading-6 ${muted}`}>
              Send a quick email with your business, website, current lead flow, and what you want the AI lead system to handle.
            </p>
            <p className="mt-3 text-sm font-semibold text-[#ffe1bd]">{SITE_CONFIG.email}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <TrackedLink
              href={getEmailHref()}
              eventName={ANALYTICS_EVENTS.contactClicked}
              eventProperties={{ location: "homepage_contact_section", type: "email" }}
              className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
            >
              <Mail className="size-4" aria-hidden="true" />
              {EMAIL_CTA.label}
            </TrackedLink>
            <TrackedLink
              href={PRIMARY_CTA.href}
              eventName={ANALYTICS_EVENTS.previewCtaClicked}
              eventProperties={{ location: "homepage_contact_section" }}
              className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-white/18 bg-white/[0.045] sm:w-auto`}
            >
              {PRIMARY_CTA.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  return (
    <div className="border-r border-white/10 pr-2 last:border-r-0 sm:pr-4">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-[#ffb36d] sm:size-5" aria-hidden="true" />
        <p className="text-sm font-semibold text-white sm:text-lg">{value}</p>
      </div>
      <p className="mt-1 text-[0.68rem] leading-4 text-[#ead0df]/68 sm:text-xs">{label}</p>
    </div>
  );
}

function MetricCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.055] p-3 shadow-lg shadow-black/12">
      <p className="text-[0.65rem] font-medium text-[#ead0df]/70">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="text-xl font-semibold text-white sm:text-2xl">{value}</p>
        <p className="text-[0.65rem] font-semibold text-lime-300">{delta}</p>
      </div>
    </div>
  );
}

function LogoSpark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M13.4 2.6 4.8 13.1h5.6l-1.8 8.3 10.6-12h-6.1l.3-6.8Z"
        fill="none"
        stroke="url(#sparkGradient)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="sparkGradient" x1="5" y1="3" x2="19" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffb36d" />
          <stop offset="0.55" stopColor="#ff6f9c" />
          <stop offset="1" stopColor="#d770ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}
