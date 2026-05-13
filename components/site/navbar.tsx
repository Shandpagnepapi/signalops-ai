"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { NAV_LINKS, PRIMARY_CTA, PUBLIC_BRAND_NAME } from "@/lib/constants";
import { shouldHidePublicChrome } from "@/lib/mobile-test-routes";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  if (shouldHidePublicChrome(pathname)) {
    return null;
  }

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#071126]/82 px-3 py-3 backdrop-blur-xl sm:px-5">
      <nav
        className="mx-auto flex max-w-[1450px] items-center justify-between gap-2 rounded-2xl border border-[#BFD3FF]/18 bg-white/[0.06] px-3 py-2.5 shadow-2xl shadow-black/24 backdrop-blur-2xl sm:gap-4 sm:px-5 sm:py-3"
        aria-label="Primary navigation"
      >
        <Link href="/" className="flex min-h-10 shrink-0 items-center gap-2 rounded-xl pr-2 sm:gap-3">
          <Image src="/brand/signalops-logo-mark.svg" alt="" width={30} height={30} className="size-7 sm:size-[34px]" />
          <span className="text-sm font-semibold tracking-normal text-white sm:text-lg">{PUBLIC_BRAND_NAME}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-[#D7E2F7]/72 transition hover:bg-white/8 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
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
