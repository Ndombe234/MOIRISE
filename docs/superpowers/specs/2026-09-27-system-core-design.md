# MORISE — Module 2 SYSTEM Core Design Specification

Date: 2026-09-27
Status: DESIGN — awaiting user review before implementation

## 1. Purpose

Module 2 turns the current authenticated `/system` placeholder into MORISE's first real SYSTEM engine.

The SYSTEM is the persistent, personal, evolving dossier of a Player. It is not a conventional dashboard and it does not invent activity. Every visible progression value must be backed by a real persisted event, a deterministic rule, or a real Player record.

The module must establish the durable foundation that later modules can extend with activities, games, communities, discovery, creation, and social mechanics without replacing the SYSTEM core.

## 2. Product intent

The validated product direction is:

- The Player is the center of MORISE.
- SYSTEM is a dedicated destination, not a popup.
- The interface stays small while the engine can become deep.
- Solo use is valid and useful.
- A Player is not forced into a class, identity, profession, or community.
- Different Players can follow different trajectories from the same starting structure.
- Progression emerges from real actions.
- Social, game, discovery, community, and activity modules can later contribute real events to the SYSTEM.
- The interface reveals complexity progressively instead of exposing the entire data model at once.

## 3. Module 2 scope

### In scope

1. SYSTEM domain model and persistence.
2. SYSTEM read model for the current Player.
3. Deterministic XP and level progression.
4. Seven extensible Player dimensions:
   - exploration
   - creation
   - knowledge
   - social
   - community
   - play
   - contribution
5. Immutable progression-event ledger with idempotency.
6. Derived dimension aggregates.
7. Significant SYSTEM memory entries.
8. Recent SYSTEM activity/events.
9. Dedicated SYSTEM interface.
10. Mobile and desktop layouts.
11. Authenticated route protection.
12. PostgreSQL constraints, RLS, grants, RPCs, and security-definer hardening.
13. API/service/RPC end-to-end mutation path.
14. Automated unit/integration coverage and browser QA.
15. One real Player milestone that can produce the first positive SYSTEM XP event.

### Explicitly out of scope

- Full social graph.
- Community creation/joining flows.
- Games.
- Global discovery engine.
- Personalized feed.
- Achievements as a separate product system.
- Leaderboards.
- User-to-user private messaging.
- AI-generated Player attributes.
- Hidden behavioral profiling.
- Admin moderation tooling.

Later modules may feed events into this SYSTEM without changing its core contract.

## 4. Domain model

### 4.1 system_profiles

One row per authenticated Player.

Purpose: stable SYSTEM-level state that is safe to query quickly.

Fields:

- `player_id uuid primary key references public.players(id) on delete cascade`
- `level integer not null default 1`
- `total_xp bigint not null default 0`
- `created_at timestamptz not null default timezone('utc', now())`
- `updated_at timestamptz not null default timezone('utc', now())`

Rules:

- Level starts at 1.
- Total XP starts at 0.
- No fabricated starting XP.
- Total XP is never directly writable by an authenticated client.
- XP changes only through the progression RPC.
- Level is derived/advanced transactionally from the resulting total XP.

### 4.2 system_dimensions

One row per Player and dimension.

Fields:

- `player_id uuid`
- `dimension_key text`
- `xp bigint not null default 0`
- `updated_at timestamptz`

Primary key:

- (`player_id`, `dimension_key`)

Allowed v1 dimensions:

- `exploration`
- `creation`
- `knowledge`
- `social`
- `community`
- `play`
- `contribution`

The key remains text rather than an enum so future modules can add dimensions through a controlled migration without changing the whole SYSTEM contract.

### 4.3 system_progression_events

Immutable source ledger for progression.

Fields:

- `id uuid primary key`
- `player_id uuid not null references public.players(id) on delete cascade`
- `event_type text not null`
- `dimension_key text nullable`
- `xp_delta integer not null`
- `idempotency_key text not null`
- `source_type text not null`
- `source_id text nullable`
- `metadata jsonb not null default '{}'::jsonb`
- `created_at timestamptz not null`

