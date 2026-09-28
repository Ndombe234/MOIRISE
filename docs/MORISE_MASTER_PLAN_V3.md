# MORISE — MASTER PLAN V3

Date: 2026-09-28
Status: **CANONICAL PLAN — SINGLE SOURCE OF TRUTH**
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

# SIGNATURE MORISE MECHANIC — LIVING OBJECTS

**Living Objects** are a first-class MORISE primitive. They are not a separate social feature and not limited to games. They are persistent, evolving creations whose state is built through successive user contributions.

A Living Object starts from a **seed** created by one PLAYER and can evolve through contributions, transformations and branches. Every meaningful transformation becomes part of the object's lineage/ADN so that the object retains its history rather than becoming a sequence of unrelated posts.

A Living Object can begin as an idea and evolve into different forms without being recreated from zero:

`IDEA → STORY → GAME → CHALLENGE → COMMUNITY → EVENT → NEW BRANCH`

The same mechanism can support:

- game creation;
- stories and universes;
- art/creative works;
- collaborative ideas and solutions;
- music concepts;
- projects;
- challenges;
- community concepts;
- experiments and collective creations.

### Core object model

Each Living Object has:

- immutable origin/seed;
- owner/creator attribution;
- version history;
- contribution history;
- branches/variants;
- contributors and permissions;
- current state/type;
- transformation lineage;
- engagement/quality signals;
- invitations/share links;
- optional conversion target such as game, challenge, event or community.

The system must preserve attribution and lineage when branches merge or transform.

### Viral loop

The viral unit is not simply **"share my post"**.

The core loop is:

`CREATE → INVITE → CONTRIBUTE → TRANSFORM → BRANCH → SHARE → NEW PLAYER CONTRIBUTES`

A recipient becomes a participant instead of only a viewer. Sharing therefore exposes an evolving creation and an invitation to change it.

### MORISE AI role

The existing MORISE-only AI architecture operates this mechanic; Living Objects do **not** replace the AI plan.

AI may:

- detect meaningful evolution patterns;
- suggest compatible contributors;
- identify complementary branches;
- propose a merge or fork;
- suggest converting an object into a game, challenge, event or community;
- recommend discovery surfaces;
- explain why a transformation is proposed;
- help create, balance, test and document the resulting creation;
- learn from accepted, rejected, corrected and completed proposals.

AI suggestions never silently grant permissions, expose private information, merge branches or create persistent communities without the required user action.

### Privacy and integrity

- Private messages/content cannot be exposed through inferred Living Object relationships.
- Sensitive attributes must not be inferred for recommendations.
- Contributors control visibility and permissions.
- Blocking, reporting and mute controls remain authoritative.
- Server-side authorization/RLS validates every mutation.
- AI is not an authorization boundary.
- Branches and merges are auditable.
- Anti-spam, anti-abuse, anti-poisoning and rate-limit controls are required.

### Cross-module rule

Living Objects are a **cross-module primitive**, not Module 16 and not a replacement for existing modules. Each module adopts the primitive where it creates genuine value.

---

# MODULE MAP

| Module | Name | Status | Purpose |
|---|---|---|---|
| 1 | Foundation | BASE EXISTANTE | Technical, visual and AI-ready foundation |
| 2 | PLAYER | BASE EXISTANTE | Identity, preferences, progression and personal context |
| 3 | SOCIAL + PRIVATE MESSAGING | BASE EXISTANTE / messaging incomplete | Social graph, feed, private conversations, sharing and social intelligence |
| 4 | WORLD | BASE EXISTANTE | Discovery and exploration |
| 5 | SYSTEM / PROGRESSION | BASE EXISTANTE | Progression plus SYSTEM AI foundations |
| 6 | PLAY | **CURRENT — FINAL QA** | PLAY entry, sessions, validation and existing game interface |
| 7 | GAME DISCOVERY ENGINE | PLANNED | Market-informed game discovery and personalized recommendations |
| 8 | GAME A→Z FACTORY | PLANNED | Complete game creation pipeline with AI assistance and Living Objects |
| 9 | SHARED GAME ENGINE | PLANNED | Reusable validated game infrastructure |
| 10 | SOCIAL GAMING | PLANNED | Games + social graph + collective loops + Living Object branches |
| 11 | COMMUNITIES | PLANNED | GUILDS and adaptive community intelligence |
| 12 | EVENTS | PLANNED | Solo + collective recurring experiences and Living Object conversions |
| 13 | ADAPTIVE WORLD | PLANNED | Platform-wide personalization, Living Object discovery and exploration |
| 14 | COLLECTION / REWARD ECONOMY | PLANNED | Fair collection, rewards, creator/reward mechanics |
| 15 | META SYSTEM | PLANNED / first-cycle ceiling | Unified mature MORISE SYSTEM AI + MORISE AI Lab + Living Objects |

