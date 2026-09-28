import { NextResponse } from "next/server";
import { startPlayRun } from "@/lib/play/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const run = await startPlayRun(String(body?.gameId ?? ""), String(body?.clientRunId ?? ""));
    return NextResponse.json({ ok: true, run });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start game.";
    const status = message === "Authentication required." ? 401 : 400;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}