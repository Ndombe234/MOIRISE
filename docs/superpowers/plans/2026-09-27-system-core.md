# MORISE Module 2 SYSTEM Core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the authenticated `/system` placeholder into a real persistent SYSTEM engine with deterministic progression, secure PostgreSQL persistence, a server view-model/API boundary, and a polished responsive UI.

**Architecture:** Keep PostgreSQL authoritative for progression. A focused SYSTEM domain/service layer owns the read model, validation, level math, idempotent RPC calls, and mutation orchestration; Next.js server routes/actions expose only authenticated product boundaries. The SYSTEM page renders a consolidated view model and deeper routes reuse the same service.

**Tech Stack:** Next.js App Router 16, TypeScript, React, Supabase SSR/PostgREST, PostgreSQL, Vitest, Browser Use, Render.

**Spec:** `docs/superpowers/specs/2026-09-27-system-core-design.md`

## Global Constraints

- Level 1 starts at 0 XP; `threshold(level) = floor(100 * (level - 1)^1.65)` for level >= 2.
- v1 dimensions are exactly `exploration`, `creation`, `knowledge`, `social`, `community`, `play`, `contribution`.
- The first positive XP milestone is `player_identity_completed`, exactly 25 XP, no dimension assignment, exactly once per Player.
- Authenticated clients never directly mutate SYSTEM aggregate or event tables.
- Progression is persisted by an atomic, idempotent PostgreSQL RPC and duplicate retries never grant twice.
- Anonymous users have no SYSTEM table access and no progression RPC execution.
- The UI consumes one normalized SYSTEM view model and does not independently calculate progression.
- Every visible progression value must come from real persisted data or deterministic rules; no fake activity.
- Future modules must use the shared progression contract rather than writing SYSTEM aggregates directly.
- Module 2 is not complete until database, API/service, UI, unit, integration/security, browser, mobile/desktop, Render, and documentation gates are all verified.

## Review Focus

1. Two simultaneous identical progression calls must create one event and one reward.
2. A conflicting retry with the same idempotency key must not apply another reward.
3. A direct authenticated table mutation must be rejected even when the Player owns the row.
4. A forged `player_id` must be rejected at the RPC/API boundary.
5. The initialization and identity-completion memories must remain deterministic across refreshes, retries, and two tabs.

### Task 1: SYSTEM domain math, validation, and read-model types

**Files:**
- Create: `lib/system/constants.ts`
- Create: `lib/system/progression.ts`
- Create: `lib/system/validation.ts`
- Create: `lib/system/types.ts`
- Create: `tests/system-progression.test.ts`
- Create: `tests/system-validation.test.ts`

**Interfaces:**
- Consumes: Module 1 Player types from `lib/supabase/database.types.ts`.
- Produces: `SYSTEM_DIMENSIONS`, `SystemDimensionKey`, `levelThreshold(level)`, `levelForXp(totalXp)`, `progressForXp(totalXp)`, `validateProgressionPayload(payload)`, and the public `SystemViewModel`/row types used by later tasks.

- [ ] **Step 1: Write the failing progression tests** covering threshold(1)=0, threshold(2)=100, deterministic level boundaries, and percentage clamping.
- [ ] **Step 2: Run the focused tests and verify they fail** because the SYSTEM domain helpers do not yet exist.
- [ ] **Step 3: Implement the minimal pure progression helpers** with the exact spec curve and no database access.
- [ ] **Step 4: Run the focused progression tests and verify they pass.**
- [ ] **Step 5: Write failing validation tests** for all seven dimensions, identity-completion event constraints, XP=25, source type `player`, and idempotency-key requirements.
- [ ] **Step 6: Run the validation tests and verify the intended failures.**
- [ ] **Step 7: Implement SYSTEM constants, payload validation, and stable view-model types.**
- [ ] **Step 8: Run both focused test files and verify green.**
- [ ] **Step 9: Commit** with `feat: add system progression domain`.

### Task 2: PostgreSQL SYSTEM persistence, RLS, RPC, and integration checks

