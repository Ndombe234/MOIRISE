# MOIRISE — Master Product & Module Plan

Version: 1.0  
Date: 2026-09-28  
Current baseline: Module 6  
Planning horizon: one focused month, with continuation beyond the horizon when required.

## 0. Product doctrine

MOIRISE is an Otaku social platform whose SYSTEM is the product's central interaction layer. The goal is not “social network + unrelated games”; the SYSTEM connects PLAYER, WORLD, SOCIAL and PLAY.

Every major feature must support both:

- SOLO: a player can use it independently.
- COLLECTIVE: the same system can create useful interaction with friends, communities, groups, or events when appropriate.

No feature is considered complete merely because it compiles. Completion requires UX review, mobile review, authenticated-path testing where applicable, error-state testing, and production verification.

## 1. Market-analysis gate for every module

Before implementing a module, research current evidence rather than relying on assumptions. For each module record:

1. user demand signals;
2. comparable products and mechanics;
3. community feedback and recurring complaints;
4. current platform/device trends;
5. retention or engagement mechanisms relevant to the module;
6. risks and technical constraints;
7. MOIRISE differentiation opportunity;
8. what should explicitly NOT be built yet.

Use current sources when the decision depends on changing market conditions. Never invent market size, player counts, downloads, revenue, or demand percentages. Distinguish measured data from qualitative signals.

## 2. Module map

| Module | Name | Purpose | Status |
|---|---|---|---|
| 1 | Foundation | Technical/product foundation | Existing baseline; verify before changes |
| 2 | PLAYER | Player identity and progression | Existing baseline; consolidate |
| 3 | SOCIAL | Social graph and interactions | Existing baseline; consolidate |
| 4 | WORLD | Discovery and exploration | Existing baseline; consolidate |
| 5 | SYSTEM / Progression | Unified progression layer | Existing baseline; consolidate |
| 6 | PLAY | Game entry, Play Lab, play-session infrastructure | **CURRENT** |
| 7 | Game Discovery Engine | Decide what experience to surface | Planned |
| 8 | First Native Games | Build validated games, not generic mini-games | Planned |
| 9 | Game Engine | Shared game infrastructure | Planned |
| 10 | Social Gaming | Connect games and social graph | Planned |
| 11 | Communities | Guilds/clans/community progression | Planned |
| 12 | Events | Live and recurring events | Planned |
| 13 | Adaptive World | Personalized but explorable WORLD | Planned |
| 14 | Collection / Economy | Cosmetic/collection/reward systems | Planned |
| 15 | Meta SYSTEM | Unified long-term product layer | Planned / first-cycle ceiling |

---

# MODULE 1 — FOUNDATION

## Objective
Provide the stable application shell on which every later module can depend.

## Market-analysis questions
- What onboarding patterns reduce confusion on social/game platforms?
- Which mobile navigation patterns keep primary actions visible without clutter?
- Which accessibility/contrast patterns support long sessions?
- Which authentication and account-recovery expectations are standard in comparable products?

## Product scope
- application shell;
- routing;
- authentication;
- authorization;
- player identity seed;
- responsive design system;
- SYSTEM visual language;
- database conventions;
- error/loading/empty states;
- observability;
- security baseline.

## SOLO
A new player can register, authenticate, understand the SYSTEM, and reach their own player area without another person.

## COLLECTIVE
Account identity is ready for profiles, follows, communities, and messaging without rebuilding authentication later.

## UX requirements
- primary actions immediately visible;
- no confusing navigation maze;
- mobile-first interaction targets;
- comfortable contrast, avoiding pure-black/high-neon fatigue;
- consistent loading and error states.

## Technical requirements
- typed routes;
- secure auth/session handling;
- protected routes;
- database constraints;
- RLS/authorization where applicable;
- deployment-safe environment configuration.

## Exit criteria
- clean build;
- authenticated and unauthenticated paths verified;
- mobile and desktop smoke tests;
- no blank-screen navigation failures;
- production deployment verified.

---

# MODULE 2 — PLAYER

## Objective
Turn the account into a persistent PLAYER identity.

