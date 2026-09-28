# MORISE — MASTER PLAN V3

Date: 2026-09-28
Status: **CANONICAL PLAN**
Current working point: **MODULE 6 — PLAY / FINAL QA**

## Product doctrine

MORISE is a general-purpose social platform. The **SYSTEM is the central intelligent interaction layer** connecting PLAYER, WORLD, SOCIAL, PLAY, GUILDS, creation, recommendations and future AI capabilities. MORISE is not limited to one community or profession.

Every major capability must support **SOLO** and **COLLECTIVE** use cases when appropriate.

## MORISE-ONLY AI MISSION — NON-NEGOTIABLE

The AI being built for MORISE exists **only to operate, assist, understand, personalize and evolve within MORISE**. Its purpose is not to become a general autonomous agent for the outside world.

The AI's domain is MORISE: its PLAYERs, WORLD, SOCIAL, PLAY, games, GUILDS, activities, events, creator tools, translation, recommendations, moderation, progression and internal SYSTEM operations.

The AI may evolve its own MORISE-specific mechanisms, algorithms, models, prompts, ranking strategies and supporting code inside an isolated AI laboratory when the required infrastructure is available. This self-improvement is specifically aimed at making MORISE work better. It does not grant the AI unrestricted authority over external systems, arbitrary internet services, user devices, financial accounts or unrelated applications.

The AI must remain technically separated from production-critical systems while experimenting. Candidate changes are evaluated before deployment. The AI may experiment freely **inside its MORISE AI Lab**, but production authorization, security controls, permissions and irreversible actions remain protected.

## Self-evolving MORISE AI architecture

`MORISE AI → observes MORISE performance → identifies MORISE-specific weakness → proposes/creates modification → isolated experiment → uses available compute → evaluates against MORISE benchmarks → keeps/improves/rejects candidate → next MORISE AI version`

The evolution loop can include:

- code generation and refactoring for MORISE-specific components;
- recommendation algorithm experiments;
- translation/context improvements;
- memory/context strategy improvements;
- game discovery improvements;
- game-design assistance improvements;
- social/community recommendation improvements;
- testing and benchmark generation;
- model fine-tuning or training when data, hardware and licensing permit;
- resource-aware optimization for the machines available to the AI Lab.

**Compute is a constraint, not a promise:** a more powerful computer can enable larger experiments, but does not automatically make the AI more intelligent. Improvements must be measured with repeatable MORISE-specific benchmarks.

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

The SYSTEM should use the appropriate MORISE mechanism instead of treating every problem as a chat prompt.

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
| 14 | COLLECTION / REWARD ECONOMY | PLANNED | Fair collection, rewards, creator/reward mechanics |
| 15 | META SYSTEM | PLANNED / first-cycle ceiling | Unified mature MORISE SYSTEM AI + MORISE AI Lab |

---

# MODULE 1 — FOUNDATION

**Goal:** stable application, routing, auth, responsive UI, database conventions, security, observability and an AI-ready event/context architecture.

**AI:** create internal interfaces for context, memory, recommendation, translation, orchestration and the future MORISE AI Lab without requiring an external AI provider.

# MODULE 2 — PLAYER

**Goal:** persistent PLAYER identity with profile, preferences, progression, titles, achievements, history and visibility controls.

**AI:** personal context and preference memory; the SYSTEM can learn useful non-sensitive preferences from explicit choices and permitted activity.

# MODULE 3 — SOCIAL + PRIVATE MESSAGING

**Goal:** feed, posts, reactions, comments, follows, notifications and reliable one-to-one private messaging.

**AI:** conversation/context intelligence, translation, social recommendation and future affinity detection. Private messages remain protected and never become exposed hidden inference.

**Adaptive GUILD foundation:** repeated meaningful interactions may become a candidate signal. The SYSTEM can propose a GUILD; users must accept before persistent creation/membership changes.

# MODULE 4 — WORLD

**Goal:** WORLD exploration layer with Discover, Play, Create, Communities, Activities and Events.

**AI:** contextual discovery, ranking and recommendation while preserving broad exploration.

# MODULE 5 — SYSTEM / PROGRESSION

**Goal:** unified XP, levels, missions, achievements, titles, rewards and progression history.

**AI:** SYSTEM conversational layer and orchestration foundations. Long-term SYSTEM understands natural language, MORISE context and specialized mechanics/tools.

# MODULE 6 — PLAY — CURRENT FINAL QA

**Goal:** one elegant PLAY entry instead of a confusing catalogue. Preserve the existing game interface even though the actual game is not yet a finished programmed game.

**AI:** collect permitted signals needed for future personalized game discovery without pretending Module 6 is already the complete Game AI.

**Required QA:** SYSTEM/PLAYER/WORLD/SOCIAL/PLAY visibility; WORLD subcommands; SOCIAL modes; authenticated PLAY; session lifecycle; valid/invalid results; tamper rejection; duplicate protection; progression; mobile; loading/error/empty states; no blank screens; production smoke test.

**Gate:** do not begin Module 7 implementation until this QA gate is closed.

# MODULE 7 — GAME DISCOVERY ENGINE

