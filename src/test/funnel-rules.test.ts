import { describe, expect, it } from "vitest";
import { formatUSPhone, step1Schema } from "@/lib/lead-schema";
import { offersAllowed } from "@/lib/offer-rules";
import { REF_DAYS } from "@/lib/attribution";

describe("funnel rules", () => {
  it("masks US phone numbers", () => expect(formatUSPhone("5555551234")).toBe("(555) 555-1234"));
  it("rejects incomplete phone", () => {
    expect(step1Schema.safeParse({ name: "A", business_name: "B", email: "a@b.co", phone: "(555) 555" }).success).toBe(false);
  });
  it("referral cookie lasts 45 days", () => expect(REF_DAYS).toBe(45));
  it("offers show on /pricing and /configure", () => {
    expect(offersAllowed("/pricing")).toBe(true);
    expect(offersAllowed("/configure")).toBe(true);
  });
  it("offers hidden on /free-trial and /thank-you", () => {
    expect(offersAllowed("/free-trial")).toBe(false);
    expect(offersAllowed("/thank-you")).toBe(false);
  });
});
