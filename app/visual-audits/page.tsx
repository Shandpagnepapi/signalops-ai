/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getVisualAuditData,
  isValidVisualAuditKey,
  isVisualAuditEnabled,
  type VisualAuditScreenshot
} from "@/lib/visual-audits";

type VisualAuditsPageProps = {
  searchParams: Promise<{
    key?: string;
    run?: string;
  }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SignalOps Visual Audits",
  robots: {
    index: false,
    follow: false
  }
};

function groupScreenshots(screenshots: VisualAuditScreenshot[]) {
  const grouped = new Map<string, VisualAuditScreenshot[]>();

  for (const screenshot of screenshots) {
    const group = grouped.get(screenshot.route) ?? [];
    group.push(screenshot);
    grouped.set(screenshot.route, group);
  }

  return Array.from(grouped.entries());
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function runHref(key: string, runId?: string) {
  const params = new URLSearchParams({
    key
  });

  if (runId) {
    params.set("run", runId);
  }

  return `/visual-audits?${params.toString()}`;
}

export default async function VisualAuditsPage({ searchParams }: VisualAuditsPageProps) {
  const params = await searchParams;

  if (!isVisualAuditEnabled() || !isValidVisualAuditKey(params.key)) {
    notFound();
  }

  let data: Awaited<ReturnType<typeof getVisualAuditData>>;

  try {
    data = await getVisualAuditData(params.run);
  } catch (error) {
    return (
      <main className="min-h-screen bg-[#100818] px-4 py-12 text-white">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.05] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffb36d]">
            SignalOps visual audits
          </p>
          <h1 className="mt-3 text-3xl font-semibold">No audit manifest found yet.</h1>
          <p className="mt-4 text-sm leading-6 text-[#ead0df]/72">
            Run the cloud visual audit script after the Supabase Storage bucket is ready.
            {error instanceof Error ? ` ${error.message}` : ""}
          </p>
        </div>
      </main>
    );
  }

  const { manifest, latest, recentRuns } = data;
  const grouped = groupScreenshots(manifest.screenshots);

  return (
    <main className="min-h-screen bg-[#100818] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_18%_0%,rgba(255,111,156,0.18),transparent_30%),rgba(255,255,255,0.045)] p-5 shadow-2xl shadow-black/28 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">
                Hidden visual audit
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-normal sm:text-5xl">
                SignalOps Visual Audit
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[#ead0df]/72 sm:text-base">
                Public-page screenshots only. No admin, private, or authenticated pages are captured.
              </p>
            </div>
            <div className="grid gap-2 rounded-2xl border border-white/10 bg-[#17122d]/64 p-4 text-sm text-[#ead0df]/72">
              <p>
                <span className="text-[#ead0df]/48">Run:</span>{" "}
                <span className="font-mono text-white">{manifest.runId}</span>
              </p>
              <p>
                <span className="text-[#ead0df]/48">Created:</span>{" "}
                <span className="text-white">{formatDate(manifest.createdAt)}</span>
              </p>
              <p>
                <span className="text-[#ead0df]/48">Base URL:</span>{" "}
                <a className="text-lime-200 underline-offset-4 hover:underline" href={manifest.baseUrl}>
                  {manifest.baseUrl}
                </a>
              </p>
              {manifest.commit ? (
                <p>
                  <span className="text-[#ead0df]/48">Commit:</span>{" "}
                  <span className="font-mono text-white">{manifest.commit}</span>
                </p>
              ) : null}
            </div>
          </div>
        </section>

        {recentRuns.length > 0 ? (
          <section className="mt-5 rounded-3xl border border-white/10 bg-white/[0.035] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={runHref(params.key ?? "")}
                className="rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-2 text-xs font-semibold text-lime-100"
              >
                Latest: {latest.runId}
              </Link>
              {recentRuns.map((run) => (
                <Link
                  key={run.runId}
                  href={runHref(params.key ?? "", run.runId)}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-semibold text-[#ead0df]/72 transition hover:border-white/20 hover:text-white"
                >
                  {run.runId}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-6 grid gap-7">
          {grouped.map(([route, screenshots]) => (
            <div key={route} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">
                    Route
                  </p>
                  <h2 className="mt-1 font-mono text-xl font-semibold text-white">{route}</h2>
                </div>
                <a
                  href={new URL(route, manifest.baseUrl).toString()}
                  className="rounded-full border border-white/10 bg-[#17122d]/70 px-3 py-2 text-xs font-semibold text-[#ead0df]/72 transition hover:text-white"
                >
                  Open page
                </a>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {screenshots.map((screenshot) => (
                  <figure
                    key={`${screenshot.route}-${screenshot.viewport}`}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-[#17122d]/72"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2">
                      <figcaption className="text-xs font-semibold text-white">
                        {screenshot.viewport}
                      </figcaption>
                      <span className="text-xs text-[#ead0df]/52">
                        {screenshot.width}x{screenshot.height}
                      </span>
                    </div>
                    <a href={screenshot.publicUrl}>
                      <img
                        src={screenshot.publicUrl}
                        alt={`${route} screenshot at ${screenshot.viewport}`}
                        className="block aspect-[9/14] w-full object-cover object-top"
                        loading="lazy"
                      />
                    </a>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