## Market-analysis questions
- Which profile/progression mechanics encourage return without becoming noisy?
- What do Otaku/social communities value in profiles?
- Which achievements/titles/collections are meaningful rather than decorative spam?

## Product scope
- player profile;
- avatar/customization;
- level and XP;
- rank/title;
- achievements;
- player statistics;
- history;
- preferences;
- public/private profile controls;
- player activity summary.

## SOLO
Personal progression, goals, achievements, history, customization.

## COLLECTIVE
Public identity, social presence, shared achievements, challenges, community contribution.

## Differentiation
The profile is a SYSTEM identity card, not merely a social profile.

## Exit criteria
All progression mutations are authoritative, idempotent where required, protected against client-side manipulation, and reflected consistently across profile/UI/history.

---

# MODULE 3 — SOCIAL

## Objective
Build the Otaku social layer.

## Market-analysis questions
- Which feed formats encourage meaningful participation?
- What causes social feeds to become noisy or exhausting?
- Which community/discovery patterns help users find people with shared interests?

## Product scope
- feed;
- posts;
- reactions;
- comments;
- follow/following;
- profiles;
- messaging;
- notifications;
- shared game results;
- activity cards;
- moderation/reporting foundations.

## SOLO
Reading, posting, profile management, saved activity, personal social history.

## COLLECTIVE
Following, conversations, comments, groups, shared achievements, challenges.

## UX principle
Never expose every social function simultaneously. Keep the main action obvious and reveal secondary functions contextually.

## Exit criteria
Social actions work on authenticated accounts, permissions are enforced, abuse/error states are handled, and mobile interaction is comfortable.

---

# MODULE 4 — WORLD

## Objective
Create the exploration layer of MOIRISE.

## Market-analysis questions
- How do users discover communities, games, creators, and activities today?
- Which recommendation/discovery layouts reduce choice overload?
- How do successful social/game products balance personalization and exploration?

## WORLD areas
- Discover;
- Play;
- Create;
- Communities;
- Activities;
- Events.

## SOLO
Explore content, discover games, browse communities, discover events.

## COLLECTIVE
Join communities, attend events, discover friends/creators, share discoveries.

## UX principle
WORLD should feel like a place to explore, not an administrative dashboard.

## Exit criteria
All intended WORLD destinations are discoverable, deep links work, empty states are useful, and the navigation does not overwhelm mobile users.

---

# MODULE 5 — SYSTEM / PROGRESSION

## Objective
Unify progress across the product.

## Market-analysis questions
- Which progression loops are understood quickly?
- Which rewards create meaningful motivation without pay-to-win pressure?
- Which achievement/mission systems become annoying when overused?

## Product scope
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
Community contribution, shared milestones, team objectives.

## SYSTEM rule
A single user action may generate multiple valid outcomes, but the player must understand why they received each outcome.

## Exit criteria
Progression is consistent, auditable, idempotent where necessary, and cannot be granted merely by trusting client-provided values.

---

# MODULE 6 — PLAY

## Objective
Provide one elegant entry point into MOIRISE games and experiments.

## Current state
The repository already contains the PLAY engine / Play Lab direction, play-session infrastructure, result validation, progression integration, and shareable result routes. **Do not restart Module 6 from zero.**

## Market-analysis questions
- How do successful platforms reduce friction between “I want to play” and starting a session?
- How should solo and multiplayer entry differ?
- Which session lengths are appropriate for mobile/web audiences?

## Product model
PLAY is the doorway, not the game catalogue itself.

### SOLO
- individual experiences;
- challenges;
- practice;
- progression;
- personal records.

### COLLECTIVE
- friends;
- groups;
- PvP;
- cooperative play;
- asynchronous competition;
- events.

## Navigation
Primary actions must remain visually obvious. Secondary actions should be contextual instead of producing a wall of buttons.

## Existing game rule
There is already a game/Play experience in the product that is **not yet a fully programmed finished game**. Preserve the existing interface and product intent. Do not claim the game is complete merely because the Play engine exists.

## Exit criteria
- Play entry works;
- session lifecycle is reliable;
- results are validated server-side;
- progression integration is idempotent;
- failure states are handled;
- solo/collective foundations are ready;
- production smoke test completed.

