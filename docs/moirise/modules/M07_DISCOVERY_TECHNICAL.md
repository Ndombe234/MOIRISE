# M07 — GAME DISCOVERY — COMPLETE TECHNICAL CONTRACT

## Responsibility
M07 owns retrieval, filtering, deterministic ranking, personalization and presentation of discoverable games/content. It never owns source records or private access rules.

## Query contract
```ts
interface DiscoveryQuery { text?:string; kinds?:string[]; tags?:string[]; cursor?:string; limit:number; locale:string; }
interface Candidate { id:string; kind:string; score:number; reasons:string[]; }
interface DiscoveryResult { items:Candidate[]; nextCursor?:string; rankingVersion:string; }
```

## Pipeline
`normalize → retrieve candidates → authorization/private filter → block/safety filter → deterministic relevance/freshness/diversity → optional AI enrichment → cursor pagination → presentation`.

Hard filters always run before ranking. AI cannot bypass them.

## Personalization
Use explicit interests and eligible recent behavior. Do not infer sensitive attributes. Store recommendation reasons from non-sensitive signals so explanations are auditable.

## Cache
Public results use short TTL keys containing normalized query, locale and ranking version. User-specific results include user scope. Never cache private results in a public cache.

## AI boundary
Only the canonical CapabilityRouter may invoke AI. AI ranking is optional. If unavailable, deterministic ranking remains fully functional.

## UI
Discover is a primary door. Search, categories, filters, recommendations and result explanations are contextual sections.

## Performance
Cursor pagination; bounded candidate count; deduplication before rendering; lazy media; virtualized long lists. Avoid repeated AI calls for identical query/context hashes.

## Tests
Authorization; blocked content; multilingual normalization; duplicate suppression; stable cursor; ranking determinism; personalization privacy; AI fallback; empty/error/unavailable states; mobile rendering.

## Done gate
Discovery is useful without AI and cannot leak private or blocked content through ranking, caching or explanations.