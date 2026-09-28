import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { markConversationReadAction, sendMessageAction } from "../actions";
import { MoriseNavigation, SocialQuickNav } from "@/components/morise-navigation";
import "../link.css";

export default async function LinkConversationPage({ params }: { params: Promise<{ conversationId: string }> }) {
  const { conversationId } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(conversationId)) notFound();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");
  const { data: membership } = await supabase.from("social_conversation_members").select("conversation_id").eq("conversation_id", conversationId).eq("player_id", user.id).maybeSingle();
  if (!membership) notFound();
  const { data: members } = await supabase.from("social_conversation_members").select("player_id, players!inner(display_name, handle, avatar_url)").eq("conversation_id", conversationId).neq("player_id", user.id);
  const other = members?.[0]?.players as { display_name?: string; handle?: string; avatar_url?: string } | undefined;
  const { data: messages } = await supabase.from("social_messages").select("id, body, sender_id, created_at").eq("conversation_id", conversationId).order("created_at", { ascending: true }).limit(200);
  return <main className="link-main"><section className="link-shell link-conversation-shell"><MoriseNavigation /><SocialQuickNav mode="link" /><header className="link-chat-header"><Link href="/link" className="link-back">← LINKS</Link><div className="link-chat-person"><div className="link-avatar small">{other?.avatar_url ? <img src={other.avatar_url} alt="" /> : <span>{other?.display_name?.slice(0, 1).toUpperCase() ?? "?"}</span>}</div><div><strong>{other?.display_name ?? "Player"}</strong><span>{other?.handle ? `@${other.handle}` : "Private LINK"}</span></div></div><form action={markConversationReadAction}><input type="hidden" name="conversation_id" value={conversationId} /><button className="link-read-button" type="submit">Mark read</button></form></header><section className="link-messages" aria-live="polite">{(messages ?? []).length === 0 ? <div className="link-empty"><strong>Start the LINK.</strong><p>Your first message begins this private conversation.</p></div> : (messages ?? []).map((message) => <article className={`link-message ${message.sender_id === user.id ? "is-me" : ""}`} key={message.id}><p>{message.body}</p><time dateTime={message.created_at}>{new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(new Date(message.created_at))}</time></article>)}</section><form className="link-message-form" action={sendMessageAction}><input type="hidden" name="conversation_id" value={conversationId} /><textarea name="body" required maxLength={4000} placeholder="Write a private message…" aria-label="Private message" /><button type="submit">Transmit</button></form></section></main>;
}
