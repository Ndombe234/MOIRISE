# CONTRATS TRANSVERSAUX CANONIQUES

## Identité

Toutes les opérations dérivent actorId depuis la session serveur. Les display names et handles ne sont jamais des clés d'autorité.

## Command/Query

Les commandes mutent. Les queries lisent. Une commande critique est idempotente lorsque la répétition est possible.

## API

Toute API interne définit input, auth requirement, output, errors, idempotency behavior et observability fields.

## Événements

Chaque événement porte eventId, eventType, schemaVersion, occurredAt, actorId si disponible, moduleId, requestId si disponible et metadata sûre.

## AI Capability

Un module réclame un Capability ID. Il ne sélectionne jamais un provider par lui-même.

## Provider

Un provider est derrière un adapter. La configuration provider appartient au registre IA.

## Worker

Une tâche longue utilise taskId, graphId, capabilityVersion, dependencies, resource requirements, lease, attempt, validator et idempotency key.

## Pagination

Les listes doivent être bornées. Les curseurs sont stables et non prédictifs lorsque nécessaire.

## AsyncState

Chaque surface asynchrone possède au minimum idle/loading/success/empty/error/unavailable/degraded quand ces états sont pertinents.

## Cache

Un cache possède owner, key schema, TTL, invalidation policy et privacy class.

## Data deletion

Chaque donnée persistante sensible possède une politique de rétention et un chemin de suppression documenté.


# D100K — LEGACY CORE CONTRACT RESTORATION

Canonical cross-cutting TypeScript concepts that remain required where applicable:
`SystemIntent`, `OrchestrationPlan`, `OrchestrationStep`, `OrchestrationResult`, `ValidationResult`, `SystemError`, `ProviderContext`, `ProviderHealth`, `ProviderAdapter`, `DomainEvent`, `CapabilityDescriptor`, `CapabilityRequest`, `CapabilityResult`, `IdempotencyContext`, `AsyncJob`.

These names describe contract roles, not permission to recreate duplicate owners. Module-specific versions must remain owned by their canonical module/AI contract.

A capability result may be COMPLETED, FAILED, UNAVAILABLE, DEGRADED or CANCELED. Unavailability is not fake success.

