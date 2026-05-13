import type { Metadata } from "next";
import { EnvoLabPage, getDesignReferenceImages } from "@/components/design-lab/lab-components";

export const metadata: Metadata = {
  title: "Design Lab - Envo Blue Product Concept",
  description: "Internal premium blue and violet Envo product page concept.",
  robots: {
    index: false,
    follow: false
  }
};

export default async function DesignLabEnvoPage() {
  const referenceImages = await getDesignReferenceImages();

  return <EnvoLabPage referenceImages={referenceImages} />;
}
