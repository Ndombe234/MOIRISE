# M11–M15 — TECHNICAL DESIGN ADDENDUM

## M11 COMMUNITIES
Community = owner + visibility + settings + lifecycle. Membership = player + role + state.

User creation is transactional:
validate → authorize → create community + owner membership + default roles → event.

AI community formation:
permitted affinity signals → candidate → privacy/block/mute filter → existing-community check → threshold → proposal → explicit acceptance when required → normal create.

AI never assigns critical roles.

Tests:
- private access
- invite replay
- role escalation
- duplicate community
- proposal rejection

## M12 EVENTS
EventDefinition + schedule + eligibility + registration + progress + result + continuation.

Lifecycle:
DRAFT → VALIDATED → SCHEDULED → ACTIVE → COMPLETED/ARCHIVED
or CANCELLED.

Only the persisted server schedule is future-state truth.

AI can propose content or personalization but cannot fabricate events.

Continuation prompts reference a real Event/Continuation ID.

Tests:
- timezone
- cancellation
- duplicate registration
- stale schedule
- provider outage

## M13 ADAPTIVE WORLD
WorldChangeCandidate contains:
- source evidence
- target state
- simulation profile
- policy version
- rollback pointer

Flow:
OBSERVE → DETECT → PROPOSE → SIMULATE → VALIDATE → CANARY → APPLY → MONITOR

Global changes never execute directly from model output.

Rejected candidates leave production untouched.

Accepted changes are versioned and reversible.

Tests:
- inconsistent state
- concurrency
- failed simulation
- rollback

## M14 COLLECTION / REWARD ECONOMY
Reward event is append-only evidence.

Grant transaction checks:
- actor
- eligible action
- config version
- idempotency key.

Titles derive from deterministic grammar/version + normalized evidence; player-specific unlock materializes on first unlock.

Roulette uses:
- versioned configuration
- server-authoritative outcome
- allowance
- audit evidence.

Starting product baseline may be 3 pulls/day and 50/30/13/5/2 Common/Rare/Epic/Legendary/Mythic; future tuning creates a new configuration version.

AI may analyze economy and produce proposals but cannot select a critical outcome or grant itself a reward.

## M15 META SYSTEM + MORISE AI LAB
M15 owns the Meta System boundary and AI Lab boundary.

The complete AI fabrication contract is NOT repeated here.

Canonical references:
- docs/moirise/ai/AI_MASTER_PLAN.md
- docs/moirise/ai/AI_TECHNICAL_DESIGN.md
- docs/moirise/modules/M15-meta-ai-lab/PLAN.md
- docs/moirise/modules/M15-meta-ai-lab/TECHNICAL_DESIGN.md

M15-specific boundary:
AI request enters through the central AI contract.
M15 may consume capabilities and return:
- response
- proposal
- task reference
- artifact reference
- validation result
- improvement candidate.

M15 never becomes owner of:
- M01 identity
- M02 Player state
- M03 private messages
- M05 progression
- M11 membership
- M12 Event state
- M14 economy/rewards.

AI Lab produces candidates and evidence but does not bypass the central evolution policy.

Do not recreate Provider Router, Memory Service, Validation Engine, Request Gate or other central AI mechanisms here.

## COMMON CONTRACT
Every module feature must have:
- owner
- trigger
- input
- context
- authorization
- state machine
- persistence
- idempotency
- event
- UI states
- errors
- fallback
- observability
- privacy
- tests
- rollback where applicable
