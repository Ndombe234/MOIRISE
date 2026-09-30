# M01 — FOUNDATION — CONCEPTION TECHNIQUE APPROFONDIE

## 1. Boundary
M01 owns the application shell, route boundary, session boundary, shared UI contracts, configuration, feature flags, event envelope, capability registry, AI Gateway boundary, storage abstraction and runtime health.

## 2. Runtime architecture
UI/Route → server boundary → use-case facade → policy → repository/adapter → database/provider → event/trace.
No module imports another module's private repository.

## 3. Boot sequence
1. process starts;
2. safe public configuration loaded;
3. environment validated;
4. theme/design primitives mounted;
5. auth session restored;
6. route authorization evaluated;
7. essential data requested;
8. READY emitted.
Optional dependency failure results in DEGRADED, not a blank screen.

## 4. Route contract
RouteDefinition = { path, ownerModule, requiresAuth, preloadPolicy, featureFlag? }.
A capability does not create a route automatically. Contextual capabilities appear inside existing routes.

Primary doors target: SYSTEM, PLAYER, SOCIAL, WORLD, PLAY, CREATE.

## 5. Event bus
Event envelope:
eventId, eventType, schemaVersion, moduleId, actorId?, tenantId, requestId?, occurredAt, metadataSafe.
Events are immutable append-like facts. Consumers cannot mutate the producer's state directly.

## 6. Capability registry
CapabilityDefinition = { id, version, owner, inputSchema, outputSchema, policyClass, allowedTargets, validator, health }.
M01 only registers contracts. M15 owns AI execution.

## 7. AI Gateway
Input: capabilityId, payload, actor/session context, privacy class, requested autonomy.
Gateway checks authentication, passes canonical context metadata and sends to M15.
The frontend never contains provider SDK keys or arbitrary provider URLs.

## 8. Configuration
Separate public config from secret config.
Public: environment name, feature flags, safe UI settings.
Secret: Supabase server keys/provider keys, server only.

## 9. Storage abstraction
Domain code depends on typed interfaces. Supabase adapter remains replaceable.
Transactions/idempotency are expressed at the use-case layer and enforced in storage where possible.

## 10. Error boundary
AppError = { code, category, messageKey, retryable, userAction, traceId, detailsSafe }.
React errors are isolated by route/layout boundary. Network/provider errors do not expose raw diagnostics to Players.

## 11. Security
Session-derived actorId.
No service-role in client bundle.
Input validation.
CSRF/session protections appropriate to mutation model.
Safe response serialization.
Rate limiting hooks.
Feature flags cannot grant permissions.
Provider endpoints are allow-listed.

## 12. Health
Health is split into:
SHELL_READY;
DATABASE_AVAILABLE;
AUTH_AVAILABLE;
AI_OPTIONAL;
PROVIDER_HEALTH;
WORKER_HEALTH.
A dependency can be unavailable while core navigation remains READY.

## 13. Responsive shell
One information architecture; geometry adapts to 390x844, tablet and desktop.
No horizontal overflow.
Primary actions are touch-safe.
Keyboard/focus states remain available.

## 14. Performance
No AI call at boot.
No full memory hydration.
No heavy 3D engine preload.
No global provider SDK bundle.
Use route-level/lazy capability loading.

## 15. Tests
Boot; deep link; unknown route; session expiry; error boundary; feature flag off/on; capability schema; event schema; secret scan; mobile; desktop; degraded dependency; production build.

## 16. Failure matrix
Shell error → route boundary/recover.
Auth timeout → sign-in state.
Optional AI unavailable → normal non-AI path.
Provider down → M15 fallback.
Database unavailable → safe unavailable state.
Duplicate event → dedupe consumer policy.

## 17. Handoff
M02 consumes session/profile boundary.
M03 consumes Player identity and event contracts.
M04 consumes route/surface contracts.
M05 consumes events, capabilities and SYSTEM shell.
All future modules consume M01 without editing App shell for every new capability.

## 18. DONE
M01 is complete only when boot, routing, auth boundary, event bus, capability registry, error/loading states, security, responsive shell and production build are proven.

## 19. Command contracts
BOOT_APPLICATION(): returns boot state only.
RESTORE_SESSION(): derives actor from auth cookie/session.
OPEN_ROUTE(route): checks route definition and feature flag.
RETRY_RESOURCE(resourceId): only retryable dependencies.
REGISTER_CAPABILITY(definition): server/internal only.
EMIT_EVENT(event): validates event schema and module ownership.

## 20. Data contracts
FeatureFlag {key, enabled, environment, version}
RouteDefinition {path, ownerModule, requiresAuth, status}
RequestTrace {requestId, traceId, actorId?, startedAt, endedAt, outcome}

## 21. Concurrency
Boot can be invoked multiple times safely.
Capability registration uses unique(id,version).
Feature flags use version/etag.
Event consumers must tolerate duplicate delivery.

## 22. Operational scenarios
No auth provider: public shell remains available.
Supabase unavailable: authenticated data surfaces degrade.
AI unavailable: all non-AI core routes remain functional.
Provider misconfiguration: health marks provider unavailable; no boot failure.

## 23. Acceptance examples
Deep-link /play while signed out → auth boundary, not blank page.
Deep-link /system with expired session → session renewal/sign-in.
Provider key absent → capability unavailable, no client leak.
Unknown event version → consumer ignores/quarantines, does not crash shell.
