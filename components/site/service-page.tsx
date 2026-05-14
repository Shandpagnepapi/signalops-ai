import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CalendarCheck,
  ClipboardList,
  MessageSquareReply,
  Route,
  SearchCheck
} from "lucide-react";
import { EnvoFeaturePanel, EnvoSignatureCard } from "@/components/site/envo/envo-brand-system";
import { EnvoLeadWorkflowVisual } from "@/components/site/envo/envo-dashboard-mockups";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import type { ServicePageConfig } from "@/lib/service-pages";

export function ServicePage({ page }: { page: ServicePageConfig }) {
  return (
    <div className="overflow-x-hidden bg-[#FBFAF7] text-[#071126]">
      <section className="relative isolate overflow-hidden border-b border-[#D8E2F7] bg-[#FBFAF7]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(50,139,255,0.18),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(111,77,255,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <Badge variant="outline" className="mb-6 w-fit border-[#CBD8F2] bg-white/74 text-[#2563EB]">
              {page.eyebrow}
            </Badge>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal text-[#071126] sm:text-5xl lg:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#647084] sm:text-lg">
              {page.subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={PRIMARY_CTA.href}
                eventName={ANALYTICS_EVENTS.auditCtaClicked}
                eventProperties={{ location: `${page.id}_service_hero` }}
                className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
              >
                {PRIMARY_CTA.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href="/demo"
                eventName={ANALYTICS_EVENTS.demoViewed}
                eventProperties={{ location: `${page.id}_service_demo` }}
                className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-[#CBD8F2] bg-white/72 text-[#071126] hover:bg-white sm:w-auto`}
              >
                View Client Demo
              </TrackedLink>
            </div>
          </div>

          <EnvoFeaturePanel className="order-1 self-center lg:order-2" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="The problem" title={page.problemTitle} description={page.problemIntro} />
        <CardGrid cards={page.problemCards} tone="dark" />
      </section>

      <section className="border-y border-[#D8E2F7] bg-[#F8FAFF]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Envo system" title={page.solutionTitle} description={page.solutionIntro} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.solutionCards.map((card, index) => {
              const Icon = solutionIcons[index % solutionIcons.length];
              return (
                <Card key={card.title} className="bg-[#0B1024]/74">
                  <CardHeader>
                    <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#328BFF]/14 text-[#D7E8FF]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-base">{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-[#D8E2F7] bg-[#FBFAF7]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Workflow" title={page.workflowTitle} description={page.workflowIntro} />
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="rounded-[1.5rem] border border-white/80 bg-white/76 p-3 shadow-[0_24px_80px_rgba(37,99,235,0.12)]">
              <EnvoLeadWorkflowVisual className="rounded-[1.2rem] shadow-none" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
            {page.workflow.map((step) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-[#0B1024]/76 p-5">
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white">
                  {step.label}
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#D7E2F7]/62">{step.description}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
        <SectionHeader
          eyebrow="Who it is for"
          title="Built for service businesses where timing and context matter"
          description="SignalOps is most useful when a lead needs a fast reply, a few key details, and a clear handoff before the customer goes cold."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {page.whoFor.map((card) => (
            <Card key={card.title} className="bg-[#0B1024]/74">
              <CardHeader>
                <CardTitle className="text-base">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#D8E2F7] bg-[#F8FAFF]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Benefits"
            title="What improves when the lead flow is organized"
            description="The goal is not more dashboards for their own sake. The goal is faster response, better context, cleaner handoffs, and fewer forgotten opportunities."
          />
          <CardGrid cards={page.benefits} tone="light" />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions business owners ask before installing this"
          description="Plain-English answers about where automation helps and where your team should stay involved."
        />
        <div className="grid gap-3">
          {page.faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-white/10 bg-[#0B1024]/76 p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-white">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-[#D7E2F7]/62">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-y border-[#D8E2F7] bg-[#F8FAFF]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.74fr_1.26fr] lg:px-8">
          <SectionHeader
            eyebrow="Related services"
            title="Connect this page to the rest of the lead system"
            description="These service pages explain the other workflows that usually connect to this one."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {page.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-white/10 bg-[#0B1024]/74 p-5 transition hover:border-[#8EBBFF]/35 hover:bg-[#152044]"
              >
                <p className="font-semibold text-white">{link.label}</p>
                <p className="mt-2 text-sm leading-6 text-[#D7E2F7]/62">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[1.5rem] border border-white/12 bg-[#071126] p-6 shadow-[0_24px_80px_rgba(7,17,38,0.18)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#D7E8FF]">
              Preview Envo
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-white">
              Ask about the package that fits this workflow.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D7E2F7]/78">
              Share your lead sources, current tools, and project goals so SignalOpsAI can scope the right Envo build.
            </p>
          </div>
          <EnvoSignatureCard className="hidden min-h-[11rem] max-w-[18rem] shrink-0 rounded-[1.25rem] p-5 xl:block" compact />
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.auditCtaClicked}
            eventProperties={{ location: `${page.id}_service_final_cta` }}
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

const solutionIcons = [MessageSquareReply, SearchCheck, Route, BellRing, CalendarCheck, ClipboardList];

function CardGrid({
  cards,
  tone
}: {
  cards: { title: string; description: string }[];
  tone: "dark" | "light";
}) {
  const className = tone === "dark" ? "bg-[#0B1024]/74" : "bg-[#0B1024]/68";

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title} className={className}>
          <CardHeader>
            <CardTitle className="text-base">{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
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
      <Badge className="mb-4 border border-[#CBD8F2] bg-white/74 text-[#2563EB]">{eyebrow}</Badge>
      <h2 className="text-3xl font-black tracking-normal text-[#071126] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[#647084]">{description}</p>
    </div>
  );
}
