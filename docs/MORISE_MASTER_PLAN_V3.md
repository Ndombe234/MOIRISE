# MORISE — MASTER PLAN V3

Date: 2026-09-28
Status: **CANONICAL PLAN**
Current working point: **MODULE 6 — PLAY / FINAL QA**

## Product doctrine

MORISE is a general-purpose social platform. The **SYSTEM is the central intelligent interaction layer** connecting PLAYER, WORLD, SOCIAL, PLAY, GUILDS, creation, recommendations and future AI capabilities. MORISE is not limited to one community or profession.

Every major capability must support **SOLO** and **COLLECTIVE** use cases when appropriate.

## MORISE-ONLY AI MISSION — NON-NEGOTIABLE

The AI being built for MORISE exists **only to operate, assist, understand, personalize and evolve within MORISE**. Its role and purpose are strictly limited to MORISE. It is not being built as a general autonomous agent for the outside world.

Its domain is exclusively MORISE: PLAYERs, WORLD, SOCIAL, PLAY, games, GUILDS, activities, events, creator tools, translation, recommendations, moderation, progression and internal SYSTEM operations.

The AI may improve its own MORISE-specific mechanisms, algorithms, models, prompts, ranking strategies and supporting code inside the MORISE AI Lab when the required infrastructure is available. This self-improvement exists solely to make MORISE better. It must not acquire a product mission outside MORISE or unrestricted authority over external systems, unrelated applications, arbitrary internet services, user devices or financial accounts.

The AI remains technically separated from production-critical systems while experimenting. It may experiment freely inside its MORISE AI Lab; production permissions, authentication, security controls, validation, deployment and irreversible actions remain protected.

## Self-evolving MORISE AI architecture

`MORISE AI → observes MORISE performance → identifies MORISE-specific weakness → proposes/creates modification → isolated experiment → uses available compute → evaluates against MORISE benchmarks → keeps/improves/rejects candidate → next MORISE AI version`

The evolution loop can include code refactoring, recommendation experiments, translation/context improvements, memory/context strategies, game discovery, game-design assistance, social/community recommendations, benchmark generation and model fine-tuning/training when the required hardware, data and licensing are available.

**Compute is a constraint, not proof of intelligence:** stronger machines enable larger experiments, but every claimed improvement must be measured with repeatable MORISE-specific evaluations.

## AI SYSTEM architecture

`PLAYER signals → specialist mechanics → SYSTEM Orchestrator → recommendation/proposal/action → feedback → controlled learning`

Specialist mechanics include conversation/reasoning, memory/context, personalization, social/relationship intelligence, community/GUILD intelligence, game discovery, game creation, translation, safety/moderation and economy/reward analysis.

## Translation architecture — browser/on-device first

Translation is a first-class V1 SYSTEM capability. Prefer browser/on-device processing where suitable, then translation cache, local/server fallback and an optional external API behind an internal abstraction. V1 must already provide useful translation quality.

## Learning architecture

MORISE V1 may learn from users immediately through personal adaptation, aggregated validated patterns and feedback learning. Raw activity must not directly rewrite the global AI; protect against spam, fake accounts, coordinated manipulation and data poisoning.

---

# MODULE MAP

| Module | Name | Status | Purpose |
|---|---|---|---|
| 1 | Foundation | BASE EXISTANTE | Technical, visual and AI-ready foundation |
| 2 | PLAYER | BASE EXISTANTE | Identity, preferences, progression and personal context |
| 3 | SOCIAL + PRIVATE MESSAGING | BASE EXISTANTE / messaging incomplete | Social graph, feed, private conversations and social intelligence |
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

## MODULE 1 — FOUNDATION

Stable application, routing, auth, responsive UI, database conventions, security, observability and AI-ready event/context architecture. AI interfaces for context, memory, recommendation, translation and orchestration are internal and provider-independent.

## MODULE 2 — PLAYER

Persistent PLAYER identity with profile, preferences, progression, titles, achievements, history and visibility controls. AI learns useful non-sensitive personal preferences from explicit choices and permitted activity.

## MODULE 3 — SOCIAL + PRIVATE MESSAGING

Feed, posts, reactions, comments, follows, notifications and reliable one-to-one private messaging. AI provides conversation/context intelligence, translation, social recommendation and future affinity detection. Private messages remain protected.

Adaptive GUILD foundation: sustained meaningful interactions can become a candidate signal; SYSTEM proposes a GUILD and waits for user acceptance before persistent creation or membership changes.

## MODULE 4 — WORLD

