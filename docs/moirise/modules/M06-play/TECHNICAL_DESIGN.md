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


## AI FABRICATION CONTEXT CONTRACT — ANTI-AMBIGUITY AND PROOF GATE

This document is an authoritative fabrication input for **M06-play** within its declared ownership. It is not a prompt substitute and it must never be interpreted in isolation. A fabrication agent MUST read the complete paired PLAN + TECHNICAL_DESIGN, the applicable transversal contracts, dependency rules, definition of done, and the current repository state before changing code.

### Controlled context before fabrication

The agent MUST establish a concrete context record containing: current branch/commit; exact in-scope files and symbols; existing behavior; missing behavior; files that may be modified; files that are forbidden; direct and transitive dependencies; relevant database/schema/event/API contracts; acceptance criteria; required tests; browser/mobile checks; security/privacy constraints; and evidence required for DONE. Ambiguity MUST be resolved from repository evidence or canonical documents. The agent MUST NOT silently invent a route, field, event, authority, provider, state, interface, or fallback because a detail was omitted from a short task description.

The repository state MUST be classified explicitly as **EXISTS**, **MISSING**, **TO_MODIFY**, **FORBIDDEN**, or **AFFECTED_DEPENDENCY**. Legacy behavior is not current authority unless the canonical documentation explicitly adopts it.

### Separation of understanding and fabrication

The required sequence is: **READ → MODEL CURRENT STATE → CHECK DEPENDENCIES → PLAN → FABRICATE → TEST → VERIFY → INTEGRATE → RECHECK REGRESSION → LOCK**. A successful code generation step is not evidence of correctness. A worker handoff is never proof of integration. The coordinator MUST inspect the integrated commit and re-run the relevant checks.

### Error-reduction contract

The objective is to minimize avoidable implementation errors by reducing what the agent must guess. Quality is measured from observed evidence rather than a guaranteed percentage. Track first-pass task success, correction count, integration defects, regressions, test failures, and browser failures separately. A target such as 80% first-pass success or a 10–20% error envelope may be used as an engineering KPI, but it is never treated as a guarantee or as permission to skip verification.

### Evidence gate

For behavior owned by this document, DONE requires the applicable chain: **code exists → type/build checks → focused tests → contract/integration tests → route/runtime accessibility → desktop/mobile browser verification where relevant → error/reload/permission cases → dependency regression check → fresh evidence recorded**. Anything not freshly demonstrated is **UNVERIFIED**, not implicitly successful.

### Conflict rule

If documentation, repository state, or dependencies disagree, the agent MUST stop the affected fabrication path, identify the conflicting authority, and escalate to the coordinator rather than selecting an undocumented interpretation. This contract strengthens traceability; it does not create a second business or AI authority.
