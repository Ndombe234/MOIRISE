# M08 — GAME A→Z FACTORY — CONCEPTION TECHNIQUE

## Creation contract
GameProject → GameIntent → GameSpecification → TaskGraph → controlled generation → build → simulation → tests → preview → version → publish.

## GameSpecification
Contains genre, engine target, scenes, entities, controls, rules, quests, win/loss, rewards, assets, audio, multiplayer mode, save schema, safety policy and performance budget.

## Engines
Adventure 2D = exploration/maps/NPC/dialogue/quests/inventory. Battle 2D = combat/skills/stats/enemies/loot. Puzzle 2D = logic/interactions/timer/score. 3D uses an approved runtime adapter.

## Security
Generated code is an artifact. Static analysis, dependency allowlist, sandbox build, runtime limits and behavioral validation precede publication. No production secrets or arbitrary admin APIs in game packages.

## Validation
Schema → rules → references → security → originality/provenance → performance → simulation → regression. Failure creates a bounded correction task, not an infinite repair loop.

## Versioning
Published versions are immutable. Rollback selects a known-good version; it does not rewrite history.
