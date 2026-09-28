# PLAY Engine & Play Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a reusable MORISE PLAY engine plus a small experimental set of original browser games that can later host the canonical 40-game inventory without changing the product shell.

**Architecture:** Authenticated PLAY shell -> deterministic selection service -> typed game definitions -> client game runtime -> server-side result/progression boundary. Small experiments use React state and pointer/keyboard input; persistence and XP remain server-controlled.

**Tech Stack:** Next.js App Router, TypeScript, React, Supabase SSR/RPC, Vitest, CSS, browser-native DOM/SVG/Canvas only where useful.

**Spec:** `docs/superpowers/specs/2026-09-28-play-engine-design.md`

## Global Constraints

- Do not redefine or claim ownership of the canonical 40-game inventory until its authoritative source is recovered.
- Keep the PLAY surface simple: one entry point, one selected experience, optional deeper browse.
- Experiences must be solo-valid and must not require live population.
- No fake players, fake scores, fake activity, or fake engagement counts.
- Client code may propose a result but must never authoritatively assign XP.
- Completion idempotency key format: `playerId:gameId:attemptId`.
- Small 2D experiments must work at 390px width without horizontal overflow.
- Avoid new third-party game engines for this phase.

## Review Focus

- Rapid restart/double submit: one attempt must not award progression twice.
- Refresh during a running or completed game: result URL/state must remain coherent and safe.
- Invalid game/result payload: server must reject it rather than trusting the client.
- Mobile touch and keyboard input: controls must remain operable and readable.
- Direct access to an experiment without auth: must redirect to sign-in.

### Task 1: PLAY domain contracts and selector

**Files:**
- Create: `lib/play/types.ts`
- Create: `lib/play/definitions.ts`
- Create: `lib/play/validation.ts`
- Create: `lib/play/selector.ts`
- Test: `tests/play-selector.test.ts`

**Interfaces:**
- Produces `GameDefinition`, `PlayContext`, `PlaySelection`, and `PlayResult` types.
- `selectNextGame(context: PlayContext, definitions: GameDefinition[]): PlaySelection` must be deterministic for the same inputs.

- [ ] Write failing tests for level gating, recent-game avoidance, dimension affinity, and deterministic tie-breaking.
- [ ] Run `npm test -- tests/play-selector.test.ts` and verify failure.
- [ ] Implement typed game definitions and selector scoring.
- [ ] Run the focused tests and verify they pass.
- [ ] Commit `feat(play): add typed play engine contracts`.

### Task 2: Result validation and SYSTEM progression boundary

**Files:**
- Create: `lib/play/result-validation.ts`
- Create: `app/play/actions.ts`
- Create: `supabase/migrations/20260928040000_play_progression.sql`
- Test: `tests/play-result-validation.test.ts`

**Interfaces:**
- `validatePlayResult(input: unknown): PlayResult` rejects malformed status, score, duration, attempt ID, and signal payloads.
- `recordPlayCompletion(gameId: string, attemptId: string, result: PlayResult)` writes one SYSTEM progression event through the existing RPC with idempotency.

- [ ] Write failing validation tests for malformed payloads and replayed attempts.
- [ ] Verify failure.
- [ ] Implement strict result validation and the authenticated server action.
- [ ] Add SQL constraints/indexes needed by the progression boundary without weakening existing SYSTEM security.
- [ ] Run unit tests and database verification.
- [ ] Commit `feat(play): validate results and connect progression`.

### Task 3: PLAY shell and experiment routing

**Files:**
- Modify: `app/play/page.tsx`
- Create: `app/play/play.css`
- Create: `app/play/[gameId]/page.tsx`
- Create: `app/play/result/[attemptId]/page.tsx`
- Create: `lib/play/server.ts`

**Interfaces:**
- `/play` authenticates the Player, chooses or accepts a game ID, and launches an experience.
- `/play/[gameId]` resolves a typed `GameDefinition` and renders the matching experiment.
- `/play/result/[attemptId]` renders a safe result context and shareable route.

- [ ] Implement the authenticated PLAY shell with loading/empty/error states.
- [ ] Add accessible game selection labels and an explicit restart action.
- [ ] Add direct result routing and share-link construction.
- [ ] Verify protected-route behavior and mobile layout.
- [ ] Commit `feat(play): build authenticated play shell`.

### Task 4: Experimental game — Echo Trace

**Files:**
- Create: `components/play/echo-trace.tsx`
- Create: `components/play/game-frame.tsx`
- Test: `tests/echo-trace.test.ts`

**Interfaces:**
- Renders a short memory/precision loop and returns a normalized `PlayResult` callback.

- [ ] Write tests for generated path length, input acceptance, completion, and restart reset.
- [ ] Implement the game using SVG/DOM rather than an external engine.
- [ ] Add keyboard and pointer/touch input.
- [ ] Verify the result is deterministic from the seeded round input.
- [ ] Commit `feat(play): add Echo Trace experiment`.

### Task 5: Experimental game — Signal Bloom

**Files:**
- Create: `components/play/signal-bloom.tsx`
- Test: `tests/signal-bloom.test.ts`

**Interfaces:**
- A timing/observation loop where the player adjusts a moving signal into a target window.

- [ ] Write tests for timing windows, success/failure, and restart.
- [ ] Implement the interaction with pointer and keyboard controls.
- [ ] Ensure the game remains legible at mobile widths.
- [ ] Commit `feat(play): add Signal Bloom experiment`.

### Task 6: Experimental game — Shadow Courier

**Files:**
- Create: `components/play/shadow-courier.tsx`
- Test: `tests/shadow-courier.test.ts`

**Interfaces:**
- A compact spatial planning game in which the player places light gates to route a shadow toward a destination.

- [ ] Write tests for valid gate placement, route completion, and failed route.
- [ ] Implement a bounded 2D board with no external engine.
- [ ] Add touch-friendly placement and reset.
- [ ] Commit `feat(play): add Shadow Courier experiment`.

### Task 7: Adaptive launch context and SYSTEM metadata

**Files:**
- Modify: `lib/play/definitions.ts`
- Modify: `app/play/page.tsx`
- Modify: `lib/play/server.ts`
- Test: `tests/play-context.test.ts`

- [ ] Test that SYSTEM level and dimensions alter the selected experiment without revealing implementation internals.
- [ ] Add a transparent `Why this game?` explanation based on the selection signals.
- [ ] Ensure recently completed games cool down rather than disappearing permanently.
- [ ] Verify no fabricated ranking or player population is displayed.
- [ ] Commit `feat(play): adapt selection to Player SYSTEM`.

### Task 8: Full verification and browser QA

**Files:**
- Modify docs and README status only after fresh evidence.

- [ ] Run `npm run typecheck`.
- [ ] Run `npm test` and record test count.
- [ ] Run `npm run build`.
- [ ] Verify migrations in Supabase.
- [ ] Verify security/performance advisors.
- [ ] Run browser QA on desktop and 390x844 for `/play`, all three experiments, restart, completion, result route, refresh, back navigation, and direct route access.
- [ ] Retest rapid clicks and replay/idempotency.
- [ ] Only after all gates pass, merge the PR and mark the module phase accordingly.