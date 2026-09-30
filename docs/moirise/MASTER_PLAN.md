# MOIRISE — PLAN MAÎTRE CANONIQUE DE FUSION

## Statut

**Référence canonique active.** Ce document fusionne les décisions historiques du dépôt, les spécifications supprimées récupérées depuis Git, les plans précédents, les règles validées dans les échanges et la structure actuelle du dépôt.

La documentation historique ne disparaît pas conceptuellement : lorsqu'une ancienne fonctionnalité portait un nom différent, elle est rattachée ici à son propriétaire final. Un ancien nom ne devient pas automatiquement un nouveau module.

## 1. Identité du produit

MOIRISE est un réseau social Otaku, ludique et créatif. Le **SYSTEM** est la couche d'interaction centrale qui relie Player, Social, World, Play, création, communautés, événements, progression, mémoire et IA.

MOIRISE n'est pas :
- un chatbot entouré de pages ;
- un quiz avec des fonctions sociales ;
- un catalogue de jeux ;
- un RPG ajouté à un réseau social ;
- une simple collection de providers IA.

MOIRISE est un seul environnement avec une interface simple et une architecture interne profonde.

## 2. Loi de complexité

Le système peut contenir des centaines de mécanismes internes sans transformer l'interface en tableau de bord rempli de boutons.

Principe :

~~~text
5–6 GRANDES PORTES VISIBLES
        ↓
SYSTEM
        ↓
MORISE AI / ORCHESTRATION
        ↓
CENTAINES DE CAPACITÉS INTERNES
~~~

Navigation primaire cible :
- SYSTEM
- PLAYER
- SOCIAL
- WORLD
- PLAY
- CREATE

Les libellés exacts peuvent évoluer pendant la validation UX, mais le nombre de portes reste volontairement petit.

Messages privés, groupes, missions, collections, événements, création de jeux, Creative Studio, mémoire, Convergence, Living Objects, MORISE DNA, World Memory et AI Lab ne deviennent pas automatiquement des boutons supplémentaires.

## 3. Architecture canonique en 15 modules

### M01 — FOUNDATION
Socle runtime, session, shell, routing, sécurité primitive, événements, configuration, capability registry et frontières d'infrastructure.

### M02 — PLAYER
Identité Player, profil, préférences, confidentialité, attribution, historique, mémoire personnelle et signaux MORISE DNA.

### M03 — SOCIAL + PRIVATE MESSAGING
Feed, posts, réactions, commentaires, partage, relations, messages privés, traduction contextuelle et signaux sociaux permis.

### M04 — WORLD
Surface principale de découverte : Home/World, Discover, Create, Communities, Activities, Events et entrée contextuelle vers les autres expériences.

### M05 — SYSTEM / PROGRESSION
SYSTEM HUD et orchestration visuelle/contextuelle, XP, niveaux, missions, titres, achievements, rewards hooks, Trace, Evolution Engine, Fun & Surprise et progression SYSTEM.

### M06 — PLAY
Une entrée Play simple, sélection d'expérience, sessions, résultats, intégrité, micro-jeux, expériences 2D/3D, sauvegarde et Moments.

### M07 — GAME DISCOVERY ENGINE
Recherche, demande, signaux de marché, ranking, nouveauté, diversité, feedback et découverte personnalisée des jeux/expériences.

### M08 — GAME A→Z FACTORY
Création complète de jeux : idée, recherche, design, spec, moteur, contenu, assets, code, sécurité, build, simulation, test, preview, version, publication.

### M09 — SHARED GAME ENGINE
Runtime et primitives de jeux réutilisables, moteurs 2D/3D approuvés, sessions, saves, input, résultats et bridges de progression.

### M10 — SOCIAL GAMING
Défis, rematches, asynchrone, co-op, challenges communautaires, partage de résultats et conversion des créations en expériences jouables.

### M11 — COMMUNITIES / GUILDS
Groupes et communautés créés par les utilisateurs, memberships, rôles, invitations, modération locale, événements, objectifs, GUILDS et mécanismes de formation de communautés assistés par IA.

### M12 — EVENTS
Événements, activités, tournois, quêtes, défis, calendrier, éligibilité, continuation réelle et transformations de Living Objects en événements.

### M13 — ADAPTIVE WORLD
Personnalisation du World, recommandations, nouveauté, exploration, Living Object discovery, Convergence surface et World Memory retrieval contextuel.

### M14 — COLLECTION / REWARD ECONOMY
Collections, cartes/objets originaux, récompenses, titres possédés, roulette, economy integrity, attribution créateur, récompenses de contribution et garde-fous.

### M15 — META SYSTEM + MORISE AI LAB
MORISE AI native, mémoire/expérience/apprentissage, orchestration, provider adapters, workers, multimodal creation coordination, Evolution Engine mature, MORISE DNA, Convergence, Missions From Reality, World Memory, AI Lab et évolution contrôlée du code.

## 4. Mécanismes transversaux historiques conservés

Ces mécanismes sont réels et doivent être fusionnés sans devenir 30 nouveaux modules :

