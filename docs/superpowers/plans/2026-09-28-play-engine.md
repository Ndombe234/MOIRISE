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

- [x] Record current Module 6 status from the code, not from stale README text.
- [x] Record current PLAY routes, components, definitions, migrations and tests.
- [x] Record the decision that there is no fixed game-count promise.
- [x] Record the one-button PLAY contract.
- [x] Keep this branch isolated from `main`.

## Task 1 — Active experience registry

**Files:**
- Modify: `lib/play/definitions.ts`
- Test: `tests/play-selector.test.ts`

- [x] Treat the registry as the active curated set, not a fixed product inventory.
- [x] Keep experience definitions typed and small.
- [x] Ensure every registered experience has a safe launch path.
- [x] Make an allowlist function available to the server session boundary.
- [x] Test registry uniqueness and lookup.

## Task 2 — Player-specific deterministic selection

**Files:**
- Modify: `lib/play/selector.ts`
- Modify: `lib/play/types.ts`
- Modify: `lib/play/server.ts`
- Test: `tests/play-selector.test.ts`
- Create/Modify: `tests/play-context.test.ts`

- [x] Use level gating, SYSTEM dimension affinity, recent-game avoidance and session-duration fit.
- [x] Preserve deterministic tie-breaking.
- [x] Add explicit novelty so the SYSTEM can introduce an unseen experience without permanently classifying the Player.
- [x] Keep future preference signals optional.
- [x] Ensure the same input context always produces the same selection.

## Task 3 — Single-entry PLAY surface

**Files:**
- Modify: `app/play/page.tsx`
- Modify: `components/play/play-launcher.tsx`
- Modify: `app/play/play.css`

- [x] Remove all catalogue/grid presentation from the main PLAY route.
- [x] Keep exactly one primary PLAY action.
- [x] Show only the selected experience's concise title/reason and the primary action.
- [x] Keep SYSTEM and World return navigation minimal.
- [x] Add honest loading/error/empty states.

## Task 4 — Server session boundary hardening

**Files:**
- Modify: `lib/play/session-actions.ts`
- Modify: `app/play/actions.ts`
- Modify: `supabase/migrations/20260928050000_play_sessions.sql`

- [x] Prevent arbitrary experience IDs at the database RPC boundary.
- [x] Keep challenges server-generated.
- [x] Reject expired/replayed sessions.
- [x] Preserve owner checks.
- [x] Ensure malformed client action logs cannot alter progression.

## Task 5 — Result/progression integrity

**Files:**
- Modify: `lib/play/result-validation.ts`
- Modify: `app/play/actions.ts`
- Modify: `supabase/migrations/20260928040000_play_progression.sql`
- Modify: `supabase/migrations/20260928041000_extend_system_play_progression.sql`
- Tests: `tests/play-result-validation.test.ts` and progression coverage

- [x] Ensure the result boundary is fully server-authoritative.
- [x] Verify one attempt can create at most one progression event.
- [x] Verify conflicting retries are duplicates rather than new rewards.
- [x] Ensure invalid runs cannot receive progression.

## Task 6 — Play Lab experience quality

**Files:**
- Existing: `components/play/*`
- Existing: `lib/play/games/*`
- Existing: `tests/*play*.test.ts`

- [x] Audit the three current experiments.
- [x] Preserve only mechanics that are genuinely fun and understandable.
- [x] Fix restart, completion, touch and keyboard edge cases.
- [x] Keep them lightweight and original.
- [x] Do not add more games merely to increase a count.

## Task 7 — Verification

- [x] Run typecheck.
- [x] Run complete unit suite.
- [x] Lint is not run by the repository CI workflow; build/typecheck/test gates are green. Browser QA is the current scope check.
- [x] Run production build.
- [ ] Authenticated PLAY browser QA pending a configured QA session/service-role deployment environment.
- [x] Public/browser inspection confirmed the unauthenticated PLAY gate; single-entry UI is covered by the branch code and build.
- [x] Unit tests cover level, recent-game cooldown, preference signals, novelty and deterministic tie-breaking.
- [ ] Full live play-through pending an authenticated QA session.
- [x] Unit/security checks cover result validation, idempotency and protected direct access; live authenticated flow remains pending.
- [x] Mobile/public browser protection was exercised; full authenticated 390x844 game play remains pending.
- [x] Live public home and `/play` checks reported no console/runtime errors.

## Task 8 — Documentation and release evidence

**Files:**
- Update: Module 6 spec
- Update: this plan
- Update: `docs/MOIRISE-ROADMAP.md`

- [x] Record the final PLAY decisions.
- [x] Record the three current registered prototype experiences.
- [x] Record tests/build/browser evidence.
- [ ] Mark Module 6 complete only after the server-only Supabase environment is configured, the integrity migration is applied to the deployment database, and authenticated browser QA passes.
