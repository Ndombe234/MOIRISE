# M02 — Player Identity & Profile — CONCEPTION TECHNIQUE CANONIQUE

## 0. Règle de lecture
Ce document décrit COMMENT le module doit être construit. Les règles transversales ne sont pas redéfinies ici : voir CONTRACTS, SECURITY, ERROR_MODEL, EVENT_CATALOG et TESTING.

## 1. Boundary
Responsabilité unique : Fournir une identité Player persistante après authentification, avec profil public, paramètres privés, préférences explicites, confidentialité et gestion des données.
Dépendances : M01.

Le module expose une interface de service et des route handlers/server actions. L'UI ne doit pas posséder la logique d'autorisation.

## 2. Architecture en couches

~~~text
UI / Route
  ↓
Use Case / Command Handler
  ↓
Policy + Validation
  ↓
Domain Service
  ↓
Repository / Adapter
  ↓
Supabase ou autre infrastructure autorisée
  ↓
Event Publisher / Observability
~~~

Une mutation n'est considérée comme réussie qu'après validation de l'autorité et confirmation de la source de vérité.

## 3. Types canoniques

~~~text
ModuleId = "M02"
Command = { commandId, actorId, requestId, idempotencyKey?, payload, requestedAt }
Query = { requestId, actorId?, cursor?, limit, filters }
Result = { ok, data?, error?, traceId }
DomainEvent = { eventId, eventType, schemaVersion, actorId?, moduleId, occurredAt, requestId?, metadata }
~~~

Le type réel TypeScript doit rester aligné sur ces contrats. Aucun composant ne doit créer une variante parallèle du même identifiant.

## 4. Command pipeline

~~~text
receive
→ authenticate
→ authorize
→ validate input
→ load minimal context
→ check preconditions
→ reserve/lock if needed
→ mutate transactionally
→ publish domain event
→ invalidate affected caches
→ return canonical result
~~~

En cas de conflit, aucune mutation partielle ne doit être présentée comme réussie.

## 5. Command inventory

### 5.1 ENSURE_PROFILE
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi PLAYER_CREATED; PROFILE_UPDATED; PREFERENCE_UPDATED; AVATAR_REQUESTED; AVATAR_CREATED; PLAYER_DATA_REMOVED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

### 5.2 UPDATE_PROFILE
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi PLAYER_CREATED; PROFILE_UPDATED; PREFERENCE_UPDATED; AVATAR_REQUESTED; AVATAR_CREATED; PLAYER_DATA_REMOVED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

### 5.3 UPDATE_PREFERENCES
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi PLAYER_CREATED; PROFILE_UPDATED; PREFERENCE_UPDATED; AVATAR_REQUESTED; AVATAR_CREATED; PLAYER_DATA_REMOVED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

### 5.4 REQUEST_AVATAR
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi PLAYER_CREATED; PROFILE_UPDATED; PREFERENCE_UPDATED; AVATAR_REQUESTED; AVATAR_CREATED; PLAYER_DATA_REMOVED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

### 5.5 UPDATE_PRIVACY
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi PLAYER_CREATED; PROFILE_UPDATED; PREFERENCE_UPDATED; AVATAR_REQUESTED; AVATAR_CREATED; PLAYER_DATA_REMOVED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

### 5.6 DELETE_ALLOWED_DATA.
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi PLAYER_CREATED; PROFILE_UPDATED; PREFERENCE_UPDATED; AVATAR_REQUESTED; AVATAR_CREATED; PLAYER_DATA_REMOVED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

## 6. Query inventory

### 6.1 GET_MY_PROFILE
- résultat borné ;
- privacy check avant lecture ;
- pagination si cardinalité non bornée ;
- projection minimale ;
- cache uniquement si la classe de donnée l'autorise ;
- aucun secret dans la réponse ;
- traceId pour diagnostic.

### 6.2 GET_PUBLIC_PROFILE
- résultat borné ;
- privacy check avant lecture ;
- pagination si cardinalité non bornée ;
- projection minimale ;
- cache uniquement si la classe de donnée l'autorise ;
- aucun secret dans la réponse ;
- traceId pour diagnostic.

