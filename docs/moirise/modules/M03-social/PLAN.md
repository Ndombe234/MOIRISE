# M03 — SOCIAL + PRIVATE MESSAGING — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité obligatoire
La description doit aller de la « France » jusqu'à la « porte » quand cela est nécessaire : acteur → déclencheur → préconditions → entrées → ordre précis → mutation → projection → événements → erreurs → reprise → sécurité → tests. Aucune phrase ne doit laisser une décision d'implémentation importante à deviner.

## 1. Owner
feed, contenu social, relations, conversations privées, pièces jointes et traduction
**Owner unique : M03.** Un consommateur peut afficher une projection mais ne peut pas recopier la règle métier.

## 2. Capacités
### M03.1 Post
**Acteur :** player
**Déclencheur :** publish
**Préconditions :** content and visibility valid
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. validate → moderation hook → persist → event → feed projection ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Post
**Échec/reprise :** failure leaves draft; no phantom post
**Sécurité :** visibility/block enforced
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.2 Comment/reaction
**Acteur :** player
**Déclencheur :** interact target
**Préconditions :** target visible and active
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. authorize target → validate state → idempotent mutation → projection ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Comment/Reaction
**Échec/reprise :** deleted target = safe unavailable
**Sécurité :** no cross-scope access
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.3 Follow
**Acteur :** player
**Déclencheur :** follow/unfollow
**Préconditions :** target policy permits
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. check block/privacy/self → unique relation → event ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Follow
**Échec/reprise :** duplicate = prior state
**Sécurité :** block dominates ranking
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.4 Conversation
**Acteur :** participant
**Déclencheur :** open/create
**Préconditions :** participant policy passes
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. resolve/create conversation → membership → bounded history ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Conversation/Participant
**Échec/reprise :** invalid membership = no partial create
**Sécurité :** member-scoped access
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.5 Message
**Acteur :** participant
**Déclencheur :** send/edit/delete
**Préconditions :** membership + payload + attachments valid
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. validate → idempotency → persist → delivery/read receipt separately ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Message
**Échec/reprise :** retry returns same result; failed upload blocks send
**Sécurité :** private content absent general telemetry
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.6 Translation
**Acteur :** participant
**Déclencheur :** request language view
**Préconditions :** source accessible, locale supported
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. mask handles/URLs/IDs/code → local/cache → provider if necessary → show translated view ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** TranslationCache/View
**Échec/reprise :** provider down leaves source intact
**Sécurité :** source canonical
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

## AI-INTÉGRATION M03 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M03 est l'autorité sociale et privée. Il peut embarquer de nombreuses fonctionnalités IA, mais toutes passent par MORISE AI et restent soumises à la privacy de M03.

### B. Cas AI
Traduction, modération, résumé, suggestion de réponse, aide à la création de post, classification, détection de contenu à risque, génération de projection de partage, recommandation sociale bornée.

### C. Contexte
Pour un post public : contenu et métadonnées publiques nécessaires. Pour un DM : uniquement participants, message/cadre strictement nécessaire et policy applicable. Les DMs ne sont pas utilisés comme mémoire globale par défaut.

### D. Séquence DM
M03 reçoit le message → policy/privacy → capability TRANSLATION/MODERATION si nécessaire → M15 → provider/worker → validation → M03 décide l'affichage/envoi → event.

### E. Partage
Une sortie AI ne transforme jamais un contenu privé en public. M03 construit la projection partageable, vérifie privacy et émet le token.

### F. Fallback
Message original conservé. Si traduction/modération AI indisponible, le produit utilise le fallback déterministe/politiques existantes et n'invente pas un résultat.

### G. DONE
Aucune capability AI de M03 ne permet un provider direct depuis UI; chaque action possède privacy class, validator, reason/error code et recovery.

## 10. CREATIVE MEDIA / REELS / STORIES / SHARING
The canonical cross-module plan is `docs/moirise/CREATIVE_MEDIA_VIRALITY_PLAN.md` and the canonical technical contract is `docs/moirise/CREATIVE_MEDIA_VIRALITY_TECHNICAL_DESIGN.md`.

