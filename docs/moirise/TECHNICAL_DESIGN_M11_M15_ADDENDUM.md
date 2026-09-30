# M11–M15 — TECHNICAL DESIGN ADDENDUM

## M11 COMMUNITIES
Community = owner + visibility + settings + lifecycle. Membership = player + role + state.
User creation is transactional: validate → authorize → create community + owner membership + default roles → event.
AI community formation: permitted affinity signals → candidate → privacy/block/mute filter → existing-community check → threshold → proposal → explicit acceptance when required → normal create. AI never assigns critical roles. Tests include private access, invite replay, role escalation, duplicate community and proposal rejection.

## M12 EVENTS
EventDefinition + schedule + eligibility + registration + progress + result + continuation.
Lifecycle DRAFT→VALIDATED→SCHEDULED→ACTIVE→COMPLETED/ARCHIVED or CANCELLED.
Only the persisted server schedule is future-state truth. AI can propose content or personalization but cannot fabricate events. Continuation prompts reference a real Event/Continuation ID. Test timezone, cancellation, duplicate registration, stale schedule and provider outage.

## M13 ADAPTIVE WORLD
WorldChangeCandidate contains source evidence, target state, simulation profile, policy version and rollback pointer.
Flow OBSERVE→DETECT→PROPOSE→SIMULATE→VALIDATE→CANARY→APPLY→MONITOR.
Global changes never execute directly from a model output. Rejected candidates leave production untouched. Accepted changes are versioned and reversible. Tests include inconsistent state, concurrency, failed simulation and rollback.

## M14 COLLECTION / REWARD ECONOMY
Reward event is append-only evidence. Grant transaction checks actor, eligible action, config version and idempotency key.
Titles derive from deterministic grammar/version + normalized evidence; player-specific unlock materializes on first unlock.
Roulette uses versioned configuration, server-authoritative outcome, allowance and audit evidence. Starting product baseline may be 3 pulls/day and 50/30/13/5/2 Common/Rare/Epic/Legendary/Mythic; future tuning creates a new configuration version.
AI may analyze economy and produce proposals but cannot select critical outcome or grant itself a reward.

## M15 META SYSTEM + MORISE AI LAB
AIRequest→ContextSnapshot→Intent→Policy→Plan/DAG→ResourceRoute→TaskLease→Execution→Validation→Commit/Event→Experience.
Capability Registry defines schema/validator/resource class/targets. Action Registry defines permissions/side-effects.
Provider adapters normalize health/errors/output; providers are interchangeable.
Memory scopes SESSION/PLAYER/EXPERIENCE/COMMUNITY/CREATOR/WORLD/SYSTEM.
Self-development: LIMITATION→CAPABILITY GAP→HYPOTHESIS→DESIGN→CODE/ALGORITHM CANDIDATE→SANDBOX→TYPE/SECURITY/BEHAVIOR TESTS→BENCHMARK vs BASELINE→POLICY→CANARY→PROMOTE/REJECT→ROLLBACK.
Living Objects preserve seed, lineage, branches, contribution and transforms. Evolution Engine drives Trace/Living World/Hidden Possibilities/Unexplored Paths/Evolving Identity/MORISE Double/Fun & Surprise. DNA derives demonstrated capability evidence. Convergence detects independent compatible trajectories; Missions From Reality transforms repeated validated problems into experiments; World Memory stores validated knowledge with provenance.
Workers use explicit trust, quota, lease, heartbeat, sandbox and revocation. Community Worker default is 1 logical CPU/512 MiB/GPU off. Local/on-device execution is allowed before external provider when the policy and capability permit.

## COMMON CONTRACT
Every module feature must have: owner, trigger, input, context, authorization, state machine, persistence, idempotency, event, UI states, errors, fallback, observability, privacy, tests and rollback where applicable.
