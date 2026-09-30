# M07 — GAME DISCOVERY — TECHNICAL DESIGN

## Boundary
M07 owns retrieval, filtering, ranking and recommendation presentation for posts, games, profiles, communities and events. It never owns the source records.

## Pipeline
`query → normalize → retrieve candidates → permission/safety filter → deterministic ranking → optional AI enrichment → diversify → cursor pagination → presentation`.

## Types
```ts
interface DiscoveryQuery { text?:string; kinds?:string[]; tags?:string[]; cursor?:string; limit:number; locale:string; }
interface Candidate { id:string; kind:string; score:number; reasons:string[]; }
interface DiscoveryResult { items:Candidate[]; nextCursor?:string; modelVersion?:string; }
```

## Ranking
Hard filters first: authorization, blocked users, private visibility, safety and availability. Then deterministic relevance/freshness/diversity. AI ranking is optional and cannot bypass hard filters.

## Personalization
Use explicit player interests and recent eligible behavior. Never infer sensitive attributes. Recommendation explanations are generated from recorded non-sensitive reasons.

## Caching
Public discovery can use short-lived cache keys containing normalized query/locale. User-specific results include user scope. Never share private result caches.

## AI boundary
Only `CapabilityRouter` calls AI. AI failure falls back to deterministic ranking.

## UI
Discover is a primary door. Search, categories, recommendations and filters are internal sections/tabs.

## Tests
authorization, blocked content, multilingual normalization, duplicate suppression, stable pagination, ranking determinism, AI fallback, empty state and mobile rendering.

## Done gate
Discovery is useful without AI and cannot leak content through ranking or caching.