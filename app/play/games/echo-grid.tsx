"use client";

import { useEffect, useMemo, useState } from "react";
import type { GameResult } from "@/lib/play/types";
import { createEchoGrid, echoGridScore, stepEchoGrid, type EchoAction, type EchoGridState } from "@/lib/play/games/echo-grid";

const ACTIONS: Array<{ key: EchoAction; label: string }> = [
  { key: "up", label: "↑" },
  { key: "left", label: "←" },
  { key: "down", label: "↓" },
  { key: "right", label: "→" },
];

export function EchoGridGame({ seed, onResult }: { seed: string; onResult: (result: GameResult) => void }) {
  const [state, setState] = useState<EchoGridState>(() => createEchoGrid(seed));
  const [startedAt] = useState(() => Date.now());

  const score = useMemo(() => echoGridScore(state), [state]);

  useEffect(() => {
    if (state.status === "playing") return;
    onResult({
      status: "completed",
      score,
      durationMs: Math.max(0, Date.now() - startedAt),
      seed,
      metadata: { collisions: state.collisions, steps: state.steps, outcome: state.status },
    });
  }, [onResult, score, seed, startedAt, state]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const map: Record<string, EchoAction | undefined> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right",
      };
      const action = map[event.key];
      if (!action) return;
      event.preventDefault();
      setState((current) => stepEchoGrid(current, action));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="game-stage">
      <div className="game-stage-topline"><span>ECHO GRID</span><span>Score {score}</span></div>
      <p className="game-help">Move to the goal, but your earlier moves return a few turns later as an echo.</p>
      <div className="echo-grid" role="grid" aria-label="Echo Grid board">
        {Array.from({ length: state.size * state.size }).map((_, index) => {
          const row = Math.floor(index / state.size);
          const col = index % state.size;
          const isPlayer = state.player[0] === row && state.player[1] === col;
          const isEcho = state.echo[0] === row && state.echo[1] === col;
          const isGoal = state.goal[0] === row && state.goal[1] === col;
          return (
            <div className={`echo-cell${isPlayer ? " is-player" : ""}${isEcho ? " is-echo" : ""}${isGoal ? " is-goal" : ""}`} role="gridcell" key={`${row}-${col}`}>
              {isGoal ? "◇" : isEcho ? "E" : isPlayer ? "P" : ""}
            </div>
          );
        })}
      </div>
      <div className="game-controls" aria-label="Echo Grid controls">
        {ACTIONS.map((action) => (
          <button type="button" className="game-control-button" key={action.key} onClick={() => setState((current) => stepEchoGrid(current, action.key))}>
            {action.label}
          </button>
        ))}
      </div>
      <div className="game-status" aria-live="polite">
        {state.status === "playing" ? `Echo delay active · ${state.collisions} collisions` : state.status === "won" ? "Route cleared." : "The echo caught you."}
      </div>
    </div>
  );
}
