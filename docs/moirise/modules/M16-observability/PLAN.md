# M16 — Analytics / Observability — PLAN DE MODULE

## Mission
Fournir télémétrie technique et produit, logs, traces, métriques, coûts et diagnostics avec séparation stricte des données privées et sécurité/audit.

## Ownership
Entities: ProductEvent; Metric; Trace; LogRecord; CostRecord; Diagnostic; CorrelationContext.
Commands: EMIT_PRODUCT_EVENT; RECORD_TRACE; RECORD_METRIC; RECORD_ERROR; RECORD_COST; CREATE_DIAGNOSTIC.
Queries: GET_METRICS; GET_TRACE; GET_ERROR_TRENDS; GET_COST_SUMMARY; GET_PRODUCT_FUNNEL; GET_HEALTH.
Events: TRACE_STARTED; TRACE_COMPLETED; ERROR_OBSERVED; COST_OBSERVED; DIAGNOSTIC_CREATED.

## Dependencies
Transversal; tous les modules producteurs d'événements.

## Lifecycle
trace STARTED → COMPLETED/FAILED; diagnostic OPEN → INVESTIGATING → RESOLVED.

## User / operator experience
admin/engineering dashboards; bounded product analytics; no raw private content.

## AI boundary
AI can summarize operational signals with redacted data; PostHog or another observation adapter is a sink, not the AI brain.

## Data
event metadata, timings, counts, errors, resource usage, cost estimates.

## Security
redaction; privacy class; retention; access-controlled operational dashboards; no raw private message content in general logs.

## Performance
non-blocking event ingestion; sampling; batching; bounded payloads.

## Failure behavior
Double submit, unauthorized actor, stale config, dependency outage, worker loss, provider outage, timeout, reconnect, concurrent update and corrupted record must be handled explicitly.

## Cross-module rules
Use events and typed service contracts. Never modify another module's database directly.

## Acceptance
trace correlation, error visibility, product event integrity, cost visibility and privacy checks.

## DONE
All commands/queries have authorization, persistence, error handling, tests, observability and browser/admin verification.