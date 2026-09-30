# MOIRISE AI — CONCEPTION TECHNIQUE FUSIONNÉE

## 0. Purpose

This is the implementation-grade design for the native MORISE AI runtime. It merges the historical Core Orchestrator, Context/Intent/Reasoning architecture, capability/provider routing, Memory/Experience/Learning, distributed resource routing, Game Creator AI, Creative AI, Evolution Engine, MORISE DNA, Convergence, Emergent Missions, World Memory and the controlled self-development loop.

The implementation target is not a single model. It is an orchestrated system.

## 1. Physical/logical architecture

~~~text
MODULE / SYSTEM ACTION
        ↓
AI REQUEST GATE
        ↓
AUTH + TENANT + QUOTA
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
LOCAL | TRUSTED WORKER | COMMUNITY WORKER | PROVIDER
        ↓
VALIDATION ENGINE
        ↓
COMMIT / EVENT / ARTIFACT
        ↓
MEMORY / EXPERIENCE
        ↓
EVALUATION
        ↓
AI LAB / EVOLUTION CANDIDATE
~~~

## 2. AIRequest

Canonical request:

~~~ts
type AIRequest = {
  requestId: string;
  actorId: string;              // server-derived
  tenantId: string;
  sourceModule: ModuleId;
  intentText?: string;
  inputRefs: Ref[];
  constraints: Constraint[];
  sensitivity: DataClass;
  requestedAutonomy: AutonomyLevel;
  budget: ResourceBudget;
  deadline?: Timestamp;
  locale?: string;
  parentTaskId?: string;
  createdAt: Timestamp;
};
~~~

The browser may supply the intent and refs but never the authoritative actor identity or permission.

## 3. Request gate

Order:
1. authenticate;
2. resolve tenant;
3. check request rate;
4. resolve actor;
5. validate request schema;
6. assign requestId/traceId;
7. check policy;
8. create durable request if long-running;
9. create ContextSnapshot.

No request becomes RUNNING before a persistence point exists.

## 4. Data classification

Classes:
PUBLIC
PLAYER_PRIVATE
SENSITIVE
AI_CONTEXT
AI_MEMORY
SECRET
AUDIT_ONLY.

Data flow:
CLASSIFY → AUTHORIZE → MINIMIZE → REDACT → PROVENANCE → DESTINATION POLICY → EXECUTE → VALIDATE.

SECRET cannot enter external model input.

## 5. Context Engine

### 5.1 Input scopes
session; player; current module; entity; task; conversation; memory; active game; active creation.

### 5.2 Retrieval
1. identify intent scope;
2. retrieve minimal facts;
3. apply visibility;
4. apply blocks/mutes/moderation;
5. select relevant memory;
6. omit disallowed categories;
7. attach source refs;
8. hash snapshot;
9. set expiry.

### 5.3 Contract

~~~ts
type ContextSnapshot = {
  snapshotId: string;
  requestId: string;
  entries: ContextEntry[];
  omittedCategories: string[];
  sourceRefs: Ref[];
  privacyClass: DataClass;
  contextHash: string;
  expiresAt: Timestamp;
};
~~~

The snapshot is immutable. A changed context creates a new snapshot.

## 6. Intent engine

~~~ts
type Intent = {
  goal: string;
  entities: Ref[];
  constraints: Constraint[];
  expectedOutput: OutputType;
  sideEffects: SideEffectClass[];
  requiredCapabilities: CapabilityId[];
  ambiguityScore: number;
  assumptions: string[];
  clarificationRequired: boolean;
};
~~~

If ambiguity can create an irreversible side effect, clarification is required or the system must choose a reversible path only if policy permits.

## 7. Requirement compiler

Example:

Input:
“Create a short 3D hunting game I can share.”

Compiled requirements:
- browser-runnable;
- 3D;
- hunt core loop;
- short session;
- shareable result;
- original visual direction;
- test launch/movement/core loop/completion;
- sandbox;
- M08 target runtime.

No provider is inserted into the requirement.

## 8. Reasoning

Reasoning is model/algorithm agnostic. It can combine deterministic rules, local algorithms and provider-assisted reasoning.

Outputs:
candidate interpretation; assumptions; plan proposal; confidence; unresolved questions.

Reasoning cannot issue a privileged mutation.

## 9. Planner / DAG

Every long workflow becomes a DAG.

