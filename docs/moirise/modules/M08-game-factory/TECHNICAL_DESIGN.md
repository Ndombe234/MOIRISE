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

