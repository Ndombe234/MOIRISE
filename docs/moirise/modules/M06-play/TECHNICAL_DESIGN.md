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

# D100K — M06 Play — FABRICATION / CONTRACT / EVIDENCE LAYER

## 1. Task record
Every implementation unit: TASK_ID → FEATURE_ID → FILES → SYMBOLS → INPUT/OUTPUT SCHEMA → AUTHORITY → MUTATIONS → EVENTS → DEPENDENCIES → TESTS → BROWSER → EXPECTED → EVIDENCE → STATUS.

## 2. File contract
Exact path, owner M06, exports, allowed dependencies, forbidden ownership, side effects, persistence/events, errors, tests, browser surfaces.

## 3. Function contract
Exact symbol/types, preconditions, authoritative reads/writes, idempotency, concurrency/version, errors, observability, callers, direct tests.

## 4. Adversarial verification
Forged references/results, permission bypass, replay, duplicate commands, races, stale versions, malformed AI/provider output, dependency timeout, partial network failure, privacy leakage and client-side authority bypass.

## 5. Evidence
TASK_ID → COMMIT → TEST/SCENARIO → EXPECTED → ACTUAL → ENVIRONMENT → STATUS. Evidence from older commits cannot certify newer code.

## 6. Ownership firewall
A task cannot write another module's authoritative state. It must use an allowed use-case, event or projection.

## 7. Production lock
Unit tests alone never produce VERIFIED for a user-facing capability.
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M06 PLAY
## Owner scope
M06 owns PlaySession state and authoritative results.
## Context use
Context may select an experience or parameter but cannot create a result, score or reward. Play result remains server-validated.
## Continuation
Save/resume references PlaySession state, not untrusted client memory.
## D100K tests
Context-selected game, no-context game, session resume, replayed result, tampered score, mobile recovery, context timeout, deleted memory reference.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M06
## RF-M06-01 Proof of Impossible
Stores a validated result that satisfies a declared challenge predicate. Schema: proofId, challengeId, runId, validatorVersion, resultHash, evidenceRef, createdAt.
No client-only proof. Replays require the same validator/version semantics or explicit migration.

## RF-M06-02 Asynchronous challenge families
Challenge instance: sourceResultRef, rulesVersion, targetCondition, visibility, expiresAt, participationState. Attempts are independently validated.

## RF-M06-03 Living Object playable branches
A Living Object can expose a Play entry only after M13/M15 provides a validated capability. Runtime result remains M06/M09 authoritative.
Tests: anti-tamper, duplicate result, replay, expiry, mobile controls.

## RF-M06-04 Experience-to-Moment generation
A Moment candidate is created from a real committed play result or meaningful state transition; M03 owns publication.



# D100K — RESTORED PLAY TECHNICAL CONTRACTS

`PlayEntry={gameId,title,mode:'2d'|'3d',status:'ready'|'processing'|'unavailable',packageVersion,thumbnailRef?}`
`PlaySession={id,gameId,playerId,startedAt,endedAt?,status:'active'|'completed'|'aborted'}`

Launch pipeline:
select → authorization/eligibility → package metadata → integrity/version check → preload → M09 mount → create session → play → result/save → unmount → history.

Dynamic difficulty is bounded by GameSpecification/rules and never rewrites authoritative scoring. Runtime resources are released after a session where possible.

D100K: unauthorized launch, package mismatch, worker/runtime failure, duplicate result, save failure, dynamic difficulty bounds, cleanup, reconnect and mobile/desktop.



# D100K — RESTORED PLAY EXPERIENCE-FAMILY TECHNICAL CONTRACT

ExperienceFamily is a content classification, not a new module. A PlayEntry may declare Pulse/Drift/Forge/Duel/Quest/World metadata. Selection remains behind the single PLAY surface.

ConsequenceBranch state stores branchVersion, sourceChoiceRef, parentStateRef, visibility and recovery status. Branch execution is validated by M09 and result authority remains M06.

D100K: unsupported family, branch replay, stale branch version, no-AI fallback and async handoff.

