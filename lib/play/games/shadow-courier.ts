import { mulberry32, shuffle } from "../seed";

export type ShadowPoint = [number, number];
export type ShadowChallenge = {
  size: 7;
  start: ShadowPoint;
  exit: ShadowPoint;
  blocked: string[];
  portals: Record<string, ShadowPoint>;
};

const key = ([row, col]: ShadowPoint) => row + ":" + col;
const neighbors = ([row, col]: ShadowPoint): ShadowPoint[] => [
  [row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1],
].filter(([r, c]) => r >= 0 && r < 7 && c >= 0 && c < 7) as ShadowPoint[];

export function generateShadowChallenge(seed: number): ShadowChallenge {
  const random = mulberry32(seed);
  const start: ShadowPoint = [6, 0];
  const exit: ShadowPoint = [0, 6];
  const corridor: ShadowPoint[] = [];
  for (let row = 6; row >= 0; row -= 1) corridor.push([row, 0]);
  corridor.push([0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]);
  const portals: Record<string, ShadowPoint> = {
    "5:2": [2, 6],
    "2:6": [5, 2],
    "4:6": [1, 3],
    "1:3": [4, 6],
  };
  const safe = new Set([
    ...corridor.map(key),
    ...Object.keys(portals),
    ...Object.values(portals).map(key),
  ]);
  const cells = Array.from({ length: 49 }, (_, index) => [Math.floor(index / 7), index % 7] as ShadowPoint);
  const candidates = shuffle(
    cells.filter((cell) => !safe.has(key(cell)) && key(cell) !== key(start) && key(cell) !== key(exit)),
    random,
  );
  const blocked = candidates.slice(0, 10).map(key);
  return { size: 7, start, exit, blocked, portals };
}

export function validateShadowRun(challenge: ShadowChallenge, path: ShadowPoint[]) {
  if (!Array.isArray(path) || path.length < 2 || path.length > 120) throw new Error("Invalid Shadow Courier path.");
  const blocked = new Set(challenge.blocked);
  let current = challenge.start;
  const visited = new Set<string>();
  for (const point of path) {
    if (!Array.isArray(point) || point.length !== 2 || !point.every((v) => Number.isInteger(v))) {
      throw new Error("Invalid Shadow Courier point.");
    }
  }
  if (key(path[0]) !== key(challenge.start)) return { valid: false, score: 0, summary: "The shadow started from the wrong gate.", metadata: {} };
  for (let index = 1; index < path.length; index += 1) {
    const point = path[index];
    if (!neighbors(current).some((candidate) => key(candidate) === key(point))) {
      return { valid: false, score: 0, summary: "The courier path crossed space the shadow cannot reach.", metadata: { failedAt: index } };
    }
    if (blocked.has(key(point))) {
      return { valid: false, score: 0, summary: "The shadow hit a sealed space.", metadata: { failedAt: index } };
    }
    current = challenge.portals[key(point)] ?? point;
    visited.add(key(current));
  }
  if (key(current) !== key(challenge.exit)) {
    return { valid: false, score: 0, summary: "The shadow never reached the exit.", metadata: { final: current } };
  }
  const efficiency = Math.max(0, 100 - Math.max(0, path.length - 14) * 5);
  return {
    valid: true,
    score: Math.min(1000, 650 + efficiency * 3),
    summary: "The shadow arrived in " + (path.length - 1) + " moves.",
    metadata: { moves: path.length - 1, visited: visited.size },
  };
}