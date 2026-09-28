"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGameDefinition } from "@/lib/play/definitions";
import { generatePlayChallenge, startPlaySession } from "@/lib/play/session-actions";
import { validateEchoRun, type EchoChallenge } from "@/lib/play/games/echo-trace";
import { validateSignalBloomRun, type SignalBloomChallenge } from "@/lib/play/games/signal-bloom";
import { validateShadowRun, type ShadowChallenge, type ShadowPoint } from "@/lib/play/games/shadow-courier";
import { validateAttemptId } from "@/lib/play/result-validation";

function parseActionLog(gameId: string, raw: unknown) {
  if (!raw || typeof raw !== "object") throw new Error("Invalid PLAY action log.");
  const value = raw as Record<string, unknown>;
  if (gameId === "echo-trace") return { moves: value.moves as unknown };
  if (gameId === "signal-bloom") return { hitTimes: value.hitTimes as unknown };
  if (gameId === "shadow-courier") return { path: value.path as unknown };
  throw new Error("Unsupported PLAY experience.");
}

export async function startGameSessionAction(gameId: string) {
  return startPlaySession(gameId);
}

export async function completePlaySessionAction(sessionId: string, rawActions: unknown) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) redirect("/auth/sign-in");

  const validSessionId = validateAttemptId(sessionId);
  const { data: session, error: sessionError } = await supabase
    .from("play_sessions")
    .select("session_id, player_id, game_id, seed, status, started_at, expires_at")
    .eq("session_id", validSessionId)
    .eq("player_id", user.id)
    .maybeSingle();

  if (sessionError) throw new Error("Unable to load PLAY session.");
  if (!session) throw new Error("PLAY session not found.");
  if (session.status !== "active") return { status: "duplicate", sessionId: validSessionId };
  if (Date.now() > Date.parse(session.expires_at)) throw new Error("PLAY session expired.");

  const game = getGameDefinition(session.game_id);
  if (!game) throw new Error("Unknown PLAY experience.");

  const challenge = generatePlayChallenge(game.id, Number(session.seed));
  const actionLog = parseActionLog(session.game_id, rawActions);

  let result: { valid: boolean; score: number; summary: string; metadata: Record<string, unknown> };
  if (session.game_id === "echo-trace") result = validateEchoRun(challenge as EchoChallenge, actionLog.moves as number[]);
  else if (session.game_id === "signal-bloom") result = validateSignalBloomRun(challenge as SignalBloomChallenge, actionLog.hitTimes as number[]);
  else result = validateShadowRun(challenge as ShadowChallenge, actionLog.path as ShadowPoint[]);

  if (!result.valid) return { status: "failed", sessionId: validSessionId, score: result.score, summary: result.summary, metadata: result.metadata };

  const durationMs = Math.max(250, Math.min(20 * 60 * 1000, Date.now() - Date.parse(session.started_at)));
  const signals = session.game_id === "echo-trace"
    ? { play: result.score, knowledge: Math.round(result.score / 2) }
    : session.game_id === "signal-bloom"
      ? { play: result.score, exploration: Math.round(result.score / 3) }
      : { play: result.score, exploration: Math.round(result.score / 2), creation: Math.round(result.score / 4) };

  const { data, error } = await supabase.rpc("record_play_completion", {
    game_id_value: game.id,
    attempt_id_value: validSessionId,
    status_value: "completed",
    score_value: result.score,
    duration_ms_value: durationMs,
    signals_value: signals,
    moment_candidate_value: { kind: "personal_best", title: game.title + " complete", summary: result.summary },
  });
  if (error) throw new Error("Unable to save PLAY result.");

  const { error: closeError } = await supabase.rpc("close_play_session", { session_id_value: validSessionId });
  if (closeError) throw new Error("PLAY result saved, but the session could not be closed.");

  return { status: "recorded", sessionId: validSessionId, score: result.score, summary: result.summary, metadata: result.metadata, persistence: data };
}

export async function abandonPlaySessionAction(sessionId: string) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) redirect("/auth/sign-in");
  const validSessionId = validateAttemptId(sessionId);
  const { data, error } = await supabase.rpc("close_play_session", { session_id_value: validSessionId });
  if (error) throw new Error("Unable to close PLAY session.");
  return data;
}
