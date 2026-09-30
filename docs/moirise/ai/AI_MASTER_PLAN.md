# MORISE AI — PLAN MAÎTRE DE FABRICATION
## Reconstruction intégrale — source unique du « QUOI »

> **RÈGLE DE PRÉCISION PERMANENTE**
>
> Une description comme « MORISE a une mémoire » est insuffisante. La documentation doit descendre comme : **France → Paris → rue → bâtiment → appartement → porte → serrure → clé → couleur de la porte**.
>
> En ingénierie cela signifie : **composant → sous-composant → contrat → déclencheur → entrées → transformation → décision → sortie → état → dépendances → erreur → récupération → sécurité → observabilité → test → DONE**.
>
> Le but n'est pas d'ajouter du texte pour ajouter du texte. Le but est qu'une IA développeuse puisse fabriquer le composant sans deviner les parties absentes.

---

# 1. IDENTITÉ DE MORISE AI

## 1.1 Nature
MORISE AI est l'intelligence native de MORISE. Elle orchestre compréhension, contexte, raisonnement, planification, policy, capabilities, outils, ressources, exécution, validation, mémoire, expérience, apprentissage et évolution contrôlée.

Elle n'est pas un simple chatbot, un prompt relié à une API, un wrapper de Gemini, un wrapper de Pollinations ou un moteur de recommandation.

## 1.2 Principe fondamental
Les modèles, APIs et workers externes sont des **moteurs d'exécution spécialisés**. Ils ne sont jamais l'autorité centrale de MORISE.

MORISE conserve :
- son identité et ses permissions ;
- son contexte ;
- son intention structurée ;
- ses exigences ;
- son planner ;
- ses policies ;
- son routage ;
- ses validators ;
- sa mémoire ;
- son expérience ;
- ses benchmarks ;
- son mécanisme d'auto-amélioration contrôlé.

## 1.3 Une seule intelligence
Le système ne doit contenir qu'un seul cerveau d'orchestration M15. Ajouter un provider ou une capability ne crée pas un nouveau cerveau.

---

# 2. PUZZLE À 3 PIÈCES

## PIÈCE A — CERVEAU
Responsabilité : transformer une intention humaine ou système en stratégie exécutable autorisée.

Chaîne :
REQUEST → ACTOR → CLASSIFY → CONTEXT → INTENT → REQUIREMENTS → REASONING → PLAN → POLICY

Cette pièce ne modifie pas directement les états métier.

## PIÈCE B — MAINS
Responsabilité : exécuter la stratégie.

Chaîne :
CAPABILITY → TOOL → ROUTER → RESOURCE → ADAPTER → SANDBOX → EXECUTION

Cette pièce ne décide jamais seule d'une permission.

## PIÈCE C — PREUVE + MÉMOIRE
Responsabilité : déterminer si le résultat est valide, durable, mémorisable et éventuellement améliorable.

Chaîne :
VALIDATE → OWNER COMMIT → EVENT → MEMORY → EXPERIENCE → EVALUATE → EVOLVE → ROLLBACK

Aucune pièce ne devient une seconde IA.

---

# 3. FRONTIÈRES D'AUTORITÉ

| Domaine | Owner |
|---|---|
| identité/session/sécurité fondamentale | M01 |
| état Player | M02 |
| social/messages privés | M03 |
| World | M04 |
| progression/SYSTEM | M05 |
| Play/session | M06 |
| découverte des jeux | M07 |
| fabrication des jeux | M08 |
| runtime commun des jeux | M09 |
| social gaming | M10 |
| communities/guilds/membership | M11 |
| Events | M12 |
| Adaptive World | M13 |
| collection/récompenses/économie | M14 |
| intelligence/orchestration/AI Lab | M15 |

M15 peut proposer une action mais ne vole jamais l'autorité métier.

Exemples obligatoires :
- M15 ne donne pas directement des XP ;
- M15 ne résout pas directement une roulette ;
- M15 ne change pas un rôle ;
- M15 ne rend pas directement un Player membre d'une communauté ;
- M15 ne modifie pas directement l'état d'un Event ;
- M15 ne publie pas directement un résultat de jeu ;
- M15 ne rend pas un DM public ;
- M15 ne transforme pas silencieusement une donnée privée en mémoire générale.

---

# 4. CYCLE CANONIQUE

Toute demande suit conceptuellement :

