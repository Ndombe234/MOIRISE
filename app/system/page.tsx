import Link from "next/link";
import { requireCurrentPlayer } from "@/lib/player/server";
import { getSystemViewModel } from "@/lib/system/service";
import { SYSTEM_DIMENSION_LABELS } from "@/lib/system/constants";

export const dynamic = "force-dynamic";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "P";
}

export default async function SystemPage() {
  const player = await requireCurrentPlayer();
  const system = await getSystemViewModel(player);
  const progress = Math.max(0, Math.min(100, system.progressPercent));
  const avatarLabel = initials(system.player.display_name);

  return (
    <div className="system-dashboard">
      <div className="system-topline">
        <div>
          <span className="system-kicker">PERSONAL SYSTEM // 01</span>
          <h1 id="system-title">PLAYER CONTROL</h1>
          <p>Un monde profond. Une évolution construite par tes actions.</p>
        </div>
        <div className="system-live-status">
          <span className="system-live-dot" aria-hidden="true" />
          <span>ONLINE</span>
          <small>REAL DATA</small>
        </div>
      </div>

      <section className="system-hud-grid" aria-labelledby="system-title">
        <article className="hud-panel player-panel">
          <div className="hud-panel-corner hud-panel-corner-tl" aria-hidden="true" />
          <div className="hud-panel-corner hud-panel-corner-br" aria-hidden="true" />
          <div className="hud-panel-header">
            <span>PLAYER PROFILE</span>
            <span className="hud-panel-code">ID // ACTIVE</span>
          </div>

          <div className="player-identity">
            <div className="player-avatar" aria-label={`Avatar de ${system.player.display_name}`}>
              {system.player.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={system.player.avatar_url} alt="" />
              ) : (
                <span>{avatarLabel}</span>
              )}
              <span className="avatar-scan" aria-hidden="true" />
            </div>
            <div className="player-name-block">
              <span className="hud-label">PLAYER</span>
              <strong>{system.player.display_name}</strong>
              <span>{system.player.handle ? `@${system.player.handle}` : "PLAYER IDENTITY"}</span>
            </div>
          </div>

          <div className="player-stats-row">
            <div>
              <span className="hud-label">LEVEL</span>
              <strong>{String(system.level).padStart(2, "0")}</strong>
            </div>
            <div>
              <span className="hud-label">XP</span>
              <strong>{system.totalXp.toLocaleString()}</strong>
            </div>
            <div>
              <span className="hud-label">STATUS</span>
              <strong className="status-value">ACTIVE</strong>
            </div>
          </div>

          <div className="player-xp-bar" aria-label={`${progress}% de progression vers le niveau suivant`}>
            <div className="hud-bar-track"><span style={{ width: `${progress}%` }} /></div>
            <div className="hud-bar-meta">
              <span>LEVEL {system.level}</span>
              <span>{system.currentLevelXp} / {system.nextLevelXp} XP</span>
            </div>
          </div>
        </article>

        <article className="hud-panel system-core-panel">
          <div className="hud-panel-corner hud-panel-corner-tl" aria-hidden="true" />
          <div className="hud-panel-corner hud-panel-corner-br" aria-hidden="true" />
          <div className="hud-panel-header">
            <span>SYSTEM CORE</span>
            <span className="hud-panel-code">SYNC // 100%</span>
          </div>

          <div className="system-core-orbit" aria-hidden="true">
            <div className="system-core-ring ring-one" />
            <div className="system-core-ring ring-two" />
            <div className="system-core-ring ring-three" />
            <div className="system-core-energy" />
            <div className="system-core-center">
              <span>LV</span>
              <strong>{system.level}</strong>
            </div>
          </div>

          <div className="core-progress-copy">
            <span>EVOLUTION PROGRESS</span>
            <strong>{progress}%</strong>
          </div>
          <div className="core-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className="core-caption">{system.nextLevelXp - system.currentLevelXp} XP remain before the next level.</p>
          <Link className="hud-action" href="/system/progression">OPEN PROGRESSION <span>↗</span></Link>
        </article>

        <article className="hud-panel status-panel">
          <div className="hud-panel-corner hud-panel-corner-tl" aria-hidden="true" />
          <div className="hud-panel-corner hud-panel-corner-br" aria-hidden="true" />
          <div className="hud-panel-header">
            <span>SYSTEM STATUS</span>
            <span className="hud-panel-code">LIVE</span>
          </div>
          <div className="status-lines">
            <div><span>IDENTITY</span><strong>SYNCED</strong></div>
            <div><span>PROGRESSION</span><strong>TRACKED</strong></div>
            <div><span>MEMORY</span><strong>{system.memories.length} STORED</strong></div>
            <div><span>EVENTS</span><strong>{system.recentEvents.length} RECENT</strong></div>
          </div>
          <div className="status-wave" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          <p className="status-note">Nothing is simulated. Your SYSTEM changes when your actions create real events.</p>
        </article>
      </section>

      <section className="hud-panel attributes-panel" aria-labelledby="dimensions-title">
        <div className="hud-panel-header attributes-header">
          <div>
            <span className="system-kicker">PLAYER ATTRIBUTES // 07</span>
            <h2 id="dimensions-title">DIMENSIONS</h2>
          </div>
          <span className="attributes-note">Your path stays open. No fixed class.</span>
        </div>
        <div className="attribute-grid">
          {system.dimensions.map((dimension, index) => (
            <article className="attribute-node" key={dimension.dimension_key}>
              <div className="attribute-node-top">
                <span className="attribute-index">0{index + 1}</span>
                <span className="attribute-pulse" aria-hidden="true" />
              </div>
              <span className="attribute-name">{SYSTEM_DIMENSION_LABELS[dimension.dimension_key as keyof typeof SYSTEM_DIMENSION_LABELS] ?? dimension.dimension_key}</span>
              <strong>{dimension.xp.toLocaleString()} <small>XP</small></strong>
              <div className="attribute-track"><span style={{ width: `${Math.min(100, dimension.xp)}%` }} /></div>
            </article>
          ))}
        </div>
      </section>

      <div className="system-secondary-grid">
        <section className="hud-panel memory-panel" aria-labelledby="memory-title">
          <div className="hud-panel-header">
            <div><span className="system-kicker">MEMORY CORE</span><h2 id="memory-title">IMPORTANT MOMENTS</h2></div>
            <Link href="/system/memories">VIEW ALL →</Link>
          </div>
          <div className="memory-list">
            {system.memories.slice(0, 3).map((memory) => (
              <article className="memory-entry" key={memory.id}>
                <span className="memory-marker" aria-hidden="true" />
                <div><strong>{memory.title}</strong><p>{memory.description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="hud-panel history-panel" aria-labelledby="history-title">
          <div className="hud-panel-header">
            <div><span className="system-kicker">EVOLUTION LOG</span><h2 id="history-title">RECENT EVENTS</h2></div>
            <Link href="/system/history">HISTORY →</Link>
          </div>
          <div className="event-list">
            {system.recentEvents.length === 0 ? (
              <div className="event-empty"><span>◈</span><p>No progression recorded yet. Your next meaningful action will appear here.</p></div>
            ) : (
              system.recentEvents.slice(0, 4).map((event) => (
                <article className="event-entry" key={event.id}>
                  <span>{event.event_type}</span><strong>+{event.xp_delta} XP</strong>
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      <div className="system-command-bar">
        <span><i aria-hidden="true" /> SYSTEM CORE STABLE</span>
        <span>REAL PLAYER DATA</span>
        <span>NO SYNTHETIC PROGRESSION</span>
      </div>
    </div>
  );
}
