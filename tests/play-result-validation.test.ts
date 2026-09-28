import { describe, expect, it } from "vitest";
import { validatePlayResult } from "../lib/play/server";

const valid = {
  gameId: "echo-grid",
  gameVersion: 1,
  clientRunId: "run-123",
  seed: "abcd1234",
  status: "completed" as const,
  score: 40,
  durationMs: 12000,
  metadata: { collisions: 1 },
};

describe("play result validation", () => {
  it("accepts a valid result", () => {
    expect(validatePlayResult(valid).id).toBe("echo-grid");
  });

  it("rejects unknown games, invalid versions, scores and durations", () => {
    expect(() => validatePlayResult({ ...valid, gameId: "missing" })).toThrow();
    expect(() => validatePlayResult({ ...valid, gameVersion: 2 })).toThrow();
    expect(() => validatePlayResult({ ...valid, score: -1 })).toThrow();
    expect(() => validatePlayResult({ ...valid, durationMs: 900001 })).toThrow();
  });

  it("rejects malformed metadata", () => {
    expect(() => validatePlayResult({ ...valid, metadata: [] as never })).toThrow();
  });
});
