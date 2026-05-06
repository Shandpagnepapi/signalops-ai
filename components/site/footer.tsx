import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import {
  COMPANY_LINKS,
  RESOURCE_LINKS,
  SEO_INDUSTRY_LINKS,
  SEO_SERVICE_LINKS,
  SITE_CONFIG
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.78fr_0.62fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/signalops-logo-horizontal.svg"
              alt="SignalOps logo"
              width="154"
              height="36"
              className="h-9 w-auto"
            />
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
            {SITE_CONFIG.description}
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Services
          </p>
          <div className="grid gap-3 text-sm text-slate-300">
            {SEO_SERVICE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Industries
          </p>
          <div className="grid gap-3 text-sm text-slate-300">
            {SEO_INDUSTRY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Resources
          </p>
          <div className="grid gap-3 text-sm text-slate-300">
            {RESOURCE_LINKS.map((link) =>
              link.href === "/audit" ? (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  eventName={ANALYTICS_EVENTS.auditCtaClicked}
                  eventProperties={{ location: "footer_resources" }}
                  className="transition hover:text-white"
                >
                  {link.label}
                </TrackedLink>
              ) : (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Company
          </p>
          <div className="grid gap-3 text-sm text-slate-300">
            {COMPANY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
            <TrackedLink
              href={`mailto:${SITE_CONFIG.email}`}
              eventName={ANALYTICS_EVENTS.contactClicked}
              eventProperties={{ location: "footer", type: "email" }}
              className="transition hover:text-white"
            >
              {SITE_CONFIG.email}
            </TrackedLink>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500">
        {SITE_CONFIG.tagline}
      </div>
    </footer>
  );
}
