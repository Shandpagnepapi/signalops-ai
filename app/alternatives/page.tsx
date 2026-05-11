import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  GitBranch,
  MessageSquareReply,
  Route,
  SearchCheck,
  UserCheck
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { ALTERNATIVE_PAGE_IDS, ALTERNATIVE_PAGES } from "@/lib/alternative-pages";
import { PRIMARY_CTA } from "@/lib/constants";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  serviceOfferingJsonLd,
  webPageJsonLd
} from "@/lib/seo";

const metaTitle = "AI Lead Response Alternatives & Lead Management Options | SignalOps";
const metaDescription =
  "Compare AI lead response alternatives and lead management options. Learn what to look for in tools like LeadOps-style systems, LeadPilot-style automation, routing, priority sorting, and follow-up.";

export const metadata = createPageMetadata({
  title: metaTitle,
  description: metaDescription,
  path: "/alternatives",
  absoluteTitle: true
});

const featureCards = [
  {
    title: "Instant reply",
    description:
      "Respond to calls, texts, forms, DMs, emails, and quote requests while the prospect is still interested."
  },
  {
    title: "AI intake",
    description:
      "Ask practical questions, extract service need, identify urgency, and flag missing details."
  },
  {
    title: "Priority sorting",
    description:
      "Prioritize urgent, warm, quiet, and human-review leads with transparent routing logic."
  },
  {
    title: "Routing",
    description:
      "Send urgent, high-value, or specialized requests to the right owner, sales rep, front desk, or estimator."
  },
  {
    title: "CRM logging",
    description:
      "Log source, status, priority, tags, internal notes, recommended action, and follow-up needs."
  },
  {
    title: "Appointment booking",
    description:
      "Move ready leads toward a booking link or staff handoff when they are ready to schedule."
  },
  {
    title: "Follow-up",
    description:
      "Request missing photos, remind unbooked leads, follow up after quotes, and re-engage quiet prospects."
  },
  {
    title: "Human handoff",
    description:
      "Escalate unclear, urgent, sensitive, risky, or high-value leads instead of pretending automation should handle everything."
  }
];

const buyerCriteria = [
  {
    title: "Does it cover the channels you actually use?",
    description:
      "A useful AI lead response system should support the real mix: missed calls, forms, texts, DMs, quote requests, landing pages, ads, and email."
  },
  {
    title: "Does it improve the next step?",
    description:
      "Look for practical outputs: a reply, intake questions, priority, summary, owner alert, booking path, CRM log, and follow-up trigger."
  },
  {
    title: "Does it know when to involve a person?",
    description:
      "Good automation should route emergency, sensitive, high-value, or low-confidence leads to a human with context."
  }
];

const implementationCards = [
  {
    title: "Software-only",
    description:
      "Good when you already know your lead flow, have someone to configure the tool, and can maintain messages, rules, and integrations internally."
  },
  {
    title: "Done-for-you implementation",
    description:
      "Better when you need the intake questions, automations, routing rules, dashboard, alerts, and follow-up paths designed around your business."
  }
];

const fitSignals = [
  "You rely on calls, texts, forms, DMs, or quote requests and cannot answer everything instantly.",
  "You need practical implementation help, not just a tool subscription.",
  "Your team loses leads after the first reply, quote, photo request, or missed call.",
  "You want automation that keeps humans in control for urgent, unclear, or high-value situations."
];

const alternativeLinks = ALTERNATIVE_PAGE_IDS.map((id) => ALTERNATIVE_PAGES[id]);

