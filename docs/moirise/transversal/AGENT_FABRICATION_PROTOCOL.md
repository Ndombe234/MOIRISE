# MOIRISE — AGENT FABRICATION PROTOCOL

## 0. Purpose

This is a cross-module fabrication protocol for ChatGPT, Codex and other authorized implementation agents.

It does not create a new product module and does not own business state. It defines how an agent must read the canonical MOIRISE documentation, decompose a task, implement it, test it like a normal user, correct failures and produce evidence for DONE.

Business ownership remains in:
- MASTER_PLAN.md
- modules/Mxx-*/PLAN.md
- modules/Mxx-*/TECHNICAL_DESIGN.md
- ai/AI_MASTER_PLAN.md
- ai/AI_TECHNICAL_DESIGN.md
- transversal contracts

## 1. Canonical reading order

Before coding a feature, the agent reads only the documents required by dependency and scope, in this order:

1. MASTER_PLAN.md
2. target module PLAN.md
3. target module TECHNICAL_DESIGN.md
4. transversal/CONTRACTS.md
5. transversal/DEPENDENCIES.md
6. relevant transversal contract(s)
7. relevant AI documents when AI is involved
8. dependent/consumer module contracts when the feature crosses owners
9. existing implementation and tests
10. current CI/browser evidence

The agent must not invent a missing schema, event, route, owner, provider, capability or table when the canonical documents already define one.

## 2. Fabrication context packet

Every implementation task should be reduced to a compact machine-usable context packet:

~~~text
TASK_ID
FEATURE_ID
FEATURE_VERSION
ACTOR
TRIGGER
OWNER_MODULE
NON_OWNER_MODULES
PRECONDITIONS
INPUT_SCHEMA
OUTPUT_SCHEMA
CONTEXT_SCOPE
PRIVACY_CLASS
PROVENANCE
DEPENDENCIES
CAPABILITIES
COMMANDS
QUERIES
STATE_MACHINE
AUTHORITATIVE_STATE
DERIVED_PROJECTIONS
MUTATIONS
EVENTS_CONSUMED
EVENTS_EMITTED
IDEMPOTENCY_RULE
CONCURRENCY_RULE
AUTHORIZATION
RLS/POLICY
SECURITY_CONSTRAINTS
FAILURE_MODES
RETRY_POLICY
RECOVERY_POLICY
ROLLBACK_POLICY
DEGRADED_BEHAVIOR
UI_SURFACES
ROUTES
LOADING_EMPTY_ERROR_UNAVAILABLE_DEGRADED
MOBILE_BEHAVIOR
DESKTOP_BEHAVIOR
ACCESSIBILITY
AI_ALLOWED
AI_FORBIDDEN
AI_FALLBACK
AGENT_BOUNDARY
FILES_TO_CREATE
FILES_TO_MODIFY
IMPLEMENTATION_ORDER
TEST_UNIT
TEST_INTEGRATION
TEST_SECURITY
TEST_BROWSER
TEST_MOBILE
TEST_RESILIENCE
USER_SIMULATION
DONE_EVIDENCE
TIME_ESTIMATE
~~~

This packet is a fabrication aid, not a second source of truth. It must point back to the owner documents.

## 3. Detail ladder

The command « détail » means: increase engineering precision to the next useful level.

~~~text
D0      canonical baseline
D10     behavior and decision precision
D100    architecture, contracts and state precision
D1K     implementation/file/test precision
D10K    adversarial, browser, mobile, resilience and production proof
~~~

The multiplication is about decision coverage, not word count.

A deeper level must remove ambiguity, expose hidden dependencies, define more observable invariants, define more testable failure paths, define clearer agent boundaries, preserve canonical ownership and recalculate time.

A deeper level must not copy the same explanation repeatedly, create a second owner, create a second AI brain, create a new navigation module, invent an undocumented provider or turn an AI proposal into authoritative business state.

## 4. Feature decomposition rule

A feature is sufficiently decomposed only when the agent can answer:

