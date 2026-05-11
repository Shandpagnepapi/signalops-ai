import { CalendarCheck2, Gauge, MessagesSquare, RefreshCw } from "lucide-react";
import type { LeadPriority, LeadUrgency } from "@/lib/lead-scoring";

export const homepageStats = [
  {
    value: "< 60 sec",
    label: "Target response time"
  },
  {
    value: "24/7",
    label: "Lead capture coverage"
  },
  {
    value: "4 paths",
    label: "Intake, sort, follow up, book"
  }
];

export const operatingSystem = [
  {
    title: "Instant response",
    description: "Reply to new inquiries while buyer intent is still fresh.",
    icon: MessagesSquare
  },
  {
    title: "Intake logic",
    description: "Sort leads by fit, urgency, value, and readiness to book.",
    icon: Gauge
  },
  {
    title: "Automated follow-up",
    description: "Keep conversations alive across email, SMS, and CRM stages.",
    icon: RefreshCw
  },
  {
    title: "Booking handoff",
    description: "Route ready prospects to the right appointment path.",
    icon: CalendarCheck2
  }
];

export const servicePillars = [
  {
    title: "Lead response system",
    description: "Capture inquiries from forms, ads, chats, and missed-call flows.",
    items: [
      "Inbound source mapping",
      "Speed-to-lead reply templates",
      "Basic intake and routing"
    ]
  },
  {
    title: "Intake engine",
    description: "Turn messy inbound context into clear sales priority.",
    items: [
      "Fit and intent signals",
      "Buyer readiness prompts",
      "CRM-ready lead payloads"
    ]
  },
  {
    title: "Follow-up operations",
    description: "Make the next message obvious, timely, and consistent.",
    items: [
      "Email and SMS sequence stubs",
      "Calendar booking handoff",
      "Pipeline health reporting"
    ]
  }
];

export const demoClient = {
  name: "RouteWash Mobile Fleet Care",
  industry: "Mobile fleet washing and recurring fleet care",
  headline: "Mobile fleet washing that keeps vehicles clean without slowing down routes.",
  description:
    "RouteWash Mobile Fleet Care is a fictional Dallas-Fort Worth mobile fleet wash company serving delivery vans, service trucks, dealership lots, rental fleets, and company vehicle fleets.",
  goal: "Turn fleet quote requests into clean recurring account opportunities with faster intake, owner handoff, route-friendly scheduling, and consistent follow-up.",
  services: [
    "Mobile fleet washing",
    "Recurring wash plans",
    "Service van washing",
    "Box truck washing",
    "Dealership lot refresh"
  ],
  painPoints: [
    "Fleet quote requests arrive with missing vehicle count, locations, frequency, or wash-window details.",
    "Recurring account opportunities can get buried beside one-off service questions.",
    "Route-friendly scheduling and site requirements are easy to miss without structured intake."
  ]
};

