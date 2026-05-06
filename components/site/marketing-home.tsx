import Image from "next/image";
import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  DatabaseZap,
  Gauge,
  MessageSquareReply,
  PhoneCall,
  Route,
  SearchCheck,
  Sparkles,
  Workflow
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import {
  AI_LEAD_ENGINE_FEATURES,
  SIGNALOPS_PROCESS,
  SIGNALOPS_USE_CASES,
  MARKETING_FAQS,
  PACKAGE_NAMES,
  PRIMARY_CTA,
  SECONDARY_CTA,
  TARGET_CUSTOMERS
} from "@/lib/constants";

const engineIcons = [
  MessageSquareReply,
  SearchCheck,
  Gauge,
  CalendarCheck2,
  DatabaseZap,
  Workflow,
  BellRing,
  ClipboardCheck
];

const useCaseIcons = [
  PhoneCall,
  SearchCheck,
  CalendarCheck2,
  Sparkles,
  DatabaseZap,
  Workflow,
  BellRing,
  Route,
  ClipboardCheck
];

export function MarketingHome() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <Image
          src="/brand/signalops-hero.png"
          alt=""
          fill
          quality={62}
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,24,0.56),#060c18_86%)]" />
        <div className="surface-grid absolute inset-0 opacity-25" />
        <div className="relative mx-auto grid min-h-[86vh] w-full max-w-[100vw] items-center gap-10 px-4 py-20 sm:max-w-7xl sm:px-6 sm:py-24 lg:grid-cols-[0.94fr_1.06fr] lg:px-8">
          <div className="min-w-0 max-w-sm sm:max-w-3xl">
            <Badge variant="outline" className="mb-6 max-w-full whitespace-normal border-cyan-300/30 bg-cyan-300/10 text-left leading-5 text-cyan-100">
              AI Lead Response & Qualification System for service businesses
            </Badge>
            <h1 className="max-w-sm text-4xl font-semibold leading-tight tracking-normal text-white sm:max-w-none sm:text-6xl">
              AI lead response systems for businesses that cannot afford missed leads.
            </h1>
            <p className="mt-6 max-w-xs text-base leading-8 text-slate-200 sm:max-w-2xl sm:text-lg">
              SignalOps helps small and local businesses capture, qualify, route,
              follow up with, and book more leads automatically before good
              inquiries get buried in forms, inboxes, missed calls, and scattered notes.
            </p>
            <div className="mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row">
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
                href="/live-demo"
                eventName={ANALYTICS_EVENTS.demoViewed}
                eventProperties={{ location: "homepage_hero_live_demo" }}
                className={`${buttonVariants({ variant: "secondary", size: "lg" })} w-full sm:w-auto`}
              >
                Generate Live Demo
              </TrackedLink>
              <TrackedLink
                href={SECONDARY_CTA.href}
                eventName={ANALYTICS_EVENTS.demoViewed}
                eventProperties={{ location: "homepage_hero_click" }}
                className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full sm:w-auto`}
              >
                View Apex Demo
              </TrackedLink>
            </div>
            <div className="mt-6 grid max-w-2xl gap-3 text-sm text-slate-300 sm:grid-cols-3">
              {["No new admin hire", "Human review for risky cases", "Built around your current tools"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 max-w-sm rounded-lg border border-white/10 bg-slate-950/82 p-4 shadow-2xl shadow-black/25 backdrop-blur sm:max-w-none sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">Lead flow command center</p>
                <p className="text-xs text-slate-500">From inquiry to booked next step</p>
              </div>
              <Badge className="bg-emerald-400/12 text-emerald-100">Demo-ready</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["< 60s", "target first reply"],
                ["91", "urgent lead score"],
                ["7", "follow-up touchpoints"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs text-slate-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["Website quote request", "Reply instantly, confirm service need, and request missing details."],
                ["Missed-call lead", "Send text-back, collect context, and alert the right person."],
                ["Appointment handoff", "Push qualified prospects to booking while context is still fresh."]
              ].map(([title, description]) => (
                <div key={title} className="rounded-md border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-5 sm:px-6 lg:px-8">
          {TARGET_CUSTOMERS.map((customer) => (
            <span key={customer} className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-300">
              {customer}
            </span>
          ))}
        </div>
      </section>

      <section className="border-b border-white/10 bg-slate-950/35">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ["Speed-to-lead", "Fast, useful replies while the prospect is still comparing options."],
            ["Qualification clarity", "Service need, urgency, fit, and next step summarized for the team."],
            ["Booked follow-through", "Photo requests, reminders, alerts, and booking paths handled consistently."]
          ].map(([title, description]) => (
            <div key={title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <p className="font-semibold text-white">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <SectionHeader
          eyebrow="The leak"
          title="The problem is not always lead volume. It is what happens after the lead arrives."
          description="Paid ads, SEO, referrals, and website traffic can create demand, but revenue leaks when prospects wait too long, get vague replies, or never receive a clear next step."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Slow response", "A form fill or missed call sits too long while the customer keeps shopping."],
            ["Messy qualification", "High-intent quote requests look the same as vague price shoppers."],
            ["Follow-up gaps", "Photo requests, estimate reminders, and booking nudges depend on memory."],
            ["No ownership", "Owners cannot see which leads were answered, routed, booked, or lost."]
          ].map(([title, description]) => (
            <Card key={title} className="bg-slate-950/70">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,#07101f,#060c18)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The solution"
            title="The SignalOps engine keeps every inquiry moving."
            description="SignalOps installs an operating layer between lead source and sales follow-up, so prospects get useful communication and your team gets the context needed to act."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AI_LEAD_ENGINE_FEATURES.map((feature, index) => {
              const Icon = engineIcons[index] ?? Sparkles;
              return (
                <Card key={feature} className="bg-slate-950/76">
                  <CardHeader>
                    <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-blue-500/15 text-blue-200">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-base">{feature}</CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionHeader
            eyebrow="Demo preview"
            title="See SignalOps inside a real local service workflow."
            description="The Apex Wheel Repair demo shows how a wheel repair shop can instantly qualify quote requests, ask for photos, prioritize urgent bent-wheel leads, and route hot opportunities to the shop."
          />
          <TrackedLink
            href="/demo"
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "homepage_demo_preview_button" }}
            className={buttonVariants({ size: "lg" })}
          >
            View Demo
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
        </div>
        <TrackedLink
          href="/demo"
          eventName={ANALYTICS_EVENTS.demoViewed}
          eventProperties={{ location: "homepage_demo_preview_card" }}
          className="group block rounded-lg border border-white/10 bg-slate-950 p-3 shadow-2xl shadow-black/20"
        >
          <div className="overflow-hidden rounded-md border border-white/10 bg-black">
            <Image
              src="/demo/apex-wheel-hero.png"
              alt="Apex Wheel Repair demo preview"
              width={1800}
              height={1100}
              quality={72}
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="aspect-[16/10] w-full object-cover opacity-88 transition duration-300 group-hover:scale-[1.02]"
            />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {["Photo intake", "Urgency score", "Shop routing"].map((item) => (
              <div key={item} className="rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </TrackedLink>
      </section>

      <section className="border-y border-white/10 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Process"
            title="A practical build path from lead leak audit to optimization."
            description="The goal is not to bolt AI onto a broken process. We map the sales motion first, then build a response system your team can actually trust."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {SIGNALOPS_PROCESS.map((step, index) => (
              <div key={step.step} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-5 flex size-10 items-center justify-center rounded-md bg-primary text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="text-base font-semibold text-white">{step.step}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Packages"
          title="Start with the missed lead problem you can feel. Expand once the process is working."
          description="Simple pricing guidance for prospects. Final scope depends on lead sources, integrations, locations, calendars, and workflow complexity."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {PACKAGE_NAMES.map((pkg, index) => (
            <Card key={pkg.name} className={index === 1 ? "border-blue-300/30 bg-blue-500/10" : "bg-slate-950/76"}>
              <CardHeader>
                <Badge className="mb-3 w-fit bg-white/8 text-slate-100">{pkg.name}</Badge>
                <CardTitle className="text-2xl">{pkg.price}</CardTitle>
                <CardDescription>{pkg.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <TrackedLink
                  href={PRIMARY_CTA.href}
                  eventName={ANALYTICS_EVENTS.packageClicked}
                  eventProperties={{ package: pkg.name, price: pkg.price }}
                  className={`${buttonVariants({ variant: index === 1 ? "default" : "outline" })} mt-6 w-full`}
                >
                  Discuss {pkg.name}
                </TrackedLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,#060c18,#0a1426)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Use cases"
            title="SignalOps handles the work between interest and booked appointment."
            description="These are the repeatable workflows local service businesses usually need before spending more money on traffic."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SIGNALOPS_USE_CASES.map((useCase, index) => {
              const Icon = useCaseIcons[index] ?? Workflow;
              return (
                <Card key={useCase} className="bg-slate-950/74">
                  <CardHeader>
                    <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-cyan-400/12 text-cyan-200">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-base">{useCase}</CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <SectionHeader
            eyebrow="Automotive example"
            title="Apex Wheel Repair: from quote request to routed opportunity."
            description="A customer submits a quote request for curb rash, bent wheels, or refinishing. The system responds instantly, asks for photos, scores urgency, routes serious damage to the shop, and follows up if the customer does not book."
          />
          <TrackedLink
            href="/demo"
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "homepage_automotive_example" }}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Open Apex Demo
          </TrackedLink>
        </div>
        <div className="grid gap-3">
          {[
            ["Customer submits", "Vehicle, wheel size, damage type, photo note, drivability, and appointment preference."],
            ["System qualifies", "Curb rash and refinishing are routed as quote-ready. Bent or cracked wheels trigger inspection language."],
            ["Shop receives", "Score, urgency, recommended next action, internal note, and tags like mobile-request or inspection-required."],
            ["Follow-up starts", "If photos or booking details are missing, the system keeps the conversation moving."]
          ].map(([title, description]) => (
            <div key={title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <p className="font-semibold text-white">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Straight answers for skeptical operators."
            description="SignalOps is built for business owners who care about speed, control, and practical follow-up, not novelty."
          />
          <div className="grid gap-3">
            {MARKETING_FAQS.map((faq) => (
              <details key={faq.question} className="group rounded-lg border border-white/10 bg-slate-950/76 p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-lg border border-blue-300/20 bg-blue-500/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-100">Free Lead Leak Audit</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-white">
              See where leads are being missed, delayed, or forgotten.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              We will review how your business handles calls, texts, forms, DMs,
              and follow-ups - with or without a CRM - then show practical fixes.
            </p>
          </div>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.auditCtaClicked}
            eventProperties={{ location: "homepage_final_cta" }}
            className={buttonVariants({ size: "lg" })}
          >
            {PRIMARY_CTA.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
        </div>
      </section>
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
      <Badge className="mb-4 bg-blue-500/14 text-blue-100">{eyebrow}</Badge>
      <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
    </div>
  );
}
