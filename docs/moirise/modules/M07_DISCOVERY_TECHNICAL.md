# M07 — DISCOVERY — TECHNICAL CONTRACT

## Boundary
M07 owns search, exploration, ranking and recommendation presentation. It does not own the source-of-truth social/game data.

## Pipeline
`query/filter → normalize → candidate retrieval → eligibility filter → ranking → pagination → presentation`.

## Types
```ts
interface DiscoveryQuery { text?:string; tags?:string[]; cursor?:string; limit:number; }
interface DiscoveryCandidate { id:string; kind:"post"|"game"|"profile"|"community"|"event"; score:number; reasons:string[]; }
interface DiscoveryResult { items:DiscoveryCandidate[]; nextCursor?:string; }
```

## Ranking
Use deterministic rules first: permissions, freshness, relevance, user-selected interests and diversity. AI recommendations are optional enrichment and must not bypass permissions or safety filters.

## UI
Discovery is inside the Discover primary door. Search, categories and recommendations are sections/tabs; no extra global buttons.

## AI boundary
Call `CapabilityRouter` with `discover.rank` or `discover.explain`. Never call Pollinations, DeepSeek, LLM7 or another provider directly.

## Caching
Cache normalized queries/results briefly. Invalidate after relevant content changes. Never cache private search results across users.

## Tests
permission filtering, deterministic ranking, AI failure fallback, pagination, duplicate suppression, multilingual query normalization, mobile layout.

## Done gate
Discovery never exposes unauthorized content and remains fully usable when AI recommendations are unavailable.