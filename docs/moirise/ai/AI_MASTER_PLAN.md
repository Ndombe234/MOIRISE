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

# 92. MODULE COGNITION LAYER — OBLIGATOIRE POUR L'IA QUI FABRIQUE MOIRISE

Cette section définit le modèle mental que l'IA de fabrication doit posséder avant d'écrire ou modifier du code.

## 92.1 Principe
Pour chaque module M01–M15, l'IA de fabrication doit pouvoir résoudre sans deviner : owner, responsabilité, non-responsabilité, état autoritatif, projections, inputs, outputs, capabilities, événements reçus/émis, contexte autorisé, actions IA autorisées/interdites, validators, fallback sans IA et critères DONE.

Une génération est bloquée tant que ces informations ne sont pas résolues par les sources canoniques.

## 92.2 Registre cognitif des 15 modules
| ID | Module | Autorité métier | Relation avec MORISE AI | Contexte minimal | Interdit critique |
|---|---|---|---|---|---|
| M01 | Foundation | runtime, shell, session, routing, configuration, capability/event boundary | expose la passerelle et les frontières de sécurité à M15 | session, route, actor, capability, event | aucun contournement de session/policy |
| M02 | Player | identité, profil, préférences, confidentialité, avatar, mémoire/DNA | fournit des projections Player autorisées et des capabilities de personnalisation | player projection, privacy, memory scope | écrire l'état Player directement |
| M03 | Social + Private Messaging | posts, commentaires, réactions, DMs, partage, traduction | expose traduction/modération/suggestions via capabilities | contenu social strictement scoped | rendre un DM public ou mémoriser globalement |
| M04 | World | surface World, portes, cards, detours, handoffs | M15 propose la contextualisation ; M04 décide la présentation | WorldContext + signaux autorisés | inventer utilisateur, futur, récompense |
| M05 | System / Progression | XP, niveaux, ranks, missions, titres, achievements, SYSTEM presentation | M15 propose des candidats/contextes ; M05 valide et commit | progression/events/rules | attribuer XP/rank/title/mission |
| M06 | Play | PlaySession, lancement, reprise, résultat autoritatif | M15 peut fournir adaptation/assistance bornée | session/runtime/result evidence | inventer score ou résultat |
| M07 | Game Discovery | recherche, visibilité, candidats, ranking, diversité, nouveauté | M15 aide parsing/reranking/reasons après filtres sécurité | query + candidats filtrés | envoyer privés/bloqués/non sûrs au ranking IA |
| M08 | Game Factory | GameSpecification, DAG, code/assets/tests, 2D/3D fabrication | M15 orchestre capabilities créatives et ressources | brief/spec/DAG/artifacts | publier un artefact généré non validé |
| M09 | Shared Game Engine | manifest runtime, bridge, sandbox, allowlist | reçoit seulement des artefacts/contracts compatibles | manifest + runtime state | contourner sandbox/allowlist |
| M10 | Social Gaming | parties partagées, coop, interactions sociales de jeu | M15 propose coordination/composition | party + participant permissions | changer silencieusement participants/règles |
| M11 | Communities / Guilds | communautés, membership, rôles, invitations, gouvernance | M15 propose formation/découverte/modération | community/membership projection | ajouter un membre ou élever un rôle |
| M12 | Events | lifecycle, participants, organizer controls, résultats | M15 aide planification, texte, matching, résumé | event + participant scope | modifier l'état Event directement |
| M13 | Adaptive World | adaptation, ranking contextualisé, réponses du monde vivant | M15 produit signaux/propositions bornés | world/player/social/game signals | fabriquer signaux ou événements inexistants |
| M14 | Collection / Reward Economy | ledger collection/rewards, roulette, intégrité économique | M15 analyse/explique/propose ; M14 calcule et commit | evidence + reward definitions | grant/mint/roll via AI |
| M15 | Meta System + MORISE AI Lab | cerveau unique, orchestration, routing, resources, validation, evolution | comprend tous les modules par leurs contrats | tous les scopes explicitement autorisés | devenir propriétaire de l'état métier des autres |

