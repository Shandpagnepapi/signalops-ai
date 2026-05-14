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
import { EnvoFeaturePanel } from "@/components/site/envo/envo-brand-system";
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
  "Compare AI lead response alternatives with Envo, the AI Lead Manager from SignalOpsAI for customer calls, texts, forms, DMs, follow-up, and handoffs.";

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
      "Sort priority, routine, quiet, and staff-handoff leads with transparent routing logic."
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
    title: "Team handoff",
    description:
      "Escalate unclear, urgent, sensitive, risky, or high-value leads instead of pretending automation should handle everything."
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
  "You want automation that keeps your team in control for urgent, unclear, or high-value situations."
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
      <div className="overflow-x-hidden bg-[#FBFAF7] text-[#071126]">
        <section className="relative isolate overflow-hidden border-b border-[#D8E2F7] bg-[#FBFAF7]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(50,139,255,0.18),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(111,77,255,0.12),transparent_32%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <div className="order-2 flex flex-col justify-center lg:order-1">
              <Badge variant="outline" className="mb-6 w-fit border-[#CBD8F2] bg-white/74 text-[#2563EB]">
                AI lead response alternatives
              </Badge>
              <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal text-[#071126] sm:text-5xl lg:text-6xl">
                AI lead response alternatives and lead management options.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#647084] sm:text-lg">
                This hub is for businesses comparing tools like LeadOps-style systems,
                LeadPilot-style automation, lead routing platforms, priority tools, inbound
                management options, and quote intake automation. SignalOpsAI is not affiliated with
                those brands; Envo is its own AI Lead Manager product.
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
                <Link href="/how-it-works" className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-[#CBD8F2] bg-white/72 text-[#071126] hover:bg-white sm:w-auto`}>
                  See How Envo Works
                </Link>
              </div>
            </div>

            <EnvoFeaturePanel className="order-1 self-center lg:order-2" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Plain English"
            title="What an AI lead response system does"
            description="An AI lead response system is the operating layer between a new inquiry and the next team action. It should answer quickly, collect the right details, sort the lead, route the opportunity, and keep follow-up from falling through the cracks."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <Card key={feature.title} className="bg-[#0B1024]/74">
                  <CardHeader>
                    <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#328BFF]/14 text-[#D7E8FF]">
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

        <section className="border-y border-[#D8E2F7] bg-[#F8FAFF]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Buying options"
              title="Software-only vs done-for-you implementation"
              description="The right choice depends on whether your team wants to configure the workflow internally or wants a partner to map and install the lead response system."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {implementationCards.map((card) => (
                <Card key={card.title} className="bg-[#0B1024]/74">
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription className="text-base leading-7 text-[#D7E2F7]/78">
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
            title="Choose Envo when you need the system installed around your actual lead flow"
            description="Envo is positioned for businesses that want response, intake, routing, booking, and follow-up installed as a practical AI Lead Manager."
          />
          <div className="grid gap-3">
            {fitSignals.map((signal) => (
              <div key={signal} className="flex gap-3 rounded-xl border border-white/10 bg-[#0B1024]/74 p-4 text-sm leading-6 text-[#D7E2F7]/78">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#D8E2F7] bg-[#FBFAF7]">
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
                  className="rounded-2xl border border-white/10 bg-[#0B1024]/76 p-5 transition hover:border-[#8EBBFF]/35 hover:bg-[#328BFF]/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D7E8FF]">
                    {page.targetName}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{page.metaTitle}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#D7E2F7]/62">{page.comparisonAngle}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#EAF1FF]">
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
                className="rounded-2xl border border-white/10 bg-[#0B1024]/74 p-5 transition hover:border-[#8EBBFF]/35 hover:bg-[#152044]"
              >
                <p className="font-semibold text-white">{link.label}</p>
                <p className="mt-2 text-sm leading-6 text-[#D7E2F7]/62">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[1.5rem] border border-white/12 bg-[#071126] p-6 shadow-[0_24px_80px_rgba(7,17,38,0.18)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#D7E8FF]">
                Preview Envo
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal text-white">
                Compare tools, then ask about the build that fits.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D7E2F7]/78">
                SignalOpsAI will review calls, texts, forms, DMs, quote requests, routing, and
                follow-up, then show how Envo could help without removing owner control.
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
    description: "See the core Envo response workflow for local businesses."
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
      <Badge className="mb-4 border border-[#CBD8F2] bg-white/74 text-[#2563EB]">{eyebrow}</Badge>
      <h2 className="text-3xl font-black tracking-normal text-[#071126] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[#647084]">{description}</p>
    </div>
  );
}
