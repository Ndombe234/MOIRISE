# M18 — Distributed Worker Platform — CONCEPTION TECHNIQUE

## 1. Architecture boundary
Orchestrer des machines autorisées comme capacité de calcul distribuée, sans prétendre fusionner leur RAM en une mémoire unique.

~~~text
surface
→ authorized use case
→ policy
→ domain/state machine
→ storage/queue
→ event/audit
→ observable result
~~~

Dependencies: M01, M13, M16.

## 2. Contracts
~~~text
Command { commandId, actorFromSession, requestId, idempotencyKey?, payload, schemaVersion }
Query { requestId, actorFromSession?, cursor?, limit, filters }
Result { ok, data?, error?, traceId }
~~~

## 3. Domain
Worker; WorkerOwner; TrustClass; CapabilityManifest; ResourceQuota; Heartbeat; Lease; WorkerTask; SandboxProfile; Revocation; HealthSnapshot.

Each entity requires lifecycle, owner, version, timestamps, indexes, uniqueness and retention/privacy.

## 4. Commands
### 1 REGISTER_WORKER
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 2 AUTHORIZE_WORKER
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 3 UPDATE_CAPABILITIES
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 4 HEARTBEAT
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 5 GRANT_LEASE
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 6 REVOKE_WORKER
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 7 REPORT_TASK
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 8 DRAIN_WORKER
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 9 UPDATE_QUOTA.
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

## 5. Queries
### 1 LIST_WORKERS
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 2 GET_WORKER
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 3 GET_HEALTH
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 4 GET_QUOTA
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 5 GET_ACTIVE_LEASE
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 6 GET_TASK_STATUS.
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

## 6. Lifecycle
worker DISCOVERED → REGISTERED → ACTIVE → DRAINING/REVOKED; task QUEUED → LEASED → RUNNING → VALIDATING → COMPLETE/RETRY/FAILED.

Every async lifecycle has a timeout, lease or recovery rule.

## 7. UI
worker registry for authorized operators; opt-in community worker settings; health/quota visibility.

## 8. AI integration
M19 requests task capacity; M18 enforces eligibility, trust boundary, quota and sandbox.
M19 internally follows the global AI architecture; product modules must use the capability registry instead of provider SDKs.

## 9. Security
Community Worker default ≤1 logical CPU and 512 MiB RAM; GPU/storage disabled; network bounded; never provide production secrets or unrestricted user filesystem.

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
Owner=M18
Scope=Orchestrer des machines autorisées comme capacité de calcul distribuée, sans prétendre fusionner leur RAM en une mémoire unique.
Entities=Worker; WorkerOwner; TrustClass; CapabilityManifest; ResourceQuota; Heartbeat; Lease; WorkerTask; SandboxProfile; Revocation; HealthSnapshot.
Commands=REGISTER_WORKER; AUTHORIZE_WORKER; UPDATE_CAPABILITIES; HEARTBEAT; GRANT_LEASE; REVOKE_WORKER; REPORT_TASK; DRAIN_WORKER; UPDATE_QUOTA.
Queries=LIST_WORKERS; GET_WORKER; GET_HEALTH; GET_QUOTA; GET_ACTIVE_LEASE; GET_TASK_STATUS.
States=worker DISCOVERED → REGISTERED → ACTIVE → DRAINING/REVOKED; task QUEUED → LEASED → RUNNING → VALIDATING → COMPLETE/RETRY/FAILED.
Events=WORKER_REGISTERED; WORKER_AUTHORIZED; WORKER_HEARTBEAT; WORKER_LEASE_GRANTED; WORKER_TASK_COMPLETED; WORKER_REVOKED; WORKER_HEALTH_DEGRADED.
Security=Community Worker default ≤1 logical CPU and 512 MiB RAM; GPU/storage disabled; network bounded; never provide production secrets or unrestricted user filesystem.
Acceptance=trusted/community separation, explicit opt-in, revocation, lease recovery, quota enforcement and no central dependency on one worker.

No unresolved owner, permission or lifecycle transition may remain.