Constraints:

- `xp_delta >= 0`
- `xp_delta <= 10000` per event in v1
- dimension, when present, must be one of the existing v1 dimensions
- unique (`player_id`, `idempotency_key`)

The event ledger is immutable. Authenticated users do not receive direct UPDATE or DELETE permissions.

### 4.4 system_memories

Persistent significant moments in the Player's SYSTEM.

Fields:

- `id uuid primary key`
- `player_id uuid not null`
- `memory_key text not null`
- `title text not null`
- `description text not null`
- `source_event_id uuid nullable references public.system_progression_events(id) on delete set null`
- `importance smallint not null default 1`
- `created_at timestamptz not null`

Constraints:

- unique (`player_id`, `memory_key`)
- importance constrained to 1–5

A memory must represent a real persisted event. Module 2 will only create a small number of deterministic memories, primarily Player initialization and meaningful Player identity completion/update events.

## 5. Progression rules

### 5.1 Starting state

Every Player entering SYSTEM for the first time gets:

- level = 1
- total XP = 0
- all seven dimensions = 0
- one initialization memory based on the real Player creation event

No synthetic engagement is generated.

### 5.2 Level calculation

Level is a deterministic function of total XP.

The implementation must centralize the rule in one domain helper and one database-compatible rule set so UI, server logic, tests, and RPC results cannot diverge.

Initial v1 cumulative level thresholds:

- `threshold(1) = 0`
- `threshold(level) = floor(100 * (level - 1)^1.65)` for level >= 2

The Player's level is the greatest integer L >= 1 for which `total_xp >= threshold(L)`.

This means a Player always begins at Level 1 with 0 XP.

The UI must show:

- current level
- current total XP
- XP needed for next level
- percentage within current level

For Level L:

- current-level threshold = `threshold(L)`
- next-level threshold = `threshold(L + 1)`
- current-level XP = `total_xp - threshold(L)`
- next-level XP span = `threshold(L + 1) - threshold(L)`
- progress percentage = current-level XP divided by next-level XP span

The UI must show:

- current level
- current XP
- XP needed for next level
- percentage within current level

The exact curve is versioned by the application contract. Changing it later requires an explicit migration/version decision, not a silent code change.

### 5.3 First positive XP milestone

Module 2 does not grant XP for merely opening SYSTEM.

The first positive XP event comes from a real Player milestone:

`player_identity_completed`

It occurs only when the Player's existing `onboarding_completed` field transitions from `false` to `true` after a successful, valid Player identity save that satisfies the Module 1 validation rules.

Properties:

- fixed v1 reward: 25 XP
- no dimension assignment in v1
- one deterministic memory
- exactly once per Player
- replaying the same save cannot grant XP again

This connects SYSTEM progression to a genuine Player action rather than an artificial page-view reward.

### 5.4 Dimension XP

An event may add XP to one dimension.

The dimension never receives XP unless a real source event requests it.

A dimension can therefore remain at 0 indefinitely.

Dimension percentages are not shown unless they are mathematically meaningful from persisted data.

## 6. Atomic progression RPC

Create a PostgreSQL function conceptually equivalent to:

`public.record_system_progress_event(...)`

Responsibilities:

1. Verify the caller is authenticated.
2. Verify `auth.uid() = requested player_id`.
3. Validate event type, source type, dimension key, XP range, and source identity.
4. Detect an existing (`player_id`, `idempotency_key`) event.
5. If already present, return the existing resulting state without applying XP again.
6. Otherwise:
   - insert the immutable event,
   - increment `system_profiles.total_xp`,
   - recompute and persist level,
   - increment the dimension if one is present,
   - optionally create a deterministic SYSTEM memory,
   - return the updated SYSTEM snapshot.

For the `player_identity_completed` event, the RPC must also protect the one-time milestone semantics. A repeated request after `players.onboarding_completed = true` must not award XP again.
7. Commit as one transaction.

Security-definer requirements:

- fixed `search_path` including `pg_temp` only as appropriate;
- no dynamic SQL based on untrusted input;
- explicit ownership and execute grants;
- execution denied to `anon` and `public`;
- execution granted only to `authenticated`;
- all caller-controlled player IDs checked against `auth.uid()`.

Concurrency requirements:

- unique idempotency constraint is authoritative;
- transaction must remain correct under two simultaneous identical requests;
- duplicate requests return the same resulting state rather than duplicating XP.

## 7. Service/API architecture

### Read path

`SYSTEM page -> system service -> authenticated Supabase read -> PostgreSQL/RLS -> SYSTEM view model`

The service returns a stable view model rather than leaking raw tables into the UI.

### Mutation path

`Player/SYSTEM action -> Next.js API route or shared server service -> system service -> authenticated Supabase RPC -> PostgreSQL transaction/RLS -> view model -> UI`

Initial internal endpoints:

- `GET /api/system`
- `POST /api/system/progress`

The progression endpoint is not intended as an open public progression API. It exists as the controlled server boundary for authenticated product modules.

The existing Player update flow will integrate with the shared SYSTEM progression service for the one-time `player_identity_completed` milestone. It will not expose the raw RPC to the browser.

No service-role key is exposed to the browser.

## 8. Read model

The SYSTEM page consumes a single normalized view model conceptually:

- Player identity
- Level
- Total XP
- Current-level XP
- Next-level XP
- Progress percentage
- Seven dimensions with current XP
- Recent meaningful memories
- Recent progression events
- Empty/loading/error state metadata

The UI must not run independent progression formulas.

## 9. SYSTEM interface

### 9.1 Main surface

The default SYSTEM page contains:

1. Player identity block.
2. Level/progression block.
3. Dimension overview.
4. Recent evolution/memory block.
5. Recent activity block.
6. Navigation to deeper SYSTEM sections.

The first screen must remain understandable without knowing the database model.

### 9.2 Progressive disclosure

The interface should expose only the important summary first.

Deeper information lives behind dedicated SYSTEM sections/routes, for example:

- `/system`
- `/system/progression`
- `/system/history`
- `/system/memories`

These routes share the SYSTEM shell and use the same domain service.

### 9.3 Visual direction

Design target:

- premium
- dark
- futuristic
- restrained RPG/system influence
- modern rather than anime imitation
- strong typography
- meaningful hierarchy
- subtle motion
- no decorative fake statistics
- no excessive neon
- no copying of protected artwork, text, layouts, or character assets

### 9.4 Empty state

A brand-new Player must see a useful SYSTEM with honest zero-state messaging.

Example concept:

- Level 1
- 0 XP
- seven dimensions at 0
- first real SYSTEM memory
- clear indication that the Player's path will form through actual activity

Never simulate activity to make the interface look populated.

## 10. Memory rules

Module 2 creates only deterministic memories.

Initial candidates:

- Player entered MORISE / SYSTEM initialized.
- Player identity completed or meaningfully updated.

Future modules can provide their own memory-producing source events.

Every memory should point back to a source event when one exists.

Duplicate memory creation must be idempotent through `memory_key`.

## 11. RLS and grants

All Module 2 public tables must have RLS enabled.

Ownership model:

`auth.uid() = player_id`

Authenticated users:

- SELECT their own SYSTEM rows.
- Do not directly INSERT/UPDATE/DELETE aggregate state.
- Do not directly INSERT progression events.
- Invoke only the controlled progression RPC.

Anonymous users:

- no SYSTEM table access.
- no progression RPC execution.

Service/internal migration role:

- retains database administration privileges.

The migration must explicitly verify grants and policies after creation.

## 12. Error and edge-case behavior

Required handling:

- double-click on progression action;
- rapid repeated requests;
- two browser tabs submitting the same event;
- network loss after server acceptance;
- network retry after uncertain client response;
- refresh during mutation;
- expired session;
- invalid dimension;
- invalid event type;
- malformed idempotency key;
- excessive XP;
- duplicate idempotency key with conflicting payload;
- missing Player;
- deleted Player;
- empty SYSTEM;
- database/RPC error;
- direct access to nested SYSTEM routes;
- mobile viewport;
- slow network.

