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
      className="fixed bottom-[calc(1.15rem+env(safe-area-inset-bottom))] right-3 z-40 inline-flex h-11 items-center gap-2 rounded-full border border-[#ffb36d]/22 bg-[#100818]/82 px-3.5 text-sm font-black text-white shadow-2xl shadow-pink-950/20 backdrop-blur-2xl transition hover:border-[#ffb36d]/45 hover:bg-[#17122d]/92 md:bottom-5 md:right-5 md:h-11 md:px-4"
      aria-label="Email SignalOps"
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] text-white md:size-7">
        <Mail className="size-4" aria-hidden="true" />
      </span>
      <span className="md:hidden">Email Us</span>
      <span className="hidden md:inline">Email SignalOps</span>
    </TrackedLink>
  );
}
