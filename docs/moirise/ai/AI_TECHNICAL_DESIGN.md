# MORISE AI — CONCEPTION TECHNIQUE CANONIQUE

## 1. Request
AIRequest = requestId, actorIdFromSession, sourceModule, intentText, inputRefs, constraints, sensitivity, autonomy, budget, deadline, locale.

## 2. Context
Context Engine builds a bounded immutable snapshot from session, Player, current module/entity, allowed memory and task state. It computes source refs, privacy class and context hash.

## 3. Intent
Intent = goal, entities, constraints, expected output, side effects, required capabilities, ambiguity and assumptions. Ambiguous irreversible requests require clarification or a reversible path.

## 4. Planner
Planner creates a DAG. Each task has taskId, graphId, capabilityId/version, dependencies, inputs, outputs, resourceRequirements, trust, timeout, retryPolicy, idempotencyKey and validator.

## 5. Policy
Identity → action existence → owner module → safety → privacy → destination → resource/quota → autonomy → confirmation.

AI cannot upgrade its own autonomy.

## 6. Capability registry
Each capability defines input/output schema, policy class, allowed targets, validator, timeout, concurrency, resource/cost class and version.

## 7. Tool registry
Every action has ownerModule, input schema, permission, confirmation mode, side-effect class, rate limit and validator. No wildcard execute-anything tool.

## 8. Resource routing
Hard constraints first: capability, trust, privacy destination, CPU/RAM/GPU, network, storage, quota, deadline. Then health/latency/capacity/fairness/cost ranking.

## 9. Providers
Provider adapters normalize request/response/errors and never add permissions. Provider configuration/secrets are server-only. Core workflows have local/degraded fallbacks where feasible.

## 10. Workers
Trusted Worker = explicit operator authorization. Community Worker = explicit opt-in, sandbox, default 1 logical CPU and 512 MiB RAM, GPU/storage disabled by default, bounded network. Lease + heartbeat + revocation + result validation are mandatory. Machines are distributed compute nodes, never a shared RAM pool.

## 11. Memory
Scopes: SESSION, PLAYER, EXPERIENCE, COMMUNITY, CREATOR, WORLD, SYSTEM OBSERVATION. Each entry has owner, data class, source, confidence/utility, provenance, retention and deletion policy.

## 12. Validation
Schema, policy, security, static/type, runtime, behavior, content, artifact and result validators. INCONCLUSIVE is not VALID by default.

## 13. Self-correction
Failure → classify → check correction budget → minimal correction → validator → compare. Bound depth, time, attempts, resource and mutation scope. Detect oscillation.

## 14. Self-development
Limitation detected → capability gap → root cause → hypothesis → design → generate candidate code/algorithm/prompt → isolated sandbox → tests → benchmark vs baseline → security/policy → canary → promotion or rejection → monitoring → rollback.

This is the technical realization of the native self-evolving MORISE AI requirement. More code is not evidence of intelligence; repeatable MORISE-specific benchmark improvement is evidence.

## 15. Creative pipeline
Intent → brief → originality/provenance policy → capability → execution → content/security validation → artifact hash → version → preview/export.

## 16. Game pipeline
Idea → GameSpecification → task graph → controlled code/assets/audio → sandbox build → simulation → behavior tests → preview → version → publish. Runtime is independent of the provider that created the game.

## 17. Living Objects
Seed has immutable origin and lineage. Contributions create versions/branches. Transformations can target story, game, challenge, community or event. AI may propose compatible contributors, merges or transformations but permissions remain owner/module controlled.

## 18. MORISE DNA
Validated evidence updates capability dimensions/version. No hidden psychological profile. DNA can unlock contextual MORISE-original possibilities.

## 19. Convergence
Independent permitted trajectories → privacy filter → evidence threshold → convergence candidate → optional space/experiment → validation → possible Emergence Event, game, challenge, community, Living Object or World Memory entry.

## 20. Missions From Reality
Repeated validated problem → mission candidate → eligibility → solo/collective experiment → measurement → validation → reusable solution/World Memory.

## 21. World Memory
Validated knowledge with provenance, attribution, privacy and retention. It is retrieved contextually; it is not a dump of all activity.

## 22. AI UX
M15 never creates a new navigation tab. It requests contextual presentation from M05/M04/M03/etc. Non-critical interruptions are suppressed during focused activity.

## 23. Observability
AITrace = requestId, traceId, sourceModule, capabilityId, actionId?, taskId?, executionTarget, providerId?, workerId?, latency, resourceClass, policyDecision, validationResult, attempt, errorCode?.

No hidden chain-of-thought is stored. Operational reasons and validation evidence are enough.

## 24. Adversarial tests
Prompt injection, forged actorId, privilege escalation, tool abuse, data exfiltration, malicious provider output, sandbox escape, cross-player memory leakage, replayed reward action, cancelled-task resurrection.

## 25. Completion
All capabilities/actions/providers/resources/tasks/memory/validators/self-development/evolution paths must have canonical contracts and tests. A provider answering a request is only one execution component.