## 92.3 Module Cognitive Manifest
La connaissance d'un module doit être représentable logiquement par :
moduleId, version, mission, owner, authoritativeState, publicProjections, acceptedInputs, emittedEvents, consumedEvents, capabilities, aiCapabilities, aiReadScopes, aiWriteScopes, forbiddenAiActions, requiredValidators, fallbackWithoutAi, dependencies, dependedOnBy, privacyClasses, resourceConstraints, observability, tests, doneCriteria.

Ce manifest ne crée pas une troisième autorité. Il synthétise les contrats existants.

## 92.4 Ordre de compréhension pour une IA de fabrication
AI identity → global policy → module manifest → module PLAN → module TECHNICAL_DESIGN → transversal contracts → dependencies → implementation → tests → generation → validation.

Avant de coder une feature traversant plusieurs modules, l'IA doit construire le graphe : actor → intent → module owners → capabilities → context scopes → DAG → validators → owner commits → events → projections.

## 92.5 Compréhension réciproque
Un module peut contenir de l'IA sans devenir un second cerveau.
MORISE AI peut comprendre un module sans devenir propriétaire de son état métier.

Relation obligatoire :
module owner → capability contract → MORISE AI orchestration → validated proposal/result → owner validation/commit → event → projection.

## 92.6 Complétude d'une feature IA
Une feature IA n'est DONE que si capabilityId/version, ownerModule, input schema, approved context scope, policy class, autonomy level, resource profile, execution route, validator, output contract, fallback, event contract, observability, tests et rollback/recovery sont définis.

## 92.7 Erreurs interdites à l'IA de fabrication
Aucun second AI router. Aucun provider directement appelé par l'UI. Aucune mutation cross-owner. Aucune sortie IA utilisée comme preuve métier sans validation. Aucune mémoire privée transformée en mémoire globale. Aucune capability supposée parce qu'un provider la supporte. Aucun événement, schéma, table ou route inventé.

## 92.8 Critère de raccordement cognitif
L'IA de fabrication est raccordée lorsqu'elle peut partir d'une demande, déterminer les modules touchés, retrouver les owners, choisir les capabilities, résoudre les scopes de contexte, construire le DAG, générer au bon endroit, valider les handoffs et vérifier le résultat sans créer une seconde autorité.

# 94. GAME PLATFORM NATIVE — FABRICATION ET EXÉCUTION DES JEUX 2D/3D

MOIRISE ne traite pas chaque jeu comme une application indépendante construite depuis zéro. L'environnement possède une plateforme permanente de jeux réutilisable. MORISE AI orchestre cette plateforme, M08 possède la fabrication, M09 possède l'exécution commune, M06 possède l'expérience PLAY et M07 la découverte. M10 possède les interactions sociales de jeu.

## 94.1 Objectif
Une demande utilisateur telle que « crée un jeu 2D de combat avec trois ennemis et un boss » ou « crée une arène 3D de vagues d'ennemis » doit être transformée en un projet de jeu exécutable dans MOIRISE sans reconstruire le système social, l'authentification, la progression, le partage, le runtime commun ou les garde-fous à chaque fois.

Le coût architectural principal est donc la plateforme initiale. Les jeux suivants réutilisent ses fondations.

## 94.2 Couches permanentes
1. Game Specification Layer : décrit les règles et objectifs du jeu.
2. Game Factory Layer : transforme la spécification en fichiers, code, assets, tests et build.
3. Game Runtime Layer : fournit l'exécution 2D/3D commune.
4. Game Validation Layer : build, lint, tests, security, resource, manifest et runtime validation.
5. Game Catalog/Discovery Layer : version publiée, visibilité, recherche, ranking et présentation.
6. PLAY Integration Layer : session, lancement, sauvegarde, résultats et partage.
7. Social Gaming Layer : parties et interactions partagées lorsque le jeu le permet.

## 94.3 Sélection 2D / 3D
La demande, les contraintes produit et la valeur de la spatialité déterminent le mode. L'IA ne choisit pas 3D simplement parce que la capacité existe. Le choix doit être justifié par GameSpecification et borné par les capacités du device, le budget de performance, la taille des assets, la latence et le besoin réel de spatialité.

