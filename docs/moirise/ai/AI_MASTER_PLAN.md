# MOIRISE AI — PLAN MAÎTRE CANONIQUE

> Document consacré exclusivement au système d'intelligence de MOIRISE. Les providers, modèles et workers sont des moyens d'exécution ; ils ne définissent pas l'identité du cerveau.

## 1. Mission

MOIRISE AI est l'intelligence transversale de la plateforme. Elle doit comprendre une intention, construire le minimum de contexte autorisé, sélectionner les capacités nécessaires, planifier, réserver les ressources, exécuter des actions bornées, valider les résultats, corriger lorsque cela est permis, conserver des expériences sûres et mesurables, puis présenter le résultat par le SYSTEM.

L'ajout de code n'augmente pas mécaniquement l'intelligence. Une nouvelle capacité exige un contrat, une implémentation ou un adaptateur, des policies, des validateurs, des tests, des ressources, de l'observabilité et une entrée dans les registries.

## 2. Position architecturale

```text
MODULE / PLAYER
   -> AI REQUEST
   -> CONTEXT
   -> POLICY
   -> INTENT
   -> PLAN / TASK GRAPH
   -> CAPABILITY REGISTRY
   -> TOOL REGISTRY
   -> RESOURCE ROUTER
   -> LOCAL / TRUSTED WORKER / COMMUNITY WORKER / PROVIDER
   -> VALIDATION
   -> CORRECT / ASK / FAIL
   -> AUTHORIZED COMMIT
   -> EVENT
   -> SAFE MEMORY / EXPERIENCE
   -> SYSTEM PRESENTATION
```

Le cerveau est propriétaire de l'orchestration IA et de ses contrats. Il n'est pas propriétaire de l'identité, des sanctions de sécurité, des récompenses critiques, de la livraison des notifications ou de l'administration globale.

## 3. Les capacités ne deviennent pas des boutons

Le Player voit seulement quelques portes principales. Des centaines de capabilities peuvent exister derrière elles : raisonnement, recherche, traduction, création, jeux, recommandation, analyse, simulation, génération de code, etc. Le SYSTEM choisit le bon mécanisme selon le contexte.

## 4. Context Engine

Scopes : session, player, currentModule, currentEntity, conversation, task, memory, world, game, community.

Règle : minimum necessary context.

Chaque snapshot doit avoir provenance, classe de confidentialité, expiration et intégrité. Les secrets, données privées non autorisées et informations administratives ne sont jamais incluses par défaut.

## 5. Intent Engine

Une intention est normalisée en :
- goal ;
- entities ;
- constraints ;
- output type ;
- side effects ;
- required capabilities ;
- ambiguity ;
- assumptions ;
- confirmation requirement.

Une ambiguïté dangereuse entraîne une clarification ou une action réversible.

## 6. Planner / Task Graph

Le planner produit un DAG de tâches. Chaque tâche possède taskId, capabilityId, dépendances, inputs, outputs, resources, timeout, retry policy, validator et idempotency key.

Les tâches indépendantes peuvent être parallélisées. Les étapes critiques restent ordonnées.

## 7. Capability Registry

Capabilities de référence :
TEXT_GENERATION, REASONING, VISION, IMAGE_GENERATION, VIDEO_GENERATION, MUSIC_GENERATION, AUDIO_GENERATION, TTS, STT, TRANSLATION, EMBEDDING, SEARCH, MODERATION, CODE_GENERATION, CODE_TESTING, GAME_2D, GAME_3D, SUMMARIZATION, CLASSIFICATION, RECOMMENDATION, SIMULATION, GAME_DESIGN, GAME_VALIDATION, COMMUNITY_DISCOVERY.

Chaque capability possède input schema, output schema, policy class, execution targets, validator, resource class, timeout, concurrency, version et maturity.

## 8. Tool Registry

Chaque action possède actionId, ownerModule, input schema, permission, confirmation mode, side-effect class, rate limit, validator et audit policy.

Il n'existe aucune action universelle permettant à l'IA d'exécuter arbitrairement n'importe quoi.