---

# MODULE 7 — GAME DISCOVERY ENGINE

## Objective
Make PLAY intelligent without making navigation complicated.

## Market-analysis questions
- What game-discovery patterns currently work across web/mobile?
- How do platforms balance personalization with discovery of new experiences?
- Which signals are useful without requiring invasive profiling?

## Signals
- declared interests;
- recent play history;
- session length;
- completion/failure;
- difficulty;
- solo/collective preference;
- community activity;
- novelty exposure.

## Product behavior
The player may simply press PLAY. The SYSTEM can recommend an appropriate experience while keeping a visible path to browse everything.

## SOLO
Personal recommendation and experimentation.

## COLLECTIVE
Recommend compatible friends/groups/events and appropriate group experiences.

## Safety/ethics
Do not create a manipulative black box. Always provide understandable reasons or categories for recommendations and ways to explore outside recommendations.

## Exit criteria
Recommendation logic has measurable quality criteria, fallback behavior, and no single point of failure that prevents browsing or playing.

---

# MODULE 8 — FIRST NATIVE GAMES

## Objective
Build a small number of original, validated games rather than a large pile of generic mini-games.

## Mandatory market process
For every candidate game:

1. define the demand hypothesis;
2. research current market/category signals;
3. identify comparable games;
4. inspect player feedback;
5. identify recurring unmet needs;
6. define the MOIRISE differentiation;
7. estimate technical scope;
8. build a small prototype;
9. test the core loop;
10. only then expand.

## Candidate families to research
- card/strategy;
- board/party;
- puzzle;
- trivia/knowledge;
- combat;
- roguelite;
- social deduction;
- collection;
- asynchronous competition.

No category is selected purely because it sounds popular.

## SOLO
Every game must have a meaningful solo mode when the design permits it.

## COLLECTIVE
When multiplayer improves the concept, support cooperative, competitive, or asynchronous modes instead of forcing real-time multiplayer unnecessarily.

## IP rule
Use original mechanics/content/assets or properly licensed assets. Anime inspiration may guide tone, but do not copy protected characters, artwork, worlds, or branded rules.

## Exit criteria
At least one game has a fun core loop, clear rules, stable saving/results, mobile usability, and a repeatable test protocol before scaling the catalogue.

---

# MODULE 9 — GAME ENGINE

## Objective
Extract common infrastructure once multiple games prove their value.

## Market-analysis questions
- Which systems are genuinely common across the selected games?
- What multiplayer architecture is justified by actual game requirements?
- What can remain client-side and what must be authoritative server-side?

## Shared systems
- sessions;
- results;
- XP;
- achievements;
- inventory/collections;
- leaderboards;
- matchmaking;
- party/group state;
- game configuration;
- analytics;
- anti-cheat/validation;
- save/resume.

## Exit criteria
Adding a new game requires configuration and game-specific logic, not copying an entire backend.

---

# MODULE 10 — SOCIAL GAMING

## Objective
Make SOCIAL and PLAY reinforce each other.

## Market-analysis questions
- Which social game loops generate meaningful interaction?
- What do players share after a session?
- Which challenge/co-op patterns work without requiring constant live presence?

## Features
- shareable results;
- challenges;
- friend invitations;
- rematches;
- community challenges;
- social activity cards;
- cooperative goals;
- asynchronous competitions.

## SOLO → COLLECTIVE loop
A solo result can contribute to a group objective.

## COLLECTIVE → SOLO loop
A community event can give every player an individual challenge.

## Exit criteria
Social features enhance games without becoming mandatory for players who prefer solo play.

---

# MODULE 11 — COMMUNITIES

## Objective
Create persistent Otaku communities/clans.

## Market-analysis questions
- What makes online communities healthy rather than noisy?
- Which moderation and role structures scale?
- Which collective goals actually encourage participation?

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
Personal contribution and independent community activities.

## COLLECTIVE
Team objectives, cooperative games, events, community progression.

## Exit criteria
Permission boundaries, moderation, membership changes, and community data are reliable and auditable.

---

# MODULE 12 — EVENTS

