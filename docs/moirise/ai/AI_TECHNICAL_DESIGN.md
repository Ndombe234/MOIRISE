# MOIRISE AI — CONCEPTION TECHNIQUE

## 0. Finalité

M19 est implémenté comme une plateforme d'orchestration, pas comme une fonction de génération de texte. Sa responsabilité est de transformer une intention autorisée en travail vérifiable, en choisissant la capacité et la cible d'exécution, en validant les sorties et en conservant uniquement les expériences autorisées.

La documentation doit permettre à un agent d'implémentation de suivre le système comme un puzzle : chaque pièce possède une forme, un propriétaire, des entrées, des sorties, des dépendances et des règles d'échec.

## 1. Architecture

~~~text
UI / Module
  ↓
AI Request Gateway
  ↓
Auth + Tenant + Quota
  ↓
Context Engine
  ↓
Intent / Requirements
  ↓
Planner
  ↓
Policy Engine
  ↓
Capability Resolver
  ↓
Resource Router
  ↓
Task Graph / Scheduler
  ↓
Local | Trusted Worker | Community Worker | Provider
  ↓
Validator
  ↓
Commit / Artifact / Event
  ↓
Memory + Experience
  ↓
SYSTEM response
~~~

## 2. AIRequest contract

~~~text
AIRequest {
  requestId: string
  actorId: string
  tenantId: string
  sourceModule: ModuleId
  userIntent: string
  inputRefs: Ref[]
  constraints: Constraint[]
  sensitivity: DataClass
  autonomy: A0 | A1 | A2 | A3 | A4
  budget: Budget
  deadline?: Timestamp
  locale?: string
  conversationRef?: Ref
  parentTaskId?: string
  createdAt: Timestamp
}
~~~

actorId est toujours dérivé de la session serveur.

## 3. Request gateway

Le Gateway exécute dans l'ordre :
1. authentification ;
2. résolution tenant ;
3. rate limit ;
4. quota check ;
5. schema check ;
6. request ID/trace ID ;
7. policy pre-check ;
8. création de la requête persistable si tâche longue ;
9. transmission au Context Engine.

Un échec avant création de tâche ne doit pas laisser un faux état RUNNING.

## 4. Data classes

PUBLIC : contenu publié.
PLAYER_PRIVATE : préférences et données privées du Player.
SENSITIVE : safety, admin, security cases.
SECRET : credentials et secrets.
AI_CONTEXT : représentation temporaire autorisée.
AI_MEMORY : représentation persistante autorisée.
AUDIT_ONLY : données réservées aux opérations de contrôle.

Un changement de destination nécessite une nouvelle policy check.

## 5. Context Engine

### Input
AIRequest + scopes demandés.

### Processing
1. récupérer le module actif ;
2. récupérer l'entité courante ;
3. récupérer seulement les préférences utiles ;
4. récupérer memories autorisées ;
5. appliquer visibility/block/mute ;
6. exclure secrets ;
7. condenser les entrées ;
8. produire provenance ;
9. calculer contextHash ;
10. fixer expiry.

### Output

~~~text
ContextSnapshot {
  snapshotId
  requestId
  scope[]
  entries[]
  omittedCategories[]
  sourceRefs[]
  privacyClass
  contextHash
  expiresAt
}
~~~

Le snapshot est immuable après émission. Une nouvelle donnée nécessite un nouveau snapshot ou une révision explicitement versionnée.

## 6. Context minimization

Pour une requête de création d'avatar, un profil public et des préférences de style peuvent être suffisants. Une conversation privée entière ne doit pas être ajoutée.

Pour une requête de résumé d'une conversation, seul le contenu de cette conversation autorisée est inclus et uniquement pour la durée de la tâche.

Pour une tâche administrative, le contexte peut inclure des diagnostics mais jamais des secrets bruts.

## 7. Intent Engine

Output :

~~~text
Intent {
  goal
  entities[]
  constraints[]
  expectedOutput
  sideEffects
  requiredCapabilities[]
  ambiguityScore
  assumptions[]
  clarificationRequired
}
~~~

### Clarification policy

Si plusieurs interprétations ont des conséquences irréversibles :
- ne pas choisir arbitrairement ;
- demander clarification ;
- ou choisir un résultat réversible si explicitement permis.

## 8. Requirements compiler

Exemple :

Utilisateur :
« Crée-moi un jeu 3D de chasse rapide, amusant et partageable. »

Requirements :
- output = runnable browser game;
- dimension = 3D;
- core loop = hunt;
- pacing = short sessions;
- shareable = result/share state;
- target = M08 runtime;
- visual = original anime-inspired style;
- tests = launch + movement + core loop + completion;
- security = sandbox;
- provider = indéterminé.