export const routeWashFleetCare = {
  name: "RouteWash Mobile Fleet Care",
  location: "Dallas-Fort Worth, Texas",
  phone: "(214) 555-0198",
  headline: "Mobile fleet washing that keeps your vehicles clean without slowing down your routes.",
  subheadline:
    "RouteWash helps local businesses keep vans, trucks, lots, and company vehicles clean with on-site service, recurring wash plans, and route-friendly scheduling.",
  trustBadges: [
    "On-site service",
    "Fleet-size quotes",
    "Recurring plans",
    "After-hours options",
    "Route-friendly scheduling"
  ],
  stats: [
    {
      value: "DFW",
      label: "service area"
    },
    {
      value: "Biweekly",
      label: "common cadence"
    },
    {
      value: "2+ sites",
      label: "account intake ready"
    }
  ],
  services: [
    {
      title: "Mobile Fleet Washing",
      description: "On-site exterior washing for delivery vans, service vehicles, light-duty trucks, and fleet accounts."
    },
    {
      title: "Recurring Wash Plans",
      description: "Biweekly, monthly, or custom schedules for businesses that need clean vehicles without constant rebooking."
    },
    {
      title: "Service Van Washing",
      description: "Keep HVAC, plumbing, electrical, and home-service vans clean around active route schedules."
    },
    {
      title: "Box Truck Washing",
      description: "Support small logistics, delivery, and operations teams with route-based wash windows."
    },
    {
      title: "Dealership Lot Refresh",
      description: "Refresh inventory presentation before weekend traffic, promotions, or high-volume lot days."
    },
    {
      title: "Interior Wipe-Down Add-Ons",
      description: "Add light interior touchpoints when appropriate for account needs and service scope."
    },
    {
      title: "Route-Based Scheduling",
      description: "Collect locations, frequency, and preferred windows so service can fit the business day."
    },
    {
      title: "Site Requirement Intake",
      description: "Collect water access, parking, timing, and site notes so the team can configure service around local requirements."
    }
  ],
  fleetTypes: [
    "Delivery vans",
    "Service trucks",
    "Dealership inventory",
    "Rental fleets",
    "Construction vehicles",
    "Company cars",
    "Box trucks"
  ],
  process: [
    {
      title: "Share Fleet Size",
      description: "Tell RouteWash how many vehicles need service and what types are in the account."
    },
    {
      title: "Map Locations",
      description: "Share service cities, site count, parking notes, water access, and any site requirements."
    },
    {
      title: "Choose Frequency",
      description: "Pick weekly, biweekly, monthly, one-time, or custom recurring service cadence."
    },
    {
      title: "Set Wash Window",
      description: "Select business-hours, after-hours, weekend, or low-disruption route windows."
    },
    {
      title: "Receive Quote Path",
      description: "The RouteWash team gets a clean account summary and can prepare the next quote step."
    }
  ],
  testimonials: [
    {
      quote:
        "RouteWash made it simple to discuss all 28 service vans without back-and-forth. They understood locations, timing, and the recurring schedule we needed.",
      name: "Marcus R.",
      vehicle: "HVAC service fleet"
    },
    {
      quote:
        "We needed after-hours washing so trucks were ready before routes started. The quote process collected the details our team cared about.",
      name: "Elena P.",
      vehicle: "Delivery fleet"
    },
    {
      quote:
        "The account intake was clear. Fleet size, lot access, frequency, and service windows were all handled before we talked pricing.",
      name: "Jordan K.",
      vehicle: "Dealership inventory"
    }
  ],
  faqs: [
    {
      question: "Do you wash fleets on site?",
      answer:
        "Yes. RouteWash is built around on-site fleet service for businesses that need vehicles cleaned without pulling them out of operation longer than necessary."
    },
    {
      question: "Can you handle recurring fleet wash plans?",
      answer:
        "Yes. The intake can capture frequency, vehicle count, locations, preferred wash windows, and account notes so the team can prepare a recurring service path."
    },
    {
      question: "Do you serve multiple locations?",
      answer:
        "RouteWash can collect location count, city/service area, access notes, and preferred timing so the account can be reviewed for route-friendly scheduling."
    },
    {
      question: "Can service happen after hours?",
      answer:
        "After-hours options can be discussed during intake. The team should confirm site access, scheduling fit, and local requirements before finalizing service."
    },
    {
      question: "What fleet details do you need?",
      answer:
        "Fleet size, vehicle types, locations, frequency, preferred wash window, water access, and any site-specific requirements help RouteWash prepare a better quote."
    },
    {
      question: "Can you work with dealerships or rental fleets?",
      answer:
        "Yes. Dealership lots, rental fleets, service companies, and logistics teams can be routed as recurring or account-based opportunities."
    }
  ]
};

export type DashboardLeadStatus =
  | "new"
  | "contacted"
  | "needs-details"
  | "ready"
  | "booked"
  | "won"
  | "lost";

export type RouteWashDashboardLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  vehicleTypes: string;
  locationCount: string;
  requestType: string;
  fleetSize: number;
  afterHoursRequested: boolean;
  address: string;
  score: number;
  priority: LeadPriority;
  urgency: LeadUrgency;
  status: DashboardLeadStatus;
  createdAt: string;
  preferredTime: string;
  message: string;
  summary: string;
  recommendedAction: string;
  customerReply: string;
  internalNote: string;
  tags: string[];
  timeline: {
    time: string;
    event: string;
  }[];
};

