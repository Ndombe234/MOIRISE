# MOIRISE — MASTER PLAN V2

Date: 2026-09-28
Planning horizon: one focused month, with continuation if required.
Current working point: **MODULE 6 — PLAY / FINAL QA**.

## 0. PRODUCT DOCTRINE

MOIRISE is an Otaku social platform whose **SYSTEM is the central product layer**. It connects PLAYER, WORLD, SOCIAL and PLAY. The product is not a social network with unrelated games attached.

Every major capability must consider two experiences:

- **SOLO** — useful and complete without another player.
- **COLLECTIVE** — useful with friends, communities, groups, cooperative play, competition or events when appropriate.

The interface must remain visually attractive, comfortable and immediately understandable. Avoid excessive darkness, pure-black/high-neon contrast, button overload and navigation that forces the user to mentally decode the UI.

## 1. STATUS LANGUAGE

- **BASE EXISTANTE** = functionality/code exists, but is not declared fully finished without current QA.
- **FINAL QA** = implementation exists; production verification remains.
- **PLANNED** = not yet the implementation target.
- **DONE** = only after code + UX + mobile + security + production validation.

Important: an interface for a feature does **not** mean the feature is complete.

---

# MODULE MAP

| Module | Name | Status now | Main purpose |
|---|---|---|---|
| 1 | Foundation | BASE EXISTANTE | Application, auth, routing, design and technical base |
| 2 | PLAYER | BASE EXISTANTE | Persistent player identity and progression |
| 3 | SOCIAL + PRIVATE MESSAGING | BASE EXISTANTE / messaging incomplete | Social graph, feed, conversations and notifications |
| 4 | WORLD | BASE EXISTANTE | Discovery and exploration |
| 5 | SYSTEM / PROGRESSION | BASE EXISTANTE | Unified progression layer |
| 6 | PLAY | **CURRENT — FINAL QA** | Play entry, Play Lab, sessions and result validation |
| 7 | GAME DISCOVERY ENGINE | PLANNED | Intelligent but understandable game discovery |
| 8 | GAME A — Z FACTORY | PLANNED | Build each game completely from research to launch |
| 9 | SHARED GAME ENGINE | PLANNED | Reusable infrastructure after validated games |
| 10 | SOCIAL GAMING | PLANNED | Connect games to social systems |
| 11 | COMMUNITIES | PLANNED | Groups, clans and collective progression |
| 12 | EVENTS | PLANNED | Recurring solo + collective experiences |
| 13 | ADAPTIVE WORLD | PLANNED | Personalization with open exploration |
| 14 | COLLECTION / REWARD ECONOMY | PLANNED | Fair collections, cosmetics and rewards |
| 15 | META SYSTEM | PLANNED / first-cycle ceiling | Unified mature MOIRISE experience |

---

# MARKET GATE — APPLIES TO EVERY MODULE

Before substantial implementation of a module, perform current research appropriate to that module:

1. demand signals;
2. comparable products;
3. user/community feedback;
4. current platform/device trends;
5. engagement and retention mechanisms;
6. technical and operational risks;
7. MOIRISE differentiation opportunity;
8. what should explicitly NOT be built yet.

For changing market facts, use recent sources. Never invent player counts, market size, revenue, downloads or demand percentages. Distinguish measured evidence, estimates and qualitative signals.

The market informs the product decision; it does not replace the product owner's decision.

---

# MODULE 1 — FOUNDATION

## Status
**BASE EXISTANTE — VERIFY / CONSOLIDATE.**

## Objective
Stable technical and visual foundation for every later module.

## Market research
Study onboarding, account recovery, mobile navigation, accessibility, performance and visual patterns used by successful social/game web products. Pay special attention to low-friction first sessions and comfortable long-session contrast.

## Scope
- application shell;
- routing;
- authentication and authorization;
- responsive/mobile foundation;
- SYSTEM visual language;
- database conventions;
- environment configuration;
- loading/error/empty states;
- security baseline;
- observability.

## SOLO
Register, authenticate, understand SYSTEM and reach PLAYER independently.

## COLLECTIVE
Identity can safely support follows, messaging, communities and games later.

## Exit gate
Build + auth + route + mobile + production smoke tests pass; no blank-screen navigation failures.

---

# MODULE 2 — PLAYER

## Status
**BASE EXISTANTE — VERIFY / CONSOLIDATE.**

## Objective
Make the account a persistent PLAYER identity.

## Market research
Study player-profile systems, progression, achievements, titles and customization. Research which profile mechanics are meaningful versus noisy or purely decorative.

