# M01 — Foundation / Identity Boundary — CONCEPTION TECHNIQUE CANONIQUE

## 0. Règle de lecture
Ce document décrit COMMENT le module doit être construit. Les règles transversales ne sont pas redéfinies ici : voir CONTRACTS, SECURITY, ERROR_MODEL, EVENT_CATALOG et TESTING.

## 1. Boundary
Responsabilité unique : Construire le socle runtime fiable de MOIRISE : bootstrap, configuration, session, routing, shell partagé, erreurs, événements, feature flags et frontières de sécurité.
Dépendances : aucun module métier; consomme uniquement les primitives du runtime et du fournisseur d'identité configuré.

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
ModuleId = "M01"
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

### 5.1 BOOT_APPLICATION
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi APPLICATION_BOOT_STARTED; APPLICATION_READY; SESSION_RESTORED; SESSION_EXPIRED; FEATURE_FLAG_CHANGED; ERROR_OCCURRED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

### 5.2 RESTORE_SESSION
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi APPLICATION_BOOT_STARTED; APPLICATION_READY; SESSION_RESTORED; SESSION_EXPIRED; FEATURE_FLAG_CHANGED; ERROR_OCCURRED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

### 5.3 SIGN_OUT
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi APPLICATION_BOOT_STARTED; APPLICATION_READY; SESSION_RESTORED; SESSION_EXPIRED; FEATURE_FLAG_CHANGED; ERROR_OCCURRED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

### 5.4 OPEN_ROUTE
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi APPLICATION_BOOT_STARTED; APPLICATION_READY; SESSION_RESTORED; SESSION_EXPIRED; FEATURE_FLAG_CHANGED; ERROR_OCCURRED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

### 5.5 RETRY_RESOURCE
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi APPLICATION_BOOT_STARTED; APPLICATION_READY; SESSION_RESTORED; SESSION_EXPIRED; FEATURE_FLAG_CHANGED; ERROR_OCCURRED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

### 5.6 TOGGLE_ALLOWED_PREFERENCE
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi APPLICATION_BOOT_STARTED; APPLICATION_READY; SESSION_RESTORED; SESSION_EXPIRED; FEATURE_FLAG_CHANGED; ERROR_OCCURRED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

### 5.7 REGISTER_FEATURE_FLAG_OVERRIDE.
Entrée : actorId, requestId, payload spécifique, idempotencyKey si la répétition est possible.
Préconditions : session valide + permission du propriétaire + état compatible.
Validation : schéma, taille, enum, références existantes et policy.
Mutation : effectuée dans la frontière serveur du module.
Post-condition : état cible atteint ou aucune mutation.
Événement : choisir un événement canonique parmi APPLICATION_BOOT_STARTED; APPLICATION_READY; SESSION_RESTORED; SESSION_EXPIRED; FEATURE_FLAG_CHANGED; ERROR_OCCURRED..
Retry : uniquement si la mutation n'est pas ambiguë ou si l'idempotencyKey permet la déduplication.
Observabilité : duration, outcome, error.code, traceId, sans données privées inutiles.

## 6. Query inventory

### 6.1 GET_RUNTIME_CONFIG
- résultat borné ;
- privacy check avant lecture ;
- pagination si cardinalité non bornée ;
- projection minimale ;
- cache uniquement si la classe de donnée l'autorise ;
- aucun secret dans la réponse ;
- traceId pour diagnostic.

### 6.2 GET_ROUTE_META
- résultat borné ;
- privacy check avant lecture ;
- pagination si cardinalité non bornée ;
- projection minimale ;
- cache uniquement si la classe de donnée l'autorise ;
- aucun secret dans la réponse ;
- traceId pour diagnostic.

### 6.3 GET_SESSION
- résultat borné ;
- privacy check avant lecture ;
- pagination si cardinalité non bornée ;
- projection minimale ;
- cache uniquement si la classe de donnée l'autorise ;
- aucun secret dans la réponse ;
- traceId pour diagnostic.

### 6.4 GET_FEATURE_FLAGS
- résultat borné ;
- privacy check avant lecture ;
- pagination si cardinalité non bornée ;
- projection minimale ;
- cache uniquement si la classe de donnée l'autorise ;
- aucun secret dans la réponse ;
- traceId pour diagnostic.

