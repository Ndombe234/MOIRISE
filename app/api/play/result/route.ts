import { NextResponse } from "next/server";
import { persistPlayResult } from "@/lib/play/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await persistPlayResult(body, new URL(request.url).origin);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to record game result.";
    const status = message === "Authentication required." ? 401 : 400;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}