1. Who acts?
2. What triggers the action?
3. What must already be true?
4. What exact input enters?
5. Which module owns the decision?
6. Which module owns the mutation?
7. Which state changes?
8. Which data is authoritative?
9. Which events are emitted?
10. Which projections change?
11. What can fail?
12. How does recovery work?
13. What happens with retry, replay or concurrency?
14. What does the user see?
15. What does mobile do?
16. What does desktop do?
17. What can AI propose?
18. What is AI forbidden to mutate?
19. What evidence proves DONE?

If any answer changes business ownership or persistence authority, the module contract must be updated rather than guessed.

## 5. Cross-module feature rule

For every cross-module feature, build this graph before implementation:

~~~text
actor
→ intent
→ owner modules
→ capabilities
→ context scopes
→ dependency graph
→ task graph
→ validators
→ owner commits
→ events
→ projections
→ UI
→ tests
~~~

Example:

~~~text
game request
→ M15 intent/requirements
→ M08 GameSpecification
→ M08 TaskGraph
→ M08 GameBuild
→ M09 RuntimeManifest/runtime
→ M06 PlaySession/result validation
→ M05 progression
→ M14 reward
→ M10 social hook
→ M03 share projection
~~~

The agent must never replace this with a direct cross-owner write.

## 6. AI fabrication boundary

MORISE AI is the single orchestration brain.

Canonical execution:

~~~text
REQUEST
→ ACTOR
→ CONTEXT
→ INTENT
→ REQUIREMENTS
→ PLAN
→ POLICY
→ RESERVE
→ EXECUTE
→ VALIDATE
→ OWNER COMMIT
→ EVENT
→ MEMORY
→ EVALUATE
~~~

Provider and agent outputs are untrusted candidates until validated.

Codex or another agent may generate candidate code, assets, tests and repairs, but may not publish unvalidated artifacts, bypass sandbox/allowlist, write another module's private state, grant rewards, change Player identity directly, bypass safety/privacy, or declare its own output authoritative.

## 7. Game fabrication rule

For M08/M09/M06, every game follows:

~~~text
REQUEST
→ INTENT
→ GAME REQUIREMENTS
→ GAME SPECIFICATION
→ TASK GRAPH
→ TEMPLATE/COMPONENT RESOLUTION
→ GENERATION
→ BUILD
→ STATIC CHECKS
→ SECURITY CHECKS
→ SIMULATION
→ BEHAVIOR TESTS
→ RESOURCE/PERFORMANCE CHECKS
→ PREVIEW
→ M09 RUNTIME VALIDATION
→ M06 PLAY INTEGRATION
→ PUBLISH
~~~

For 2D and 3D, record engine/version, device target, controls, scene or canvas structure, asset budget, resource budget, save format, runtime capabilities, network policy, accessibility, fallback and test budget.

3D is not selected merely because it is available.

## 8. User simulation protocol

Browser verification must include a normal-user journey, not only technical checks.

Minimum flow:

~~~text
OPEN
→ LOAD
→ AUTH/SESSION
→ NAVIGATION
→ PRIMARY ACTION
→ SECONDARY ACTION
→ BACK
→ REFRESH
→ REOPEN
→ SUCCESS PATH
→ ERROR PATH
→ RECOVERY
→ SHARE/HANDOFF when relevant
~~~

Inspect visual shell, relevant buttons, deep links, loading/empty/error/unavailable/degraded states, navigation persistence and no blank-screen route.

When interactive, reproduce repeated click/tap, refresh during operation, slow network, network loss, expired session, permission denial, stale version, duplicate command, deleted/revoked target and dependency/provider outage.

## 9. Mobile and desktop protocol

A feature is not DONE after desktop verification alone.

Mobile: touch targets, keyboard behavior, viewport overflow, memory-heavy surfaces, gesture conflicts, media upload/resume, low-bandwidth behavior and orientation where relevant.

