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