import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  MessageSquareReply,
  Route,
  SearchCheck
} from "lucide-react";
import { EnvoFeaturePanel } from "@/components/site/envo/envo-brand-system";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import type { SeoLandingPageConfig } from "@/lib/seo-landing-pages";

export function SeoLandingPage({ page }: { page: SeoLandingPageConfig }) {
  return (
    <div className="overflow-x-hidden bg-[#FBFAF7] text-[#071126]">
      <section className="relative isolate overflow-hidden border-b border-[#D8E2F7] bg-[#FBFAF7]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(50,139,255,0.18),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(111,77,255,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.98fr_1.02fr] lg:px-8">
          <div className="flex flex-col justify-center">
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
                eventProperties={{ location: `${page.id}_hero` }}
                className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
              >
                {PRIMARY_CTA.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedLink>
              <Link href="/how-it-works" className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-[#CBD8F2] bg-white/72 text-[#071126] hover:bg-white sm:w-auto`}>
                See How It Works
              </Link>
            </div>
            <ul className="mt-7 grid gap-3 text-sm leading-6 text-[#647084]">
              {page.heroBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#34C759]" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <EnvoFeaturePanel className="self-center" />
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
            <Card key={item.title} className="bg-[#0B1024]/72">
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#328BFF]/14 text-[#D7E8FF]">
                  <MessageSquareReply className="size-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#D8E2F7] bg-[#F8FAFF]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Why it matters" title={page.whyTitle} description={page.whyIntro} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {page.whyCards.map((card) => (
              <Card key={card.title} className="bg-[#0B1024]/74">
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
        <SectionHeader eyebrow="Envo system" title={page.solutionTitle} description={page.solutionIntro} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.solutionCards.map((card, index) => {
            const Icon = solutionIcons[index % solutionIcons.length];
            return (
              <Card key={card.title} className="bg-[#0B1024]/74">
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#6F4DFF]/12 text-[#EAF1FF]">
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

      <section className="border-y border-[#D8E2F7] bg-[#FBFAF7]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Workflow" title={page.workflowTitle} description={page.workflowIntro} />
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {page.workflow.map((step) => (
              <div key={step.title} className="relative rounded-2xl border border-white/10 bg-[#0B1024]/76 p-5">
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white">
                  {step.label}
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#D7E2F7]/62">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Industry examples"
          title={page.industryTitle}
          description="Envo is trained around the way real service businesses receive and handle inquiries, not one generic script for every industry."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.industryExamples.map((example) => (
            <Card key={example.title} className="bg-[#0B1024]/74">
              <CardHeader>
                <CardTitle className="text-base">{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#D8E2F7] bg-[#F8FAFF]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions a practical business owner would ask"
            description="Straight answers about how this works, where humans stay involved, and how to start without adding unnecessary software."
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
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.74fr_1.26fr] lg:px-8">
        <SectionHeader
          eyebrow="Related pages"
          title="Keep exploring the missed-lead system"
          description="These pages show the other parts of the Envo workflow, from first response to intake, follow-up, tracking, and ROI."
        />
        <div className="grid gap-4 sm:grid-cols-3">
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
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[1.5rem] border border-white/12 bg-[#071126] p-6 shadow-[0_24px_80px_rgba(7,17,38,0.18)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#D7E8FF]">
              Preview Envo
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-white">
              See where leads are being missed, delayed, or forgotten.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D7E2F7]/78">
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
      <Badge className="mb-4 border border-[#CBD8F2] bg-white/74 text-[#2563EB]">{eyebrow}</Badge>
      <h2 className="text-3xl font-black tracking-normal text-[#071126] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[#647084]">{description}</p>
    </div>
  );
}
