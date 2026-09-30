# MOIRISE Module 09 — SHARED GAME ENGINE

## 1. Purpose

Créer les primitives communes permettant de faire fonctionner de nombreux jeux sans dupliquer un moteur complet pour chaque expérience.

## 2. Engine services

- Scene
- Entity
- Input
- Camera
- Physics
- Collision
- Quest
- Dialogue
- Inventory
- Save
- Audio
- UI
- Multiplayer adapter
- telemetry

## 3. Game Manifest

Chaque jeu déclare :
- engine ;
- version ;
- assets ;
- capabilities ;
- limits ;
- save schema ;
- multiplayer requirements.

## 4. Architecture

GAME → Engine Adapter → Shared Engine.

Un jeu ne doit pas importer tous les sous-systèmes si son manifest n'en a pas besoin.

## 5. Performance

- tree-shaking ;
- dynamic imports ;
- asset streaming ;
- memory cleanup ;
- frame budget ;
- configurable simulation frequency.

## 6. Security

Le runtime doit sandboxer les contenus générés et appliquer des quotas :
- CPU ;
- mémoire ;
- nombre d'entités ;
- taille des assets ;
- durée de session.

## 7. Tests

- deterministic simulation where expected ;
- save/load ;
- asset failure ;
- engine mismatch ;
- memory leak smoke ;
- mobile ;
- long session ;
- corrupted manifest.

## 8. Acceptance

Plusieurs jeux peuvent partager le moteur sans importer inutilement toute sa surface.

## 9. Do not modify

Ne pas créer de jeu métier dans le moteur partagé.

## 10. New-AI handoff

Toute nouvelle primitive doit avoir une interface stable, un test et une justification de réutilisation.


---

# M09 — SHARED GAME ENGINE — TECHNICAL DESIGN

## Boundary
M09 provides reusable runtime primitives for validated game packages. It does not create game content, choose AI providers or own social score data.

## Core
`GameHost`, `GameManifest`, `Scene`, `Entity`, `Input`, `Camera`, `Physics`, `Collision`, `Quest`, `Dialogue`, `Inventory`, `Save`, `Audio`, `UI`, `MultiplayerAdapter`, `Telemetry`.

## Types
```ts
interface GameManifest { gameId:string; engineVersion:string; mode:"2d"|"3d"; entryScene:string; assets:AssetRef[]; capabilities:string[]; limits:RuntimeLimits; saveSchema:number; multiplayer?:MultiplayerSpec; }
interface RuntimeLimits { maxEntities:number; maxAssetBytes:number; maxSessionMs:number; maxSaveBytes:number; maxSimulationHz:number; }
interface GameSession { id:string; gameId:string; playerId:string; startedAt:string; state:"loading"|"running"|"paused"|"ended"|"failed"; }
```

## Host lifecycle
`load manifest → verify signature/hash → validate engine version → load only declared assets → initialize subsystems → create session → run loop → persist save/result → dispose`.

## Module loading
Subsystems are lazy and capability-driven. A simple 2D game must not load multiplayer, 3D physics or unused asset loaders. Use dynamic imports and tree-shaking.

## Determinism
Simulation logic that affects scoring or saves should be deterministic where practical. Randomness uses a declared seed when reproducibility is required.

## Security
Generated/untrusted packages run in isolation. They receive no MOIRISE database credentials, provider master keys or unrestricted filesystem/network access. Enforce CPU, memory, entity, asset and session limits at runtime.

## Performance
Target responsive frame pacing; pause rendering when hidden; release textures/audio buffers on scene disposal; stream large assets; monitor memory and frame time; terminate sessions exceeding policy limits.

## Save system
Validate save schema and size before persistence. Version migrations are explicit. Corrupt saves fall back to last known valid snapshot.

## Multiplayer
M09 exposes only a transport adapter and deterministic session hooks. Authorization, matchmaking and social permissions remain outside the engine.

## Tests
manifest tampering, engine mismatch, corrupted assets, scene load failure, memory leak smoke, long session, save/load migration, mobile input, pause/resume, frame budget and sandbox escape attempts.

## Done gate
Multiple independently generated games run on the same engine without importing unnecessary subsystems, without provider dependency and without cross-game state leakage.

# M09 — GAME RUNTIME — COMPLETE TECHNICAL CONTRACT

## Responsibility
M09 executes validated GamePackages. It never generates arbitrary code from user input and never depends on AI providers during gameplay.

## Package
```ts
interface GamePackage { id:string; version:number; engine:string; manifest:string; entry:string; assets:AssetRef[]; integrityHash:string; signature:string; permissions:GamePermissions; }
interface GamePermissions { network:'none'|'approved'; storageMb:number; fullscreen:boolean; input:string[]; }
```

## Lifecycle
`LOAD_MANIFEST → VERIFY_HASH → VERIFY_SIGNATURE → PRELOAD → CREATE_RUNTIME → START → PAUSE/RESUME → COMPLETE/EXIT → RELEASE`.

Any failed integrity/signature check stops before code execution.

## Engine adapters
2D: Canvas/WebGL/Phaser. 3D: Three.js/Babylon/PlayCanvas/WebGL/WebGPU. Each adapter exposes a common runtime contract: mount, resize, input, pause, resume, destroy and diagnostics.

## Isolation
Use iframe/worker/browser sandbox boundaries as appropriate. Game code receives only explicitly granted capabilities. No database tokens, auth cookies, provider secrets or privileged MOIRISE APIs are exposed. Network is deny-by-default.

## Resource control
Apply per-game execution time, storage and network budgets and platform-supported CPU/memory controls. A runaway runtime must be terminated without destroying the MOIRISE shell.

## Persistence
Game save data is namespaced by player/game/package version. Validate save schema before persistence. Corrupt save falls back to last valid snapshot.

## Error handling
Capture runtime exceptions and convert them to diagnostics. Offer restart/exit/retry. Never allow a game crash to produce a blank MOIRISE page.

## AI independence
A finished package must remain playable when every AI provider is offline.

## Tests
Bad manifest; invalid signature; corrupted asset; engine mismatch; network denial; storage limit; timeout; crash recovery; resize; mobile input; pause/resume; save corruption; provider outage.

## Done gate
Only signed/validated packages execute, privileged data remains isolated, and runtime failure is contained.



## 17. Canonical implementation runbook

1. Define one stable GameManifest and GamePackage contract for all playable games.
2. Verify package hash and signature before code/assets are mounted.
3. Validate engine version and declared capabilities.
4. Load only declared assets and subsystems.
5. Start a namespaced GameSession before the main loop.
6. Give game code only explicitly granted capabilities; network is deny-by-default.
7. Apply runtime limits for memory, CPU-equivalent execution budget, entity count, asset bytes, storage and session duration using the browser capabilities available.
8. Persist save state through a versioned schema with migration and last-known-valid fallback.
9. Expose a common adapter lifecycle: mount, resize, input, pause, resume, destroy, diagnostics.
10. Terminate runaway or crashed runtimes without crashing the MOIRISE shell.
11. Keep score-affecting simulation deterministic where practical and seed randomness when reproducibility is required.
12. Test Canvas/Phaser 2D and at least one Three.js/Babylon/PlayCanvas/WebGL/WebGPU 3D path.
13. Run security tests against malformed manifests, corrupted assets and sandbox-escape attempts.

### Canonical server/runtime contracts
verifyGamePackage, createRuntimeSession, saveGameState, reportRuntimeEvent, finalizeGameSession, terminateRuntime.

### Completion proof
Multiple independent games run through one shared runtime contract, with package integrity, isolation, recovery and provider independence.

## 21. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.