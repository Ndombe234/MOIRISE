import Link from "next/link";
import { requireCurrentPlayer } from "@/lib/player/server";
import { getSystemViewModel } from "@/lib/system/service";
import { SYSTEM_DIMENSION_LABELS } from "@/lib/system/constants";

export const dynamic = "force-dynamic";

export default async function SystemPage() {
  const player = await requireCurrentPlayer();
  const system = await getSystemViewModel(player);

  return (
    <div className="system-dashboard">
      <header className="system-header">
        <div>
          <p className="eyebrow">PLAYER / SYSTEM</p>
          <h1 id="system-title">{system.player.display_name}</h1>
          <p className="system-subtitle">
            {system.player.handle ? `@${system.player.handle} · ` : ""}
            Ton parcours se construit à partir de tes actions réelles.
          </p>
        </div>
        <div className="system-level" aria-label={`Niveau ${system.level}`}>
          <span className="label">Niveau</span>
          <strong>{system.level}</strong>
        </div>
      </header>

      <section className="system-progress-card" aria-labelledby="progress-title">
        <div className="system-progress-copy">
          <div>
            <span className="label" id="progress-title">Progression</span>
            <strong>{system.totalXp} XP</strong>
          </div>
          <span className="system-progress-meta">
            {system.currentLevelXp} / {system.nextLevelXp} XP
          </span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={system.progressPercent}>
          <span style={{ width: `${system.progressPercent}%` }} />
        </div>
        <div className="system-progress-footer">
          <p className="help">{system.progressPercent}% vers le niveau {system.level + 1}</p>
          <Link href="/system/progression">Voir la progression →</Link>
        </div>
      </section>

      <section className="system-section" aria-labelledby="dimensions-title">
        <div className="section-heading">
          <div>
            <span className="label">DIRECTION</span>
            <h2 id="dimensions-title">Tes dimensions</h2>
          </div>
          <span className="help">Elles restent à 0 tant qu'aucune action réelle ne les alimente.</span>
        </div>
        <div className="dimension-grid">
          {system.dimensions.map((dimension) => (
            <article className="dimension-card" key={dimension.dimension_key}>
              <span className="label">{SYSTEM_DIMENSION_LABELS[dimension.dimension_key as keyof typeof SYSTEM_DIMENSION_LABELS] ?? dimension.dimension_key}</span>
              <strong>{dimension.xp} XP</strong>
            </article>
          ))}
        </div>
      </section>

      <div className="system-columns">
        <section className="system-section" aria-labelledby="memory-title">
          <div className="section-heading">
            <div>
              <span className="label">MÉMOIRE</span>
              <h2 id="memory-title">Moments importants</h2>
            </div>
            <Link href="/system/memories">Tout voir →</Link>
          </div>
          <div className="system-list">
            {system.memories.slice(0, 3).map((memory) => (
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
              <span className="label">ÉVOLUTION</span>
              <h2 id="history-title">Activité réelle</h2>
            </div>
            <Link href="/system/history">Historique →</Link>
          </div>
          <div className="system-list">
            {system.recentEvents.length === 0 ? (
              <p className="help">Aucune progression enregistrée pour le moment.</p>
            ) : (
              system.recentEvents.slice(0, 4).map((event) => (
                <article className="system-list-item" key={event.id}>
                  <strong>{event.event_type}</strong>
                  <p>+{event.xp_delta} XP</p>
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      <section className="system-empty-note" aria-label="SYSTEM status">
        <span className="system-status-dot" aria-hidden="true" />
        <p>
          <strong>Le SYSTEM ne simule rien.</strong> Ta progression apparaîtra quand tes actions auront produit des événements réels.
        </p>
      </section>
    </div>
  );
}
