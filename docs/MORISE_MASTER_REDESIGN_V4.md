# MOIRISE — MASTER REDESIGN V4

Date: 2026-09-29
Status: DESIGN BASELINE — REPLACES PREVIOUS DESIGN DOCUMENTS FOR NEW WORK

> This document is the new architectural baseline requested for MOIRISE. Older plans remain historical references, but new implementation work must follow this document unless a later approved revision explicitly supersedes it.

## 0. Purpose

Rebuild the technical conception of MOIRISE from zero as one coherent system covering Modules 1–15 and, separately, the internal MORISE AI engine.

The goal is not to load a huge AI application into the browser. The goal is a small stable runtime core that orchestrates many lazy-loaded capabilities, providers, local mechanisms, memories, experiments and user-facing experiences.

The site must remain understandable and responsive even if the complete architecture eventually contains hundreds of thousands of lines of code.

## 1. Product doctrine

MOIRISE is a general-purpose social platform whose SYSTEM is the central intelligent interaction layer. It is not a quiz-only product and it is not only a game platform.

The SYSTEM connects PLAYER, SOCIAL, WORLD, PLAY, creation, communities, events, discovery, rewards and future AI capabilities.

The user-facing interface must remain intentionally small. A large internal capability graph must not become dozens of permanent navigation buttons.

Core rule:

`FEW USER-FACING DOORS -> MORISE AI ORCHESTRATES MANY INTERNAL CAPABILITIES -> CONTEXTUAL EXPERIENCE`

The system should support SOLO and COLLECTIVE experiences whenever appropriate.

## 2. Non-negotiable architectural rules

1. No provider is allowed to become the identity or brain of MORISE.
2. Provider integrations are adapters behind a capability registry.
3. API keys are server-side secrets only.
4. Provider failure must degrade gracefully and must not blank the site.
5. Local/on-device mechanisms are first-class fallbacks where technically realistic.
6. Generated content is stored as an experience with provenance and validation metadata.
7. User feedback can create learning candidates but cannot directly rewrite production behavior.
8. Generated code is sandboxed, tested, benchmarked and rolled back when necessary.
9. External provider output is evidence/input, not automatically truth.
10. Copyright, provenance, privacy, safety and originality checks occur before eligible content enters long-term learning.
11. Large modules are split into focused files and lazy-loaded.
12. A new AI or developer must be able to understand the project from the contracts without guessing.
13. No module may silently redefine a core interface.
14. The browser must not receive provider secrets.
15. The system must distinguish user memory, experience memory, world memory and system/skill memory.

## 3. Current technical baseline

The repository currently uses Next.js 16.3.6, React 19.3.0, Supabase SSR/JS 0.12.7/2.117.1, TypeScript 7.0.2 and Vitest 5.0.2. Existing build scripts run typecheck, tests and Next build. New architecture must preserve these baseline constraints unless a later decision explicitly changes them.

## 4. Repository architecture

```text
src/
  app/
  core/
    ai/
    memory/
    capabilities/
    providers/
    events/
    scheduler/
    validation/
    security/
    evolution/
  modules/
    m01-foundation/
    m02-player/
    m03-social/
    m04-world/
    m05-system/
    m06-play/
    m07-discovery/
    m08-game-factory/
    m09-game-engine/
    m10-social-gaming/
    m11-communities/
    m12-events/
    m13-adaptive-world/
    m14-collection/
    m15-meta-ai/
  shared/
    ui/
    types/
    utils/
    constants/
  styles/

supabase/
  functions/
    ai-router/
    provider-health/
    ai-memory/
    ai-evolution/
    media-generation/
  migrations/

docs/
  modules/
  ai/
  providers/
  architecture/

tests/
  core/
  modules/
  ai/
  integration/
```

A module owns its presentation and module-specific services. The core owns cross-module contracts. Shared code must remain generic and small.

## 5. Universal module contract

Every Module 1–15 specification must contain exactly these sections:

1. Purpose
2. User problem
3. User-facing screens
4. Navigation entry point
5. Exact buttons/actions
6. User flow
7. What MORISE says
8. What MORISE does
9. AI actions/capabilities
10. Data model
11. Database requirements
12. Events emitted
13. Provider dependencies
14. Secrets used
15. Security rules
16. Privacy rules
17. Copyright/provenance rules
18. Performance budget
19. Lazy-loading strategy
20. Cache strategy
21. Loading states
22. Empty states
23. Error states
24. Offline/degraded states
25. Mobile behavior
26. Accessibility
27. Tests
28. Acceptance criteria
29. Forbidden changes
30. Dependencies on other modules

