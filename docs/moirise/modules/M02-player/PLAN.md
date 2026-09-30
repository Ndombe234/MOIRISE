# M02 — PLAYER — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité obligatoire
La description doit aller de la « France » jusqu'à la « porte » quand cela est nécessaire : acteur → déclencheur → préconditions → entrées → ordre précis → mutation → projection → événements → erreurs → reprise → sécurité → tests. Aucune phrase ne doit laisser une décision d'implémentation importante à deviner.

## 1. Owner
identité, profil, préférences, confidentialité, avatars, mémoire et preuves DNA
**Owner unique : M02.** Un consommateur peut afficher une projection mais ne peut pas recopier la règle métier.

## 2. Capacités
### M02.1 Bootstrap
**Acteur :** user authentifié
**Déclencheur :** première entrée
**Préconditions :** auth user id présent
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. lookup player → create defaults atomically if missing → return existing on retry ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Player
**Échec/reprise :** race = unique constraint + existing
**Sécurité :** auth id serveur
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.2 Public profile
**Acteur :** player
**Déclencheur :** view/edit profile
**Préconditions :** player active
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. load public projection → validate fields → versioned update → invalidate cache ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** PublicProfileProjection
**Échec/reprise :** invalid field = no partial write
**Sécurité :** privacy server-enforced
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.3 Private settings
**Acteur :** player
**Déclencheur :** change preference/privacy
**Préconditions :** setting key known
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. check current version → validate value → commit → emit change event ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Preferences/PrivacySettings
**Échec/reprise :** stale version = conflict/reload
**Sécurité :** private values not public
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.4 Handle
**Acteur :** player
**Déclencheur :** confirm handle
**Préconditions :** normalized format valid
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. Unicode normalize → uniqueness check → atomic change ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** HandleRef
**Échec/reprise :** taken = conflict without owner leak
**Sécurité :** canonical uniqueness
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.5 Avatar
**Acteur :** player
**Déclencheur :** upload/generate
**Préconditions :** file/provider result allowed
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. quarantine → MIME/size/dimensions → safety → publish ref → replace ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** AvatarRef
**Échec/reprise :** failure keeps old avatar
**Sécurité :** safe storage
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.6 Memory/DNA evidence
**Acteur :** system/validated action
**Déclencheur :** validated event or explicit memory
**Préconditions :** source/provenance/privacy class known
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. store evidence → confidence/version → optional M15 pattern → invalidation path ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** MemoryEntry/DNAEvidence
**Échec/reprise :** low confidence stays evidence
**Sécurité :** no sensitive inference/global private chats
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

## AI-INTÉGRATION M02 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M02 est l'autorité de l'état Player. MORISE AI comprend le Player via des projections et scopes autorisés; il ne possède jamais les tables Player.

### B. Surfaces
Bootstrap, profil public, préférences, privacy, handle, avatar, mémoire Player, preuves DNA.

### C. Contextes transmis à MORISE AI
Seulement le minimum nécessaire : playerId dérivé côté serveur, locale, préférences explicitement autorisées, intérêts déclarés, historique validé, mémoire avec scope et provenance, signaux de session. La privacy profile est appliquée avant routage.

### D. Capacités AI permises
Personnalisation, résumé de profil, suggestions, retrieval de mémoire Player, analyse de préférences, aide créative liée au profil, traduction de champs autorisés.

### E. Frontière de mutation
M15 peut proposer une modification mais M02 valide et écrit. Un provider ne peut pas écrire profile/preferences/avatar/memory.

### F. Mémoire
Une mémoire Player doit porter scope, provenance, retention, sourceRef et consentement/policy applicable. Une mémoire privée ne devient jamais mémoire World ou mémoire globale par simple sortie IA.

### G. Fallback
Sans IA, le profil, les préférences, la privacy et les projections déterministes restent opérationnels.

### H. DONE AI
Chaque capacité de personnalisation possède schema, privacy policy, validator, owner commit et tests d'isolation entre Player.