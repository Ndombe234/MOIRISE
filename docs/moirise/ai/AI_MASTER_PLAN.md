
# MORISE AI — PLAN MAÎTRE EXCLUSIF — RECONSTRUCTION À ZÉRO

## 0. Statut et règle
Ce document est l'unique plan comportemental de MORISE AI. Il ne remplace pas les plans M01–M15 : il décrit uniquement le cerveau/orchestrateur IA, ses capacités, ses ressources, sa mémoire, ses validations, ses providers, ses workers et son évolution contrôlée.

Règle de précision obligatoire : France → Paris → rue → bâtiment → appartement → porte. Une phrase comme « MORISE choisit un modèle » est insuffisante. Il faut préciser : qui demande, quand, quelles données, quelles vérifications, quelles branches de décision, quel résultat, quelle mutation, quelle récupération et quel test.

## 1. MORISE AI en trois pièces de puzzle

### Pièce A — CERVEAU
AUTH → CONTEXT → INTENT → REQUIREMENTS → REASONING → PLAN → POLICY.

### Pièce B — MAINS
CAPABILITY → TOOL → RESOURCE ROUTER → LOCAL/WORKER/PROVIDER → SANDBOX.

### Pièce C — MÉMOIRE + PREUVE
VALIDATE → COMMIT → EVENT → MEMORY/EXPERIENCE → EVALUATE → EVOLVE/ROLLBACK.

Ces trois pièces ne sont pas trois IA : elles constituent une seule MORISE AI.

## 2. Contrat maître
Entrée : acteur serveur, module source, intention, références de données, contraintes, autonomie, confidentialité, budget, deadline éventuelle.

Sortie : résultat normalisé, artifact refs, validation refs, événements, trace et éventuelle expérience mémorisable.

Le modèle/provider externe n'est jamais retourné directement comme vérité métier.

## 3. Cycle exact d'une demande
1. recevoir la requête ;
2. authentifier ;
3. dériver actorId serveur ;
4. vérifier tenant/scope ;
5. limiter débit et taille ;
6. classifier les données ;
7. vérifier privacy/destination ;
8. construire ContextSnapshot ;
9. comprendre l'intention ;
10. compiler les exigences ;
11. détecter les ambiguïtés ;
12. choisir autonomie autorisée ;
13. construire le plan ;
14. résoudre les capabilities ;
15. réserver les ressources ;
16. choisir la cible d'exécution ;
17. exécuter ;
18. valider ;
19. corriger ou demander clarification ;
20. committer uniquement par l'owner métier ;
21. publier événements ;
22. mémoriser uniquement ce qui est autorisé ;
23. évaluer ;
24. créer une candidate d'amélioration seulement si les preuves suffisent.

## 4. Intent
MORISE extrait : goal, entities, constraints, outputType, sideEffects, requiredCapabilities, ambiguity, assumptions, privacyClass et requestedAutonomy.

Ambiguïté non bloquante = défaut explicite et réversible.
Ambiguïté bloquante = clarification nécessaire lorsqu'elle change le résultat, la confidentialité ou une action irréversible.

## 5. Requirement compiler
Exemple : « crée un petit jeu 3D de chasse partageable ».

La compilation doit produire : browser runtime, mode 3D, core loop chasse, durée de session, partage du résultat, direction visuelle originale, contrôles, win/loss, save si nécessaire, tests lancement/mouvement/chasse/completion, budget mobile, sandbox, owner M08 et runtime owner M09.

Le provider n'est pas choisi pendant cette étape.

## 6. Context Engine
Scopes : SESSION, PLAYER, MODULE, ENTITY, TASK, CONVERSATION, MEMORY, GAME, CREATION.

Ordre : scope → permission → minimum needed → visibility → block/mute → privacy filter → relevance → provenance → expiry → hash.

Une donnée hors scope est absente même si un modèle pourrait théoriquement y accéder.

