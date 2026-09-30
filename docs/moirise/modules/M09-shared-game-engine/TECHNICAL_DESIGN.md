# M09 — SHARED GAME ENGINE — CONCEPTION TECHNIQUE APPROFONDIE

## 1. Boundary
M09 owns validated reusable runtime primitives. M08 produces packages; M06 launches sessions.

## 2. Manifest
RuntimeManifest:
packageVersion; engineId; entrypoint; requiredCapabilities; asset refs; save schema; input mapping; network policy; memory/CPU budget; integrity hash.

## 3. Engine interface
~~~ts
interface GameEngine {
  mount(manifest, session): Promise<RuntimeHandle>;
  dispatchInput(input): void;
  tick(delta): void;
  snapshot(): GameState;
  restore(state): RestoreResult;
  finalize(): RuntimeResult;
  unmount(): void;
}
~~~

## 4. 2D engines
Adventure: maps/NPC/dialogue/quests/inventory.
Battle: combat/stats/skills/enemies/loot.
Puzzle: rules/logic/interactive objects/timer/score.

Each engine has deterministic state adapters where critical scoring depends on simulation.

## 5. 3D path
3D is loaded lazily.
A 3D engine cannot be required by the core Play shell.
GPU/resource requirements are explicit in manifest.

## 6. Persistence
Save state includes schema version and checksum.
Migrations are explicit.
Old incompatible saves are rejected with a user-visible recovery path.

## 7. Runtime security
Sandboxed execution.
Allowlisted bridge APIs only.
No arbitrary filesystem.
No production credentials.
Network only where manifest/policy allows.

## 8. Result bridge
Runtime emits observations. Server result validator determines authoritative result.

## 9. Runtime error isolation
Engine exception → runtime error boundary → telemetry → return to Play shell. It must never crash the entire app.

## 10. Performance
Budget startup, memory, frame rate where relevant, asset size and network. 3D uses progressive assets and low-end fallbacks where supported.

## 11. Tests
Manifest; runtime mount; input; state save/restore; corrupt save; network policy; sandbox; 2D engine behavior; 3D adapter; crash recovery; mobile.

## 12. DONE
Engines are reusable, secure and isolated from provider and product navigation concerns.