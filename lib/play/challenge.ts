import { generateEchoChallenge } from "@/lib/play/games/echo-trace";
import { generateSignalBloomChallenge } from "@/lib/play/games/signal-bloom";
import { generateShadowChallenge } from "@/lib/play/games/shadow-courier";

export function generatePlayChallenge(gameId: string, seed: number) {
  switch (gameId) {
    case "echo-trace":
      return generateEchoChallenge(seed);
    case "signal-bloom":
      return generateSignalBloomChallenge(seed);
    case "shadow-courier":
      return generateShadowChallenge(seed);
    default:
      throw new Error("Unsupported PLAY experience.");
  }
}
