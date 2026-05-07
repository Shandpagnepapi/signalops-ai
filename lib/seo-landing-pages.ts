import type { SeoFaq } from "@/lib/seo";

export type SeoLandingPageId =
  | "ai-lead-response"
  | "missed-call-text-back"
  | "ai-follow-up-automation"
  | "ai-lead-qualification"
  | "lead-management-for-small-business"
  | "no-crm-lead-tracking";

export type LandingPageLink = {
  href: string;
  label: string;
  description: string;
};

export type LandingPageCard = {
  title: string;
  description: string;
};

export type LandingPageWorkflowStep = {
  label: string;
  title: string;
  description: string;
};

export type SeoLandingPageConfig = {
  id: SeoLandingPageId;
  path: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subheadline: string;
  heroBullets: string[];
  quickStats: LandingPageCard[];
  plainEnglishTitle: string;
  plainEnglishBody: string;
  whyTitle: string;
  whyIntro: string;
  whyCards: LandingPageCard[];
  solutionTitle: string;
  solutionIntro: string;
  solutionCards: LandingPageCard[];
  workflowTitle: string;
  workflowIntro: string;
  workflow: LandingPageWorkflowStep[];
  industryTitle: string;
  industryExamples: LandingPageCard[];
  faqs: SeoFaq[];
  relatedLinks: LandingPageLink[];
};

