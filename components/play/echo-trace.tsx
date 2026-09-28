"use client";

import { useEffect, useMemo, useState } from "react";
import type { GameDefinition } from "@/lib/play/types";
import { visibleEchoSequence, type EchoChallenge } from "@/lib/play/games/echo-trace";

export function EchoTrace({
  definition,
  challenge,
  onComplete,
}: {
  definition: GameDefinition;
  challenge: EchoChallenge;
  onComplete: (actions: unknown) => void;
}) {
  const sequence = useMemo(() => visibleEchoSequence(challenge), [challenge]);
  const [phase, setPhase] = useState<"reveal" | "play">("reveal");
  const [moves, setMoves] = useState<number[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase("play"), 1500 + sequence.length * 110);
    return () => window.clearTimeout(timer);
  }, [sequence.length]);

  function clickCell(cell: number) {
    if (phase !== "play") return;
    const next = [...moves, cell];
    setMoves(next);
    if (next.length === sequence.length) onComplete({ moves: next });
  }

  return (
    <div className="game-board game-echo" aria-label={definition.title}>
      <div className="game-status">
        <span>{phase === "reveal" ? "Observe." : "Recompose."}</span>
        <strong>{moves.length}/{sequence.length}</strong>
      </div>
      <div className="echo-grid">
        {Array.from({ length: 16 }, (_, cell) => {
          const isReveal = phase === "reveal" && sequence.includes(cell);
          const isUsed = moves.includes(cell);
          return (
            <button
              type="button"
              key={cell}
              className={isReveal ? "echo-cell is-trace" : isUsed ? "echo-cell is-used" : "echo-cell"}
              onClick={() => clickCell(cell)}
              aria-label={"Trace node " + (cell + 1)}
              disabled={phase !== "play"}
            />
          );
        })}
      </div>
      <p className="game-instruction">
        {phase === "reveal"
          ? "La trace apparaît, puis le monde change de géométrie."
          : "Reproduis exactement la trace transformée."}
      </p>
    </div>
  );
}