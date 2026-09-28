import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ReferralShare } from "./referral-share";

export default async function MyInvitePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const { data: referral } = await (supabase as any)
    .from("referral_codes")
    .select("code")
    .eq("player_id", user.id)
    .maybeSingle();

  if (!referral?.code) {
    return <main className="hero"><p className="eyebrow">MORISE / INVITE</p><h1>Your invite link is being prepared.</h1></main>;
  }

  const { count } = await (supabase as any)
    .from("referrals")
    .select("id", { count: "exact", head: true })
    .eq("referrer_id", user.id);

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const link = `${origin}/invite?ref=${referral.code}`;

  return (
    <main className="hero">
      <p className="eyebrow">MORISE / INVITE</p>
      <h1>Bring your allies to MORISE.</h1>
      <p className="lead">Share your personal invite link. MORISE records successful referrals without requiring payments.</p>
      <ReferralShare link={link} />
      <p className="notice success">Players invited: {count ?? 0}</p>
    </main>
  );
}
