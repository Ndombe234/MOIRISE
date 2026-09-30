# M15 — META SYSTEM + MORISE AI LAB — CONCEPTION TECHNIQUE

## Services
AIRequestGateway; ContextEngine; Intent; Reasoning; Planner; CapabilityRegistry; ToolRegistry; ProviderRegistry; ResourceRouter; TaskEngine; Validation; Memory; Experience; Provenance; Evaluation; Evolution; AI Lab.

## Request
request → auth/tenant → context → intent → plan → policy → capability → resource → task → execution → validation → commit/event.

## Provider boundary
Product modules never import provider SDKs. Registry stores providerId, capabilities, endpoint, auth mode, secret name, quotas, data policy, health and fallback.

## Memory boundary
SESSION, PLAYER, EXPERIENCE, CREATOR, COMMUNITY, WORLD and SYSTEM OBSERVATION are separate scopes. Retrieval is least-privilege.

## Task execution
Tasks persist before dispatch. Hard constraints are filtered before candidate scoring. Lease and idempotency controls worker failure.

## Self-correction
Bounded by maximum attempts, time, resource and mutation scope. Oscillation ends the loop.

## AI Lab
Candidate branch → static check → sandbox → tests → benchmark → policy → canary → promote/reject → monitor → rollback.
No production secrets, unrestricted admin privileges or arbitrary external systems.

## Self-development
A capability is complete only when it has contract, implementation/adapter, policy, resources, validator, tests, observability, version and rollback.

## Living Object intelligence
Read authorized lineage; propose transforms/forks/merges/conversions; preserve attribution. No silent ownership changes.

## Evolution Engine / DNA
Consume permitted signals, derive demonstrated capabilities, surface context. Do not infer sensitive traits.

## Convergence / Emergent Missions / World Memory
Detect candidate convergence with privacy filters; create bounded experiments; validate outcomes; promote reusable knowledge with provenance.

## Creative / Game orchestration
Use the same task graph, resource routing, sandbox and validators for image/video/audio/music/text and Game Factory.

## Distributed compute
LOCAL/ON_DEVICE → TRUSTED_WORKER → COMMUNITY_WORKER → VERIFIED_PROVIDER.
Community workers default to 1 logical CPU/512 MiB, GPU/storage disabled, network bounded.

## Observability
Trace request→plan→task→target→result→validator→commit. No hidden chain-of-thought storage.

## Security tests
prompt injection, tool abuse, actor spoofing, privilege escalation, provider poisoning, sandbox escape, worker filesystem access, cross-tenant memory, reward replay, late task result.

## DONE
Native AI architecture is functional independently of any one provider, with tested orchestration, memory, policy, task execution, validation, controlled evolution and rollback.
## Core contracts
AIRequest; ContextSnapshot; Intent; Plan; AITask; CapabilityDefinition; ToolDefinition; ProviderDefinition; WorkerDefinition; MemoryEntry; ImprovementCandidate; BenchmarkRun; ValidationReport; ProvenanceRecord.

## Long-job persistence
Persist task state before dispatch. On restart, the scheduler reconstructs pending work and checks whether retry is safe before issuing a new lease.

## Provider error normalization
Provider-specific failures map into the shared AppError categories so product modules never depend on provider SDK error types.

## AI Lab promotion
candidate → static validation → sandbox → tests → benchmark → policy → canary → promote/reject → monitor → rollback.
The baseline remains recoverable at all times.
