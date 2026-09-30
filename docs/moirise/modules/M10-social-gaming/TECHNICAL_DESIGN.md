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