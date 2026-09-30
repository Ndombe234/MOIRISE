# M09 — GAME RUNTIME

## Goal
Execute validated game packages inside MOIRISE independently from AI providers.

## Runtime contract
Input, render, physics, audio, save-state, achievements, pause/resume, telemetry and error reporting.

## 2D adapters
Canvas/WebGL/Phaser-compatible package contract.

## 3D adapters
Three.js/Babylon/PlayCanvas/WebGL/WebGPU-compatible package contract.

## Security
Sandbox generated scripts; no arbitrary network calls, DOM escape, secret access or production database access.

## Performance
Per-game CPU/RAM/time budgets, asset streaming, cancellation and crash recovery.

## Acceptance
A finished game runs when all AI providers are offline. Runtime errors isolate the game instead of crashing the MOIRISE shell.
