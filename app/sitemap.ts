import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly"
  },
  {
    path: "/audit",
    priority: 0.95,
    changeFrequency: "monthly"
  },
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
