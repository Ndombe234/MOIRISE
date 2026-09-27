import { requireCurrentPlayer } from "@/lib/player/server";
import { getSystemViewModel } from "@/lib/system/service";

export const dynamic = "force-dynamic";

export default async function SystemMemoriesPage() {
  const player = await requireCurrentPlayer();
  const system = await getSystemViewModel(player);

  return (
    <div className="system-detail">
      <div className="detail-heading">
        <p className="label">MÉMOIRE</p>
        <h1>Moments importants</h1>
        <p className="system-subtitle">Le SYSTEM garde les moments significatifs qu'il peut relier à des événements réels.</p>
      </div>

      <section className="system-list">
        {system.memories.length === 0 ? (
          <p className="help">Aucune mémoire enregistrée pour le moment.</p>
        ) : (
          system.memories.map((memory) => (
            <article className="system-list-item memory-item" key={memory.id}>
              <div>
                <strong>{memory.title}</strong>
                <p>{memory.description}</p>
              </div>
              <span className="history-meta">Importance {memory.importance}/5</span>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
