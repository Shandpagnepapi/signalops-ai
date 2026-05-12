import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Mail,
  PlayCircle,
  ShieldCheck,
  TrendingUp,
  Workflow
} from "lucide-react";
import { BreakEvenCalculator } from "@/components/site/break-even-calculator";
import { MobileSignalOpsHome } from "@/components/site/mobile-home";
import {
  BeforeAfterFlow,
  PreviewArtifactShowcase,
  SignalOpsCommandLayer
} from "@/components/site/product-story-visuals";
import {
  ConsolidateLeadStackSection,
  WhatsIncludedSection
} from "@/components/site/signalops-stack-sections";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import {
  EMAIL_CTA,
  getEmailHref,
  getPlanEmailHref,
  PRIMARY_CTA,
  SECONDARY_CTA
} from "@/lib/constants";

const shell = "mx-auto max-w-[1500px] px-3 sm:px-5 lg:px-8";
const muted = "text-[#ead0df]/76";

const pricing = [
  {
    id: "starter",
    name: "Starter",
    price: "$250",
    cadence: "/mo",
    setupFee: "Setup from $750",
    bestFor: "A business with one main lead source that needs faster replies, simple intake, and a clean owner handoff.",
    explanation:
      "We set up your first lead response workflow so new inquiries get answered fast, sorted cleanly, and handed off without extra admin.",
    cta: "Ask About Starter",
    items: [
      "One main lead source",
      "Instant reply workflow",
      "Basic intake questions",
      "Simple follow-up reminders",
      "Owner alerts",
      "Basic monthly check-in"
    ],
    examples: ["Website form", "Missed call/text flow", "Simple quote request", "Solo operator or small team"]
  },
  {
    id: "growth",
    name: "Growth",
    price: "$500",
    cadence: "/mo",
    setupFee: "Setup from $1,500",
    bestFor: "A business with multiple lead sources that needs stronger follow-up, routing, and visibility.",
    explanation:
      "We connect more of your lead flow, add smarter intake, follow-up sequences, booking or callback handoff, and better visibility into what is happening.",
    cta: "Ask About Growth",
    highlight: true,
    items: [
      "Multiple lead sources",
      "Smarter intake flow",
      "Priority sorting",
      "Follow-up sequences",
      "Booking or callback handoff",
      "CRM or spreadsheet logging",
      "Dashboard visibility",
      "Monthly optimization"
    ],
    examples: ["Website + calls + Facebook leads", "Quote requests with photos/details", "Team handoffs", "Growing service business"]
  },
  {
    id: "custom-agent-system",
    name: "Custom",
    price: "From $1,000",
    cadence: "/mo",
    setupFee: "Buildout from $5,000+",
    bestFor: "Businesses with complex workflows, multiple locations, integrations, dashboards, custom routing, or agent workflows.",
    explanation:
      "We design and build a custom AI lead operating system around your tools, team, services, routing rules, and sales process.",
    cta: "Ask About Custom",
    items: [
      "Custom workflow mapping",
      "Multiple lead sources and routing paths",
      "CRM/job-management integrations",
      "Custom dashboards",
      "Staff-handoff paths",
      "Internal AI agent workflows",
      "Advanced reporting and optimization"
    ],
    examples: ["Multi-location businesses", "Larger teams", "Complex quote workflows", "Custom integrations"]
  }
];

const comparisonRows = [
  ["Lead sources", "1 main source", "Multiple sources", "Unlimited/custom"],
  ["Intake", "Basic questions", "Smarter intake", "Multi-step logic"],
  ["Priority routing", "Simple owner alert", "Priority sorting", "Custom routing"],
  ["Follow-up", "Simple reminders", "Sequences", "Advanced branching"],
  ["Booking handoff", "Basic", "Included", "Custom"],
  ["CRM/logging", "Lightweight", "CRM or spreadsheet", "Deep integrations"],
  ["Dashboard", "Basic check-in", "Visibility included", "Custom reporting"],
  ["Custom integrations", "Not included", "Limited", "Advanced"],
  ["Monthly optimization", "Basic check-in", "Included", "Custom support"]
];

