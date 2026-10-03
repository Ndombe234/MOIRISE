# MOIRISE — FUSION D100K — TECH PART B

# SOURCE TECHNIQUE 10 — docs/moirise/modules/M06-play/TECHNICAL_DESIGN.md

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

---

# SOURCE TECHNIQUE 11 — docs/moirise/modules/M07-game-discovery/TECHNICAL_DESIGN.md

# M07 — GAME DISCOVERY — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. Search contract
SearchQuery {query, locale, cursor?, limit, filters}. SearchPage {items[], nextCursor, rankingVersion}. Server bounds limit and validates filters.

## 2. Pipeline
candidate generation → visibility/block filter → safety filter → dedupe → diversity → novelty → ranking → reason projection. Filtering happens before scoring so hidden items cannot influence presentation.

## 3. Recommendation evidence
RecommendationSet stores rankingVersion, candidate refs, reason keys, generatedAt and expiry. A reason key is an enumerated safe explanation, not a free text dump of private data.

## 4. Feedback
DiscoveryFeedback = actor, item, action, createdAt, policyVersion, dedupeKey. Rate limits and duplicate checks happen before the write used by ranking.

## 5. Research
ResearchEvidence = sourceRef, retrievedAt, claimRef, confidence, status, licenseNote. VERIFIED means source was captured/checked according to policy, not absolute truth. INCONCLUSIVE items cannot be treated as facts.

## 6. Failure / recovery
AI/reranker down → lexical/baseline ranking. Provider source down → claim INCONCLUSIVE. Cache stale → recompute safe projection. Duplicate feedback → dedupe. Block/privacy change → invalidate affected recommendation projections.

## 7. Security
Visibility and block checks before ranking. External text is untrusted input. No sensitive inference. No arbitrary URL execution from search results. No private user data in general logs.

## 8. Performance
Cursor pagination, bounded candidate pool, asynchronous research, safe projection cache and no full-catalog rerank per request.

## 9. Observability
query hash, rankingVersion, candidate count, filtered count, fallback reason, latency. Avoid raw private query content in broad telemetry.

## 10. Browser tests
Mobile/desktop search, empty state, deterministic pagination, recommendation dismissal, provider outage and confirmation that blocked/private items never reappear.

## 11. DONE
Discovery works without AI, has explainable ranking inputs and cannot leak private, blocked or unsafe content.

## 11. AI MODULE CONTRACT — M07

### 11.1 Candidate schema
DiscoveryCandidate = itemRef + visibilityClass + safetyStatus + freshness + novelty + explicitPreferenceSignals + lexicalScore + optionalAIScore.

### 11.2 AI input gate
Only candidates passing visibility/safety/privacy can enter AI ranking. AI reasonKey cannot expose hidden sensitive ranking features.

### 11.3 Output
AI rerank result contains ordered candidate refs, bounded score/weight metadata and evidence/reason keys. M07 recomputes final visibility and diversity before projection.

### 11.4 Tests
blocked candidate never reaches AI, private item never ranked, provider outage baseline ranking, deterministic pagination, duplicate feedback, stale AI scores invalidated after privacy change.

## GAME PLATFORM — CONCEPTION TECHNIQUE M07

GameCatalogItem = gameId + buildId + version + mode + engineClass + visibilityClass + deviceProfile + tags + durationProfile + status + discoverySignals.

Publication = build validation + M09 runtime compatibility + content/safety checks + publication policy.

L'AI rerank ne voit que les candidats déjà autorisés. M07 recalcule visibility, diversity et novelty avant projection.

Un build invalidé ou retiré ne doit plus être lançable même si une ancienne projection est en cache. Tests : build non validé absent, retrait, filtres 2D/3D, compatibilité mobile, pagination et fallback sans AI.

## 12. CREATIVE SOCIAL DISCOVERY TECHNICAL CONTRACT
Canonical shared design = `docs/moirise/CREATIVE_MEDIA_VIRALITY_TECHNICAL_DESIGN.md`.

### 12.1 Public media candidate
`MediaDiscoveryCandidate = mediaRef + ownerRef + visibilityClass + safetyStatus + originalityStatus + freshness + novelty + creatorDiversityKey + interactionFeatures + optionalAIScore`.

### 12.2 Hard filters
Before any AI scoring: visibility → block/mute → recommendation eligibility → safety → originality publish state → dedupe. A Story with `expiresAt <= now` is excluded.

### 12.3 Ranking signals
Use versioned bounded signals: view choice, completion, dwell quality, likes, not-interested, shares, follows, saves, freshness, novelty and creator diversity. Burst activity is downweighted. No private activity is used in public projections.

### 12.4 Friends activity
`FriendsActivityProjection` contains only public eligible objects and allowed relationship activity. User-controlled hiding/muting removes the relevant projection.

### 12.5 Create-from-concept
M07 emits a capability reference to M15/M03 rather than copying source media. The sourceRef and permission state remain attached to the candidate.

### 12.6 Cold start
New users receive a deterministic diverse baseline using declared interests, language and public safe content. The system does not fabricate a social graph.

### 12.7 Tests
Expired Story exclusion, private like exclusion, hidden creator exclusion, not-interested suppression, repeated-share burst suppression, diversity floor, creator cold-start, originality inconclusive and provider outage fallback.

# D10 — M07 GAME DISCOVERY — CONCEPTION TECHNIQUE
## Candidate
`DiscoveryCandidate={itemRef,visibility,safety,deviceCompat,relationshipSignals,freshness,novelty,contentQuality,optionalAIScore}`.
## Ranking formula
Hard filters first; then deterministic weighted scoring with versioned weights. AI score is one bounded feature. RankingVersion is stored with projection.
## Feedback
play/share/dismiss/save/follow are event types with dedupeKey, rate limits and decay. Spam bursts are capped.
## Explanation
reasonKey enumerates factual causes; no hidden sensitive reason leaks.
## Research
External evidence is isolated from social ranking and marked verified/inconclusive/stale.
## Tests
blocked candidate, private candidate, device incompatibility, new-user cold start, stale score, duplicate feedback, pagination cursor stability.

# D100K — M07 Game Discovery — FABRICATION / CONTRACT / EVIDENCE LAYER

## 1. Task record
Every implementation unit: TASK_ID → FEATURE_ID → FILES → SYMBOLS → INPUT/OUTPUT SCHEMA → AUTHORITY → MUTATIONS → EVENTS → DEPENDENCIES → TESTS → BROWSER → EXPECTED → EVIDENCE → STATUS.

## 2. File contract
Exact path, owner M07, exports, allowed dependencies, forbidden ownership, side effects, persistence/events, errors, tests, browser surfaces.

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
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M07 GAME DISCOVERY
## Owner scope
M07 consumes authorized interest/context signals for discovery. It must distinguish explicit preferences from inferred recommendation signals.
## Ranking input classes
EXPLICIT_PREFERENCE, RECENT_ACTION, SOCIAL_SIGNAL, WORLD_CONTEXT, SYSTEM_CONTEXT. Sensitive profile facts are excluded by default.
## Explainability
Each recommendation keeps reason codes and source class; raw private memory is never shown as ranking explanation.
## D100K tests
Cold start; preference update; sensitive-field exclusion; stale signal expiry; multilingual search; recommendation diversity; cache invalidation.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M07
## RF-M07-01 Discovery Broadcast eligibility
Accept only real published/eligible artifacts. Candidate carries sourceRef, visibility, age, provenance and reason codes.

## RF-M07-02 Curiosity / novelty / diversity
Ranking inputs include freshness, novelty, diversity, explicit preference and recent actions. Sensitive memory fields are excluded by default.

## RF-M07-03 Social recommendation loop
Recommendation → interaction → validated feedback → ranking update. No fake activity or synthetic engagement.

## RF-M07-04 Cross-domain capability discovery
M07 can recommend a real capability only when the capability registry says it exists and the user is eligible. It cannot invent an absent feature.

## RF-M07-05 Cold-start / first-session discovery
Cold start uses declared interests + safe session signals, not sensitive inference. Every result remains explainable by reason codes.



# D100K — RESTORED DISCOVERY TECHNICAL CONTRACTS

`DiscoveryQuery={text?:string,kinds?:string[],tags?:string[],cursor?:string,limit:number,locale:string}`
`Candidate={id:string,kind:string,score:number,reasons:string[]}`
`DiscoveryResult={items:Candidate[],nextCursor?:string,rankingVersion:string}`

Candidate retrieval is bounded and public-catalog based. Ranking uses deterministic relevance/freshness/diversity, explicit preferences, permitted history and safe aggregate signals. AI may assist but is not required for each scroll or each candidate. Popularity/ratings are never invented.

D100K: cursor replay, stale ranking version, duplicate candidates, empty result, fabricated metrics, private candidate leakage, cache poisoning, provider outage and mobile infinite-scroll behavior.

---

# SOURCE TECHNIQUE 12 — docs/moirise/modules/M08-game-factory/TECHNICAL_DESIGN.md

