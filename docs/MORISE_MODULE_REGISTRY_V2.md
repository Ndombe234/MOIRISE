# MORISE — MODULE REGISTRY / CONCEPTION TECHNIQUE V2

Date: 2026-09-29
Status: CANONICAL MODULE REGISTRY
Branch: reset/modules-1-6-clean

## 1. OBJECTIF

Ce document verrouille la numérotation officielle de MORISE.

**MORISE possède 15 modules fonctionnels.** Les nombres de sections présents dans les documents techniques ne sont pas des modules.

La conception distingue strictement : 15 modules fonctionnels; briques transversales; sections techniques; providers et infrastructure.

## 2. MODULES OFFICIELS 1→15

| # | Module | Mission | État |
|---|---|---|---|
| 1 | FOUNDATION | bootstrap, identité, auth, runtime, sécurité, i18n, capacités | EN COURS |
| 2 | PLAYER | identité Player, préférences, progression, confidentialité, appareil | APRÈS M1 |
| 3 | SOCIAL | feed, posts, réactions, commentaires, messages privés, traduction | FUTUR |
| 4 | WORLD | monde persistant/réactif, mémoire, objets vivants, règles | FUTUR |
| 5 | SYSTEM / PROGRESSION | orchestration contextuelle, progression, titres, déverrouillages | FUTUR |
| 6 | PLAY / FINAL QA | expériences jouables, First Contact et QA finale du socle | MODULE COURANT |
| 7 | GAME DISCOVERY ENGINE | découverte, filtrage, classement et recommandation d'expériences | FUTUR |
| 8 | GAME A→Z FACTORY | création d'expériences de la spécification à la version validée | FUTUR |
| 9 | SHARED GAME ENGINE | moteur partagé des expériences et replays | FUTUR |
| 10 | SOCIAL GAMING | co-play, défis, ghost, relais et résultats validés | FUTUR |
| 11 | COMMUNITIES | communautés, guildes, membres, rôles et modération | FUTUR |
| 12 | EVENTS | événements, saisons, étapes, participation et résultats | FUTUR |
| 13 | ADAPTIVE WORLD | évolution contrôlée du monde depuis des événements validés | FUTUR |
| 14 | COLLECTION / REWARD ECONOMY | collections, récompenses, titres, ledger et économie interne | FUTUR |
| 15 | META SYSTEM + AI LAB | expérimentation, évaluation, benchmark, apprentissage contrôlé | FUTUR |

## 3. CE QUI N'EST PAS UN MODULE

Les éléments suivants sont des briques transversales ou des expériences internes : MORISE AI Orchestrator, Capability Registry, Dependency Registry, Provider Router, Memory Vault, Translation Service, Creative/Media Gateway, World Memory, MORISE DNA, Convergence, Living Objects, Evolution Engine, Emergent Missions, World Agents, First Contact, MORISE Moment, MORISE Relay, Living Stories, audit, observabilité, i18n et détection des capacités appareil.

Ils peuvent être utilisés par plusieurs modules et ne deviennent pas automatiquement des modules ou des onglets utilisateur.

## 4. RESPONSABILITÉS PAR MODULE

### MODULE 1 — FOUNDATION
Bootstrap, runtime config, auth/session, profil minimal, routing, storage, registries, feature states, erreurs, observabilité, i18n et sécurité.

### MODULE 2 — PLAYER
Profil, préférences, confidentialité, progression, titres, historique, contexte appareil et références Memory Vault.

### MODULE 3 — SOCIAL
Feed, posts, commentaires, réactions, conversations privées, notifications, traduction dérivée, partage contrôlé et hooks de modération.

### MODULE 4 — WORLD
World State, World Memory, Living Objects, règles, événements, découvertes, anomalies et snapshots/versioning.

### MODULE 5 — SYSTEM / PROGRESSION
Résolution intention/contexte, règles de progression, XP validée, titres, déverrouillages, orchestration et présentation SYSTEM.

### MODULE 6 — PLAY / FINAL QA
Sessions de jeu, actions, validation, runtime, replay, First Contact, MORISE Moment, Relay/Living Stories et QA complète du socle.

### MODULE 7 — GAME DISCOVERY ENGINE
Catalogue, compatibilité, filtrage, ranking, diversification, feedback et recommandations.

### MODULE 8 — GAME A→Z FACTORY
IDEA → SPEC → RULES → CONTENT → SCENE → LOGIC → ASSETS → VALIDATION → VERSION, avec build, tests et réparation.

