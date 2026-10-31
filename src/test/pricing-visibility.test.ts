import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.doUnmock("@/config/pricing");
  vi.resetModules();
});

describe("subscription price visibility", () => {
  it("hides every plan label by default", async () => {
    const { PLANS, SHOW_PRICES, priceLabel } = await import("@/lib/pricing");
    expect(SHOW_PRICES).toBe(false);
    expect(PLANS.map(priceLabel)).toEqual(["", "", ""]);
  });

  it.each([
    ["receptionist", "$497/mo or $437/mo yearly"],
    ["pro", "$1,997/mo or $1,757/mo yearly"],
    ["full", "$2,997/mo or $2,637/mo yearly"],
  ])("shows the configured %s label when enabled", async (id, label) => {
    vi.doMock("@/config/pricing", async () => ({
      ...await vi.importActual<typeof import("@/config/pricing")>("@/config/pricing"),
      SHOW_PRICES: true,
    }));
    const { PLANS, priceLabel } = await import("@/lib/pricing");
    const plan = PLANS.find((p) => p.id === id);
    expect(plan).toBeDefined();
    if (!plan) throw new Error("Missing configured plan");
    expect(priceLabel(plan)).toBe(label);
  });
});