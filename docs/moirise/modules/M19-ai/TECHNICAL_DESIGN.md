# M19 — AI Platform — CONCEPTION TECHNIQUE

## 1. Architecture boundary
Construire le cerveau transversal de MOIRISE : contexte, mémoire, intention, planification, capabilities, tools, providers, policy, orchestration, validation, self-correction bornée, provenance et évolution contrôlée.

~~~text
surface
→ authorized use case
→ policy
→ domain/state machine
→ storage/queue
→ event/audit
→ observable result
~~~

Dependencies: M01-M18 selon capability; M18 pour exécution distribuée.

## 2. Contracts
~~~text
Command { commandId, actorFromSession, requestId, idempotencyKey?, payload, schemaVersion }
Query { requestId, actorFromSession?, cursor?, limit, filters }
Result { ok, data?, error?, traceId }
~~~

## 3. Domain
AIRequest; ContextSnapshot; Intent; Plan; CapabilityDefinition; ToolDefinition; ProviderAdapter; AITask; TaskGraph; MemoryEntry; Experience; ArtifactRef; Validation; ImprovementCandidate; EvaluationRun.

Each entity requires lifecycle, owner, version, timestamps, indexes, uniqueness and retention/privacy.

## 4. Commands
### 1 START_AI_REQUEST
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 2 BUILD_CONTEXT
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 3 RESOLVE_INTENT
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 4 BUILD_PLAN
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 5 RESERVE_RESOURCES
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 6 EXECUTE_ACTION
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 7 VALIDATE_RESULT
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 8 CORRECT_TASK
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 9 COMMIT_ARTIFACT
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 10 STORE_MEMORY
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 11 PROPOSE_IMPROVEMENT
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 12 RUN_EVALUATION
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 13 PROMOTE_CANDIDATE
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

### 14 ROLLBACK_CANDIDATE.
Input schema validation.
Server-side permission check.
State guard.
Transaction or durable job.
Idempotency/replay protection.
Audit/event publication.
Authoritative response.

## 5. Queries
### 1 GET_AI_REQUEST
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 2 GET_PLAN
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 3 GET_TASK_GRAPH
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 4 GET_CAPABILITY
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 5 GET_PROVIDER_STATUS
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 6 GET_MEMORY
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 7 GET_ARTIFACT_PROVENANCE
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

### 8 GET_EVALUATION.
Minimal fields, privacy filter, pagination and bounded execution. Operational queries must not expose secrets.

## 6. Lifecycle
request RECEIVED → POLICY → CONTEXT → INTENT → PLANNED → EXECUTING → VALIDATING → COMPLETED/FAILED; candidate OBSERVED → HYPOTHESIS → BUILT → TESTED → BENCHMARKED → CANARY → PROMOTED/REJECTED/ROLLED_BACK.

Every async lifecycle has a timeout, lease or recovery rule.

## 7. UI
one coherent SYSTEM interface; AI lab surfaces contextual; no provider names as permanent product architecture.

## 8. AI integration
self-referential because M19 is the AI authority, but every action remains contract-bound; no generic execute-anything permission.
M19 internally follows the global AI architecture; product modules must use the capability registry instead of provider SDKs.

## 9. Security
minimum context, untrusted external instructions, allow-listed tools, action policy, sandbox for code, no secrets, tenant isolation.

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
Owner=M19
Scope=Construire le cerveau transversal de MOIRISE : contexte, mémoire, intention, planification, capabilities, tools, providers, policy, orchestration, validation, self-correction bornée, provenance et évolution contrôlée.
Entities=AIRequest; ContextSnapshot; Intent; Plan; CapabilityDefinition; ToolDefinition; ProviderAdapter; AITask; TaskGraph; MemoryEntry; Experience; ArtifactRef; Validation; ImprovementCandidate; EvaluationRun.
Commands=START_AI_REQUEST; BUILD_CONTEXT; RESOLVE_INTENT; BUILD_PLAN; RESERVE_RESOURCES; EXECUTE_ACTION; VALIDATE_RESULT; CORRECT_TASK; COMMIT_ARTIFACT; STORE_MEMORY; PROPOSE_IMPROVEMENT; RUN_EVALUATION; PROMOTE_CANDIDATE; ROLLBACK_CANDIDATE.
Queries=GET_AI_REQUEST; GET_PLAN; GET_TASK_GRAPH; GET_CAPABILITY; GET_PROVIDER_STATUS; GET_MEMORY; GET_ARTIFACT_PROVENANCE; GET_EVALUATION.
States=request RECEIVED → POLICY → CONTEXT → INTENT → PLANNED → EXECUTING → VALIDATING → COMPLETED/FAILED; candidate OBSERVED → HYPOTHESIS → BUILT → TESTED → BENCHMARKED → CANARY → PROMOTED/REJECTED/ROLLED_BACK.
Events=AI_REQUEST_STARTED; AI_PLAN_CREATED; AI_ACTION_EXECUTED; AI_RESULT_VALIDATED; AI_RESULT_REJECTED; AI_TASK_RETRIED; AI_TASK_COMPLETED; MEMORY_STORED; IMPROVEMENT_EVALUATED; IMPROVEMENT_PROMOTED; IMPROVEMENT_ROLLED_BACK.
Security=minimum context, untrusted external instructions, allow-listed tools, action policy, sandbox for code, no secrets, tenant isolation.
Acceptance=capability routing, memory scope, task orchestration, validation, bounded correction, multimodal creation, game creation and reversible evolution.

No unresolved owner, permission or lifecycle transition may remain.