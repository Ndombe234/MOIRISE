import "server-only";

import { createGameRunKey } from "./seed";
import { getGameDefinition } from "./catalog";
import { PLAY_MAX_DURATION_MS, PLAY_MAX_RESULT_SCORE, PLAY_XP_REWARDS } from "./constants";
import { recordSystemProgress } from "@/lib/system/service";
import type { Tables } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";

type PlayRunRow = Tables<"play_game_runs">;

export type PlayResultInput = {
  gameId: string;
  gameVersion: number;
  clientRunId: string;
  seed: string;
  status: "completed" | "abandoned";
  score: number;
  durationMs: number;
  metadata: Record<string, string | number | boolean | null>;
};

export function validatePlayResult(input: PlayResultInput) {
  const game = getGameDefinition(input.gameId);
  if (!game) throw new Error("Unknown game.");
  if (input.gameVersion !== game.version) throw new Error("Game version is no longer supported.");
  if (!input.clientRunId.trim() || input.clientRunId.length > 120) throw new Error("Invalid game run.");
  if (!input.seed.trim() || input.seed.length > 64) throw new Error("Invalid seed.");
  if (!Number.isInteger(input.score) || input.score < 0 || input.score > PLAY_MAX_RESULT_SCORE) {
    throw new Error("Invalid score.");
  }
  if (!Number.isInteger(input.durationMs) || input.durationMs < 0 || input.durationMs > PLAY_MAX_DURATION_MS) {
    throw new Error("Invalid duration.");
  }
  if (!input.metadata || typeof input.metadata !== "object" || Array.isArray(input.metadata)) {
    throw new Error("Invalid result metadata.");
  }

  return game;
}

async function requirePlayUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error("Authentication required.");
  return { supabase, user };
}

function buildMoment(gameId: string, result: PlayResultInput, origin: string) {
  const game = getGameDefinition(gameId);
  if (!game) throw new Error("Unknown game.");
  const moment = game.createMoment({
    status: result.status,
    score: result.score,
    durationMs: result.durationMs,
    seed: result.seed,
    metadata: result.metadata,
  });
  const challenge = encodeURIComponent(JSON.stringify({
    gameId,
    gameVersion: game.version,
    seed: result.seed,
  }));
  return {
    ...moment,
    deepLink: `${origin}/play?game=${encodeURIComponent(gameId)}&seed=${encodeURIComponent(result.seed)}&challenge=${challenge}`,
  };
}

export async function startPlayRun(gameId: string, clientRunId: string) {
  const { supabase, user } = await requirePlayUser();
  const game = getGameDefinition(gameId);
  if (!game) throw new Error("Unknown game.");
  if (!clientRunId.trim() || clientRunId.length > 120) throw new Error("Invalid game run.");

  const seed = cryptoRandomSeed(user.id, gameId, clientRunId);
  const idempotencyKey = createGameRunKey(user.id, gameId, clientRunId);

  const { data: existing, error: existingError } = await supabase
    .from("play_game_runs")
    .select("*")
    .eq("player_id", user.id)
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle();
  if (existingError) throw existingError;
  if (existing) return existing;

  const { data, error } = await supabase
    .from("play_game_runs")
    .insert({
      player_id: user.id,
      game_id: gameId,
      game_version: game.version,
      seed,
      client_run_id: clientRunId,
      status: "active",
      score: null,
      duration_ms: null,
      metadata: {},
      idempotency_key: idempotencyKey,
    })
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      const { data: retried, error: retryError } = await supabase
        .from("play_game_runs")
        .select("*")
        .eq("player_id", user.id)
        .eq("idempotency_key", idempotencyKey)
        .single();
      if (retryError) throw retryError;
      return retried;
    }
    throw error;
  }

  return data;
}

export async function persistPlayResult(input: PlayResultInput, origin: string) {
  const { supabase, user } = await requirePlayUser();
  const game = validatePlayResult(input);
  const idempotencyKey = createGameRunKey(user.id, input.gameId, input.clientRunId);

  let existing: PlayRunRow | null = null;
  const { data: activeRun, error: activeError } = await supabase
    .from("play_game_runs")
    .select("*")
    .eq("player_id", user.id)
    .eq("idempotency_key", idempotencyKey)
    .maybeSingle();
  if (activeError) throw activeError;

  if (activeRun && activeRun.status === "active") {
    existing = activeRun;
    const { data: updated, error: updateError } = await supabase
      .from("play_game_runs")
      .update({
        status: input.status,
        score: input.score,
        duration_ms: input.durationMs,
        metadata: input.metadata,
        completed_at: new Date().toISOString(),
      })
      .eq("id", activeRun.id)
      .eq("status", "active")
      .select("*")
      .maybeSingle();

    if (updateError) throw updateError;
    if (updated) existing = updated;
  } else if (activeRun) {
    existing = activeRun;
  } else {
    const { data: inserted, error: insertError } = await supabase
      .from("play_game_runs")
      .insert({
        player_id: user.id,
        game_id: input.gameId,
        game_version: game.version,
        seed: input.seed,
        client_run_id: input.clientRunId,
        status: input.status,
        score: input.score,
        duration_ms: input.durationMs,
        metadata: input.metadata,
        idempotency_key: idempotencyKey,
        completed_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (insertError) {
      if (insertError.code !== "23505") throw insertError;
      const { data: retried, error: retryError } = await supabase
        .from("play_game_runs")
        .select("*")
        .eq("player_id", user.id)
        .eq("idempotency_key", idempotencyKey)
        .single();
      if (retryError) throw retryError;
      existing = retried;
    } else {
      existing = inserted;
    }
  }

  if (!existing) throw new Error("Unable to persist game result.");

  const progression = existing.status === "completed"
    ? await recordSystemProgress(user.id, {
        eventType: "game_completed",
        dimensionKey: "play",
        xpDelta: input.score >= 80 ? PLAY_XP_REWARDS.completedWithHighScore : PLAY_XP_REWARDS.completed,
        idempotencyKey: `play-run:${existing.id}`,
        sourceType: "game",
        sourceId: input.gameId,
        metadata: {
          game_version: game.version,
          score: input.score,
          duration_ms: input.durationMs,
        },
      })
    : null;

  const result: PlayResultInput = {
    ...input,
    status: existing.status === "abandoned" ? "abandoned" : "completed",
    score: existing.score ?? input.score,
    durationMs: existing.duration_ms ?? input.durationMs,
    seed: existing.seed,
  };

  return {
    run: existing,
    progression,
    moment: buildMoment(input.gameId, result, origin),
  };
}

function cryptoRandomSeed(playerId: string, gameId: string, clientRunId: string) {
  return createGameRunKey(playerId, gameId, clientRunId);
}