# MOIRISE — FUSION CANONIQUE DES 15 MODULES

Ce document est la synthèse opérationnelle de la structure historique 1→15. Il doit être lu avec HISTORICAL_INVENTORY.md et les conceptions techniques module par module lorsqu'elles sont présentes.

## Portes utilisateur
SYSTEM | PLAYER | SOCIAL | WORLD | PLAY | CREATE

La profondeur interne n'augmente pas le nombre de boutons. M15 coordonne les capacités internes.

## M01 FOUNDATION
Shell, routing, design system, responsive, auth boundary, loading/error, Event Bus, Capability Registry, AI Gateway, Provider Registry, config, feature flags, storage abstraction, observability, security.

## M02 PLAYER
Identity, profile public/private, avatar, preferences, privacy, history, attribution, Player Context, Player Memory, MORISE DNA evidence.

## M03 SOCIAL
Feed, posts, comments, reactions, follows, sharing, people discovery, private conversations, attachments, translation, drafting, social recommendations, blocks/mutes and anti-abuse.

## M04 WORLD
World home, contextual discovery, access to Play/Create/Communities/Events/Activities, search, novelty/diversity, Living Object discovery, Hidden Possibilities, Unexplored Paths, contextual World Memory retrieval.

## M05 SYSTEM
SYSTEM HUD, contextual commands, natural SYSTEM messaging, XP, levels, ranks, titles, achievements, missions presentation, reward presentation, first-session progressive reveal, suppression while focused, real continuation prompts.

## M06 PLAY
Quiz, 2D and 3D games, sessions, pause/resume, saves, result validation, leaderboards, share tokens, mobile controls, crash recovery.

## M07 GAME DISCOVERY ENGINE
Game search, game ranking, trend and demand research, comparable-game analysis, differentiation, opportunity detection, feedback learning, diversity, freshness, Living Object playable discovery, Convergence opportunities.

## M08 GAME A→Z FACTORY
Idea parser, clarification, Game Designer AI, GameSpecification, Adventure/Battle/Puzzle 2D, approved 3D adapters, rules, scenes, quests, dialogues, assets, audio, build, simulation, testing, preview, version, private/public publication, rollback.

## M09 SHARED GAME ENGINE
Scene, Entity, Input, Camera, Physics, Collision, Quest, Dialogue, Inventory, Save, Audio, UI, multiplayer adapter, runtime telemetry, manifests, quotas, dynamic imports, asset streaming.

## M10 SOCIAL GAMING
Result sharing, challenges, invitations, rematches, community challenges, co-op, asynchronous competition, social leaderboards, Game↔Social links, Living Object game loops, Convergence experiments.

## M11 COMMUNITIES
User-created groups/clans, owner/admin/mod/member roles, public/private visibility, join request, invitation, leave/remove, feed, events, games, moderation, Guild candidate detection, Adaptive Guild proposal, community agent and organization assistance.

## M12 EVENTS
Solo/collective events, activities, challenges, competitions, community events, schedule, eligibility, registration, progress, completion, cancellation, personalization, Living Object→Event, Emergence Event.

## M13 ADAPTIVE WORLD
Observe→detect pattern→propose change→simulate→validate→apply→observe. Route/object/event/challenge/music/encounter/experience changes, candidate versioning, benchmark, canary, rollback.

## M14 COLLECTION / REWARD ECONOMY
Collections, original items/cards, titles, badges, rarities, rewards, provenance, reward eligibility, roulette, anomaly detection, economy analysis, non-pay-to-win recognition. Server-authoritative outcomes.

## M15 META SYSTEM + MORISE AI LAB
Native AI orchestrator, context, intent/reasoning, planning, memory, learning, collective intelligence, specialist agents, capabilities, provider/resource routing, Creative AI, zero-API/local AI, Trusted/Community Workers, resource scheduler, validation, self-correction, evolution, Living Objects intelligence, MORISE DNA, Convergence, Missions From Reality, World Memory, evaluation, benchmark, canary, rollback.

## Cross-module mechanics
Living Objects, Evolution Engine, Fun & Surprise, MORISE DNA, Convergence, Missions From Reality and World Memory are cross-module capabilities. They are not new top-level modules and do not become permanent navigation tabs.

## IA évolutive
OBSERVE → LIMIT DETECTION → GAP → HYPOTHESIS → DESIGN → CODE/ALGORITHM CANDIDATE → SANDBOX → TEST → BENCHMARK → SECURITY/POLICY → CANARY → PROMOTE/REJECT → MONITOR → ROLLBACK → EXPERIENCE MEMORY.

## Provider independence
Gemini, Pollinations, Puter, LLM7, AI Horde, OVH AI Endpoints and other providers are instruments. The MORISE-native AI remains the orchestration, context, memory, policy, validation and evolution system.

## Group intelligence
Users can create groups themselves. M15 may detect sustained non-sensitive affinity and create a proposal; persistent creation/membership changes require the explicit user action defined by policy.

## Interface rule
Internal capability count can be extremely large; visible navigation remains approximately five or six principal doors.


# TECHNICAL DECOMPOSITION RULE

For every feature, implementation must define: actor, trigger, context, input schema, validation, permission, state machine, authoritative owner, persistence, idempotency, events, UI state, AI capability if any, provider/resource route if any, failure modes, retry, rollback, observability, privacy, tests and mobile behavior.

# FEATURE MECHANISM MAP

## SOCIAL / PRIVATE MESSAGING
Actor → conversation membership check → message validation → idempotent write → MESSAGE_SENT → delivery/read projections. AI translation uses only authorized conversation context. Private content is excluded from global learning/analytics by default.

