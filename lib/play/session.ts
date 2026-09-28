import { createGameSeed } from "./seed";
import type { GameRunStatus } from "./types";

export type GameRun = {
  clientRunId: string;
  gameId: string;
  gameVersion: number;
  seed: string;
  status: GameRunStatus;
  startedAtMs: number;
};

export function startGameRun(
  gameId: string,
  gameVersion: number,
  clientRunId: string,
  startedAtMs = Date.now(),
): GameRun {
  if (!gameId.trim() || gameVersion < 1 || !clientRunId.trim()) {
    throw new Error("Invalid game run.");
  }

  return {
    clientRunId,
    gameId,
    gameVersion,
    seed: createGameSeed(`${gameId}:v${gameVersion}:${clientRunId}`),
    status: "active",
    startedAtMs,
  };
}

export function completeGameRun(run: GameRun, score: number, durationMs: number): GameRun {
  if (run.status !== "active") return run;
  if (!Number.isFinite(score) || score < 0) throw new Error("Invalid score.");
  if (!Number.isFinite(durationMs) || durationMs < 0) throw new Error("Invalid duration.");

  return { ...run, status: "completed" };
}

export function abandonGameRun(run: GameRun): GameRun {
  if (run.status !== "active") return run;
  return { ...run, status: "abandoned" };
}