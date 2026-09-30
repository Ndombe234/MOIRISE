# M09 — GAME RUNTIME — TECHNICAL CONTRACT

## Boundary
M09 executes validated GamePackages. It never generates arbitrary code from user input and never depends on an AI provider during gameplay.

## Package contract
```ts
interface GamePackage { id:string; version:number; engine:string; manifest:string; entry:string; assets:AssetRef[]; integrityHash:string; signature:string; permissions:GamePermissions; }
interface GamePermissions { network:"none"|"approved"; storageMb:number; fullscreen:boolean; input:string[]; }
```

## Lifecycle
`LOAD_MANIFEST → VERIFY_HASH → VERIFY_SIGNATURE → PRELOAD_ASSETS → CREATE_RUNTIME → START → PAUSE/RESUME → COMPLETE/EXIT → RELEASE`.

## Adapters
2D: Canvas/WebGL/Phaser. 3D: Three.js/Babylon/PlayCanvas/WebGL/WebGPU. Unsupported engines are rejected.

## Isolation
Use browser sandbox/iframe/worker isolation as compatible. Never expose database tokens, authentication cookies or privileged APIs to game code. Network access is deny-by-default.

## Resource control
Per-game CPU/RAM/time/storage/network budgets are applied where the platform permits. A runaway game can be terminated without taking down the MOIRISE shell.

## Error handling
Runtime errors become diagnostics and a recovery UI. Never allow a game exception to produce a blank application.

## Tests
malformed manifest, bad signature, missing asset, engine mismatch, network denial, cancellation, resize/mobile controls, pause/resume and crash recovery.

## Done gate
A finished game runs with every AI provider offline and cannot access MOIRISE privileged data.