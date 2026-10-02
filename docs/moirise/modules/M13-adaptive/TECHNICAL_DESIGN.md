# M13 — ADAPTIVE WORLD — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. AdaptiveDecision
{playerScope, candidateRefs[], filtersApplied[], noveltyBudget, diversityBudget, policyVersion, generatedAt, expiry}
Decision is reproducible from versioned policy and evidence refs.

## 2. Living Object
LivingObject {id, ownerId, currentVersion, permissions, lineageRef}. LivingObjectVersion is immutable. Branch/merge operations preserve attribution and source refs.

## 3. Convergence pipeline
signals → normalized trajectories → candidate pairs/groups → confidence → privacy filter → anti-manipulation → proposal.
No raw private content is required. Sensitive dimensions are excluded from the feature space.

## 4. Convergence Space
Scope includes participants/solo actor, experiment definition, visibility, expiry, outcome schema and policyVersion. Leaving a space revokes access but does not erase unrelated source objects.

## 5. World Memory
WorldMemoryCandidate = claim, sourceRefs, attribution, confidence, scope, retention, correctionPath, status. Retrieval returns bounded projections. Corrections create new versions rather than rewriting provenance.

## 6. Failure/recovery
Low confidence → reject/suppress. Source revoked → invalidate projection. M15 down → deterministic adaptive baseline. Provider down → local/cache path. Feedback burst → throttle.

## 7. Security
No sensitive trait inference. No hidden participant disclosure. Permission checks before convergence presentation. Memory retrieval always scope-filtered.

## 8. Observability
decisionId, policyVersion, filter outcomes, candidate counts, convergence confidence class, memory source refs. Do not log raw private messages.

## 9. Tests
Convergence false-positive prevention, privacy filtering, manipulation burst, revoked Living Object, stale memory, solo-only path, AI unavailable, mobile/desktop.

## 10. DONE
Adaptive behavior is contextual but bounded, explainable by permitted evidence, privacy-safe and reversible.

## AI MODULE CONTRACT — M13

AdaptiveSignal = { signalId, sourceModule, sourceRef, observedAt, evidenceHash, privacyClass, confidence, expiresAt }.
AdaptationProposal = { targetSurface, changeSet, evidenceRefs, reasonKey, confidence, policyClass, cooldownKey, expiresAt, rollbackRef }.
M13 validates evidence freshness, privacy, threshold, cooldown and target scope before commit.
Convergence/Emergence requires versioned threshold logic over real signals. Tests cover signal poisoning, fabricated event, privacy breach, oscillation, cooldown bypass, duplicate adaptation and rollback.

# D10 — M13 ADAPTIVE WORLD — CONCEPTION TECHNIQUE
## Signal
`AdaptiveSignal={signalId,sourceRef,sourceModule,scope,confidence,observedAt,expiryAt,evidenceRefs[]}`.
## Proposal
`AdaptiveProposal={proposalId,targetOwner,action,inputs,policyVersion,reasonKey,expiresAt,status}`.
## Pipeline
collect → scope → dedupe → normalize → decay → correlate → propose → owner validate → event → projection.
## World memory promotion
Observation must pass provenance/confidence/policy and scope checks. Promotion to broader scope is explicit.
## Convergence
Store only bounded feature references and evidence keys; avoid sensitive attribute inference.
## Tests
private signal leak, stale signal, duplicate proposal, oscillation, provider outage, owner rejection and rollback.

# D100K — M13 Adaptive World — FABRICATION / EVIDENCE

Every task resolves to TASK_ID → FEATURE_ID → FILE/SYMBOL → dependency order → exact contract → authoritative state → validation → tests → browser scenarios → evidence → status.

File contracts specify exact path, owner M13, symbols, allowed authorities, forbidden writes, persistence/event side effects and direct tests. Function contracts specify types, preconditions, state access, idempotency, concurrency, errors and observability.

Adversarial proof must include replay, duplicate command, stale state, unauthorized access, malformed upstream/AI output, dependency failure and privacy leakage where applicable.

Evidence is fresh only when tied to the exact commit and exact scenario/check. Unit tests cannot alone certify a user-facing or production-sensitive feature.

Ownership firewall: M13 may consume other modules through contracts, events or projections, but may not assume their private authority.
