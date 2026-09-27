import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCurrentPlayer } from "@/lib/player/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/auth/sign-in?error=missing_code", requestUrl.origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/auth/sign-in?error=auth_callback", requestUrl.origin));
  }

  try {
    await getCurrentPlayer();
  } catch {
    return NextResponse.redirect(new URL("/auth/sign-in?error=player_init", requestUrl.origin));
  }

  return NextResponse.redirect(new URL("/system", requestUrl.origin));
}
