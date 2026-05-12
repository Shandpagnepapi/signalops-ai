import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SignalOps Design Lab",
  robots: {
    index: false,
    follow: false
  }
};

const options = [
  {
    title: "Warm Envo Product Page",
    href: "/design-lab/envo",
    copy: "Deep plum, pink, amber, and glass UI for the dedicated Envo product page."
  },
  {
    title: "Warm SignalOps Studio Homepage",
    href: "/design-lab/studio?style=warm",
    copy: "SignalOps as the parent studio with Envo featured and future AI workers teased."
  },
  {
    title: "Blue SignalOps Studio Homepage",
    href: "/design-lab/studio?style=blue",
    copy: "A cooler navy, cyan, and teal studio direction for the parent company."
  },
  {
    title: "Current Live Style Comparison",
    href: "/",
    copy: "Open the current public homepage in the live SignalOps style."
  }
];

export default function DesignLabPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#080713] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb36d]">Internal comparison</p>
        <h1 className="mt-4 text-4xl font-black tracking-normal sm:text-6xl">SignalOps Design Lab</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#ead0df]/70">
          Temporary noindex previews for comparing Envo product and SignalOps studio directions. These routes are not linked from public navigation.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {options.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="group rounded-[1.5rem] border border-white/12 bg-white/[0.065] p-5 shadow-2xl shadow-black/18 transition hover:-translate-y-1 hover:border-[#ffb36d]/35"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{option.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#ead0df]/66">{option.copy}</p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)]">
                  <ArrowRight className="size-4 text-white" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
