# MOIRISE — CANONICAL IMPLEMENTATION ORDER

## 1. Read first
1. `MASTER_REBUILD_V2.md`
2. `ai/00_MASTER_AI.md`
3. `ai/08_RESOURCE_SCHEDULER_OBSERVABILITY.md`
4. `ai/10_PROVIDER_REGISTRY.md`
5. `ai/11_GAME_CREATION_RUNTIME_CONTRACT.md`
6. `ai/12_DISTRIBUTED_WORKER_CLUSTER.md`
7. `ai/13_DISTRIBUTED_SYSTEM_IMPLEMENTATION.md`

## 2. Module order
`M01 → M02 → M03 → M04 → M05 → M06 → M07 → M08 → M09 → M10 → M11 → M12 → M13 → M14 → M15`.

## 3. Canonical module file per module

Each module has exactly one authoritative implementation specification:

- M01: modules/M01_FOUNDATION.md
- M02: modules/M02_PLAYER.md
- M03: modules/M03_SOCIAL.md
- M04: modules/M04_WORLD.md
- M05: modules/M05_SYSTEM.md
- M06: modules/M06_PLAY.md
- M07: modules/M07_DISCOVERY.md
- M08: modules/M08_GAME_FACTORY.md
- M09: modules/M09_GAME_ENGINE.md
- M10: modules/M10_SOCIAL_GAMING.md
- M11: modules/M11_COMMUNITIES.md
- M12: modules/M12_EVENTS.md
- M13: modules/M13_ADAPTIVE_WORLD.md
- M14: modules/M14_COLLECTION.md
- M15: modules/M15_META_AI_LAB.md

The old separate *_TECHNICAL.md variants have been merged into these canonical files and must remain deleted. Do not create new technical variants.

## 4. Per-module implementation sequence

For each module:
1. Read the product file and its technical contract.
2. Read only the AI capability contracts required by the module.
3. Identify existing source that conflicts with the contract.
4. Define/update types and data access first.
5. Implement server authorization/RLS before trusting client UI.
6. Implement service logic and state transitions.
7. Implement UI using the shared M01 shell.
8. Connect capabilities through the canonical AI router; never direct-call a provider.
9. Implement loading/empty/error/unavailable/degraded states.
10. Add unit/integration tests.
11. Build and typecheck.
12. Test desktop and mobile.
13. Click every action and verify the resulting state.
14. Test failure/retry/reconnect paths.
15. Verify no blank-screen regression.
16. Only then mark the module complete.

## 5. Global completion gate
A module is not complete unless:
- build/typecheck/lint pass;
- tests pass;
- authorization/RLS is verified;
- every visible action has a working result;
- loading/empty/error/unavailable/degraded states exist;
- mobile and desktop are checked;
- performance is acceptable;
- accessibility basics are checked;
- AI/provider outage does not destroy core functionality;
- no duplicate implementation was introduced.

## 6. Single-source rule
Provider URLs and secrets: `ai/10_PROVIDER_REGISTRY.md` only.
AI architecture: `ai/00_MASTER_AI.md` plus numbered AI contracts only.
Worker security/quotas: `ai/12_DISTRIBUTED_WORKER_CLUSTER.md` and `ai/13_DISTRIBUTED_SYSTEM_IMPLEMENTATION.md` only.
Module product behavior: `Mxx_*.md`.
Module implementation: the canonical `Mxx_*.md` file.

## 7. Conflict rule
Priority: this file + `MASTER_REBUILD_V2.md` for order/scope; `ai/00_MASTER_AI.md` for AI architecture; `ai/10_PROVIDER_REGISTRY.md` for providers; worker contracts for distributed execution; then the relevant module technical contract. Existing source code is evidence to inspect, never authority over the contracts.
