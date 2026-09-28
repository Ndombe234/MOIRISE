"use client";

import { useState } from "react";
import type { GameDefinition } from "@/lib/play/types";

export function GameFrame({
  definition,
  onComplete,
  onAbandon,
  children,
}: {
  definition: GameDefinition;
  onComplete: (actions: unknown) => void;
  onAbandon: () => void;
  children: React.ReactNode;
}) {
  const [startedAt] = useState(() => performance.now());
  void startedAt;
  return (
    <section className="play-frame" aria-labelledby="play-frame-title">
      <header className="play-frame-header">
        <div>
          <p className="play-eyebrow">{definition.family.toUpperCase()} / PLAY</p>
          <h1 id="play-frame-title">{definition.title}</h1>
          <p>{definition.description}</p>
        </div>
        <div className="play-frame-meta">
          <span>~{definition.estimatedSeconds}s</span>
          <button type="button" className="play-quiet-button" onClick={onAbandon}>Exit</button>
        </div>
      </header>
      <div className="play-canvas">{children}</div>
      <p className="play-hint">Le résultat devient utile au SYSTEM seulement après validation.</p>
    </section>
  );
}

export function useGameAttempt() {
  return undefined;
}