- Living Objects
- Evolution Engine
- Fun & Surprise
- MORISE DNA
- Convergence
- Emergence Events
- Emergent Missions / Missions From Reality
- World Memory
- Social/Relationship Intelligence
- Community/GUILD Intelligence
- Game Discovery Intelligence
- Game Designer AI
- Creative AI
- Translation Intelligence
- Safety/Moderation Intelligence
- Economy/Reward Analysis
- Provider Router
- Resource Scheduler
- Distributed Workers
- On-device / zero-API paths
- Memory/Experience/Learning
- Benchmarking
- Controlled Self-Evolution
- AI Lab

## 5. Living Objects

Living Object est un primitive transversal.

Cycle principal :

~~~text
SEED
→ VERSION
→ CONTRIBUTION
→ TRANSFORMATION
→ BRANCH
→ SHARE
→ NEW CONTRIBUTION
→ MERGE/FORK
→ CONVERSION
~~~

Conversions possibles :
- idea → story
- story → game
- game → challenge
- challenge → event
- creation → community seed
- collaborative solution → World Memory candidate

Chaque objet garde :
origine, owner, attribution, versions, branches, contributors, permissions, transformation lineage, quality signals, share refs.

L'IA peut proposer des transformations ou collaborations ; elle ne peut pas contourner les permissions.

## 6. Evolution Engine

L'Evolution Engine est une couche SYSTEM/IA interne.

Il maintient :
- Trace ;
- Living World ;
- Hidden Possibilities ;
- Unexplored Paths ;
- Evolving Identity ;
- MORISE Double ;
- Fun & Surprise.

Boucle :

~~~text
ACTION
→ PERMITTED SIGNAL
→ CONTEXT
→ PROPOSAL/CHANGE
→ PLAYER RESPONSE
→ FEEDBACK
→ CONTROLLED LEARNING
~~~

La valeur Solo est obligatoire. Le Player n'a pas besoin d'amis pour que l'expérience évolue.

## 7. MORISE DNA

DNA décrit des **capacités démontrées**, pas une personnalité ou une caractéristique sensible.

Dimensions candidates :
Exploration, Creation, Resolution, Strategy, Collection, Collaboration, Discovery, Experimentation.

Les preuves proviennent d'actions validées. DNA peut orienter les possibilités proposées, les titres, les défis ou les expériences.

## 8. Convergence

Convergence détecte une compatibilité entre trajectoires indépendantes.

~~~text
TRAJECTORIES
→ DETECTION
→ CONFIDENCE
→ PRIVACY FILTER
→ CANDIDATE EXPERIMENT
→ OPTIONAL CONVERGENCE SPACE
→ RESULT
→ TRANSFORMATION / EMERGENCE
~~~

Une répétition artificielle par un seul compte ne suffit pas à créer une convergence.

## 9. Emergent Missions / Missions From Reality

Le mécanisme transforme des problèmes ou besoins récurrents observés dans MORISE en expériences facultatives :

~~~text
OBSERVATION
→ PATTERN
→ PROBLEM CANDIDATE
→ MISSION DESIGN
→ VALIDATION
→ SOLO/COLLECTIVE EXPERIMENT
→ RESULT
→ VALIDATED SOLUTION
→ WORLD MEMORY CANDIDATE
~~~

Cela prolonge M05 sans créer un second système de missions.

## 10. World Memory

World Memory conserve des connaissances collectives **validées et provenance-aware**.

Elle ne contient pas tout ce que les utilisateurs disent. Elle ne copie pas les conversations privées. Elle ne devient pas un feed.

Un candidat est :
source + attribution + validation + confidence + scope + retention + correction path.

## 11. Social et communauté

Social contient :
posts, réactions, commentaires, partage, relations, messages privés.

Communities contient :
groupes, GUILDS, memberships, rôles et organisation.

L'IA peut détecter une opportunité de communauté depuis des signaux non sensibles, mais la création persistante doit respecter la policy : proposition/consentement ou règle explicite d'automatisation. Elle ne doit jamais fabriquer artificiellement une communauté à partir de données privées.

## 12. Création de jeux

Game Factory est une chaîne complète :

~~~text
MARKET/DEMAND RESEARCH
→ IDEA
→ INTENT
→ GAME DESIGN
→ CORE LOOP
→ GAME SPEC
→ ENGINE SELECTION
→ RULES
→ CONTENT
→ ASSETS
→ CODE
→ SECURITY
→ BUILD
→ SIMULATION
→ TEST
→ PLAYTEST
→ BALANCE
→ PREVIEW
→ VERSION
→ PUBLISH
→ ITERATE
~~~

2D et 3D sont autorisés.

Les trois moteurs 2D historiques de base sont :
- Adventure 2D
- Battle 2D
- Puzzle 2D

Les 3D sont des engines/adapters approuvés, chargés seulement lorsque l'expérience en a besoin.

## 13. Creative Studio

Capabilities :
texte, image, vidéo, audio, musique, voix, composition.

L'originalité, la provenance, la validation et la sécurité passent avant publication.

## 14. Providers

Les providers sont des outils auxiliaires.

Architecture :

