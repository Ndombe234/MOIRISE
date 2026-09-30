# MOIRISE — ORDRE DE CONSTRUCTION CANONIQUE À 15 MODULES

1. M01 FOUNDATION
2. M02 PLAYER
3. M03 SOCIAL + PRIVATE MESSAGING
4. M04 WORLD
5. M05 SYSTEM / PROGRESSION / EVOLUTION
6. M06 PLAY
7. M07 GAME DISCOVERY
8. M08 GAME A→Z FACTORY
9. M09 SHARED GAME ENGINE
10. M10 SOCIAL GAMING
11. M11 COMMUNITIES / GUILDS
12. M12 EVENTS
13. M13 ADAPTIVE WORLD
14. M14 COLLECTION / REWARD ECONOMY
15. M15 META SYSTEM + MORISE AI LAB

## Gate
Chaque module :
PLAN → TECHNICAL DESIGN → CODE INSPECTION → TYPES → DATA → AUTH → DOMAIN → EVENTS → UI → TESTS → BROWSER → MOBILE → SECURITY → DONE.

## Critical dependency rules
- M02 starts after M01 identity/session contracts.
- M03 requires M01 + M02.
- M04 uses M03/M05 discovery and context contracts without owning them.
- M05 requires M01/M02 and owns progression presentation.
- M06 requires M05 progression hooks and M09 runtime contracts.
- M07 can run deterministic without external AI.
- M08 must use M09 runtime contract.
- M10 consumes M03/M06/M11 and never mutates their tables directly.
- M11 owns membership/roles.
- M12 owns temporal event state.
- M13 owns adaptive-world ranking/filtering.
- M14 owns economy/collection records.
- M15 is the meta layer and must not become a replacement for module ownership.

## Stop rule
A module cannot be considered DONE simply because its page renders. Tests, permissions, persistence, recovery and browser verification are required.
