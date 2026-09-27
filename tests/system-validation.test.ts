import { describe, expect, it } from "vitest";
import { validateProgressionPayload } from "../lib/system/validation";

describe("SYSTEM progression validation", () => {
  it("accepts all seven dimensions and bounded XP", () => {
    const result = validateProgressionPayload({
      eventType: "future_event",
      dimensionKey: "contribution",
      xpDelta: 100,
      idempotencyKey: "future:123",
      sourceType: "activity",
      sourceId: "activity-123",
      metadata: { source: "test" },
    });

    expect(result.dimensionKey).toBe("contribution");
    expect(result.xpDelta).toBe(100);
  });

  it("rejects an unknown dimension", () => {
    expect(() =>
      validateProgressionPayload({
        eventType: "future_event",
        dimensionKey: "unknown",
        xpDelta: 10,
        idempotencyKey: "future:123",
        sourceType: "activity",
      }),
    ).toThrow("Invalid dimension.");
  });

  it("rejects XP outside the database contract", () => {
    expect(() =>
      validateProgressionPayload({
        eventType: "future_event",
        dimensionKey: null,
        xpDelta: 10001,
        idempotencyKey: "future:123",
        sourceType: "activity",
      }),
    ).toThrow("XP delta is out of range.");
  });
});
