# M10 — SOCIAL GAMING — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. Challenge schema
Challenge {id, sourceResultId, rulesVersion, creatorId, targetScope, visibility, expiresAt, state, version, commandId}.

## 2. Attempt schema
ChallengeAttempt {id, challengeId, playerId, playSessionId, state, resultId?, createdAt}. Unique challengeId+playerId+attemptNumber according to policy.

## 3. Comparison
ComparisonProjection stores result refs, rulesVersion, tie policy and derived display values. Derived winner is recomputed from authoritative results and cannot be written by client.

## 4. Idempotency
Create challenge, accept, rematch and invite use commandId. Same commandId same payload = same object. Different payload = conflict. Expired challenge rejects new mutations.

## 5. Security
Target privacy, block/mute and community membership are checked server-side at action time. Share tokens are scoped and expiring.

## 6. Failure/recovery
M06 unavailable → challenge remains active but attempt cannot start. M06 result INCONCLUSIVE → comparison remains pending. Network loss after challenge creation → retrieve by commandId.

## 7. Observability
challengeId, sourceResultId, attemptId, rulesVersion, state changes, validation result and error code; no private source content in broad logs.

## 8. Tests
Blocked target, duplicate create, concurrent accept, expired challenge, rematch spam, invalid result, community removal, mobile and desktop.

## 9. DONE
Challenge state is deterministic, attempts are independent, results are authoritative and social gaming cannot bypass privacy or membership authority.

## 11. AI MODULE CONTRACT — M10

### 11.1 PartyAIContext
partyRef, participantProjection[], roleProjection[], gameRef, sessionStateProjection, explicitPreferences, privacyHash.

### 11.2 Proposal
TeamProposal = participantRefs + rationaleRefs + optionalGameConstraints + expiry + policyClass.
Proposal does not mutate party state.

### 11.3 Commit
M10 validates participant existence, permission, availability, duplicate membership and session rules before commit.

### 11.4 Tests
private participant data leakage, forbidden invite, duplicate join, stale party version, provider outage, proposal expiry, concurrency and rollback.

## GAME PLATFORM — CONCEPTION TECHNIQUE M10

GameSocialManifest = gameId + supportedHooks[] + participantPolicy + maxPartySize + visibilityPolicy + resultHooks[] + moderationPolicy.

Le runtime émet des signaux de gameplay autorisés → M10 valide source/result/session → met à jour l'état social → émet les événements M10.

AI request = gameRef + playSessionRef + participant projection + explicit preferences + permitted social hooks. La proposition ne peut pas créer un participant ni modifier un rôle.

Tests : jeu solo sans hook, party join, blocked participant, duplicate invite, score sharing privacy, challenge validation, AI proposal expiry, network loss, membership revoked.

# D10 — M10 SOCIAL GAMING — CONCEPTION TECHNIQUE
## GameSocialManifest
`gameBuildRef,shareableResults[],challengeModes[],inviteModes[],groupHooks[],privacyDefaults,rateLimits`.
## Challenge
Challenge = sourceResultRef + challenger + targetScope + rulesVersion + expiresAt + status. Result is validated before resolution.
## Invite
InviteToken references build + challenge + recipient scope + expiry + revocationVersion; recipient can reject/mute.
## Event flow
game.result.validated → M10 social hook → recipient projection → optional M11 membership action.
## Anti-abuse
Per-actor and per-target caps, dedupe keys, mute/block filtering before notification enqueue.
## Tests
forged result, expired challenge, duplicate invite, blocked recipient, deleted group, removed build, notification storm.

# D100K — M10 Social Gaming — FABRICATION / CONTRACT / EVIDENCE LAYER

## 1. Task record
TASK_ID → FEATURE_ID → FILES → SYMBOLS → INPUT/OUTPUT → AUTHORITY → MUTATIONS → EVENTS → DEPENDENCIES → TESTS → BROWSER → EXPECTED → ACTUAL → EVIDENCE → STATUS.

## 2. File/function contract
Each implementation file and non-trivial symbol must specify path, owner M10, inputs/outputs, authoritative state, side effects, idempotency, concurrency/version policy, errors, telemetry and direct tests.

## 3. M10 adversarial focus
Test the module-specific invariant above, plus replay, forged references, authorization bypass, stale state, duplicate commands, race conditions, malformed upstream data, partial network failure and privacy leakage.

## 4. Evidence contract
Evidence must reference exact commit + exact command/scenario + expected + actual + environment. Old evidence never certifies a new commit.

## 5. Ownership firewall
No task owned by M10 may silently take authority from another module. Cross-module effects are use-case/event/projection handoffs.

## 6. Production lock
Tests passing without applicable browser/mobile/security/resilience/production proof leave the task non-VERIFIED.


## AI FABRICATION CONTEXT CONTRACT — ANTI-AMBIGUITY AND PROOF GATE

This document is an authoritative fabrication input for **M10-social-gaming** within its declared ownership. It must be read together with the complete paired PLAN + TECHNICAL_DESIGN, applicable transversal contracts, dependency rules, definition of done, and the current repository state before implementation.

### Controlled context
Before changing code, the agent MUST record current branch/commit; exact in-scope files/symbols; EXISTS/MISSING/TO_MODIFY/FORBIDDEN/AFFECTED_DEPENDENCY classification; direct/transitive dependencies; data/API/event/schema contracts; acceptance criteria; tests; browser/mobile checks; security/privacy constraints; and required DONE evidence. Missing details are resolved from canonical repository evidence, never invented silently.

### Understanding before fabrication
The sequence is **READ → MODEL CURRENT STATE → CHECK DEPENDENCIES → PLAN → FABRICATE → TEST → VERIFY → INTEGRATE → REGRESSION → LOCK**. Generated code, a green isolated test, or a worker handoff is not sufficient proof of integrated correctness. The coordinator verifies the actual integrated commit.

### Measurable quality target
The goal is to reduce avoidable errors by reducing what the agent must guess. Track first-pass task success, correction count, integration defects, regressions, test failures, and browser failures independently. An 80% first-pass target or 10–20% error envelope can be an engineering KPI, never a guarantee and never a reason to skip verification.

### Evidence gate
DONE requires the applicable chain: **code exists → type/build → focused tests → integration/contracts → runtime/route accessibility → desktop/mobile verification where relevant → error/reload/permissions → dependency regression → fresh evidence**. Anything not demonstrated is **UNVERIFIED**.

### Conflict rule
Conflicting documentation, repository state, or dependencies block the affected fabrication path until the coordinator resolves the authority. This section improves traceability without creating another business or AI authority.
