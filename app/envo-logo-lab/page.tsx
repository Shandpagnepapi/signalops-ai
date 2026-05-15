import type { Metadata } from "next";
import {
  EnvoLogo,
  EnvoLogoVariant,
  EnvoMark,
  EnvoMarkVariant,
  EnvoWordmark,
  type EnvoMarkVariantName
} from "@/components/site/envo/envo-brand";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Envo Logo Lab | SignalOpsAI",
  description: "Private Envo mark refinement comparison page.",
  robots: {
    follow: false,
    index: false
  }
};

type LogoOption =
  | {
      description: string;
      key: "current";
      label: string;
      recommendation?: never;
      variant?: never;
    }
  | {
      description: string;
      key: EnvoMarkVariantName;
      label: string;
      recommendation?: string;
      variant: EnvoMarkVariantName;
    };

const logoOptions: LogoOption[] = [
  {
    key: "current",
    label: "Current production mark",
    description: "Active production mark now used by the site. It should match Variant B."
  },
  {
    key: "a",
    label: "Variant A - Detached motion dashes",
    description: "Three short rounded dashes sit slightly left of the bubble without touching it.",
    variant: "a"
  },
  {
    key: "b",
    label: "Variant B - Floating pill bars",
    description: "Two to three compact pills create a softer staggered motion cue.",
    recommendation: "Selected production mark.",
    variant: "b"
  },
  {
    key: "c",
    label: "Variant C - Dot-to-dash motion accents",
    description: "A small dot plus two dashes gives the mark a cleaner motion read.",
    variant: "c"
  },
  {
    key: "d",
    label: "Variant D - Minimal pulse/spark accents",
    description: "A restrained pulse cluster keeps the left side active while feeling quieter.",
    variant: "d"
  }
];

function MarkPreview({
  option,
  className,
  idPrefix
}: {
  className?: string;
  idPrefix: string;
  option: LogoOption;
}) {
  if (option.key === "current") {
    return <EnvoMark className={className} />;
  }

  return <EnvoMarkVariant className={className} idPrefix={idPrefix} variant={option.variant} />;
}

function LogoPreview({
  option,
  tone
}: {
  option: LogoOption;
  tone?: "dark" | "light";
}) {
  if (option.key === "current") {
    return <EnvoLogo size="lg" tone={tone} />;
  }

  return <EnvoLogoVariant size="lg" tone={tone} variant={option.variant} />;
}

function SmallSizePreview({ option }: { option: LogoOption }) {
  const sizes = [
    { label: "24px", markClassName: "h-6 w-[2.2rem]" },
    { label: "32px", markClassName: "h-8 w-[2.9rem]" },
    { label: "48px", markClassName: "h-12 w-[4.3rem]" },
    { label: "96px", markClassName: "h-24 w-[8.7rem]" }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {sizes.map((size) => (
        <div
          className="grid min-h-36 grid-rows-[1fr_auto] gap-3 rounded-2xl border border-[#DCE6F8] bg-white/86 p-3 shadow-[0_18px_45px_rgba(37,99,235,0.08)]"
          key={size.label}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="flex min-h-20 items-center justify-center rounded-xl bg-white">
              <MarkPreview className={size.markClassName} idPrefix={`${option.key}-${size.label}-light`} option={option} />
            </div>
            <div className="flex min-h-20 items-center justify-center rounded-xl bg-[#071126]">
              <MarkPreview className={size.markClassName} idPrefix={`${option.key}-${size.label}-dark`} option={option} />
            </div>
          </div>
          <span className="text-center text-xs font-semibold text-[#647084]">{size.label}</span>
        </div>
      ))}
    </div>
  );
}

function OptionCard({ option }: { option: LogoOption }) {
  return (
    <section
      className={cn(
        "rounded-[2rem] border border-[#DCE6F8] bg-white/88 p-5 shadow-[0_24px_80px_rgba(37,99,235,0.11)] backdrop-blur-2xl",
        option.key === "b" && "ring-2 ring-[#328BFF]/25"
      )}
    >
      <div className="mb-5 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-semibold tracking-normal text-[#071126]">{option.label}</h2>
          {option.key === "b" ? (
            <span className="rounded-full border border-[#C8D8FF] bg-[#EAF1FF] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB]">
              Active default
            </span>
          ) : null}
        </div>
        <p className="max-w-3xl text-sm leading-6 text-[#647084]">{option.description}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1.2fr]">
        <div className="rounded-3xl border border-[#E3EAF8] bg-[#FBFAF7] p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#647084]">Icon on white</p>
          <div className="flex min-h-40 items-center justify-center rounded-2xl bg-white shadow-inner">
            <MarkPreview className="h-28 w-[10.2rem]" idPrefix={`${option.key}-white`} option={option} />
          </div>
        </div>

        <div className="rounded-3xl border border-[#101C38] bg-[#071126] p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/58">Icon on dark navy</p>
          <div className="flex min-h-40 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_35%_15%,rgba(50,139,255,0.2),transparent_34%),#0B1024]">
            <MarkPreview className="h-28 w-[10.2rem]" idPrefix={`${option.key}-dark`} option={option} />
          </div>
        </div>

        <div className="rounded-3xl border border-[#E3EAF8] bg-white p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#647084]">Full logo lockup</p>
          <div className="flex min-h-40 items-center justify-center rounded-2xl bg-[#FBFAF7] px-4">
            <LogoPreview option={option} />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-[#E3EAF8] bg-[#F8FAFF] p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#647084]">Small-size check</p>
        <SmallSizePreview option={option} />
      </div>
    </section>
  );
}

export default function EnvoLogoLabPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFF] px-4 py-10 text-[#071126] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-[#DCE6F8] bg-white/84 p-6 text-center shadow-[0_24px_80px_rgba(37,99,235,0.1)] backdrop-blur-2xl sm:p-8">
          <div className="mx-auto mb-5 flex w-fit items-center justify-center gap-3 rounded-full border border-[#DCE6F8] bg-[#FBFAF7] px-4 py-2">
            <EnvoMark className="h-8 w-12" />
            <EnvoWordmark className="text-2xl" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#647084]">Private logo refinement test</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-[#071126] sm:text-5xl">
            Envo mark left-accent comparison
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#647084]">
            Variant B is now the active production mark. This page keeps the earlier options isolated for comparison while the main Envo bubble and lowercase-e structure stay intact.
          </p>
        </header>

        <div className="grid gap-5">
          {logoOptions.map((option) => (
            <OptionCard key={option.key} option={option} />
          ))}
        </div>

        <section className="rounded-[2rem] border border-[#BFD1F5] bg-[#071126] p-6 text-white shadow-[0_28px_90px_rgba(7,17,38,0.26)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#95B9FF]">Best option for production</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal">Variant B - Floating pill bars</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/72">
            Variant B is the best production fit because the floating pill bars keep the speed cue while leaving clean space around the bubble. It feels calmer, more premium, and still reads clearly at 24px, 32px, 48px, and 96px.
          </p>
        </section>
      </div>
    </main>
  );
}
