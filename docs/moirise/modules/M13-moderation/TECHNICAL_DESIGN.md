# M13 — Moderation / Trust & Safety — CONCEPTION TECHNIQUE

## 1. Architecture
Être l'autorité de sécurité applicative : reports, blocks, mutes, rate limits, abuse prevention, moderation decisions, appeals, escalation and audit.
Dependency boundary: M01.

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
Report; ModerationCase; Decision; PolicyRule; Block; Mute; RateLimitBucket; Appeal; SafetyAudit.
Every persistent entity needs owner, state, timestamps, version, indexes, uniqueness and privacy.

## 4. Commands
### 1 REPORT_CONTENT
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 2 BLOCK_PLAYER
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 3 UNBLOCK_PLAYER
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 4 MUTE_PLAYER
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 5 UNMUTE_PLAYER
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 6 APPLY_DECISION
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 7 ESCALATE_CASE
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 8 FILE_APPEAL
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 9 RESOLVE_APPEAL
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 10 UPDATE_POLICY_RULE.
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

## 5. Queries
### 1 GET_REPORT
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 2 GET_MODERATION_CASE
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 3 GET_USER_BLOCKS
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 4 CHECK_ACCESS_POLICY
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 5 GET_APPEAL
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 6 GET_RATE_LIMIT_STATE.
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

## 6. State machine
report OPEN → TRIAGED → DECIDED → CLOSED/ESCALATED; appeal FILED → REVIEW → RESOLVED; enforcement ACTIVE/REVOKED.
Guard functions must be pure/testable. Every asynchronous state has a recovery path.

## 7. UI states
report flow; safety settings; moderation console; appeal status; audit views.
~~~text
IDLE → LOADING → SUCCESS
             ↘ EMPTY
             ↘ ERROR
             ↘ UNAVAILABLE
             ↘ DEGRADED
~~~

## 8. AI
AI assists triage/classification and evidence summarization only; final policy enforcement remains M13.
All AI calls use M19 capabilities and M13 policy. No direct provider endpoint.

## 9. Security
least privilege; evidence access controlled; audit immutable enough for investigations; protected admin surface.
Threats include replay, privilege escalation, hidden-data leakage, abuse automation and race conditions. Use server-side authorization, RLS where applicable, rate limits, immutable or append-only audit for security decisions and conflict detection.

## 10. Events
REPORT_CREATED; MODERATION_DECISION; USER_BLOCKED; USER_UNBLOCKED; USER_MUTED; APPEAL_FILED; APPEAL_RESOLVED; SAFETY_POLICY_CHANGED.
Events contain safe identifiers and refs, not private payloads by default.

## 11. Special rules
The module-specific invariants are defined by its owner rules and transversal contracts.

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
Owner=M13
Commands=REPORT_CONTENT; BLOCK_PLAYER; UNBLOCK_PLAYER; MUTE_PLAYER; UNMUTE_PLAYER; APPLY_DECISION; ESCALATE_CASE; FILE_APPEAL; RESOLVE_APPEAL; UPDATE_POLICY_RULE.
Queries=GET_REPORT; GET_MODERATION_CASE; GET_USER_BLOCKS; CHECK_ACCESS_POLICY; GET_APPEAL; GET_RATE_LIMIT_STATE.
States=report OPEN → TRIAGED → DECIDED → CLOSED/ESCALATED; appeal FILED → REVIEW → RESOLVED; enforcement ACTIVE/REVOKED.
Events=REPORT_CREATED; MODERATION_DECISION; USER_BLOCKED; USER_UNBLOCKED; USER_MUTED; APPEAL_FILED; APPEAL_RESOLVED; SAFETY_POLICY_CHANGED.
Data=reports; evidence refs; decisions; policies; sanctions; appeals; rate-limit state.
AI=AI assists triage/classification and evidence summarization only; final policy enforcement remains M13.
Security=least privilege; evidence access controlled; audit immutable enough for investigations; protected admin surface.
Acceptance=block/mute enforcement consistent across modules; report lifecycle; appeals; rate limit correctness; audit trail.

The document is incomplete if an implementation agent still has to guess ownership or critical state transitions.