OBSERVE → AUTHENTICATE → CLASSIFY → CONTEXTUALIZE → UNDERSTAND → COMPILE REQUIREMENTS → REASON → PLAN → POLICY → RESERVE → EXECUTE → VALIDATE → CORRECT OR ASK → OWNER COMMIT → EVENT → SAFE MEMORY → EVALUATE → IMPROVE

Une opération simple peut utiliser seulement une partie de la chaîne. Une création de jeu ou une auto-évolution peut utiliser l'ensemble.

Invariant : aucune mutation métier durable avant validation + owner commit.

---

# 5. REQUEST IDENTITY

Chaque opération possède au minimum :
- requestId ;
- traceId ;
- actorId ;
- sourceModule ;
- intent ;
- inputRefs ;
- constraints ;
- privacyClass ;
- requestedAutonomy ;
- resourceBudget ;
- deadline éventuelle ;
- createdAt.

actorId est dérivé côté serveur à partir de la session authentifiée. Le navigateur n'est jamais une autorité sur l'identité.

---

# 6. CONTEXTE MINIMAL

Scopes possibles :
- SESSION ;
- PLAYER ;
- MODULE ;
- ENTITY ;
- TASK ;
- CONVERSATION ;
- MEMORY ;
- GAME ;
- CREATION.

Ordre conceptuel :
scope → permission → visibility → minimum necessary → privacy → relevance → provenance → expiry → hash

MORISE ne charge jamais par défaut toute une table, tout un profil ou toutes les conversations.

Un contexte utilisé comme preuve doit être immuable au niveau logique. Une nouvelle information produit un nouveau snapshot.

---

# 7. INTENT

MORISE transforme la demande humaine en structure comprenant :
- goal ;
- entities ;
- constraints ;
- expectedOutput ;
- sideEffects ;
- requiredCapabilities ;
- ambiguity ;
- assumptions ;
- privacyClass ;
- requestedAutonomy.

Une ambiguïté peut être résolue automatiquement uniquement si le défaut est explicite, réversible et conforme à la policy.

Sinon : CLARIFY.

---

# 8. REQUIREMENTS

L'intention n'est pas encore une implémentation.

Exemple : « crée un petit jeu 3D de chasse partageable » devient un contrat comprenant au minimum :
- browser runtime ;
- 3D ;
- boucle de chasse ;
- contrôles ;
- durée ;
- win/loss ;
- partage ;
- performance mobile ;
- accessibilité ;
- sandbox ;
- validation ;
- owner M08 ;
- runtime M09.

Le provider n'est pas choisi à cette étape.

---

# 9. REASONING

Le raisonnement peut combiner :
- règles déterministes ;
- calcul local ;
- retrieval ;
- mémoire validée ;
- algorithmes spécialisés ;
- provider externe.

Le reasoning produit une décision structurée, pas un droit de mutation.

Il doit produire au minimum :
- interprétation candidate ;
- hypothèses ;
- plan(s) ;
- questions ouvertes ;
- confiance ;
- evidence refs.

La chaîne de pensée privée n'est pas une sortie contractuelle. MORISE expose des justifications de haut niveau et des références d'évidence.

---

# 10. PLANNER

Les workflows longs deviennent des DAG.

Chaque tâche possède :
- taskId ;
- graphId ;
- nodeKey ;
- capabilityId ;
- capabilityVersion ;
- dependencies ;
- inputRefs ;
- outputRefs ;
- resource requirements ;
- validatorId ;
- timeout ;
- retryPolicy ;
- idempotencyKey ;
- state ;
- lease lorsqu'un worker est utilisé.

Un cycle = GRAPH_INVALID.

Aucune exécution ne commence pour un graphe invalide.

---

# 11. AUTONOMIE

- A0 — ANSWER : aucun side effect.
- A1 — PROPOSE : proposer une action.
- A2 — APPROVED EXECUTION : exécuter après confirmation lorsqu'elle est requise.
- A3 — BOUNDED GRAPH : graphe borné autorisé.
- A4 — LONG WORKFLOW : workflow long borné par temps, ressources, tâches, mutation scope, policy et cancellation.

Une policy peut toujours réduire l'autonomie demandée. Elle ne peut pas être augmentée par le modèle.

---

# 12. POLICY

Ordre :
identity → action existence → owner policy → safety → privacy → destination → quota → autonomy → confirmation → execution

Décisions :
- ALLOW ;
- ALLOW_WITH_CONFIRMATION ;
- DENY ;
- DEGRADE.

La policy est plus autoritaire que le modèle et plus autoritaire qu'un provider.

---

# 13. CAPABILITY REGISTRY