### M03.7 Media post
Actor = player. Trigger = publish media. Preconditions = authenticated owner + media asset validated + visibility policy + originality/provenance state. Exact order = derive actor → load asset ref → check ownership/permission → validate MIME/size/status → moderation/originality gate → persist Post/Media relation → commit → event → feed projection.

### M03.8 Reel
A Reel is a published media projection owned by M03. It has owner, mediaRef, caption, optional audioRef, visibility, remixPolicy, attributionRef and status. Draft → Validated → Published → Distributed → Removed/Archived. Feed ranking belongs to M07.

### M03.9 Story
A Story contains one or more eligible media refs, audience policy and expiresAt. Default lifecycle = Draft → Validated → Published → Expired → Archived/Deleted. Private/close-friends audience is server-enforced.

### M03.10 Repost/remix
Repost references the original object and preserves attribution. Remix requires source permission and records sourceRef, transformation type, new creator and resulting asset. A trivial copy is not treated as original creation.

### M03.11 Share-to-DM/group
M03 creates a permission-checked share reference; it never copies private media into a public projection. Recipient access is evaluated at open time as well as share time.

### M03.12 User media → AI creation
M03 may request M15 analysis of explicitly permitted media. M15 receives only the minimum allowed context and returns a creative proposal/artifact candidate. M03 commits publication only after validator + privacy + provenance + owner decision.

### M03.13 Intelligent sharing
M03 emits meaningful `ShareOpportunity` events only after completed creations, games, challenges, collection milestones or similarly valuable outcomes. Cooldowns, dedupe and recipient relevance prevent spam.

### M03.14 Viral loop tests
Test upload → Reel → watch → share → recipient open → follow → create-from-concept → publish; Story expiry; repost attribution; remix permission; private-media leakage; duplicate share; provider outage; mobile/desktop; no-button-explosion UX.

# D10 — M03 SOCIAL — EXPANSION COMPORTEMENTALE
## Social object families
Post, Comment, Reaction, Follow, Conversation, Message, Photo, Reel, Story, Share, Repost, Remix, Save, Highlight.
## Feed/reels/stories
Feed may mix posts/media; Reels is immersive short video; Stories are ephemeral; Friends projection surfaces social context. All are projections of authoritative M03 objects.
## Story flow
CREATE_DRAFT → ASSET_CHECK → AUDIENCE → PREVIEW → PUBLISH → ACTIVE → EXPIRE → ARCHIVE/DELETE.
## Reel flow
DRAFT → UPLOAD → SCAN → READY → PUBLISH → DISCOVERY_ELIGIBLE → REMOVE/EXPIRE.
## Creation from media
A user can choose CREATE_FROM_SOURCE on permitted media. M03 authorizes source; M15 analyzes/generates; M03 owns resulting social publication.
## Repost/remix
Repost is pointer-based and keeps source provenance. Remix requires meaningful transformation metadata. Minor-copy content is not treated as original.
## Share
Share recipient may be friend, group, conversation or public share-token scope. Privacy/block checks precede token issuance.
## Viral loops
Every public social object may expose at most one primary next-action cluster in the current context: react/share/create/follow/play depending on object type.
## DONE
Posts, photos, Reels, Stories, DMs, repost/remix/share all obey privacy, idempotence, deletion, moderation, mobile/desktop and AI fallback.

# D100K — M03 Social — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M03. Scope: feed/posts/reactions/private messaging/published media. Dependencies: M01,M02.
Primary invariant: private state remains private; publishing is explicit.

For every capability of M03, the canonical state transition is:
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
AI/M15 may propose, classify, summarize or generate candidates only within the capability contract. M03 remains the owner of its authoritative state. AI output without validated evidence is non-authoritative.

## 4. Proof obligations
Each user-visible capability must prove:
SUCCESS + EMPTY/NO-DATA + ERROR + UNAVAILABLE/DEGRADED where applicable + REFRESH/REOPEN + MOBILE + DESKTOP + PERMISSION DENIAL + RETRY/REPLAY behavior.

## 5. Change-impact obligation
A change to a M03 contract requires traversal:
M03 → direct consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience scenarios.
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
