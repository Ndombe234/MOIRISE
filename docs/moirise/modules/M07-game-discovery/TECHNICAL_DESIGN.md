# M07 — GAME DISCOVERY ENGINE — CONCEPTION TECHNIQUE

## Pipeline
Query → candidate retrieval → moderation/block/privacy filter → quality → relevance → freshness/novelty → diversity → rank → explanation.

## AI
Game Discovery Agent runs through M15. Candidate signals exclude private messages and sensitive attributes. AI-generated research is labeled as analysis, not truth.

## Feedback
Click/dismiss/play/finish/return are measured as bounded product signals. Feedback updates ranking candidates through evaluation; raw activity never rewrites production ranking directly.

## Opportunity detection
Demand patterns create OpportunityCandidate objects. A candidate includes evidence refs, confidence, differentiation hypothesis and validation status.

## Tests
Blocked content exclusion, ranking determinism, diversity, stale trend, provider outage, no-candidate state, malicious external research and mobile search.
