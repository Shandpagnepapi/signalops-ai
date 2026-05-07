import type { ReactNode } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  MessageSquareReply,
  PhoneCall,
  Route,
  SearchCheck,
  Sparkles
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/constants";

const benefitBullets = [
  "Reply in seconds",
  "Qualify leads automatically",
  "Follow up without dropping the ball"
];

const proofItems = [
  "Faster replies",
  "24/7 follow-up",
  "More jobs booked",
  "No CRM required"
];

const steps = [
  {
    title: "Reply fast",
    description: "Every new lead gets a quick, useful response.",
    icon: MessageSquareReply
  },
  {
    title: "Qualify the lead",
    description: "SignalOps asks what matters and spots the best opportunities.",
    icon: SearchCheck
  },
  {
    title: "Book or hand off",
    description: "Ready leads move to booking or your team with clear notes.",
    icon: CalendarCheck2
  }
];

const features = [
  {
    title: "Instant Reply",
    description: "Answer forms, calls, and DMs while interest is high.",
    icon: MessageSquareReply
  },
  {
    title: "AI Qualification",
    description: "Know who is ready, urgent, or just browsing.",
    icon: SearchCheck
  },
  {
    title: "Smart Follow-Up",
    description: "Keep nudging leads until they book or opt out.",
    icon: Route
  },
  {
    title: "Booking Handoff",
    description: "Send qualified leads to the right next step.",
    icon: CalendarCheck2
  }
];

const pricingPlans = [
  {
    name: "Starter",
    tierLabel: "Core setup",
    price: "$297/mo",
    bestFor: "Best for businesses getting started",
    summary: "Reply fast and keep basic leads from slipping through.",
    ctaLabel: "Start with Starter",
    features: [
      "One core lead source",
      "Fast reply setup",
      "Basic lead questions",
      "Simple follow-up reminders",
      "New lead alerts"
    ]
  },
  {
    name: "Growth",
    tierLabel: "Best value",
    price: "$597/mo",
    bestFor: "Best for growing businesses that want more automation",
    summary: "Add stronger follow-up, clearer handoffs, and better visibility.",
    ctaLabel: "Choose Growth",
    highlighted: true,
    features: [
      "Multiple lead sources",
      "Smarter lead scoring",
      "Quote and photo follow-up",
      "Booking handoff and reminders",
      "Dashboard visibility",
      "Monthly tune-up"
    ]
  },
  {
    name: "Custom Agent System",
    tierLabel: "Tailored system",
    price: "Contact Us",
    bestFor: "Best for advanced or multi-location workflows",
    summary: "Build around complex sales paths, tools, teams, or locations.",
    ctaLabel: "Discuss Custom",
    features: [
      "Tailored lead workflows",
      "Advanced routing rules",
      "CRM and calendar integrations",
      "Team or location handoffs",
      "Custom reporting"
    ]
  }
];

const faqs = [
  {
    question: "Is this just a chatbot?",
    answer:
      "No. It is the lead response system behind your forms, calls, texts, DMs, and booking flow."
  },
  {
    question: "Will it replace my team?",
    answer:
      "No. It handles first replies and reminders so your team can focus on serious leads."
  },
  {
    question: "Do I need a CRM?",
    answer:
      "No. We can start with calls, texts, forms, and DMs. A CRM can come later."
  },
  {
    question: "Can it work with my current website?",
    answer:
      "Yes. Most builds start with your existing forms, missed calls, landing pages, or quote requests."
  },
  {
    question: "What happens when AI is unsure?",
    answer:
      "It flags the lead for human review with notes. Risky or unclear leads stay with a person."
  },
  {
    question: "How fast can we start?",
    answer:
      "Start with a Free Lead Leak Audit. Then we scope the first workflow around your best lead source."
  }
];

