# MOIRISE — STANDARD DE CONTRAT D'IMPLÉMENTATION
## Niveau 5 — Contrat directement exploitable par l'agent de développement

> Ce document ne définit pas une feature. Il définit le niveau de précision requis avant fabrication.

## 1. Contract package

Chaque unité d'implémentation importante doit fournir :

```
UnitId
OwnerModule
CapabilityId
SourceDocs
Inputs
Schemas
Preconditions
Authority
FilesExpected
FunctionsExpected
Dependencies
StateTransitions
Persistence
Events
Outputs
Errors
Recovery
Security
Privacy
Observability
Tests
AcceptanceEvidence
Done
```

## 2. FilesExpected

Le contrat indique :
- emplacement attendu ;
- rôle du fichier ;
- propriétaire logique ;
- dépendances autorisées ;
- imports interdits ;
- duplication à éviter.

Un agent ne crée pas arbitrairement un nouvel emplacement lorsque le owner existant couvre déjà la responsabilité.

## 3. Function contract

Toute fonction métier critique doit préciser :
- signature ;
- input validation ;
- caller ;
- authority check ;
- side effects ;
- transaction boundary ;
- idempotency ;
- return shape ;
- error codes ;
- telemetry class.

## 4. Persistence contract

Toute écriture doit préciser :
- source d'autorité ;
- transaction ;
- contraintes uniques ;
- optimistic version si nécessaire ;
- rollback ;
- event-after-commit ;
- projection invalidation ;
- retention/deletion.

## 5. API contract

Toute API doit préciser :
- route ;
- method ;
- auth;
- input schema ;
- output schema ;
- errors ;
- rate limit ;
- idempotency;
- pagination ;
- cache policy ;
- audit policy.

Le frontend ne choisit jamais un provider directement.

## 6. Event contract

```
eventId
eventType
schemaVersion
producerModule
occurredAt
commandId?
requestId?
actorRef?
payloadRef
```

Un événement signifie qu'un fait a déjà été committé.

## 7. AI contract

L'agent doit connaître :
- le module owner ;
- la capability ;
- le contexte autorisé ;
- la mutation autorisée ;
- le validator ;
- le fallback ;
- la mémoire autorisée ;
- le niveau d'autonomie maximal.

Une sortie AI n'est jamais une mutation métier par défaut.

## 8. Browser acceptance

Chaque feature doit être testée au minimum :
- deep-link ;
- refresh ;
- back/forward ;
- mobile ;
- desktop ;
- clavier lorsque pertinent ;
- erreur ;
- retry ;
- réseau dégradé ;
- aucun écran blanc.

## 9. Integration acceptance

Après implémentation :
typecheck → tests → build → integration → browser → regression → production evidence.

## 10. Agent handoff

Un agent qui termine une unité doit fournir :
- fichiers modifiés ;
- migrations ;
- contracts used ;
- tests ajoutés/exécutés ;
- erreurs rencontrées ;
- fallback ;
- limites ;
- evidence ;
- statut DONE ou BLOCKED avec cause exacte.

## 11. Interdictions

L'agent ne doit pas :
- créer un deuxième cerveau IA ;
- créer un deuxième Memory Service ;
- appeler directement un provider depuis l'UI ;
- écrire dans le domaine d'un autre owner ;
- créer de faux contenus pour masquer un état vide ;
- supprimer une validation pour faire passer les tests ;
- déclarer DONE sans preuve.
