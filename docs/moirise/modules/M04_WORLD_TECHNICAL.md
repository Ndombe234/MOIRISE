# M04 — WORLD — TECHNICAL DESIGN

## Boundary
M04 owns the coherent MOIRISE world model: zones, categories, themes, navigation context and world metadata. It does not own player progression or game execution.

## Data
`world_zones`, `world_nodes`, `world_tags`, `world_feature_flags`.

## Types
```ts
interface WorldZone { id:string; key:string; titleKey:string; descriptionKey:string; order:number; enabled:boolean; }
interface WorldContext { zoneId:string; locale:string; playerId:string; availableActions:string[]; }
```

## Placement
The world is presented through existing primary doors. Zones are sections/context, not additional global navigation buttons.

## SYSTEM coordination
The SYSTEM may surface the next useful action based on current context. It must not hide required navigation or trap the player in an animation.

## Data rules
World metadata is versioned. Feature flags are server-authoritative. Disabled content remains addressable only for migration/admin recovery, never for ordinary users.

## AI boundary
AI can propose world text, recommendations and adaptive candidates through capabilities. It cannot directly alter production world configuration.

## Performance
Static world metadata is cacheable; personalized context is user-scoped. Lazy-load heavy world visualizations.

## Tests
zone visibility, feature flags, localization keys, invalid zone fallback, direct-route recovery, mobile layout and AI-unavailable behavior.

## Done gate
The player always has a clear location/context and can navigate the complete product without exposing dozens of buttons.