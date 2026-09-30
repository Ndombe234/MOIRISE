# MOIRISE — PLAN MAÎTRE CANONIQUE DE FUSION

## Statut
Référence canonique active. Ce document fusionne les décisions historiques du dépôt, les spécifications récupérées depuis Git, les plans précédents, les mécanismes supprimés puis reconstruits, les décisions validées dans les échanges et l'état réel du dépôt.

## 1. Doctrine produit
MOIRISE est un réseau social Otaku, ludique et créatif. Le SYSTEM est la couche d'interaction centrale reliant PLAYER, WORLD, SOCIAL, PLAY, création, communautés, événements, progression, mémoire et IA.

MOIRISE n'est ni un simple chatbot, ni un catalogue de jeux, ni un quiz, ni un réseau social auquel on aurait ajouté un RPG.

Chaque grande capacité doit pouvoir avoir une valeur SOLO, puis une valeur COLLECTIVE quand cette dernière est justifiée.

## 2. Complexité interne, interface simple
Le produit peut contenir des centaines de capacités sans exposer des centaines de boutons.

Cible : environ 5–6 portes principales : SYSTEM, PLAYER, SOCIAL, WORLD, PLAY, CREATE. Une capacité interne ne crée pas automatiquement une nouvelle route ou un nouvel onglet.

~~~text
FEW USER DOORS
→ SYSTEM
→ MORISE AI ORCHESTRATION
→ MANY INTERNAL CAPABILITIES
→ CONTEXTUAL EXPERIENCE
~~~

Living Objects, Evolution Engine, Fun & Surprise, MORISE DNA, Convergence, Emergent Missions, World Memory, Memory Engine, Provider Router et AI Lab sont des mécanismes internes.

## 3. Architecture canonique à 15 modules

1. M01 FOUNDATION — runtime, shell, routing, auth boundary, sécurité primitive, événements, configuration.
2. M02 PLAYER — identité, profil, préférences, confidentialité, attribution, historique, Player Memory, signaux MORISE DNA.
3. M03 SOCIAL + PRIVATE MESSAGING — feed, posts, réactions, commentaires, relations, partage, conversations privées, traduction sociale.
4. M04 WORLD — Home/World, navigation contextuelle, Discover/Play/Create/Communities/Activities/Events.
5. M05 SYSTEM / PROGRESSION — SYSTEM HUD, orchestration visuelle/contextuelle, progression, missions, titres, achievements, Evolution Engine, Fun & Surprise.
6. M06 PLAY — entrée PLAY unique, sélection, sessions, micro-jeux, résultats, Moments, sauvegardes.
7. M07 GAME DISCOVERY ENGINE — recherche, ranking, marché, feedback, nouveauté, diversité et découverte personnalisée.
8. M08 GAME A→Z FACTORY — recherche, concept, design, spec, code, assets, build, simulation, tests, publication.
9. M09 SHARED GAME ENGINE — moteurs 2D/3D, runtime, input, save, session, résultats et bridges.
10. M10 SOCIAL GAMING — défis, rematches, co-op, asynchrone, challenges communautaires, partage.
11. M11 COMMUNITIES / GUILDS — groupes utilisateurs, memberships, rôles, invitations, modération, community intelligence.
12. M12 EVENTS — événements, activités, tournois, quêtes, défis, continuations réelles.
13. M13 ADAPTIVE WORLD — personnalisation, exploration, nouveauté, Living Object discovery, Convergence surface, World Memory retrieval.
14. M14 COLLECTION / REWARD ECONOMY — collections, récompenses, titres possédés, roulette, économie, attribution et intégrité.
15. M15 META SYSTEM + MORISE AI LAB — AI native, contexte, mémoire, apprentissage, orchestration, providers, workers, évolution contrôlée, World Memory, Convergence et AI Lab.

## 4. Mécanismes historiques préservés
Living Objects; Evolution Engine; Fun & Surprise; MORISE DNA; Convergence; Emergence Events; Emergent Missions/Missions From Reality; World Memory; Social Intelligence; Community Intelligence; Game Discovery Intelligence; Game Designer AI; Creative AI; Translation Intelligence; Safety/Moderation Intelligence; Economy/Reward Analysis; Provider Router; Resource Scheduler; Distributed Workers; Zero-API/on-device paths; Memory/Experience/Learning; Benchmarking; Self-Evolution; AI Lab; Creator Economy.

## 5. Living Objects
Primitive transverse, jamais un module supplémentaire.

Cycle :
SEED → VERSION → CONTRIBUTION → TRANSFORMATION → BRANCH → SHARE → NEW CONTRIBUTION → MERGE/FORK → CONVERSION.

Conversions possibles : idea→story, story→game, game→challenge, challenge→event, creation→community seed, solution→World Memory candidate.

Chaque objet garde : origine, owner, attribution, versions, branches, contributors, permissions, lineage, quality signals et conversion refs.

L'IA peut proposer une transformation, un fork, une fusion ou une collaboration ; aucune permission ne peut être implicitement accordée.

## 6. Evolution Engine
Trace, Living World, Hidden Possibilities, Unexplored Paths, Evolving Identity, MORISE Double et Fun & Surprise.