## Scope
- profile;
- avatar/customization;
- XP/level/rank;
- titles;
- achievements;
- statistics;
- history;
- preferences;
- public/private visibility;
- player activity.

## SOLO
Personal progression, mastery, history and customization.

## COLLECTIVE
Public identity, shared achievements, challenges and community contribution.

## Exit gate
Authoritative progression, safe mutations, consistent UI/history and mobile QA.

---

# MODULE 3 — SOCIAL + PRIVATE MESSAGING

## Status
**BASE EXISTANTE — PRIVATE MESSAGING IS A REQUIRED MISSING/INCOMPLETE CAPABILITY.**

## Objective
Create the social layer and the private communication layer.

## Market research
Study social feeds, direct messaging, conversation discovery, notification fatigue, privacy controls, blocking/reporting and healthy community patterns. Research what makes messaging useful without becoming noisy.

## Scope — SOCIAL
- feed;
- posts;
- reactions;
- comments;
- follow/following;
- profiles;
- activity cards;
- shared game results;
- notifications;
- moderation/reporting foundations.

## Scope — PRIVATE MESSAGING
- one-to-one conversations;
- conversation list;
- unread state;
- message timestamps;
- send/receive reliably;
- message persistence;
- conversation permissions;
- block/report behavior;
- notification behavior;
- mobile conversation UI;
- safe handling of deleted/blocked users;
- optional group-private conversations only if research and architecture justify them.

## SOLO
Read/write personal social activity and manage private conversations.

## COLLECTIVE
Follow people, converse privately, comment, share results, challenge friends.

## Security
Never trust the client for conversation ownership or recipient authorization. Enforce server-side access controls and database policies.

## Exit gate
Two authenticated test accounts can exchange private messages reliably; unauthorized users cannot read/send into another conversation; unread/read state survives reload; mobile and error states work.

---

# MODULE 4 — WORLD

## Status
**BASE EXISTANTE — VERIFY / CONSOLIDATE.**

## Objective
Make WORLD the exploration layer.

## WORLD commands
- Discover
- Play
- Create
- Communities
- Activities
- Events

## Market research
Study discovery UX, recommendation layouts, search, creator/community discovery and choice overload. Compare feed-based, grid-based, card-based and contextual navigation.

## SOLO
Discover content, games, activities, communities and events.

## COLLECTIVE
Discover people, communities, creators and group events; share discoveries.

## Exit gate
All intended destinations are visible/understandable, deep links work, mobile density is comfortable and no navigation maze exists.

---

# MODULE 5 — SYSTEM / PROGRESSION

## Status
**BASE EXISTANTE — VERIFY / CONSOLIDATE.**

## Objective
Unify progression across PLAYER, SOCIAL, WORLD and PLAY.

## Market research
Study missions, achievements, XP, titles, reward pacing and progression fatigue. Identify systems that motivate without spam or pay-to-win pressure.

## Scope
- XP;
- levels;
- missions;
- achievements;
- titles;
- rewards;
- history;
- progression events;
- social progression;
- game progression.

## SOLO
Personal goals and mastery.

## COLLECTIVE
Shared milestones, community contribution and group objectives.

## Exit gate
Progression is authoritative, auditable, idempotent where required, protected from client manipulation and understandable to players.

---

# MODULE 6 — PLAY

## Status
**CURRENT — INTEGRATED / FINAL QA.**

## Objective
Provide one elegant PLAY entry point without overwhelming the player with a catalogue.

## Already present
- PLAY engine / Play Lab direction;
- play-session infrastructure;
- result validation;
- progression integration;
- shareable result routes;
- an existing game/Play interface.

## Critical distinction
The existing game interface is **NOT a finished game**. The actual game must later be built from A to Z under Module 8. Do not delete or replace the existing game concept merely because its gameplay is not finished.

## Navigation
Primary commands should be beautiful and immediately visible. Secondary commands should appear contextually.

### Primary
- PLAYER
- WORLD
- SOCIAL
- PLAY
- SYSTEM

### WORLD subcommands
- Discover
- Play
- Create
- Communities
- Activities
- Events

### SOCIAL modes
- World
- Following

## SOLO
Individual experiences, challenges, practice, progression, personal records.

## COLLECTIVE
Friends, groups, PvP, cooperation, asynchronous competition, events.

