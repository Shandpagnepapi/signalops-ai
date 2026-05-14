import type { Metadata } from "next";
import { EnvoAssetShowcase } from "@/components/site/envo/envo-asset-showcase";

export const metadata: Metadata = {
  title: "Envo Asset Preview",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
};

export default function EnvoAssetsPage() {
  return <EnvoAssetShowcase />;
}
