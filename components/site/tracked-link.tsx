"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import {
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsEventProperties
} from "@/lib/analytics";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  href: string;
  children: ReactNode;
  eventName: AnalyticsEventName;
  eventProperties?: AnalyticsEventProperties;
};

function isNextLinkHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function TrackedLink({
  href,
  children,
  eventName,
  eventProperties,
  ...props
}: TrackedLinkProps) {
  function handleClick() {
    trackEvent(eventName, {
      href,
      ...eventProperties
    });
  }

  if (isNextLinkHref(href)) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
