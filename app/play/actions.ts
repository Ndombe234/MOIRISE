"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGameDefinition } from "@/lib/play/definitions";
import { validateAttemptId, validatePlayResult } from "@/lib/play/result-validation";

export async function submitPlayResultAction(gameId: string, attemptId: string, rawResult: unknown) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) redirect("/auth/sign-in");

  const game = getGameDefinition(gameId);
  if (!game) throw new Error("Unknown PLAY experience.");

  const validAttemptId = validateAttemptId(attemptId);
  const result = validatePlayResult(rawResult);

  const { data, error } = await supabase.rpc("record_play_completion", {
    game_id_value: game.id,
    attempt_id_value: validAttemptId,
    status_value: result.status,
    score_value: result.score,
    duration_ms_value: result.durationMs,
    signals_value: result.signals,
    moment_candidate_value: result.momentCandidate,
  });

  if (error) throw new Error("Unable to save PLAY result.");

  return data;
}