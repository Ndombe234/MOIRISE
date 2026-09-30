# MOIRISE AI — CONCEPTION TECHNIQUE EXHAUSTIVE — RECONSTRUCTION À ZÉRO

## 0. Règle d'implémentation
Ce fichier est la spécification technique de MORISE AI. Il doit permettre à une IA développeuse de prendre un mécanisme, d'identifier exactement ses contrats et de l'assembler sans deviner. Format obligatoire : ACTEUR → TRIGGER → PRECONDITIONS → INPUTS → ALGORITHM/ORDER → DECISION TABLE → OUTPUT → STATE MUTATION → EVENTS → ERRORS → RECOVERY → SECURITY → OBSERVABILITY → TESTS → DONE.

## 1. Architecture physique/logique
```text
MODULE/SYSTEM ACTION
  ↓
AI REQUEST GATE
  ↓
AUTH + ACTOR + QUOTA
  ↓
DATA CLASSIFICATION
  ↓
CONTEXT ENGINE
  ↓
INTENT + REQUIREMENTS
  ↓
REASONING / PLANNER
  ↓
POLICY ENGINE
  ↓
CAPABILITY + TOOL REGISTRY
  ↓
RESOURCE / PROVIDER ROUTER
  ↓
TASK GRAPH / SCHEDULER
  ↓
LOCAL | TRUSTED WORKER | COMMUNITY WORKER | VERIFIED PROVIDER
  ↓
SANDBOX / EXECUTION
  ↓
VALIDATION
  ↓
MODULE COMMIT / ARTIFACT
  ↓
EVENT
  ↓
MEMORY / EXPERIENCE
  ↓
EVALUATION
  ↓
AI LAB / EVOLUTION CANDIDATE
```

## 2. Repository implementation map
Proposed code boundary:
```text
src/ai/
  gateway/
  context/
  intent/
  reasoning/
  planner/
  policy/
  capabilities/
  tools/
  providers/
  resources/
  workers/
  scheduler/
  sandbox/
  validation/
  memory/
  learning/
  evolution/
  lab/
  games/
  creative/
  translation/
  convergence/
  living-objects/
  missions/
  world-memory/
  observability/
  types/
```
Exact repository path is confirmed against the implementation before coding; this document does not authorize creating a second AI tree if an existing canonical tree already owns the responsibility.

## 3. Canonical types
```ts
type AIRequest = {
  requestId: string; actorId: string; tenantId: string; sourceModule: string;
  intentText?: string; inputRefs: Ref[]; constraints: Constraint[];
  sensitivity: DataClass; requestedAutonomy: AutonomyLevel;
  budget: ResourceBudget; deadline?: string; locale?: string;
  parentTaskId?: string; createdAt: string;
};

type Intent = {
  goal: string; entities: Ref[]; constraints: Constraint[];
  expectedOutput: OutputType; sideEffects: SideEffectClass[];
  requiredCapabilities: string[]; ambiguityScore: number;
  assumptions: string[]; clarificationRequired: boolean;
};

type ContextSnapshot = {
  snapshotId: string; requestId: string; entries: ContextEntry[];
  omittedCategories: string[]; sourceRefs: Ref[]; privacyClass: DataClass;
  contextHash: string; expiresAt: string;
};

type AITask = {
  taskId: string; graphId: string; nodeKey: string; capabilityId: string;
  capabilityVersion: string; dependencyIds: string[]; inputRefs: Ref[];
  outputRefs: Ref[]; resourceRequirements: ResourceRequirements;
  trustRequirement: TrustClass; dataDestinationPolicy: DestinationPolicy;
  timeoutMs: number; retryPolicy: RetryPolicy; idempotencyKey: string;
  validatorId: string; attempt: number; state: TaskState; lease?: Lease;
};
```

## 4. Request Gate — exact order
1. receive request;
2. derive server actor identity;
3. authenticate/session check;
4. resolve tenant/project;
5. rate/quota check;
6. validate schema;
7. classify input;
8. create requestId/traceId;
9. evaluate policy;
10. persist durable request if long-running;
11. create context snapshot;
12. enqueue or execute.
A failed step stops the pipeline with a typed error. No privileged action is executed from an unpersisted long-running request.

## 5. Data classification and context
Classes: PUBLIC, PLAYER_PRIVATE, SENSITIVE, AI_CONTEXT, AI_MEMORY, SECRET, AUDIT_ONLY.
Pipeline: CLASSIFY → AUTHORIZE → MINIMIZE → REDACT → PROVENANCE → DESTINATION POLICY → EXECUTE → VALIDATE.
`SECRET` never enters model/provider input. Private messages are not general memory by default.