Familles initiales :
- TEXT_GENERATION ;
- REASONING ;
- VISION ;
- IMAGE_GENERATION ;
- VIDEO_GENERATION ;
- AUDIO_GENERATION ;
- MUSIC_GENERATION ;
- TTS ;
- STT ;
- TRANSLATION ;
- SEARCH ;
- EMBEDDING ;
- MODERATION ;
- CODE_GENERATION ;
- CODE_TESTING ;
- GAME_2D ;
- GAME_3D ;
- SUMMARIZATION ;
- CLASSIFICATION ;
- RECOMMENDATION ;
- COMMUNITY_FORMATION_PROPOSAL ;
- LIVING_OBJECT_TRANSFORM ;
- CONVERGENCE_DETECTION ;
- WORLD_MEMORY_RETRIEVAL ;
- EVOLUTION_CANDIDATE_GENERATION.

Chaque capability possède une version, input/output schemas, policy class, execution targets, resource class, timeout, concurrency, validator et health.

---

# 14. TOOL REGISTRY

Chaque outil possède :
- actionId ;
- ownerModule ;
- inputSchema ;
- permission ;
- confirmationMode ;
- sideEffectClass ;
- rateLimit ;
- validator ;
- auditLevel.

Il n'existe pas de :
executeAnything
fetchAnyURL
writeAnyFile
runAnyCode

Les outils sont allowlistés et versionnés.

---

# 15. RESOURCE / PROVIDER ROUTING

Ordre de préférence conceptuel :
1. local/on-device ;
2. cache ;
3. Trusted Worker ;
4. Community Worker si explicitement opt-in ;
5. provider client-side vérifié ;
6. provider API vérifié ;
7. provider payant explicitement activé ;
8. degraded/unavailable.

Hard filters avant scoring :
- capability ;
- privacy ;
- trust ;
- CPU ;
- RAM ;
- GPU ;
- réseau ;
- quota ;
- deadline ;
- health ;
- vérification provider.

Le scoring ne peut jamais contourner un hard rejection.

---

# 16. PROVIDERS PRINCIPAUX

Les providers sont des adapters, pas des cerveaux.

## 16.1 Pollinations
Documentation : https://gen.pollinations.ai/docs
Base : https://gen.pollinations.ai
Capacités documentées : texte, image, vidéo, audio, realtime voice, embeddings et 3D selon catalogue courant.
L'API est OpenAI-compatible. Les nouveaux IDs utilisent des noms de type publisher/model.

## 16.2 OpenRouter
Documentation : https://openrouter.ai/docs/api-reference/overview
Base : https://openrouter.ai/api/v1
Routes centrales : /chat/completions, /responses, /models, /generation.
OpenRouter normalise les schémas entre modèles/providers.

## 16.3 Gemini
Documentation : https://ai.google.dev/gemini-api/docs/interactions-overview
Interactions beta : POST https://generativelanguage.googleapis.com/v1beta/interactions
Interactions stable : POST https://generativelanguage.googleapis.com/v1/interactions
Google indique que l'Interactions API est recommandée pour les nouveaux projets ; generateContent reste supportée.

## 16.4 Hugging Face Inference Providers
Documentation : https://huggingface.co/docs/inference-providers
Base chat compatible OpenAI : https://router.huggingface.co/v1
Route chat : POST /chat/completions.
Les autres modalités doivent utiliser leurs interfaces/task contracts correspondants.

## 16.5 Puter.js
Documentation : https://docs.puter.com/AI/chat/
CDN : https://js.puter.com/v2/
Puter expose notamment puter.ai.chat() et plusieurs capacités multimodales. Il peut servir de target client-side sous réserve des règles de confidentialité de MORISE.

## 16.6 AI Horde
Documentation/API : https://aihorde.net/api/
Swagger : https://aihorde.net/api/swagger.json
L'API actuelle expose la v2 sous /api/v2/...
Les routes précises doivent être tirées du Swagger courant avant activation.

## 16.7 Kilo AI Gateway
Documentation : https://kilo.ai/docs/gateway
Base : https://api.kilo.ai/api/gateway
Chat : POST /chat/completions
Models : GET /models
Kilo documente une gateway OpenAI-compatible.

---

# 17. PROVIDERS HISTORIQUES NON ACTIVÉS

