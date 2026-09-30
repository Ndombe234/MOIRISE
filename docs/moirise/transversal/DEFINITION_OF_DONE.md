# DEFINITION OF DONE — MOIRISE

Un module n'est DONE que si :

## Architecture
- ownership unique ;
- dépendances explicites ;
- aucun second propriétaire caché ;
- aucun contrat dupliqué.

## Backend
- schéma stable ;
- constraints ;
- migrations ;
- RLS/authorization ;
- idempotence ;
- transactions ou jobs ;
- erreurs normalisées.

## Frontend
- loading ;
- empty ;
- error ;
- unavailable ;
- degraded ;
- actions visibles fonctionnelles ;
- navigation retour ;
- mobile ;
- desktop ;
- accessibilité de base.

## AI
- capability ID ;
- policy ;
- provider adapter ;
- fallback ;
- validator ;
- provenance si artefact ;
- pas de secret ;
- sandbox pour code.

## Data
- owner ;
- privacy ;
- retention ;
- deletion ;
- cache policy ;
- index.

## Events
- événement canonique ;
- schemaVersion ;
- traceId/requestId lorsque pertinent ;
- pas de contenu privé inutile.

## Tests
- unit ;
- integration ;
- auth/RLS ;
- contract ;
- browser ;
- mobile ;
- resilience ;
- adversarial pour les surfaces sensibles.

## Vérification
- build ;
- typecheck ;
- lint ;
- tests ;
- navigateur ;
- toutes les actions ;
- aucune page blanche.

Une fonctionnalité ne peut pas être déclarée terminée uniquement parce que son écran rend correctement.