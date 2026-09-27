import { NextResponse } from "next/server";
import { getCurrentPlayer } from "@/lib/player/server";
import { getSystemSnapshot, initializeSystemForCurrentPlayer } from "@/lib/system/server";

export async function GET() {
  const player = await getCurrentPlayer();

  if (!player) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await initializeSystemForCurrentPlayer(player.id);
    const system = await getSystemSnapshot(player.id);
    return NextResponse.json(system, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to load the SYSTEM." }, { status: 500 });
  }
}
