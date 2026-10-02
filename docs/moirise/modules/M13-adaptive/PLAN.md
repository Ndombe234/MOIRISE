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

# D100 — SPÉCIFICATION COMPORTEMENTALE
## Signal intake
Only real, policy-allowed signals enter M13. Normalize, dedupe and expire before correlation.
## Convergence
M13 may identify co-occurring interests or activities, but does not infer sensitive traits. Evidence and confidence are stored with every proposal.
## Missions
Emergent mission proposal references a real trigger and target owner. M05/M06/M11/M12 commit respective states.
## World Memory
Promotion from local/session/player scope to World scope requires explicit policy and provenance. Private DM data is excluded by default.
## Anti-oscillation
Adaptive proposals have cooldown, version and expiry. Repeated contradictory proposals are suppressed/escalated rather than alternating UI state rapidly.
