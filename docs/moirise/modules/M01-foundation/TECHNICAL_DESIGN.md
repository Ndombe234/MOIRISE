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

# D1K — M01 MACHINE-FABRICATION MAP

This section is the executable assembly map for the current M01 implementation state. It does not create a third M01 authority; PLAN.md remains the behavior authority and this document remains the HOW/fabrication authority.

## A. Feature IDs

- M01-F01 Foundation contracts and types
- M01-F02 Application errors
- M01-F03 Capability registry
- M01-F04 Public Supabase configuration
- M01-F05 Server/browser Supabase adapters
- M01-F06 Server-derived session context
- M01-F07 Application shell and recoverable UI states
- M01-F08 Health/session HTTP surfaces
- M01-F09 Authentication flows
- M01-F10 Fabrication/contract tests

## B. Task graph

~~~text
M01-T01 contracts
M01-T02 errors
M01-T03 capabilities
M01-T04 public-config
        ↓
M01-T05 Supabase server/browser adapters
        ↓
M01-T06 session context
        ↓
M01-T07 shell
        ↓
M01-T08 health/session routes
        ↓
M01-T09 auth + callback + proxy
        ↓
M01-T10 focused contract tests
        ↓
M01-T11 desktop browser
        ↓
M01-T12 mobile browser
        ↓
M01-T13 security/resilience
        ↓
M01-T14 production build/evidence
~~~

Parallelism is allowed only among T01–T04 because they have stable type-only/config boundaries. T05 onward is serialized by dependency.

## C. File/symbol contracts

| Task | Exact file(s) | Exact symbol(s) | Current code state | Proof state |
|---|---|---|---|---|
| M01-T01 | lib/m01/contracts.ts | AuthClass, RequestContext, SessionContext, CapabilityStatus, CapabilityDefinition | IMPLEMENTED | PARTIAL |
| M01-T02 | lib/m01/errors.ts | createAppError | IMPLEMENTED | PARTIAL |
| M01-T03 | lib/m01/capabilities.ts | listCapabilities, resolveCapability, DEFINITIONS | IMPLEMENTED | PARTIAL |
| M01-T04 | lib/m01/public-config.ts | getPublicSupabaseConfig | IMPLEMENTED | PARTIAL |
| M01-T05 | lib/supabase/server.ts, lib/supabase/client.ts | createSupabaseServerClient, createSupabaseBrowserClient | IMPLEMENTED | PARTIAL |
| M01-T06 | lib/m01/session.ts | resolveSessionContext | IMPLEMENTED | PARTIAL |
| M01-T07 | app/layout.tsx, app/page.tsx, app/loading.tsx, app/error.tsx | RootLayout, HomePage, Loading, GlobalError | IMPLEMENTED | PARTIAL |
| M01-T08 | app/api/health/route.ts, app/api/session/route.ts | GET | IMPLEMENTED | PARTIAL |
| M01-T09 | app/auth/sign-in/page.tsx, app/auth/sign-up/page.tsx, app/auth/callback/route.ts, proxy.ts | SignInPage, SignUpPage, GET, proxy | IMPLEMENTED | NOT EVIDENCED IN BROWSER |
| M01-T10 | tests/m01-contracts.test.ts | capability/error contract suites | IMPLEMENTED | PARTIAL |
| M01-T11 | deployed/dev runtime | user flow below | NOT YET VERIFIED | NOT EVIDENCED |
| M01-T12 | mobile viewport | user flow below | NOT YET VERIFIED | NOT EVIDENCED |
| M01-T13 | runtime/security controls | failure matrix below | NOT YET CLOSED | NOT EVIDENCED |
| M01-T14 | CI/build environment | typecheck/test/build + evidence package | NOT YET CLOSED | NOT EVIDENCED |

## D. Function-level contracts

### resolveSessionContext
- INPUT: no client actor input.
- AUTHORITY: server Supabase session/user.
- OUTPUT: SessionContext.
- SIDE EFFECT: none in current implementation.
- ERROR BEHAVIOR: auth lookup failure resolves to unauthenticated context.
- TESTS: valid session, anonymous session, malformed/expired session behavior.
- CURRENT NOTE: sessionId is currently null; the canonical contract requires session semantics to be closed before M01 DONE.

### listCapabilities
- INPUT: none.
- AUTHORITY: current in-memory M01 definitions.
- OUTPUT: readonly capability definitions.
- SIDE EFFECT: none.
- INVARIANT: every returned definition has ownerModule = M01.
- TEST: contract ownership assertion.

### resolveCapability
- INPUT: capabilityId, optional version.
- AUTHORITY: M01 definitions.
- OUTPUT: matching capability or null.
- SIDE EFFECT: none.
- INVARIANT: unknown version returns null.
- TEST: current contract suite.

### createAppError
- INPUT: code, requestId, userMessageKey, optional retryability/technical ref.
- AUTHORITY: error contract.
- OUTPUT: sanitized AppError.
- FORBIDDEN: stack traces, secrets or raw provider payloads.
- TEST: default retryability and optional fields.

### createSupabaseServerClient / createSupabaseBrowserClient
- INPUT: public Supabase URL + publishable key.
- AUTHORITY: environment configuration.
- FORBIDDEN: service-role secrets in browser.
- TEST: configuration failure path and bundle inspection.

## E. Exact browser verification recipe

### Desktop
1. Open /.
2. Confirm shell renders and no blank screen occurs.
3. Click Se connecter.
4. Confirm /auth/sign-in renders.
5. With an authorized test account, submit valid credentials.
6. Expect redirect to /.
7. Refresh /.
8. Confirm session remains valid when configuration/session policy permits.
9. Open /api/session.
10. Confirm response reflects the authenticated session without exposing secrets.
11. Sign out using the currently available session mechanism or test session expiry/revocation when logout is introduced.
12. Reopen /auth/sign-in.
13. Submit invalid credentials.
14. Confirm a recoverable error is shown and no duplicate submit occurs while busy.
15. Use the back/forward navigation path.
16. Open an invalid route and confirm a recoverable 404 rather than a blank screen.

### Mobile
Repeat the same flow with a mobile viewport and additionally verify:
- touch target usability;
- no horizontal overflow;
- form fields remain visible with keyboard;
- loading/error states remain readable;
- refresh does not create a blank surface.

### Security/failure
Attempt:
- forged client actor identity;
- missing public configuration;
- expired session;
- duplicate submission;
- callback without code;
- callback with unsafe next;
- unavailable Supabase;
- refresh during auth transition.

Expected behavior must match the relevant M01 contract and never expose secrets.

## F. Evidence requirements

M01-T01 through M01-T10 cannot become VERIFIED solely from file existence. Focused tests must pass.

M01-T11/T12 require fresh browser evidence.

M01-T13 requires security/resilience checks relevant to the implemented boundary.

M01-T14 requires fresh typecheck + test + production build evidence from the current commit.

Current repository state therefore remains:
M01 = IN PROGRESS / D1K FABRICATION MAP COMPLETE / DONE NOT CLAIMED.

## G. Open fabrication gaps

The following are explicitly NOT implemented/closed and must become their own future tasks before M01 DONE:
- durable event bus/outbox;
- persisted capability registry;
- production rate limiting;
- complete observability;
- signed/revocable share implementation;
- complete M15 AI gateway;
- complete session ID/refresh semantics;
- browser desktop verification;
- browser mobile verification;
- dependency-failure/resilience verification;
- concurrency/replay verification;
- production evidence package.
