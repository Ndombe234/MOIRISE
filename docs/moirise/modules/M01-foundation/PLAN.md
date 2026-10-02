# M01 — FOUNDATION — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité obligatoire
La description doit aller de la « France » jusqu'à la « porte » quand cela est nécessaire : acteur → déclencheur → préconditions → entrées → ordre précis → mutation → projection → événements → erreurs → reprise → sécurité → tests. Aucune phrase ne doit laisser une décision d'implémentation importante à deviner.

## 1. Owner
socle runtime, shell, session, routing, configuration, capabilities et événements
**Owner unique : M01.** Un consommateur peut afficher une projection mais ne peut pas recopier la règle métier.

## 2. Capacités
### M01.1 Boot
**Acteur :** visiteur/Player
**Déclencheur :** open ou refresh
**Préconditions :** assets/config publique accessibles
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. valider config → monter shell → restaurer session → résoudre route → READY ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** aucune mutation métier
**Échec/reprise :** optionnel down = DEGRADED; critique down = RECOVERABLE_ERROR
**Sécurité :** secrets jamais client
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M01.2 Route
**Acteur :** visiteur/Player
**Déclencheur :** clic ou deep-link
**Préconditions :** RouteDefinition existe ou 404 gérable
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. normaliser URL → auth guard → feature flag → owner module → projection ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** navigation seulement
**Échec/reprise :** route inconnue = 404; non autorisée = sign-in/forbidden
**Sécurité :** URL n'autorise rien
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M01.3 Session
**Acteur :** user authentifié
**Déclencheur :** callback/refresh
**Préconditions :** session valide
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. lire session → dériver actorId serveur → créer SessionContext minimal ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** SessionContext
**Échec/reprise :** expiration avant commit = reauth sans write
**Sécurité :** client actorId non fiable
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M01.4 Capability registry
**Acteur :** service interne
**Déclencheur :** register/resolve
**Préconditions :** schema, owner, version fournis
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. valider → unique id+version → health → résolution par capabilityId ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** CapabilityDefinition
**Échec/reprise :** doublon/schema invalide = reject
**Sécurité :** provider non choisi par UI
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M01.5 AI gateway
**Acteur :** module autorisé
**Déclencheur :** request capability AI
**Préconditions :** actor+privacy+schema valides
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. validate → minimize context → policy/autonomy → M15 → validate output ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** execution ref/normalized result
**Échec/reprise :** provider down = fallback; invalid output = INCONCLUSIVE
**Sécurité :** keys/URLs server-only
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M01.6 Event bus
**Acteur :** module owner
**Déclencheur :** post-commit
**Préconditions :** event schema valide
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. envelope → persist/publish → consumer dedupe ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** SystemEvent
**Échec/reprise :** duplicate delivery = no second mutation
**Sécurité :** payload privé minimisé
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.


## 3. États
Chaque capacité définit explicitement ses états et transitions. Une transition est trigger → auth guard → business guard → mutation → event → projection. Une guard échouée n'écrit rien. Un résultat INCONCLUSIVE n'est jamais traité comme VALID.

## 4. Données
Toutes les entités ont id, owner/actor relation, status, version, createdAt, updatedAt, privacyClass et retentionPolicy. Les données privées possèdent une portée de lecture explicite.

## 5. Cross-module
Échange uniquement par use-case, event ou projection versionnée. M01 reste owner des frontières; M02 de l'identité; M03 du contenu social/privé.

## 6. UX
LOADING, READY, EMPTY réel, ERROR, UNAVAILABLE et DEGRADED. Aucun écran blanc. Pas de nouvelle porte principale créée automatiquement.

## 7. IA
Toute assistance passe par M15/CAPABILITY_ID. La sortie AI est une proposition/evidence jusqu'à validation du owner. Aucun provider n'est appelé directement par l'interface.

## 8. Security
Server authority, schema validation, access checks, rate limits, secrets server-only, provenance, private-data minimization, no raw private message telemetry.

## 9. DONE
Persistence, permissions, events, idempotence, recovery, tests, browser desktop/mobile, observability et anti-doublon d'autorité validés.

## AI-INTÉGRATION M01 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position dans MORISE AI
M01 est la porte d'entrée technique entre l'application et MORISE AI. M01 ne raisonne pas à la place de M15 : il authentifie l'acteur, valide la requête, applique les frontières de session/privacy/capability, transmet une demande conforme à M15 et rend le résultat normalisé au consommateur.

### B. Ce que l'IA de fabrication doit comprendre
M01 possède : boot, route, session, capability registry, AI gateway et event bus. M01 ne possède pas la progression, Player, Social, World, Play, rewards ou communautés. Toute modification de ces domaines doit être remise à leur owner.

### C. Entrée AI
Acteur → requestId/traceId → sourceModule → capabilityId/version → targetRef éventuel → payload validé → privacyClass → autonomy → resource budget. actorId vient du serveur.

### D. Séquence obligatoire
1. dériver actorId serveur;
2. vérifier session et permission;
3. valider capabilityId/version;
4. charger le contexte minimal autorisé;
5. vérifier privacy/policy/autonomy;
6. créer le contrat d'appel M15;
7. exécuter via M15;
8. valider la sortie;
9. retourner le résultat sans lui attribuer d'autorité métier;
10. journaliser uniquement les métadonnées autorisées.

### E. Ce que M01 laisse faire à l'IA
M15 peut choisir une capability existante, planifier, router, utiliser un provider/worker autorisé et produire une proposition/résultat validable.

### F. Ce que M01 interdit
Provider choisi par UI, capability inconnue, actorId client fiable, secret exposé, write cross-owner, bypass policy, contexte privé ajouté silencieusement.

### G. Fallback
MORISE AI indisponible : la fonctionnalité qui peut être déterministe continue sans IA. Une dépendance critique ne doit jamais produire un écran blanc.

### H. DONE AI
Chaque capability possède contrat, version, schema, validator, policy, observability, fallback et test. Le gateway doit empêcher un second AI router dans un autre module.

# D10 — M01 FOUNDATION — EXPANSION COMPORTEMENTALE
## Autorité et parcours
M01 possède les frontières qui rendent tout le reste fiable : session réelle, routing, permissions de base, capability boundary, event envelope et erreurs globales. Aucun module ne peut contourner M01.
## Bootstrap exact
APP_START → ENV_VALIDATE → SESSION_RESOLVE → DEVICE_CONTEXT → ROUTE_GUARD → PLAYER_BOOTSTRAP → CAPABILITY_DISCOVERY → PROJECTION. Une dépendance non critique ne doit pas rendre le shell vide.
## Navigation
Chaque route possède authClass, ownership, preload policy, loading/empty/error/degraded states, deep-link rule, back/forward behavior et mobile/desktop behavior. SYSTEM contextuel peut ouvrir une capability sans créer une nouvelle route globale.
## Security
Server-derived actor, CSP/headers, CSRF where applicable, IDOR prevention, secret isolation, safe redirect allowlist, upload quarantine, rate limit et session expiry handling. Les URLs externes sont des données, pas des instructions.
## Social/viral foundation
Les share links, invite links et media derivative links doivent utiliser des tokens signés/versionnés et révocables. M01 fournit l'identité de la session et la politique de partage sans posséder le contenu métier.
## AI boundary
Toute AIRequest passe par l'auth/policy boundary M01 avant M15. Aucun provider direct dans les composants frontend.
## DONE D10
Startup, auth loss, refresh, deep-link, revoked session, invalid capability, expired share token, provider outage, slow network, mobile keyboard and desktop navigation all produce recoverable states.