import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Mail,
  Route,
  Sparkles,
  Workflow
} from "lucide-react";
import { LeadLeakAuditForm } from "@/components/forms/lead-leak-audit-form";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { EMAIL_CTA, getEmailHref, SECONDARY_CTA, SITE_CONFIG } from "@/lib/constants";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  jsonLdScript,
  META_DESCRIPTION_TEMPLATES,
  OG_IMAGE_ASSETS,
  PAGE_TITLE_TEMPLATES,
  serviceJsonLd,
  webPageJsonLd
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: PAGE_TITLE_TEMPLATES.audit,
  description: META_DESCRIPTION_TEMPLATES.audit,
  path: "/audit",
  image: OG_IMAGE_ASSETS.audit.path,
  imageAlt: OG_IMAGE_ASSETS.audit.alt
});

const scopeItems = [
  "How leads currently arrive",
  "Which package looks closest",
  "Current tools and handoffs",
  "Biggest follow-up gaps",
  "Timeline and build priorities",
  "Best way to contact you"
];

const buildSteps = [
  {
    title: "You share the lead flow",
    description: "Calls, forms, texts, DMs, ads, referrals, tools, pain points, and package interest.",
    icon: ClipboardList
  },
  {
    title: "SignalOps scopes the system",
    description: "We map the response, intake, follow-up, routing, logging, and handoff work.",
    icon: Workflow
  },
  {
    title: "We build and launch",
    description: "Your lead engine gets installed around the way your business already operates.",
    icon: Route
  }
];

const faqs = [
  {
    question: "What happens after I send project details?",
    answer:
      "SignalOps reviews your lead flow, package interest, tools, and timeline, then replies with the best next step for scoping the build."
  },
  {
    question: "Do I need to know which package I want?",
    answer:
      "No. Choose Not sure if you want help deciding. The questionnaire gives enough context to recommend Starter, Growth, or Custom."
  },
  {
    question: "Do I need a CRM?",
    answer:
      "No. SignalOps can start with calls, texts, forms, DMs, email, spreadsheets, and calendars, then connect a CRM later if it makes sense."
  },
  {
    question: "Can I just email instead?",
    answer:
      `Yes. Send your business name, website, lead problem, and package interest to ${SITE_CONFIG.email}.`
  },
  {
    question: "Will SignalOps send messages without approval?",
    answer:
      "No. Customer-facing messages and email drafts should be reviewed before anything goes live unless you explicitly approve otherwise."
  }
];

