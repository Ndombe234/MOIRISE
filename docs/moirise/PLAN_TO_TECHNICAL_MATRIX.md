# MOIRISE — PLAN → TECHNICAL DESIGN TRACEABILITY MATRIX
## Purpose
This matrix proves that every active canonical plan has a technical design owner. It avoids creating duplicate technical authorities for historical documents that have been merged.

## Canonical pairs
| Plan | Technical design | Status |
|---|---|---|
| docs/moirise/modules/M01-foundation/PLAN.md | docs/moirise/modules/M01-foundation/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M02-player/PLAN.md | docs/moirise/modules/M02-player/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M03-social/PLAN.md | docs/moirise/modules/M03-social/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M04-world/PLAN.md | docs/moirise/modules/M04-world/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M05-system/PLAN.md | docs/moirise/modules/M05-system/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M06-play/PLAN.md | docs/moirise/modules/M06-play/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M07-game-discovery/PLAN.md | docs/moirise/modules/M07-game-discovery/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M08-game-factory/PLAN.md | docs/moirise/modules/M08-game-factory/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M09-shared-game-engine/PLAN.md | docs/moirise/modules/M09-shared-game-engine/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M10-social-gaming/PLAN.md | docs/moirise/modules/M10-social-gaming/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M11-communities/PLAN.md | docs/moirise/modules/M11-communities/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M12-events/PLAN.md | docs/moirise/modules/M12-events/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M13-adaptive/PLAN.md | docs/moirise/modules/M13-adaptive/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M14-collection-reward/PLAN.md | docs/moirise/modules/M14-collection-reward/TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/modules/M15-meta-ai-lab/PLAN.md | docs/moirise/modules/M15-meta-ai-lab/TECHNICAL_DESIGN.md | ✅ |

## Cross-cutting pairs
| Plan | Technical design | Status |
|---|---|---|
| docs/moirise/CREATIVE_MEDIA_VIRALITY_PLAN.md | docs/moirise/CREATIVE_MEDIA_VIRALITY_TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/ai/AI_MASTER_PLAN.md | docs/moirise/ai/AI_TECHNICAL_DESIGN.md | ✅ |
| docs/moirise/MASTER_PLAN.md | docs/moirise/ARCHITECTURE_MASTER.md + module technical owners | ✅ |

## Historical plan reconciliation
Historical/deleted feature plans are intentionally NOT restored as competing plan/technical authorities.
Their behavior is:
1. inventoried in HISTORICAL_INVENTORY;
2. placed in the canonical owner PLAN;
3. bound to the owner's TECHNICAL_DESIGN;
4. bound to shared transversal contracts where applicable;
5. verified through FEATURE_COVERAGE.

Examples:
- First Contact → M05 technical design + M01/M04/M15 boundaries.
- Moment/Relay/Living Stories → M03 technical design.
- Evolution/Hidden Possibilities/Fun & Surprise → M05 + M13.
- Experience Economy → M04/M06/M12/M14 owners.
- Creation Runtime/Game fabrication → M08/M09/M15.
- World Agents/AI orchestration/on-device routing → M15 + transversal AI technical design.
- Context/memory comprehension → transversal CONTEXT_MEMORY_TECHNICAL_DESIGN + M01–M15 integrations.

## Rule
A historical file being absent from the active tree does not mean its behavior lacks technical design. It must have exactly one canonical owner and one traceable technical owner. Duplicate authorities are prohibited.


## HISTORICAL AI / COMPUTE FUSION — TRACEABILITY — 2026-10-03

| Historical source | Canonical PLAN owner | Canonical TECHNICAL_DESIGN owner |
|---|---|---|
| 00_MASTER_AI | M15 | M15 |
| 01_CORE_ORCHESTRATOR | M15 | M15 |
| 02_CONTEXT_INTENT_REASONING | M15 | M15 |
| 03_CAPABILITY_PROVIDER_ROUTER | M15 | M15 |
| 04_MEMORY_EXPERIENCE_LEARNING | M15 | M15 |
| 05_CREATIVE_MEDIA_GAME_CREATOR | M15 + M08 where game-specific | M15 + M08 where game-specific |
| 06_EVOLUTION_CODE_SANDBOX | M15 | M15 |
| 07_DATA_SECURITY_PROVENANCE | M15 + transversal security | M15 + transversal security |
| 08_RESOURCE_SCHEDULER_OBSERVABILITY | M15 | M15 |
| 09_AI_ACTIONS_AND_CONTRACTS | M15 | M15 |
| 11_GAME_CREATION_RUNTIME_CONTRACT | M08 / M09 | M08 / M09 |
| 12_DISTRIBUTED_WORKER_CLUSTER | M15 | M15 |
| 13_DISTRIBUTED_SYSTEM_IMPLEMENTATION | M15 | M15 |
| 14_DETAILED_AI_DESIGN_INDEX | M15 | M15 |
| historical MORISE Game Factory | M08 | M08 |
| historical Shared Game Engine | M09 | M09 |

No historical file remains an active competing authority. Historical material is preserved only through the inventory and mapped into current owners.