**Goal:** SYSTEM recommends games based on PLAYER rather than forcing a giant catalogue.

**Market gate:** research demand, comparable games, reviews/community feedback, platform trends, engagement, risks and differentiation before substantial implementation.

**AI:** recommendation/ranking engine starts with deterministic logic and progressively learns from player feedback and permitted behavior.

**Example:** PLAYER presses **SYSTEM — Find my game**. MORISE evaluates preferences, play history, session patterns, solo/collective preference and explicit feedback, then proposes relevant games.

# MODULE 8 — GAME A→Z FACTORY

**Goal:** build each game completely from A to Z.

Stages: market research → concept → core loop/rules → visual direction → prototype → SOLO → justified COLLECTIVE → content → frontend/backend/data → security/anti-cheat → user testing → balancing → mobile/web optimization → QA → production → launch/iteration.

**AI:** Game Discovery Agent researches opportunities; Game Design Agent proposes mechanics; Creator Agent assists creation; AI may help content, balancing, documentation and testing. Human/product validation remains required.

# MODULE 9 — SHARED GAME ENGINE

**Goal:** reusable validated game infrastructure after common requirements are proven.

# MODULE 10 — SOCIAL GAMING

**Goal:** connect PLAY with SOCIAL through results, challenges, invitations, rematches, community challenges, co-op and asynchronous competition.

# MODULE 11 — COMMUNITIES

**Goal:** persistent GUILDS/groups, roles, membership, feeds, goals, challenges, events, moderation and progression.

**AI:** Adaptive Social System detects sustained non-sensitive affinity signals and proposes communities. Example: three doctors with different paths repeatedly interact around a common topic; SYSTEM proposes a GUILD and waits for consent.

# MODULE 12 — EVENTS

**Goal:** recurring solo and collective experiences without notification/reward fatigue.

**AI:** event discovery, scheduling assistance, personalization and generation of event proposals with validation.

# MODULE 13 — ADAPTIVE WORLD

**Goal:** personalize WORLD without creating a closed filter bubble.

**AI:** contextual personalization, exploration balancing, people/community/game/activity/event recommendations, explanations and feedback learning.

# MODULE 14 — COLLECTION / REWARD ECONOMY

**Goal:** fair collections, cosmetics, rewards, creator incentives, referral/share systems and economy integrity.

**AI:** economy analytics, anomaly detection, reward simulations and fraud signals. AI never alone authorizes payouts or irreversible economy mutations.

# MODULE 15 — META SYSTEM + MORISE AI LAB

**Goal:** integrate the mature MORISE SYSTEM and the MORISE-only self-evolution environment into a coherent AI experience.

The SYSTEM becomes conversational like a modern general AI assistant, but its knowledge, memory, tools and actions are grounded in MORISE.

### MORISE AI Lab

A separate isolated environment is reserved for self-improvement experiments.

The AI may:

- inspect MORISE-specific code and architecture within explicitly permitted repositories/workspaces;
- propose or generate MORISE-specific code changes;
- create experimental branches/builds;
- run tests and MORISE benchmarks;
- train/fine-tune models when the required hardware/data/licensing are available;
- optimize its own MORISE-specific recommendation, translation, memory, game and orchestration mechanisms;
- compare candidate versions;
- retain a candidate when it measurably improves MORISE benchmarks.

The Lab is **not** a license for unrestricted external autonomy. It has no product purpose outside MORISE.

### Compute scaling

The AI Lab can start on one capable computer and later use additional machines/GPU resources. The architecture must support resource-aware experiments so the AI scales its ambition to available compute.

`1 machine → experiments`

`more machines → larger experiments`

`GPU/cluster → larger model/training workloads`

More compute never counts as proof of intelligence. A candidate must demonstrate improvement on repeatable MORISE-specific evaluations.

### Production boundary

Self-modification occurs in the Lab first. Production systems remain protected by authentication, authorization, RLS, validation, testing, deployment controls and rollback capability. High-impact or irreversible production actions require explicit system-level authorization.

### Final experience

`PLAYER → MORISE SYSTEM understands context → correct specialist mechanic → useful response/proposal/action → feedback → MORISE AI Lab experiments → measured improvement → next MORISE AI version`

---

# TRANSLATION V1 REQUIREMENT

Translation is a core SYSTEM capability, not a later cosmetic feature.

Preferred implementation is **browser/on-device first**, with caching and controlled fallbacks. The user writes naturally in their own language; MORISE translates for the recipient while preserving access to the original.

V1 must already provide useful translation quality. Later learning improves terminology, context and personalization; it is not an excuse for poor V1 quality.

# UNIVERSAL MODULE GATE

Every module follows:

**PLAN → CURRENT MARKET RESEARCH → DESIGN → IMPLEMENT → AUTH/SECURITY TEST → MOBILE TEST → PRODUCTION TEST → DOCUMENT → NEXT MODULE**

A module is only `DONE` after code, UX, mobile, security and production validation. An interface existing is not proof that the underlying feature is complete.

This file is the **single canonical product/module plan**. Older conflicting roadmap/master-plan files must not be resurrected.
