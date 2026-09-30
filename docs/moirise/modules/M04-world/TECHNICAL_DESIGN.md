# M04 — WORLD — CONCEPTION TECHNIQUE DÉTAILLÉE

## 1. Execution boundary
UI/route → server use-case → M04 policy → repository/adapter → DB/runtime → event → projection.

## 2. Command schema
```
{commandId, actorId(server-derived), capabilityId, targetRef?, expectedVersion?, payload}
```
Reject unknown capability, forged actorId, invalid payload, unauthorized target, stale version and commandId reuse with different payload.

## 3. Capability contracts
### M04.C1 Home
Input : shell READY + actor scope.
Execution : load minimal context → select 5–6 doors → compose only eligible cards.
Mutation : WorldSurfaceState.
Failure : optional source down = DEGRADED; never invent people/activity.
Security : no fake counters or urgency.

### M04.C2 Context card
Input : source event exists, cooldown passed + actor scope.
Execution : check relevance → reason key → action → expiry → show.
Mutation : ContextCard.
Failure : dismiss suppresses repeated card.
Security : reason must be explainable.

### M04.C3 Detour
Input : not typing/reading/playing/creating unless critical + actor scope.
Execution : suppress intrusive context → evaluate relevance/cooldown → offer optional detour.
Mutation : Detour.
Failure : ignored/dismissed = cooldown; source gone = remove.
Security : no manipulative urgency.

### M04.C4 Door handoff
Input : destination route enabled + actor scope.
Execution : create IntentEnvelope → destination revalidates auth and executes.
Mutation : IntentEnvelope.
Failure : destination unavailable = return to World with useful action.
Security : World doesn't mutate destination data.

### M04.C5 Solo orientation
Input : no mandatory social dependency + actor scope.
Execution : select one understandable solo action → mark orientation progress → expose optional social path.
Mutation : OrientationState.
Failure : resume must be idempotent.
Security : no fake rewards.

### M04.C6 Share discovery
Input : source is shareable + actor scope.
Execution : privacy projection → scoped expiring token → public projection.
Mutation : ShareToken.
Failure : later privacy revocation blocks token.
Security : private source never leaks.

## 4. State/persistence
State transitions are atomic around the business mutation. Unique constraints protect one-time operations. ExpectedVersion protects concurrent writes. Projection/cache is reconstructible.

## 5. Events
eventId, type, schemaVersion, producerModule, occurredAt, commandId, requestId, actorRef, payloadRef. Event means committed fact. Consumers dedupe.

## 6. Errors
VALIDATION, AUTH_REQUIRED, FORBIDDEN, NOT_FOUND, CONFLICT, RATE_LIMITED, TIMEOUT, DEPENDENCY_UNAVAILABLE, INCONCLUSIVE, INTERNAL.

## 7. Recovery matrix
Invalid input → no write.
Unauthorized → 403.
Deleted target → stale/unavailable.
Commit + network loss → status lookup by commandId.
Optional dependency failure → DEGRADED.
Duplicate event → dedupe.

## 8. Security
IDOR protection; server-derived actor; policy at read and write; private data filtering; no secrets in client; no arbitrary provider endpoint; rate limit.

## 9. Browser tests
Deep-link, refresh, back, mobile narrow viewport, touch, keyboard, double tap, network loss after commit, optional dependency outage, no white screen.

## 10. Performance
Bounded lists, cursor pagination, async heavy work, lazy media/runtime, cache invalidation. Core path cannot depend on AI.

## 11. DONE
Build/tests/security/recovery/observability proven on desktop and mobile without duplicate owner authority.
