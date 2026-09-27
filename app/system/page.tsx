import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { requireCurrentPlayer } from "@/lib/player/server";
import { getSystemSnapshot, initializeSystemForCurrentPlayer } from "@/lib/system/server";

export const dynamic = "force-dynamic";

const dimensionLabels: Record<string, string> = {
  exploration: "Exploration",
  creation: "Création",
  knowledge: "Connaissance",
  social: "Social",
  community: "Communauté",
  play: "Jeu",
  contribution: "Contribution",
};

export default async function SystemPage() {
  const player = await requireCurrentPlayer();
  await initializeSystemForCurrentPlayer(player.id);
  const system = await getSystemSnapshot(player.id);

  return (
    <main className="system-main">
      <section className="system-shell" aria-labelledby="system-title">
        <header className="system-header">
          <div>
            <p className="eyebrow">MORISE / SYSTEM</p>
            <h1 id="system-title">{player.display_name}</h1>
            <p className="system-subtitle">Ton parcours se construit à partir de tes actions réelles.</p>
          </div>
          <div className="system-level" aria-label={`Niveau ${system.profile.level}`}>
            <span className="label">Niveau</span>
            <strong>{system.profile.level}</strong>
          </div>
        </header>

        <section className="system-progress-card" aria-labelledby="progress-title">
          <div className="system-progress-copy">
            <div>
              <span className="label" id="progress-title">Progression</span>
              <strong>{system.profile.total_xp} XP</strong>
            </div>
            <span className="system-progress-meta">
              {system.progress.currentXp} / {system.progress.nextLevelXp} XP
            </span>
          </div>
          <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={system.progress.percent}>
            <span style={{ width: `${system.progress.percent}%` }} />
          </div>
          <p className="help">{system.progress.percent}% vers le niveau {system.profile.level + 1}</p>
        </section>

        <section className="system-section" aria-labelledby="dimensions-title">
          <div className="section-heading">
            <div>
              <span className="label">Direction</span>
              <h2 id="dimensions-title">Tes dimensions</h2>
            </div>
            <span className="help">Elles évolueront avec tes actions.</span>
          </div>
          <div className="dimension-grid">
            {system.dimensions.map((dimension) => (
              <article className="dimension-card" key={dimension.dimension_key}>
                <span className="label">{dimensionLabels[dimension.dimension_key] ?? dimension.dimension_key}</span>
                <strong>{dimension.xp} XP</strong>
              </article>
            ))}
          </div>
        </section>

        <div className="system-columns">
          <section className="system-section" aria-labelledby="memory-title">
            <div className="section-heading">
              <div>
                <span className="label">Memory</span>
                <h2 id="memory-title">Moments importants</h2>
              </div>
            </div>
            <div className="system-list">
              {system.memories.map((memory) => (
                <article className="system-list-item" key={memory.id}>
                  <strong>{memory.title}</strong>
                  <p>{memory.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="system-section" aria-labelledby="history-title">
            <div className="section-heading">
              <div>
                <span className="label">Evolution</span>
                <h2 id="history-title">Activité réelle</h2>
              </div>
            </div>
            <div className="system-list">
              {system.recentEvents.length === 0 ? (
                <p className="help">Aucune progression enregistrée pour le moment.</p>
              ) : (
                system.recentEvents.map((event) => (
                  <article className="system-list-item" key={event.id}>
                    <strong>{event.event_type}</strong>
                    <p>+{event.xp_delta} XP · {new Date(event.created_at).toLocaleDateString()}</p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>

        <nav className="actions" aria-label="SYSTEM navigation">
          <Link className="button" href="/player">Player</Link>
          <Link className="button secondary" href="/discover">Découvrir</Link>
          <form action={signOut}>
            <button className="button secondary" type="submit">Déconnexion</button>
          </form>
        </nav>
      </section>
    </main>
  );
}