L'absence de provider dans le requirement est intentionnelle.

## 9. Planner

Le planner transforme le requirement en DAG.

Exemple :

~~~text
T1 requirements validation
  ├─ T2 GameSpecification
  └─ T3 TestPlan
T2
  ├─ T4 gameplay code
  ├─ T5 HUD/UI
  ├─ T6 visual assets
  └─ T7 audio
T4,T5,T6,T7,T3
  → T8 build
  → T9 static validation
  → T10 simulation
  → T11 behavior tests
  → T12 package
  → T13 preview
  → T14 publication gate
~~~

Chaque node est indépendant si ses inputs sont disponibles.

## 10. Task contract

~~~text
Task {
  taskId
  graphId
  nodeKey
  capabilityId
  capabilityVersion
  dependencies[]
  inputRefs[]
  outputRefs[]
  resourceRequirements
  trustRequirement
  dataDestinationPolicy
  timeout
  retryPolicy
  idempotencyKey
  validatorId
  state
  attempt
  lease
  createdAt
  updatedAt
}
~~~

## 11. Task state machine

~~~text
CREATED
→ QUEUED
→ LEASED
→ RUNNING
→ VALIDATING
→ COMPLETED

RUNNING → FAILED_RETRYABLE → QUEUED
RUNNING → FAILED_TERMINAL
QUEUED → CANCELLED
RUNNING → CANCELLATION_REQUESTED → CANCELLED
~~~

Une tâche COMPLETED ne repasse jamais vers RUNNING. Une tâche CANCELLED ignore un late result sauf si ce résultat peut être rattaché à une autre opération valide sans effet secondaire.

## 12. Idempotency

La clé d'idempotence doit être stable pour la même intention d'opération.

Exemple :
playerId + actionId + clientCommandId.

Pour une tâche de génération :
projectId + taskNode + inputHash + capabilityVersion.

Deux exécutions ayant la même clé doivent produire au maximum un effet métier.

## 13. Capability registry

Schema :

~~~text
CapabilityDefinition {
  id
  version
  inputSchema
  outputSchema
  policyClass
  allowedTargets[]
  validatorId
  defaultTimeout
  resourceClass
  maxPayload
  maxConcurrency
  costClass
  health
}
~~~

Versions incompatibles ne sont jamais remplacées silencieusement.

## 14. Core capability groups

Text :
TEXT_GENERATION, REASONING, SUMMARIZATION, CLASSIFICATION.

Media :
IMAGE_GENERATION, VIDEO_GENERATION, AUDIO_GENERATION, MUSIC_GENERATION, TTS, STT, VISION.

Knowledge :
SEARCH, EMBEDDING, RETRIEVAL.

Creation :
CODE_GENERATION, CODE_TESTING, GAME_2D, GAME_3D.

Safety :
MODERATION.

Translation :
TRANSLATION.

Recommendation :
RECOMMENDATION.

## 15. Tool registry

~~~text
ToolDefinition {
  actionId
  ownerModule
  inputSchema
  permission
  confirmationMode
  sideEffectClass
  rateLimitPolicy
  validatorId
  auditLevel
}
~~~

Classes d'effet :
READ
REVERSIBLE_WRITE
IRREVERSIBLE_WRITE
EXTERNAL_SIDE_EFFECT
ADMIN_OPERATION.

La policy d'une action IRREVERSIBLE_WRITE est plus stricte qu'une lecture.

## 16. Policy engine

Inputs :
- actor;
- permission snapshot;
- source module;
- action;
- data class;
- autonomy;
- target;
- resource budget;
- confirmation state.

Outputs :
ALLOW;
ALLOW_WITH_CONFIRMATION;
DENY;
DEGRADE.

Ordre :
identity → action existence → owner policy → safety → privacy → destination → quota → autonomy → confirmation → execute.

## 17. Prompt compiler

Sources autorisées :
- system policy;
- capability instructions;
- structured tool schema;
- approved context;
- user intent;
- output schema.

Données utilisateur/externe sont balisées comme data, jamais comme instructions privilégiées.

Secrets, auth headers et production credentials sont exclus.

## 18. Structured output

Un modèle ne retourne jamais directement un effet système. Il retourne une représentation conforme au schema.

Pipeline :
~~~text
model output
→ parse
→ schema validate
→ semantic validate
→ policy validate
→ action planner
~~~

Un JSON invalide peut recevoir au plus un nombre limité de réparations automatiques.

## 19. Provider registry

