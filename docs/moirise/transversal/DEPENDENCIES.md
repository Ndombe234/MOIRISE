# MATRICE DE DÉPENDANCES

| Module | Dépendances principales | Consomme | Expose |
|---|---|---|---|
| M01 | aucune | runtime/session | shell, config, contracts |
| M02 | M01 | session | player identity |
| M03 | M01,M02 | context/player | SYSTEM commands |
| M04 | M01,M02,M03 | player/SYSTEM | social events |
| M05 | M01,M02,M03 | identity/localization | messaging events |
| M06 | M02,M04,M05 | membership/social | community state |
| M07 | M02,M04,M06,M15 | content signals | discovery results |
| M08 | M01,M02,M03,M11 | player/game catalog | game results |
| M09 | M08,M18,M19 | game runtime/contracts | game packages |
| M10 | M18,M19,M15 | creative capability | artifacts |
| M11 | M02,M03,M08,M12 | verified actions | progression/rewards |
| M12 | M06,M11 | player eligibility | future states |
| M13 | transversal | actions/content | enforcement decisions |
| M14 | M03,M12,M16 | events/preferences | notifications |
| M15 | M01 | locale/source text | localized representations |
| M16 | transversal | safe events | telemetry |
| M17 | M01,M13,M16 | attribution | optional placements |
| M18 | M01,M13,M16 | task contracts | execution capacity |
| M19 | transversal,M18 | context/capabilities | validated AI results |
| M20 | M13,M16,M18,M19 | operational state | admin actions |

Une dépendance est valide lorsqu'elle passe par le contrat du propriétaire. Une lecture directe des tables d'un module voisin n'est pas considérée comme une dépendance saine.
