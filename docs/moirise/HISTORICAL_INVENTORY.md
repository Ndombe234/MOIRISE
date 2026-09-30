# MOIRISE — INVENTAIRE HISTORIQUE COMPLET ET FUSIONNABLE

## Statut

Ce document est un inventaire historique, pas un second plan maître.

Il a été établi à partir de l'historique Git de `Ndombe234/MOIRISE`, notamment des générations de documents et des commits qui ont ensuite supprimé, fusionné ou remplacé des spécifications.

Références historiques majeures :

- `MORISE_MASTER_PLAN_V3.md` — commit `bb4664b61bd515357ad3e949c2933fa1f9bbdd09`
- `MORISE_AI_MECHANICS_MAP.md` — commit `a0af36f6e325d387ce3842cf15c9f118d22009d8`
- `MORISE_AI_BEHAVIOR_AND_GAME_CREATOR_SPEC.md` — commit `720cd6936f4274a64266da15e70bdf5445e5cdbb`
- architecture native/self-evolving AI — commit `bb4664b61bd515357ad3e949c2933fa1f9bbdd09`
- provider registry — commit `d8044cbe2d5efd7ada08c0b5da8af54743d9b8b9`
- séparation Game Creation / Runtime — commit `abbdd61fb3d2799c210552f561782d82a5c6e614`
- distributed workers — commit `23a50668f93f37dd22f7659e953a91bf46bf2f6b`
- technical AI contract — commit `f0905fe77234556e2bc8000d1ae94828a2e6d8b7`
- detailed module architecture 1–15 — commits `2c0cbec00f2fcbb1d57afc8c5db6008efb11d3cb` et `e1727273ea981aabe82bc71569676b930853259d`
- exact SQL/TypeScript/events/provider contracts — commit `007f18feedc36d7a1131bf3bd26f46d84611e04a`

## Règle d'interprétation

Un nom historique peut représenter :
1. un module ;
2. une capability ;
3. un mécanisme transversal ;
4. un moteur interne ;
5. un document temporaire ;
6. un ancien nom remplacé.

Un nom n'est donc pas compté comme une fonctionnalité séparée automatiquement.

La fusion finale conserve le comportement et les détails utiles, mais donne à chaque règle une seule source canonique.

---

# I. Architecture historique des 15 modules

1. M01 FOUNDATION
2. M02 PLAYER
3. M03 SOCIAL
4. M04 WORLD
5. M05 SYSTEM
6. M06 PLAY
7. M07 GAME DISCOVERY ENGINE
8. M08 GAME A→Z FACTORY
9. M09 SHARED GAME ENGINE
10. M10 SOCIAL GAMING
11. M11 COMMUNITIES
12. M12 EVENTS
13. M13 ADAPTIVE WORLD
14. M14 COLLECTION / REWARD ECONOMY
15. M15 META SYSTEM + MORISE AI LAB

Cette architecture est la base canonique retenue pour la fusion parce qu'elle correspond à la documentation historique qui a regroupé les responsabilités après plusieurs itérations.

---

# II. Mécanismes CORE / SYSTEM

## 1. Core Orchestrator
Coordonne le contexte, les intentions, les capacités et les actions.

## 2. SYSTEM Orchestrator
Transforme les signaux des modules en expérience contextualisée.

## 3. Context Engine
Détermine où se trouve le Player, ce qu'il fait, ce qui est pertinent et ce que l'IA est autorisée à connaître.

## 4. Context Pack
Vue bornée du contexte utilisée pour une demande précise.

## 5. Intent Engine
Transforme une formulation utilisateur en intention structurée.

## 6. Reasoning Engine
Analyse les contraintes et les chemins de résolution.

## 7. Planner
Construit les étapes d'une tâche complexe.

## 8. Task Graph
Représentation persistante d'un travail multi-étapes.

## 9. Policy Engine
Autorisation, privacy, sécurité et autonomie.

## 10. Capability Registry
Décrit les capacités disponibles.

## 11. Capability Router
Choisit une capability adaptée à l'intention.

## 12. Provider Router
Choisit une ressource/provider compatible avec la capability.

## 13. Provider Registry
Catalogue les providers, leurs capacités et leur état.