# M08 — GAME A→Z FACTORY — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. GameProject
GameProject {id, ownerId, status, activeSpecVersion, createdAt, updatedAt}. GameSpecification versions are immutable once used by a build.

## 2. Task node contract
TaskNode {taskId, graphId, dependencies[], capabilityId, capabilityVersion, inputRefs[], outputRefs[], resourceProfile, timeoutMs, idempotencyKey, validatorRef, attempts, status}.
The scheduler cannot execute a node until dependencies have terminal valid outputs.

## 3. Artifact contract
ArtifactRef {artifactId, projectId, version, type, hash, sourceNode, provenance, validationStatus, createdAt}. Generated artifacts are untrusted until validators pass.

## 4. Build isolation
Build workspace has no production secrets. Dependency installation uses allowlist. Network is deny-by-default with explicit destinations. CPU, memory, disk, process count and execution time are bounded.

## 5. 2D/3D engine contract
Manifest declares engineId/version, entrypoint, assets, input map, save schema, network policy and resource budget. 3D adds scene graph, camera, lighting and collision budget.

## 6. Validation pipeline
schema → dependency policy → static/type → build → security → runtime simulation → behavior → content/policy → resource/performance → preview.
VALID = all required validators pass. INCONCLUSIVE is not VALID.

## 7. Correction loop
FailureReport identifies node, validator, evidence and scope. Correction may edit candidate workspace only. Rerun failed validators first, then regression suite. Oscillating corrections are stopped after bounded attempts.

## 8. Publication / rollback
Publication creates immutable GameVersion and moves activeVersion only after authorized command. Rollback changes activeVersion to an earlier immutable version; prior versions remain auditable.

## 9. Security
Generated code cannot access Supabase service role, MOIRISE admin APIs, arbitrary filesystem or unrestricted network. External assets keep provenance and policy references.

## 10. Tests
Spec schema, graph acyclicity, idempotency, build, sandbox, security, runtime, save/load, mobile, 3D resource budgets, publication authorization and rollback.

## 11. DONE
A reproducible project can be regenerated from spec+artifact lineage, bad candidates cannot overwrite the stable version, and every published game points to a validated immutable build.

## 11. AI MODULE CONTRACT — M08

### 11.1 GameFactoryRequest
brief, targetPlayers, platform, mode2D3D, durationTarget, shareability, contentConstraints, safetyClass, resourceBudget, requestedAutonomy.

### 11.2 GameSpecification ownership
M15 produit/compile les propositions; M08 valide la specification métier, crée le TaskGraph et possède l'état de fabrication.

### 11.3 Artifact validation
Chaque artifact = artifactId, type, sourceTask, contentHash, schemaVersion, provenance, validatorRefs, sandboxRef, status.
VALIDATION est obligatoire avant publication.

### 11.4 Repair loop
INVALID → diagnostic → bounded correction proposal → new artifact version → validation. Oscillation/attempt budget exceeded = REJECTED/ESCALATE.

### 11.5 Tests
broken dependency, malicious code, invalid asset, oversized bundle, mobile performance, 2D/3D capability mismatch, provider output INCONCLUSIVE, retry/idempotency and clean rollback.

## GAME PLATFORM — CONCEPTION TECHNIQUE M08

GameProjectWorkspace contient specification, task graph, source candidate, approved assets, fixtures/tests, tool allowlist et dependency lock.

ReuseResolver recherche d'abord un composant ou template compatible. L'incompatibilité doit être prouvée avant création d'une nouvelle brique.

TaskGraph recommandé : requirements → spec → architecture → gameplay/UI/assets/audio/code/tests → build → security → performance → runtime manifest → integration.

Artifact = artifactId + projectId + sourceTaskId + contentHash + provenance + validatorRefs + sandboxRef + status.

RepairController exige failedNode + diagnosticRef, crée une nouvelle revision et impose un budget de tentatives. Répétition du même fingerprint d'échec → ESCALATED/REJECTED.

Agent boundary : workspace candidat uniquement, pas de secrets prod, service-role, écriture DB arbitraire, réseau illimité ou publication directe.

Gate finale : static + unit + integration + security + resource + runtime + product contracts = VALID avant handoff M09.

## GAME FABRICATION MEMORY — TECHNICAL INTEGRATION M08

### 12. Memory handoff
M08 sends validated fabrication evidence to the central MemoryService. It does not create a parallel GameMemoryService or a second memory table.

GameFabricationEvidence = projectId + specificationVersion + buildId + taskRefs[] + artifactRefs[] + testRefs[] + failureRefs[] + runtimeRefs[] + resourceObservations[].

### 12. ReuseResolver
Before creating a component, query validated GAME_* knowledge. Hard filters are mode, engine/version, device, resource profile, security and policy. Decision is REUSE, ADAPT_VERSION, REJECT or NEW_COMPONENT.

### 13. Failure lineage
A failed task stores a failureFingerprint and diagnostic reference. Repeated equivalent failures are aggregated by the central MemoryService.

### 14. Repair promotion
A repair pattern is only reusable after build success, impacted tests, regression tests, security/policy checks and defined scope. M08 supplies evidence; M15 performs the learning/promotion orchestration.

### 15. Independence
The M08 factory workspace must remain usable with Codex disabled. Missing execution tooling is reported as a capability/tool limitation, not as loss of memory.

# D10 — M08 GAME FACTORY — CONCEPTION TECHNIQUE
## GameSpecification
`GameSpecification={gameId,specVersion,mode2D3D,loop,controls,winLoss,duration,targetDevices,socialHook,assetPolicy,resourceBudget,validators}`.
## TaskGraph
Each node contains taskId,nodeKey,capabilityVersion,dependencies,inputRefs,outputRefs,resourceProfile,validatorId,idempotencyKey,timeout,retryPolicy.
## Reuse algorithm
search compatible validated patterns → score by compatibility/evidence → choose or create candidate → validate after adaptation. Reuse never bypasses tests.
## Agent boundary
Codex/other coding agents receive sandbox workspace + task node + allowlisted tools. Output is candidate artifact only; M08 validates and publishes.
## Repair loop
DIAGNOSIS → HYPOTHESIS → PATCH → IMPACTED_TESTS → BUILD → REGRESSION → BENCHMARK. Same failure fingerprint twice escalates instead of oscillating.
## Build provenance
buildId, sourceCommit, toolchain, dependency lock, runtime target, artifact hash, test evidence.
## Tests
2D/3D build reproducibility, malicious asset, oversized asset, runtime mismatch, agent output injection, failed repair, resource overrun.

# D100K — M08 Game Factory — FABRICATION / CONTRACT / EVIDENCE LAYER

## 1. Task record
Every implementation unit: TASK_ID → FEATURE_ID → FILES → SYMBOLS → INPUT/OUTPUT SCHEMA → AUTHORITY → MUTATIONS → EVENTS → DEPENDENCIES → TESTS → BROWSER → EXPECTED → EVIDENCE → STATUS.

## 2. File contract
Exact path, owner M08, exports, allowed dependencies, forbidden ownership, side effects, persistence/events, errors, tests, browser surfaces.

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
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M08 GAME FACTORY
## Owner scope
M08 consumes structured creator intent and fabrication memory. User context is an input constraint, never an authorization shortcut.
## Creation contract
ContextPacket → CreativeBrief → GameSpecification → TaskGraph → validation. Every generated game keeps source/creator references and version lineage.
## Memory safety
Fabrication memory may store reusable technical patterns, not private personal data unless separately authorized.
## D100K tests
Incomplete intent; contradictory constraints; creator-memory isolation; prompt injection inside brief; deterministic fallback; generated-game provenance; rollback.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M08
## RF-M08-01 Game A→Z
Research→Idea→Clarify→GameSpecification→TaskGraph→Engine→Code/Assets/Content→Security→Simulation→Tests→Playtest→Balance→Preview→Publish.
Each stage persists versioned artifacts and can rollback.

## RF-M08-02 Creation Runtime
A generated artifact is executable only after M09 sandbox validation. M08 never executes arbitrary generated code in privileged context.

## RF-M08-03 Creation-to-story/media transformation
A validated experience can become story/visual/audio/video/playable representation while preserving sourceRef and lineage. Transformation is not treated as a new historical event.

## RF-M08-04 Fabrication memory
Store reusable technical patterns and validated repairs with scope/version. Do not store private user memory in fabrication memory.




# HISTORICAL FUSION — M08 GAME FACTORY — TECHNICAL DESIGN

## Fabrication distribuable

GameSpecification et TaskGraph sont les contrats d'entrée. Chaque node contient capabilityVersion, dependencies, input/output refs, resourceProfile, validator, timeout, retryPolicy et idempotencyKey.

Le Resource Router peut envoyer les nodes compatibles vers local runtime, trusted worker, community worker autorisé ou provider vérifié. Les données privées restent dans les scopes autorisés.

## Artifact safety

`Artifact` = artifactId + projectId + sourceTaskId + contentHash + provenance + validatorRefs + sandboxRef + status.

Generated code/assets sont non fiables jusqu'à validation. M08 ne publie pas un artefact simplement parce qu'un agent/provider l'a produit.

