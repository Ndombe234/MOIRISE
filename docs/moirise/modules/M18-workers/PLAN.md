# M18 — Distributed Worker Platform — PLAN DE MODULE

## Mission
Orchestrer des machines autorisées comme capacité de calcul distribuée, sans prétendre fusionner leur RAM en une mémoire unique.

## Ownership
Entities: Worker; WorkerOwner; TrustClass; CapabilityManifest; ResourceQuota; Heartbeat; Lease; WorkerTask; SandboxProfile; Revocation; HealthSnapshot.
Commands: REGISTER_WORKER; AUTHORIZE_WORKER; UPDATE_CAPABILITIES; HEARTBEAT; GRANT_LEASE; REVOKE_WORKER; REPORT_TASK; DRAIN_WORKER; UPDATE_QUOTA.
Queries: LIST_WORKERS; GET_WORKER; GET_HEALTH; GET_QUOTA; GET_ACTIVE_LEASE; GET_TASK_STATUS.
Events: WORKER_REGISTERED; WORKER_AUTHORIZED; WORKER_HEARTBEAT; WORKER_LEASE_GRANTED; WORKER_TASK_COMPLETED; WORKER_REVOKED; WORKER_HEALTH_DEGRADED.

## Dependencies
M01, M13, M16.

## Lifecycle
worker DISCOVERED → REGISTERED → ACTIVE → DRAINING/REVOKED; task QUEUED → LEASED → RUNNING → VALIDATING → COMPLETE/RETRY/FAILED.

## User / operator experience
worker registry for authorized operators; opt-in community worker settings; health/quota visibility.

## AI boundary
M19 requests task capacity; M18 enforces eligibility, trust boundary, quota and sandbox.

## Data
worker identity, owner, trust, capabilities, quotas, health, leases, task refs.

## Security
Community Worker default ≤1 logical CPU and 512 MiB RAM; GPU/storage disabled; network bounded; never provide production secrets or unrestricted user filesystem.

## Performance
scheduler selects among hard-constraint-eligible workers; heartbeat and lease expiry enable recovery.

## Failure behavior
Double submit, unauthorized actor, stale config, dependency outage, worker loss, provider outage, timeout, reconnect, concurrent update and corrupted record must be handled explicitly.

## Cross-module rules
Use events and typed service contracts. Never modify another module's database directly.

## Acceptance
trusted/community separation, explicit opt-in, revocation, lease recovery, quota enforcement and no central dependency on one worker.

## DONE
All commands/queries have authorization, persistence, error handling, tests, observability and browser/admin verification.