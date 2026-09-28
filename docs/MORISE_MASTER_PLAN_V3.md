# MORISE — MASTER PLAN V3

Date: 2026-09-28
Status: **CANONICAL PLAN**
Current working point: **MODULE 6 — PLAY / FINAL QA**

## Product doctrine

MORISE is a general-purpose social platform. The **SYSTEM is the central intelligent interaction layer** connecting PLAYER, WORLD, SOCIAL, PLAY, GUILDS, creation, recommendations and future AI capabilities. MORISE is not limited to one community or profession.

Every major capability must support **SOLO** and **COLLECTIVE** use cases when appropriate.

The SYSTEM is intended to evolve toward a true conversational AI experience comparable in interaction style to a general AI assistant, while remaining grounded in MORISE context, tools, permissions and product data.

The SYSTEM must not be a single chatbot. It is a multi-mechanic AI architecture: context, memory, recommendation, social intelligence, community intelligence, game intelligence, translation, generation, safety and orchestration.

## Non-negotiable product rules

- Primary navigation stays immediately understandable and visually calm.
- Secondary functions are grouped rather than dumped into the main bar.
- Current market research precedes substantial new game implementation.
- Every game is built A→Z: research, concept, design, prototype, SOLO/COLLECTIVE, content, infrastructure, security, balancing, QA, production and iteration.
- AI recommendations suggest; they do not silently perform high-impact actions.
- AI output never replaces authorization, RLS or server-side validation.
- Private content must not be exposed through hidden AI inference.
- Learning is controlled: personal preference adaptation can be fast; global model/ranking changes require validation and anti-manipulation protections.

## AI SYSTEM architecture

`PLAYER signals → specialist mechanics → SYSTEM Orchestrator → recommendation/proposal/action → feedback → controlled learning`

Specialist mechanics include:

- Conversation / reasoning;
- Memory and context;
- Personalization;
- Social/relationship intelligence;
- Community/GUILD intelligence;
- Game discovery;
- Game creation;
- Translation;
- Safety/moderation;
- Economy/reward analysis.

The SYSTEM should be able to use the appropriate mechanism instead of treating every problem as a chat prompt.

## Translation architecture — browser/on-device first

MORISE translation is a first-class SYSTEM capability and should work from V1.

Preferred architecture:

1. browser/on-device translation when a suitable local model/API is available;
2. translation cache so identical text is not repeatedly processed;
3. server/local fallback for languages or contexts that need more capability;
4. optional external API only when necessary and only behind an internal translation interface.

The user should not need to change keyboard language to communicate with another language. Preserve original text access, MORISE terminology and context where possible.

Translation quality is a V1 requirement: later learning improves terminology/context and personalization, but V1 must already be useful.

## Learning architecture

MORISE V1 may learn from users immediately, but learning is separated into:

- **personal adaptation:** preferences and recommendations for one PLAYER;
- **aggregated learning:** validated patterns across many users;
- **feedback learning:** accepted, rejected, corrected and completed recommendations;
- **model/ranking updates:** evaluated before global deployment.

Do not allow raw user activity to directly rewrite the global AI. Protect against spam, fake accounts, coordinated manipulation and data poisoning.

---

# MODULE MAP

| Module | Name | Status | Purpose |
|---|---|---|---|
| 1 | Foundation | BASE EXISTANTE | Technical, visual and AI-ready foundation |
| 2 | PLAYER | BASE EXISTANTE | Persistent identity, preferences, progression and personal context |
| 3 | SOCIAL + PRIVATE MESSAGING | BASE EXISTANTE / messaging incomplete | Social graph, feed, private conversations and social intelligence foundations |
| 4 | WORLD | BASE EXISTANTE | Discovery and exploration |
| 5 | SYSTEM / PROGRESSION | BASE EXISTANTE | Progression plus SYSTEM AI foundations |
| 6 | PLAY | **CURRENT — FINAL QA** | PLAY entry, sessions, validation and existing game interface |
| 7 | GAME DISCOVERY ENGINE | PLANNED | Market-informed game discovery and personalized recommendations |
| 8 | GAME A→Z FACTORY | PLANNED | Complete game creation pipeline with AI assistance |
| 9 | SHARED GAME ENGINE | PLANNED | Reusable validated game infrastructure |
| 10 | SOCIAL GAMING | PLANNED | Games + social graph + collective loops |
| 11 | COMMUNITIES | PLANNED | GUILDS and Adaptive Social System |
| 12 | EVENTS | PLANNED | Solo + collective recurring experiences |
| 13 | ADAPTIVE WORLD | PLANNED | Platform-wide personalization and discovery |
| 14 | COLLECTION / REWARD ECONOMY | PLANNED | Fair collection, rewards and creator/economy mechanics |
| 15 | META SYSTEM | PLANNED / first-cycle ceiling | Unified mature MORISE SYSTEM AI |

