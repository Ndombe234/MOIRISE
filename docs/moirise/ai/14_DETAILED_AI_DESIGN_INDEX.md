# MORISE AI — DETAILED TECHNICAL DESIGN INDEX

## Purpose
This document is the detailed integration map for the AI architecture. It does not duplicate the specialist contracts. The specialist files are the canonical detailed contracts; this document explains how an implementation agent composes them into one executable system.

## Complete AI request lifecycle
1. Receive a typed request.
2. Authenticate the actor and establish authorization context.
3. Classify the requested operation and data sensitivity.
4. Build minimum necessary context.
5. Resolve intent and ambiguity.
6. Determine whether the request is informational, conversational, transactional, creative, computational or administrative.
7. Select the canonical capability ID.
8. Select the canonical action(s), including confirmation requirements.
9. Build an execution plan with explicit inputs, outputs, dependencies and acceptance conditions.
10. Estimate resources and choose local execution, trusted worker, community worker or provider according to policy.
11. Reserve resources where required.
12. Execute only allow-listed actions inside the appropriate trust boundary.
13. Stream progress through a typed status channel when useful.
14. Validate syntax, schema, policy, safety and task-specific correctness.
15. Retry only idempotent/transient failures.
16. If validation fails, create a bounded correction plan rather than an unbounded self-loop.
17. Produce the final result and provenance.
18. Store only permitted experience/telemetry.
19. Emit the appropriate domain event.
20. Release resources and finalize the trace.

## User-behavior engine
The AI must treat user experience as a state machine, not a sequence of canned messages. Inputs include current surface, explicit interests, recent authorized interactions, unfinished tasks and available real events. The engine can choose between no intervention, contextual suggestion, guided action, discovery, challenge, continuation or notification.

### First two minutes
The first-session policy uses a soft two-minute engagement window. It is not a mandatory timer script. The AI should establish a first useful action, observe the user's response, reveal one or two relevant possibilities, and create a genuine continuation only if one exists. Examples: continue a started creation, unlock a real next step, invite a relevant community interaction, surface a suitable game, or offer a creation challenge. It must never invent a countdown, fake reward, false social activity or false scarcity.

### Return tomorrow
A future-return item must have a concrete backing entity: event, challenge, creation stage, reward availability, social response, scheduled activity or other persisted state. The notification can explain what will be available and why it matters. It must be dismissible and governed by the central notification policy.

## Multimodal creation
A creative request becomes a structured job graph. Example for a 3D game: idea → intent → design specification → GameSpecification → gameplay systems → scene/map tasks → character/asset tasks → audio tasks → code generation → build → runtime simulation → automated tests → correction → package → preview → publish/share. Each node declares capability, resource class, dependencies, timeout, retry semantics and acceptance tests.

## Distributed compute
The scheduler considers trust level, capability, resource availability, health, queue age, locality, privacy classification and estimated completion cost. A community worker can never receive data whose policy classification disallows community execution. Worker disappearance converts leased work back into a retryable task when safe. No worker is a required singleton.

## Evolution
AI-generated code or algorithms are candidates, never automatic production truth. The pipeline is observe → identify gap → formulate hypothesis → generate candidate → static checks → sandbox → tests → benchmark → policy review → canary → monitor → promote or reject → rollback if regression. Promotion requires measurable acceptance criteria.

## Data and privacy
Every model/provider/worker boundary applies classify → authorize → minimize → redact → provenance → destination policy. Private conversations and sensitive player data are not generic learning material. Context is scoped to session/player/module/entity/conversation/task/memory.

## Failure model
Every capability defines: success, validation failure, provider unavailable, worker unavailable, timeout, rate limit, quota exceeded, malformed output, policy rejection, partial result and cancellation. The UI must receive a stable error class rather than a provider-specific exception.

## Testing model
AI tests include deterministic contract tests, authorization tests, routing tests, provider adapter tests, worker sandbox tests, failure injection, schema validation, prompt-injection resistance, provenance checks, privacy tests, game build tests, browser tests and regression benchmarks. A test must state the input, expected decision, permitted execution target, expected output/state and failure behavior.

## Completion rule
The AI is complete only when the master architecture and every numbered specialist contract agree, every capability/action has one owner, every execution target has a policy, every mutable operation is auditable, every generated artifact has provenance, every evolution path is reversible, and every product module can consume the AI through stable contracts without implementing a second AI brain.
