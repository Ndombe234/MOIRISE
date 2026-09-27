import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { PlayerForm } from "@/app/player/player-form";
import { requireCurrentPlayer } from "@/lib/player/server";

export const dynamic = "force-dynamic";

export default async function PlayerPage() {
  const player = await requireCurrentPlayer();

  return (
    <main>
      <section className="hero" aria-labelledby="title">
        <p className="eyebrow">PLAYER</p>
        <h1 id="title">{player.display_name}</h1>
        <p className="lead">This is your editable Player identity layer. The deeper SYSTEM engine comes later.</p>
        <div className="profile-grid">
          <div>
            <span className="label">Player ID</span>
            <code className="mono">{player.id}</code>
          </div>
          <div>
            <span className="label">Handle</span>
            <strong>{player.handle ? "@" + player.handle : "Not set"}</strong>
          </div>
        </div>
        <PlayerForm player={player} />
        <div className="actions">
          <Link className="button secondary" href="/system">Open SYSTEM</Link>
          <form action={signOut}>
            <button className="button secondary" type="submit">Sign out</button>
          </form>
        </div>
      </section>
    </main>
  );
}
