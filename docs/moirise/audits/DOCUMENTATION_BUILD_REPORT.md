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