Example game:
T1 requirements
→ T2 specification
→ T3 test plan
T2 → T4 gameplay code
T2 → T5 UI
T2 → T6 assets
T2 → T7 audio
T3-T7 → T8 build
T8 → T9 static validation
T9 → T10 simulation
T10 → T11 behavior tests
T11 → T12 package
T12 → T13 preview
T13 → T14 publish gate.

Parallel nodes execute only when input refs are complete.

## 10. Task contract

~~~ts
type AITask = {
  taskId: string;
  graphId: string;
  nodeKey: string;
  capabilityId: string;
  capabilityVersion: string;
  dependencyIds: string[];
  inputRefs: Ref[];
  outputRefs: Ref[];
  resourceRequirements: ResourceRequirements;
  trustRequirement: TrustClass;
  dataDestinationPolicy: DestinationPolicy;
  timeoutMs: number;
  retryPolicy: RetryPolicy;
  idempotencyKey: string;
  validatorId: string;
  attempt: number;
  state: TaskState;
  lease?: Lease;
};
~~~

States:
CREATED → QUEUED → LEASED → RUNNING → VALIDATING → COMPLETED.
Failure paths:
RUNNING → FAILED_RETRYABLE → QUEUED.
RUNNING → FAILED_TERMINAL.
Queued/running tasks may enter CANCELLATION_REQUESTED → CANCELLED.

## 11. Idempotency

Operation keys use semantic identity.

Examples:
game generation = projectId + nodeKey + inputHash + capabilityVersion.
play result = sessionId + attemptId.
message = conversationId + clientMessageId.

Duplicate requests return the prior authoritative result.

## 12. Capability registry

~~~ts
type CapabilityDefinition = {
  id: CapabilityId;
  version: string;
  inputSchema: Schema;
  outputSchema: Schema;
  policyClass: PolicyClass;
  allowedTargets: ExecutionTarget[];
  validatorId: string;
  resourceClass: ResourceClass;
  timeoutMs: number;
  maxConcurrency: number;
  maxPayload: number;
  health: HealthState;
};
~~~

Capability versions are explicit.

## 13. Tool registry

~~~ts
type ToolDefinition = {
  actionId: string;
  ownerModule: ModuleId;
  inputSchema: Schema;
  permission: Permission;
  confirmationMode: ConfirmationMode;
  sideEffectClass: SideEffectClass;
  rateLimitPolicy: RateLimit;
  validatorId?: string;
  auditLevel: AuditLevel;
};
~~~

There is no wildcard tool.

## 14. Policy engine

Decision inputs:
actor; module; action; data class; autonomy; destination; resource budget; target; confirmation.

Decision:
ALLOW, ALLOW_WITH_CONFIRMATION, DENY, DEGRADE.

Order:
identity → action existence → owner policy → safety → privacy → destination → quota → autonomy → confirmation → execution.

## 15. Prompt compiler

Inputs:
system policy;
capability instructions;
tool schema;
approved context;
user intent;
output schema.

User/external text is untrusted data. It cannot overwrite policy or tool schema.

Secrets are never interpolated.

## 16. Structured output

Model result:
parse → schema validation → semantic validation → policy validation.

Invalid schema may be repaired a bounded number of times. Invalid or unsafe outputs are rejected.

## 17. Provider adapter contract

~~~ts
interface ProviderAdapter {
  execute(input: CanonicalProviderRequest): Promise<CanonicalProviderResponse>;
  health(): Promise<ProviderHealth>;
  cancel(executionId: string): Promise<CancellationResult>;
}
~~~

Adapter responsibilities:
request transformation;
secret retrieval;
timeout;
rate limiting;
response normalization;
provider error normalization;
provenance;
policy enforcement.

## 18. Provider routing

Hard filters:
capability support;
privacy;
trust;
resource;
quota;
network;
deadline.

Soft score:
health;
latency;
capacity;
cost;
fairness.

No soft score overrides a hard rejection.

## 19. Local/on-device

Prefer local/on-device when:
- deterministic;
- low resource;
- sensitive;
- available;
- no quality regression.

Examples:
translation cache;
format conversion;
title derivation;
hashing;
small transforms;
validation;
simple ranking;
offline summaries where a local model exists.

## 20. Trusted Worker

Registration requires:
owner;
trust class;
capability manifest;
software/runtime version;
quota;
proof.

Task delivery includes:
taskId;
leaseId;
capability;
input refs;
hash/version;
expiry;
sandbox profile.

No production secret is delivered.

## 21. Community Worker

