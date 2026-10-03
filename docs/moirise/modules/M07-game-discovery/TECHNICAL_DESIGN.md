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

# D10 — M07 GAME DISCOVERY — CONCEPTION TECHNIQUE
## Candidate
`DiscoveryCandidate={itemRef,visibility,safety,deviceCompat,relationshipSignals,freshness,novelty,contentQuality,optionalAIScore}`.
## Ranking formula
Hard filters first; then deterministic weighted scoring with versioned weights. AI score is one bounded feature. RankingVersion is stored with projection.
## Feedback
play/share/dismiss/save/follow are event types with dedupeKey, rate limits and decay. Spam bursts are capped.
## Explanation
reasonKey enumerates factual causes; no hidden sensitive reason leaks.
## Research
External evidence is isolated from social ranking and marked verified/inconclusive/stale.
## Tests
blocked candidate, private candidate, device incompatibility, new-user cold start, stale score, duplicate feedback, pagination cursor stability.

# D100K — M07 Game Discovery — FABRICATION / CONTRACT / EVIDENCE LAYER

## 1. Task record
Every implementation unit: TASK_ID → FEATURE_ID → FILES → SYMBOLS → INPUT/OUTPUT SCHEMA → AUTHORITY → MUTATIONS → EVENTS → DEPENDENCIES → TESTS → BROWSER → EXPECTED → EVIDENCE → STATUS.

## 2. File contract
Exact path, owner M07, exports, allowed dependencies, forbidden ownership, side effects, persistence/events, errors, tests, browser surfaces.

## 3. Function contract
Exact symbol/types, preconditions, authoritative reads/writes, idempotency, concurrency/version, errors, observability, callers, direct tests.

## 4. Adversarial verification
Forged references/results, permission bypass, replay, duplicate commands, races, stale versions, malformed AI/provider output, dependency timeout, partial network failure, privacy leakage and client-side authority bypass.

## 5. Evidence
TASK_ID → COMMIT → TEST/SCENARIO → EXPECTED → ACTUAL → ENVIRONMENT → STATUS. Evidence from older commits cannot certify newer code.

## 6. Ownership firewall
A task cannot write another module's authoritative state. It must use an allowed use-case, event or projection.

## 7. Production lock
Unit tests alone never produce VERIFIED for a user-facing capability.
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M07 GAME DISCOVERY
## Owner scope
M07 consumes authorized interest/context signals for discovery. It must distinguish explicit preferences from inferred recommendation signals.
## Ranking input classes
EXPLICIT_PREFERENCE, RECENT_ACTION, SOCIAL_SIGNAL, WORLD_CONTEXT, SYSTEM_CONTEXT. Sensitive profile facts are excluded by default.
## Explainability
Each recommendation keeps reason codes and source class; raw private memory is never shown as ranking explanation.
## D100K tests
Cold start; preference update; sensitive-field exclusion; stale signal expiry; multilingual search; recommendation diversity; cache invalidation.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M07
## RF-M07-01 Discovery Broadcast eligibility
Accept only real published/eligible artifacts. Candidate carries sourceRef, visibility, age, provenance and reason codes.

## RF-M07-02 Curiosity / novelty / diversity
Ranking inputs include freshness, novelty, diversity, explicit preference and recent actions. Sensitive memory fields are excluded by default.

## RF-M07-03 Social recommendation loop
Recommendation → interaction → validated feedback → ranking update. No fake activity or synthetic engagement.

## RF-M07-04 Cross-domain capability discovery
M07 can recommend a real capability only when the capability registry says it exists and the user is eligible. It cannot invent an absent feature.

## RF-M07-05 Cold-start / first-session discovery
Cold start uses declared interests + safe session signals, not sensitive inference. Every result remains explainable by reason codes.