Context retrieval order:
1. identify current intent;
2. identify owner/module scope;
3. retrieve minimum required refs;
4. enforce visibility/mutes/blocks;
5. retrieve allowed memories;
6. exclude forbidden classes;
7. attach provenance;
8. hash snapshot;
9. assign expiry.

## 6. Intent and requirement compiler
For every request, produce a machine-readable IntentSpec. If the output changes permissions, money, publication, membership, private data or irreversible state, the ambiguity threshold is strict and confirmation is required unless a pre-authorized policy explicitly allows it.

Example “crée un jeu 3D de chasse partageable” becomes:
`platform=browser`, `dimension=3D`, `loop=hunt`, `session=short`, `shareable=true`, `original_assets=true`, `target=M08`, `runtime=M09`, `validators=[build,launch,movement,loop,completion]`.
No provider is part of the semantic requirement.

## 7. Reasoning contract
Reasoning returns:
`interpretations[]`, `assumptions[]`, `planProposal`, `confidence`, `unresolvedQuestions[]`.
It cannot call privileged tools directly. A separate Policy Engine evaluates any proposed side effect.

## 8. Planner
Long workflows are DAGs. Creation sequence example:
```text
T1 requirements
 → T2 GameSpecification
 → T3 test plan
T2 → T4 gameplay code
T2 → T5 UI
T2 → T6 assets
T2 → T7 audio
T3+T4+T5+T6+T7 → T8 build
T8 → T9 static
T9 → T10 simulation
T10 → T11 behavior
T11 → T12 package
T12 → T13 preview
T13 → T14 publish gate
```
Cycle detection runs before scheduling. Parallel tasks require complete dependency refs.

## 9. State machine
`CREATED → QUEUED → LEASED → RUNNING → VALIDATING → COMPLETED`.
Retryable: `RUNNING → FAILED_RETRYABLE → QUEUED`.
Terminal: `RUNNING → FAILED_TERMINAL`.
Cancellation: `QUEUED/RUNNING → CANCELLATION_REQUESTED → CANCELLED`.
Expired late results are rejected unless reconciliation is explicitly supported.

## 10. Idempotence
Semantic keys prevent duplicate effects:
`generation = projectId + nodeKey + inputHash + capabilityVersion`;
`play = sessionId + attemptId`;
`message = conversationId + clientMessageId`.
The authoritative result is returned for duplicates.

## 11. Capability Registry
```ts
interface CapabilityDefinition {
  id: string; version: string; inputSchema: unknown; outputSchema: unknown;
  policyClass: string; allowedTargets: string[]; validatorId: string;
  resourceClass: string; timeoutMs: number; maxConcurrency: number;
  maxPayload: number; health: string;
}
```
Activation checklist: schema → implementation → policy → resource profile → validator → tests → telemetry → rollback.

## 12. Tool Registry
```ts
interface ToolDefinition {
  actionId: string; ownerModule: string; inputSchema: unknown;
  permission: string; confirmationMode: string; sideEffectClass: string;
  rateLimitPolicy: string; validatorId?: string; auditLevel: string;
}
```
No wildcard tool. Tool input is schema-validated before execution.

## 13. Policy Engine
Decision = ALLOW | ALLOW_WITH_CONFIRMATION | DENY | DEGRADE.
Order:
identity → action exists → owner policy → safety → privacy → destination → quota → autonomy → confirmation → execution.
Policy is a hard ceiling. AI cannot increase its own autonomy.

## 14. Prompt compiler
Build prompt from policy + capability instructions + tool schema + approved context + user intent + output schema. User/external text is data, not policy. Secrets are never interpolated. Tool schemas cannot be overwritten by user content.

## 15. Provider Adapter — exact contract
```ts
interface ProviderAdapter {
  execute(input: CanonicalProviderRequest): Promise<CanonicalProviderResponse>;
  health(): Promise<ProviderHealth>;
  cancel(executionId: string): Promise<CancellationResult>;
}
```
Adapter responsibilities: endpoint transformation, secret retrieval, timeout, rate limit, response normalization, error normalization, provenance and policy enforcement.

## 16. Provider/API/URL registry
The following providers are candidates from the existing MOIRISE plan: Pollinations, Puter, LLM7, Vireonix, Murakumo, Kilo AI, AI Horde, AI Horde OpenAI API, Cehpoint AI, OVH AI Endpoints, Quillly, Openverse, Internet Archive, Gemini, DeepSeek and OpenRouter.

