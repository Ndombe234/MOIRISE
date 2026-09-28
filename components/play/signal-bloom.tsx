"use client";

import { useEffect, useRef, useState } from "react";
import type { GameDefinition } from "@/lib/play/types";
import type { SignalBloomChallenge } from "@/lib/play/games/signal-bloom";

export function SignalBloom({
  definition,
  challenge,
  onComplete,
}: {
  definition: GameDefinition;
  challenge: SignalBloomChallenge;
  onComplete: (actions: unknown) => void;
}) {
  const [hits, setHits] = useState<number[]>([]);
  const startedAt = useRef(performance.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      const value = performance.now() - startedAt.current;
      setElapsed(value);
      if (value < challenge.durationMs + 600 && hits.length < challenge.targetTimes.length) {
        frame = requestAnimationFrame(loop);
      }
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [challenge.durationMs, challenge.targetTimes.length, hits.length]);

  const nextTarget = challenge.targetTimes[hits.length] ?? challenge.targetTimes[challenge.targetTimes.length - 1];
  const tolerance = challenge.toleranceMs[hits.length] ?? challenge.toleranceMs[challenge.toleranceMs.length - 1];
  const delta = elapsed - nextTarget;
  const proximity = Math.max(0, 1 - Math.abs(delta) / (tolerance + 140));
  const bloom = 0.72 + proximity * 0.36;
  const opened = Math.abs(delta) <= tolerance;

  function strike() {
    const next = [...hits, Math.round(performance.now() - startedAt.current)];
    setHits(next);
    if (next.length === challenge.targetTimes.length) onComplete({ hitTimes: next });
  }

  return (
    <div className="game-board game-signal" aria-label={definition.title}>
      <div className="game-status">
        <span>Bloom {hits.length}/{challenge.targetTimes.length}</span>
        <strong>{opened ? "Fenêtre ouverte" : proximity > 0.45 ? "Le signal approche" : "Calibrage"}</strong>
      </div>
      <div className={"signal-orb-wrap" + (opened ? " is-open" : "")}>
        <div className="signal-orb" style={{ transform: "scale(" + bloom.toFixed(3) + ")" }} />
        <div className="signal-ring" />
        <div className="signal-target" style={{ transform: "rotate(" + ((nextTarget / challenge.durationMs) * 360) + "deg) translateY(-118px)" }} />
      </div>
      <button type="button" className="signal-strike" onClick={strike} disabled={hits.length >= challenge.targetTimes.length || elapsed > challenge.durationMs}>
        FIXER LE SIGNAL
      </button>
      <p className="game-instruction">La fenêtre se rapproche, s’ouvre, puis disparaît. Le visuel suit le vrai timing du run.</p>
      <div className="signal-history">{hits.map((hit, index) => <span key={index}>{Math.round(hit / 100)}·</span>)}</div>
    </div>
  );
}