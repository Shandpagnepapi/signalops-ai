"use client";

import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { SITE_CONFIG } from "@/lib/constants";
import { shouldHidePublicChrome } from "@/lib/mobile-test-routes";

const emailHref = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent("SignalOps question")}`;

function shouldHide(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/dashboard") ||
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
      className="fixed bottom-[calc(0.85rem+env(safe-area-inset-bottom))] right-3 z-40 inline-flex h-10 items-center gap-2 rounded-full border border-[#ffb36d]/24 bg-[#100818]/82 px-2.5 pr-3 text-xs font-black text-white shadow-2xl shadow-pink-950/18 backdrop-blur-2xl transition hover:border-[#ffb36d]/45 hover:bg-[#17122d]/92 md:bottom-6 md:right-6 md:h-12 md:px-4 md:text-sm"
      aria-label="Email SignalOps"
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] text-white md:size-7">
        <Mail className="size-3.5 md:size-4" aria-hidden="true" />
      </span>
      <span className="md:hidden">Email Us</span>
      <span className="hidden md:inline">Email SignalOps</span>
    </TrackedLink>
  );
}