## MODULE 1 — FOUNDATION

Stable application, routing, auth, responsive UI, database conventions, security, observability and AI-ready event/context architecture. Add provider-independent primitives for Living Object IDs, lineage, events, permissions, branches and audit history without exposing unfinished UI.

## MODULE 2 — PLAYER

Persistent PLAYER identity with profile, preferences, progression, titles, achievements, history and visibility controls. AI learns useful non-sensitive personal preferences from explicit choices and permitted activity. PLAYER owns attribution and consent controls for Living Object contributions.

## MODULE 3 — SOCIAL + PRIVATE MESSAGING

Feed, posts, reactions, comments, follows, notifications and reliable one-to-one private messaging. AI provides conversation/context intelligence, translation, social recommendation and future affinity detection. Private messages remain protected.

Living Objects integrate with SOCIAL as shareable collaborative creations. Sharing a Living Object must invite participation, not merely generate passive traffic. Private content remains isolated from public object inference unless the product's explicit privacy model permits it.

Adaptive community signals remain proposal-only: sustained meaningful interactions can produce a candidate GUILD, but the SYSTEM waits for user acceptance before persistent creation or membership changes.

## MODULE 4 — WORLD

WORLD exploration with Discover, Play, Create, Communities, Activities and Events. AI provides contextual discovery, ranking and recommendation while preserving exploration.

Living Objects receive a discovery surface based on relevance, novelty, quality, diversity and legitimate participation signals. The WORLD must not become a closed popularity feed.

## MODULE 5 — SYSTEM / PROGRESSION

Unified XP, levels, missions, achievements, titles, rewards and progression history. AI provides SYSTEM conversational and orchestration foundations grounded in MORISE context and tools.

Living Object participation can produce validated progression events such as creation, contribution, successful collaboration, testing or completion, without rewarding spam volume alone.

## MODULE 6 — PLAY — CURRENT FINAL QA

One elegant PLAY entry instead of a confusing catalogue. Preserve the existing game interface even though the actual game is not yet a finished programmed game. AI collects permitted signals for future personalized game discovery.

Living Objects are not required to block Module 6 QA. Existing PLAY/session validation remains the current gate. Future games may originate from Living Objects in Module 8.

QA gate: SYSTEM/PLAYER/WORLD/SOCIAL/PLAY visibility; WORLD subcommands; SOCIAL modes; authenticated PLAY; session lifecycle; valid/invalid results; tamper rejection; duplicate protection; progression; mobile; loading/error/empty states; no blank screens; production smoke test.

**Do not begin Module 7 implementation until this gate is closed.**

## MODULE 7 — GAME DISCOVERY ENGINE

SYSTEM recommends games based on PLAYER. Research market demand, comparable games, reviews/community feedback, trends, engagement, risks and differentiation. AI starts with deterministic ranking and progressively learns from player feedback and permitted behavior.

Living Object discovery may surface playable objects and game branches based on player interests while preserving novelty and exploration.

## MODULE 8 — GAME A→Z FACTORY

Every game is built A→Z: market research → concept → core loop/rules → visual direction → prototype → SOLO → justified COLLECTIVE → content → frontend/backend/data → security/anti-cheat → user testing → balancing → mobile/web optimization → QA → production → launch/iteration.

A Living Object can be the game's seed. Contributors can create mechanics, cards, characters, rules, modes, levels and variants as branches. A validated branch may be converted into a playable game without losing its lineage or contributor attribution.

AI may assist research, design, content, balancing, documentation and testing.

## MODULE 9 — SHARED GAME ENGINE

Reusable validated game infrastructure after common requirements are proven. It must support game instances originating from Living Objects, branch/version metadata, contribution attribution and safe conversion from object state to executable game content.