export const routeWashDashboardLeads: RouteWashDashboardLead[] = [
  {
    id: "routewash-lead-001",
    name: "Avery Stone",
    email: "avery@example.com",
    phone: "(214) 555-0149",
    source: "Website fleet quote form",
    vehicleTypes: "Service vans",
    locationCount: "2 locations",
    requestType: "Recurring wash plan",
    fleetSize: 28,
    afterHoursRequested: true,
    address: "Dallas + Irving",
    score: 92,
    priority: "hot",
    urgency: "soon",
    status: "ready",
    createdAt: "2026-05-06T08:18:00.000Z",
    preferredTime: "After-hours biweekly",
    message:
      "We have 28 HVAC service vans across two locations and need biweekly washing after routes are done. Can you quote it?",
    summary:
      "Recurring account opportunity for 28 service vans across two DFW locations with after-hours preference.",
    recommendedAction:
      "Confirm service area, water access, exact locations, preferred wash window, and send a route-friendly fleet quote path.",
    customerReply:
      "Thanks Avery, RouteWash received your fleet wash request. Can you confirm the two service locations, water access, and preferred after-hours window so we can prepare the right quote path?",
    internalNote:
      "Strong recurring account. Owner should review route density, site access, frequency, and after-hours staffing before quoting.",
    tags: ["recurring-account", "fleet-size-28", "after-hours", "owner-handoff", "route-ready"],
    timeline: [
      { time: "8:18 AM", event: "Website fleet quote form received" },
      { time: "8:18 AM", event: "AI collected fleet size and frequency" },
      { time: "8:20 AM", event: "Owner alert queued for recurring account" }
    ]
  },
  {
    id: "routewash-lead-002",
    name: "Caleb Rivera",
    email: "caleb.rivera@example.com",
    phone: "(972) 555-0172",
    source: "Google Business Profile",
    vehicleTypes: "Box trucks",
    locationCount: "1 logistics yard",
    requestType: "Box truck washing",
    fleetSize: 14,
    afterHoursRequested: false,
    address: "Plano",
    score: 86,
    priority: "warm",
    urgency: "soon",
    status: "contacted",
    createdAt: "2026-05-06T09:04:00.000Z",
    preferredTime: "Saturday morning",
    message:
      "We run box trucks out of Plano and need monthly exterior wash service. Looking for availability and account pricing.",
    summary:
      "Mid-size fleet quote request for 14 box trucks with clear location, cadence, and account-pricing intent.",
    recommendedAction:
      "Ask about truck count by size, site access, water access, preferred monthly window, and prepare account quote follow-up.",
    customerReply:
      "Thanks Caleb, RouteWash can review this. Can you confirm the number of box trucks, site access notes, water availability, and your preferred monthly wash window?",
    internalNote:
      "Good account lead. Confirm vehicle mix and yard access before estimating route time.",
    tags: ["box-trucks", "monthly-plan", "account-pricing", "location-provided"],
    timeline: [
      { time: "9:04 AM", event: "Google inquiry received" },
      { time: "9:05 AM", event: "AI asked for site and vehicle mix" },
      { time: "9:16 AM", event: "Customer confirmed Saturday window" }
    ]
  },
  {
    id: "routewash-lead-003",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "(469) 555-0136",
    source: "Missed-call text back",
    vehicleTypes: "Dealership inventory",
    locationCount: "1 lot",
    requestType: "Dealership lot refresh",
    fleetSize: 65,
    afterHoursRequested: false,
    address: "Frisco",
    score: 94,
    priority: "hot",
    urgency: "soon",
    status: "new",
    createdAt: "2026-05-06T09:31:00.000Z",
    preferredTime: "Before weekend traffic",
    message:
      "We have about 65 units on the lot and want a refresh before a weekend promotion. Can someone call me today?",
    summary:
      "High-volume dealership lot refresh with time-sensitive weekend promotion and same-day callback request.",
    recommendedAction:
      "Route to owner, confirm lot size, vehicle mix, access window, water access, and whether this is one-time or recurring.",
    customerReply:
      "Thanks Priya, RouteWash received the dealership lot request. Can you confirm the lot address, approximate unit count, preferred access window, and whether this is one-time or recurring?",
    internalNote:
      "High-value account possibility. Call today and confirm route capacity before committing to promotion timing.",
    tags: ["dealership", "large-fleet", "time-sensitive", "owner-handoff", "callback-today"],
    timeline: [
      { time: "9:31 AM", event: "Missed call captured" },
      { time: "9:32 AM", event: "Text-back workflow collected lot count" },
      { time: "9:36 AM", event: "Owner alert queued" }
    ]
  },
  {
    id: "routewash-lead-004",
    name: "Marcus Reed",
    email: "marcus.reed@example.com",
    phone: "(214) 555-0187",
    source: "Referral",
    vehicleTypes: "Service trucks",
    locationCount: "3 locations",
    requestType: "Route-based schedule",
    fleetSize: 41,
    afterHoursRequested: true,
    address: "Dallas, Mesquite, Garland",
    score: 90,
    priority: "hot",
    urgency: "researching",
    status: "booked",
    createdAt: "2026-05-05T16:42:00.000Z",
    preferredTime: "Weeknights",
    message:
      "We manage service trucks across three DFW yards and need a route-based wash schedule that does not interrupt dispatch.",
    summary:
      "Multi-location route-based account with 41 service trucks and low-disruption scheduling need.",
    recommendedAction:
      "Map all locations, confirm dispatch windows, and propose a phased recurring service schedule.",
    customerReply:
      "Thanks Marcus, RouteWash can help map a route-based wash plan. Can you send the three addresses, vehicle count by site, and the best weeknight service windows?",
    internalNote:
      "Strong Growth/Custom-style workflow. Multiple locations and dispatch constraints need owner review.",
    tags: ["multi-location", "route-based", "after-hours", "recurring-account", "booked"],
    timeline: [
      { time: "4:42 PM", event: "Referral request captured" },
      { time: "4:43 PM", event: "AI asked for location split" },
      { time: "5:08 PM", event: "Discovery call booked" }
    ]
  },
  {
    id: "routewash-lead-005",
    name: "Elena Porter",
    email: "elena.porter@example.com",
    phone: "(214) 555-0164",
    source: "Organic website",
    vehicleTypes: "Company cars",
    locationCount: "1 office",
    requestType: "Monthly wash plan",
    fleetSize: 9,
    afterHoursRequested: false,
    address: "Lake Highlands",
    score: 68,
    priority: "warm",
    urgency: "researching",
    status: "needs-details",
    createdAt: "2026-05-05T14:12:00.000Z",
    preferredTime: "Monthly Friday afternoon",
    message:
      "We have a small company car fleet and are looking into monthly wash service near our office.",
    summary:
      "Small fleet monthly plan inquiry with office location and preferred timing, but missing vehicle mix and site notes.",
    recommendedAction:
      "Ask for vehicle types, parking/access notes, water access, and whether the account needs interior add-ons.",
    customerReply:
      "Thanks Elena, RouteWash can review monthly service. Can you confirm vehicle types, parking/access notes, water access, and whether you want any light interior add-ons?",
    internalNote:
      "Starter-style account. Need service scope and site notes before quote.",
    tags: ["small-fleet", "monthly-plan", "details-needed"],
    timeline: [
      { time: "2:12 PM", event: "Website inquiry received" },
      { time: "2:13 PM", event: "AI asked for vehicle mix and site notes" },
      { time: "2:15 PM", event: "Follow-up reminder queued" }
    ]
  },
  {
    id: "routewash-lead-006",
    name: "Dustin Hale",
    email: "dustin.hale@example.com",
    phone: "(469) 555-0108",
    source: "Paid search landing page",
    vehicleTypes: "Rental fleet",
    locationCount: "2 lots",
    requestType: "Seasonal refresh",
    fleetSize: 38,
    afterHoursRequested: false,
    address: "Richardson + Addison",
    score: 82,
    priority: "warm",
    urgency: "soon",
    status: "contacted",
    createdAt: "2026-05-06T10:22:00.000Z",
    preferredTime: "Next week",
    message:
      "We manage rental vehicles at two lots and need a refresh next week. We may turn this into recurring if it works.",
    summary:
      "Rental fleet refresh with two locations and possible recurring account path.",
    recommendedAction:
      "Confirm lot addresses, vehicle count by location, service scope, water access, and recurring potential.",
    customerReply:
      "Thanks Dustin, RouteWash received your rental fleet request. Can you send both lot addresses, vehicle count by location, and preferred service windows for next week?",
    internalNote:
      "Potential recurring conversion after one-time refresh. Follow up after service proposal.",
    tags: ["rental-fleet", "two-locations", "recurring-potential", "follow-up"],
    timeline: [
      { time: "10:22 AM", event: "Paid search form submitted" },
      { time: "10:23 AM", event: "AI requested location split" },
      { time: "10:29 AM", event: "Customer confirmed next-week timing" }
    ]
  },
  {
    id: "routewash-lead-007",
    name: "Sofia Martin",
    email: "sofia.martin@example.com",
    phone: "(972) 555-0119",
    source: "Facebook lead ad",
    vehicleTypes: "Construction trucks",
    locationCount: "1 job site",
    requestType: "One-time cleanup",
    fleetSize: 12,
    afterHoursRequested: true,
    address: "Fort Worth",
    score: 74,
    priority: "warm",
    urgency: "soon",
    status: "booked",
    createdAt: "2026-05-05T11:48:00.000Z",
    preferredTime: "Saturday evening",
    message:
      "We need 12 construction trucks cleaned after a dusty job. Saturday evening would be ideal if available.",
    summary:
      "One-time construction fleet cleanup with clear vehicle count and after-hours preference.",
    recommendedAction:
      "Confirm site access, soil level, water access, and whether recurring maintenance is worth discussing.",
    customerReply:
      "Thanks Sofia, RouteWash can review that Saturday evening window. Can you confirm the job site address, truck types, site access, and water availability?",
    internalNote:
      "Bookable one-time job. Ask whether recurring job-site service is needed later.",
    tags: ["construction-trucks", "after-hours", "booked", "site-access-needed"],
    timeline: [
      { time: "11:48 AM", event: "Facebook lead ad captured" },
      { time: "11:49 AM", event: "AI asked site access questions" },
      { time: "12:04 PM", event: "Saturday evening window booked" }
    ]
  },
  {
    id: "routewash-lead-008",
    name: "Jordan Kim",
    email: "jordan.kim@example.com",
    phone: "(214) 555-0127",
    source: "Partner referral",
    vehicleTypes: "Delivery vans",
    locationCount: "1 depot",
    requestType: "Biweekly route",
    fleetSize: 22,
    afterHoursRequested: true,
    address: "Design District",
    score: 88,
    priority: "hot",
    urgency: "soon",
    status: "won",
    createdAt: "2026-05-04T15:26:00.000Z",
    preferredTime: "Early mornings",
    message:
      "We need 22 delivery vans washed before morning routes. Looking for a biweekly setup.",
    summary:
      "Won recurring delivery van account after fast intake and route-window confirmation.",
    recommendedAction:
      "Send onboarding checklist, confirm first service window, and add recurring follow-up reminders.",
    customerReply:
      "Thanks Jordan, RouteWash has your first service window prepared. We will confirm access notes and recurring cadence before the first wash.",
    internalNote:
      "Won recurring account. Add to account review list and confirm service quality after first route.",
    tags: ["won", "delivery-vans", "biweekly", "early-window", "recurring-account"],
    timeline: [
      { time: "3:26 PM", event: "Referral request captured" },
      { time: "3:27 PM", event: "AI collected depot and timing" },
      { time: "Yesterday", event: "Recurring account marked won" }
    ]
  },
  {
    id: "routewash-lead-009",
    name: "Nina Brooks",
    email: "nina.brooks@example.com",
    phone: "",
    source: "Chat widget",
    vehicleTypes: "Unknown fleet",
    locationCount: "Unknown",
    requestType: "Price question",
    fleetSize: 0,
    afterHoursRequested: false,
    address: "",
    score: 36,
    priority: "cold",
    urgency: "unknown",
    status: "lost",
    createdAt: "2026-05-03T17:55:00.000Z",
    preferredTime: "",
    message:
      "How much do you charge for fleet washing? I do not want to give my number yet.",
    summary:
      "Low-context pricing question without fleet size, location, vehicle type, or phone number.",
    recommendedAction:
      "Ask for fleet size, vehicle types, service city, desired frequency, and a callback number before routing to owner.",
    customerReply:
      "Thanks Nina, RouteWash can point you in the right direction. Can you share fleet size, vehicle types, service city, desired frequency, and the best callback number?",
    internalNote:
      "Lost after no response. Missing account details and phone limited follow-up options.",
    tags: ["lost", "phone-missing", "low-context", "details-needed"],
    timeline: [
      { time: "5:55 PM", event: "Chat inquiry received" },
      { time: "5:55 PM", event: "AI requested account basics" },
      { time: "Next day", event: "Lead marked lost after no response" }
    ]
  }
];
