import type { SeoFaq } from "@/lib/seo";

export type ServicePageId =
  | "ai-lead-response"
  | "ai-lead-qualification"
  | "automated-lead-follow-up"
  | "missed-lead-recovery"
  | "lead-routing-automation"
  | "ai-appointment-booking"
  | "quote-intake-automation";

export type ServicePageCard = {
  title: string;
  description: string;
};

export type ServiceWorkflowStep = {
  label: string;
  title: string;
  description: string;
};

export type ServiceRelatedLink = {
  href: string;
  label: string;
  description: string;
};

export type ServicePageConfig = {
  id: ServicePageId;
  path: string;
  targetKeyword: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subheadline: string;
  problemTitle: string;
  problemIntro: string;
  problemCards: ServicePageCard[];
  solutionTitle: string;
  solutionIntro: string;
  solutionCards: ServicePageCard[];
  workflowTitle: string;
  workflowIntro: string;
  workflow: ServiceWorkflowStep[];
  whoFor: ServicePageCard[];
  benefits: ServicePageCard[];
  examples: ServicePageCard[];
  faqs: SeoFaq[];
  relatedLinks: ServiceRelatedLink[];
};

export const SERVICE_PAGE_IDS: ServicePageId[] = [
  "ai-lead-response",
  "ai-lead-qualification",
  "automated-lead-follow-up",
  "missed-lead-recovery",
  "lead-routing-automation",
  "ai-appointment-booking",
  "quote-intake-automation"
];

const related = {
  response: {
    href: "/services/ai-lead-response",
    label: "AI lead response system",
    description: "Answer calls, texts, forms, DMs, and quote requests before prospects go cold."
  },
  qualification: {
    href: "/services/ai-lead-qualification",
    label: "AI lead intake",
    description: "Priority, summarize, and prioritize leads before the team follows up."
  },
  followUp: {
    href: "/services/automated-lead-follow-up",
    label: "Automated lead follow-up",
    description: "Keep unbooked leads, quote requests, and missing-detail conversations moving."
  },
  recovery: {
    href: "/services/missed-lead-recovery",
    label: "Missed lead recovery",
    description: "Recover leads that slipped through missed calls, slow replies, and forgotten follow-ups."
  },
  routing: {
    href: "/services/lead-routing-automation",
    label: "Lead routing automation",
    description: "Send urgent, high-value, or ready-to-book leads to the right person."
  },
  booking: {
    href: "/services/ai-appointment-booking",
    label: "AI appointment booking",
    description: "Collect scheduling intent and help prospects move toward the right appointment path."
  },
  quote: {
    href: "/services/quote-intake-automation",
    label: "Quote intake automation",
    description: "Collect photos, service details, urgency, and scope before estimate follow-up."
  }
};