## Required final QA
- Render production live;
- SYSTEM/PLAYER/WORLD/SOCIAL/PLAY visible;
- WORLD subcommands verified;
- SOCIAL modes verified;
- authenticated PLAY flow;
- unauthenticated protection;
- session creation;
- valid completion;
- invalid/tampered completion rejected;
- duplicate completion protection;
- progression integration;
- mobile layout;
- loading/error/empty states;
- no blank screens;
- final production smoke test.

**Do not move to Module 7 implementation until this gate is closed.**

---

# MODULE 7 — GAME DISCOVERY ENGINE

## Status
**PLANNED — NEXT AFTER MODULE 6 QA.**

## Objective
Let the SYSTEM recommend an experience without forcing a complicated catalogue.

## Market research
Research current game discovery, recommendation, social discovery and cold-start patterns across web/mobile. Measure qualitative and quantitative signals where available.

## Signals to consider
- declared interests;
- play history;
- session duration;
- completion/failure;
- difficulty;
- solo/collective preference;
- community activity;
- events;
- novelty exposure.

## UX
PLAY should remain one obvious entry point. Recommendations are contextual; broad browsing remains available.

## SOLO
Personal recommendations and experimentation.

## COLLECTIVE
Friend/group/event recommendations and multiplayer discovery.

## Exit gate
Useful cold-start fallback, understandable recommendations, browse-outside-recommendations path, measurable quality and graceful failure.

---

# MODULE 8 — GAME A → Z FACTORY

## Status
**PLANNED — DEDICATED GAME-CONSTRUCTION MODULE.**

## Critical meaning
This is not merely “add a game”. It is the complete process for creating **each game from A to Z**.

Every game gets its own project record and passes through these stages:

### A — Market and opportunity
- demand hypothesis;
- current market research;
- subgenre identification;
- comparable games;
- player reviews/community feedback;
- platform/device analysis;
- unmet needs;
- risks.

### B — Concept
- fantasy/theme;
- target player;
- core promise;
- unique MOIRISE angle;
- session model;
- solo/collective role.

### C — Game design
- core loop;
- rules;
- controls;
- win/loss conditions;
- progression;
- difficulty;
- economy;
- rewards;
- replayability;
- content plan.

### D — Visual direction
- art direction;
- UI/UX;
- motion;
- effects;
- accessibility;
- mobile layouts;
- original/licensed assets only.

### E — Gameplay prototype
Build the smallest playable core loop.

### F — SOLO
A meaningful solo experience must exist whenever the game concept supports it.

### G — COLLECTIVE
When justified: PvP, co-op, party, asynchronous competition or community play. Do not add real-time multiplayer merely because it sounds attractive.

### H — Content
- levels/scenarios;
- characters/units/cards/items as appropriate;
- challenges;
- progression content;
- tutorial.

### I — Infrastructure
- frontend;
- backend;
- database;
- sessions;
- persistence;
- realtime only where justified;
- matchmaking only where justified.

### J — Security
- authoritative outcomes;
- anti-cheat;
- validation;
- rate limits;
- permission checks;
- abuse handling.

### K — Prototype testing
Test the first-session experience with real user flows.

### L — Balancing
- difficulty;
- rewards;
- pacing;
- win rates where meaningful;
- economy;
- session length.

### M — Mobile/web optimization
Performance, touch targets, network resilience and responsive layouts.

### N — QA
Happy paths, invalid input, edge cases, persistence, reconnection, duplicate actions, permissions, blank/error/loading states.

### O — Production
Deploy, observe logs/metrics, verify production behavior.

### P — Launch and iteration
Collect evidence, fix defects, rebalance and plan the next content cycle.

## Market rule
Do not choose the next game because the assistant personally likes it. Research the demand and trade-offs first. If exact demand data is unavailable, state that clearly.

## IP rule
Original design or properly licensed assets. Anime-inspired tone is allowed; copying protected characters, art, worlds or branded rules is not.

## Exit gate
A game is only “complete” when its intended gameplay, SOLO/COLLECTIVE modes, persistence, security, UX, mobile behavior, testing and production deployment have been verified.

---

# MODULE 9 — SHARED GAME ENGINE

## Status
**PLANNED.**

## Objective
Extract only the infrastructure proven common across the first validated games.

## Market research
Study architecture patterns for browser games, multiplayer services, authoritative state, realtime and asynchronous competition. Avoid overengineering before real requirements exist.

## Shared candidates
- sessions;
- result validation;
- XP;
- achievements;
- inventory;
- leaderboards;
- matchmaking;
- party state;
- game configuration;
- analytics;
- anti-cheat;
- save/resume.

## Exit gate
Adding a new game uses shared infrastructure without copying entire systems.

