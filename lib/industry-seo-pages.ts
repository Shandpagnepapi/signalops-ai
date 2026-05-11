import type { SeoFaq } from "@/lib/seo";

export const INDUSTRY_PAGE_IDS = [
  "roofers",
  "hvac",
  "plumbers",
  "detailers",
  "tint-wrap-shops",
  "home-services",
  "med-spas",
  "insurance-agencies",
  "auto-shops",
  "well-water-service-companies",
  "mobile-fleet-wash"
] as const;

export type IndustryPageId = (typeof INDUSTRY_PAGE_IDS)[number];

export type IndustrySeoCard = {
  title: string;
  description: string;
};

export type IndustryExampleMessage = {
  scenario: string;
  message: string;
};

export type IndustrySeoPageConfig = {
  id: IndustryPageId;
  industryName: string;
  path: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subheadline: string;
  heroBullets: string[];
  missedLeadProblems: IndustrySeoCard[];
  leadSources: string[];
  exampleLeadFlow?: IndustrySeoCard[];
  followUpFailures: IndustrySeoCard[];
  qualificationQuestions?: string[];
  followUpExamples?: IndustryExampleMessage[];
  instantReply: IndustryExampleMessage;
  internalNote: IndustryExampleMessage;
  scoringRules: IndustrySeoCard[];
  automations: IndustrySeoCard[];
  dashboardValue?: IndustrySeoCard[];
  faqs: SeoFaq[];
  relatedLinks: IndustrySeoCardWithLink[];
};

export type IndustrySeoCardWithLink = IndustrySeoCard & {
  href: string;
};

