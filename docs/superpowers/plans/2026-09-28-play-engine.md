# MOIRISE Module 6 — PLAY Engine & Single PLAY Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish Module 6 as a simple single-entry PLAY system whose server-side selector chooses one appropriate experience for each Player, while the engine remains extensible to a very large internal universe.

**Architecture:** Authenticated PLAY shell → server-side Player/SYSTEM context → deterministic selector → typed experience registry → server-owned play session → game runtime → server validation → idempotent SYSTEM progression → private result/Moment route.

**Tech Stack:** Next.js App Router, TypeScript, React, Supabase SSR/RPC/PostgreSQL, Vitest, DOM/SVG/Canvas.

**Spec:** `docs/superpowers/specs/2026-09-28-play-engine-design.md`

## Global Constraints

- One visible primary PLAY action; no catalogue grid on the main PLAY page.
- The old canonical 40-game inventory is retired and must not be referenced as a requirement.
- Current experiments are prototypes and may be replaced.
- Selection must use real persisted Player/SYSTEM state and recent history.
- Selection must be deterministic and explainable.
- Client code never authoritatively assigns score or XP.
- Play sessions and challenges are server-owned.
- Replayed completions must be idempotent.
- Direct unauthenticated access redirects to authentication.
- Mobile target: 390x844 without horizontal overflow.
- No fake players, fake scores, fake activity or fake popularity.

## Task 0 — Repository preflight and state ledger

**Files:**
- Update: this plan
- Create/Update: `docs/MOIRISE-ROADMAP.md` if missing

- [ ] Record current Module 6 status from the code, not from stale README text.
- [ ] Record current PLAY routes, components, definitions, migrations and tests.
- [ ] Record the decision that there is no fixed game-count promise.
- [ ] Record the one-button PLAY contract.
- [ ] Keep this branch isolated from `main`.

## Task 1 — Active experience registry

**Files:**
- Modify: `lib/play/definitions.ts`
- Test: `tests/play-selector.test.ts`

- [ ] Treat the registry as the active curated set, not a fixed product inventory.
- [ ] Keep experience definitions typed and small.
- [ ] Ensure every registered experience has a safe launch path.
- [ ] Make an allowlist function available to the server session boundary.
- [ ] Test registry uniqueness and lookup.

## Task 2 — Player-specific deterministic selection

**Files:**
- Modify: `lib/play/selector.ts`
- Modify: `lib/play/types.ts`
- Modify: `lib/play/server.ts`
- Test: `tests/play-selector.test.ts`
- Create/Modify: `tests/play-context.test.ts`

- [ ] Use level gating, SYSTEM dimension affinity, recent-game avoidance and session-duration fit.
- [ ] Preserve deterministic tie-breaking.
- [ ] Add explicit novelty so the SYSTEM can introduce an unseen experience without permanently classifying the Player.
- [ ] Keep future preference signals optional.
- [ ] Ensure the same input context always produces the same selection.

## Task 3 — Single-entry PLAY surface

**Files:**
- Modify: `app/play/page.tsx`
- Modify: `components/play/play-launcher.tsx`
- Modify: `app/play/play.css`

- [ ] Remove all catalogue/grid presentation from the main PLAY route.
- [ ] Keep exactly one primary PLAY action.
- [ ] Show only the selected experience's concise title/reason and the primary action.
- [ ] Keep SYSTEM and World return navigation minimal.
- [ ] Add honest loading/error/empty states.

## Task 4 — Server session boundary hardening

**Files:**
- Modify: `lib/play/session-actions.ts`
- Modify: `app/play/actions.ts`
- Modify: `supabase/migrations/20260928050000_play_sessions.sql`

- [ ] Prevent arbitrary experience IDs at the database RPC boundary.
- [ ] Keep challenges server-generated.
- [ ] Reject expired/replayed sessions.
- [ ] Preserve owner checks.
- [ ] Ensure malformed client action logs cannot alter progression.

## Task 5 — Result/progression integrity

**Files:**
- Modify: `lib/play/result-validation.ts`
- Modify: `app/play/actions.ts`
- Modify: `supabase/migrations/20260928040000_play_progression.sql`
- Modify: `supabase/migrations/20260928041000_extend_system_play_progression.sql`
- Tests: `tests/play-result-validation.test.ts` and progression coverage

- [ ] Ensure the result boundary is fully server-authoritative.
- [ ] Verify one attempt can create at most one progression event.
- [ ] Verify conflicting retries are duplicates rather than new rewards.
- [ ] Ensure invalid runs cannot receive progression.

## Task 6 — Play Lab experience quality

**Files:**
- Existing: `components/play/*`
- Existing: `lib/play/games/*`
- Existing: `tests/*play*.test.ts`

- [ ] Audit the three current experiments.
- [ ] Preserve only mechanics that are genuinely fun and understandable.
- [ ] Fix restart, completion, touch and keyboard edge cases.
- [ ] Keep them lightweight and original.
- [ ] Do not add more games merely to increase a count.

## Task 7 — Verification

- [ ] Run typecheck.
- [ ] Run complete unit suite.
- [ ] Run lint.
- [ ] Run production build.
- [ ] Open authenticated PLAY in a real browser environment.
- [ ] Test the single visible PLAY entry.
- [ ] Verify selection changes when deterministic context changes.
- [ ] Play every currently registered experiment.
- [ ] Test completion, invalid run, replay, refresh, back, direct route and sign-out.
- [ ] Test 390x844 and desktop.
- [ ] Inspect console/runtime errors.

## Task 8 — Documentation and release evidence

**Files:**
- Update: Module 6 spec
- Update: this plan
- Update: `docs/MOIRISE-ROADMAP.md`

- [ ] Record the final PLAY decisions.
- [ ] Record exactly which experiments remain active.
- [ ] Record tests/build/browser evidence.
- [ ] Mark Module 6 complete only when every Definition of Done item is freshly verified.
