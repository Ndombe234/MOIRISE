import { describe, expect, it } from "vitest";
import {
  PLAY_EXPERIENCE_DEFINITIONS,
  getGameDefinition,
  isRegisteredPlayExperience,
} from "../lib/play/definitions";

describe("PLAY experience registry", () => {
  it("has unique ids and safe play routes", () => {
    const ids = PLAY_EXPERIENCE_DEFINITIONS.map((definition) => definition.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(PLAY_EXPERIENCE_DEFINITIONS.every((definition) => definition.launchPath.startsWith("/play/"))).toBe(true);
  });

  it("only exposes registered experiences through lookup", () => {
    expect(getGameDefinition("echo-trace")?.id).toBe("echo-trace");
    expect(isRegisteredPlayExperience("signal-bloom")).toBe(true);
    expect(getGameDefinition("not-real")).toBeNull();
    expect(isRegisteredPlayExperience("not-real")).toBe(false);
  });

  it("does not encode a fixed product game count", () => {
    expect(PLAY_EXPERIENCE_DEFINITIONS.length).toBeGreaterThanOrEqual(3);
  });
});
