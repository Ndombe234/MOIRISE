"use client";

import { useEffect, useMemo, useState } from "react";
import type { GameDefinition } from "@/lib/play/types";

const SIZE = 3;
const TARGET = [1, 2, 1, 0, 0, 0, 0, 0, 0];

export function rotateTile(value: number, turns: number) {
  return (value + turns) % 4;
}

function exits(tile: number) {
  return [tile === 0 || tile === 2, tile === 1 || tile === 2, tile === 0 || tile === 3, tile === 1 || tile === 3];
}

export function isConnected(tiles: number[], size = SIZE, goal = size * size - 1) {
  const open = (cell: number, dir: number) => exits(tiles[cell])[dir];
  const opposite = [1, 0, 3, 2];
  const delta = [-size, 1, size, -1];
  const queue = [0];
  const visited = new Set(queue);
  while (queue.length) {
    const cell = queue.shift()!;
    if (cell === goal) return true;
    for (let dir = 0; dir < 4; dir++) {
      if (!open(cell, dir)) continue;
      const next = cell + delta[dir];
      if (next < 0 || next >= tiles.length) continue;
      if (dir === 1 && next % size === 0) continue;
      if (dir === 3 && cell % size === 0) continue;
      if (!open(next, opposite[dir]) || visited.has(next)) continue;
      visited.add(next);
      queue.push(next);
    }
  }
  return false;
}

export function MirrorRun({ definition, onComplete }: { definition: GameDefinition; onComplete: (result: { status: "completed" | "failed"; score: number; durationMs: number; signals: Record<string, number>; momentCandidate: { kind: "discovery"; title: string; summary: string } | null }) => void }) {
  const [tiles, setTiles] = useState<number[]>(() => TARGET.map((tile, i) => (tile + ((i * 7 + 1) % 4)) % 4));
  const [moves, setMoves] = useState(0);
  const [started] = useState(() => performance.now());
  const [done, setDone] = useState(false);
  const solved = useMemo(() => isConnected(tiles), [tiles]);

  useEffect(() => {
    if (!solved || done) return;
    setDone(true);
    onComplete({
      status: "completed",
      score: Math.max(300, 1000 - moves * 45),
      durationMs: Math.max(250, Math.round(performance.now() - started)),
      signals: { observation: 85, creation: Math.min(100, 40 + Math.max(0, 20 - moves)) },
      momentCandidate: { kind: "discovery", title: "Ligne miroir", summary: "Tu as réaligné le réseau et rallumé la destination." },
    });
  }, [solved, done, moves, onComplete, started]);

  return <div className="game-board game-mirror" aria-label={definition.title}>
    <div className="game-status"><span>{moves} rotations</span><strong>{solved ? "Réseau connecté" : "Réseau brisé"}</strong></div>
    <div className="mirror-grid">
      {tiles.map((tile, index) => <button key={index} type="button" className={"mirror-tile tile-" + tile} onClick={() => { if (done) return; setMoves((n) => n + 1); setTiles((current) => current.map((v, i) => i === index ? rotateTile(v, 1) : v)); }} aria-label={"Miroir " + (index + 1)}><span /></button>)}
    </div>
    <p className="game-instruction">Chaque rotation change les sorties du miroir. Relie la source à la destination avec le moins de gestes possible.</p>
  </div>;
}
