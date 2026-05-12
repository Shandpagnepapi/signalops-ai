/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";

type VisualReviewScreenshot = {
  route: string;
  routeSlug: string;
  routeLabel: string;
  viewport: string;
  width: number;
  height: number;
  fileName: string;
  src: string;
};

type VisualReviewManifest = {
  createdAt: string;
  baseUrl: string;
  commitSha?: string | null;
  workflowRunId?: string | null;
  artifactId?: string | null;
  reviewUrl: string;
  routes: string[];
  viewports: Array<{
    name: string;
    width: number;
    height: number;
  }>;
  screenshots: VisualReviewScreenshot[];
  note: string;
};

export const metadata: Metadata = {
  title: "SignalOps Visual Review",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
};

async function loadManifest() {
  try {
    const manifestPath = path.join(process.cwd(), "public", "visual-review", "latest", "manifest.json");
    const raw = await readFile(manifestPath, "utf8");
    return JSON.parse(raw) as VisualReviewManifest;
  } catch {
    return null;
  }
}

function groupScreenshots(screenshots: VisualReviewScreenshot[]) {
  const grouped = new Map<string, VisualReviewScreenshot[]>();

  for (const screenshot of screenshots) {
    const group = grouped.get(screenshot.route) ?? [];
    group.push(screenshot);
    grouped.set(screenshot.route, group);
  }

  return Array.from(grouped.entries());
}

export default async function VisualReviewPage() {
  const manifest = await loadManifest();

  if (!manifest) {
    return (
      <main className="min-h-screen bg-[#090611] px-5 py-10 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.06] p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-200">SignalOps Visual Review</p>
          <h1 className="mt-3 text-3xl font-black tracking-normal">No screenshots found yet.</h1>
          <p className="mt-3 text-sm leading-6 text-white/68">
            Run the visual review workflow to generate the latest public-site screenshots.
          </p>
        </div>
      </main>
    );
  }

  const grouped = groupScreenshots(manifest.screenshots);

  return (
    <main className="min-h-screen bg-[#090611] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-200">SignalOps Visual Review</p>
          <h1 className="mt-3 text-4xl font-black tracking-normal sm:text-6xl">Latest public-site screenshots</h1>
          <div className="mt-5 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">Created</span>
              <strong className="mt-1 block break-words text-white">{manifest.createdAt}</strong>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">Commit</span>
              <strong className="mt-1 block break-words text-white">{manifest.commitSha ?? "not available"}</strong>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">Base URL</span>
              <strong className="mt-1 block break-words text-white">{manifest.baseUrl}</strong>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-white/62">
            Public pages only. No admin routes, API routes, private customer data, or authenticated screens are captured.
          </p>
        </header>

        <div className="mt-5 space-y-8">
          {grouped.map(([route, screenshots]) => {
            const label = screenshots[0]?.routeLabel ?? route;

            return (
              <section key={route} className="rounded-[28px] border border-white/10 bg-white/[0.045] p-4 sm:p-5">
                <div className="flex flex-col gap-1 pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-black tracking-normal">{label}</h2>
                    <p className="mt-1 font-mono text-xs text-white/52">{route}</p>
                  </div>
                </div>
                <div className="grid gap-5">
                  {screenshots.map((screenshot) => (
                    <figure
                      key={`${screenshot.routeSlug}-${screenshot.viewport}`}
                      className="overflow-hidden rounded-3xl border border-white/10 bg-black/25"
                    >
                      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-sm">
                        <span className="font-bold text-white">{screenshot.viewport}</span>
                        <span className="rounded-full border border-lime-200/20 bg-lime-200/10 px-3 py-1 text-xs font-bold text-lime-100">
                          {screenshot.width}x{screenshot.height}
                        </span>
                      </figcaption>
                      <img
                        src={screenshot.src}
                        alt={`${label} ${screenshot.viewport} screenshot`}
                        className="block w-full bg-[#05040a]"
                        loading="lazy"
                      />
                    </figure>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
