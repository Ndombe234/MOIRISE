# M06 — PLAY — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. PlaySession schema
```
PlaySession {
 id, experienceId, gameVersion, rulesVersion,
 actorId(server), startedAt, expiresAt,
 runtimeRef, state, saveVersion, commandId
}
```
Unique/lookup indexes : actorId+state, commandId, experienceId+gameVersion.

## 2. Launch transaction
Validate version → insert session with STARTING → allocate runtime → transition ACTIVE only after runtime reports READY. If allocation fails, session becomes ABORTED with reason code.

## 3. Runtime bridge
Allowed methods only: submitInput, saveSnapshot, requestResume, submitCompletionEvidence, requestShare.
Forbidden: arbitrary DB query, service-role, admin API, filesystem outside sandbox, unrestricted network.

## 4. Result validation
Validator checks session owner, session state, version alignment, action sequence if required, score range, completion condition and idempotency key. Output:
VALID -> AuthoritativeResult;
INVALID -> reject;
INCONCLUSIVE -> preserve attempt evidence without reward.

## 5. Save migration
Migration table maps known schemaVersion A→B. Unknown schema never executes arbitrary transforms.

## 6. Failure matrix
Runtime crash → recover last valid save.
Worker lost → resume/requeue only safe session tasks.
Network loss after result commit → fetch result by idempotency key.
Provider adaptive content unavailable → core game continues if design permits.

## 7. Security
Server-authoritative result, signed runtime manifest, sandbox, resource quotas, attachment allowlists, no secrets.

## 8. Observability
sessionId, experienceId, gameVersion, resultId, runtimeRef, duration, outcome, validationCode. No raw private gameplay chat in general logs.

## 9. Browser tests
Start, pause/resume, result, share, back, refresh, mobile touch, desktop keyboard, repeated taps, runtime error boundary, no white screen.

## 10. DONE
A result cannot be awarded merely because the client claims it happened; every result is tied to a valid session and version and survives retries safely.