import type { Metadata } from "next";
import { EnvoProductPage } from "@/components/site/envo-showcase";

export const metadata: Metadata = {
  title: "Design Lab - Warm Envo Product Page",
  robots: {
    index: false,
    follow: false
  }
};

export default function DesignLabEnvoPage() {
  return <EnvoProductPage designLab />;
}
