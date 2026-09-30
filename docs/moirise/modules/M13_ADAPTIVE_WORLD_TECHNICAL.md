# M13 — ADAPTIVE WORLD — TECHNICAL DESIGN

## Boundary
M13 converts validated aggregate signals into reversible world/discovery/activity adaptations. It does not directly rewrite production behavior.

## Inputs
Only eligible aggregate signals: engagement trends, completion rates, explicit feedback, event outcomes and public/authorized interaction statistics. Exclude secrets and sensitive attributes.

## Pipeline
`collect → validate → aggregate → detect trend → generate candidate → policy evaluation → sandbox simulation → benchmark → canary → activate/rollback`.

## Types
```ts
interface AdaptationCandidate { id:string; target:string; changes:Record<string,unknown>; reasonRefs:string[]; createdBy:string; version:number; }
interface AdaptationDecision { candidateId:string; status:"rejected"|"approved"|"canary"|"active"|"rolled_back"; metrics:Record<string,number>; }
```

## Anti-poisoning
No single user, worker or provider can directly change global behavior. Aggregate thresholds, rate limits, anomaly detection and minimum sample sizes are mandatory.

## Evaluation
Every adaptation has a baseline, expected metrics, activation window, rollback threshold and owner. If metrics regress, rollback is automatic where configured.

## AI boundary
MORISE may generate hypotheses/candidates. Deterministic policy and evaluation decide activation. AI never self-approves production changes.

## UI
The ordinary player sees only resulting contextual changes and concise explanations. Advanced adaptation diagnostics remain in authorized SYSTEM/admin surfaces.

## Tests
poisoning resistance, low-sample rejection, candidate rollback, version conflict, stale data, provider disagreement, metrics regression and recovery.

## Done gate
Every active adaptation is versioned, explainable, measurable, reversible and attributable to validated signals.