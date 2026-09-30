# M15 — META SYSTEM — COMPLETE TECHNICAL CONTRACT

## Responsibility
M15 is the advanced SYSTEM coordination surface. It exposes creator tools, diagnostics, experiments and controlled AI-assisted evolution while keeping ordinary players away from unnecessary complexity.

## Three visibility layers
1. Player SYSTEM: concise status, suggestions, alerts.
2. Creator Lab: authorized creation/debugging workflows.
3. Admin/AI Lab: protected experiments, provider health, worker health and evolution proposals.

These are views of one SYSTEM, not separate products or permanent navigation doors.

## Coordination
M15 consumes typed contracts from AI Core, Provider Registry, Game Factory, Worker Cluster, memory/learning and observability. It does not duplicate their internals.

## Evolution pipeline
`observe → identify gap → propose change → generate patch/algorithm → static checks → sandbox tests → benchmark → policy approval → canary → monitor → promote/rollback`.

## Types
```ts
interface EvolutionProposal { id:string; target:string; rationale:string; patchRef:string; testsRef:string; baselineMetrics:Record<string,number>; status:'draft'|'testing'|'canary'|'approved'|'rejected'|'rolled_back'; }
interface SystemAction { id:string; capability:string; actorId:string; authorization:string; status:'requested'|'running'|'completed'|'failed'; }
```

## No unrestricted self-modification
MORISE cannot autonomously rewrite production code, security policy, provider registry or worker trust policy. Changes require policy gates, tests, audit and rollback. A longer prompt/codebase does not itself create new compute, RAM or model capability.

## Data filtering
Raw user data is not automatically fed into evolution. Inputs pass provenance, privacy, consent, safety and aggregation filters. External provider outputs remain attributed evidence, not unquestioned truth.

## Distributed compute
M15 may submit work through the Control Plane. Scheduler policy chooses trusted/community workers. Workers never receive production master secrets or unrestricted database access.

## Provider independence
M15 calls capabilities, never provider URLs. Provider outage degrades a capability rather than the entire SYSTEM. Anonymous HTTP providers are still treated as untrusted adapters and outputs are validated.

## UI behavior
Keep the player mode quiet and useful. Do not spam SYSTEM messages. Advanced diagnostics are hidden behind authorized surfaces and lazy-loaded so the main site remains light.

## Tests
Permission isolation; malicious patch; failed benchmark; rollback; provider outage; worker outage; forged proposal; stale proposal; audit completeness; mobile player-mode rendering; no-blank-screen recovery.

## Done gate
Advanced SYSTEM functions are permission-gated, auditable, reversible, provider-independent and invisible as unnecessary complexity to ordinary players.