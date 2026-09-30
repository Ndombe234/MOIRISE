# M14 — Notifications / Engagement Context — CONCEPTION TECHNIQUE

## 1. Architecture
Gérer notifications et rappels avec priorité, déduplication, quiet periods, préférences et suppression contextuelle pour rester utile sans spam.
Dependency boundary: M03, M12, M16, M13.

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
Notification; NotificationCandidate; DeliveryAttempt; NotificationPreference; QuietPeriod; DedupeKey; ReturnPrompt.
Every persistent entity needs owner, state, timestamps, version, indexes, uniqueness and privacy.

## 4. Commands
### 1 CREATE_CANDIDATE
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 2 EVALUATE_CANDIDATE
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 3 MARK_READ
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 4 DISMISS
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 5 UPDATE_PREFERENCE
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 6 SET_QUIET_PERIOD
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 7 CANCEL_PENDING_NOTIFICATION.
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

## 5. Queries
### 1 LIST_NOTIFICATIONS
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 2 GET_UNREAD_COUNT
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 3 GET_PREFERENCES
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 4 GET_QUIET_PERIOD
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 5 GET_PENDING_CONTINUATIONS.
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

## 6. State machine
candidate CREATED → FILTERED → QUEUED → DELIVERED/DROPPED; notification UNREAD → READ/DISMISSED.
Guard functions must be pure/testable. Every asynchronous state has a recovery path.

## 7. UI states
notification center; contextual SYSTEM cards; quiet-period controls; return prompts.
~~~text
IDLE → LOADING → SUCCESS
             ↘ EMPTY
             ↘ ERROR
             ↘ UNAVAILABLE
             ↘ DEGRADED
~~~

## 8. AI
AI suggests content relevance only; M14 owns frequency, suppression, dedupe and delivery policy.
All AI calls use M19 capabilities and M13 policy. No direct provider endpoint.

## 9. Security
private content shown only to authorized recipient; external delivery adapters optional.
Threats include replay, privilege escalation, hidden-data leakage, abuse automation and race conditions. Use server-side authorization, RLS where applicable, rate limits, immutable or append-only audit for security decisions and conflict detection.

## 10. Events
NOTIFICATION_CANDIDATE; NOTIFICATION_DELIVERED; NOTIFICATION_READ; NOTIFICATION_DISMISSED; NOTIFICATION_CANCELLED.
Events contain safe identifiers and refs, not private payloads by default.

## 11. Special rules
Notification integrity:
- Dedupe key combines semantic source + recipient + event reference + policy window.
- Quiet periods are checked before delivery.
- Context suppression prevents notifications while the user is actively focused on the relevant task.
- The same source event cannot produce an unbounded notification chain.

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
Owner=M14
Commands=CREATE_CANDIDATE; EVALUATE_CANDIDATE; MARK_READ; DISMISS; UPDATE_PREFERENCE; SET_QUIET_PERIOD; CANCEL_PENDING_NOTIFICATION.
Queries=LIST_NOTIFICATIONS; GET_UNREAD_COUNT; GET_PREFERENCES; GET_QUIET_PERIOD; GET_PENDING_CONTINUATIONS.
States=candidate CREATED → FILTERED → QUEUED → DELIVERED/DROPPED; notification UNREAD → READ/DISMISSED.
Events=NOTIFICATION_CANDIDATE; NOTIFICATION_DELIVERED; NOTIFICATION_READ; NOTIFICATION_DISMISSED; NOTIFICATION_CANCELLED.
Data=candidates; delivery attempts; preferences; quiet periods; dedupe records.
AI=AI suggests content relevance only; M14 owns frequency, suppression, dedupe and delivery policy.
Security=private content shown only to authorized recipient; external delivery adapters optional.
Acceptance=no duplicate floods; quiet periods honored; meaningful return prompts only from real state.

The document is incomplete if an implementation agent still has to guess ownership or critical state transitions.