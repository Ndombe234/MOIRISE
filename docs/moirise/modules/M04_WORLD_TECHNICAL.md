# M04 — WORLD — COMPLETE TECHNICAL CONTRACT

## Responsibility
M04 owns the coherent MOIRISE world model: zones, nodes, themes, categories, contextual navigation metadata and feature availability. It does not own progression, games or AI internals.

## Data
`world_zones`, `world_nodes`, `world_tags`, `world_feature_flags`, `world_versions`.

## Types
```ts
interface WorldZone { id:string; key:string; titleKey:string; descriptionKey:string; order:number; enabled:boolean; version:number; }
interface WorldNode { id:string; zoneId:string; kind:string; targetRef:string; visibility:string; }
interface WorldContext { zoneId:string; locale:string; playerId:string; availableActions:string[]; }
```

## Resolution
`route/context → load world version → validate feature flags → resolve locale → resolve player eligibility → expose contextual actions`.

## Placement rule
World zones are sections inside the six primary doors, never six-plus additional permanent buttons. The SYSTEM can surface the next useful action without trapping the player or hiding core navigation.

## Versioning
World configuration is versioned and server-authoritative. A disabled node remains available only for migration/admin recovery. Published world versions are immutable; changes create a new version.

## AI boundary
AI may propose text, recommendations or adaptation candidates. It cannot directly activate production world configuration. M13 owns adaptive activation.

## Caching
Static world metadata is cacheable by version/locale. Player-specific context is user-scoped. Never mix personalized availability into public cache entries.

## Failure states
Unknown zone → safe Home context. Missing translation → fallback locale. Disabled feature → contextual unavailable state. Failed world fetch → cached last-known-safe version where valid.

## Tests
Feature-flag authorization; version rollback; locale fallback; invalid route; direct deep link; player eligibility; stale cache; mobile layout; AI unavailable; world-version migration.

## Done gate
The player always knows where they are, has a valid next action, and can reach all primary product areas without a large permanent control surface.