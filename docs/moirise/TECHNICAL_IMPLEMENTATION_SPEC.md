# MOIRISE — TECHNICAL IMPLEMENTATION SPECIFICATION

## 1. Purpose
This is the implementation-grade technical companion to the Master Plan, module plans and AI technical design. It defines how the pieces fit together so an implementation AI can build the system without inventing cross-module behavior.

## 2. Canonical dependency direction
UI → use case → domain owner → persistence/event contract.
AI capability requests go through M01 AI Gateway → M15 orchestration → provider/local adapter → normalized result → validator → owner module.
No product module imports another module's database tables directly.

## 3. Canonical request envelope
Every meaningful command carries: requestId, actor/session reference, capability/use-case ID, schema version, idempotency key where mutation is possible, createdAt, client context limited to non-authoritative hints, and trace metadata.
Server derives actor identity and authorization context.

## 4. Canonical response envelope
Result contains status, schema version, requestId, domain result reference, safe user-facing state, retryability and error code when failed. Internal stack traces never reach the client.

## 5. Command pipeline
Receive → parse → schema validate → authenticate → authorize → rate/resource check → domain validation → execute transaction/job → persist authoritative result → emit event → build projection → respond.

## 6. Query pipeline
Authenticate → visibility/privacy filter → retrieve bounded data → apply deterministic business filters → optional ranking → projection → cursor/page metadata. Queries never grant mutation authority.

## 7. Idempotency
All expensive/mutating external commands define a stable idempotency key. Server stores command result/reference long enough to cover retries. Same key + same request returns prior result; same key + materially different payload returns conflict.

## 8. Concurrency
Use optimistic versioning or transaction locks for mutable authoritative state. Client timestamps never decide conflict resolution. A stale write returns a conflict that can be safely retried from the latest version.

## 9. Events
Events are facts, not commands. They include eventId, type, schemaVersion, occurredAt, actor reference, source aggregate reference and minimal payload. Consumers must tolerate duplicate delivery and out-of-order delivery where the event contract permits it.

## 10. Jobs/workers
Long-running tasks become durable jobs with jobId, task type, input reference, status, attempt count, lease, resource budget, deadline, output reference and error. Worker loss expires the lease; only idempotent tasks are retried automatically.

## 11. AI architecture
M15 owns orchestration, planning, capability selection, memory classification, evaluation and improvement candidates. Providers are adapters. M15 does not grant domain permissions. Domain modules remain authoritative.

## 12. Provider adapter
Adapter contract: providerId, capabilityIds, request normalization, execute, timeout, health state, cost/resource metadata, response normalization, error normalization. Browser code does not embed provider secrets.

## 13. Provider independence
A provider may be disabled, rate-limited or removed. The capability registry chooses another approved adapter or a deterministic/local fallback. Provider absence cannot corrupt domain state.

## 14. Media pipeline
Request → capability policy → provider/local generation → artifact quarantine → MIME/size/dimension/metadata validation → provenance → storage → immutable artifact reference. Failed artifact remains unpublished.

## 15. Game generation pipeline
Prompt → GameSpecification → task graph → isolated workspace → generated source/assets → dependency resolution → build → static/type checks → runtime smoke test → security/resource test → mobile test → preview → authorized publication → immutable version.

## 16. 2D/3D runtime boundary
2D and 3D are runtime adapters behind M09. M06 knows only experience/session contracts. M08 decides which engine family the generated specification requires. 3D code and assets are lazy-loaded.

## 17. Runtime bridge security
Game runtime can call only declared bridge capabilities. Bridge methods validate session, capability, payload and rate/resource policy. No arbitrary SQL, storage bucket enumeration, secret access or network access is exposed.

## 18. Social/private data boundary
Private messages, private groups and private Player memory have explicit privacy classes. Analytics and AI memory receive references/aggregates where allowed, not raw private content by default.

## 19. Group creation
Manual group creation is a domain command owned by M11. AI-created group is an M15 proposal/orchestration path that calls M11's same canonical creation command. Therefore AI and user creation cannot diverge into two incompatible group models.

## 20. Recommendation boundary
M13/M07 produce ranked candidate references and reason keys. M04 presents them. M03/M11/M06/M08 own the actual domain mutation. Ranking never creates an object merely because it recommends it.

## 21. SYSTEM boundary
M05 receives validated facts and renders progression/system state. M15 can propose contextual experiences but cannot directly award XP, titles or rewards. M05 and M14 remain authoritative for those mutations.

