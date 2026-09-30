# MOIRISE V3 — Documentation de référence

Cette arborescence est une reconstruction documentaire propre. Elle ne modifie ni ne supprime l'ancienne documentation `docs/moirise/` et ne touche pas au code applicatif.

## Hiérarchie obligatoire

1. `00_MASTER_PLAN.md` — vérité globale : vision, modules, dépendances, invariants et ordre de construction.
2. `01_MODULES/` — chaque module possède deux documents séparés : `PLAN.md` et `TECHNICAL_DESIGN.md`.
3. `02_AI/AI_MASTER_PLAN.md` — plan complet de l'IA.
4. `02_AI/AI_TECHNICAL_DESIGN.md` — conception technique détaillée de l'IA.
5. `03_TRANSVERSAL/` — contrats et règles communes, définis une seule fois.

## Règle de profondeur

Un plan explique ce qui doit exister, pourquoi, les comportements attendus et les dépendances. Une conception technique explique comment le construire jusqu'au niveau des données, états, interfaces, flux, erreurs, concurrence, sécurité, tests et récupération. La longueur n'est jamais une fin en soi : tout détail doit réduire une ambiguïté réelle.

## Règle anti-doublon

Une règle transversale possède une source canonique. Les modules la référencent et ne la recopient pas. Une règle spécifique au module reste dans son document. Une contradiction doit être résolue avant implémentation.

## Règle de couverture

Toute fonctionnalité déjà décidée pour MOIRISE doit apparaître dans le Master Plan, appartenir à un module propriétaire, avoir un plan, une conception technique et des critères de validation. Les fonctionnalités complexes doivent également posséder des scénarios détaillés.

## Principe puzzle

Un agent qui ouvre ces documents doit pouvoir déterminer : objectif -> contexte -> entrée -> décision -> action -> état suivant -> données -> contrat -> erreur -> récupération -> test -> définition de terminé, sans inventer les règles fondamentales.
