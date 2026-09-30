# MOIRISE — MODULE STATUS

Last updated: 2026-09-30

## Current position

**DESIGN PHASE COMPLETE — MODULE 1–15 CANONICAL TECHNICAL CONTRACTS CONSOLIDATED — IMPLEMENTATION NOT STARTED**

The previous MOIRISE implementation that had reached Modules 1–6 is considered deleted for this rebuild. No previous implementation is treated as complete functionality.

## Official module status

| Module | Technical design | Implementation |
|---|---|---|
| 1 Foundation | COMPLETE | NOT STARTED |
| 2 Player | COMPLETE | NOT STARTED |
| 3 Social + Private Messaging | COMPLETE | NOT STARTED |
| 4 World | COMPLETE | NOT STARTED |
| 5 System / Progression | COMPLETE | NOT STARTED |
| 6 Play | COMPLETE | NOT STARTED |
| 7 Game Discovery Engine | COMPLETE | NOT STARTED |
| 8 Game A→Z Factory | COMPLETE | NOT STARTED |
| 9 Shared Game Engine | COMPLETE | NOT STARTED |
| 10 Social Gaming | COMPLETE | NOT STARTED |
| 11 Communities | COMPLETE | NOT STARTED |
| 12 Events | COMPLETE | NOT STARTED |
| 13 Adaptive World | COMPLETE | NOT STARTED |
| 14 Collection / Reward Economy | COMPLETE | NOT STARTED |
| 15 Meta System + AI Lab | COMPLETE | NOT STARTED |

## Canonical architecture

- `docs/moirise/MASTER_REBUILD_V2.md` — product scope and authority
- `docs/moirise/BUILD_ORDER.md` — implementation order
- `docs/moirise/modules/M01_FOUNDATION.md` through `M15_META_AI_LAB.md` — single canonical module implementation contracts; duplicate *_TECHNICAL.md files removed
- `docs/moirise/ai/00_MASTER_AI.md` — AI architecture authority
- `docs/moirise/ai/10_PROVIDER_REGISTRY.md` — provider/endpoints/secrets registry
- `docs/moirise/ai/12_DISTRIBUTED_WORKER_CLUSTER.md` — worker security/trust architecture
- `docs/moirise/ai/13_DISTRIBUTED_SYSTEM_IMPLEMENTATION.md` — worker implementation architecture

## Documentation cleanup

The 15 module technical/product specifications are consolidated into exactly one authoritative file per module. No separate technical twin is allowed. Product/history notes under docs/product/ are reference-only and do not override the canonical rebuild documents.

## Separation rules

1. Product modules request AI capabilities; they do not implement provider routing.
2. Provider URLs/secrets live only in the provider registry/configuration layer.
3. Game creation (M08) is separate from game execution (M09).
4. Distributed workers execute sandboxed tasks; they are not the AI's source of truth.
5. Community workers are opt-in, untrusted by default and quota-limited.
6. Private messages are a first-class feature of M03, not a permanent extra navigation door.
7. The ordinary UI exposes only about 5–6 primary doors; the SYSTEM coordinates contextual actions.

## Implementation gate

A module is complete only after:
- automated tests;
- typecheck/lint/build;
- real browser validation;
- mobile/responsive validation;
- loading/error/empty/unavailable states;
- security/RLS validation;
- regression validation;
- no blank-screen path;
- all declared actions/buttons verified.

Build order is strictly M01 → M02 → M03 → M04 → M05 → M06 → M07 → M08 → M09 → M10 → M11 → M12 → M13 → M14 → M15.