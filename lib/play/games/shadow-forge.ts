export type ForgeAction = "forward" | "left" | "right" | "wait";
export type ShadowForgeState = {
  program: ForgeAction[];
  maxActions: number;
  editsLeft: number;
  target: ForgeAction[];
  status: "editing" | "success" | "failed";
};

const DEFAULT_TARGET: ForgeAction[] = ["forward", "right", "forward", "left", "forward"];

export function createShadowForge(seed: string): ShadowForgeState {
  const offset = seed.charCodeAt(0) % 2;
  const target = offset === 0 ? DEFAULT_TARGET : ["forward", "left", "forward", "right", "forward"];
  return {
    program: [],
    maxActions: target.length,
    editsLeft: 3,
    target,
    status: "editing",
  };
}

export function appendForgeAction(state: ShadowForgeState, action: ForgeAction): ShadowForgeState {
  if (state.status !== "editing" || state.program.length >= state.maxActions) return state;
  const program = [...state.program, action];
  const success = program.length === state.maxActions && program.every((item, i) => item === state.target[i]);
  return { ...state, program, status: success ? "success" : "editing" };
}

export function removeForgeAction(state: ShadowForgeState, index: number): ShadowForgeState {
  if (state.status !== "editing" || state.editsLeft <= 0 || index < 0 || index >= state.program.length) return state;
  const program = state.program.filter((_, i) => i !== index);
  return { ...state, program, editsLeft: state.editsLeft - 1 };
}

export function shadowForgeScore(state: ShadowForgeState): number {
  if (state.status !== "success") return 0;
  return Math.max(10, 100 - (3 - state.editsLeft) * 15);
}