Les candidats historiques comprennent notamment :
- LLM7 ;
- Vireonix ;
- Murakumo ;
- Kilo AI ;
- AI Horde ;
- Cehpoint AI ;
- OVH AI Endpoints ;
- Quillly ;
- DeepSeek direct ;
- Cloudflare Workers AI ;
- Replicate ;
- Firecrawl ;
- Openverse ;
- Internet Archive.

Un nom historique n'est pas une autorisation d'appel.

Activation uniquement après :
1. documentation officielle ;
2. endpoint exact ;
3. auth mode ;
4. request schema ;
5. response schema ;
6. capability map ;
7. privacy/terms ;
8. health probe ;
9. adapter contract test.

Aucune URL inconnue ne doit être inventée.

---

# 18. WORKERS DISTRIBUÉS

Les machines distribuées sont une réserve de calcul, pas de la RAM partagée.

Trusted Worker = machine explicitement autorisée.

Community Worker = machine explicitement opt-in.

Defaults Community Worker :
- 1 logical CPU maximum ;
- 512 MiB RAM maximum ;
- GPU désactivé ;
- stockage persistant désactivé ;
- réseau borné.

Aucun worker ne reçoit :
- secrets production ;
- service-role key ;
- admin credentials ;
- fichiers utilisateur non autorisés ;
- messages privés bruts.

---

# 19. VALIDATION

Séparation obligatoire : generation != validation.

Validators :
- schema ;
- policy ;
- security ;
- static ;
- type ;
- runtime ;
- behavior ;
- content ;
- artifact ;
- result integrity.

États :
- VALID ;
- INVALID ;
- DEGRADED ;
- INCONCLUSIVE.

INCONCLUSIVE n'est pas une validation positive.

---

# 20. MEMORY

Scopes :
- SESSION ;
- PLAYER ;
- EXPERIENCE ;
- CREATOR ;
- COMMUNITY ;
- WORLD ;
- SYSTEM_OBSERVATION ;
- PROVIDER_EVIDENCE.

Chaque entrée possède au minimum :
- owner ;
- scope ;
- sensitivity ;
- provenance ;
- confidence ;
- utility ;
- retention ;
- delete policy.

Secrets interdits.

Les messages privés ne deviennent pas mémoire globale par défaut.

---

# 21. EXPERIENCE ET LEARNING

Une expérience est une observation contextualisée dont l'outcome a été validé.

Pipeline :
OBSERVATION → NORMALIZATION → PATTERN → HYPOTHESIS → OFFLINE EVALUATION → POLICY → CANARY → PROMOTION

Les événements bruts ne modifient pas directement la production.

---

# 22. MORISE DNA

Dimensions de capacités démontrées possibles :
- Exploration ;
- Creation ;
- Resolution ;
- Strategy ;
- Collection ;
- Collaboration ;
- Discovery ;
- Experimentation.

Ce n'est pas un profil psychologique. Les signaux viennent d'actions et résultats validés.

---

# 23. LIVING OBJECTS

MORISE AI peut proposer :
- transformation ;
- branche ;
- contributeur ;
- fusion ;
- conversion.

Exemple :
idea → story → game → challenge → event → community seed.

La mutation durable revient à l'owner. Propriété, permissions et lineage restent intactes.

---

# 24. CONVERGENCE

Pipeline :
authorized trajectories → candidate detection → privacy filter → sensitive-attribute exclusion → confidence → diversity → anti-abuse → proposal

Une seule personne ne doit pas pouvoir créer une convergence artificielle par répétition manipulée.

---

# 25. MISSIONS FROM REALITY

Pipeline :
recurring problem → candidate mission → validation → solo/collective experiment → measure → validated solution → World Memory candidate

M15 fournit la détection/orchestration. Les états métier restent aux owners M05/M12.

---

# 26. WORLD MEMORY

Une candidate contient :
- claim ;
- sourceRefs ;
- validation evidence ;
- attribution ;
- confidence ;
- scope ;
- retention ;
- correction path.

Ce n'est ni un dump de messages privés ni un flux social.

---

# 27. CREATIVE AI

Types :
- texte ;
- image ;
- vidéo ;
- audio ;
- musique ;
- voix ;
- code ;
- jeux.

Pipeline :
intent → requirements → policy → router → provider/worker → artifact → provenance → validation → owner

Un provider ne publie jamais directement dans le domaine métier.

---

# 28. GAME CREATOR AI

M15 produit :
1. GameRequirements ;
2. GameSpecification ;
3. TaskGraph.

Puis :
- M08 fabrique ;
- M09 fournit le runtime ;
- M06 ouvre la session ;
- M05/M14 consomment uniquement les résultats validés.

