"use client";

import { useState } from "react";
import type { GameResult } from "@/lib/play/types";
import { answerRulefall, createRulefall, type Rule } from "@/lib/play/games/rulefall";

const LABELS: Record<Rule, string> = {
  "match-shape": "MATCH SHAPE",
  "avoid-shape": "AVOID SHAPE",
  "match-position": "MATCH POSITION",
};

export function RulefallGame({ seed, onResult }: { seed: string; onResult: (result: GameResult) => void }) {
  const [state, setState] = useState(() => createRulefall(seed));
  const [startedAt] = useState(() => Date.now());
  const [submitted, setSubmitted] = useState(false);
  const currentPrompt = state.round % 2 === 0;

  function answer(correct: boolean) {
    const next = answerRulefall(state, correct);
    setState(next);
    if (next.status !== "playing" && !submitted) {
      setSubmitted(true);
      onResult({
        status: "completed",
        score: Math.min(100, next.score),
        durationMs: Math.max(0, Date.now() - startedAt),
        seed,
        metadata: { ruleStreak: next.streak, mistakes: 3 - next.lives, rounds: next.round, finalRule: next.rule },
      });
    }
  }

  return (
    <div className="game-stage">
      <div className="game-stage-topline"><span>RULEFALL</span><span>Score {state.score}</span></div>
      <p className="game-help">Read the arena. The rule changes. Your job is to notice the change.</p>
      <div className={`rule-arena rule-${state.rule}`}>
        <div className="rule-symbol" aria-hidden="true">{currentPrompt ? "◆" : "●"}</div>
        <strong>{LABELS[state.rule]}</strong>
        <span>Round {state.round + 1}</span>
      </div>
      <div className="game-controls">
        <button type="button" className="game-control-button is-correct" onClick={() => answer(true)}>READ IT</button>
        <button type="button" className="game-control-button is-wrong" onClick={() => answer(false)}>MISREAD</button>
      </div>
      <div className="game-status" aria-live="polite">Streak {state.streak} · Lives {state.lives}</div>
    </div>
  );
}
