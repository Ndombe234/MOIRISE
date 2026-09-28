export type GameFamily = "pulse" | "drift" | "forge" | "duel" | "quest" | "world";
export type GameMode = "2d" | "3d";
export type GameRunStatus = "active" | "completed" | "abandoned";

export type GameUnlockContext = {
  level: number;
  totalXp: number;
  dimensions: Record<string, number>;
};

export type GameResult = {
  status: Exclude<GameRunStatus, "active">;
  score: number;
  durationMs: number;
  seed: string;
  metadata: Record<string, string | number | boolean | null>;
};

export type GameMoment = {
  gameId: string;
  title: string;
  subtitle: string;
  shareText: string;
  deepLink: string;
};

export type GameDefinition = {
  id: string;
  name: string;
  family: GameFamily;
  version: number;
  mode: GameMode;
  estimatedDurationSeconds: number;
  solo: boolean;
  shareable: boolean;
  isPrototype: boolean;
  isUnlocked: (context: GameUnlockContext) => boolean;
  createMoment: (result: GameResult) => Omit<GameMoment, "deepLink">;
};