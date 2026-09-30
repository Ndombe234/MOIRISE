# M05 — SYSTEM / PROGRESSION / EVOLUTION — CONCEPTION TECHNIQUE DÉTAILLÉE

## 1. Execution boundary
UI/route → server use-case → M05 policy → repository/adapter → DB/runtime → event → projection.

## 2. Command schema
```
{commandId, actorId(server-derived), capabilityId, targetRef?, expectedVersion?, payload}
```
Reject unknown capability, forged actorId, invalid payload, unauthorized target, stale version and commandId reuse with different payload.

## 3. Capability contracts
### M05.C1 HUD
Input : minimal context available + actor scope.
Execution : assemble current status → objectives → contextual candidates → suppression by activity → render.
Mutation : SystemContext.
Failure : AI down leaves core progression visible.
Security : no spam.

### M05.C2 XP
Input : source signature/rule version valid + actor scope.
Execution : eligibility → compute XP → idempotent ledger → update projection.
Mutation : XPTransaction.
Failure : invalid source = zero grant; retry same result.
Security : client cannot self-award.

### M05.C3 Level/rank
Input : rule version active + actor scope.
Execution : calculate threshold → update level/rank → emit milestone.
Mutation : ProgressionProjection.
Failure : rule migration explicit; no silent rewrite.
Security : rules versioned.

### M05.C4 Title/achievement
Input : eligibility rule + evidence + actor scope.
Execution : evaluate → unlock once → handoff ownership if needed.
Mutation : UnlockRef.
Failure : missing evidence remains locked.
Security : AI cannot direct grant.

### M05.C5 Mission
Input : candidate validated, prerequisites pass + actor scope.
Execution : create instance → update progress from authoritative events → completion guard → reward handoff.
Mutation : Mission/MissionProgress.
Failure : retry/reconnect idempotent.
Security : expiry only real.

### M05.C6 Fun & Surprise
Input : player not busy with typing/reading/playing/creating + actor scope.
Execution : eligibility → surprise candidate → presentation → response/cooldown.
Mutation : SurpriseCandidate.
Failure : no eligible signal = no surprise.
Security : no fake scarcity/urgency.

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