### MODULE 9 — SHARED GAME ENGINE
Scene, entities, input, interaction, physics, rules, timers, save/checkpoint, replay, audio hooks, rendering adapters et événements réseau.

### MODULE 10 — SOCIAL GAMING
Modes synchrones/asynchrones, coopération, compétition, ghost, défis et relais; serveur autoritaire sur scores, résultats et récompenses.

### MODULE 11 — COMMUNITIES
Communautés, guildes, memberships, rôles, permissions, feeds communautaires, modération et progression collective.

### MODULE 12 — EVENTS
Événements, saisons, stages, eligibility, participation, scheduler, validation et archivage; serveur autoritaire sur le temps.

### MODULE 13 — ADAPTIVE WORLD
Evolution Engine, World Memory, Convergence, emergent missions, World Agents et snapshots, avec transitions versionnées et auditées.

### MODULE 14 — COLLECTION / REWARD ECONOMY
Collections, rareté, récompenses, titres, achievements, creator milestones, reward ledger, anti-fraud et adapters publicitaires/affiliation.

### MODULE 15 — META SYSTEM + AI LAB
AI Orchestrator, expérimentation, évaluation, benchmarks, apprentissage candidat, policy gates, rollout et rollback. Aucune auto-modification directe de production.

## 5. BRIQUES TRANSVERSALES

AI Orchestrator : coordonne les capacités des Modules 1→15.

Provider Router : deterministic → browser → local → self-hosted → cloud/API → unavailable, selon politique, appareil, confidentialité et disponibilité.

Memory Vault : STORE, ANALYZE, SHARE et TRAIN sont séparés. Privé par défaut.

Translation : 20 locales canoniques, cache avant nouveau calcul, fallback anglais.

Creative Gateway : image, musique, audio et vidéo sont des capacités optionnelles.

Capability State : PLANNED → IMPLEMENTED → PENDING_DEPENDENCY → AVAILABLE → CONFIGURED → AUTHORIZED → ENABLED → EXECUTING → VALIDATING, puis COMPLETED/DEGRADED/FAILED/DISABLED/MAINTENANCE/UNAVAILABLE.

### PostHog — OBSERVABILITY / LEARNING SIGNALS

PostHog est ajouté comme **couche optionnelle d'observation et d'expérimentation**, principalement pour le Module 15 et les besoins transversaux d'analytics.

Il ne constitue pas le cerveau de MORISE et ne modifie jamais directement le comportement de production.

Flux autorisé :

`USER ACTION → MORISE EVENT → POSTHOG OBSERVATION → ANALYSIS → CANDIDATE SIGNAL → OFFLINE EVALUATION → POLICY/SAFETY CHECK → CANARY → APPROVE/ROLLBACK`

PostHog peut fournir des signaux sur les parcours, l'engagement, les erreurs, les abandons et les résultats d'expériences afin d'aider MORISE à améliorer progressivement ses recommandations et politiques. Les données privées et la Memory Vault restent séparées de la télémétrie analytique.

PostHog doit être désactivable si le provider n'est pas configuré. Son absence ne doit jamais bloquer le fonctionnement principal de MORISE.

## 6. ORDRE OFFICIEL

MODULE 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13 → 14 → 15.

Position actuelle : MODULE 6 — PLAY / FINAL QA.

Les Modules 7→15 sont documentés pour verrouiller l'architecture future, mais ils ne sont pas activés avant la validation du Module 6.

## 7. CONFUSION 24/25

Les nombres 24 et 25 visibles dans la conception technique sont des numéros de sections techniques, pas des modules.

Donc : **NOMBRE OFFICIEL DE MODULES MORISE = 15.**

## 8. SOURCES CANONIQUES

1. docs/MORISE_MASTER_PLAN_V3.md — vérité fonctionnelle.
2. docs/MORISE_TECHNICAL_MASTER_ARCHITECTURE.md — architecture technique 1→15.
3. docs/MORISE_IMPLEMENTATION_SPEC_V1.md — contrats d'implémentation et matrice Module → Fichier → Service → Test.
4. docs/MORISE_IMPLEMENTATION_CONTRACTS.md — contrats SQL, TypeScript, événements et actions.

Aucun agent ne doit inventer un Module 16+ sans décision explicite et mise à jour des sources canoniques.