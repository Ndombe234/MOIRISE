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

## 10. CREATIVE MEDIA / PROFILE VIRALITY INTEGRATION
M02 remains the sole owner of identity/profile/avatar. The cross-module contract `CREATIVE_MEDIA_VIRALITY_PLAN.md` and its technical design define the shared media pipeline.

### Profile media behavior
A Player may expose avatar, optional profile visual/video, public creator highlights and selected public creations. These are projections of M02-owned identity plus M03-owned published content; M02 never duplicates the social feed rules.

### AI-generated profile media
The sequence is upload/generate request → M02 privacy/identity guard → M15 capability request → media originality/provenance validation → M02 owner commit → profile projection.

### User media learning
M02 may expose explicitly permitted Player-owned media references to M15. It must not silently promote private media into global training/memory. The context includes provenance, permission, scope, retention and sourceRef.

### DONE
Profile photo/avatar generation, profile media, deletion, privacy changes and AI creative suggestions remain functional when AI providers are unavailable.

# D10 — M02 PLAYER — EXPANSION COMPORTEMENTALE
## Identity surface
Profile = identity + preferences + privacy + avatar + public creations projection + selected highlights. No direct AI write.
## Profile evolution
VIEW_PUBLIC → FOLLOW/INTERACT → VIEW_CREATIONS → OPEN_HIGHLIGHT → CREATE_FROM_PROFILE_MEDIA when policy permits. Private settings never enter public ranking without explicit allowed signals.
## Avatar/media
Upload/generate path uses quarantine, MIME/size/dimension checks, moderation, provenance and replace transaction. Generated avatar retains source/derivation metadata.
## Personalization
PlayerAIContext may include explicit interests, locale, current activity and validated memory; sensitive inference is forbidden.
## Viral hooks
Profile has shareable safe entry points: profile card, selected Reel/Photo/Story highlight, creator collection. Every shared surface resolves through M01 token policy.
## Player memory
Store only validated memories with scope/provenance/retention/consent. Promotion to broader scope requires owner/policy.
## DONE D10
Cold-start profile, profile editing, avatar generation, media highlight, privacy changes, account deletion propagation, AI outage and cross-player isolation are validated.

# D100 — SPÉCIFICATION COMPORTEMENTALE
## Profile projection
VIEW_PUBLIC charge uniquement les champs autorisés par privacyVersion. EDIT_PROFILE compare expectedVersion avant mutation. Une modification privée ne modifie jamais la projection publique tant qu'aucun champ public n'a été validé.
## Handle
normalize Unicode → validate syntax → reserved-word check → availability check → transactional claim. Une course de deux clients retourne CONFLICT pour le perdant sans révéler le propriétaire.
## Avatar/media
UPLOAD/GENERATE → QUARANTINE → MIME/DIMENSION/size → safety → provenance → owner decision → replace transaction. L'ancien avatar reste actif tant que le nouveau n'est pas validé.
## Memory
Toute mémoire Player possède sourceRef, scope, provenance, confidence, retention et policy. Une suppression du Player déclenche la suppression/invalidation des projections et des mémoires selon retention policy.
## AI
AI peut proposer profil, avatar, résumé, personnalisation et création dérivée. M02 reste le seul commit owner.
## Share
ProfileShare crée un token M01 et une projection privacy-safe. Un blocage ou changement de privacy invalide les projections affectées.
## Tests
cross-player read denial, private setting leak, concurrent handle, avatar quarantine failure, delete propagation, AI outage, stale profile update.