export function MarketingHome() {
  return (
    <div className="overflow-x-hidden bg-[#160d22] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(255,112,164,0.28),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(255,151,89,0.20),transparent_30%),linear-gradient(180deg,#21112f_0%,#160d22_72%,#120a1c_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:46px_46px] opacity-35" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <Badge className="mb-5 border border-pink-200/18 bg-white/8 text-pink-100">
              AI lead response for local service businesses
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Respond faster. Book more leads.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#f3ddeb]/86 sm:text-lg">
              SignalOps helps local service businesses reply fast, qualify leads, and follow up
              automatically so more inquiries turn into booked jobs.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
            <div className="mt-6 grid max-w-xl gap-2 text-sm text-[#f6d7e7]/82 sm:grid-cols-3">
              {benefitBullets.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#ffb36d]" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <HeroPreview />
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#140b1f]/88">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 sm:px-6 md:grid-cols-4 lg:px-8">
          {proofItems.map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/[0.055] px-3 py-3 text-center text-sm font-medium text-[#f7deed] shadow-sm shadow-black/10 backdrop-blur">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <SectionHeader
          eyebrow="How it works"
          title="From new lead to booked job."
          description="Three simple steps. No messy handoff."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="rounded-xl border border-white/10 bg-white/[0.055] p-5 shadow-xl shadow-black/10 backdrop-blur">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-[#ff6f9c]/16 text-[#ffbfd5]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold text-[#ffb36d]">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#e8cbdd]/78">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,#1c102b,#140b1f)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeader
            eyebrow="Core capabilities"
            title="Everything needed to keep leads moving."
            description="Clear replies, better sorting, steady follow-up, and an easier handoff."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-xl border border-white/10 bg-[#231434]/82 p-5 shadow-xl shadow-black/10">
                  <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-[#ffb36d]/14 text-[#ffca91]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#e8cbdd]/76">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <SectionHeader
          eyebrow="Pricing"
          title="Simple pricing. Serious results."
          description="Choose the setup that fits your business today."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex h-full flex-col rounded-2xl border p-5 shadow-2xl shadow-black/14 sm:p-6 ${
                plan.highlighted
                  ? "border-[#ffb36d]/55 bg-[linear-gradient(180deg,rgba(255,111,156,0.22),rgba(35,20,52,0.92))] ring-1 ring-[#ffb36d]/20"
                  : "border-white/10 bg-white/[0.055]"
              }`}
            >
              <div className="flex min-h-32 flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <Badge className="border border-white/10 bg-white/[0.075] text-[#f7deed]">
                    {plan.tierLabel}
                  </Badge>
                  {plan.highlighted ? (
                    <Badge className="shrink-0 border border-[#ffb36d]/30 bg-[#ffb36d]/16 text-[#ffe0bd]">
                      Most Popular
                    </Badge>
                  ) : null}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold leading-tight text-white">{plan.name}</h3>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">
                    Best for
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#f2d9e8]/84">{plan.bestFor}</p>
                  <p className="mt-3 text-sm leading-6 text-[#e8cbdd]/66">{plan.summary}</p>
                </div>
              </div>
              <div className="mt-5 border-y border-white/10 py-5">
                <p className="text-sm font-medium text-[#ffb36d]">Monthly price</p>
                <p className="mt-1 text-4xl font-semibold tracking-normal text-white">{plan.price}</p>
              </div>
              <p className="mt-6 text-sm font-semibold text-white">What you get</p>
              <ul className="mt-3 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6 text-[#f2d9e8]/82">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#ffb36d]" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <TrackedLink
                href={PRIMARY_CTA.href}
                eventName={ANALYTICS_EVENTS.packageClicked}
                eventProperties={{ package: plan.name, price: plan.price }}
                className={`${buttonVariants({ variant: plan.highlighted ? "default" : "outline" })} mt-7 w-full`}
              >
                {plan.ctaLabel}
              </TrackedLink>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-center text-sm text-[#f2d9e8]/80">
          Not sure which plan fits? Start with the Free Lead Leak Audit and we will map the
          simplest path first.
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.auditCtaClicked}
            eventProperties={{ location: "homepage_pricing_microcopy" }}
            className="ml-1 font-semibold text-[#ffb36d] underline-offset-4 hover:underline"
          >
            Get the audit
          </TrackedLink>
        </div>
      </section>

      <section id="demo" className="border-y border-white/10 bg-[#130a1d]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <SectionHeader
            eyebrow="Example"
            title="A simple example: quote request to booked job."
            description="A customer asks for wheel repair. SignalOps replies, asks for photos, scores urgency, and shows the shop what to do next."
          />
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/15 backdrop-blur">
            {[
              ["Inquiry", "Customer asks for a quote and mobile repair."],
              ["Qualification", "SignalOps asks for photos and checks urgency."],
              ["Handoff", "The shop gets the reply, notes, score, and next step."]
            ].map(([title, description], index) => (
              <div key={title} className="flex gap-4 border-b border-white/10 py-4 last:border-b-0">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#ff6f9c]/16 text-sm font-semibold text-[#ffc0d5]">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#e8cbdd]/76">{description}</p>
                </div>
              </div>
            ))}
            <TrackedLink
              href="/demo"
              eventName={ANALYTICS_EVENTS.demoViewed}
              eventProperties={{ location: "homepage_demo_section" }}
              className={`${buttonVariants({ variant: "secondary" })} mt-4 w-full bg-white/8`}
            >
              View Apex Wheel Repair Demo
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Straight answers before you book a call."
          description="Practical answers for owners who do not want another complicated platform."
        />
        <div className="grid gap-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-xl border border-white/10 bg-white/[0.055] p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-white">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-[#e8cbdd]/76">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl border border-[#ffb36d]/24 bg-[linear-gradient(135deg,rgba(255,111,156,0.18),rgba(255,179,109,0.10),rgba(35,20,52,0.82))] p-6 shadow-2xl shadow-black/15 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb36d]">
              Free Lead Leak Audit
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Find your missed leads.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#f2d9e8]/82">
              We will review your calls, forms, texts, DMs, and follow-ups, then show where
              opportunities are slipping away.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
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
      </section>
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="relative self-center rounded-2xl border border-white/12 bg-white/[0.075] p-4 shadow-2xl shadow-black/25 backdrop-blur-xl">
      <div className="absolute -right-10 -top-10 size-36 rounded-full bg-[#ff6f9c]/20 blur-3xl" />
      <div className="absolute -bottom-12 left-10 size-32 rounded-full bg-[#ffb36d]/16 blur-3xl" />
      <div className="relative rounded-xl border border-white/10 bg-[#120a1c]/88 p-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">Lead response preview</p>
            <p className="text-xs text-[#e8cbdd]/60">Inquiry to booked next step</p>
          </div>
          <Badge className="border border-[#ffb36d]/24 bg-[#ffb36d]/12 text-[#ffe0bd]">Live demo</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["41s", "reply target"],
            ["92", "lead score"],
            ["3", "next actions"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="mt-1 text-xs text-[#e8cbdd]/58">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          <PreviewRow
            icon={<PhoneCall className="size-4" aria-hidden="true" />}
            title="New lead"
            description="Quote request from website form"
            status="Captured"
          />
          <PreviewRow
            icon={<Sparkles className="size-4" aria-hidden="true" />}
            title="AI reply"
            description="Asks for photos and preferred time"
            status="Sent"
          />
          <PreviewRow
            icon={<ClipboardCheck className="size-4" aria-hidden="true" />}
            title="Shop handoff"
            description="Hot lead, mobile repair requested"
            status="Ready"
          />
        </div>
      </div>
    </div>
  );
}

function PreviewRow({
  icon,
  title,
  description,
  status
}: {
  icon: ReactNode;
  title: string;
  description: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#ff6f9c]/14 text-[#ffc0d5]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="truncate text-xs text-[#e8cbdd]/60">{description}</p>
      </div>
      <span className="rounded-md bg-[#ffb36d]/12 px-2 py-1 text-xs font-medium text-[#ffe0bd]">
        {status}
      </span>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <Badge className="mb-4 border border-[#ff6f9c]/20 bg-[#ff6f9c]/12 text-[#ffc0d5]">
        {eyebrow}
      </Badge>
      <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[#e8cbdd]/78">{description}</p>
    </div>
  );
}
