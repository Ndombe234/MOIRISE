# M05 — SYSTEM / PROGRESSION / EVOLUTION — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
La documentation doit descendre de « France » à « Paris → rue → bâtiment → appartement → porte ». Pour chaque capacité, un agent doit savoir exactement qui agit, quand, avec quelles données, dans quel ordre, ce qui est écrit, affiché, émis et comment chaque panne est récupérée.

## 1. Owner
SYSTEM HUD, progression déterministe, missions, titres, achievements, Trace, Fun & Surprise et évolution bornée
**Owner unique : M05.**

## 2. Capacités
### M05.1 HUD
**Acteur :** player
**Déclencheur :** open SYSTEM/context refresh
**Préconditions :** minimal context available
**Entrées :** actor server-side, targetRef éventuel, payload validé, commandId, expectedVersion si nécessaire.
**Ordre exact :**
1. vérifier identité et permissions ;
2. charger le contexte minimal ;
3. vérifier l'état de la cible ;
4. appliquer assemble current status → objectives → contextual candidates → suppression by activity → render ;
5. commit de la mutation SystemContext ;
6. construire la projection depuis la donnée autoritative ;
7. émettre l'événement après commit.
**Erreur/récupération :** AI down leaves core progression visible
**Sécurité :** no spam
**Double clic/concurrence :** même commandId = même résultat; payload différent sous le même commandId = conflict; expectedVersion protège les mises à jour concurrentes.
**Réseau :** réponse perdue après commit = lecture du résultat par commandId.
**Tests :** nominal, permission refusée, target disparu, retry, concurrence, mobile, desktop, état DEGRADED.

### M05.2 XP
**Acteur :** system
**Déclencheur :** validated result event
**Préconditions :** source signature/rule version valid
**Entrées :** actor server-side, targetRef éventuel, payload validé, commandId, expectedVersion si nécessaire.
**Ordre exact :**
1. vérifier identité et permissions ;
2. charger le contexte minimal ;
3. vérifier l'état de la cible ;
4. appliquer eligibility → compute XP → idempotent ledger → update projection ;
5. commit de la mutation XPTransaction ;
6. construire la projection depuis la donnée autoritative ;
7. émettre l'événement après commit.
**Erreur/récupération :** invalid source = zero grant; retry same result
**Sécurité :** client cannot self-award
**Double clic/concurrence :** même commandId = même résultat; payload différent sous le même commandId = conflict; expectedVersion protège les mises à jour concurrentes.
**Réseau :** réponse perdue après commit = lecture du résultat par commandId.
**Tests :** nominal, permission refusée, target disparu, retry, concurrence, mobile, desktop, état DEGRADED.

### M05.3 Level/rank
**Acteur :** system
**Déclencheur :** XP commit
**Préconditions :** rule version active
**Entrées :** actor server-side, targetRef éventuel, payload validé, commandId, expectedVersion si nécessaire.
**Ordre exact :**
1. vérifier identité et permissions ;
2. charger le contexte minimal ;
3. vérifier l'état de la cible ;
4. appliquer calculate threshold → update level/rank → emit milestone ;
5. commit de la mutation ProgressionProjection ;
6. construire la projection depuis la donnée autoritative ;
7. émettre l'événement après commit.
**Erreur/récupération :** rule migration explicit; no silent rewrite
**Sécurité :** rules versioned
**Double clic/concurrence :** même commandId = même résultat; payload différent sous le même commandId = conflict; expectedVersion protège les mises à jour concurrentes.
**Réseau :** réponse perdue après commit = lecture du résultat par commandId.
**Tests :** nominal, permission refusée, target disparu, retry, concurrence, mobile, desktop, état DEGRADED.

