# M19 — AI Platform — PLAN DE MODULE

## Mission
Construire le cerveau transversal de MOIRISE : contexte, mémoire, intention, planification, capabilities, tools, providers, policy, orchestration, validation, self-correction bornée, provenance et évolution contrôlée.

## Ownership
Entities: AIRequest; ContextSnapshot; Intent; Plan; CapabilityDefinition; ToolDefinition; ProviderAdapter; AITask; TaskGraph; MemoryEntry; Experience; ArtifactRef; Validation; ImprovementCandidate; EvaluationRun.
Commands: START_AI_REQUEST; BUILD_CONTEXT; RESOLVE_INTENT; BUILD_PLAN; RESERVE_RESOURCES; EXECUTE_ACTION; VALIDATE_RESULT; CORRECT_TASK; COMMIT_ARTIFACT; STORE_MEMORY; PROPOSE_IMPROVEMENT; RUN_EVALUATION; PROMOTE_CANDIDATE; ROLLBACK_CANDIDATE.
Queries: GET_AI_REQUEST; GET_PLAN; GET_TASK_GRAPH; GET_CAPABILITY; GET_PROVIDER_STATUS; GET_MEMORY; GET_ARTIFACT_PROVENANCE; GET_EVALUATION.
Events: AI_REQUEST_STARTED; AI_PLAN_CREATED; AI_ACTION_EXECUTED; AI_RESULT_VALIDATED; AI_RESULT_REJECTED; AI_TASK_RETRIED; AI_TASK_COMPLETED; MEMORY_STORED; IMPROVEMENT_EVALUATED; IMPROVEMENT_PROMOTED; IMPROVEMENT_ROLLED_BACK.

## Dependencies
M01-M18 selon capability; M18 pour exécution distribuée.

## Lifecycle
request RECEIVED → POLICY → CONTEXT → INTENT → PLANNED → EXECUTING → VALIDATING → COMPLETED/FAILED; candidate OBSERVED → HYPOTHESIS → BUILT → TESTED → BENCHMARKED → CANARY → PROMOTED/REJECTED/ROLLED_BACK.

## User / operator experience
one coherent SYSTEM interface; AI lab surfaces contextual; no provider names as permanent product architecture.

## AI boundary
self-referential because M19 is the AI authority, but every action remains contract-bound; no generic execute-anything permission.

## Data
scoped memory, capability registry, provider registry, tasks, provenance and evaluation evidence.

## Security
minimum context, untrusted external instructions, allow-listed tools, action policy, sandbox for code, no secrets, tenant isolation.

## Performance
bounded context, queues, backpressure, resource classes, cache and provider fallback.

## Failure behavior
Double submit, unauthorized actor, stale config, dependency outage, worker loss, provider outage, timeout, reconnect, concurrent update and corrupted record must be handled explicitly.

## Cross-module rules
Use events and typed service contracts. Never modify another module's database directly.

## Acceptance
capability routing, memory scope, task orchestration, validation, bounded correction, multimodal creation, game creation and reversible evolution.

## DONE
All commands/queries have authorization, persistence, error handling, tests, observability and browser/admin verification.