import {
  EnvoBrandBoard,
  EnvoSection,
} from "@/components/site/envo/envo-brand";

export { EnvoAssetShowcase } from "@/components/site/envo/envo-asset-showcase";
export {
  EnvoBrandBoardReference,
  EnvoDashboardDesktopMockup,
  EnvoDashboardMobileMockup,
  EnvoLeadWorkflowVisual,
  EnvoOgImageMockup,
  EnvoOwnerCommandCenterMockup,
  EnvoPreviewCockpitMockup
} from "@/components/site/envo/envo-dashboard-mockups";
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
  EnvoLogoVariant,
  EnvoMark,
  EnvoMarkVariant,
  EnvoSection,
  EnvoSectionShell,
  EnvoSignatureCard,
  EnvoWordmark,
  envoBrandTokens,
  envoFeatureItems,
  type EnvoMarkVariantName
} from "@/components/site/envo/envo-brand";
