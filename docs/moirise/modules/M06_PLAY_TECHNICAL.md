# M06 — PLAY — TECHNICAL CONTRACT

## Boundary
M06 owns the Play surface and catalog composition. It does not own game creation (M08) or runtime execution (M09).

## Types
```ts
interface GameCard { id:string; title:string; mode:"2d"|"3d"; status:"published"|"draft"|"disabled"; thumbnailRef?:string; tags:string[]; }
interface PlayQuery { cursor?:string; filters?:Record<string,string>; limit:number; }
```

## UI
Play is one primary door. Discovery, categories, favorites, recent games and recommendations are tabs/sections inside the surface, not permanent global buttons.

## Runtime boundary
Clicking Play requests a signed `GamePackageRef` from the catalog. M06 does not execute arbitrary code. M09 owns sandboxed execution.

## AI boundary
AI can recommend or create game metadata through capability interfaces. No provider URL is hard-coded in M06.

## Performance
Virtualize large catalogs; lazy-load thumbnails; prefetch only the selected game's manifest.

## Tests
Catalog pagination, filters, empty/error states, package integrity, disabled-game behavior, mobile layout, runtime handoff.

## Done gate
A user can discover and launch a published game without M06 importing any game engine or provider SDK into the main bundle.