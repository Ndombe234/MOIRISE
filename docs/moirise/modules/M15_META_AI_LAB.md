# MOIRISE Module 15 — META SYSTEM + AI LAB

## 1. Purpose

Construire la couche méta qui permet à MORISE d'observer, expérimenter, apprendre et proposer des améliorations sans perdre le contrôle du produit.

## 2. User-facing role

AI Lab n'est pas un écran obligatoire pour le joueur.

Les outils internes peuvent être réservés aux rôles autorisés.

## 3. Internal architecture

OBSERVATION
→ EXPERIENCE
→ EVALUATION
→ HYPOTHESIS
→ LEARNING CANDIDATE
→ EXPERIMENT
→ SANDBOX
→ BENCHMARK
→ SECURITY
→ POLICY GATE
→ CANARY
→ PRODUCTION
→ ROLLBACK

## 4. MORISE behavior

MORISE peut détecter une limite :
« Cette stratégie échoue trop souvent dans cette situation. »

Puis elle crée une hypothèse.

Elle ne doit jamais dire :
« J'ai réécrit mon cerveau. »
si aucune modification validée n'existe réellement.

## 5. Learning

Sources autorisées :
- interactions non sensibles ;
- feedback explicite ;
- expériences validées ;
- résultats de jeux ;
- résultats créatifs ;
- erreurs techniques ;
- observations PostHog autorisées.

## 6. PostHog

PostHog = observation/expérimentation/analytics.
PostHog ≠ mémoire profonde.
PostHog ≠ vérité.
PostHog ≠ décision autonome.

Secret serveur observé :
Posthog_API_KEY, valeur non exposée.

## 7. Code evolution

Candidate code est généré dans sandbox.

Obligatoire :
- typecheck ;
- tests ;
- lint ;
- security scan ;
- regression;
- benchmark ;
- comparison old/new.

Puis :
REJECT ou CANDIDATE ou CANARY ou PROMOTE.

## 8. Memory

Séparer :
- facts ;
- episodic experiences ;
- semantic relations ;
- skills ;
- strategies ;
- system state ;
- provenance.

## 9. Provider learning

Les résultats des providers externes sont traités comme des expériences.
Ils passent :
PROVENANCE → PRIVACY → SAFETY → QUALITY → ORIGINALITY/LICENSING → RELEVANCE → VALIDATION.

Une sortie d'API n'est jamais automatiquement considérée vraie.

## 10. Creative Engine

Peut orchestrer :
- text ;
- image ;
- video ;
- music ;
- audio ;
- TTS ;
- STT ;
- vision ;
- comic/BD ;
- embeddings ;
- search ;
- moderation.

Chaque capability reste derrière le Capability Registry.

## 11. Game Creator

Module 15 orchestre l'amélioration du Game Factory et du Shared Game Engine, mais les jeux restent dans Modules 8-9.

## 12. Scheduler

Les tâches AI sont classées :
- interactive ;
- background ;
- low priority ;
- batch.

Le scheduler protège CPU/RAM et évite les appels inutiles.

## 13. Resource optimization

MORISE peut apprendre des stratégies d'économie :
- cache ;
- batching ;
- model selection ;
- compression ;
- offloading ;
- background scheduling.

Elle ne peut pas créer de RAM ou de puissance physique par du code. Les ressources réelles viennent du matériel disponible.

## 14. Security

Fail closed pour :
- secrets ;
- permissions ;
- RLS ;
- destructive actions ;
- production deployment ;
- arbitrary code ;
- private data.

## 15. Tests

- learning candidate rejection ;
- sandbox failure ;
- regression detection ;
- rollback ;
- provider failure ;
- memory corruption;
- prompt injection;
- data leakage;
- cost/quota protection;
- cross-user isolation.

## 16. Acceptance

Le Meta System permet des améliorations mesurées et réversibles.
Aucun mécanisme d'auto-évolution ne peut contourner les tests ou les politiques.

## 17. Do not modify

Ne pas donner au modèle une capacité générale du type exec(anything). Toutes les actions doivent passer par des outils/contrats explicites.

## 18. New-AI handoff

Lire d'abord MORISE_AI_MASTER et tous les contrats Core. Une nouvelle IA ne doit jamais réinventer le moteur d'évolution.


---

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



## 19. Canonical implementation runbook

1. Keep player SYSTEM, Creator Lab and Admin/AI Lab as different permissioned views of one SYSTEM.
2. Route all AI actions through typed capability/action contracts.
3. Record provenance for every external provider result and internal candidate.
4. Separate facts, experiences, hypotheses, skills, strategies and system state in memory.
5. Store evolution proposals as immutable versioned records.
6. Require baseline metrics, tests, security checks and benchmark evidence before any canary.
7. Block autonomous changes to production security policy, provider registry, RLS, worker trust policy and destructive operations.
8. Send distributed work through the Control Plane; never leak central master secrets to workers.
9. Keep PostHog as observation/experimentation only, never as authoritative memory or truth.
10. Make provider outage degrade one capability rather than the whole SYSTEM.
11. Provide rollback for every promoted evolution candidate.
12. Test prompt injection, data leakage, cross-user isolation, malicious patches, stale proposals, worker failure, provider disagreement and rollback.
13. Keep ordinary-player UI concise; advanced diagnostics are role-gated.

### Canonical server contracts
createAIAction, executeCapability, recordAIExperience, createEvolutionProposal, runSandboxCandidate, benchmarkCandidate, approveCanary, promoteCandidate, rollbackCandidate, getSystemDiagnostics.

### Completion proof
M15 can coordinate AI capabilities, experiments and controlled evolution without unrestricted self-modification and without exposing internal complexity to ordinary players.

## 20. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.