# M06 — PLAY

## Goal
The unified entry surface for playing MOIRISE games.

## Separation
This module consumes finished game packages. It does not contain the AI game-generation brain.

## Runtime
Game packages run in a controlled browser runtime with input, rendering, audio, persistence and telemetry contracts.

## MORISE
Can recommend games, difficulty and contextual activities. It does not need an AI API to execute a completed game.

## Performance
Load one game package at a time, lazy-load assets, cancel unused requests and cap runtime memory.

## Acceptance
Launch, pause, resume, restart, exit, save where supported, mobile controls and runtime error recovery.
