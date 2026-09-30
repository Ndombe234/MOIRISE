# MOIRISE — V4 REBUILD AUTHORITY

Date: 2026-09-30
Status: CANONICAL REBUILD STATE

## Starting point

The previous MOIRISE implementation that had Modules 1→6 implemented is considered deleted for this rebuild. No previous module is treated as implemented.

Therefore:

- Module 1: rebuild from zero.
- Module 2: rebuild from zero.
- Module 3: rebuild from zero.
- Module 4: rebuild from zero.
- Module 5: rebuild from zero.
- Module 6: rebuild from zero.
- Modules 7→15: new implementation from their specifications.

Existing repository code is input material to inspect, not proof of completion.

## Canonical module specifications

The authoritative module-by-module design lives in `docs/moirise/modules/`.

Each module has its own contract and must be implemented independently within the shared Core architecture.

## Canonical AI rule

The advanced MORISE AI architecture is intentionally separated from the 15 product modules. Modules call capabilities; the AI Core decides how those capabilities are fulfilled.

## Implementation order

`M01 → M02 → M03 → M04 → M05 → M06 → M07 → M08 → M09 → M10 → M11 → M12 → M13 → M14 → M15 → Advanced MORISE AI Engine`

## Completion rule

No module is considered complete from a successful build alone. The acceptance gate includes automated tests, typecheck/lint/build, real browser testing, mobile/responsive validation, loading/error/empty/unavailable states and regression validation.

## Secret rule

Secret values must never be committed. Current exact secret names observed in Supabase are configuration identifiers only.