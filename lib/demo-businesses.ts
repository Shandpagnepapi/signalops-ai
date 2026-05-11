import { routeWashFleetCare } from "@/lib/mock-data";

export type DemoBusinessKey = "fleet-wash" | "well-water";

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

const fleetWashServiceOptions: DemoSelectOption[] = [
  { value: "mobile-fleet-washing", label: "Mobile fleet washing" },
  { value: "recurring-wash-plan", label: "Recurring wash plan" },
  { value: "service-van-washing", label: "Service van washing" },
  { value: "box-truck-washing", label: "Box truck washing" },
  { value: "dealership-lot-refresh", label: "Dealership lot refresh" },
  { value: "route-based-scheduling", label: "Route-based scheduling" },
  { value: "interior-wipe-down", label: "Interior wipe-down add-on" },
  { value: "other", label: "Other fleet wash request" }
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
  "fleet-wash": {
    key: "fleet-wash",
    selectorLabel: "Mobile Fleet Wash Business",
    name: routeWashFleetCare.name,
    industry: "Mobile fleet washing and recurring fleet care",
    location: routeWashFleetCare.location,
    phone: routeWashFleetCare.phone,
    heroBadge: "DFW mobile fleet wash + SignalOps intake demo",
    headline: routeWashFleetCare.headline,
    subheadline: routeWashFleetCare.subheadline,
    primaryCta: "Request Fleet Quote",
    secondaryCta: "View Service Plans",
    secondaryHref: "#service-plans",
    stats: routeWashFleetCare.stats,
    trustBadges: routeWashFleetCare.trustBadges,
    qualificationPreview: {
      title: "Fleet account preview",
      subtitle: "What the owner sees after submit",
      badge: "Route-ready",
      cards: [
        {
          title: "Fleet size",
          description: "28 vehicles, two locations, and service area captured."
        },
        {
          title: "Recurring plan",
          description: "Biweekly wash cadence with after-hours preference."
        },
        {
          title: "Owner handoff",
          description: "Account summary, next action, and follow-up plan ready."
        }
      ]
    },
    servicesSection: {
      eyebrow: "Fleet wash services",
      title: "A fleet wash site should collect the account details before the quote call.",
      description:
        "RouteWash captures fleet size, vehicle types, locations, service frequency, preferred wash windows, water access, and site requirements so the owner can prepare a better account path."
    },
    services: routeWashFleetCare.services,
    beforeAfter: {
      eyebrow: "Account value",
      title: "Fleet quote requests can become recurring account opportunities.",
      description:
        "A premium intake flow does more than collect a name and phone number. It packages route, timing, site, and service details so RouteWash can move faster on accounts that fit.",
      points: [
        {
          title: "Recurring fit",
          description: "Biweekly, monthly, and route-based requests are separated from one-time price shoppers."
        },
        {
          title: "Route clarity",
          description: "Locations, service windows, vehicle mix, water access, and site notes are collected before owner handoff."
        }
      ],
      visualCards: [
        {
          label: "Fleet size",
          value: "28",
          description: "service vans"
        },
        {
          label: "Locations",
          value: "2",
          description: "DFW service sites"
        },
        {
          label: "Frequency",
          value: "Biweekly",
          description: "recurring account"
        }
      ]
    },
    commonIssues: {
      id: "fleet-types",
      eyebrow: "Fleet types served",
      title: "Different fleets need different intake paths.",
      description:
        "SignalOps can turn a messy quote request into a cleaner account handoff for delivery, service, dealership, rental, and company vehicle fleets.",
      items: routeWashFleetCare.fleetTypes
    },
    process: {
      eyebrow: "How it works",
      title: "From fleet quote request to route-friendly account handoff.",
      steps: routeWashFleetCare.process
    },
    callout: {
      id: "service-plans",
      eyebrow: "Recurring account callout",
      title: "Recurring wash plans need clean account intake.",
      description:
        "Fleet size, vehicle types, service locations, frequency, preferred wash window, and site notes help RouteWash prepare a quote without endless back-and-forth.",
      noteTitle: "Site requirement note",
      noteDescription:
        "The intake can collect water access, parking, timing, and local site requirements, but the team should confirm final service setup before promising a specific operating approach."
    },
    testimonialsSection: {
      eyebrow: "Account proof",
      title: "The right intake experience feels organized, commercial, and easy to act on.",
      description:
        "These fictional examples model the buying moments a fleet wash site should capture: timing, route fit, account value, and clear next steps."
    },
    testimonials: routeWashFleetCare.testimonials.map((testimonial) => ({
      quote: testimonial.quote,
      name: testimonial.name,
      detail: testimonial.vehicle
    })),
    faqSection: {
      eyebrow: "FAQ",
      title: "Questions fleet managers ask before they request service.",
      description:
        "Answering these questions up front gives the buyer confidence and gives SignalOps better signals for intake, routing, and follow-up."
    },
    faqs: routeWashFleetCare.faqs,
    leadOpsPanel: {
      badge: "SignalOps demo workflow",
      title: "What would happen in production?",
      description:
        "Normally this would reply quickly, collect fleet details, alert the owner, log the account opportunity, and start quote follow-up.",
      items: [
        {
          title: "Customer reply",
          description: "Ask for fleet size, vehicle types, locations, frequency, and wash window."
        },
        {
          title: "Owner alert",
          description: "Send RouteWash a recurring account summary with priority and next action."
        },
        {
          title: "CRM logging",
          description: "Create the lead with tags like recurring-account, after-hours, or route-ready."
        },
        {
          title: "Follow-up",
          description: "Nudge quote requests that have not confirmed site details or a service window."
        }
      ]
    },
    whySignalOpsPanel: {
      title: "Why this sells SignalOps",
      description:
        "A local service business does not just need a prettier form. It needs a lead process that knows what matters.",
      bullets: [
        "Fast response protects high-intent fleet quote requests.",
        "Better intake helps customers share the account details the owner needs.",
        "Recurring account opportunities are routed with a clear next action."
      ]
    },
    form: {
      source: "routewash-mobile-fleet-care-demo",
      badge: "SignalOps intake",
      title: "Request a fleet wash quote",
      description:
        "A conversion-focused intake captures the details RouteWash needs to prepare a route-friendly fleet quote.",
      serviceLabel: "Service needed",
      serviceOptions: fleetWashServiceOptions,
      quantityLabel: "Fleet size",
      locationLabel: "Service area / city",
      assetLabel: "Vehicle types",
      assetSecondaryLabel: "Number of locations",
      statusLabel: "Is water access available?",
      statusOptions: [
        { value: "yes", label: "Yes, water access available" },
        { value: "no", label: "No / unsure about water access" },
        { value: "unsure", label: "Need to confirm site requirements" }
      ],
      mobileLabel: "Need after-hours service?",
      mobileOptions: [
        { value: "yes", label: "Yes, after-hours preferred" },
        { value: "no", label: "No, business hours are fine" },
        { value: "unsure", label: "Not sure yet" }
      ],
      photoLabel: "Site notes / current provider",
      descriptionLabel: "Main problem / notes",
      preferredTimeLabel: "Desired frequency and wash window",
      submitLabel: "Package this fleet lead",
      internalNoteLabel: "Internal account note",
      initial: {
        name: "Avery Stone",
        phone: "(214) 555-0149",
        email: "avery@example.com",
        address: "Dallas + Irving",
        asset: "28 HVAC service vans",
        assetSecondary: "2 locations",
        serviceValue: "recurring-wash-plan",
        quantity: "28",
        status: "yes",
        mobile: "yes",
        photoNote: "Water access is available at both locations. Current provider is inconsistent on timing.",
        description: "We need biweekly washing for service vans without slowing down daily routes.",
        preferredTime: "After-hours on weeknights"
      }
    },
    footerCta: "Request fleet quote",
    stickyPrimaryCta: "Get quote",
    stickySecondaryCta: "Plans"
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
          description: "Priority lead, prioritize callback, get address and system details."
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
        "No-water and major pressure issues should be prioritized for staff handoff. Routine maintenance can be organized into available service windows, while large commercial requests should route to the owner."
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
          "The system asks one or two practical follow-up questions and routes unclear requests to the right person."
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
