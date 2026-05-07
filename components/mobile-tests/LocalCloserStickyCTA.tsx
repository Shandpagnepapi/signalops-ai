import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LocalCloserStickyCTA({
  className,
  source
}: {
  className?: string;
  source: string;
}) {
  return (
    <div
      className={cn("fixed inset-x-0 bottom-0 z-50 border-t px-3 py-3 shadow-2xl backdrop-blur-xl md:hidden", className)}
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderColor: "rgba(17, 24, 39, 0.1)",
        boxShadow: "0 -18px 44px rgba(17, 24, 39, 0.2)"
      }}
    >
      <TrackedLink
        href={PRIMARY_CTA.href}
        eventName={ANALYTICS_EVENTS.previewCtaClicked}
        eventProperties={{ location: source }}
        className="mx-auto flex h-12 max-w-sm items-center justify-center gap-2 rounded-lg px-5 text-base font-black transition"
        style={{ background: "#111827", color: "#ffffff" }}
      >
        Get Free Preview
        <ArrowRight className="size-4" aria-hidden="true" />
      </TrackedLink>
    </div>
  );
}