## Repair loop

Chaque réparation conserve failureFingerprint, diagnosticRef et revision. Build + impacted tests + regression + security + resource validation sont obligatoires avant promotion.

## Creation memory

M08 envoie les preuves de fabrication validées au MemoryService central. Il ne crée pas une seconde mémoire.

Les patterns réutilisables doivent être compatibles avec engine/version/device/resource/security/policy avant REUSE ou ADAPT.

## 2D / 3D resource model

La spec conserve séparément les contraintes 2D/3D : CPU/RAM/GPU/VRAM, taille des assets, frame/memory budget, startup/load budget et fallback profile.



# D100K — RESTORED GAME FACTORY TECHNICAL CONTRACTS

`AssetRef={id,kind,ref,license:'owned'|'generated'|'open',provenance,hash}`
`GameSpecification={id,mode:'2d'|'3d',engine,scenes,entities,rules,controls,levels,assets,audio,tests}`
`GamePackage={id,specHash,engineVersion,manifestRef,artifactRef,signature}`

Generated code is untrusted; dependencies are allowlisted. Every asset retains license/provenance/hash. A build cannot be published until static, build, security, resource, runtime and policy gates pass.

The published package contains a runtime manifest and never calls the provider/agent that created it. Provider/model/tool provenance remains attached to fabrication evidence.

D100K: malformed spec, missing dependency, malicious asset, unverifiable license, injected agent output, artifact signature/hash mismatch, provider outage, reproducible build and 2D/3D resource overrun.



# D100K — EXPLICIT FABRICATION PROVENANCE RESTORATION

Every generated artifact records provider/agent identity when used, model/tool version where available and artifact/content hashes. This provenance survives build/package conversion.

D100K: missing provenance, tampered hash, provider disagreement and provider removal.

---

# SOURCE TECHNIQUE 13 — docs/moirise/modules/M09-shared-game-engine/TECHNICAL_DESIGN.md

# M09 — SHARED GAME ENGINE — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. RuntimeManifest
RuntimeManifest {gameVersion, engineId, engineVersion, entrypoint, assetRefs[], inputMap, saveSchemaVersion, networkPolicy, resourceProfile, allowedCapabilities[]}.

## 2. SandboxLease
Lease records worker/runtime identity, start, expiry, CPU/RAM/time limits, filesystem scope and network allowlist. Lease expiry destroys access.

## 3. Bridge contract
Allowed calls: submitInput, saveSnapshot, requestResume, submitCompletionEvidence, requestShare. No arbitrary SQL, storage, admin endpoint, secret or process execution.

## 4. Save integrity
SaveRecord contains player/session ref, schemaVersion, checksum, bounded payload and version. Unknown schema or checksum failure never loads arbitrary bytes.

## 5. Resource enforcement
CPU time, memory, disk and network are enforced outside the game package. A game that exceeds budget enters RESOURCE_LIMITED and cannot continue unrestricted.

## 6. Failure/recovery
Manifest invalid → launch denied. Worker lost → lease LOST. Runtime crash → last valid save/restart. Network blocked → game continues when no network capability is required; otherwise explicit unavailable state.

## 7. Security
Generated runtime is untrusted. Separate workspace, no production secrets, dependency allowlist, network deny-by-default, output/result treated as untrusted evidence.

## 8. Observability
runtimeRef, gameVersion, engineVersion, resource usage class, state transitions and failure codes. No raw private player content in general telemetry.

## 9. Browser/device tests
Desktop and mobile launch, touch/keyboard input, pause/resume, save/load, 3D memory fallback, worker loss simulation, no white screen.

## 10. DONE
Every runtime is bounded, revocable, restartable and incapable of reaching privileged MOIRISE data directly.

## 11. AI MODULE CONTRACT — M09

### 11.1 RuntimeManifest
gameVersion, engineId, engineVersion, entrypoint, assetRefs, inputMap, saveSchemaVersion, networkPolicy, resourceProfile, allowedCapabilities.

### 11.2 Capability check
requested capability must exist, match version policy and be present in manifest allowlist. Otherwise CAPABILITY_DENIED.

### 11.3 Sandbox
No arbitrary filesystem, admin API, service-role, secret, unrestricted network or undeclared worker capability.

### 11.4 Tests
invalid manifest, capability mismatch, worker loss, runtime crash, AI provider outage, malicious script, oversized resource request, save schema mismatch, deterministic restart.

## GAME PLATFORM — CONCEPTION TECHNIQUE M09

RuntimePackage = engineId + engineVersion + runtimeBuildRef + bridgeVersion + sandboxPolicyVersion + supportedModes + resourceProfiles.

RuntimeManifest = gameVersion + engineId + engineVersion + entrypoint + assetRefs + inputMap + saveSchemaVersion + networkPolicy + resourceProfile + allowedCapabilities + fallbackProfiles.

Allocation : validate build → validate manifest → verify device/resource profile → reserve resources → start sandbox → initialize bridge → expose allowlist → return RuntimeRef READY.

Resource policy : CPU/GPU/RAM/network/time budgets vérifiés avant launch et observés pendant runtime. Dépassement selon policy : DEGRADED, PAUSED, TERMINATED ou RESTART.

Tests : sandbox escape, undeclared API, filesystem traversal, secret scan, unrestricted network, capability mismatch, malicious artifact, crash, worker loss.

# D10 — M09 SHARED GAME ENGINE — CONCEPTION TECHNIQUE
## GameRuntimeManifest
`runtimeId,version,engineClass,buildId,requiredFeatures,deviceProfiles,resourceBudget,networkPolicy,assetManifestHash`.
## Sandbox
CPU/RAM/time quotas, worker isolation, allowlisted APIs, no service-role access, no arbitrary URL fetch and no persistent unapproved storage.
## Loader
fetch manifest → verify build status → hash → compatibility → allocate resources → mount assets → start runtime.
## Telemetry
Only whitelisted gameplay telemetry fields; raw user secrets/content excluded. Result authority remains M06.
## Performance
Frame budget, memory budget, asset size budget and watchdog. Overrun → DEGRADED/ABORTED, not silent runaway.
## Tests
hash mismatch, revoked build, incompatible device, infinite loop, oversized asset, forbidden network, memory overrun, clean shutdown.

# D100K — M09 Shared Game Engine — FABRICATION / CONTRACT / EVIDENCE LAYER

## 1. Task record
TASK_ID → FEATURE_ID → FILES → SYMBOLS → INPUT/OUTPUT → AUTHORITY → MUTATIONS → EVENTS → DEPENDENCIES → TESTS → BROWSER → EXPECTED → ACTUAL → EVIDENCE → STATUS.

## 2. File/function contract
Each implementation file and non-trivial symbol must specify path, owner M09, inputs/outputs, authoritative state, side effects, idempotency, concurrency/version policy, errors, telemetry and direct tests.

## 3. M09 adversarial focus
Test the module-specific invariant above, plus replay, forged references, authorization bypass, stale state, duplicate commands, race conditions, malformed upstream data, partial network failure and privacy leakage.

## 4. Evidence contract
Evidence must reference exact commit + exact command/scenario + expected + actual + environment. Old evidence never certifies a new commit.

## 5. Ownership firewall
No task owned by M09 may silently take authority from another module. Cross-module effects are use-case/event/projection handoffs.

## 6. Production lock
Tests passing without applicable browser/mobile/security/resilience/production proof leave the task non-VERIFIED.
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M09 SHARED GAME ENGINE
## Owner scope
M09 owns runtime sandbox state. Context is read-only runtime input after authorization.
## Runtime contract
Resolved ContextPacket → validated RuntimeInput → SandboxLease. Context cannot directly execute code, change privileges or bypass resource limits.
## D100K tests
Injected context payload, oversized payload, tampered runtime input, session expiry, cross-game context leakage, resume/reconnect, sandbox isolation.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M09
## RF-M09-01 2D/3D shared runtime
RuntimeManifest declares engine adapter, asset permissions, input schema, resource budget, validatorVersion and save schema. 2D and 3D are equal first-class routes.
## RF-M09-02 Generated-game execution
Only validated GameArtifact versions may enter the sandbox. Generated code/assets are treated as untrusted.
## RF-M09-03 Living Object / interactive branch runtime
Branches are content/state references, not privileged code. Runtime emits validated result events to M06.
## RF-M09-04 Recovery
Pause/save/resume must be versioned against the exact runtime manifest and content hash.




# HISTORICAL FUSION — M09 SHARED GAME ENGINE — TECHNICAL DESIGN

## Allocation

`RuntimeAllocation` doit vérifier build status → manifest hash → device compatibility → resource profile → worker/runtime eligibility → sandbox lease → bridge initialization.

## Runtime budgets

Le runtime surveille CPU, RAM, GPU/VRAM, storage, network et execution time selon le profile. Les limites sont imposées par le runtime/sandbox, pas par une simple variable JavaScript.

## Worker failure

Worker heartbeat loss → lease LOST → requeue uniquement les opérations idempotentes → nouvel allocation compatible → validation.

Une session interactive déjà active n'est jamais clonée automatiquement sans procédure de reprise définie.

