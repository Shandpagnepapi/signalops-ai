import {
  EnvoBrandBoard,
  EnvoSection,
} from "@/components/site/envo/envo-brand";
import { cn } from "@/lib/utils";

export function EnvoMiniBrandBoard({ className }: { className?: string }) {
  return (
    <EnvoSection className={cn("border-y border-[#D8E2F7] bg-[#FBFAF7]", className)}>
      <div className="mx-auto max-w-6xl">
        <EnvoBrandBoard />
      </div>
    </EnvoSection>
  );
}

export {
  EnvoAppIcon,
  EnvoBrandBoard,
  EnvoBrandHero,
  EnvoButton,
  EnvoCtaButton,
  EnvoDarkCard,
  EnvoFeatureItem,
  EnvoFeaturePanel,
  EnvoFeaturePill,
  EnvoFeatureStack,
  EnvoGlassCard,
  EnvoHeroSection,
  EnvoLogo,
  EnvoMark,
  EnvoSection,
  EnvoSectionShell,
  EnvoWordmark,
  envoBrandTokens,
  envoFeatureItems
} from "@/components/site/envo/envo-brand";
