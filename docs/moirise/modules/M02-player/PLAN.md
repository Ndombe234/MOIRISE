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

# D100K — M02 Player — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M02. Scope: identity/profile/preferences/privacy. Dependencies: M01.
Primary invariant: identity is authoritative here.

For every capability of M02, the canonical state transition is:
ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

No capability is complete if an implementation decision remains inferable from prose alone.

## 2. Forbidden states
A transition must have zero mutation when:
- authorization fails;
- input/schema validation fails;
- required version is incompatible;
- target is outside owner scope;
- idempotency conflict occurs;
- a required authoritative dependency is unavailable.

## 3. AI boundary
AI/M15 may propose, classify, summarize or generate candidates only within the capability contract. M02 remains the owner of its authoritative state. AI output without validated evidence is non-authoritative.

## 4. Proof obligations
Each user-visible capability must prove:
SUCCESS + EMPTY/NO-DATA + ERROR + UNAVAILABLE/DEGRADED where applicable + REFRESH/REOPEN + MOBILE + DESKTOP + PERMISSION DENIAL + RETRY/REPLAY behavior.

## 5. Change-impact obligation
A change to a M02 contract requires traversal:
M02 → direct consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience scenarios.
Unknown impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
- owner authority cannot be bypassed;
- duplicate commands do not duplicate authoritative mutation;
- stale versions do not silently overwrite newer state;
- projections can be rebuilt from authoritative state;
- privacy/visibility constraints survive every handoff;
- VERIFIED cannot be emitted without applicable evidence.

## 7. Completion
D100K means the feature definition is machine-checkable. It does not mean the code is already fabricated.


# D100K — HISTORICAL CONTRACT RESTORATION — M02 PLAYER

## Restored behavior
- Un seul Player peut modifier son propre profil/préférences.
- Aucune mutation de profil d'un autre Player depuis client ou AI.
- Les préférences explicites peuvent servir à la personnalisation non sensible.
- La suppression de données est contrôlée et traçable.
- Une mise à jour échouée possède une stratégie de rollback/retry sûre.
- PLAYER DATA et MORISE MEMORY restent deux domaines différents.
- Les changements d'identité/sécurité attendent une confirmation serveur.

## Canonical contracts
`PlayerProfile={id,handle,displayName,avatarRef?,bio,locale,createdAt}`
`PlayerPreferences={locale,theme:'dark',interests,privacy:'public'|'friends'|'private'}`
`PlayerPatch={displayName?,bio?,avatarRef?,locale?,interests?,privacy?}`

## D100K proof
Other-player mutation denial, privacy-policy enforcement at persistence layer, malformed avatar, invalid locale, deletion scope, retry/duplicate mutation, session expiry, audit event and mobile profile flow.



# D100K — RESTORED DEVICE CAPABILITY CONTRACT

M02 owns the Player device capability profile used for adaptive execution. It may record non-sensitive operational capability data such as device class, RAM class, WebGPU/WASM/WebCodecs availability, browser family and a bounded capability map.

A device profile must not be interpreted as consent to use device resources. Resource sharing requires the separate worker opt-in flow defined by M15.

D100K: stale device profile, spoofed capability, privacy boundary, unsupported locale, low-memory fallback and update idempotency.



# D100K — RESTORED MEMORY VAULT OWNER CONTRACT

M02 owns Player identity-linked private memory references, while M03 owns social publication. The Memory Vault is private by default.

Lifecycle:
SELECT → VALIDATE → UPLOAD → METADATA → INDEX → READY → optional ORGANIZE → optional SHARE → DELETE.

Media may be photo/video/audio/text/creation/Moment/Card according to current contracts. STORE, ANALYZE, SHARE and TRAIN are independent permissions. Private media is never silently sent to external models or promoted to global training memory.

D100K: upload cancellation, invalid MIME/size, checksum mismatch, duplicate object, deletion propagation, revoked share and provider outage.

