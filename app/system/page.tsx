import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { requireCurrentPlayer } from "@/lib/player/server";

export const dynamic = "force-dynamic";

export default async function SystemPage() {
  const player = await requireCurrentPlayer();

  return (
    <main>
      <section className="hero" aria-labelledby="title">
        <p className="eyebrow">SYSTEM / PLAYER</p>
        <h1 id="title">{player.display_name}</h1>
        <p className="lead">Your Player is now persistent. The deeper SYSTEM engine will build on this identity in Module 2.</p>
        <div className="profile-grid">
          <div>
            <span className="label">Status</span>
            <strong>Player initialized</strong>
          </div>
          <div>
            <span className="label">Handle</span>
            <strong>{player.handle ? "@" + player.handle : "Not set"}</strong>
          </div>
        </div>
        <div className="actions">
          <Link className="button" href="/player">Edit Player</Link>
          <Link className="button secondary" href="/discover">Discover</Link>
          <form action={signOut}>
            <button className="button secondary" type="submit">Sign out</button>
          </form>
        </div>
      </section>
    </main>
  );
}
