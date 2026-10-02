# MOIRISE — ARCHITECTURE MAÎTRE
## Niveau 1 — Carte structurelle canonique

## 1. Autorité

Ce document se situe sous PRODUCT_CONSTITUTION.md et au-dessus du MASTER_PLAN.md.

Il décrit les relations structurelles globales sans prendre la place des owners métier.

## 2. Carte générale

```
PRODUCT CONSTITUTION
        ↓
ARCHITECTURE MASTER
        ↓
MASTER PLAN
        ↓
MODULE PLAN
        ↓
TECHNICAL DESIGN
        ↓
SPECIFICATIONS
        ↓
IMPLEMENTATION CONTRACTS
        ↓
CODE / MIGRATIONS
        ↓
TESTS / BROWSER / PRODUCTION
```

Pour MORISE AI, une constitution AI spécialisée s'intercale entre l'Architecture Master et le AI Master Plan.

## 3. Les quinze modules

M01 Foundation — runtime, shell, auth, routing, boundaries, events.
M02 Player — identité, profil, préférences, confidentialité.
M03 Social — contenu social et messages privés.
M04 World — surface World et handoffs.
M05 System — progression et SYSTEM visible.
M06 Play — sessions et résultats autoritatifs.
M07 Game Discovery — recherche, ranking, recommandations et feedback.
M08 Game Factory — fabrication A→Z.
M09 Shared Game Engine — runtime commun 2D/3D.
M10 Social Gaming — challenges et hooks sociaux autour des jeux.
M11 Communities — communautés, guilds, memberships.
M12 Events — états événementiels réels.
M13 Adaptive — convergence, adaptation, retrieval.
M14 Collection/Reward — ledger, collection, roulette, récompenses.
M15 Meta System + MORISE AI Lab — intelligence et orchestration.

## 4. Flux structurels

### Identité
M01 → M02 → projections autorisées vers les autres modules.

### Social
M02 → M03 → M07/M10/M11/M12/M13 selon contrats.

### Progression
événements validés → M05/M14 selon owner → projection SYSTEM.

### Games
demande → M15 orchestration → M08 fabrication → M09 runtime → M06 session/résultat → M07 découverte → M10 social gaming → M14 reward when applicable.

### Media / Creative
source autorisée → M03/M02 selon owner → M15 analyse/génération → owner commit → M07 discovery ou M04 World selon policy.

### Adaptation
signaux autorisés → M13 proposition → owner validation → événement/projection.

## 5. M15

M15 est transversal mais pas omnipropriétaire.

Il possède les mécanismes IA centraux :
Request Gate, Context Engine, Intent/Requirements compilation, Planner, Policy, Capability/Tool Registry, Provider Router, Resource Planner, Validation, Memory, Experience, Evaluation, Evolution et AI Lab.

Il ne possède pas les mutations métier des M01–M14.

## 6. Contrat inter-module

Un module communique au travers de :
- use-case ;
- event versionné ;
- projection versionnée ;
- référence d'artifact ;
- capability contract.

Il ne recopie pas le code métier d'un autre owner.

## 7. Source de vérité

Le chemin canonique d'une feature est :
Constitution → Architecture → Plan → Technical Design → Specification → Contract → Implementation → Test → Evidence.

Une contradiction est résolue de haut en bas uniquement lorsqu'elle concerne un invariant supérieur ; une règle métier d'un owner reste chez cet owner.

## 8. Cross-cutting primitives

Les primitives transversales ont un owner explicite et ne deviennent pas des modules 16+ :
Living Objects, Evolution Engine, Fun & Surprise, MORISE DNA, Convergence, Missions, World Memory, Social/Community/Game Discovery Intelligence, Creative AI, Translation, Safety/Moderation, Provider Router, Resource Scheduler, Distributed Workers et Zero-API/on-device AI.

## 9. Anti-duplication

Il n'existe qu'un :
- cerveau MORISE ;
- Provider Router ;
- Memory Service ;
- Validation Engine ;
- Evolution pipeline ;
- reward ledger ;
- progression authority ;
- event authority ;
- play result authority.

Un nouveau mécanisme doit d'abord rechercher l'owner existant avant de créer une nouvelle abstraction.
