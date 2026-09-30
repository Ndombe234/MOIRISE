# M13 — ADAPTIVE WORLD — COMPLETE TECHNICAL CONTRACT

## Responsibility
M13 converts validated aggregate signals into reversible world/activity adaptations. It never directly writes production behavior from a raw AI suggestion.

## Inputs
Only authorized aggregate signals: engagement trends, completion rates, explicit feedback, event outcomes and public interaction statistics. Exclude secrets and sensitive attributes.

## Pipeline
`collect → validate provenance → aggregate → trend/anomaly detection → candidate generation → policy evaluation → sandbox simulation → benchmark → canary → monitor → activate/rollback`.

## Types
```ts
interface AdaptationCandidate { id:string; target:string; changes:Record<string,unknown>; reasonRefs:string[]; createdBy:string; version:number; }
interface AdaptationDecision { candidateId:string; status:'rejected'|'approved'|'canary'|'active'|'rolled_back'; baseline:Record<string,number>; metrics:Record<string,number>; rollbackThreshold:Record<string,number>; }
```

## Anti-poisoning
No single user, worker or provider directly changes global behavior. Require minimum sample size, aggregate thresholds, rate limits, anomaly detection and provenance checks.

## Evaluation
Every candidate has baseline metrics, expected metrics, activation window, rollback conditions and owner. Conflicting provider suggestions remain separate evidence until validated.

## AI boundary
AI generates hypotheses/candidates. Deterministic policy and evaluation decide activation. AI cannot self-approve production adaptation.

## Versioning
Each active adaptation has immutable version metadata. Rollback restores the previous known-safe version. Never mutate historical metrics to hide regressions.

## UI
Ordinary players see contextual effects and concise explanations. Diagnostics are restricted to SYSTEM/admin surfaces.

## Tests
Data poisoning; low-sample rejection; provider disagreement; stale signals; version conflict; canary regression; automatic rollback; recovery after rollback; unauthorized activation.

## Done gate
Every active adaptation is versioned, attributable, measurable, explainable and reversible.