**Files:**
- Create/modify: `supabase/migrations/20260927020000_module2_system_core.sql`
- Create: `tests/system-database.sql` (or the repository's established database-test location)
- Regenerate: `lib/supabase/database.types.ts`

**Interfaces:**
- Consumes: Task 1 dimension constants and progression contract.
- Produces: `system_profiles`, `system_dimensions`, `system_progression_events`, `system_memories`, `system_level_threshold`, `system_level_for_xp`, `ensure_system_profile`, and `record_system_progress_event`.

- [ ] **Step 1: Write failing database checks** for owner-only SELECT, blocked direct writes, anonymous denial, RPC owner check, identity-completion precondition, and idempotency.
- [ ] **Step 2: Run the database checks against the current project and record the expected missing-object failures.**
- [ ] **Step 3: Implement/fix the migration** so tables, constraints, indexes, RLS, grants, and security-definer functions match the spec exactly.
- [ ] **Step 4: Ensure the RPC strictly accepts only the v1 identity milestone in Module 2, enforces `onboarding_completed=true`, awards exactly 25 XP, and rejects dimension assignment.**
- [ ] **Step 5: Verify duplicate and concurrent calls resolve through the uniqueness constraint without double XP.**
- [ ] **Step 6: Apply the migration to Supabase and run focused SQL checks for schema, policies, grants, and RPC behavior.**
- [ ] **Step 7: Regenerate TypeScript database types and run typecheck.**
- [ ] **Step 8: Run Supabase security and performance advisors; resolve all Module 2 findings before proceeding, explicitly noting any platform-level warning that predates Module 2.**
- [ ] **Step 9: Commit** with `feat: add system persistence and rpc`.

### Task 3: SYSTEM server service, read model, and API boundary

**Files:**
- Create: `lib/system/server.ts`
- Create: `lib/system/service.ts`
- Create: `app/api/system/route.ts`
- Create: `app/api/system/progress/route.ts`
- Create: `tests/system-service.test.ts`

**Interfaces:**
- Consumes: Task 1 types/helpers and Task 2 tables/RPC.
- Produces: `getSystemViewModel()`, `recordSystemProgress()`, GET `/api/system`, POST `/api/system/progress`.

- [ ] **Step 1: Write failing service tests** proving the returned view model includes identity, level, total XP, current-level XP, next-level XP, progress percent, seven dimensions, recent memories, and recent events.
- [ ] **Step 2: Run the focused service tests and verify failure because the service is absent.**
- [ ] **Step 3: Implement the server-only authenticated SYSTEM service** with one consolidated read path and RPC-backed mutation path.
- [ ] **Step 4: Add route handlers** that reject anonymous callers, reject forged player IDs, validate payloads, map RPC duplicate responses to deterministic JSON, and never expose a service-role key.
- [ ] **Step 5: Run focused service/API tests and verify green.**
- [ ] **Step 6: Commit** with `feat: add system service and api`.

### Task 4: Player milestone integration and deterministic SYSTEM initialization

**Files:**
- Modify: `app/player/actions.ts`
- Modify: `lib/player/server.ts` where needed for initialization semantics
- Modify: `lib/supabase/database.types.ts` as required by generated types
- Extend: `tests/player-validation.test.ts` and/or create `tests/player-system-integration.test.ts`

**Interfaces:**
- Consumes: Task 3 `recordSystemProgress()`.
- Produces: a single real transition from `onboarding_completed=false` to `true` that triggers the 25 XP SYSTEM milestone, with safe retry behavior.

- [ ] **Step 1: Write a failing integration/unit test** for false→true onboarding transition awarding exactly 25 XP once.
- [ ] **Step 2: Run the test and verify it fails because Player updates do not yet call SYSTEM progression.**
- [ ] **Step 3: Implement the transition-aware Player update**: only a real successful identity save that changes onboarding state may request `player_identity_completed`.
- [ ] **Step 4: Preserve existing Player validation and handle conflict/error behavior without partial success messaging.**
- [ ] **Step 5: Add retry/two-tab coverage through the shared idempotency key and verify no second reward.
- [ ] **Step 6: Run Player + SYSTEM tests and typecheck.
- [ ] **Step 7: Commit** with `feat: connect player milestone to system`.

### Task 5: Real SYSTEM UI and progressive disclosure routes

**Files:**
- Modify: `app/system/page.tsx`
- Create: `app/system/system-view.tsx` or focused client components as needed
- Create: `app/system/progression/page.tsx`
- Create: `app/system/history/page.tsx`
- Create: `app/system/memories/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: Task 3 `SystemViewModel`.
- Produces: a server-rendered SYSTEM shell with identity, progression, seven dimensions, memories, recent activity, and nested routes.

- [ ] **Step 1: Write focused render/data tests where practical for empty state, level 1/0 XP, seven dimensions, and post-milestone state.
- [ ] **Step 2: Implement the main SYSTEM surface with progressive disclosure, honest zero state, and no client-side progression math.
- [ ] **Step 3: Implement nested SYSTEM routes using the same server service and shared visual shell.
- [ ] **Step 4: Refine responsive styling for desktop and 390x844 mobile, preserving the premium/dark/futuristic restrained direction.
- [ ] **Step 5: Run typecheck, unit tests, and production build locally through the repository's existing commands.
- [ ] **Step 6: Commit** with `feat: build the system interface`.

### Task 6: End-to-end validation, security review, Render deployment, and documentation

**Files:**
- Modify: `README.md`
- Update: Module 2 spec status only after all gates pass.

**Interfaces:**
- Consumes: all completed Tasks 1–5.
- Produces: verified live Module 2 behavior and traceable evidence.

- [ ] **Step 1: Run the complete unit/typecheck/build suite and record exact results.
- [ ] **Step 2: Apply/fresh-check Supabase migration state, schema, RLS, grants, RPC, and advisor output.
- [ ] **Step 3: Use Browser Use on the live Render deployment to verify Auth -> Player -> SYSTEM -> identity milestone -> SYSTEM result -> reload persistence.
- [ ] **Step 4: Verify desktop and 390x844 mobile: no horizontal overflow, no runtime/console errors, correct direct nested routes, back/forward behavior, empty state, and session-expiry behavior.
- [ ] **Step 5: Exercise duplicate submission/retry behavior from the browser or API boundary and verify the database has one event and one 25 XP reward.
- [ ] **Step 6: Run a fresh whole-branch code/security review against the spec, focusing on RLS/SECURITY DEFINER/search_path/IDOR/XSS/replay/concurrency.
- [ ] **Step 7: Fix any Critical/Important findings with RED→GREEN tests, then rerun the full suite.
- [ ] **Step 8: Confirm Render live deployment and inspect runtime logs for relevant errors.
- [ ] **Step 9: Update README/spec status only when every Definition of Done gate is evidenced; otherwise document the remaining unverified gate.
- [ ] **Step 10: Commit** with `docs: validate module 2 system core`.

