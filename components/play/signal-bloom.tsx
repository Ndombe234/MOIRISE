"use client";

import { useEffect, useRef, useState } from "react";
import type { GameDefinition } from "@/lib/play/types";

const ROUNDS = 3;

export function SignalBloom({
  definition,
  onComplete,
}: {
  definition: GameDefinition;
  onComplete: (result: {
    status: "completed" | "failed";
    score: number;
    durationMs: number;
    signals: Record<string, number>;
    momentCandidate: { kind: "precision"; title: string; summary: string } | null;
  }) => void;
}) {
  const [round, setRound] = useState(1);
  const [pulse, setPulse] = useState(0);
  const [hits, setHits] = useState<number[]>([]);
  const start = useRef(performance.now());

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      setPulse((performance.now() - start.current) / 1000);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const wave = (Math.sin(pulse * 3.2) + 1) / 2;
  const target = 0.48 + Math.sin(round * 1.7) * 0.16;
  const distance = Math.abs(wave - target);

  function strike() {
    const points = Math.max(0, Math.round((1 - Math.min(distance / 0.42, 1)) * 100));
    const nextHits = [...hits, points];
    if (round === ROUNDS) {
      const score = Math.min(1000, nextHits.reduce((sum, value) => sum + value, 0) * (1000 / (ROUNDS * 100)));
      onComplete({
        status: "completed",
        score: Math.round(score),
        durationMs: Math.max(250, Math.round(performance.now() - start.current)),
        signals: { timing: Math.round(score / 10), observation: Math.max(...nextHits) },
        momentCandidate: Math.min(...nextHits) >= 80 ? {
          kind: "precision",
          title: "Signal verrouillé",
          summary: "Trois frappes dans la zone sensible du signal.",
        } : null,
      });
      return;
    }
    setHits(nextHits);
    setRound(round + 1);
  }

  return (
    <div className="game-board game-signal" aria-label={definition.title}>
      <div className="game-status">
        <span>Round {round}/{ROUNDS}</span>
        <strong>Calibrage</strong>
      </div>
      <div className="signal-orb-wrap">
        <div className="signal-orb" style={{ transform: "scale(" + (0.78 + wave * 0.45) + ")" }} />
        <div className="signal-ring" />
        <div className="signal-target" style={{ transform: "rotate(" + (target * 360) + "deg) translateY(-118px)" }} />
      </div>
      <button type="button" className="signal-strike" onClick={strike}>FIXER LE SIGNAL</button>
      <div className="signal-history">
        {hits.map((hit, index) => <span key={index}>{hit}</span>)}
      </div>
      <p className="game-instruction">Le signal bouge. Tu n’as pas besoin d’aller vite — seulement au bon moment.</p>
    </div>
  );
}