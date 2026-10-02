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
