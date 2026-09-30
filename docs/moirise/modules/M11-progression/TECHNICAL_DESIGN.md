# M11 — Progression / Rewards / Titles / Collection — CONCEPTION TECHNIQUE

## 1. Architecture
Centraliser XP, niveaux, achievements, récompenses, collections, cartes et titres jusqu'à un espace de génération combinatoire pouvant produire jusqu'à un million de titres distincts sans pré-matérialiser un million de lignes.
Dependency boundary: M02, M03, M08, M12, M13.

~~~text
command/query
→ auth/policy
→ validator
→ domain state machine
→ transaction or queue
→ event
→ cache/read model
~~~

## 2. Canonical envelopes
~~~text
Command(commandId, actorIdFromSession, requestId, idempotencyKey?, schemaVersion, payload)
Query(requestId, actorIdFromSession?, cursor?, limit, filters)
Result(ok, data?, error?, traceId)
~~~

## 3. Entity implementation
PlayerProgress; XPTransaction; Level; Achievement; TitleDefinition; UnlockedTitle; Collection; CollectionItem; Reward; RouletteConfig; RoulettePull.
Every persistent entity needs owner, state, timestamps, version, indexes, uniqueness and privacy.

## 4. Commands
### 1 GRANT_XP
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 2 RECOMPUTE_LEVEL
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 3 UNLOCK_ACHIEVEMENT
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 4 UNLOCK_TITLE
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 5 CLAIM_REWARD
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 6 ADD_COLLECTION_ITEM
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 7 START_ROULETTE_PULL
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 8 APPLY_STREAK
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 9 REBUILD_PROJECTION.
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

## 5. Queries
### 1 GET_PROGRESS
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 2 GET_XP_HISTORY
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 3 LIST_TITLES
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 4 GET_TITLE
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 5 LIST_ACHIEVEMENTS
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 6 GET_COLLECTION
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 7 GET_REWARD_HISTORY
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 8 GET_ROULETTE_STATE.
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

## 6. State machine
progress ACTIVE; reward PENDING → GRANTED/EXPIRED; title LOCKED → UNLOCKED → EQUIPPED; pull AVAILABLE → RESOLVING → RESOLVED.
Guard functions must be pure/testable. Every asynchronous state has a recovery path.

## 7. UI states
SYSTEM progression; profile stats; title collection; achievement grid; reward inbox; roulette surface; history.
~~~text
IDLE → LOADING → SUCCESS
             ↘ EMPTY
             ↘ ERROR
             ↘ UNAVAILABLE
             ↘ DEGRADED
~~~

## 8. AI
AI may suggest achievements/titles or personalize presentation, but cannot directly grant XP, alter a roulette outcome or unlock a title without M11 validation.
All AI calls use M19 capabilities and M13 policy. No direct provider endpoint.

## 9. Security
all critical rewards server-validated; XP is ledger-based; roulette outcome generated by trusted logic with auditable seed/config; no client-controlled rarity.
Threats include replay, privilege escalation, hidden-data leakage, abuse automation and race conditions. Use server-side authorization, RLS where applicable, rate limits, immutable or append-only audit for security decisions and conflict detection.

## 10. Events
XP_GRANTED; LEVEL_CHANGED; ACHIEVEMENT_UNLOCKED; TITLE_UNLOCKED; REWARD_GRANTED; COLLECTION_UPDATED; ROULETTE_PULL_RESOLVED; STREAK_UPDATED.
Events contain safe identifiers and refs, not private payloads by default.

## 11. Special rules
XP and rewards:
- XP writes are append-only ledger entries.
- Level is a deterministic projection from validated XP.
- Title identity is deterministic from grammar version + normalized unlock parameters.
- Up to one million titles are represented by rules/grammar and materialized on unlock, not pre-created as one million rows.
- Roulette configuration is versioned; a pull stores config version, outcome, audit seed/reference and actor/session proof.
- Baseline probability configuration can be 50% common, 30% rare, 13% epic, 5% legendary, 2% mythic and a configurable pull limit; outcome must be server generated.
- No AI action directly edits XP or outcome.

## 12. Failure matrix

| Failure | Response |
|---|---|
| validation | reject, no side effect |
| unauthorized | FORBIDDEN |
| conflict | reload and return CONFLICT |
| duplicate | return previous proof |
| dependency outage | retry/degrade |
| timeout | bounded retry |
| policy changed | re-evaluate before commit |
| session expired | AUTH_REQUIRED |

## 13. Testing
Unit: state transitions, validators, deterministic rules.
Integration: storage, RLS/policy, events.
E2E: all visible actions and mobile.
Security: unauthorized access and replay.
Resilience: outage, reconnect, concurrency.

## 14. Runbook
Types → schema → authorization → domain service → event → read model → UI states → tests → browser verification → performance → security → DONE.

## 15. Puzzle sheet
Owner=M11
Commands=GRANT_XP; RECOMPUTE_LEVEL; UNLOCK_ACHIEVEMENT; UNLOCK_TITLE; CLAIM_REWARD; ADD_COLLECTION_ITEM; START_ROULETTE_PULL; APPLY_STREAK; REBUILD_PROJECTION.
Queries=GET_PROGRESS; GET_XP_HISTORY; LIST_TITLES; GET_TITLE; LIST_ACHIEVEMENTS; GET_COLLECTION; GET_REWARD_HISTORY; GET_ROULETTE_STATE.
States=progress ACTIVE; reward PENDING → GRANTED/EXPIRED; title LOCKED → UNLOCKED → EQUIPPED; pull AVAILABLE → RESOLVING → RESOLVED.
Events=XP_GRANTED; LEVEL_CHANGED; ACHIEVEMENT_UNLOCKED; TITLE_UNLOCKED; REWARD_GRANTED; COLLECTION_UPDATED; ROULETTE_PULL_RESOLVED; STREAK_UPDATED.
Data=append-only XP ledger; derived level; title grammar/rules; unlock evidence; collection; reward ledger; roulette audit.
AI=AI may suggest achievements/titles or personalize presentation, but cannot directly grant XP, alter a roulette outcome or unlock a title without M11 validation.
Security=all critical rewards server-validated; XP is ledger-based; roulette outcome generated by trusted logic with auditable seed/config; no client-controlled rarity.
Acceptance=deterministic progression; no negative XP exploit; title uniqueness; auditable rewards; configured roulette baseline and limits; collection integrity.

The document is incomplete if an implementation agent still has to guess ownership or critical state transitions.