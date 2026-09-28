import { describe, expect, it } from "vitest";
import { answerRulefall, createRulefall } from "../lib/play/games/rulefall";

describe("RULEFALL", () => {
  it("is deterministic", () => {
    expect(createRulefall("abc")).toEqual(createRulefall("abc"));
  });

  it("builds streaks on correct answers and loses lives on mistakes", () => {
    let state = createRulefall("abc");
    state = answerRulefall(state, true);
    state = answerRulefall(state, true);
    expect(state.streak).toBe(2);
    state = answerRulefall(state, false);
    expect(state.streak).toBe(0);
    expect(state.lives).toBe(2);
  });

  it("ends after ten rounds or when lives are exhausted", () => {
    let state = createRulefall("abc");
    for (let i = 0; i < 10; i += 1) state = answerRulefall(state, true);
    expect(state.status).toBe("won");
  });
});
