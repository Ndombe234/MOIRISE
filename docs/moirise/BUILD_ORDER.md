# MOIRISE — IMPLEMENTATION ORDER

## Read first
1. `MASTER_REBUILD_V2.md`
2. `ai/00_MASTER_AI.md`
3. `ai/10_PROVIDER_REGISTRY.md`
4. `ai/11_GAME_CREATION_RUNTIME_CONTRACT.md`

## Then implement strictly in order
M01 → M02 → M03 → M04 → M05 → M06 → M07 → M08 → M09 → M10 → M11 → M12 → M13 → M14 → M15.

## For each module
Read only the module's technical file plus the AI contracts needed by its capabilities. Do not copy provider URLs or AI architecture into the module.

## Completion
Do not mark a module complete until its acceptance criteria and global completion gate pass.

## If documents conflict
Priority is:
1. This file and `MASTER_REBUILD_V2.md` for order/scope.
2. `ai/00_MASTER_AI.md` for AI architecture.
3. `ai/10_PROVIDER_REGISTRY.md` for providers/endpoints/secrets configuration.
4. The numbered module file for that module's product behavior.
5. Existing source code is evidence to inspect, never an authority over these documents.
