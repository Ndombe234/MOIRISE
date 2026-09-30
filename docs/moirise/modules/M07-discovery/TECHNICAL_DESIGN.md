# M07 — Discovery / Recommendation / Otaku Content — CONCEPTION TECHNIQUE

## 1. Boundary and architecture
Fournir recherche et découverte de joueurs, contenus sociaux, jeux et metadata Otaku avec recommandations explicables et sans pièges comportementaux.

~~~text
Route/UI
→ use case
→ policy
→ domain
→ repository/adapter
→ storage or job system
→ event + observability
~~~

Dependencies: M02, M04, M06, M15, M16.

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
DiscoveryDocument; SearchQuery; RankingContext; Recommendation; ContentMetadata; SourceReference; PreferenceSignal.

Each persistent entity must specify owner key, lifecycle, uniqueness, indexes, timestamps, privacy class and delete/retention behavior.

## 4. Commands
### 1. SAVE_SEARCH
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from SEARCH_PERFORMED; TOPIC_FOLLOWED; RECOMMENDATION_SHOWN; RECOMMENDATION_DISMISSED; CONTENT_METADATA_UPDATED..

### 2. FOLLOW_TOPIC
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from SEARCH_PERFORMED; TOPIC_FOLLOWED; RECOMMENDATION_SHOWN; RECOMMENDATION_DISMISSED; CONTENT_METADATA_UPDATED..

### 3. DISMISS_RECOMMENDATION
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from SEARCH_PERFORMED; TOPIC_FOLLOWED; RECOMMENDATION_SHOWN; RECOMMENDATION_DISMISSED; CONTENT_METADATA_UPDATED..

### 4. REPORT_RESULT
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from SEARCH_PERFORMED; TOPIC_FOLLOWED; RECOMMENDATION_SHOWN; RECOMMENDATION_DISMISSED; CONTENT_METADATA_UPDATED..

### 5. UPDATE_DISCOVERY_PREFERENCE.
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from SEARCH_PERFORMED; TOPIC_FOLLOWED; RECOMMENDATION_SHOWN; RECOMMENDATION_DISMISSED; CONTENT_METADATA_UPDATED..

## 5. Queries
### 1. SEARCH_GLOBAL
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 2. SEARCH_OTAKU
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 3. GET_TRENDING
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 4. GET_RECOMMENDATIONS
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 5. GET_CONTENT_METADATA
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 6. GET_SIMILAR_ITEMS.
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

## 6. State machines
query IDLE → EXECUTING → RESULTS/EMPTY/DEGRADED; recommendation CANDIDATE → FILTERED → RANKED → PRESENTED/DISMISSED.

Transition implementation requirements:
- explicit enum;
- guard function per transition;
- side effects after successful state persistence;
- recovery state for asynchronous work;
- no client-side direct state promotion.

## 7. Storage design
Storage entities: DiscoveryDocument; SearchQuery; RankingContext; Recommendation; ContentMetadata; SourceReference; PreferenceSignal.
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
search; filters; result cards; topic pages; recommendation rail; explanation affordance; no infinite forced loop.

Each action has:
IDLE → SUBMITTING/LOADING → SUCCESS | EMPTY | ERROR | UNAVAILABLE | DEGRADED.

The UI never decides whether the player is allowed to perform a privileged action.

## 10. AI integration
ranking assistance, metadata summarization, translation and semantic retrieval; recommendations must respect blocks, privacy and moderation.

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
ACL filter before ranking; blocked/muted content removed or suppressed; source licenses/provenance tracked.

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
Owned events: SEARCH_PERFORMED; TOPIC_FOLLOWED; RECOMMENDATION_SHOWN; RECOMMENDATION_DISMISSED; CONTENT_METADATA_UPDATED.
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

Owner: M07
Commands: SAVE_SEARCH; FOLLOW_TOPIC; DISMISS_RECOMMENDATION; REPORT_RESULT; UPDATE_DISCOVERY_PREFERENCE.
Queries: SEARCH_GLOBAL; SEARCH_OTAKU; GET_TRENDING; GET_RECOMMENDATIONS; GET_CONTENT_METADATA; GET_SIMILAR_ITEMS.
States: query IDLE → EXECUTING → RESULTS/EMPTY/DEGRADED; recommendation CANDIDATE → FILTERED → RANKED → PRESENTED/DISMISSED.
Events: SEARCH_PERFORMED; TOPIC_FOLLOWED; RECOMMENDATION_SHOWN; RECOMMENDATION_DISMISSED; CONTENT_METADATA_UPDATED.
AI: ranking assistance, metadata summarization, translation and semantic retrieval; recommendations must respect blocks, privacy and moderation.
Critical data: indexed public content only, source refs, safe preference signals; no raw private messages.
Security: ACL filter before ranking; blocked/muted content removed or suppressed; source licenses/provenance tracked.
Acceptance: search correctness, source provenance, blocked-content exclusion, explainable recommendation signals and degraded fallback.

Any unresolved field is a documentation defect, not a coding invitation to guess.