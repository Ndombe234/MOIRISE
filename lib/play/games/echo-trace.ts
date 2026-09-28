import { mulberry32, shuffle } from "@/lib/play/seed";

export type EchoTransform = "identity" | "rotate90" | "mirrorH" | "mirrorV";

export type EchoChallenge = {
  sequence: number[];
  transform: EchoTransform;
};

function transformIndex(index: number, transform: EchoTransform): number {
  const row = Math.floor(index / 4);
  const col = index % 4;
  if (transform === "rotate90") return col * 4 + (3 - row);
  if (transform === "mirrorH") return (3 - row) * 4 + col;
  if (transform === "mirrorV") return row * 4 + (3 - col);
  return index;
}

export function generateEchoChallenge(seed: number): EchoChallenge {
  const random = mulberry32(seed);
  const cells = shuffle(Array.from({ length: 16 }, (_, index) => index), random);
  const transforms: EchoTransform[] = ["identity", "rotate90", "mirrorH", "mirrorV"];
  const transform = transforms[Math.floor(random() * transforms.length)];
  const length = 5 + Math.floor(random() * 3);
  return { sequence: cells.slice(0, length), transform };
}

export function visibleEchoSequence(challenge: EchoChallenge): number[] {
  return challenge.sequence.map((index) => transformIndex(index, challenge.transform));
}

export function validateEchoRun(challenge: EchoChallenge, moves: number[]) {
  const expected = visibleEchoSequence(challenge);
  if (!Array.isArray(moves) || moves.length !== expected.length) throw new Error("Invalid Echo Trace run.");
  if (moves.some((move) => !Number.isInteger(move) || move < 0 || move > 15)) throw new Error("Invalid Echo Trace move.");
  const valid = moves.every((move, index) => move === expected[index]);
  return {
    valid,
    score: valid ? 450 + expected.length * 50 : 0,
    summary: valid ? "Trace reconstructed after the world shifted." : "The trace broke before the final node.",
    metadata: { transform: challenge.transform, length: expected.length },
  };
}