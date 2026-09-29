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
        <p className="eyebrow">PLAYER / IDENTITY</p>
        <h1 id="title">{player.display_name}</h1>
        <p className="lead">Your Player is the person inside MORISE. Keep the identity simple; the SYSTEM grows from what you actually do.</p>
        <div className="profile-grid">
          <div><span className="label">Handle</span><strong>{player.handle ? "@" + player.handle : "Not set"}</strong></div>
          <div><span className="label">Status</span><strong>Active</strong></div>
          <div><span className="label">Language</span><strong>{player.locale}</strong></div>
          <div><span className="label">Timezone</span><strong>{player.timezone}</strong></div>
        </div>
        <PlayerForm player={player} />
        <div className="actions">
          <Link className="button secondary" href="/system">Return to SYSTEM</Link>
          <form action={signOut}><button className="button secondary" type="submit">Sign out</button></form>
        </div>
      </section>
    </main>
  );
}
