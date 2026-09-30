# MOIRISE — HANDOFF D'IMPLÉMENTATION

## Règle principale

Un agent commence par la documentation canonique puis inspecte le code réel. Il ne reconstruit pas une fonctionnalité en copiant le nom d'un ancien module.

## Ordre

1. MASTER_PLAN
2. PUZZLE_RULE
3. module PLAN
4. module TECHNICAL_DESIGN
5. contracts/security/error/event/testing
6. current repository evidence
7. code
8. migrations
9. tests
10. browser verification

## Lorsqu'un comportement existe déjà

A. vérifier s'il respecte le contrat ;
B. le conserver si compatible ;
C. le corriger si contraire ;
D. ne pas créer une seconde implémentation.

## Lorsqu'une fonctionnalité manque

Créer les types et contrats d'abord.
Puis persistance et authorization.
Puis service/domain.
Puis événements.
Puis UI.
Puis tests.
Puis browser verification.

## Lorsqu'une contradiction est trouvée

Stopper la modification locale.
Identifier le propriétaire.
Modifier la source canonique.
Ajouter ou modifier le test.
Reprendre l'implémentation.

## Lorsqu'un provider tombe

Ne pas remplacer le provider dans un module produit. Passer par M19 provider/resource routing.

## Lorsqu'une tâche longue tombe

Reprendre par taskId/lease/idempotency si le contrat le permet.

## Lorsqu'une sortie IA semble correcte

La traiter comme sortie non fiable jusqu'à validation. Les validators sont obligatoires pour les changements qui ont un effet métier ou produisent un artefact.

## Lorsqu'une action est destructive

Exiger policy, permission, confirmation lorsque nécessaire, audit et rollback possible.

## Preuve attendue pour chaque module

- commit/code ;
- migration si applicable ;
- tests pass ;
- browser check ;
- mobile check ;
- sécurité vérifiée ;
- aucune page blanche ;
- tous les boutons vérifiés ;
- fallback testé ;
- documentation mise à jour.