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