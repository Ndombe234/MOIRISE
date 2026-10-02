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