export default function AlternativesHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: metaTitle,
            description: metaDescription,
            path: "/alternatives",
            absoluteTitle: true
          }),
          serviceOfferingJsonLd({
            name: "AI Lead Response Alternatives and Lead Management Options",
            description: metaDescription,
            path: "/alternatives",
            serviceType: "AI lead response and lead management comparison guidance"
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "AI Lead Response Alternatives", path: "/alternatives" }
          ])
        ])}
      />
      <div className="overflow-x-hidden">
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,111,156,0.28),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(255,179,109,0.18),transparent_32%),linear-gradient(180deg,#241331,#100818_88%)]" />
          <div className="surface-grid absolute inset-0 opacity-20" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <Badge variant="outline" className="mb-6 border-[#ffb36d]/30 bg-[#ffb36d]/10 text-[#ffe1bd]">
                AI lead response alternatives
              </Badge>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
                AI lead response alternatives and lead management options.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#f2d9e8] sm:text-lg">
                This hub is for businesses searching for tools like LeadOps-style systems,
                LeadPilot-style lead automation, lead routing platforms, priority tools, inbound
                management options, and quote intake automation. SignalOps is not affiliated with
                those brands.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href={PRIMARY_CTA.href}
                  eventName={ANALYTICS_EVENTS.auditCtaClicked}
                  eventProperties={{ location: "alternatives_hub_hero" }}
                  className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
                >
                  {PRIMARY_CTA.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </TrackedLink>
                <Link href="/how-it-works" className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full sm:w-auto`}>
                  See How SignalOps Works
                </Link>
              </div>
            </div>

            <div className="self-center rounded-2xl border border-white/10 bg-[#17122d]/82 p-5 shadow-2xl shadow-black/25 backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Comparison framework</p>
                  <p className="text-xs leading-5 text-[#ead0df]/42">Useful buying criteria without fake competitor claims</p>
                </div>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#ff6f9c]/15 text-[#ffd7e6]">
                  <GitBranch className="size-5" aria-hidden="true" />
                </div>
              </div>
              <div className="grid gap-3">
                {buyerCriteria.map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#ead0df]/62">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Plain English"
            title="What an AI lead response system does"
            description="An AI lead response system is the operating layer between a new inquiry and the next human action. It should answer quickly, collect the right details, sort the lead, route the opportunity, and keep follow-up from falling through the cracks."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <Card key={feature.title} className="bg-[#17122d]/74">
                  <CardHeader>
                    <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#ff6f9c]/14 text-[#ffd7e6]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#17122d]/65">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Buying options"
              title="Software-only vs done-for-you implementation"
              description="The right choice depends on whether your team wants to configure the workflow internally or wants a partner to map and install the lead response system."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {implementationCards.map((card) => (
                <Card key={card.title} className="bg-white/[0.035]">
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription className="text-base leading-7 text-[#ead0df]/78">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <SectionHeader
            eyebrow="When SignalOps fits"
            title="Choose SignalOps when you need the system installed around your actual lead flow"
            description="SignalOps is positioned for businesses that want response, intake, routing, booking, and follow-up installed as a practical lead operations system."
          />
          <div className="grid gap-3">
            {fitSignals.map((signal) => (
              <div key={signal} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-[#ead0df]/78">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[linear-gradient(180deg,#160d22,#100818)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Alternative guides"
              title="AI lead response alternative pages"
              description="These pages are written for businesses comparing options. They avoid affiliation claims and focus on the underlying workflow each search intent suggests."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {alternativeLinks.map((page) => (
                <Link
                  key={page.id}
                  href={page.path}
                  className="rounded-2xl border border-white/10 bg-[#17122d]/76 p-5 transition hover:border-[#ff9ec0]/35 hover:bg-[#ff6f9c]/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd7e6]">
                    {page.targetName}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{page.metaTitle}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#ead0df]/62">{page.comparisonAngle}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#ffe1bd]">
                    Read guide
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.74fr_1.26fr] lg:px-8">
          <SectionHeader
            eyebrow="Related pages"
            title="Compare the system before choosing a tool"
            description="A strong lead response setup usually connects alternatives research with service workflows, industry fit, ROI, and a clear check of your current process."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedPages.map((link) => (
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

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl border border-[#ff9ec0]/20 bg-[#ff6f9c]/10 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#ffd7e6]">
                Start a SignalOps project
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal text-white">
                Compare tools, then ask about the build that fits.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#ead0df]/78">
                SignalOps will review calls, texts, forms, DMs, quote requests, routing, and
                follow-up, then show what kind of lead response system would actually help.
              </p>
            </div>
            <TrackedLink
              href={PRIMARY_CTA.href}
              eventName={ANALYTICS_EVENTS.auditCtaClicked}
              eventProperties={{ location: "alternatives_hub_final_cta" }}
              className={buttonVariants({ size: "lg" })}
            >
              {PRIMARY_CTA.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </section>
      </div>
    </>
  );
}

const featureIcons = [
  MessageSquareReply,
  SearchCheck,
  ClipboardList,
  Route,
  GitBranch,
  UserCheck
];

const relatedPages = [
  {
    href: "/services/ai-lead-response",
    label: "AI lead response system",
    description: "See the core SignalOps response workflow for local businesses."
  },
  {
    href: "/services/ai-lead-qualification",
    label: "AI lead intake",
    description: "Learn how leads are summarized, prioritized, and routed."
  },
  {
    href: "/services/quote-intake-automation",
    label: "Quote intake automation",
    description: "Explore quote request workflows for auto, repair, contractor, and local services."
  },
  {
    href: "/roi-calculator",
    label: "ROI calculator",
    description: "Estimate the possible impact of faster response and follow-up."
  }
];

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
