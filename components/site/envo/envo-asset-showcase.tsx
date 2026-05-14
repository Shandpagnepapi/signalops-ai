import type { ReactNode } from "react";
import {
  EnvoAppIcon,
  EnvoFeatureStack,
  EnvoGlassCard,
  EnvoLogo,
  EnvoLogoVariationsRow,
  EnvoMark,
  EnvoSignatureCard
} from "@/components/site/envo/envo-brand";
import {
  EnvoBrandBoardReference,
  EnvoDashboardDesktopMockup,
  EnvoDashboardMobileMockup,
  EnvoLeadWorkflowVisual,
  EnvoOgImageMockup,
  EnvoOwnerCommandCenterMockup,
  EnvoPreviewCockpitMockup
} from "@/components/site/envo/envo-dashboard-mockups";

const showcaseItems = [
  {
    name: "envo-logo-primary",
    title: "Envo logo primary",
    width: 760,
    render: <LogoTile><EnvoLogo size="hero" /></LogoTile>
  },
  {
    name: "envo-logo-dark",
    title: "Envo logo dark",
    width: 760,
    render: <LogoTile dark><EnvoLogo size="hero" tone="dark" /></LogoTile>
  },
  {
    name: "envo-mark-gradient",
    title: "Envo mark gradient",
    width: 420,
    render: <LogoTile><EnvoMark className="h-36 w-52" /></LogoTile>
  },
  {
    name: "envo-app-icon",
    title: "Envo app icon",
    width: 520,
    render: <ExportPad><EnvoAppIcon className="w-80" /></ExportPad>
  },
  {
    name: "envo-signature-card",
    title: "Envo signature card",
    width: 820,
    render: <EnvoSignatureCard />
  },
  {
    name: "envo-feature-stack-reference",
    title: "Envo feature stack",
    width: 720,
    render: <ExportPad><EnvoFeatureStack className="w-full max-w-[38rem]" panel /></ExportPad>
  },
  {
    name: "envo-logo-variations-row",
    title: "Envo logo variations row",
    width: 1320,
    render: <EnvoLogoVariationsRow />
  },
  {
    name: "envo-dashboard-desktop",
    title: "Envo dashboard desktop",
    width: 1360,
    render: <EnvoDashboardDesktopMockup />
  },
  {
    name: "envo-dashboard-mobile",
    title: "Envo dashboard mobile",
    width: 520,
    render: <ExportPad><EnvoDashboardMobileMockup /></ExportPad>
  },
  {
    name: "envo-owner-command-center",
    title: "Envo owner command center",
    width: 760,
    render: <EnvoOwnerCommandCenterMockup />
  },
  {
    name: "envo-lead-workflow",
    title: "Envo lead workflow",
    width: 1320,
    render: <EnvoLeadWorkflowVisual />
  },
  {
    name: "envo-preview-cockpit",
    title: "Envo preview cockpit",
    width: 1120,
    render: <EnvoPreviewCockpitMockup />
  },
  {
    name: "envo-og-image",
    title: "Envo OG image",
    width: 1200,
    render: <EnvoOgImageMockup />
  },
  {
    name: "envo-brand-board-reference",
    title: "Envo brand board reference",
    width: 1400,
    render: <EnvoBrandBoardReference />
  }
] as const;

export function EnvoAssetShowcase() {
  return (
    <div className="min-h-screen bg-[#F8FAFF] px-6 py-10 text-[#071126]">
      <div className="mx-auto max-w-[92rem]">
        <header className="mb-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2563EB]">Internal asset system</p>
          <h1 className="mt-3 text-4xl font-black tracking-normal">Clean Envo export components</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#647084]">
            This internal page renders code-built Envo visuals for screenshot export. These are native SVG, React, and Tailwind components, not cropped reference sheets.
          </p>
        </header>

        <div className="grid gap-10">
          {showcaseItems.map((item) => (
            <section key={item.name} className="overflow-x-auto rounded-[1.5rem] border border-[#D8E2F7] bg-white p-5 shadow-[0_18px_64px_rgba(7,17,38,0.08)]">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-black">{item.title}</h2>
                <code className="rounded-full bg-[#EAF1FF] px-3 py-1 text-xs font-black text-[#2563EB]">
                  {item.name}
                </code>
              </div>
              <div
                data-envo-export={item.name}
                style={{ width: item.width }}
              >
                {item.render}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExportPad({ children }: { children: ReactNode }) {
  return (
    <EnvoGlassCard className="flex min-h-[28rem] items-center justify-center bg-[#FBFAF7] p-12">
      {children}
    </EnvoGlassCard>
  );
}

function LogoTile({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={dark ? "rounded-[1.5rem] bg-[#071126] p-12" : "rounded-[1.5rem] bg-white p-12"}>
      <div className="flex min-h-40 items-center justify-center">{children}</div>
    </div>
  );
}