Default:
CPU <=1 logical core;
RAM <=512 MiB;
GPU=false;
persistent storage=false;
network bounded.

Opt-in is explicit.

Community Workers never receive:
service-role keys;
production DB credentials;
admin credentials;
raw private messages;
unrestricted user filesystem.

## 22. Worker lease

Grant lease before dispatch.

Heartbeat extends only under policy.
On expiry:
mark lease expired;
decrement worker health;
requeue only if idempotency permits;
require reconciliation for irreversible external effects.

Revoked worker cannot renew.

## 23. Sandbox

Sandbox controls:
CPU;
RAM;
filesystem;
network;
runtime;
time;
process;
syscalls where available.

Generated code is untrusted.

## 24. Validation engine

Validators:
schema;
policy;
security;
static;
type;
runtime;
behavior;
content;
artifact;
result integrity.

Results:
VALID, INVALID, DEGRADED, INCONCLUSIVE.

INCONCLUSIVE is not automatically VALID.

## 25. Result integrity

Critical output contains:
taskId;
inputHash;
outputHash;
validatorId/version;
execution target;
provenance;
timestamp.

Late result from cancelled/expired work is rejected unless reconciliation policy exists.

## 26. Self-correction

Algorithm:
failure → classify → check correction policy → inspect evidence → produce minimal correction → execute → validate → compare → accept/reject.

Limits:
maxDepth;
maxDuration;
maxAttempts;
maxArtifacts;
maxMutationScope;
maxCost.

Oscillation detector compares failure signatures.

## 27. Memory service

Memory entry:
~~~ts
type MemoryEntry = {
  memoryId: string;
  scope: MemoryScope;
  ownerId: string;
  source: SourceRef;
  contentRef: Ref;
  dataClass: DataClass;
  sensitivity: Sensitivity;
  consentBasis?: string;
  confidence: number;
  utility: number;
  provenance: Provenance;
  createdAt: Timestamp;
  expiresAt?: Timestamp;
  deletePolicy: DeletePolicy;
};
~~~

Write policies:
explicit remember;
validated project state;
permitted personal adaptation;
validated experience;
approved system experience.

Never store secrets or unrestricted private conversations as general learning.

## 28. Learning candidate pipeline

OBSERVATION → NORMALIZATION → PATTERN → HYPOTHESIS → CANDIDATE → OFFLINE EVALUATION → POLICY → CANARY.

Signals may include:
accepted/rejected recommendation;
creation success;
game result;
translation correction;
community proposal acceptance;
Convergence result;
Fun & Surprise reaction.

Raw click counts are not enough to prove an AI improvement.

## 29. Evolution candidate

~~~ts
type ImprovementCandidate = {
  candidateId: string;
  targetComponent: string;
  baselineVersion: string;
  hypothesis: string;
  changeSetRef: Ref;
  evaluationPlan: EvaluationPlan;
  riskClass: RiskClass;
  sandboxProfile: SandboxProfile;
};
~~~

Candidate lifecycle:
OBSERVED → HYPOTHESIS → BUILT → TESTED → BENCHMARKED → POLICY → CANARY → PROMOTED/REJECTED → ROLLED_BACK.

## 30. Code evolution

Generated code:
1. write into isolated candidate workspace;
2. static scan;
3. dependency allowlist;
4. typecheck;
5. build;
6. unit tests;
7. integration tests;
8. behavior tests;
9. security tests;
10. resource benchmark;
11. regression against baseline;
12. canary;
13. promotion;
14. monitor;
15. rollback.

No candidate code executes directly on production infrastructure.

## 31. AI Lab

AI Lab is an isolated execution/analysis domain.

Allowed:
MORISE repository subset;
test fixtures;
approved datasets;
sandbox resources;
candidate artifacts;
benchmarks.

Forbidden:
production secrets;
unbounded admin access;
external unrelated systems;
financial accounts;
unrestricted user machines.

## 32. MORISE DNA engine

Evidence schema:
action/result + timestamp + source + confidence + validation.

Score rules must be versioned.

Example:
validated exploration + completed discovery → Exploration evidence.
Repeated low-quality spam does not produce equivalent evidence.

DNA signal → capability profile → contextual possibility.

Player can inspect relevant explanation.

## 33. Living Object engine

State:
SEED → ACTIVE → VERSIONED → BRANCHED → MERGED/FORKED → CONVERTED/ARCHIVED.

Lineage graph is immutable enough for audit.

