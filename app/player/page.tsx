import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { PlayerForm } from "@/app/player/player-form";
import { requireCurrentPlayer } from "@/lib/player/server";
import { MoriseNavigation } from "@/components/morise-navigation";
import "./player.css";

export const dynamic = "force-dynamic";

export default async function PlayerPage() {
  const player = await requireCurrentPlayer();

  return (
    <main className="player-main m4-page">
      <div className="m4-container">
        <MoriseNavigation />

        <header className="player-v4-heading">
          <div>
            <p className="m4-eyebrow">PLAYER / IDENTITY</p>
            <h1>{player.display_name}</h1>
            <p>Ton identité reste simple. Le SYSTEM évolue autour de ce que tu fais réellement.</p>
          </div>
          <div className="player-v4-status"><i aria-hidden="true" /> ACTIVE</div>
        </header>

        <section className="player-v4-grid">
          <article className="player-v4-card player-v4-identity">
            <div className="player-v4-avatar" aria-hidden="true">
              {player.avatar_url ? <img src={player.avatar_url} alt="" /> : <span>{player.display_name.slice(0, 1).toUpperCase()}</span>}
            </div>
            <div>
              <span className="m4-eyebrow">YOUR PLAYER</span>
              <h2>{player.display_name}</h2>
              <p>{player.handle ? `@${player.handle}` : "Handle not set"}</p>
            </div>
          </article>

          <aside className="player-v4-card player-v4-system">
            <div className="player-v4-card-head"><span>SYSTEM</span><span>READY</span></div>
            <strong>Le prochain signal viendra de ton activité.</strong>
            <p>Pas besoin de remplir un profil immense. Commence à agir et laisse MORISE découvrir ton parcours à partir de données autorisées.</p>
            <Link href="/play" className="m4-primary-action">Entrer dans une expérience →</Link>
          </aside>
        </section>

        <section className="player-v4-data" aria-label="Player context">
          <article><span>LANGUAGE</span><strong>{player.locale}</strong></article>
          <article><span>TIMEZONE</span><strong>{player.timezone}</strong></article>
          <article><span>HANDLE</span><strong>{player.handle ? `@${player.handle}` : "—"}</strong></article>
          <article><span>STATUS</span><strong>ACTIVE</strong></article>
        </section>

        <section className="player-v4-settings m4-card">
          <div className="player-v4-section-head">
            <div><p className="m4-eyebrow">PLAYER SETTINGS</p><h2>Garde le contrôle</h2></div>
            <span className="m4-dim">Les changements restent liés à ton identité.</span>
          </div>
          <PlayerForm player={player} />
        </section>

        <footer className="player-v4-footer">
          <Link href="/system">← SYSTEM</Link>
          <form action={signOut}><button type="submit">Sign out</button></form>
        </footer>
      </div>
    </main>
  );
}