For every provider create a record:
```ts
type ProviderDefinition = {
  providerId: string;
  baseUrl: string;
  endpoints: { capability: string; method: string; path: string }[];
  authMode: 'NONE'|'BEARER'|'API_KEY'|'OAUTH'|'SESSION';
  secretName?: string;
  apiVersion?: string;
  capabilities: string[];
  requestSchemaRef: string;
  responseSchemaRef: string;
  rateLimit?: string;
  licenseRef?: string;
  verifiedAt?: string;
  status: 'UNVERIFIED'|'VERIFIED'|'DISABLED';
};
```
**Important:** an exact endpoint URL must be copied only from the provider's current official documentation or from a user-supplied verified URL. No guessed URL is allowed. The code therefore references `providerId` and resolves the current URL through the registry rather than hardcoding provider URLs across modules.

## 17. Secrets and Supabase
Secret flow:
`AI module → Edge Function/secure server boundary → secret store → provider adapter`.
Never:
`React/browser → provider secret`.
Secret names can include `POLLINATIONS_API_KEY`, `LLM7_API_KEY`, `GEMINI_API_KEY`, `OPENROUTER_API_KEY` etc. only when that provider is actually configured. Names are configuration references, not values.

## 18. Local/on-device execution
Use browser/local execution for deterministic low-risk work where practical: hashing, validation, formatting, cache lookup, small transforms, translation cache, lightweight ranking and offline processing when a suitable local model exists. If local quality is insufficient, route to the next permitted target.

## 19. Trusted Worker
Registration: workerId → owner → trust class → capability manifest → runtime version → resource quota → health proof. Lease contains taskId, leaseId, capability/version, input refs, hash, expiry and sandbox profile. No production secret is delivered.

## 20. Community Worker
Explicit opt-in only. Default limits: 1 logical CPU, 512 MiB RAM, no GPU, no persistent storage, bounded network. It is compute participation, not shared RAM. Revoke/expiry immediately stops new leases; running work is reconciled according to task idempotence.

## 21. Scheduler
Hard filters first. Then score eligible targets by health, latency, capacity, cost and fairness. Deadline violation risk can force degraded mode. Provider outage triggers fallback only if the fallback supports the same capability and policy.

## 22. Sandbox
Generated code/assets are untrusted. Restrict CPU, RAM, time, filesystem, network, process and runtime. Dependency allowlist. No production database credentials. No direct deployment from sandbox.

## 23. Validation Engine
Validation stages selected by artifact:
SCHEMA → POLICY → SECURITY → STATIC/TYPE → RUNTIME → BEHAVIOR → CONTENT → ARTIFACT → INTEGRITY.
Statuses: VALID, INVALID, DEGRADED, INCONCLUSIVE. Critical operations cannot treat INCONCLUSIVE as VALID.

## 24. Self-correction
`FAILURE → CLASSIFY → EVIDENCE → HYPOTHESIS → MINIMAL PATCH → SANDBOX → TEST → COMPARE → ACCEPT/REJECT`.
Stop limits: maxDepth, maxDuration, maxAttempts, maxMutationScope, maxResources. Failure signature repetition detects oscillation and stops automatic correction.

## 25. Memory implementation
Scopes: SESSION, PLAYER, EXPERIENCE, CREATOR, COMMUNITY, WORLD, SYSTEM_OBSERVATION, PROVIDER_EVIDENCE. Fields: owner, sensitivity, consent, provenance, confidence, utility, retention, deletion policy. Retrieval is always permission-filtered before relevance ranking.

## 26. Learning implementation
`OBSERVATION → NORMALIZE → PATTERN → HYPOTHESIS → CANDIDATE → OFFLINE EVALUATION → POLICY → CANARY`.
Raw events do not rewrite production behavior. Sensitive inference is prohibited. Explicit user preference is stronger than inferred preference.

## 27. Evolution Engine
Candidate record contains candidateId, target component, baseline version, hypothesis, changeSetRef, evaluation plan, risk class and sandbox profile. Lifecycle: OBSERVED → HYPOTHESIS → BUILT → TESTED → BENCHMARKED → POLICY → CANARY → PROMOTED/REJECTED → ROLLED_BACK.

## 28. AI code generation pipeline
1. identify missing mechanism;
2. define contract;
3. select extension point;
4. generate candidate code;
5. dependency allowlist;
6. static scan;
7. typecheck;
8. build;
9. unit tests;
10. integration tests;
11. behavior tests;
12. security tests;
13. resource benchmark;
14. regression benchmark;
15. canary;
16. promote/reject;
17. monitor;
18. rollback.
No self-generated code receives production authority merely because it compiles.