## 14. AI Gateway
Point d'entrée unique entre les modules et les capacités IA.

## 15. Action Registry
Décrit les actions que l'IA peut réellement exécuter.

## 16. Validation Engine
Vérifie les sorties avant leur effet métier.

## 17. Fallback Engine
Permet de continuer sans une dépendance facultative.

## 18. Observability Engine
Corrélation request → task → execution → result.

---

# III. Mémoire / apprentissage

## 19. Session Memory
Mémoire temporaire d'une tâche/session.

## 20. Player Memory
Préférences et expériences autorisées du Player.

## 21. Experience Memory
Expériences validées réutilisables.

## 22. World Memory
Mémoire collective validée du monde MORISE.

## 23. Community Memory
Connaissances pertinentes liées aux communautés, sous permissions.

## 24. Creator Memory
Historique utile aux créations d'un créateur.

## 25. System Observation Memory
Observations du fonctionnement du système.

## 26. Memory Provenance
Source et justification d'une mémoire.

## 27. Memory Retention
Durée de conservation.

## 28. Memory Scope
Limitation du domaine de validité d'une entrée.

## 29. Memory Permission
Contrôle de qui peut lire/utiliser une mémoire.

## 30. Task → Experience Learning Loop
Chaque tâche peut produire une expérience validée.

## 31. Feedback Loop
Feedback utilisateur et système → évaluation.

## 32. Learning Candidate
Hypothèse d'amélioration avant intégration.

## 33. Pattern Detection
Détection de tendances utiles dans les signaux autorisés.

## 34. Failure Analysis
Analyse des échecs reproductibles.

## 35. Improvement Hypothesis
Hypothèse structurée sur la manière d'améliorer une capacité.

---

# IV. Évolution de l'IA

## 36. Evolution Engine
Couche d'évolution contrôlée.

## 37. Capability Gap Detection
Détection d'une capacité manquante.

## 38. Self-Evaluation
Évaluation de la performance du système.

## 39. Code Generation for AI Mechanisms
Génération de code pour de nouveaux mécanismes MORISE.

## 40. Code Refactoring
Amélioration du code existant.

## 41. Algorithm Candidate
Nouvel algorithme expérimenté.

## 42. Experimental Branch
Version expérimentale isolée.

## 43. Sandbox
Environnement d'essai sans privilèges de production.

## 44. Benchmark
Comparaison avec une baseline.

## 45. Regression Evaluation
Vérification qu'une amélioration n'a pas dégradé une capacité existante.

## 46. Security Gate
Contrôle avant promotion.

## 47. Canary
Activation limitée avant généralisation.

## 48. Promotion
Passage vers la version active.

## 49. Rollback
Retour vers la dernière version saine.

## 50. MORISE AI Lab
Zone d'expérimentation native de MORISE AI.

---

# V. Fonctionnalités signature MORISE

## 51. Living Objects
Créations persistantes évoluant par contributions et transformations.

Cycle :
IDEA → STORY → GAME → CHALLENGE → COMMUNITY → EVENT → BRANCH.

## 52. Living Object DNA / Lineage
Conserve l'origine, l'historique, les versions, branches et contributions.

## 53. Living Object Branching
Une création peut donner plusieurs variantes.

## 54. Living Object Transformation
Un même objet peut changer de type sans perdre son histoire.

## 55. Living Object Contribution Loop
CREATE → INVITE → CONTRIBUTE → TRANSFORM → BRANCH → SHARE.

## 56. Evolution Engine
Adapte l'expérience individuelle.

## 57. Trace
Historique des actions significatives.

## 58. Living World
Micro-monde personnel évoluant selon les expériences.

## 59. Hidden Possibilities
Possibilités qui deviennent découvrables via des combinaisons d'actions légitimes.

## 60. Unexplored Paths
Expériences pertinentes encore non explorées.

## 61. Evolving Identity
Identité dynamique basée sur des comportements démontrés.

## 62. MORISE Double
Représentation non humaine du parcours MORISE, pas une copie de la personne.

## 63. Fun & Surprise
Couche de surprises contextuelles, mystères, rare events, moments humoristiques et découvertes.

