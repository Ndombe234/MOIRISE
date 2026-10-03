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
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M10 SOCIAL GAMING
## Owner scope
M10 owns social challenge state. Context can personalize challenge framing, never alter authoritative outcomes.
## Party context
PartyAIContext contains only participant facts authorized for the challenge. Private profile/memory fields remain excluded.
## D100K tests
Participant isolation, stale member context, opt-out, challenge replay, invitation privacy, contradictory preferences, result integrity.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M10
## RF-M10-01 Proof-of-result social challenge
Create Challenge from validated source result. Participants compete against a declared predicate/version; results are validated by M06/M09.
## RF-M10-02 Rematch/invitation/co-op
Invitation carries challenge/party scope, visibility, expiry and actor authorization. Membership changes cannot mutate historical results.
## RF-M10-03 Shared milestones
Milestone projection derives from authoritative attempts/events. Never synthesize participation to make a group appear active.
## RF-M10-04 Asynchronous community challenge
Challenge family can persist without simultaneous players. Anti-abuse limits, deduplication and lineage are mandatory.



# D100K — RESTORED SOCIAL GAMING TECHNICAL CONTRACTS

`Challenge={id,gameId,creatorId,targetId?,rulesHash,expiresAt}`
`ScoreSubmission={gameId,sessionId,playerId,score,stats,clientNonce}`
`LeaderboardEntry={playerId,score,rank,seasonId}`

Only validated M06/M09 evidence may feed score authority. Server checks package/version/rules hash/session/timing/identity/nonce. Invalid or suspicious results are rejected/quarantined. Leaderboards use deterministic ordering, stable tie-breakers, pagination and explicit season/rules versions.

AI matchmaking is optional; deterministic fallback is required. Spectator mode is available only to games declaring it.

D100K: forged score, duplicate nonce, stale rules, expired challenge, block/privacy restriction, season transition, ties, spectator permission and AI outage.



# D100K — RESTORED ASYNC SHARE TECHNICAL CONTRACT

Async challenges persist creator/target/rulesHash/expiresAt/resultRef and never require simultaneous presence. Public share artifacts contain only data permitted by M03 visibility policy. A dead friend list is not replaced with fabricated participants.

D100K: expired target, blocked target, private-result leakage, duplicate join, stale challenge rule, share reconstruction and no-fake-social checks.

