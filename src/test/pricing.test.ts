import { describe, expect, it } from "vitest";
import { PLANS, priceFor } from "@/lib/pricing";

describe("pricing", () => {
  it("monthly prices", () => {
    expect(priceFor("receptionist", "monthly")).toBe(497);
    expect(priceFor("pro", "monthly")).toBe(1997);
    expect(priceFor("full", "monthly")).toBe(2997);
  });
  it("yearly prices switch all three plans", () => {
    expect(priceFor("receptionist", "yearly")).toBe(437);
    expect(priceFor("pro", "yearly")).toBe(1757);
    expect(priceFor("full", "yearly")).toBe(2637);
  });
  it("yearly billed quarterly = 3x monthly", () => {
    expect(PLANS.find((p) => p.id === "receptionist")?.quarterly).toBe(1311);
    expect(PLANS.find((p) => p.id === "pro")?.quarterly).toBe(5271);
    expect(PLANS.find((p) => p.id === "full")?.quarterly).toBe(7911);
  });
});
