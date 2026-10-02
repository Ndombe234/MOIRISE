import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    module: "M01",
    state: "in_progress",
  });
}