This contract is mandatory for future AI agents working on the repository.

# PART I — MODULES 1–15

## MODULE 1 — FOUNDATION

### Purpose
Create the stable application shell, routing, providers, error boundaries, loading boundaries, shared UI primitives and core runtime boot sequence.

### User-facing behavior
MORISE should appear coherent immediately. The user must never see raw provider failures, stack traces or blank screens.

### MORISE speech
Initial system messages are minimal and contextual. Example:

`SYSTEM`
`Bienvenue. Ton espace est prêt.`

Do not spam SYSTEM text.

### MORISE actions
- initialize session;
- resolve permitted capabilities;
- load player context;
- load only the current module;
- report degraded services internally;
- expose safe recovery UI.

### Technical requirements
- route-level lazy loading;
- React error boundaries;
- module registry;
- capability registry;
- event bus contract;
- global request IDs;
- consistent loading/error/empty states.

### Acceptance
Navigation between modules never causes a blank screen. A provider outage does not break the shell.

---

## MODULE 2 — PLAYER

### Purpose
Represent the player identity and permitted personalization state.

### UI
Profile, avatar, progression, statistics, creations, games, collections and permitted activity history.

### MORISE says
`Ton espace évolue avec tes actions.`

When a useful change occurs, explain the concrete result rather than exposing internal implementation.

### MORISE does
- read permitted profile data;
- personalize experiences using explicit/non-sensitive signals;
- update progression through validated events;
- propose avatar/profile improvements;
- preserve creator attribution.

### Safety
No sensitive-attribute inference for personalization. No hidden psychological profiling.

---

## MODULE 3 — SOCIAL

### Purpose
Provide feed, posts, comments, reactions, following, sharing, notifications and private one-to-one messaging.

### UI
Keep the primary navigation compact. Social subfeatures are contextual rather than separate permanent tabs where possible.

### MORISE says
`J'ai trouvé quelque chose qui correspond à ce que tu regardes.`

Never claim that a recommendation is certain when it is only inferred.

### MORISE does
- assist discovery;
- translate when requested/allowed;
- classify content for moderation;
- generate summaries;
- suggest replies only when requested or contextually appropriate.

### Required safeguards
Private messages are not global learning material by default. Privacy scope must be explicit in memory writes.

---

## MODULE 4 — WORLD

### Purpose
Provide a contextual world made of zones and experiences without requiring one giant persistent scene.

### World structure
Discover, Play, Create, Communities, Activities and Events are contextual destinations, not necessarily separate AI systems.

### MORISE does
- react to validated world events;
- assemble experiences;
- maintain eligible world state;
- orchestrate Living Objects and world agents later.

### Performance
Only the active zone is loaded. Heavy assets are streamed/lazy-loaded.

---

## MODULE 5 — SYSTEM / PROGRESSION

### Purpose
Provide the holographic/Solo-Leveling-inspired SYSTEM interface without constant visual/text spam.

### Features
Level, XP, rank, missions, titles, statistics, rewards, alerts and progression history.

### MORISE says
Use concise contextual messages such as:

`NOUVEAU TITRE DÉBLOQUÉ`
`Explorateur du Monde`

### MORISE does
`ACTION -> EVENT -> VALIDATED RULE -> XP -> LEVEL/UNLOCK`

Never award progression from an unvalidated client-side result.

---

## MODULE 6 — PLAY

### Purpose
Provide the playable experience surface for 2D and 3D games.

### Current repository state
Existing documentation marks Module 6 as the current final-QA position. The redesign must preserve that reality rather than pretending that future game-generation infrastructure already exists.

### MORISE does
- create/restore play sessions;
- validate completion;
- reject tampered results;
- connect valid results to progression;
- surface appropriate games.

### Performance
Game runtime is lazy-loaded. Heavy engines/assets are not part of the initial shell.

---

## MODULE 7 — GAME DISCOVERY ENGINE

### Purpose
Recommend experiences while deliberately mixing known interests with controlled novelty.

### Algorithmic contract
`explicit_preferences + permitted_activity_signals + novelty_budget -> ranked_candidates`

The engine must not trap users in one content category.

### MORISE says
`Tu joues souvent à ce type d'expérience. J'en ai aussi trouvé une différente qui pourrait te surprendre.`

Recommendations remain suggestions, not facts about the player.

---

## MODULE 8 — GAME A→Z FACTORY

