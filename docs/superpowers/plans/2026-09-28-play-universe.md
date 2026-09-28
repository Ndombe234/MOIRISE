# MORISE Play Universe Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a shared MORISE PLAY engine with persistent, idempotent game runs, SYSTEM progression hooks, Moments/deep links, and three clearly experimental 2D prototypes.

**Architecture:** Keep PLAY as a thin orchestration layer. Game definitions expose a stable contract; each game's internal state machine is isolated. Server routes own persistence and progression, while the browser owns only transient gameplay state and rendering.

**Tech Stack:** Next.js App Router, TypeScript, Supabase SSR/PostgreSQL/RLS, Vitest, CSS, browser-native 2D rendering/DOM rather than a heavyweight game engine for the first prototypes.

**Spec:** `docs/superpowers/specs/2026-09-28-play-universe.md`

## Global Constraints

- PLAY must remain one simple primary action in the World.
- Early games are 2D and lightweight; 3D remains an adapter-ready future path.
- Prototype games are not counted as the canonical 40-game inventory.
- Game completion creates a real SYSTEM event in the `play` dimension.
- Every game result must be retry-safe and idempotent.
- No fake players, fake scores, or fake activity.
- No pay-to-win or forced referral mechanics.
- Mobile 390x844 must not horizontally overflow.
- Game mechanics must be understandable quickly and remain enjoyable after novelty.

## Review Focus

1. Double completion / retry: the same run must never grant duplicate persistence or XP.
2. Refresh during an active game: the user should restart safely without corrupting a prior completed run.
3. Two tabs: repeated completion with the same idempotency key must collapse to one result.
4. Malformed result payload: the server must reject impossible scores/durations/game IDs.
5. Share link tampering: challenge payloads must be validated before being accepted by the game launcher.

---

### Task 1: Define the Play domain contract

**Files:**
- Create: `lib/play/types.ts`
- Create: `lib/play/constants.ts`
- Create: `lib/play/catalog.ts`
- Test: `tests/play-contract.test.ts`

**Interfaces:**
- Produces `GameDefinition`, `GameRunStatus`, `GameResult`, `GameMoment`, and `PrototypeGameId`.
- `GameDefinition` fields: `id`, `name`, `family`, `version`, `mode`, `estimatedDurationSeconds`, `solo`, `shareable`, `unlock`, `createMoment`.

- [ ] Step 1: Write failing tests asserting all three prototype IDs are present and every definition satisfies the shared contract.
- [ ] Step 2: Run `npm test -- tests/play-contract.test.ts` and verify failure because the contract files do not exist.
- [ ] Step 3: Implement the shared types and three definitions in `lib/play/catalog.ts`.
- [ ] Step 4: Run the test and verify PASS.
- [ ] Step 5: Commit the domain contract.

### Task 2: Implement deterministic seeds and lifecycle

**Files:**
- Create: `lib/play/seed.ts`
- Create: `lib/play/session.ts`
- Test: `tests/play-session.test.ts`

**Interfaces:**
- `createGameSeed(input: string): string`
- `createGameRunKey(playerId: string, gameId: string, clientRunId: string): string`
- `startGameRun(): GameRun`
- `completeGameRun(): GameResult`
- `abandonGameRun(): GameResult`

- [ ] Step 1: Write failing tests for deterministic seeds, valid status transitions, restart, abandon, and duplicate completion.
- [ ] Step 2: Run the targeted tests and verify failure.
- [ ] Step 3: Implement the minimal pure lifecycle/state machine.
- [ ] Step 4: Run targeted tests and verify PASS.
- [ ] Step 5: Commit.

### Task 3: Add persistence and RLS

**Files:**
- Create: `supabase/migrations/20260928050000_create_play_runs.sql`
- Modify: `lib/supabase/database.types.ts`
- Test: `tests/play-persistence-contract.test.ts`

**Interfaces:**
- Table `play_game_runs`: `id`, `player_id`, `game_id`, `game_version`, `seed`, `client_run_id`, `status`, `score`, `duration_ms`, `metadata`, `idempotency_key`, timestamps.
- Unique key: `(player_id, idempotency_key)`.
- Owner-only authenticated SELECT/INSERT/UPDATE.
- No anonymous access.

- [ ] Step 1: Write a schema contract test covering uniqueness, status vocabulary, and required fields.
- [ ] Step 2: Apply the migration and verify the tables/RLS exist in Supabase.
- [ ] Step 3: Regenerate TypeScript database types.
- [ ] Step 4: Run targeted tests and database verification.
- [ ] Step 5: Commit.

### Task 4: Build the server result boundary

**Files:**
- Create: `app/api/play/result/route.ts`
- Create: `lib/play/server.ts`
- Test: `tests/play-result-validation.test.ts`

**Interfaces:**
- `POST /api/play/result`
- Request: `{ gameId, gameVersion, clientRunId, seed, status, score, durationMs, metadata }`
- Response: `{ ok, runId, progression, moment }`

