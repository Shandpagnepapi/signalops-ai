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
  title: PAGE_TITLE_TEMPLATES.terms,
  description: META_DESCRIPTION_TEMPLATES.terms,
  path: "/terms"
});

type LegalSection = {
  title: string;
  paragraphs: string[];
};

const termsSections: LegalSection[] = [
  {
    title: "Website Use",
    paragraphs: [
      "By using this website, you agree to use it for lawful business and informational purposes only.",
      "You agree not to misuse forms, attempt unauthorized access, or interfere with website operation."
    ]
  },
  {
    title: "No Guarantee of Specific Business Results",
    paragraphs: [
      "SignalOps provides systems, workflows, and recommendations designed to improve lead operations.",
      "SignalOps does not guarantee specific revenue, close rates, appointment volume, or other business outcomes."
    ]
  },
  {
    title: "AI Outputs May Require Human Review",
    paragraphs: [
      "SignalOps tools may generate summaries, scores, suggested replies, and routing recommendations.",
      "AI outputs can be incomplete or incorrect and should be reviewed by a human before important decisions are made."
    ]
  },
  {
    title: "Client Responsibility for Compliance",
    paragraphs: [
      "Clients remain responsible for legal, regulatory, industry, and advertising compliance in their market.",
      "This includes customer communications, consent requirements, privacy notices, and claims made to prospects."
    ]
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "SignalOps services and website content are provided as-is and as-available.",
      "This limitation of liability language should be finalized by legal counsel before launch."
    ]
  },
  {
    title: "Contact Information",
    paragraphs: [
      "For terms questions, contact SignalOps by email.",
      `Email: ${SITE_CONFIG.email}`
    ]
  }
];

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: PAGE_TITLE_TEMPLATES.terms,
            description: META_DESCRIPTION_TEMPLATES.terms,
            path: "/terms"
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE_TEMPLATES.terms, path: "/terms" }
          ])
        ])}
      />
      <header className="max-w-3xl">
        <Badge className="mb-4 bg-[#ff6f9c]/14 text-[#ffd7e6]">Terms</Badge>
        <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">SignalOps Terms of Use</h1>
        <CardDescription className="mt-4 text-base leading-7">
          These terms describe how this website and related demo materials may be used.
        </CardDescription>
        <p className="mt-4 text-sm text-[#ead0df]/62">Effective date: [Month DD, YYYY]</p>
      </header>

      <div className="mt-10 space-y-4">
        {termsSections.map((section) => (
          <Card key={section.title} className="bg-[#17122d]/72">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-[#ead0df]/78">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
