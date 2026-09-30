# M20 — Administration / Operations — PLAN DE MODULE

## Mission
Administrer configurations, feature flags, maintenance, moderation views, workers, diagnostics, operational actions et audits sans devenir un second moteur métier.

## Ownership
Entities: AdminSession; RoleGrant; FeatureFlag; SystemConfig; MaintenanceWindow; AuditRecord; OperationalAction; Incident.
Commands: CREATE_FLAG; UPDATE_FLAG; START_MAINTENANCE; END_MAINTENANCE; GRANT_ADMIN_ROLE; REVOKE_ADMIN_ROLE; DRAIN_WORKER; REQUEUE_TASK; RUN_DIAGNOSTIC; ACK_INCIDENT.
Queries: GET_FLAGS; GET_CONFIG; GET_AUDIT; GET_INCIDENTS; GET_WORKER_HEALTH; GET_AI_TASKS; GET_SYSTEM_HEALTH.
Events: FEATURE_FLAG_CHANGED; MAINTENANCE_STARTED; MAINTENANCE_ENDED; ADMIN_ROLE_CHANGED; OPERATION_EXECUTED; INCIDENT_ACKNOWLEDGED.

## Dependencies
M13, M16, M18, M19.

## Lifecycle
incident OPEN → ACKNOWLEDGED → MITIGATING → RESOLVED; maintenance SCHEDULED → ACTIVE → CLOSED.

## User / operator experience
protected admin console; audit-first actions; confirmation for destructive operations.

## AI boundary
AI may summarize incidents or propose an action; execution remains allow-listed and explicitly authorized.

## Data
config, flags, audits, incidents, operational refs.

## Security
admin role server-authoritative; high-risk actions require explicit authorization and audit; no browser-only admin gates.

## Performance
operational queries paginated; diagnostics isolated from user traffic.

## Failure behavior
Double submit, unauthorized actor, stale config, dependency outage, worker loss, provider outage, timeout, reconnect, concurrent update and corrupted record must be handled explicitly.

## Cross-module rules
Use events and typed service contracts. Never modify another module's database directly.

## Acceptance
admin actions traceable, reversible where possible, protected by role and never a replacement for module ownership.

## DONE
All commands/queries have authorization, persistence, error handling, tests, observability and browser/admin verification.