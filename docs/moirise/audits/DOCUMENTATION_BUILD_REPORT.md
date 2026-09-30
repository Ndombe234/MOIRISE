# MOIRISE — RAPPORT DE RECONSTRUCTION DOCUMENTAIRE

## Architecture active
15 modules canoniques + mécanismes transversaux.

## Reprise à zéro
La documentation module a été reconstruite au niveau opérationnel demandé : acteur → déclencheur → préconditions → entrées → ordre exact → mutation → projection → événements → erreurs → récupération → sécurité → tests → DONE.
La règle de granularité est explicitée comme « France → Paris → rue → bâtiment → appartement → porte » : une phrase générale n'est pas acceptée lorsqu'une sous-étape reste ambiguë.

## Structure active
- 15 PLAN.md module ;
- 15 TECHNICAL_DESIGN.md module ;
- Master Plan ;
- Index ;
- AI Master/Technical Design ;
- contrats transversaux ;
- audits et gouvernance.

## Agrégats supprimés
Les deux documents agrégateurs temporaires qui recopiaient les règles des modules ont été supprimés :
- FUNCTIONAL_BEHAVIOR_SPEC.md ;
- TECHNICAL_IMPLEMENTATION_SPEC.md.
La documentation canonique est maintenant portée par les owners modules; les documents transversaux ne recopient que les contrats communs.

## Vérification actuelle
- documents Markdown sous docs/moirise : 61 ;
- documents module actifs : 30 ;
- modules actifs : 15 ;
- doublons exacts par blob SHA : 0 groupe ;
- modules M16–M20 actifs : 0 ;
- specs agrégées supprimées : 0.

## Ownership
Aucun second AI brain, provider router, progression authority, community membership authority, reward/roulette authority, World Memory lifecycle, Living Object lifecycle ou event scheduling authority n'est autorisé.

## Fonctionnalités couvertes
Player, social/private messaging, World, SYSTEM/progression/evolution, Play 2D/3D, Game Discovery, Game A→Z Factory, Shared Game Engine, Social Gaming, Communities, Events, Adaptive World, Collection/Reward Economy, Living Objects, Convergence, Missions From Reality, World Memory, Creative AI, translation, workers, provider routing et AI Lab.

## Documentation vs code
Cette reconstruction améliore les contrats documentaires. Elle ne signifie pas que chaque fonctionnalité documentée est déjà implémentée dans le code. L'implementation gate reste : PLAN → TECHNICAL DESIGN → code/migrations → auth/security → tests → browser desktop/mobile → resilience → production evidence → DONE.

## Règle de maintenance
Toute nouvelle capability doit d'abord recevoir un owner unique. On enrichit son PLAN/TECHNICAL_DESIGN; on ne crée pas une seconde copie parallèle. Tout doublon identifié doit être supprimé ou remplacé par une référence canonique.
