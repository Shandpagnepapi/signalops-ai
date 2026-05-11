"use client";

import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { SITE_CONFIG } from "@/lib/constants";
import { isMobileTestRoute } from "@/lib/mobile-test-routes";

const emailHref = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent("SignalOps question")}`;

function shouldHide(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/dashboard") ||
    isMobileTestRoute(pathname)
  );
}

export function FloatingEmailCta() {
  const pathname = usePathname();

  if (shouldHide(pathname)) {
    return null;
  }

  return (
    <TrackedLink
      href={emailHref}
      eventName={ANALYTICS_EVENTS.contactClicked}
      eventProperties={{ location: "floating_email_cta", type: "email" }}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-3 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-white/14 bg-slate-950/82 px-4 text-sm font-black text-white shadow-2xl shadow-black/25 backdrop-blur-2xl transition hover:border-lime-300/35 hover:bg-slate-900 md:bottom-5 md:right-5 md:h-11 md:px-4"
      aria-label="Email SignalOps"
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-lime-300/14 text-lime-200 md:size-7">
        <Mail className="size-4" aria-hidden="true" />
      </span>
      <span className="md:hidden">Email Us</span>
      <span className="hidden md:inline">Email SignalOps</span>
    </TrackedLink>
  );
}
