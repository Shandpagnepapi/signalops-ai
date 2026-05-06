import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustrySeoPage } from "@/components/site/industry-seo-page";
import {
  getIndustrySeoPage,
  INDUSTRY_PAGE_IDS
} from "@/lib/industry-seo-pages";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  jsonLdScript,
  webPageJsonLd
} from "@/lib/seo";

type IndustryPageProps = {
  params: Promise<{
    industry: string;
  }>;
};

export function generateStaticParams() {
  return INDUSTRY_PAGE_IDS.map((industry) => ({
    industry
  }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { industry } = await params;
  const page = getIndustrySeoPage(industry);

  if (!page) {
    return {};
  }

  return createPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path
  });
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { industry } = await params;
  const page = getIndustrySeoPage(industry);

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
            path: page.path
          }),
          faqPageJsonLd(page.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: page.industryName, path: page.path }
          ])
        ])}
      />
      <IndustrySeoPage page={page} />
    </>
  );
}

export const dynamicParams = false;