~~~text
MOIRISE AI
→ Capability
→ Policy
→ Provider Router
→ Adapter
→ Provider
→ Normalizer
→ Validator
→ Artifact/Result
~~~

La disparition d'un provider ne détruit pas le cerveau MOIRISE.

Les fournisseurs historiques/candidats identifiés doivent être conservés dans le registre, notamment :
Pollinations, Puter, LLM7, Vireonix, Murakumo, Kilo AI, AI Horde, AI Horde OpenAI API, Cehpoint AI, OVH AI Endpoints, Quillly, Openverse, Internet Archive, Gemini, DeepSeek, OpenRouter et autres providers vérifiés.

Les URLs exactes et capabilities doivent être vérifiées avant activation. Aucune URL inventée.

## 15. IA native

MORISE AI doit rester une architecture native, pas un wrapper.

Boucle :

~~~text
OBSERVE
→ CONTEXT
→ UNDERSTAND
→ PLAN
→ POLICY
→ RESOURCE
→ EXECUTE
→ VALIDATE
→ CORRECT/ASK
→ COMMIT
→ EXPERIENCE
→ EVALUATE
→ IMPROVE
~~~

Un provider peut aider, mais il ne constitue jamais MORISE AI.

## 16. Auto-évolution du code

La boucle complète est :

~~~text
OBSERVE LIMIT
→ CAPABILITY GAP
→ ROOT CAUSE
→ HYPOTHESIS
→ DESIGN
→ CODE CANDIDATE
→ STATIC CHECK
→ SANDBOX BUILD
→ UNIT/INTEGRATION/BEHAVIOR TESTS
→ SECURITY TEST
→ BENCHMARK VS BASELINE
→ REGRESSION
→ CANARY
→ PROMOTE / REJECT
→ MONITOR
→ ROLLBACK IF REQUIRED
→ EXPERIENCE MEMORY
~~~

L'augmentation du nombre de fichiers ou de lignes n'est jamais une preuve d'intelligence.

## 17. Workers

Trusted Worker = machine explicitement autorisée.
Community Worker = opt-in.

Par défaut Community Worker :
- 1 logical CPU maximum ;
- 512 MiB RAM maximum ;
- GPU désactivé ;
- stockage persistant désactivé ;
- réseau borné.

Le pool est distribué ; il ne fusionne pas la RAM.

## 18. Interface

Le produit ne doit pas exposer la complexité interne.

Primary doors : environ 5–6.

Le SYSTEM peut révéler :
- missions ;
- récompenses ;
- surprises ;
- découvertes ;
- collections ;
- groupes ;
- création ;
- jeux ;
- événements ;
- convergence ;
- mémoire contextuelle.

Mais toujours via les portes existantes.

## 19. Parcours

Entrée → orientation → première valeur → interaction réelle → découverte → participation → création/jeu/social → continuité réelle → maîtrise.

Aucune fausse urgence. Aucun faux compteur. Aucune fausse activité.

## 20. Règles de sécurité

- server authoritative;
- RLS/policies ;
- secrets serveur ;
- validation ;
- idempotence ;
- sandbox ;
- provenance ;
- anti-abuse ;
- rate limits ;
- blocage/mute ;
- séparation des mémoires ;
- tenant isolation.

## 21. SOLO + COLLECTIVE

Chaque grande capacité doit être Solo-first et Collective-capable lorsque cela apporte une valeur réelle.

Le Player peut :
- jouer seul ;
- créer seul ;
- explorer seul ;
- évoluer seul ;
- puis découvrir des possibilités sociales.

La présence d'un groupe d'amis ne doit jamais être une condition de valeur du produit.

## 22. Universal module gate

PLAN → DESIGN → BUILD → AUTH/SECURITY → MOBILE → DESKTOP → RESILIENCE → BROWSER → PRODUCTION → DOCUMENTATION.

Un module est DONE uniquement lorsque son comportement, sécurité, persistence, UI, tests, dépendances et recovery sont prouvés.

## 23. Sources de vérité

1. Ce Plan Maître canonique.
2. Les Plans de modules.
3. Les Conceptions techniques de modules.
4. AI_MASTER_PLAN.
5. AI_TECHNICAL_DESIGN.
6. Contrats transversaux.
7. Inventaire historique et matrice de fusion pour traçabilité.
8. Code/migrations réels comme état implémenté à comparer, pas comme définition de la vision.

## 24. Règle anti-embrouillage

Si un nom historique apparaît mais qu'il correspond à une capacité déjà couverte :
- conserver le nom historique dans la matrice ;
- rattacher son comportement au propriétaire canonique ;
- ne pas créer un nouveau module ;
- enrichir le propriétaire s'il manque des détails.

Si deux règles contradictoires existent :
- identifier le propriétaire ;
- choisir la décision validée la plus récente ;
- conserver l'ancien texte uniquement dans l'historique ;
- ajouter une note de migration ;
- ajouter un test de non-régression.

## 25. Critère final

La documentation est complète lorsque chaque fonctionnalité importante peut être décomposée en :
acteur → déclencheur → contexte → entrées → préconditions → logique → permissions → mutations → événements → erreurs → fallback → UX → IA → données → tests → DONE.
