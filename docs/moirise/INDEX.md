# MOIRISE — INDEX CANONIQUE

## Règle de lecture
Chaque module possède exactement deux fichiers actifs :
- PLAN.md = comportement détaillé, du déclencheur jusqu'au DONE.
- TECHNICAL_DESIGN.md = schémas, commandes, états, concurrence, erreurs, sécurité, performance, tests.

La précision obligatoire est « France → Paris → rue → bâtiment → appartement → porte » lorsque le domaine nécessite ces sous-niveaux. Les documents génériques ne doivent pas recopier les règles métier des owners.

## Modules
- M01 Foundation → modules/M01-foundation/PLAN.md + TECHNICAL_DESIGN.md
- M02 Player → modules/M02-player/PLAN.md + TECHNICAL_DESIGN.md
- M03 Social + Private Messaging → modules/M03-social/PLAN.md + TECHNICAL_DESIGN.md
- M04 World → modules/M04-world/PLAN.md + TECHNICAL_DESIGN.md
- M05 System / Progression / Evolution → modules/M05-system/PLAN.md + TECHNICAL_DESIGN.md
- M06 Play → modules/M06-play/PLAN.md + TECHNICAL_DESIGN.md
- M07 Game Discovery → modules/M07-game-discovery/PLAN.md + TECHNICAL_DESIGN.md
- M08 Game A→Z Factory → modules/M08-game-factory/PLAN.md + TECHNICAL_DESIGN.md
- M09 Shared Game Engine → modules/M09-shared-game-engine/PLAN.md + TECHNICAL_DESIGN.md
- M10 Social Gaming → modules/M10-social-gaming/PLAN.md + TECHNICAL_DESIGN.md
- M11 Communities / Guilds → modules/M11-communities/PLAN.md + TECHNICAL_DESIGN.md
- M12 Events → modules/M12-events/PLAN.md + TECHNICAL_DESIGN.md
- M13 Adaptive World → modules/M13-adaptive/PLAN.md + TECHNICAL_DESIGN.md
- M14 Collection / Reward Economy → modules/M14-collection-reward/PLAN.md + TECHNICAL_DESIGN.md
- M15 Meta System + MORISE AI Lab → modules/M15-meta-ai-lab/PLAN.md + TECHNICAL_DESIGN.md

## AI
ai/AI_MASTER_PLAN.md
ai/AI_TECHNICAL_DESIGN.md

## Transversal
CONTRACTS.md
DEPENDENCIES.md
DATA_MODEL.md
SECURITY.md
EVENT_CATALOG.md
ERROR_MODEL.md
TESTING.md
OBSERVABILITY.md
CROSS_MODULE_MECHANICS.md
PROVIDER_REGISTRY.md
DOCUMENTATION_GOVERNANCE.md
DEFINITION_OF_DONE.md

Ces fichiers transversaux ne sont pas des copies des plans modules : ils fixent uniquement les contrats qui traversent plusieurs owners.

## Audits
FEATURE_COVERAGE.md
DUPLICATE_AUDIT.md
DOCUMENTATION_BUILD_REPORT.md