export const INDUSTRY_SEO_PAGES: Record<IndustryPageId, IndustrySeoPageConfig> = {
  roofers: {
    id: "roofers",
    industryName: "Roofers",
    path: "/industries/roofers",
    eyebrow: "SignalOps for roofing companies",
    metaTitle: "AI Lead Response for Roofing Companies",
    metaDescription:
      "SignalOps gives roofing companies AI lead response, speed to lead automation, intake, routing, and follow-up for repairs, storm damage, and inspections.",
    h1: "AI lead response for roofers who cannot afford slow follow-up.",
    subheadline:
      "SignalOps helps roofing teams capture calls, forms, storm inquiries, inspection requests, and quote follow-ups before homeowners call the next contractor.",
    heroBullets: [
      "Prioritize active leaks, storm damage, and replacement opportunities",
      "Request photos, address, roof type, insurance context, and timeline",
      "Route urgent or high-value roofing leads to the right person quickly"
    ],
    missedLeadProblems: [
      {
        title: "Storm spikes overwhelm the office",
        description:
          "After heavy weather, calls, texts, and form fills can come in faster than a small team can triage them."
      },
      {
        title: "Inspection requests sit too long",
        description:
          "Homeowners often contact multiple roofers. A delayed reply can turn a ready inspection lead into a lost job."
      },
      {
        title: "Insurance and repair context is missing",
        description:
          "Without a structured intake, reps call back without knowing if the lead is a leak, replacement, repair, or insurance question."
      },
      {
        title: "Estimate follow-up is inconsistent",
        description:
          "Open estimates, photo requests, and inspection scheduling can get buried after the first conversation."
      }
    ],
    leadSources: [
      "Google Business Profile calls",
      "Website inspection forms",
      "Storm damage landing pages",
      "Paid search and local service ads",
      "Facebook neighborhood referrals",
      "Missed calls and voicemails",
      "Email requests",
      "Referral partner introductions"
    ],
    followUpFailures: [
      {
        title: "Photos are requested once and forgotten",
        description:
          "If the homeowner never sends photos, the lead may never get a second reminder."
      },
      {
        title: "Urgent leaks are not separated",
        description:
          "An active leak should not be handled the same way as a general roof age question."
      },
      {
        title: "No clear inspection handoff",
        description:
          "The customer may want an inspection but never receives a simple path to schedule it."
      }
    ],
    instantReply: {
      scenario: "Homeowner asks about a roof leak after a storm",
      message:
        "Thanks for reaching out. Roof leaks after a storm can be time-sensitive. Can you send your address, a few photos if safe, and whether water is actively coming inside? We will review this and help route the next step."
    },
    internalNote: {
      scenario: "Urgent roofing lead summary",
      message:
        "Possible active leak after storm. Prioritize callback. Confirm address, interior water intrusion, roof access, photos, insurance status, and availability for inspection."
    },
    scoringRules: [
      {
        title: "Priority",
        description:
          "Active leak, storm damage, replacement request, clear address, phone number, and inspection intent."
      },
      {
        title: "Routine",
        description:
          "Roof repair question, older roof, photo provided, or homeowner wants pricing soon."
      },
      {
        title: "Needs review",
        description:
          "Vague message, missing phone, outside service area, or insurance/legal questions that need a human."
      }
    ],
    automations: [
      {
        title: "Storm lead triage",
        description:
          "Separate active leaks, inspections, repairs, replacements, and general questions."
      },
      {
        title: "Photo and address request",
        description:
          "Ask for safe photos, property address, roof issue, and preferred callback time."
      },
      {
        title: "Inspection booking follow-up",
        description:
          "Nudge homeowners who have not picked an inspection time."
      },
      {
        title: "Owner or sales rep alert",
        description:
          "Send urgent and high-value roofing leads with summary, priority, and next action."
      }
    ],
    faqs: [
      {
        question: "Can SignalOps collect emergency roof leak details?",
        answer:
          "Yes. SignalOps can flag active leak language, request key details, and alert a human for urgent review."
      },
      {
        question: "Can it ask homeowners for roof photos?",
        answer:
          "Yes. The workflow can ask for photos when safe, along with address, roof issue, timeline, and inspection preference."
      },
      {
        question: "Does this replace roofing sales reps?",
        answer:
          "No. It gives reps a cleaner lead summary and helps them prioritize who needs follow-up first."
      },
      {
        question: "Can it work with storm campaign landing pages?",
        answer:
          "Yes. SignalOps can support storm damage forms, missed calls, ad leads, and inspection requests."
      }
    ],
    relatedLinks: [
      {
        href: "/ai-lead-response",
        title: "AI Lead Response",
        description: "Answer roofing inquiries faster across calls, forms, ads, and texts."
      },
      {
        href: "/ai-follow-up-automation",
        title: "AI Follow-Up Automation",
        description: "Keep inspection, quote, and photo follow-ups from getting lost."
      },
      {
        href: "/live-demo",
        title: "Generate a Roofing Demo",
        description: "Create a tailored SignalOps preview for a roofing company."
      }
    ]
  },
  hvac: {
    id: "hvac",
    industryName: "HVAC Companies",
    path: "/industries/hvac",
    eyebrow: "SignalOps for HVAC companies",
    metaTitle: "AI Lead Response for HVAC Companies",
    metaDescription:
      "SignalOps helps HVAC companies use AI lead response, lead intake, routing automation, and follow-up for emergency, repair, replacement, and maintenance leads.",
    h1: "AI lead response for HVAC companies that need faster callbacks and cleaner booking.",
    subheadline:
      "SignalOps helps HVAC teams separate emergency no-heat or no-cool calls from tune-ups, replacement estimates, and general questions so the right leads get handled first.",
    heroBullets: [
      "Flag no-heat, no-cool, and system-down requests",
      "Collect system type, issue, address, timeline, and appointment preference",
      "Follow up on estimates, maintenance plans, and unbooked service calls"
    ],
    missedLeadProblems: [
      {
        title: "Emergency calls blend into routine requests",
        description:
          "A no-heat or no-cool lead needs a different handoff than a maintenance tune-up question."
      },
      {
        title: "Replacement estimates need fast follow-up",
        description:
          "High-value system replacement inquiries can go cold when the next step is unclear."
      },
      {
        title: "Seasonal demand creates bottlenecks",
        description:
          "Hot and cold weather can create sudden lead volume that overwhelms dispatch and sales follow-up."
      },
      {
        title: "Maintenance leads are easy to forget",
        description:
          "Routine tune-ups and filter reminders may not feel urgent, but they drive repeat customer relationships."
      }
    ],
    leadSources: [
      "Missed calls",
      "Google Business Profile",
      "Emergency service pages",
      "Maintenance plan forms",
      "Replacement estimate forms",
      "Paid search ads",
      "Facebook referrals",
      "Email and website chat"
    ],
    followUpFailures: [
      {
        title: "No clear emergency triage",
        description:
          "Customers with system-down issues may wait behind routine requests."
      },
      {
        title: "Estimate leads are not nurtured",
        description:
          "A homeowner comparing systems may need timely reminders, financing info, or a callback."
      },
      {
        title: "Dispatch lacks context",
        description:
          "The team may call back without knowing system type, symptoms, urgency, or access details."
      }
    ],
    instantReply: {
      scenario: "Customer reports no AC during hot weather",
      message:
        "Thanks for reaching out. No-cool issues can be urgent, especially in extreme heat. Can you confirm your address, system type if known, whether the unit is running at all, and your best callback number?"
    },
    internalNote: {
      scenario: "Emergency HVAC service request",
      message:
        "Potential no-cool emergency. Prioritize callback. Confirm address, indoor temperature concern, system type, symptoms, availability, and whether customer has an existing maintenance plan."
    },
    scoringRules: [
      {
        title: "Priority",
        description:
          "No heat, no cooling, system down, replacement interest, clear contact info, address, and ready-to-schedule language."
      },
      {
        title: "Routine",
        description:
          "Tune-up, maintenance, mild performance issue, quote request, or customer comparing options soon."
      },
      {
        title: "Needs details or review",
        description:
          "General pricing question, incomplete contact info, vague future project, or unsupported service need."
      }
    ],
    automations: [
      {
        title: "Emergency lead alert",
        description:
          "Notify the right person when no-heat, no-cool, or system-down language appears."
      },
      {
        title: "Maintenance reminder follow-up",
        description:
          "Nudge tune-up and recurring maintenance customers when scheduling is incomplete."
      },
      {
        title: "Replacement estimate sequence",
        description:
          "Follow up after system estimates with practical next steps and human handoff."
      },
      {
        title: "Dispatch intake summary",
        description:
          "Summarize address, symptoms, system type, urgency, and availability."
      }
    ],
    faqs: [
      {
        question: "Can SignalOps separate emergency HVAC leads from routine maintenance?",
        answer:
          "Yes. The intake and priority rules can flag no-heat, no-cool, and system-down language for faster staff handoff."
      },
      {
        question: "Can this help with HVAC replacement estimates?",
        answer:
          "Yes. SignalOps can collect system details, timeline, contact info, and follow up if the customer does not book a consultation."
      },
      {
        question: "Does it connect to dispatch software?",
        answer:
          "The architecture is designed for future integrations. SignalOps can start in mock or dashboard mode, then connect to CRM, dispatch, or calendar tools when ready."
      },
      {
        question: "Can it work after hours?",
        answer:
          "Yes. It can acknowledge after-hours requests, collect key details, and alert the team based on urgency rules."
      }
    ],
    relatedLinks: [
      {
        href: "/missed-call-text-back",
        title: "Missed-Call Text Back",
        description: "Catch HVAC callers when dispatch or technicians are busy."
      },
      {
        href: "/ai-lead-qualification",
        title: "AI Lead Intake",
        description: "Priority HVAC leads by urgency, job type, and booking intent."
      },
      {
        href: "/live-demo",
        title: "Generate an HVAC Demo",
        description: "Build a tailored SignalOps preview for an HVAC company."
      }
    ]
  },
  plumbers: {
    id: "plumbers",
    industryName: "Plumbers",
    path: "/industries/plumbers",
    eyebrow: "SignalOps for plumbing companies",
    metaTitle: "AI Lead Response for Plumbing Companies",
    metaDescription:
      "SignalOps helps plumbing companies capture emergency calls, quote requests, and service leads with AI lead response, intake, routing, and follow-up.",
    h1: "AI lead response for plumbers who need to catch urgent jobs fast.",
    subheadline:
      "SignalOps helps plumbing teams triage emergency leaks, drain issues, water heater calls, estimates, and routine service requests without losing leads in missed calls or texts.",
    heroBullets: [
      "Flag leaks, no-water issues, sewer backups, and urgent plumbing problems",
      "Collect address, issue type, photos, access notes, and preferred time",
      "Follow up on estimates, inspections, and customers who go quiet"
    ],
    missedLeadProblems: [
      {
        title: "Emergency calls are time-sensitive",
        description:
          "A leak, backup, or no-water issue can turn into a lost job quickly if the customer calls another plumber first."
      },
      {
        title: "Technicians cannot answer every call",
        description:
          "Small plumbing teams are often in the field, under a sink, or driving between jobs when new leads arrive."
      },
      {
        title: "Estimate details are incomplete",
        description:
          "The team needs the issue, address, access, photos, and urgency before deciding who should respond."
      },
      {
        title: "Follow-up after estimates is inconsistent",
        description:
          "Water heater quotes, fixture work, and larger repairs often need a reminder before the customer books."
      }
    ],
    leadSources: [
      "Missed calls",
      "Emergency plumbing pages",
      "Google Business Profile",
      "Website contact forms",
      "Local service ads",
      "Texts from existing customers",
      "Neighborhood referrals",
      "Email requests"
    ],
    followUpFailures: [
      {
        title: "Urgency is not captured",
        description:
          "A dripping faucet and an active leak should not receive the same priority."
      },
      {
        title: "Address is missing",
        description:
          "A plumbing lead without location can slow down dispatch and service area checks."
      },
      {
        title: "Quotes are not chased",
        description:
          "Customers who request water heater, fixture, or repipe estimates may need a short follow-up sequence."
      }
    ],
    instantReply: {
      scenario: "Customer reports an active leak",
      message:
        "Thanks for reaching out. Active leaks can be urgent. Can you confirm your address, where the leak is coming from, whether water is still running, and your best callback number?"
    },
    internalNote: {
      scenario: "Urgent plumbing lead summary",
      message:
        "Possible active leak. Prioritize callback. Confirm shutoff status, address, leak location, water damage risk, photos if safe, and earliest service window."
    },
    scoringRules: [
      {
        title: "Hot",
        description:
          "Active leak, sewer backup, no water, water heater failure, clear address, phone number, and urgent service language."
      },
      {
        title: "Warm",
        description:
          "Fixture install, routine inspection, water heater quote, or mild issue with good contact information."
      },
      {
        title: "Needs review",
        description:
          "Vague problem, missing address or phone, outside service area, or unclear ownership/authorization."
      }
    ],
    automations: [
      {
        title: "Emergency plumbing triage",
        description:
          "Identify leaks, backups, no-water issues, and water heater failures."
      },
      {
        title: "Address and access intake",
        description:
          "Collect service location, access details, shutoff status, and photos when helpful."
      },
      {
        title: "Estimate follow-up",
        description:
          "Send reminders after water heater, fixture, and larger repair quotes."
      },
      {
        title: "Daily response-needed brief",
        description:
          "Show which plumbing leads still need callback, photos, quote, or booking."
      }
    ],
    faqs: [
      {
        question: "Can SignalOps handle plumbing emergency language?",
        answer:
          "It can flag urgent terms like active leak, sewer backup, no water, and water heater failure for human follow-up."
      },
      {
        question: "Can it ask for photos?",
        answer:
          "Yes. The workflow can request photos when safe and useful, while still escalating urgent issues."
      },
      {
        question: "Can it work for small plumbing teams?",
        answer:
          "Yes. SignalOps is especially useful when the same people are answering calls, doing jobs, quoting work, and following up."
      },
      {
        question: "Does SignalOps dispatch plumbers automatically?",
        answer:
          "Not by default. It can prepare the intake, sort the lead, and route the next step. Dispatch rules should be configured carefully with the business."
      }
    ],
    relatedLinks: [
      {
        href: "/missed-call-text-back",
        title: "Missed-Call Text Back",
        description: "Capture plumbing calls when the team is on jobs."
      },
      {
        href: "/lead-management-for-small-business",
        title: "Lead Management",
        description: "Keep plumbing leads, quotes, and follow-ups organized."
      },
      {
        href: "/live-demo",
        title: "Generate a Plumbing Demo",
        description: "Create a tailored SignalOps preview for a plumbing company."
      }
    ]
  },
  detailers: {
    id: "detailers",
    industryName: "Auto Detailers",
    path: "/industries/detailers",
    eyebrow: "SignalOps for auto detailers",
    metaTitle: "AI Lead Response for Auto Detailers",
    metaDescription:
      "SignalOps helps auto detailers respond to package inquiries, collect quote request details, follow up on photos, and book detailing appointments faster.",
    h1: "AI lead response for auto detailers that depend on quote requests and booking follow-up.",
    subheadline:
      "SignalOps helps detailers answer package questions, collect vehicle and condition details, follow up after quotes, and move high-intent customers toward a booked appointment.",
    heroBullets: [
      "Collect vehicle type, package interest, condition, photos, and timing",
      "Separate maintenance details from correction, ceramic, fleet, and high-value jobs",
      "Follow up after quotes so interested customers do not disappear"
    ],
    missedLeadProblems: [
      {
        title: "Package shoppers ask vague questions",
        description:
          "A message like 'How much for a detail?' usually needs vehicle type, condition, service level, location, and timing before pricing is useful."
      },
      {
        title: "High-value jobs need better intake",
        description:
          "Paint correction, ceramic coating, fleet work, and neglected vehicles require more context than a basic wash inquiry."
      },
      {
        title: "Instagram and Facebook leads get buried",
        description:
          "Detailers often get DMs from before/after content, but those conversations are easy to lose during busy shop days."
      },
      {
        title: "Quote follow-up is inconsistent",
        description:
          "A customer may be ready to book but needs one reminder after receiving package options."
      }
    ],
    leadSources: [
      "Instagram DMs",
      "Facebook messages",
      "Website quote forms",
      "Google Business Profile calls",
      "Missed calls",
      "Text inquiries",
      "Referral messages",
      "Fleet or dealership emails"
    ],
    exampleLeadFlow: [
      {
        title: "Customer asks for pricing",
        description:
          "The inquiry comes from a DM, missed call, form, or text asking about a detail package."
      },
      {
        title: "SignalOps asks for context",
        description:
          "The system collects vehicle type, condition, package interest, photos if useful, timing, and contact info."
      },
      {
        title: "Lead is prioritized",
        description:
          "Ceramic, correction, fleet, and ready-to-book leads can be prioritized over general price shoppers."
      },
      {
        title: "Follow-up moves booking forward",
        description:
          "If the customer does not book after package options, SignalOps sends a practical next-step reminder."
      }
    ],
    followUpFailures: [
      {
        title: "Photos never arrive",
        description:
          "The customer asks for a quote but never sends vehicle photos or condition details."
      },
      {
        title: "Package options do not convert",
        description:
          "A lead receives pricing but does not get a clear reminder to choose a package or appointment window."
      },
      {
        title: "Fleet opportunities are not separated",
        description:
          "Multi-vehicle or repeat work should be routed differently from one-time consumer details."
      }
    ],
    qualificationQuestions: [
      "What vehicle year, make, and model do you need detailed?",
      "Are you looking for maintenance detail, deep clean, paint correction, ceramic coating, or another service?",
      "What condition is the interior and exterior in right now?",
      "Can you send photos of the vehicle if you want a more accurate quote?",
      "Are you trying to book this week or just comparing options?",
      "Is this for one vehicle, multiple vehicles, or fleet/dealership work?"
    ],
    instantReply: {
      scenario: "Customer asks for a detail quote from Instagram",
      message:
        "Thanks for reaching out. We can help narrow down the best detail package. What vehicle do you have, what service are you considering, and can you send a few photos of the interior and exterior if you want a more accurate quote?"
    },
    internalNote: {
      scenario: "Auto detailing package lead",
      message:
        "Detail quote request. Gather vehicle, condition, package interest, photos, timeline, and whether customer is ready to book. Prioritize ceramic, correction, fleet, and this-week appointment requests."
    },
    followUpExamples: [
      {
        scenario: "Missing photos",
        message:
          "Quick follow-up: if you can send a few photos of the interior and exterior, we can point you toward the right package and next available appointment."
      },
      {
        scenario: "Quote sent",
        message:
          "Just checking in on the detail options we sent over. Want us to look at available times this week?"
      },
      {
        scenario: "Ceramic or correction lead",
        message:
          "For ceramic or paint correction, a quick review helps us recommend the right level of prep. Want to send photos or set up a consultation?"
      }
    ],
    scoringRules: [
      {
        title: "Priority",
        description:
          "Ready-to-book, ceramic coating, paint correction, fleet/dealership request, clear vehicle details, phone number, and preferred time."
      },
      {
        title: "Routine",
        description:
          "Package inquiry, maintenance detail, interior deep clean, photos provided, or customer wants service soon."
      },
      {
        title: "Needs details or review",
        description:
          "Vague pricing question, no vehicle details, no contact info, or unrealistic timeline."
      }
    ],
    automations: [
      {
        title: "Package intake form",
        description:
          "Collect vehicle, service interest, condition, photos, and preferred appointment time."
      },
      {
        title: "Quote follow-up",
        description:
          "Nudge leads who received package pricing but did not book."
      },
      {
        title: "High-value lead alert",
        description:
          "Route ceramic, correction, fleet, and dealership leads to the owner or sales contact."
      },
      {
        title: "No-response sequence",
        description:
          "Ask for missing photos or timing before a lead disappears."
      }
    ],
    dashboardValue: [
      {
        title: "Quote pipeline",
        description:
          "See package inquiries, photos needed, quote sent, booked, won, and lost status."
      },
      {
        title: "High-value service mix",
        description:
          "Track ceramic, correction, fleet, and routine detail requests separately."
      },
      {
        title: "Follow-up gaps",
        description:
          "Identify which leads received quotes but never booked."
      }
    ],
    faqs: [
      {
        question: "Can SignalOps help detailers follow up after quotes?",
        answer:
          "Yes. Quote follow-up is a strong fit for detailers because customers often compare packages and need a clear booking prompt."
      },
      {
        question: "Can it ask for vehicle photos?",
        answer:
          "Yes. SignalOps can request interior and exterior photos when they help with package recommendation or pricing."
      },
      {
        question: "Can it separate ceramic coating leads from basic details?",
        answer:
          "Yes. High-value services like ceramic coating and paint correction can be prioritized and routed differently."
      },
      {
        question: "Does it replace talking to customers?",
        answer:
          "No. It handles first response, missing details, and follow-up so the detailer can focus on ready conversations."
      }
    ],
    relatedLinks: [
      {
        href: "/services/quote-intake-automation",
        title: "Quote Intake Automation",
        description: "Collect vehicle details, package interest, photos, and timing before quoting."
      },
      {
        href: "/services/automated-lead-follow-up",
        title: "Automated Lead Follow-Up",
        description: "Follow up after detailing quotes and missing photos."
      },
      {
        href: "/demo",
        title: "View Automotive Demo",
        description: "See a similar quote-intake workflow in the RouteWash Mobile Fleet Care demo."
      },
      {
        href: "/how-it-works",
        title: "How SignalOps Works",
        description: "See how intake, intake, routing, booking, and follow-up connect."
      }
    ]
  },
  "tint-wrap-shops": {
    id: "tint-wrap-shops",
    industryName: "Tint and Wrap Shops",
    path: "/industries/tint-wrap-shops",
    eyebrow: "SignalOps for tint and wrap shops",
    metaTitle: "AI Lead Response for Tint Shops and Wrap Shops",
    metaDescription:
      "SignalOps helps tint and wrap shops automate quote requests, collect vehicle and package details, follow up, and book more appointments.",
    h1: "AI lead response for tint shops and wrap shops handling quote requests.",
    subheadline:
      "SignalOps helps tint, wrap, and PPF shops respond to quote requests, collect vehicle and coverage details, route high-value jobs, and follow up when customers do not book.",
    heroBullets: [
      "Collect vehicle, service type, coverage, film preference, and desired timing",
      "Prioritize full wraps, PPF, commercial graphics, and ready-to-book leads",
      "Follow up after quotes without relying on DMs and memory"
    ],
    missedLeadProblems: [
      {
        title: "Customers ask for price without scope",
        description:
          "Tint, wrap, PPF, and vinyl jobs need vehicle details, coverage, material preferences, and timeline."
      },
      {
        title: "DM leads are easy to lose",
        description:
          "Before/after posts generate inquiries, but social conversations can disappear during production work."
      },
      {
        title: "Large jobs need owner review",
        description:
          "Full wraps, commercial graphics, fleets, and PPF packages should be routed differently from basic tint questions."
      },
      {
        title: "Appointment intent is not captured",
        description:
          "Customers may be ready to schedule but never receive a clear booking path after the quote."
      }
    ],
    leadSources: [
      "Instagram DMs",
      "Facebook messages",
      "Website quote forms",
      "Google Business Profile calls",
      "Missed calls",
      "Text inquiries",
      "Paid social ads",
      "Commercial account emails"
    ],
    exampleLeadFlow: [
      {
        title: "Quote request arrives",
        description:
          "A customer asks about tint, wrap, PPF, chrome delete, decals, or commercial graphics."
      },
      {
        title: "SignalOps collects scope",
        description:
          "The system asks for vehicle, desired service, coverage, photos if needed, timeline, and contact info."
      },
      {
        title: "Lead is routed",
        description:
          "High-value full wrap, PPF, and commercial leads can alert the owner while basic tint requests move toward booking."
      },
      {
        title: "Quote follow-up starts",
        description:
          "If the customer does not book after pricing, SignalOps sends a helpful next-step follow-up."
      }
    ],
    followUpFailures: [
      {
        title: "Coverage details are missing",
        description:
          "The shop cannot quote accurately without knowing full vehicle, partial wrap, windows, windshield strip, PPF areas, or graphics scope."
      },
      {
        title: "Commercial leads are not escalated",
        description:
          "Fleet graphics or business wrap requests may require owner review, proofs, or a more careful sales process."
      },
      {
        title: "Quotes are sent but not booked",
        description:
          "A customer receives pricing but never gets nudged toward an appointment window."
      }
    ],
    qualificationQuestions: [
      "What vehicle year, make, and model is this for?",
      "Are you interested in tint, wrap, PPF, chrome delete, decals, or commercial graphics?",
      "What coverage are you looking for?",
      "Do you have a preferred film, finish, color, or shade?",
      "Are you trying to book soon or just comparing options?",
      "Is this for one vehicle, multiple vehicles, or commercial/fleet work?"
    ],
    instantReply: {
      scenario: "Customer asks about tint and wrap pricing",
      message:
        "Thanks for reaching out. To point you in the right direction, what vehicle is this for, what service are you considering, and what coverage or finish do you have in mind?"
    },
    internalNote: {
      scenario: "Tint/wrap quote request",
      message:
        "Quote request. Gather vehicle, service type, coverage, film/finish preference, timeline, and appointment intent. Route full wrap, PPF, or commercial graphics to owner/sales review."
    },
    followUpExamples: [
      {
        scenario: "Scope missing",
        message:
          "Quick follow-up: can you confirm the vehicle and coverage you want so we can give a more useful estimate?"
      },
      {
        scenario: "Quote sent",
        message:
          "Checking in on the quote we sent. Want us to look at available install times?"
      },
      {
        scenario: "Commercial graphics",
        message:
          "For commercial graphics, we will need vehicle count, artwork status, timing, and whether there is a decision-maker we should include."
      }
    ],
    scoringRules: [
      {
        title: "Hot",
        description:
          "Ready-to-book tint, full wrap, PPF, commercial graphics, clear vehicle details, phone number, and preferred timing."
      },
      {
        title: "Warm",
        description:
          "Package inquiry, shade question, chrome delete, partial wrap, or customer comparing options soon."
      },
      {
        title: "Needs review",
        description:
          "Commercial scope, fleet request, unclear artwork, vague pricing question, missing vehicle details, or unrealistic timeline."
      }
    ],
    automations: [
      {
        title: "Quote request intake",
        description:
          "Collect vehicle, service, coverage, film preference, photos, and timing."
      },
      {
        title: "Commercial routing",
        description:
          "Send fleet, signage, and full wrap opportunities to the right person."
      },
      {
        title: "Booking follow-up",
        description:
          "Nudge customers who received quotes but did not schedule."
      },
      {
        title: "Missed-call text back",
        description:
          "Capture callers when installers and owners are busy in the shop."
      }
    ],
    dashboardValue: [
      {
        title: "Install pipeline",
        description:
          "Track new, quoted, needs scope, booked, won, and lost requests."
      },
      {
        title: "Service mix",
        description:
          "Separate tint, PPF, full wrap, partial wrap, decals, and commercial graphics leads."
      },
      {
        title: "Follow-up visibility",
        description:
          "See which quotes need a reminder before the customer books elsewhere."
      }
    ],
    faqs: [
      {
        question: "Can SignalOps collect tint and wrap quote request details?",
        answer:
          "Yes. SignalOps can collect vehicle, service type, coverage, film or finish preference, and booking timing."
      },
      {
        question: "Can it handle commercial wrap leads?",
        answer:
          "Yes. Commercial graphics and fleet requests can be tagged and routed for owner or sales review."
      },
      {
        question: "Can it follow up after a quote?",
        answer:
          "Yes. SignalOps can follow up when a customer receives pricing but does not book."
      },
      {
        question: "Can this work with Instagram DMs?",
        answer:
          "The workflow can be designed around DM intake and follow-up. Exact automation depends on platform access and the tools configured."
      }
    ],
    relatedLinks: [
      {
        href: "/services/quote-intake-automation",
        title: "Quote Intake Automation",
        description: "Structure tint, wrap, and PPF quote requests before sales follow-up."
      },
      {
        href: "/services/ai-appointment-booking",
        title: "AI Appointment Booking",
        description: "Move ready install leads toward booking."
      },
      {
        href: "/demo",
        title: "View Client Demo",
        description: "See a live SignalOps demo with AI quote intake and lead intake."
      },
      {
        href: "/how-it-works",
        title: "How SignalOps Works",
        description: "See the full flow from intake to intake, routing, and follow-up."
      }
    ]
  },
  "home-services": {
    id: "home-services",
    industryName: "Home Service Businesses",
    path: "/industries/home-services",
    eyebrow: "SignalOps for home service businesses",
    metaTitle: "AI Lead Response for Home Service Businesses",
    metaDescription:
      "SignalOps helps home service businesses recover missed leads, answer calls and forms faster, sort urgency, route jobs, and follow up after estimates.",
    h1: "AI lead response for home service businesses and contractors.",
    subheadline:
      "SignalOps helps contractors and local service teams capture calls, texts, forms, emergency requests, quote leads, and follow-ups before homeowners call the next provider.",
    heroBullets: [
      "Capture emergency and routine requests across calls, texts, forms, and ads",
      "Collect address, issue, urgency, photos, access notes, and appointment timing",
      "Recover missed leads from slow replies, unbooked quotes, and forgotten follow-up"
    ],
    missedLeadProblems: [
      {
        title: "Calls arrive while crews are working",
        description:
          "Contractors miss calls because the same team is driving, quoting, doing the work, and managing customers."
      },
      {
        title: "Emergency and routine leads mix together",
        description:
          "Leaks, no heat, no water, electrical issues, maintenance, and general estimates should not be handled with the same urgency."
      },
      {
        title: "Address and scope are missing",
        description:
          "The team needs location, issue type, photos if helpful, timing, and access notes before scheduling."
      },
      {
        title: "Estimates are not followed up",
        description:
          "Homeowners comparing contractors may need a clear reminder or booking path after a quote."
      }
    ],
    leadSources: [
      "Missed calls",
      "Google Business Profile",
      "Website forms",
      "Local service ads",
      "Landing pages",
      "Texts from existing customers",
      "Facebook neighborhood referrals",
      "Email quote requests"
    ],
    exampleLeadFlow: [
      {
        title: "Homeowner reaches out",
        description:
          "The lead comes from a missed call, form, ad, text, or referral asking for repair, service, or an estimate."
      },
      {
        title: "SignalOps triages urgency",
        description:
          "The system asks about issue type, address, active problem, photos, timeline, and best callback."
      },
      {
        title: "Lead is routed",
        description:
          "Emergency and high-value jobs alert the right person while routine requests move toward booking or follow-up."
      },
      {
        title: "Pipeline stays visible",
        description:
          "The dashboard shows new, contacted, needs info, quoted, booked, won, and lost leads."
      }
    ],
    followUpFailures: [
      {
        title: "Missed calls do not get a fast text back",
        description:
          "A homeowner often calls multiple contractors, and the first useful response has an advantage."
      },
      {
        title: "Photos and address are requested once",
        description:
          "If the customer does not send the missing detail, the lead can disappear."
      },
      {
        title: "Quote follow-up is manual",
        description:
          "Estimates are sent, then follow-up depends on memory or a calendar reminder."
      }
    ],
    qualificationQuestions: [
      "What service or issue do you need help with?",
      "What is the property address or service area?",
      "Is this urgent, happening now, or a routine estimate?",
      "Can you safely send photos or a short description of the issue?",
      "What is your preferred callback or appointment window?",
      "Have you already received an estimate or inspection from another provider?"
    ],
    instantReply: {
      scenario: "Homeowner submits a repair request",
      message:
        "Thanks for reaching out. Can you send the service address, a short description of the issue, whether it is urgent, and any photos if safe? We will review this and help route the next step."
    },
    internalNote: {
      scenario: "Home service lead summary",
      message:
        "New home service request. Confirm issue type, address, urgency, photos, access notes, and preferred appointment window. Prioritize active emergencies and ready-to-book estimates."
    },
    followUpExamples: [
      {
        scenario: "Missed details",
        message:
          "Quick follow-up: can you send the address and a little more detail on the issue so we can point you to the right next step?"
      },
      {
        scenario: "Estimate follow-up",
        message:
          "Checking in on the estimate request. Do you still need help with this, or would you like us to look at appointment options?"
      },
      {
        scenario: "Emergency triage",
        message:
          "If this issue is active or causing damage right now, please reply with 'urgent' and confirm the best callback number."
      }
    ],
    scoringRules: [
      {
        title: "Hot",
        description:
          "Active issue, urgent language, full address, phone number, ready-to-book intent, or high-value estimate request."
      },
      {
        title: "Warm",
        description:
          "Routine repair, maintenance, quote request, photos provided, or customer wants service soon."
      },
      {
        title: "Needs review",
        description:
          "Vague issue, missing address or phone, outside service area, sensitive safety issue, or unclear project scope."
      }
    ],
    automations: [
      {
        title: "Missed-call text back",
        description:
          "Respond to calls when the team is in the field or after hours."
      },
      {
        title: "Emergency alert",
        description:
          "Route urgent leads to the owner, dispatcher, or sales lead with context."
      },
      {
        title: "Quote follow-up sequence",
        description:
          "Follow up after estimates, inspections, and missing-photo requests."
      },
      {
        title: "Daily lead brief",
        description:
          "Show response-needed leads, booked appointments, and missed opportunities."
      }
    ],
    dashboardValue: [
      {
        title: "Response-needed list",
        description:
          "See which homeowners still need a callback, photo request, quote, or booking path."
      },
      {
        title: "Missed opportunity tracking",
        description:
          "Identify missed calls, slow form replies, unbooked quotes, and old leads that need follow-up."
      },
      {
        title: "Lead source clarity",
        description:
          "Compare calls, ads, forms, referrals, and landing pages by lead quality."
      }
    ],
    faqs: [
      {
        question: "Can SignalOps work for contractors without a CRM?",
        answer:
          "Yes. It can start with calls, texts, forms, owner alerts, and a simple dashboard before a CRM is added."
      },
      {
        question: "Can it identify emergency leads?",
        answer:
          "It can flag urgent language and route emergency leads to the right person quickly."
      },
      {
        question: "Can it follow up after estimates?",
        answer:
          "Yes. Estimate follow-up is one of the most practical ways to recover missed revenue."
      },
      {
        question: "Does SignalOps replace dispatch?",
        answer:
          "No. It helps capture, sort, route, and follow up with leads. Dispatch decisions should stay with the business."
      }
    ],
    relatedLinks: [
      {
        href: "/services/missed-lead-recovery",
        title: "Missed Lead Recovery",
        description: "Recover contractor leads from missed calls, slow replies, and unbooked estimates."
      },
      {
        href: "/services/lead-routing-automation",
        title: "Lead Routing Automation",
        description: "Route emergency, quote, and routine service leads to the right person."
      },
      {
        href: "/preview",
        title: "Free Preview",
        description: "Find where calls, forms, and follow-ups are being missed."
      },
      {
        href: "/demo",
        title: "View Client Demo",
        description: "See a live SignalOps demo with intake, priority routing, and follow-up."
      },
      {
        href: "/how-it-works",
        title: "How SignalOps Works",
        description: "See how missed lead recovery, routing, booking, and follow-up connect."
      }
    ]
  },
  "med-spas": {
    id: "med-spas",
    industryName: "Med Spas",
    path: "/industries/med-spas",
    eyebrow: "SignalOps for med spas",
    metaTitle: "AI Appointment Booking for Med Spas",
    metaDescription:
      "SignalOps helps med spas respond to consultation requests with AI lead response, intake, appointment booking prompts, and automated follow-up.",
    h1: "AI lead response for med spas that need faster consultation follow-up.",
    subheadline:
      "SignalOps helps med spas answer new inquiries, collect treatment interest, route sensitive questions to staff, and follow up with prospects who do not book.",
    heroBullets: [
      "Respond quickly to consultation, treatment, and pricing inquiries",
      "Collect treatment interest, timing, prior experience, and contact preference",
      "Escalate medical, safety, or unclear questions to staff review"
    ],
    missedLeadProblems: [
      {
        title: "Consultation requests go cold",
        description:
          "A prospect interested in injectables, lasers, skin treatments, or body services may compare multiple providers."
      },
      {
        title: "Staff juggle calls and appointments",
        description:
          "Front desk teams often handle check-ins, phones, DMs, scheduling, and follow-up at the same time."
      },
      {
        title: "Treatment questions need careful routing",
        description:
          "AI should not make medical promises. It should collect context and route sensitive questions to trained staff."
      },
      {
        title: "DM leads are easy to lose",
        description:
          "Instagram and Facebook inquiries can sit without a booking path or follow-up reminder."
      }
    ],
    leadSources: [
      "Website consultation forms",
      "Instagram DMs",
      "Facebook messages",
      "Missed calls",
      "Google Business Profile",
      "Paid social ads",
      "Email inquiries",
      "Event or promotion landing pages"
    ],
    exampleLeadFlow: [
      {
        title: "Prospect asks about treatment",
        description:
          "The lead comes from a form, DM, missed call, ad, or promotion landing page."
      },
      {
        title: "SignalOps collects intent",
        description:
          "The system asks for treatment interest, consultation timing, contact preference, and whether they want to book soon."
      },
      {
        title: "Staff review is flagged",
        description:
          "Medical, safety, suitability, or treatment-specific questions are routed to the team instead of answered automatically."
      },
      {
        title: "Booking follow-up starts",
        description:
          "If the prospect does not choose a time, SignalOps sends a concise consultation follow-up."
      }
    ],
    followUpFailures: [
      {
        title: "No booking nudge",
        description:
          "A prospect asks about a treatment but never receives a simple consultation next step."
      },
      {
        title: "Sensitive questions stay in DMs",
        description:
          "Treatment-specific concerns should be routed to staff instead of answered loosely."
      },
      {
        title: "Promotion leads are not ready",
        description:
          "Promo-driven inquiries may need treatment interest, timeline, and eligibility review before booking."
      }
    ],
    qualificationQuestions: [
      "Which treatment or service are you interested in?",
      "Are you hoping to book a consultation soon or just gathering information?",
      "What is your preferred contact method?",
      "Do you have a preferred day or appointment window?",
      "Is this related to a promotion, event, or returning-client visit?",
      "Does this question need a staff member or provider to review before booking?"
    ],
    instantReply: {
      scenario: "Prospect asks about a treatment consultation",
      message:
        "Thanks for reaching out. We can help point you toward the right next step. Which treatment are you interested in, and are you hoping to book a consultation soon or just gathering information?"
    },
    internalNote: {
      scenario: "Med spa consultation inquiry",
      message:
        "Treatment interest received. Route to front desk or provider review if medical/safety question appears. Ask for preferred appointment window and avoid giving treatment-specific promises in automated replies."
    },
    followUpExamples: [
      {
        scenario: "Consultation interest",
        message:
          "Quick follow-up: would you like us to help find a consultation time, or are you still comparing options?"
      },
      {
        scenario: "DM lead",
        message:
          "Thanks again for reaching out. If you want to move forward, we can have the team review your question and help with next available consultation options."
      },
      {
        scenario: "Promotion inquiry",
        message:
          "Checking in on your promotion inquiry. Would you like someone from the team to confirm availability and next steps?"
      }
    ],
    scoringRules: [
      {
        title: "Hot",
        description:
          "Wants consultation, names a treatment, has phone or email, and asks about appointment availability."
      },
      {
        title: "Warm",
        description:
          "Interested in pricing, promotion, or treatment options but needs education or staff follow-up."
      },
      {
        title: "Staff handoff",
        description:
          "Medical history, complication, contraindication, safety question, or treatment suitability concern."
      }
    ],
    automations: [
      {
        title: "Consultation request intake",
        description:
          "Collect treatment interest, timeline, contact details, and preferred booking window."
      },
      {
        title: "DM follow-up",
        description:
          "Move social inquiries toward consultation booking or staff callback."
      },
      {
        title: "Staff review alert",
        description:
          "Flag medical, safety, or treatment-specific questions for a ready team member."
      },
      {
        title: "No-booking reminder",
        description:
          "Follow up with prospects who asked questions but did not schedule."
      }
    ],
    dashboardValue: [
      {
        title: "Consultation pipeline",
        description:
          "See new inquiries, staff-review questions, booking-ready leads, booked consultations, and no-response follow-ups."
      },
      {
        title: "Treatment interest",
        description:
          "Track which services generate the most inquiries without making medical claims in automation."
      },
      {
        title: "DM follow-up visibility",
        description:
          "Keep social leads from getting buried in Instagram and Facebook conversations."
      }
    ],
    faqs: [
      {
        question: "Can AI answer medical treatment questions?",
        answer:
          "SignalOps should be conservative. It can collect context and route questions to staff, but it should not provide medical advice or make treatment promises."
      },
      {
        question: "Can SignalOps help with Instagram and Facebook inquiries?",
        answer:
          "Yes. Social DMs are a strong use case because many prospects ask questions there before booking."
      },
      {
        question: "Can it follow up after consultations are requested?",
        answer:
          "Yes. SignalOps can nudge prospects to choose a time, provide missing details, or wait for a staff callback."
      },
      {
        question: "Will this feel too robotic for a premium med spa?",
        answer:
          "The messaging should be written in the brand voice and kept concise, helpful, and staff-friendly."
      }
    ],
    relatedLinks: [
      {
        href: "/services/ai-appointment-booking",
        title: "AI Appointment Booking",
        description: "Move ready consultation inquiries toward the right booking path."
      },
      {
        href: "/services/automated-lead-follow-up",
        title: "Automated Lead Follow-Up",
        description: "Follow up with consultation and treatment inquiries."
      },
      {
        href: "/services/ai-lead-qualification",
        title: "AI Lead Intake",
        description: "Prioritize booking-ready prospects and staff-review cases."
      },
      {
        href: "/demo",
        title: "View Client Demo",
        description: "See a live SignalOps demo with AI lead intake, priority routing, and follow-up."
      },
      {
        href: "/how-it-works",
        title: "How SignalOps Works",
        description: "See how response, routing, booking, and follow-up connect."
      }
    ]
  },
  "insurance-agencies": {
    id: "insurance-agencies",
    industryName: "Insurance Agencies",
    path: "/industries/insurance-agencies",
    eyebrow: "SignalOps for insurance agencies",
    metaTitle: "AI Lead Intake for Insurance Agencies",
    metaDescription:
      "SignalOps helps insurance agencies manage quote requests with AI lead response, lead intake, producer routing, and automated follow-up.",
    h1: "AI lead response for insurance agencies that need faster quote follow-up.",
    subheadline:
      "SignalOps helps agencies organize quote requests, coverage questions, renewal opportunities, and missed calls so producers can focus on ready prospects.",
    heroBullets: [
      "Capture quote type, timeline, current coverage, and contact preference",
      "Route commercial, personal lines, and urgent policy questions correctly",
      "Follow up when prospects do not send details or book a call"
    ],
    missedLeadProblems: [
      {
        title: "Quote requests arrive incomplete",
        description:
          "Producers often need line of business, location, current carrier, renewal date, and contact details before quoting."
      },
      {
        title: "Commercial opportunities need routing",
        description:
          "Business insurance leads can be higher value but require a different intake path than personal auto or home."
      },
      {
        title: "Renewal timing is easy to miss",
        description:
          "A prospect researching before renewal needs follow-up at the right time, not one generic reply."
      },
      {
        title: "Compliance requires care",
        description:
          "Automated messages should avoid coverage promises and route advice-heavy questions to licensed staff."
      }
    ],
    leadSources: [
      "Website quote forms",
      "Referral partner introductions",
      "Missed calls",
      "Google Business Profile",
      "Email requests",
      "Paid search",
      "Social media messages",
      "Networking and local business groups"
    ],
    exampleLeadFlow: [
      {
        title: "Prospect requests a quote",
        description:
          "The lead comes from a form, missed call, referral, email, paid search, or social message."
      },
      {
        title: "SignalOps collects coverage context",
        description:
          "The system asks for line of business, location, renewal timing, current coverage if available, and contact preference."
      },
      {
        title: "Lead routes to the right producer",
        description:
          "Commercial, personal lines, benefits, and specialty requests can follow different routing rules."
      },
      {
        title: "Follow-up tracks missing details",
        description:
          "If documents, renewal dates, or callback times are missing, SignalOps sends practical reminders."
      }
    ],
    followUpFailures: [
      {
        title: "Missing documents stall quotes",
        description:
          "Prospects may not send declarations pages, business details, driver info, or renewal dates without reminders."
      },
      {
        title: "Producers lack context",
        description:
          "A callback is less useful if the producer does not know coverage type, urgency, or decision timeline."
      },
      {
        title: "Longer sales cycles are not nurtured",
        description:
          "Commercial and renewal-based prospects may need reminders before they are ready."
      }
    ],
    qualificationQuestions: [
      "What type of coverage are you looking for?",
      "Is this personal, commercial, benefits, specialty, or another line?",
      "What city/state or business location is the policy for?",
      "Do you know your renewal date or decision timeline?",
      "Do you have current policy details or declarations pages available?",
      "What is the best number and preferred time for a licensed producer to follow up?"
    ],
    instantReply: {
      scenario: "Prospect requests a business insurance quote",
      message:
        "Thanks for reaching out. To route this correctly, can you confirm the type of coverage you need, business location, current renewal timing if known, and the best number for a licensed team member to follow up?"
    },
    internalNote: {
      scenario: "Commercial insurance quote inquiry",
      message:
        "Possible commercial quote opportunity. Route to licensed producer. Gather coverage type, business location, current carrier/renewal date if available, decision timeline, and contact preference."
    },
    followUpExamples: [
      {
        scenario: "Missing quote details",
        message:
          "Quick follow-up: can you confirm the coverage type and renewal timing so the right licensed team member can review this?"
      },
      {
        scenario: "Commercial inquiry",
        message:
          "For the business quote, we will need the company location, coverage type, decision timeline, and best callback number."
      },
      {
        scenario: "Renewal timing",
        message:
          "Checking in on your renewal timing. If the date is getting close, we can route this for a producer callback."
      }
    ],
    scoringRules: [
      {
        title: "Hot",
        description:
          "Commercial quote, upcoming renewal, clear coverage need, decision timeline, phone/email, and callback request."
      },
      {
        title: "Warm",
        description:
          "Personal lines quote, general comparison request, missing details, or future renewal window."
      },
      {
        title: "Staff handoff",
        description:
          "Coverage advice, claim issue, cancellation problem, compliance concern, or complex business risk."
      }
    ],
    automations: [
      {
        title: "Quote intake follow-up",
        description:
          "Ask for missing policy details, renewal timing, and contact preferences."
      },
      {
        title: "Producer routing",
        description:
          "Send commercial, personal, benefits, or specialty leads to the right person."
      },
      {
        title: "Renewal reminder sequence",
        description:
          "Follow up based on renewal timing instead of treating every quote as immediate."
      },
      {
        title: "Compliance review flag",
        description:
          "Route advice-heavy or policy-specific questions to licensed staff."
      }
    ],
    dashboardValue: [
      {
        title: "Producer handoff view",
        description:
          "See quote type, priority, renewal timing, missing details, and assigned producer."
      },
      {
        title: "Coverage category tracking",
        description:
          "Separate commercial, personal, benefits, specialty, and staff-handoff requests."
      },
      {
        title: "Renewal follow-up",
        description:
          "Keep renewal-window prospects visible until timing is right for a producer conversation."
      }
    ],
    faqs: [
      {
        question: "Can SignalOps quote insurance automatically?",
        answer:
          "No. SignalOps should collect details, route the lead, and support follow-up. Quotes and coverage advice should stay with licensed staff and approved tools."
      },
      {
        question: "Can it separate personal and commercial leads?",
        answer:
          "Yes. The intake can identify coverage type and route the request to the right producer or follow-up path."
      },
      {
        question: "Can it help with renewal timing?",
        answer:
          "Yes. Renewal date or timing can be used to schedule follow-up reminders and prioritize near-term opportunities."
      },
      {
        question: "Can this work with an existing agency CRM?",
        answer:
          "Yes. SignalOps is designed so CRM logging and webhook integrations can be added when the agency is ready."
      }
    ],
    relatedLinks: [
      {
        href: "/services/ai-lead-qualification",
        title: "AI Lead Intake",
        description: "Prioritize quote requests by coverage type, urgency, and completeness."
      },
      {
        href: "/services/automated-lead-follow-up",
        title: "Automated Lead Follow-Up",
        description: "Follow up on missing quote details and renewal timing."
      },
      {
        href: "/demo",
        title: "View Client Demo",
        description: "See a live SignalOps demo with priority sorting, routing, and follow-up."
      },
      {
        href: "/how-it-works",
        title: "How SignalOps Works",
        description: "See how intake, routing, and follow-up connect."
      }
    ]
  },
  "auto-shops": {
    id: "auto-shops",
    industryName: "Auto Shops",
    path: "/industries/auto-shops",
    eyebrow: "SignalOps for auto shops",
    metaTitle: "AI Lead Response for Auto Shops",
    metaDescription:
      "SignalOps provides AI lead response for auto shops with repair intake, diagnostic lead intake, appointment booking prompts, and lead follow-up automation.",
    h1: "AI lead response for auto shops that need cleaner intake and faster booking.",
    subheadline:
      "SignalOps helps repair shops capture vehicle details, symptoms, urgency, service needs, and appointment intent so customers do not get lost between missed calls and busy bays.",
    heroBullets: [
      "Collect year, make, model, symptoms, drivability, and preferred appointment time",
      "Flag urgent safety or drivability concerns for staff handoff",
      "Follow up on estimates, diagnostics, and unbooked appointment requests"
    ],
    missedLeadProblems: [
      {
        title: "Shop phones ring while work is happening",
        description:
          "Service advisors and owners are often handling customers, parts, tech questions, and estimates when new calls come in."
      },
      {
        title: "Vehicle details are missing",
        description:
          "A repair lead without year, make, model, symptoms, and drivability status slows down the callback."
      },
      {
        title: "High-priority issues need quick triage",
        description:
          "Brake, overheating, shaking, no-start, and warning-light concerns may need faster staff handoff."
      },
      {
        title: "Estimate follow-up gets buried",
        description:
          "Customers who asked about repairs or diagnostics may need a clear reminder to book."
      }
    ],
    leadSources: [
      "Missed calls",
      "Website appointment forms",
      "Google Business Profile",
      "Texts from existing customers",
      "Repair quote forms",
      "Email inquiries",
      "Facebook messages",
      "Referral leads"
    ],
    exampleLeadFlow: [
      {
        title: "Customer asks for repair help",
        description:
          "The lead comes from a missed call, appointment form, quote request, text, or Google profile call."
      },
      {
        title: "SignalOps collects vehicle context",
        description:
          "The system asks for year, make, model, symptoms, warning lights, drivability, and preferred appointment time."
      },
      {
        title: "Urgency is flagged",
        description:
          "No-start, overheating, brake concerns, shaking, and safety language can route to a service advisor quickly."
      },
      {
        title: "Appointment follow-up continues",
        description:
          "If the customer does not book, SignalOps follows up with the next practical scheduling step."
      }
    ],
    followUpFailures: [
      {
        title: "No vehicle context before callback",
        description:
          "The advisor has to start from zero instead of seeing the vehicle, symptom, urgency, and requested time."
      },
      {
        title: "Appointment interest fades",
        description:
          "A customer asking for availability may book elsewhere if they do not get a fast path to schedule."
      },
      {
        title: "Diagnostics and estimates are not tracked",
        description:
          "Open estimate questions and diagnostic requests can disappear when the shop gets busy."
      }
    ],
    qualificationQuestions: [
      "What is the vehicle year, make, model, and mileage if known?",
      "What symptoms or service do you need help with?",
      "Is the vehicle drivable right now?",
      "Are there warning lights, noises, shaking, overheating, brake concerns, or no-start symptoms?",
      "Are you looking for a quote, diagnostic appointment, maintenance, or repair booking?",
      "What appointment window works best for you?"
    ],
    instantReply: {
      scenario: "Customer asks about a shaking vehicle",
      message:
        "Thanks for reaching out. Vehicle shaking can have several causes, so we will want a team member to review it. Can you send the year/make/model, when the shaking happens, whether the vehicle is drivable, and your preferred appointment time?"
    },
    internalNote: {
      scenario: "Auto repair lead with drivability concern",
      message:
        "Possible drivability/safety issue. Prioritize service advisor callback. Gather year/make/model, symptoms, speed or conditions, warning lights, drivability, and requested appointment window."
    },
    followUpExamples: [
      {
        scenario: "Missing vehicle details",
        message:
          "Quick follow-up: can you send the year, make, model, and symptoms so the service advisor has the right context?"
      },
      {
        scenario: "Appointment interest",
        message:
          "Checking in on your appointment request. Do you still want us to look at available times?"
      },
      {
        scenario: "Estimate follow-up",
        message:
          "Following up on the estimate question. Would you like a service advisor to review the next step with you?"
      }
    ],
    scoringRules: [
      {
        title: "Hot",
        description:
          "No-start, overheating, brake concern, shaking, clear vehicle details, phone number, and appointment intent."
      },
      {
        title: "Warm",
        description:
          "Maintenance, diagnostic question, estimate request, or known service need with good contact info."
      },
      {
        title: "Needs review",
        description:
          "Safety concern, vague symptom, missing contact details, warranty dispute, or unsupported service."
      }
    ],
    automations: [
      {
        title: "Vehicle intake form",
        description:
          "Capture year, make, model, mileage, symptoms, warning lights, and drivability."
      },
      {
        title: "Missed-call text back",
        description:
          "Ask auto repair callers what they need when the shop cannot answer."
      },
      {
        title: "Appointment follow-up",
        description:
          "Nudge customers who asked for availability but did not book."
      },
      {
        title: "Advisor alert",
        description:
          "Route high-priority repair leads with a concise internal note."
      }
    ],
    dashboardValue: [
      {
        title: "Advisor queue",
        description:
          "See which leads need callbacks, vehicle details, diagnostics, estimate follow-up, or appointment booking."
      },
      {
        title: "Urgency visibility",
        description:
          "Separate safety, no-start, overheating, shaking, and routine maintenance leads."
      },
      {
        title: "Estimate follow-up tracking",
        description:
          "Keep diagnostic and repair estimate leads from disappearing after the first reply."
      }
    ],
    faqs: [
      {
        question: "Can SignalOps diagnose car problems?",
        answer:
          "No. It can collect symptoms and route the lead, but diagnosis should stay with ready shop staff."
      },
      {
        question: "Can it collect year, make, and model?",
        answer:
          "Yes. Vehicle details are a core intake field for auto shop workflows."
      },
      {
        question: "Can it help with missed calls?",
        answer:
          "Yes. Missed-call text back is often one of the first automations an auto shop should install."
      },
      {
        question: "Can it follow up after estimates?",
        answer:
          "Yes. SignalOps can remind customers about open estimates or appointment options without adding more manual work."
      }
    ],
    relatedLinks: [
      {
        href: "/industries/mobile-fleet-wash",
        title: "Mobile Fleet Wash Demo Niche",
        description: "See a more specific automotive workflow for fleet wash quote intake and recurring account handoff."
      },
      {
        href: "/services/automated-lead-follow-up",
        title: "Lead Follow-Up Automation",
        description: "Follow up on auto repair estimates and unbooked appointment requests."
      },
      {
        href: "/services/ai-lead-response",
        title: "AI Lead Response System",
        description: "Answer auto shop calls, forms, and texts before customers go cold."
      },
      {
        href: "/demo",
        title: "View Client Demo",
        description: "See a live SignalOps demo with quote intake and lead intake."
      },
      {
        href: "/how-it-works",
        title: "How SignalOps Works",
        description: "See how intake, intake, routing, booking, and follow-up connect."
      },
      {
        href: "/missed-call-text-back",
        title: "Missed-Call Text Back",
        description: "Catch auto repair callers when service advisors are busy."
      }
    ]
  },
  "well-water-service-companies": {
    id: "well-water-service-companies",
    industryName: "Well and Water Service Companies",
    path: "/industries/well-water-service-companies",
    eyebrow: "SignalOps for well and water service companies",
    metaTitle: "AI Lead Response for Well and Water Service Companies",
    metaDescription:
      "SignalOps helps well and water service companies capture calls, texts, no-water emergencies, maintenance leads, and commercial requests with AI lead response.",
    h1: "AI lead response for well and water service companies that run on calls, texts, and follow-up.",
    subheadline:
      "SignalOps helps small 3-person well and water teams capture emergency no-water issues, routine filter changes, maintenance requests, and occasional large commercial jobs without burying opportunities in text threads.",
    heroBullets: [
      "Built for low daily job volume where every missed request matters",
      "Separate emergency no-water calls from routine maintenance and filter changes",
      "Route large commercial or industrial opportunities to the owner for review"
    ],
    missedLeadProblems: [
      {
        title: "The team is doing the work and answering the phone",
        description:
          "In a 3-person operation, the same people may be servicing filters, diagnosing pressure issues, texting customers, quoting jobs, and managing follow-up."
      },
      {
        title: "Low daily volume makes every lead count",
        description:
          "When a company usually handles 1-2 jobs per day, a missed filter replacement, maintenance request, or no-water issue can matter."
      },
      {
        title: "Emergency requests need fast separation",
        description:
          "A no-water issue or major pressure problem should be treated differently than a routine filter change."
      },
      {
        title: "Big commercial opportunities can get buried",
        description:
          "Occasional large commercial or industrial jobs need owner review and clear scope gathering, not a casual text thread."
      }
    ],
    leadSources: [
      "Phone calls",
      "Texts from existing customers",
      "Website service request forms",
      "Missed calls",
      "Google Business Profile",
      "Referral calls",
      "Commercial inquiry emails",
      "Maintenance reminder replies"
    ],
    followUpFailures: [
      {
        title: "Routine service reminders are informal",
        description:
          "Filter changes and water treatment maintenance can depend on memory instead of a repeatable follow-up process."
      },
      {
        title: "Emergency details are incomplete",
        description:
          "The team needs address, whether the property has any water, system type, symptoms, and urgency."
      },
      {
        title: "Commercial scope is not captured",
        description:
          "Larger projects need site details, issue, timeline, decision-maker, and owner review."
      }
    ],
    instantReply: {
      scenario: "Customer reports no water",
      message:
        "Thanks for reaching out. No-water issues can be urgent. Can you confirm your address and whether this seems like a well pump issue, pressure issue, or filtration system issue? We will review this and get you pointed in the right direction."
    },
    internalNote: {
      scenario: "Small well and water service lead",
      message:
        "Possible urgent no-water issue. Prioritize callback. Get address, pump/system details, whether property has any water currently, recent service history, and best access time."
    },
    scoringRules: [
      {
        title: "Priority",
        description:
          "No water, major pressure issue, commercial request, large project, repeat customer with urgent need, phone number, location, and clear issue."
      },
      {
        title: "Routine",
        description:
          "Filter replacement, routine maintenance, water testing, mild pressure issue, or quote request with good contact details."
      },
      {
        title: "Needs details or review",
        description:
          "General question, missing phone/location, vague future project, or commercial scope that needs owner review."
      }
    ],
    automations: [
      {
        title: "Missed-call text back",
        description:
          "Capture service requests when the small team is on-site or driving."
      },
      {
        title: "Emergency lead alert",
        description:
          "Flag no-water, major pressure, and urgent system issues for fast callback."
      },
      {
        title: "Maintenance reminder follow-up",
        description:
          "Track routine filter changes, water treatment maintenance, and recurring service."
      },
      {
        title: "Commercial project routing",
        description:
          "Route larger water system opportunities to the owner with scope, location, and timeline."
      }
    ],
    faqs: [
      {
        question: "Can SignalOps work for a very small well and water company?",
        answer:
          "Yes. SignalOps is a strong fit when a small team relies on calls and texts and does not have a formal lead system."
      },
      {
        question: "Can it separate emergency no-water issues from maintenance?",
        answer:
          "Yes. The priority rules can flag no-water and major pressure problems while routing filter changes and routine maintenance differently."
      },
      {
        question: "Can it help with low daily job volume?",
        answer:
          "Yes. When the business only handles a few jobs per day, tracking each request and follow-up clearly can protect valuable work."
      },
      {
        question: "Can it route commercial or industrial opportunities?",
        answer:
          "Yes. Large project inquiries can be tagged and routed to the owner for review with scope, site, and timeline details."
      }
    ],
    relatedLinks: [
      {
        href: "/no-crm-lead-tracking",
        title: "No-CRM Lead Tracking",
        description: "Track calls, texts, and follow-ups without forcing a heavy CRM."
      },
      {
        href: "/lead-management-for-small-business",
        title: "Small Business Lead Management",
        description: "Give small teams a simple lead status dashboard."
      },
      {
        href: "/live-demo",
        title: "Generate a Well and Water Demo",
        description: "Create a tailored SignalOps preview for a well and water service company."
      }
    ]
  },
  "mobile-fleet-wash": {
    id: "mobile-fleet-wash",
    industryName: "Mobile Fleet Wash Companies",
    path: "/industries/mobile-fleet-wash",
    eyebrow: "SignalOps for mobile fleet wash companies",
    metaTitle: "AI Lead Response for Mobile Fleet Wash Companies",
    metaDescription:
      "SignalOps gives mobile fleet wash companies AI lead response and quote intake automation for fleet size, vehicle types, service frequency, route scheduling, and recurring account handoff.",
    h1: "AI lead response for mobile fleet wash companies that live on quote requests and recurring accounts.",
    subheadline:
      "SignalOps helps mobile fleet washing teams respond to fleet quote requests, collect account details, route recurring opportunities, and follow up before buyers go cold.",
    heroBullets: [
      "Collect fleet size, vehicle types, locations, frequency, wash window, and site notes",
      "Route recurring account opportunities to the owner with a clear next action",
      "Follow up on fleet quotes, service windows, and account handoffs"
    ],
    missedLeadProblems: [
      {
        title: "Fleet quote requests are incomplete",
        description:
          "Vehicle count, vehicle types, location count, frequency, water access, and preferred wash window are often missing from the first message."
      },
      {
        title: "Recurring accounts get buried",
        description:
          "A biweekly fleet plan or dealership lot refresh should not sit beside one-off price shoppers without priority routing."
      },
      {
        title: "Route windows need better intake",
        description:
          "After-hours, weekend, and low-disruption service windows need site access and scheduling details before the quote path is clear."
      },
      {
        title: "Quote follow-up is inconsistent",
        description:
          "Fleet managers may need a short reminder to confirm locations, service frequency, or the first wash window."
      }
    ],
    leadSources: [
      "Website fleet quote forms",
      "Missed calls",
      "Google Business Profile",
      "Referral partners",
      "Dealership account emails",
      "Facebook messages",
      "Paid search landing pages",
      "Chat widgets"
    ],
    exampleLeadFlow: [
      {
        title: "Fleet manager submits a quote request",
        description:
          "The lead asks about 28 service vans across two DFW locations with biweekly after-hours washing."
      },
      {
        title: "SignalOps collects account details",
        description:
          "The system asks for fleet size, vehicle types, locations, desired frequency, preferred wash window, water access, and site requirements."
      },
      {
        title: "Recurring account is routed",
        description:
          "The opportunity is routed with priority, account value context, site notes, and the next action for the owner."
      },
      {
        title: "Follow-up keeps the quote moving",
        description:
          "If the customer does not confirm locations or a service window, SignalOps sends a specific next-step follow-up."
      }
    ],
    followUpFailures: [
      {
        title: "Fleet size is missing",
        description:
          "A company asks for pricing but does not share vehicle count or vehicle types, so the quote stalls."
      },
      {
        title: "Locations are unclear",
        description:
          "The owner needs service area, number of sites, and route timing before estimating feasibility."
      },
      {
        title: "Frequency is not confirmed",
        description:
          "Recurring account value depends on whether the buyer wants weekly, biweekly, monthly, or one-time service."
      }
    ],
    qualificationQuestions: [
      "How many vehicles need service?",
      "What vehicle types are in the fleet?",
      "How many service locations are involved?",
      "What service area or city should RouteWash review?",
      "What wash frequency do you want: one-time, biweekly, monthly, or custom?",
      "What wash window works best: business hours, after-hours, weekend, or route-based?",
      "Is water access available, and are there any site requirements the team should know?"
    ],
    instantReply: {
      scenario: "Fleet manager asks about biweekly washing for 28 service vans",
      message:
        "Thanks for reaching out. To prepare the right fleet quote path, can you confirm fleet size, vehicle types, service locations, desired frequency, preferred wash window, and whether water access or site requirements need review?"
    },
    internalNote: {
      scenario: "Mobile fleet wash quote request",
      message:
        "Recurring account opportunity. Customer has 28 service vans across two locations and wants biweekly after-hours service. Confirm service area, water access, route window, site notes, and first available quote call."
    },
    followUpExamples: [
      {
        scenario: "Location details missing",
        message:
          "Quick follow-up: can you send the service city or addresses and how many vehicles are at each location? That helps us prepare a cleaner fleet quote path."
      },
      {
        scenario: "Frequency unclear",
        message:
          "Checking in on the fleet wash quote. Are you looking for one-time service, biweekly service, monthly service, or a custom recurring plan?"
      },
      {
        scenario: "Wash window unclear",
        message:
          "One more detail so the team can route this correctly: do you prefer business-hours service, after-hours service, weekend service, or another low-disruption window?"
      }
    ],
    scoringRules: [
      {
        title: "Hot",
        description:
          "Recurring account, 25+ vehicles, multiple locations, dealership/rental fleet, clear phone, desired frequency, and preferred wash window."
      },
      {
        title: "Warm",
        description:
          "Single-location fleet quote, small company car fleet, dealership refresh, or clear service request with a few missing details."
      },
      {
        title: "Owner handoff",
        description:
          "Multi-location accounts, after-hours needs, large fleet counts, site requirements, or unclear route logistics."
      }
    ],
    automations: [
      {
        title: "Fleet detail intake",
        description:
          "Ask for vehicle count, vehicle types, location count, service area, frequency, and preferred wash window."
      },
      {
        title: "Recurring account routing",
        description:
          "Route biweekly, monthly, dealership, rental, and multi-location opportunities to the owner with account context."
      },
      {
        title: "Site requirement collection",
        description:
          "Collect water access, parking, timing, gate/access notes, and local site requirements without promising compliance."
      },
      {
        title: "Quote follow-up",
        description:
          "Follow up after quote requests, missing site details, service window questions, or unconfirmed first service dates."
      }
    ],
    dashboardValue: [
      {
        title: "Account opportunities",
        description:
          "See which leads are recurring, one-time, dealership, rental, or route-based account opportunities."
      },
      {
        title: "Details needed",
        description:
          "Separate leads missing fleet size, vehicle types, location count, water access, or wash window."
      },
      {
        title: "Route and follow-up view",
        description:
          "Track account handoffs, quote follow-ups, first-service windows, and recurring plan status."
      }
    ],
    faqs: [
      {
        question: "Can SignalOps collect fleet wash quote details?",
        answer:
          "Yes. It can ask for fleet size, vehicle types, locations, frequency, wash window, water access, and site notes before owner handoff."
      },
      {
        question: "Can it route recurring account opportunities?",
        answer:
          "Yes. Recurring, multi-location, dealership, rental, and larger fleet requests can be routed with priority and a clear next action."
      },
      {
        question: "Can it handle after-hours service questions?",
        answer:
          "Yes. SignalOps can collect preferred service windows, access notes, and site requirements so the team can review feasibility before quoting."
      },
      {
        question: "Can it follow up on fleet quotes?",
        answer:
          "Yes. SignalOps can remind prospects to confirm vehicle counts, locations, service frequency, and first-service windows."
      }
    ],
    relatedLinks: [
      {
        href: "/demo",
        title: "View the RouteWash Mobile Fleet Care AI lead demo",
        description: "View the live mobile fleet wash demo with AI intake output."
      },
      {
        href: "/services/quote-intake-automation",
        title: "Quote Intake Automation",
        description: "Collect fleet size, vehicle types, service frequency, route windows, and account notes."
      },
      {
        href: "/services/ai-lead-qualification",
        title: "AI Lead Intake",
        description: "Route fleet wash leads by account value, urgency, service area, and next action."
      },
      {
        href: "/how-it-works",
        title: "How SignalOps Works",
        description: "See how intake, priority sorting, routing, booking, and follow-up connect."
      }
    ]
  }
};

export function getIndustrySeoPage(id: string) {
  return INDUSTRY_SEO_PAGES[id as IndustryPageId];
}