## 94.4 Infrastructure réutilisable
Les jeux réutilisent autant que possible :
- input et mapping clavier/tactile/manette ;
- boucle de jeu et lifecycle ;
- audio ;
- assets manifest ;
- sauvegarde/reprise ;
- session/identité ;
- partage ;
- télémétrie bornée ;
- resource profiles ;
- validation ;
- error boundary ;
- compatibilité mobile/desktop ;
- hooks de progression et récompenses après validation ;
- hooks de social gaming ;
- sandbox et network policy.

Un jeu ne recopie pas ces mécanismes comme une nouvelle infrastructure concurrente.

## 94.5 Pipeline canonique
DEMANDE → INTENT → GAME REQUIREMENTS → GAME SPECIFICATION → TASK GRAPH → GENERATION → BUILD → TEST → DIAGNOSTIC → BOUNDED REPAIR → REBUILD → REVALIDATE → READY_FOR_INTEGRATION → PLAY INTEGRATION → PUBLISHED.

Une génération de code seule n'est jamais considérée comme un jeu terminé.

## 94.6 Boucle de correction
Chaque correction doit pointer vers :
- un diagnostic ;
- un artifact ou task node concerné ;
- une version candidate ;
- une hypothèse de correction ;
- une limite d'essais ;
- un test de régression ;
- un résultat VALID/INVALID/INCONCLUSIVE.

Deux corrections qui oscillent sans amélioration déclenchent une sortie contrôlée : ESCALATE ou REJECTED.

## 94.7 Codex et autres agents de développement
Codex peut être utilisé comme agent de fabrication assistée dans le pipeline Game Factory. Il n'est pas le cerveau de MORISE et n'est pas une dépendance de production obligatoire.

Lorsqu'un agent de développement est utilisé :
- il reçoit uniquement le workspace/project scope autorisé ;
- il travaille sur une branche ou workspace candidat ;
- il n'obtient pas automatiquement les secrets production ;
- il ne peut pas publier directement un jeu ;
- ses modifications deviennent des artifacts candidats ;
- build/tests/validation restent obligatoires ;
- M08/M09/M06 conservent respectivement leurs autorités.

## 94.8 Réutilisation entre jeux
Un nouveau jeu doit chercher d'abord une fondation existante compatible : template, system component, runtime capability, asset pipeline, test fixture ou adapter validé. Une nouvelle implémentation n'est créée que lorsque l'existant est incompatible ou insuffisant.

Le jeu N+1 ne doit donc pas reconstruire la plateforme du jeu N.

## 94.9 Intégration dans le SYSTEM
L'utilisateur n'a pas besoin de connaître les couches internes. Le SYSTEM peut exposer une demande de création, un état de fabrication et le résultat jouable. Les grandes portes MOIRISE restent stables ; la complexité de fabrication est absorbée par les couches internes.

## 94.10 Ownership
M15 = orchestration AI.
M08 = GameSpecification + fabrication + artifact lineage + acceptance.
M09 = runtime + sandbox + manifest compatibility.
M06 = PlaySession + launch + result admission + recovery.
M07 = discovery/catalog visibility/ranking.
M10 = shared/social gaming.
M05 = progression.
M14 = rewards/collection.
Aucun de ces owners ne peut être remplacé par un provider ou par Codex.

## 94.11 DONE global
La plateforme jeux est considérée prête lorsqu'un jeu 2D et un jeu 3D peuvent être fabriqués depuis une GameSpecification, passer build/tests/validation, recevoir un manifest runtime valide, démarrer dans M06, fonctionner dans M09, apparaître via M07 et utiliser les intégrations M05/M10/M14 uniquement par leurs contrats.


# 95. MÉMOIRE DE FABRICATION DES JEUX — AUTONOMIE PAR RAPPORT AUX AGENTS

La fabrication de jeux possède désormais un domaine de connaissance durable à l'intérieur du Memory Service central. Il ne s'agit pas d'une deuxième mémoire et pas d'une mémoire appartenant à Codex.

## 95.1 Principe
Après chaque fabrication, MORISE peut mémoriser les connaissances validées qui expliquent comment obtenir un meilleur résultat la prochaine fois :
- transformations de demande vers GameSpecification ;
- choix 2D/3D validés ;
- templates et composants qui ont réellement fonctionné ;
- combinaisons de composants compatibles ;
- stratégies de build ;
- fixtures/tests efficaces ;
- diagnostics d'erreurs reproductibles ;
- corrections qui ont réellement supprimé une classe d'erreur ;
- contraintes de performance observées ;
- compatibilités runtime/device ;
- coûts, latences et resource profiles ;
- résultats comparatifs entre méthodes ;
- qualité réelle des artifacts ;
- réussite ou échec d'un agent/provider selon la tâche ;
- raisons structurées d'une décision technique ;
- patterns réutilisables.