### 6.3 GET_MY_PREFERENCES
- résultat borné ;
- privacy check avant lecture ;
- pagination si cardinalité non bornée ;
- projection minimale ;
- cache uniquement si la classe de donnée l'autorise ;
- aucun secret dans la réponse ;
- traceId pour diagnostic.

### 6.4 GET_PROFILE_ACTIVITY
- résultat borné ;
- privacy check avant lecture ;
- pagination si cardinalité non bornée ;
- projection minimale ;
- cache uniquement si la classe de donnée l'autorise ;
- aucun secret dans la réponse ;
- traceId pour diagnostic.

### 6.5 GET_PROFILE_CREATORS.
- résultat borné ;
- privacy check avant lecture ;
- pagination si cardinalité non bornée ;
- projection minimale ;
- cache uniquement si la classe de donnée l'autorise ;
- aucun secret dans la réponse ;
- traceId pour diagnostic.

## 7. State machine

ABSENT → BOOTSTRAPPING → READY; READY → UPDATE_PENDING → READY ou CONFLICT/ERROR; DISABLED_ACCOUNT terminal.

Table de transition minimale :
- action valide + préconditions valides → état cible ;
- action invalide → état inchangé + erreur ;
- dépendance indisponible → état inchangé si possible ou état DEGRADED explicite ;
- retry → reprend depuis la dernière preuve persistée ;
- conflit → reload authoritative state puis choix contrôlé de merge ou rejet.

## 8. Persistence

Entités : PlayerProfile; PlayerPreferences; PublicProfileProjection; PrivacySettings; AvatarReference; PlayerActivityReference.

Pour chaque table/collection réelle, la version code doit définir :
- primary key ;
- foreign keys ;
- owner key ;
- indexes ;
- uniqueness ;
- createdAt/updatedAt ;
- soft-delete si nécessaire ;
- policy/RLS ;
- migration rollback strategy.

Les relations critiques sont imposées côté base lorsque le fournisseur de stockage le permet, pas uniquement dans TypeScript.

## 9. API/service boundary

Noms canoniques de use cases :
- ENSURE_PROFILE()
- UPDATE_PROFILE()
- UPDATE_PREFERENCES()
- REQUEST_AVATAR()
- UPDATE_PRIVACY()
- DELETE_ALLOWED_DATA.()

Règle : les fonctions de mutation déduisent actorId de la session, jamais du body.

Les route handlers et server actions renvoient un AppError normalisé. Ils ne renvoient pas de stack trace.

## 10. UI state machine

~~~text
IDLE
→ LOADING
→ SUCCESS
→ EMPTY lorsque la source est valide mais sans éléments
→ ERROR pour une erreur récupérable
→ UNAVAILABLE lorsque la capacité dépendante est absente
→ DEGRADED lorsque le noyau fonctionne mais avec moins de capacités
~~~

Aucun état de panne ne peut conduire à un écran blanc.

## 11. Caching

Définir pour chaque read model :
key = module + entity + id + version
owner = M02
TTL = selon volatilité
invalidateOn = événements propriétaires
privacy = public/player_private/sensitive

Une donnée privée ne doit pas partager accidentellement le cache d'une projection publique.

## 12. Concurrence et idempotence

Toute commande pouvant être répétée par double tap, retry réseau, reconnect ou worker lease renewal reçoit une idempotency key logique.

Les écritures concurrentes utilisent version checks ou transactions selon la donnée. Une réponse stale ne doit pas écraser silencieusement une version plus récente.

## 13. Sécurité détaillée

auth user id comme clé; self-write only; public/private projection séparées; blocked users non autorisés.

Threats spécifiques :
- forged actorId ;
- forged ownership ;
- stale role;
- injection via contenu utilisateur ;
- enumeration d'IDs ;
- abusive rate ;
- replay de commande ;
- leakage via cache ;
- metadata leakage ;
- unauthorized cross-tenant read.

Mitigations : session-bound identity, authorization server-side, bounded queries, rate limiting, schema validation, safe serialization, audit des opérations sensibles.

## 14. AI integration

bio assistance; translation; avatar generation; recommendation de personnalisation, toujours explicite et sans modification d'identité/permission.

L'intégration suit :
~~~text
Module → capability request → M19 policy → provider/local/worker routing → validation → module result
~~~

Le module ne contient aucun endpoint provider.

## 15. Events

