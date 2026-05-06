import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { NAV_LINKS, PRIMARY_CTA, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/82 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image src="/brand/signalops-logo-mark.svg" alt="" width={34} height={34} />
          <span className="text-base font-semibold tracking-normal text-white">{SITE_CONFIG.name}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-white/6 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.auditCtaClicked}
          eventProperties={{ location: "navbar" }}
          aria-label={PRIMARY_CTA.label}
          className={cn(buttonVariants({ size: "sm" }), "shrink-0 max-sm:size-10 max-sm:px-0")}
        >
          <span className="hidden sm:inline">{PRIMARY_CTA.label}</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </nav>
    </header>
  );
}
