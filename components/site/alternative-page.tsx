import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  MessageSquareReply,
  Route,
  SearchCheck,
  XCircle
} from "lucide-react";
import { EnvoFeaturePanel } from "@/components/site/envo/envo-brand-system";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import type { AlternativePageConfig } from "@/lib/alternative-pages";
import { PRIMARY_CTA } from "@/lib/constants";

export function AlternativePage({ page }: { page: AlternativePageConfig }) {
  return (
    <div className="overflow-x-hidden bg-[#FBFAF7] text-[#071126]">
      <section className="relative isolate overflow-hidden border-b border-[#D8E2F7] bg-[#FBFAF7]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(50,139,255,0.18),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(111,77,255,0.12),transparent_32%)]" />
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
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <div className="flex gap-3">
                <AlertTriangle className="mt-1 size-4 shrink-0 text-amber-200" aria-hidden="true" />
                <p>
                  <strong className="font-semibold text-amber-950">Disclaimer:</strong>{" "}
                  SignalOpsAI is not affiliated with {page.targetName}. This page is for businesses
                  comparing AI lead response and lead management options.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={PRIMARY_CTA.href}
                eventName={ANALYTICS_EVENTS.auditCtaClicked}
                eventProperties={{ location: `${page.id}_alternative_hero` }}
                className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
              >
                {PRIMARY_CTA.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href="/demo"
                eventName={ANALYTICS_EVENTS.demoViewed}
                eventProperties={{ location: `${page.id}_alternative_hero_demo` }}
                className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-[#CBD8F2] bg-white/72 text-[#071126] hover:bg-white sm:w-auto`}
              >
                View Client Demo
              </TrackedLink>
            </div>
          </div>

          <EnvoFeaturePanel className="self-center" />
        </div>
      </section>

      <SectionWithCards
        eyebrow="Who this is for"
        title={`Who should compare ${page.targetName}-style options`}
        description="These pages are meant for buyers doing real research, not for brand confusion or impersonation."
        cards={page.whoFor}
      />

      <section className="border-y border-[#D8E2F7] bg-[#F8FAFF]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Buying criteria"
            title="What to look for in an AI lead response system"
            description="The right tool or partner should make response faster, handoffs cleaner, and follow-up more consistent without making unsupported promises."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {page.lookFor.map((card, index) => {
              const Icon = criteriaIcons[index % criteriaIcons.length];
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

      <SectionWithCards
        eyebrow="Envo approach"
        title="How Envo helps"
        description="Envo is built around implementation: mapping your lead flow, creating practical response logic, and connecting the next-step workflow."
        cards={page.howSignalOpsHelps}
      />

      <section className="border-y border-[#D8E2F7] bg-[#FBFAF7]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Example workflow"
            title="A simple lead response flow"
            description="The exact setup changes by industry, but the operating pattern should stay clear: capture, sort, route, follow up, and track."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
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
      </section>

      <SectionWithCards
        eyebrow="Use cases"
        title={`Common ${page.targetPhrase} use cases`}
        description="These are practical lead operations workflows that small and local businesses can use without turning the website into a generic chatbot."
        cards={page.useCases}
      />

      <section className="border-y border-[#D8E2F7] bg-[#F8FAFF]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FitPanel
            title="When Envo is a good fit"
            icon={<CheckCircle2 className="size-5" aria-hidden="true" />}
            items={page.goodFit}
            tone="good"
          />
          <FitPanel
            title="When Envo is not a good fit"
            icon={<XCircle className="size-5" aria-hidden="true" />}
            items={page.notFit}
            tone="caution"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions to ask before choosing an alternative"
          description="Straight answers without pretending SignalOpsAI is connected to another brand or making claims we cannot verify."
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

      <section className="border-y border-[#D8E2F7] bg-[#F8FAF7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.74fr_1.26fr] lg:px-8">
          <SectionHeader
            eyebrow="Internal links"
            title="Keep comparing the Envo system"
            description="These pages show how the lead response workflow works, what the demo looks like, and how much missed follow-up may be costing you."
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
              Compare options, then ask about the right build.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D7E2F7]/78">
              SignalOpsAI will review how your business handles calls, texts, forms, DMs,
              quote requests, and follow-ups, then show where Envo could improve response and routing.
            </p>
          </div>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.auditCtaClicked}
            eventProperties={{ location: `${page.id}_alternative_final_cta` }}
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

const criteriaIcons = [SearchCheck, MessageSquareReply, Route, ClipboardCheck];

function SectionWithCards({
  eyebrow,
  title,
  description,
  cards
}: {
  eyebrow: string;
  title: string;
  description: string;
  cards: { title: string; description: string }[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title} className="bg-[#0B1024]/74">
            <CardHeader>
              <CardTitle className="text-base">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FitPanel({
  title,
  icon,
  items,
  tone
}: {
  title: string;
  icon: ReactNode;
  items: string[];
  tone: "good" | "caution";
}) {
  const iconClass = tone === "good" ? "bg-emerald-400/12 text-emerald-200" : "bg-amber-300/12 text-amber-200";

  return (
    <Card className="bg-[#0B1024]/76">
      <CardHeader>
        <div className={`mb-3 flex size-10 items-center justify-center rounded-xl ${iconClass}`}>
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <ul className="mt-2 grid gap-3 text-sm leading-6 text-[#D7E2F7]/78">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#BFD3FF]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
