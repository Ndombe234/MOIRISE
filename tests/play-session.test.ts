import { describe, expect, it } from "vitest";
import { createGameRunKey, createGameSeed } from "../lib/play/seed";
import { abandonGameRun, completeGameRun, startGameRun } from "../lib/play/session";

describe("PLAY session", () => {
  it("creates deterministic seeds and run keys", () => {
    expect(createGameSeed("echo-grid:1:abc")).toBe(createGameSeed("echo-grid:1:abc"));
    expect(createGameRunKey("p1", "echo-grid", "r1")).toBe(createGameRunKey("p1", "echo-grid", "r1"));
    expect(createGameRunKey("p1", "echo-grid", "r1")).not.toBe(createGameRunKey("p1", "echo-grid", "r2"));
  });

  it("supports active -> completed and active -> abandoned", () => {
    const active = startGameRun("echo-grid", 1, "run-a", 1000);
    expect(active.status).toBe("active");
    expect(completeGameRun(active, 50, 500).status).toBe("completed");
    expect(abandonGameRun(active).status).toBe("abandoned");
  });

  it("does not reopen a terminal run", () => {
    const completed = completeGameRun(startGameRun("echo-grid", 1, "run-a", 1000), 50, 500);
    expect(completeGameRun(completed, 60, 600)).toEqual(completed);
    expect(abandonGameRun(completed)).toEqual(completed);
  });
});
