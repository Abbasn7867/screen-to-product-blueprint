import { PLANS as PRICING_CONFIG, SHOW_PRICES } from "@/config/pricing";

export { SHOW_PRICES };

export type Billing = "monthly" | "yearly";

export const PLANS = [
  {
    id: "receptionist",
    ...PRICING_CONFIG.receptionist,
    popular: false,
    blurb: "Annie answers every call, day and night.",
    features: ["Annie, your AI receptionist (1 AI employee)", "24/7 calls & booking", "Your instant test call"],
  },
  {
    id: "pro",
    ...PRICING_CONFIG.pro,
    popular: true,
    blurb: "4 AI employees: Annie, Sarah, Fiona, Megan.",
    features: [
      "Everything in Receptionist",
      "Sarah — schedule optimization",
      "Fiona — follow-up",
      "Megan — performance reporting",
    ],
  },
  {
    id: "full",
    ...PRICING_CONFIG.elite,
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

export function priceLabel(plan: { monthly: number; yearly: number }): string {
  return SHOW_PRICES ? `${formatUSD(plan.monthly)}/mo or ${formatUSD(plan.yearly)}/mo yearly` : "";
}
