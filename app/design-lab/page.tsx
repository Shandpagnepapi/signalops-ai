import type { Metadata } from "next";
import { DesignLabIndex, getDesignReferenceImages } from "@/components/design-lab/lab-components";

export const metadata: Metadata = {
  title: "SignalOps Design Lab",
  description: "Internal visual playground for SignalOps and Envo design concepts.",
  robots: {
    index: false,
    follow: false
  }
};

export default async function DesignLabPage() {
  const referenceImages = await getDesignReferenceImages();

  return <DesignLabIndex referenceImages={referenceImages} />;
}
