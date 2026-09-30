# MOIRISE — RAPPORT DE RECONSTRUCTION DOCUMENTAIRE

## Reconstruction

Documentation active reconstruite depuis une arborescence vide de docs/main.

## Sauvegarde

La documentation précédente reste disponible sur la branche :
backup/documentation-before-rebuild

## Contenu final

- 20 modules ;
- 20 Plans de module ;
- 20 Conceptions techniques ;
- 1 Plan Maître global ;
- 1 Plan Maître IA ;
- 1 Conception technique IA ;
- contrats transversaux ;
- dépendances ;
- modèle de données ;
- sécurité ;
- événements ;
- erreurs ;
- tests ;
- observabilité ;
- gouvernance ;
- définition de DONE ;
- index ;
- handoff ;
- audit couverture ;
- audit doublons ;
- preuve de l'état du dépôt ;
- réconciliation legacy.

## Règle de volume

L'objectif n'est pas de remplir arbitrairement un quota de caractères. Une conception qui répète la même phrase un million de fois est moins exploitable qu'un contrat précis. La cible est une compréhension au niveau puzzle : chaque pièce possède owner, inputs, outputs, states, permissions, mutation, events, failure and tests.

## Mesure de la reconstruction au moment du rapport

Les vérifications GitHub ont confirmé :
- 20 modules présents ;
- PLAN.md et TECHNICAL_DESIGN.md présents pour les 20 ;
- AI_MASTER_PLAN.md présent ;
- AI_TECHNICAL_DESIGN.md présent ;
- aucune ancienne convention de nommage Mxx_*.md active dans docs/main ;
- aucun ancien fichier *_TECHNICAL.md actif ;
- comparaison avec backup/documentation-before-rebuild : fichiers non-documentaires modifiés = 0.

## Code

La reconstruction documentaire ne prétend pas que les fonctionnalités sont codées. Elle fournit les contrats nécessaires pour les construire et les vérifier sans deviner.

## Dernière vérification

La vérification finale doit toujours être faite par build/typecheck/tests + navigateur, conformément à Definition of Done.
