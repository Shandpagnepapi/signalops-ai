import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/constants";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  META_DESCRIPTION_TEMPLATES,
  PAGE_TITLE_TEMPLATES,
  webPageJsonLd
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: PAGE_TITLE_TEMPLATES.privacy,
  description: META_DESCRIPTION_TEMPLATES.privacy,
  path: "/privacy"
});

type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const privacySections: LegalSection[] = [
  {
    title: "Information We May Collect",
    paragraphs: [
      "SignalOps may collect information you choose to submit through this website.",
      "This can include contact details, business details, and notes about your lead process or service needs."
    ],
    bullets: [
      "Name, email address, and phone number",
      "Business name, website, and industry",
      "Details submitted through audit or lead forms",
      "Basic website usage data from analytics tools"
    ]
  },
  {
    title: "Lead Form Submissions",
    paragraphs: [
      "When you submit a form, SignalOps may use that information to review your request, respond, and follow up about relevant services.",
      "If you share lead workflow details, we use that information to prepare recommendations and qualification previews."
    ]
  },
  {
    title: "Analytics and Cookies",
    paragraphs: [
      "SignalOps may use analytics tools to understand website performance and conversion activity.",
      "These tools may use cookies or similar technologies to measure traffic, page views, and key actions."
    ]
  },
  {
    title: "Third-Party Tools",
    paragraphs: [
      "SignalOps may use trusted third-party providers for hosting, analytics, forms, communications, CRM integrations, and scheduling.",
      "Those providers process data under their own terms and privacy policies."
    ]
  },
  {
    title: "No Sale of Personal Information",
    paragraphs: [
      "SignalOps does not sell personal information to third parties."
    ]
  },
  {
    title: "How To Contact SignalOps",
    paragraphs: [
      "For privacy questions or data requests, contact SignalOps by email.",
      `Email: ${SITE_CONFIG.email}`
    ]
  }
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: PAGE_TITLE_TEMPLATES.privacy,
            description: META_DESCRIPTION_TEMPLATES.privacy,
            path: "/privacy"
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE_TEMPLATES.privacy, path: "/privacy" }
          ])
        ])}
      />
      <header className="max-w-3xl">
        <Badge className="mb-4 bg-[#ff6f9c]/14 text-[#ffd7e6]">Privacy</Badge>
        <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">SignalOps Privacy Policy</h1>
        <CardDescription className="mt-4 text-base leading-7">
          This page explains how SignalOps may collect and use information from website visitors and form submissions.
        </CardDescription>
        <p className="mt-4 text-sm text-slate-400">Effective date: [Month DD, YYYY]</p>
      </header>

      <div className="mt-10 space-y-4">
        {privacySections.map((section) => (
          <Card key={section.title} className="bg-slate-950/72">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-slate-300">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
