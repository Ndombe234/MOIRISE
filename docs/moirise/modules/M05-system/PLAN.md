# M05 — SYSTEM / PROGRESSION / EVOLUTION — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Le SYSTEM est le langage d'interaction de MOIRISE. Une description du type « le système donne de l'XP » est insuffisante. Il faut préciser : quelle action produit le signal, qui valide le signal, quelle règle est chargée, quelle transaction écrit l'XP, quel événement prouve le commit, ce que le Player voit et comment un retry est traité.

## 1. Owner
M05 possède la progression visible et les mutations de progression : XP, niveaux, ranks, missions, achievements, présentation des titres et orchestration visuelle SYSTEM. M14 possède le ledger de récompenses/collection; M15 propose de l'intelligence mais ne possède aucune de ces mutations.

## 2. SYSTEM HUD
**Acteur :** Player.
**Déclencheur :** ouverture /system ou possibilité contextuelle autorisée.
**Préconditions :** session valide ou état visiteur explicitement prévu.
**Séquence :** charger progression confirmée → charger objectifs actifs → charger cards contextuelles autorisées → appliquer suppression si Player est en train d'écrire/lire/jouer/créer → composer HUD → afficher.
**Mutation :** aucune lors d'un simple affichage.
**Projection :** statut, progression, objectif, découverte ou prochaine action; pas de mur de messages SYSTEM.
**Échec :** M15 indisponible → statut de base reste disponible; source progression indisponible → ERROR/RETRY.

## 3. XP
**Déclencheur :** événement de résultat validé provenant de M06, M12 ou une autre source autorisée.
**Préconditions :** source event signé, owner connu, ruleVersion connue, événement non déjà consommé.
**Séquence exacte :** vérifier event → charger règle → calculer entitlement → créer XPTransaction avec sourceEventId+ruleVersion → commit atomique → recalculer projection → publier XP_GRANTED.
**Interdit :** le navigateur ou M15 ne peut pas appeler « grant XP » avec une valeur arbitraire.
**Retry :** même sourceEventId + règle = même transaction.

## 4. Level et Rank
Une fois XP commitée :
1. lire les seuils de la règle versionnée ;
2. calculer le niveau résultant ;
3. comparer au niveau précédent ;
4. écrire uniquement si différent ;
5. publier LEVEL_CHANGED/RANK_CHANGED ;
6. déclencher la présentation d'un milestone.
Une migration de règle ne modifie pas silencieusement l'histoire; elle produit une nouvelle version ou un correctif explicite.

## 5. Titles / Achievements
**Données nécessaires :** definitionId, ruleVersion, evidenceRefs, unlock condition.
**Séquence :** recevoir evidence → vérifier que la preuve appartient au Player → calculer éligibilité → créer unlock idempotent → transmettre ownership à M14 si nécessaire.
Une sortie IA qui « pense que le joueur mérite » n'est pas une preuve d'éligibilité.

## 6. Missions
Mission = définition + instance Player + progression.
**Création :** candidate validée → prerequisites → instance ACTIVE.
**Progression :** seuls les événements définis dans le contrat peuvent avancer une mission.
**Completion :** vérifier chaque condition à partir d'états autoritatifs → marquer COMPLETED → déclencher handoff reward.
**Échec :** FAILED seulement lorsqu'une règle d'échec réelle existe. Pas d'échec inventé.
**Reconnexion :** progression recalculable/idempotente à partir des events acceptés.

## 7. Trace
Trace n'est pas un journal de données privées. Elle conserve les jalons utiles au Player : création, découverte, progression, accomplissement, erreurs utiles et transformations Living Object approuvées.
Chaque entrée possède sourceRef, type, timestamp, privacyClass et deletion behavior.

## 8. Fun & Surprise
**Éligibilité :** signal réel + contexte approprié + cooldown + budget de fréquence.
**Suppression absolue :** typing, reading, gameplay actif, creation flow sauf intervention réellement critique.
**Séquence :** candidate → policy → presentation → reaction → cooldown.
Aucune surprise ne doit créer une fausse rareté, une fausse urgence ou un futur inexistant.

