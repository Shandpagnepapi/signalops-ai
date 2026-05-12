import type { Metadata } from "next";
import { ThemesLabPage } from "@/components/design-lab/lab-components";

export const metadata: Metadata = {
  title: "Design Lab - Theme Comparison",
  description: "Internal SignalOps and Envo theme comparison cards.",
  robots: {
    index: false,
    follow: false
  }
};

export default function DesignLabThemesPage() {
  return <ThemesLabPage />;
}

