# M13 — ADAPTIVE WORLD — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
M13 transforme les signaux autorisés en exploration contextualisée. Un signal n'est jamais directement une décision : signal → contexte → filtre privacy → candidate → policy → projection → feedback.

## 1. Adaptive surface
Acteur Player/system. Déclencheur ouverture World/Play ou action autorisée.
Préconditions : context scope connu; privacy pass.
Séquence : récupérer signaux autorisés → filtrer blocked/private/unsafe → diversité → nouveauté → choisir candidate → produire reasonKey → rendre projection.
Manque de signal = défaut neutre, pas d'inférence.

## 2. Living Object discovery
Un objet possède owner, lineage, version et permissions. M13 peut le faire découvrir; transformation/fork est exécuté par le owner approprié.
La découverte conserve attribution. Si l'objet devient privé ou révoqué, la projection disparaît immédiatement.

## 3. Convergence
**Source :** trajectoires validées et non sensibles.
**Étapes :** batch borné → détecter motifs compatibles → confidence → diversity/anti-manipulation → privacy filter → candidate → proposition.
Un seul actor ne peut pas fabriquer artificiellement une convergence en répétant une action. Une convergence faible est rejetée.

## 4. Convergence Space
Si acceptée : créer un espace scoped → consentement/permissions → expérience ou prototype → collecter outcome → fermer/convertir.
Solo-first : le Player peut voir une convergence pertinente sans obligation de rejoindre un groupe.

## 5. World Memory retrieval
Une question/task peut demander des connaissances collectives. M13 récupère uniquement des MemoryCandidates déjà validées : claim, sources, attribution, confidence, scope, retention, correction path.
Le système ne transforme pas automatiquement tous les messages privés en mémoire.

## 6. Adaptive feedback
Accept/dismiss/play/share fournit un signal borné. Rate limit et privacy filter avant stockage. Les feedbacks deviennent evidence, jamais ordre.

## 7. États
Adaptive candidate CREATED→FILTERED→PRESENTED→ACTED/DISMISSED.
Convergence DETECTED→PROPOSED→ACCEPTED→RUNNING→RESOLVED/REJECTED.
Living Object DISCOVERED→VIEWED→BRANCHED/TRANSFORMED via owner contract.

## 8. Tests / DONE
Sensitive inference attempt, blocked actor, low-confidence convergence, repeated manipulation, revoked object, private memory leak, solo path, mobile/desktop, AI unavailable.

## AI-INTÉGRATION M13 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

M13 est owner de l'adaptation du World, du ranking contextualisé et des réponses du monde vivant. M15 fournit l'intelligence et le calcul de propositions à partir de signaux réels. Les signaux doivent avoir sourceModule/sourceRef, timestamp, privacyClass, provenance et expiry. Une convergence ou emergence ne peut être déclenchée que par plusieurs signaux réels satisfaisant une règle versionnée. AI ne peut pas créer artificiellement des utilisateurs, événements, engagements ou récompenses pour provoquer une adaptation. Toute adaptation doit rester bornée, versionnée, explicable et, lorsque possible, réversible. Fallback = baseline déterministe.

# D10 — M13 ADAPTIVE WORLD — EXPANSION COMPORTEMENTALE
## Purpose
M13 observes validated world/social/game signals and proposes adaptive projections. It never silently rewrites owner truth.
## Convergence
SIGNALS → NORMALIZE → PRIVACY FILTER → CLUSTER/RELATION HYPOTHESIS → EVIDENCE → PROPOSAL → OWNER VALIDATION → PROJECTION.
## Missions
M13 may propose emergent missions from real activity, but M05/M06/M11/M12 commit the corresponding domain state.
## World memory
Only validated/public-or-authorized observations enter broader World Memory. Private conversations remain scoped.
## Adaptation
Changes are bounded by policy, rate and novelty budgets. A failed provider does not freeze the world; deterministic fallback remains.
## Viral value
Adaptive surfaces can expose timely communities, games, stories or creative prompts that connect existing real states without manufacturing popularity.
## DONE
Privacy boundaries, convergence evidence, mission proposal, rollback, stale signals and provider failure validated.

# D100K — M13 Adaptive World — FORMAL VERIFICATION

Owner: M13. Scope: adaptation, ranking, convergence, memory retrieval. Dependencies: M01,M02,M03,M04,M07,M15. Invariant: adaptive output is a projection/proposal unless an owner commits it.

Canonical transition: ACTOR → INTENT → PRECONDITIONS → CONTEXT/POLICY → INPUTS → AUTHORITY → GUARDS → STATE → OUTPUT → VALIDATION → COMMIT → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

Forbidden: hidden owner transfer, unauthorized mutation, silent privacy expansion, stale overwrite, duplicate authoritative mutation, or treating an unverified proposal as fact.

Proof must cover nominal, empty/no-data, failure, degraded/unavailable, replay, concurrency where relevant, refresh/reopen, permissions, mobile and desktop, and the module-specific invariant.

Impact path: M13 → consumers → contracts/events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.


# D100K — HISTORICAL CONTRACT RESTORATION — M13 ADAPTIVE WORLD

## Restored contracts
`AdaptationCandidate={id,target,changes:Record<string,unknown>,reasonRefs[],createdBy,version}`
`AdaptationDecision={candidateId,status:'rejected'|'approved'|'canary'|'active'|'rolled_back',baseline,metrics,rollbackThreshold}`

M13 consumes only authorized aggregate observations: engagement trends, completion rates, explicit feedback, event outcomes and public interaction statistics. Secrets, exact private content and sensitive attributes are excluded.

Every active adaptation has immutable version metadata. Historical metrics are never mutated to hide regression. Data poisoning, low sample size, stale signals, provider disagreement, version conflict and unauthorized activation are explicit rejection/rollback cases.

## D100K proof
Candidate isolation, signal provenance, low-sample rejection, poisoned signal, stale version, canary regression, automatic rollback and recovery after rollback.



# D100K — RESTORED ADAPTIVE RETENTION MECHANICS

M13 owns the adaptive state used for:
- World That Remembers;
- hidden/discoverable routes;
- evolving puzzles;
- consequence branching;
- one-problem/many-approaches recognition;
- deterministic no-AI remix fallback.

Adaptation is based on validated signals, not hidden psychological profiling. A no-AI deterministic path must exist for every mechanic that requires a degraded mode.

A branch or world mutation always carries version, source-event refs, owner scope, visibility, recovery state and rollback semantics.

D100K: poisoned signal, low sample, branch conflict, stale version, rollback, no-AI fallback, privacy boundary and mobile state restoration.

