import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { NAV_LINKS, PRIMARY_CTA, SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/leadops-logo-horizontal.svg"
              alt="LeadOps logo"
              width="154"
              height="36"
              className="h-9 w-auto"
            />
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
            {SITE_CONFIG.description}
          </p>
        </div>
        <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link href="/privacy" className="transition hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-white">
            Terms of Use
          </Link>
          <TrackedLink
            href={`mailto:${SITE_CONFIG.email}`}
            eventName={ANALYTICS_EVENTS.contactClicked}
            eventProperties={{ location: "footer", type: "email" }}
            className="transition hover:text-white"
          >
            {SITE_CONFIG.email}
          </TrackedLink>
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.auditCtaClicked}
            eventProperties={{ location: "footer" }}
            className="transition hover:text-white"
          >
            {PRIMARY_CTA.label}
          </TrackedLink>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500">
        {SITE_CONFIG.tagline}
      </div>
    </footer>
  );
}
