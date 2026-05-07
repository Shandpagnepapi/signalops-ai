import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const testLinks = [
  { href: "/mobile-test-1", label: "Test 1" },
  { href: "/mobile-test-2", label: "Test 2" },
  { href: "/mobile-test-3", label: "Test 3" }
];

type ShellTone = "dark" | "light" | "electric";

const shellTone = {
  dark: {
    header: "border-white/10 bg-[#0c1012]/90 text-white shadow-black/20",
    muted: "text-white/60",
    switcher: "border-white/10 bg-white/[0.045] text-white/70",
    active: "border-[#69e6bd]/70 bg-[#69e6bd]/16 text-[#caffec]",
    demo: "border-white/10 bg-white/[0.055] text-white hover:bg-white/10"
  },
  light: {
    header: "border-[#17202a]/10 bg-white/90 text-[#17202a] shadow-[#17202a]/10",
    muted: "text-[#17202a]/60",
    switcher: "border-[#17202a]/10 bg-white/70 text-[#17202a]/60",
    active: "border-[#0f766e]/50 bg-[#dff8f2] text-[#0f4f49]",
    demo: "border-[#0f766e]/18 bg-[#dff8f2] text-[#0f4f49] hover:bg-[#c8f2e9]"
  },
  electric: {
    header: "border-white/12 bg-[#101010]/90 text-white shadow-black/24",
    muted: "text-white/60",
    switcher: "border-white/12 bg-white/[0.05] text-white/70",
    active: "border-[#e6ff5b]/70 bg-[#e6ff5b]/16 text-[#f6ffc2]",
    demo: "border-[#e6ff5b]/35 bg-[#e6ff5b]/12 text-[#f6ffc2] hover:bg-[#e6ff5b]/18"
  }
} satisfies Record<
  ShellTone,
  {
    header: string;
    muted: string;
    switcher: string;
    active: string;
    demo: string;
  }
>;

export function MobileTestShell({
  activeTest,
  children,
  className,
  conceptLabel,
  conceptName,
  tone = "dark"
}: {
  activeTest: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
  conceptLabel: string;
  conceptName: string;
  tone?: ShellTone;
}) {
  const styles = shellTone[tone];

  return (
    <div className={cn("min-h-screen overflow-hidden pb-24 md:pb-0", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between gap-3 rounded-lg border px-3 py-3 shadow-2xl backdrop-blur-xl",
            styles.header
          )}
        >
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="SignalOps home">
            <Image src="/brand/signalops-logo-mark.svg" alt="" width={32} height={32} />
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-4">{SITE_CONFIG.name}</p>
              <p className={cn("truncate text-[0.68rem] leading-4", styles.muted)}>
                {conceptName}
              </p>
            </div>
          </Link>

          <Link
            href="/demo"
            className={cn(
              "inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border px-3 text-xs font-semibold transition",
              styles.demo
            )}
          >
            Demo
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2" aria-label="Mobile redesign test routes">
          {testLinks.map((link, index) => {
            const isActive = activeTest === index + 1;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md border px-2.5 py-2 text-center text-xs font-semibold transition",
                  isActive ? styles.active : styles.switcher
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="block">{link.label}</span>
                <span className="mt-0.5 block text-[0.62rem] font-medium opacity-70">
                  {isActive ? "Now" : "View"}
                </span>
              </Link>
            );
          })}
        </div>

        <p className={cn("mt-3 text-xs font-medium", styles.muted)}>{conceptLabel}</p>
      </div>

      {children}
    </div>
  );
}