---

# MODULE 1 — FOUNDATION

**Goal:** stable application, routing, auth, responsive UI, database conventions, security, observability and an AI-ready event/context architecture.

**AI:** create the internal interfaces for context, memory, recommendation, translation and AI orchestration without requiring an external AI provider.

**SOLO:** a player can register, understand the SYSTEM and reach their PLAYER space.

**COLLECTIVE:** the identity foundation can safely support social and group features later.

**Exit:** build, auth, routing, mobile and production smoke tests pass; no blank-screen failures.

# MODULE 2 — PLAYER

**Goal:** persistent PLAYER identity with profile, preferences, progression, titles, achievements, history and visibility controls.

**AI:** personal context and preference memory; the SYSTEM can learn useful non-sensitive preferences from explicit choices and permitted activity.

**SOLO:** personal progression and recommendations.

**COLLECTIVE:** public identity, achievements, challenges and contribution.

**Exit:** authoritative progression, safe mutations and mobile QA.

# MODULE 3 — SOCIAL + PRIVATE MESSAGING

**Goal:** feed, posts, reactions, comments, follows, notifications and reliable one-to-one private messaging.

**AI:** conversation/context intelligence, translation, social recommendation and future affinity detection. Private messages must remain protected and never become an exposed hidden inference.

**Adaptive GUILD foundation:** repeated meaningful interactions may become a candidate signal. The SYSTEM can propose a GUILD; users must accept before persistent creation/membership changes.

**SOLO:** private conversations and personal social activity.

**COLLECTIVE:** follows, conversations, comments, challenges and sharing.

**Exit:** two authenticated accounts can exchange messages; unauthorized access is rejected; unread state persists; mobile/error states work.

# MODULE 4 — WORLD

**Goal:** WORLD becomes the exploration layer with Discover, Play, Create, Communities, Activities and Events.

**AI:** contextual discovery, ranking and recommendation while preserving broad exploration.

**SOLO:** discover content, games, activities, communities and events.

**COLLECTIVE:** discover people, communities, creators and group events.

**Exit:** destinations are visible, understandable, deep links work and mobile density is comfortable.

# MODULE 5 — SYSTEM / PROGRESSION

**Goal:** unified XP, levels, missions, achievements, titles, rewards and progression history.

**AI:** establish the SYSTEM conversational layer and orchestration foundations. The long-term SYSTEM should be able to understand natural-language requests, use MORISE context and invoke specialized mechanics/tools.

**SOLO:** personal goals and mastery.

**COLLECTIVE:** shared milestones and group objectives.

**Exit:** progression is authoritative, auditable and protected from client manipulation.

# MODULE 6 — PLAY — CURRENT FINAL QA

**Goal:** one elegant PLAY entry instead of a confusing catalogue. Preserve the existing game interface even though the actual game is not yet a finished programmed game.

**AI:** collect the permitted signals needed for future personalized game discovery without pretending that Module 6 is already the complete Game AI.

**Required QA:** SYSTEM/PLAYER/WORLD/SOCIAL/PLAY visibility; WORLD subcommands; SOCIAL modes; authenticated PLAY; session lifecycle; valid and invalid results; tamper rejection; duplicate protection; progression; mobile; loading/error/empty states; no blank screens; production smoke test.

**Gate:** do not begin Module 7 implementation until this QA gate is closed.

# MODULE 7 — GAME DISCOVERY ENGINE

**Goal:** the SYSTEM recommends games based on the PLAYER rather than forcing the PLAYER through a giant catalogue.

**Market gate:** research demand, comparable games, reviews/community feedback, platform trends, engagement, risks and differentiation before building substantial new experiences.

**AI:** recommendation/ranking engine that can start with deterministic logic and progressively learn from player feedback and permitted behavior.

**Example:** a player presses **SYSTEM — Find my game**. MORISE evaluates preferences, play history, session patterns, solo/collective preference and explicit feedback, then proposes relevant games.

**SOLO:** personal recommendations.

**COLLECTIVE:** group/friend/event recommendations.

# MODULE 8 — GAME A→Z FACTORY

**Goal:** build each game completely from A to Z.

Stages: market research → concept → core loop/rules → visual direction → prototype → SOLO → justified COLLECTIVE → content → frontend/backend/data → security/anti-cheat → user testing → balancing → mobile/web optimization → QA → production → launch/iteration.

