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