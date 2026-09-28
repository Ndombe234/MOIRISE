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

  const phase = (elapsed % 720) / 720;
  const bloom = 0.72 + 0.3 * Math.sin(phase * Math.PI * 2);

  function strike() {
    const next = [...hits, Math.round(performance.now() - startedAt.current)];
    setHits(next);
    if (next.length === challenge.targetTimes.length) onComplete({ hitTimes: next });
  }

  return (
    <div className="game-board game-signal" aria-label={definition.title}>
      <div className="game-status">
        <span>Bloom {hits.length}/{challenge.targetTimes.length}</span>
        <strong>Calibrage</strong>
      </div>
      <div className="signal-orb-wrap">
        <div className="signal-orb" style={{ transform: "scale(" + bloom + ")" }} />
        <div className="signal-ring" />
        <div className="signal-target" style={{ transform: "rotate(" + (phase * 360) + "deg) translateY(-118px)" }} />
      </div>
      <button type="button" className="signal-strike" onClick={strike} disabled={hits.length >= challenge.targetTimes.length}>
        FIXER LE SIGNAL
      </button>
      <p className="game-instruction">Le signal possède plusieurs fenêtres. Frappe au moment où il semble s'ouvrir.</p>
      <div className="signal-history">{hits.map((hit, index) => <span key={index}>{Math.round(hit / 100)}·</span>)}</div>
    </div>
  );
}