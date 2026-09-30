# MOIRISE AI — PLAN MAÎTRE

## 1. Mission

M19 est le système d'intelligence transversal de MOIRISE. Il ne s'agit pas d'un simple appel à un modèle de langage. L'architecture doit permettre de comprendre une intention, construire le contexte minimum autorisé, choisir une capacité, planifier un travail, sélectionner une cible d'exécution, exécuter des actions bornées, valider le résultat, corriger lorsque cela est permis, conserver une expérience sûre et mesurable, puis présenter le résultat dans le SYSTEM.

L'ajout de code ne rend pas mécaniquement un modèle plus intelligent. Une capacité nouvelle nécessite un contrat de capacité, une implémentation ou un adaptateur, des policies, des validateurs, des tests, des ressources et une entrée dans les registries. Un provider est interchangeable ; il n'est jamais le cerveau architectural.

## 2. Position

~~~text
Modules produit
→ Capability Request
→ M19 AI
  → Context
  → Memory
  → Intent
  → Planner
  → Capability Registry
  → Tool Registry
  → Policy/Safety
  → Resource Router
  → Orchestrator
  → Task Engine
  → Validation
  → Self-Correction
  → Provenance
  → Evaluation/Evolution
→ Local / Trusted Worker / Community Worker / Provider Adapter
~~~

M19 utilise M18 pour l'exécution distribuée. M19 ne remplace pas M01, M11, M13, M14 ou M20 comme autorité.

## 3. Ownership

M19 possède AIRequest, context assembly, intent interpretation, plans/task graphs, capabilities, actions allow-listed, provider adapters, resource routing request, validation, AI memory/experience, provenance, bounded self-correction and evolution evaluation.

M19 ne possède pas l'identité de sécurité, la progression/récompense, les sanctions de Trust & Safety, la livraison des notifications ou les permissions administratives globales.

## 4. Boucle canonique

~~~text
OBSERVE
→ AUTHENTICATE
→ POLICY CHECK
→ CONTEXTUALIZE
→ UNDERSTAND
→ PLAN
→ RESERVE RESOURCES
→ EXECUTE
→ VALIDATE
→ CORRECT OR ASK
→ COMMIT
→ EVENT
→ SAFE MEMORY
→ PRESENT
~~~

Une demande simple n'utilise que les étapes nécessaires. Une création de jeu ou une évolution système peut utiliser toute la chaîne.

## 5. Capability maturity

L0 : concept.
L1 : implementation feature-flagged.
L2 : controlled + validated.
L3 : production eligible.
L4 : scalable + observed.

Une capability ne passe pas au niveau supérieur par simple démonstration visuelle.

## 6. Autonomy

A0 : répondre.
A1 : proposer.
A2 : exécuter après approbation.
A3 : exécuter un graphe borné.
A4 : tâche longue sous budget, TTL, cancellation et audit.

Le niveau demandé ne peut jamais dépasser les permissions et policies disponibles.

## 7. Context Engine

Scopes :
session, player, currentModule, currentEntity, conversation, task, memory.

Politique : minimum necessary context.

Le contexte doit exclure secrets, private data non autorisées et détails d'administration. Chaque snapshot possède provenance, privacy class, expiration et hash.

## 8. Memory

Séparer session memory, player memory, project memory, system experience, provider evidence, telemetry et validated knowledge.

Chaque entrée possède scope, owner, sensitivity, consent basis, provenance, usefulness/confidence, retention and deletion rule.

Une sortie d'un provider est une preuve externe, pas une vérité globale.

## 9. Intent

Convertir la demande en goal, entities, constraints, outputType, sideEffects, requiredCapabilities, ambiguity and assumptions.

Une ambiguïté dangereuse déclenche clarification ou chemin réversible.

## 10. Planner

Le planner produit un DAG de tâches. Chaque tâche possède taskId, capabilityId, dependencies, inputs, outputs, resources, timeout, retry policy, validator et idempotency.

Les tâches indépendantes peuvent être parallélisées. Les transitions critiques restent ordonnées.

## 11. Capability Registry

Capacités de référence :
TEXT_GENERATION, REASONING, VISION, IMAGE_GENERATION, VIDEO_GENERATION, MUSIC_GENERATION, AUDIO_GENERATION, TTS, STT, TRANSLATION, EMBEDDING, SEARCH, MODERATION, CODE_GENERATION, CODE_TESTING, GAME_2D, GAME_3D, SUMMARIZATION, CLASSIFICATION, RECOMMENDATION.

Chaque capability possède input schema, output schema, policy class, execution targets, validator, resource class, timeout, concurrency and version.

