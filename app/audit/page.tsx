import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  DatabaseZap,
  FileText,
  PhoneCall,
  Route,
  SearchCheck,
  Workflow
} from "lucide-react";
import { LeadLeakAuditForm } from "@/components/forms/lead-leak-audit-form";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA, SECONDARY_CTA, SITE_CONFIG } from "@/lib/constants";
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

const whoItIsFor = [
  "Local service businesses",
  "Businesses running ads",
  "Businesses getting website inquiries",
  "Businesses running mostly through calls and texts",
  "Businesses with slow follow-up",
  "Businesses unsure which leads are worth chasing"
];

const auditChecks = [
  "Lead source tracking",
  "Response time",
  "Missed calls",
  "Form follow-up",
  "CRM usage",
  "Appointment booking flow",
  "Follow-up sequences",
  "Sales handoff",
  "Lost lead recovery"
];

const checkIcons = [
  SearchCheck,
  Clock3,
  PhoneCall,
  FileText,
  DatabaseZap,
  Route,
  Workflow,
  BellRing,
  ClipboardCheck
];

const faqs = [
  {
    question: "What happens after I submit the audit request?",
    answer:
      "SignalOps reviews your answers, looks for the biggest response and follow-up gaps, then follows up with recommended fixes and a practical next step."
  },
  {
    question: "Do I need to prepare anything first?",
    answer:
      "No. A website, basic lead source notes, and a rough monthly lead count are enough to start. More detail helps, but the form is designed to be lightweight."
  },
  {
    question: "Is the audit really free?",
    answer:
      "Yes. The Free Lead Leak Audit is a focused diagnostic. If there is a fit, SignalOps can scope a simple response and follow-up system afterward."
  },
  {
    question: "Can you review missed calls and quote requests?",
    answer:
      "Yes. Missed calls, website forms, quote requests, photo-based requests, DMs, and slow follow-up are exactly what this audit is built to surface."
  },
  {
    question: "Will this work if I do not have a CRM?",
    answer:
      "No CRM? No problem. SignalOps can start with the way you already work - calls, texts, forms, and DMs - then build a simple AI-assisted follow-up system around it."
  },
  {
    question: "What if AI is unsure about a lead?",
    answer:
      "The recommended system should route uncertain, high-value, or risky cases to a human with context instead of forcing a bad automated answer."
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,24,0.56),#060c18_92%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="flex min-w-0 flex-col justify-center">
            <Badge className="mb-6 w-fit bg-blue-500/14 text-blue-100">{PRIMARY_CTA.label}</Badge>
            <h1 className="max-w-xs text-4xl font-semibold leading-tight tracking-normal text-white sm:max-w-3xl sm:text-6xl">
              Find missed leads before they turn into lost opportunities.
            </h1>
            <p className="mt-6 max-w-xs text-base leading-8 text-slate-300 sm:max-w-2xl sm:text-lg">
              We will review how your business handles calls, texts, forms, DMs,
              and follow-ups - then show you where leads are getting missed,
              delayed, or forgotten.
            </p>
            <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row">
              <TrackedLink
                href="#audit-form"
                eventName={ANALYTICS_EVENTS.auditCtaClicked}
                eventProperties={{ location: "audit_hero" }}
                className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
              >
                Start free audit
                <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={SECONDARY_CTA.href}
                eventName={ANALYTICS_EVENTS.demoViewed}
                eventProperties={{ location: "audit_hero_demo_click" }}
                className={`${buttonVariants({ variant: "secondary", size: "lg" })} w-full sm:w-auto`}
              >
                {SECONDARY_CTA.label}
              </TrackedLink>
            </div>
            <div className="mt-6 grid max-w-2xl gap-3 text-sm text-slate-300 sm:grid-cols-3">
              {["No CRM required", "Built for local service teams", "Focused on booked appointments"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-xs rounded-lg border border-white/10 bg-slate-950/82 p-5 shadow-2xl shadow-black/25 sm:max-w-none">
            <p className="text-sm font-semibold text-white">{SITE_CONFIG.name} missed lead snapshot</p>
            <p className="mt-1 text-sm text-slate-500">What we look for before adding follow-up help</p>
            <div className="mt-5 grid gap-3">
              {[
                ["Lead arrives", "Where did it come from and was the source tracked?"],
                ["Response starts", "Did the customer get useful contact within minutes?"],
                ["Lead qualifies", "Was the right next question asked before the lead went cold?"],
                ["Booking happens", "Was a clear appointment or follow-up path offered?"]
              ].map(([title, description]) => (
                <div key={title} className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <p className="font-medium text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <SectionIntro
          eyebrow="Who it is for"
          title="Built for operators who already get leads but know too many are missed, delayed, or forgotten."
          description="If your team is answering calls, texting customers, checking forms, replying to DMs, or sorting quote requests manually, the audit shows what should be tightened first."
        />
        <div className="grid w-full max-w-xs gap-3 sm:max-w-none sm:grid-cols-2">
          {whoItIsFor.map((item) => (
            <Card key={item} className="bg-slate-950/76">
              <CardHeader className="flex-row items-center gap-3 space-y-0">
                <CheckCircle2 className="size-5 shrink-0 text-emerald-300" aria-hidden="true" />
                <CardTitle className="text-base">{item}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="What the audit reviews"
            title="Missed leads usually hide between first contact and follow-up."
            description="The audit reviews the practical details that turn an interested prospect into a booked appointment or a forgotten lead."
          />
          <div className="mt-8 grid w-full max-w-xs gap-4 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
            {auditChecks.map((check, index) => {
              const Icon = checkIcons[index] ?? ClipboardCheck;
              return (
                <Card key={check} className="bg-slate-950/76">
                  <CardHeader>
                    <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-blue-500/15 text-blue-200">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-base">{check}</CardTitle>
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
            eyebrow="Audit form"
            title="Share the basics and get a preview of where leads may be missed."
            description="Give SignalOps enough context to identify where calls, texts, forms, DMs, and follow-ups are most likely costing you booked appointments."
          />
          <div className="mt-6 w-full max-w-xs rounded-lg border border-blue-300/20 bg-blue-500/10 p-5 sm:max-w-none">
            <p className="text-sm font-semibold text-white">What you get back</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              {[
                "A plain-English snapshot of your biggest lead flow risks",
                "Recommended fixes for response, routing, and follow-up",
                "A next-step note for a focused Lead Leak Audit call"
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-emerald-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full max-w-xs sm:max-w-none">
          <LeadLeakAuditForm />
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionIntro
            eyebrow="FAQ"
            title="A simple diagnostic before you commit to new systems."
            description="The audit is designed to be clear, practical, and useful for a busy owner or operator."
          />
          <div className="grid w-full max-w-xs gap-3 sm:max-w-none">
            {faqs.map((faq) => (
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
        <div className="mx-auto flex w-full max-w-xs flex-col gap-6 rounded-lg border border-blue-300/20 bg-blue-500/10 p-6 sm:max-w-7xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-100">Next step</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-white">
              See where leads are being missed.
            </h2>
          </div>
          <TrackedLink
            href="#audit-form"
            eventName={ANALYTICS_EVENTS.auditCtaClicked}
            eventProperties={{ location: "audit_final_cta" }}
            className={buttonVariants({ size: "lg" })}
          >
            Start free audit
            <ArrowRight className="size-4" aria-hidden="true" />
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
      <Badge className="mb-4 bg-blue-500/14 text-blue-100">{eyebrow}</Badge>
      <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">{title}</h2>
      <CardDescription className="mt-4 text-base leading-7">{description}</CardDescription>
    </div>
  );
}
