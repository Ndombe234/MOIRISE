# MORISE AI — MASTER TECHNICAL DESIGN V2

## Authority

Ce dossier est la seule source canonique pour la conception interne de MORISE AI.

Le AI Engine est transversal aux 15 modules. Un module ne possède jamais son propre cerveau.

## Mission

MORISE AI doit pouvoir :
- comprendre une intention ;
- construire un contexte minimal ;
- choisir des capacités ;
- choisir un fournisseur ou un mécanisme local ;
- exécuter des actions autorisées ;
- valider les résultats ;
- mémoriser les expériences autorisées ;
- apprendre des succès/échecs ;
- créer des expériences multimodales ;
- concevoir des jeux ;
- produire des candidats d'amélioration ;
- tester les candidats ;
- optimiser l'utilisation des ressources ;
- répartir les tâches sur plusieurs workers ;
- revenir en arrière lorsqu'une amélioration régresse.

## Non-dépendance

MORISE AI ne doit pas dépendre de Gemini, DeepSeek, Pollinations, OpenRouter ou d'un autre provider comme cerveau permanent.

Les providers sont des adapters interchangeables.

Le calcul physique est également découplé de la machine de développement. Un ordinateur de 16 Go peut être le poste initial sans devenir le plafond permanent du système : MORISE peut déléguer des tâches à des workers autorisés possédant d'autres CPU, RAM ou GPU.

## Pipeline canonique

`REQUEST → AUTH → POLICY → CONTEXT → INTENT → PLAN → CAPABILITY → RESOURCE ROUTER → PROVIDER/LOCAL/WORKER → ACTION → VALIDATE → RESPONSE → EVENT → MEMORY → OBSERVATION → LEARNING`

Pour une évolution :
`OBSERVE → GAP → HYPOTHESIS → CANDIDATE → SANDBOX → TEST → BENCHMARK → POLICY → CANARY → PROMOTE/REJECT → MONITOR → ROLLBACK`

## Architecture distribuée

`AI ORCHESTRATOR → TASK SCHEDULER → WORKER REGISTRY → COMPATIBLE WORKER → SANDBOX → RESULT → VALIDATION`

Un worker est une machine ou un processus autorisé qui annonce ses capacités et exécute uniquement les tâches qui lui sont attribuées.

Le Worker Registry doit connaître au minimum :
- workerId ;
- état : online / busy / offline ;
- CPU ;
- RAM disponible ;
- GPU/VRAM si disponible ;
- capacités ;
- limite de concurrence ;
- version du worker ;
- dernière télémétrie ;
- politique de confiance ;
- permissions ;
- capacité de recevoir/rendre les artefacts.

Le Scheduler choisit un worker selon la capacité demandée, les ressources disponibles, la priorité, la confidentialité, la santé, la latence, les quotas et les contraintes de la tâche.

Ajouter ou retirer un worker ne doit pas nécessiter de modifier le cœur de MORISE.

## Contrats AI

Les contrats fondamentaux vivent dans :
- `01_CORE_ORCHESTRATOR.md`
- `02_CONTEXT_INTENT_REASONING.md`
- `03_CAPABILITY_PROVIDER_ROUTER.md`
- `04_MEMORY_EXPERIENCE_LEARNING.md`
- `05_CREATIVE_MEDIA_GAME_CREATOR.md`
- `06_EVOLUTION_CODE_SANDBOX.md`
- `07_DATA_SECURITY_PROVENANCE.md`
- `08_RESOURCE_SCHEDULER_OBSERVABILITY.md`
- `09_AI_ACTIONS_AND_CONTRACTS.md`
- `10_PROVIDER_REGISTRY.md`
- `11_GAME_CREATION_RUNTIME_CONTRACT.md`
- `12_DISTRIBUTED_WORKER_CLUSTER.md`

## Règle d'interface

L'utilisateur voit environ 5–6 portes principales. Les capacités internes sont orchestrées par MORISE SYSTEM et n'ajoutent pas de boutons permanents.

## Règle de confidentialité

Le contexte envoyé à un provider ou un worker doit être minimal et autorisé. Les conversations privées, médias privés et données sensibles ne sont jamais utilisés automatiquement pour apprendre ou envoyés à un provider/worker non autorisé.

## Règle d'apprentissage

Une sortie externe est une expérience/evidence, pas automatiquement une vérité.

## Règle d'auto-évolution

Aucun code généré ne passe directement en production.

## Règle worker

Aucun worker externe ne reçoit les secrets de production. Un worker ne reçoit que le job signé, les données strictement nécessaires et les permissions temporaires associées au job.

## Règle finale

MORISE AI doit toujours pouvoir répondre à la question :
- pourquoi cette capacité ?
- pourquoi ce provider ou ce worker ?
- quelles permissions ?
- quel résultat attendu ?
- comment le résultat est validé ?
- que mémorise-t-on ?
- pourquoi cela peut améliorer MORISE ?
- comment annuler l'amélioration ?
- quelle ressource physique exécute réellement la tâche ?