### Purpose
Turn a natural-language game idea into a validated playable experience.

### Pipeline
`INTENT -> GAME_SPEC -> RULES -> CONTENT_PLAN -> ASSET_PLAN -> ENGINE -> BUILD -> SIMULATION -> TEST -> PREVIEW -> PUBLISH`

### MORISE says
`Je prépare une première version jouable.`

### MORISE does
- clarify ambiguous game requirements internally;
- create structured game specifications;
- generate code/assets through controlled capabilities;
- execute builds in sandbox;
- test gameplay;
- iterate based on failures;
- publish only validated artifacts.

### No direct execution
The AI must never execute arbitrary generated code against the production application.

---

## MODULE 9 — SHARED GAME ENGINE

### Purpose
Avoid rebuilding the same infrastructure for every game.

### Shared primitives
Scene, entity, input, camera, physics adapter, inventory, quest, dialogue, audio, save state, UI and telemetry.

### Rule
Games depend on the shared engine through stable adapters. The game factory cannot silently fork the core engine.

---

## MODULE 10 — SOCIAL GAMING

### Purpose
Enable cooperative/competitive/social experiences where the underlying game supports them.

### MORISE does
- match eligible players;
- create safe challenges;
- preserve session state;
- record valid results;
- create social moments.

No forced social interaction.

---

## MODULE 11 — COMMUNITIES

### Purpose
Groups, clans, communities, roles, discussions and community activities.

### MORISE says
`Votre communauté semble vouloir organiser quelque chose autour de cette expérience.`

### MORISE does
Suggest events, summarize discussions, moderate eligible content and help organize activities.

It must not impersonate community members or silently speak for them.

---

## MODULE 12 — EVENTS

### Purpose
Create and run community/game/world events.

### Pipeline
`IDEA -> DESIGN -> VALIDATION -> SCHEDULE -> EVENT -> PARTICIPATION -> RESULT -> REWARD -> ANALYSIS`

### MORISE does
- propose events;
- schedule validated events;
- monitor execution;
- generate permitted content;
- preserve event history.

---

## MODULE 13 — ADAPTIVE WORLD

### Purpose
Allow validated patterns to alter eligible experiences without letting raw analytics rewrite the world.

### Pipeline
`OBSERVATION -> PATTERN -> HYPOTHESIS -> EXPERIMENT -> VALIDATION -> WORLD CHANGE`

### Rule
A single user action cannot rewrite global world behavior.

---

## MODULE 14 — COLLECTION / REWARD ECONOMY

### Purpose
Provide titles, badges, original cards/illustrations, items and collections.

### Originality rule
Generated reward art must not intentionally reproduce protected anime/manga assets. Provenance and generation metadata must be retained.

### Pipeline
`VALIDATED_EVENT -> REWARD_SPEC -> GENERATION -> VALIDATION -> COLLECTION`

No reward must depend on sharing unless explicitly designed and non-essential.

---

## MODULE 15 — META SYSTEM / AI LAB

### Purpose
Coordinate advanced MORISE AI behavior, World Memory, Living Objects, Convergence, Emergent Missions and controlled evolution.

### Core loop
`OBSERVE -> DIAGNOSE -> HYPOTHESIZE -> GENERATE CANDIDATE -> SANDBOX -> TEST -> BENCHMARK -> SECURITY -> CANARY -> APPROVE -> MONITOR -> ROLLBACK IF REGRESSION`

### MORISE says
The internal evolution mechanism should generally remain invisible. User-facing messages should describe useful outcomes, not expose internal chain-of-thought.

### MORISE does
- identify capability gaps;
- propose skills/strategies;
- generate candidate code;
- run sandbox tests;
- compare against baseline;
- register validated candidates;
- monitor deployed candidates;
- rollback regressions.

# PART II — MORISE AI ENGINE

## 6. Capability registry

```ts
export type CapabilityId =
  | "TEXT_GENERATION"
  | "REASONING"
  | "VISION"
  | "IMAGE_GENERATION"
  | "VIDEO_GENERATION"
  | "MUSIC_GENERATION"
  | "TTS"
  | "STT"
  | "TRANSLATION"
  | "EMBEDDING"
  | "SEARCH"
  | "MODERATION"
  | "GAME_2D"
  | "GAME_3D"
  | "CODE_GENERATION"
  | "CODE_TESTING";
```

Providers implement capabilities. Modules request capabilities, never providers.

## 7. Provider contract

