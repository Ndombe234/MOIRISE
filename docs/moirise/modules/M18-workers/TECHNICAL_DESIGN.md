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

## 18.1 Worker registration protocol
A worker never becomes ACTIVE merely because a browser connected. Registration records workerId, ownerId, trust class, capability manifest, software/runtime version, requested quota and proof of authorization. The server evaluates the request against policy and returns the effective quota. The worker must use the effective quota, not its requested quota.

## 18.2 Scheduler eligibility algorithm
First reject any candidate that fails a hard constraint. Then score the remaining candidates on health freshness, available capacity, queue depth, latency class, fairness and cost class. Trust is evaluated before scoring. A Community Worker can never outrank a Trusted Worker when the task's trust requirement is Trusted.

## 18.3 Quota enforcement
The server stores quota policy, but the worker runtime enforces actual process/resource limits. A quota breach transitions the task to RESOURCE_LIMIT or SANDBOX_FAILURE, records an observability event and can put the worker into DEGRADED status. Repeated violations may trigger drain or revocation.

## 18.4 Lease recovery
Lease state is persisted before dispatch. If heartbeat freshness exceeds the lease window, the scheduler marks the lease expired. Requeue is allowed only when the task contract declares an idempotency strategy. A task with an irreversible external side effect requires a reconciliation record before retry.

## 18.5 Community-worker data minimization
A Community Worker receives references to isolated input blobs or already-redacted task payloads. It must not receive a database credential, service-role key, generic Supabase client with write privileges, raw player private memory or administrator token. The worker result is untrusted until validated by the central validator.

## 18.6 Worker state transitions
~~~text
DISCOVERED → REGISTERED → AUTHORIZED → ACTIVE
ACTIVE → DEGRADED → ACTIVE
ACTIVE → DRAINING → DRAINED
ACTIVE/DEGRADED → REVOKED
~~~
Revoked workers cannot renew leases. Drained workers complete already allowed work but do not receive new leases.

## 18.7 Network policy
Network permissions are task-specific. A generation task can be allowed to reach a configured provider endpoint while a pure local task receives no external network. The worker cannot broaden the allowlist itself.
