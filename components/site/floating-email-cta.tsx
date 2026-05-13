"use client";

import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { getEmailHref } from "@/lib/constants";
import { shouldHidePublicChrome } from "@/lib/mobile-test-routes";

const emailHref = getEmailHref();

function shouldHide(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/envo" ||
    pathname === "/drone" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/design-lab") ||
    shouldHidePublicChrome(pathname)
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
      className="fixed bottom-[calc(0.85rem+env(safe-area-inset-bottom))] right-3 z-40 inline-flex h-10 items-center gap-2 rounded-full border border-[#6F4DFF]/24 bg-[#071126]/82 px-2.5 pr-3 text-xs font-black text-white shadow-2xl shadow-blue-950/18 backdrop-blur-2xl transition hover:border-[#6F4DFF]/45 hover:bg-[#0B1024]/92 md:bottom-6 md:right-6 md:h-12 md:px-4 md:text-sm"
      aria-label="Email SignalOpsAI"
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-[linear-gradient(135deg,#328BFF,#6F4DFF)] text-white md:size-7">
        <Mail className="size-3.5 md:size-4" aria-hidden="true" />
      </span>
      <span className="md:hidden">Email Us</span>
      <span className="hidden md:inline">Email SignalOpsAI</span>
    </TrackedLink>
  );
}
