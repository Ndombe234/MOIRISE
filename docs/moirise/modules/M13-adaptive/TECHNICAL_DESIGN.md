# M13 — ADAPTIVE WORLD — CONCEPTION TECHNIQUE

## Pipeline
candidate retrieval → visibility/block/mute/moderation/privacy → quality → relevance → novelty/diversity → presentation.

## Inputs
explicit preferences, permitted activity signals, freshness, quality, Living Object refs, validated World Memory refs, public community/game signals.

## Exploration budget
A bounded share of candidates can be novel/underexplored. Exploration must not expose restricted data or infer sensitive traits.

## Detours
Detour(candidate, reason, sourceSignal, expiry, dismissalCooldown). Dismissal reduces repeated proposals.

## Living Object discovery
Rank evolving objects by relevance, novelty, quality, current branch, contributor permission and recency. Private branches are invisible.

## World Memory
query → retrieval → provenance/quality → permission filter → bounded contextual answer. Never load raw private memory.

## Convergence
M15 submits a candidate; M13 filters it before presentation.

## Player control
Explicit interests can increase/decrease categories. There is always an escape from a recommendation loop.

## Degraded
If semantic provider is unavailable, deterministic/local ranking continues with lower capability.

## Tests
determinism, diversity, novelty, blocks, private-content exclusion, stale metadata, provider outage, preference override, empty world.
## Ranking policy version
RankingPolicy has version, protected filters, exploration policy, diversity policy and benchmark references. A new version can be tested before broad rollout.

## Cache
User-specific sensitive ranking caches are isolated. Cache keys include context version and ranking-policy version.

## Safe explanation
A result can expose a simple reason key such as “because you explored puzzle games recently” without revealing hidden sensitive features.
