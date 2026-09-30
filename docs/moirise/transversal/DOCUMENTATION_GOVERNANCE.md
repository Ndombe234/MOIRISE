# GOUVERNANCE DOCUMENTAIRE

## Une seule vérité par règle

Une règle appartient à un seul document propriétaire. Les autres documents la référencent.

## Priorité

1. MASTER_PLAN
2. BUILD_ORDER
3. module PLAN
4. module TECHNICAL_DESIGN
5. AI_MASTER_PLAN / AI_TECHNICAL_DESIGN
6. contrats transversaux pour les préoccupations partagées
7. code existant comme preuve à inspecter

## Obsolescence

Une ancienne spécification n'est pas laissée à côté d'une nouvelle avec le même poids. Elle est supprimée de la documentation active ou explicitement archivée hors de l'arborescence canonique.

## Modification

Toute modification importante doit mettre à jour :
- le propriétaire de la règle ;
- les dépendances ;
- les contrats affectés ;
- les tests d'acceptation ;
- l'audit de couverture.

## Anti-duplication

Avant d'ajouter une règle, rechercher son propriétaire. Si elle existe déjà, ajouter une référence. Si elle doit changer globalement, modifier son propriétaire au lieu de copier le texte.

## Profondeur

Le Plan décrit ce que le module doit accomplir.
La Conception technique décrit comment le construire.
Une conception technique doit être assez précise pour réduire l'interprétation humaine ou agentique au minimum raisonnable.