**AI:** Game Discovery Agent researches opportunities; Game Design Agent proposes mechanics; Creator Agent assists creation; AI may help content, balancing, documentation and testing. Human/product validation remains required.

**Rule:** never choose or code a new game blindly. Market evidence informs the decision. Never invent market numbers.

# MODULE 9 — SHARED GAME ENGINE

**Goal:** extract reusable infrastructure only after validated games prove the common requirements.

**AI:** reusable game-state, recommendation, telemetry and safety interfaces where justified.

**Exit:** a new validated game can reuse infrastructure without copying entire systems.

# MODULE 10 — SOCIAL GAMING

**Goal:** connect PLAY with SOCIAL through results, challenges, invitations, rematches, community challenges, co-op and asynchronous competition.

**AI:** social matching, challenge suggestions and group activity recommendations.

**Rule:** solo players must remain able to enjoy games without mandatory social participation.

# MODULE 11 — COMMUNITIES

**Goal:** persistent GUILDS/groups, roles, membership, feeds, goals, challenges, events, moderation and progression.

**AI:** Adaptive Social System. The SYSTEM can detect sustained non-sensitive affinity signals and propose communities. Example: three doctors with different paths repeatedly interact around a common topic; the SYSTEM proposes a GUILD and waits for consent.

**Important:** SYSTEM suggests; it does not silently create persistent groups from inference.

# MODULE 12 — EVENTS

**Goal:** recurring solo and collective experiences without notification/reward fatigue.

**AI:** event discovery, scheduling assistance, personalization and generation of event proposals with validation.

# MODULE 13 — ADAPTIVE WORLD

**Goal:** personalize WORLD without creating a closed filter bubble.

**AI:** contextual personalization, exploration balancing, people/community/game/activity/event recommendations, explanations and feedback learning.

**Rule:** users retain broad discovery and controls over recommendations.

# MODULE 14 — COLLECTION / REWARD ECONOMY

**Goal:** fair collections, cosmetics, rewards, creator incentives, referral/share systems and economy integrity.

**AI:** economy analytics, anomaly detection, reward simulations and fraud signals. Never let AI alone authorize payouts or irreversible economy mutations.

**Creator economy direction:** CREATE → SHARE → PLAY → GROW → REWARD, with monetary rewards only from real, validated revenue and applicable provider/legal rules.

# MODULE 15 — META SYSTEM

**Goal:** integrate the mature MORISE SYSTEM into a coherent AI experience.

The SYSTEM should be conversational like a modern general AI assistant, but grounded in MORISE. It can understand requests, remember permitted context, translate, recommend, discover communities, recommend games, assist game creation, explain decisions and invoke specialized agents/tools.

Potential specialist agents:

- Conversation/Reasoning Agent;
- Social Agent;
- Community Agent;
- Game Discovery Agent;
- Game Design Agent;
- Creator Agent;
- Translation Agent;
- Safety Agent;
- Economy Agent;
- Personalization Agent;
- SYSTEM Orchestrator.

**Final experience:**

`PLAYER → SYSTEM understands context → SYSTEM reasons/uses the correct mechanic → SYSTEM proposes or acts within permissions → PLAYER feedback → controlled learning`

---

# TRANSLATION V1 REQUIREMENT

Translation is a core SYSTEM capability, not a later cosmetic feature.

Preferred implementation is **browser/on-device first**, with caching and a controlled fallback architecture. The user writes naturally in their own language; MORISE translates the message for the recipient while preserving access to the original.

V1 must already provide useful translation quality. Later learning improves terminology, context and personalization; it is not an excuse for poor V1 quality.

---

# AI LEARNING RULE

MORISE can learn from the first users in V1, but learning is controlled.

- Personal preferences can adapt quickly.
- Aggregated patterns are validated.
- Feedback is measured.
- Global ranking/model changes are evaluated before deployment.
- Anti-spam, anti-fraud and anti-poisoning protections are mandatory.
- Private data is never exposed through hidden inference.

---

# UNIVERSAL MODULE GATE

Every module follows:

**PLAN → CURRENT MARKET RESEARCH → DESIGN → IMPLEMENT → AUTH/SECURITY TEST → MOBILE TEST → PRODUCTION TEST → DOCUMENT → NEXT MODULE**

A module is only `DONE` after code, UX, mobile, security and production validation. An interface existing is not proof that the underlying feature is complete.

This file is the **single canonical product/module plan**. Older conflicting roadmap/master-plan files must not be resurrected.