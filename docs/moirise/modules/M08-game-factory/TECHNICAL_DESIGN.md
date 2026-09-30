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