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
- revenir en arrière lorsqu'une amélioration régresse.

## Non-dépendance

MORISE AI ne doit pas dépendre de Gemini, DeepSeek, Pollinations, OpenRouter ou d'un autre provider comme cerveau permanent.

Les providers sont des adapters interchangeables.

## Pipeline canonique

`REQUEST → AUTH → POLICY → CONTEXT → INTENT → PLAN → CAPABILITY → PROVIDER/LOCAL → ACTION → VALIDATE → RESPONSE → EVENT → MEMORY → OBSERVATION → LEARNING`

Pour une évolution :
`OBSERVE → GAP → HYPOTHESIS → CANDIDATE → SANDBOX → TEST → BENCHMARK → POLICY → CANARY → PROMOTE/REJECT → MONITOR → ROLLBACK`

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

## Règle d'interface

L'utilisateur voit environ 5–6 portes principales. Les capacités internes sont orchestrées par MORISE SYSTEM et n'ajoutent pas de boutons permanents.

## Règle de confidentialité

Le contexte envoyé à un provider doit être minimal et autorisé. Les conversations privées, médias privés et données sensibles ne sont jamais utilisés automatiquement pour apprendre ou envoyés à un provider non autorisé.

## Règle d'apprentissage

Une sortie externe est une expérience/evidence, pas automatiquement une vérité.

## Règle d'auto-évolution

Aucun code généré ne passe directement en production.

## Règle finale

MORISE AI doit toujours pouvoir répondre à la question :
- pourquoi cette capacité ?
- pourquoi ce provider ?
- quelles permissions ?
- quel résultat attendu ?
- comment le résultat est validé ?
- que mémorise-t-on ?
- pourquoi cela peut améliorer MORISE ?
- comment annuler l'amélioration ?
