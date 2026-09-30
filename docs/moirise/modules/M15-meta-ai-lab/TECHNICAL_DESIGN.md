# M15 — META SYSTEM + MORISE AI LAB — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. Core request
AIRequest {requestId, actorId, capabilityId, autonomyLevel, privacyClass, inputRefs, outputType, sideEffects, policyVersion}.
Actor is always server-derived.

## 2. IntentSpec
Goal, entities, constraints, outputType, sideEffects, requiredCapabilities, ambiguityLevel, assumptions, requestedAutonomy. User/external content remains untrusted data.

## 3. ContextBundle
ContextBundle {scope, refs[], provenance[], privacyClass, expiry, memoryPolicy, token/resource estimate}. Context compiler rejects references outside declared scope.

## 4. TaskGraph
TaskNode {taskId, graphId, dependencies, capabilityVersion, inputRefs, outputRefs, resourceProfile, state, lease, idempotencyKey, validatorRef, attempts, timestamps}.
Cycle detection happens before scheduling. No task executes while dependencies are unresolved.

## 5. Capability maturity / autonomy
Capability maturity: L0 conceptual, L1 feature-flagged, L2 controlled/validated, L3 production eligible, L4 scalable/observed.
Autonomy A0–A4. Policy is the hard ceiling.

## 6. Provider registry
ProviderDefinition {providerId, capabilities, endpoint, authMode, secretName, schemaVersion, timeout, quota, privacyPolicy, licenseRef, health, fallbackIds, lastVerifiedAt}.
Providers are adapters. Real secrets never live in docs/source.
Routing order: local → cache → Trusted Worker → permitted Community Worker → verified free/client-side → keyed provider → explicitly enabled paid provider → degraded.

## 7. Worker lease
WorkerLease {workerId, taskId, resourceProfile, leaseStart, leaseExpiry, heartbeat, sandboxRef, state}.
Community Worker default: 1 logical CPU, 512 MiB RAM, GPU/storage disabled, bounded network. Worker does not receive production secrets or unrestricted filesystem.

## 8. Validation contract
ValidationReport lists validator id/version, status VALID/INVALID/INCONCLUSIVE, evidence refs, policy decision and generatedAt.
INCONCLUSIVE can never pass a production mutation requiring proof.

## 9. Self-correction
CorrectionTask has parentTaskId, mutationScope, attempt, hypothesis, diff/artifact refs, validators, benchmark delta and stop reason. Depth/time/resource/attempt caps and oscillation detection are mandatory.

## 10. Memory
MemoryEntry {scope, owner, sensitivity, consent, provenance, confidence, version, retention, deletionPolicy, sourceHash}. Retrieval applies scope and privacy filters before ranking.
Private conversation content is never general AI memory by default.

## 11. Creative artifact
CreativeArtifact {type,text/image/video/audio/music/voice, sourceRefs, providerRef?, generationVersion, policyStatus, validationRefs, contentHash}.
Publication is a separate owner command after validation.

## 12. AI Lab isolation
Lab has separate workspace/branch, capability allowlist and secrets boundary. It can test code candidates, but cannot read production secrets or issue production admin mutations.

## 13. Evolution promotion
Candidate → static checks → sandbox → tests → benchmark vs baseline → security/policy review → canary → monitor → promote or reject → rollback if regression.
Promotion requires an auditable CapabilityVersion.

## 14. Failure/recovery
Provider timeout → fallback or degraded.
Worker lost → requeue only idempotent TaskNodes.
Validator fails → correction candidate, not blind retry.
Oscillation → stop.
Resource exhausted → terminate sandbox and record reason.
Context unavailable → ask/degrade, never silently expand scope.

## 15. Security
Prompt injection is untrusted content. Tool selection is allowlisted. Provider SSRF blocked by endpoint registry. Secrets are referenced by secretName only. No superuser path.

## 16. Observability
requestId, traceId, taskId, capabilityId/version, autonomy, worker/provider, latency, resource class, policy decision, validation status, retries. Never store raw private prompts/content in broad telemetry unless an explicit debug policy requires it.

## 17. Tests
Schema/intent, context scope, autonomy ceilings, provider fallback, worker lease, malicious artifact, prompt injection, sensitive-data attempt, INCONCLUSIVE handling, correction oscillation, canary rollback, creative provenance.

## 18. DONE
New capability has capability contract, implementation/adapter, policy, resource profile, validator, tests, observability, version, integration and rollback. M15 remains one AI brain and one provider router.