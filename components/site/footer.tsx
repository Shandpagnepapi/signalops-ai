"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import {
  COMPANY_LINKS,
  EMAIL_CTA,
  getEmailHref,
  PACKAGE_LINKS,
  PRIMARY_CTA,
  PUBLIC_BRAND_NAME,
  RESOURCE_LINKS,
  SEO_INDUSTRY_LINKS,
  SEO_SERVICE_LINKS,
  SITE_CONFIG
} from "@/lib/constants";
import { shouldHidePublicChrome } from "@/lib/mobile-test-routes";

export function Footer() {
  const pathname = usePathname();

  if (shouldHidePublicChrome(pathname)) {
    return null;
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#14102b]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#ff6f9c,#ffb36d,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,111,156,0.14),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(255,179,109,0.1),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-md gap-3 px-4 py-8 md:hidden">
        {[
          { href: "/envo", label: "Envo" },
          { href: "/drone", label: "Drone Services" },
          { href: "/demo", label: "Demo" },
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" }
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-semibold text-[#ead0df]/82 transition hover:text-white"
          >
            {link.label}
          </Link>
        ))}
        <TrackedLink
          href={getEmailHref()}
          eventName={ANALYTICS_EVENTS.contactClicked}
          eventProperties={{ location: "mobile_footer", type: "email" }}
          className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-semibold text-[#ead0df]/82 transition hover:text-white"
        >
          Email SignalOps
        </TrackedLink>
      </div>
      <div className="relative mx-auto hidden max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.78fr_0.62fr] lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/signalops-logo-mark.svg"
              alt=""
              width="36"
              height="36"
              className="h-9 w-9"
            />
            <span className="text-lg font-black text-white">{PUBLIC_BRAND_NAME}</span>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#ead0df]/70">
            {SITE_CONFIG.description}
          </p>
          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ead0df]/42">
              Pricing
            </p>
            <div className="grid gap-2 text-sm text-[#ead0df]/78">
              {PACKAGE_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ead0df]/42">
            Services
          </p>
          <div className="grid gap-3 text-sm text-[#ead0df]/78">
            {SEO_SERVICE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ead0df]/42">
            Industries
          </p>
          <div className="grid gap-3 text-sm text-[#ead0df]/78">
            {SEO_INDUSTRY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ead0df]/42">
            Resources
          </p>
          <div className="grid gap-3 text-sm text-[#ead0df]/78">
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ead0df]/42">
            Company
          </p>
          <div className="grid gap-3 text-sm text-[#ead0df]/78">
            {COMPANY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
            <TrackedLink
              href={getEmailHref()}
              eventName={ANALYTICS_EVENTS.contactClicked}
              eventProperties={{ location: "footer", type: "email" }}
              className="transition hover:text-white"
            >
              {SITE_CONFIG.email}
            </TrackedLink>
            <TrackedLink
              href={getEmailHref()}
              eventName={ANALYTICS_EVENTS.contactClicked}
              eventProperties={{ location: "footer_button", type: "email" }}
              className={`${buttonVariants({ variant: "outline" })} mt-2 w-full border-white/18 bg-white/[0.045]`}
            >
              <Mail className="size-4" aria-hidden="true" />
              {EMAIL_CTA.label}
            </TrackedLink>
            <TrackedLink
              href={PRIMARY_CTA.href}
              eventName={ANALYTICS_EVENTS.previewCtaClicked}
              eventProperties={{ location: "footer_company" }}
              className={`${buttonVariants({ size: "sm" })} mt-1 w-full`}
            >
              {PRIMARY_CTA.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-4 py-4 text-center text-xs text-[#ead0df]/50">
        {SITE_CONFIG.tagline}
      </div>
    </footer>
  );
}
