import type { SeoFaq } from "@/lib/seo";

export type AlternativePageId =
  | "leadops-alternative"
  | "leadpilot-alternative"
  | "leadrelay-alternative"
  | "leadsignal-alternative"
  | "inboundops-alternative"
  | "quoterelay-alternative";

export type AlternativePageCard = {
  title: string;
  description: string;
};

export type AlternativeWorkflowStep = {
  label: string;
  title: string;
  description: string;
};

export type AlternativeRelatedLink = {
  href: string;
  label: string;
  description: string;
};

export type AlternativePageConfig = {
  id: AlternativePageId;
  path: string;
  targetName: string;
  targetPhrase: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subheadline: string;
  comparisonAngle: string;
  whoFor: AlternativePageCard[];
  lookFor: AlternativePageCard[];
  howSignalOpsHelps: AlternativePageCard[];
  useCases: AlternativePageCard[];
  workflow: AlternativeWorkflowStep[];
  goodFit: string[];
  notFit: string[];
  faqs: SeoFaq[];
  relatedLinks: AlternativeRelatedLink[];
};

const coreRelatedLinks: AlternativeRelatedLink[] = [
  {
    href: "/audit",
    label: "Start a Project",
    description: "Find the places where calls, texts, forms, DMs, and follow-ups are being missed."
  },
  {
    href: "/demo",
    label: "Client demo",
    description: "See how SignalOps qualifies and routes real service-business quote requests."
  },
  {
    href: "/how-it-works",
    label: "How it works",
    description: "Review the full flow from lead capture to response, routing, booking, and follow-up."
  },
  {
    href: "/roi-calculator",
    label: "ROI calculator",
    description: "Estimate the revenue impact of faster response and cleaner follow-up."
  }
];

export const ALTERNATIVE_PAGE_IDS: AlternativePageId[] = [
  "leadops-alternative",
  "leadpilot-alternative",
  "leadrelay-alternative",
  "leadsignal-alternative",
  "inboundops-alternative",
  "quoterelay-alternative"
];

