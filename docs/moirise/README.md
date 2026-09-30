# MOIRISE — DOCUMENTATION CANONIQUE

Cette arborescence est la seule référence documentaire active de MOIRISE.

## Règle absolue

Le code existant du dépôt est une réalité à inspecter, mais il n'est pas une autorité métier lorsque la documentation canonique définit un comportement différent. Une divergence entre code et contrat documentaire doit être signalée avant modification.

La documentation est organisée en quatre niveaux :

1. Plan Maître produit : vision complète, modules, dépendances, invariants, parcours et ordre.
2. Plan de module : comportement exhaustif et périmètre de chaque module.
3. Conception technique : mécanisme d'implémentation détaillé jusqu'aux contrats, états, données, erreurs, sécurité et tests.
4. Architecture IA et contrats transversaux : règles partagées une seule fois.

## Profondeur attendue

Une exigence n'est jamais considérée comme suffisamment décrite par un simple nom. Pour toute fonctionnalité, la documentation doit permettre à un agent d'implémentation de déterminer :

- le propriétaire de la règle ;
- les entrées autorisées ;
- le contexte requis ;
- l'état initial ;
- les états possibles ;
- la transition déclenchée ;
- la mutation effectuée ;
- l'autorisation nécessaire ;
- les invariants ;
- les événements émis ;
- la réponse utilisateur ;
- les états loading/empty/error/unavailable/degraded ;
- les stratégies de retry et de récupération ;
- les limites de concurrence ;
- les données persistées ;
- les règles de confidentialité ;
- l'observabilité ;
- les tests de réussite et d'échec ;
- la définition de DONE.

Le corpus privilégie la précision utile. Le nombre de caractères n'est pas une unité de qualité : les volumes sont étendus lorsque la complexité réelle l'exige, sans remplissage répétitif.

## Architecture du dépôt documentaire

~~~text
docs/moirise/
  MASTER_PLAN.md
  BUILD_ORDER.md
  PUZZLE_RULE.md
  modules/
    M01-foundation/
      PLAN.md
      TECHNICAL_DESIGN.md
    ...
    M20-administration/
      PLAN.md
      TECHNICAL_DESIGN.md
  ai/
    AI_MASTER_PLAN.md
    AI_TECHNICAL_DESIGN.md
  transversal/
    CONTRACTS.md
    DEPENDENCIES.md
    DATA_MODEL.md
    SECURITY.md
    EVENT_CATALOG.md
    ERROR_MODEL.md
    TESTING.md
    OBSERVABILITY.md
    DOCUMENTATION_GOVERNANCE.md
  audits/
    FEATURE_COVERAGE.md
    DUPLICATE_AUDIT.md

## Source d'architecture actuelle

Le dépôt est une application Next.js App Router avec React et TypeScript et une couche Supabase. La documentation reste structurée par frontières de service afin de pouvoir faire évoluer les fournisseurs sans propager leurs SDK dans les modules produit.

## Principes

- Player central.
- SYSTEM transverse, contextuel et non spammy.
- Navigation permanente volontairement réduite.
- Jeux 2D et 3D de première classe.
- Création et exécution de jeux séparées.
- IA provider-agnostic.
- Workers distribués et isolés ; jamais de RAM partagée fictive.
- Sécurité serveur autoritaire.
- Une règle métier possède une source canonique.
- Pas de fausse urgence, faux compteur, fausse rareté ou événement inventé.
- Les résultats critiques sont idempotents et validés.