Chaque adapter déclare :
- providerId;
- capabilities;
- version;
- auth reference;
- health;
- max request size;
- timeout;
- rate limits;
- privacy/destination policy;
- output normalizer.

L'adapter ne reçoit qu'un input déjà autorisé.

## 20. Provider routing

Pipeline :
~~~text
capability
→ eligible provider list
→ health filter
→ data-destination filter
→ quota filter
→ latency/cost ranking
→ reserve
→ execute
~~~

Provider unavailable :
- fallback compatible ;
- local path ;
- worker path ;
- degraded;
- terminal failure.

## 21. Local execution

Local computation est prioritaire lorsque la tâche est déterministe ou moins sensible.

Exemples :
cache de traduction;
small text transforms;
formatting;
schema validation;
hashing;
deterministic title generation;
result aggregation.

## 22. Resource Router

Targets :
LOCAL
TRUSTED_WORKER
COMMUNITY_WORKER
PROVIDER.

Hard constraints :
capability;
trust;
privacy;
resource;
quota;
network;
deadline;
availability.

Soft ranking après filtre :
latency;
health;
capacity;
cost;
fairness.

## 23. Worker Registry

Worker :

~~~text
Worker {
  workerId
  ownerId
  trustClass
  capabilityManifest
  quota
  health
  softwareVersion
  registrationProof
  lastHeartbeat
  status
}
~~~

Trust classes :
TRUSTED;
COMMUNITY.

Trust class is policy, not a score.

## 24. Trusted Worker

Trusted Worker appartient à l'opérateur ou est explicitement autorisé.

Il peut avoir :
CPU quota custom;
RAM quota custom;
GPU enabled according to policy;
network policy explicit.

Même Trusted, il reste sandboxé.

## 25. Community Worker

Default:
1 logical CPU max;
512 MiB RAM max;
GPU disabled;
persistent storage disabled;
network bounded.

Opt-in explicite.

Aucune tâche ne reçoit :
production database credentials;
provider master secrets;
service-role key;
raw private messages;
administrator tokens;
unrestricted filesystem access.

## 26. Worker task signing

Task payload should be signed or authenticated and include:
taskId;
leaseId;
capability;
input refs;
hash/version;
expiry;
sandbox profile.

Le worker ne doit pas pouvoir modifier le policy context.

## 27. Lease protocol

Grant:
leaseId + expiresAt.

Heartbeat :
worker proves task is alive.

Expiry :
task becomes recoverable if idempotent;
worker health decreases;
new lease cannot be given to revoked worker.

## 28. Sandbox

Sandbox profile :
CPU;
memory;
filesystem;
network;
process;
runtime;
time;
syscalls where available.

Generated code never runs with production privileges.

## 29. Validation engine

Validator types :
SCHEMA
POLICY
SECURITY
STATIC
TYPE
RUNTIME
BEHAVIOR
CONTENT
ARTIFACT
RESULT.

Output :
VALID
INVALID
DEGRADED
INCONCLUSIVE.

INCONCLUSIVE requires explicit policy to proceed.

## 30. Result integrity

For critical results:
- source task;
- input hash;
- output hash;
- validator version;
- execution target;
- timestamp;
- provenance.

A late result from an expired task is rejected unless an explicit reconciliation policy exists.

## 31. Self-correction

Algorithm:
~~~text
failure
→ error classifier
→ check correction allowed
→ inspect failed evidence
→ formulate minimal correction
→ new task or patch
→ validator
→ compare
→ accept/reject
~~~

Limits:
max correction depth;
max total time;
max CPU;
max generated artifacts;
max mutation scope;
max retry count.

Oscillation detector compares failure signatures and state deltas.

## 32. Memory architecture

Memory table shape:

~~~text
MemoryEntry {
  memoryId
  ownerScope
  ownerId
  source
  contentRef
  dataClass
  sensitivity
  consentBasis
  confidence
  utility
  provenance
  createdAt
  expiresAt
  deletePolicy
}
~~~

Writes :
- user explicitly asks to remember;
- deterministic useful state under configured policy;
- validated project state;
- measured system experience where permitted.

Never:
- hidden memory from restricted data;
- raw private conversation as global learning;
- secrets.

## 33. Memory retrieval

Ranking :
scope match;
task relevance;
freshness;
confidence;
utility;
privacy compatibility.

The result set is bounded.

## 34. Learning

Learning means measured system improvement.

Inputs:
validated experience;
evaluation result;
resource measurements;
error patterns;
user-approved feedback.

Outputs:
prompt revision;
routing adjustment;
validator rule proposal;
algorithm candidate;
UX policy candidate.

Learning does not directly mutate production authority.