## USER GROUP CREATION
Player → CREATE_COMMUNITY → validate name/visibility/rules → create community + owner membership atomically → default role bindings → COMMUNITY_CREATED → invite/join flows.

## AI COMMUNITY FORMATION
Permitted social/activity signals → affinity candidate → existing-community check → privacy/block/mute filter → confidence/diversity threshold → proposal → explicit user action required for persistent creation or membership mutation → normal Community lifecycle → feedback.

## LIVING OBJECT
Seed → versioned object → contribution → transformation → branch → share/invite → optional conversion to story/game/challenge/event/community. Lineage and attribution survive branching and merging.

## MORISE DNA
Validated Player action → evidence → capability dimension/version → signal confidence → DNA projection → contextual possibility. It describes demonstrated capability, not sensitive psychology.

## EVOLUTION ENGINE
Meaningful action → permitted signal → Trace update → possibility evaluation → contextual change/proposal → Player feedback → validated experience. Hidden Possibilities and Unexplored Paths remain optional and do not create false completion metrics.

## FUN & SURPRISE
Eligible state → rarity/frequency policy → safe content proposal → optional presentation → feedback. Never fake scarcity, fake event, fake counter or coercive urgency.

## CONVERGENCE
Independent permitted trajectories → similarity/compatibility candidate → privacy filter → evidence threshold → Convergence Space candidate → optional participation → experiment → validated result → possible Living Object/Game/Event/Community/World Memory outcome.

## MISSIONS FROM REALITY
Repeated validated problem pattern → problem candidate → scope/impact validation → optional mission → solo/collective experiment → measured result → validator → reusable discovery or World Memory candidate.

## WORLD MEMORY
Validated discovery → provenance + attribution + privacy classification → memory candidate → validation/quality → memory entry → retrieval only when relevant. It is not a dump of all user activity.

## AI SELF-DEVELOPMENT
Observed failure/limitation → Capability Gap → root cause → hypothesis → design → generated code/algorithm/prompt candidate → isolated sandbox → static/type/security tests → behavioral tests → benchmark vs baseline → policy gate → canary → promote/reject → monitor → rollback → experience memory.

## ZERO-API / LOCAL AI
Task → capability policy → local/browser/on-device eligibility → execute locally when possible → validate → fallback only when policy permits. External APIs are auxiliary, not the native brain.

## DISTRIBUTED COMPUTE
Task → hard constraints → eligible resources → health/quota/latency/fairness score → lease → sandbox → heartbeat → result validation → release. Community Workers default to 1 logical CPU and 512 MiB RAM with GPU off unless a separate policy enables it. No RAM-pool fiction.

## CREATIVE MEDIA
Intent → creative brief → original-first constraints → capability route → generation → content/safety/originality/provenance validation → artifact hash → version → storage → preview/export.

## GAME A→Z
Idea → intent → GameSpecification → engine selection → task graph → content/assets/code → build → sandbox → simulation → test → preview → version → publication. Adventure/Battle/Puzzle 2D are controlled base engines; 3D uses approved adapters.

## GAME RUNTIME
Published package → manifest validator → shared engine → session → save/result → result validator → progression/share events. Runtime never depends on the original generation provider.

## ADAPTIVE WORLD
Observed validated signal → candidate world change → simulation → compatibility/security/performance validation → canary → apply → monitor → rollback.

## REWARD ECONOMY
Validated event → reward rule/config version → authoritative outcome → provenance/audit → grant → collection projection. AI can analyze but cannot unilaterally grant critical rewards.

# INTERFACE RULE

The internal mechanism catalog can be hundreds of capabilities. The visible navigation remains approximately 5–6 primary doors: SYSTEM, PLAYER, SOCIAL, WORLD, PLAY and CREATE. A new internal mechanism does not create a new permanent tab. M15 decides contextual surfacing; module owners retain authority.

# CANONICAL OWNERSHIP

M01 foundation/security primitives.
M02 Player identity/preferences/DNA evidence.
M03 Social/private communication.
M04 World exploration surface.
M05 SYSTEM/progression presentation and authoritative progression hooks.
M06 game/player runtime surface.
M07 game discovery/research.
M08 game creation factory.
M09 shared game engine.
M10 social gaming.
M11 communities/groups.
M12 real temporal events.
M13 adaptive world state changes.
M14 collection/reward economy.
M15 native AI orchestration, AI Lab and cross-module intelligence.

# NON-NEGOTIABLE

Provider outage must not destroy the core social product. AI output is untrusted until validation. M15 cannot become superuser. Generated code never runs directly in production. Private data is not global learning material. More code is not evidence of intelligence; benchmarked improvement is evidence.
## CONTEXT INTELLIGENCE D100K CROSS-MODULE FUSION
Canonical transversal owner: docs/moirise/transversal/CONTEXT_MEMORY_TECHNICAL_DESIGN.md.
- M01: session/actor boundary
- M02: durable player memory and explicit profile facts
- M03: conversation/coreference context
- M04: location/world projection
- M05: SYSTEM continuity/presentation
- M06: play-session context
- M07: discovery signals
- M08: creation/fabrication context
- M09: runtime input sandbox
- M10: social challenge context
- M11: community-scoped shared context
- M12: temporal/event context
- M13: retrieval/convergence
- M14: reward eligibility evidence
- M15: extraction, ContextPacket, AI orchestration and policy
No module may implement an independent memory brain.
