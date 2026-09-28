import { mulberry32 } from "@/lib/play/seed";

export type SignalBloomChallenge = {
  targetTimes: number[];
  toleranceMs: number[];
  durationMs: number;
};

export function generateSignalBloomChallenge(seed: number): SignalBloomChallenge {
  const random = mulberry32(seed);
  const targetTimes = Array.from({ length: 7 }, (_, index) => 900 + index * 720 + Math.floor(random() * 220));
  const toleranceMs = targetTimes.map((_, index) => 160 + ((index % 3) * 35));
  return { targetTimes, toleranceMs, durationMs: 6900 };
}

export function validateSignalBloomRun(challenge: SignalBloomChallenge, hitTimes: number[]) {
  if (!Array.isArray(hitTimes) || hitTimes.length !== challenge.targetTimes.length) {
    throw new Error("Invalid Signal Bloom run.");
  }
  if (hitTimes.some((value) => typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > challenge.durationMs + 1000)) {
    throw new Error("Invalid Signal Bloom timing.");
  }
  let score = 0;
  let totalError = 0;
  for (let index = 0; index < challenge.targetTimes.length; index += 1) {
    const error = Math.abs(hitTimes[index] - challenge.targetTimes[index]);
    totalError += error;
    if (error > challenge.toleranceMs[index]) {
      return {
        valid: false,
        score: 0,
        summary: "The signal collapsed before the bloom completed.",
        metadata: { totalError, failedAt: index + 1 },
      };
    }
    score += Math.max(0, 120 - Math.round(error / 2));
  }
  return {
    valid: true,
    score: Math.min(1000, score),
    summary: "Bloom stabilized with " + Math.round(totalError / challenge.targetTimes.length) + "ms average drift.",
    metadata: { averageErrorMs: Math.round(totalError / challenge.targetTimes.length), pulses: challenge.targetTimes.length },
  };
}