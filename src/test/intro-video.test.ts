import { describe, expect, it } from "vitest";
import { INTRO_VIDEO, TITLE } from "@/components/intro-video";

describe("intro video", () => {
  it("keeps the agreed 60 Seconds title", () => {
    expect(INTRO_VIDEO.seconds).toBe(60);
    expect(TITLE).toBe("Meet Your AI Front Office in 60 Seconds");
  });
});
