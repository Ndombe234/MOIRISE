import { describe, expect, it } from "vitest";
import { shouldRecordIdentityCompletion } from "../lib/player/system-milestone";

describe("Player to SYSTEM identity transition", () => {
  it("records the SYSTEM milestone only for a real false-to-true transition", () => {
    expect(shouldRecordIdentityCompletion(false, true)).toBe(true);
    expect(shouldRecordIdentityCompletion(true, true)).toBe(false);
    expect(shouldRecordIdentityCompletion(false, false)).toBe(false);
  });
});