For duplicate idempotency keys, the first accepted event is authoritative. A conflicting retry must never apply a second reward.

## 13. Tests

### Unit tests

- XP threshold calculation.
- one-time identity milestone logic.
- level calculation.
- percentage calculation.
- dimension validation.
- progression payload validation.
- idempotency behavior.
- deterministic memory keys.

### Database/integration tests

- RLS owner can read own SYSTEM.
- owner cannot read another Player's SYSTEM.
- authenticated user cannot directly mutate aggregates.
- anonymous user cannot read SYSTEM.
- RPC accepts authenticated owner.
- RPC rejects wrong player ID.
- duplicate idempotency key does not duplicate XP.
- concurrent duplicate calls result in one event.
- dimension increments remain consistent with source events.
- cascade deletion removes SYSTEM data with Player.

### Browser E2E

Authenticated flow:

`Auth -> Player -> SYSTEM -> PostgreSQL/RLS -> identity completion milestone -> SYSTEM result -> reload -> persistence`

UI checks:

- desktop;
- 390x844 mobile;
- no horizontal overflow;
- no runtime errors;
- loading state;
- empty state;
- error state;
- back/forward;
- direct nested route;
- session expiry behavior.

## 14. Observability

Module 2 should emit application-level structured events for:

- system_loaded
- progression_requested
- progression_applied
- progression_duplicate
- progression_rejected
- system_error

These events are for diagnostics/analytics only and are not the source of truth for progression.

PostHog may be connected later. PostgreSQL remains authoritative for Player progression.

## 15. Performance targets

Initial goals:

- SYSTEM first render should remain lightweight on mobile.
- Avoid client-side fetching for data that can be rendered server-side.
- One consolidated SYSTEM read model rather than many sequential browser requests.
- Paginate history/memory lists.
- Avoid N+1 queries.
- Do not optimize prematurely before measuring real timings.

## 16. Security requirements

Mandatory review items:

- horizontal privilege escalation;
- RLS bypass;
- SECURITY DEFINER misuse;
- search_path manipulation;
- RPC parameter tampering;
- IDOR through player_id;
- replay/idempotency abuse;
- excessive XP injection;
- client-side trust of progression values;
- session/token leakage;
- sensitive data in rendered HTML;
- unrestricted anonymous endpoints;
- XSS through Player metadata/memory text.

## 17. Dependency boundary for future modules

Future modules must not write directly to SYSTEM aggregate tables.

Instead they should produce validated progression events through the shared progression service/RPC.

Example:

`Activity completed -> activity service -> system progression event -> SYSTEM aggregate`

`Game result -> game service -> system progression event -> SYSTEM aggregate`

`Community milestone -> community service -> system progression event -> SYSTEM aggregate`

This makes the SYSTEM the common progression engine without coupling every feature directly to its internal tables.

## 18. Definition of done

Module 2 is complete only when all of these are true:

- SYSTEM UI is real, not placeholder.
- SYSTEM database model exists.
- RLS and grants are verified.
- RPC is atomic and idempotent.
- API/service/RPC/PostgreSQL path works.
- Real Player data populates SYSTEM.
- Progression data persists after reload.
- The first positive XP reward comes from the real identity-completion milestone.
- Empty states are honest.
- Unit tests pass.
- Database/integration tests pass.
- Browser E2E passes.
- Mobile and desktop checks pass.
- Security review finds no unresolved critical issue.
- Render build is green.
- Live deployment is verified.
- Documentation matches the implemented behavior.
- No Module 2 completion claim is made before every gate passes.

## 19. Non-goals preserved

This module does not decide what MORISE's complete set of games, major functions, communities, social mechanics, or discovery systems will be.

Those canonical inventories remain separate decisions and must be researched/spec'd in their own modules.
