import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGameDefinition } from "@/lib/play/definitions";
import { PlayGameHost } from "@/components/play/play-game-host";
import "./play.css";

type Params = Promise<{ gameId: string }>;

export default async function PlayGamePage({ params }: { params: Params }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/sign-in");

  const { gameId } = await params;
  const definition = getGameDefinition(gameId);
  if (!definition) notFound();

  return (
    <main className="play-main">
      <section className="play-shell">
        <header className="play-topbar">
          <Link href="/play" className="play-brand">MORISE PLAY</Link>
          <nav aria-label="Play game navigation">
            <Link href="/system">SYSTEM</Link>
            <Link href="/social">SOCIAL</Link>
          </nav>
        </header>

        <PlayGameHost definition={definition} />
      </section>
    </main>
  );
}
