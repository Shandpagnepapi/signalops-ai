import {
  Camera,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Video
} from "lucide-react";
import {
  AmbientBackground,
  FloatingBadge,
  GlassCard,
  GlassPanel,
  GlowButton
} from "@/components/site/visual-system";
import { getEmailHref, PUBLIC_BRAND_NAME } from "@/lib/constants";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdScript,
  webPageJsonLd
} from "@/lib/seo";
import { visualThemes } from "@/lib/visual-themes";

const theme = visualThemes.envoWarm;
const title = "Local Drone Operator | SignalOpsAI";
const description =
  "Local drone photo and video services for real estate, property, construction, local businesses, and special projects.";

const droneEmailHref = getEmailHref({
  subject: "SignalOpsAI Drone Services Inquiry",
  body:
    "Hi SignalOpsAI, I'm interested in upcoming local drone photo/video services.\n\nProject type:\nLocation:\nTimeline:\nWhat I need captured:\nBest phone/email:"
});

const services = [
  "Aerial property photos",
  "Real estate listing visuals",
  "Roof and property overview photos",
  "Construction progress shots",
  "Local business promo footage",
  "Event/location aerial visuals"
];

export const metadata = createPageMetadata({
  title,
  description,
  path: "/drone",
  absoluteTitle: true
});

export default function DronePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            title,
            description,
            path: "/drone",
            absoluteTitle: true
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Drone", path: "/drone" }
          ])
        ])}
      />
      <div className="overflow-hidden bg-[#05030a] text-white">
        <section className="premium-section min-h-[76vh]">
          <AmbientBackground intensity="strong" theme={theme} />
          <div className="relative mx-auto grid min-h-[76vh] max-w-[1450px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-8 lg:py-14">
            <div>
              <FloatingBadge icon={Clock} theme={theme}>Coming Soon</FloatingBadge>
              <h1 className="mt-5 max-w-4xl text-[2.7rem] font-black leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-7xl">
                Local Drone Operator
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--vs-muted)] sm:text-xl">
                Aerial photo and video services for real estate, property, construction, local businesses, and special projects.
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62">
                Service details are being planned. Share the project type, location, timing, and what you need captured.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <GlowButton className="w-full sm:w-auto" href={droneEmailHref} theme={theme}>
                  Ask About Drone Work
                </GlowButton>
                <GlowButton className="w-full sm:w-auto" href="/envo" icon={false} theme={theme} variant="secondary">
                  Enter Envo
                </GlowButton>
              </div>
            </div>

            <GlassPanel className="cinematic-panel p-4 sm:p-6" theme={theme}>
              <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#08050d]/58 p-4">
                  <div className="relative min-h-[20rem] rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_55%_38%,rgba(255,179,109,0.22),transparent_34%),radial-gradient(circle_at_22%_22%,rgba(255,111,156,0.16),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.018))]">
                    <div className="absolute inset-5 rounded-[1rem] border border-white/10" />
                    <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/28 px-3 py-2 text-xs font-black text-white/72">
                      <MapPin className="size-3.5 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
                      Local projects
                    </div>
                    <div className="absolute right-7 top-20 flex size-20 items-center justify-center rounded-[1.35rem] border border-white/12 bg-white/[0.06] text-[color:var(--vs-accent-3)] shadow-[0_0_42px_var(--vs-glow)]">
                      <Camera className="size-9" aria-hidden="true" />
                    </div>
                    <div className="absolute bottom-8 left-7 right-7 grid gap-2">
                      {["Property overview", "Listing visuals", "Progress shots"].map((item) => (
                        <div key={item} className="rounded-2xl border border-white/10 bg-black/24 px-3 py-2 text-xs font-black text-white/70 backdrop-blur">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <GlassCard className="p-4" theme={theme}>
                    <p className="flex items-center gap-2 text-sm font-black text-white">
                      <Video className="size-4 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
                      Planned service areas
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--vs-muted)]">
                      Property, real estate, construction, local business, event, and special-project aerial visuals.
                    </p>
                  </GlassCard>
                  <GlassCard className="p-4" theme={theme}>
                    <p className="flex items-center gap-2 text-sm font-black text-white">
                      <MessageSquare className="size-4 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
                      Simple next step
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--vs-muted)]">
                      Send the project type, location, timing, and what needs to be captured.
                    </p>
                  </GlassCard>
                </div>
              </div>
            </GlassPanel>
          </div>
        </section>

        <section className="premium-section">
          <AmbientBackground intensity="quiet" theme={theme} />
          <div className="relative mx-auto max-w-[1450px] px-4 pb-14 pt-4 sm:px-6 lg:px-8">
            <GlassPanel className="p-5 sm:p-7" theme={theme}>
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[color:var(--vs-accent-3)]">
                    {PUBLIC_BRAND_NAME} services
                  </p>
                  <h2 className="mt-4 text-4xl font-black tracking-normal text-white sm:text-5xl">
                    Drone services being planned.
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-7 text-[color:var(--vs-muted)]">
                  A simple starting point for asking about upcoming local aerial photo and video work.
                </p>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <GlassCard key={service} className="p-4" hover theme={theme}>
                    <p className="flex items-center gap-3 text-sm font-black text-white">
                      <CheckCircle2 className="size-5 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
                      {service}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </GlassPanel>
          </div>
        </section>
      </div>
    </>
  );
}
