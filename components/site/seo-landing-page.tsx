import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Layers3,
  MessageSquareReply,
  Route,
  SearchCheck
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import type { SeoLandingPageConfig } from "@/lib/seo-landing-pages";

export function SeoLandingPage({ page }: { page: SeoLandingPageConfig }) {
  return (
    <div className="overflow-x-hidden">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_8%,rgba(255,111,156,0.28),transparent_34%),linear-gradient(180deg,#241331,#100818_86%)]" />
        <div className="surface-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.98fr_1.02fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <Badge variant="outline" className="mb-6 border-[#ffb36d]/30 bg-[#ffb36d]/10 text-[#ffe1bd]">
              {page.eyebrow}
            </Badge>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#f2d9e8] sm:text-lg">
              {page.subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={PRIMARY_CTA.href}
                eventName={ANALYTICS_EVENTS.auditCtaClicked}
                eventProperties={{ location: `${page.id}_hero` }}
                className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
              >
                {PRIMARY_CTA.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedLink>
              <Link href="/how-it-works" className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full sm:w-auto`}>
                See How It Works
              </Link>
            </div>
            <ul className="mt-7 grid gap-3 text-sm leading-6 text-[#ead0df]/78">
              {page.heroBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="self-center rounded-2xl border border-white/10 bg-[#17122d]/80 p-4 shadow-2xl shadow-black/25 backdrop-blur sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">SignalOps service blueprint</p>
                <p className="text-xs leading-5 text-[#ead0df]/42">Practical workflows for real inbound leads</p>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#ff6f9c]/15 text-[#ffd7e6]">
                <Layers3 className="size-5" aria-hidden="true" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {page.quickStats.map((stat) => (
                <div key={stat.title} className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-base font-semibold text-white">{stat.title}</p>
                  <p className="mt-2 text-xs leading-5 text-[#ead0df]/62">{stat.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {page.workflow.slice(0, 3).map((step) => (
                <div key={step.title} className="rounded-xl border border-white/10 bg-[#211638]/72 p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-[#ffb36d]/12 text-xs font-semibold text-[#ffe1bd]">
                      {step.label}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#ead0df]/62">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
        <SectionHeader
          eyebrow="Plain English"
          title={page.plainEnglishTitle}
          description={page.plainEnglishBody}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {page.quickStats.map((item) => (
            <Card key={item.title} className="bg-[#17122d]/72">
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#ff6f9c]/14 text-[#ffd7e6]">
                  <MessageSquareReply className="size-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#17122d]/65">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Why it matters" title={page.whyTitle} description={page.whyIntro} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {page.whyCards.map((card) => (
              <Card key={card.title} className="bg-white/[0.035]">
                <CardHeader>
                  <CardTitle className="text-base">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="SignalOps system" title={page.solutionTitle} description={page.solutionIntro} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.solutionCards.map((card, index) => {
            const Icon = solutionIcons[index % solutionIcons.length];
            return (
              <Card key={card.title} className="bg-[#17122d]/74">
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#ffb36d]/12 text-[#ffe1bd]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,#160d22,#100818)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Workflow" title={page.workflowTitle} description={page.workflowIntro} />
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {page.workflow.map((step) => (
              <div key={step.title} className="relative rounded-2xl border border-white/10 bg-[#17122d]/76 p-5">
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white">
                  {step.label}
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#ead0df]/62">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Industry examples"
          title={page.industryTitle}
          description="SignalOps is built around the way real service businesses receive and handle inquiries, not one generic script for every industry."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.industryExamples.map((example) => (
            <Card key={example.title} className="bg-white/[0.035]">
              <CardHeader>
                <CardTitle className="text-base">{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#17122d]/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions a practical business owner would ask"
            description="Straight answers about how this works, where humans stay involved, and how to start without adding unnecessary software."
          />
          <div className="grid gap-3">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-white/10 bg-[#17122d]/76 p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-[#ead0df]/62">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.74fr_1.26fr] lg:px-8">
        <SectionHeader
          eyebrow="Related pages"
          title="Keep exploring the missed-lead system"
          description="These pages show the other parts of the SignalOps workflow, from first response to qualification, follow-up, tracking, and ROI."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {page.relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-[#ff9ec0]/35 hover:bg-[#ff6f9c]/10"
            >
              <p className="font-semibold text-white">{link.label}</p>
              <p className="mt-2 text-sm leading-6 text-[#ead0df]/62">{link.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl border border-[#ff9ec0]/20 bg-[#ff6f9c]/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#ffd7e6]">
              Free Missed Lead Check
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-white">
              See where leads are being missed, delayed, or forgotten.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#ead0df]/78">
              We will review how your business handles calls, texts, forms, DMs, and follow-ups,
              then show practical fixes that fit the way your team already works.
            </p>
          </div>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.auditCtaClicked}
            eventProperties={{ location: `${page.id}_final_cta` }}
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

const solutionIcons = [SearchCheck, MessageSquareReply, Route, ClipboardCheck];

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
      <Badge className="mb-4 bg-[#ff6f9c]/14 text-[#ffd7e6]">{eyebrow}</Badge>
      <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[#ead0df]/78">{description}</p>
    </div>
  );
}
