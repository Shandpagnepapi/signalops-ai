import { apexWheelRepair } from "@/lib/mock-data";

export type DemoBusinessKey = "wheel-repair" | "well-water";

export type DemoSelectOption = {
  value: string;
  label: string;
};

export type DemoFormInitialState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  asset: string;
  assetSecondary: string;
  serviceValue: string;
  quantity: string;
  status: "yes" | "no" | "unsure";
  mobile: "yes" | "no" | "unsure";
  photoNote: string;
  description: string;
  preferredTime: string;
};

export type DemoBusinessConfig = {
  key: DemoBusinessKey;
  selectorLabel: string;
  name: string;
  industry: string;
  location: string;
  phone: string;
  heroBadge: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
  heroImage?: {
    src: string;
    alt: string;
  };
  stats: {
    value: string;
    label: string;
  }[];
  trustBadges: string[];
  qualificationPreview: {
    title: string;
    subtitle: string;
    badge: string;
    cards: {
      title: string;
      description: string;
    }[];
  };
  servicesSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  services: {
    title: string;
    description: string;
  }[];
  beforeAfter: {
    eyebrow: string;
    title: string;
    description: string;
    image?: {
      src: string;
      alt: string;
    };
    points: {
      title: string;
      description: string;
    }[];
    visualCards?: {
      label: string;
      value: string;
      description: string;
    }[];
  };
  commonIssues: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  callout: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    noteTitle: string;
    noteDescription: string;
  };
  operationsSection?: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  };
  testimonialsSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  testimonials: {
    quote: string;
    name: string;
    detail: string;
  }[];
  faqSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  leadOpsPanel: {
    badge: string;
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  whySignalOpsPanel: {
    title: string;
    description: string;
    bullets: string[];
  };
  form: {
    source: string;
    badge: string;
    title: string;
    description: string;
    serviceLabel: string;
    serviceOptions: DemoSelectOption[];
    quantityLabel: string;
    locationLabel: string;
    assetLabel: string;
    assetSecondaryLabel: string;
    statusLabel: string;
    statusOptions: DemoSelectOption[];
    mobileLabel: string;
    mobileOptions: DemoSelectOption[];
    photoLabel: string;
    descriptionLabel: string;
    preferredTimeLabel: string;
    submitLabel: string;
    internalNoteLabel: string;
    initial: DemoFormInitialState;
  };
  footerCta: string;
  stickyPrimaryCta: string;
  stickySecondaryCta: string;
};

const wheelServiceOptions: DemoSelectOption[] = [
  { value: "curb-rash", label: "Curb rash / scuffed lip" },
  { value: "bent", label: "Bent wheel / vibration" },
  { value: "cracked", label: "Cracked wheel / air leak" },
  { value: "peeling-clear", label: "Peeling clear coat" },
  { value: "corrosion", label: "Corrosion" },
  { value: "scratches", label: "Scratches" },
  { value: "color-mismatch", label: "Color mismatch / paint match" },
  { value: "refinish", label: "Full refinish or powder coating" }
];

const clearFlowServiceOptions: DemoSelectOption[] = [
  { value: "filter-replacement", label: "Filter replacement" },
  { value: "routine-maintenance", label: "Routine maintenance" },
  { value: "well-pump-issue", label: "Well pump issue" },
  { value: "low-water-pressure", label: "Low water pressure" },
  { value: "water-quality-concern", label: "Water quality concern" },
  { value: "water-testing", label: "Water testing" },
  { value: "emergency-no-water", label: "Emergency no-water issue" },
  { value: "commercial-industrial-project", label: "Commercial/industrial project" },
  { value: "other", label: "Other" }
];

