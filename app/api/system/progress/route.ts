import { NextResponse } from "next/server";
import { getCurrentPlayer } from "@/lib/player/server";
import { recordSystemProgress } from "@/lib/system/service";
import { validateProgressionPayload } from "@/lib/system/validation";

export async function POST(request: Request) {
  const expectedToken = process.env.MORISE_INTERNAL_API_TOKEN;
  const providedToken = request.headers.get("x-morise-internal-token");

  if (!expectedToken || providedToken !== expectedToken) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

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

  try {
    const payload = validateProgressionPayload(body);
    const result = await recordSystemProgress(player.id, payload);
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to record SYSTEM progression." }, { status: 400 });
  }
}
