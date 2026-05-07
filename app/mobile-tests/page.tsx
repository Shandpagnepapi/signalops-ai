import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Building2, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./mobile-tests.module.css";

export const metadata: Metadata = {
  title: "SignalOps Mobile Redesign Tests",
  description: "Private selector for SignalOps mobile redesign test routes.",
  robots: {
    index: false,
    follow: false
  }
};

const tests = [
  {
    title: "Mobile Test 1",
    concept: "Enterprise Command Center",
    href: "/mobile-test-1",
    description: "Premium SaaS dashboard-style mobile concept.",
    icon: LayoutDashboard
  },
  {
    title: "Mobile Test 2",
    concept: "Local Business Closer",
    href: "/mobile-test-2",
    description: "Direct-response mobile concept for busy local business owners.",
    icon: Building2
  },
  {
    title: "Mobile Test 3",
    concept: "AI Concierge App",
    href: "/mobile-test-3",
    description: "App-like mobile concept with chat, lead cards, and handoff timeline.",
    icon: Bot
  }
];

export default function MobileTestsPage() {
  return (
    <main className={cn(styles.page, "px-4 py-6 sm:px-6 lg:px-8")}>
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className={cn(styles.introCard, "rounded-3xl border p-5 shadow-2xl")}>
          <p className={cn(styles.accent, "text-xs font-black uppercase tracking-normal")}>
            Private test selector
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-normal sm:text-5xl">
            SignalOps Mobile Redesign Tests
          </h1>
          <p className={cn(styles.muted, "mt-3 text-sm leading-7")}>
            Open each mobile-first concept on your phone and compare the direction.
          </p>
        </div>

        <div className="grid gap-3">
          {tests.map((test) => {
            const Icon = test.icon;

            return (
              <Link
                key={test.href}
                href={test.href}
                className={cn(styles.testCard, "group rounded-3xl border p-4 shadow-xl")}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(styles.icon, "flex size-12 shrink-0 items-center justify-center rounded-2xl")}>
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cn(styles.accent, "text-sm font-black")}>{test.title}</p>
                    <h2 className="mt-1 text-2xl font-black leading-tight tracking-normal">
                      {test.concept}
                    </h2>
                    <p className={cn(styles.muted, "mt-2 text-sm leading-6")}>{test.description}</p>
                  </div>
                  <ArrowRight className={cn(styles.arrow, "mt-2 size-5 shrink-0")} aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
