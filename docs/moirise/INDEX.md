# MOIRISE — INDEX CANONIQUE

## Règle de lecture
Chaque module possède exactement deux fichiers actifs :
- PLAN.md = comportement détaillé, du déclencheur jusqu'au DONE.
- TECHNICAL_DESIGN.md = schémas, commandes, états, concurrence, erreurs, sécurité, performance et tests.

La précision obligatoire est « France → Paris → rue → bâtiment → appartement → porte » lorsque le domaine nécessite ces sous-niveaux.

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

## MORISE AI
Le domaine AI possède exactement deux sources canoniques :
- ai/AI_MASTER_PLAN.md = WHAT : identité, architecture, responsabilités, ownership, invariants, capabilities, providers et critères globaux.
- ai/AI_TECHNICAL_DESIGN.md = HOW : fichiers, interfaces, algorithmes, SQL, routes, adapters, workers, validation, tests, sécurité et ordre de fabrication.

Aucun troisième document AI ne doit devenir une source de vérité concurrente sans mise à jour de cette règle.

## Transversal
- transversal/CONTRACTS.md
- transversal/DEPENDENCIES.md
- transversal/DATA_MODEL.md
- transversal/SECURITY.md
- transversal/EVENT_CATALOG.md
- transversal/ERROR_MODEL.md
- transversal/TESTING.md
- transversal/OBSERVABILITY.md
- transversal/CROSS_MODULE_MECHANICS.md
- transversal/DOCUMENTATION_GOVERNANCE.md
- transversal/DEFINITION_OF_DONE.md

Les documents transversaux donnent des contrats communs. Ils ne doivent pas recréer l'implémentation interne de MORISE AI.

Les registres provider séparés ont été supprimés pour éviter une troisième autorité. Les providers sont décrits dans AI_MASTER_PLAN.md et fabriqués dans AI_TECHNICAL_DESIGN.md.

## Audits
- audits/FEATURE_COVERAGE.md
- audits/DUPLICATE_AUDIT.md
- audits/DOCUMENTATION_BUILD_REPORT.md


## D10 governance and planning
- `DETAIL_LEVEL_GOVERNANCE.md` — permanent rule for multiplying specification precision by ten at each « détaille » request.
- `PROJECT_TIME_MODEL.md` — current elapsed-time bands and recalculation rule after each detail expansion.
- `CREATIVE_MEDIA_VIRALITY_PLAN.md` — social media, Reels, Stories, creative transformation and virality behavior.
- `CREATIVE_MEDIA_VIRALITY_TECHNICAL_DESIGN.md` — media graph, viral graph, derivation, provenance, share-token and validation contracts.


## Agent fabrication
- transversal/AGENT_FABRICATION_PROTOCOL.md — operational contract for ChatGPT/Codex: canonical reading order, machine-usable task context, detail ladder, cross-module decomposition, game fabrication, user simulation, adversarial verification, evidence and time recalculation.
- DETAIL_LEVEL_GOVERNANCE.md — permanent « détail » rule and depth progression.
- PROJECT_TIME_MODEL.md — elapsed-time bands and recalculation rules.
