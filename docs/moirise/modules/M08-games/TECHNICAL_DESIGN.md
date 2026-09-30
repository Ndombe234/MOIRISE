# M08 — Games & Quiz Platform — CONCEPTION TECHNIQUE

## 1. Boundary and architecture
Fournir l'entrée Play, catalogue, lancement et exécution des jeux 2D/3D et quiz, sessions, sauvegarde, validation des résultats et partage.

~~~text
Route/UI
→ use case
→ policy
→ domain
→ repository/adapter
→ storage or job system
→ event + observability
~~~

Dependencies: M01, M02, M03, M11, M13, M16.

## 2. Canonical contracts

Command envelope:
~~~text
{ commandId, actorIdFromSession, requestId, idempotencyKey?, payload, schemaVersion }
~~~

Result envelope:
~~~text
{ ok, data?, error?, traceId, version? }
~~~

No client-supplied actorId or role is authoritative.

## 3. Domain entities
GameDefinition; GameVersion; GameSession; GameSave; QuizDefinition; Attempt; Result; LeaderboardEntry; ShareToken.

Each persistent entity must specify owner key, lifecycle, uniqueness, indexes, timestamps, privacy class and delete/retention behavior.

## 4. Commands
### 1. PUBLISH_GAME
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PUBLISHED; GAME_STARTED; GAME_PAUSED; GAME_SAVED; GAME_COMPLETED; GAME_RESULT_VALIDATED; QUIZ_STARTED; QUIZ_COMPLETED; RESULT_SHARED..

### 2. START_GAME
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PUBLISHED; GAME_STARTED; GAME_PAUSED; GAME_SAVED; GAME_COMPLETED; GAME_RESULT_VALIDATED; QUIZ_STARTED; QUIZ_COMPLETED; RESULT_SHARED..

### 3. PAUSE_GAME
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PUBLISHED; GAME_STARTED; GAME_PAUSED; GAME_SAVED; GAME_COMPLETED; GAME_RESULT_VALIDATED; QUIZ_STARTED; QUIZ_COMPLETED; RESULT_SHARED..

### 4. SAVE_GAME
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PUBLISHED; GAME_STARTED; GAME_PAUSED; GAME_SAVED; GAME_COMPLETED; GAME_RESULT_VALIDATED; QUIZ_STARTED; QUIZ_COMPLETED; RESULT_SHARED..

### 5. RESUME_GAME
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PUBLISHED; GAME_STARTED; GAME_PAUSED; GAME_SAVED; GAME_COMPLETED; GAME_RESULT_VALIDATED; QUIZ_STARTED; QUIZ_COMPLETED; RESULT_SHARED..

### 6. SUBMIT_RESULT
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PUBLISHED; GAME_STARTED; GAME_PAUSED; GAME_SAVED; GAME_COMPLETED; GAME_RESULT_VALIDATED; QUIZ_STARTED; QUIZ_COMPLETED; RESULT_SHARED..

### 7. SHARE_RESULT
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PUBLISHED; GAME_STARTED; GAME_PAUSED; GAME_SAVED; GAME_COMPLETED; GAME_RESULT_VALIDATED; QUIZ_STARTED; QUIZ_COMPLETED; RESULT_SHARED..

### 8. START_QUIZ
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PUBLISHED; GAME_STARTED; GAME_PAUSED; GAME_SAVED; GAME_COMPLETED; GAME_RESULT_VALIDATED; QUIZ_STARTED; QUIZ_COMPLETED; RESULT_SHARED..

### 9. SUBMIT_QUIZ.
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PUBLISHED; GAME_STARTED; GAME_PAUSED; GAME_SAVED; GAME_COMPLETED; GAME_RESULT_VALIDATED; QUIZ_STARTED; QUIZ_COMPLETED; RESULT_SHARED..

## 5. Queries
### 1. LIST_GAMES
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 2. GET_GAME
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 3. GET_VERSION
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 4. GET_SESSION
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 5. GET_SAVE
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 6. GET_RESULT
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 7. GET_LEADERBOARD
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 8. GET_QUIZ.
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

## 6. State machines
version DRAFT → TESTING → VALIDATED → PUBLISHED/DEPRECATED; session CREATED → RUNNING → PAUSED → COMPLETED/ABANDONED; result SUBMITTED → VALIDATING → ACCEPTED/REJECTED.

Transition implementation requirements:
- explicit enum;
- guard function per transition;
- side effects after successful state persistence;
- recovery state for asynchronous work;
- no client-side direct state promotion.

## 7. Storage design
Storage entities: GameDefinition; GameVersion; GameSession; GameSave; QuizDefinition; Attempt; Result; LeaderboardEntry; ShareToken.
Required index categories:
- ownership lookup;
- current-state lookup;
- createdAt/recent lookup;
- foreign-key lookup;
- uniqueness where business-critical.

