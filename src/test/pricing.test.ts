import { describe, expect, it } from "vitest";
import { priceFor } from "@/lib/pricing";

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
    expect(437 * 3).toBe(1311);
    expect(1757 * 3).toBe(5271);
    expect(2637 * 3).toBe(7911);
  });
});
