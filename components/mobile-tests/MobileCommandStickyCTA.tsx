import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MobileCommandStickyCTA({
  className,
  source
}: {
  className?: string;
  source: string;
}) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#050914]/88 px-3 py-3 backdrop-blur-xl md:hidden",
        className
      )}
    >
      <div className="mx-auto flex max-w-xs items-center gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-2 shadow-2xl shadow-black/30 sm:max-w-md">
        <div className="min-w-0 flex-1 px-2">
          <p className="truncate text-[0.68rem] font-semibold uppercase leading-4 text-white/50">
            Free AI Lead System Preview
          </p>
          <p className="text-xs font-semibold leading-5 text-white">See the system first</p>
        </div>
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: source }}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-md bg-white px-4 text-sm font-semibold transition hover:bg-[#dbeafe]"
          style={{ color: "#050914" }}
        >
          Start
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </TrackedLink>
      </div>
    </div>
  );
}