## 9. Provider abstraction

Un provider est un adapter. Il transforme le contrat canonique vers son API ou protocole, protège les secrets, normalise les sorties et erreurs, expose sa santé et sa provenance et respecte les quotas.

Les providers externes ne sont donc pas le cerveau. MOIRISE doit pouvoir continuer avec un autre provider, une capacité locale ou un mode dégradé lorsqu'une policy le permet.

## 10. Provider registry

Le registre peut accueillir les fournisseurs validés du projet, notamment les familles Pollinations, Puter, LLM7, Vireonix, Murakumo, Kilo AI, AI Horde, AI Horde OpenAI API, Cehpoint AI, OVH AI Endpoints, Quillly, Openverse, Internet Archive et les autres providers explicitement retenus lors de la configuration.

Un nom ou une URL trouvée ne suffit pas à activer un provider. Il faut vérifier capacité, endpoint, authentification, quotas, licence, provenance, sécurité et compatibilité du contrat.

## 11. Exécution locale et distribuée

MOIRISE ne traite pas les ordinateurs comme une RAM commune. Les machines constituent un pool de calcul distribué.

### Local
Exécution sur l'appareil du Player lorsque la capability et les ressources le permettent.

### Trusted Worker
Machine explicitement autorisée par le propriétaire de la plateforme, toujours sandboxée.

### Community Worker
Machine d'un participant opt-in. Profil de départ conservateur : maximum 1 logical CPU et 512 MiB RAM, GPU et stockage désactivés par défaut, réseau borné. Les limites peuvent évoluer uniquement par policy et niveau de confiance.

Chaque tâche reçoit un lease. L'expiration déclenche une récupération seulement si la tâche est idempotente ou conçue pour reprendre.

## 12. Memory architecture

Séparer :
- session memory ;
- player memory ;
- project memory ;
- world memory ;
- game experience ;
- community experience ;
- system experience ;
- provider evidence ;
- telemetry ;
- validated knowledge.

Chaque entrée possède scope, owner, sensitivity, consent basis, provenance, confidence/usefulness, retention et deletion rule.

Une réponse d'un provider est une preuve externe, pas une vérité globale.

## 13. Learning architecture

```text
OBSERVATION
-> EXPERIENCE
-> EVALUATION
-> PATTERN / FAILURE
-> LEARNING CANDIDATE
-> HYPOTHESIS
-> TEST
-> VALIDATED KNOWLEDGE OR REJECT
```

Les signaux privés ou sensibles ne sont pas convertis automatiquement en mémoire d'apprentissage.

## 14. Self-correction

Une correction est autorisée seulement si la profondeur, le temps, les ressources, le scope de mutation et le nombre de tentatives restent dans les limites.

Une signature d'échec répétée au-delà du seuil déclenche l'arrêt et le diagnostic plutôt qu'une boucle infinie.

## 15. Evolution contrôlée du code

L'évolution recherchée est :

```text
OBSERVE
-> DETECT GAP
-> FORM HYPOTHESIS
-> GENERATE CANDIDATE
-> STATIC ANALYSIS
-> SANDBOX
-> UNIT / INTEGRATION / BEHAVIOR TESTS
-> BENCHMARK AGAINST BASELINE
-> SECURITY / POLICY CHECK
-> CANARY
-> PROMOTE or REJECT
-> MONITOR
-> ROLLBACK
```

Jamais : génération IA -> exécution directe en production.

Une amélioration est conservée seulement si elle démontre une amélioration mesurable sans régression inacceptable.

## 16. Creative AI

L'IA orchestre image, vidéo, audio, musique, voix, texte, narration et artefacts composés.

Pipeline :
intent -> creative brief -> capability selection -> resource/provider selection -> generation -> validation -> provenance/licence -> moderation -> storage -> publication.

Les artefacts possèdent version, hash et provenance.

## 17. Game creation AI

