import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlternativePage } from "@/components/site/alternative-page";
import {
  ALTERNATIVE_PAGE_IDS,
  getAlternativePage
} from "@/lib/alternative-pages";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  jsonLdScript,
  webPageJsonLd
} from "@/lib/seo";

type AlternativeRouteProps = {
  params: Promise<{
    alternative: string;
  }>;
};

export function generateStaticParams() {
  return ALTERNATIVE_PAGE_IDS.map((alternative) => ({
    alternative
  }));
}

export async function generateMetadata({ params }: AlternativeRouteProps): Promise<Metadata> {
  const { alternative } = await params;
  const page = getAlternativePage(alternative);

  if (!page) {
    return {};
  }

  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
    absoluteTitle: true
  });
}

export default async function AlternativeRoutePage({ params }: AlternativeRouteProps) {
  const { alternative } = await params;
  const page = getAlternativePage(alternative);

  if (!page) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title: page.metaTitle,
            description: page.metaDescription,
            path: page.path,
            absoluteTitle: true
          }),
          faqPageJsonLd(page.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: page.metaTitle, path: page.path }
          ])
        ])}
      />
      <AlternativePage page={page} />
    </>
  );
}

export const dynamicParams = false;
