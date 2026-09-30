# M09 — SHARED GAME ENGINE

Shared runtime primitives for games: scenes, entities, input, camera, physics, collision, quest, dialogue, inventory, save, audio, UI, multiplayer adapter, manifests, quotas and telemetry.

Games mount only declared capabilities. Runtime is sandboxed and resource-limited. Engine versions are immutable and tested before use.


## Detailed feature behavior

### Runtime manifest
Every game declares engine, 2D/3D mode, entrypoint, assets, required bridge capabilities, input map, save schema and resource budget.

### Engine families
Adventure, Battle and Puzzle are reusable 2D runtimes. 3D engines are modular adapters and loaded only when required.

### Game state
Runtime state is separate from server-authoritative result state. The client can simulate but cannot award XP or rewards.

### Save/resume
Save contains schema version and checksum. Compatible saves resume; unknown schemas are rejected safely or migrated through an explicit migration function.

### Bridge API
The runtime gets only explicitly allowed functions such as safe context, save request, share request and completion attempt. No arbitrary database access.

### Runtime isolation
A game crash is contained by the engine boundary and returns to Play. A game cannot load another player's filesystem or production secret.

### Performance
3D code and heavy assets are lazy. Published packages have startup, memory and asset-size budgets.

### Completion evidence
Runtime manifest validation, sandbox, result bridge, save migration, 2D engines, 3D adapter, crash recovery and mobile controls are tested.