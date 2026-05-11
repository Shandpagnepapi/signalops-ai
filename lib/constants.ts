const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const normalizedSiteUrl =
  rawSiteUrl.replace(/\/$/, "") === "https://signalops.pro"
    ? "https://www.signalops.pro"
    : rawSiteUrl;

export const SITE_CONFIG = {
  brandName: "SignalOps",
  name: "SignalOps",
  tagline: "Every lead answered. Every follow-up handled.",
  url: normalizedSiteUrl,
  email: "signalopspro@gmail.com",
  description:
    "SignalOps builds AI-powered lead response systems that help small and local businesses answer, sort, route, follow up with, and book more leads automatically."
};

export const PRIMARY_CTA = {
  label: "Free Preview",
  href: "/preview"
};

export const OFFER_NAME = "Free Preview";

export const EMAIL_CTA = {
  label: "Email SignalOps",
  shortLabel: "Contact",
  subject: "SignalOps Project Inquiry",
  body:
    "Hi SignalOps, I'm interested in getting help with lead response and follow-up for my business.\n\nBusiness name:\nWebsite:\nIndustry:\nWhat package I'm interested in:\nWhat I need help with:\nBest phone/email:\nTimeline:"
};

export function getEmailHref({
  subject = EMAIL_CTA.subject,
  body = EMAIL_CTA.body
}: {
  subject?: string;
  body?: string;
} = {}) {
  return `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getPlanEmailHref(planName: string) {
  const subject =
    planName === "Custom"
      ? "SignalOps Custom Package Inquiry"
      : `SignalOps ${planName} Package Inquiry`;

  return getEmailHref({
    subject,
    body: `Hi SignalOps, I'm interested in the ${planName} package.\n\nBusiness name:\nWebsite:\nIndustry:\nWhat I need help with:\nBest phone/email:\nTimeline:`
  });
}

export const SECONDARY_CTA = {
  label: "View Demo",
  href: "/demo"
};

export const NAV_LINKS = [
  {
    href: "/#how-it-works",
    label: "How It Works"
  },
  {
    href: "/#pricing",
    label: "Packages"
  },
  {
    href: "/demo",
    label: "Demo"
  },
  {
    href: "/roi-calculator",
    label: "ROI Calculator"
  }
];

export const SEO_SERVICE_LINKS = [
  {
    href: "/services/ai-lead-response",
    label: "AI Lead Response"
  },
  {
    href: "/services/ai-lead-qualification",
    label: "AI Lead Intake"
  },
  {
    href: "/services/automated-lead-follow-up",
    label: "Automated Follow-Up"
  },
  {
    href: "/services/missed-lead-recovery",
    label: "Missed Lead Recovery"
  },
  {
    href: "/services/lead-routing-automation",
    label: "Lead Routing Automation"
  },
  {
    href: "/services/ai-appointment-booking",
    label: "AI Appointment Booking"
  },
  {
    href: "/services/quote-intake-automation",
    label: "Quote Intake Automation"
  }
];

export const SEO_INDUSTRY_LINKS = [
  {
    href: "/industries/wheel-repair",
    label: "Wheel Repair Shops"
  },
  {
    href: "/industries/auto-shops",
    label: "Auto Shops"
  },
  {
    href: "/industries/detailers",
    label: "Detailers"
  },
  {
    href: "/industries/tint-wrap-shops",
    label: "Tint & Wrap Shops"
  },
  {
    href: "/industries/home-services",
    label: "Home Services"
  },
  {
    href: "/industries/med-spas",
    label: "Med Spas"
  },
  {
    href: "/industries/insurance-agencies",
    label: "Insurance Agencies"
  }
];

export const RESOURCE_LINKS = [
  {
    href: "/preview",
    label: "Free Preview"
  },
  {
    href: "/demo",
    label: "Demo"
  },
  {
    href: "/how-it-works",
    label: "How It Works"
  },
  {
    href: "/roi-calculator",
    label: "ROI Calculator"
  },
  {
    href: "/alternatives",
    label: "Alternatives"
  },
  {
    href: "/audit",
    label: "Project Questionnaire"
  }
];

export const PACKAGE_LINKS = [
  {
    href: "/#starter",
    label: "Starter Package"
  },
  {
    href: "/#growth",
    label: "Growth Package"
  },
  {
    href: "/#custom-agent-system",
    label: "Custom Package"
  }
];

export const COMPANY_LINKS = [
  {
    href: "/privacy",
    label: "Privacy"
  },
  {
    href: "/terms",
    label: "Terms"
  }
];