## MODULE 10 — SOCIAL GAMING

Connect PLAY with SOCIAL through results, challenges, invitations, rematches, community challenges, co-op and asynchronous competition.

Living Objects become a collective gaming loop: a player can create a seed, invite contributors, branch a ruleset, test variants and publish a playable branch.

## MODULE 11 — COMMUNITIES

Persistent GUILDS/groups, roles, membership, feeds, goals, challenges, events, moderation and progression. Adaptive community intelligence detects sustained non-sensitive affinity signals and proposes communities.

Living Objects can become community seeds. A creation attracting a stable contributor network can trigger a proposal such as: **"This creation has become a recurring collaboration. Create a GUILD around it?"** Consent is required.

Example: three doctors with different paths repeatedly interact around a common topic; SYSTEM proposes a GUILD and waits for consent. No sensitive attribute inference is required or permitted.

## MODULE 12 — EVENTS

Recurring solo and collective experiences. AI provides event discovery, scheduling assistance, personalization and validated event proposals.

A Living Object can become an event when its contributors choose that transformation: idea → event, challenge → event, game tournament → event, or collaborative project → event.

## MODULE 13 — ADAPTIVE WORLD

Personalize WORLD without creating a closed filter bubble. AI balances relevance, novelty and exploration across people, communities, games, activities and events.

Living Object discovery adds another dimension: MORISE can surface an evolving creation, its active branch, a compatible contribution opportunity or a related emerging community rather than only showing finished content.

## MODULE 14 — COLLECTION / REWARD ECONOMY

Fair collections, cosmetics, rewards, creator incentives, referral/share systems and economy integrity. AI provides analytics, anomaly detection, simulations and fraud signals; it does not alone authorize payouts or irreversible economy mutations.

Living Object contributions can receive transparent attribution and non-pay-to-win recognition/rewards. Reward design must prevent contribution spam and coordinated manipulation.

## MODULE 15 — META SYSTEM + MORISE AI LAB

Integrate the mature MORISE SYSTEM and the MORISE-only self-evolution environment into one coherent experience. The SYSTEM becomes conversational like a modern general AI assistant, but all knowledge, memory, tools and actions are grounded in MORISE.

### MORISE AI Lab

An isolated environment where the MORISE AI can improve MORISE-specific capabilities. It may inspect permitted MORISE code, propose/generate MORISE-specific changes, create experimental branches/builds, run tests and benchmarks, train/fine-tune models when hardware/data/licensing allow, optimize recommendation/translation/memory/game/orchestration mechanisms, compare versions and retain a candidate when it measurably improves MORISE benchmarks.

The Lab has **no product mission outside MORISE**.

### Living Object intelligence

At maturity, the SYSTEM can understand Living Object state, lineage, branches, contributors, transformations and legitimate engagement signals. It can propose useful transformations such as:

`idea → story → game → challenge → event → community`

It can also identify complementary branches and propose merges or collaborations. These are proposals, not autonomous authority.

### Compute scaling

The Lab can begin on one capable computer and later use additional machines/GPU resources. `1 machine → experiments → more machines → larger experiments → GPU/cluster → larger workloads.` More compute never counts as proof of improvement.

### Production boundary

Self-modification happens in the Lab first. Production remains protected by authentication, authorization, RLS, validation, testing, deployment controls and rollback. High-impact or irreversible actions require explicit authorization.

### Final experience

`PLAYER → MORISE SYSTEM understands context → correct specialist mechanic → useful response/proposal/action → feedback → MORISE AI Lab experiments → measured improvement → next MORISE AI version`

And for creation:

`PLAYER → seed Living Object → invite → contribute → transform → branch → share → new contributors → validated conversion → game/community/event/etc.`

---

# UNIVERSAL MODULE GATE

Every module follows:

**PLAN → CURRENT MARKET RESEARCH → DESIGN → IMPLEMENT → AUTH/SECURITY TEST → MOBILE TEST → PRODUCTION TEST → DOCUMENT → NEXT MODULE**

A module is only `DONE` after code, UX, mobile, security and production validation. This file is the **single canonical product/module plan**; superseded roadmaps must not be resurrected.

## Documentation rule

This file is the authoritative plan for modules, AI mechanics, adaptive social behavior, translation and Living Objects. Superseded standalone roadmaps must not be used as implementation instructions.