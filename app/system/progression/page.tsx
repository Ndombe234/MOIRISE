import { requireCurrentPlayer } from "@/lib/player/server";
import { getSystemViewModel } from "@/lib/system/service";
import { getLevelThreshold } from "@/lib/system/progression";

export const dynamic = "force-dynamic";

export default async function SystemProgressionPage() {
  const player = await requireCurrentPlayer();
  const system = await getSystemViewModel(player);
  const nextThreshold = getLevelThreshold(system.level + 1);

  return (
    <div className="system-detail">
      <div className="detail-heading">
        <p className="label">PROGRESSION</p>
        <h1>Niveau {system.level}</h1>
        <p className="system-subtitle">Ton niveau avance selon l'XP réellement enregistrée dans le SYSTEM.</p>
      </div>

      <section className="system-progress-card">
        <div className="system-progress-copy">
          <div>
            <span className="label">XP totale</span>
            <strong>{system.totalXp} XP</strong>
          </div>
          <span className="system-progress-meta">{system.currentLevelXp} / {system.nextLevelXp} XP</span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={system.progressPercent}>
          <span style={{ width: `${system.progressPercent}%` }} />
        </div>
        <p className="help">{system.progressPercent}% vers le niveau {system.level + 1} · seuil {nextThreshold} XP</p>
      </section>

      <section className="detail-grid">
        <article className="detail-card">
          <span className="label">Niveau actuel</span>
          <strong>{system.level}</strong>
        </article>
        <article className="detail-card">
          <span className="label">XP enregistrée</span>
          <strong>{system.totalXp}</strong>
        </article>
        <article className="detail-card">
          <span className="label">XP restante</span>
          <strong>{Math.max(0, system.nextLevelXp - system.currentLevelXp)}</strong>
        </article>
      </section>
    </div>
  );
}