## 35. Evolution Engine

Candidate lifecycle:

~~~text
OBSERVED
→ HYPOTHESIS
→ CANDIDATE_CREATED
→ STATIC_CHECK
→ SANDBOX
→ TEST
→ BENCHMARK
→ POLICY_REVIEW
→ CANARY
→ PROMOTED / REJECTED
→ MONITORED
→ ROLLED_BACK
~~~

## 36. Evaluation

An evaluation contains :
benchmark version;
baseline;
candidate;
dataset/reference;
metrics;
resource impact;
failure list;
safety checks.

Promotion requires thresholds appropriate to the component and absence of critical regression.

## 37. Canary

Canary scope can be :
internal only;
feature flag;
small traffic fraction;
specific test player cohort.

Rollback returns the prior known-good version and emits an observability event.

## 38. Creative pipeline

~~~text
creative intent
→ specification
→ generation tasks
→ resource routing
→ provider/local/worker
→ content validation
→ provenance
→ artifact storage
→ version
→ preview
→ export
~~~

## 39. Image generation

Contract contains :
prompt refs;
negative constraints;
size/aspect;
safety class;
source refs;
output format;
validator;
destination.

Store artifact hash and provider evidence.

## 40. Video generation

Video task additionally contains :
duration;
resolution;
frame budget;
audio relation;
render profile;
preview profile;
storage quota;
cancellation policy.

Long jobs are resumable where provider/runtime permits.

## 41. Music/audio generation

Music/audio contracts include :
duration;
format;
stems if supported;
tempo/style metadata;
provenance;
content policy;
export version.

## 42. Game creation pipeline

GameSpecification fields:
- gameId;
- genre;
- 2D/3D mode;
- camera;
- core loop;
- player actions;
- entities;
- physics;
- win/lose;
- progression hooks;
- UI;
- audio;
- asset manifest;
- save model;
- share model;
- accessibility;
- performance budget;
- tests;
- publication metadata.

The package includes manifest, entrypoint, assets, runtime requirements and integrity hashes.

## 43. Game code validation

Checks:
dependency allowlist;
static analysis;
type/build;
sandbox runtime;
resource ceiling;
input validation;
network restrictions;
storage scope;
behavior tests;
save integrity.

A generated game cannot request privileged MOIRISE APIs by convention; only an explicit runtime bridge is available.

## 44. Game runtime separation

Provider is absent at runtime.

~~~text
Generated Package
→ M08 package validator
→ sandbox runtime
→ player input
→ session state
→ result
→ result validator
~~~

This separation lets a game continue even when the generating provider is offline.

## 45. SYSTEM behavior engine

M19 proposes context.
M03 renders SYSTEM.
M12 owns real future state.
M14 owns delivery.

First-session windows are adaptive:
0-15 orientation;
15-45 first value;
45-90 contextual reveal;
90-120 next action.

These are not hardcoded delays. They are behavior targets used by policy.

## 46. Context suppression

Suppress non-critical AI interventions while:
- typing;
- playing;
- creating;
- editing;
- reading a long item.

An interruption may still occur for security-critical or explicitly requested events.

## 47. Recommendation engine

Pipeline:
candidate retrieval;
moderation;
block/mute;
visibility;
quality;
diversity;
ranking;
explanation;
presentation.

Private data is excluded by default.

## 48. Notification handoff

AI returns:
reason;
source event;
relevance;
suggested copy key;
priority hint.

M14 decides:
deliver/drop;
timing;
channel;
dedupe;
quiet period.

AI cannot bypass M14.

## 49. Privacy enforcement

Destination policy examples:
LOCAL_ONLY
TRUSTED_WORKER_ONLY
PROVIDER_ALLOWED
PUBLIC_ONLY.

A private message summary may be LOCAL_ONLY depending on policy. A public post translation can be PROVIDER_ALLOWED if permitted.

## 50. Multi-tenant isolation

Tenant and actor scopes are attached to:
requests;
tasks;
memories;
artifacts;
cache entries;
provider executions.

No cross-tenant cache reuse for sensitive data.

## 51. Cost and backpressure

Every long task has:
priority;
estimated resource;
quota context;
deadline;
max attempts.

When resources saturate:
- postpone low priority;
- reduce concurrency;
- choose an equivalent cheaper target;
- return QUEUED;
- never silently exceed policy.

## 52. Cancellation

Cancellation state is persisted.

~~~text
ACTIVE → CANCELLATION_REQUESTED → CANCELLED
~~~

Workers/providers receive cancellation where supported. Late results do not revive cancelled tasks.

## 53. Error normalization

