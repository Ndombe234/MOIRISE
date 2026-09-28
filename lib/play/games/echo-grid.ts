import { createGameSeed } from "../seed";

export type EchoAction = "up" | "down" | "left" | "right";
export type EchoGridState = {
  size: number;
  player: [number, number];
  echo: [number, number];
  goal: [number, number];
  history: EchoAction[];
  echoQueue: EchoAction[];
  steps: number;
  collisions: number;
  status: "playing" | "won" | "lost";
};

const DELAY = 3;

function rand(seed: string) {
  let value = 0;
  for (const char of seed) value = (value * 31 + char.charCodeAt(0)) >>> 0;
  return () => {
    value = Math.imul(value ^ (value >>> 15), 2246822519);
    value = Math.imul(value ^ (value >>> 13), 3266489917);
    return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
  };
}

export function createEchoGrid(seedInput: string): EchoGridState {
  const random = rand(createGameSeed(seedInput));
  const goal: [number, number] = [Math.floor(random() * 3) + 2, 4];
  return {
    size: 5,
    player: [0, 0],
    echo: [4, 0],
    goal,
    history: [],
    echoQueue: [],
    steps: 0,
    collisions: 0,
    status: "playing",
  };
}

function move(position: [number, number], action: EchoAction, size: number): [number, number] {
  const next: [number, number] = [...position];
  if (action === "up") next[0] -= 1;
  if (action === "down") next[0] += 1;
  if (action === "left") next[1] -= 1;
  if (action === "right") next[1] += 1;
  return [
    Math.max(0, Math.min(size - 1, next[0])),
    Math.max(0, Math.min(size - 1, next[1])),
  ];
}

export function stepEchoGrid(state: EchoGridState, action: EchoAction): EchoGridState {
  if (state.status !== "playing") return state;

  const player = move(state.player, action, state.size);
  const history = [...state.history, action];
  const echoQueue = [...state.echoQueue, action];
  let echo = state.echo;
  let collisions = state.collisions;

  if (echoQueue.length > DELAY) {
    const echoedAction = echoQueue.shift();
    if (echoedAction) echo = move(echo, echoedAction, state.size);
  }

  const collided = player[0] === echo[0] && player[1] === echo[1];
  if (collided) collisions += 1;

  const won = player[0] === state.goal[0] && player[1] === state.goal[1];
  const lost = collisions >= 2 || history.length >= 24;

  return {
    ...state,
    player,
    echo,
    history,
    echoQueue,
    steps: state.steps + 1,
    collisions,
    status: won ? "won" : lost ? "lost" : "playing",
  };
}

export function echoGridScore(state: EchoGridState): number {
  const base = state.status === "won" ? 100 : 35;
  return Math.max(0, Math.round(base + (24 - state.steps) * 2 - state.collisions * 18));
}