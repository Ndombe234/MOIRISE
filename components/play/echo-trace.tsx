"use client";

import { useEffect, useMemo, useState } from "react";
import type { GameDefinition } from "@/lib/play/types";

const GRID = 12;
const PATH_LENGTH = 7;

function seeded(seed: string) {
  let value = 2166136261;
  for (const char of seed) value = Math.imul(value ^ char.charCodeAt(0), 16777619);
  return () => {
    value += value << 13;
    value ^= value >>> 7;
    value += value << 3;
    value ^= value >>> 17;
    value += value << 5;
    return ((value >>> 0) % 10000) / 10000;
  };
}

export function buildTraceSequence(seed: string) {
  const next = seeded(seed);
  const result: number[] = [];
  while (result.length < PATH_LENGTH) {
    const candidate = Math.floor(next() * GRID);
    if (!result.includes(candidate)) result.push(candidate);
  }
  return result;
}

export function EchoTrace({
  definition,
  attemptId,
  onComplete,
}: {
  definition: GameDefinition;
  attemptId: string;
  onComplete: (result: {
    status: "completed" | "failed";
    score: number;
    durationMs: number;
    signals: Record<string, number>;
    momentCandidate: { kind: "precision"; title: string; summary: string } | null;
  }) => void;
}) {
  const sequence = useMemo(() => buildTraceSequence(attemptId), [attemptId]);
  const [phase, setPhase] = useState<"reveal" | "play" | "done">("reveal");
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [mistake, setMistake] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase("play"), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  function clickCell(cell: number) {
    if (phase !== "play") return;
    const expected = sequence[index];
    if (cell !== expected) {
      setMistake(true);
      setPhase("done");
      onComplete({
        status: "failed",
        score: Math.round((correct / PATH_LENGTH) * 1000),
        durationMs: 250,
        signals: { memory: correct * 12, precision: correct * 10 },
        momentCandidate: null,
      });
      return;
    }

    const nextCorrect = correct + 1;
    setCorrect(nextCorrect);

    if (nextCorrect === PATH_LENGTH) {
      setPhase("done");
      onComplete({
        status: "completed",
        score: 1000,
        durationMs: Math.max(250, PATH_LENGTH * 650),
        signals: { memory: 90, precision: 85 },
        momentCandidate: {
          kind: "precision",
          title: "Trace parfaite",
          summary: "Tu as reconstruit une trace spectrale sans erreur.",
        },
      });
      return;
    }

    setIndex(index + 1);
  }

  return (
    <div className="game-board game-echo" aria-label={definition.title}>
      <div className="game-status">
        <span>{phase === "reveal" ? "Observe." : phase === "play" ? "Recompose." : mistake ? "La trace s’est brisée." : "Trace terminée."}</span>
        <strong>{correct}/{PATH_LENGTH}</strong>
      </div>
      <div className="echo-grid">
        {Array.from({ length: GRID }, (_, cell) => {
          const isReveal = phase === "reveal" && sequence.includes(cell);
          return (
            <button
              type="button"
              key={cell}
              className={isReveal ? "echo-cell is-trace" : "echo-cell"}
              onClick={() => clickCell(cell)}
              aria-label={"Trace node " + (cell + 1)}
              disabled={phase !== "play"}
            />
          );
        })}
      </div>
      <p className="game-instruction">
        {phase === "reveal"
          ? "Regarde le chemin. Il disparaît bientôt."
          : phase === "play"
            ? "Reproduis exactement l’ordre que tu viens de voir."
            : "Une nouvelle tentative générera une autre trace."}
      </p>
    </div>
  );
}