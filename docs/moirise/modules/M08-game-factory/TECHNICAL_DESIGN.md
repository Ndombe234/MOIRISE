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