# M04 — WORLD — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
La documentation doit descendre de « France » à « Paris → rue → bâtiment → appartement → porte ». Pour chaque capacité, un agent doit savoir exactement qui agit, quand, avec quelles données, dans quel ordre, ce qui est écrit, affiché, émis et comment chaque panne est récupérée.

## 1. Owner
surface d'accueil simple, contextualisation, détours et handoffs vers les profondeurs du produit
**Owner unique : M04.**

## 2. Capacités
### M04.1 Home
**Acteur :** player/visiteur
**Déclencheur :** open Home
**Préconditions :** shell READY
**Entrées :** actor server-side, targetRef éventuel, payload validé, commandId, expectedVersion si nécessaire.
**Ordre exact :**
1. vérifier identité et permissions ;
2. charger le contexte minimal ;
3. vérifier l'état de la cible ;
4. appliquer load minimal context → select 5–6 doors → compose only eligible cards ;
5. commit de la mutation WorldSurfaceState ;
6. construire la projection depuis la donnée autoritative ;
7. émettre l'événement après commit.
**Erreur/récupération :** optional source down = DEGRADED; never invent people/activity
**Sécurité :** no fake counters or urgency
**Double clic/concurrence :** même commandId = même résultat; payload différent sous le même commandId = conflict; expectedVersion protège les mises à jour concurrentes.
**Réseau :** réponse perdue après commit = lecture du résultat par commandId.
**Tests :** nominal, permission refusée, target disparu, retry, concurrence, mobile, desktop, état DEGRADED.

### M04.2 Context card
**Acteur :** player
**Déclencheur :** real contextual signal
**Préconditions :** source event exists, cooldown passed
**Entrées :** actor server-side, targetRef éventuel, payload validé, commandId, expectedVersion si nécessaire.
**Ordre exact :**
1. vérifier identité et permissions ;
2. charger le contexte minimal ;
3. vérifier l'état de la cible ;
4. appliquer check relevance → reason key → action → expiry → show ;
5. commit de la mutation ContextCard ;
6. construire la projection depuis la donnée autoritative ;
7. émettre l'événement après commit.
**Erreur/récupération :** dismiss suppresses repeated card
**Sécurité :** reason must be explainable
**Double clic/concurrence :** même commandId = même résultat; payload différent sous le même commandId = conflict; expectedVersion protège les mises à jour concurrentes.
**Réseau :** réponse perdue après commit = lecture du résultat par commandId.
**Tests :** nominal, permission refusée, target disparu, retry, concurrence, mobile, desktop, état DEGRADED.

### M04.3 Detour
**Acteur :** player
**Déclencheur :** eligible novelty signal
**Préconditions :** not typing/reading/playing/creating unless critical
**Entrées :** actor server-side, targetRef éventuel, payload validé, commandId, expectedVersion si nécessaire.
**Ordre exact :**
1. vérifier identité et permissions ;
2. charger le contexte minimal ;
3. vérifier l'état de la cible ;
4. appliquer suppress intrusive context → evaluate relevance/cooldown → offer optional detour ;
5. commit de la mutation Detour ;
6. construire la projection depuis la donnée autoritative ;
7. émettre l'événement après commit.
**Erreur/récupération :** ignored/dismissed = cooldown; source gone = remove
**Sécurité :** no manipulative urgency
**Double clic/concurrence :** même commandId = même résultat; payload différent sous le même commandId = conflict; expectedVersion protège les mises à jour concurrentes.
**Réseau :** réponse perdue après commit = lecture du résultat par commandId.
**Tests :** nominal, permission refusée, target disparu, retry, concurrence, mobile, desktop, état DEGRADED.

### M04.4 Door handoff
**Acteur :** player
**Déclencheur :** tap SYSTEM/PLAYER/SOCIAL/PLAY/CREATE
**Préconditions :** destination route enabled
**Entrées :** actor server-side, targetRef éventuel, payload validé, commandId, expectedVersion si nécessaire.
**Ordre exact :**
1. vérifier identité et permissions ;
2. charger le contexte minimal ;
3. vérifier l'état de la cible ;
4. appliquer create IntentEnvelope → destination revalidates auth and executes ;
5. commit de la mutation IntentEnvelope ;
6. construire la projection depuis la donnée autoritative ;
7. émettre l'événement après commit.
**Erreur/récupération :** destination unavailable = return to World with useful action
**Sécurité :** World doesn't mutate destination data
**Double clic/concurrence :** même commandId = même résultat; payload différent sous le même commandId = conflict; expectedVersion protège les mises à jour concurrentes.
**Réseau :** réponse perdue après commit = lecture du résultat par commandId.
**Tests :** nominal, permission refusée, target disparu, retry, concurrence, mobile, desktop, état DEGRADED.

### M04.5 Solo orientation
**Acteur :** new player
**Déclencheur :** first useful visit
**Préconditions :** no mandatory social dependency
**Entrées :** actor server-side, targetRef éventuel, payload validé, commandId, expectedVersion si nécessaire.
**Ordre exact :**
1. vérifier identité et permissions ;
2. charger le contexte minimal ;
3. vérifier l'état de la cible ;
4. appliquer select one understandable solo action → mark orientation progress → expose optional social path ;
5. commit de la mutation OrientationState ;
6. construire la projection depuis la donnée autoritative ;
7. émettre l'événement après commit.
**Erreur/récupération :** resume must be idempotent
**Sécurité :** no fake rewards
**Double clic/concurrence :** même commandId = même résultat; payload différent sous le même commandId = conflict; expectedVersion protège les mises à jour concurrentes.
**Réseau :** réponse perdue après commit = lecture du résultat par commandId.
**Tests :** nominal, permission refusée, target disparu, retry, concurrence, mobile, desktop, état DEGRADED.

### M04.6 Share discovery
**Acteur :** player
**Déclencheur :** tap share
**Préconditions :** source is shareable
**Entrées :** actor server-side, targetRef éventuel, payload validé, commandId, expectedVersion si nécessaire.
**Ordre exact :**
1. vérifier identité et permissions ;
2. charger le contexte minimal ;
3. vérifier l'état de la cible ;
4. appliquer privacy projection → scoped expiring token → public projection ;
5. commit de la mutation ShareToken ;
6. construire la projection depuis la donnée autoritative ;
7. émettre l'événement après commit.
**Erreur/récupération :** later privacy revocation blocks token
**Sécurité :** private source never leaks
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