### 6.5 GET_HEALTH.
- résultat borné ;
- privacy check avant lecture ;
- pagination si cardinalité non bornée ;
- projection minimale ;
- cache uniquement si la classe de donnée l'autorise ;
- aucun secret dans la réponse ;
- traceId pour diagnostic.

## 7. State machine

COLD → BOOTING → CONFIGURED → SESSION_RESTORING → READY; READY → DEGRADED; toute étape peut → FATAL_SHELL_ERROR avec récupération.

Table de transition minimale :
- action valide + préconditions valides → état cible ;
- action invalide → état inchangé + erreur ;
- dépendance indisponible → état inchangé si possible ou état DEGRADED explicite ;
- retry → reprend depuis la dernière preuve persistée ;
- conflit → reload authoritative state puis choix contrôlé de merge ou rejet.

## 8. Persistence

Entités : AppConfig; RouteMeta; Session; FeatureFlag; SystemEvent; RequestTrace; CapabilityDefinition; AppError.

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
- BOOT_APPLICATION()
- RESTORE_SESSION()
- SIGN_OUT()
- OPEN_ROUTE()
- RETRY_RESOURCE()
- TOGGLE_ALLOWED_PREFERENCE()
- REGISTER_FEATURE_FLAG_OVERRIDE.()

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
owner = M01
TTL = selon volatilité
invalidateOn = événements propriétaires
privacy = public/player_private/sensitive

Une donnée privée ne doit pas partager accidentellement le cache d'une projection publique.

## 12. Concurrence et idempotence

Toute commande pouvant être répétée par double tap, retry réseau, reconnect ou worker lease renewal reçoit une idempotency key logique.

Les écritures concurrentes utilisent version checks ou transactions selon la donnée. Une réponse stale ne doit pas écraser silencieusement une version plus récente.

## 13. Sécurité détaillée

aucun secret navigateur; session serveur autoritaire; config publique explicitement allow-listée; admin routes server-authorized.

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

Aucun appel IA pendant le boot normal. Expose seulement les contrats Capability et AI Gateway; l'IA peut ensuite utiliser le shell comme surface.

L'intégration suit :
~~~text
Module → capability request → M19 policy → provider/local/worker routing → validation → module result
~~~

Le module ne contient aucun endpoint provider.

## 15. Events

Événements propriétaires : APPLICATION_BOOT_STARTED; APPLICATION_READY; SESSION_RESTORED; SESSION_EXPIRED; FEATURE_FLAG_CHANGED; ERROR_OCCURRED.

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
moduleId=M01
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

Owner = M01
Inputs = actor/session + payload validé + contexte minimal
Reads = GET_RUNTIME_CONFIG; GET_ROUTE_META; GET_SESSION; GET_FEATURE_FLAGS; GET_HEALTH.
Commands = BOOT_APPLICATION; RESTORE_SESSION; SIGN_OUT; OPEN_ROUTE; RETRY_RESOURCE; TOGGLE_ALLOWED_PREFERENCE; REGISTER_FEATURE_FLAG_OVERRIDE.
States = COLD → BOOTING → CONFIGURED → SESSION_RESTORING → READY; READY → DEGRADED; toute étape peut → FATAL_SHELL_ERROR avec récupération.
Mutations = données du module uniquement
Permissions = session + policy propriétaire
Events = APPLICATION_BOOT_STARTED; APPLICATION_READY; SESSION_RESTORED; SESSION_EXPIRED; FEATURE_FLAG_CHANGED; ERROR_OCCURRED.
AI = Aucun appel IA pendant le boot normal. Expose seulement les contrats Capability et AI Gateway; l'IA peut ensuite utiliser le shell comme surface.
Failure = validation/auth/conflict/dependency/retry/degraded
UI = Shell desktop minimal; navigation mobile basse; loading/error/not-found boundaries; primitives Button/Card/Dialog/Drawer/Input/Toast/Skeleton/Empty/Error.
Acceptance = boot stable; deep links; auth redirect; erreur isolée sans écran blanc; desktop/mobile; aucune clé secrète dans le bundle.

Si une pièce manque, l'implémentation doit s'arrêter avant de deviner.

## 22. Definition of DONE

Le module est terminé lorsque les contrats, données, mutations, permissions, UI, états de récupération, événements, observabilité et tests correspondent simultanément au Plan de module et aux contrats transversaux.