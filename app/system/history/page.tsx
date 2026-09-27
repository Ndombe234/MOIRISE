import { requireCurrentPlayer } from "@/lib/player/server";
import { getSystemViewModel } from "@/lib/system/service";

export const dynamic = "force-dynamic";

export default async function SystemHistoryPage() {
  const player = await requireCurrentPlayer();
  const system = await getSystemViewModel(player);
  const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="system-detail">
      <div className="detail-heading">
        <p className="label">HISTORIQUE</p>
        <h1>Activité réelle</h1>
        <p className="system-subtitle">Seulement les événements réellement persistés sont affichés.</p>
      </div>

      <section className="system-list">
        {system.recentEvents.length === 0 ? (
          <p className="help">Aucun événement de progression pour le moment.</p>
        ) : (
          system.recentEvents.map((event) => (
            <article className="system-list-item" key={event.id}>
              <div>
                <strong>{event.event_type}</strong>
                <span className="history-meta">{dateFormatter.format(new Date(event.created_at))}</span>
              </div>
              <span className="history-xp">+{event.xp_delta} XP</span>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
