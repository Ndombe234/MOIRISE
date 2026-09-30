# M12 — Events / Activities — CONCEPTION TECHNIQUE

## 1. Architecture
Créer des événements, défis, tournois, quêtes et activités temporelles réelles, avec éligibilité, états, inscription, progression et continuations persistées.
Dependency boundary: M06, M11, M13, M14.

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
EventDefinition; EventInstance; EligibilityRule; Registration; Quest; Challenge; Tournament; EventState; Continuation.
Every persistent entity needs owner, state, timestamps, version, indexes, uniqueness and privacy.

## 4. Commands
### 1 CREATE_EVENT
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 2 PUBLISH_EVENT
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 3 REGISTER_EVENT
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 4 START_ACTIVITY
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 5 RECORD_PROGRESS
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 6 COMPLETE_ACTIVITY
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 7 CANCEL_EVENT
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 8 SCHEDULE_CONTINUATION.
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

## 5. Queries
### 1 LIST_ACTIVE_EVENTS
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 2 GET_EVENT
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 3 GET_ELIGIBILITY
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 4 GET_REGISTRATION
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 5 GET_ACTIVITY_STATE
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 6 GET_FUTURE_CONTINUATIONS.
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

## 6. State machine
DRAFT → SCHEDULED → ACTIVE → COMPLETED/CANCELLED; registration AVAILABLE → JOINED → WITHDRAWN; activity AVAILABLE → IN_PROGRESS → COMPLETED/FAILED.
Guard functions must be pure/testable. Every asynchronous state has a recovery path.

## 7. UI states
events hub; activity detail; progress; tournament bracket; countdown only for real schedule; return cards.
~~~text
IDLE → LOADING → SUCCESS
             ↘ EMPTY
             ↘ ERROR
             ↘ UNAVAILABLE
             ↘ DEGRADED
~~~

## 8. AI
AI may recommend a real event or generate activity content under M12 rules; it cannot fabricate event dates, scarcity or participation counts.
All AI calls use M19 capabilities and M13 policy. No direct provider endpoint.

## 9. Security
eligibility server-side; organizer permissions; anti-abuse; no false event metrics.
Threats include replay, privilege escalation, hidden-data leakage, abuse automation and race conditions. Use server-side authorization, RLS where applicable, rate limits, immutable or append-only audit for security decisions and conflict detection.

## 10. Events
EVENT_PUBLISHED; EVENT_JOINED; EVENT_STARTED; EVENT_PROGRESS; EVENT_COMPLETED; EVENT_CANCELLED; EVENT_CONTINUATION_SCHEDULED.
Events contain safe identifiers and refs, not private payloads by default.

## 11. Special rules
Temporal integrity:
- Store timestamps in UTC with timezone context for presentation.
- Event status derives from a canonical schedule and persisted cancellation.
- A return prompt may exist only when a future continuation record exists.
- Never create fake countdowns or fake participant counts.

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
Owner=M12
Commands=CREATE_EVENT; PUBLISH_EVENT; REGISTER_EVENT; START_ACTIVITY; RECORD_PROGRESS; COMPLETE_ACTIVITY; CANCEL_EVENT; SCHEDULE_CONTINUATION.
Queries=LIST_ACTIVE_EVENTS; GET_EVENT; GET_ELIGIBILITY; GET_REGISTRATION; GET_ACTIVITY_STATE; GET_FUTURE_CONTINUATIONS.
States=DRAFT → SCHEDULED → ACTIVE → COMPLETED/CANCELLED; registration AVAILABLE → JOINED → WITHDRAWN; activity AVAILABLE → IN_PROGRESS → COMPLETED/FAILED.
Events=EVENT_PUBLISHED; EVENT_JOINED; EVENT_STARTED; EVENT_PROGRESS; EVENT_COMPLETED; EVENT_CANCELLED; EVENT_CONTINUATION_SCHEDULED.
Data=event definitions; schedule; eligibility; registrations; activity state; continuation refs.
AI=AI may recommend a real event or generate activity content under M12 rules; it cannot fabricate event dates, scarcity or participation counts.
Security=eligibility server-side; organizer permissions; anti-abuse; no false event metrics.
Acceptance=only real future states can produce return prompts; schedule transitions robust to timezone changes.

The document is incomplete if an implementation agent still has to guess ownership or critical state transitions.