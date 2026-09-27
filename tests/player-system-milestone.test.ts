import { describe, expect, it } from "vitest";
import { shouldRecordIdentityCompletion } from "../lib/player/system-milestone";

describe("Player to SYSTEM identity milestone", () => {
  it("attempts the idempotent SYSTEM record whenever onboarding is complete", () => {
    expect(shouldRecordIdentityCompletion(false)).toBe(false);
    expect(shouldRecordIdentityCompletion(true)).toBe(true);
  });
});
