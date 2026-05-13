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
  SearchCheck
} from "lucide-react";
import { EnvoFeaturePanel } from "@/components/site/envo/envo-brand-system";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import type { IndustrySeoPageConfig } from "@/lib/industry-seo-pages";

export function IndustrySeoPage({ page }: { page: IndustrySeoPageConfig }) {
  const exampleLeadFlow = page.exampleLeadFlow ?? [];
  const intakeQuestions = page.qualificationQuestions ?? [];
  const followUpExamples = page.followUpExamples ?? [];
  const dashboardValue = page.dashboardValue ?? [];

  return (
    <div className="overflow-x-hidden bg-[#FBFAF7] text-[#071126]">
      <section className="relative isolate overflow-hidden border-b border-[#D8E2F7] bg-[#FBFAF7]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(111,77,255,0.12),transparent_32%),radial-gradient(circle_at_18%_0%,rgba(50,139,255,0.18),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.96fr_1.04fr] lg:px-8">
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
                className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-[#CBD8F2] bg-white/72 text-[#071126] hover:bg-white sm:w-auto`}
              >
                Generate Tailored Demo
              </TrackedLink>
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

      {exampleLeadFlow.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Example lead flow"
            title={`How Envo handles leads for ${page.industryName.toLowerCase()}`}
            description="This is the practical sequence a customer would experience before your team gets a clean handoff."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {exampleLeadFlow.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-[#0B1024]/74 p-5">
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#D7E2F7]/62">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Missed lead problems"
          title={`Where ${page.industryName.toLowerCase()} usually lose leads`}
          description="SignalOpsAI starts by mapping the real moments where inquiries slow down, get answered vaguely, or never receive a clear follow-up."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.missedLeadProblems.map((problem) => (
            <Card key={problem.title} className="bg-[#0B1024]/74">
              <CardHeader>
                <CardTitle className="text-base">{problem.title}</CardTitle>
                <CardDescription>{problem.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#D8E2F7] bg-[#F8FAFF]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <SectionHeader
            eyebrow="Lead sources"
            title="Common places leads arrive"
            description="The system can start with the channels your business already uses, then expand once the first workflow is working."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {page.leadSources.map((source) => (
              <div key={source} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0B1024]/74 p-4 text-sm text-[#D7E2F7]/78">
                <PhoneCall className="size-4 shrink-0 text-[#A99BFF]" aria-hidden="true" />
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
          description="These are the practical points where a ready lead can stall even after someone replies once."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {page.followUpFailures.map((failure) => (
                <Card key={failure.title} className="bg-[#0B1024]/74">
              <CardHeader>
                <CardTitle className="text-base">{failure.title}</CardTitle>
                <CardDescription>{failure.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {intakeQuestions.length > 0 ? (
        <section className="border-y border-[#D8E2F7] bg-[#F8FAFF]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
            <SectionHeader
              eyebrow="Intake questions"
              title={`Questions Envo can ask for ${page.industryName.toLowerCase()}`}
              description="The questions should match the service, urgency, and team handoff required before quoting or booking."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {intakeQuestions.map((question) => (
                <div key={question} className="flex gap-3 rounded-xl border border-white/10 bg-[#0B1024]/74 p-4 text-sm leading-6 text-[#D7E2F7]/78">
                  <ListChecks className="mt-0.5 size-4 shrink-0 text-[#A99BFF]" aria-hidden="true" />
                  <span>{question}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-[#D8E2F7] bg-[#FBFAF7]">
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
              <Card key={example.scenario} className="bg-[#0B1024]/74">
                <CardHeader>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D7E8FF]">
                    {example.scenario}
                  </p>
                  <CardDescription className="text-base leading-7 text-[#D7E2F7]/78">
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
          eyebrow="Priority sorting"
          title="Example priority rules"
          description="Envo uses practical rules to decide who needs a callback, who needs more information, and who should be routed to your team."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {page.scoringRules.map((rule) => (
            <Card key={rule.title} className="bg-[#0B1024]/74">
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#328BFF]/14 text-[#D7E8FF]">
                  <SearchCheck className="size-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">{rule.title}</CardTitle>
                <CardDescription>{rule.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#D8E2F7] bg-[#F8FAFF]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Recommended automations"
            title={`Useful Envo automations for ${page.industryName.toLowerCase()}`}
            description="The first version should focus on the workflows that protect the most revenue with the least extra admin."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.automations.map((automation) => (
                <Card key={automation.title} className="bg-[#0B1024]/74">
                <CardHeader>
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#6F4DFF]/12 text-[#EAF1FF]">
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
            description="Envo gives owners a simple operating view of lead priority, response needs, and follow-up gaps."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dashboardValue.map((item) => (
              <Card key={item.title} className="bg-[#0B1024]/74">
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
            eyebrow="Next steps"
            title="Generate a tailored demo or preview Envo"
            description="Use the live demo generator for a quick industry-specific Envo preview, or send your lead sources, tools, package interest, and timeline to SignalOpsAI."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {page.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-white/10 bg-[#0B1024]/74 p-5 transition hover:border-[#8EBBFF]/35 hover:bg-[#152044]"
              >
                <p className="font-semibold text-white">{link.title}</p>
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
              Ask about the package that fits this industry.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D7E2F7]/78">
              Send your lead flow, current tools, and project goals so SignalOpsAI can scope a done-for-you Envo system.
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
    <Card className="bg-[#0B1024]/76">
      <CardHeader>
        <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#328BFF]/14 text-[#D7E8FF]">
          {icon}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D7E8FF]">{eyebrow}</p>
        <CardTitle className="text-xl">{scenario}</CardTitle>
        <CardDescription className="text-base leading-7 text-[#D7E2F7]/78">
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
      <Badge className="mb-4 border border-[#CBD8F2] bg-white/74 text-[#2563EB]">{eyebrow}</Badge>
      <h2 className="text-3xl font-black tracking-normal text-[#071126] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[#647084]">{description}</p>
    </div>
  );
}
