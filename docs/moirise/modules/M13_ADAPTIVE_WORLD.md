# MOIRISE Module 13 — ADAPTIVE WORLD

## 1. Purpose

Faire réagir le monde aux actions réelles et validées des joueurs.

## 2. Core loop

OBSERVE → DETECT PATTERN → PROPOSE CHANGE → SIMULATE → VALIDATE → APPLY → OBSERVE

## 3. Changes possible

- route ;
- object state ;
- event availability ;
- challenge variant ;
- music layer ;
- encounter ;
- generated experience.

## 4. Safety rule

Aucune adaptation globale directe par un modèle.

Chaque changement global est une candidate change versionnée.

## 5. Data

world_change_candidates
world_change_versions
world_change_results
world_memory_links

## 6. MORISE

Peut dire :
« J'ai détecté un changement dans le monde. »

Mais ne doit jamais inventer une conséquence.

## 7. AI

WORLD_REASONING
PATTERN_ANALYSIS
SIMULATION
CREATIVE_GENERATION
EVALUATION

## 8. Validation

Candidate
→ security
→ compatibility
→ simulation
→ performance
→ benchmark
→ approval
→ canary
→ production

## 9. Rollback

Toute modification globale doit être réversible.

## 10. Performance

La détection lourde est asynchrone.
Le gameplay courant ne doit pas attendre une analyse globale.

## 11. Tests

- candidate rejected ;
- candidate accepted ;
- rollback ;
- concurrency ;
- inconsistent state ;
- provider unavailable ;
- failed simulation.

## 12. Acceptance

Le monde peut évoluer sans perdre sa cohérence ni devenir imprévisible pour les fonctions critiques.

## 13. Do not modify

Ne pas fournir l'UI complète AI Lab ici.


---

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



## 16. Canonical implementation runbook

1. Define an aggregate observation model that excludes sensitive raw data.
2. Build trend detection on bounded windows and minimum sample sizes.
3. Create adaptation candidates with explicit target, reason references, expected metrics and rollback conditions.
4. Never allow one user, provider or worker to activate a global change.
5. Run every candidate through policy, sandbox simulation, benchmark and canary gates.
6. Store baseline metrics before activation and compare after activation.
7. Auto-rollback when configured regression thresholds are crossed.
8. Keep every candidate/version auditable and immutable after publication.
9. Present ordinary players with only the resulting contextual change, not unsafe internal reasoning.
10. Test poisoning resistance, low-sample rejection, stale candidate conflicts, provider disagreement and rollback.

### Canonical server contracts
createAdaptationCandidate, evaluateAdaptation, simulateAdaptation, canaryAdaptation, activateAdaptation, rollbackAdaptation, getAdaptationMetrics.

### Completion proof
No model can silently rewrite production world behavior; every active adaptation has a measurable and reversible lifecycle.

## 20. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.