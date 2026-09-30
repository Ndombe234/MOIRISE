# M07 — GAME DISCOVERY — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. Search contract
SearchQuery {query, locale, cursor?, limit, filters}. SearchPage {items[], nextCursor, rankingVersion}. Server bounds limit and validates filters.

## 2. Pipeline
candidate generation → visibility/block filter → safety filter → dedupe → diversity → novelty → ranking → reason projection. Filtering happens before scoring so hidden items cannot influence presentation.

## 3. Recommendation evidence
RecommendationSet stores rankingVersion, candidate refs, reason keys, generatedAt and expiry. A reason key is an enumerated safe explanation, not a free text dump of private data.

## 4. Feedback
DiscoveryFeedback = actor, item, action, createdAt, policyVersion, dedupeKey. Rate limits and duplicate checks happen before the write used by ranking.

## 5. Research
ResearchEvidence = sourceRef, retrievedAt, claimRef, confidence, status, licenseNote. VERIFIED means source was captured/checked according to policy, not absolute truth. INCONCLUSIVE items cannot be treated as facts.

## 6. Failure / recovery
AI/reranker down → lexical/baseline ranking. Provider source down → claim INCONCLUSIVE. Cache stale → recompute safe projection. Duplicate feedback → dedupe. Block/privacy change → invalidate affected recommendation projections.

## 7. Security
Visibility and block checks before ranking. External text is untrusted input. No sensitive inference. No arbitrary URL execution from search results. No private user data in general logs.

## 8. Performance
Cursor pagination, bounded candidate pool, asynchronous research, safe projection cache and no full-catalog rerank per request.

## 9. Observability
query hash, rankingVersion, candidate count, filtered count, fallback reason, latency. Avoid raw private query content in broad telemetry.

## 10. Browser tests
Mobile/desktop search, empty state, deterministic pagination, recommendation dismissal, provider outage and confirmation that blocked/private items never reappear.

## 11. DONE
Discovery works without AI, has explainable ranking inputs and cannot leak private, blocked or unsafe content.