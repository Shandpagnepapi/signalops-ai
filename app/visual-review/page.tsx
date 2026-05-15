/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

type VisualReviewScreenshot = {
  route: string;
  routeSlug: string;
  routeLabel: string;
  group?: string;
  viewport: string;
  width: number;
  height: number;
  kind?: "full" | "viewport" | "segment";
  scrollY?: number;
  segmentIndex?: number;
  fileName: string;
  src: string;
};

type VisualReviewContactSheet = {
  label: string;
  fileName: string;
  src: string;
  routes: string[];
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
  contactSheets?: VisualReviewContactSheet[];
  screenshots: VisualReviewScreenshot[];
  issues?: string[];
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

function getCurrentCommit() {
  try {
    return execFileSync("git", ["rev-parse", "--short", "HEAD"], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
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

function screenshotLabel(screenshot: VisualReviewScreenshot) {
  if (screenshot.kind === "segment") {
    return `${screenshot.viewport} segment ${screenshot.segmentIndex ?? 0} @ ${screenshot.scrollY ?? 0}px`;
  }

  return `${screenshot.viewport} ${screenshot.kind ?? "screenshot"}`;
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

  const currentCommit = getCurrentCommit();
  const isStale = Boolean(currentCommit && manifest.commitSha && currentCommit !== manifest.commitSha);
  const grouped = groupScreenshots(manifest.screenshots);

  return (
    <main id="top" className="min-h-screen bg-[#090611] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-200">SignalOps Visual Review</p>
          <h1 className="mt-3 text-4xl font-black tracking-normal sm:text-6xl">Latest public-site screenshots</h1>
          <div className="mt-5 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
            <InfoTile label="Created" value={manifest.createdAt} />
            <InfoTile label="Manifest commit" value={manifest.commitSha ?? "not available"} />
            <InfoTile label="Current commit" value={currentCommit ?? "not available"} />
            <InfoTile label="Base URL" value={manifest.baseUrl} />
            <InfoTile label="Routes" value={String(manifest.routes.length)} />
            <InfoTile label="Screenshots" value={String(manifest.screenshots.length)} />
          </div>
          {isStale ? (
            <div className="mt-5 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
              Screenshot manifest is stale. Regenerate visual review screenshots because the manifest commit does not match the current commit.
            </div>
          ) : null}
          {manifest.issues?.length ? (
            <div className="mt-5 rounded-2xl border border-red-300/25 bg-red-300/10 p-4 text-sm leading-6 text-red-100">
              <strong className="font-black">Captured issues:</strong> {manifest.issues.length}. Check the manifest for details.
            </div>
          ) : null}
          <p className="mt-5 max-w-3xl text-sm leading-6 text-white/62">
            Public pages only. Contact sheets are shown first, followed by full-page, viewport, and scroll segment screenshots with direct open links.
          </p>
        </header>

        <nav className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.045] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-200">Route jumps</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {grouped.map(([route, screenshots]) => (
              <a
                key={route}
                href={`#${screenshots[0]?.routeSlug ?? route.replace(/\W+/g, "-")}`}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {route}
              </a>
            ))}
          </div>
        </nav>

        {manifest.contactSheets?.length ? (
          <section className="mt-5 rounded-[28px] border border-lime-200/15 bg-lime-200/[0.045] p-4 sm:p-5">
            <div className="pb-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-lime-200">Contact sheets</p>
              <h2 className="mt-2 text-2xl font-black tracking-normal">Review these first</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/62">
                These images combine viewport screenshots into route-family sheets for fast human review.
              </p>
            </div>
            <div className="grid gap-5">
              {manifest.contactSheets.map((sheet) => (
                <figure key={sheet.fileName} className="overflow-hidden rounded-3xl border border-white/10 bg-black/25">
                  <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-sm">
                    <span className="font-bold text-white">{sheet.label}</span>
                    <a className="font-mono text-xs text-lime-100 underline-offset-4 hover:underline" href={sheet.src} target="_blank">
                      Open {sheet.fileName}
                    </a>
                  </figcaption>
                  <a href={sheet.src} target="_blank">
                    <img
                      src={sheet.src}
                      alt={`${sheet.label} visual review contact sheet`}
                      className="block w-full bg-[#05040a]"
                    />
                  </a>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-5 space-y-8">
          {grouped.map(([route, screenshots]) => {
            const label = screenshots[0]?.routeLabel ?? route;
            const routeSlug = screenshots[0]?.routeSlug ?? route.replace(/\W+/g, "-");

            return (
              <section id={routeSlug} key={route} className="scroll-mt-6 rounded-[28px] border border-white/10 bg-white/[0.045] p-4 sm:p-5">
                <div className="flex flex-col gap-1 pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-black tracking-normal">{label}</h2>
                    <p className="mt-1 font-mono text-xs text-white/52">{route}</p>
                  </div>
                  <a className="text-xs font-bold text-lime-100 underline-offset-4 hover:underline" href="#top">
                    Back to top
                  </a>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {screenshots.map((screenshot) => (
                    <figure
                      key={`${screenshot.routeSlug}-${screenshot.viewport}-${screenshot.kind}-${screenshot.segmentIndex ?? "x"}`}
                      className="overflow-hidden rounded-3xl border border-white/10 bg-black/25"
                    >
                      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-sm">
                        <span className="font-bold text-white">{screenshotLabel(screenshot)}</span>
                        <a className="rounded-full border border-lime-200/20 bg-lime-200/10 px-3 py-1 text-xs font-bold text-lime-100 hover:bg-lime-200/15" href={screenshot.src} target="_blank">
                          Open
                        </a>
                      </figcaption>
                      <a href={screenshot.src} target="_blank">
                        <img
                          src={screenshot.src}
                          alt={`${label} ${screenshotLabel(screenshot)} screenshot`}
                          className="block w-full bg-[#05040a]"
                          loading="lazy"
                        />
                      </a>
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

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
      <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">{label}</span>
      <strong className="mt-1 block break-words text-white">{value}</strong>
    </div>
  );
}