## 22. Reward transaction
Eligibility proof → reward rule version → idempotency lock → grant transaction → collection mutation → audit → event. A failed transaction must not return success. A successful transaction must be safely repeatable.

## 23. Event/continuation engine
M12 stores actual events and progress. A continuation candidate references real source events, has a policy/version and expiry, and is passed to notification/context presentation only after validation.

## 24. Adaptive engine
M13 receives validated behavior summaries, not unrestricted database dumps. It applies versioned policy, protected filters, diversity/novelty limits and rollback. Large behavioral changes require evidence thresholds.

## 25. Memory architecture
Session memory = short-lived task context.
Player memory = user-owned permitted preferences/facts.
System knowledge = validated external/internal knowledge with provenance.
Evidence = raw support for a conclusion.
Task state = durable job execution state.
These stores must not be conflated.

## 26. Self-improvement architecture
Problem detector → evidence → ImprovementCandidate → isolated code workspace → static checks → tests → benchmark → policy review → canary → promotion → monitoring. Stable version is immutable until promotion. Every promotion has rollback target.

## 27. Self-generated code restrictions
Generated code cannot modify authentication, authorization, secret handling, production deployment policy or its own promotion gate without a separate explicitly authorized change. This prevents an improvement candidate from removing the mechanism that evaluates it.

## 28. Distributed compute
A worker receives a scoped task lease and only the data required for that task. The worker cannot become a general-purpose proxy into production. Resource limits are enforced per task. Worker result is treated as untrusted until validated.

## 29. Local/on-device execution
Capability registry may choose local implementations for translation, lightweight reasoning, media processing or caching when supported. Local success/failure is normalized exactly like provider success/failure.

## 30. 16-GB development machine rule
The developer computer is a development environment, not the production compute pool. Heavy AI/game-generation work must be represented as jobs that can be moved to approved workers/providers. The system must not assume that the developer's RAM is the site's RAM.

## 31. User-device compute rule
A user's browser/device is never treated as production RAM by default. Optional distributed compute, if ever enabled, must be explicit opt-in, sandboxed, resource-capped, privacy-preserving and revocable. A user cannot be silently assigned CPU/RAM work.

## 32. Error taxonomy
AUTH_REQUIRED; FORBIDDEN; VALIDATION_FAILED; CONFLICT; RATE_LIMITED; PROVIDER_UNAVAILABLE; CAPABILITY_UNAVAILABLE; RESOURCE_EXCEEDED; TIMEOUT; STORAGE_FAILED; RUNTIME_FAILED; POLICY_BLOCKED; NOT_FOUND; VERSION_INCOMPATIBLE; INTERNAL_ERROR.
Each error defines retryability and user-facing recovery.

## 33. Offline/degraded behavior
Read-only cached projections may remain visible when safe. Mutations queue only when their domain explicitly supports offline commands and conflict resolution. Otherwise the UI says unavailable and does not pretend success.

## 34. Testing pyramid
Unit/domain → schema/contract → integration → persistence/transaction → event delivery/idempotency → provider adapter → AI capability evaluation → runtime/game → security → resource/performance → browser desktop/mobile → end-to-end critical journeys.

## 35. Browser verification
For each release: open app → first arrival → every primary door → create/read/update/delete where applicable → error/retry → back/forward/deep link → mobile viewport → desktop viewport → network interruption → refresh → sign-out/sign-in. No blank screen is accepted.

## 36. Data migration
Every schema-changing entity has versioned migration. Old records are migrated deterministically or marked explicitly incompatible. No silent destructive coercion.

## 37. Audit
Critical actions have actor, action, target reference, policy/rule version, timestamp and result. Sensitive payload is minimized.

## 38. Security checklist
Server-side authorization; RLS/database policies where applicable; secret isolation; input validation; output encoding; upload validation; rate limits; abuse controls; CSP; dependency auditing; sandbox for generated code; no service-role key in browser; no arbitrary provider URL from user input.

## 39. Definition of DONE
A feature is DONE only when its domain contract exists, implementation exists, persistence is authoritative, permissions are enforced, events are defined, failure/recovery is implemented, tests exist, browser behavior is verified, mobile behavior is verified, observability exists and documentation identifies exact ownership and integration points.

## 40. No duplicate architecture rule
If two documents describe the same capability, one canonical owner is selected. The other document links to that contract rather than repeating a second implementation. Historical material is preserved as evidence, not treated as an active competing specification.
