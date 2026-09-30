# MOIRISE — RAPPORT DE RECONSTRUCTION DOCUMENTAIRE

## Architecture active
15 modules canoniques + mécanismes transversaux.

## Reprise à zéro
La documentation module et AI a été reconstruite au niveau opérationnel demandé : acteur → déclencheur → préconditions → entrées → ordre exact → décision → sortie → mutation → événements → erreurs → récupération → sécurité → observabilité → tests → DONE.

La règle de granularité est :
France → Paris → rue → bâtiment → appartement → porte.

Une phrase générale n'est pas considérée suffisante lorsqu'une sous-étape reste ambiguë.

## Architecture documentaire AI
Le domaine MORISE AI possède exactement deux sources canoniques :
- docs/moirise/ai/AI_MASTER_PLAN.md = QUOI ;
- docs/moirise/ai/AI_TECHNICAL_DESIGN.md = COMMENT.

Le Technical Design contient maintenant les pièces de fabrication :
- arborescence ;
- types TypeScript ;
- state machines ;
- algorithms ;
- routes HTTP ;
- Supabase persistence ;
- Provider adapters ;
- Worker scheduler ;
- Lease ;
- Sandbox ;
- Validation ;
- Memory ;
- Evolution ;
- Security ;
- Tests ;
- ordre d'assemblage.

## Doublons supprimés
Suppression des registres Provider concurrents :
- docs/moirise/ai/PROVIDER_REGISTRY.md ;
- docs/moirise/transversal/PROVIDER_REGISTRY.md.

Nettoyage des doublons M15 :
- M15 PLAN réduit aux responsabilités propres au module ;
- M15 TECHNICAL_DESIGN réduit aux interfaces du module ;
- TECHNICAL_DESIGN_M11_M15_ADDENDUM réduit pour ne pas recopier le cerveau AI.

Les anciens agrégats restent interdits comme sources de vérité :
- FUNCTIONAL_BEHAVIOR_SPEC.md ;
- TECHNICAL_IMPLEMENTATION_SPEC.md.

## Vérification actuelle
- documents Markdown sous docs/moirise : 59 ;
- documents module actifs : 30 ;
- modules actifs : 15 ;
- documents AI canoniques : 2 ;
- registre Provider AI séparé : 0 ;
- registre Provider transversal séparé : 0 ;
- doublons exacts par blob SHA : 0 groupe ;
- modules M16–M20 actifs : 0 ;
- specs agrégées supprimées : 0.

## Ownership
Aucun second AI brain, provider router, validation authority, progression authority, community membership authority, reward/roulette authority, World Memory lifecycle, Living Object lifecycle ou event scheduling authority n'est autorisé.

## Documentation vs code
Cette reconstruction améliore les contrats documentaires. Elle ne signifie pas que chaque fonctionnalité documentée est déjà implémentée dans le code.

L'implementation gate reste :
PLAN → TECHNICAL DESIGN → code/migrations → auth/security → tests → browser desktop/mobile → resilience → production evidence → DONE.

## Règle de maintenance
Toute nouvelle capability reçoit un owner unique.

On enrichit la source canonique concernée.

On ne crée pas une seconde copie d'un mécanisme déjà défini.

Tout doublon identifié doit être supprimé ou remplacé par une référence canonique.


## AI ↔ modules — mise à niveau de la fabrication

Le corpus a été enrichi afin que l'IA de fabrication ne comprenne pas seulement « MORISE AI » isolément, mais également le fonctionnement de chacun des 15 modules et la manière exacte dont chaque module utilise MORISE AI.

Les deux sources AI canoniques contiennent maintenant une couche de cognition des modules et un contrat technique de fabrication IA↔modules.

Les 30 documents actifs des modules contiennent chacun un contrat d'intégration AI spécifique : 15 PLAN + 15 TECHNICAL_DESIGN.

La documentation ne dit donc plus seulement « ce module peut utiliser l'IA ». Elle précise la frontière : contexte entrant → capability → orchestration M15 → validation → décision/commit par l'owner → event → projection → fallback.

Cette extension ne transforme pas les modules en cerveaux concurrents et ne crée pas de troisième source de vérité AI.

## Native Game Platform — documentation integration

The documentation now treats 2D and 3D games as a native MOIRISE platform rather than isolated applications. The fabrication chain is specified from request to GameSpecification, reusable foundations, TaskGraph, generation, build, tests, bounded repair, validation, runtime integration, Play and publication.

The AI documentation defines the global platform contracts; M06/M07/M08/M09/M10/M15 define their module-specific boundaries. Codex is documented as an optional constrained fabrication agent, not as the MORISE brain or publication authority.