WORLD exploration with Discover, Play, Create, Communities, Activities and Events. AI provides contextual discovery, ranking and recommendation while preserving exploration.

## MODULE 5 — SYSTEM / PROGRESSION

Unified XP, levels, missions, achievements, titles, rewards and progression history. AI provides SYSTEM conversational and orchestration foundations grounded in MORISE context and tools.

## MODULE 6 — PLAY — CURRENT FINAL QA

One elegant PLAY entry instead of a confusing catalogue. Preserve the existing game interface even though the actual game is not yet a finished programmed game. AI collects permitted signals for future personalized game discovery.

QA gate: SYSTEM/PLAYER/WORLD/SOCIAL/PLAY visibility; WORLD subcommands; SOCIAL modes; authenticated PLAY; session lifecycle; valid/invalid results; tamper rejection; duplicate protection; progression; mobile; loading/error/empty states; no blank screens; production smoke test.

**Do not begin Module 7 implementation until this gate is closed.**

## MODULE 7 — GAME DISCOVERY ENGINE

SYSTEM recommends games based on PLAYER. Before substantial implementation, research market demand, comparable games, reviews/community feedback, trends, engagement, risks and differentiation. AI starts with deterministic ranking and progressively learns from player feedback and permitted behavior.

## MODULE 8 — GAME A→Z FACTORY

Every game is built A→Z: market research → concept → core loop/rules → visual direction → prototype → SOLO → justified COLLECTIVE → content → frontend/backend/data → security/anti-cheat → user testing → balancing → mobile/web optimization → QA → production → launch/iteration.

AI may assist research, design, content, balancing, documentation and testing.

## MODULE 9 — SHARED GAME ENGINE

Reusable validated game infrastructure after common requirements are proven.

## MODULE 10 — SOCIAL GAMING

Connect PLAY with SOCIAL through results, challenges, invitations, rematches, community challenges, co-op and asynchronous competition.

## MODULE 11 — COMMUNITIES

Persistent GUILDS/groups, roles, membership, feeds, goals, challenges, events, moderation and progression. Adaptive Social System detects sustained non-sensitive affinity signals and proposes communities. Example: three doctors with different paths repeatedly interact around a common topic; SYSTEM proposes a GUILD and waits for consent.

## MODULE 12 — EVENTS

Recurring solo and collective experiences. AI provides event discovery, scheduling assistance, personalization and validated event proposals.

## MODULE 13 — ADAPTIVE WORLD

Personalize WORLD without creating a closed filter bubble. AI balances relevance, novelty and exploration across people, communities, games, activities and events.

## MODULE 14 — COLLECTION / REWARD ECONOMY

Fair collections, cosmetics, rewards, creator incentives, referral/share systems and economy integrity. AI provides analytics, anomaly detection, simulations and fraud signals; it does not alone authorize payouts or irreversible economy mutations.

## MODULE 15 — META SYSTEM + MORISE AI LAB

Integrate the mature MORISE SYSTEM and the MORISE-only self-evolution environment into one coherent experience. The SYSTEM becomes conversational like a modern general AI assistant, but all knowledge, memory, tools and actions are grounded in MORISE.

### MORISE AI Lab

An isolated environment where the MORISE AI can improve MORISE-specific capabilities. It may inspect permitted MORISE code, propose/generate MORISE-specific changes, create experimental branches/builds, run tests and benchmarks, train/fine-tune models when hardware/data/licensing allow, optimize recommendation/translation/memory/game/orchestration mechanisms, compare versions and retain a candidate when it measurably improves MORISE benchmarks.

The Lab has **no product mission outside MORISE**.

### Compute scaling

The Lab can begin on one capable computer and later use additional machines/GPU resources. `1 machine → experiments → more machines → larger experiments → GPU/cluster → larger workloads.` More compute never counts as proof of improvement.

### Production boundary

Self-modification happens in the Lab first. Production remains protected by authentication, authorization, RLS, validation, testing, deployment controls and rollback. High-impact or irreversible production actions require explicit authorization.

### Final experience

`PLAYER → MORISE SYSTEM understands context → correct specialist mechanic → useful response/proposal/action → feedback → MORISE AI Lab experiments → measured improvement → next MORISE AI version`

---

# UNIVERSAL MODULE GATE

Every module follows:

**PLAN → CURRENT MARKET RESEARCH → DESIGN → IMPLEMENT → AUTH/SECURITY TEST → MOBILE TEST → PRODUCTION TEST → DOCUMENT → NEXT MODULE**

A module is only `DONE` after code, UX, mobile, security and production validation. This file is the **single canonical product/module plan**; superseded roadmaps must not be resurrected.
