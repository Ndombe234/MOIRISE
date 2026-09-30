# M09 — SHARED GAME ENGINE — CONCEPTION TECHNIQUE

## Engine boundary
Game package → manifest validator → Engine Adapter → shared primitives.

## Primitives
Scene, Entity, Input, Camera, Physics, Collision, Quest, Dialogue, Inventory, Save, Audio, UI, Multiplayer Adapter, telemetry.

## Manifest
Declares engine version, assets, runtime capabilities, memory/CPU/session budgets, save schema and multiplayer requirements. Missing capability prevents mount.

## Resource control
Per-game CPU, memory, entity count, asset size, frame/simulation budget and session duration are enforced by runtime/sandbox, not by client promises.

## Compatibility
Save schema versions require migration or explicit incompatibility. Engine releases are versioned and regression-tested.

## Tests
Deterministic simulation where applicable, save/load, corrupted manifest, engine mismatch, resource exhaustion, long-session memory, mobile and recovery.
