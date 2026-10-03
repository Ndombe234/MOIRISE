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


# RECOVERED FIRST CONTACT + EXPERIENCE EVOLUTION FUSION — 2026-10-03

## First Contact
First Contact is the canonical first-session experience layer, not a new module.

Target: approximately two minutes, with flexible termination when the meaningful discovery is reached.

Canonical sequence:
1. SYSTEM invitation with one immediate meaningful choice;
2. small interactive objective or micro-world;
3. real-time observation of permitted actions;
4. auditable anomaly or reaction when an unusual valid action occurs;
5. bounded adaptation of objective, rules or options;
6. reveal and temporary, non-sensitive session descriptor;
7. contextual continuation grounded in a real resulting state.

Historical example dialogue may inspire presentation but is not an immutable script. The SYSTEM must not pretend to observe actions it did not observe. AI failure uses deterministic fallback.

## Post-contact continuity
Continuation may expose a real unanswered discovery, new path, changed object/world state, contextual mission, new playable experience, validated experiment, music/audio reaction or collective possibility. No fake anomaly, fake scarcity or fabricated personalization is allowed.

## Evolution mechanics restored from historical V3
M05 explicitly preserves these presentation/experience projections of the Evolution Engine: Trace; Living World; Hidden Possibilities; Unexplored Paths; Evolving Identity; MORISE Double; Fun & Surprise; Emergent Experience patterns; SYSTEM companion continuity.

Durable lifecycle remains with the owner defined by the canonical architecture. M05 owns how eligible progression/evolution state is presented through SYSTEM and how progression-sensitive mutations are authorized.


# D100K — HISTORICAL CONTRACT RESTORATION — M05 SYSTEM

## Restored contracts
`Progression={playerId,level,xp,rank,version}`
`XPEvent={id,playerId,source,amount,idempotencyKey,ruleVersion,createdAt}`
`SystemNotice={id,playerId,kind,priority:'low'|'normal'|'high',readAt?}`

Canonical operations:
`getProgression`, `recordValidatedProgressionEvent`, `listSystemNotices`, `markSystemNoticeRead`, `explainProgression`.
Only the first two mutate authoritative progression and both are server-authorized.

Authoritative sequence:
`validated source event → authorize → validate amount/source → insert XP event → recompute progression → emit SYSTEM notice → invalidate player cache`.

Rules are immutable/versioned after publication. Retries use idempotency. Negative/overflow/impossible source events are rejected. Low-priority notices are grouped to prevent SYSTEM spam. AI can explain or recommend; it cannot grant XP, alter rank/rules or validate its own source event.

## Contextual experience
M05 may present a contextual SYSTEM experience when a real eligible signal exists. It must never fabricate rewards, counters, events or notifications.

## D100K proof
Exact threshold boundaries, concurrent grants, duplicate events, forged payloads, ruleset upgrades, rollback, notice grouping/read state, reconnect, mobile HUD, provider outage and no-AI fallback.

