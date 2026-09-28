# MOIRISE Roadmap

## Current module

**Module 6 — PLAY Engine & Single PLAY Entry**  
**Status:** IMPLEMENTATION IN PROGRESS

### Stable module history

- Module 0 — Foundations: completed
- Module 1 — Auth + Player: completed
- Module 2 — SYSTEM Core: implemented
- Module 3 — Home World: implemented
- Module 4 — reserved for the documented next domain in the project history
- Module 5 — Social Core: implemented / verification evidence tracked in its spec
- Module 6 — PLAY: in progress

## Module 6 decisions

- PLAY is a single visible door, not a games directory.
- The Player does not browse all games.
- The SYSTEM selects one experience according to current Player signals.
- Selection may use declared preferences when available, SYSTEM dimensions, level, recent history, previous results and session context.
- The same PLAY button can lead different Players to different experiences.
- The same Player can receive different experiences as their journey evolves.
- There is no fixed 40-game catalogue.
- The internal experience universe may grow very large without increasing visible interface complexity.
- Current experiments are prototypes and can be replaced by stronger original experiences.
- Every game session is server-owned.
- Game results and progression are validated server-side.
- Duplicate completion cannot award duplicate progression.
- Browser QA is part of completion, not an optional polish step.

## Source-of-truth rule

For any new conversation or coding agent:

1. Read this roadmap.
2. Read the current module spec.
3. Read the current module implementation plan.
4. Inspect the actual code and database migrations.
5. Treat newer code and verified database state as evidence over stale README claims.
6. Do not resurrect retired product decisions without an explicit new approval.

