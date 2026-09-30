# M07 — GAME DISCOVERY ENGINE — PLAN CANONIQUE

Mission : découvrir et classer les jeux, tendances, besoins et opportunités de façon utile sans enfermer le Player dans une bulle.

Fonctionnalités : recherche jeux; ranking; recommendations; tendances; recherche de demande; analyse de jeux comparables; différenciation; opportunity detection; feedback learning; diversity; freshness; novelty; découverte de jeux issus de Living Objects; opportunités de jeux issues de Convergence.

IA : Game Discovery Agent sous M15. Il combine signaux explicites et signaux produit non sensibles, filtre moderation/block/privacy avant ranking, puis explique les critères importants.

Règle : une recommandation n'est jamais une autorisation, ne révèle pas de données privées et ne crée pas artificiellement une tendance.

DONE : recherche bornée, ranking déterministe de base, IA facultative, feedback mesurable, mobile/desktop et fallback sans provider.


## Detailed feature behavior

### Search
Normalize query → retrieve approved candidates → filter visibility/moderation → rank → explain → paginate.

### Personalized discovery
Context may include explicit interests, validated game history, current progression, novelty budget and time/session preference. Private message content and sensitive inferred traits are excluded.

### Market research
Research is an evidence layer for creators, not fake “market certainty”. Every source has provenance and retrieval time.

### Novelty
The engine intentionally reserves part of the result set for relevant unfamiliar experiences. Novelty cannot override safety/visibility.

### Feedback
Play, completion, dismiss, share and explicit ratings become normalized signals. New/untrusted sources are protected from immediate ranking domination.

### Convergence
Repeated compatible mechanics from independent public/authorized sources may become a Convergence candidate. M15 performs the deeper reasoning; M07 owns discovery presentation.

### Degraded mode
Without an AI provider, keyword/deterministic ranking still returns useful results.

### Completion evidence
Search, recommendation, novelty, diversity, provenance, feedback and provider outage paths tested.