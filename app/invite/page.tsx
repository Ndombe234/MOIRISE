import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export default async function InvitePage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const params = await searchParams;
  const code = (params.ref ?? "").trim().toLowerCase();
  const cookieStore = await cookies();
  const valid = /^[a-f0-9]{10}$/.test(code);

  if (valid) {
    cookieStore.set("morise_referral", code, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }

  const supabase = await createClient();
  let inviterName = "A MORISE Player";
  if (valid) {
    const { data: referral } = await (supabase as any)
      .from("referral_codes")
      .select("player_id")
      .eq("code", code)
      .maybeSingle();
    if (referral?.player_id) {
      const { data: player } = await (supabase as any)
        .from("players")
        .select("display_name, handle")
        .eq("id", referral.player_id)
        .maybeSingle();
      inviterName = player?.display_name || (player?.handle ? `@${player.handle}` : inviterName);
    }
  }

  return (
    <main className="hero">
      <p className="eyebrow">MORISE / INVITE</p>
      <h1>You have been invited by {inviterName}.</h1>
      <p className="lead">Create your Player and enter the MORISE world.</p>
      <div className="actions">
        <Link className="button" href="/auth/sign-up">Create Player</Link>
        <Link className="button secondary" href="/auth/sign-in">Sign in</Link>
      </div>
    </main>
  );
}