- [ ] Step 1: Write failing validation tests for invalid game ID, score, duration, stale version, malformed metadata, duplicate idempotency key.
- [ ] Step 2: Verify failures.
- [ ] Step 3: Implement authenticated server validation and persistence.
- [ ] Step 4: Call the existing SYSTEM progression service only after a new game result is persisted.
- [ ] Step 5: Use `source_type=game`, `source_id=gameId`, `dimensionKey=play`, and an idempotency key derived from the persisted run.
- [ ] Step 6: Verify duplicate requests return the existing run and do not create another progression event.
- [ ] Step 7: Commit.

### Task 5: Build the PLAY shell

**Files:**
- Create: `app/play/page.tsx`
- Create: `app/play/play.css`
- Create: `app/play/play-client.tsx`

**Interfaces:**
- One primary `PLAY NOW` action.
- A small explanation of why the selected game is being shown.
- Game viewport.
- Result/Moment panel.
- Restart and exit controls.

- [ ] Step 1: Write component-level tests for selection and terminal states.
- [ ] Step 2: Implement the authenticated PLAY route.
- [ ] Step 3: Render the selected definition without exposing engine internals.
- [ ] Step 4: Add mobile-first styling and keyboard-visible focus.
- [ ] Step 5: Run typecheck/tests.

### Task 6: Prototype ECHO GRID

**Files:**
- Create: `lib/play/games/echo-grid.ts`
- Create: `app/play/games/echo-grid.tsx`
- Test: `tests/echo-grid.test.ts`

**Interfaces:**
- Pure game state machine with deterministic seed.
- Actions: move, rotate, pulse.
- Delayed echo queue.
- Terminal result containing score, collisions, path length.

- [ ] Step 1: Write failing deterministic simulation tests.
- [ ] Step 2: Implement the grid rules.
- [ ] Step 3: Render the board with accessible keyboard and pointer input.
- [ ] Step 4: Emit a normalized result to the PLAY shell.
- [ ] Step 5: Run targeted tests.

### Task 7: Prototype SHADOW FORGE

**Files:**
- Create: `lib/play/games/shadow-forge.ts`
- Create: `app/play/games/shadow-forge.tsx`
- Test: `tests/shadow-forge.test.ts`

**Interfaces:**
- Behavior sequence editor.
- Deterministic replay.
- Limited edit budget.
- Result containing completion, efficiency, edits used.

- [ ] Step 1: Write failing simulation and edit-budget tests.
- [ ] Step 2: Implement the state machine.
- [ ] Step 3: Render the sequence editor and replay.
- [ ] Step 4: Normalize results into the shared contract.
- [ ] Step 5: Run targeted tests.

### Task 8: Prototype RULEFALL

**Files:**
- Create: `lib/play/games/rulefall.ts`
- Create: `app/play/games/rulefall.tsx`
- Test: `tests/rulefall.test.ts`

**Interfaces:**
- Deterministic rule sequence.
- Visible current rule encoded through environment.
- Success/failure actions.
- Result containing rule streak, score and mistakes.

- [ ] Step 1: Write failing rule-transition tests.
- [ ] Step 2: Implement the deterministic rule machine.
- [ ] Step 3: Render a fast input surface.
- [ ] Step 4: Normalize results.
- [ ] Step 5: Run targeted tests.

### Task 9: Moments and deep links

**Files:**
- Modify: `lib/play/catalog.ts`
- Create: `lib/play/moment.ts`
- Modify: `app/play/page.tsx`
- Test: `tests/play-moment.test.ts`

**Interfaces:**
- `createMoment(result)`
- Deep-link query: `/play?game=<id>&seed=<seed>&challenge=<payload>`

- [ ] Step 1: Write failing Moment/deep-link validation tests.
- [ ] Step 2: Implement compact share payloads.
- [ ] Step 3: Validate challenge parameters before launching.
- [ ] Step 4: Add native share/copy behavior.
- [ ] Step 5: Run targeted tests.

### Task 10: World integration

**Files:**
- Modify: `app/home/page.tsx`
- Modify: `app/home/home-world.css`
- Test: `tests/play-navigation.test.ts`

- [ ] Step 1: Write the navigation assertion for the single PLAY action.
- [ ] Step 2: Add the PLAY entry without increasing the top-level door count unnecessarily.
- [ ] Step 3: Verify keyboard and mobile presentation.
- [ ] Step 4: Commit.

### Task 11: Full verification and browser QA

**Files:**
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-09-28-play-universe.md`

- [ ] Step 1: Run `npm run typecheck`.
- [ ] Step 2: Run `npm test`.
- [ ] Step 3: Run `npm run build`.
- [ ] Step 4: Inspect Supabase security/performance advisors.
- [ ] Step 5: Deploy to Render through the normal main/QA pipeline.
- [ ] Step 6: Run real-browser tests: normal entry, PLAY, all three prototypes, rapid clicks, restart, abandon, complete, refresh, back/forward, mobile 390x844, and deep-link challenge.
- [ ] Step 7: Correct failures and rerun the full gate.
- [ ] Step 8: Only mark the module validated after fresh evidence covers every gate.
