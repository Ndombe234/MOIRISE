import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGameDefinition } from "@/lib/play/definitions";

type Params = Promise<{ shareToken: string }>;

export default async function PublicPlayMomentPage({ params }: { params: Params }) {
  const { shareToken } = await params;
  if (!/^[a-f0-9]{36}$/i.test(shareToken)) notFound();

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_public_play_moment", {
    share_token_value: shareToken,
  });

  if (error || !data) notFound();

  const moment = data as {
    game_id: string;
    status: string;
    score: number;
    duration_ms: number;
    moment_candidate: { title?: string; summary?: string };
  };
  const game = getGameDefinition(moment.game_id);
  const gameTitle = game?.title ?? "PLAY";
  const launchPath = game?.launchPath ?? "/play";

  return (
    <main className="play-main">
      <section className="play-shell">
        <header className="play-topbar">
          <Link href="/play" className="play-brand">MORISE PLAY</Link>
          <nav aria-label="Moment navigation">
            <Link href="/discover">DISCOVER</Link>
            <Link href="/home">WORLD</Link>
          </nav>
        </header>

        <section className="play-public-moment">
          <p className="play-eyebrow">MOMENT / SHARED</p>
          <h1>{gameTitle}</h1>
          <article className="play-moment play-moment-public">
            <span className="play-public-score">{moment.score}</span>
            <div>
              <p className="play-eyebrow">{moment.moment_candidate?.title ?? "A MORISE moment"}</p>
              <p>{moment.moment_candidate?.summary ?? "Un moment de jeu à découvrir."}</p>
              <small>{Math.round(moment.duration_ms / 1000)}s · {moment.status}</small>
            </div>
          </article>

          <div className="play-result-actions">
            <Link className="play-primary-button" href={launchPath}>Essayer à ton tour →</Link>
            <Link className="play-result-secondary" href="/play">Voir PLAY</Link>
          </div>

          <p className="play-hint">
            Aucun profil, historique ou donnée privée du joueur n’est exposé sur ce lien.
          </p>
        </section>
      </section>
    </main>
  );
}