Desktop: keyboard navigation, pointer interaction, wide layouts, multiple panels/windows where relevant and refresh/deep-link behavior.

## 10. Adversarial verification

Actively try to break the implementation.

Where relevant, cover:
- authorization failure
- IDOR
- role escalation
- replay
- duplicate command
- race condition
- stale version
- forged result
- malformed provider output
- prompt/tool injection
- private-data leakage
- resource overrun
- sandbox escape attempt
- worker loss
- provider timeout
- partial commit
- network loss after commit

A green happy-path test does not prove completion when these risks exist.

## 11. Evidence package

Before declaring DONE, record:

~~~text
REQUIREMENT
→ IMPLEMENTATION LOCATION
→ TEST
→ BROWSER SCENARIO
→ EXPECTED RESULT
→ ACTUAL RESULT
→ STATUS
~~~

Use explicit statuses:
- VERIFIED
- PARTIAL
- BLOCKED
- INCONCLUSIVE

No previous run, code reading or agent assertion is accepted as fresh evidence.

## 12. Time estimation model

Every meaningful detail expansion recalculates effort from current remaining work:

~~~text
implementation
+ integration
+ tests
+ browser verification
+ mobile verification
+ security/resilience
+ corrections
+ production evidence
= updated estimate
~~~

Consider affected modules, dependency depth, schema work, capability/provider work, test matrix size, browser burden, 2D/3D runtime complexity, media complexity, security/privacy risk, automation leverage, repository health and owner supervision time.

Detailing does not multiply implementation time mechanically by 10 or 100.

## 13. Current project estimate

For the architecture currently documented in the repository and execution primarily by ChatGPT/Codex/agents:

- aggressive: approximately 4–5 months
- central working estimate: approximately 5–6 months
- integration-safe: approximately 6–8 months

These bands assume the agent performs construction, automated tests, browser verification and iterative correction, while the owner provides supervision and product decisions.

Revise the estimate after a material scope expansion, new module dependency, new media/game capability or major architectural change.

## 14. DONE gate

A feature is DONE only when:

~~~text
CANONICAL PLAN
→ TECHNICAL DESIGN
→ IMPLEMENTATION
→ DATA/AUTH/SECURITY
→ TESTS
→ DESKTOP BROWSER
→ MOBILE BROWSER
→ RESILIENCE
→ OBSERVABILITY
→ PRODUCTION EVIDENCE
→ DONE
~~~

A rendered page is never enough.

## 15. Maintenance rule

When « détail » is requested again:
1. read the current canonical owner;
2. inspect existing implementation and tests;
3. identify newly exposed ambiguity;
4. deepen only the missing decision layer;
5. update the owner document(s);
6. update tests/contracts when behavior changes;
7. recalculate project time;
8. record new evidence.

Never create duplicate business rules to make a feature appear more detailed.


## 16. Machine-fabrication layer — D1K operational contract

D1K turns a canonical feature into a dependency-ordered assembly graph without changing business ownership.

### 16.1 Fabrication record

Each TASK_ID is represented conceptually by this record:

~~~text
TASK_ID
FEATURE_ID
FEATURE_VERSION
OWNER_MODULE
NON_OWNER_MODULES
ACTOR
TRIGGER
PRECONDITIONS
INPUT_SCHEMA
OUTPUT_SCHEMA
COMMAND_OR_QUERY
AUTHORITY
MUTATIONS
PERSISTENCE
EVENTS_EMITTED
EVENTS_CONSUMED
IDEMPOTENCY
CONCURRENCY
FILES_CREATE
FILES_MODIFY
SYMBOLS
IMPLEMENTATION_ORDER
DEPENDENCY_TASKS
UNIT_TEST
INTEGRATION_TEST
SECURITY_TEST
BROWSER_TEST
MOBILE_TEST
RESILIENCE_TEST
EXPECTED_RESULT
FAILURE_RESULT
RECOVERY_ACTION
DONE_EVIDENCE
STATUS
~~~