## Provider independence

Après publication d'un GameBuild valide, aucun provider de génération n'est requis pour jouer. La présence ou l'absence de Gemini/OpenRouter/Pollinations/Hugging Face/etc. ne change pas la validité du runtime package.

## Tests ajoutés à la matrice

resource overrun, worker loss, incompatible worker version, malicious generated artifact, undeclared network, filesystem escape, secret scan, 2D/3D memory pressure, deterministic restart, provider outage during fabrication versus runtime.



# D100K — RESTORED SHARED RUNTIME TECHNICAL CONTRACTS

`RuntimeLimits={maxEntities,maxAssetBytes,maxSessionMs,maxSaveBytes,maxSimulationHz}`
`GamePermissions={network:'none'|'approved',storageMb,fullscreen,input[]}`
`GameManifest={gameId,engineVersion,mode:'2d'|'3d',entryScene,assets[],capabilities[],limits,saveSchema,multiplayer?}`
`GameSession={id,gameId,playerId,startedAt,state:'loading'|'running'|'paused'|'ended'|'failed'}`
`GamePackage={id,version,engine,manifest,entry,assets[],integrityHash,signature,permissions}`

Operations:
`verifyGamePackage`, `createRuntimeSession`, `saveGameState`, `reportRuntimeEvent`, `finalizeGameSession`, `terminateRuntime`.

Subsystems load lazily. Reproducible simulation uses an explicit seed. Runtime adapters expose common mount/resize/input/pause/resume/destroy/diagnostics semantics. Runtime quotas are enforced outside untrusted game code.

D100K: hash/signature mismatch, save corruption, forbidden network, filesystem escape, memory/CPU/entity/time overrun, deterministic restart, crash, worker loss and mobile/desktop runtime.



# D100K — EXPLICIT RUNTIME RESOURCE RESTORATION

Simulation frequency is configurable within the GameSpecification/runtime resource profile. Every reusable runtime primitive has a stable interface, direct tests and a documented reuse justification. Save data is namespaced by player/game/package version and falls back to the last valid snapshot after corruption.

D100K: frequency overrun, resource enforcement, corrupted save, primitive contract regression and sandbox escape.

---

# SOURCE TECHNIQUE 14 — docs/moirise/modules/M10-social-gaming/TECHNICAL_DESIGN.md

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

---

# SOURCE TECHNIQUE 15 — docs/moirise/modules/M11-communities/TECHNICAL_DESIGN.md

# M11 — COMMUNITIES / GUILDS — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. Core schemas
Community {id, ownerId, name, description, visibility, status, ruleSetVersion, createdAt, version}
Membership {communityId, playerId, role, status, joinedAt, version}
Invitation {id, communityId, inviterId, targetId, scope, expiresAt, status, tokenHash}

## 2. Create transaction
Validate fields → insert Community → insert OWNER Membership → commit → emit. Unique constraint protects owner membership. Failure of any required write rolls back the transaction.

## 3. Membership authorization
Every read/write first resolves current Membership status and role. Client-provided role/community owner values are ignored as authority.

## 4. Invitation security
Tokens are scoped, expiring and revocable. Acceptance rechecks community state, target block state and invitation status before creating membership.

## 5. Role transition
Allowed transitions are expressed by role hierarchy and explicit operations. Last-owner protection is evaluated inside the transaction to avoid race conditions.

## 6. AI proposal boundary
CommunityProposal is a separate non-authoritative entity. M15 can write the proposal through a capability, but actual Community/Membership creation always passes through M11's normal command and policy path.

## 7. Failure/recovery
Duplicate join → current membership.
Expired invite → no mutation.
Concurrent role change → optimistic conflict.
Group closed during join → reject.
Network loss after creation → commandId lookup.

## 8. Security
IDOR tests on community/member IDs; role escalation tests; private group leakage tests; token replay tests; no sensitive-attribute clustering.

## 9. Observability
communityId, commandId, membership mutation, role transition, invitation state, policy outcome. Avoid logging private community message content here; M03 owns it.

## 10. Browser tests
Public/private create, join/leave, invite accept/reject, role management, closure, mobile and desktop.

## 11. DONE
Membership and role authority exists only once, is enforced server-side, and AI-assisted discovery cannot bypass it.

## AI MODULE CONTRACT — M11

CommunityProposal = { proposalId, sourceRefs, creatorRef, nameCandidate, descriptionCandidate, topicTags, audience, policyClass, expiresAt, status }.
MembershipCommand est la seule porte de création/join/leave/role-change.
AI result = proposal/evidence; never MembershipState.
Validation = actor → community policy → block/privacy → membership version → business rule → commit → event.
Tests : role escalation denied, blocked user denied, private context excluded, stale version conflict, duplicate join idempotency, owner-safety, AI unavailable.

# D10 — M11 COMMUNITIES — CONCEPTION TECHNIQUE
## Community
`Community={communityId,ownerId,visibility,state,settingsVersion,createdAt}`.
## Membership
`Membership={communityId,playerId,role,status,version,joinedAt,leftAt?}` with unique (communityId,playerId).
## Creation transaction
validate → policy → create community → owner membership → settings → event → projection. Any failure rolls back all creation parts.
## AI proposal
AffinityProposal → policy → M11 decision → commit. No provider can insert membership.
## Invite
Invite record has inviter, target, scope, expiry, status and dedupeKey. Block/mute/privacy enforced before sending.
## Tests
concurrent create, duplicate membership, unauthorized role change, invite abuse, private community leakage, deleted creator, AI outage.

# D100K — M11 Communities / Guilds — FABRICATION / CONTRACT / EVIDENCE LAYER

## 1. Task record
TASK_ID → FEATURE_ID → FILES → SYMBOLS → INPUT/OUTPUT → AUTHORITY → MUTATIONS → EVENTS → DEPENDENCIES → TESTS → BROWSER → EXPECTED → ACTUAL → EVIDENCE → STATUS.

## 2. File/function contract
Each implementation file and non-trivial symbol must specify path, owner M11, inputs/outputs, authoritative state, side effects, idempotency, concurrency/version policy, errors, telemetry and direct tests.

## 3. M11 adversarial focus
Test the module-specific invariant above, plus replay, forged references, authorization bypass, stale state, duplicate commands, race conditions, malformed upstream data, partial network failure and privacy leakage.

## 4. Evidence contract
Evidence must reference exact commit + exact command/scenario + expected + actual + environment. Old evidence never certifies a new commit.

## 5. Ownership firewall
No task owned by M11 may silently take authority from another module. Cross-module effects are use-case/event/projection handoffs.

## 6. Production lock
Tests passing without applicable browser/mobile/security/resilience/production proof leave the task non-VERIFIED.
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M11 COMMUNITIES
## Owner scope
M11 owns membership/role/community state. Community context is separate from personal memory.
## Isolation
A community member's private memory never becomes community memory merely because a group exists. Shared memory requires explicit group scope and visibility.
## D100K tests
Role boundary, private fact leakage, group deletion, membership removal, invitation, shared-memory consent, cross-community isolation.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M11
## RF-M11-01 Collaborative creation space
Community creation can host puzzles, stories, media, games, events or shared challenges. Every artifact keeps creator/contributor lineage.
## RF-M11-02 Distributed community secrets
A secret can require independent contribution(s); state is authoritative and auditable. No fabricated clue or completion counter.
## RF-M11-03 Collective legends/history
A legend is generated only from validated community Moments/Relays/Events. Contributors can inspect lineage according to visibility.
## RF-M11-04 Community intelligence
AI may propose formation/organization, but membership, roles and permissions remain M11 authoritative.



# D100K — RESTORED COMMUNITIES TECHNICAL CONTRACTS

`Community={id,name,description,visibility:'public'|'private',ownerId,createdAt}`
`Membership={communityId,userId,role:'owner'|'admin'|'moderator'|'member',status:'active'|'pending'|'banned'}`
`ModerationEvent={id,communityId,actorId,action,targetId,createdAt}`

Role/membership mutations are server-authorized. Moderation records actor, target, reason, timestamp and rule/version. Community-private objects never become public through AI or client-side projection.

D100K: forged role change, banned access, duplicate invite/join, moderation audit, stale membership, privacy propagation and owner transfer.



# D100K — RESTORED COMMUNITY SECRET / MEDIA TECHNICAL CONTRACT

A distributed community secret stores contributionRefs and completion conditions without exposing private source material. Collaborative media uses contributorRef, sourceRef, version and permission policy for every derivative.

D100K: contribution spoofing, duplicate contribution, private-data leakage, attribution loss, permission revocation and community deletion.



# D100K — EXPLICIT COMMUNITY SCHEMA RESTORATION

Canonical persistence entities represented by the owner are:
`communities`, `community_members`, `community_roles`, `community_posts`, `community_moderation_events`, `community_invites`.

They remain one ownership domain; alternative parallel community tables are forbidden.

D100K: schema/role consistency, moderation event audit, private-community isolation and invite idempotency.

---

