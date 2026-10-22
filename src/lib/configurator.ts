import { AGENTS, CATEGORIES } from "@/data/painPoints";

export const ALL_PAIN_IDS = CATEGORIES.flatMap((c) => c.items.map((i) => i.id));
const ITEMS = CATEGORIES.flatMap((c) => c.items);
const PRO_AGENTS = ["amy", "leena", "stephanie", "trisha"];

export type PlanId = "receptionist" | "pro" | "full";

export function agentsFor(ids: string[]) {
  const set = new Set(ids);
  return [...new Set(ITEMS.filter((i) => set.has(i.id)).map((i) => i.agent))];
}

export function recommendPlan(ids: string[]): PlanId {
  const agents = agentsFor(ids);
  if (agents.every((a) => a === "amy")) return "receptionist";
  if (agents.every((a) => PRO_AGENTS.includes(a))) return "pro";
  return "full";
}

export function agentUsage(ids: string[]) {
  const set = new Set(ids);
  return (Object.keys(AGENTS) as (keyof typeof AGENTS)[]).map((key) => {
    const mine = ITEMS.filter((i) => i.agent === key);
    return { key, total: mine.length, on: mine.filter((i) => set.has(i.id)).length };
  });
}

export function presetIds(preset: PlanId) {
  if (preset === "full") return ALL_PAIN_IDS;
  const allowed = preset === "receptionist" ? ["amy"] : PRO_AGENTS;
  return ITEMS.filter((i) => allowed.includes(i.agent)).map((i) => i.id);
}

export function coveragePercent(ids: string[]) {
  return Math.round((ids.length / ALL_PAIN_IDS.length) * 100);
}
