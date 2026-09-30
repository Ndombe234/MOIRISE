# M08 — GAME FACTORY

## Goal
Let a player describe a game and let MORISE AI turn the request into a validated game package.

## Pipeline
`IDEA → INTENT → GAME SPEC → DESIGN → CODE/ASSETS/AUDIO → BUILD → SIMULATION → TEST → PREVIEW → PUBLISH/PRIVATE`.

## Game specification
Must include engine, scenes, entities, controls, rules, levels, difficulty, win/loss conditions, assets, audio, accessibility and safety.

## 2D
Initial controlled templates: Adventure, Battle, Puzzle. Phaser/Canvas/WebGL adapters may execute the resulting package.

## 3D
Three.js/Babylon/PlayCanvas/WebGL/WebGPU adapters may be used according to package compatibility.

## Provider independence
Gemini/DeepSeek/Pollinations/etc. can help create content, but the generated package must contain everything needed for runtime. Runtime must not require the creation provider.

## Safety
Generated code runs in a sandbox before preview/publication. No direct production execution.

## Acceptance
A user can request a small game, inspect preview, retry generation, and publish only after validation. Failure returns diagnostics instead of a fake success.