# SOURCE TECHNIQUE 16 — docs/moirise/modules/M12-events/TECHNICAL_DESIGN.md

# M12 — EVENTS — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. Event schema
Event {id, ownerId, visibility, status, timezone, startAt, endAt, ruleVersion, version}
EventRegistration unique(eventId, playerId).
ContinuationRef unique(eventId, recipientId, continuationType) where applicable.

## 2. Scheduler
Use trusted server time. Transition uses compare-and-set on state/version. If two scheduler workers run simultaneously, only one commits the transition; the other reads the new state and exits.

## 3. Tournament
BracketVersion immutable after LOCKED. Match result points to an authoritative result ref. No client score becomes final merely by being displayed.

## 4. Notification contract
NotificationDelivery {eventId, recipientId, type, scheduledAt, status, dedupeKey}. Delivery failure does not modify Event state.

## 5. Failure/recovery
Scheduler down → state remains truthful; recovery job catches missed transitions. Duplicate registration → existing row. Event cancelled → future continuation invalidated. Network loss after registration → commandId lookup.

## 6. Security
Organizer permissions checked server-side. Participant privacy is minimized. Event content cannot inject arbitrary AI instructions or provider URLs.

## 7. Observability
eventId, version, transition, schedulerRef, registration count, notification outcome and error code. No unnecessary private participant data.

## 8. Browser/tests
Timezone views, register/unregister, cancelled event, scheduler retry, tournament rounds, notification quiet hours, mobile/desktop.

## 9. DONE
Future state is factual, transitions are time/version guarded, duplicate schedules are safe, and no notification fabricates an event.

## AI MODULE CONTRACT — M12

EventAIContext = { eventRef, lifecycleState, organizerPermissionProjection, participantScope, locale, scheduleWindow, approvedContentRefs }.
EventProposal = { fieldChanges, evidenceRefs, confidence, requestedAutonomy, expiresAt }.
M12 validates lifecycle, organizer authority, participant scope, version and conflicts before commit.
Event content never becomes trusted tool instruction. Tests cover unauthorized organizer mutation, participant leakage, injected provider URL, stale proposal, duplicate notification, AI outage.

# D10 — M12 EVENTS — CONCEPTION TECHNIQUE
## EventState
`Event={eventId,ownerRef,startAt,endAt,status,timezone,eligibilityVersion,visibility,version}`.
## Registration
`EventRegistration={eventId,playerId,status,registeredAt,sourceRef?}`. Unique event/player.
## Reminder
Reminder job derives from real EventState, recalculates after update/cancel, and never schedules a reminder for already completed/cancelled state.
## AI proposal
EventContentProposal contains factual fields + creative fields separately; only safe factual fields are trusted automatically.
## Results
Results are immutable facts after owner commit; recap projections may include validated media links.
## Tests
timezone boundary, duplicate registration, cancellation, reminder race, stale projection, unauthorized access, AI-generated factual hallucination.

# D100K — M12 EVENTS — FABRICATION / EVIDENCE

Every M12 task resolves to TASK_ID → FEATURE_ID → FILE/SYMBOL → state machine → persistence authority → events → consumers → tests → browser scenarios → evidence.

Function contracts specify exact input/output, guards, state mutation, idempotency, versioning, failure/recovery and observability. Schedule and lifecycle operations must remain replay-safe.

Evidence = commit + exact check/scenario + expected + actual + environment + status. Unit tests alone do not produce VERIFIED.

Ownership firewall: M12 owns event lifecycle state; consumers use contracts/events/projections and do not write M12 private state directly.
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M12 EVENTS
## Owner scope
M12 owns real temporal event state, reminders and seasons.
## Temporal semantics
Every event-related memory carries valid_from/valid_until or a version. Expired events must not be recalled as future obligations.
## D100K tests
Timezone boundary, expired event, cancellation, reschedule, duplicate reminder, return-after-absence, stale cache, deterministic no-AI reminder path.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M12
## RF-M12-01 Seasons
Season has version, startAt, endAt, rulesVersion, eligible activities and state. Season boundaries are authoritative and timezone-aware.
## RF-M12-02 Low-population World Events
Events remain meaningful at low population through solo/asynchronous participation. Population is never faked.
## RF-M12-03 Return-after-absence continuation
Resume offers a real event/state change since last observed checkpoint; otherwise it offers ordinary continuation without claiming hidden changes.
## RF-M12-04 Living Object→Event
Only validated object mutations can schedule an event. Scheduling is idempotent and cancellable.



# D100K — RESTORED EVENTS TECHNICAL CONTRACTS

`Event={id,title,startsAt,endsAt,status:'draft'|'scheduled'|'live'|'completed'|'cancelled'|'expired'|'archived',creatorId,visibility:'public'|'community'|'private',rulesHash}`
`Participation={eventId,userId,status:'joined'|'withdrawn'|'completed',idempotencyKey}`

Operations: createEvent, updateEventDraft, publishEvent, joinEvent, withdrawEvent, cancelEvent, completeEvent, listUpcomingEvents.

Persist UTC timestamps; timezone affects presentation only. Recurring events use explicit occurrence IDs. Reminder jobs are keyed by event/user/occurrence/channel. AI is advisory until an authorized publish action.

D100K: DST/timezone boundaries, recurring occurrence, duplicate join/withdraw, stale client lifecycle, reminder retry, cancellation, community authorization and server outage.

---

# SOURCE TECHNIQUE 17 — docs/moirise/modules/M13-adaptive/TECHNICAL_DESIGN.md

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
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M13 ADAPTIVE RETRIEVAL
## Owner scope
M13 owns retrieval/adaptation/convergence; it never changes authoritative Player facts.
## Retrieval algorithm
Use structured filters first, semantic retrieval second, then relevance × recency × authority × taskFit × privacyEligibility. Exclude SUPERSEDED/DELETED/EXPIRED facts.
## Conflict handling
Return conflicts explicitly to M15 rather than selecting an arbitrary value when policy requires confirmation.
## D100K tests
Recall hierarchy, correction, stale vector entry, deleted fact, conflicting facts, low-confidence extraction, privacy filter, multilingual retrieval, cache poisoning.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M13
## RF-M13-01 Evolution Engine
M13 consumes permitted signals and produces candidate contextual changes. Every rule has version, objective and validation strategy.
## RF-M13-02 Convergence
Convergence detects compatible validated signals across domains and proposes a bounded experiment. It does not invent relationships without evidence.
## RF-M13-03 World Memory
World Memory stores/retrieves validated world facts with temporal validity and scope. Expired/superseded facts are excluded.
## RF-M13-04 Emergent Experience Engine
Patterns such as What-If, Hidden Rule, Mutation, Role Inversion or Player Laboratory must be tied to real context and a declared experiment/entertainment objective.
## RF-M13-05 Missions From Reality
A mission can reference a real validated player action/event and expose a reversible next action. No false claim about external reality.



# D100K — RESTORED ADAPTIVE WORLD TECHNICAL CONTRACTS

`AdaptationCandidate={id,target,changes,reasonRefs[],createdBy,version}`
`AdaptationDecision={candidateId,status:'rejected'|'approved'|'canary'|'active'|'rolled_back',baseline,metrics,rollbackThreshold}`

Only aggregate authorized signals enter adaptation. Immutable version metadata protects historical measurement. Low-sample, poisoned, stale, conflicting or unauthorized candidates are rejected. Canary regression invokes rollback to the previous known-safe version.

D100K: source provenance, low-sample gate, data poisoning, stale version, canary regression, unauthorized activation, rollback and rollback recovery.



# D100K — RESTORED ADAPTIVE RETENTION TECHNICAL CONTRACT

World branches, hidden routes, evolving puzzles and deterministic remix candidates use immutable versioned state with source-event references, visibility, owner scope and rollback reference. AI is optional; deterministic rules provide the degraded path.

D100K: aggregate-signal provenance, low-sample gate, poisoned signal, branch conflict, stale version, rollback and no-AI execution evidence.



# D100K — EXPLICIT ADAPTIVE OBSERVATION RESTORATION

The aggregate observation model explicitly excludes sensitive raw data. Historical metrics are immutable for audit; rollback restores the previous known-safe version. Provider disagreement, stale signals and low-sample observations are policy inputs, not reasons to silently mutate behavior.

D100K: observation minimization, sample threshold, version conflict, rollback and audit immutability.

---

# SOURCE TECHNIQUE 18 — docs/moirise/modules/M14-collection-reward/TECHNICAL_DESIGN.md

# M14 — COLLECTION / REWARD ECONOMY — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. Ledger schema
RewardLedgerEntry {id, playerId, sourceEventId, rewardRuleVersion, itemId?, quantity, reasonKey, createdAt, status}.
Unique: sourceEventId + rewardRuleVersion + rewardSlot where required.
Ledger is immutable after COMMITTED; corrections are compensating entries.

## 2. Roulette schema
RouletteConfig {version, pullsPerDay:3, common:0.50, rare:0.30, epic:0.13, legendary:0.05, mythic:0.02}.
RoulettePull {id, playerId, configVersion, commandId, reservedAt, outcome?, status}.
RNG result is recorded before reward grant commit. Same commandId returns same pull.