---

# 29. TRANSLATION

Le texte source reste canonique.

Cache key :
sourceHash + locale + policyVersion

No-translate :
- handles ;
- IDs ;
- URLs ;
- code ;
- paths ;
- termes protégés ;
- game IDs.

Fallback :
local/on-device → cache → client provider autorisé → serveur provider → langue source

---

# 30. AUTO-ÉVOLUTION

Pipeline :
limitation → capability gap → root cause → hypothesis → candidate → sandbox → tests → benchmark → security → canary → promote/reject → monitor → rollback

L'ajout de code ou de tokens n'est pas une preuve d'intelligence.

---

# 31. AI LAB

Autorisé :
- branches candidates ;
- code candidat ;
- tests ;
- fixtures ;
- datasets approuvés ;
- benchmarks ;
- artifacts candidats.

Interdit :
- secrets production ;
- service role ;
- admin ;
- comptes financiers ;
- déploiement direct ;
- machines non autorisées.

---

# 32. OBSERVABILITÉ

Trace minimum :
- requestId ;
- traceId ;
- module ;
- capability ;
- action ;
- taskId ;
- graphId ;
- executionTarget ;
- provider/worker ;
- latency ;
- policyDecision ;
- validatorStatus ;
- retry ;
- errorClass.

Les DMs ne doivent pas être copiés en clair dans l'analytics général.

---

# 33. SÉCURITÉ STRUCTURELLE

MORISE traite explicitement :
- prompt injection ;
- tool injection ;
- SSRF ;
- secret leakage ;
- forged actorId ;
- privilege escalation ;
- malicious dependency ;
- malicious artifact ;
- replay ;
- duplicate execution ;
- stale worker lease ;
- provider spoofing.

---

# 34. STACK CIBLE

Repository :
- Next.js ;
- React ;
- TypeScript ;
- Node ;
- Supabase ;
- Vitest.

Noyau MORISE AI :
- TypeScript ;
- fetch natif ;
- AbortController ;
- Web Crypto ;
- validation runtime ;
- Supabase ;
- Route Handlers Next.js ;
- adapters provider isolés ;
- Vitest.

Les SDKs provider sont optionnels et ne deviennent pas le noyau.

---

# 35. RÈGLE DE FABRICATION D'UNE CAPABILITY

Une capability n'est terminée qu'après :

contract → implementation → policy → resource profile → validator → tests → observability → version → integration → rollback

---

# 36. RÈGLE DE FABRICATION D'UN PROVIDER

Un provider n'est activé qu'après :

official docs → endpoint → auth → capability map → schemas → privacy → adapter → health → error normalization → contract test → canary → activation

---

# 37. RÈGLE ANTI-DUPLICATION

Il n'existe qu'une seule autorité pour :
- Request Gate ;
- Context Engine ;
- Intent Compiler ;
- Requirements Compiler ;
- Policy Engine ;
- Capability Registry ;
- Tool Registry ;
- Provider Router ;
- Validation Engine ;
- Memory Service ;
- Evolution pipeline.

Un autre module peut consommer ces mécanismes mais ne peut pas en copier une seconde version concurrente.

---

# 38. SÉPARATION DES DOCUMENTS

### AI_MASTER_PLAN.md
Source unique du **QUOI** :
- identité ;
- architecture ;
- responsabilités ;
- ownership ;
- invariants ;
- capabilities ;
- stratégie globale ;
- providers ;
- critères de complétude.

### AI_TECHNICAL_DESIGN.md
Source unique du **COMMENT** :
- fichiers ;
- interfaces ;
- SQL ;
- routes ;
- algorithms ;
- state machines ;
- provider adapters ;
- workers ;
- validation ;
- tests ;
- ordre de fabrication.

Le détail technique n'est pas recopié intégralement dans le plan maître.

---

# 39. CRITÈRE GLOBAL DE FIN

MORISE AI n'est pas terminée parce qu'un modèle répond.

Elle est terminée lorsque :
- chaque capability possède un contrat ;
- chaque tool possède une permission ;
- chaque provider actif possède un adapter ;
- chaque route possède une policy ;
- chaque résultat critique possède un validator ;
- chaque mémoire possède provenance + retention ;
- chaque évolution possède benchmark + canary + rollback ;
- chaque worker est borné ;
- les frontières M01–M15 sont respectées ;
- aucun deuxième cerveau ou router concurrent n'existe ;
- une IA développeuse peut assembler le système sans inventer les morceaux absents.
