# M04 — WORLD — CONCEPTION TECHNIQUE

## Read model
WORLD consumes bounded projections from Social, Play, Communities, Events and Discovery. It never queries private module tables directly for a recommendation decision.

## Ranking pipeline
Candidates → moderation/block/privacy filter → relevance → freshness → diversity/novelty → presentation. M15 may provide ranking candidates or explanations; M04 owns surface composition.

## Living Objects
Discovery references immutable lineage/version IDs. Opening an object retrieves only its visible branch and permitted contributor metadata.

## World Memory
Retrieval uses validated knowledge refs; private or unvalidated material is excluded. A memory result is context, never authorization.

## UI
Primary content is immediate. Secondary capabilities open through contextual panels/drawers. No new top-level navigation is created per capability.

## Tests
Visibility filters, recommendation diversity, stale projections, empty/degraded states, provider outage, mobile world surface and deep links.