## 7. Mémoire
Types : SESSION, PLAYER, EXPERIENCE, CREATOR, COMMUNITY, WORLD, SYSTEM_OBSERVATION, PROVIDER_EVIDENCE.

Chaque entrée : memoryId, ownerId, scope, sensitivity, consentBasis, provenance, confidence, utility, createdAt, expiresAt?, deletionPolicy, sourceHash.

Secrets interdits. Les conversations privées ne deviennent pas mémoire globale par défaut.

## 8. Reasoning
Sources possibles : règles déterministes, algorithmes locaux, retrieval, modèle externe, expérience validée.

Sorties : candidate interpretation, assumptions, plan proposal, confidence, unresolved questions.

Le reasoning ne peut pas effectuer une mutation privilégiée.

## 9. Planner / DAG
Une tâche longue devient un DAG. Chaque node possède taskId, graphId, nodeKey, dependencies, capabilityVersion, inputRefs, outputRefs, resources, validator, timeout, idempotencyKey, retryPolicy, lease et state.

Un cycle produit GRAPH_INVALID et aucune tâche du graph ne démarre.

## 10. Autonomie
A0 répondre ; A1 proposer ; A2 exécuter après approbation ; A3 graphe borné ; A4 workflow long borné.

La policy peut réduire le niveau, jamais l'augmenter au-dessus de son plafond.

## 11. Capability Registry
Familles initiales : TEXT, REASONING, VISION, IMAGE, VIDEO, AUDIO, MUSIC, TTS, STT, TRANSLATION, SEARCH, EMBEDDING, MODERATION, CODE_GENERATION, CODE_TESTING, GAME_2D, GAME_3D, SUMMARIZATION, CLASSIFICATION, RECOMMENDATION, COMMUNITY_PROPOSAL, LIVING_OBJECT_TRANSFORM, CONVERGENCE_DETECTION, WORLD_MEMORY_RETRIEVAL, EVOLUTION_CANDIDATE.

Chaque capability possède id, version, schemas, policyClass, allowedTargets, resourceClass, timeout, concurrency, payloadLimit, validator et health.

## 12. Tool Registry
Chaque outil possède actionId, ownerModule, inputSchema, permission, confirmationMode, sideEffectClass, rateLimit, validator et auditLevel.

Il n'existe aucun outil wildcard « execute anything ».

## 13. Policy Engine
Ordre strict : identity → action existence → owner policy → safety → privacy → destination → quota → autonomy → confirmation → execution.

Décisions : ALLOW, ALLOW_WITH_CONFIRMATION, DENY, DEGRADE.

## 14. Resource / Provider Router
Ordre :
1. LOCAL/ON-DEVICE ;
2. CACHE ;
3. TRUSTED WORKER ;
4. COMMUNITY WORKER si opt-in + policy ;
5. VERIFIED FREE/CLIENT-SIDE PROVIDER ;
6. API-KEY PROVIDER ;
7. PAID PROVIDER uniquement explicitement activé ;
8. DEGRADED/UNAVAILABLE.

Hard filters avant scoring : capability, privacy, trust, ressources, réseau, quota, deadline.

## 15. API/provider map — URLs vérifiées

### Pollinations
Docs : https://gen.pollinations.ai/docs
Base : https://gen.pollinations.ai
Chat : https://gen.pollinations.ai/v1/chat/completions
Image : https://gen.pollinations.ai/image/{prompt}?model={model}
Audio : https://gen.pollinations.ai/audio/{prompt}
Embeddings : https://gen.pollinations.ai/v1/embeddings
Secret : POLLINATIONS_API_KEY

### Puter.js
Docs : https://docs.puter.com/
AI chat : https://docs.puter.com/AI/chat/
CDN : https://js.puter.com/v2/
NPM : @heyputer/puter.js
Usage : option client-side lorsque son modèle User-Pays et sa destination de données sont acceptables.

