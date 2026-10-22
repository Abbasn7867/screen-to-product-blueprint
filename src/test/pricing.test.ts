import { describe, expect, it } from "vitest";
import { priceFor } from "@/lib/pricing";

describe("pricing", () => {
  it("monthly prices", () => {
    expect(priceFor("receptionist", "monthly")).toBe(497);
    expect(priceFor("pro", "monthly")).toBe(1497);
    expect(priceFor("full", "monthly")).toBe(1997);
  });
  it("yearly prices switch all three plans", () => {
    expect(priceFor("receptionist", "yearly")).toBe(437);
    expect(priceFor("pro", "yearly")).toBe(1317);
    expect(priceFor("full", "yearly")).toBe(1757);
  });
});