## 64. MORISE DNA
Profil de capacités démontrées, pas de personnalité psychologique.

Dimensions historiques :
Exploration, Creation, Resolution, Strategy, Collection, Collaboration, Discovery, Experimentation.

## 65. Convergence
Détection de trajectoires indépendantes qui commencent à converger.

## 66. Convergence Space
Espace temporaire permettant de tester/combiner des contributions compatibles.

## 67. Emergence Event
Événement produit lorsqu'une convergence validée mérite d'être exposée.

## 68. Missions From Reality
Transformation de problèmes récurrents observés en expériences/expériences de résolution.

## 69. World Memory
Mémoire collective issue de découvertes validées.

## 70. Collective Intelligence Loop
PLAYER → EXPERIENCE → ACTION/CREATION → AI → SPECIALISTS → CONVERGENCE → VALIDATED SOLUTION → WORLD MEMORY → FUTURE PLAYER.

---

# VI. Social / communication

## 71. Feed
Flux social.

## 72. Posts
Création/modification/suppression de publications.

## 73. Comments
Discussion structurée.

## 74. Reactions
Réactions contrôlées.

## 75. Follow/Unfollow
Relations sociales explicites.

## 76. Sharing
Partage de contenu et de créations.

## 77. Private Messaging
Conversations individuelles.

## 78. Private Conversation Context
Contexte limité à une conversation autorisée.

## 79. Contextual Translation
Traduction dans le contexte d'une conversation/post.

## 80. Social Agent
Agent spécialisé dans le contexte social.

## 81. People Ranking
Classement pertinent des connexions potentielles.

## 82. Social Discovery
Découverte de personnes et activités compatibles.

---

# VII. Communities / GUILDS

## 83. User-created Community
Un Player peut créer sa propre communauté.

## 84. Ownership
Le créateur devient propriétaire.

## 85. Admin/Moderator Roles
Rôles structurés.

## 86. Membership
Adhésion/quittement.

## 87. Invitation
Invitation explicite.

## 88. Community Feed
Contenu propre à la communauté.

## 89. Community Events
Activités de communauté.

## 90. Community Games
Jeux/challenges liés à la communauté.

## 91. Community Agent
Agent d'assistance communautaire.

## 92. Guild Candidate Detection
Détection de communautés potentielles.

## 93. Adaptive Guild Proposal
Proposition de communauté issue de signaux non sensibles.

Important : la conception historique précise que le SYSTEM propose et attend l'action requise avant de créer une communauté persistante à partir d'une inférence.

## 94. Guild Description Generation
Aide IA à la description.

---

# VIII. Discovery / recommandations

## 95. Content Ranking
Classement de contenu.

## 96. People Ranking
Classement social.

## 97. Game Recommendation Ranking
Classement des jeux.

## 98. Activity Recommendation
Activités pertinentes.

## 99. Event Recommendation
Événements pertinents.

## 100. Game Discovery Engine
Moteur de découverte spécialisé.

## 101. Market Research
Recherche de demande et tendances.

## 102. Opportunity Detection
Détection d'opportunités de jeux/expériences.

## 103. Diversity
Évite le feed fermé.

## 104. Freshness
Valorise les nouveautés.

## 105. Relevance
Pertinence contextuelle.

---

# IX. Game Creation

## 106. Game Concept Ideation
Idée de jeu.

## 107. Intent Parser
Transformation de l'idée en intention de création.

## 108. Game Designer AI
Conçoit la structure.

## 109. Game Specification
Contrat complet de jeu.

## 110. Engine Selection
Choix du moteur contrôlé.

## 111. Rule Generation
Règles de gameplay.

## 112. Content Generation
Niveaux, dialogues, quêtes, contenu.

## 113. Asset Requests
Demandes d'assets.

## 114. Game Validator
Validation de la spécification et du build.

## 115. Game Simulation
Simulation avant publication.

## 116. Game Testing
Tests automatisés et navigateur.

## 117. Game Versioning
Versions.

## 118. Game Preview
Prévisualisation.

## 119. Game Publication
Publication privée ou publique.

## 120. Game Runtime Separation
Le moteur d'exécution est distinct du Factory.

