import { NextResponse } from "next/server";
import { resolveSessionContext } from "@/lib/m01/session";

export async function GET() {
  const session = await resolveSessionContext();
  return NextResponse.json(session, {
    headers: { "Cache-Control": "no-store" },
  });
}