### M05.4 Title/achievement
**Acteur :** system
**Déclencheur :** validated evidence
**Préconditions :** eligibility rule + evidence
**Entrées :** actor server-side, targetRef éventuel, payload validé, commandId, expectedVersion si nécessaire.
**Ordre exact :**
1. vérifier identité et permissions ;
2. charger le contexte minimal ;
3. vérifier l'état de la cible ;
4. appliquer evaluate → unlock once → handoff ownership if needed ;
5. commit de la mutation UnlockRef ;
6. construire la projection depuis la donnée autoritative ;
7. émettre l'événement après commit.
**Erreur/récupération :** missing evidence remains locked
**Sécurité :** AI cannot direct grant
**Double clic/concurrence :** même commandId = même résultat; payload différent sous le même commandId = conflict; expectedVersion protège les mises à jour concurrentes.
**Réseau :** réponse perdue après commit = lecture du résultat par commandId.
**Tests :** nominal, permission refusée, target disparu, retry, concurrence, mobile, desktop, état DEGRADED.

### M05.5 Mission
**Acteur :** player/system
**Déclencheur :** accept mission
**Préconditions :** candidate validated, prerequisites pass
**Entrées :** actor server-side, targetRef éventuel, payload validé, commandId, expectedVersion si nécessaire.
**Ordre exact :**
1. vérifier identité et permissions ;
2. charger le contexte minimal ;
3. vérifier l'état de la cible ;
4. appliquer create instance → update progress from authoritative events → completion guard → reward handoff ;
5. commit de la mutation Mission/MissionProgress ;
6. construire la projection depuis la donnée autoritative ;
7. émettre l'événement après commit.
**Erreur/récupération :** retry/reconnect idempotent
**Sécurité :** expiry only real
**Double clic/concurrence :** même commandId = même résultat; payload différent sous le même commandId = conflict; expectedVersion protège les mises à jour concurrentes.
**Réseau :** réponse perdue après commit = lecture du résultat par commandId.
**Tests :** nominal, permission refusée, target disparu, retry, concurrence, mobile, desktop, état DEGRADED.

### M05.6 Fun & Surprise
**Acteur :** system
**Déclencheur :** real signal + cooldown
**Préconditions :** player not busy with typing/reading/playing/creating
**Entrées :** actor server-side, targetRef éventuel, payload validé, commandId, expectedVersion si nécessaire.
**Ordre exact :**
1. vérifier identité et permissions ;
2. charger le contexte minimal ;
3. vérifier l'état de la cible ;
4. appliquer eligibility → surprise candidate → presentation → response/cooldown ;
5. commit de la mutation SurpriseCandidate ;
6. construire la projection depuis la donnée autoritative ;
7. émettre l'événement après commit.
**Erreur/récupération :** no eligible signal = no surprise
**Sécurité :** no fake scarcity/urgency
**Double clic/concurrence :** même commandId = même résultat; payload différent sous le même commandId = conflict; expectedVersion protège les mises à jour concurrentes.
**Réseau :** réponse perdue après commit = lecture du résultat par commandId.
**Tests :** nominal, permission refusée, target disparu, retry, concurrence, mobile, desktop, état DEGRADED.


## 3. États
Chaque transition est trigger → guard auth → guard métier → mutation → event → projection. Guard échouée = aucune écriture.

## 4. Données
Chaque entité a id, owner relation, status, version, timestamps, privacy class et retention. Une projection n'est jamais source d'autorité.

## 5. Cross-module
M04 présente et oriente; les owners de destination exécutent. M05 possède progression; M06 possède session de jeu.

## 6. IA
Toute AI passe par M15. L'IA peut proposer une action/contextualisation mais ne contourne jamais l'autorité du owner.

## 7. UX
LOADING/READY/EMPTY/ERROR/UNAVAILABLE/DEGRADED explicites. Aucun écran blanc.

## 8. Sécurité/performance
Server authorization, rate limits, privacy filtering, lazy loading, pagination et async jobs. Aucune donnée privée injectée dans une recommandation sans contrat.

## 9. DONE
Behavior proven, persistence, events, recovery, tests, mobile/desktop, observability and anti-duplication.
