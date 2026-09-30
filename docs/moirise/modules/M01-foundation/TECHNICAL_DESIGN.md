# M01 — FOUNDATION — CONCEPTION TECHNIQUE

## Architecture
UI/Route → server boundary → command/query service → policy → infrastructure adapter → event/trace.

## Contrats
AppConfig, FeatureFlag, SystemEvent, CapabilityDefinition, ProviderDefinition, RequestTrace.

## Event envelope
{eventId,eventType,schemaVersion,moduleId,actorId?,requestId?,occurredAt,metadataSafe}.

## AI Gateway
Input: capabilityId + typed payload + actor/session context + privacy class. Gateway vérifie l'autorisation, route vers M15 et interdit les appels provider depuis l'UI.

## State
COLD → BOOTING → CONFIGURED → SESSION_RESTORED → READY. Une dépendance facultative peut produire DEGRADED; une erreur shell reste isolée par ErrorBoundary.

## Security
Secrets serveur uniquement; actorId dérivé de la session; validation; CORS; rate limits; aucun service-role dans le bundle; aucun endpoint provider arbitraire.

## Performance
Lazy routes, lazy capabilities, no AI call at boot, no full memory hydration, no heavy media preload.

## Tests
Boot, deep links, unknown route, loading/empty/error/unavailable, Event Bus, capability validation, secret scan, responsive 390/768/1280/1440, production build.

## DONE
Shell et contrats stables; aucune future capability n'est obligée de modifier App.tsx pour exister.
