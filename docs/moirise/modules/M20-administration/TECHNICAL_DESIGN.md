# M20 — Administration / Operations — CONCEPTION TECHNIQUE

## 1. Architecture boundary
Administrer configurations, feature flags, maintenance, moderation views, workers, diagnostics, operational actions et audits sans devenir un second moteur métier.

~~~text
surface
→ authorized use case
→ policy
→ domain/state machine
→ storage/queue
→ event/audit
→ observable result
~~~

Dependencies: M13, M16, M18, M19.

## 2. Contracts
~~~text
Command { commandId, actorFromSession, requestId, idempotencyKey?, payload, schemaVersion }
Query { requestId, actorFromSession?, cursor?, limit, filters }
Result { ok, data?, error?, traceId }
~~~

## 3. Domain
AdminSession; RoleGrant; FeatureFlag; SystemConfig; MaintenanceWindow; AuditRecord; OperationalAction; Incident.

Each entity requires lifecycle, owner, version, timestamps, indexes, uniqueness and retention/privacy.

## 4. Commands
### 1 CREATE_FLAG
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 2 UPDATE_FLAG
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 3 START_MAINTENANCE
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 4 END_MAINTENANCE
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 5 GRANT_ADMIN_ROLE
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 6 REVOKE_ADMIN_ROLE
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 7 DRAIN_WORKER
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 8 REQUEUE_TASK
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 9 RUN_DIAGNOSTIC
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 10 ACK_INCIDENT.
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

## 5. Queries
### 1 GET_FLAGS
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 2 GET_CONFIG
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 3 GET_AUDIT
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 4 GET_INCIDENTS
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 5 GET_WORKER_HEALTH
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 6 GET_AI_TASKS
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 7 GET_SYSTEM_HEALTH.
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

## 6. Lifecycle
incident OPEN → ACKNOWLEDGED → MITIGATING → RESOLVED; maintenance SCHEDULED → ACTIVE → CLOSED.

Every async lifecycle has a timeout, lease or recovery rule.

## 7. UI
protected admin console; audit-first actions; confirmation for destructive operations.

## 8. AI integration
AI may summarize incidents or propose an action; execution remains allow-listed and explicitly authorized.
M19 internally follows the global AI architecture; product modules must use the capability registry instead of provider SDKs.

## 9. Security
admin role server-authoritative; high-risk actions require explicit authorization and audit; no browser-only admin gates.

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
Owner=M20
Scope=Administrer configurations, feature flags, maintenance, moderation views, workers, diagnostics, operational actions et audits sans devenir un second moteur métier.
Entities=AdminSession; RoleGrant; FeatureFlag; SystemConfig; MaintenanceWindow; AuditRecord; OperationalAction; Incident.
Commands=CREATE_FLAG; UPDATE_FLAG; START_MAINTENANCE; END_MAINTENANCE; GRANT_ADMIN_ROLE; REVOKE_ADMIN_ROLE; DRAIN_WORKER; REQUEUE_TASK; RUN_DIAGNOSTIC; ACK_INCIDENT.
Queries=GET_FLAGS; GET_CONFIG; GET_AUDIT; GET_INCIDENTS; GET_WORKER_HEALTH; GET_AI_TASKS; GET_SYSTEM_HEALTH.
States=incident OPEN → ACKNOWLEDGED → MITIGATING → RESOLVED; maintenance SCHEDULED → ACTIVE → CLOSED.
Events=FEATURE_FLAG_CHANGED; MAINTENANCE_STARTED; MAINTENANCE_ENDED; ADMIN_ROLE_CHANGED; OPERATION_EXECUTED; INCIDENT_ACKNOWLEDGED.
Security=admin role server-authoritative; high-risk actions require explicit authorization and audit; no browser-only admin gates.
Acceptance=admin actions traceable, reversible where possible, protected by role and never a replacement for module ownership.

No unresolved owner, permission or lifecycle transition may remain.