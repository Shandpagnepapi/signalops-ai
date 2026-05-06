import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/site/service-page";
import {
  getServicePage,
  SERVICE_PAGE_IDS
} from "@/lib/service-pages";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  jsonLdScript,
  serviceOfferingJsonLd,
  webPageJsonLd
} from "@/lib/seo";

type ServiceRouteProps = {
  params: Promise<{
    service: string;
  }>;
};

export function generateStaticParams() {
  return SERVICE_PAGE_IDS.map((service) => ({
    service
  }));
}

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { service } = await params;
  const page = getServicePage(service);

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

export default async function ServiceRoutePage({ params }: ServiceRouteProps) {
  const { service } = await params;
  const page = getServicePage(service);

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
          serviceOfferingJsonLd({
            name: page.h1.replace(/\.$/, ""),
            description: page.metaDescription,
            path: page.path,
            serviceType: page.targetKeyword
          }),
          faqPageJsonLd(page.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/ai-lead-response" },
            { name: page.metaTitle, path: page.path }
          ])
        ])}
      />
      <ServicePage page={page} />
    </>
  );
}

export const dynamicParams = false;
