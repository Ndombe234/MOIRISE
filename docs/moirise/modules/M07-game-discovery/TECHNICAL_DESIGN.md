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

## 11. AI MODULE CONTRACT — M07

### 11.1 Candidate schema
DiscoveryCandidate = itemRef + visibilityClass + safetyStatus + freshness + novelty + explicitPreferenceSignals + lexicalScore + optionalAIScore.

### 11.2 AI input gate
Only candidates passing visibility/safety/privacy can enter AI ranking. AI reasonKey cannot expose hidden sensitive ranking features.

### 11.3 Output
AI rerank result contains ordered candidate refs, bounded score/weight metadata and evidence/reason keys. M07 recomputes final visibility and diversity before projection.

### 11.4 Tests
blocked candidate never reaches AI, private item never ranked, provider outage baseline ranking, deterministic pagination, duplicate feedback, stale AI scores invalidated after privacy change.

## GAME PLATFORM — CONCEPTION TECHNIQUE M07

GameCatalogItem = gameId + buildId + version + mode + engineClass + visibilityClass + deviceProfile + tags + durationProfile + status + discoverySignals.

Publication = build validation + M09 runtime compatibility + content/safety checks + publication policy.

L'AI rerank ne voit que les candidats déjà autorisés. M07 recalcule visibility, diversity et novelty avant projection.

Un build invalidé ou retiré ne doit plus être lançable même si une ancienne projection est en cache. Tests : build non validé absent, retrait, filtres 2D/3D, compatibilité mobile, pagination et fallback sans AI.

## 12. CREATIVE SOCIAL DISCOVERY TECHNICAL CONTRACT
Canonical shared design = `docs/moirise/CREATIVE_MEDIA_VIRALITY_TECHNICAL_DESIGN.md`.

### 12.1 Public media candidate
`MediaDiscoveryCandidate = mediaRef + ownerRef + visibilityClass + safetyStatus + originalityStatus + freshness + novelty + creatorDiversityKey + interactionFeatures + optionalAIScore`.

### 12.2 Hard filters
Before any AI scoring: visibility → block/mute → recommendation eligibility → safety → originality publish state → dedupe. A Story with `expiresAt <= now` is excluded.

### 12.3 Ranking signals
Use versioned bounded signals: view choice, completion, dwell quality, likes, not-interested, shares, follows, saves, freshness, novelty and creator diversity. Burst activity is downweighted. No private activity is used in public projections.

### 12.4 Friends activity
`FriendsActivityProjection` contains only public eligible objects and allowed relationship activity. User-controlled hiding/muting removes the relevant projection.

### 12.5 Create-from-concept
M07 emits a capability reference to M15/M03 rather than copying source media. The sourceRef and permission state remain attached to the candidate.

### 12.6 Cold start
New users receive a deterministic diverse baseline using declared interests, language and public safe content. The system does not fabricate a social graph.

### 12.7 Tests
Expired Story exclusion, private like exclusion, hidden creator exclusion, not-interested suppression, repeated-share burst suppression, diversity floor, creator cold-start, originality inconclusive and provider outage fallback.