## 29. Detecting what is missing
The diagnostic must distinguish:
A. missing knowledge/data;
B. missing tool;
C. missing algorithm;
D. missing model capability;
E. insufficient compute;
F. insufficient context;
G. policy restriction;
H. integration defect.
Each class has a different remediation path. Example: if an image API fails, adding a reasoning algorithm is not the solution.

## 30. Game Creator AI
Input → IntentSpec → GameSpecification → task graph. Required fields: 2D/3D, platform, core loop, controls, camera, difficulty, duration, sharing, assets, audio, save, performance, accessibility, security. M08 owns creation; M09 owns runtime.

## 31. Creative Studio
`type + format + quality + originality + policy + destination` → capability → provider/local target → artifact → provenance → validation. Image/video/music generation cannot publish automatically.

## 32. Translation
Canonical source remains unchanged. Cache key = `sourceHash + targetLocale + policyVersion`. Protect handles, IDs, code, URLs and no-translate terms. Fallback: local cache → local/browser mechanism → permitted provider.

## 33. Social/group intelligence
AI can propose a group from authorized non-sensitive signals, but M11 owns membership. Exact creation path: detect need → build proposal → check privacy → generate name/description/rules → determine visibility → determine owner → request confirmation if required → call M11 create-group capability → validate membership owner → emit event → expose to Player. User-created groups use the same M11 contract.

## 34. MORISE DNA
Only validated evidence creates DNA signals. Evidence = action/result/source/time/confidence. Scores are versioned and are not psychological/sensitive profiling.

## 35. Living Objects
State machine: SEED → ACTIVE → VERSIONED → BRANCHED → MERGED/FORKED → CONVERTED/ARCHIVED. AI proposes transformations; owning module authorizes mutations. Every change carries lineage.

## 36. Convergence
Authorized trajectories → candidate generation → privacy/sensitive exclusion → diversity → confidence → abuse checks → proposal. Repetitive self-generated signals cannot manufacture convergence.

## 37. Missions From Reality
Problem evidence → mission candidate → scope → capability → success criteria → solo path → collective path → validator → M12/M05 state. No fake mission state.

## 38. World Memory
Claim + sources + evidence + confidence + attribution + scope + retention + correction path. Retrieval is permission-filtered and provenance-preserving. It is not a raw public dump of messages.

## 39. UX/System orchestration
Only approximately 5–6 global doors. Internal AI capabilities are surfaced contextually. While the user types, plays, creates or reads, non-critical SYSTEM interruptions are queued or suppressed.

## 40. Observability
Every request/task records requestId, traceId, taskId, capability/version, target, latency, resource class, policy decision, validation status, retries and failure code. Avoid raw private prompts in broad analytics.

## 41. Error model
Typed categories: AUTH_DENIED, POLICY_DENIED, CONTEXT_FORBIDDEN, CAPABILITY_UNAVAILABLE, PROVIDER_UNAVAILABLE, RESOURCE_EXHAUSTED, TIMEOUT, VALIDATION_FAILED, SANDBOX_FAILED, DUPLICATE_REQUEST, CONFLICT, INCONCLUSIVE, INTERNAL_ERROR. Each has retryability and user-facing fallback.

## 42. Test matrix
At minimum: ambiguous request, unauthorized context, secret leakage, prompt injection, provider outage, provider schema drift, worker loss, duplicate request, expired lease, late result, invalid generated code, sandbox escape attempt, correction oscillation, bad benchmark, rollback, private-message isolation, group permission, game build failure, mobile browser and desktop browser.

## 43. DONE per mechanism
A mechanism is DONE only if its trigger, actor, preconditions, exact inputs, algorithm, decision table, outputs, mutations, events, errors, recovery, security, observability, tests and rollback are documented and implemented. “It works once” is not DONE.

## 44. URLs/API policy
Do not hardcode guessed provider URLs. Official provider documentation is the source of truth. When a URL is supplied/verified, store it in the provider registry and reference it by `providerId`. This prevents one provider endpoint change from forcing edits throughout MORISE.

## 45. Final assembly rule
Every AI feature is assembled as:
`CONTRACT → POLICY → CAPABILITY → RESOURCE TARGET → EXECUTOR → VALIDATOR → OBSERVABILITY → RECOVERY → VERSION → TEST → INTEGRATION`.
If one piece is missing, the feature is not considered assembled.
