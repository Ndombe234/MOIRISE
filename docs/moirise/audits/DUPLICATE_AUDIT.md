# AUDIT DES DOUBLONS DOCUMENTAIRES

## État

La documentation legacy active a été retirée de main avant reconstruction. La branche backup/documentation-before-rebuild conserve l'ancien ensemble.

L'arborescence active utilise exactement :
- un PLAN.md par module ;
- un TECHNICAL_DESIGN.md par module ;
- un AI_MASTER_PLAN.md ;
- un AI_TECHNICAL_DESIGN.md ;
- une source canonique par préoccupation transversale.

## Duplication interdite

Interdit :
- Mxx_Technical.md en parallèle de TECHNICAL_DESIGN.md ;
- deux definitions du même Capability ID ;
- deux provider registries ;
- deux politiques worker ;
- deux owners d'une même progression ;
- deux moteurs AI ;
- copie intégrale d'une règle de sécurité dans chaque module.

## Détection future

Pour chaque PR documentaire :
1. rechercher le nom de la règle ;
2. identifier son propriétaire ;
3. rechercher une formulation concurrente ;
4. remplacer les copies par une référence ;
5. mettre à jour l'index.

## Verdict

Les anciens fichiers concurrents ne sont plus dans l'arborescence docs/main. Toute future copie constitue une erreur de documentation à corriger avant implémentation.