export const SERVICE_PAGES: Record<ServicePageId, ServicePageConfig> = {
  "ai-lead-response": {
    id: "ai-lead-response",
    path: "/services/ai-lead-response",
    targetKeyword: "AI lead response system",
    eyebrow: "AI lead response system",
    metaTitle: "AI Lead Response System for Local Businesses | SignalOps",
    metaDescription:
      "SignalOps builds AI lead response systems that help local businesses answer leads instantly, sort prospects, route hot opportunities, and follow up.",
    h1: "AI lead response system for local businesses.",
    subheadline:
      "SignalOps helps service businesses answer calls, texts, forms, DMs, and quote requests quickly with useful next steps, clean lead summaries, and staff handoff when needed.",
    problemTitle: "Most businesses do not have a lead problem. They have a response problem.",
    problemIntro:
      "A prospect who submits a form or sends a DM is usually still shopping. If the first response is slow, vague, or forgotten, the lead can go cold before anyone has a real sales conversation.",
    problemCards: [
      {
        title: "Leads arrive outside office rhythm",
        description:
          "A shop owner may be under a vehicle, a contractor may be on a job, and a med spa front desk may be with a client when a high-intent inquiry arrives."
      },
      {
        title: "First replies are inconsistent",
        description:
          "One person asks for the right details, another sends a short 'we will call you' reply, and another forgets to respond at all."
      },
      {
        title: "Important details are scattered",
        description:
          "Vehicle info, photos, address, service type, urgency, and appointment preference can live across forms, texts, DMs, and emails."
      }
    ],
    solutionTitle: "How SignalOps builds the response layer",
    solutionIntro:
      "SignalOps creates a practical first-response system around the channels your business already uses, then routes the lead into intake, booking, or follow-up.",
    solutionCards: [
      {
        title: "Instant acknowledgement",
        description:
          "The customer gets a quick, useful message confirming the request and explaining what information is needed next."
      },
      {
        title: "Service-specific questions",
        description:
          "A fleet wash lead can be asked for fleet size, vehicle types, locations, and wash window; a plumber can be asked about leak severity and address; a med spa can be routed to staff for sensitive questions."
      },
      {
        title: "Team-ready summary",
        description:
          "The business receives a concise summary with source, service need, urgency, priority, and recommended next action."
      },
      {
        title: "Follow-up if the lead stalls",
        description:
          "If the customer does not send photos, choose a time, or book, the system can send polite reminders."
      }
    ],
    workflowTitle: "Example AI lead response workflow",
    workflowIntro:
      "This is the basic flow SignalOps installs before adding deeper CRM, calendar, SMS, or reporting integrations.",
    workflow: [
      {
        label: "1",
        title: "Lead comes in",
        description:
          "A customer calls, texts, fills out a website form, sends a DM, replies to an ad, or submits a quote request."
      },
      {
        label: "2",
        title: "Response goes out",
        description:
          "SignalOps confirms the request and asks for the next detail needed to move the conversation forward."
      },
      {
        label: "3",
        title: "Lead is ready for handoff",
        description:
          "The system extracts service need, urgency, source, contact completeness, buying intent, and missing details."
      },
      {
        label: "4",
        title: "Team gets the handoff",
        description:
          "The right person sees a summary, suggested reply, priority, tags, and next action."
      }
    ],
    whoFor: [
      {
        title: "Local service businesses",
        description:
          "Roofers, HVAC, plumbers, electricians, well service teams, med spas, and professional offices that receive inbound inquiries."
      },
      {
        title: "Auto service and repair shops",
        description:
          "Mobile fleet wash companies, auto shops, detailers, tint shops, wrap shops, and performance shops handling quote and appointment requests."
      },
      {
        title: "Small teams without extra admin",
        description:
          "Owner-led teams that need faster lead response without hiring another person just to watch inboxes."
      }
    ],
    benefits: [
      {
        title: "Faster speed to lead",
        description:
          "Respond while the prospect is still interested instead of waiting for someone to notice the notification."
      },
      {
        title: "Cleaner customer experience",
        description:
          "Customers receive a useful next step instead of a generic auto-reply or silence."
      },
      {
        title: "Better owner visibility",
        description:
          "See which leads need attention, which are waiting on details, and which should be prioritized."
      }
    ],
    examples: [
      {
        title: "RouteWash Mobile Fleet Care",
        description:
          "A fleet manager asks about biweekly washing for 28 service vans across two DFW locations. SignalOps collects account details and routes it as a recurring fleet quote opportunity."
      },
      {
        title: "ClearFlow Well & Water",
        description:
          "A homeowner reports no water. SignalOps flags urgency, requests address and system details, and prepares an owner alert."
      },
      {
        title: "Local HVAC company",
        description:
          "A no-cool form submission receives an immediate reply collecting address, system issue, timeline, and preferred callback window."
      }
    ],
    faqs: [
      {
        question: "Is an AI lead response system just a chatbot?",
        answer:
          "No. A chatbot can be one channel, but SignalOps focuses on the response workflow behind calls, texts, forms, DMs, quote requests, alerts, CRM logs, and follow-up."
      },
      {
        question: "Can SignalOps work without a CRM?",
        answer:
          "Yes. SignalOps can start with calls, texts, forms, owner alerts, and a simple lead dashboard. CRM integration can come later."
      },
      {
        question: "What happens when AI is unsure?",
        answer:
          "Unclear, urgent, sensitive, or high-value leads are flagged for staff handoff instead of being handled as if the system knows everything."
      }
    ],
    relatedLinks: [related.qualification, related.followUp, related.routing, related.quote]
  },
  "ai-lead-qualification": {
    id: "ai-lead-qualification",
    path: "/services/ai-lead-qualification",
    targetKeyword: "AI lead intake",
    eyebrow: "AI lead intake",
    metaTitle: "AI Lead Intake for Small Business Leads | SignalOps",
    metaDescription:
      "SignalOps uses AI lead intake to sort small business leads, summarize intent, flag urgency, route hot prospects, and trigger follow-up.",
    h1: "AI lead intake for small business leads.",
    subheadline:
      "SignalOps turns messy inquiries into clear lead quality, urgency, recommended next action, and staff-handoff flags so your team knows who to call first.",
    problemTitle: "Not every lead deserves the same response.",
    problemIntro:
      "A ready-to-book customer, a vague price shopper, an urgent repair, and a commercial opportunity all need different handling. When every inquiry is treated the same, strong leads wait too long and weak leads consume too much time.",
    problemCards: [
      {
        title: "High-intent leads get buried",
        description:
          "A customer asking for an appointment can sit beside a general pricing question in the same inbox."
      },
      {
        title: "Missing details slow callbacks",
        description:
          "Without vehicle info, photos, address, service type, or timeline, the team has to chase context before quoting or booking."
      },
      {
        title: "Urgency is easy to miss",
        description:
          "Words like shaking, leaking, no water, emergency, today, or deadline should change how quickly a lead is handled."
      }
    ],
    solutionTitle: "How SignalOps qualifies leads",
    solutionIntro:
      "SignalOps uses service-specific priority rules and AI summaries to separate hot, warm, cold, junk, and staff-handoff leads.",
    solutionCards: [
      {
        title: "Priority",
        description:
          "Priority based on urgency, service value, buying intent, contact completeness, lead source, and industry-specific details."
      },
      {
        title: "Priority and urgency",
        description:
          "Flag hot opportunities, routine requests, research-stage leads, and issues that need immediate staff handoff."
      },
      {
        title: "Internal sales note",
        description:
          "Give the team the plain-English context: what the customer needs, what is missing, and what to do next."
      },
      {
        title: "Tags and routing",
        description:
          "Apply tags such as emergency, needs photos, mobile service, commercial, appointment-ready, or inspection required."
      }
    ],
    workflowTitle: "Example AI intake workflow",
    workflowIntro:
      "Intake should make the next action obvious without pretending AI can replace expert judgment.",
    workflow: [
      {
        label: "1",
        title: "Customer submits a request",
        description:
          "The request includes contact info, service need, message, preferred timing, and sometimes photos or location."
      },
      {
        label: "2",
        title: "SignalOps extracts intent",
        description:
          "The system identifies service type, urgency, buying language, missing details, and risk signals."
      },
      {
        label: "3",
        title: "Priority and priority are assigned",
        description:
          "The lead is labeled hot, warm, cold, junk, or staff-handoff with a confidence level."
      },
      {
        label: "4",
        title: "Next action is recommended",
        description:
          "The business sees whether to call, ask for photos, send booking, route to owner, or review manually."
      }
    ],
    whoFor: [
      {
        title: "Businesses with mixed lead quality",
        description:
          "Some leads are high intent, some are missing key details, and some are not a fit."
      },
      {
        title: "Teams that quote or inspect before selling",
        description:
          "Mobile fleet wash companies, auto shops, contractors, med spas, and well service teams often need intake before a clear next step."
      },
      {
        title: "Owners who need prioritization",
        description:
          "A daily lead list is not enough. You need to know what deserves attention first."
      }
    ],
    benefits: [
      {
        title: "Less time chasing weak leads",
        description:
          "Incomplete or low-intent leads can receive a clarifying follow-up before the team spends manual time."
      },
      {
        title: "Faster action on hot leads",
        description:
          "Urgent or high-value inquiries can trigger alerts and move to the front of the queue."
      },
      {
        title: "More consistent sales handoffs",
        description:
          "Every rep sees the same summary, tags, priority, and recommended next action."
      }
    ],
    examples: [
      {
        title: "Large fleet quote request",
        description:
          "SignalOps flags recurring account potential, recommends owner handoff, and avoids promising final service setup before site requirements are confirmed."
      },
      {
        title: "Routine filter replacement",
        description:
          "A well and water service request with phone, address, and system details can be marked warm and routed for scheduling."
      },
      {
        title: "Med spa consultation request",
        description:
          "Appointment intent can be identified while medical questions are routed to staff for appropriate review."
      }
    ],
    faqs: [
      {
        question: "Can AI decide whether a lead is worth pursuing?",
        answer:
          "It can help prioritize, but final judgment should stay with the business. SignalOps flags uncertainty and routes sensitive cases to humans."
      },
      {
        question: "Can priority rules be customized?",
        answer:
          "Yes. Scoring should reflect your service area, average job value, urgency rules, margins, and sales process."
      },
      {
        question: "What if a lead is vague?",
        answer:
          "SignalOps can ask for missing details and mark the lead lower confidence instead of ignoring it."
      }
    ],
    relatedLinks: [related.response, related.routing, related.followUp, related.quote]
  },
  "automated-lead-follow-up": {
    id: "automated-lead-follow-up",
    path: "/services/automated-lead-follow-up",
    targetKeyword: "automated lead follow-up",
    eyebrow: "Automated lead follow-up",
    metaTitle: "Automated Lead Follow-Up Systems | SignalOps",
    metaDescription:
      "SignalOps builds automated lead follow-up systems for service businesses that need to recover quote requests, missing details, and unbooked appointments.",
    h1: "Automated lead follow-up systems that keep interested prospects moving.",
    subheadline:
      "SignalOps helps businesses follow up after quote requests, missed calls, form submissions, DMs, and appointments without relying on memory or manual reminders.",
    problemTitle: "Most follow-up fails after the first response.",
    problemIntro:
      "A lead may still be interested even if they do not reply immediately. The problem is that missing photos, unbooked estimates, and quiet conversations often get buried in texts, inboxes, or form notifications.",
    problemCards: [
      {
        title: "Customers forget the next step",
        description:
          "They may intend to send photos, approve a quote, or pick an appointment time, then get busy."
      },
      {
        title: "Teams stop after one reply",
        description:
          "If the customer does not respond right away, nobody owns the reminder."
      },
      {
        title: "Old quotes disappear",
        description:
          "Estimate follow-up often depends on scrolling through old messages or remembering who sounded interested."
      }
    ],
    solutionTitle: "How SignalOps automates follow-up",
    solutionIntro:
      "SignalOps builds follow-up sequences around lead status, missing details, quote status, appointment readiness, and staff handoff triggers.",
    solutionCards: [
      {
        title: "Missing-detail reminders",
        description:
          "Ask for photos, address, system details, vehicle info, preferred time, or project scope when the first inquiry is incomplete."
      },
      {
        title: "Quote follow-up",
        description:
          "Send a useful reminder after an estimate is sent but before the opportunity is forgotten."
      },
      {
        title: "No-response paths",
        description:
          "A short sequence can follow up once or twice, then stop before the outreach becomes annoying."
      },
      {
        title: "Reply-based alerts",
        description:
          "When a prospect replies with high intent, urgency, or confusion, the system alerts the right person."
      }
    ],
    workflowTitle: "Example automated follow-up workflow",
    workflowIntro:
      "Good follow-up should be specific. Every message should have a purpose, not just a generic check-in.",
    workflow: [
      {
        label: "1",
        title: "Lead submits request",
        description:
          "A customer asks for a quote but leaves out photos, address, vehicle details, or preferred timing."
      },
      {
        label: "2",
        title: "First reply asks for what is missing",
        description:
          "SignalOps requests the details needed to quote, schedule, or route the lead."
      },
      {
        label: "3",
        title: "Follow-up starts if they go quiet",
        description:
          "The customer receives a polite reminder tied to the original request."
      },
      {
        label: "4",
        title: "Team gets notified when intent returns",
        description:
          "A reply like 'Can you do Friday?' or 'I want to book' triggers a human handoff."
      }
    ],
    whoFor: [
      {
        title: "Quote-based service businesses",
        description:
          "Mobile fleet wash companies, detailing, tint, wraps, contractors, roofers, and HVAC teams that send estimates before booking."
      },
      {
        title: "Businesses with photo requests",
        description:
          "If you need photos before quoting, automated reminders can keep the request alive."
      },
      {
        title: "Small teams with no follow-up owner",
        description:
          "When everyone is busy serving customers, follow-up needs a simple system."
      }
    ],
    benefits: [
      {
        title: "More recovered conversations",
        description:
          "A prospect who was still interested gets a clear next step before choosing someone else."
      },
      {
        title: "Less manual chasing",
        description:
          "The team does not have to remember every quiet lead or unbooked estimate."
      },
      {
        title: "Cleaner pipeline visibility",
        description:
          "See which leads need details, which got quotes, and which are waiting on booking."
      }
    ],
    examples: [
      {
        title: "Fleet wash quote reminder",
        description:
          "A fleet manager asks for pricing but does not confirm locations or wash window. SignalOps follows up with a short detail request."
      },
      {
        title: "Auto shop estimate follow-up",
        description:
          "A repair estimate is sent, then SignalOps checks whether the customer wants to schedule or has questions."
      },
      {
        title: "Well service maintenance reminder",
        description:
          "Routine filter or water treatment customers can receive reminders before maintenance slips."
      }
    ],
    faqs: [
      {
        question: "Will automated follow-up feel spammy?",
        answer:
          "It should not. SignalOps keeps follow-up specific, useful, and limited. The goal is to help the customer complete the next step."
      },
      {
        question: "Can follow-up stop when someone books?",
        answer:
          "Yes. Follow-up should respond to lead status so customers are not reminded after they have already moved forward."
      },
      {
        question: "Can humans take over?",
        answer:
          "Yes. Replies that show urgency, confusion, objections, or high buying intent can alert a person."
      }
    ],
    relatedLinks: [related.recovery, related.quote, related.booking, related.response]
  },
  "missed-lead-recovery": {
    id: "missed-lead-recovery",
    path: "/services/missed-lead-recovery",
    targetKeyword: "missed lead recovery",
    eyebrow: "Missed lead recovery",
    metaTitle: "Missed Lead Recovery for Local Businesses | SignalOps",
    metaDescription:
      "SignalOps helps local businesses recover missed leads from slow replies, missed calls, forgotten follow-ups, unbooked quotes, and incomplete intake.",
    h1: "Missed lead recovery for local businesses.",
    subheadline:
      "SignalOps finds and fixes the moments where leads get missed, delayed, or forgotten across calls, texts, forms, DMs, quotes, and follow-ups.",
    problemTitle: "Missed leads are usually process leaks, not mystery losses.",
    problemIntro:
      "A missed lead can be a phone call that was not answered, a form that sat too long, a quote with no follow-up, a DM nobody owned, or a customer who never got a booking link.",
    problemCards: [
      {
        title: "Missed calls turn into lost buyers",
        description:
          "Many customers call the next provider instead of waiting for a callback."
      },
      {
        title: "Slow replies reduce trust",
        description:
          "If the customer has to wonder whether anyone saw their request, the business already feels less organized."
      },
      {
        title: "Forgotten follow-up hides revenue",
        description:
          "Unbooked quotes and missing-detail leads may still be valuable, but they need a second touch."
      }
    ],
    solutionTitle: "How SignalOps recovers missed leads",
    solutionIntro:
      "SignalOps combines response, intake, follow-up, routing, and dashboard visibility so fewer opportunities disappear silently.",
    solutionCards: [
      {
        title: "Missed-call text back",
        description:
          "A customer who calls while the team is busy receives a quick text asking what they need and how urgent it is."
      },
      {
        title: "Lead status tracking",
        description:
          "Leads can be marked new, contacted, needs photos, ready, booked, won, lost, or follow-up needed."
      },
      {
        title: "Recovery follow-up",
        description:
          "Unanswered inquiries and unbooked quotes can receive practical follow-up before going cold."
      },
      {
        title: "Owner visibility",
        description:
          "The dashboard shows response-needed leads, missed opportunities, and photo requests pending."
      }
    ],
    workflowTitle: "Example missed lead recovery workflow",
    workflowIntro:
      "The first win is usually simple: capture the missed moment, ask a useful question, and give the team a clear next action.",
    workflow: [
      {
        label: "1",
        title: "Lead is missed or delayed",
        description:
          "A call goes unanswered, a form sits in the inbox, or a quote request lacks enough information."
      },
      {
        label: "2",
        title: "SignalOps responds",
        description:
          "The customer receives a helpful message asking for the next detail or offering a scheduling path."
      },
      {
        label: "3",
        title: "Lead is recovered into the pipeline",
        description:
          "The record is prioritized, tagged, and given a status so it is visible again."
      },
      {
        label: "4",
        title: "Team acts or automation follows up",
        description:
          "Hot leads alert a person. Warm leads get booking or quote follow-up."
      }
    ],
    whoFor: [
      {
        title: "Businesses that miss calls during work",
        description:
          "Auto shops, contractors, and small service crews are often too busy serving customers to answer every call."
      },
      {
        title: "Companies running ads",
        description:
          "Paid traffic is expensive. Missed response and weak follow-up waste budget."
      },
      {
        title: "Teams with old quotes and quiet leads",
        description:
          "If follow-up depends on memory, recovery can reveal opportunities already in your pipeline."
      }
    ],
    benefits: [
      {
        title: "Recover more existing demand",
        description:
          "Before buying more ads, fix the inquiries already coming in."
      },
      {
        title: "See where leads leak",
        description:
          "Track whether missed opportunities come from calls, forms, DMs, quotes, or follow-up."
      },
      {
        title: "Prioritize the right callbacks",
        description:
          "Urgent and high-intent leads can move to the front of the queue."
      }
    ],
    examples: [
      {
        title: "Missed call from a fleet wash prospect",
        description:
          "SignalOps texts back asking for fleet size, vehicle types, locations, frequency, and preferred wash window."
      },
      {
        title: "Forgotten HVAC estimate",
        description:
          "A quote follow-up asks whether the customer wants to schedule or has questions before the lead goes cold."
      },
      {
        title: "Unanswered no-water inquiry",
        description:
          "SignalOps flags the issue as urgent and routes it for owner review with address and system details requested."
      }
    ],
    faqs: [
      {
        question: "Is missed lead recovery only for old leads?",
        answer:
          "No. It includes real-time missed-call recovery, slow form response, quote follow-up, and re-engagement of older opportunities."
      },
      {
        question: "Can SignalOps recover every missed lead?",
        answer:
          "No system can guarantee that. SignalOps improves the process so more leads receive a timely, useful next step."
      },
      {
        question: "Where should we start?",
        answer:
          "Start by sending project details so SignalOps can scope the right response, intake, routing, and follow-up system."
      }
    ],
    relatedLinks: [related.response, related.followUp, related.routing, related.booking]
  },
  "lead-routing-automation": {
    id: "lead-routing-automation",
    path: "/services/lead-routing-automation",
    targetKeyword: "lead routing automation",
    eyebrow: "Lead routing automation",
    metaTitle: "Lead Routing Automation for Sales Teams | SignalOps",
    metaDescription:
      "SignalOps builds lead routing automation that sends hot leads, urgent requests, quote inquiries, and appointment-ready prospects to the right person.",
    h1: "Lead routing automation for sales teams and busy owners.",
    subheadline:
      "SignalOps routes leads based on urgency, service type, value, source, missing details, and staff-handoff needs so the right person sees the right opportunity faster.",
    problemTitle: "Good leads lose momentum when they go to the wrong place.",
    problemIntro:
      "A high-value commercial request should not sit in a general inbox. An urgent repair should not wait behind routine questions. A quote request missing photos should not go straight to sales without context.",
    problemCards: [
      {
        title: "Everything hits the same inbox",
        description:
          "General notifications make it hard to separate urgent, high-value, routine, and incomplete leads."
      },
      {
        title: "Owners become the filter",
        description:
          "Without routing rules, every lead depends on the owner deciding who should handle it."
      },
      {
        title: "Sales reps lack context",
        description:
          "A rep may get a notification without the details needed to call intelligently."
      }
    ],
    solutionTitle: "How SignalOps routes leads",
    solutionIntro:
      "SignalOps creates routing logic around lead quality, urgency, service type, location, team roles, CRM status, and follow-up paths.",
    solutionCards: [
      {
        title: "Hot lead alerts",
        description:
          "Urgent, high-value, or appointment-ready leads can alert the owner or rep immediately."
      },
      {
        title: "Service-based routing",
        description:
          "Different request types can route to sales, front desk, estimator, technician, or owner review."
      },
      {
        title: "Missing-info paths",
        description:
          "Incomplete leads can receive a photo or detail request before taking up a rep's time."
      },
      {
        title: "CRM and dashboard logging",
        description:
          "The lead record includes status, source, priority, tags, internal note, and next action."
      }
    ],
    workflowTitle: "Example lead routing workflow",
    workflowIntro:
      "Routing works best after intake, because the system needs to understand what the lead actually needs.",
    workflow: [
      {
        label: "1",
        title: "Lead is ready for handoff",
        description:
          "SignalOps sorts service need, urgency, contact info, buying intent, and missing details."
      },
      {
        label: "2",
        title: "Routing rule is selected",
        description:
          "The lead is sent to owner, sales, front desk, estimator, staff handoff, or automated follow-up."
      },
      {
        label: "3",
        title: "Context is included",
        description:
          "The alert includes summary, priority, urgency, suggested reply, and recommended next action."
      },
      {
        label: "4",
        title: "Pipeline updates",
        description:
          "The lead moves into the right status so the team can see what happened."
      }
    ],
    whoFor: [
      {
        title: "Sales teams with multiple responders",
        description:
          "Teams that need to route leads to owners, estimators, reps, front desk, or technicians."
      },
      {
        title: "Service businesses with urgent calls",
        description:
          "No-water issues, leaks, shaking vehicles, emergency repairs, and deadline-driven requests need fast escalation."
      },
      {
        title: "Companies with commercial opportunities",
        description:
          "Large or multi-site requests should not be handled like routine inbound questions."
      }
    ],
    benefits: [
      {
        title: "Faster handoff",
        description:
          "The right person sees the lead while intent is still fresh."
      },
      {
        title: "Less inbox sorting",
        description:
          "The system separates urgent, ready, incomplete, and routine leads for the team."
      },
      {
        title: "Cleaner accountability",
        description:
          "A lead has a status, owner, and next step instead of floating in a general channel."
      }
    ],
    examples: [
      {
        title: "Site requirement review",
        description:
          "SignalOps routes the lead for owner review and avoids promising compliance or final service setup before local site requirements are confirmed."
      },
      {
        title: "Commercial water system inquiry",
        description:
          "A large project request is routed to the owner with scope, location, timeline, and decision-maker details requested."
      },
      {
        title: "Ready-to-book tint appointment",
        description:
          "A complete appointment request can route to scheduling while follow-up confirms package and timing."
      }
    ],
    faqs: [
      {
        question: "Can routing rules be changed?",
        answer:
          "Yes. Routing should improve as you learn which leads convert and which handoffs slow down."
      },
      {
        question: "What happens if AI is not confident?",
        answer:
          "The lead can be routed to the right person with the reason and missing details clearly shown."
      },
      {
        question: "Can SignalOps route to a CRM?",
        answer:
          "Yes, when credentials and integrations are configured. It can also start with owner alerts and a lightweight dashboard."
      }
    ],
    relatedLinks: [related.qualification, related.response, related.booking, related.quote]
  },
  "ai-appointment-booking": {
    id: "ai-appointment-booking",
    path: "/services/ai-appointment-booking",
    targetKeyword: "AI appointment booking",
    eyebrow: "AI appointment booking",
    metaTitle: "AI Appointment Booking for Service Businesses | SignalOps",
    metaDescription:
      "SignalOps helps service businesses move ready leads toward appointments with AI booking prompts, lead intake, routing, and follow-up.",
    h1: "AI appointment booking for service businesses.",
    subheadline:
      "SignalOps helps ready leads move from inquiry to appointment by collecting scheduling intent, confirming service fit, sending the right next step, and alerting staff when a human should book.",
    problemTitle: "Appointment-ready leads often stall before the calendar.",
    problemIntro:
      "Many prospects ask for availability but never get a clear booking path. Others need a quote, photos, or staff review before scheduling. Without a process, ready customers get stuck in back-and-forth messages.",
    problemCards: [
      {
        title: "No clear next step",
        description:
          "A customer asks 'Do you have time Friday?' and waits for someone to manually coordinate."
      },
      {
        title: "Wrong leads get booking links",
        description:
          "Some inquiries need intake, inspection, photos, or staff attention before an appointment makes sense."
      },
      {
        title: "Scheduling follow-up gets forgotten",
        description:
          "A customer says they want to book, but the team never closes the loop."
      }
    ],
    solutionTitle: "How SignalOps supports appointment booking",
    solutionIntro:
      "SignalOps does not blindly book every lead. It qualifies the request, collects preferred timing, and routes the right booking path based on service fit.",
    solutionCards: [
      {
        title: "Booking readiness",
        description:
          "Identify whether the customer is ready to schedule, needs a quote, needs photos, or should talk to staff first."
      },
      {
        title: "Calendar path",
        description:
          "Send a booking link when appropriate or alert the team with preferred appointment windows."
      },
      {
        title: "Pre-appointment details",
        description:
          "Collect vehicle, property, service, address, and timing details before the appointment handoff."
      },
      {
        title: "Unbooked follow-up",
        description:
          "If a customer does not pick a time, SignalOps can follow up with a practical reminder."
      }
    ],
    workflowTitle: "Example AI appointment booking workflow",
    workflowIntro:
      "Booking automation should help the customer move forward without putting risky or unclear requests on the calendar unchecked.",
    workflow: [
      {
        label: "1",
        title: "Customer asks for availability",
        description:
          "The lead includes a service need and possible appointment timing."
      },
      {
        label: "2",
        title: "SignalOps checks readiness",
        description:
          "The system looks for contact info, service fit, urgency, missing details, and review requirements."
      },
      {
        label: "3",
        title: "Booking path is sent",
        description:
          "Ready leads can receive a booking link or scheduling reply; complex leads route to staff."
      },
      {
        label: "4",
        title: "Follow-up tracks completion",
        description:
          "If the appointment is not booked, the system follows up or alerts the team."
      }
    ],
    whoFor: [
      {
        title: "Appointment-based service businesses",
        description:
          "Auto shops, detailers, med spas, dental offices, HVAC companies, and home service teams."
      },
      {
        title: "Teams with quote-before-book workflows",
        description:
          "Businesses that need photos, scope, or inspection before scheduling the right appointment."
      },
      {
        title: "Owners with limited calendar capacity",
        description:
          "Small teams that need to protect calendar slots for the right leads."
      }
    ],
    benefits: [
      {
        title: "More appointment-ready leads move forward",
        description:
          "Customers who are ready to schedule get a clear next step quickly."
      },
      {
        title: "Fewer bad bookings",
        description:
          "Leads that need review or more information can be filtered before reaching the calendar."
      },
      {
        title: "Less manual back-and-forth",
        description:
          "Preferred time, service type, and missing details are captured before the team steps in."
      }
    ],
    examples: [
      {
        title: "Fleet wash account call",
        description:
          "SignalOps asks for fleet size, vehicle types, locations, preferred service window, and recurring plan interest."
      },
      {
        title: "Detailing package booking",
        description:
          "A customer chooses a package, vehicle type, and preferred date before being routed to booking."
      },
      {
        title: "Med spa consultation",
        description:
          "Appointment intent is captured while medical or treatment-specific questions are routed to staff."
      }
    ],
    faqs: [
      {
        question: "Will SignalOps book appointments automatically?",
        answer:
          "It can prepare and route the booking path. Whether it books directly depends on the business rules, calendar setup, and review requirements."
      },
      {
        question: "Can it work with Calendly or another booking tool?",
        answer:
          "Yes. SignalOps is built to support booking links and calendar integrations when configured."
      },
      {
        question: "Can it prevent unready bookings?",
        answer:
          "Yes. The system can ask intake questions and route uncertain leads to staff before they reach the calendar."
      }
    ],
    relatedLinks: [related.response, related.qualification, related.followUp, related.routing]
  },
  "quote-intake-automation": {
    id: "quote-intake-automation",
    path: "/services/quote-intake-automation",
    targetKeyword: "quote intake automation",
    eyebrow: "Quote intake automation",
    metaTitle: "Quote Intake Automation for Service Businesses | SignalOps",
    metaDescription:
      "SignalOps builds quote intake automation for service businesses that need photos, scope details, urgency, routing, and follow-up before estimates.",
    h1: "Quote intake automation for service businesses.",
    subheadline:
      "SignalOps helps quote-based businesses collect the details needed to estimate work, request photos when useful, route complex jobs, and follow up after estimates.",
    problemTitle: "Vague quote requests waste time and still go cold.",
    problemIntro:
      "Customers often ask 'How much?' before providing the details needed to quote responsibly. If the business has to manually chase photos, scope, address, vehicle details, or timing, good leads can stall.",
    problemCards: [
      {
        title: "Not enough information to quote",
        description:
          "Repair, auto, contractor, and water service quotes often need photos, symptoms, address, measurements, or service context."
      },
      {
        title: "Photos arrive in separate threads",
        description:
          "A quote request may start in a form, then photos come by text, then timing comes by DM."
      },
      {
        title: "Estimate follow-up is inconsistent",
        description:
          "Once pricing is sent, the lead may never receive a timely reminder or booking path."
      }
    ],
    solutionTitle: "How SignalOps automates quote intake",
    solutionIntro:
      "SignalOps creates service-specific intake flows that collect the right information before your team follows up, quotes, or books the work.",
    solutionCards: [
      {
        title: "Dynamic intake questions",
        description:
          "Ask different questions for fleet wash accounts, water pressure issues, roof leaks, detailing packages, or commercial projects."
      },
      {
        title: "Photo and scope prompts",
        description:
          "Request photos, system details, vehicle info, address, timeline, and job context when needed."
      },
      {
        title: "Quote priority sorting",
        description:
          "Separate urgent, high-value, routine, incomplete, and staff-handoff quote requests."
      },
      {
        title: "Estimate follow-up",
        description:
          "Track who received an estimate and follow up if they do not book or ask questions."
      }
    ],
    workflowTitle: "Example quote intake workflow",
    workflowIntro:
      "The goal is not to force every prospect through a long form. The goal is to collect enough context to move the quote forward.",
    workflow: [
      {
        label: "1",
        title: "Customer asks for a quote",
        description:
          "The request arrives from a form, missed call, text, DM, ad, landing page, or email."
      },
      {
        label: "2",
        title: "SignalOps asks for the right details",
        description:
          "The system requests photos, service type, location, timeline, symptoms, or project scope based on the business."
      },
      {
        label: "3",
        title: "Lead is prioritized and routed",
        description:
          "Urgent, high-value, complete, incomplete, and review-required leads get different paths."
      },
      {
        label: "4",
        title: "Quote follow-up starts",
        description:
          "If the customer does not book after estimate, SignalOps can send practical follow-up."
      }
    ],
    whoFor: [
      {
        title: "Fleet wash and auto shops",
        description:
          "Collect fleet size, vehicle types, locations, service frequency, site notes, and wash window before quoting."
      },
      {
        title: "Detailing, tint, and wrap shops",
        description:
          "Capture package interest, vehicle type, condition, timing, and upsell opportunities."
      },
      {
        title: "Contractors and local service teams",
        description:
          "Gather address, scope, urgency, photos, access notes, and whether the request is repair, maintenance, or larger project."
      }
    ],
    benefits: [
      {
        title: "Cleaner estimates",
        description:
          "The team receives enough context to quote or ask one focused follow-up question."
      },
      {
        title: "Higher-quality quote requests",
        description:
          "Vague inquiries are guided into complete requests before the team spends manual time."
      },
      {
        title: "Better quote follow-up",
        description:
          "Customers who received an estimate are not forgotten if they do not book immediately."
      }
    ],
    examples: [
      {
        title: "Fleet wash recurring quote",
        description:
          "SignalOps asks for fleet size, vehicle types, locations, water access, after-hours need, and preferred wash cadence."
      },
      {
        title: "Well pump issue quote",
        description:
          "The system asks whether the property has water, requests address and system details, and routes urgent no-water leads."
      },
      {
        title: "Roof repair estimate",
        description:
          "A roof leak inquiry can ask for photos, address, leak location, urgency, and insurance context without promising outcomes."
      }
    ],
    faqs: [
      {
        question: "Can SignalOps generate final prices?",
        answer:
          "SignalOps can organize intake and prepare context. Final pricing should stay with the business when scope, safety, inspection, or judgment is required."
      },
      {
        question: "Can it request photos?",
        answer:
          "Yes. Photo-based intake is one of the strongest use cases for repair, auto, home services, and other quote workflows."
      },
      {
        question: "What if the customer skips required details?",
        answer:
          "The lead can be marked incomplete and receive a follow-up asking for the missing information."
      }
    ],
    relatedLinks: [related.response, related.qualification, related.followUp, related.booking]
  }
};

export function getServicePage(id: string) {
  return SERVICE_PAGES[id as ServicePageId];
}
