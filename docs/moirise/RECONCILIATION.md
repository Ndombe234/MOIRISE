# MOIRISE — RÉCONCILIATION DE LA DOCUMENTATION LEGACY

## Pourquoi repartir à zéro

L'ancien dossier docs mélangeait plusieurs générations de conception, plusieurs numérotations de modules et plusieurs formulations des frontières. Cela créait un risque qu'un agent choisisse le mauvais document.

La branche Git backup/documentation-before-rebuild conserve l'état documentaire précédent pour référence historique.

La branche main contient désormais une seule arborescence documentaire active.

## Correspondance conceptuelle

Ancienne Foundation/System core → M01 + M03.
Ancien Player → M02.
Ancien Social → M04 + M05.
Ancien World → M07 + M12 + M13 selon la responsabilité.
Ancien Play → M08.
Ancien Game Factory → M09.
Ancien Game Engine → M08.
Ancien Social Gaming → M06 + M10.
Ancien Communities → M06.
Ancien Events → M12.
Ancien Adaptive World → M03 + M12 + M13.
Ancien Collection → M11.
Ancien Meta AI Lab → M19 + M20.
Anciennes spécifications AI → M19 AI_MASTER_PLAN + AI_TECHNICAL_DESIGN + contrats transversaux.

Cette carte est une répartition de responsabilités, pas un renommage mécanique.

## Fonctionnalités préservées

La reconstruction conserve explicitement :
- Player ;
- SYSTEM ;
- social/feed ;
- messages privés ;
- communautés ;
- découverte ;
- quiz ;
- jeux 2D ;
- jeux 3D ;
- création de jeux par IA ;
- création image/vidéo/audio/musique/texte ;
- progression ;
- titres ;
- achievements ;
- collection ;
- roulette configurable ;
- événements ;
- notifications ;
- traduction ;
- modération ;
- analytics ;
- administration ;
- workers distribués ;
- provider adapters ;
- évolution IA contrôlée.

## Règle de résolution

En cas de conflit avec une ancienne formulation :
1. choisir le propriétaire dans MASTER_PLAN ;
2. conserver la contrainte métier compatible ;
3. déplacer la règle partagée vers transversal/ ;
4. supprimer la duplication ;
5. documenter toute décision incompatible avec le code existant ;
6. ajouter un test de non-régression.

## Ce qui n'est pas fait par la documentation

La documentation ne prétend pas que toutes ces fonctionnalités sont déjà codées. Elle définit le puzzle à construire et la preuve nécessaire pour déclarer chaque pièce terminée.