For large collections use cursor pagination and projections.

## 8. Async task design

When a command becomes an asynchronous task:
~~~text
created → queued → leased → running → validating → completed
                          ↘ failed → retryable/terminal
~~~

Lease expiry must not cause duplicate side effects. Use an idempotency key and result reference.

## 9. UI/state handling
Play hub; game card; runtime shell; save/resume; quiz flow; results; leaderboard; share.

Each action has:
IDLE → SUBMITTING/LOADING → SUCCESS | EMPTY | ERROR | UNAVAILABLE | DEGRADED.

The UI never decides whether the player is allowed to perform a privileged action.

## 10. AI integration
game recommendation and optional adaptive content; AI-generated games enter M09 and must pass validation before execution.

Integration pattern:
~~~text
module request
→ M19 capability ID
→ policy/context
→ provider/local/worker route
→ result validation
→ module-specific validation
→ commit
~~~

For generated artifacts, keep provenance and version refs.

## 11. Security
result validation server-side where competitive; share token privacy; runtime package sandbox; no arbitrary privileged JS.

Threat model:
- forged identity;
- replay;
- privilege escalation;
- cross-user read;
- data leakage;
- untrusted generated output;
- resource exhaustion.

Mitigation: server auth, RLS/policy, bounded inputs, rate limits, sandboxing, content validation and audit.

## 12. Events
Owned events: GAME_PUBLISHED; GAME_STARTED; GAME_PAUSED; GAME_SAVED; GAME_COMPLETED; GAME_RESULT_VALIDATED; QUIZ_STARTED; QUIZ_COMPLETED; RESULT_SHARED.
An event contains IDs and safe metadata rather than full private payloads.

## 13. Failure matrix

| Failure | Action | Persistent result |
|---|---|---|
| invalid input | reject | none |
| unauthorized | reject | none |
| dependency timeout | retry if policy permits | queued/degraded |
| provider unavailable | fallback/degrade | no false success |
| worker lost | expire lease | requeue if idempotent |
| duplicate request | return prior proof | no duplicate side effect |
| stale version | conflict | authoritative state preserved |
| storage failure | rollback | no partial completion |

## 14. Observability

Record requestId/traceId, operation, latency, outcome, dependency result, cache behavior and error code. For media/game jobs include jobId and artifactId. Avoid raw private content.

## 15. Performance

Use progressive disclosure, bounded queries, lazy loading, worker queues for heavy work, and backpressure. Never make the entire application wait for optional AI generation.

## 16. Test plan

Unit: validators, guards, transitions, idempotency.
Integration: auth + storage + event.
Contract: AI capabilities/provider adapters when relevant.
E2E: every button, route, save/reload and recovery.
Mobile: touch, keyboard, viewport.
Resilience: retries, reconnect, dependency outage, concurrent mutation.

## 17. Implementation runbook

1. Inventory existing source that maps to this responsibility.
2. Mark code that is reusable, obsolete or conflicting.
3. Freeze the canonical types.
4. Establish server authorization.
5. Establish data migrations and constraints.
6. Implement repository adapters.
7. Implement domain transitions.
8. Implement event publication.
9. Implement UI states.
10. Add AI integration only through M19.
11. Add tests.
12. Run build/typecheck/lint.
13. Browser test desktop/mobile.
14. Verify no blank-screen path.
15. Record completion evidence.

## 18. Puzzle sheet

Owner: M08
Commands: PUBLISH_GAME; START_GAME; PAUSE_GAME; SAVE_GAME; RESUME_GAME; SUBMIT_RESULT; SHARE_RESULT; START_QUIZ; SUBMIT_QUIZ.
Queries: LIST_GAMES; GET_GAME; GET_VERSION; GET_SESSION; GET_SAVE; GET_RESULT; GET_LEADERBOARD; GET_QUIZ.
States: version DRAFT → TESTING → VALIDATED → PUBLISHED/DEPRECATED; session CREATED → RUNNING → PAUSED → COMPLETED/ABANDONED; result SUBMITTED → VALIDATING → ACCEPTED/REJECTED.
Events: GAME_PUBLISHED; GAME_STARTED; GAME_PAUSED; GAME_SAVED; GAME_COMPLETED; GAME_RESULT_VALIDATED; QUIZ_STARTED; QUIZ_COMPLETED; RESULT_SHARED.
AI: game recommendation and optional adaptive content; AI-generated games enter M09 and must pass validation before execution.
Critical data: catalog; versions; runtime sessions; saves; attempts; results; leaderboards.
Security: result validation server-side where competitive; share token privacy; runtime package sandbox; no arbitrary privileged JS.
Acceptance: 2D and 3D runtime boundaries, save/resume, result validation, quiz path, share, mobile controls.

Any unresolved field is a documentation defect, not a coding invitation to guess.