The record is derived from canonical PLAN/TECHNICAL_DESIGN/contracts. It is not an independent business specification.

### 16.2 File contract

A file contract must answer:
- exact repository path;
- why the file exists;
- owner module;
- allowed imported authorities;
- forbidden business ownership;
- exported symbols;
- side effects;
- persistence/event access;
- failure contract;
- tests covering the file;
- browser surface, when applicable.

Generated code must not introduce an undocumented route, table, event, provider, capability or business authority.

### 16.3 Function contract

A function-level contract must identify:
- exact symbol name;
- input type;
- output type;
- preconditions;
- authoritative state touched;
- side effects;
- idempotency/concurrency behavior;
- thrown/returned error contract;
- observability fields;
- direct callers;
- direct tests.

For planned symbols that do not exist yet, mark them PLANNED, never IMPLEMENTED.

### 16.4 Assembly graph

The agent executes:

~~~text
TASK DISCOVERY
→ PRECONDITION CHECK
→ DEPENDENCY TASKS
→ FILE/SYMBOL IMPLEMENTATION
→ FOCUSED TEST
→ INTEGRATION TEST
→ BROWSER TEST
→ FAILURE/RECOVERY TEST
→ EVIDENCE
→ LOCK TASK
→ NEXT TASK
~~~

A failed task stays open. The agent may not mark dependent tasks VERIFIED while their required predecessor is FAILED, BLOCKED or INCONCLUSIVE.

### 16.5 Status semantics

- PLANNED = specified, no implementation evidence.
- IMPLEMENTED = required symbols/files exist and focused checks pass.
- PARTIAL = some required evidence is missing.
- BLOCKED = an external prerequisite prevents execution or implementation.
- INCONCLUSIVE = evidence exists but does not prove the required outcome.
- VERIFIED = every applicable D1K evidence item is fresh and successful.

### 16.6 Fabrication stop rule

A fabrication agent must stop at the first unresolved contract ambiguity that could change:
authority, persistence, security, public interface, user-visible behavior, cross-module ownership, or data semantics.

It may continue through low-risk implementation details when the canonical contract already fixes the behavior.

## 17. Dependency Impact Layer

Before changing a shared contract or module feature, the agent builds a reverse impact graph.

Edge types:
- IMPORTS — source file imports symbol/module;
- CALLS — function/service invokes another symbol;
- READS — component/query reads an authoritative projection;
- WRITES — owner mutates authoritative state;
- EMITS — owner emits an event;
- CONSUMES — module reacts to an event;
- ROUTES_TO — route enters a capability/owner;
- CAPABILITY_USES — module requests an AI capability;
- PROJECTS_TO — authoritative state feeds a projection;
- TESTS — test asserts behavior;
- BROWSER_TESTS — browser scenario validates a user-facing path.

Impact traversal:

~~~text
CHANGED NODE
→ DIRECT CONTRACT DEPENDENTS
→ CROSS-MODULE DEPENDENTS
→ EVENT CONSUMERS
→ DATA PROJECTIONS
→ ROUTES/UI
→ AI CAPABILITIES
→ TESTS
→ SECURITY/RESILIENCE SCENARIOS
~~~

The impact report must distinguish:
DIRECT, TRANSITIVE, POTENTIAL, UNRESOLVED.

UNRESOLVED means the agent must not silently assume compatibility; it must inspect code/contracts or report the gap.

## 18. Evidence package v1

For each completed TASK_ID, evidence should be recorded as:

~~~text
TASK_ID
COMMIT
IMPLEMENTATION_REFS
TEST_REFS
BROWSER_REFS
EXPECTED
ACTUAL
STATUS
VERIFIED_AT
~~~

A repository assertion such as "the function exists" is implementation evidence, not behavioral verification.


## 19. D10K adversarial fabrication protocol

At D10K, the agent must maintain two graphs:

### Fabrication graph
task → dependencies → file → symbol → implementation → test

### Evidence graph
task → commit → command/scenario → expected → actual → environment → status

