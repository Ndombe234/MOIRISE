# M09 — Game Creation — CONCEPTION TECHNIQUE

## 1. Boundary and architecture
Permettre au Player de décrire un jeu puis faire produire par l'IA une spécification, un graphe de tâches, du code/assets/audio, un build sandboxé, des tests, une preview et un versionnement.

~~~text
Route/UI
→ use case
→ policy
→ domain
→ repository/adapter
→ storage or job system
→ event + observability
~~~

Dependencies: M03, M08, M18, M19, M13.

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
GameIdea; GameSpecification; GameTaskGraph; CodeArtifact; AssetArtifact; Build; TestRun; Preview; GamePackage; Version; Publication.

Each persistent entity must specify owner key, lifecycle, uniqueness, indexes, timestamps, privacy class and delete/retention behavior.

## 4. Commands
### 1. CREATE_GAME_PROJECT
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK..

### 2. INTERPRET_GAME_IDEA
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK..

### 3. GENERATE_SPEC
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK..

### 4. GENERATE_CODE
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK..

### 5. GENERATE_ASSET
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK..

### 6. BUILD_GAME
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK..

### 7. RUN_SIMULATION
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK..

### 8. RUN_TESTS
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK..

### 9. CREATE_PREVIEW
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK..

### 10. CREATE_VERSION
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK..

### 11. PUBLISH_GAME
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK..

### 12. ROLLBACK_VERSION.
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK..

## 5. Queries
### 1. GET_PROJECT
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 2. GET_SPEC
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 3. GET_TASK_GRAPH
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 4. GET_ARTIFACTS
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 5. GET_BUILD
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 6. GET_TESTS
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 7. GET_PREVIEW
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 8. GET_VERSIONS.
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

## 6. State machines
project IDEA → SPECIFYING → PLANNING → GENERATING → BUILDING → TESTING → PREVIEW → PUBLISHED/REJECTED; task QUEUED → RUNNING → VALIDATING → DONE/FAILED/RETRY.

Transition implementation requirements:
- explicit enum;
- guard function per transition;
- side effects after successful state persistence;
- recovery state for asynchronous work;
- no client-side direct state promotion.

## 7. Storage design
Storage entities: GameIdea; GameSpecification; GameTaskGraph; CodeArtifact; AssetArtifact; Build; TestRun; Preview; GamePackage; Version; Publication.
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
creation prompt; spec review; task graph; progress; artifact panel; build log summarized; preview; version history; publish gate.

Each action has:
IDLE → SUBMITTING/LOADING → SUCCESS | EMPTY | ERROR | UNAVAILABLE | DEGRADED.

The UI never decides whether the player is allowed to perform a privileged action.

## 10. AI integration
core AI capability; model/provider agnostic; generated code always untrusted until sandbox validation; user may accept/reject checkpoints.

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
sandbox, minimal worker payload, no production secrets, restricted network, signed package, provenance chain.

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
Owned events: GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK.
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

Owner: M09
Commands: CREATE_GAME_PROJECT; INTERPRET_GAME_IDEA; GENERATE_SPEC; GENERATE_CODE; GENERATE_ASSET; BUILD_GAME; RUN_SIMULATION; RUN_TESTS; CREATE_PREVIEW; CREATE_VERSION; PUBLISH_GAME; ROLLBACK_VERSION.
Queries: GET_PROJECT; GET_SPEC; GET_TASK_GRAPH; GET_ARTIFACTS; GET_BUILD; GET_TESTS; GET_PREVIEW; GET_VERSIONS.
States: project IDEA → SPECIFYING → PLANNING → GENERATING → BUILDING → TESTING → PREVIEW → PUBLISHED/REJECTED; task QUEUED → RUNNING → VALIDATING → DONE/FAILED/RETRY.
Events: GAME_PROJECT_CREATED; GAME_SPEC_GENERATED; GAME_TASK_CREATED; GAME_ARTIFACT_CREATED; GAME_BUILD_STARTED; GAME_BUILD_VALIDATED; GAME_PREVIEW_READY; GAME_VERSION_PUBLISHED; GAME_ROLLBACK.
AI: core AI capability; model/provider agnostic; generated code always untrusted until sandbox validation; user may accept/reject checkpoints.
Critical data: projects; specs; tasks; artifacts; builds; validation evidence; versions; provenance.
Security: sandbox, minimal worker payload, no production secrets, restricted network, signed package, provenance chain.
Acceptance: natural-language idea becomes executable GameSpecification, testable package, preview and publication only after all gates.

Any unresolved field is a documentation defect, not a coding invitation to guess.