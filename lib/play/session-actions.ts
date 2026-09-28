"use server";

import { createClient } from "@/lib/supabase/server";
import { getGameDefinition } from "@/lib/play/definitions";
import { generateEchoChallenge } from "@/lib/play/games/echo-trace";
import { generateSignalBloomChallenge } from "@/lib/play/games/signal-bloom";
import { generateShadowChallenge } from "@/lib/play/games/shadow-courier";

export async function startPlaySession(slug: string) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("Authentication required.");

  const game = getGameDefinition(slug);
  if (!game) throw new Error("Unknown PLAY experience.");

  const seed = Math.floor(Math.random() * 2147483647);
  const challenge =
    slug === "echo-trace" ? generateEchoChallenge(seed) :
    slug === "signal-bloom" ? generateSignalBloomChallenge(seed) :
    generateShadowChallenge(seed);

  const { data, error } = await supabase.rpc("create_play_session", {
    game_id_value: game.id,
    seed_value: seed,
    challenge_value: challenge,
  });
  if (error) throw new Error("Unable to start PLAY session.");
  return data as {
    session_id: string;
    game_id: string;
    seed: number;
    challenge: unknown;
    expires_at: string;
  };
}