---

# X. Moteurs 2D

## 121. Adventure 2D
Exploration, cartes, PNJ, dialogues, quêtes, inventaire, objets, événements.

## 122. Battle 2D
Combat, compétences, statistiques, ennemis, progression, loot.

## 123. Puzzle 2D
Énigmes, logique, objets interactifs, chronomètre, score.

## 124. 3D Adapter
Support prévu pour des moteurs 3D approuvés.

---

# XI. Shared Game Engine

## 125. Scene
## 126. Entity
## 127. Input
## 128. Camera
## 129. Physics
## 130. Collision
## 131. Quest
## 132. Dialogue
## 133. Inventory
## 134. Save
## 135. Audio
## 136. Game UI
## 137. Multiplayer Adapter
## 138. Runtime Telemetry
## 139. Game Manifest
## 140. Resource Quotas
## 141. Deterministic Simulation

---

# XII. Social Gaming

## 142. Result Sharing
## 143. Challenges
## 144. Invitations
## 145. Rematches
## 146. Community Challenges
## 147. Cooperative Play
## 148. Asynchronous Competition
## 149. Shared Living Object Gaming
## 150. Convergence Game Experiments

---

# XIII. Events

## 151. Solo Events
## 152. Collective Events
## 153. Activities
## 154. Challenges
## 155. Competitions
## 156. Community Events
## 157. Event Generation
## 158. Event Scheduling
## 159. Event Personalization
## 160. Event Lifecycle
## 161. Emergence Events

---

# XIV. Adaptive World

## 162. Observe → Detect Pattern → Propose Change → Simulate → Validate → Apply
## 163. Route Changes
## 164. Object State Changes
## 165. Event Availability Changes
## 166. Challenge Variants
## 167. Music Layers
## 168. Encounters
## 169. Generated Experiences
## 170. Candidate World Changes
## 171. Versioned World Changes
## 172. World Memory Links
## 173. Global Change Canary
## 174. Global Change Rollback

---

# XV. Collection / Reward Economy

## 175. Collection
## 176. Original Cards/Items
## 177. Titles
## 178. Badges
## 179. Rewards
## 180. Rarity
## 181. Provenance
## 182. Reward Eligibility
## 183. Reward Pipeline
## 184. Reward Anomaly Detection
## 185. Roulette
## 186. Economy Analytics

Le système de récompenses reste serveur-authoritative. L'IA peut analyser/suggérer, mais M14 historique de collection et progression conserve l'autorité métier.

---

# XVI. Translation

## 187. Language Detection
## 188. Contextual Translation
## 189. Browser/on-device First
## 190. Translation Cache
## 191. Local/Server Fallback
## 192. Provider Translation
## 193. Protected Terms / Names / IDs

---

# XVII. Creative Media

## 194. Text
## 195. Image
## 196. Video
## 197. Audio
## 198. Music
## 199. TTS
## 200. STT
## 201. Vision
## 202. Comic/BD
## 203. Embeddings
## 204. Search
## 205. Moderation

Pipeline historique :
INTENTION → CREATIVE BRIEF → ORIGINALITY → PROVIDER → PROVENANCE/LICENCE → MODERATION → STORAGE → PUBLICATION.

---

# XVIII. Providers et infrastructure IA

## 206. Provider Adapter
## 207. Anonymous/Free Provider
## 208. Client-side Provider
## 209. API-key Provider
## 210. Paid Provider optionnel
## 211. Provider Health
## 212. Provider Capability Mapping
## 213. Provider Fallback
## 214. Cache / Local Fallback
## 215. Unavailable State

Noms explicitement retrouvés dans les anciennes spécifications/registre :
Gemini, Pollinations, Puter, OpenRouter, Cloudflare Workers AI, Replicate, Firecrawl.

Les noms montrés plus récemment par le Player comme candidats supplémentaires (LLM7, Vireonix, Murakumo, Kilo AI, AI Horde, AI Horde OpenAI API, Cehpoint AI, OVH AI Endpoints, Quillly, Openverse, Internet Archive) sont des entrées à vérifier/valider dans le Provider Registry, pas des preuves que ces fournisseurs existaient déjà dans les premiers plans.

