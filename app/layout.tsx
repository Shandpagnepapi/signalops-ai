import "./globals.css";
import { AnalyticsProvider } from "@/components/site/AnalyticsProvider";
import { FloatingEmailCta } from "@/components/site/floating-email-cta";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import {
  createRootMetadata,
  jsonLdScript,
  organizationJsonLd,
  websiteJsonLd
} from "@/lib/seo";

export const metadata = createRootMetadata();

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <AnalyticsProvider />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript([
            organizationJsonLd(),
            websiteJsonLd()
          ])}
        />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingEmailCta />
        </div>
      </body>
    </html>
  );
}