Une génération non validée, un échec isolé ou une sortie provider non vérifiée ne devient pas automatiquement une connaissance durable.

## 95.2 Indépendance vis-à-vis de Codex
Codex est une cible d'exécution facultative. La connaissance de fabrication appartient à MORISE et au Game Factory domain.

Quand Codex produit une correction réussie :
agent output → validation → expérience → candidate knowledge → benchmark/policy → promotion éventuelle.

Quand Codex est absent :
MORISE utilise les connaissances déjà promues, les templates/components, les capabilities natives, les outils locaux/workers autorisés et les procédures de réparation déjà apprises.

Quand plusieurs agents/providers existent :
leurs contributions sont comparées comme sources d'exécution. Aucun agent ne devient la source de vérité.

## 95.3 Catégories de Game Fabrication Knowledge
Les entrées utilisent le Memory Service central avec des dataClass spécialisés :
GAME_SPEC_PATTERN
GAME_TEMPLATE_KNOWLEDGE
GAME_COMPONENT_KNOWLEDGE
GAME_ARCHITECTURE_PATTERN
GAME_2D_PATTERN
GAME_3D_PATTERN
GAME_RUNTIME_COMPATIBILITY
GAME_BUILD_PATTERN
GAME_TEST_PATTERN
GAME_FAILURE_PATTERN
GAME_REPAIR_PATTERN
GAME_PERFORMANCE_PATTERN
GAME_RESOURCE_PATTERN
GAME_PROVIDER_PERFORMANCE
GAME_AGENT_PERFORMANCE
GAME_REUSE_DECISION
GAME_GENERATION_HEURISTIC
GAME_VALIDATED_EXPERIENCE

Chaque entrée garde provenance, version, confidence, utility, scope, evidenceRefs, validationStatus, createdAt et expiration/purge policy.

## 95.4 Cycle d'apprentissage d'un jeu
FABRICATION → BUILD → TEST → PLAYTEST/VALIDATION → OBSERVATION → NORMALIZATION → PATTERN CANDIDATE → OFFLINE EVALUATION → POLICY → CANARY → PROMOTION ou REJECTION.

La boucle d'apprentissage ne modifie pas silencieusement les règles de production. Une connaissance promue devient une entrée versionnée et réutilisable ; elle n'écrase pas l'historique.

## 95.5 Mémoire des échecs
Un échec utile conserve :
- failureFingerprint ;
- phase ;
- affectedNode ;
- environment/profile ;
- input constraints ;
- rootCause candidate ;
- attemptedFixRefs ;
- successfulFixRef éventuel ;
- regressionTests ;
- occurrence count ;
- lastSeenAt ;
- validation status.

Un échec non compris reste OBSERVED_FAILURE. Il ne doit jamais être promu comme une recette.

## 95.6 Mémoire des réparations réussies
Une réparation devient réutilisable seulement si :
1. elle corrige le problème ;
2. le build passe ;
3. les tests impactés passent ;
4. les tests de régression passent ;
5. aucun invariant de sécurité/policy n'est violé ;
6. le résultat est reproductible ou suffisamment stable ;
7. sa portée est définie.

Elle devient alors VALIDATED_REPAIR_PATTERN.

## 95.7 Recherche avant fabrication
Avant de créer du nouveau code :
GAME REQUEST → REQUIREMENTS → RETRIEVE RELEVANT GAME KNOWLEDGE → COMPATIBILITY CHECK → REUSE DECISION → ONLY THEN GENERATE NEW ARTIFACT.

Le système ne réutilise pas une connaissance seulement parce qu'elle existe. Il vérifie version, runtime, device, sécurité, resource budget et contexte.

## 95.8 Distinction connaissance / artifact
Un artifact est un objet fabriqué.
Une mémoire de fabrication est une connaissance sur la manière de fabriquer ou de corriger.

Artifact stable → peut fournir une source de réutilisation.
Memory entry → explique pourquoi et comment cette réutilisation est autorisée.