Each contribution:
contributorId;
source version;
operation;
diff/ref;
timestamp;
policy proof.

AI can propose transform/contributor/merge, but a mutation requires module authorization.

## 34. Convergence engine

Inputs:
public/authorized trajectories;
Living Object graph;
game mechanics;
creation patterns;
event outcomes;
community signals.

Pipeline:
candidate generation → privacy filter → sensitive-attribute exclusion → diversity → confidence → abuse check → proposal.

A single actor cannot manufacture convergence through repetitive activity.

## 35. Convergence Space

Temporary bounded collaboration:
members/refs;
goal;
source trajectories;
permissions;
expiry;
outputs;
decision.

On completion it can produce:
new Living Object branch;
game prototype;
challenge;
event;
community proposal;
World Memory candidate.

## 36. Emergent Mission engine

Mission candidate:
problem evidence;
affected scope;
required capability;
success criteria;
risk;
solo path;
collective path;
validator.

A mission only exists after policy validation and should be attached to M05/M12 state.

## 37. World Memory engine

Candidate:
sourceRefs;
claim;
validation evidence;
confidence;
attribution;
scope;
retention;
correction path.

Promotion requires independent/strong evidence according to policy.

Retrieval:
query → semantic/rule retrieval → permission filter → recency/quality → provenance → bounded context.

## 38. Game Creator AI

Game intent:
genre;
platform;
2D/3D;
core loop;
controls;
difficulty;
session duration;
share behavior;
assets;
audio;
save;
performance;
accessibility;
security.

Output GameSpecification, not arbitrary production code.

## 39. GameFactory tasks

RESEARCH → DESIGN → SPEC → ENGINE → CONTENT → ASSETS → CODE → BUILD → SIMULATE → TEST → PLAYTEST → BALANCE → PACKAGE → PREVIEW → PUBLISH.

## 40. Creative Studio AI

Artifact request:
type; quality; size; format; originality; safety; source refs; privacy; destination.

Output:
artifactRef + provenance + validation.

## 41. Translation

Source remains canonical.
Translation cache key:
sourceHash + targetLocale + policyVersion.

NoTranslate markers for handles, IDs, code, URLs and protected terms.

Fallback:
browser/local → cache → local/server → provider.

## 42. Social intelligence

Allowed:
public content;
relationships;
explicit preferences;
non-sensitive interaction signals.

Private messages remain isolated unless current operation explicitly authorizes access.

## 43. Community formation intelligence

Pipeline:
authorized affinity signals → candidate cluster → remove sensitive dimensions → verify existing groups → confidence/diversity → community proposal → consent/policy → creation → onboarding → adoption measurement.

The AI must not infer sensitive attributes such as health/religion/sexual orientation to form communities.

## 44. Recommendation engine

Candidate retrieval → moderation → block/mute → visibility → privacy → ranking → diversity → novelty → explanation.

Avoid closed filters.

## 45. Notification cooperation

AI proposes relevance; event owner proves the future state; notification owner chooses delivery/dedupe/quiet periods.

No AI-generated fake event.

## 46. Observability

Trace fields:
requestId;
traceId;
actorId;
moduleId;
capabilityId;
actionId;
taskId;
graphId;
target;
provider/worker;
latency;
resourceClass;
policyDecision;
validation;
attempt.

No hidden chain-of-thought storage.

## 47. Cost and backpressure

Every long-running task has priority, resource class, budget, deadline and attempt limit.

Saturation:
defer low priority;
reduce concurrency;
choose compatible lower-cost path;
queue;
return degraded.

No unexpected user billing.

## 48. Cancellation

ACTIVE → CANCELLATION_REQUESTED → CANCELLED.

Late results cannot revive cancelled tasks.

## 49. Security tests
Prompt injection;
tool abuse;
actor spoofing;
privilege escalation;
provider output poisoning;
sandbox escape;
worker filesystem access;
cross-tenant memory;
reward replay;
late task result.

## 50. Golden tests
Same normalized intent → equivalent plan shape.
Same policy inputs → same decision.
Same idempotency key → one mutation.
Same deterministic title input/version → same title identity.
Same provider malformed response → same normalized error class.

## 51. Completion checklist

Capability contracts;
tool permissions;
context scopes;
memory policies;
provider adapters;
resource routing;
workers;
sandbox;
validators;
self-correction limits;
evolution gates;
rollback;
observability;
tests;
module integration.

If a critical operation still requires an implementation agent to invent ownership, permission or state, the design is incomplete.
