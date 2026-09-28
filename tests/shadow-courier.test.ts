import { describe, expect, it } from "vitest";
import { generateShadowChallenge, validateShadowRun } from "../lib/play/games/shadow-courier";

type Point = [number, number];

const key = ([row, col]: Point) => row + ":" + col;
const neighbors = ([row, col]: Point): Point[] => [
  [row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1],
].filter(([r, c]) => r >= 0 && r < 7 && c >= 0 && c < 7) as Point[];

describe("Shadow Courier", () => {
  it("generates deterministic challenges", () => {
    expect(generateShadowChallenge(77)).toEqual(generateShadowChallenge(77));
  });

  it("accepts the designed corridor", () => {
    const challenge = generateShadowChallenge(77);
    const path = [
      [6,0],[5,0],[4,0],[3,0],[2,0],[1,0],[0,0],
      [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
    ] as Point[];
    const result = validateShadowRun(challenge, path);
    expect(result.valid).toBe(true);
  });

  it("accepts a portal route using the teleported current position", () => {
    const challenge = generateShadowChallenge(77);
    const blocked = new Set(challenge.blocked);
    const queue: Array<{ current: Point; path: Point[]; usedPortal: boolean }> = [
      { current: challenge.start, path: [challenge.start], usedPortal: false },
    ];
    const visited = new Set<string>();
    let portalPath: Point[] | null = null;

    while (queue.length && !portalPath) {
      const state = queue.shift()!;
      const visitKey = key(state.current) + ":" + String(state.usedPortal);
      if (visited.has(visitKey)) continue;
      visited.add(visitKey);

      if (
        state.usedPortal &&
        state.current[0] === challenge.exit[0] &&
        state.current[1] === challenge.exit[1]
      ) {
        portalPath = state.path;
        break;
      }

      for (const point of neighbors(state.current)) {
        const pointKey = key(point);
        if (blocked.has(pointKey)) continue;

        const destination = challenge.portals[pointKey] ?? point;
        queue.push({
          current: destination,
          path: [...state.path, point],
          usedPortal: state.usedPortal || Boolean(challenge.portals[pointKey]),
        });
      }
    }

    expect(portalPath).not.toBeNull();
    const result = validateShadowRun(challenge, portalPath!);
    expect(result.valid).toBe(true);
    expect(portalPath!.some((point) => Boolean(challenge.portals[key(point)]))).toBe(true);
  });

  it("rejects malformed movement", () => {
    const challenge = generateShadowChallenge(77);
    const result = validateShadowRun(challenge, [[6,0],[6,3]] as Point[]);
    expect(result.valid).toBe(false);
  });
});
