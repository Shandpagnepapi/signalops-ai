import type { Metadata } from "next";
import { StudioLabPage } from "@/components/design-lab/lab-components";

export const metadata: Metadata = {
  title: "Design Lab - SignalOps Studio Concepts",
  description: "Internal warm and cool SignalOps Studio homepage concepts.",
  robots: {
    index: false,
    follow: false
  }
};

export default function DesignLabStudioPage() {
  return <StudioLabPage />;
}
