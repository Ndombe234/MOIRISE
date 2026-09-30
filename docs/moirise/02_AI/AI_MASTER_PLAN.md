# MOIRISE — PLAN MAÎTRE IA

Version: 2.0

## Mission
Construire une couche d'intelligence capable de comprendre, contextualiser, planifier, autoriser, exécuter, vérifier, corriger et produire des résultats sans prétendre à des capacités indisponibles.

## Architecture canonique
1. Context Engine
2. Memory System
3. Intent & Requirement Interpreter
4. Planner
5. Capability Registry
6. Tool Registry
7. Provider Adapters
8. Policy/Safety Engine
9. Resource Planner
10. Orchestrator
11. Task/Execution Engine
12. Worker Registry/Scheduler integration
13. Validation/Evaluation
14. Self-Correction
15. Artifact/Provenance Graph
16. User Experience Behavior Engine
17. Personalization/Recommendation interfaces
18. Observability/Evaluation

## Cycle
Observe → Contextualise → Comprend → Autorise → Planifie → Réserve ressources → Exécute → Valide → Corrige ou demande intervention → Produit résultat → Mémorise uniquement ce qui doit l'être.

## Capacités
Code, analyse, tests, automatisation autorisée, jeux 2D/3D, image, vidéo, audio/musique, texte, traduction, prototypage, planification, diagnostic et orchestration.

Une capacité n'existe officiellement que lorsqu'elle possède contrat, implémentation, permissions, ressources, validation, limites, observabilité et tests.

## Calcul distribué
Les tâches peuvent être exécutées localement, sur Trusted Workers, Community Workers opt-in ou providers/cloud. Le scheduler choisit selon capacité, quota, confiance, santé, latence, politique et coût. Les machines forment un pool distribué de calcul : elles ne fusionnent pas leur RAM.

## UX et parcours
L'IA observe la phase du parcours et l'attention. Pendant les deux premières minutes, elle peut guider et révéler progressivement des possibilités réelles. Elle ne fabrique jamais de faux événement, fausse rareté ou faux compteur. Un rappel de demain doit correspondre à une vraie condition future.

## Mémoire
Session, Player, projet et système. Chaque mémoire possède portée, rétention, sensibilité, propriétaire, droit de suppression et règles d'utilisation. Une préférence n'est jamais une permission.

## Création de jeux
Intention → GameSpec → plan → tâches → code/assets → build → sandbox → tests → validation → correction → version → publication.

## Création média
Intention → brief structuré → plan de ressources → génération → validation → provenance → révision → export.

## Évolution
Ajouter du code ne rend pas automatiquement l'IA plus intelligente. Toute nouvelle capacité passe par le Capability Registry, des tests, des permissions, une politique et une validation.

## Maturité des capacités
L0 conceptuelle; L1 implémentée sous feature flag; L2 validée en environnement contrôlé; L3 éligible production avec observabilité/récupération; L4 scalable sur workers/providers admissibles.

## Autonomie
A0 réponse; A1 suggestion d'outil; A2 exécution avec approbation; A3 graphe autonome borné; A4 workflow orchestré long avec politique explicite. Les permissions utilisateur et politiques plateforme plafonnent l'autonomie.

## Séparation métier
M19 recommande et orchestre mais ne possède pas les faits métier. Les événements, récompenses, jeux, profils et états restent sous l'autorité de leurs modules canoniques.

## Traçabilité
Intent → Capability → Tool/Provider → Resource class → Validation → Artifact/Event → User-facing outcome → Tests.