## 9. Hidden Possibilities / Unexplored Paths
Ce sont des possibilités générées à partir d'états existants, jamais des récompenses cachées attribuées automatiquement.
Une possibilité doit avoir sourceRef, reasonKey, expiration/cooldown et action possible.
Dismissal = suppression temporaire; absence d'un signal réel = aucune possibilité.

## 10. États
SYSTEM IDLE → CONTEXTUALIZING → READY.
Mission AVAILABLE → ACTIVE → COMPLETED ou FAILED.
Title LOCKED → UNLOCKED → EQUIPPED/UNSELECTED.
Toute mutation est idempotente.

## 11. Données
SystemContext, SystemCommand, XPTransaction, ProgressionProjection, LevelRule, RankRule, TitleDefinition, UnlockedTitle, Achievement, Mission, MissionProgress, TraceEntry, SurpriseCandidate, DNAProjection.

## 12. Sécurité
Server authority. Le client ne peut créer XPTransaction, MissionCompletion, UnlockTitle ou RankChange. M15 n'a pas accès direct aux tables M05.

## 13. Cross-module
M06 fournit les résultats de jeu validés. M12 fournit les résultats d'événements. M14 applique collection/reward grants. M15 fournit contexte/propositions. M05 reste la décision finale sur progression.

## 14. Tests et DONE
Tester XP doublée, résultat falsifié, replay event, level boundary, title déjà débloqué, mission avec progression hors ordre, surprise supprimée pendant typing, provider AI down, mobile, desktop, réseau perdu après commit.

## AI-INTÉGRATION M05 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M05 est l'autorité absolue de progression visible et de ses mutations. MORISE AI peut comprendre le Player et proposer des candidats, mais ne peut pas attribuer de progression.

### B. AI cases
Mission candidate, title candidate, achievement explanation, next-action proposal, contextual surprise candidate, progression explanation, SYSTEM wording localisé, pattern analysis.

### C. Evidence rule
Toute proposition M15 doit référencer une evidence réelle : event, Player state, rule version, context snapshot ou autre source autorisée. Une « intuition AI » n'est pas une preuve d'éligibilité.

### D. XP
M15 peut analyser ou expliquer. Seul le pipeline M05 valide sourceEventId + ruleVersion + entitlement et écrit XPTransaction.

### E. Titles/missions
M15 peut proposer une définition/candidate. M05 vérifie prerequisites, evidence et ruleVersion puis crée l'instance/unlock.

### F. Surprise
AI candidate → policy → suppression activité → cooldown → presentation budget → reaction. Aucun faux futur ni fausse rareté.

### G. Fallback
M15 unavailable ne bloque jamais le cœur XP/level/rank/mission déjà déterministe.

### H. DONE
Tests prouvent qu'un provider ou M15 ne peut ni écrire le ledger XP, ni forcer un title, ni terminer une mission, ni bypasser une règle.

# D10 — M05 SYSTEM — EXPANSION COMPORTEMENTALE
## SYSTEM visibility
Le SYSTEM est une couche contextuelle, pas une suite de popups. Il peut présenter une suggestion, progression, mission, titre, recommandation créative, alerte ou handoff seulement quand le contexte le justifie.
## Progression
EVENT_VALIDATED → PROGRESSION_RULE → XP/TITLE/MISSION_PROPOSAL → OWNER_VALIDATION → COMMIT → SYSTEM_PROJECTION. M15 ne donne jamais directement XP/titres.
## Adaptive messaging
Le texte du SYSTEM dépend du contexte, mais les règles de mutation sont déterministes et versionnées. AI peut proposer la présentation, pas modifier le ledger.
## Viral hooks
Achievements and creations can produce shareable projections: title reveal, challenge result, creation transformation, game result. Sharing is optional and respects privacy.
## Surprise
Fun & Surprise can schedule bounded surprises from real state. No fake scarcity or fake urgency. Surprise must be reversible/observable.
## DONE
Progression remains correct when AI is unavailable; SYSTEM overlays never block reading/playing/creating; duplicate events cannot award twice.

