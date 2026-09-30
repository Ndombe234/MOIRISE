# MOIRISE — DEPENDENCY MAP — 15 MODULES

| Module | Depends on | Exposes |
|---|---|---|
| M01 | runtime | session, contracts, events, capability boundary |
| M02 | M01 | Player identity/context |
| M03 | M01,M02 | social/private events |
| M04 | M01,M02,M03,M05,M07,M13 | World surfaces |
| M05 | M01,M02 | SYSTEM/progression |
| M06 | M01,M02,M05,M09 | Play results/Moments |
| M07 | M01,M02,M03,M06,M13 | game discovery candidates |
| M08 | M01,M05,M07,M09,M15 | validated game packages |
| M09 | M01,M08 | reusable runtime |
| M10 | M03,M06,M11,M12 | social gaming events |
| M11 | M02,M03,M12,M13 | communities/membership |
| M12 | M05,M11,M14 | event state |
| M13 | M01,M02,M03,M04,M07,M15 | adaptive world ranking |
| M14 | M05,M06,M10,M11,M12 | rewards/collections |
| M15 | all contract surfaces, M01 | AI capabilities/orchestration |

## Ownership
A consumer may read an exposed projection/event but may not mutate another module's private persistence directly.


## AI Cognition Dependency

La dépendance vers M15 ne signifie pas que M15 possède l'état métier du module. Elle signifie que le module peut consommer les capacités d'orchestration AI via un contrat.

Pour toute feature AI :
module owner → capability contract → M15 orchestration → provider/worker éventuel → ValidationEngine → module owner commit → event → projection.

La fabrication doit donc charger à la fois la dépendance de module et son contrat AI. Un consumer peut demander une capability, mais ne choisit pas directement le provider et ne modifie pas la persistence d'un autre owner.
