"use client";

import { useEffect, useRef, useState } from "react";
import type { GameDefinition, PlayResult, PlayRuntimeProps } from "@/lib/play/types";

type Props = PlayRuntimeProps & {
  children: React.ReactNode;
};

export function GameFrame({ definition, onComplete, onAbandon, children }: Props) {
  const [startedAt] = useState(() => performance.now());
  const attemptId = useRef<string>(crypto.randomUUID());

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // The run remains resumable; we do not silently fail a game on tab switches.
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const complete = (result: Omit<PlayResult, "gameId" | "attemptId">) => {
    onComplete({
      ...result,
      durationMs: Math.max(250, Math.round(performance.now() - startedAt)),
    });
  };

  const abandon = () => {
    onAbandon({
      durationMs: Math.max(250, Math.round(performance.now() - startedAt)),
    });
  };

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
          <button type="button" className="play-quiet-button" onClick={abandon}>Exit</button>
        </div>
      </header>
      <div className="play-canvas">{children}</div>
      <p className="play-hint">Le résultat devient utile au SYSTEM seulement après validation.</p>
    </section>
  );
}

export function useGameAttempt() {
  const attemptId = useRef<string>(crypto.randomUUID());
  return attemptId.current;
}