Événements propriétaires : PLAYER_CREATED; PROFILE_UPDATED; PREFERENCE_UPDATED; AVATAR_REQUESTED; AVATAR_CREATED; PLAYER_DATA_REMOVED.

Chaque événement décrit entityId, changedFieldsSafe, actorId, requestId et version lorsque pertinent. Le contenu privé complet n'est jamais placé dans un événement global juste pour simplifier un consommateur.

## 16. Failure matrix

| Incident | Réaction |
|---|---|
| session expired | AUTH_REQUIRED, préserver l'intention si sûre |
| validation failure | VALIDATION, aucune mutation |
| unauthorized | FORBIDDEN, ne pas révéler de détail sensible |
| dependency timeout | TIMEOUT/DEGRADED + retry contrôlé |
| provider down | fallback ou fonctionnalité locale |
| worker lost | lease expiry + requeue si idempotent |
| duplicate command | retourner la preuve du premier succès |
| stale entity | CONFLICT + reload |
| DB failure | rollback transaction, ERROR |
| corrupted cache | invalidation + source of truth |

## 17. Observability

Tracer :
moduleId=M02
command/query name
traceId/requestId
latency bucket
outcome
error code
dependency latency
cache hit/miss
AI capability id si utilisé

Ne pas logger le contenu privé brut.

## 18. Performance budgets

Le design doit définir un budget de lecture initiale, un budget de payload, une limite de pagination et une limite de concurrence. Les éléments lourds sont différés.

## 19. Test matrix

Unit :
- validation ;
- state transitions ;
- idempotency ;
- authorization decisions ;
- deterministic formatting.

Integration :
- session + DB ;
- RLS/policy ;
- event emission ;
- cache invalidation.

E2E :
- route access ;
- visible actions ;
- recovery ;
- reload ;
- mobile.

Resilience :
- dependency unavailable ;
- timeout ;
- duplicate request ;
- concurrent mutation ;
- reconnect.

## 20. Runbook d'implémentation

1. Lire les contrats transversaux.
2. Inspecter les fichiers source existants.
3. Cartographier les éléments réutilisables.
4. Créer/mettre à jour les types.
5. Créer les migrations nécessaires.
6. Établir RLS/authorization.
7. Construire repositories/adapters.
8. Construire use cases.
9. Ajouter events/telemetry.
10. Construire UI.
11. Ajouter loading/empty/error/unavailable/degraded.
12. Ajouter tests.
13. Vérifier build/typecheck/lint.
14. Tester browser desktop/mobile.
15. Tester chaque bouton.
16. Corriger puis rejouer les tests.
17. Écrire la preuve de DONE.

## 21. Puzzle sheet

Owner = M02
Inputs = actor/session + payload validé + contexte minimal
Reads = GET_MY_PROFILE; GET_PUBLIC_PROFILE; GET_MY_PREFERENCES; GET_PROFILE_ACTIVITY; GET_PROFILE_CREATORS.
Commands = ENSURE_PROFILE; UPDATE_PROFILE; UPDATE_PREFERENCES; REQUEST_AVATAR; UPDATE_PRIVACY; DELETE_ALLOWED_DATA.
States = ABSENT → BOOTSTRAPPING → READY; READY → UPDATE_PENDING → READY ou CONFLICT/ERROR; DISABLED_ACCOUNT terminal.
Mutations = données du module uniquement
Permissions = session + policy propriétaire
Events = PLAYER_CREATED; PROFILE_UPDATED; PREFERENCE_UPDATED; AVATAR_REQUESTED; AVATAR_CREATED; PLAYER_DATA_REMOVED.
AI = bio assistance; translation; avatar generation; recommendation de personnalisation, toujours explicite et sans modification d'identité/permission.
Failure = validation/auth/conflict/dependency/retry/degraded
UI = Profile; Edit; Avatar; Preferences; activity; creations; games played; privacy.
Acceptance = création idempotente; handle collision; unauthorized mutation impossible; profil fonctionne sans IA.

Si une pièce manque, l'implémentation doit s'arrêter avant de deviner.

## 22. Definition of DONE

Le module est terminé lorsque les contrats, données, mutations, permissions, UI, états de récupération, événements, observabilité et tests correspondent simultanément au Plan de module et aux contrats transversaux.