Ils ne sont pas interchangeables.

## 95.9 Mémoire des agents
MORISE peut mémoriser par capability et tâche :
- success rate ;
- validation failure rate ;
- mean latency ;
- resource usage ;
- repair frequency ;
- artifact quality indicators.

Ces mesures servent au routing et à la planification. Elles ne donnent jamais à un agent une autorité supérieure à celle de la policy.

## 95.10 Autonomie progressive
Niveau 0 : aucune connaissance de réutilisation.
Niveau 1 : recherche de templates/components.
Niveau 2 : réutilisation de patterns validés.
Niveau 3 : diagnostic/réparation à partir de patterns validés.
Niveau 4 : fabrication et amélioration bornées avec mémoire de fabrication.

Une promotion de maturité exige benchmark + tests + policy + observabilité.

## 95.11 Condition d'autonomie Game Factory
MORISE est indépendante de Codex pour la connaissance et l'orchestration lorsque :
- elle retrouve les patterns validés ;
- elle sélectionne ou rejette une réutilisation ;
- elle construit un TaskGraph ;
- elle génère via ses capabilities disponibles ;
- elle analyse les échecs ;
- elle applique des réparations validées ;
- elle apprend des nouveaux résultats validés ;
- Codex peut être retiré sans supprimer ces connaissances.

L'absence de Codex peut encore réduire les moyens d'exécution disponibles ; elle ne doit pas effacer le savoir-faire de MORISE.



# D10 — EXPANSION MORISE AI — FABRICATION MULTIMÉDIA ET INTELLIGENCE SOCIALE

## 24. Creative media reasoning
MORISE traite toute demande créative comme un problème de compréhension puis de fabrication. Une entrée média ne devient jamais automatiquement un prompt brut. La chaîne minimale est :
SOURCE_REF → AUTHORIZATION → MEDIA_CONTEXT → MODALITY_ANALYSIS → SEMANTIC_FACTS → STYLE/STRUCTURE_FEATURES → PROTECTED_OR_RESTRICTED_FEATURES → CREATIVE_INTENT → GENERATION_REQUIREMENTS → EXECUTION_PLAN → VALIDATION.

## 25. Media analysis contracts
IMAGE_ANALYSIS produit : subjects, sceneGraph, composition, palette, lighting, camera-like features, textualElements, logos/marks indicators, safety labels, provenance refs.
VIDEO_ANALYSIS produit : shot list, scene boundaries, subjects, motion patterns, temporal structure, transcript where authorized, audio features, editing rhythm, provenance refs.
AUDIO_ANALYSIS produit : duration, tempo estimate, energy curve, spectral descriptors, structure, non-copying high-level motif indicators, transcript if authorized, provenance refs.
L'analyse ne doit pas sortir de contenu privé non nécessaire.

## 26. Concept abstraction
MORISE doit séparer :
A. concepts génériques réutilisables ;
B. expressions protégées ou spécifiques ;
C. données personnelles ;
D. secrets/contextes privés ;
E. éléments interdits.
A et une partie des métadonnées de B peuvent alimenter un brief créatif sous policy. C/D/E sont exclus selon policy.

## 27. Originality gate
Le changement lexical superficiel est explicitement insuffisant. Pour une génération dérivée, la validation compare :
- semantic overlap ;
- phrase/sequence overlap lorsque pertinent ;
- source asset identity ;
- protected-element policy ;
- transformation depth ;
- user contribution;
- provenance disclosure.
Un échec impose REVISE, ASK ou BLOCK.

## 28. Social intelligence
MORISE peut estimer la pertinence d'une découverte pour un Player mais ne déduit pas des attributs sensibles. Les signaux de ranking sont bornés, versionnés, dédupliqués et expliquables à haut niveau. Le modèle n'est jamais l'autorité du ranking final.

## 29. AI actions that increase sharing quality
MORISE peut proposer :
- meilleure miniature ou couverture selon le contexte ;
- titre/caption ;
- version courte ;
- traduction/doublage autorisé ;
- Story à partir d'un lot de médias ;
- remix transformateur ;
- prompt créatif ;
- jeu ou challenge associé ;
- invitation sociale ciblée.
Toute proposition garde l'auteur comme owner de la publication lorsque requis.