Cycle :
ACTION → PERMITTED SIGNAL → CONTEXT → PROPOSAL/CHANGE → PLAYER RESPONSE → FEEDBACK → CONTROLLED LEARNING.

Le Solo reste valable même sans amis.

## 7. MORISE DNA
DNA représente des capacités démontrées : Exploration, Creation, Resolution, Strategy, Collection, Collaboration, Discovery, Experimentation.

Les signaux viennent d'actions validées. DNA n'est ni personnalité, ni diagnostic, ni classification sensible.

## 8. Convergence
Convergence détecte des trajectoires compatibles :

TRAJECTORIES → DETECTION → CONFIDENCE → PRIVACY FILTER → CANDIDATE EXPERIMENT → OPTIONAL CONVERGENCE SPACE → RESULT → TRANSFORMATION/EMERGENCE.

Une activité répétée artificiellement ne suffit pas. Les données privées ne sont jamais révélées pour fabriquer une connexion.

## 9. Missions From Reality
PATTERN → PROBLEM CANDIDATE → MISSION DESIGN → VALIDATION → SOLO/COLLECTIVE EXPERIMENT → RESULT → VALIDATED SOLUTION → WORLD MEMORY CANDIDATE.

Ce mécanisme enrichit M05/M12 ; il ne crée pas un second moteur de missions.

## 10. World Memory
Mémoire collective validée avec provenance, attribution, confidence, scope, retention et correction path. Elle n'est pas un archiveur de toutes les conversations et n'est pas un feed.

## 11. Social, messages et communautés
M03 possède feed + messages privés. M11 possède communautés persistantes et GUILDS. L'utilisateur peut créer son groupe. MORISE AI peut détecter une opportunité de communauté via des signaux autorisés et proposer/créer selon policy, sans inférer de caractéristiques sensibles.

## 12. Games
La création est A→Z :
RESEARCH → IDEA → DESIGN → SPEC → ENGINE → RULES → CONTENT → ASSETS → CODE → SECURITY → BUILD → SIMULATION → TEST → PLAYTEST → BALANCE → PREVIEW → VERSION → PUBLISH → ITERATE.

2D et 3D sont pris en charge. Trois familles 2D historiques : Adventure, Battle, Puzzle. Les engines 3D sont des adapters approuvés et chargés à la demande.

## 13. Creative AI
Texte, image, vidéo, audio, musique, voix et compositions. Pipeline : intention → brief → originalité/policy → provider/local/worker → provenance → validation → stockage → publication.

## 14. Providers
Provider = adaptateur. Le cerveau est M15. Ordre de routage : local/on-device → cache → Trusted Worker → Community Worker si permis → provider vérifié gratuit/anonymous/client-side → provider API key → paid provider uniquement si activé → degraded/unavailable.

Une URL non vérifiée ne devient jamais une dépendance.

## 15. AI native
OBSERVE → CONTEXT → UNDERSTAND → PLAN → POLICY → RESOURCE → EXECUTE → VALIDATE → CORRECT/ASK → COMMIT → EXPERIENCE → EVALUATE → IMPROVE.

Appeler un modèle n'est pas construire MORISE AI.

## 16. Auto-évolution du code
OBSERVE LIMIT → CAPABILITY GAP → ROOT CAUSE → HYPOTHESIS → DESIGN → CODE CANDIDATE → STATIC CHECK → SANDBOX BUILD → TESTS → SECURITY → BENCHMARK VS BASELINE → REGRESSION → CANARY → PROMOTE/REJECT → MONITOR → ROLLBACK → EXPERIENCE MEMORY.

Une augmentation de lignes de code n'est jamais une preuve d'intelligence.

## 17. Compute distribué
Trusted Worker = machine explicitement autorisée.
Community Worker = opt-in ; défaut 1 logical CPU, 512 MiB RAM, GPU/storage désactivés, réseau borné. Les machines forment un pool de calcul distribué, pas une RAM partagée.

## 18. Interface
La complexité interne ne devient pas une surcharge de navigation. Le SYSTEM coordonne les capacités derrière les portes existantes.

## 19. Parcours
Arrivée → orientation → première valeur → interaction réelle → découverte → participation → création/jeu/social → continuité réelle → maîtrise.

Aucun faux événement, faux compteur, fausse rareté ou fausse urgence.

## 20. Sécurité
Autorité serveur ; RLS/policies ; secrets côté serveur ; validation ; idempotence ; sandbox ; provenance ; anti-abuse ; rate limits ; blocks/mutes ; tenant isolation ; mémoires séparées.

## 21. Universal module gate
PLAN → DESIGN → BUILD → AUTH/SECURITY → MOBILE → DESKTOP → RESILIENCE → BROWSER → PRODUCTION → DOCUMENTATION.

## 22. Sources
Master Plan → Module Plans → Module Technical Designs → AI Master → AI Technical Design → transversal contracts → historical matrix → code/migrations as implementation evidence.

## 23. Anti-confusion
Un ancien nom est soit un owner, soit un mécanisme, soit un alias. Il ne crée pas un nouveau module. Une règle partagée possède une source canonique unique.

## 24. Definition of complete documentation
Chaque fonctionnalité importante doit pouvoir être décomposée en :
acteur → déclencheur → contexte → entrées → préconditions → logique → permissions → mutation → événements → erreurs → fallback → UX → IA → données → tests → DONE.