export const ALTERNATIVE_PAGES: Record<AlternativePageId, AlternativePageConfig> = {
  "leadops-alternative": {
    id: "leadops-alternative",
    path: "/alternatives/leadops-alternative",
    targetName: "LeadOps",
    targetPhrase: "LeadOps-style AI lead operations",
    eyebrow: "Ethical alternative guide",
    metaTitle: "LeadOps Alternative for AI Lead Response | SignalOps",
    metaDescription:
      "Compare LeadOps-style AI lead operations with SignalOps, a hands-on AI lead response system for capture, qualification, routing, follow-up, and booking.",
    h1: "LeadOps alternative for AI lead response systems.",
    subheadline:
      "If you are searching for LeadOps-style lead operations, SignalOps helps small and local businesses build the practical response, qualification, routing, and follow-up layer behind every inquiry.",
    comparisonAngle:
      "This page is for businesses comparing AI lead operations options. It does not evaluate LeadOps as a company or product; it explains what to look for and how SignalOps approaches the same missed-lead problem.",
    whoFor: [
      {
        title: "Owners with scattered lead sources",
        description:
          "Calls, texts, web forms, DMs, ads, and quote requests arrive in different places and need one consistent response process."
      },
      {
        title: "Teams that need implementation help",
        description:
          "You want someone to map the workflow, write the messages, set routing rules, and connect the tools instead of only handing you software."
      },
      {
        title: "Service businesses losing follow-up",
        description:
          "Good prospects ask once, get a partial reply, then disappear because nobody owns the next step."
      }
    ],
    lookFor: [
      {
        title: "Multi-source capture",
        description:
          "The system should work across calls, texts, forms, DMs, landing pages, and quote requests without forcing every lead into one rigid form."
      },
      {
        title: "Clear qualification rules",
        description:
          "Look for service-specific questions, urgency detection, contact completeness checks, and human review when the situation is unclear."
      },
      {
        title: "Follow-up after first response",
        description:
          "A useful lead operations system keeps asking for missing details, nudges unbooked leads, and alerts the team when someone replies."
      }
    ],
    howSignalOpsHelps: [
      {
        title: "Check the current flow",
        description:
          "SignalOps starts by finding where inquiries slow down, get answered vaguely, or never receive a second touch."
      },
      {
        title: "Build the response system",
        description:
          "We create the intake forms, instant replies, scoring logic, routing rules, owner alerts, and follow-up paths."
      },
      {
        title: "Keep humans in control",
        description:
          "Urgent, risky, high-value, or low-confidence leads are routed for review instead of pretending automation can handle everything."
      }
    ],
    useCases: [
      {
        title: "Missed-call text back",
        description:
          "A missed call receives a quick text asking what the customer needs, how urgent it is, and the best callback time."
      },
      {
        title: "Website lead qualification",
        description:
          "Form submissions are scored, summarized, tagged, and routed based on service need and intent."
      },
      {
        title: "Quote intake automation",
        description:
          "Photo requests, job details, appointment windows, and estimate follow-ups are organized into one process."
      },
      {
        title: "Owner alerts",
        description:
          "Hot leads and high-value opportunities reach the right person with context, not just another notification."
      }
    ],
    workflow: [
      {
        label: "1",
        title: "Lead comes in",
        description:
          "A prospect calls, texts, submits a form, sends a DM, or asks for a quote."
      },
      {
        label: "2",
        title: "SignalOps responds",
        description:
          "The system confirms receipt, asks for missing details, and explains the next step."
      },
      {
        label: "3",
        title: "Lead is qualified",
        description:
          "Service need, urgency, intent, source, and contact completeness are scored and summarized."
      },
      {
        label: "4",
        title: "Follow-up is handled",
        description:
          "The customer gets a useful next message while the team gets routing, alerts, and a dashboard record."
      }
    ],
    goodFit: [
      "You want a lead response system installed around your real channels.",
      "You have valuable leads but inconsistent follow-up.",
      "You need practical routing and owner alerts, not generic AI chat."
    ],
    notFit: [
      "You want a fully self-serve tool with no implementation help.",
      "You need guaranteed revenue results from software alone.",
      "You are not ready to define how good leads, bad leads, and urgent leads should be handled."
    ],
    faqs: [
      {
        question: "Is SignalOps affiliated with LeadOps?",
        answer:
          "No. SignalOps is not affiliated with LeadOps. This page is for businesses comparing AI lead response and lead management options."
      },
      {
        question: "Is this a direct feature-by-feature comparison?",
        answer:
          "No. Without verified product details, SignalOps does not make claims about another brand's features. This guide focuses on what buyers should look for in a LeadOps-style system."
      },
      {
        question: "What makes SignalOps different from buying software?",
        answer:
          "SignalOps is positioned as a hands-on system build: lead flow mapping, message logic, qualification rules, integrations, alerts, and follow-up paths."
      }
    ],
    relatedLinks: coreRelatedLinks
  },
  "leadpilot-alternative": {
    id: "leadpilot-alternative",
    path: "/alternatives/leadpilot-alternative",
    targetName: "LeadPilot",
    targetPhrase: "LeadPilot-style lead automation",
    eyebrow: "Ethical alternative guide",
    metaTitle: "LeadPilot Alternative for Lead Qualification & Follow-Up | SignalOps",
    metaDescription:
      "Looking for a LeadPilot-style lead automation option? SignalOps builds hands-on AI lead qualification, follow-up, routing, and booking systems.",
    h1: "LeadPilot alternative for lead qualification and follow-up.",
    subheadline:
      "For businesses searching for a lead pilot or lead automation style solution, SignalOps focuses on implementation: the actual intake questions, routing logic, follow-up messages, and handoffs your team will use.",
    comparisonAngle:
      "This page does not claim to describe LeadPilot's product. It is a buyer guide for teams comparing lead automation options and deciding whether a hands-on implementation partner is a better fit than a purely self-directed setup.",
    whoFor: [
      {
        title: "Owners who want the system built for them",
        description:
          "You do not want to stare at automation settings for weeks. You want a practical workflow installed around how leads already arrive."
      },
      {
        title: "Teams with inconsistent lead quality",
        description:
          "Some inquiries are ready to book, some need photos, some are vague, and some require human review."
      },
      {
        title: "Businesses that need follow-up discipline",
        description:
          "Leads get answered once, but quotes, appointment reminders, and no-response follow-ups are not handled consistently."
      }
    ],
    lookFor: [
      {
        title: "Qualification before routing",
        description:
          "A good system should identify service need, urgency, location, budget signals, and missing details before sending the lead downstream."
      },
      {
        title: "Human handoff rules",
        description:
          "The automation should know when to alert a person, especially for urgent, high-value, sensitive, or unclear inquiries."
      },
      {
        title: "Follow-up timing",
        description:
          "Useful follow-up has a reason: missing photos, unbooked estimate, appointment readiness, no response, or quote approval."
      }
    ],
    howSignalOpsHelps: [
      {
        title: "Map the lead path",
        description:
          "SignalOps documents what happens from first inquiry to booked appointment, including gaps and handoff points."
      },
      {
        title: "Write practical messages",
        description:
          "Replies are specific to the service and the next step, not fluffy AI language or long scripts."
      },
      {
        title: "Connect alerts and records",
        description:
          "Qualified leads can trigger owner alerts, CRM logs, dashboard updates, booking links, and follow-up sequences."
      }
    ],
    useCases: [
      {
        title: "AI appointment setter",
        description:
          "Collect preferred timing, service fit, and missing details before sending a booking link or alerting staff."
      },
      {
        title: "Quote follow-up",
        description:
          "Nudge customers who received an estimate but have not booked, asked a question, or approved next steps."
      },
      {
        title: "Photo-based qualification",
        description:
          "Ask for photos and job details when the team cannot quote accurately from a short message."
      },
      {
        title: "Daily lead review",
        description:
          "Give the owner a clean view of hot leads, missing-info leads, and follow-up tasks."
      }
    ],
    workflow: [
      {
        label: "1",
        title: "Inquiry is captured",
        description:
          "The lead arrives through the website, phone, DM, ad, email, or landing page."
      },
      {
        label: "2",
        title: "Context is collected",
        description:
          "SignalOps asks the questions your team needs before deciding the next step."
      },
      {
        label: "3",
        title: "Lead is prioritized",
        description:
          "Hot, warm, cold, and human-review labels help your team act in the right order."
      },
      {
        label: "4",
        title: "Follow-up continues",
        description:
          "If the prospect does not book or send details, the system follows up without relying on memory."
      }
    ],
    goodFit: [
      "You want implementation support, not just a software subscription.",
      "Your team needs help defining lead quality and next actions.",
      "You sell services where details, photos, urgency, or appointment timing matter."
    ],
    notFit: [
      "You want to configure every workflow yourself.",
      "Your leads are already captured, qualified, routed, and followed up perfectly.",
      "You expect automation to replace all sales judgment."
    ],
    faqs: [
      {
        question: "Is SignalOps affiliated with LeadPilot?",
        answer:
          "No. SignalOps is not affiliated with LeadPilot. This page is for businesses comparing AI lead response and lead management options."
      },
      {
        question: "Does SignalOps require a CRM?",
        answer:
          "No. SignalOps can start with calls, texts, forms, alerts, and a simple dashboard. CRM integration can be added when it helps."
      },
      {
        question: "Can SignalOps qualify leads differently by service?",
        answer:
          "Yes. Qualification logic should change for emergencies, quote requests, maintenance, consultations, commercial work, and routine appointments."
      }
    ],
    relatedLinks: coreRelatedLinks
  },
  "leadrelay-alternative": {
    id: "leadrelay-alternative",
    path: "/alternatives/leadrelay-alternative",
    targetName: "LeadRelay",
    targetPhrase: "LeadRelay-style lead routing automation",
    eyebrow: "Ethical alternative guide",
    metaTitle: "LeadRelay Alternative for Lead Routing Automation | SignalOps",
    metaDescription:
      "Explore SignalOps as a LeadRelay-style alternative for lead routing automation, hot lead alerts, CRM logging, follow-up, and appointment handoffs.",
    h1: "LeadRelay alternative for lead routing automation.",
    subheadline:
      "If you are looking for lead routing automation, SignalOps helps turn incoming inquiries into scored records, urgent alerts, CRM logs, and follow-up paths your team can trust.",
    comparisonAngle:
      "This guide is for businesses comparing lead relay or lead routing style tools. It avoids claims about LeadRelay and instead explains the routing decisions a practical AI lead response system should support.",
    whoFor: [
      {
        title: "Teams with more than one responder",
        description:
          "Leads need to reach the owner, front desk, sales rep, estimator, technician, or commercial contact based on context."
      },
      {
        title: "Businesses with urgent lead types",
        description:
          "No-water issues, leaks, vehicle safety problems, emergency repairs, and ready-to-book calls need fast escalation."
      },
      {
        title: "Companies using a CRM or simple dashboard",
        description:
          "You need leads logged with status, score, tags, and next action instead of staying in scattered notifications."
      }
    ],
    lookFor: [
      {
        title: "Routing based on meaning",
        description:
          "Route leads by service, urgency, location, value, contact completeness, and risk rather than by source alone."
      },
      {
        title: "Hot lead alerts",
        description:
          "The right person should receive a concise alert when a prospect is urgent, valuable, appointment-ready, or asking to buy."
      },
      {
        title: "Fallback for uncertainty",
        description:
          "When AI confidence is low, the lead should go to human review with the reason clearly explained."
      }
    ],
    howSignalOpsHelps: [
      {
        title: "Define routing rules",
        description:
          "SignalOps maps who should see which leads and what information they need to act quickly."
      },
      {
        title: "Prepare CRM and dashboard records",
        description:
          "The lead gets logged with source, priority, service need, urgency, tags, summary, and recommended action."
      },
      {
        title: "Trigger follow-up by status",
        description:
          "New, contacted, needs photos, qualified, booked, won, and lost leads can each trigger different next steps."
      }
    ],
    useCases: [
      {
        title: "Owner alert for urgent leads",
        description:
          "A serious issue triggers a direct alert with customer details, issue summary, and recommended callback."
      },
      {
        title: "Estimator routing",
        description:
          "Quote requests with photos, scope, location, and timeline can be routed to the person who prices that work."
      },
      {
        title: "Commercial opportunity routing",
        description:
          "Large jobs and multi-location inquiries can be tagged and routed separately from routine requests."
      },
      {
        title: "CRM logging",
        description:
          "Every routed lead can be recorded with a consistent status and next action for later review."
      }
    ],
    workflow: [
      {
        label: "1",
        title: "Lead is scored",
        description:
          "The system checks urgency, service type, intent, contact details, and value signals."
      },
      {
        label: "2",
        title: "Route is chosen",
        description:
          "SignalOps decides whether the lead needs an owner alert, sales follow-up, photo request, booking link, or review."
      },
      {
        label: "3",
        title: "Context is delivered",
        description:
          "The team gets a concise internal note instead of digging through form fields and messages."
      },
      {
        label: "4",
        title: "Next status is tracked",
        description:
          "The lead moves into contacted, needs info, qualified, booked, won, or lost."
      }
    ],
    goodFit: [
      "Your team misses opportunities because leads go to the wrong place.",
      "You need urgent and high-value leads separated from routine requests.",
      "You want CRM or dashboard records with enough context to act."
    ],
    notFit: [
      "All leads go to one person and are already handled immediately.",
      "You do not want to define routing rules or escalation criteria.",
      "You need a replacement for dispatch software rather than a lead response layer."
    ],
    faqs: [
      {
        question: "Is SignalOps affiliated with LeadRelay?",
        answer:
          "No. SignalOps is not affiliated with LeadRelay. This page is for businesses comparing AI lead response and lead management options."
      },
      {
        question: "Can routing rules be changed after launch?",
        answer:
          "Yes. Routing should improve as you learn which lead types convert, which ones need faster response, and which ones require human review."
      },
      {
        question: "Can SignalOps route leads without a CRM?",
        answer:
          "Yes. Routing can start with email, text, dashboard, or owner alerts. CRM logging can be added when the business is ready."
      }
    ],
    relatedLinks: coreRelatedLinks
  },
  "leadsignal-alternative": {
    id: "leadsignal-alternative",
    path: "/alternatives/leadsignal-alternative",
    targetName: "LeadSignal",
    targetPhrase: "LeadSignal-style AI lead scoring",
    eyebrow: "Ethical alternative guide",
    metaTitle: "LeadSignal Alternative for AI Lead Scoring | SignalOps",
    metaDescription:
      "SignalOps is a LeadSignal-style alternative for businesses that need AI lead scoring, summaries, next actions, routing, and follow-up from noisy inquiries.",
    h1: "LeadSignal alternative for AI lead scoring.",
    subheadline:
      "For teams searching for lead signal or lead scoring tools, SignalOps turns messy inbound activity into a clear score, priority, summary, tags, and recommended next action.",
    comparisonAngle:
      "This page does not compare against LeadSignal's features. It explains what businesses should look for when they need practical lead scoring and how SignalOps uses scoring to guide response and follow-up.",
    whoFor: [
      {
        title: "Teams with noisy lead activity",
        description:
          "The inbox has quote requests, questions, emergencies, low-intent shoppers, and high-value prospects all mixed together."
      },
      {
        title: "Owners who need quick prioritization",
        description:
          "You need to know which leads deserve a callback now, which need follow-up, and which require human review."
      },
      {
        title: "Businesses with different lead values",
        description:
          "A small maintenance request, urgent repair, full project, and commercial opportunity should not be treated the same."
      }
    ],
    lookFor: [
      {
        title: "Transparent scoring logic",
        description:
          "A useful score should be explainable: service type, urgency, contact completeness, intent language, value, and missing details."
      },
      {
        title: "Recommended next action",
        description:
          "Scoring alone is not enough. The system should tell the team whether to call, ask for photos, send booking, route to owner, or review."
      },
      {
        title: "Confidence and review flags",
        description:
          "When contact details are missing, the message is vague, or the issue is sensitive, the system should flag uncertainty."
      }
    ],
    howSignalOpsHelps: [
      {
        title: "Build service-specific scores",
        description:
          "SignalOps creates lead scoring around your actual offers, margins, urgency levels, service area, and team capacity."
      },
      {
        title: "Write internal sales notes",
        description:
          "The team sees what matters: why the lead scored that way, what is missing, and what should happen next."
      },
      {
        title: "Tie scoring to follow-up",
        description:
          "Hot leads alert a human. Warm leads get booking or quote follow-up. Incomplete leads receive missing-detail prompts."
      }
    ],
    useCases: [
      {
        title: "Hot lead detection",
        description:
          "Emergency language, ready-to-book intent, high-value service requests, and complete contact info can raise priority."
      },
      {
        title: "Low-confidence review",
        description:
          "A vague inquiry with no phone number can be tagged for review instead of being treated as a qualified opportunity."
      },
      {
        title: "Value-based routing",
        description:
          "Commercial, multi-service, and larger project requests can be escalated separately from routine work."
      },
      {
        title: "Follow-up segmentation",
        description:
          "Different scores can trigger different timing, tone, and handoff rules."
      }
    ],
    workflow: [
      {
        label: "1",
        title: "Signals are extracted",
        description:
          "SignalOps reads the lead context and identifies service need, urgency, intent, contact details, and missing pieces."
      },
      {
        label: "2",
        title: "Score is assigned",
        description:
          "The score reflects lead quality, likely urgency, value potential, and confidence."
      },
      {
        label: "3",
        title: "Priority is labeled",
        description:
          "Leads can be marked hot, warm, cold, junk, or human-review based on practical rules."
      },
      {
        label: "4",
        title: "Next action is triggered",
        description:
          "The system prepares the reply, alert, CRM log, booking prompt, or follow-up sequence."
      }
    ],
    goodFit: [
      "Your team struggles to tell which leads need attention first.",
      "You want scoring that explains itself in plain English.",
      "You need lead scores connected to routing and follow-up, not just reporting."
    ],
    notFit: [
      "You only need a static lead list with no qualification.",
      "You want AI to make final decisions without human review paths.",
      "You do not have enough lead volume or lead variety to need scoring yet."
    ],
    faqs: [
      {
        question: "Is SignalOps affiliated with LeadSignal?",
        answer:
          "No. SignalOps is not affiliated with LeadSignal. This page is for businesses comparing AI lead response and lead management options."
      },
      {
        question: "Can the score be customized?",
        answer:
          "Yes. The score should reflect your services, capacity, urgency rules, average job value, and follow-up process."
      },
      {
        question: "Does a low score mean the lead is ignored?",
        answer:
          "No. Low-confidence or low-score leads can still receive a polite follow-up or be sent to human review."
      }
    ],
    relatedLinks: coreRelatedLinks
  },
  "inboundops-alternative": {
    id: "inboundops-alternative",
    path: "/alternatives/inboundops-alternative",
    targetName: "InboundOps",
    targetPhrase: "InboundOps-style inbound lead management",
    eyebrow: "Ethical alternative guide",
    metaTitle: "InboundOps Alternative for Inbound Lead Management | SignalOps",
    metaDescription:
      "Compare InboundOps-style inbound lead management with SignalOps for missed calls, web forms, DMs, quote requests, booking, routing, and follow-up.",
    h1: "InboundOps alternative for inbound lead management.",
    subheadline:
      "SignalOps helps businesses organize the inbound mess: missed calls, website forms, DMs, emails, quote requests, appointment questions, and follow-ups that need a clear owner.",
    comparisonAngle:
      "This page is for businesses searching for inbound lead management options. SignalOps is not describing InboundOps' offering; it is outlining what a practical inbound system should handle.",
    whoFor: [
      {
        title: "Businesses with leads coming from everywhere",
        description:
          "Inbound requests arrive from Google, website forms, missed calls, social DMs, ads, email, and landing pages."
      },
      {
        title: "Small teams without a formal sales desk",
        description:
          "The same people doing the work are also answering calls, texting customers, quoting jobs, and trying to follow up."
      },
      {
        title: "Owners who need visibility",
        description:
          "You want to know which leads came in, which were answered, which need follow-up, and where opportunities are being missed."
      }
    ],
    lookFor: [
      {
        title: "Channel coverage",
        description:
          "Inbound management should include calls, texts, forms, DMs, email, quote requests, and appointment inquiries."
      },
      {
        title: "Response and routing",
        description:
          "Every inquiry needs a prompt reply and a clear path: ask for details, send booking, route to owner, or follow up later."
      },
      {
        title: "Simple reporting",
        description:
          "Owners should see response-needed leads, missed opportunities, booked appointments, and follow-up gaps without digging."
      }
    ],
    howSignalOpsHelps: [
      {
        title: "Create an inbound operating layer",
        description:
          "SignalOps sits around your existing channels and organizes what came in, what was said, and what should happen next."
      },
      {
        title: "Reduce informal follow-up",
        description:
          "Instead of relying on memory or scattered text threads, leads get statuses, reminders, and owner visibility."
      },
      {
        title: "Start without overhauling tools",
        description:
          "The first version can work with simple forms, calls, texts, alerts, and dashboard records before deeper integrations."
      }
    ],
    useCases: [
      {
        title: "Missed-call recovery",
        description:
          "A missed phone call receives a useful text response and gets logged for follow-up."
      },
      {
        title: "DM and form triage",
        description:
          "Inbound questions are turned into structured lead records with source, service need, urgency, and next action."
      },
      {
        title: "Appointment booking prompts",
        description:
          "Ready prospects receive the next step toward booking while staff are alerted when needed."
      },
      {
        title: "Lost lead recovery",
        description:
          "Unanswered or unbooked leads get follow-up before they are forgotten."
      }
    ],
    workflow: [
      {
        label: "1",
        title: "Inbound inquiry arrives",
        description:
          "A customer reaches out from a channel your business already uses."
      },
      {
        label: "2",
        title: "SignalOps captures context",
        description:
          "The system gathers contact info, service need, urgency, source, and missing details."
      },
      {
        label: "3",
        title: "Lead gets organized",
        description:
          "Status, score, priority, tags, and recommended action are added."
      },
      {
        label: "4",
        title: "Follow-up path starts",
        description:
          "The customer receives the right next message and the team sees what needs attention."
      }
    ],
    goodFit: [
      "Your lead sources are scattered across phone, web, DMs, and ads.",
      "You need basic inbound structure before investing in a heavier CRM.",
      "You want fewer forgotten follow-ups and clearer owner visibility."
    ],
    notFit: [
      "You only receive leads from one channel and already handle them instantly.",
      "You want a full call center or managed sales team rather than an installed lead response system.",
      "You are not willing to define who handles different lead types."
    ],
    faqs: [
      {
        question: "Is SignalOps affiliated with InboundOps?",
        answer:
          "No. SignalOps is not affiliated with InboundOps. This page is for businesses comparing AI lead response and lead management options."
      },
      {
        question: "Can SignalOps handle social DMs?",
        answer:
          "SignalOps can design the DM intake and follow-up logic. The exact integration depends on platform access, permissions, and the tools your business uses."
      },
      {
        question: "Do we need to change how customers contact us?",
        answer:
          "Usually no. The goal is to improve how your existing inbound channels are captured, answered, routed, and followed up."
      }
    ],
    relatedLinks: coreRelatedLinks
  },
  "quoterelay-alternative": {
    id: "quoterelay-alternative",
    path: "/alternatives/quoterelay-alternative",
    targetName: "QuoteRelay",
    targetPhrase: "QuoteRelay-style quote intake automation",
    eyebrow: "Ethical alternative guide",
    metaTitle: "QuoteRelay Alternative for Quote Intake Automation | SignalOps",
    metaDescription:
      "SignalOps is a QuoteRelay-style alternative for quote intake automation across wheel repair, auto shops, detailers, tint shops, wrap shops, contractors, and local services.",
    h1: "QuoteRelay alternative for quote intake automation.",
    subheadline:
      "For quote-based businesses, SignalOps helps collect the details needed to estimate work, ask for photos when useful, prioritize urgent requests, and follow up when a prospect does not book.",
    comparisonAngle:
      "This page is for businesses researching quote intake automation. SignalOps does not claim any affiliation with QuoteRelay or make unsupported claims about another product.",
    whoFor: [
      {
        title: "Quote-heavy local businesses",
        description:
          "Wheel repair shops, auto shops, detailers, tint shops, wrap shops, contractors, and service teams need enough context before quoting."
      },
      {
        title: "Teams that need photos or details",
        description:
          "A vague message like 'How much?' often needs photos, service type, vehicle or property details, location, and timeline."
      },
      {
        title: "Owners losing estimate follow-up",
        description:
          "Quotes are sent, then follow-up depends on memory, inbox reminders, or scrolling back through text threads."
      }
    ],
    lookFor: [
      {
        title: "Service-specific intake",
        description:
          "The intake flow should ask the right questions for each job type instead of sending everyone through one generic quote form."
      },
      {
        title: "Photo and detail requests",
        description:
          "For visual or scope-based work, the system should request photos and context before a human spends time estimating."
      },
      {
        title: "Estimate follow-up",
        description:
          "The system should track whether a quote was sent, whether the customer replied, and whether they booked."
      }
    ],
    howSignalOpsHelps: [
      {
        title: "Build quote intake flows",
        description:
          "SignalOps creates lead forms, instant replies, photo prompts, qualification rules, and routing for quote requests."
      },
      {
        title: "Separate routine from urgent",
        description:
          "Cosmetic quote, emergency repair, commercial opportunity, and unclear request can each receive different handling."
      },
      {
        title: "Follow up after estimates",
        description:
          "Customers who do not book can receive a helpful reminder, while the team sees quote follow-up status."
      }
    ],
    useCases: [
      {
        title: "Wheel repair quote intake",
        description:
          "Ask for wheel photos, damage type, vehicle details, drivability, mobile repair need, and preferred appointment time."
      },
      {
        title: "Auto and performance shop estimates",
        description:
          "Capture vehicle, issue, symptoms, modifications, timeline, and whether the customer wants a quote or appointment."
      },
      {
        title: "Detail, tint, and wrap packages",
        description:
          "Ask about vehicle type, desired package, condition, timing, and whether the customer is ready to schedule."
      },
      {
        title: "Contractor quote requests",
        description:
          "Collect address, scope, urgency, photos, access notes, and whether the request is repair, maintenance, or a larger project."
      }
    ],
    workflow: [
      {
        label: "1",
        title: "Quote request is submitted",
        description:
          "A customer asks for pricing through a form, DM, missed call, text, ad, or landing page."
      },
      {
        label: "2",
        title: "Details are requested",
        description:
          "SignalOps asks for the specific information needed to quote responsibly."
      },
      {
        label: "3",
        title: "Lead is scored",
        description:
          "The request is tagged by service type, value, urgency, completeness, and booking intent."
      },
      {
        label: "4",
        title: "Estimate follow-up starts",
        description:
          "If the customer does not book or send missing details, the system follows up with the right next ask."
      }
    ],
    goodFit: [
      "Your business depends on quote requests that require details or photos.",
      "You want fewer vague inquiries and cleaner estimate handoffs.",
      "You need follow-up after quotes, not just a form submission notification."
    ],
    notFit: [
      "Your pricing is fully fixed and customers can self-checkout without staff involvement.",
      "You do not want to define what information is needed before a quote.",
      "You need AI to make final safety, repair, legal, or compliance decisions without human review."
    ],
    faqs: [
      {
        question: "Is SignalOps affiliated with QuoteRelay?",
        answer:
          "No. SignalOps is not affiliated with QuoteRelay. This page is for businesses comparing AI lead response and quote intake automation options."
      },
      {
        question: "Can SignalOps ask for photos?",
        answer:
          "Yes. Photo-based intake is a strong fit for wheel repair, auto, detailing, tint, wrap, home services, and other quote-based workflows."
      },
      {
        question: "Does SignalOps generate the final quote?",
        answer:
          "SignalOps can organize the intake and prepare context. Final pricing should stay with the business when judgment, safety, or scope review is required."
      }
    ],
    relatedLinks: coreRelatedLinks
  }
};

export function getAlternativePage(id: string) {
  return ALTERNATIVE_PAGES[id as AlternativePageId];
}
