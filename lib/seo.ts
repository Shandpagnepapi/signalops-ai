import type { Metadata } from "next";
import { CONTACT_PLACEHOLDER, PACKAGE_NAMES, PRODUCT_FULL_NAME, PRODUCT_NAME, PRODUCT_ROLE, PUBLIC_BRAND_NAME, SITE_CONFIG } from "@/lib/constants";

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
    alt: "SignalOpsAI and Envo blue and violet social image for the AI Lead Manager product."
  },
  home: {
    path: "/og/signalops-home.png",
    alt: "SignalOpsAI homepage social image showing Envo AI Lead Manager and separate Drone Services."
  },
  audit: {
    path: "/og/signalops-audit.png",
    alt: "Envo Preview social image for mapping customer calls, texts, forms, DMs, follow-ups, and handoffs."
  },
  demo: {
    path: "/og/signalops-demo.png",
    alt: "Envo demo social image showing lead intake, owner handoffs, follow-up, and dashboard workflow."
  },
  roi: {
    path: "/og/signalops-roi.png",
    alt: "Envo ROI calculator social image for estimating possible missed lead recovery scenarios."
  }
} as const;

export const PAGE_TITLE_TEMPLATES = {
  home: "SignalOpsAI, Envo, and Drone Services",
  preview: "Preview Envo",
  audit: "Envo Preview Questionnaire",
  demo: "Envo Demo",
  dashboard: "Envo Owner Command Center Demo",
  howItWorks: "How Envo Handles Customer Calls and Leads",
  liveDemo: "Envo Live Demo Generator",
  roi: "Envo Lead Response ROI Calculator",
  privacy: "Privacy Policy",
  terms: "Terms of Use"
} as const;

export const META_DESCRIPTION_TEMPLATES = {
  home:
    "SignalOpsAI is the parent venture studio for Envo AI lead automation and separate FAA Part 107 Drone Services for small businesses.",
  preview:
    "Preview Envo by sharing how customer calls, texts, forms, DMs, and follow-ups work today. SignalOpsAI maps how Envo should answer, organize, and hand off leads.",
  audit:
    "Start an Envo Preview by sharing customer calls, texts, forms, DMs, tools, timeline, follow-up, and owner handoff needs.",
  demo:
    "See Envo handle a lead workflow with customer calls, texts, forms, DMs, follow-up, owner handoffs, and dashboard visibility.",
  dashboard:
    "Explore an Envo owner command center demo with lead stages, customer messages, missed calls, follow-ups, handoffs, and dashboard visibility.",
  howItWorks:
    "See how Envo captures customer inquiries, organizes key details, routes handoffs, follows up, and keeps the owner in control.",
  liveDemo:
    "Generate a tailored Envo demo with lead intake, response examples, follow-up paths, handoffs, dashboard cards, and owner control rules.",
  roi:
    "Use the Envo ROI calculator to estimate possible missed lead recovery scenarios from faster response, cleaner follow-up, and better handoffs.",
  privacy:
    "Read how SignalOpsAI handles website, analytics, and lead form information submitted through Envo and Drone Services pages.",
  terms:
    "Review the terms for using the SignalOpsAI website, Envo demos, AI lead response examples, and Drone Services information."
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
  return `${PUBLIC_BRAND_NAME} | ${title}`;
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
      siteName: PUBLIC_BRAND_NAME,
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
      template: `${PUBLIC_BRAND_NAME} | %s`
    },
    description: META_DESCRIPTION_TEMPLATES.home,
    openGraph: {
      title: formatPageTitle(PAGE_TITLE_TEMPLATES.home),
      description: META_DESCRIPTION_TEMPLATES.home,
      url: getSiteUrl(),
      siteName: PUBLIC_BRAND_NAME,
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
    name: PUBLIC_BRAND_NAME,
    alternateName: SITE_CONFIG.brandName,
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
    name: PUBLIC_BRAND_NAME,
    url: getSiteUrl(),
    description:
      "SignalOpsAI publishes Envo AI Lead Manager pages, AI lead automation resources, and separate Drone Services information.",
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
    "@id": absoluteUrl("/#envo-ai-lead-manager"),
    name: PRODUCT_FULL_NAME,
    alternateName: PRODUCT_NAME,
    serviceType: `${PRODUCT_ROLE}, AI lead response, customer call and text intake, automated follow-up, owner handoffs, and dashboard visibility`,
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
      "SignalOpsAI builds Envo, an AI Lead Manager trained around a small business to answer customer calls, texts, forms, DMs, organize leads, follow up, route handoffs, and keep the owner in control.",
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
    alternateName: name.includes("Envo") ? PRODUCT_NAME : undefined,
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
    description: description.includes("Envo")
      ? description
      : `${description} Envo is the AI Lead Manager product from SignalOpsAI for customer calls, texts, forms, DMs, follow-ups, handoffs, and owner dashboards.`,
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
      "@id": absoluteUrl("/#envo-ai-lead-manager")
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
