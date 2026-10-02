# M01 — FOUNDATION — CONCEPTION TECHNIQUE DÉTAILLÉE

## 1. Boundary
UI → server boundary → M01 use-case → policy → repository/adapter → persistence → event → projection.

## 2. Command
```
{ commandId, actorId(server-derived), capabilityId, targetRef?, expectedVersion?, payload }
```
Reject : actorId arbitraire, capability inconnue, payload hors schema, target hors scope, version périmée, commandId réutilisé avec payload différent.

## 3. Capability contracts
### M01.C1 Boot
Input : actor + contexte minimal + payload validé.
Guards : assets/config publique accessibles.
Execution : valider config → monter shell → restaurer session → résoudre route → READY.
Output authority : aucune mutation métier.
Failure policy : optionnel down = DEGRADED; critique down = RECOVERABLE_ERROR.
Security boundary : secrets jamais client.

### M01.C2 Route
Input : actor + contexte minimal + payload validé.
Guards : RouteDefinition existe ou 404 gérable.
Execution : normaliser URL → auth guard → feature flag → owner module → projection.
Output authority : navigation seulement.
Failure policy : route inconnue = 404; non autorisée = sign-in/forbidden.
Security boundary : URL n'autorise rien.

### M01.C3 Session
Input : actor + contexte minimal + payload validé.
Guards : session valide.
Execution : lire session → dériver actorId serveur → créer SessionContext minimal.
Output authority : SessionContext.
Failure policy : expiration avant commit = reauth sans write.
Security boundary : client actorId non fiable.

### M01.C4 Capability registry
Input : actor + contexte minimal + payload validé.
Guards : schema, owner, version fournis.
Execution : valider → unique id+version → health → résolution par capabilityId.
Output authority : CapabilityDefinition.
Failure policy : doublon/schema invalide = reject.
Security boundary : provider non choisi par UI.

### M01.C5 AI gateway
Input : actor + contexte minimal + payload validé.
Guards : actor+privacy+schema valides.
Execution : validate → minimize context → policy/autonomy → M15 → validate output.
Output authority : execution ref/normalized result.
Failure policy : provider down = fallback; invalid output = INCONCLUSIVE.
Security boundary : keys/URLs server-only.

### M01.C6 Event bus
Input : actor + contexte minimal + payload validé.
Guards : event schema valide.
Execution : envelope → persist/publish → consumer dedupe.
Output authority : SystemEvent.
Failure policy : duplicate delivery = no second mutation.
Security boundary : payload privé minimisé.

## 4. State/persistence
State transition = trigger + guards + transaction + event + projection. Unique constraints sur les opérations uniques; optimistic version quand plusieurs writers. Projection/cache n'est jamais source d'autorité.

## 5. Event envelope
eventId, eventType, schemaVersion, producerModule, occurredAt, commandId?, requestId?, actorRef?, payloadRef. Event = fait déjà committé. Consumers idempotents.

## 6. Error model
VALIDATION, AUTH_REQUIRED, FORBIDDEN, NOT_FOUND, CONFLICT, RATE_LIMITED, TIMEOUT, DEPENDENCY_UNAVAILABLE, INCONCLUSIVE, INTERNAL. Aucun stack trace/secret dans UI.

## 7. Recovery
Commit puis réseau coupé → GET by commandId. Worker/provider down → fallback si capacité optionnelle. Data deleted before commit → transaction abort. Unknown event version → quarantine. Duplicate event → dedupe.

## 8. Security
IDOR prevention, server-derived actor, input/output schema, session controls, secret isolation, rate limits, privacy scope before provider routing, no privileged client bundle.

## 9. Observability
requestId, traceId, commandId, module, capability, stateBefore/After, validation outcome, duration, errorCode. Pas de contenu privé brut.

## 10. Browser/tests
Deep-link, refresh, mobile, desktop, back, keyboard, double tap, concurrent tabs, provider outage, degraded state, no white screen, production build.

## 11. Performance
Pagination/cursor, bounded payloads, async heavy work, lazy assets, cache invalidation, no AI dependency on critical boot.

## 12. DONE
Build + tests + security + recovery + observability + mobile/desktop + no duplicate authority.

## 13. AI MODULE CONTRACT — M01

### 13.1 Types
AIRequest = { requestId, traceId, actorId(server), sourceModule, capabilityId, capabilityVersion, targetRef?, payload, privacyClass, requestedAutonomy, resourceBudget }.
AIResult = { requestId, capabilityId, status, outputRef?, evidenceRefs[], validatorStatus, errorCode?, providerRef?, executionRef? }.

### 13.2 Route interne
M01 expose une frontière logique unique vers MORISE AI. Un endpoint UI ne doit jamais appeler un provider. La route d'entrée valide actor/session/capability/payload puis délègue.

### 13.3 Invariants
- actorId client ignoré;
- capability inconnue rejetée;
- version incompatible rejetée;
- privacy non autorisée rejetée;
- résultat INCONCLUSIVE non présenté comme VALID;
- aucune mutation métier externe effectuée par le gateway.

### 13.4 Idempotence
La clé de déduplication est commandId ou idempotencyKey selon use-case. Même requête = même résultat récupérable; payload différent avec même clé = conflict.

### 13.5 Tests de contrat IA
boot sans AI, route protégée, provider down, invalid output, duplicate request, session expired, privacy escalation, forged actorId, no-secret client bundle, concurrent calls, degraded response.

# D10 — M01 FOUNDATION — CONCEPTION TECHNIQUE
## Runtime envelope
`RequestContext = {requestId,traceId,actorId,sessionId,route,deviceProfile,locale,capabilityId?,privacyClass?}`.
actorId/sessionId derive server-side.
## Route registry
RouteSpec = path + auth + owner + loader + boundary + errorBoundary + analyticsClass + mobilePolicy + prefetchPolicy.
No route may call a provider directly.
## Share token
`ShareToken = tokenId,sourceRef,issuerRef,audience,permission,expiresAt,revocationVersion,signature`.
Validation order = signature → expiry → revocation → audience → source visibility.
## Error envelope
`AppError = code,requestId,retryable,userMessageKey,technicalRef?` with no secret/stack in UI.
## AI boundary
POST /api/ai accepts capabilityId/inputRefs/constraints/requestedAutonomy. M01 authenticates and M15 executes. Provider identifiers are never client authority.
## Observability
requestId/traceId/capability/route/status/latency only; no raw DM/private media content.
## Tests
auth expiry, refresh race, deep-link, back/forward, share revocation, invalid route, provider outage, no-white-screen, CSP and mobile viewport.