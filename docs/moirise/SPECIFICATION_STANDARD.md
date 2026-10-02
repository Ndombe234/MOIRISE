# MOIRISE — STANDARD DE SPÉCIFICATION
## Niveau 4 — Contrat comportemental détaillé

> Ce document est un standard. Il ne remplace pas les PLAN.md des modules.

## 1. Une fonctionnalité doit être spécifiée par niveaux

### Niveau A — Résultat attendu
Qu'est-ce que l'utilisateur ou le système doit obtenir ?

### Niveau B — Parcours
Quel acteur déclenche quoi, dans quel contexte, et avec quel objectif ?

### Niveau C — Règles métier
Quelles conditions autorisent, refusent ou dégradent l'action ?

### Niveau D — États
Quels sont tous les états ? Quelles transitions sont permises ?

### Niveau E — Données
Quelles données sont entrantes, dérivées, persistées, projetées ou supprimées ?

### Niveau F — Interaction inter-module
Quel owner intervient avant, pendant ou après ?

### Niveau G — Exceptions
Que se passe-t-il pour chaque classe d'erreur, réseau, concurrence, permission, dépendance ou contenu invalide ?

### Niveau H — Expérience
Que voit l'utilisateur en LOADING, READY, EMPTY, ERROR, UNAVAILABLE et DEGRADED ?

### Niveau I — Validation
Quels résultats peuvent être VALID, INVALID, DEGRADED ou INCONCLUSIVE ?

### Niveau J — DONE
Quelles preuves sont nécessaires pour déclarer la fonctionnalité terminée ?

## 2. Format obligatoire

Pour une capacité importante :

acteur → déclencheur → préconditions → contexte → inputs → ordre exact → guards → transformation → mutation → projection → événements → erreurs → récupération → sécurité → privacy → observabilité → tests → DONE.

## 3. Cas particuliers obligatoires

Quand pertinent :
- double clic ;
- reprise après perte réseau ;
- deux onglets ;
- deux writers concurrents ;
- session expirée ;
- permission retirée pendant l'action ;
- source supprimée ;
- provider indisponible ;
- timeout ;
- réponse perdue après commit ;
- données stale ;
- commande rejouée ;
- version incompatible ;
- fallback déterministe.

## 4. Media specification

Une opération média doit en plus définir :
sourceRef, consent/usage policy, provenance, modality, analysis, protected-element policy, transformation depth, generation target, validators, derivation graph, publication policy, deletion/revocation behavior.

## 5. AI specification

Une opération AI doit en plus définir :
intent, context scope, privacy class, capabilities, tools, requirements, autonomy, resources, deadline, validator, memory policy, evidence refs, provider-independent fallback.

## 6. Social specification

Une opération sociale doit en plus définir :
visibility, audience, block behavior, privacy, relationship context, share target, rate limit, dedupe, notification policy, return path et anti-manipulation.

## 7. Game specification

Un jeu doit définir :
mode 2D/3D, core loop, controls, duration, win/loss, target devices, resource budget, security sandbox, runtime manifest, test plan, social hook et publication criteria.


# D100 — SPECIFICATION STANDARD — PROFONDEUR OBLIGATOIRE
## Feature matrix
Every important feature should be representable as a matrix of actors × states × inputs × permissions × outputs × errors × recovery × platforms.
## State completeness
For every state list entry condition, allowed actions, forbidden actions, outgoing transitions, timeout/expiry, recovery and projection. Unknown states are invalid.
## Data completeness
For every field identify source, type/shape, required/optional, normalization, retention, privacy, mutability, index/cache behavior and deletion propagation.
## Decision completeness
Every automatic decision states inputs, deterministic rules, AI contribution, confidence/evidence, owner authority and fallback without AI.
## Browser completeness
Every interactive capability declares desktop path, mobile path, touch/keyboard behavior, loading/empty/error/unavailable/degraded UI and recovery actions.
## Proof completeness
Each acceptance criterion maps to a test or production evidence artifact. A sentence such as “works” is not evidence.
