import type { Metadata } from "next";
import { SignalOpsStudioPreview } from "@/components/site/envo-showcase";

type StudioDesignLabPageProps = {
  searchParams: Promise<{
    style?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Design Lab - SignalOps Studio Homepage",
  robots: {
    index: false,
    follow: false
  }
};

export default async function StudioDesignLabPage({ searchParams }: StudioDesignLabPageProps) {
  const params = await searchParams;
  const palette = params.style === "blue" ? "blue" : "warm";

  return (
    <div className="min-h-screen bg-[#080713] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1450px]">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb36d]">
          Internal Design Lab / {palette === "blue" ? "Blue Studio" : "Warm Studio"}
        </p>
        <SignalOpsStudioPreview palette={palette} />
      </div>
    </div>
  );
}
