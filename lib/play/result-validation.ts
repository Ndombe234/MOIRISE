import type { PlayMomentCandidate, PlayResult, PlayStatus } from "@/lib/play/types";

const UUID_PATTERN = /^[0-9a-f-]{36}$/i;
const STATUS_VALUES = new Set<PlayStatus>(["completed", "abandoned", "failed"]);

export function validatePlayResult(input: unknown): Omit<PlayResult, "gameId" | "attemptId"> {
  if (!input || typeof input !== "object") throw new Error("Invalid PLAY result.");
  const value = input as Record<string, unknown>;

  const status = value.status;
  const score = value.score;
  const durationMs = value.durationMs;
  const signals = value.signals;
  const momentCandidate = value.momentCandidate;

  if (typeof status !== "string" || !STATUS_VALUES.has(status as PlayStatus)) {
    throw new Error("Invalid PLAY status.");
  }
  if (!Number.isInteger(score) || (score as number) < 0 || (score as number) > 1000) {
    throw new Error("Invalid PLAY score.");
  }
  if (!Number.isInteger(durationMs) || (durationMs as number) < 250 || (durationMs as number) > 20 * 60 * 1000) {
    throw new Error("Invalid PLAY duration.");
  }
  if (!signals || typeof signals !== "object" || Array.isArray(signals)) {
    throw new Error("Invalid PLAY signals.");
  }

  for (const [key, rawValue] of Object.entries(signals as Record<string, unknown>)) {
    if (!/^[a-z][a-z0-9_]{0,31}$/.test(key) || typeof rawValue !== "number" || !Number.isFinite(rawValue) || rawValue < 0 || rawValue > 1000) {
      throw new Error("Invalid PLAY signal.");
    }
  }

  if (momentCandidate !== null) {
    if (!momentCandidate || typeof momentCandidate !== "object") throw new Error("Invalid PLAY moment.");
    const candidate = momentCandidate as Record<string, unknown>;
    const validKinds = new Set(["personal_best", "rare_path", "precision", "discovery", "challenge_result"]);
    if (typeof candidate.kind !== "string" || !validKinds.has(candidate.kind) ||
        typeof candidate.title !== "string" || candidate.title.length < 1 || candidate.title.length > 120 ||
        typeof candidate.summary !== "string" || candidate.summary.length < 1 || candidate.summary.length > 280) {
      throw new Error("Invalid PLAY moment.");
    }
  }

  return {
    status: status as PlayStatus,
    score: score as number,
    durationMs: durationMs as number,
    signals: signals as Record<string, number>,
    momentCandidate: momentCandidate as PlayMomentCandidate | null,
  };
}

export function validateAttemptId(attemptId: string) {
  if (!UUID_PATTERN.test(attemptId)) throw new Error("Invalid PLAY attempt.");
  return attemptId;
}