export const SEO_LANDING_PAGES: Record<SeoLandingPageId, SeoLandingPageConfig> = {
  "ai-lead-response": {
    id: "ai-lead-response",
    path: "/ai-lead-response",
    eyebrow: "AI lead response system",
    metaTitle: "AI Lead Response Systems for Small Businesses",
    metaDescription:
      "SignalOps installs AI lead response systems that help small businesses answer calls, texts, forms, DMs, and quote requests before leads go cold.",
    h1: "AI lead response that answers new inquiries before they go cold.",
    subheadline:
      "SignalOps helps small and mid-sized businesses respond to every new lead quickly, collect the right details, and route the next step without adding more admin work.",
    heroBullets: [
      "Works with calls, texts, forms, DMs, email, and landing pages",
      "Sends useful first replies, not vague automated messages",
      "Escalates urgent, high-value, or unclear leads to a human"
    ],
    quickStats: [
      {
        title: "Speed-to-lead",
        description: "Reply while the prospect is still looking for a provider."
      },
      {
        title: "Cleaner handoff",
        description: "Capture service need, urgency, location, and contact details."
      },
      {
        title: "Less manual chasing",
        description: "Start the right follow-up path before the lead gets forgotten."
      }
    ],
    plainEnglishTitle: "What AI lead response means in plain English",
    plainEnglishBody:
      "When someone calls, fills out a form, sends a DM, or asks for a quote, they should not wait hours for a useful answer. SignalOps creates a first-response layer that acknowledges the request, asks for missing details, explains the next step, and gives your team a clean summary. It is not meant to replace judgment. It keeps good opportunities moving until a person can step in.",
    whyTitle: "Why fast response matters",
    whyIntro:
      "Most service businesses do not lose deals because the lead was bad. They lose deals because the first few minutes were slow, unclear, or inconsistent.",
    whyCards: [
      {
        title: "Prospects keep shopping",
        description:
          "A customer who submits one form often submits three. The business that replies first with a clear next step has an advantage."
      },
      {
        title: "Owners get pulled into everything",
        description:
          "Without a response process, every new inquiry depends on whoever notices the phone, inbox, or form notification first."
      },
      {
        title: "Important details arrive scattered",
        description:
          "Service type, photos, location, timeline, and urgency often live across separate text threads and emails."
      }
    ],
    solutionTitle: "How SignalOps solves lead response",
    solutionIntro:
      "SignalOps maps your current intake process, writes practical response logic, and connects the workflow to the channels your business already uses.",
    solutionCards: [
      {
        title: "Instant acknowledgement",
        description:
          "The system confirms the request and tells the customer what information is needed next."
      },
      {
        title: "Smart follow-up questions",
        description:
          "It asks for service-specific details like vehicle info, photos, property issue, timeline, or preferred appointment window."
      },
      {
        title: "Owner or rep alerts",
        description:
          "Hot, urgent, and high-value leads are summarized and routed to the right person quickly."
      },
      {
        title: "CRM or dashboard logging",
        description:
          "The lead is organized with status, score, tags, and recommended next action."
      }
    ],
    workflowTitle: "Example AI lead response workflow",
    workflowIntro:
      "A practical response workflow should feel like a helpful coordinator, not a generic chatbot.",
    workflow: [
      {
        label: "1",
        title: "Lead arrives",
        description:
          "A customer submits a quote form, misses a call, sends a DM, or replies to an ad."
      },
      {
        label: "2",
        title: "Response goes out",
        description:
          "SignalOps confirms the request, asks for missing details, and explains what happens next."
      },
      {
        label: "3",
        title: "Lead gets qualified",
        description:
          "The system captures need, urgency, service fit, contact completeness, and buying intent."
      },
      {
        label: "4",
        title: "Team gets context",
        description:
          "The owner or sales rep sees the score, summary, suggested reply, and recommended next action."
      }
    ],
    industryTitle: "Where AI lead response works well",
    industryExamples: [
      {
        title: "Auto and wheel repair",
        description:
          "Ask for vehicle details, damage type, photos, drivability, mobile service need, and preferred appointment time."
      },
      {
        title: "Home services",
        description:
          "Capture issue type, address, emergency level, access details, and whether the customer needs service now or a quote."
      },
      {
        title: "Med spas and dental offices",
        description:
          "Answer common intake questions, route high-intent appointment requests, and flag anything that needs staff review."
      },
      {
        title: "Law firms and insurance agencies",
        description:
          "Gather basic case or coverage context, identify urgency, and route qualified prospects without promising outcomes."
      }
    ],
    faqs: [
      {
        question: "Is AI lead response the same as a website chatbot?",
        answer:
          "No. SignalOps focuses on the response process behind your calls, texts, forms, DMs, and quote requests. A chat widget can be one channel, but the real value is making sure every inquiry gets a clear next step."
      },
      {
        question: "Can it work if most of our leads come from phone calls?",
        answer:
          "Yes. Missed-call text back and call follow-up workflows are a strong use case. SignalOps can start with calls and texts before adding CRM or website integrations."
      },
      {
        question: "What happens if the lead is urgent or complicated?",
        answer:
          "The system should flag it for human review and alert the right person. SignalOps is designed to escalate uncertainty instead of pretending every question can be fully automated."
      },
      {
        question: "Do customers know they are getting an automated reply?",
        answer:
          "Messaging should be honest and practical. The reply can say your team received the request and is collecting details so the right person can follow up."
      }
    ],
    relatedLinks: [
      {
        href: "/missed-call-text-back",
        label: "Missed-call text back",
        description: "Capture leads when your team cannot answer the phone."
      },
      {
        href: "/ai-lead-qualification",
        label: "AI lead qualification",
        description: "Score and summarize inquiries before the team follows up."
      },
      {
        href: "/how-it-works",
        label: "How the SignalOps engine works",
        description: "See the full flow from lead capture to follow-up."
      }
    ]
  },
  "missed-call-text-back": {
    id: "missed-call-text-back",
    path: "/missed-call-text-back",
    eyebrow: "Missed-call text back",
    metaTitle: "Missed-Call Text Back and Speed to Lead Automation",
    metaDescription:
      "SignalOps turns missed calls into captured leads with speed to lead automation, text-back workflows, AI lead qualification, alerts, and follow-up.",
    h1: "Missed-call text back that keeps phone leads from disappearing.",
    subheadline:
      "SignalOps helps busy service teams automatically respond to missed calls, gather the reason for the call, and alert the right person when the opportunity needs attention.",
    heroBullets: [
      "Capture customers who call while your team is busy",
      "Ask for the service need, location, urgency, and best callback time",
      "Route emergency or high-value calls for human follow-up"
    ],
    quickStats: [
      {
        title: "Busy teams",
        description: "Designed for owners and crews who are often in the shop, field, or with customers."
      },
      {
        title: "Simple intake",
        description: "Start with name, need, urgency, and contact info instead of a full CRM rollout."
      },
      {
        title: "Follow-up trail",
        description: "Keep a record of who called, what they needed, and whether the team responded."
      }
    ],
    plainEnglishTitle: "What missed-call text back does",
    plainEnglishBody:
      "When a customer calls and no one answers, the system sends a short text asking how the business can help. The goal is to save the opportunity while the customer is still interested. For a local service business, that text might ask about the issue, location, timeline, photos, or appointment preference. The team then gets a summary instead of a mystery missed call.",
    whyTitle: "Why missed calls are expensive",
    whyIntro:
      "A missed call is often a buyer with immediate intent. If there is no fast text back, that buyer may simply call the next provider.",
    whyCards: [
      {
        title: "Calls happen during work",
        description:
          "Auto shops, contractors, med spas, and small offices often miss calls because the team is already serving customers."
      },
      {
        title: "Voicemail is friction",
        description:
          "Many prospects will not leave a useful voicemail. A text makes it easier to explain what they need."
      },
      {
        title: "Manual callbacks get delayed",
        description:
          "By the time someone checks the missed-call list, the customer may have booked elsewhere."
      }
    ],
    solutionTitle: "How SignalOps handles missed calls",
    solutionIntro:
      "SignalOps creates a text-back workflow that feels like a helpful front desk, then routes replies into a simple lead process.",
    solutionCards: [
      {
        title: "Fast text reply",
        description:
          "The customer gets a practical message asking what they need and how urgent it is."
      },
      {
        title: "Qualification prompts",
        description:
          "The system collects the details your team usually needs before calling back."
      },
      {
        title: "Priority alerts",
        description:
          "Emergency, high-value, and ready-to-book leads can alert the owner or sales rep."
      },
      {
        title: "Follow-up if they go quiet",
        description:
          "If the customer does not respond, the system can nudge them with a simple follow-up."
      }
    ],
    workflowTitle: "Example missed-call text-back workflow",
    workflowIntro:
      "The best missed-call workflow is short, direct, and useful. It should not trap customers in a long script.",
    workflow: [
      {
        label: "1",
        title: "Call is missed",
        description:
          "A prospect calls during a job, appointment, or busy shop hour."
      },
      {
        label: "2",
        title: "Text goes out",
        description:
          "They receive a quick message asking what they need and the best way to help."
      },
      {
        label: "3",
        title: "Details are captured",
        description:
          "The customer replies with the issue, location, timeline, photos, or appointment need."
      },
      {
        label: "4",
        title: "Team follows up",
        description:
          "SignalOps routes the lead with a summary, score, urgency, and suggested next action."
      }
    ],
    industryTitle: "Missed-call examples by industry",
    industryExamples: [
      {
        title: "Wheel repair shop",
        description:
          "A customer calls about curb rash or a bent wheel. The text asks for vehicle, damage type, photos, and whether mobile repair is needed."
      },
      {
        title: "HVAC or plumbing company",
        description:
          "A no-heat, no-cool, leak, or no-water call can be flagged as urgent and routed for immediate review."
      },
      {
        title: "Med spa",
        description:
          "A missed consultation call gets a friendly reply with appointment options and a safe handoff to staff."
      },
      {
        title: "Law firm",
        description:
          "A missed intake call gets a response asking for basic contact info and issue type, with no legal advice or promises."
      }
    ],
    faqs: [
      {
        question: "Will missed-call text back annoy customers?",
        answer:
          "It should be short and useful. Most customers who just called appreciate a quick text that helps them explain what they need."
      },
      {
        question: "Can this work without a CRM?",
        answer:
          "Yes. SignalOps can start with simple call/text capture, owner alerts, and a lightweight dashboard. A CRM can be added later if the business needs it."
      },
      {
        question: "Can the system identify emergencies?",
        answer:
          "It can flag emergency language and urgent service types, then route those leads to a human quickly."
      },
      {
        question: "Does this replace answering the phone?",
        answer:
          "No. It catches the calls you miss and gives the team a cleaner callback process."
      }
    ],
    relatedLinks: [
      {
        href: "/ai-lead-response",
        label: "AI lead response",
        description: "See how SignalOps answers all lead sources, not just missed calls."
      },
      {
        href: "/no-crm-lead-tracking",
        label: "No-CRM lead tracking",
        description: "Track calls and texts without forcing a heavy sales platform."
      },
      {
        href: "/roi-calculator",
        label: "ROI calculator",
        description: "Estimate the impact of recovering missed phone leads."
      }
    ]
  },
  "ai-follow-up-automation": {
    id: "ai-follow-up-automation",
    path: "/ai-follow-up-automation",
    eyebrow: "AI follow-up automation",
    metaTitle: "Automated Lead Follow-Up for Service Businesses",
    metaDescription:
      "SignalOps helps service businesses recover missed leads with automated lead follow-up after calls, quote requests, DMs, forms, and appointments.",
    h1: "AI follow-up automation for leads that are interested but not booked yet.",
    subheadline:
      "SignalOps keeps prospects from slipping away after the first reply by sending useful reminders, asking for missing details, and alerting your team when a lead is ready for action.",
    heroBullets: [
      "Follow up after forms, quote requests, calls, texts, and DMs",
      "Ask for missing photos, appointment times, or decision details",
      "Keep the tone practical, helpful, and human-review friendly"
    ],
    quickStats: [
      {
        title: "Day 1",
        description: "Confirm the request and collect missing information."
      },
      {
        title: "Day 2-5",
        description: "Nudge the next step while the job is still relevant."
      },
      {
        title: "Long term",
        description: "Re-engage older leads, maintenance needs, and unbooked quotes."
      }
    ],
    plainEnglishTitle: "What AI follow-up automation means",
    plainEnglishBody:
      "Follow-up automation is the system that keeps asking, reminding, and routing after the first conversation. It can request missing photos, remind a customer to book, check whether they still need service, or alert a sales rep when someone replies with buying intent. SignalOps uses AI carefully here: the messages should be specific to the lead context and should escalate when the situation is sensitive, urgent, or unclear.",
    whyTitle: "Why follow-up breaks down",
    whyIntro:
      "Many businesses respond once, then depend on memory. That creates lost quotes, stale estimates, and customers who never get a clear next step.",
    whyCards: [
      {
        title: "Customers get busy too",
        description:
          "A good prospect may need one reminder to send photos, choose an appointment, or approve an estimate."
      },
      {
        title: "Teams forget quiet leads",
        description:
          "If a lead does not reply right away, it can disappear into a text thread, inbox, or notebook."
      },
      {
        title: "Every follow-up sounds different",
        description:
          "Without templates and timing rules, the quality of follow-up depends on who is working that day."
      }
    ],
    solutionTitle: "How SignalOps builds follow-up automation",
    solutionIntro:
      "SignalOps creates follow-up paths based on lead status, missing details, urgency, service type, and whether the customer has booked.",
    solutionCards: [
      {
        title: "Missing information follow-up",
        description:
          "Ask for photos, address, vehicle details, property details, insurance info, or appointment windows."
      },
      {
        title: "Quote follow-up",
        description:
          "Nudge prospects who received an estimate but have not approved, booked, or asked questions."
      },
      {
        title: "No-response sequence",
        description:
          "Send a few useful reminders, then stop before the outreach becomes annoying."
      },
      {
        title: "Human handoff triggers",
        description:
          "Alert the team when a reply shows urgency, confusion, objection, or high-value intent."
      }
    ],
    workflowTitle: "Example follow-up workflow",
    workflowIntro:
      "A good sequence is not just repeated checking in. Each message should have a reason.",
    workflow: [
      {
        label: "1",
        title: "Lead submits request",
        description:
          "The customer asks for a quote but leaves out photos, address, or preferred time."
      },
      {
        label: "2",
        title: "First follow-up asks for details",
        description:
          "SignalOps requests the specific information needed to move the quote forward."
      },
      {
        label: "3",
        title: "Second follow-up offers next step",
        description:
          "The system suggests booking, a callback, or a simple yes/no reply."
      },
      {
        label: "4",
        title: "Team gets alerted",
        description:
          "When the customer replies with intent, SignalOps sends the context to the right person."
      }
    ],
    industryTitle: "Follow-up automation examples",
    industryExamples: [
      {
        title: "Photo-based repair quotes",
        description:
          "Wheel repair, body work, roofing, and med spa inquiries often need photos before a real next step."
      },
      {
        title: "Maintenance businesses",
        description:
          "Filter changes, HVAC tune-ups, plumbing inspections, and recurring service can trigger reminder workflows."
      },
      {
        title: "Professional services",
        description:
          "Law firms, insurance agencies, and real estate teams can follow up when prospects leave intake forms incomplete."
      },
      {
        title: "Appointment-heavy teams",
        description:
          "Dental, med spa, tint, wrap, and detail shops can nudge consultation or appointment booking."
      }
    ],
    faqs: [
      {
        question: "How many follow-up messages should a business send?",
        answer:
          "It depends on the service and the customer's intent. SignalOps usually recommends a few useful touches with clear stop conditions, not endless automated chasing."
      },
      {
        question: "Can follow-up messages sound human?",
        answer:
          "Yes, but they should also be honest and concise. The best follow-up sounds like a helpful coordinator asking for the next detail."
      },
      {
        question: "What if a customer says no?",
        answer:
          "The workflow should stop or move the lead to a long-term nurture path. SignalOps is designed to respect customer intent."
      },
      {
        question: "Can follow-up be customized by service?",
        answer:
          "Yes. A bent wheel, roof leak, med spa consultation, and insurance quote should not receive the same follow-up sequence."
      }
    ],
    relatedLinks: [
      {
        href: "/ai-lead-qualification",
        label: "AI lead qualification",
        description: "Use qualification to decide which follow-up path fits."
      },
      {
        href: "/lead-management-for-small-business",
        label: "Small business lead management",
        description: "Keep follow-up status visible in a simple dashboard."
      },
      {
        href: "/audit",
        label: "Free Missed Lead Check",
        description: "Find where follow-ups are getting delayed or forgotten."
      }
    ]
  },
  "ai-lead-qualification": {
    id: "ai-lead-qualification",
    path: "/ai-lead-qualification",
    eyebrow: "AI lead qualification",
    metaTitle: "AI Lead Qualification and Routing Automation",
    metaDescription:
      "SignalOps uses AI lead qualification and lead routing automation to score prospects by urgency, service need, buying intent, and follow-up priority.",
    h1: "AI lead qualification that helps your team know who to call first.",
    subheadline:
      "SignalOps turns messy lead submissions into clear summaries, priority scores, tags, and recommended next actions so your team can focus on the best opportunities.",
    heroBullets: [
      "Score leads by urgency, intent, fit, and completeness",
      "Summarize what the customer needs before a callback",
      "Flag risky, urgent, or unclear leads for human review"
    ],
    quickStats: [
      {
        title: "Hot",
        description: "Ready-to-book, urgent, high-value, or clear buying intent."
      },
      {
        title: "Warm",
        description: "Qualified, interested, but needs details, quote, or timing."
      },
      {
        title: "Review",
        description: "Missing contact info, unclear request, risky claim, or edge case."
      }
    ],
    plainEnglishTitle: "What AI lead qualification does",
    plainEnglishBody:
      "AI lead qualification reads the information a prospect provides, extracts the important details, and helps your team decide the next move. It can identify service need, urgency, customer intent, missing fields, and whether the lead should be routed to an owner, salesperson, front desk, technician, or follow-up sequence. SignalOps keeps this conservative: if the system is unsure, the lead should be reviewed by a person.",
    whyTitle: "Why qualification matters",
    whyIntro:
      "Not every lead needs the same response. Treating every inquiry the same slows down the best prospects and wastes time on vague ones.",
    whyCards: [
      {
        title: "Urgent leads need speed",
        description:
          "A no-water issue, bent wheel with shaking, roof leak, or legal deadline should not sit beside a general pricing question."
      },
      {
        title: "High-value jobs need context",
        description:
          "Commercial requests, multi-service quotes, and full-system installs should be routed with enough detail for a serious follow-up."
      },
      {
        title: "Weak leads need better questions",
        description:
          "A vague lead may still be real. The system can ask for missing details before a person spends time chasing."
      }
    ],
    solutionTitle: "How SignalOps qualifies leads",
    solutionIntro:
      "SignalOps creates scoring rules and AI prompts around your actual business, services, service area, team capacity, and risk boundaries.",
    solutionCards: [
      {
        title: "Lead scoring",
        description:
          "Assign a practical score based on service need, urgency, value, contact completeness, and buying language."
      },
      {
        title: "Priority labels",
        description:
          "Classify leads as hot, warm, cold, junk, or human-review so the team knows what to do."
      },
      {
        title: "Summaries and internal notes",
        description:
          "Give the sales rep a quick read on what happened, what is missing, and what to say next."
      },
      {
        title: "Tags and routing",
        description:
          "Apply tags like emergency, photo-needed, mobile-service, commercial, appointment-ready, or inspection-required."
      }
    ],
    workflowTitle: "Example qualification workflow",
    workflowIntro:
      "A useful qualification process should turn a messy inquiry into a clear next action.",
    workflow: [
      {
        label: "1",
        title: "Customer submits details",
        description:
          "The lead includes a message, service need, timeline, contact info, and possibly photos or location."
      },
      {
        label: "2",
        title: "SignalOps extracts signals",
        description:
          "The system identifies urgency, value, missing details, intent, and safety or compliance concerns."
      },
      {
        label: "3",
        title: "Score and tags are applied",
        description:
          "The dashboard shows priority, urgency, recommended action, and suggested follow-up."
      },
      {
        label: "4",
        title: "Lead is routed",
        description:
          "Hot leads alert the right person. Incomplete leads get a follow-up. Risky leads go to human review."
      }
    ],
    industryTitle: "Lead qualification by industry",
    industryExamples: [
      {
        title: "Wheel repair",
        description:
          "Bent or cracked wheels can be flagged for inspection, while curb rash with photos can be routed as a strong cosmetic repair quote."
      },
      {
        title: "Home services",
        description:
          "Emergency language, address, service type, and timeline help separate urgent repairs from routine estimates."
      },
      {
        title: "Med spa and dental",
        description:
          "The system can identify appointment intent and missing intake details while routing medical questions to staff."
      },
      {
        title: "Law and insurance",
        description:
          "Qualification can capture category, urgency, jurisdiction or coverage context, and hand off without giving advice."
      }
    ],
    faqs: [
      {
        question: "Can AI decide whether a lead is worth pursuing?",
        answer:
          "It can help prioritize, but it should not be the only decision-maker. SignalOps recommends human review for unclear, risky, or high-value cases."
      },
      {
        question: "Can we customize the scoring rules?",
        answer:
          "Yes. Lead scoring should match your services, margins, service area, availability, and sales process."
      },
      {
        question: "What if a lead has missing contact information?",
        answer:
          "The system can mark it as lower confidence, ask for missing details when possible, and flag it for review."
      },
      {
        question: "Does qualification work with photos?",
        answer:
          "Yes. Photo requests and photo notes are useful for repair, home service, med spa, auto, and other quote workflows."
      }
    ],
    relatedLinks: [
      {
        href: "/ai-lead-response",
        label: "AI lead response",
        description: "Respond to qualified leads quickly with the right next step."
      },
      {
        href: "/ai-follow-up-automation",
        label: "AI follow-up automation",
        description: "Use lead status and missing details to trigger follow-up."
      },
      {
        href: "/dashboard",
        label: "Dashboard demo",
        description: "See how qualified leads appear inside a SignalOps dashboard."
      }
    ]
  },
  "lead-management-for-small-business": {
    id: "lead-management-for-small-business",
    path: "/lead-management-for-small-business",
    eyebrow: "Lead management for small business",
    metaTitle: "AI Lead Management for Local Businesses",
    metaDescription:
      "SignalOps provides AI lead management for local businesses that need to capture, qualify, route, follow up with, and organize leads without extra admin.",
    h1: "Lead management for small businesses that do not need more admin work.",
    subheadline:
      "SignalOps helps owners and lean teams organize new inquiries, follow-ups, statuses, and sales handoffs without forcing a complicated CRM rollout on day one.",
    heroBullets: [
      "Track calls, texts, forms, DMs, quotes, and appointment requests",
      "Keep status, score, urgency, and next action in one place",
      "Start simple, then connect CRM or calendar tools when useful"
    ],
    quickStats: [
      {
        title: "One view",
        description: "See new, contacted, qualified, booked, won, lost, and needs-follow-up leads."
      },
      {
        title: "Simple statuses",
        description: "Use the pipeline your team can actually maintain."
      },
      {
        title: "Owner visibility",
        description: "Know which leads need action without digging through messages."
      }
    ],
    plainEnglishTitle: "What small business lead management should do",
    plainEnglishBody:
      "Lead management does not have to mean a huge software migration. For many small businesses, the first step is simply making sure every inquiry is captured, labeled, followed up with, and visible. SignalOps creates a lightweight operating layer around your existing calls, texts, forms, DMs, email, and quote requests so the team can see what came in and what needs to happen next.",
    whyTitle: "Why small teams lose track of leads",
    whyIntro:
      "Small businesses often have real demand but no central place to manage it. That is where calls, quote requests, and follow-ups get scattered.",
    whyCards: [
      {
        title: "Everything lives in separate channels",
        description:
          "One lead is in a voicemail, one is in a form notification, one is in Instagram DMs, and another is in the owner's phone."
      },
      {
        title: "No one owns the next step",
        description:
          "A lead may be answered once but never assigned, followed up, quoted, or booked."
      },
      {
        title: "CRMs can be too heavy at first",
        description:
          "A complex system only works if the team uses it. SignalOps can start with the simplest useful workflow."
      }
    ],
    solutionTitle: "How SignalOps manages leads",
    solutionIntro:
      "SignalOps gives your business a clear lead flow: capture, qualify, route, follow up, and track status.",
    solutionCards: [
      {
        title: "Central lead capture",
        description:
          "Bring important lead context from forms, missed calls, DMs, texts, ads, and landing pages into one process."
      },
      {
        title: "Practical pipeline",
        description:
          "Use clear statuses like new, contacted, needs info, qualified, booked, won, and lost."
      },
      {
        title: "Lead summaries",
        description:
          "Give the team a concise view of who the prospect is, what they need, and what to do next."
      },
      {
        title: "Reporting and review",
        description:
          "See missed opportunities, response-needed leads, booked appointments, and follow-up gaps."
      }
    ],
    workflowTitle: "Example lead management workflow",
    workflowIntro:
      "The goal is to create enough structure to prevent missed opportunities without burying the team in software.",
    workflow: [
      {
        label: "1",
        title: "Inquiry is captured",
        description:
          "A call, text, form, DM, or quote request enters the SignalOps workflow."
      },
      {
        label: "2",
        title: "Lead is organized",
        description:
          "The system adds contact details, source, service need, urgency, score, tags, and status."
      },
      {
        label: "3",
        title: "Next action is assigned",
        description:
          "The lead gets a callback, photo request, booking link, quote follow-up, or owner alert."
      },
      {
        label: "4",
        title: "Dashboard stays current",
        description:
          "The owner can review pipeline status, response needs, and missed opportunities."
      }
    ],
    industryTitle: "Lead management examples",
    industryExamples: [
      {
        title: "Three-person service teams",
        description:
          "A small well, water, repair, or trade business can track requests without losing follow-ups in text threads."
      },
      {
        title: "Auto service businesses",
        description:
          "Shops can manage quote requests, appointment questions, photos, and urgent repair requests in one flow."
      },
      {
        title: "Home service companies",
        description:
          "Roofers, HVAC, plumbers, and electricians can separate emergency calls from estimates and maintenance."
      },
      {
        title: "Local professional services",
        description:
          "Offices can track intake requests, consultation interest, and staff handoffs more clearly."
      }
    ],
    faqs: [
      {
        question: "Is SignalOps a CRM?",
        answer:
          "SignalOps can connect to a CRM, but it is not limited to being one. It is a lead operations layer focused on response, qualification, follow-up, routing, and visibility."
      },
      {
        question: "Can we use SignalOps before choosing a CRM?",
        answer:
          "Yes. Many businesses should fix capture and follow-up first, then decide whether a full CRM is worth adding."
      },
      {
        question: "What if my team only uses phones and texts?",
        answer:
          "SignalOps can start there. Calls, texts, missed-call replies, and simple dashboards are often enough for the first version."
      },
      {
        question: "Will this create more work for the team?",
        answer:
          "The goal is the opposite: fewer mystery leads, cleaner summaries, and clearer next actions."
      }
    ],
    relatedLinks: [
      {
        href: "/no-crm-lead-tracking",
        label: "No-CRM lead tracking",
        description: "Start with calls, texts, and simple status tracking."
      },
      {
        href: "/ai-lead-qualification",
        label: "AI lead qualification",
        description: "Prioritize leads inside the management workflow."
      },
      {
        href: "/dashboard",
        label: "SignalOps dashboard demo",
        description: "See a lightweight lead pipeline in action."
      }
    ]
  },
  "no-crm-lead-tracking": {
    id: "no-crm-lead-tracking",
    path: "/no-crm-lead-tracking",
    eyebrow: "No-CRM lead tracking",
    metaTitle: "No-CRM AI Lead Tracking for Local Businesses",
    metaDescription:
      "SignalOps helps local businesses track calls, texts, forms, DMs, and quote requests with AI lead management before a full CRM is required.",
    h1: "No-CRM lead tracking for businesses that run through calls and texts.",
    subheadline:
      "SignalOps helps small teams capture every request, separate urgent leads from routine ones, and keep follow-ups visible even if they are not ready for a formal CRM.",
    heroBullets: [
      "Built for businesses that rely on phones, texts, DMs, and simple forms",
      "Track lead status without forcing a full software migration",
      "Create a path to CRM later when the process is ready"
    ],
    quickStats: [
      {
        title: "No CRM?",
        description: "Start with the way your business already works."
      },
      {
        title: "Fewer lost threads",
        description: "Turn informal conversations into trackable lead records."
      },
      {
        title: "Clear next steps",
        description: "Show who needs a call, quote, photo request, or follow-up."
      }
    ],
    plainEnglishTitle: "What no-CRM lead tracking means",
    plainEnglishBody:
      "A lot of small businesses are not ready for a full CRM. That does not mean they should keep losing leads in phone logs, texts, and DMs. No-CRM lead tracking means SignalOps creates a simple system around your current workflow: capture the inquiry, collect the right details, apply a status, remind the team, and keep the next step visible.",
    whyTitle: "Why a no-CRM approach can be the right first step",
    whyIntro:
      "The best lead system is the one your team will actually use. For small shops and owner-led businesses, simple can be more valuable than comprehensive.",
    whyCards: [
      {
        title: "CRM adoption is hard",
        description:
          "If the team already struggles with follow-up, a complex CRM may add friction before it adds value."
      },
      {
        title: "The real problem is visibility",
        description:
          "Owners need to know which leads came in, which ones were answered, and which ones still need action."
      },
      {
        title: "Manual notes do not scale",
        description:
          "Texts, notebooks, inboxes, and memory work until the team gets busy. Then opportunities fall through."
      }
    ],
    solutionTitle: "How SignalOps tracks leads without a CRM",
    solutionIntro:
      "SignalOps can build the first version around calls, texts, forms, DMs, alerts, and a lightweight dashboard.",
    solutionCards: [
      {
        title: "Capture the basics",
        description:
          "Name, phone, email, source, service need, urgency, message, and preferred next step."
      },
      {
        title: "Add useful status",
        description:
          "Mark leads as new, contacted, needs info, qualified, booked, won, lost, or follow-up needed."
      },
      {
        title: "Send owner alerts",
        description:
          "Route urgent or high-value opportunities to the owner or team lead with the context included."
      },
      {
        title: "Prepare for CRM later",
        description:
          "Once the flow works, SignalOps can connect the same structure into a CRM, calendar, or sales tool."
      }
    ],
    workflowTitle: "Example no-CRM lead tracking workflow",
    workflowIntro:
      "This is a practical starting point for a business that mostly works from a phone.",
    workflow: [
      {
        label: "1",
        title: "Customer calls or texts",
        description:
          "The inquiry starts in the normal channel your business already uses."
      },
      {
        label: "2",
        title: "SignalOps asks for context",
        description:
          "The system collects the service need, urgency, location, photos, or appointment preference."
      },
      {
        label: "3",
        title: "Lead is logged",
        description:
          "A simple record is created with tags, score, status, summary, and recommended next action."
      },
      {
        label: "4",
        title: "Follow-up is tracked",
        description:
          "The team can see who needs a callback, who needs photos, and who is ready to book."
      }
    ],
    industryTitle: "No-CRM tracking examples",
    industryExamples: [
      {
        title: "Small well and water service company",
        description:
          "A three-person team can separate emergency no-water calls, filter changes, maintenance reminders, and large commercial opportunities."
      },
      {
        title: "Independent auto shop",
        description:
          "Track repair requests, estimate questions, appointment interest, and high-priority vehicle issues without a full CRM."
      },
      {
        title: "Detailer or tint shop",
        description:
          "Keep quote requests, packages, photos, appointment windows, and follow-up status organized."
      },
      {
        title: "Solo professional office",
        description:
          "Capture consultation requests and route important inquiries without making staff live inside sales software."
      }
    ],
    faqs: [
      {
        question: "Can SignalOps really work without a CRM?",
        answer:
          "Yes. SignalOps can start with forms, calls, texts, alerts, and a lightweight lead store. A CRM can be added later if it becomes useful."
      },
      {
        question: "Will I still own my lead data?",
        answer:
          "The system should be set up so leads can be exported or moved into future tools. SignalOps is meant to create structure, not trap your business."
      },
      {
        question: "What happens when the business grows?",
        answer:
          "The same intake and qualification rules can be connected to a CRM, booking tool, email system, or reporting dashboard."
      },
      {
        question: "Is this only for very small businesses?",
        answer:
          "No. It is especially useful for small teams, but larger businesses can use the same approach for specific lead sources or departments."
      }
    ],
    relatedLinks: [
      {
        href: "/lead-management-for-small-business",
        label: "Small business lead management",
        description: "See the broader lead management system SignalOps can install."
      },
      {
        href: "/missed-call-text-back",
        label: "Missed-call text back",
        description: "Start capturing phone leads that would otherwise disappear."
      },
      {
        href: "/demo",
        label: "Client demo",
        description: "View demos built around real service-business workflows."
      }
    ]
  }
};

export function getSeoLandingPage(id: SeoLandingPageId) {
  return SEO_LANDING_PAGES[id];
}