## 30. AI learning
Les validations de fabrication enrichissent GAME_* et MEDIA_* knowledge records avec provenance, version, confidence, utility, scope, evidenceRefs, policyVersion, validationStatus et expiry. Une sortie non validée reste une tentative, jamais une vérité de mémoire.

## 31. Autonomy boundary
A0 répond ; A1 propose ; A2 exécute après confirmation ; A3 exécute un graphe borné autorisé ; A4 exécute un workflow long borné. La publication publique et l'utilisation de médias privés peuvent imposer un niveau d'autonomie inférieur au niveau demandé.

## 32. Viral optimization guardrail
L'IA peut optimiser la clarté, la découvrabilité et la possibilité de partage ; elle ne doit pas utiliser dark patterns, faux compteurs, faux succès, spam de notifications ou manipulation cachée pour augmenter l'engagement.


# AI-CONSTITUTION BOUNDARY
Before this operational WHAT is implemented, the fabricator must read docs/moirise/ai/AI_CONSTITUTION.md. That document is the higher-order identity and invariant layer for MORISE AI. This file remains the source of operational behavior; AI_TECHNICAL_DESIGN remains the source of operational HOW. No feature may redefine AI identity, authority, provider independence, privacy, autonomy or evolution rules locally.


# D100 — MORISE AI — SPÉCIFICATION OPÉRATIONNELLE PROFONDE
## 100.1 Request compilation
Une AIRequest ne devient exécutable qu'après résolution de actor server-side, owner module, privacyClass, requiredCapabilities, requestedOutput, sideEffects, autonomy et resourceBudget. Toute ambiguïté non couverte par une policy réversible produit CLARIFY.
## 100.2 Context assembly
ContextResolver sélectionne par scope puis permission, visibility, minimum-necessary, relevance, provenance, expiry et hash. Les données non nécessaires ne sont pas chargées. Les scopes privés ne peuvent pas être promus à une portée supérieure par simple résumé.
## 100.3 Requirements compiler
L'intention est transformée en exigences testables. Chaque exigence identifie source, owner, acceptance rule et validator. Une capability provider-specific ne doit pas être introduite avant cette étape.
## 100.4 Planning
TaskGraphBuilder produit un DAG ; chaque node possède capabilityId/version, inputRefs, outputRefs, validator, timeout, retry, resourceProfile et idempotencyKey. Cycle, référence inconnue ou budget impossible = refus avant exécution.
## 100.5 Decision hierarchy
Policy > owner authority > validator > model/provider output. Un provider peut proposer un résultat ; seul l'owner committe l'état métier.
## 100.6 Memory
Candidate memory → evidence → validation → scoped promotion. Les expériences d'échec restent distinguées des patterns validés. Une mémoire contradictoire crée une nouvelle version/evidence plutôt qu'un écrasement silencieux.
## 100.7 Media intelligence
Image/video/audio/music suivent analyse modale → faits sémantiques → concepts réutilisables → éléments protégés/restrictifs → brief créatif → génération → validators → artifact lineage. La source privée reste dans son scope.
## 100.8 Social intelligence
MORISE peut produire reasonKey, candidates, summaries, creative suggestions and matching proposals. M07/M03/M11/etc. restent les owners des décisions/mutations sociales.
## 100.9 Agent orchestration
Codex/agents are execution targets. Chaque invocation possède workspace scope, tool allowlist, resource budget, deadline, output contract, validator and cancellation. Agent output is never a publish command.
## 100.10 Evolution
Toute évolution d'architecture ou de code crée candidateRef + baselineRef + benchmark suite + security/policy evidence + rollbackRef. La promotion est versionnée et réversible.

# D110 — PRODUCT LOOP INTELLIGENCE GOVERNANCE
MORISE AI comprend les loops comme des graphes de transitions entre owners. Il peut générer hypotheses, reasonKeys, proposals et expériences, mais ne modifie jamais directement les décisions métier d'un autre owner.
Deux états de validation sont distingués : TECH_VALIDATED et PRODUCT_VALIDATED. M07 reste l'autorité du ranking ; une évolution à effet utilisateur demande une evidence produit lorsque cela est applicable.
Référence : docs/moirise/transversal/PRODUCT_LOOP_GOVERNANCE.md