# D100K — M05 System / Progression — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M05. Scope: XP/levels/rank/titles/missions/SYSTEM presentation. Dependencies: M01,M02. Primary invariant: M05 alone validates progression authority.
For every capability: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
Authorization failure, invalid schema, incompatible version, ownership violation, idempotency conflict or critical dependency failure must produce zero unauthorized authoritative mutation.

## 3. AI boundary
M15 may propose or analyze only through capability contracts. M05 remains authoritative for XP/levels/rank/titles/missions/SYSTEM presentation.

## 4. Proof obligations
SUCCESS + NO-DATA + ERROR + DEGRADED/UNAVAILABLE + REFRESH/REOPEN + DESKTOP + MOBILE + PERMISSION DENIAL + RETRY/REPLAY where applicable.

## 5. Impact obligation
M05 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. UNKNOWN impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
Owner authority cannot be bypassed; duplicate commands cannot duplicate authoritative mutation; stale versions cannot silently overwrite current state; projections remain rebuildable; privacy survives handoffs; VERIFIED requires applicable evidence.

## 7. Completion
This D100K section defines what must be provable. It does not claim implementation completion.


## AI FABRICATION CONTEXT CONTRACT — ANTI-AMBIGUITY AND PROOF GATE

This document is an authoritative fabrication input for **M05-system** within its declared ownership. It is not a prompt substitute and it must never be interpreted in isolation. A fabrication agent MUST read the complete paired PLAN + TECHNICAL_DESIGN, the applicable transversal contracts, dependency rules, definition of done, and the current repository state before changing code.

### Controlled context before fabrication

The agent MUST establish a concrete context record containing: current branch/commit; exact in-scope files and symbols; existing behavior; missing behavior; files that may be modified; files that are forbidden; direct and transitive dependencies; relevant database/schema/event/API contracts; acceptance criteria; required tests; browser/mobile checks; security/privacy constraints; and evidence required for DONE. Ambiguity MUST be resolved from repository evidence or canonical documents. The agent MUST NOT silently invent a route, field, event, authority, provider, state, interface, or fallback because a detail was omitted from a short task description.

The repository state MUST be classified explicitly as **EXISTS**, **MISSING**, **TO_MODIFY**, **FORBIDDEN**, or **AFFECTED_DEPENDENCY**. Legacy behavior is not current authority unless the canonical documentation explicitly adopts it.

### Separation of understanding and fabrication

The required sequence is: **READ → MODEL CURRENT STATE → CHECK DEPENDENCIES → PLAN → FABRICATE → TEST → VERIFY → INTEGRATE → RECHECK REGRESSION → LOCK**. A successful code generation step is not evidence of correctness. A worker handoff is never proof of integration. The coordinator MUST inspect the integrated commit and re-run the relevant checks.

### Error-reduction contract

The objective is to minimize avoidable implementation errors by reducing what the agent must guess. Quality is measured from observed evidence rather than a guaranteed percentage. Track first-pass task success, correction count, integration defects, regressions, test failures, and browser failures separately. A target such as 80% first-pass success or a 10–20% error envelope may be used as an engineering KPI, but it is never treated as a guarantee or as permission to skip verification.

### Evidence gate

For behavior owned by this document, DONE requires the applicable chain: **code exists → type/build checks → focused tests → contract/integration tests → route/runtime accessibility → desktop/mobile browser verification where relevant → error/reload/permission cases → dependency regression check → fresh evidence recorded**. Anything not freshly demonstrated is **UNVERIFIED**, not implicitly successful.

### Conflict rule

If documentation, repository state, or dependencies disagree, the agent MUST stop the affected fabrication path, identify the conflicting authority, and escalate to the coordinator rather than selecting an undocumented interpretation. This contract strengthens traceability; it does not create a second business or AI authority.