## 12. Tool Registry

Chaque action possède actionId, ownerModule, input schema, permission, confirmation mode, side-effect class, rate limit, validator and audit policy.

Il n'existe aucune action universelle permettant d'exécuter arbitrairement n'importe quoi.

## 13. Provider abstraction

Provider = adapter uniquement.

L'adapter transforme le contrat canonique vers le provider, protège les secrets, normalise outputs/errors, rapporte health and provenance et respecte payload quotas.

Provider URLs/configuration/secrets appartiennent à un registre unique.

## 14. Resource Router

Étape 1 : hard constraints.
- capability;
- trust;
- data destination;
- CPU/RAM/GPU;
- storage;
- network policy;
- quota;
- deadline.

Étape 2 : score des candidats admissibles par santé, latence, capacité, coût/fairness et disponibilité.

Un score ne peut jamais contourner une hard constraint.

## 15. Workers

Trusted Worker : machine explicitement autorisée et toujours sandboxée.

Community Worker : opt-in explicite, isolation forte, quota de départ maximum 1 logical CPU et 512 MiB RAM, GPU/storage désactivés par défaut, réseau borné.

Les workers constituent un pool de calcul distribué. Ils ne forment pas une RAM partagée.

Une tâche reçoit un lease. Un lease expiré peut être récupéré uniquement si l'opération est idempotente.

## 16. Creative capabilities

Le même orchestrateur coordonne text, image, video, audio, music, speech and translation.

Les artefacts possèdent version, hash et provenance.

## 17. Game creation

~~~text
IDEA
→ REQUIREMENTS
→ GAME SPECIFICATION
→ TASK GRAPH
→ CODE / ASSETS / AUDIO
→ BUILD
→ SIMULATION
→ TEST
→ PREVIEW
→ PACKAGE
→ VALIDATION
→ VERSION
→ PUBLISH
→ RUNTIME
~~~

Le package final ne dépend pas du provider qui l'a créé.

## 18. Validation

Validation possible :
schema;
policy;
security;
static/type;
runtime;
behavior;
content;
artifact integrity;
result.

INCONCLUSIVE n'est pas équivalent à VALID.

## 19. Self-correction

Une correction est autorisée uniquement si depth, time, resource, mutation scope et attempts restent dans les limites.

Détection d'oscillation : répétition d'une même signature d'échec au-delà du seuil → arrêt et diagnostic.

## 20. Controlled evolution

~~~text
OBSERVE
→ GAP
→ HYPOTHESIS
→ CANDIDATE
→ STATIC CHECK
→ SANDBOX
→ TEST
→ BENCHMARK
→ POLICY
→ CANARY
→ PROMOTE / REJECT
→ MONITOR
→ ROLLBACK
~~~

Aucun remplacement direct du code de production par une sortie IA.

## 21. User Experience Engine

Le SYSTEM révèle les capacités selon le contexte.

Première période de session :
orientation → première valeur → découverte → prochaine action ou continuation réelle.

Ces fenêtres sont adaptatives, jamais une fausse minuterie.

Une continuation future n'est présentée que si une vraie condition existe dans M12, une création sauvegardée, une réponse sociale, un défi ou une progression.

Pas de faux événements, faux compteurs ou fausse rareté.

## 22. Suppression contextuelle

Lorsque le Player écrit, joue, crée, lit ou accomplit une tâche, les interventions AI non critiques sont retardées.

M14 reste propriétaire de la fréquence et livraison des notifications.

## 23. Privacy pipeline

~~~text
CLASSIFY
→ AUTHORIZE
→ MINIMIZE
→ REDACT
→ PROVENANCE
→ DESTINATION POLICY
→ EXECUTE
→ VALIDATE
~~~

Les messages privés ne deviennent pas automatiquement une mémoire globale.

## 24. Observability

Opérations importantes :
requestId, traceId, capabilityId, actionId, executionTarget, provider/worker, latency, resource class, validation result, retry count, policy decision.

Pas de secrets ou de contenu privé brut inutile.

## 25. Failure/fallback

Chaque capability définit primary, fallback, degraded, retry and terminal failure.

Retry seulement si l'opération est sûre à répéter.

## 26. Authority boundaries

M01 : identité/auth.
M11 : progression/rewards.
M13 : safety/moderation.
M14 : notification delivery.
M20 : administrative operations.
M19 : orchestration AI dans ces limites.

## 27. Completion

M19 est documenté lorsque chaque capability, action, provider, resource target, task, memory path, validation path and evolution path est défini avec propriétaire unique, sécurité, tests, observability and recovery.