The evidence graph is separate from implementation state because passing tests does not prove browser, mobile, security or production behavior.

### D10K rule

For every user-facing or security-sensitive task, execute:

IMPLEMENT
→ FOCUSED TEST
→ INTEGRATION
→ SECURITY
→ DESKTOP USER
→ MOBILE USER
→ FAILURE
→ RECOVERY
→ BUILD/CI
→ IMPACT REVIEW
→ LOCK

A missing applicable stage leaves the task unverified.

### Correction loop

FAIL
→ PRESERVE EVIDENCE
→ CLASSIFY
→ ROOT CAUSE
→ MINIMAL PATCH
→ RE-RUN FAILED STAGE
→ RE-RUN DIRECT DEPENDENTS
→ RECHECK IMPACT

Never convert a failed stage directly to PASS because a later stage succeeded.

### Machine guard

The agent must reject a task definition when:
- owner is missing;
- dependency is unresolved;
- authority is ambiguous;
- persistence authority is ambiguous;
- expected result is missing;
- required evidence class is missing.


## 20. D100K — formal verification contract

At D100K, the agent works from properties, not only from procedures.

For every critical task, define:

~~~text
PRE
→ COMMAND
→ GUARDS
→ TRANSITION
→ POST
→ INVARIANTS
→ FORBIDDEN STATES
→ SECURITY PROPERTIES
→ FAILURE PROPERTIES
→ RECOVERY PROPERTIES
→ COMPATIBILITY RULES
→ EVIDENCE OBLIGATIONS
~~~

### Property classes

**Safety properties**
- forbidden mutation never occurs;
- forbidden owner access is rejected;
- secrets never cross the public boundary;
- invalid capability never executes.

**Liveness/recovery properties**
- retryable failure has an explicit recovery path;
- a committed command remains recoverable after response loss;
- degraded state does not silently become authoritative success.

**Consistency properties**
- authoritative state and event order are compatible;
- projections never replace authority;
- duplicate delivery does not double-apply business mutation.

**Evidence properties**
- VERIFIED requires all applicable evidence classes;
- stale evidence cannot certify a newer commit;
- missing browser evidence keeps a user-facing feature non-verified.

### Agent decision contract

If a D100K property cannot be checked from available code/contracts/evidence, the agent must classify it as:
UNPROVEN
rather than assuming PASS.

### Change contract

A shared contract change is incomplete until:
- impacted owners are identified;
- affected tests are identified;
- affected browser scenarios are identified;
- compatibility is decided;
- evidence requirements are updated.



## Controlled AI Context Package — mandatory pre-fabrication layer

Every substantial Codex/ChatGPT task must assemble a controlled context package before code generation. The package is derived from canonical documents and the real repository state; it is not a third source of truth.

Required package fields:
- project identity and current canonical architecture;
- target module/feature and ownership;
- complete PLAN + TECHNICAL_DESIGN pair for every affected module;
- AI pair whenever M15, capabilities, providers, workers, memory, evolution or creative AI is involved;
- exact branch/commit and repository-state snapshot;
- EXISTS / MISSING / TO_MODIFY / FORBIDDEN / AFFECTED_DEPENDENCY inventory;
- direct, transitive, event, route/projection and security dependency impact;
- exact writable surfaces and one-writer ownership;
- acceptance criteria and expected invariants;
- required unit/contract/integration/browser/mobile/security/resilience checks;
- evidence required before LOCKED.

The package is an anti-ambiguity contract: anything that the canonical documents or repository can establish must not be guessed. When sources conflict, fabrication pauses on the affected path and the coordinator resolves the authority.

Quality reporting MUST distinguish first-pass success, correction count, integration defects, regressions, test failures, browser failures and unresolved assumptions. An 80% first-pass target or 10–20% error envelope is an optional KPI, never a guarantee and never a waiver of verification.

A worker report, generated code, isolated green test, or successful build is not by itself proof. Only fresh evidence from the integrated commit can satisfy the DONE gate.
