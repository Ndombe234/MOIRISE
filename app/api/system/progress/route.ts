import { NextResponse } from "next/server";
import { getCurrentPlayer } from "@/lib/player/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const player = await getCurrentPlayer();

  if (!player) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid progression payload." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const idempotencyKey = typeof payload.idempotencyKey === "string" ? payload.idempotencyKey.trim() : "";

  if (!idempotencyKey) {
    return NextResponse.json({ error: "Idempotency key is required." }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("record_system_progress_event", {
    target_player_id: player.id,
    event_type_value: "player_identity_completed",
    dimension_key_value: null,
    xp_delta_value: 25,
    idempotency_key_value: idempotencyKey,
    source_type_value: "player",
    source_id_value: player.id,
    metadata_value: { source: "player_identity" },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}
