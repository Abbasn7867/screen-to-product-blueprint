import { describe, expect, it } from "vitest";
import { ALL_PAIN_IDS, presetIds, recommendPlan, agentUsage } from "@/lib/configurator";

describe("configurator", () => {
  it("has all 64 pain points", () => expect(ALL_PAIN_IDS).toHaveLength(64));
  it("only Amy items → Receptionist", () => expect(recommendPlan(["p1", "p5"])).toBe("receptionist"));
  it("Amy, Leena, Stephanie, Trisha items → Pro", () => expect(recommendPlan(["p1", "p11", "p38", "p59"])).toBe("pro"));
  it("any other agent → Elite", () => expect(recommendPlan(["p1", "p17"])).toBe("full"));
  it("presets map to their plans", () => {
    expect(recommendPlan(presetIds("receptionist"))).toBe("receptionist");
    expect(recommendPlan(presetIds("pro"))).toBe("pro");
    expect(recommendPlan(presetIds("full"))).toBe("full");
    expect(presetIds("full")).toHaveLength(64);
  });
  it("counts per agent", () => expect(agentUsage(["p1"]).find((a) => a.key === "amy")).toEqual({ key: "amy", total: 10, on: 1 }));
});
