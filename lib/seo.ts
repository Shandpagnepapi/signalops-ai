import type { Metadata } from "next";
import { CONTACT_PLACEHOLDER, PACKAGE_NAMES, SITE_CONFIG } from "@/lib/constants";

export type SeoFaq = {
  question: string;
  answer: string;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

type JsonLdObject = Record<string, unknown>;

export const SEO_DEFAULT_IMAGE = "/brand/leadops-og.svg";

export const PAGE_TITLE_TEMPLATES = {
  home: "AI Lead Response & Qualification Systems",
  audit: "Free Missed Lead Checkup",
  demo: "Client Demo: AI Lead Intake Examples",
  dashboard: "Demo Lead Operations Dashboard",
  howItWorks: "How the LeadOps AI Lead Engine Works",
  liveDemo: "Live AI Demo Generator",
  roi: "Lead Response ROI Calculator",
  privacy: "Privacy Policy",
  terms: "Terms of Use"
} as const;

export const META_DESCRIPTION_TEMPLATES = {
  home:
    "LeadOps helps service businesses answer every lead, qualify prospects, follow up consistently, and turn more inquiries into booked appointments.",
  audit:
    "Get a free LeadOps checkup of how your business handles calls, texts, forms, DMs, and follow-ups.",
  demo:
    "Explore tailored LeadOps client demos for Apex Wheel Repair and ClearFlow Well & Water Services with AI-powered intake, scoring, routing, and follow-up.",
  dashboard:
    "A public demo of the LeadOps lead operations dashboard for AI-qualified service business leads.",
  howItWorks:
    "See how LeadOps captures leads, responds instantly, qualifies prospects, routes hot opportunities, books appointments, and updates the dashboard.",
  liveDemo:
    "Generate a tailored LeadOps lead response, qualification, routing, follow-up, and dashboard preview for a prospect in real time.",
  roi:
    "Estimate potential revenue impact from improving lead response speed, qualification, and follow-up.",
  privacy:
    "How LeadOps collects, uses, and protects information submitted through the website and lead forms.",
  terms:
    "Terms governing use of the LeadOps website, demos, and service information."
} as const;

export function getSiteUrl() {
  return SITE_CONFIG.url.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function formatPageTitle(title: string) {
  return `${title} | ${SITE_CONFIG.name}`;
}

export function createCanonical(path: string) {
  return absoluteUrl(path);
}

export function createPageMetadata({
  title,
  description,
  path,
  image = SEO_DEFAULT_IMAGE,
  imageAlt = "LeadOps AI lead operations studio",
  type = "website",
  noIndex = false
}: PageMetadataOptions): Metadata {
  const canonical = createCanonical(path);
  const imageUrl = absoluteUrl(image);
  const robots = noIndex
    ? {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false
        }
      }
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title: formatPageTitle(title),
      description,
      url: canonical,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt
        }
      ],
      locale: "en_US",
      type
    },
    twitter: {
      card: "summary_large_image",
      title: formatPageTitle(title),
      description,
      images: [imageUrl]
    },
    robots
  };
}

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: formatPageTitle(PAGE_TITLE_TEMPLATES.home),
      template: `%s | ${SITE_CONFIG.name}`
    },
    description: META_DESCRIPTION_TEMPLATES.home,
    openGraph: {
      title: formatPageTitle(PAGE_TITLE_TEMPLATES.home),
      description: META_DESCRIPTION_TEMPLATES.home,
      url: getSiteUrl(),
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: absoluteUrl(SEO_DEFAULT_IMAGE),
          width: 1200,
          height: 630,
          alt: "LeadOps AI lead operations studio"
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: formatPageTitle(PAGE_TITLE_TEMPLATES.home),
      description: META_DESCRIPTION_TEMPLATES.home,
      images: [absoluteUrl(SEO_DEFAULT_IMAGE)]
    }
  };
}

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE_CONFIG.name,
    url: getSiteUrl(),
    logo: absoluteUrl("/brand/leadops-logo-horizontal.svg"),
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE_CONFIG.email,
        telephone: CONTACT_PLACEHOLDER.phone,
        areaServed: "US",
        availableLanguage: "English"
      }
    ]
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE_CONFIG.name,
    url: getSiteUrl(),
    description: SITE_CONFIG.description,
    publisher: {
      "@id": absoluteUrl("/#organization")
    },
    inLanguage: "en-US"
  };
}

export function serviceJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl("/#ai-lead-response-qualification-system"),
    name: "AI Lead Response & Qualification System",
    serviceType: "AI lead response, qualification, routing, follow-up, and appointment booking",
    url: absoluteUrl("/audit"),
    provider: {
      "@id": absoluteUrl("/#organization")
    },
    areaServed: {
      "@type": "Country",
      name: "United States"
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Small and mid-sized local service businesses"
    },
    description:
      "LeadOps builds AI-assisted lead response systems that capture, answer, qualify, follow up with, route, and organize inbound leads for service businesses.",
    offers: PACKAGE_NAMES.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      description: pkg.summary,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: pkg.price
      },
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/audit")
    }))
  };
}

export function webPageJsonLd({
  title,
  description,
  path
}: {
  title: string;
  description: string;
  path: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name: formatPageTitle(title),
    description,
    isPartOf: {
      "@id": absoluteUrl("/#website")
    },
    about: {
      "@id": absoluteUrl("/#ai-lead-response-qualification-system")
    },
    inLanguage: "en-US"
  };
}

export function faqPageJsonLd(faqs: SeoFaq[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

function stripContext(item: JsonLdObject) {
  const clone = { ...item };
  delete clone["@context"];
  return clone;
}

export function serializeJsonLd(data: JsonLdObject | JsonLdObject[]) {
  const payload = Array.isArray(data)
    ? {
        "@context": "https://schema.org",
        "@graph": data.map(stripContext)
      }
    : data;

  return JSON.stringify(payload).replace(/</g, "\\u003c");
}

export function jsonLdScript(data: JsonLdObject | JsonLdObject[]) {
  return {
    __html: serializeJsonLd(data)
  };
}
