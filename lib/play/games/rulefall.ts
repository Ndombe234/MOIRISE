export type Rule = "match-shape" | "avoid-shape" | "match-position";
export type RulefallState = {
  round: number;
  lives: number;
  score: number;
  rule: Rule;
  streak: number;
  status: "playing" | "won" | "lost";
};

const RULES: Rule[] = ["match-shape", "avoid-shape", "match-position"];

export function createRulefall(seed: string): RulefallState {
  const index = seed.charCodeAt(0) % RULES.length;
  return { round: 0, lives: 3, score: 0, rule: RULES[index], streak: 0, status: "playing" };
}

export function answerRulefall(state: RulefallState, correct: boolean): RulefallState {
  if (state.status !== "playing") return state;
  const nextRound = state.round + 1;
  const nextStreak = correct ? state.streak + 1 : 0;
  const lives = correct ? state.lives : state.lives - 1;
  const score = correct ? state.score + 10 + nextStreak : state.score;
  const nextRule = RULES[(nextRound + state.rule.length) % RULES.length];

  return {
    round: nextRound,
    lives,
    score,
    rule: nextRule,
    streak: nextStreak,
    status: lives <= 0 ? "lost" : nextRound >= 10 ? "won" : "playing",
  };
}