---

# MODULE 10 — SOCIAL GAMING

## Status
**PLANNED.**

## Objective
Connect PLAY and SOCIAL into meaningful loops.

## Market research
Study challenges, rematches, co-op, asynchronous competition and result sharing. Identify which interactions are useful versus spammy.

## Features
- shareable results;
- challenges;
- friend invitations;
- rematches;
- community challenges;
- activity cards;
- cooperative goals;
- asynchronous competitions.

## SOLO → COLLECTIVE
A solo result may contribute to a group objective.

## COLLECTIVE → SOLO
A group event can generate individual challenges.

## Exit gate
Social gaming adds value without making social participation mandatory for solo players.

---

# MODULE 11 — COMMUNITIES

## Status
**PLANNED.**

## Objective
Persistent Otaku groups/clans with healthy collective progression.

## Market research
Study community health, moderation, roles, group goals, retention and abuse patterns.

## Features
- communities;
- roles;
- membership;
- community feed;
- goals;
- challenges;
- events;
- rankings;
- moderation;
- community progression.

## SOLO
Personal contribution and independent participation.

## COLLECTIVE
Team objectives, co-op games, events and group progression.

## Exit gate
Membership, permissions, moderation and group state are reliable and auditable.

---

# MODULE 12 — EVENTS

## Status
**PLANNED.**

## Objective
Create recurring reasons to return without overwhelming users.

## Market research
Study event frequency, seasonal structures, live-ops patterns, fatigue and reward pacing.

## SOLO
Challenges, quests, special scenarios, mastery events.

## COLLECTIVE
Community objectives, tournaments, cooperative goals, world events.

## Exit gate
Start/end rules, timezone-safe dates, rewards, abuse protection and expired-state UX all work.

---

# MODULE 13 — ADAPTIVE WORLD

## Status
**PLANNED.**

## Objective
Personalize WORLD while preserving broad discovery.

## Market research
Study recommendation transparency, filter bubbles, exploration controls and cold-start personalization.

## Features
- personalized Discover;
- interest lanes;
- new/unknown lane;
- adaptive activities;
- game suggestions;
- event suggestions;
- community discovery.

## Rule
Personalization must never prevent broad exploration.

## Exit gate
Users understand and influence recommendations; cold-start and failure fallbacks work.

---

# MODULE 14 — COLLECTION / REWARD ECONOMY

## Status
**PLANNED.**

## Objective
Create fair collection and reward systems.

## Market research
Study collection loops, cosmetic rewards, rarity, progression pacing and player perception of fairness.

## Features
- titles;
- badges;
- cosmetics;
- collections;
- rarity;
- achievements;
- reward tracks;
- profile showcase.

## Rules
No pay-to-win requirement. No gambling-like system as a core progression mechanism. Reward rules must be transparent and inventory server-authoritative.

## SOLO
Collection and personal mastery.

## COLLECTIVE
Community collection goals, event rewards and shared achievements.

## Exit gate
Inventory is consistent, duplicate grants are prevented and reward sources/sinks are documented.

---

# MODULE 15 — META SYSTEM

## Status
**PLANNED — FIRST-CYCLE CEILING.**

## Objective
Unify the mature MOIRISE experience.

## Final product structure

```text
SYSTEM
├── PLAYER
├── WORLD
│   ├── Discover
│   ├── Play
│   ├── Create
│   ├── Communities
│   ├── Activities
│   └── Events
├── SOCIAL
│   ├── World
│   ├── Following
│   └── Private Messages
└── PLAY
    ├── SOLO
    └── COLLECTIVE
```

## Stronger concept — SYSTEM SYNCHRONY
When appropriate and privacy-safe, the SYSTEM can identify compatible activity patterns and surface natural opportunities for collective experiences.

This does not mean forced matchmaking. It means the SYSTEM can connect compatible players, communities and events when there is a genuine reason to do so.

## Exit gate
All core systems share coherent identity/progression; games integrate with social/world systems; SOLO remains first-class; COLLECTIVE is powerful but optional; production monitoring/recovery exists; documentation makes continuation across new conversations reliable.

---

# 2. CONTINUITY RULE

At the end of every module, update:

- module status;
- implementation state;
- current commit;
- production deploy state;
- tests performed;
- known limitations;
- next module;
- market research record;
- decisions and reasons.

A new conversation must read the continuity files and inspect the repository before assuming the current state.

## Current next step

**Finish Module 6 final production QA. Then begin Module 7 with fresh market research.**
