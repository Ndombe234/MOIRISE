import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { startConversationAction } from "./actions";
import { MoriseNavigation, SocialQuickNav } from "@/components/morise-navigation";
import "./link.css";

export default async function LinkPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const { data: memberships } = await supabase
    .from("social_conversation_members")
    .select("conversation_id, last_read_at, social_conversations!inner(id, updated_at, created_by)")
    .eq("player_id", user.id)
    .order("joined_at", { ascending: false });

  const conversations = [];
  for (const membership of memberships ?? []) {
    const conversationId = membership.conversation_id as string;
    const { data: members } = await supabase
      .from("social_conversation_members")
      .select("player_id, players!inner(display_name, handle, avatar_url)")
      .eq("conversation_id", conversationId)
      .neq("player_id", user.id);
    const other = members?.[0];
    const { data: latest } = await supabase
      .from("social_messages")
      .select("body, created_at, sender_id")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    conversations.push({ id: conversationId, other: other?.players, latest, lastReadAt: membership.last_read_at });
  }

  return (
    <main className="link-main">
      <section className="link-shell">
        <MoriseNavigation />
        <SocialQuickNav mode="world" />
        <header className="link-header">
          <div><p className="link-kicker">SOCIAL / PRIVATE</p><h1>LINK</h1><p>Private conversations, kept simple and personal.</p></div>
          <Link href="/social" className="link-back">← SOCIAL</Link>
        </header>

        <section className="link-start">
          <div><span className="link-index">01 / NEW LINK</span><h2>Start a private conversation</h2><p>Use a player's handle. The conversation is created once and shared only with its members.</p></div>
          <form action={startConversationAction} className="link-form"><label htmlFor="handle">Player handle</label><div className="link-form-row"><input id="handle" name="handle" placeholder="@player" autoComplete="off" required /><button type="submit">Open LINK</button></div></form>
        </section>

        <section className="link-list" aria-labelledby="link-list-title">
          <div className="link-section-heading"><div><span className="link-index">02 / YOUR LINKS</span><h2 id="link-list-title">Conversations</h2></div><span>{conversations.length} active</span></div>
          {conversations.length === 0 ? <div className="link-empty"><strong>Your LINK space is quiet.</strong><p>Start with a player handle above.</p></div> : <div className="link-conversations">{conversations.map((conversation) => <Link href={`/link/${conversation.id}`} className="link-conversation" key={conversation.id}>
            <div className="link-avatar">{conversation.other?.avatar_url ? <img src={conversation.other.avatar_url} alt="" /> : <span>{conversation.other?.display_name?.slice(0, 1).toUpperCase() ?? "?"}</span>}</div>
            <div className="link-conversation-copy"><strong>{conversation.other?.display_name ?? "Player"}</strong><span>{conversation.other?.handle ? `@${conversation.other.handle}` : "Player"}</span><p>{conversation.latest?.body ?? "No messages yet."}</p></div>
            <span className="link-arrow">→</span>
          </Link>)}</div>}
        </section>
      </section>
    </main>
  );
}
