import { NextResponse } from "next/server";
import { getCurrentPlayer } from "@/lib/player/server";
import { getSystemViewModel } from "@/lib/system/service";

export async function GET() {
  const player = await getCurrentPlayer();

  if (!player) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(await getSystemViewModel(player), { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to load the SYSTEM." }, { status: 500 });
  }
}
