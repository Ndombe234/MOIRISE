# MORISE Module 6 — PLAY Engine & Play Lab

**Status:** DESIGN + IMPLEMENTATION IN PROGRESS  
**Date:** 2026-09-28

## Goal
Turn PLAY into a single simple door containing genuinely fun, short-to-deep interactive experiences that work solo, connect to SYSTEM progression, can generate shareable Moments, and can later scale to MORISE's canonical 40-game inventory.

## Important inventory rule
The authoritative names of the previously defined canonical 40 games and the separate 20 major features are not present in the project context available to this implementation session.

Therefore this module does not redefine or replace that canonical inventory.

This module builds the reusable PLAY engine, game metadata contracts, progression/result contracts, selection logic, and a small experimental Play Lab set used to validate the engine and interaction model.

These experimental games are not declared to be the canonical 40 until the authoritative inventory is recovered.

## Market analysis
Current 2026 signals:

1. Gaming remains a large global market. Newzoo forecasts $213.9B in 2026 and 3.7B players. As player penetration grows, retention of existing audiences becomes increasingly important.
2. Discovery is shifting toward experiences that retain rather than only create short-term engagement. Roblox's 2026 discovery changes explicitly balance shorter experiences with deeper returning experiences and longer-term retention.
3. Solo-friendly asynchronous social loops can create social value without requiring friends to be online. Current retention analysis highlights asynchronous challenges, shared milestones, and cohort-based leaderboards.
4. Sustained play is influenced by coherent presentation, emotional or narrative design, community co-creation, and personalization rather than raw difficulty alone.

## Product implications
MORISE should not build a generic arcade page with dozens of interchangeable clones.

PLAY will optimize for instant comprehension, 20–120 second first-session loops, deeper mastery when the player chooses to stay, unusual rules that are easy to explain, outcomes that create a story or visual artifact, asynchronous comparison, adaptive selection based on SYSTEM, no pay-to-win, no fake players, no fake scores, no forced social participation, and minimal advertising interruption.

## MORISE originality principle
A MORISE game is not considered original merely because its art is new.

A game should have at least one distinctive mechanic relationship:
- the world changes based on the player's SYSTEM dimensions;
- the result becomes a social object or Moment;
- the player manipulates an abstract system rather than a conventional avatar;
- exploration changes the rules of the next round;
- a failure creates useful information for the next attempt;
- another player's past action affects the player's world asynchronously;
- the game produces a personal signature that can be shared.

## Play families
- Pulse — 20–90 second skill loops.
- Drift — compact exploratory micro-worlds.
- Forge — creation-based games.
- Duel — asynchronous challenges.
- Quest — progression-oriented experiences.
- World — selective 3D experiences.

## Experimental Play Lab
The first engine validation set contains six small experimental experiences:

1. Echo Trace — recreate a path revealed by a spectral signal; precision and memory.
2. Signal Bloom — tune a moving signal until a hidden pattern resolves; timing and observation.
3. Shadow Courier — place light gates so a moving shadow reaches its destination; spatial planning.
4. Foldline — rotate a field to route energy through changing folds; pattern recognition.
5. Gravity Thread — connect drifting nodes while the field slowly rotates; planning and adaptation.
6. Drift Atlas — choose among changing routes where each choice alters what the next route can contain; exploration.

These are prototype concepts for validating the engine contract, not the final 40-game catalogue.

## Game contract
Every experience implements id, family, title, description, estimatedSeconds, dimensions, difficulty, requiredLevel, and launchPath.

Runtime result includes status, score, durationMs, attemptId, signals, and momentCandidate.

The client never decides authoritative XP directly.

A completed experience emits a server-side progression event with an idempotency key based on playerId + gameId + attemptId.

## Adaptive selection
The selector uses SYSTEM level, SYSTEM dimensions, recently played game IDs, difficulty, and estimated session length.

It must not claim to use machine learning before there is enough data to justify it.

Initial selection is deterministic and transparent.

## Sharing
Games can generate a Moment candidate such as a personal best, unusual path, rare discovery, high-precision run, created artifact, hidden route, or challenge result.

The first implementation supports a shareable route to the result context without fabricating engagement.

## Performance
Small browser games should load without blocking the main shell, remain playable on mobile widths, avoid large third-party assets, prefer Canvas/SVG/DOM for small 2D experiences, and reserve WebGL/3D for experiences that actually benefit from spatial depth.

## Safety
No multiplayer chat is introduced in this module.
No user-generated executable code is executed in the browser.
All result validation and progression mutation boundaries remain server-controlled.

## Definition of done for this module phase
- PLAY is a real authenticated destination.
- A deterministic selection engine exists.
- Game definitions are typed and validated.
- At least three experiments are fully playable end-to-end in-browser.
- Game result state is recoverable through a direct URL.
- SYSTEM progression integration uses idempotent result events.
- Mobile and desktop layouts work.
- Unit tests cover selection and result validation.
- Production build and CI pass.
- Browser QA covers launch, restart, completion, direct result route, refresh, back navigation, and mobile layout.

The canonical 40-game inventory remains a separate product source-of-truth task when its authoritative definition is recovered.