export function MarketingHome() {
  return (
    <>
      <MobileSignalOpsHome />
      <main className="hidden overflow-hidden bg-[#14102b] text-white md:block">
        <section className="relative isolate px-3 py-5 sm:px-5 sm:py-7 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,111,156,0.24),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(255,179,109,0.22),transparent_30%),linear-gradient(135deg,#241641_0%,#2a1a48_44%,#241331_100%)]" />
          <div className="surface-grid absolute inset-0 opacity-[0.16]" />

          <div className={`${shell} relative`}>
            <div className="overflow-hidden rounded-[1.75rem] border border-white/18 bg-white/[0.055] shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:rounded-[2.25rem]">
              <HeroSection />
              <ConsolidateLeadStackSection />
              <ProductStorySection />
              <WhatsIncludedSection />
              <PricingSection />
              <FinalCTA />
            </div>
          </div>
        </section>
      </main>
    </>
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
            AI lead operating system
          </Badge>
          <div className="mt-8 text-[2.95rem] font-semibold leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-[5.35rem]">
            Every lead answered.
            <span className="block bg-[linear-gradient(90deg,#ffb36d,#ff6f9c,#d770ff)] bg-clip-text text-transparent">
              Every follow-up handled.
            </span>
          </div>
          <p className={`mt-6 max-w-xl text-base leading-7 sm:text-lg sm:leading-8 ${muted}`}>
            SignalOps builds done-for-you lead operating systems that reply fast, collect the right details, route priority leads, and keep follow-up moving.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href={PRIMARY_CTA.href}
              eventName={ANALYTICS_EVENTS.previewCtaClicked}
              eventProperties={{ location: "homepage_hero" }}
              className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
            >
              See Your System
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
            <HeroStat icon={Workflow} value="2" label="We map the right operating system" />
            <HeroStat icon={ShieldCheck} value="3" label="You get a clear next step" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_78%_18%,rgba(255,111,156,0.42),transparent_36%),radial-gradient(circle_at_55%_78%,rgba(255,179,109,0.22),transparent_36%)] blur-2xl" />
          <PreviewArtifactShowcase />
        </div>
      </div>
    </section>
  );
}

function ProductStorySection() {
  return (
    <section id="how-it-works" className="border-y border-white/10 bg-[#17122d]/34 px-5 py-9 sm:px-9 lg:px-11" aria-labelledby="product-story-title">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb36d]">Command layer</p>
        <h2 id="product-story-title" className="mt-3 text-2xl font-semibold tracking-normal text-white sm:text-4xl">
          See the messy middle get organized.
        </h2>
        <p className={`mt-3 text-sm leading-6 ${muted}`}>
          Capture, sort, route, follow up, and hand off booking-ready leads from one operating layer.
        </p>
      </div>
      <div className="mt-7 grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <SignalOpsCommandLayer />
        <BeforeAfterFlow />
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
            className={`relative flex min-h-full flex-col overflow-hidden rounded-[1.35rem] border p-5 shadow-2xl shadow-black/18 ${
              plan.highlight
                ? "border-[#ffb36d]/55 bg-[radial-gradient(circle_at_50%_0%,rgba(255,111,156,0.34),transparent_34%),linear-gradient(180deg,rgba(255,111,156,0.16),rgba(255,179,109,0.08),rgba(10,15,24,0.88))]"
                : "border-white/12 bg-[#0a0f18]/54"
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)]" />
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
              <p className="mt-1 text-xs text-[#ead0df]/58">Monthly support billed separately from setup</p>
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
              href={PRIMARY_CTA.href}
              eventName={ANALYTICS_EVENTS.packageClicked}
              eventProperties={{ package: plan.name, price: plan.price }}
              className={`${buttonVariants({ variant: "ghost" })} mt-3 w-full border border-white/10 bg-white/[0.035]`}
            >
              See Your System
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
        Not sure which package fits? Start with the system map, then email SignalOps when you are ready to talk through the build.
      </div>

      <BreakEvenCalculator className="mt-6" defaultAverageValue={750} defaultUnitLabel="account" />
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
                Want to see the system your business should be using?
              </h2>
              <p className={`mt-2 max-w-2xl text-sm leading-6 ${muted}`}>
                Tell us how your leads come in. SignalOps maps your System Map, Build Plan, and Next Steps so you can see the right operating system before setup.
              </p>
            </div>
          </div>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "homepage_final_cta" }}
            className={buttonVariants({ size: "lg" })}
          >
            Get Started
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
