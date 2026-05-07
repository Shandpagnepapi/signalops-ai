import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  ClipboardList,
  ListChecks,
  MessageSquareReply,
  PhoneCall,
  SearchCheck,
  Workflow
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import type { IndustrySeoPageConfig } from "@/lib/industry-seo-pages";

export function IndustrySeoPage({ page }: { page: IndustrySeoPageConfig }) {
  const exampleLeadFlow = page.exampleLeadFlow ?? [];
  const qualificationQuestions = page.qualificationQuestions ?? [];
  const followUpExamples = page.followUpExamples ?? [];
  const dashboardValue = page.dashboardValue ?? [];

  return (
    <div className="overflow-x-hidden">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(23,200,242,0.2),transparent_32%),radial-gradient(circle_at_18%_12%,rgba(47,124,255,0.24),transparent_35%),linear-gradient(180deg,#081326,#060c18_88%)]" />
        <div className="surface-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.96fr_1.04fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <Badge variant="outline" className="mb-6 border-cyan-300/30 bg-cyan-300/10 text-cyan-100">
              {page.eyebrow}
            </Badge>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              {page.subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={PRIMARY_CTA.href}
                eventName={ANALYTICS_EVENTS.auditCtaClicked}
                eventProperties={{ location: `${page.id}_industry_hero` }}
                className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
              >
                {PRIMARY_CTA.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href="/live-demo"
                eventName={ANALYTICS_EVENTS.demoViewed}
                eventProperties={{ location: `${page.id}_industry_hero_live_demo` }}
                className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full sm:w-auto`}
              >
                Generate Tailored Demo
              </TrackedLink>
            </div>
            <ul className="mt-7 grid gap-3 text-sm leading-6 text-slate-300">
              {page.heroBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="self-center rounded-lg border border-white/10 bg-slate-950/82 p-4 shadow-2xl shadow-black/25 backdrop-blur sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">{page.industryName} lead flow</p>
                <p className="text-xs leading-5 text-slate-500">Capture, qualify, route, and follow up</p>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-blue-500/15 text-blue-100">
                <Workflow className="size-5" aria-hidden="true" />
              </div>
            </div>
            <div className="grid gap-3">
              {page.missedLeadProblems.slice(0, 3).map((problem) => (
                <div key={problem.title} className="rounded-md border border-white/10 bg-slate-900/72 p-4">
                  <p className="text-sm font-medium text-white">{problem.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {exampleLeadFlow.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Example lead flow"
            title={`How SignalOps handles leads for ${page.industryName.toLowerCase()}`}
            description="This is the practical sequence a customer would experience before your team gets a clean handoff."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {exampleLeadFlow.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-white/10 bg-slate-950/74 p-5">
                <div className="mb-5 flex size-10 items-center justify-center rounded-md bg-primary text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Missed lead problems"
          title={`Where ${page.industryName.toLowerCase()} usually lose leads`}
          description="SignalOps starts by mapping the real moments where inquiries slow down, get answered vaguely, or never receive a clear follow-up."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.missedLeadProblems.map((problem) => (
            <Card key={problem.title} className="bg-slate-950/74">
              <CardHeader>
                <CardTitle className="text-base">{problem.title}</CardTitle>
                <CardDescription>{problem.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/65">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <SectionHeader
            eyebrow="Lead sources"
            title="Common places leads arrive"
            description="The system can start with the channels your business already uses, then expand once the first workflow is working."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {page.leadSources.map((source) => (
              <div key={source} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300">
                <PhoneCall className="size-4 shrink-0 text-cyan-200" aria-hidden="true" />
                <span>{source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Follow-up gaps"
          title="Common follow-up failures"
          description="These are the practical points where a qualified lead can stall even after someone replies once."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {page.followUpFailures.map((failure) => (
            <Card key={failure.title} className="bg-white/[0.035]">
              <CardHeader>
                <CardTitle className="text-base">{failure.title}</CardTitle>
                <CardDescription>{failure.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {qualificationQuestions.length > 0 ? (
        <section className="border-y border-white/10 bg-slate-950/65">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
            <SectionHeader
              eyebrow="Qualification questions"
              title={`Questions SignalOps can ask for ${page.industryName.toLowerCase()}`}
              description="The questions should match the service, urgency, and level of human review required before quoting or booking."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {qualificationQuestions.map((question) => (
                <div key={question} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
                  <ListChecks className="mt-0.5 size-4 shrink-0 text-cyan-200" aria-hidden="true" />
                  <span>{question}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,#07101f,#060c18)]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <MessageExample
            eyebrow="Example AI instant reply"
            icon={<MessageSquareReply className="size-5" aria-hidden="true" />}
            scenario={page.instantReply.scenario}
            message={page.instantReply.message}
          />
          <MessageExample
            eyebrow="Example internal sales note"
            icon={<ClipboardList className="size-5" aria-hidden="true" />}
            scenario={page.internalNote.scenario}
            message={page.internalNote.message}
          />
        </div>
      </section>

      {followUpExamples.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Follow-up examples"
            title="Useful follow-up without sounding like a generic sequence"
            description="Follow-up should ask for the next missing detail, help the customer book, or route a reply to the team."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {followUpExamples.map((example) => (
              <Card key={example.scenario} className="bg-slate-950/74">
                <CardHeader>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                    {example.scenario}
                  </p>
                  <CardDescription className="text-base leading-7 text-slate-300">
                    {example.message}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Lead scoring"
          title="Example scoring rules"
          description="SignalOps scoring is not magic. It is a practical way to decide who needs a callback, who needs more information, and who should be reviewed by a human."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {page.scoringRules.map((rule) => (
            <Card key={rule.title} className="bg-slate-950/74">
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-blue-500/14 text-blue-100">
                  <SearchCheck className="size-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">{rule.title}</CardTitle>
                <CardDescription>{rule.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/65">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Recommended automations"
            title={`Useful SignalOps automations for ${page.industryName.toLowerCase()}`}
            description="The first version should focus on the workflows that protect the most revenue with the least extra admin."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.automations.map((automation) => (
              <Card key={automation.title} className="bg-white/[0.035]">
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-cyan-400/12 text-cyan-100">
                    <BellRing className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base">{automation.title}</CardTitle>
                  <CardDescription>{automation.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {dashboardValue.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Dashboard value"
            title={`What ${page.industryName.toLowerCase()} can see in the dashboard`}
            description="SignalOps gives owners a simple operating view of lead quality, response needs, and follow-up gaps."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dashboardValue.map((item) => (
              <Card key={item.title} className="bg-slate-950/74">
                <CardHeader>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title={`Questions ${page.industryName.toLowerCase()} usually ask`}
          description="Plain-English answers for owners who want better response and follow-up without handing control to a black box."
        />
        <div className="grid gap-3">
          {page.faqs.map((faq) => (
            <details key={faq.question} className="group rounded-lg border border-white/10 bg-slate-950/76 p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-white">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.74fr_1.26fr] lg:px-8">
          <SectionHeader
            eyebrow="Next steps"
            title="Generate a tailored demo or check your current lead flow"
            description="Use the live demo generator for a quick industry-specific preview, or start with a Free Missed Lead Checkup of calls, texts, forms, DMs, and follow-ups."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {page.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-5 transition hover:border-blue-300/35 hover:bg-blue-500/10"
              >
                <p className="font-semibold text-white">{link.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-lg border border-blue-300/20 bg-blue-500/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-100">
              Free Missed Lead Checkup
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-white">
              See where leads are being missed, delayed, or forgotten.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              We will review how your business handles calls, texts, forms, DMs, and follow-ups,
              then show practical fixes that fit the way your team already works.
            </p>
          </div>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.auditCtaClicked}
            eventProperties={{ location: `${page.id}_industry_final_cta` }}
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

function MessageExample({
  eyebrow,
  icon,
  scenario,
  message
}: {
  eyebrow: string;
  icon: ReactNode;
  scenario: string;
  message: string;
}) {
  return (
    <Card className="bg-slate-950/76">
      <CardHeader>
        <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-blue-500/14 text-blue-100">
          {icon}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">{eyebrow}</p>
        <CardTitle className="text-xl">{scenario}</CardTitle>
        <CardDescription className="text-base leading-7 text-slate-300">
          {message}
        </CardDescription>
      </CardHeader>
    </Card>
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
