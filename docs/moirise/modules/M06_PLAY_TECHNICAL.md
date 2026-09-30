# M06 — PLAY — COMPLETE TECHNICAL CONTRACT

## Responsibility
M06 is the player-facing game hub: catalog presentation, launch eligibility, continue-playing, favorites, history and session lifecycle. M08 creates packages; M09 executes them; M10 owns social scoring.

## Data
`game_catalog_refs`, `game_favorites`, `game_history`, `play_sessions`.

## Types
```ts
interface PlayEntry { gameId:string; title:string; mode:'2d'|'3d'; status:'ready'|'processing'|'unavailable'; packageVersion:number; thumbnailRef?:string; }
interface PlaySession { id:string; gameId:string; playerId:string; startedAt:string; endedAt?:string; status:'active'|'completed'|'aborted'; }
```

## Launch pipeline
`select → authorization/eligibility → package metadata → integrity/version check → preload → M09 mount → create session → play → result/save → unmount → history`.

## Catalog source
M06 reads catalog references. It never generates a package and never trusts client-provided package paths. M07 owns discovery/ranking.

## Offline/degraded
An offline-capable package may launch from validated cache. Non-cached content displays unavailable/retry state. Runtime errors return to Play without blanking the shell.

## AI boundary
AI may recommend games or explain controls through capabilities. It does not decide access permissions and does not execute packages. Provider URLs remain outside M06.

## UI
Play is one primary door. Continue, favorites, categories, created games and history are internal sections/tabs. Do not add permanent buttons for every game type.

## Performance
Virtualize game grids/lists. Lazy-load thumbnails. Preload only the selected/next package. Keep game runtime isolated from shell rendering.

## Tests
Launch failure; corrupt package; version mismatch; resume; history privacy; offline cache; session cleanup; cancellation; mobile controls; browser back; AI/provider outage.

## Done gate
A player can find, launch, resume and exit a validated game safely, with deterministic recovery when runtime or network services fail.