## Objective
Create recurring reasons to return without relying on constant notifications.

## Market-analysis questions
- Which event structures are effective?
- How frequently can events change before they become exhausting?
- What makes seasonal content worth returning to?

## Event types
### SOLO
- daily/weekly challenges;
- personal quests;
- special scenarios;
- mastery events.

### COLLECTIVE
- community objectives;
- tournaments;
- cooperative goals;
- world events.

## Exit criteria
Events have clear start/end rules, rewards, anti-abuse protections, timezone-safe dates, and graceful empty/expired states.

---

# MODULE 13 — ADAPTIVE WORLD

## Objective
Personalize WORLD while preserving serendipitous discovery.

## Market-analysis questions
- How much personalization is useful before users feel trapped in a filter bubble?
- Which recommendation explanations build trust?
- Which exploration controls should remain explicit?

## Features
- personalized Discover;
- interest lanes;
- new/unknown discovery lane;
- adaptive activities;
- adaptive game suggestions;
- event suggestions;
- community discovery.

## Rule
Personalization must never remove the user's ability to browse broadly.

## Exit criteria
Users can understand and influence recommendations; cold-start users receive useful defaults; failures degrade gracefully to curated/global discovery.

---

# MODULE 14 — COLLECTION / ECONOMY

## Objective
Build a sustainable internal reward/collection layer without pay-to-win design.

## Market-analysis questions
- Which collection systems create long-term goals?
- Which cosmetic/reward structures are perceived as fair?
- What reward frequencies avoid inflation and fatigue?

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
- no pay-to-win requirement;
- no gambling-like monetization as a core progression mechanism;
- transparent reward rules;
- server-authoritative inventory.

## Exit criteria
Inventory is consistent, rewards are idempotent, duplicate grants are prevented, and the economy has documented sinks/sources.

---

# MODULE 15 — META SYSTEM

## Objective
Unify everything into the mature MOIRISE SYSTEM.

## Product model

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
│   └── Following
└── PLAY
    ├── SOLO
    └── COLLECTIVE
```

## Stronger concept: SYSTEM SYNCHRONY
When appropriate and privacy-safe, the SYSTEM can detect compatible activity patterns and create opportunities for collective experiences.

Example:

- Player A prefers strategy and solo play.
- Player B prefers short competitive sessions.
- Player C is active in a community.
- The system identifies a compatible event or group activity.

The goal is not to force matchmaking. It is to make collective discovery feel natural.

## Exit criteria
- all core modules integrate without duplicated state;
- player progression is coherent;
- games and social activity share consistent identity/results;
- WORLD remains navigable;
- SOLO remains first-class;
- COLLECTIVE remains optional but powerful;
- production observability and recovery are in place;
- documented architecture and module state allow a new conversation/agent to resume safely.

---

# 3. One-month execution strategy

## Week 1
Stabilize Modules 1–6, finish documentation, fix production inconsistencies, and lock the navigation/system UX.

## Week 2
Build Module 7 and research/prototype the first native game candidates. Do not commit to a large game before testing the core loop.

## Week 3
Build the first validated game and the shared infrastructure required by it. Begin Social Gaming only where it is justified.

## Week 4
Harden, test, deploy, measure, and prepare the next cycle. Start only the next module that has a clear dependency and validated purpose.

## Important
A month is a development window, not a promise that all 15 modules will be production-complete. The plan is deliberately staged so the product can stop at a stable boundary rather than accumulating half-finished systems.

---

# 4. Definition of Done

A module is DONE only when:

- implementation exists;
- UX is coherent;
- mobile is checked;
- desktop is checked when relevant;
- authenticated paths are checked;
- unauthenticated paths are checked;
- loading/empty/error states are checked;
- data/security constraints are checked;
- production deployment is verified;
- the module status is updated in `docs/MODULE_STATUS.md`;
- the next module's dependencies are documented.

# 5. Continuity rule

Every new development conversation must begin by reading:

1. `docs/MOIRISE_MASTER_PLAN.md`
2. `docs/MODULE_STATUS.md`
3. the current module's implementation/tests
4. recent Git history

Never assume the module number from memory alone. Verify it from the repository status.
