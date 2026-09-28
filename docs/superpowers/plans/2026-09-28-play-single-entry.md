# PLAY Single-Entry Implementation Plan

## Goal

Align Module 6 with the approved product decision: PLAY is one adaptive entry point, while the internal catalogue remains hidden from the Player.

## Scope

This continuation does not introduce a new game catalogue. It hardens the existing PLAY engine and removes the current catalogue UI.

### Task 1 — Single-entry UI

- Remove the visible Play Lab game grid from `/play`.
- Keep one primary `PLAY` action.
- Show the SYSTEM-selected experience and a short reason without exposing other choices.
- Preserve navigation to SYSTEM, SOCIAL, and World.
- Keep authenticated access and graceful loading/empty states.

### Task 2 — Adaptive selector

- Keep selection deterministic.
- Use SYSTEM level, dimensions, recent games, and session context.
- Avoid claiming ML personalization.
- Keep recent-game cooldown behavior.
- Ensure tie-breaking is deterministic.

### Task 3 — Tests

- Required level gating.
- Recent-game avoidance.
- Dimension-driven selection.
- Determinism.
- Result validation and progression idempotency remain protected by existing tests and migrations.

### Task 4 — Documentation

- Record the single-entry decision in the Module 6 spec.
- Explicitly retire the fixed 40-game UI requirement.
- Keep this plan as the continuation record for future conversations.

### Task 5 — Browser QA

When a runnable environment is available, test `/play` as a normal user at desktop and 390px mobile width:

1. Open `/play` unauthenticated and verify sign-in protection.
2. Authenticate and open `/play`.
3. Verify there is no visible game catalogue.
4. Verify exactly one primary PLAY action launches the selected experience.
5. Complete the game.
6. Restart it.
7. Refresh during and after play.
8. Use browser back.
9. Open the result URL directly.
10. Repeat completion quickly and verify no duplicate progression.
11. Verify no console errors or horizontal overflow.

## Completion criteria

- The Player sees one PLAY entry point, not a game catalogue.
- The selected experience is derived from real Player/SYSTEM data.
- Existing result validation and progression security remain intact.
- Tests pass.
- Production build passes.
- Browser QA passes on desktop and mobile.
- The roadmap/spec reflects the real implementation state.
