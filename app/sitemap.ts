import type { MetadataRoute } from "next";
import { ALTERNATIVE_PAGE_IDS, ALTERNATIVE_PAGES } from "@/lib/alternative-pages";
import { INDUSTRY_PAGE_IDS, INDUSTRY_SEO_PAGES } from "@/lib/industry-seo-pages";
import { absoluteUrl } from "@/lib/seo";
import { SERVICE_PAGE_IDS, SERVICE_PAGES } from "@/lib/service-pages";

const routes = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly"
  },
  {
    path: "/audit",
    priority: 0.65,
    changeFrequency: "monthly"
  },
  {
    path: "/preview",
    priority: 0.98,
    changeFrequency: "monthly"
  },
  {
    path: "/envo",
    priority: 0.96,
    changeFrequency: "monthly"
  },
  {
    path: "/drone",
    priority: 0.58,
    changeFrequency: "monthly"
  },
  {
    path: "/ai-lead-response",
    priority: 0.88,
    changeFrequency: "monthly"
  },
  {
    path: "/missed-call-text-back",
    priority: 0.86,
    changeFrequency: "monthly"
  },
  {
    path: "/ai-follow-up-automation",
    priority: 0.84,
    changeFrequency: "monthly"
  },
  {
    path: "/ai-lead-qualification",
    priority: 0.84,
    changeFrequency: "monthly"
  },
  {
    path: "/lead-management-for-small-business",
    priority: 0.82,
    changeFrequency: "monthly"
  },
  {
    path: "/no-crm-lead-tracking",
    priority: 0.82,
    changeFrequency: "monthly"
  },
  {
    path: "/alternatives",
    priority: 0.76,
    changeFrequency: "monthly"
  },
  ...SERVICE_PAGE_IDS.map((service) => ({
    path: SERVICE_PAGES[service].path,
    priority: 0.9,
    changeFrequency: "monthly" as const
  })),
  ...ALTERNATIVE_PAGE_IDS.map((alternative) => ({
    path: ALTERNATIVE_PAGES[alternative].path,
    priority: 0.7,
    changeFrequency: "monthly" as const
  })),
  ...INDUSTRY_PAGE_IDS.map((industry) => ({
    path: INDUSTRY_SEO_PAGES[industry].path,
    priority: 0.78,
    changeFrequency: "monthly" as const
  })),
  {
    path: "/live-demo",
    priority: 0.9,
    changeFrequency: "monthly"
  },
  {
    path: "/how-it-works",
    priority: 0.85,
    changeFrequency: "monthly"
  },
  {
    path: "/roi-calculator",
    priority: 0.8,
    changeFrequency: "monthly"
  },
  {
    path: "/demo",
    priority: 0.75,
    changeFrequency: "monthly"
  },
  {
    path: "/privacy",
    priority: 0.25,
    changeFrequency: "yearly"
  },
  {
    path: "/terms",
    priority: 0.25,
    changeFrequency: "yearly"
  }
] satisfies {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