export default function AuditPage() {
  return (
    <div className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: PAGE_TITLE_TEMPLATES.audit,
            description: META_DESCRIPTION_TEMPLATES.audit,
            path: "/audit"
          }),
          serviceJsonLd(),
          faqPageJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE_TEMPLATES.audit, path: "/audit" }
          ])
        ])}
      />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="surface-grid absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,111,156,0.2),transparent_34%),linear-gradient(180deg,rgba(6,12,24,0.56),#100818_92%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="flex min-w-0 flex-col justify-center">
            <Badge className="mb-6 w-fit bg-[#ff6f9c]/14 text-[#ffd7e6]">Project intake</Badge>
            <h1 className="max-w-xs text-4xl font-semibold leading-tight tracking-normal text-white sm:max-w-3xl sm:text-6xl">
              Start your SignalOps project.
            </h1>
            <p className="mt-6 max-w-xs text-base leading-8 text-[#ead0df]/78 sm:max-w-2xl sm:text-lg">
              Tell us how leads come in, which package you are considering, and what you need built. We will review the details and reply with the best next step.
            </p>
            <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row">
              <TrackedLink
                href="#audit-form"
                eventName={ANALYTICS_EVENTS.auditCtaClicked}
                eventProperties={{ location: "project_hero" }}
                className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
              >
                Send Project Details
                <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={getEmailHref()}
                eventName={ANALYTICS_EVENTS.contactClicked}
                eventProperties={{ location: "project_hero", type: "email" }}
                className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-white/18 bg-white/[0.045] sm:w-auto`}
              >
                <Mail className="size-4" aria-hidden="true" />
                {EMAIL_CTA.label}
              </TrackedLink>
              <TrackedLink
                href={SECONDARY_CTA.href}
                eventName={ANALYTICS_EVENTS.demoViewed}
                eventProperties={{ location: "project_hero_demo_click" }}
                className={`${buttonVariants({ variant: "secondary", size: "lg" })} w-full sm:w-auto`}
              >
                {SECONDARY_CTA.label}
              </TrackedLink>
            </div>
            <div className="mt-6 grid max-w-2xl gap-3 text-sm text-[#ead0df]/78 sm:grid-cols-3">
              {["Starter, Growth, or Custom", "Done-for-you build", "Draft-first messaging"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-[#17122d]/82 p-5 shadow-2xl shadow-black/25 sm:max-w-none">
            <p className="text-sm font-semibold text-white">{SITE_CONFIG.name} project snapshot</p>
            <p className="mt-1 text-sm text-[#ead0df]/42">What we need to scope your lead engine</p>
            <div className="mt-5 grid gap-3">
              {scopeItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4">
                  <Sparkles className="size-4 shrink-0 text-[#ffb36d]" aria-hidden="true" />
                  <p className="text-sm font-medium text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <SectionIntro
          eyebrow="Package-first"
          title="Choose the level of system you need today."
          description="The questionnaire is built to help SignalOps understand whether Starter, Growth, or a Custom is the right fit before we talk build details."
        />
        <div className="grid w-full max-w-xs gap-3 sm:max-w-none sm:grid-cols-3">
          {[
            ["Starter", "One lead source and faster first response."],
            ["Growth", "Multiple sources, follow-up, logging, and visibility."],
            ["Custom", "Advanced workflows, routing, dashboards, and integrations."]
          ].map(([title, description]) => (
            <Card key={title} className="bg-[#17122d]/76">
              <CardHeader>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#17122d]/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Build path"
            title="A simpler way to get from messy lead flow to installed system."
            description="SignalOps is a done-for-you build service. The goal is to understand your workflow, design the right system, and install it without making your team manage another complicated tool."
          />
          <div className="mt-8 grid w-full max-w-xs gap-4 sm:max-w-none lg:grid-cols-3">
            {buildSteps.map((step) => {
              const Icon = step.icon;

              return (
                <Card key={step.title} className="bg-[#17122d]/76">
                  <CardHeader>
                    <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-[#ff6f9c]/15 text-[#ffc0d5]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-base">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <div>
          <SectionIntro
            eyebrow="Start a project"
            title="Send the details SignalOps needs to scope the build."
            description="This is short enough to finish quickly, but specific enough to understand your package interest, lead sources, tools, pain points, and timeline."
          />
          <div className="mt-6 w-full max-w-xs rounded-2xl border border-[#ff9ec0]/20 bg-[#ff6f9c]/10 p-5 sm:max-w-none">
            <p className="text-sm font-semibold text-white">Prefer email?</p>
            <p className="mt-2 text-sm leading-6 text-[#ead0df]/78">
              Send the same project details directly to {SITE_CONFIG.email}. The form and email path both land in the same review process.
            </p>
            <TrackedLink
              href={getEmailHref()}
              eventName={ANALYTICS_EVENTS.contactClicked}
              eventProperties={{ location: "project_form_side_card", type: "email" }}
              className={`${buttonVariants({ variant: "outline" })} mt-4 w-full border-white/18 bg-white/[0.045]`}
            >
              <Mail className="size-4" aria-hidden="true" />
              {EMAIL_CTA.label}
            </TrackedLink>
          </div>
        </div>
        <div className="w-full max-w-xs sm:max-w-none">
          <LeadLeakAuditForm />
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#17122d]/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionIntro
            eyebrow="FAQ"
            title="What to know before you start."
            description="The project intake is designed for busy operators who want a practical build plan, not another generic AI pitch."
          />
          <div className="grid w-full max-w-xs gap-3 sm:max-w-none">
            {faqs.map((faq) => (
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

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-xs flex-col gap-6 rounded-2xl border border-[#ff9ec0]/20 bg-[#ff6f9c]/10 p-6 sm:max-w-7xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#ffd7e6]">Contact SignalOps</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-white">
              Ready to scope your lead engine?
            </h2>
          </div>
          <TrackedLink
            href="#audit-form"
            eventName={ANALYTICS_EVENTS.auditCtaClicked}
            eventProperties={{ location: "project_final_cta" }}
            className={buttonVariants({ size: "lg" })}
          >
            Send Project Details
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
          <TrackedLink
            href={getEmailHref()}
            eventName={ANALYTICS_EVENTS.contactClicked}
            eventProperties={{ location: "project_final_cta", type: "email" }}
            className={`${buttonVariants({ variant: "outline", size: "lg" })} border-white/18 bg-white/[0.045]`}
          >
            <Mail className="size-4" aria-hidden="true" />
            {EMAIL_CTA.label}
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="w-full max-w-xs sm:max-w-3xl">
      <Badge className="mb-4 bg-[#ff6f9c]/14 text-[#ffd7e6]">{eyebrow}</Badge>
      <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">{title}</h2>
      <CardDescription className="mt-4 text-base leading-7">{description}</CardDescription>
    </div>
  );
}
