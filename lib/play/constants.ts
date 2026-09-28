import type { GameUnlockContext } from "./types";

export const PLAY_DIMENSION = "play" as const;
export const PLAY_XP_REWARDS = {
  completed: 10,
  completedWithHighScore: 15,
} as const;

export const DEFAULT_UNLOCK_CONTEXT: GameUnlockContext = {
  level: 1,
  totalXp: 0,
  dimensions: { play: 0 },
};

export const PLAY_MAX_RESULT_SCORE = 100000;
export const PLAY_MAX_DURATION_MS = 15 * 60 * 1000;