```text
IDEA
-> REQUIREMENTS
-> GAME SPECIFICATION
-> ENGINE SELECTION
-> TASK GRAPH
-> CODE / SCENES / ASSETS / AUDIO
-> BUILD
-> SIMULATION
-> TEST
-> PREVIEW
-> VALIDATION
-> VERSION
-> PUBLISH
-> RUNTIME
```

Le système doit distinguer la fabrication d'un jeu de son runtime. Il doit prendre en charge les jeux 2D et 3D selon des contrats d'engines/adapters validés.

## 18. Social and community AI

L'IA peut recommander des personnes, contenus, jeux ou communautés selon les politiques de découverte. Elle peut détecter des signaux autorisés suggérant une nouvelle communauté, vérifier les communautés existantes, préparer une proposition et, lorsque la policy l'autorise, déclencher une création encadrée.

Elle ne doit pas créer silencieusement une communauté permanente à partir d'une simple inférence. La propriété et les permissions appartiennent à M11.

Messages privés : l'IA peut fournir des capacités explicitement autorisées, mais le contenu privé n'est pas automatiquement versé dans la mémoire globale.

## 19. User Experience Engine

À l'arrivée :
orientation -> première valeur réelle -> découverte progressive -> action pertinente -> continuité réelle.

Les deux premières minutes peuvent servir de fenêtre d'adaptation comportementale, mais il ne s'agit pas d'une minuterie obligatoire. Le SYSTEM ne fabrique pas de faux événements, de faux compteurs ou de fausse rareté.

Pour donner envie de revenir, l'IA peut signaler une continuation réelle : réponse attendue, défi, événement, progression, création sauvegardée, activité de groupe ou mission future réellement planifiée.

## 20. Resource Router

Étape 1 : hard constraints : capability, trust, destination des données, CPU/RAM/GPU, storage, réseau, quota, deadline.

Étape 2 : classement des candidats admissibles selon santé, latence, capacité, coût/fairness et disponibilité.

Un score ne peut jamais contourner une hard constraint.

## 21. Validation

Validation possible : schema, policy, permission, security, static/type, runtime, behavior, content, artifact integrity, result, performance.

`INCONCLUSIVE` n'est jamais traité comme `VALID`.

## 22. Privacy pipeline

```text
CLASSIFY
-> AUTHORIZE
-> MINIMIZE
-> REDACT
-> PROVENANCE
-> DESTINATION POLICY
-> EXECUTE
-> VALIDATE
```

## 23. Observability

Les opérations importantes portent requestId, traceId, capabilityId, actionId, executionTarget, provider/worker, latency, resource class, validation result, retry count et policy decision.

Les logs ne doivent pas contenir inutilement des secrets ou du contenu privé brut.

## 24. Failure and fallback

Chaque capability définit : primary, fallback, degraded mode, retry policy et terminal failure.

Un retry n'est autorisé que lorsqu'il est sûr ou explicitement conçu pour être idempotent.

## 25. Maturité des capabilities

L0 — concept.
L1 — implementation feature-flagged.
L2 — controlled + validated.
L3 — production eligible.
L4 — scalable + observed.

Une capability ne monte pas de niveau simplement parce qu'elle fonctionne une fois.

## 26. Niveaux d'autonomie

A0 — répondre.
A1 — proposer.
A2 — exécuter après approbation.
A3 — exécuter un graphe borné.
A4 — tâche longue avec budget, TTL, cancellation et audit.

Le niveau demandé ne peut jamais dépasser les permissions et policies disponibles.

## 27. Authority boundaries

M01 : identité/auth et contrats de base.
M03 : données sociales et communications selon leurs permissions.
M11 : communautés et membership.
M12 : événements et continuations planifiées.
M14 : progression, récompenses et collection.
M15 : intelligence, orchestration, capabilities et évolution dans ses limites.

L'IA ne contourne jamais l'autorité d'un module.

## 28. Critère de complétude

Le système IA est documenté lorsqu'une capability, une action, un provider, une cible de ressource, une tâche, un chemin mémoire, une validation, une correction et une évolution possèdent un propriétaire, un contrat, des permissions, des tests, une observabilité et une récupération définis.
