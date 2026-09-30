# MOIRISE — MASTER MODULE PLAN V4

## Source of truth

This directory contains the complete Module 1→15 redesign for the new MOIRISE build.

**Important:** the old application and its previous Module 1→6 implementation are considered deleted. These files define the new implementation from zero.

## Module specifications

1. M01 — Foundation → ./modules/M01_FOUNDATION.md
2. M02 — Player → ./modules/M02_PLAYER.md
3. M03 — Social → ./modules/M03_SOCIAL.md
4. M04 — World → ./modules/M04_WORLD.md
5. M05 — System / Progression → ./modules/M05_SYSTEM.md
6. M06 — Play → ./modules/M06_PLAY.md
7. M07 — Game Discovery Engine → ./modules/M07_DISCOVERY.md
8. M08 — Game A→Z Factory → ./modules/M08_GAME_FACTORY.md
9. M09 — Shared Game Engine → ./modules/M09_GAME_ENGINE.md
10. M10 — Social Gaming → ./modules/M10_SOCIAL_GAMING.md
11. M11 — Communities → ./modules/M11_COMMUNITIES.md
12. M12 — Events → ./modules/M12_EVENTS.md
13. M13 — Adaptive World → ./modules/M13_ADAPTIVE_WORLD.md
14. M14 — Collection / Reward Economy → ./modules/M14_COLLECTION.md
15. M15 — Meta System + AI Lab → ./modules/M15_META_AI_LAB.md

## Common module contract

Every module file defines:
- purpose and scope;
- UI and responsive behavior;
- exact user actions;
- MORISE dialogue and behavior;
- data model;
- events;
- AI capabilities;
- provider integration boundary;
- secret usage;
- security/RLS;
- performance/lazy loading/cache;
- loading/empty/error/unavailable/offline states;
- file boundaries;
- tests;
- acceptance criteria;
- dependencies;
- do-not-modify boundaries;
- new-AI handoff.

## Global dependency direction

User/UI → Module → Core contract → Capability Registry → AI Gateway / non-AI service → Provider Adapter or local implementation → validation → event → memory/observation

A module must never bypass its Core contract to call a provider directly.

## Navigation doctrine

The application exposes only a small number of primary user-facing doors. Internal capabilities do not automatically become navigation tabs.

## Provider doctrine

Providers are interchangeable. A provider outage must not make the whole application fail when a non-provider fallback exists.

## Secret doctrine

Provider values are server-side only. Current exact secret names observed in Supabase are maintained in the architecture/security documents and must not be normalized silently.

## Implementation doctrine

Build order is 1→15. A module is not complete merely because the TypeScript build is green. Completion requires automated tests, production build/typecheck/lint, real browser validation, responsive/mobile validation, loading/error/empty/unavailable validation, and regression testing.