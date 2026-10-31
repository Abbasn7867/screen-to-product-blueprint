export const SHOW_PRICES = false;

export type Billing = "monthly" | "yearly";

export const PLANS = [
  {
    id: "receptionist",
    name: "Receptionist",
    monthly: 497,
    yearly: 437,
    popular: false,
    blurb: "Amy answers every call, day and night.",
    features: ["Amy, your AI receptionist (1 AI employee)", "24/7 calls & booking", "Your instant test call"],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 1997,
    yearly: 1757,
    popular: true,
    blurb: "4 AI employees: Amy, Leena, Stephanie, Trisha.",
    features: [
      "Everything in Receptionist",
      "Leena — schedule optimization",
      "Stephanie — follow-up",
      "Trisha — performance reporting",
    ],
  },
  {
    id: "full",
    name: "Elite",
    monthly: 2997,
    yearly: 2637,
    popular: false,
    blurb: "All 8 AI employees, every pain point covered.",
    features: ["All 8 AI employees", "Every pain point covered", "Dedicated onboarding"],
  },
] as const;

export function priceFor(planId: string, billing: Billing): number {
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) throw new Error(`Unknown plan ${planId}`);
  return billing === "yearly" ? plan.yearly : plan.monthly;
}

export const formatUSD = (n: number) => `$${n.toLocaleString("en-US")}`;
