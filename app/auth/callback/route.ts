import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ensurePlayerForUser } from "@/lib/player/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/auth/sign-in?error=missing_code", requestUrl.origin));
  }

  const supabase = await createClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(new URL("/auth/sign-in?error=auth_callback", requestUrl.origin));
  }

  const { data, error: userError } = await supabase.auth.getUser();

  if (userError || !data.user) {
    return NextResponse.redirect(new URL("/auth/sign-in?error=auth_callback", requestUrl.origin));
  }

  try {
    await ensurePlayerForUser(supabase, data.user);
  } catch {
    return NextResponse.redirect(new URL("/auth/sign-in?error=player_init", requestUrl.origin));
  }

  return NextResponse.redirect(new URL("/system", requestUrl.origin));
}
