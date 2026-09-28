import { describe, expect, it } from "vitest";
import { buildTraceSequence } from "../components/play/echo-trace";

describe("Echo Trace", () => {
  it("creates a stable seven-node sequence from a seed", () => {
    const a = buildTraceSequence("seed-A");
    const b = buildTraceSequence("seed-A");
    expect(a).toEqual(b);
    expect(a).toHaveLength(7);
    expect(new Set(a).size).toBe(7);
  });
});