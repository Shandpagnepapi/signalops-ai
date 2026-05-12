import type { LucideIcon } from "lucide-react";
import {
  Facebook,
  Instagram,
  Mail,
  MessageSquareText,
  Phone,
  SearchCheck,
  Smartphone,
  SquareMousePointer
} from "lucide-react";
import {
  FloatingBadge,
  LeadSourceTile
} from "@/components/site/visual-system";
import { visualThemes } from "@/lib/visual-themes";

const theme = visualThemes.envoWarm;

const leadSources = [
  { icon: Phone, label: "Phone" },
  { icon: Smartphone, label: "SMS" },
  { icon: MessageSquareText, label: "Web Chat" },
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: SearchCheck, label: "Google" },
  { icon: Mail, label: "Email" },
  { icon: SquareMousePointer, label: "Website Forms" }
] satisfies Array<{ icon: LucideIcon; label: string }>;

export function EnvoLeadSources() {
  return (
    <section className="premium-section">
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <FloatingBadge theme={theme}>Lead source coverage</FloatingBadge>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-normal text-white sm:text-5xl">
              Works where your leads come from.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--vs-muted)]">
            Envo can sit across the messy first mile of an AI front desk: calls, texts, forms, DMs, email, and booking
            requests that usually arrive while the team is busy.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
          {leadSources.map((source) => (
            <LeadSourceTile key={source.label} icon={source.icon} label={source.label} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}
