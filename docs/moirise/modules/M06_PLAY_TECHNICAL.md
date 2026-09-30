# M06 — PLAY — TECHNICAL DESIGN

## Boundary
M06 is the player-facing game hub: launch, resume, favorites, history, categories and play sessions. It does not create games (M08), own the shared engine (M09) or own social scoring (M10).

## Data
`game_catalog_refs`, `game_favorites`, `game_history`, `play_sessions`.

## Types
```ts
interface PlayEntry { gameId:string; title:string; mode:"2d"|"3d"; status:"ready"|"processing"|"unavailable"; }
interface PlaySession { id:string; gameId:string; playerId:string; startedAt:string; endedAt?:string; }
```

## Launch flow
`select → eligibility → package/version check → preload → runtime mount → session created → play → save/result → unmount`.

## UI
Play is one primary door. Discovery, categories, continue-playing and created games are sections within it. No game type creates a permanent top-level button.

## Runtime boundary
Finished games run through M09. M06 never executes arbitrary generated code itself.

## Offline/degraded
If a game package is cached and marked offline-capable, it may launch without network. Otherwise show an explicit unavailable state; never show a blank screen.

## AI boundary
AI may recommend games or explain controls through capabilities. Game creation uses M08. Provider endpoints are never hard-coded here.

## Tests
launch failure, corrupted package, incompatible engine version, resume, history privacy, offline cache, session cleanup, mobile controls and back navigation.

## Done gate
A player can find, launch, resume and exit a game safely with a stable fallback when runtime/network services fail.