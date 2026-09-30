# MOIRISE Module 07 — GAME DISCOVERY ENGINE

## 1. Purpose

Créer le moteur qui aide un joueur à découvrir des expériences sans enfermer son profil dans une bulle.

## 2. User experience

Entrées : suggestions, recherche, nouveautés, tendances, collections, expériences communautaires.

## 3. Ranking

Le classement combine :
- préférences explicites ;
- historique autorisé ;
- contexte courant ;
- nouveauté ;
- diversité ;
- qualité mesurée ;
- disponibilité.

Aucune règle ne doit dire « l'utilisateur aime X, donc montrer uniquement X ».

## 4. MORISE

Exemple :
« Tu joues beaucoup aux puzzles. Je t'en propose un qui fonctionne autrement. »

MORISE doit expliquer une recommandation lorsqu'elle le juge utile.

## 5. Data

discovery_candidates
discovery_impressions
discovery_interactions
discovery_feedback
recommendation_profiles

## 6. AI

Capabilities :
RECOMMENDATION
SEARCH
EMBEDDING
RANKING
TRANSLATION

## 7. Observation

PostHog peut recevoir des signaux d'observation autorisés, mais ne devient pas la source de vérité de la recommandation.

## 8. Providers

Provider-neutral. Le module doit fonctionner avec un fallback non-IA.

## 9. Performance

- pagination ;
- ranking batch ;
- embeddings asynchrones ;
- cache ;
- ne pas générer une recommandation IA à chaque scroll.

## 10. Security

Ne jamais utiliser de données sensibles pour profiler un joueur.

## 11. Tests

- diversité ;
- nouveautés ;
- recherche ;
- provider unavailable ;
- no data ;
- cold start ;
- mobile ;
- recommendation determinism where expected.

## 12. Acceptance

Le joueur peut découvrir des expériences pertinentes et nouvelles sans dépendance obligatoire à un provider.

## 13. Do not modify

Le module ne crée pas les jeux. Il les découvre.

## 14. New-AI handoff

L'algorithme de recommandation doit être versionné.


---

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

# M07 — GAME DISCOVERY

## Goal
Discover games through a clean catalog, search, categories and contextual recommendations.

## UI
One Play door; inside it, tabs/filters can change context without adding global navigation buttons.

## MORISE
Ranks recommendations from explicit preferences, play history and safe aggregate signals. It must avoid fabricating ratings or popularity.

## Performance
Paginated catalog, thumbnail lazy-loading, cached public metadata and bounded recommendation queries.

## Acceptance
Search, filters, recommendations, unavailable games, moderation state and mobile catalog all work.




## 17. Canonical implementation runbook

1. Normalize search text, tags, locale and filters before retrieval.
2. Retrieve a bounded candidate set from authoritative public catalog data.
3. Apply authorization, block, moderation and availability filters before any ranking.
4. Apply deterministic relevance, freshness and diversity rules.
5. Add optional AI ranking/enrichment only after hard filters.
6. Record rankingVersion and non-sensitive reason codes with each recommendation batch.
7. Use cursor pagination and stable ordering so refresh/reconnect does not reshuffle unpredictably.
8. Cache only public or user-scoped results with the correct cache key.
9. Never infer sensitive personal traits.
10. Avoid AI calls on every scroll; reuse context hashes and cached result explanations.
11. Add cold-start behavior using explicit interests, freshness and diversity.
12. Test blocked content, private content, duplicate candidates, stale cursors, AI outage, empty catalog and mobile discovery.

### Canonical server contracts
searchDiscovery, getDiscoveryFeed, recordDiscoveryFeedback, rebuildRecommendationProfile. The recommendation profile is versioned and can be reset.

### Completion proof
Discovery remains useful with AI fully disabled and cannot leak private/blocked content through retrieval, ranking or caching.

## 21. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.