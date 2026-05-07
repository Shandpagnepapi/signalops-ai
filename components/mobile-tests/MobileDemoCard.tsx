import { CheckCircle2, MessageCircle, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

type DemoVariant = "command" | "clean" | "kinetic";

type DemoMessage = {
  from: string;
  text: string;
  tone?: "customer" | "ai" | "team";
};

type DemoMetric = {
  label: string;
  value: string;
  detail?: string;
};

const demoVariant = {
  command: {
    shell: "border-white/10 bg-[#101719] text-white shadow-black/30",
    header: "border-white/10",
    pill: "border-[#69e6bd]/30 bg-[#69e6bd]/12 text-[#bfffe8]",
    metric: "border-white/10 bg-white/[0.055]",
    metricValue: "text-[#69e6bd]",
    messageBase: "border-white/10 bg-white/[0.055]",
    messageAi: "border-[#69e6bd]/28 bg-[#69e6bd]/12",
    messageTeam: "border-[#ffb84d]/28 bg-[#ffb84d]/12",
    progress: "bg-[#69e6bd]"
  },
  clean: {
    shell: "border-[#17202a]/10 bg-white text-[#17202a] shadow-[#17202a]/10",
    header: "border-[#17202a]/10",
    pill: "border-[#0f766e]/22 bg-[#e4fbf5] text-[#0f4f49]",
    metric: "border-[#17202a]/10 bg-[#f7f3ec]",
    metricValue: "text-[#0f766e]",
    messageBase: "border-[#17202a]/10 bg-[#f7f3ec]",
    messageAi: "border-[#0f766e]/22 bg-[#e4fbf5]",
    messageTeam: "border-[#f59e0b]/26 bg-[#fff3d7]",
    progress: "bg-[#0f766e]"
  },
  kinetic: {
    shell: "border-white/12 bg-[#111111] text-white shadow-black/35",
    header: "border-white/12",
    pill: "border-[#e6ff5b]/34 bg-[#e6ff5b]/14 text-[#f6ffc2]",
    metric: "border-white/12 bg-white/[0.06]",
    metricValue: "text-[#e6ff5b]",
    messageBase: "border-white/12 bg-white/[0.06]",
    messageAi: "border-[#00c2ff]/34 bg-[#00c2ff]/12",
    messageTeam: "border-[#ff4d73]/36 bg-[#ff4d73]/12",
    progress: "bg-[#e6ff5b]"
  }
} satisfies Record<
  DemoVariant,
  {
    shell: string;
    header: string;
    pill: string;
    metric: string;
    metricValue: string;
    messageBase: string;
    messageAi: string;
    messageTeam: string;
    progress: string;
  }
>;

export function MobileDemoCard({
  accentLabel,
  className,
  industry,
  messages,
  metrics,
  progress = 76,
  subtitle,
  title,
  variant = "command"
}: {
  accentLabel: string;
  className?: string;
  industry: string;
  messages: DemoMessage[];
  metrics: DemoMetric[];
  progress?: number;
  subtitle: string;
  title: string;
  variant?: DemoVariant;
}) {
  const styles = demoVariant[variant];

  return (
    <div className={cn("rounded-lg border p-3 shadow-2xl backdrop-blur", styles.shell, className)}>
      <div className={cn("border-b pb-3", styles.header)}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold leading-5">{title}</p>
            <p className="mt-1 text-xs leading-5 opacity-60">{subtitle}</p>
          </div>
          <span className={cn("shrink-0 rounded-md border px-2 py-1 text-[0.62rem] font-bold", styles.pill)}>
            {accentLabel}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs opacity-70">
          <PhoneCall className="size-3.5" aria-hidden="true" />
          <span>{industry}</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {metrics.map((metric) => (
          <div key={metric.label} className={cn("rounded-md border p-2", styles.metric)}>
            <p className="text-[0.62rem] font-semibold uppercase leading-4 opacity-50">{metric.label}</p>
            <p className={cn("mt-1 text-lg font-bold leading-6", styles.metricValue)}>{metric.value}</p>
            {metric.detail ? <p className="mt-1 text-[0.62rem] leading-4 opacity-60">{metric.detail}</p> : null}
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {messages.map((message) => (
          <div
            key={`${message.from}-${message.text}`}
            className={cn(
              "rounded-md border p-3",
              message.tone === "ai"
                ? styles.messageAi
                : message.tone === "team"
                  ? styles.messageTeam
                  : styles.messageBase
            )}
          >
            <div className="mb-1 flex items-center gap-1.5 text-[0.62rem] font-bold uppercase opacity-60">
              {message.tone === "ai" ? (
                <CheckCircle2 className="size-3" aria-hidden="true" />
              ) : (
                <MessageCircle className="size-3" aria-hidden="true" />
              )}
              {message.from}
            </div>
            <p className="text-xs leading-5 opacity-80">{message.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <div className="flex justify-between text-[0.62rem] font-semibold uppercase opacity-50">
          <span>Booking handoff</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10">
          <div className={cn("h-full rounded-full", styles.progress)} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
