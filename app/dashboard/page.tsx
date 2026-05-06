import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  META_DESCRIPTION_TEMPLATES,
  PAGE_TITLE_TEMPLATES,
  webPageJsonLd
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: PAGE_TITLE_TEMPLATES.dashboard,
  description: META_DESCRIPTION_TEMPLATES.dashboard,
  path: "/dashboard",
  noIndex: true
});

export default function DashboardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: PAGE_TITLE_TEMPLATES.dashboard,
            description: META_DESCRIPTION_TEMPLATES.dashboard,
            path: "/dashboard"
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE_TEMPLATES.dashboard, path: "/dashboard" }
          ])
        ])}
      />
      <DashboardShell />
    </>
  );
}