## 3. Title grammar
TitleDefinitionRule {version, grammarId, prefixSetRef, coreSetRef, suffixSetRef, constraints}. Unlock identity can be deterministic from player evidence + rule version. Only earned title rows are materialized.

## 4. Reconciliation
Read ledger → rebuild expected projections → compare counts/quantities → emit mismatch report. If mismatch affects money-like integrity, freeze only the affected grant path until corrected.

## 5. Security
No client-side grant, no model-generated outcome, no editable ledger, no negative quantity unless an explicit revocation rule exists, no direct admin mutation from Player UI.

## 6. Failure/recovery
Allowance reservation succeeds then network fails → query pull by commandId. RNG failure before outcome commit → mark FAILED and do not consume allowance. Duplicate source event → existing ledger entry.

## 7. Observability
rewardRuleVersion, sourceEventId, ledgerId, roulettePullId, rarity, quantity, validation code. Avoid raw private content.

## 8. Tests
Odds configuration, daily reset/time boundary, concurrent pulls, duplicate grants, title grammar determinism, rollback/compensation, reconciliation mismatch, mobile/desktop.

## 9. DONE
Every reward has a traceable source/rule, roulette is replay-safe, and collection state can be rebuilt from authoritative ledger data.

## AI MODULE CONTRACT — M14

EconomyAIContext = { playerCollectionProjection, validatedEntitlements, rewardDefinitionVersion, rouletteConfigVersion, boundedHistory, privacyClass }.
RewardProposal is non-authoritative.
Roulette authority = M14 configuration, selection algorithm, pull ledger, daily-limit policy.
Commit = evidence validation → entitlement → reward transaction → event → projection.
Tests : AI cannot mint/grant/roll; duplicate pull; version mismatch; invalid reward reference; replay safety; economic invariants.

# D10 — M14 COLLECTION / REWARD — CONCEPTION TECHNIQUE
## RewardGrant
`RewardGrant={grantId,playerId,rewardId,sourceEvent,reason,ledgerVersion,createdAt}` unique by sourceEvent+reward target where appropriate.
## RouletteDraw
`RouletteDraw={drawId,playerId,configVersion,seedCommit?,outcomeTier,outcomeRef,createdAt}` with server-authoritative outcome and idempotency.
## Share projection
RewardShareProjection contains rewardRef, display fields, privacy-safe metadata and M01 share token reference.
## AI boundary
Analysis proposal → M14 rules → optional config change through governed admin process. Model output can never directly write ledger.
## Audit
Every grant/draw/config version is traceable. No silent probability changes.
## Tests
double grant, replayed draw, quota edge, config version migration, forged reward claim, private collection share, provider outage.

# D100K — M14 Collection / Reward — FABRICATION / EVIDENCE

Every task resolves to TASK_ID → FEATURE_ID → FILE/SYMBOL → dependency order → exact contract → authoritative state → validation → tests → browser scenarios → evidence → status.

File contracts specify exact path, owner M14, symbols, allowed authorities, forbidden writes, persistence/event side effects and direct tests. Function contracts specify types, preconditions, state access, idempotency, concurrency, errors and observability.

Adversarial proof must include replay, duplicate command, stale state, unauthorized access, malformed upstream/AI output, dependency failure and privacy leakage where applicable.

Evidence is fresh only when tied to the exact commit and exact scenario/check. Unit tests cannot alone certify a user-facing or production-sensitive feature.

Ownership firewall: M14 may consume other modules through contracts, events or projections, but may not assume their private authority.
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M14 COLLECTION/REWARD
## Owner scope
M14 owns reward/collection ledgers. Context can explain or select an eligible experience, never mint rewards.
## Integrity
Reward eligibility must reference authoritative Player/Play/Event evidence. AI context is advisory.
## D100K tests
Duplicate grant, context-only reward attempt, rollback, ledger reconciliation, deleted profile, stale eligibility, provider outage.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M14
## RF-M14-01 Experience Economy
Value events derive from real contribution, completion, replay, collaboration or validated reuse. No raw-time reward by itself.
## RF-M14-02 Creator Economy eligibility
Eligibility stages are configurable, auditable and independent from AI preference. Stage changes require measurable evidence and anti-manipulation checks.
## RF-M14-03 Transparent rarity/collection
Rarity tables are versioned and deterministic/auditable. No hidden odds changes or fake scarcity.
## RF-M14-04 Creator value bridge
Contribution chains resolve from source → transformation → reuse → audience participation. Rewards are ledger entries, never AI text.
## RF-M14-05 Reward safety
All grants require an authoritative source event and are idempotent/reconcilable.



# D100K — RESTORED COLLECTION/REWARD TECHNICAL CONTRACTS

`Item={id,definitionId,ownerId,quantity,acquiredAt}`
`EquipState={playerId,slot,itemId,updatedAt}`
`RewardGrant={id,playerId,source,sourceId,ruleVersion,itemDefinitionIds[],idempotencyKey}`

Item definitions and rarity/reward rules are immutable/versioned. Reward transactions carry source/provenance/rule-version evidence. Client cannot mint items, change quantity or manipulate rarity. Canonical reward sequence:
validated source → eligibility → rule → transaction → inventory → history → notification.

D100K: duplicate grant, client mint attempt, quantity/rarity manipulation, stale rule, transaction rollback, provider outage and notification failure.



# D100K — RESTORED RARE OBJECT TECHNICAL CONTRACT

Rare-object status is derived only from authoritative immutable definitions and reward rules. Public collection cards contain verified ownership/acquisition data only.

D100K: rarity spoofing, client mint, stale definition, duplicate grant, provider outage and source-event deletion.



# D100K — EXPLICIT COLLECTION RULE RESTORATION

Collection item definitions and rarity/reward rules are immutable/versioned. Source event, source ID, rule version, provenance and timestamp are mandatory reward evidence. Provider imagery is non-authoritative and has deterministic/degraded fallback.

D100K: client mint prevention, rarity tampering, duplicate reward, provider outage and source-event revocation.



# D100K — RESTORED ECONOMY / AUDIT TECHNICAL CONTRACT

`RewardDefinition={id,code,rewardType,ruleVersion,metadata,active,createdAt}`
`EconomyLedger={id,playerId,sourceEventId?,assetType,amount,direction:'credit'|'debit',ruleVersion,idempotencyKey,status,createdAt}`
`AuditEvent={id,actorId?,action,resourceType,resourceId?,result,correlationId?,metadata,createdAt}`.

Audit events are append-oriented evidence, not editable business truth. Reward and ledger writes are server-authorized and transactionally linked to source evidence.

If advertising capability exists, `ad.impression.recorded` is analytics/telemetry only; it cannot alter reward/ledger state unless an explicit validated reward rule exists.

---

# SOURCE TECHNIQUE 19 — docs/moirise/modules/M15-meta-ai-lab/TECHNICAL_DESIGN.md

# M15 — META SYSTEM + MORISE AI LAB — CONCEPTION TECHNIQUE

## 0. Autorité documentaire

Ce fichier décrit uniquement les contrats techniques spécifiques au module M15 :
- boundary d'entrée/sortie ;
- intégration avec les modules ;
- AI Lab ;
- projections SYSTEM ;
- orchestration des use-cases M15.

La fabrication des mécanismes centraux de MORISE AI est définie une seule fois dans :
docs/moirise/ai/AI_TECHNICAL_DESIGN.md

Ne pas recréer ici :
- Request Gate ;
- Actor Resolver ;
- Context Engine ;
- Intent Compiler ;
- Requirements Compiler ;
- Planner ;
- Policy Engine ;
- Capability Registry ;
- Tool Registry ;
- Provider Router ;
- Validation Engine ;
- Memory Service ;
- Evolution Engine.

## 1. Interface M15

M15 reçoit une AIRequest conforme au contrat central.

Le module caller fournit :
- sourceModule ;
- intent ;
- inputRefs ;
- constraints ;
- requested output ;
- requested autonomy.

Le serveur fournit :
- actorId ;
- permissions ;
- requestId ;
- traceId.

Le provider n'est jamais une entrée du module caller.

## 2. Use-case boundary

Use-cases M15 typiques :
- runAIRequest ;
- createTaskGraph ;
- createCreativeArtifact ;
- createGameSpecification ;
- analyzeWorldSignal ;
- proposeConvergence ;
- proposeMission ;
- proposeWorldMemoryCandidate ;
- createImprovementCandidate.

Chaque use-case appelle les services centraux AI et ne réimplémente pas leurs algorithmes.

## 3. Projection SYSTEM

Le frontend peut recevoir une projection M15 :
- request status ;
- task progress ;
- proposal ;
- artifact ref ;
- validation result ;
- degraded state.

La projection ne doit pas exposer :
- provider secrets ;
- internal prompt ;
- raw private context ;
- admin diagnostics ;
- hidden policy rules.

## 4. AI Lab boundary

Entrée :
ImprovementCandidate.

Le Lab crée :
- candidate workspace ;
- candidate branch ;
- build/test artifacts ;
- benchmark result ;
- canary proposal.