---

# XIX. Local / distributed compute

## 216. Zero-API AI
## 217. On-device AI
## 218. Browser AI
## 219. Local Media
## 220. Adaptive Device Tier
## 221. Trusted Worker
## 222. Community Worker
## 223. Worker Registry
## 224. Worker Capability Manifest
## 225. CPU Quota
## 226. RAM Quota
## 227. GPU Capability
## 228. Task Lease
## 229. Heartbeat
## 230. Worker Revocation
## 231. Scheduler
## 232. Backpressure
## 233. Worker Recovery
## 234. Sandbox

Les machines fournissent des ressources de calcul distribuées ; elles ne fusionnent pas leurs RAM comme une mémoire commune.

---

# XX. Observability

## 235. PostHog
## 236. Product Events
## 237. AI Decision Logging
## 238. Trace Correlation
## 239. Provider Metrics
## 240. Task Metrics
## 241. Worker Metrics
## 242. Cost Metrics
## 243. Latency Metrics
## 244. Error Diagnostics

PostHog est explicitement une couche d'observation/analyse, pas le cerveau ni la mémoire profonde de MORISE.

---

# XXI. Sécurité / intégrité IA

## 245. RLS
## 246. Server-side Authorization
## 247. Private Message Isolation
## 248. Prompt Injection Defense
## 249. Tool Allowlisting
## 250. Secret Isolation
## 251. Sandbox Escape Defense
## 252. Generated Code Isolation
## 253. Rate Limiting
## 254. Anti-Spam
## 255. Anti-Abuse
## 256. Data Poisoning Protection
## 257. Provenance
## 258. Audit
## 259. Rollback
## 260. High-impact Confirmation

---

# XXII. Principles transversaux hérités de l'historique

1. Beaucoup de mécanismes internes ne deviennent pas des boutons.
2. Environ 5–6 portes principales suffisent à l'utilisateur.
3. Le SYSTEM coordonne les capacités internes.
4. Le produit doit rester utilisable sans IA externe pour les workflows essentiels.
5. L'IA ne constitue jamais seule une autorité de sécurité.
6. Une API n'est pas le cerveau de MORISE.
7. Une sortie de provider est une donnée non fiable jusqu'à validation.
8. Une amélioration du code doit être mesurée contre une baseline.
9. L'évolution IA se fait dans l'AI Lab avant production.
10. Les fonctions critiques sont déterministes et server-authoritative.
11. Private messages ne deviennent pas automatiquement une source d'apprentissage.
12. Living Objects, Evolution Engine, DNA, Convergence, Missions From Reality et World Memory sont des mécanismes internes/transversaux, pas de nouvelles portes UI.
13. Les interfaces doivent révéler progressivement la complexité.
14. SOLO reste valable ; le social ne doit pas être obligatoire.
15. Le système doit rester généraliste et ne pas enfermer le Player dans une niche.
16. Les fournisseurs sont interchangeables.
17. Les ressources CPU/RAM/GPU sont des contraintes réelles.
18. Le calcul distribué doit rester sandboxé.
19. Tout système d'évolution doit pouvoir être rejeté et annulé.
20. Les créations multimédias doivent conserver provenance et règles d'originalité/licence.
21. Une fonctionnalité n'est pas couverte parce que son nom existe ; son mécanisme complet doit être documenté.

---

# XXIII. Statut historique

Les mécanismes ci-dessus sont classés en trois groupes lors de la fusion :

### CONSERVER
Le comportement fait partie de la vision canonique.

### FUSIONNER
Le mécanisme reste, mais son nom historique devient un sous-mécanisme d'un module existant.

### ARCHIVER
Le document ou nom ne correspond plus à la responsabilité actuelle, mais son contenu utile a été absorbé.

Aucun ancien document supprimé n'est considéré comme perdu : son contenu utile doit être récupéré ou justifié comme non retenu.

---

# XXIV. Règle de fusion finale

La liste historique ne devient pas l'interface.

La cible finale est :

**15 modules canoniques + centaines de mécanismes internes + 5–6 grandes portes utilisateur + un SYSTEM capable d'orchestrer le reste.**