### OpenRouter
Docs : https://openrouter.ai/docs/quickstart
Base : https://openrouter.ai/api/v1
Chat : https://openrouter.ai/api/v1/chat/completions
Responses : https://openrouter.ai/api/v1/responses
Models : https://openrouter.ai/api/v1/models
Secret : OPENROUTER_API_KEY

### Gemini
Docs : https://ai.google.dev/gemini-api/docs
Interactions beta : https://generativelanguage.googleapis.com/v1beta/interactions
Interactions stable : https://generativelanguage.googleapis.com/v1/interactions
generateContent : https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
Secret : GEMINI_API_KEY

### Hugging Face
Docs : https://huggingface.co/docs/inference-providers
Chat : https://router.huggingface.co/v1/chat/completions
Models : https://huggingface.co/api/models
Secret : HF_TOKEN

### AI Horde
Docs/API : https://aihorde.net/api/
Base : https://aihorde.net/api
Toute route précise doit être prise dans le Swagger courant avant activation.

### Kilo AI Gateway
Docs : https://kilo.ai/docs/gateway
Base : https://api.kilo.ai/api/gateway
Chat : https://api.kilo.ai/api/gateway/chat/completions
Models : https://api.kilo.ai/api/gateway/models
Secret : KILO_API_KEY

### Providers historiques non vérifiés
LLM7, Vireonix, Murakumo, Quillly, Cehpoint AI, OVHcloud AI Endpoints, DeepSeek direct et tout autre provider historique restent DISABLED jusqu'à vérification de documentation officielle, endpoint, auth, schema, privacy/terms, health probe et test adapter. Aucune URL n'est inventée pour remplir le document.

## 16. Code cible
Repository actuel : Next.js 16.3.6, React 19.3.0, TypeScript 7.0.2, Node >=22, Supabase JS/SSR et Vitest.

Principe : TypeScript + native fetch + AbortController + Web Crypto + validation runtime + Supabase server persistence. Les SDK externes sont optionnels et restent derrière les adapters.

## 17. Puzzle de code
lib/ai/core/* = request-gate, context, intent, requirements, reasoning, planner, policy, orchestrator.
lib/ai/capabilities/* = registry et catalog.
lib/ai/tools/* = registry et permissions.
lib/ai/providers/* = router + adapters.
lib/ai/workers/* = registry + scheduler + leases + sandbox.
lib/ai/validation/* = schema + security + runtime + result.
lib/ai/memory/* = store + retrieval + learning.
lib/ai/evolution/* = candidate + benchmark + promotion + rollback.
app/api/ai/* = frontières HTTP.

Une nouvelle capability ajoute une pièce au registre, sa policy, son validator et ses tests. Elle ne crée jamais un deuxième cerveau.

## 18. Creative AI
Texte/image/video/audio/music/voice suivent : intent → brief → originality/safety policy → route → execution → provenance → validation → ArtifactRef → owner publication.

## 19. Game Creator AI
M15 produit Requirements + GameSpecification + TaskGraph. M08 fabrique. M09 exécute. M06 crée les sessions. M05/M14 reçoivent uniquement des résultats validés.

## 20. Workers
Trusted Worker = machine explicitement autorisée.
Community Worker = opt-in.
Défaut Community : ≤1 logical CPU, ≤512 MiB RAM, GPU/storage désactivés, réseau borné.
Aucun worker ne reçoit secrets production, service-role, admin API ou messages privés bruts.

## 21. Auto-évolution
Limitation → gap → root cause → hypothesis → candidate → sandbox → tests → benchmark → security/policy → canary → promote/reject → monitor → rollback.

L'augmentation de code n'est jamais une preuve d'intelligence.

## 22. Contrôle de l'autorité
M15 ne peut pas devenir owner de M01/M02 identité, M03 messages privés, M05 progression, M11 membership, M12 event state ou M14 économie.

## 23. DONE
Chaque capability doit avoir owner, contract, implementation/adapter, policy, resource profile, validator, tests, observability, version, integration et rollback. Aucun second AI brain/provider router n'est autorisé.
