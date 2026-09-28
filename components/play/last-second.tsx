"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GameDefinition } from "@/lib/play/types";

const ARENA = 100;
const DURATION = 12;

export function clampDodge(value: number, max = ARENA) {
  return Math.max(0, Math.min(max, value));
}

export function scoreSurvival(seconds: number, cleanDodges: number) {
  if (seconds <= 0) return 0;
  return Math.min(1000, Math.round(seconds * 60 + cleanDodges * 4));
}

export function LastSecond({ definition, onComplete }: { definition: GameDefinition; onComplete: (result: { status: "completed" | "failed"; score: number; durationMs: number; signals: Record<string, number>; momentCandidate: { kind: "precision"; title: string; summary: string } | null }) => void }) {
  const [x, setX] = useState(50);
  const [hazard, setHazard] = useState({ x: 20, y: 0 });
  const [seconds, setSeconds] = useState(0);
  const [dodges, setDodges] = useState(0);
  const [ended, setEnded] = useState(false);
  const started = useRef(performance.now());
  const raf = useRef<number | null>(null);

  const finish = useCallback((status: "completed" | "failed") => {
    if (ended) return;
    setEnded(true);
    if (raf.current) cancelAnimationFrame(raf.current);
    const survived = Math.min(DURATION, (performance.now() - started.current) / 1000);
    const score = scoreSurvival(survived, dodges);
    onComplete({
      status,
      score,
      durationMs: Math.max(250, Math.round(performance.now() - started.current)),
      signals: { reaction: Math.min(100, Math.round(survived / DURATION * 100)), precision: Math.min(100, dodges * 12) },
      momentCandidate: status === "completed" ? { kind: "precision", title: "Dernière seconde", summary: "Tu as tenu jusqu'à l'extinction du compte à rebours." } : null,
    });
  }, [dodges, ended, onComplete]);

  useEffect(() => {
    const tick = () => {
      if (ended) return;
      const elapsed = (performance.now() - started.current) / 1000;
      setSeconds(elapsed);
      if (elapsed >= DURATION) { finish("completed"); return; }
      const t = elapsed * 1.7;
      const nextY = (elapsed / 0.95) * 100 % 120;
      const nextX = (Math.sin(t * 1.3) * 42 + 50);
      setHazard({ x: nextX, y: nextY });
      if (nextY > 84 && nextY < 96 && Math.abs(nextX - x) < 10) { finish("failed"); return; }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [ended, finish, x]);

  const move = (delta: number) => { if (!ended) { setX((value) => clampDodge(value + delta)); setDodges((n) => n + 1); } };

  return <div className="game-board game-last-second" aria-label={definition.title}>
    <div className="game-status"><span>{Math.max(0, DURATION - seconds).toFixed(1)}s</span><strong>NE BOUGE PAS TROP TÔT</strong></div>
    <div className="last-arena" role="application" aria-label="Arena de survie">
      <div className="last-hazard" style={{ left: hazard.x + "%", top: hazard.y + "%" }} />
      <div className="last-player" style={{ left: x + "%" }} />
    </div>
    <div className="last-controls"><button type="button" onClick={() => move(-9)} aria-label="Move left">←</button><button type="button" onClick={() => move(9)} aria-label="Move right">→</button></div>
    <p className="game-instruction">Les impacts arrivent selon un rythme irrégulier. Le bon moment compte plus que la vitesse.</p>
  </div>;
}
