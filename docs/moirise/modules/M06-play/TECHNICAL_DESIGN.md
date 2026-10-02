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

## 11. AI MODULE CONTRACT — M06

### 11.1 Capability boundary
AdaptiveGameContent est une capability distincte de ResultValidation. M15 peut appeler la première quand le manifest l'autorise; il ne peut jamais remplacer la seconde.

### 11.2 Result validation
Evidence → session ownership → state → game/rules version → bounds → sequence → idempotency → authoritative commit.
AI output n'est qu'une evidence candidate.

### 11.3 Runtime security
Generated/adaptive content is sandboxed, versioned and bounded. No runtime capability can expose service-role, unrestricted filesystem, unrestricted network or arbitrary database access.

### 11.4 Tests
AI unavailable, malicious adaptive payload, stale gameVersion, duplicate completion, forged sessionRef, save corruption, provider timeout, no reward from unvalidated output.

## GAME PLATFORM — CONCEPTION TECHNIQUE M06

LaunchGameCommand = { commandId, actorId(server), buildId, deviceCapabilityHash, expectedVersion? }.

Préconditions : build éligible, manifest valide, device compatible, policy/session valide.

M06 demande à M09 d'allouer le runtime. M06 ne choisit ni engineVersion ni sandbox policy.

Chaîne résultat : Runtime evidence → M06 validator → AuthoritativeResult. Aucun résultat AI ne peut écrire XP ou reward.

Le contrat session/save/result est commun à tous les jeux. Tests : 2D, 3D, incompatible device, runtime denied, worker loss, result replay, save migration, adaptive AI unavailable.

# D10 — M06 PLAY — CONCEPTION TECHNIQUE
## PlaySession
`PlaySession={sessionId,playerRef,buildRef,deviceProfile,state,startedAt,version}`.
## State machine
READY → STARTING → ACTIVE → PAUSED → FINISHING → RESULT_PENDING → VALIDATED → COMMITTED / ABORTED.
## Result contract
Client submits candidate result; server validates against M09 telemetry/result schema and M06 rules. Client never self-awards authoritative score/reward.
## EntryRef
`PlayEntry={sourceType,sourceRef,buildRef,visibilitySnapshot,policyVersion}`.
## Share card
ResultCard uses validated result only; share token from M01.
## Tests
build removed mid-session, stale build, forged result, duplicate result command, reconnect, mobile control loss, desktop keyboard, provider outage irrelevant to runtime.

# D100 — TECHNICAL CONTRACT DETAIL
## PlaySession schema
```
PlaySession { sessionId, playerRef, buildRef, buildVersion, deviceProfile,
 state, startedAt, lastHeartbeatAt?, version, commandId }
```
## Start transaction
validate build eligibility → create session → acquire runtime lease if needed → emit PlayStarted. Runtime start failure moves session to ABORTED and releases resources.
## Result admission
validate session ownership → build still compatible → result schema → anti-replay/nonce rules where required → server business validation → commit Result → event.
## Runtime relationship
M09 provides runtime evidence/telemetry; M06 decides admission. M15 does not bypass this boundary.
## Tests
forged result, replay, duplicated finish, build removal, session expiry, reconnect, concurrent tabs, mobile input loss, desktop keyboard and share after validated result only.