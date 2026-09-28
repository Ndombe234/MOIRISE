"use client";

import { useState } from "react";
import type { GameDefinition } from "@/lib/play/types";
import type { ShadowChallenge, ShadowPoint } from "@/lib/play/games/shadow-courier";

export function ShadowCourier({
  definition,
  challenge,
  onComplete,
}: {
  definition: GameDefinition;
  challenge: ShadowChallenge;
  onComplete: (actions: unknown) => void;
}) {
  const [path, setPath] = useState<ShadowPoint[]>([challenge.start]);
  const [current, setCurrent] = useState<ShadowPoint>(challenge.start);

  const blocked = new Set(challenge.blocked);
  const key = (point: ShadowPoint) => point[0] + ":" + point[1];
  const isAdjacent = (a: ShadowPoint, b: ShadowPoint) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1;

  function move(point: ShadowPoint) {
    if (!isAdjacent(current, point)) return;
    if (blocked.has(key(point))) return;
    const destination = challenge.portals[key(point)] ?? point;
    const next = [...path, point];
    setPath(next);
    setCurrent(destination);
    if (destination[0] === challenge.exit[0] && destination[1] === challenge.exit[1]) {
      onComplete({ path: next });
    }
  }

  return (
    <div className="game-board game-shadow" aria-label={definition.title}>
      <div className="game-status">
        <span>Route {Math.max(0, path.length - 1)} moves</span>
        <strong>{current[0] + ":" + current[1]}</strong>
      </div>
      <div className="shadow-grid">
        {Array.from({ length: challenge.size * challenge.size }, (_, index) => {
          const row = Math.floor(index / challenge.size);
          const col = index % challenge.size;
          const point: ShadowPoint = [row, col];
          const cellKey = key(point);
          const isBlocked = blocked.has(cellKey);
          const isStart = row === challenge.start[0] && col === challenge.start[1];
          const isExit = row === challenge.exit[0] && col === challenge.exit[1];
          const isPath = path.some(([r, c]) => r === row && c === col);
          const isPortal = Boolean(challenge.portals[cellKey]);
          return (
            <button
              key={cellKey}
              type="button"
              disabled={isBlocked}
              className={[
                "shadow-cell",
                isBlocked ? "is-blocked" : "",
                isPath ? "is-path" : "",
                isStart ? "is-start" : "",
                isExit ? "is-exit" : "",
                isPortal ? "is-portal" : "",
              ].filter(Boolean).join(" ")}
              onClick={() => move(point)}
              aria-label={isBlocked ? "Blocked" : isExit ? "Exit" : isPortal ? "Portal" : "Route cell"}
            >
              {isStart ? "◆" : isExit ? "◎" : isPortal ? "◇" : ""}
            </button>
          );
        })}
      </div>
      <p className="game-instruction">Les portails déplacent la destination. Construis une route légale, pas une simple ligne droite.</p>
    </div>
  );
}