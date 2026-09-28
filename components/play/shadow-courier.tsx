"use client";

import { useMemo, useState } from "react";
import type { GameDefinition } from "@/lib/play/types";

const SIZE = 5;
const SOLUTION = [4, 9, 14, 13, 12];

function neighbors(cell: number) {
  const row = Math.floor(cell / SIZE);
  const col = cell % SIZE;
  return [
    row > 0 ? cell - SIZE : -1,
    row < SIZE - 1 ? cell + SIZE : -1,
    col > 0 ? cell - 1 : -1,
    col < SIZE - 1 ? cell + 1 : -1,
  ].filter((value) => value >= 0);
}

export function canRoute(gates: number[]) {
  const gateSet = new Set(gates);
  const queue = [4];
  const visited = new Set(queue);

  while (queue.length) {
    const current = queue.shift()!;
    if (current === 12) return true;
    for (const next of neighbors(current)) {
      if (!gateSet.has(next) || visited.has(next)) continue;
      visited.add(next);
      queue.push(next);
    }
  }
  return false;
}

export function ShadowCourier({
  definition,
  onComplete,
}: {
  definition: GameDefinition;
  onComplete: (result: {
    status: "completed" | "failed";
    score: number;
    durationMs: number;
    signals: Record<string, number>;
    momentCandidate: { kind: "discovery"; title: string; summary: string } | null;
  }) => void;
}) {
  const [gates, setGates] = useState<number[]>([4]);
  const [sent, setSent] = useState(false);
  const objective = useMemo(() => canRoute(gates), [gates]);

  function toggle(cell: number) {
    if (sent || cell === 4 || cell === 12) return;
    setGates((current) => current.includes(cell) ? current.filter((v) => v !== cell) : current.length < 7 ? [...current, cell] : current);
  }

  function send() {
    setSent(true);
    onComplete({
      status: objective ? "completed" : "failed",
      score: objective ? Math.max(300, 1000 - gates.length * 45) : 80,
      durationMs: Math.max(250, gates.length * 500),
      signals: { planning: objective ? 95 : 20, exploration: gates.length * 9 },
      momentCandidate: objective ? {
        kind: "discovery",
        title: "Route trouvée",
        summary: "Tu as créé un chemin de lumière viable pour le messager d’ombre.",
      } : null,
    });
  }

  return (
    <div className="game-board game-shadow" aria-label={definition.title}>
      <div className="game-status">
        <span>Portails {gates.length}/7</span>
        <strong>{objective ? "Chemin ouvert" : "Chemin incomplet"}</strong>
      </div>
      <div className="shadow-grid">
        {Array.from({ length: SIZE * SIZE }, (_, cell) => {
          const active = gates.includes(cell);
          const start = cell === 4;
          const goal = cell === 12;
          return (
            <button key={cell} type="button" className={"shadow-cell" + (active ? " is-gate" : "") + (start ? " is-start" : "") + (goal ? " is-goal" : "")} onClick={() => toggle(cell)} aria-label={"Tile " + (cell + 1)}>
              {start ? "◆" : goal ? "◎" : active ? "•" : ""}
            </button>
          );
        })}
      </div>
      <button type="button" className="signal-strike" onClick={send} disabled={sent}>ENVOYER L’OMBRE</button>
      <p className="game-instruction">Ne dessine pas un chemin classique. Construis seulement les passages de lumière dont l’ombre a besoin.</p>
      <p className="game-microcopy">Indice de conception : les cases déjà ouvertes comptent comme des portails.</p>
    </div>
  );
}