Provider errors map to:
TIMEOUT;
RATE_LIMITED;
QUOTA_EXCEEDED;
INVALID_INPUT;
CONTENT_REJECTED;
UNAVAILABLE;
AUTH_FAILURE;
UNKNOWN.

Worker errors map to:
WORKER_UNAVAILABLE;
LEASE_EXPIRED;
SANDBOX_FAILURE;
RESOURCE_LIMIT;
VALIDATION_FAILURE.

AI-level error maps to standard MOIRISE AppError.

## 54. Explainability

Player-facing:
- what was done;
- whether a capability was unavailable;
- what artifact/result was created;
- what can be changed.

Do not expose secrets, private system prompts or hidden chain-of-thought.

Operational explanation can record policy decision, validator outcome and selected execution target.

## 55. Observability schema

~~~text
AITrace {
  requestId
  traceId
  actorId
  sourceModule
  capabilityId
  actionId?
  taskId?
  graphId?
  executionTarget
  providerId?
  workerId?
  latency
  resourceClass
  policyDecision
  validationResult
  attempt
  errorCode?
}
~~~

## 56. Adversarial tests

Prompt injection through user content.
Tool input injection.
Forged actorId.
Privilege escalation request.
Provider output containing malicious instructions.
Generated code attempting network escape.
Worker attempting filesystem access.
Cross-tenant memory request.
Replay of reward action.
Late worker result.
Cancelled job resurrection.

Each test must demonstrate the boundary holds.

## 57. Golden tests

Examples:
same normalized intent → equivalent plan shape.
same deterministic title inputs → same title ID.
same idempotency key → one mutation.
same policy inputs → same decision.
same invalid provider response → same normalized error class.

## 58. Provider contract tests

For every provider adapter:
- healthy call;
- malformed response;
- rate limit;
- timeout;
- auth failure;
- partial response;
- cancellation;
- payload over limit;
- unavailable state.

Adapters must not leak provider-specific error schemas into modules.

## 59. Worker contract tests

Register.
Authorize.
Heartbeat.
Lease.
Run sandbox.
Quota enforcement.
Network restrictions.
Result validation.
Lease expiry.
Revocation.
Reconnect.

## 60. End-to-end image example

~~~text
Player requests avatar
→ M19 request gateway
→ M02 profile context
→ intent IMAGE_GENERATION
→ policy
→ capability resolve
→ resource route
→ generation
→ validation
→ artifact provenance
→ M02 avatar update after required confirmation
→ AVATAR_CREATED
→ SYSTEM result
~~~

## 61. End-to-end game example

~~~text
Player describes game
→ requirements
→ GameSpecification
→ task DAG
→ parallel code/assets/audio
→ M18 resources
→ sandbox build
→ validation
→ preview
→ player acceptance
→ package/version
→ M08 publish
→ runtime
→ result validator
→ M11 progression
~~~

## 62. End-to-end worker example

~~~text
opt-in
→ registration
→ capability manifest
→ quota policy
→ task eligibility
→ signed lease
→ sandbox execution
→ result hash
→ validator
→ acknowledge
~~~

No central system assumes the worker is permanently available.

## 63. Forbidden implementation shortcuts

No direct provider call from UI.
No browser permission checks as security authority.
No generic unrestricted tool.
No AI self-granting permission.
No raw private data learning.
No generated code outside sandbox.
No production secret in worker payload.
No AI direct XP mutation.
No AI direct roulette outcome.
No AI direct notification delivery.
No provider-specific capability ID in product modules.

## 64. Definition of technical completion

M19 is technically complete when all capabilities, actions, policies, task states, resource targets, provider adapters, worker integrations, memories, provenance, validators, correction limits, evaluation gates, rollback procedures, observability and tests are represented by authoritative contracts and are used by modules instead of duplicated.

## 65. Implementation order

A. Schemas/registries.
B. Request gateway.
C. Context + intent.
D. Policy.
E. Planner.
F. Task engine.
G. Provider adapters.
H. Resource router.
I. Worker integration.
J. Validation.
K. Memory/provenance.
L. Creative/game pipelines.
M. Self-correction.
N. Evaluation/evolution.
O. Module integration.
P. Adversarial verification.

## 66. Final puzzle checklist

WHAT capability?
WHY intent?
WHO actor?
WHICH data?
WHICH policy?
WHICH plan?
WHERE execution?
HOW action?
WHAT budget?
WHAT validator?
WHAT persistence?
WHAT event?
WHAT error?
WHAT fallback?
WHAT user sees?
WHAT test proves it?
WHAT rollback exists?

Pour toute opération critique, ces réponses doivent exister avant l'implémentation.
