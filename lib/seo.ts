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
  absoluteTitle?: boolean;
};

type JsonLdObject = Record<string, unknown>;

export const SEO_DEFAULT_IMAGE = "/og/signalops-default.png";

export const OG_IMAGE_ASSETS = {
  default: {
    path: "/og/signalops-default.png",
    alt: "SignalOps branded social image for AI workers for local businesses."
  },
  home: {
    path: "/og/signalops-home.png",
    alt: "SignalOps homepage social image for AI workers and Envo, the AI Lead Manager."
  },
  audit: {
    path: "/og/signalops-audit.png",
    alt: "SignalOps project inquiry social image."
  },
  demo: {
    path: "/og/signalops-demo.png",
    alt: "Envo by SignalOps demo social image showing AI lead intake, priority sorting, and routing."
  },
  roi: {
    path: "/og/signalops-roi.png",
    alt: "SignalOps ROI calculator social image for missed lead revenue estimates."
  }
} as const;

export const PAGE_TITLE_TEMPLATES = {
  home: "AI Workers for Local Businesses",
  preview: "Preview Envo",
  audit: "Start a Project for AI Lead Response",
  demo: "Envo Demo",
  dashboard: "AI Lead Management Dashboard Demo",
  howItWorks: "How AI Lead Response Systems Work",
  liveDemo: "AI Lead Response Live Demo Generator",
  roi: "AI Lead Response ROI Calculator",
  privacy: "Privacy Policy",
  terms: "Terms of Use"
} as const;

export const META_DESCRIPTION_TEMPLATES = {
  home:
    "SignalOps builds AI workers for local businesses. Meet Envo, the AI Lead Manager that answers, qualifies, follows up, and hands off leads.",
  preview:
    "Tell us how your leads come in and where things slow down. SignalOps maps how Envo would answer, follow up, escalate, and hand off leads for your business.",
  audit:
    "Start a SignalOps project by sharing your lead sources, tools, package interest, timeline, and follow-up needs for a done-for-you AI lead response system.",
  demo:
    "See Envo handle a lead. Watch Envo answer, qualify, follow up, and prepare the handoff with AI lead response, quote intake automation, and lead routing automation.",
  dashboard:
    "Explore a SignalOps AI lead management dashboard demo with priority views, routing status, missed lead recovery, and automated follow-up visibility.",
  howItWorks:
    "See how SignalOps AI lead response systems capture inquiries, collect lead details, route hot opportunities, book appointments, and trigger follow-up.",
  liveDemo:
    "Generate a tailored SignalOps AI lead response demo with lead intake, routing automation, follow-up examples, and appointment booking ideas.",
  roi:
    "Use the SignalOps ROI calculator to estimate missed lead recovery from faster response, AI lead intake, and automated follow-up.",
  privacy:
    "Read how SignalOps handles website, analytics, and lead form information submitted through its AI lead response system pages.",
  terms:
    "Review the terms for using the SignalOps website, demos, AI lead response examples, and service information."
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
  return `${SITE_CONFIG.name} | ${title}`;
}

export function createCanonical(path: string) {
  return absoluteUrl(path);
}

export function createPageMetadata({
  title,
  description,
  path,
  image = SEO_DEFAULT_IMAGE,
  imageAlt = OG_IMAGE_ASSETS.default.alt,
  type = "website",
  noIndex = false,
  absoluteTitle = false
}: PageMetadataOptions): Metadata {
  const canonical = createCanonical(path);
  const imageUrl = absoluteUrl(image);
  const socialTitle = absoluteTitle ? title : formatPageTitle(title);
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
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title: socialTitle,
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
      title: socialTitle,
      description,
      images: [
        {
          url: imageUrl,
          alt: imageAlt
        }
      ]
    },
    robots
  };
}

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: formatPageTitle(PAGE_TITLE_TEMPLATES.home),
      template: `${SITE_CONFIG.name} | %s`
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
          alt: OG_IMAGE_ASSETS.default.alt
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: formatPageTitle(PAGE_TITLE_TEMPLATES.home),
      description: META_DESCRIPTION_TEMPLATES.home,
      images: [
        {
          url: absoluteUrl(SEO_DEFAULT_IMAGE),
          alt: OG_IMAGE_ASSETS.default.alt
        }
      ]
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
    logo: absoluteUrl("/brand/signalops-logo-horizontal.svg"),
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
    name: "AI Lead Response & Intake System",
    serviceType: "AI lead response, intake, routing, follow-up, and appointment booking",
    url: absoluteUrl("/preview"),
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
      "SignalOps builds Envo by SignalOps, an AI Lead Manager and AI front desk that helps small and local businesses capture, answer, sort, follow up with, route, and book leads with automated lead follow-up and missed lead recovery.",
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
      url: absoluteUrl("/preview")
    }))
  };
}

export function serviceOfferingJsonLd({
  name,
  description,
  path,
  serviceType
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`${path}#service`),
    name,
    serviceType,
    url: absoluteUrl(path),
    provider: {
      "@id": absoluteUrl("/#organization")
    },
    areaServed: {
      "@type": "Country",
      name: "United States"
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Small and local service businesses"
    },
    description,
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
      url: absoluteUrl("/preview")
    }))
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
  absoluteTitle = false
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name: absoluteTitle ? title : formatPageTitle(title),
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
