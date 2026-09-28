import { describe, expect, it } from "vitest";
import { validateAttemptId, validatePlayResult } from "../lib/play/result-validation";

describe("PLAY result validation", () => {
  it("accepts a bounded completed result", () => {
    const result = validatePlayResult({
      status: "completed",
      score: 950,
      durationMs: 12000,
      signals: { timing: 90 },
      momentCandidate: { kind: "precision", title: "Perfect", summary: "A clean run." },
    });
    expect(result.score).toBe(950);
  });

  it("rejects manipulated score and duration", () => {
    expect(() => validatePlayResult({ status: "completed", score: 1001, durationMs: 1000, signals: {} })).toThrow();
    expect(() => validatePlayResult({ status: "completed", score: 10, durationMs: 50, signals: {} })).toThrow();
  });

  it("rejects invalid signal keys and moment payloads", () => {
    expect(() => validatePlayResult({ status: "completed", score: 10, durationMs: 1000, signals: { "Bad Key": 1 } })).toThrow();
    expect(() => validatePlayResult({ status: "completed", score: 10, durationMs: 1000, signals: {}, momentCandidate: { kind: "bad", title: "x", summary: "x" } })).toThrow();
  });

  it("validates UUID attempts", () => {
    expect(validateAttemptId("00000000-0000-4000-8000-000000000001")).toContain("-");
    expect(() => validateAttemptId("fake")).toThrow();
  });
});