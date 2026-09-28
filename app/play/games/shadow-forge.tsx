"use client";

import { useState } from "react";
import type { GameResult } from "@/lib/play/types";
import { appendForgeAction, createShadowForge, removeForgeAction, shadowForgeScore, type ForgeAction } from "@/lib/play/games/shadow-forge";

const ACTIONS: ForgeAction[] = ["forward", "left", "right", "wait"];

export function ShadowForgeGame({ seed, onResult }: { seed: string; onResult: (result: GameResult) => void }) {
  const [state, setState] = useState(() => createShadowForge(seed));
  const [startedAt] = useState(() => Date.now());
  const [submitted, setSubmitted] = useState(false);

  function finish() {
    if (submitted) return;
    setSubmitted(true);
    onResult({
      status: "completed",
      score: shadowForgeScore(state),
      durationMs: Math.max(0, Date.now() - startedAt),
      seed,
      metadata: { editsUsed: 3 - state.editsLeft, programLength: state.program.length, success: state.status === "success" },
    });
  }

  return (
    <div className="game-stage">
      <div className="game-stage-topline"><span>SHADOW FORGE</span><span>Edits {state.editsLeft}</span></div>
      <p className="game-help">Program the companion. One perfect sequence wins. You have only a few edits.</p>
      <div className="forge-target" aria-label="Target route">
        {state.target.map((action, index) => <span key={`${action}-${index}`}>{action.slice(0, 1).toUpperCase()}</span>)}
      </div>
      <div className="forge-program" aria-label="Your program">
        {state.program.length ? state.program.map((action, index) => (
          <button type="button" key={`${action}-${index}`} className="forge-slot" onClick={() => setState((current) => removeForgeAction(current, index))}>
            {action}
          </button>
        )) : <span className="forge-empty">Your sequence is empty.</span>}
      </div>
      <div className="game-controls forge-controls">
        {ACTIONS.map((action) => <button type="button" className="game-control-button" key={action} onClick={() => setState((current) => appendForgeAction(current, action))}>{action}</button>)}
      </div>
      <div className="game-status" aria-live="polite">
        {state.status === "success" ? "Build accepted. The shadow obeyed." : `${state.program.length}/${state.maxActions} actions`}
      </div>
      <button className="game-primary" type="button" onClick={finish}>{state.status === "success" ? "Save this Moment" : "Finish run"}</button>
    </div>
  );
}
