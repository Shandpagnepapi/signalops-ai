import type { SeoFaq } from "@/lib/seo";

export const INDUSTRY_PAGE_IDS = [
  "roofers",
  "hvac",
  "plumbers",
  "med-spas",
  "insurance-agencies",
  "auto-shops",
  "well-water-service-companies",
  "wheel-repair"
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
  followUpFailures: IndustrySeoCard[];
  instantReply: IndustryExampleMessage;
  internalNote: IndustryExampleMessage;
  scoringRules: IndustrySeoCard[];
  automations: IndustrySeoCard[];
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
    eyebrow: "LeadOps for roofing companies",
    metaTitle: "AI Lead Response for Roofers and Roofing Companies",
    metaDescription:
      "LeadOps helps roofing companies respond faster to roof repair, storm damage, inspection, and replacement leads with qualification, follow-up, and routing.",
    h1: "AI lead response for roofers who cannot afford slow follow-up.",
    subheadline:
      "LeadOps helps roofing teams capture calls, forms, storm inquiries, inspection requests, and quote follow-ups before homeowners call the next contractor.",
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
          "Homeowners often contact multiple roofers. A delayed reply can turn a qualified inspection lead into a lost job."
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
        title: "Hot",
        description:
          "Active leak, storm damage, replacement request, clear address, phone number, and inspection intent."
      },
      {
        title: "Warm",
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
          "Send urgent and high-value roofing leads with summary, score, and next action."
      }
    ],
    faqs: [
      {
        question: "Can LeadOps qualify emergency roof leak leads?",
        answer:
          "Yes. LeadOps can flag active leak language, request key details, and alert a human for urgent review."
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
          "Yes. LeadOps can support storm damage forms, missed calls, ad leads, and inspection requests."
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
        description: "Create a tailored LeadOps preview for a roofing company."
      }
    ]
  },
  hvac: {
    id: "hvac",
    industryName: "HVAC Companies",
    path: "/industries/hvac",
    eyebrow: "LeadOps for HVAC companies",
    metaTitle: "AI Lead Response for HVAC Companies",
    metaDescription:
      "LeadOps helps HVAC companies respond to repair, replacement, maintenance, and emergency leads with fast qualification, routing, and follow-up.",
    h1: "AI lead response for HVAC companies that need faster callbacks and cleaner booking.",
    subheadline:
      "LeadOps helps HVAC teams separate emergency no-heat or no-cool calls from tune-ups, replacement estimates, and general questions so the right leads get handled first.",
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
        title: "Hot",
        description:
          "No heat, no cooling, system down, replacement interest, clear contact info, address, and ready-to-schedule language."
      },
      {
        title: "Warm",
        description:
          "Tune-up, maintenance, mild performance issue, quote request, or customer comparing options soon."
      },
      {
        title: "Cold or review",
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
        question: "Can LeadOps separate emergency HVAC leads from routine maintenance?",
        answer:
          "Yes. The intake and scoring rules can flag no-heat, no-cool, and system-down language for faster human review."
      },
      {
        question: "Can this help with HVAC replacement estimates?",
        answer:
          "Yes. LeadOps can collect system details, timeline, contact info, and follow up if the customer does not book a consultation."
      },
      {
        question: "Does it connect to dispatch software?",
        answer:
          "The architecture is designed for future integrations. LeadOps can start in mock or dashboard mode, then connect to CRM, dispatch, or calendar tools when ready."
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
        title: "AI Lead Qualification",
        description: "Score HVAC leads by urgency, job type, and booking intent."
      },
      {
        href: "/live-demo",
        title: "Generate an HVAC Demo",
        description: "Build a tailored LeadOps preview for an HVAC company."
      }
    ]
  },
  plumbers: {
    id: "plumbers",
    industryName: "Plumbers",
    path: "/industries/plumbers",
    eyebrow: "LeadOps for plumbing companies",
    metaTitle: "AI Lead Response for Plumbers and Plumbing Companies",
    metaDescription:
      "LeadOps helps plumbers capture emergency calls, quote requests, inspection leads, and follow-ups with AI-assisted intake, scoring, and routing.",
    h1: "AI lead response for plumbers who need to catch urgent jobs fast.",
    subheadline:
      "LeadOps helps plumbing teams triage emergency leaks, drain issues, water heater calls, estimates, and routine service requests without losing leads in missed calls or texts.",
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
        question: "Can LeadOps handle plumbing emergency language?",
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
          "Yes. LeadOps is especially useful when the same people are answering calls, doing jobs, quoting work, and following up."
      },
      {
        question: "Does LeadOps dispatch plumbers automatically?",
        answer:
          "Not by default. It can prepare the intake, score the lead, and route the next step. Dispatch rules should be configured carefully with the business."
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
        description: "Create a tailored LeadOps preview for a plumbing company."
      }
    ]
  },
  "med-spas": {
    id: "med-spas",
    industryName: "Med Spas",
    path: "/industries/med-spas",
    eyebrow: "LeadOps for med spas",
    metaTitle: "AI Lead Response for Med Spas",
    metaDescription:
      "LeadOps helps med spas respond to consultation requests, treatment questions, booking inquiries, and follow-ups with practical AI-assisted workflows.",
    h1: "AI lead response for med spas that need faster consultation follow-up.",
    subheadline:
      "LeadOps helps med spas answer new inquiries, collect treatment interest, route sensitive questions to staff, and follow up with prospects who do not book.",
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
        title: "Promotion leads are not qualified",
        description:
          "Promo-driven inquiries may need treatment interest, timeline, and eligibility review before booking."
      }
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
        title: "Human review",
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
          "Flag medical, safety, or treatment-specific questions for a qualified team member."
      },
      {
        title: "No-booking reminder",
        description:
          "Follow up with prospects who asked questions but did not schedule."
      }
    ],
    faqs: [
      {
        question: "Can AI answer medical treatment questions?",
        answer:
          "LeadOps should be conservative. It can collect context and route questions to staff, but it should not provide medical advice or make treatment promises."
      },
      {
        question: "Can LeadOps help with Instagram and Facebook inquiries?",
        answer:
          "Yes. Social DMs are a strong use case because many prospects ask questions there before booking."
      },
      {
        question: "Can it follow up after consultations are requested?",
        answer:
          "Yes. LeadOps can nudge prospects to choose a time, provide missing details, or wait for a staff callback."
      },
      {
        question: "Will this feel too robotic for a premium med spa?",
        answer:
          "The messaging should be written in the brand voice and kept concise, helpful, and staff-friendly."
      }
    ],
    relatedLinks: [
      {
        href: "/ai-follow-up-automation",
        title: "AI Follow-Up Automation",
        description: "Follow up with consultation and treatment inquiries."
      },
      {
        href: "/ai-lead-qualification",
        title: "AI Lead Qualification",
        description: "Prioritize booking-ready prospects and staff-review cases."
      },
      {
        href: "/live-demo",
        title: "Generate a Med Spa Demo",
        description: "Create a tailored LeadOps preview for a med spa."
      }
    ]
  },
  "insurance-agencies": {
    id: "insurance-agencies",
    industryName: "Insurance Agencies",
    path: "/industries/insurance-agencies",
    eyebrow: "LeadOps for insurance agencies",
    metaTitle: "AI Lead Response for Insurance Agencies",
    metaDescription:
      "LeadOps helps insurance agencies respond to quote requests, policy questions, renewal opportunities, and follow-ups with structured intake and routing.",
    h1: "AI lead response for insurance agencies that need faster quote follow-up.",
    subheadline:
      "LeadOps helps agencies organize quote requests, coverage questions, renewal opportunities, and missed calls so producers can focus on qualified prospects.",
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
        title: "Human review",
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
    faqs: [
      {
        question: "Can LeadOps quote insurance automatically?",
        answer:
          "No. LeadOps should collect details, route the lead, and support follow-up. Quotes and coverage advice should stay with licensed staff and approved tools."
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
          "Yes. LeadOps is designed so CRM logging and webhook integrations can be added when the agency is ready."
      }
    ],
    relatedLinks: [
      {
        href: "/ai-lead-qualification",
        title: "AI Lead Qualification",
        description: "Prioritize quote requests by coverage type, urgency, and completeness."
      },
      {
        href: "/ai-follow-up-automation",
        title: "AI Follow-Up Automation",
        description: "Follow up on missing quote details and renewal timing."
      },
      {
        href: "/live-demo",
        title: "Generate an Insurance Demo",
        description: "Create a tailored LeadOps preview for an insurance agency."
      }
    ]
  },
  "auto-shops": {
    id: "auto-shops",
    industryName: "Auto Shops",
    path: "/industries/auto-shops",
    eyebrow: "LeadOps for auto shops",
    metaTitle: "AI Lead Response for Auto Repair Shops",
    metaDescription:
      "LeadOps helps auto repair shops respond to repair requests, diagnostic inquiries, appointment leads, and estimate follow-ups with practical AI-assisted workflows.",
    h1: "AI lead response for auto shops that need cleaner intake and faster booking.",
    subheadline:
      "LeadOps helps repair shops capture vehicle details, symptoms, urgency, service needs, and appointment intent so customers do not get lost between missed calls and busy bays.",
    heroBullets: [
      "Collect year, make, model, symptoms, drivability, and preferred appointment time",
      "Flag urgent safety or drivability concerns for human review",
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
          "Brake, overheating, shaking, no-start, and warning-light concerns may need faster human review."
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
    faqs: [
      {
        question: "Can LeadOps diagnose car problems?",
        answer:
          "No. It can collect symptoms and route the lead, but diagnosis should stay with qualified shop staff."
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
          "Yes. LeadOps can remind customers about open estimates or appointment options without adding more manual work."
      }
    ],
    relatedLinks: [
      {
        href: "/industries/wheel-repair",
        title: "Wheel Repair Demo Niche",
        description: "See a more specific automotive workflow for wheel repair and refinishing."
      },
      {
        href: "/missed-call-text-back",
        title: "Missed-Call Text Back",
        description: "Catch auto repair callers when service advisors are busy."
      },
      {
        href: "/live-demo",
        title: "Generate an Auto Shop Demo",
        description: "Create a tailored LeadOps preview for an auto repair shop."
      }
    ]
  },
  "well-water-service-companies": {
    id: "well-water-service-companies",
    industryName: "Well and Water Service Companies",
    path: "/industries/well-water-service-companies",
    eyebrow: "LeadOps for well and water service companies",
    metaTitle: "AI Lead Response for Well and Water Service Companies",
    metaDescription:
      "LeadOps helps small well and water service companies capture calls, texts, emergency no-water issues, filter changes, maintenance requests, and larger commercial opportunities.",
    h1: "AI lead response for well and water service companies that run on calls, texts, and follow-up.",
    subheadline:
      "LeadOps helps small 3-person well and water teams capture emergency no-water issues, routine filter changes, maintenance requests, and occasional large commercial jobs without burying opportunities in text threads.",
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
        title: "Hot",
        description:
          "No water, major pressure issue, commercial request, large project, repeat customer with urgent need, phone number, location, and clear issue."
      },
      {
        title: "Warm",
        description:
          "Filter replacement, routine maintenance, water testing, mild pressure issue, or quote request with good contact details."
      },
      {
        title: "Cold or review",
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
        question: "Can LeadOps work for a very small well and water company?",
        answer:
          "Yes. LeadOps is a strong fit when a small team relies on calls and texts and does not have a formal lead system."
      },
      {
        question: "Can it separate emergency no-water issues from maintenance?",
        answer:
          "Yes. The scoring rules can flag no-water and major pressure problems while routing filter changes and routine maintenance differently."
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
        description: "Create a tailored LeadOps preview for a well and water service company."
      }
    ]
  },
  "wheel-repair": {
    id: "wheel-repair",
    industryName: "Wheel Repair Shops",
    path: "/industries/wheel-repair",
    eyebrow: "LeadOps for wheel repair shops",
    metaTitle: "AI Lead Response for Wheel Repair Shops",
    metaDescription:
      "LeadOps helps wheel repair shops qualify quote requests, request photos, route urgent bent or cracked wheel leads, book mobile repair, and follow up after estimates.",
    h1: "AI lead response for wheel repair shops that live on quote requests and photos.",
    subheadline:
      "LeadOps helps wheel repair and refinishing shops respond to quote requests, collect damage photos, qualify mobile repair opportunities, and route urgent or commercial leads quickly.",
    heroBullets: [
      "Request photos, vehicle details, wheel size, damage type, and appointment preference",
      "Flag bent wheels, cracked wheels, and drivability issues for human inspection",
      "Follow up after estimates for mobile repair, refinishing, and commercial opportunities"
    ],
    missedLeadProblems: [
      {
        title: "Quote requests need photos",
        description:
          "Curb rash, peeling clear coat, bent wheels, refinishing, and powder coating leads are hard to quote without visual context."
      },
      {
        title: "Mobile repair requests need scheduling",
        description:
          "Customers often want mobile service, but the shop needs location, damage type, number of wheels, and timing."
      },
      {
        title: "Structural issues require careful language",
        description:
          "Bent or cracked wheels should be flagged for inspection. If a wheel is unsafe, replacement may be recommended instead of repair."
      },
      {
        title: "Dealer and commercial leads need routing",
        description:
          "Dealerships, fleets, and repeat commercial accounts should not be buried beside single-wheel cosmetic questions."
      }
    ],
    leadSources: [
      "Website quote forms",
      "Photo submissions",
      "Missed calls",
      "Google Business Profile",
      "Instagram DMs",
      "Facebook messages",
      "Dealership referrals",
      "Commercial account emails"
    ],
    followUpFailures: [
      {
        title: "Photos are missing",
        description:
          "A customer asks for a quote but never sends wheel photos, so the opportunity stalls."
      },
      {
        title: "Urgent bent-wheel leads wait too long",
        description:
          "Shaking, vibration, or drivability concerns need faster human review than cosmetic curb rash."
      },
      {
        title: "Estimates are not followed up",
        description:
          "Customers may need a reminder to book after receiving a curb rash, refinishing, or powder coating estimate."
      }
    ],
    instantReply: {
      scenario: "Customer has curb rash on two wheels and asks about mobile repair",
      message:
        "Thanks for reaching out. We can review curb rash photos and let you know the best next step. Can you send clear photos of each wheel, your vehicle year/make/model, wheel size if known, and whether you prefer mobile service?"
    },
    internalNote: {
      scenario: "Wheel repair quote request",
      message:
        "Good cosmetic repair lead. Customer reports curb rash on two wheels and asks about mobile service. Request photos, confirm location, wheel size, finish, and preferred appointment window."
    },
    scoringRules: [
      {
        title: "Hot",
        description:
          "Bent wheel with shaking, cracked wheel question, multiple wheels, dealership/commercial request, clear phone, photos, and appointment intent."
      },
      {
        title: "Warm",
        description:
          "Curb rash with photos, refinishing interest, powder coating request, peeling clear coat, or mobile repair request."
      },
      {
        title: "Human review",
        description:
          "Cracked wheel, unsafe structural language, vehicle not drivable, missing contact info, or unclear damage photos."
      }
    ],
    automations: [
      {
        title: "Photo request follow-up",
        description:
          "Ask for photos when a quote request arrives without enough visual detail."
      },
      {
        title: "Mobile repair routing",
        description:
          "Collect location, damage type, number of wheels, and appointment preference."
      },
      {
        title: "Inspection-required alert",
        description:
          "Route bent, cracked, or drivability-related wheel leads to the shop for human review."
      },
      {
        title: "Estimate follow-up",
        description:
          "Follow up after curb rash, refinishing, powder coating, and commercial estimates."
      }
    ],
    faqs: [
      {
        question: "Can LeadOps ask wheel repair customers for photos?",
        answer:
          "Yes. Photo request follow-up is one of the strongest workflows for wheel repair quote requests."
      },
      {
        question: "Can it handle bent or cracked wheel leads safely?",
        answer:
          "It can flag those leads for human inspection and avoid unsafe repair promises. If a wheel is structurally unsafe, the shop may recommend replacement."
      },
      {
        question: "Can it route mobile repair appointments?",
        answer:
          "Yes. LeadOps can collect service location, damage type, photos, number of wheels, and preferred time before routing the lead."
      },
      {
        question: "Can it help with dealership or fleet opportunities?",
        answer:
          "Yes. Commercial or repeat-account language can trigger owner or sales routing with a more detailed internal note."
      }
    ],
    relatedLinks: [
      {
        href: "/demo",
        title: "Apex Wheel Repair Demo",
        description: "View the live wheel repair demo with AI qualification output."
      },
      {
        href: "/ai-lead-qualification",
        title: "AI Lead Qualification",
        description: "Score wheel leads by damage type, urgency, photos, and value."
      },
      {
        href: "/live-demo",
        title: "Generate a Wheel Repair Demo",
        description: "Create a tailored LeadOps preview for a wheel repair business."
      }
    ]
  }
};

export function getIndustrySeoPage(id: string) {
  return INDUSTRY_SEO_PAGES[id as IndustryPageId];
}
