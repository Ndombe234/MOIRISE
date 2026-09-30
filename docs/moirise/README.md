# MOIRISE — DOCUMENTATION CANONIQUE

Cette arborescence est la référence active de conception de MOIRISE.

## Architecture
15 modules canoniques + mécanismes transversaux.

1. Foundation
2. Player
3. Social + Private Messaging
4. World
5. System / Progression / Evolution
6. Play
7. Game Discovery
8. Game Factory
9. Shared Game Engine
10. Social Gaming
11. Communities / Guilds
12. Events
13. Adaptive World
14. Collection / Reward Economy
15. Meta System + MORISE AI Lab

## Profondeur obligatoire
Une fonctionnalité n'est pas documentée par son nom. Son document doit préciser propriétaire, acteurs, déclencheurs, contexte, entrées, états, logique, permissions, données, événements, erreurs, fallback, UX, IA, performance, sécurité, tests et DONE.

Un détail peut être long lorsqu'il apporte une information réelle. La répétition artificielle n'est pas utilisée.

## Documentation tree
~~~text
docs/moirise/
  MASTER_PLAN.md
  FUSION_MATRIX.md
  HISTORICAL_INVENTORY.md
  BUILD_ORDER.md
  PUZZLE_RULE.md
  modules/
    M01...M15/
      PLAN.md
      TECHNICAL_DESIGN.md
  ai/
    AI_MASTER_PLAN.md
    AI_TECHNICAL_DESIGN.md
  transversal/
    CONTRACTS.md
    DEPENDENCIES.md
    DATA_MODEL.md
    SECURITY.md
    EVENT_CATALOG.md
    ERROR_MODEL.md
    TESTING.md
    OBSERVABILITY.md
    CROSS_MODULE_MECHANICS.md
    PROVIDER_REGISTRY.md
  audits/
    FEATURE_COVERAGE.md
    DUPLICATE_AUDIT.md
    DOCUMENTATION_BUILD_REPORT.md
~~~

## Principles
Player central.
SYSTEM contextual, calm and non-spammy.
5–6 primary doors.
Games 2D and 3D.
Creation separate from runtime.
MORISE AI provider-agnostic and native.
Workers distributed, sandboxed and opt-in where required.
No fake urgency/counts/events.
Critical results server-validated and idempotent.

## Code vs design
The code repository is the current implementation evidence. The canonical documentation defines intended ownership and behavior. Divergence must be reconciled explicitly.