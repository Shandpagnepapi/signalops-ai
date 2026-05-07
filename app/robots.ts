import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/preview",
          "/audit",
          "/ai-lead-response",
          "/missed-call-text-back",
          "/ai-follow-up-automation",
          "/ai-lead-qualification",
          "/lead-management-for-small-business",
          "/no-crm-lead-tracking",
          "/services/",
          "/alternatives/",
          "/industries/",
          "/demo",
          "/how-it-works",
          "/live-demo",
          "/roi-calculator",
          "/privacy",
          "/terms"
        ],
        disallow: ["/api/", "/auth/", "/dashboard", "/admin/"]
      }
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteUrl()
  };
}
