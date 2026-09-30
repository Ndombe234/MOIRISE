# MORISE AI — MASTER TECHNICAL DESIGN V4

## 1. Authority
This is the **canonical architectural authority** for MORISE AI. It defines boundaries, execution flow, invariants and ownership. Detailed TypeScript contracts live exactly once in the numbered specialist files below.

The AI is transversal to Modules 1–15. Product modules request typed capabilities; they do not implement a second AI brain.

### Contract ownership
- `01_CORE_ORCHESTRATOR.md` — request, plan and orchestration contracts.
- `02_CONTEXT_INTENT_REASONING.md` — context, intent and decision contracts.
- `03_CAPABILITY_PROVIDER_ROUTER.md` — capability IDs, provider adapter contracts and provider routing.
- `04_MEMORY_EXPERIENCE_LEARNING.md` — memory, experience and learning contracts.
- `05_CREATIVE_MEDIA_GAME_CREATOR.md` — multimodal and game-creation contracts.
- `06_EVOLUTION_CODE_SANDBOX.md` — evolution candidate, benchmark and promotion contracts.
- `07_DATA_SECURITY_PROVENANCE.md` — data classes, provenance and security policy.
- `08_RESOURCE_SCHEDULER_OBSERVABILITY.md` — resource/task scheduling and observability contracts.
- `09_AI_ACTIONS_AND_CONTRACTS.md` — allow-listed AI actions and tool contracts.
- `10_PROVIDER_REGISTRY.md` — provider configuration and verification; no provider contract is duplicated elsewhere.
- `11_GAME_CREATION_RUNTIME_CONTRACT.md` — GameSpecification/package/runtime boundary.
- `12_DISTRIBUTED_WORKER_CLUSTER.md` — worker trust/security/product policy.
- `13_DISTRIBUTED_SYSTEM_IMPLEMENTATION.md` — worker implementation details only.

If two specialist files appear to define the same contract, the ownership list above resolves the conflict. Do not create a third version.

## 2. Mission
MORISE AI must understand intent, build minimal context, select capabilities, select local/provider/worker execution, execute authorized actions, validate results, record permitted experiences, learn from measured outcomes, create multimodal artifacts, create/test games, propose improvements, schedule resources and roll back regressions.

## 3. Physical reality
Code cannot create RAM/CPU that does not exist. More code does not itself create physical compute or make a model intrinsically intelligent. MORISE scales execution by using additional authorized workers and/or external providers.

The 16 GB development PC is an initial machine, not a permanent architecture limit.

## 4. Canonical execution pipeline

```text
REQUEST
  → AUTH
  → POLICY
  → CONTEXT
  → INTENT
  → PLAN
  → CAPABILITY
  → RESOURCE ROUTER
  → LOCAL / TRUSTED WORKER / COMMUNITY WORKER / PROVIDER
  → ACTION
  → VALIDATE
  → RESPONSE
  → EVENT
  → MEMORY
  → OBSERVATION
  → LEARNING
```

Not every request uses every stage. The orchestrator selects only the stages required by the task.

## 5. Controlled evolution pipeline

```text
OBSERVE
  → GAP
  → HYPOTHESIS
  → CANDIDATE
  → STATIC CHECK
  → SANDBOX
  → TEST
  → BENCHMARK
  → POLICY
  → CANARY
  → PROMOTE / REJECT
  → MONITOR
  → ROLLBACK
```

Production code is never replaced merely because the AI generated a better-looking candidate.

## 6. Core ownership

### Orchestrator
Only the Orchestrator converts an authorized user request into an executable AI plan.

### Context Engine
Builds the minimum authorized context.

### Intent/Reasoning Engine
Determines what the request means and selects deterministic reasoning, local computation, retrieval, an external model or a distributed worker as appropriate.

### Capability Router
Maps a request to a stable capability ID.

### Provider Router
Chooses among configured provider adapters. Providers are tools, not the AI brain.

### Resource Router
Chooses local execution, trusted workers, community workers or providers according to hard policy constraints and current capacity.

### Action Executor
Runs only allow-listed actions.

### Validator
Determines whether the result is valid, degraded, rejected or unavailable.

### Memory/Learning
Stores only permitted experiences with provenance and measured outcomes.

### Evolution Engine
Creates and tests improvement candidates without direct production self-modification.

## 7. Canonical capability identifiers
The authoritative capability identifiers are defined only in `03_CAPABILITY_PROVIDER_ROUTER.md`. Current examples include:

`TEXT_GENERATION`, `REASONING`, `VISION`, `IMAGE_GENERATION`, `VIDEO_GENERATION`, `MUSIC_GENERATION`, `TTS`, `STT`, `TRANSLATION`, `EMBEDDING`, `SEARCH`, `MODERATION`, `GAME_2D`, `GAME_3D`, `CODE_GENERATION`, `CODE_TESTING`.

No module may invent a second identifier for an existing capability.

## 8. Canonical AI action identifiers
The authoritative action identifiers are defined only in `09_AI_ACTIONS_AND_CONTRACTS.md`.

Examples include:

`READ_PROFILE`, `READ_CONTEXT`, `SEARCH`, `TRANSLATE`, `GENERATE_TEXT`, `GENERATE_IMAGE`, `GENERATE_VIDEO`, `GENERATE_MUSIC`, `GENERATE_AUDIO`, `CREATE_GAME`, `RUN_GAME_TEST`, `CREATE_EVENT`, `SEND_PRIVATE_MESSAGE`, `CREATE_POST`, `PROPOSE_IMPROVEMENT`.

There is no generic `EXECUTE_ANYTHING` action.

## 9. Context policy
Context scopes are:

`session`, `player`, `currentModule`, `currentEntity`, `conversation`, `task`, `memory`.

The default is minimum necessary context. Private messages, private media and sensitive data are excluded unless the current action explicitly authorizes them.

## 10. Memory and learning policy

Separate:
- player memory;
- system experience memory;
- provider evidence;
- telemetry;
- validated knowledge.

External provider output is evidence, not truth.

A user can contribute evidence to learning, but one user cannot directly rewrite global rules.

Private/sensitive data is never a generic learning input.

## 11. Multimodal creation
Image, video, music/audio, text, translation, vision, BD/comic and game creation are capabilities coordinated by the same MORISE AI orchestration layer.

Provider-specific implementation stays inside provider adapters.

## 12. Game architecture
Game creation and game execution are separate.

```text
PLAYER IDEA
 → INTENT
 → GAME SPECIFICATION
 → CODE / ASSETS / AUDIO
 → BUILD
 → SIMULATION
 → TEST
 → PREVIEW
 → PACKAGE
 → MOIRISE RUNTIME
```

The finished package must not require the provider that created it.

2D may use Canvas/WebGL/Phaser. 3D may use Three.js/Babylon/PlayCanvas/WebGL/WebGPU according to the runtime adapter.

## 13. Distributed compute

```text
MORISE AI
   ↓
RESOURCE ROUTER
   ↓
SCHEDULER
   ↓
WORKER REGISTRY
   ↓
COMPATIBLE WORKER
   ↓
SANDBOX
   ↓
RESULT
   ↓
VALIDATOR
```

Trusted workers and community workers are different security domains.

Community defaults are strict: at most 1 logical CPU, 512 MB RAM, GPU disabled by default, storage 0 by default, plus a separate network quota. Actual limits are enforced by the worker runtime/sandbox, not by UI variables.

Workers are never a single point of failure.

## 14. Data filtering and provenance
Before data reaches an AI model, provider or worker:

```text
CLASSIFY
 → AUTHORIZE
 → MINIMIZE
 → REDACT SECRETS
 → ATTACH PROVENANCE
 → APPLY DESTINATION POLICY
 → EXECUTE
 → VALIDATE
```

High-risk operations generate auditable events.

External instructions never gain authority over system policy, permissions, secrets, RLS, tools or deployment.

## 15. Observability
Every AI operation has a trace/request identity and records, where permitted:

`requestId`, capability, execution target, provider/worker, latency, resource class, validation result, error code and policy decision.

Never log secrets or raw private content unnecessarily.

PostHog is an observation/experiment layer, not the AI brain.

## 16. Failure/fallback contract
Every capability defines:

- primary execution;
- fallback execution;
- degraded behavior;
- retry policy;
- terminal error.

Retries require idempotency. Deterministically invalid requests are not retried indefinitely.

## 17. Product/UI boundary
The player experiences MORISE AI through one coherent SYSTEM interface. Permanent navigation stays around 5–6 primary doors. AI capabilities appear contextually through panels, drawers, labs, actions and SYSTEM feedback instead of hundreds of permanent buttons.

Private messaging remains a first-class social capability without becoming an unnecessary permanent main-navigation door.

## 18. Security invariants
1. No module owns a second AI brain.
2. No module hard-codes provider endpoints.
3. No browser variable is a security boundary.
4. No worker receives production master secrets.
5. No generated code executes directly in production.
6. No external output becomes truth without provenance and validation.
7. No private data is automatically used for learning.
8. No community worker becomes trusted merely by participation.
9. No single worker is a single point of failure.
10. AI/provider outage cannot destroy ordinary social functionality.
11. Adding workers does not require changing capability contracts.
12. Every production improvement is measurable and reversible.

## 19. Definition of architectural completion
The AI architecture is complete only when:

- every capability has one authoritative ID and typed input/output contract;
- every action has one authoritative definition, permission and confirmation policy;
- every execution target has a routing policy;
- every provider adapter has a registry record and verification status;
- every worker path has authentication, authorization, sandboxing and result validation;
- every memory/learning path has provenance and privacy rules;
- every evolution path has sandbox, benchmark, canary and rollback;
- every important operation has an observability contract;
- every Module 1–15 references these contracts instead of duplicating them;
- duplicate or conflicting architecture documents are removed or explicitly marked obsolete.

## 20. Implementation rule
Build the AI subsystem independently of the public UI first. Then integrate each product module through the stable contracts above.

Do not declare a module complete because its screen exists. A module is complete only after its implementation, tests, runtime behavior, security and mobile behavior have been verified.