```ts
export interface AIProvider {
  id: string;
  capabilities: CapabilityId[];
  health(): Promise<HealthStatus>;
  execute(request: AIRequest): Promise<AIResult>;
}
```

Provider adapters include Gemini, DeepSeek, Pollinations and other approved providers. A local adapter may later implement the same contract.

## 8. AI request contract

```ts
export interface AIRequest {
  requestId: string;
  userId?: string;
  capability: CapabilityId;
  input: unknown;
  context?: AIContext;
  privacy: PrivacyLevel;
  originality: OriginalityPolicy;
  priority?: "low" | "normal" | "high";
  maxLatencyMs?: number;
}
```

## 9. AI result contract

```ts
export interface AIResult {
  requestId: string;
  providerId: string;
  modelId?: string;
  output: unknown;
  latencyMs: number;
  usage?: UsageMetrics;
  provenance: Provenance;
  validation: ValidationResult;
}
```

## 10. Universal execution pipeline

`REQUEST -> AUTH -> POLICY -> CONTEXT -> CAPABILITY -> ROUTER -> EXECUTION -> VALIDATION -> NORMALIZATION -> EVENT -> MEMORY -> OBSERVATION`

## 11. Memory layers

- Session Memory: short-lived active context.
- Player Memory: permitted user-specific information.
- Experience Memory: validated outcomes of actions and generations.
- World Memory: validated global/collective state.
- Skill Memory: approved procedures and strategies.
- System Memory: architecture/configuration, never treated as user content.

Never send the entire memory to a model. Retrieve by relevance, deduplicate, compress and cap context.

## 12. Experience record

```ts
export interface Experience {
  id: string;
  type: string;
  capability: CapabilityId;
  inputHash: string;
  outputHash?: string;
  providerId?: string;
  qualityScore?: number;
  userFeedback?: Feedback;
  provenance: Provenance;
  validated: boolean;
  createdAt: string;
}
```

Example: an image produced by Gemini can be stored, analyzed, scored and preserved as an experience. The image itself does not become a magical replacement for the model; it becomes evidence and reusable context.

## 13. Learning candidate

```ts
export interface LearningCandidate {
  id: string;
  sourceExperienceIds: string[];
  hypothesis: string;
  proposedChange: unknown;
  benchmarkBefore: Benchmark;
  benchmarkAfter?: Benchmark;
  safetyStatus: "pending" | "passed" | "failed";
  status: "candidate" | "approved" | "rejected";
}
```

User activity can contribute to candidates through permitted, aggregated signals. It cannot directly mutate production logic.

## 14. Evolution engine

Required stages:

1. observe;
2. detect gap;
3. formulate hypothesis;
4. generate candidate;
5. sandbox;
6. unit/integration/behavior tests;
7. benchmark against baseline;
8. security/provenance checks;
9. candidate registration;
10. canary deployment;
11. monitor;
12. rollback on regression.

## 15. Generated-code security

Generated code must be isolated from production secrets and production database writes. The sandbox must have explicit filesystem, network, CPU, memory and time limits. Generated code cannot modify its own permissions.

## 16. Data trust pipeline

Every external learning input should carry:

```ts
export interface DataTrust {
  provenance: string;
  privacy: PrivacyLevel;
  license?: string;
  originality?: number;
  quality?: number;
  safety?: number;
  trust?: number;
}
```

Learning eligibility must check provenance, permission, license where applicable, safety, quality and scope.

## 17. Media generation pipeline

### Image
`INTENT -> CREATIVE_BRIEF -> ORIGINALITY_POLICY -> ROUTER -> GENERATION -> VALIDATION -> STORAGE -> ANALYSIS -> EXPERIENCE`

### Video
`INTENT -> SCRIPT -> STORYBOARD -> SCENE_PLAN -> ROUTER -> GENERATION -> VALIDATION -> STORAGE -> ANALYSIS`

### Music
`INTENT -> MUSIC_BRIEF -> ROUTER -> GENERATION -> RIGHTS/PROVENANCE -> VALIDATION -> STORAGE -> ANALYSIS`

### Voice
`TEXT -> TTS ROUTER -> AUDIO -> VALIDATION -> STORAGE`

### Speech recognition
`AUDIO -> STT ROUTER -> TEXT -> VALIDATION -> CONTEXT`

### Translation
`TEXT -> LOCAL/ON-DEVICE FIRST WHEN AVAILABLE -> ROUTER FALLBACK -> CACHE -> RESULT`

## 18. Provider secrets

The following exact secret names supplied by the user must be treated as configuration identifiers only; secret values must never be committed:

- `POLLINATIONS_API_KEY`
- `LLM7_API_KEY`
- `Higgins face_API_KEY`
- `SiliconFlow_API_KEY`
- `Gemin_API_KEY`
- `Pixelverse_API_KEY`
- `Groc_API_KEY`
- `BazaarLink AI_API_KEY`
- `xkiro_API_KEY`
- `SambaNova Cloud_API_KEY`
- `Openrouter_API_KEY`

Names containing spaces must be validated against the actual Supabase secret configuration before runtime integration. Do not silently rename them.

## 19. Anonymous/direct URLs supplied during design

These URLs are candidate discovery/fallback resources mentioned by the user. They are not assumed to be permanently free, keyless, stable or production-safe without endpoint/auth/quota/license verification.

- Pollinations: `https://pollinations.ai/`
- Puter: `https://puter.com/` and `https://docs.puter.com/`
- OpenRouter: `https://openrouter.ai/` and `https://openrouter.ai/models?o=free`
- Cloudflare Workers AI: `https://developers.cloudflare.com/workers-ai/`
- Leonardo: `https://leonardo.ai/`
- Ideogram: `https://ideogram.ai/`
- Lexica: `https://lexica.art/`
- AI Horde: `https://aihorde.net/`
- Openverse: `https://openverse.org/`
- Internet Archive: `https://archive.org/`
- Hugging Face: `https://huggingface.co/`
- FreeToUse API specification supplied by the user: `https://api.freetouse.com/v3/openapi.json`
- DeepSeek: `https://api.deepseek.com`

The router must use a verified adapter and policy for each endpoint rather than embedding direct URLs throughout the product.

## 20. PostHog role

PostHog is observability/analytics infrastructure, not the intelligence model and not the long-term memory itself.

Use it to observe permitted product signals such as:

- feature usage;
- latency;
- failure rates;
- funnel behavior;
- game completion;
- generation success;
- optional feedback.

PostHog data may produce learning candidates after aggregation and validation. It must not directly rewrite MORISE.

## 21. Performance and anti-overload architecture

The application must use:

- route-level lazy loading;
- dynamic imports for heavy capabilities;
- asset lazy loading;
- pagination/virtualization for long lists;
- bounded memory retrieval;
- bounded AI context;
- provider request queues;
- concurrency limits;
- retries with exponential backoff;
- circuit breakers;
- caching where safe;
- background processing for non-interactive work;
- cancellation of obsolete requests.

A 150,000-character specification must never imply that 150,000 characters are loaded into the browser or sent to the AI at runtime.

## 22. AI behavior rule

MORISE should not expose chain-of-thought. It should expose concise decisions, actions, reasons at an appropriate level, status and results.

Good:
`Je prépare ton expérience.`
`J'ai trouvé deux solutions compatibles.`
`La première génération n'a pas passé la validation. J'en teste une autre.`

Bad:
`Voici mon raisonnement interne détaillé...`

## 23. Failure strategy

If a provider fails:

`provider timeout -> retry policy -> alternate provider -> local capability if available -> graceful degraded result`

If all providers fail:

`explain limitation -> preserve request -> allow retry -> never blank screen`

## 24. Definition of done for every module

A module is not complete until:

- UI works on desktop and mobile;
- all buttons have a defined behavior;
- loading/empty/error/offline states exist;
- permissions are enforced;
- provider failures are handled;
- tests pass;
- typecheck passes;
- lint passes;
- build passes;
- no blank-screen navigation path remains;
- acceptance criteria are recorded;
- module contract is complete;
- no undocumented cross-module dependency was introduced.

## 25. Implementation order

1. Freeze this architecture as the new baseline.
2. Produce the detailed implementation plan from this document.
3. Reconcile actual repository state with Module 1–6 reality before changing existing work.
4. Complete/verify Module 6 before starting Module 7 because the current repository status explicitly marks Module 6 final QA.
5. Implement Modules 7–15 one at a time.
6. After Module 15, implement the advanced MORISE AI engine as a separate controlled subsystem.
7. Perform whole-system regression and visual verification.

## 26. Historical documents

Existing documents such as `MORISE_MASTER_PLAN_V3.md`, `MORISE_IMPLEMENTATION_SPEC_V1.md`, `MORISE_IMPLEMENTATION_CONTRACTS.md` and `MORISE_TECHNICAL_MASTER_ARCHITECTURE.md` remain historical/reference material. They must not silently override this V4 baseline for new work.
