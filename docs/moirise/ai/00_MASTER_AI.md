# MORISE AI — MASTER TECHNICAL DESIGN V3

## 1. Authority
This file is the canonical architecture for MORISE AI. The AI is transversal to Modules 1–15. Product modules request typed capabilities; they do not implement their own AI brain.

## 2. Mission
MORISE AI must understand intent, build minimal context, select capabilities, select local/provider/worker execution, execute authorized actions, validate results, record permitted experiences, learn from measured outcomes, create multimodal artifacts, create/test games, propose improvements, schedule resources and roll back regressions.

## 3. Physical reality
Code cannot create RAM/CPU that does not exist. More code does not itself increase model intelligence or physical resources. MORISE scales execution by using additional authorized workers and/or external providers. The 16 GB development PC is only an initial machine.

## 4. Canonical pipeline
`REQUEST → AUTH → POLICY → CONTEXT → INTENT → PLAN → CAPABILITY → RESOURCE ROUTER → LOCAL/PROVIDER/WORKER → ACTION → VALIDATE → RESPONSE → EVENT → MEMORY → OBSERVATION → LEARNING`

Evolution pipeline:
`OBSERVE → GAP → HYPOTHESIS → CANDIDATE → STATIC CHECK → SANDBOX → TEST → BENCHMARK → POLICY → CANARY → PROMOTE/REJECT → MONITOR → ROLLBACK`.

## 5. Core runtime contract
```ts
interface AIRequest {
  requestId:string;
  actorId:string;
  sessionId:string;
  text:string;
  locale:string;
  requestedCapability?:string;
  permissions:string[];
  createdAt:string;
}

interface AIPlan {
  planId:string;
  requestId:string;
  intent:string;
  steps:AIPlanStep[];
  requiredCapabilities:string[];
  resourceClass:'local'|'remote'|'distributed';
  expiresAt:string;
}

interface AIPlanStep {
  id:string;
  capability:string;
  inputRefs:string[];
  outputSchema:string;
  permissions:string[];
  maxCostClass:string;
}

interface AIResult {
  requestId:string;
  success:boolean;
  outputRef?:string;
  outputSchema:string;
  provenance:string[];
  validationStatus:'pending'|'valid'|'invalid'|'degraded';
  errorCode?:string;
}
```

## 6. Orchestrator
The Orchestrator is the only component that turns a user request into a plan. It must not directly call arbitrary provider URLs.

Implementation stages:
1. validate request;
2. resolve actor/session;
3. apply policy;
4. build minimal context;
5. classify intent;
6. generate typed plan;
7. validate required capabilities;
8. ask Resource Router for execution options;
9. execute each step;
10. validate outputs;
11. compose response;
12. emit immutable event;
13. record permitted experience.

A failed step must produce a structured error and a recovery path, not a blank UI.

## 7. Context engine
Context is assembled by explicit scopes:
`session`, `player`, `currentModule`, `currentEntity`, `conversation`, `task`, `memory`.

Default scope is minimal. Private message content, private media and sensitive data are excluded unless the current action explicitly authorizes them.

## 8. Capability Router
Capabilities are stable names such as:
`text.generate`, `text.translate`, `image.generate`, `video.generate`, `audio.generate`, `code.generate`, `game.design`, `game.build`, `game.test`, `game.run`, `memory.store`, `memory.retrieve`, `world.propose`, `evolution.propose`.

A capability has:
- input schema;
- output schema;
- permissions;
- resource class;
- validation contract;
- fallback policy.

Modules depend on capability names, never provider names.

## 9. Provider Router
The Provider Registry is the only source of provider endpoints, credentials and health policy. Providers are adapters. A provider outage must degrade one capability rather than break MORISE.

Provider order is policy-driven, not hard-coded in modules. Anonymous HTTP providers may be used only through a restricted adapter with output validation and no assumption of privacy/security equivalent to trusted providers.

## 10. Resource Router
Resource routing decides among:
`LOCAL → TRUSTED_WORKER → COMMUNITY_WORKER → EXTERNAL_PROVIDER` according to policy, privacy, capability, quotas, latency and availability.

The router never treats community workers as trusted merely because they are online.

## 11. Worker integration
Canonical distributed path:
`AI Orchestrator → Scheduler → Worker Registry → compatible worker → sandbox → result → validator`.

Worker task contains only the minimum authorized payload, temporary scoped permissions, resource quota, timeout, hash, idempotency key and signature.

No worker receives production master secrets.

## 12. Game creation
A game request becomes a `GameSpecification`. The Game Factory creates code/assets/audio/levels as separate tasks, validates provenance, builds in a sandbox and emits a signed `GamePackage`. The Runtime executes the package independently of AI providers.

2D may use Canvas/WebGL/Phaser. 3D may use Three.js/Babylon/PlayCanvas/WebGL/WebGPU.

## 13. Multimodal creation
Image, video, music/audio and other media are capabilities. The AI coordinates them through typed jobs rather than embedding provider-specific code into every feature.

Every generated artifact records:
`artifactId`, `capability`, `providerOrWorker`, `prompt/inputHash`, `sourceRefs`, `license/provenance`, `createdAt`, `contentHash`, `validationStatus`.

## 14. Memory and learning
Separate:
- durable player memory;
- system experience memory;
- provider evidence;
- telemetry;
- validated knowledge.

An external output is evidence, not truth. Learning requires provenance, validation and outcome measurement.

Never automatically learn from private messages or sensitive personal data.

## 15. Self-improvement
MORISE may generate candidate algorithms, prompts, code or routing policies. It may not directly replace production code.

Every candidate requires:
`candidate → static analysis → isolated tests → benchmark against baseline → policy approval → canary → monitoring → promotion/rollback`.

## 16. Data filtering
Before data reaches AI/provider/worker:
1. identify data class;
2. verify actor permission;
3. remove unnecessary fields;
4. redact secrets;
5. hash/reference large artifacts where possible;
6. attach provenance;
7. apply provider/worker policy;
8. log the policy decision.

## 17. Observability
Every AI action receives a trace ID and records:
`requestId`, `capability`, `executionTarget`, `provider/worker`, latency, resource class, validation result, error code and policy decision.

Do not log raw secrets or private content unnecessarily.

## 18. Failure and fallback
Every capability defines:
- primary execution;
- fallback execution;
- degraded behavior;
- retry policy;
- terminal error.

Retries require idempotency. Deterministic invalid requests are not retried indefinitely.

## 19. UI rule
The player sees the SYSTEM as one coherent interface. Keep permanent navigation at approximately 5–6 doors. Internal AI capabilities appear as contextual SYSTEM actions, drawers, panels or labs.

## 20. Non-negotiable invariants
1. No module owns a second AI brain.
2. No module hard-codes provider endpoints.
3. No browser variable is a security boundary.
4. No worker receives master secrets.
5. No generated code goes directly to production.
6. No AI output becomes truth without validation/provenance.
7. No private data is automatically used for learning.
8. No community worker becomes trusted merely by participation.
9. No single worker is a single point of failure.
10. AI/provider outage cannot destroy ordinary social functionality.
11. Adding workers must not require changing AI capability contracts.
12. Every improvement must be measurable and reversible.

## 21. Definition of complete
MORISE AI is considered architecturally complete when every capability has a typed input/output contract, policy, execution router, validation path, provenance record, failure mode, observability event and test plan, and when each Module 1–15 references capabilities without duplicating their internals.