Sortie :
- PROMOTE_CANDIDATE ;
- REJECT_CANDIDATE ;
- ROLLBACK_CANDIDATE.

La promotion réelle suit le pipeline central d'évolution.

## 5. M15 → M08

M15 fournit :
- GameRequirements ;
- GameSpecification ;
- TaskGraph reference.

M08 fournit :
- factory result ;
- build artifact ;
- package refs ;
- publish proposal.

M15 ne déclare pas le jeu publié.

## 6. M15 → M09

M15 peut produire :
- engine configuration candidate ;
- generated content;
- runtime test candidate.

M09 reste propriétaire du runtime.

## 7. M15 → M05

M15 peut fournir :
- validated progression signal ;
- title proposal ;
- mission proposal ;
- SYSTEM presentation proposal.

M05 valide et committe les mutations de progression.

## 8. M15 → M11

M15 peut fournir :
- affinity candidate ;
- convergence candidate ;
- community proposal.

M11 décide :
- création ;
- membership ;
- roles ;
- visibility.

## 9. M15 → M12

M15 peut produire :
- event concept ;
- content proposal ;
- personalization proposal.

M12 reste owner de :
- schedule ;
- eligibility ;
- registration ;
- state ;
- results.

## 10. M15 → M14

M15 peut analyser :
- reward economy;
- collection patterns;
- title patterns;
- balance signals.

M14 reste owner :
- ledger ;
- reward grant ;
- roulette outcome ;
- title unlock.

## 11. Supabase boundary

M15 ne doit pas contourner les tables propriétaires des autres modules.

Pour un module externe :
1. M15 produit une proposition ;
2. proposition transmise au module owner ;
3. owner valide ;
4. owner committe ;
5. event publié ;
6. M15 reçoit le résultat validé.

## 12. API boundary

Endpoint central :
POST /api/ai

Task projection :
GET /api/ai/tasks/:taskId

Provider health :
GET /api/ai/providers/health

Capability projection :
GET /api/ai/capabilities

M15 ne crée pas un deuxième endpoint par provider.

## 13. Security boundary

M15 ne possède aucun secret client-side.

M15 ne peut pas :
- modifier RLS ;
- créer un admin ;
- accéder au service role depuis un model output ;
- exécuter arbitrary shell ;
- écrire arbitrary files ;
- appeler arbitrary URLs.

## 14. DONE

M15 technique est DONE lorsqu'il :
- expose les use-cases M15 ;
- consomme le cerveau AI central ;
- respecte les owners ;
- expose des projections sécurisées ;
- isole AI Lab ;
- n'introduit aucune deuxième implémentation des mécanismes centraux.

## AI MODULE CONTRACT — M15

Canonical components = RequestGate, ContextEngine, IntentCompiler, RequirementsCompiler, Reasoner, Planner, PolicyEngine, CapabilityRegistry, ToolRegistry, ProviderRouter, ResourcePlanner, ValidationEngine, MemoryService, ExperienceService, EvolutionPipeline.
Module cognition input = moduleId, owner, capabilities, schemas, event contracts, context scopes, dependencies, authority boundaries.
Execution = REQUEST → ACTOR → CONTEXT → INTENT → REQUIREMENTS → PLAN → POLICY → RESERVE → EXECUTE → VALIDATE → OWNER COMMIT → EVENT → MEMORY → EVALUATE.
Evolution candidates are isolated; benchmark baseline is mandatory; security/policy before canary; promotion reversible.
Tests : single-brain invariant, forbidden cross-owner write, context leakage, provider invalid output, capability mismatch, planner cycle, memory scope violation, failed canary rollback.

## GAME PLATFORM — INTERFACE TECHNIQUE M15

### GameCreationGraph
GameCreationGraph = requestRef + gameRequirementsRef + gameSpecificationRef + taskGraphId + selectedComponents[] + runtimeTarget + resourcePlan + validatorRefs[] + repairBudget + autonomy + status.

### Capability families
GAME_SPECIFICATION, GAME_TEMPLATE_RESOLUTION, GAME_CODE_GENERATION, GAME_ASSET_GENERATION, GAME_AUDIO_GENERATION, GAME_TEST_GENERATION, GAME_BUILD, GAME_STATIC_VALIDATION, GAME_SECURITY_VALIDATION, GAME_RESOURCE_VALIDATION, GAME_RUNTIME_VALIDATION, GAME_REPAIR, GAME_INTEGRATION.

### Orchestration rule
M15 peut planifier et exécuter ces capabilities. Les commits restent chez M08, M09, M06 et autres owners selon la phase.

### Agent adapter
Un agent comme Codex est résolu comme execution target spécialisée. Contract : workspaceRef + taskNode + toolAllowlist + resourceProfile + deadline + outputRefs. Son output reste candidate artifact.

### Game repair loop
M15 ne corrige pas en boucle sans borne. Chaque cycle exige diagnosticRef, hypothesis, candidateRevision, impactedTests, attemptNumber et maxAttempts. Même échec répété = oscillation/escalade.

### Provider/agent independence
Ni Codex ni un provider de code/image/audio ne devient le moteur de décision de MORISE. Leur sortie entre dans le même pipeline validation → owner commit.

### Final orchestration test
Une demande de jeu 2D et une demande de jeu 3D doivent traverser le même orchestrateur, différer seulement par les exigences/runtime capabilities pertinentes, puis aboutir à des artifacts et manifests validés avant intégration.

## GAME FABRICATION MEMORY — M15

M15 consulte le MemoryService central pour retrouver les connaissances GAME_* validées avant une fabrication et pour enregistrer les nouvelles connaissances après validation. Le cycle est : retrieval → fabrication → validation → observation → candidate → benchmark/policy → promotion ou rejet.

Une connaissance de fabrication doit conserver ses conditions d'application, preuves, compatibilité 2D/3D, version runtime, utilité, confiance, statut et références d'artifacts/tests. Les échecs et réparations sont versionnés ; une réparation échouée n'est jamais proposée comme recette validée.

Les outils de développement sont des cibles d'exécution interchangeables. Leur utilisation enrichit l'expérience, mais la connaissance appartient à MORISE et reste disponible indépendamment de cet outil.

## CREATIVE MEDIA TECHNICAL ORCHESTRATION

Canonical cross-module contract = `docs/moirise/CREATIVE_MEDIA_VIRALITY_TECHNICAL_DESIGN.md`.

### MediaAnalysisTask
```ts
MediaAnalysisTask = {
  mediaRef,
  actorRef,
  purpose,
  privacyClass,
  permissionState,
  sourceOwnershipClass,
  requiredCapabilities,
  retention,
  outputScope,
  status
}
```

### GenerationTask
```ts
GenerationTask = {
  creativeBriefRef,
  sourceRefs,
  transformationClass,
  capabilityId,
  providerPolicy,
  originalityPolicy,
  validatorRefs,
  outputScope,
  status
}
```

### Mandatory pipeline
`REQUEST → PERMISSION → PROVENANCE → ANALYZE → SEMANTIC PROFILE → TRANSFORM → CREATIVE BRIEF → ROUTE → GENERATE → VALIDATE → ORIGINALITY CHECK → ARTIFACT CANDIDATE → OWNER COMMIT`.

### Modality behavior
IMAGE uses vision → semantic composition → image generation. VIDEO uses frame/scene/motion/audio analysis → storyboard → video generation/editing. MUSIC uses audio feature analysis → new musical brief → music generation → audio validation. AUDIO uses waveform/speech/environment features → new audio artifact where permitted.

### Copyright-risk boundary
The system must not implement a “rename words/notes to escape copyright” routine. The safe technical abstraction is semantic transformation + new expression + provenance + validation. Rights uncertainty produces INCONCLUSIVE, not automatic publication.

### Provider independence
A media request never contains a provider URL chosen by the client. The Capability Registry resolves the capability; Provider Router applies hard filters; adapter executes; Validator evaluates; M15 decides next action; owner commits publication.

## VIRALITY TECHNICAL ORCHESTRATION

### ShareOpportunity
```ts
ShareOpportunity = {
  sourceEventRef,
  contentRef,
  audienceCandidates,
  reasonKey,
  cooldownKey,
  privacyClass,
  expiresAt
}
```

### Recommendation loop
M07 owns ranking. M15 can generate features/proposals but cannot bypass M07 policy. `reasonKey` is enumerated and privacy-safe.

### First-session task graph
The SYSTEM can create a bounded graph that chooses one relevant discovery, one low-friction interaction, one creative/playable action and one optional social connection. It must terminate when the user disengages.

### Tests
Private media never enters public context; source permission revoked invalidates generation; malformed provider output rejected; originality inconclusive cannot publish; share cooldown enforced; recommendation reason never leaks hidden sensitive signals; AI outage leaves social/feed functions usable.

