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

import {
  fabricationGraphIsCanonical,
  getFabricationTask,
  getReadyFabricationTasks,
  listFabricationTasks,
  validateFabricationGraph,
} from "@/lib/m01/fabrication";

describe("M01 machine-fabrication graph", () => {
  it("is canonical, acyclic, and uniquely identified", () => {
    const tasks = listFabricationTasks();

    expect(tasks).toHaveLength(14);
    expect(validateFabricationGraph(tasks)).toEqual([]);
    expect(fabricationGraphIsCanonical()).toBe(true);
    expect(new Set(tasks.map((task) => task.id)).size).toBe(tasks.length);
  });

  it("does not report planned tasks as ready before their predecessors are implemented", () => {
    const ready = getReadyFabricationTasks();

    expect(ready.map((task) => task.id)).toEqual(["M01-T11", "M01-T13"]);
  });

  it("resolves exact task/file contracts", () => {
    expect(getFabricationTask("M01-T06")).toMatchObject({
      featureId: "M01-F06",
      files: ["lib/m01/session.ts"],
      symbols: ["resolveSessionContext"],
      status: "IMPLEMENTED",
    });
  });

  it("rejects malformed fabrication graphs", () => {
    const malformed = [
      ...listFabricationTasks(),
      {
        id: "M01-BAD",
        featureId: "M01-F01",
        ownerModule: "M01" as const,
        dependencies: ["M01-BAD"],
        files: ["lib/m01/bad.ts"],
        symbols: ["bad"],
        status: "PLANNED" as const,
      },
    ];

    expect(validateFabricationGraph(malformed)).toContain("self dependency: M01-BAD");
  });
});
