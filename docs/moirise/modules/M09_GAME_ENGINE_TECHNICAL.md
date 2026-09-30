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