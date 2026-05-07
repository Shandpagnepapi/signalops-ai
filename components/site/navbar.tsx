"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { EMAIL_CTA, getEmailHref, NAV_LINKS, PRIMARY_CTA, SITE_CONFIG } from "@/lib/constants";
import { isMobileTestRoute } from "@/lib/mobile-test-routes";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  if (isMobileTestRoute(pathname)) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#14102b]/74 px-3 py-3 backdrop-blur-xl sm:px-5">
      <nav
        className="mx-auto flex max-w-[1450px] items-center justify-between gap-4 rounded-2xl border border-white/14 bg-white/[0.075] px-4 py-3 shadow-2xl shadow-black/18 backdrop-blur-2xl sm:px-6"
        aria-label="Primary navigation"
      >
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image src="/brand/signalops-logo-mark.svg" alt="" width={34} height={34} />
          <span className="text-base font-semibold tracking-normal text-white sm:text-lg">{SITE_CONFIG.name}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-sm text-[#ead0df]/76 transition hover:bg-white/8 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <TrackedLink
            href={getEmailHref()}
            eventName={ANALYTICS_EVENTS.contactClicked}
            eventProperties={{ location: "navbar", type: "email" }}
            aria-label={EMAIL_CTA.label}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-white/18 bg-white/[0.045] max-sm:h-10 max-sm:px-3")}
          >
            <span>{EMAIL_CTA.shortLabel}</span>
            <Mail className="size-4" aria-hidden="true" />
          </TrackedLink>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "navbar" }}
            aria-label={PRIMARY_CTA.label}
            className={cn(buttonVariants({ size: "sm" }), "max-sm:size-10 max-sm:px-0")}
          >
            <span className="hidden sm:inline">{PRIMARY_CTA.label}</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
        </div>
      </nav>
    </header>
  );
}
