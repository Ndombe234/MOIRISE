import { describe, expect, it } from "vitest";
import { listCapabilities, resolveCapability } from "@/lib/m01/capabilities";
import { createAppError } from "@/lib/m01/errors";

describe("M01 capability boundary", () => {
  it("exposes one canonical owner for declared capabilities", () => {
    const definitions = listCapabilities();

    expect(definitions.length).toBeGreaterThan(0);
    expect(new Set(definitions.map((item) => item.ownerModule))).toEqual(new Set(["M01"]));
    expect(resolveCapability("m01.ai-gateway", 1)?.status).toBe("declared");
  });

  it("returns null for an unknown version", () => {
    expect(resolveCapability("m01.boot", 999)).toBeNull();
  });
});

describe("M01 application error contract", () => {
  it("defaults retryability to false", () => {
    expect(createAppError("VALIDATION", "req-1", "errors.validation")).toEqual({
      code: "VALIDATION",
      requestId: "req-1",
      retryable: false,
      userMessageKey: "errors.validation",
    });
  });
});