export const PACKAGE_NAMES = [
  {
    name: "Starter",
    price: "$250/mo",
    summary: "Start with one clean response, intake, and follow-up workflow for a core lead source.",
    features: [
      "Project intake and setup plan",
      "Instant reply workflow",
      "Basic intake questions",
      "Owner or rep alerts"
    ]
  },
  {
    name: "Growth",
    price: "$500/mo",
    summary: "Connect more lead sources, stronger follow-up, and a clearer operating view.",
    features: [
      "Multi-source lead routing",
      "Priority sorting and routing",
      "CRM logging",
      "Follow-up sequences",
      "Dashboard reporting"
    ]
  },
  {
    name: "Custom",
    price: "From $1,000/mo",
    summary: "Build a custom lead operations layer for complex sales, quote, or service workflows.",
    features: [
      "Custom lead agents",
      "Advanced workflow automation",
      "Tool-specific integrations",
      "Optimization support"
    ]
  }
];

export const TARGET_CUSTOMERS = [
  "Auto shops",
  "Wheel repair shops",
  "Detailers",
  "Performance shops",
  "Tint/wrap shops",
  "Roofers",
  "HVAC companies",
  "Plumbing/electrical companies",
  "Med spas",
  "Dental offices",
  "Law firms",
  "Insurance agencies",
  "Real estate teams",
  "Local service businesses"
];

export const AI_LEAD_ENGINE_FEATURES = [
  "Instant response",
  "Lead intake",
  "Priority sorting",
  "Appointment booking",
  "CRM logging",
  "Follow-up automation",
  "Owner/sales rep alerts",
  "Dashboard reporting"
];

export const SIGNALOPS_PROCESS = [
  {
    step: "Scope",
    description: "Gather package interest, lead sources, tools, timeline, and build priorities."
  },
  {
    step: "Map",
    description: "Define sources, intake questions, routing paths, and handoff logic."
  },
  {
    step: "Build",
    description: "Create the lead engine, messages, priority views, alerts, and dashboard."
  },
  {
    step: "Launch",
    description: "Connect the system to live lead sources and monitor early conversations."
  },
  {
    step: "Optimize",
    description: "Use performance data to improve response, booking, and follow-up."
  }
];

export const SIGNALOPS_USE_CASES = [
  "Missed-call text back",
  "Website lead intake",
  "Appointment request handling",
  "Photo-based quote intake",
  "CRM cleanup",
  "Follow-up sequences",
  "Sales rep alerts",
  "Internal workflow automation",
  "Custom lead agents"
];

export const MARKETING_FAQS = [
  {
    question: "Is this a chatbot?",
    answer:
      "Not in the usual sense. SignalOps builds the response and follow-up process behind your forms, calls, ads, DMs, email, CRM rules, and alerts. The goal is faster follow-through, not a floating widget."
  },
  {
    question: "Does it replace my team?",
    answer:
      "No. It handles the repetitive first response, intake, reminders, and routing so your team can spend more time on the leads that actually need a person."
  },
  {
    question: "What tools do you work with?",
    answer:
      "SignalOps can be designed around the tools you already use, including websites, forms, CRMs, calendars, email, SMS, spreadsheets, and internal notification channels."
  },
  {
    question: "How fast can this be installed?",
    answer:
      "A focused Starter build is usually scoped around one clear lead flow first. More advanced systems depend on how many tools, locations, calendars, and handoff rules are involved."
  },
  {
    question: "Do I need a CRM?",
    answer:
      "No, but having one helps. If you do not have a CRM, SignalOps can start with structured lead capture, alerts, follow-up, and reporting while preparing you for a CRM later."
  },
  {
    question: "Can it work with my existing website?",
    answer:
      "Yes. The system can usually plug into your current website forms, landing pages, missed-call flows, or quote requests without rebuilding everything."
  },
  {
    question: "Can it handle quote requests with photos?",
    answer:
      "Yes. Photo-based intake is one of the strongest use cases for repair, automotive, home services, med spas, and any business that needs visual context before quoting."
  },
  {
    question: "What happens when AI is unsure?",
    answer:
      "Unclear, risky, or high-value cases are routed to the right person with context. The system should escalate uncertainty instead of pretending to know."
  }
];

export const CONTACT_PLACEHOLDER = {
  email: "signalopspro@gmail.com",
  calendly: "https://calendly.com/signalops/discovery",
  phone: "+1 (000) 000-0000"
};

export const FUTURE_INTEGRATIONS = [
  "CRM pipelines",
  "Calendar routing",
  "Email and SMS follow-up",
  "Call tracking",
  "Lead intake",
  "Revenue reporting"
];
