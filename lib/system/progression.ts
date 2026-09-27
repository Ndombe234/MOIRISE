export type LevelProgress = {
  level: number;
  currentXp: number;
  nextLevelXp: number;
  percent: number;
};

export function getLevelThreshold(level: number): number {
  if (!Number.isInteger(level) || level < 1) {
    throw new Error("Level must be a positive integer.");
  }

  if (level === 1) return 0;
  return Math.floor(100 * Math.pow(level - 1, 1.65));
}

export function getLevelForXp(totalXp: number): number {
  if (!Number.isFinite(totalXp) || totalXp < 0) {
    throw new Error("Total XP must be a non-negative finite number.");
  }

  let level = 1;
  while (getLevelThreshold(level + 1) <= totalXp) {
    level += 1;
  }

  return level;
}

export function getLevelProgress(totalXp: number): LevelProgress {
  const level = getLevelForXp(totalXp);
  const currentThreshold = getLevelThreshold(level);
  const nextThreshold = getLevelThreshold(level + 1);
  const span = nextThreshold - currentThreshold;
  const currentXp = totalXp - currentThreshold;

  return {
    level,
    currentXp,
    nextLevelXp: span,
    percent: Math.min(100, Math.max(0, Math.floor((currentXp / span) * 100))),
  };
}
