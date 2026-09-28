import type { SystemDimensionKey } from "@/lib/system/constants";

export const PLAY_FAMILIES = ["pulse", "drift", "forge", "duel", "quest", "world"] as const;
export type PlayFamily = (typeof PLAY_FAMILIES)[number];

export const PLAY_DIFFICULTIES = ["calm", "focused", "intense"] as const;
export type PlayDifficulty = (typeof PLAY_DIFFICULTIES)[number];

export type GameDefinition = {
  id: string;
  family: PlayFamily;
  title: string;
  description: string;
  estimatedSeconds: number;
  dimensions: Partial<Record<SystemDimensionKey, number>>;
  difficulty: PlayDifficulty;
  requiredLevel: number;
  launchPath: string;
};

export type PlayContext = {
  playerId: string;
  systemLevel: number;
  dimensions: Partial<Record<SystemDimensionKey, number>>;
  recentGameIds: string[];
  sessionSeconds: number;
};

export type PlaySelection = {
  game: GameDefinition;
  reason: string;
  affinity: number;
};

export type PlayStatus = "completed" | "abandoned" | "failed";

export type PlayMomentCandidate = {
  kind: "personal_best" | "rare_path" | "precision" | "discovery" | "challenge_result";
  title: string;
  summary: string;
};

export type PlayResult = {
  gameId: string;
  attemptId: string;
  status: PlayStatus;
  score: number;
  durationMs: number;
  signals: Record<string, number>;
  momentCandidate: PlayMomentCandidate | null;
};

export type PlayRuntimeProps = {
  definition: GameDefinition;
  onComplete: (result: Omit<PlayResult, "gameId" | "attemptId">) => void;
  onAbandon: (result: Omit<PlayResult, "status" | "score" | "signals" | "momentCandidate">) => void;
};