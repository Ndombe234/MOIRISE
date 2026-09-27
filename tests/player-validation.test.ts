import { describe, expect, it } from "vitest";
import { normalizeHandle, validateDisplayName, validateHandle, validatePlayerInput } from "../lib/player/validation";

describe("Player validation", () => {
  it("normalizes handles consistently", () => {
    expect(normalizeHandle("  @MoRiSe_Player  ")).toBe("morise_player");
  });

  it("accepts an optional empty handle", () => {
    expect(validateHandle("")).toBeNull();
  });

  it("rejects invalid handle shapes", () => {
    expect(validateHandle("ab")).not.toBeNull();
    expect(validateHandle("bad handle")).not.toBeNull();
    expect(validateHandle("with-dash")).not.toBeNull();
  });

  it("validates display names", () => {
    expect(validateDisplayName("   ")).not.toBeNull();
    expect(validateDisplayName("MORISE")).toBeNull();
    expect(validateDisplayName("a".repeat(51))).not.toBeNull();
  });

  it("combines player validation", () => {
    expect(validatePlayerInput("MORISE", "player_01")).toBeNull();
    expect(validatePlayerInput("MORISE", "x")).not.toBeNull();
  });
});