# D10 — M15 META SYSTEM + MORISE AI LAB — CONCEPTION TECHNIQUE
## ModuleManifest
`ModuleManifest={moduleId,owner,capabilities,schemas,events,dependencies,contextScopes,authorityBoundaries,validators,autonomyMax,version}`.
## Request pipeline
REQUEST → ACTOR → CONTEXT → INTENT → REQUIREMENTS → PLAN → POLICY → RESERVE → EXECUTE → VALIDATE → OWNER COMMIT → EVENT → MEMORY → EVALUATE.
## TaskGraph node
`TaskNode={taskId,graphId,capabilityId,version,dependencies,inputRefs,outputRefs,resourceProfile,validatorId,idempotencyKey,timeout,retryPolicy,state,lease?}`.
## Media pipeline
MediaRef → MediaAnalysis → ConceptAbstraction → CreativeBrief → GenerationTask → Validation → ArtifactRef → OwnerCommit.
## Provider adapter
ProviderAdapter = capabilityVersion + requestSchema + responseSchema + authMode + healthProbe + privacyClass + resourceProfile + validator.
## Output validation
Every provider result is VALID/INVALID/DEGRADED/INCONCLUSIVE before becoming evidence. INCONCLUSIVE cannot promote memory or publish sensitive content.
## Memory
MemoryRecord carries scope, provenance, confidence, utility, evidenceRefs, validationStatus, policyVersion and expiry. Private DM content is not global memory by default.
## Agent boundary
Agent output is candidate artifact. Workspace allowlist, resource profile, deadline and filesystem/network restrictions are mandatory.
## Evolution
Candidate changes are isolated, compared to baseline, tested for regression/security/policy, canaried and reversible.
## Failure control
Dependency failure selects degraded/fallback route. Oscillation uses failure fingerprints and maxAttempts. No unbounded auto-repair.
## Tests
single-brain invariant, cross-owner write denied, privacy-scope violation, provider invalid output, task graph cycle, memory promotion abuse, agent prompt injection, rollback.

# D100K — M15 Meta System / MORISE AI Lab — FABRICATION / EVIDENCE

Every task resolves to TASK_ID → FEATURE_ID → FILE/SYMBOL → dependency order → exact contract → authoritative state → validation → tests → browser scenarios → evidence → status.

File contracts specify exact path, owner M15, symbols, allowed authorities, forbidden writes, persistence/event side effects and direct tests. Function contracts specify types, preconditions, state access, idempotency, concurrency, errors and observability.

Adversarial proof must include replay, duplicate command, stale state, unauthorized access, malformed upstream/AI output, dependency failure and privacy leakage where applicable.

Evidence is fresh only when tied to the exact commit and exact scenario/check. Unit tests cannot alone certify a user-facing or production-sensitive feature.

Ownership firewall: M15 may consume other modules through contracts, events or projections, but may not assume their private authority.
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M15 META AI LAB
## Owner scope
M15 owns parsing orchestration, ContextPacket construction, provider routing and AI proposals. It is not the ultimate owner of Player/World/Reward mutations.
## Required pipeline
OBSERVE → EXTRACT → RESOLVE → CLASSIFY → POLICY → RETRIEVE → PLAN → PROPOSE → OWNER VALIDATE → COMMIT → EVENT → EVALUATE.
## Structured memory
Never rely on a single free-text summary. Provide field-level facts, relations, provenance, confidence, temporal scope, sensitivity and conflicts.
## Hierarchical comprehension
When a user gives progressively finer details, append/enrich the graph at the correct node. Example: country then city then street then building then unit; each remains independently addressable.
## Sensitive data
M15 must redact exact location and other sensitive fields unless the current capability is explicitly authorized to use them. It must never infer protected traits from appearance/media.
## Correction
User correction produces ContextCorrection and supersedes the target fact according to policy; every downstream cache is invalidated.
## Provider boundary
Providers receive a task-scoped ContextPacket after privacy filtering. Provider responses are untrusted candidates and cannot mutate Player memory directly.
## D100K tests
Multi-turn enrichment, language switch, coreference, correction, conflict, sensitive-field redaction, provider injection, tool-call leakage, memory deletion, degraded mode, deterministic parser fallback.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M15
## RF-M15-01 First-session orchestration
M15 creates the task graph for First Contact/post-contact curiosity but M05/M04/M06 own their mutations.
## RF-M15-02 Creation Runtime + tools + world agents
Capability registry exposes typed tools. Agent execution has max autonomy, context class, validator, timeout, budget and rollback.
## RF-M15-03 On-device / zero-API routing
Route local/on-device first, then cache, trusted worker, opted-in community worker, verified client-side provider, key provider, explicit paid provider, degraded. Provider is never the brain.
## RF-M15-04 Collective intelligence
Aggregate only permitted shared signals. No private memory leakage into collective models.
## RF-M15-05 Creator Economy orchestration
AI may evaluate evidence and propose eligibility; M14 commits economic state.
## RF-M15-06 Owner/Admin control center
Administrative actions require explicit privileged actor, audit event, policy check and safe rollback where applicable. AI never grants itself admin authority.
## RF-M15-07 Self-evolution
Observe gap→hypothesis→candidate→static checks→sandbox→tests→benchmark→security/policy→canary→promote/reject→monitor→rollback. Production self-modification without gates is prohibited.




# HISTORICAL FUSION — M15 AI LAB — TECHNICAL DESIGN

## ResourceEngine

`ResourceProfile` doit représenter CPU, RAM, GPU/VRAM, storage, network, concurrency, timeout et locality. La réservation précède l'exécution lorsqu'une tâche est lourde ou distribuée.

## WorkerRegistry / Scheduler

`WorkerDescriptor` : workerId, version, status, trustState, capabilities, hardware, availableResources, maxConcurrency, heartbeat.

`WorkerJob` : jobId, capability, payloadRef/hash, privacy/inputPolicy, resourceQuota, timeout, permissions, outputSchema, idempotency/signature.

Sélection :
capability → policy/trust → resource fit → health → quota → locality → queue/concurrency → optimization.

Lease expiration permet le ré-assignement uniquement des tâches sûres/idempotentes.

## EvolutionCandidate

`EvolutionCandidate` contient baseline/proposed version, hypothesis, evidence, changed artifacts, tests, benchmarkBefore/After, security/policy status, canary state et rollback reference.

Le pipeline est strictement :

OBSERVE → GAP → CANDIDATE → STATIC → SANDBOX → TEST → SECURITY → BENCHMARK → POLICY → CANARY → PROMOTE/REJECT → MONITOR → ROLLBACK.

## Safety boundary

Generated code = untrusted artifact. Les sandbox/workers n'ont pas accès aux secrets production, permissions globales, RLS, SQL arbitraire ou réseau non autorisé.

## Multimodal DAG

Les capacités texte/image/vidéo/audio/musique/vision/traduction/code/jeu utilisent un graph de tâches versionné, avec ressources, dépendances, validators et provenance par node.

## Evidence

Chaque évolution ou job distribué produit une trace :
requestId → target → resource reservation → execution → validation → outcome → artifact/result → event.

## Acceptance

M15 reste opérationnel avec zéro provider et zéro Community Worker. La perte d'un worker ou provider dégrade l'exécution disponible, pas le cerveau ni l'état métier.



# D100K — RESTORED META AI LAB TECHNICAL CONTRACTS

`EvolutionProposal={id,target,rationale,patchRef,testsRef,baselineMetrics,status:'draft'|'testing'|'canary'|'approved'|'rejected'|'rolled_back'}`
`SystemAction={id,capability,actorId,authorization,status:'requested'|'running'|'completed'|'failed'}`

Every proposal carries baseline metrics, explicit tests, security/policy result, canary state and rollback reference. Production security policy, provider registry, RLS, worker trust policy and destructive operations cannot be changed autonomously.

AI Lab Control Plane handoff:
request → auth/policy → capability → resource reservation → worker/provider/local target → sandbox → execution → validation → owner decision → evidence.

D100K: prompt injection, data leakage, cross-player isolation, malicious patch, stale proposal, provider disagreement, worker failure, resource exhaustion, rejected canary and rollback.



# D100K — RESTORED AI LAB CONTINUITY TECHNICAL CONTRACT

Provider/worker/model loss selects the highest eligible remaining execution mode:
DETERMINISTIC_LOCAL → ON_DEVICE → CACHE → TRUSTED_WORKER → COMMUNITY_WORKER → VERIFIED_PROVIDER → DEGRADED/UNAVAILABLE according to policy.

An AI fallibility experiment is a versioned sandboxed experiment with hypothesis, expected effect, reversibility and explicit player-visible framing. A provider failure is never converted into a success or authoritative fact.

D100K: zero-provider boot, zero-worker operation, malformed provider output, worker loss, deterministic fallback, no-fake-success and rollback.



# D100K — EXPLICIT AI LAB PROMOTION RESTORATION

No canary starts without baseline metrics, applicable tests, security checks and benchmark evidence. Production changes affecting RLS, worker trust, provider registry or security policy require the configured owner/policy gate. Prompt injection, data leakage, cross-player isolation, malicious patch, worker loss and provider disagreement are mandatory adversarial scenarios.

D100K: candidate → evidence → policy → canary → outcome → promotion/rejection → rollback.

---
