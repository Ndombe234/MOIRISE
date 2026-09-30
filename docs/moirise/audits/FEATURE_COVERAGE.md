# AUDIT DE COUVERTURE DES FONCTIONNALITÉS

| Fonctionnalité | Propriétaire canonique | Couverture |
|---|---|---|
| Auth/session | M01 | plan + technique + transversal security |
| Player/profile | M02 | plan + technique |
| SYSTEM UI | M03 | plan + technique |
| Feed/posts | M04 | plan + technique |
| Messages privés | M05 | plan + technique |
| Groups/clans | M06 | plan + technique |
| Discovery | M07 | plan + technique |
| Quiz | M08 | plan + technique |
| Jeux 2D | M08/M09 | runtime + creation |
| Jeux 3D | M08/M09 | runtime + creation |
| Game creation AI | M09/M19 | deux frontières documentées |
| Image AI | M10/M19 | capability + studio |
| Video AI | M10/M19 | capability + studio |
| Audio/music AI | M10/M19 | capability + studio |
| Progression XP | M11 | ledger + validator |
| Titres jusqu'à 1M | M11 | grammar/materialization |
| Achievements | M11 | unlock evidence |
| Collection | M11 | item ownership |
| Roulette | M11 | audited deterministic server path |
| Events | M12 | schedule + eligibility |
| Suspense réel | M12/M03/M14 | future state required |
| Moderation | M13 | authoritative |
| Notifications | M14 | frequency/dedupe/quiet |
| Translation | M15/M19 | source preservation |
| Analytics | M16 | telemetry |
| Optional monetization | M17 | isolated/disableable |
| Trusted workers | M18 | registry/quota/sandbox |
| Community workers | M18 | opt-in/isolation |
| AI architecture | M19 | master + technical |
| AI evolution | M19 | sandbox/benchmark/canary |
| Administration | M20 | ops/audit |

## Règle

Une cellule « couverture » signifie que la conception existe. Elle ne signifie pas que le code est déjà implémenté.

## Garde de couverture

Toute nouvelle fonctionnalité doit avoir exactement un owner. Les intégrations sont référencées dans les modules consommateurs sans recopier le contrat propriétaire.