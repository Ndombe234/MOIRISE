# M15 — META SYSTEM — TECHNICAL DESIGN

## Boundary
M15 is the advanced SYSTEM coordination surface. It exposes creator workflows, diagnostics, experiments and controlled AI-assisted evolution without exposing internal complexity to ordinary players.

## UI layers
1. Player SYSTEM panel: concise status, suggestions, alerts.
2. Creator Lab: authorized creation/debugging tools.
3. Admin/AI Lab: protected experiments, provider health, worker health and evolution proposals.

These are views of one SYSTEM, not separate products and not permanent navigation doors.

## Coordination
M15 consumes typed contracts from AI Core, Provider Registry, Game Factory, Worker Cluster, memory/learning and observability. It does not duplicate their internals.

## Evolution pipeline
`observe → identify gap → propose change → generate patch/algorithm → static checks → sandbox tests → benchmark → human/system policy approval → canary → monitor → promote/rollback`.

## Types
```ts
interface EvolutionProposal { id:string; target:string; rationale:string; patchRef:string; testsRef:string; baselineMetrics:Record<string,number>; status:"draft"|"testing"|"canary"|"approved"|"rejected"|"rolled_back"; }
interface SystemAction { id:string; capability:string; actorId:string; authorization:string; status:"requested"|"running"|"completed"|"failed"; }
```

## No unrestricted self-modification
MORISE cannot rewrite production code, security policy, provider registry or worker trust policy autonomously. Changes require policy gates, tests, audit and rollback.

## Data filtering
Raw user data is never automatically fed into evolution. Inputs pass provenance, privacy, consent, safety and aggregation filters. External provider outputs remain attributed evidence, not unquestioned truth.

## Distributed compute
M15 may request work through the Control Plane. Trusted workers and community workers are selected by worker policy. No worker receives central master secrets.

## Provider independence
M15 calls capabilities, never provider URLs. Provider outage degrades a capability, not the entire SYSTEM.

## Tests
permission isolation, proposal rollback, failed benchmark, malicious patch, provider outage, worker outage, audit completeness, stale proposal and mobile player-mode rendering.

## Done gate
Advanced SYSTEM functions are permission-gated, auditable, reversible and invisible as unnecessary complexity to ordinary players.