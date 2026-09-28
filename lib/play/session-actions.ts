"use server";

import { createClient } from "@/lib/supabase/server";
import { getGameDefinition } from "@/lib/play/definitions";
import { generateEchoChallenge } from "@/lib/play/games/echo-trace";
import { generateSignalBloomChallenge } from "@/lib/play/games/signal-bloom";
import { generateShadowChallenge } from "@/lib/play/games/shadow-courier";

export function generatePlayChallenge(gameId: string, seed: number) {
  switch (gameId) {
    case "echo-trace": return generateEchoChallenge(seed);
    case "signal-bloom": return generateSignalBloomChallenge(seed);
    case "shadow-courier": return generateShadowChallenge(seed);
    default: throw new Error("Unsupported PLAY experience.");
  }
}

export async function startPlaySession(slug: string) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("Authentication required.");

  const game = getGameDefinition(slug);
  if (!game) throw new Error("Unknown PLAY experience.");

  const { data, error } = await supabase.rpc("create_play_session", {
    game_id_value: game.id,
    seed_value: 0,
    challenge_value: {},
  });
  if (error) throw new Error("Unable to start PLAY session.");

  const session = data as { session_id: string; game_id: string; seed: number; expires_at: string };
  return { ...session, challenge: generatePlayChallenge(game.id, Number(session.seed)) };
}