export const demoBusinesses = {
  "wheel-repair": {
    key: "wheel-repair",
    selectorLabel: "Wheel Repair Business",
    name: apexWheelRepair.name,
    industry: "Automotive wheel repair and refinishing",
    location: apexWheelRepair.location,
    phone: apexWheelRepair.phone,
    heroBadge: "Dallas wheel repair + SignalOps AI intake demo",
    headline: apexWheelRepair.headline,
    subheadline: apexWheelRepair.subheadline,
    primaryCta: "Request a quote",
    secondaryCta: "Mobile repair options",
    secondaryHref: "#mobile-repair",
    heroImage: {
      src: "/demo/apex-wheel-hero.png",
      alt: "Premium alloy wheel with Apex Wheel Repair quote triage overlay"
    },
    stats: apexWheelRepair.stats,
    trustBadges: apexWheelRepair.trustBadges,
    qualificationPreview: {
      title: "Quote triage preview",
      subtitle: "What the shop sees after submit",
      badge: "Fast follow-up",
      cards: [
        {
          title: "Curb rash",
          description: "Mobile candidate, request or confirm photos, send quote range."
        },
        {
          title: "Bent or cracked",
          description: "Flag for inspection and human review before promises."
        },
        {
          title: "Refinishing",
          description: "Capture finish, wheel count, and appointment window."
        }
      ]
    },
    servicesSection: {
      eyebrow: "Repair services",
      title: "A wheel repair site should do more than collect a name and phone number.",
      description:
        "Apex captures the damage details that matter: photos, wheel count, drivability, mobile fit, and whether the request needs inspection before anyone quotes repair."
    },
    services: apexWheelRepair.services,
    beforeAfter: {
      eyebrow: "Before / after value",
      title: "Damaged wheels can move from rough first impression to clean, sale-ready finish.",
      description:
        "A polished repair flow does more than make wheels look better. It helps the shop capture photos, set safety expectations, quote the right work, and route the customer to mobile or in-shop service.",
      image: {
        src: "/demo/apex-before-after.png",
        alt: "Before and after alloy wheel restoration preview"
      },
      points: [
        {
          title: "Cosmetic fit",
          description: "Curb rash, scuffs, scratches, peeling clear, and paint mismatch can often be quoted from photos."
        },
        {
          title: "Safety triage",
          description: "Bends, cracks, vibration, and air leaks should be inspected before repair is promised."
        }
      ]
    },
    commonIssues: {
      id: "damage",
      eyebrow: "Common wheel damage",
      title: "Clear damage categories make quote requests easier to sort.",
      description:
        "SignalOps can turn a messy form submission into a cleaner repair path, with special handling for safety-sensitive cases.",
      items: apexWheelRepair.damageTypes
    },
    process: {
      eyebrow: "How it works",
      title: "From photo request to repair route in five steps.",
      steps: apexWheelRepair.process
    },
    callout: {
      id: "mobile-repair",
      eyebrow: "Mobile repair callout",
      title: "Many cosmetic repairs can come to the customer.",
      description:
        "Curb rash, scuffs, scratches, peeling clear coat, and some paint match jobs can often be handled mobile around Dallas. Bent wheels, cracked wheels, air leaks, vibration, or severe impact damage should be reviewed by the shop before any repair path is confirmed.",
      noteTitle: "Safety-first repair note",
      noteDescription:
        "If a wheel is structurally unsafe, Apex recommends replacement instead of repair. The SignalOps workflow should surface that language before a customer receives a promise."
    },
    testimonialsSection: {
      eyebrow: "Customer proof",
      title: "The right intake experience feels fast, honest, and local.",
      description:
        "These testimonials are fictional, but they model the buying moments a wheel repair website should capture: trust, convenience, and clear safety guidance."
    },
    testimonials: apexWheelRepair.testimonials.map((testimonial) => ({
      quote: testimonial.quote,
      name: testimonial.name,
      detail: testimonial.vehicle
    })),
    faqSection: {
      eyebrow: "FAQ",
      title: "Questions drivers ask before they book.",
      description:
        "Answering these questions up front gives the customer confidence and gives SignalOps better signals for intake and routing."
    },
    faqs: apexWheelRepair.faqs,
    leadOpsPanel: {
      badge: "SignalOps demo workflow",
      title: "What would happen in production?",
      description:
        "Normally this would instantly text the customer, request photos if needed, sort the lead, alert the wheel repair team, log the lead in the CRM, and start follow-up.",
      items: [
        {
          title: "Customer text",
          description: "Send photo request or appointment confirmation within seconds."
        },
        {
          title: "Shop alert",
          description: "Notify Apex with priority, urgency, damage type, and safety note."
        },
        {
          title: "CRM logging",
          description: "Create the lead with tags like mobile-request or inspection-required."
        },
        {
          title: "Follow-up",
          description: "Nudge quote requests that do not send photos or book a time."
        }
      ]
    },
    whySignalOpsPanel: {
      title: "Why this sells SignalOps",
      description:
        "A local service business does not just need a prettier form. It needs a lead process that knows what matters.",
      bullets: [
        "Fast response protects high-intent quote requests.",
        "Better intake helps customers send the details the shop needs.",
        "Safety-sensitive cases are flagged before promises are made."
      ]
    },
    form: {
      source: "apex-wheel-repair-demo",
      badge: "SignalOps intake",
      title: "Request a wheel repair quote",
      description:
        "A conversion-focused intake captures the details Apex needs to quote faster and route safety-sensitive work correctly.",
      serviceLabel: "Type of damage",
      serviceOptions: wheelServiceOptions,
      quantityLabel: "Number of wheels damaged",
      locationLabel: "Service area / neighborhood",
      assetLabel: "Vehicle year / make / model",
      assetSecondaryLabel: "Wheel size if known",
      statusLabel: "Is the vehicle drivable?",
      statusOptions: [
        { value: "yes", label: "Yes, it drives normally" },
        { value: "no", label: "No, it is not drivable" },
        { value: "unsure", label: "Unsure / vibration or air loss" }
      ],
      mobileLabel: "Need mobile service?",
      mobileOptions: [
        { value: "yes", label: "Yes, mobile preferred" },
        { value: "no", label: "No, shop visit is fine" },
        { value: "unsure", label: "Not sure yet" }
      ],
      photoLabel: "Photo note or upload details",
      descriptionLabel: "Description",
      preferredTimeLabel: "Preferred appointment time",
      submitLabel: "Priority this repair lead",
      internalNoteLabel: "Internal shop note",
      initial: {
        name: "Avery Stone",
        phone: "(214) 555-0149",
        email: "avery@example.com",
        address: "Uptown Dallas",
        asset: "2022 Tesla Model Y",
        assetSecondary: "20 inch",
        serviceValue: "curb-rash",
        quantity: "2",
        status: "yes",
        mobile: "yes",
        photoNote: "Photos show curb rash on the front passenger wheel and chipped paint on the rear wheel.",
        description: "Looking for a quote and mobile appointment this week if possible.",
        preferredTime: "Tomorrow afternoon"
      }
    },
    footerCta: "Request quote",
    stickyPrimaryCta: "Get quote",
    stickySecondaryCta: "Mobile"
  },
  "well-water": {
    key: "well-water",
    selectorLabel: "Well & Water Service Company",
    name: "ClearFlow Well & Water Services",
    industry: "Well and water processing service",
    location: "Central Alabama",
    phone: "(334) 555-0186",
    heroBadge: "Small well and water service company + SignalOps intake demo",
    headline: "Local well and water service without missed calls or buried follow-ups.",
    subheadline:
      "ClearFlow is a small 3-person operation handling filter changes, pump issues, pressure problems, water testing, routine maintenance, and occasional commercial water system projects.",
    primaryCta: "Request service help",
    secondaryCta: "Why small teams need this",
    secondaryHref: "#small-team",
    stats: [
      {
        value: "1-2",
        label: "jobs per day"
      },
      {
        value: "3",
        label: "person operation"
      },
      {
        value: "Calls + texts",
        label: "current workflow"
      }
    ],
    trustBadges: [
      "Local service team",
      "Emergency issue triage",
      "Routine maintenance support",
      "Commercial project review",
      "Simple follow-up system"
    ],
    qualificationPreview: {
      title: "Service request triage",
      subtitle: "How SignalOps sorts the next callback",
      badge: "Owner-ready notes",
      cards: [
        {
          title: "No water",
          description: "Hot lead, prioritize callback, get address and system details."
        },
        {
          title: "Maintenance",
          description: "Ready service lead, ask system type and offer a service window."
        },
        {
          title: "Commercial",
          description: "Route to owner with scope, location, timeline, and decision-maker notes."
        }
      ]
    },
    servicesSection: {
      eyebrow: "Well and water services",
      title: "A small service company needs intake that separates urgent calls from routine work.",
      description:
        "ClearFlow can keep using calls and texts, while SignalOps captures the details that decide whether a request needs a fast callback, routine scheduling, or owner review."
    },
    services: [
      {
        title: "Well Pump Service",
        description: "Capture no-water, cycling, pressure tank, and pump issue details before the callback."
      },
      {
        title: "Water Filter Replacement",
        description: "Turn routine filter changes into scheduled maintenance instead of scattered text threads."
      },
      {
        title: "Treatment Maintenance",
        description: "Collect system type, last service date, symptoms, and preferred service window."
      },
      {
        title: "Pressure Troubleshooting",
        description: "Separate mild pressure complaints from major pressure loss that needs faster review."
      },
      {
        title: "Water Testing",
        description: "Capture taste, odor, sediment, iron, sulfur, and lab/testing questions clearly."
      },
      {
        title: "Filtration Support",
        description: "Route sediment, iron, sulfur, and filter performance issues to the right next step."
      },
      {
        title: "Routine Maintenance",
        description: "Keep smaller jobs organized so the team can fill the calendar without chasing notes."
      },
      {
        title: "Commercial Water Support",
        description: "Flag larger commercial or industrial opportunities for owner review and scope gathering."
      }
    ],
    beforeAfter: {
      eyebrow: "Before / after workflow",
      title: "The work stays hands-on. The follow-up stops living only in memory and text threads.",
      description:
        "For a low-volume service team, one missed callback can be the job that would have filled tomorrow or the commercial request that deserved owner attention.",
      points: [
        {
          title: "Before SignalOps",
          description: "Calls, texts, quotes, and reminders depend on whoever remembers while the crew is already in the field."
        },
        {
          title: "After SignalOps",
          description: "Every request gets captured, classified, tagged, and placed into the right follow-up path."
        }
      ],
      visualCards: [
        {
          label: "Emergency",
          value: "No water",
          description: "Alert owner and request address, pump details, and current water status."
        },
        {
          label: "Maintenance",
          value: "Filters",
          description: "Ask system type, last service date, and offer a route-friendly time."
        },
        {
          label: "Commercial",
          value: "Large site",
          description: "Collect scope, site location, timeline, and decision-maker details."
        }
      ]
    },
    commonIssues: {
      id: "service-requests",
      eyebrow: "Common service requests",
      title: "Simple categories make the next callback obvious.",
      description:
        "SignalOps helps ClearFlow avoid treating every message the same. Urgent water issues, routine maintenance, and larger project requests need different handling.",
      items: [
        "No water",
        "Well pump issue",
        "Low water pressure",
        "Filter replacement",
        "Water testing",
        "Iron / sulfur odor",
        "Commercial project"
      ]
    },
    process: {
      eyebrow: "How it works",
      title: "From first call or form request to the next practical step.",
      steps: [
        {
          title: "Request Comes In",
          description: "A call, text, form, or DM gets captured with the customer name and contact details."
        },
        {
          title: "Issue Gets Sorted",
          description: "SignalOps identifies emergency, maintenance, testing, pressure, pump, or commercial context."
        },
        {
          title: "Details Are Requested",
          description: "The customer is asked for address, system type, symptoms, and timing if details are missing."
        },
        {
          title: "Owner Gets Alerted",
          description: "Urgent and high-value jobs go to the owner with a short internal note."
        },
        {
          title: "Follow-Up Starts",
          description: "Routine requests and quotes get reminders so opportunities do not disappear."
        }
      ]
    },
    callout: {
      id: "small-team",
      eyebrow: "Small team callout",
      title: "Built around the way ClearFlow already works.",
      description:
        "ClearFlow does not need a complicated CRM to start. SignalOps can wrap a simple intake and follow-up system around calls, texts, forms, and DMs so the team knows who needs a callback and what the customer needs.",
      noteTitle: "Practical service note",
      noteDescription:
        "No-water and major pressure issues should be prioritized for human review. Routine maintenance can be organized into available service windows, while large commercial requests should route to the owner."
    },
    operationsSection: {
      eyebrow: "Why this matters for a small 3-person operation",
      title: "Small teams lose opportunities in the handoff between doing the work and following up.",
      description:
        "When a small team is doing the work, answering calls, texting customers, quoting jobs, and handling follow-ups, it is easy for opportunities to get lost. SignalOps gives the business a simple system that captures every request, separates urgent jobs from routine maintenance, reminds the team who needs follow-up, and keeps bigger opportunities from getting buried in text threads.",
      points: [
        "Missed-call text back",
        "Service request intake form",
        "Emergency lead alert",
        "Maintenance reminder follow-up",
        "Quote follow-up reminders",
        "Commercial project routing",
        "Daily owner brief",
        "Simple lead/status dashboard"
      ]
    },
    testimonialsSection: {
      eyebrow: "Customer proof",
      title: "The best service experience feels local, responsive, and organized.",
      description:
        "These fictional testimonials model the moments a small well and water service business needs to protect: urgent issues, routine maintenance, and bigger project trust."
    },
    testimonials: [
      {
        quote:
          "We had no water that morning and got a quick callback with clear questions. They knew what details mattered before sending someone out.",
        name: "Megan C.",
        detail: "Residential well customer"
      },
      {
        quote:
          "Filter changes used to be something I remembered when water started tasting off. ClearFlow now reminds us before it becomes a problem.",
        name: "Ray T.",
        detail: "Routine maintenance customer"
      },
      {
        quote:
          "For our facility, they gathered site details first and routed it to the owner instead of treating it like a small residential call.",
        name: "Dana P.",
        detail: "Commercial operations manager"
      }
    ],
    faqSection: {
      eyebrow: "FAQ",
      title: "Questions customers ask before ClearFlow calls back.",
      description:
        "Good intake gives a small team the right context without making the customer feel like they are filling out a giant corporate form."
    },
    faqs: [
      {
        question: "Can you help if we have no water?",
        answer:
          "No-water issues should be reviewed quickly. The intake asks for address, current water status, pump or pressure symptoms, and the best callback number."
      },
      {
        question: "Do you handle filter replacement?",
        answer:
          "Yes. Routine filter replacement and treatment maintenance requests are captured with system type, last service date, and preferred timing."
      },
      {
        question: "Can you troubleshoot low water pressure?",
        answer:
          "Yes. The workflow separates mild pressure complaints from major pressure issues so the team can prioritize appropriately."
      },
      {
        question: "Do you offer water testing?",
        answer:
          "Yes. The intake can collect water quality concerns such as sediment, iron, sulfur odor, taste, staining, or routine testing needs."
      },
      {
        question: "Can you handle commercial or industrial projects?",
        answer:
          "Larger projects should route to the owner for review. The system gathers site, scope, timeline, and decision-maker details first."
      },
      {
        question: "Do customers need a CRM for this to work?",
        answer:
          "No. SignalOps can start with calls, texts, forms, and DMs, then create a simple dashboard and follow-up process around the current workflow."
      },
      {
        question: "What happens when a request is vague?",
        answer:
          "The system asks one or two practical follow-up questions and flags the request for human review if it cannot classify the issue safely."
      }
    ],
    leadOpsPanel: {
      badge: "SignalOps demo workflow",
      title: "What would happen in production?",
      description:
        "Normally this would text the customer, ask for missing address or system details, alert the owner on urgent issues, log the lead, and start maintenance or quote follow-up.",
      items: [
        {
          title: "Customer reply",
          description: "Ask for address, system type, current water status, or timing based on the request."
        },
        {
          title: "Owner alert",
          description: "Escalate no-water, major pressure, commercial, and larger project requests."
        },
        {
          title: "Simple dashboard",
          description: "Show new requests, follow-ups due, maintenance opportunities, and quote status."
        },
        {
          title: "Follow-up",
          description: "Remind the team about quotes, filter changes, routine maintenance, and unanswered requests."
        }
      ]
    },
    whySignalOpsPanel: {
      title: "Why this sells SignalOps",
      description:
        "A tiny service team does not need extra admin work. It needs a practical system that keeps opportunities from getting missed while the crew is busy.",
      bullets: [
        "Urgent no-water calls get separated from routine maintenance.",
        "Quote and service follow-ups stop getting buried in text threads.",
        "Large commercial requests get routed to the owner with context."
      ]
    },
    form: {
      source: "clearflow-well-water-demo",
      badge: "SignalOps service intake",
      title: "Request well or water service help",
      description:
        "This intake keeps a small team organized by capturing the issue, urgency, location, system details, and next follow-up step.",
      serviceLabel: "Service needed",
      serviceOptions: clearFlowServiceOptions,
      quantityLabel: "Number of systems / locations",
      locationLabel: "Service address or area",
      assetLabel: "Property / site details",
      assetSecondaryLabel: "System type if known",
      statusLabel: "Is this affecting water service?",
      statusOptions: [
        { value: "no", label: "Emergency: no water or major issue" },
        { value: "unsure", label: "Soon: pressure or system is unreliable" },
        { value: "yes", label: "Water is working / routine request" }
      ],
      mobileLabel: "Need on-site service?",
      mobileOptions: [
        { value: "yes", label: "Yes, on-site service needed" },
        { value: "no", label: "Phone guidance or quote first" },
        { value: "unsure", label: "Not sure yet" }
      ],
      photoLabel: "Photos, notes, or system details",
      descriptionLabel: "Describe the issue",
      preferredTimeLabel: "Preferred service window",
      submitLabel: "Priority this service request",
      internalNoteLabel: "Internal service note",
      initial: {
        name: "Megan Carter",
        phone: "(334) 555-0128",
        email: "megan@example.com",
        address: "Wetumpka, AL - County Road 14",
        asset: "Residential well system at a single-family home",
        assetSecondary: "Pressure tank and sediment filter, pump type unknown",
        serviceValue: "emergency-no-water",
        quantity: "1",
        status: "no",
        mobile: "yes",
        photoNote: "Can send a photo of the pressure tank and filter setup. No visible leaks near the tank.",
        description:
          "We have no water since this morning. The pressure switch clicks but the pump does not seem to build pressure. Need help today if possible.",
        preferredTime: "Today if anyone can call before lunch"
      }
    },
    footerCta: "Request service help",
    stickyPrimaryCta: "Service help",
    stickySecondaryCta: "Small team"
  }
} satisfies Record<DemoBusinessKey, DemoBusinessConfig>;

export const demoBusinessOptions = Object.values(demoBusinesses).map((business) => ({
  value: business.key,
  label: business.selectorLabel
}));

export function getDemoBusiness(key: DemoBusinessKey) {
  return demoBusinesses[key];
}
