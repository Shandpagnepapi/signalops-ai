import {
  Building2,
  Camera,
  Car,
  ClipboardCheck,
  Home,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Video
} from "lucide-react";
import {
  AmbientBackground,
  FloatingBadge,
  GlassCard,
  GlassPanel,
  GlowButton
} from "@/components/site/visual-system";
import { getEmailHref } from "@/lib/constants";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  jsonLdScript
} from "@/lib/seo";
import { visualThemes } from "@/lib/visual-themes";

const theme = visualThemes.envoWarm;

const businessName = "SignalOpsAI Drone Services";
const phoneDisplay = "770-315-6300";
const phoneHref = "tel:+17703156300";
const email = "signalopspro@gmail.com";
const mainCity = "Birmingham, AL";
const serviceAreas = ["Birmingham", "Hoover", "Mountain Brook", "Inverness", "Homewood"];

const title = "FAA Part 107 Drone Operator in Birmingham, AL | SignalOpsAI Drone Services";
const description =
  "SignalOpsAI Drone Services provides local aerial photo and video services in Birmingham, Hoover, Mountain Brook, Inverness, and Homewood. FAA Part 107 drone operator for real estate, property, construction, business, land, event, and vehicle content.";

const askDroneHref = getEmailHref({
  subject: "SignalOpsAI Drone Services Inquiry",
  body:
    "Hi SignalOpsAI Drone Services, I'm interested in local drone photo/video services.\n\nProject type:\nLocation:\nTimeline:\nWhat I need captured:\nBest phone/email:"
});

const bookDroneHref = getEmailHref({
  subject: "Book Drone Shoot",
  body:
    "Hi SignalOpsAI Drone Services, I'd like to book or discuss a drone shoot.\n\nProject type:\nShoot location:\nPreferred date/time:\nShot list or goals:\nBest phone/email:"
});

const serviceCards = [
  {
    copy: "Clean aerial visuals for listings, land, neighborhoods, and property marketing.",
    icon: Home,
    title: "Real Estate Aerial Photos"
  },
  {
    copy: "Aerial roof and property overview photos that help property owners, roofers, and contractors document what is visible from above.",
    icon: Building2,
    title: "Roof & Property Overview Photos"
  },
  {
    copy: "Recurring aerial shots for projects, job sites, progress updates, and client reporting.",
    icon: ClipboardCheck,
    title: "Construction Progress Photos"
  },
  {
    copy: "Short aerial clips and visuals for businesses that want sharper local marketing content.",
    icon: Video,
    title: "Local Business Promo Video"
  },
  {
    copy: "Aerial views for land sellers, builders, investors, and property owners.",
    icon: MapPin,
    title: "Land & Lot Photos"
  },
  {
    copy: "Drone visuals for cars, trucks, outdoor spaces, local events, and promotional content.",
    icon: Car,
    title: "Vehicle & Event Content"
  }
];

const faqs = [
  {
    question: "Do you serve Hoover and Mountain Brook?",
    answer:
      "Yes. SignalOpsAI Drone Services serves Birmingham and nearby areas including Hoover, Mountain Brook, Inverness, and Homewood."
  },
  {
    question: "Are you FAA Part 107 certified?",
    answer:
      "Yes. Commercial drone work is handled by an FAA Part 107 certified remote pilot."
  },
  {
    question: "Do you offer real estate drone photos?",
    answer:
      "Yes. Services can include aerial property photos, land photos, listing visuals, and local business promo footage."
  },
  {
    question: "Do you do roof inspections?",
    answer:
      "We can provide aerial roof and property overview photos. These are visual media services, not a structural inspection report."
  },
  {
    question: "How do I request drone work?",
    answer:
      "Use the contact button to ask about the project, location, timing, and type of shots needed."
  }
];

function droneBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/drone#local-business"),
    name: businessName,
    url: absoluteUrl("/drone"),
    telephone: phoneDisplay,
    email,
    areaServed: serviceAreas.map((area) => ({
      "@type": "Place",
      name: area
    })),
    serviceType: [
      "Drone photography",
      "Aerial photography",
      "Aerial video",
      "Real estate drone photography",
      "Construction progress photography"
    ],
    description,
    knowsAbout: [
      "FAA Part 107 drone operation",
      "Real estate aerial photos",
      "Aerial property photography",
      "Local business promo video",
      "Construction progress photos"
    ]
  };
}

function droneWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/drone#webpage"),
    url: absoluteUrl("/drone"),
    name: title,
    description,
    isPartOf: {
      "@id": absoluteUrl("/#website")
    },
    about: {
      "@id": absoluteUrl("/drone#local-business")
    },
    inLanguage: "en-US"
  };
}

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
          droneWebPageJsonLd(),
          droneBusinessJsonLd(),
          faqPageJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Drone Services", path: "/drone" }
          ])
        ])}
      />
      <div className="overflow-hidden bg-[#05030a] text-white">
        <section className="premium-section min-h-[76vh]">
          <AmbientBackground intensity="strong" theme={theme} />
          <div className="relative mx-auto grid min-h-[76vh] max-w-[1450px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-8 lg:py-14">
            <div>
              <FloatingBadge icon={ShieldCheck} theme={theme}>
                FAA-Certified Remote Pilot
              </FloatingBadge>
              <p className="mt-5 text-sm font-black tracking-normal text-[color:var(--vs-accent-3)]">
                {businessName}
              </p>
              <h1 className="mt-4 max-w-4xl text-[2.55rem] font-black leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-7xl">
                FAA Part 107 Drone Operator in Birmingham, AL
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--vs-muted)] sm:text-xl">
                Local aerial photo and video services for real estate, property, construction, local businesses, land, events, and vehicle content across Birmingham, Hoover, Mountain Brook, Inverness, and Homewood.
              </p>
              <div className="mt-6 grid gap-2 text-sm font-black text-white/78 sm:flex sm:flex-wrap">
                <a className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--vs-accent-2)]" href={phoneHref}>
                  <Phone className="size-4 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
                  {phoneDisplay}
                </a>
                <a className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--vs-accent-2)]" href={`mailto:${email}`}>
                  <Mail className="size-4 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
                  {email}
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <GlowButton className="w-full" href={askDroneHref} theme={theme}>
                  Ask About Drone Work
                </GlowButton>
                <GlowButton className="w-full" href={bookDroneHref} theme={theme} variant="secondary">
                  Book Drone Shoot
                </GlowButton>
              </div>
            </div>

            <DroneHeroVisual />
          </div>
        </section>

        <ServiceAreaSection />
        <ServicesSection />
        <ComplianceSection />
        <FaqSection />
      </div>
    </>
  );
}

function DroneHeroVisual() {
  return (
    <GlassPanel className="cinematic-panel p-4 sm:p-6" theme={theme}>
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#08050d]/58 p-4">
          <div className="relative min-h-[20rem] rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_55%_38%,rgba(255,179,109,0.22),transparent_34%),radial-gradient(circle_at_22%_22%,rgba(255,111,156,0.16),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.018))]">
            <div className="absolute inset-5 rounded-[1rem] border border-white/10" />
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/28 px-3 py-2 text-xs font-black text-white/72">
              <MapPin className="size-3.5 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
              {mainCity}
            </div>
            <div className="absolute right-7 top-20 flex size-20 items-center justify-center rounded-[1.35rem] border border-white/12 bg-white/[0.06] text-[color:var(--vs-accent-3)] shadow-[0_0_42px_var(--vs-glow)]">
              <Camera className="size-9" aria-hidden="true" />
            </div>
            <div className="absolute bottom-8 left-7 right-7 grid gap-2">
              {["FAA Part 107", "Real estate visuals", "Property overview"].map((item) => (
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
              Local aerial photo and video
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--vs-muted)]">
              Premium, practical visuals for properties, projects, businesses, land, events, and vehicles.
            </p>
          </GlassCard>
          <GlassCard className="p-4" theme={theme}>
            <p className="flex items-center gap-2 text-sm font-black text-white">
              <ShieldCheck className="size-4 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
              FAA Part 107 Drone Operator
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--vs-muted)]">
              Flights are planned around weather, airspace, location, safety, and project needs.
            </p>
          </GlassCard>
        </div>
      </div>
    </GlassPanel>
  );
}

function ServiceAreaSection() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-10 sm:px-6 lg:px-8">
        <GlassPanel className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center" theme={theme}>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[color:var(--vs-accent-3)]">
              Birmingham area
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-white sm:text-5xl">
              Drone services across the Birmingham area
            </h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
              Based around Birmingham and serving nearby areas including Hoover, Mountain Brook, Inverness, and Homewood.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area) => (
              <GlassCard key={area} className="p-4" hover theme={theme}>
                <p className="flex items-center gap-2 text-sm font-black text-white">
                  <MapPin className="size-4 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
                  {area}
                </p>
              </GlassCard>
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-7 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[color:var(--vs-accent-3)]">
            Aerial services
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-normal text-white sm:text-5xl">
            Premium local visuals without the fluff.
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((service) => {
            const Icon = service.icon;

            return (
              <GlassCard key={service.title} className="p-5" hover theme={theme}>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[image:var(--vs-button-gradient)] text-white shadow-[0_0_28px_var(--vs-glow)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-black text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--vs-muted)]">{service.copy}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComplianceSection() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-10 sm:px-6 lg:px-8">
        <GlassPanel className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" theme={theme}>
          <div>
            <FloatingBadge icon={ShieldCheck} theme={theme}>
              FAA Part 107
            </FloatingBadge>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-white sm:text-5xl">
              Licensed for commercial drone work
            </h2>
          </div>
          <p className="text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
            Commercial drone flights are handled by an FAA Part 107 certified remote pilot. Flights are planned around weather, airspace, location, safety, and project needs.
          </p>
        </GlassPanel>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[color:var(--vs-accent-3)]">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-white sm:text-5xl">
              Simple answers before a shoot.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <GlassCard key={faq.question} className="p-5" theme={theme}>
                <details className="group">
                  <summary className="cursor-pointer list-none text-base font-black text-white">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--vs-muted)]">{faq.answer}</p>
                </details>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
