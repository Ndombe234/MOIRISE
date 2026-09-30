# M16 — Analytics / Observability — CONCEPTION TECHNIQUE

## 1. Architecture boundary
Fournir télémétrie technique et produit, logs, traces, métriques, coûts et diagnostics avec séparation stricte des données privées et sécurité/audit.

~~~text
surface
→ authorized use case
→ policy
→ domain/state machine
→ storage/queue
→ event/audit
→ observable result
~~~

Dependencies: Transversal; tous les modules producteurs d'événements.

## 2. Contracts
~~~text
Command { commandId, actorFromSession, requestId, idempotencyKey?, payload, schemaVersion }
Query { requestId, actorFromSession?, cursor?, limit, filters }
Result { ok, data?, error?, traceId }
~~~

## 3. Domain
ProductEvent; Metric; Trace; LogRecord; CostRecord; Diagnostic; CorrelationContext.

Each entity requires lifecycle, owner, version, timestamps, indexes, uniqueness and retention/privacy.

## 4. Commands
### 1 EMIT_PRODUCT_EVENT
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 2 RECORD_TRACE
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 3 RECORD_METRIC
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 4 RECORD_ERROR
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 5 RECORD_COST
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 6 CREATE_DIAGNOSTIC.
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

## 5. Queries
### 1 GET_METRICS
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 2 GET_TRACE
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 3 GET_ERROR_TRENDS
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 4 GET_COST_SUMMARY
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 5 GET_PRODUCT_FUNNEL
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 6 GET_HEALTH.
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

## 6. Lifecycle
trace STARTED → COMPLETED/FAILED; diagnostic OPEN → INVESTIGATING → RESOLVED.

Every async lifecycle has a timeout, lease or recovery rule.

## 7. UI
admin/engineering dashboards; bounded product analytics; no raw private content.

## 8. AI integration
AI can summarize operational signals with redacted data; PostHog or another observation adapter is a sink, not the AI brain.
M19 internally follows the global AI architecture; product modules must use the capability registry instead of provider SDKs.

## 9. Security
redaction; privacy class; retention; access-controlled operational dashboards; no raw private message content in general logs.

## 10. Failure/recovery

| Failure | Expected behavior |
|---|---|
| auth expires | stop mutation, preserve safe intent |
| policy denies | reject, audit if security relevant |
| dependency unavailable | fallback/degrade |
| duplicate | return previous result |
| timeout | bounded retry if idempotent |
| stale state | conflict/reconciliation |
| worker lost | lease expiry and requeue when safe |

## 11. Observability
Every operational action carries actor, request/trace, action type, result, timestamp and affected entity refs. Private content is minimized.

## 12. Tests
Unit policy/state tests; integration storage; security permission matrix; E2E admin/browser; mobile when relevant; resilience; audit verification.

## 13. Implementation runbook
Types → storage → policy → service → events/audit → UI → tests → browser checks → performance → security review → DONE.

## 14. Puzzle sheet
Owner=M16
Scope=Fournir télémétrie technique et produit, logs, traces, métriques, coûts et diagnostics avec séparation stricte des données privées et sécurité/audit.
Entities=ProductEvent; Metric; Trace; LogRecord; CostRecord; Diagnostic; CorrelationContext.
Commands=EMIT_PRODUCT_EVENT; RECORD_TRACE; RECORD_METRIC; RECORD_ERROR; RECORD_COST; CREATE_DIAGNOSTIC.
Queries=GET_METRICS; GET_TRACE; GET_ERROR_TRENDS; GET_COST_SUMMARY; GET_PRODUCT_FUNNEL; GET_HEALTH.
States=trace STARTED → COMPLETED/FAILED; diagnostic OPEN → INVESTIGATING → RESOLVED.
Events=TRACE_STARTED; TRACE_COMPLETED; ERROR_OBSERVED; COST_OBSERVED; DIAGNOSTIC_CREATED.
Security=redaction; privacy class; retention; access-controlled operational dashboards; no raw private message content in general logs.
Acceptance=trace correlation, error visibility, product event integrity, cost visibility and privacy checks.

No unresolved owner, permission or lifecycle transition may remain.