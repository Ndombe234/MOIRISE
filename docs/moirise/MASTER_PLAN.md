# MOIRISE — PLAN MAÎTRE CANONIQUE — RÉFÉRENCE UNIQUE

## 1. Produit
MOIRISE est un réseau social général, ludique et créatif dont le SYSTEM constitue le langage d'interaction central. Il est conçu pour accueillir des centres d'intérêt, communautés et usages variés sans imposer une identité thématique. Le produit garde peu de portes principales, mais chaque porte expose une profondeur importante au bon moment. SOLO reste utile; COLLECTIVE est utilisé lorsqu'il apporte une vraie valeur.

## 2. Portes principales
SYSTEM, PLAYER, SOCIAL, WORLD, PLAY, CREATE. Une capability interne n'ajoute pas automatiquement un bouton global.

## 3. Architecture active
1. M01 Foundation
2. M02 Player
3. M03 Social + Private Messaging
4. M04 World
5. M05 System / Progression / Evolution
6. M06 Play
7. M07 Game Discovery
8. M08 Game A→Z Factory
9. M09 Shared Game Engine
10. M10 Social Gaming
11. M11 Communities / Guilds
12. M12 Events
13. M13 Adaptive World
14. M14 Collection / Reward Economy
15. M15 Meta System + MORISE AI Lab

## 4. Source canonique par module
Pour chaque module, PLAN.md est la source comportementale détaillée et TECHNICAL_DESIGN.md est la source technique. Les fichiers transversaux décrivent uniquement les contrats communs et renvoient à ces owners au lieu de recopier leur logique métier.

## 5. Règle de granularité « France → porte »
Une phrase générale n'est jamais considérée comme une spécification complète lorsqu'une décision d'implémentation reste à deviner. La décomposition obligatoire est :
acteur → déclencheur → préconditions → entrées → ordre exact → mutation → projection → événements → erreurs → récupération → sécurité → données → tests → DONE.
La même précision doit être appliquée aux sous-étapes : par exemple, pour une création de groupe, la documentation descend de « créer un groupe » à identité serveur → champs exacts → visibilité → validation → transaction → membership OWNER → événement → projection → rollback.

## 6. Règles de ownership
- M01 : runtime/shell/auth/routing/capability boundary/events.
- M02 : identité Player/profil/préférences/privacy.
- M03 : social + privé + média social publié.
- M04 : surface World/handoffs.
- M05 : progression/SYSTEM visible et orchestration de la présentation contextuelle.
- M06 : sessions Play/résultats autoritatifs.
- M07 : discovery/ranking/recommandations pour jeux et contenus découvrables.
- M08 : factory A→Z.
- M09 : runtime game/sandbox.
- M10 : challenges sociaux.
- M11 : memberships/roles/communities.
- M12 : états futurs réels/events.
- M13 : adaptive/convergence/memory retrieval.
- M14 : collection/reward ledger/roulette.
- M15 : AI brain/router/workers/memory AI/AI Lab/creative orchestration.

## 7. Mécanismes transversaux
Living Objects, Evolution Engine, Fun & Surprise, MORISE DNA, Convergence, Missions From Reality, World Memory, Social/Community/Game Discovery Intelligence, Creative AI, Translation Intelligence, Safety/Moderation, Provider Router, Resource Scheduler et Distributed Workers restent des mécanismes avec un owner explicite. Aucun mécanisme ne crée un 16e module.

## 8. Games
2D et 3D sont premiers citoyens. M08 suit research → idea → spec → task graph → engine → code/assets/content → security → build → simulation → tests → playtest → balance → preview → publish. M09 isole l'exécution. Un résultat de jeu passe toujours par validation serveur.

## 9. IA native
M15 exécute : OBSERVE → AUTH/POLICY → CONTEXT → UNDERSTAND → PLAN → RESERVE → EXECUTE → VALIDATE → CORRECT/ASK → COMMIT → EXPERIENCE → EVALUATE.
Ordre de routing : local/on-device → cache → Trusted Worker → Community Worker opt-in → provider vérifié gratuit/client-side → provider avec clé → paid explicitement activé → degraded.
Un provider est un instrument, pas le cerveau.

## 10. Auto-évolution
Limitation observée → gap → root cause → hypothesis → candidate change → static → sandbox → tests → benchmark → security/policy → canary → promote/reject → monitor → rollback → experience.
AI Lab n'a pas de secrets production ni de superuser.

## 11. Compute distribué
Trusted Worker = machine explicitement autorisée. Community Worker = opt-in. Défaut Community : 1 logical CPU, 512 MiB RAM, GPU/storage désactivés, réseau borné. Ce sont des workers de calcul, pas de la RAM partagée.

## 12. Intégrité produit
Pas de faux utilisateurs, faux compteurs, faux scores, fausse rareté ou fausse urgence. Un rappel futur n'existe que s'il correspond à un vrai état M12 ou à une autre source future confirmée.

## 13. Documentation « reprise à zéro »
Les anciens docs ne sont plus des sources concurrentes. Une règle historique conservée est classée via l'inventaire/matrice puis pointée vers son owner actuel. Si deux documents tentent de définir la même règle, l'owner canonique gagne et le doublon est supprimé ou remplacé par une référence.

## 14. Creative Media + Virality contract
The canonical cross-module product plan is `docs/moirise/CREATIVE_MEDIA_VIRALITY_PLAN.md` and the canonical technical contract is `docs/moirise/CREATIVE_MEDIA_VIRALITY_TECHNICAL_DESIGN.md`.

These contracts add no module and no global navigation button. They define the shared behavior for photo/video/audio/music, Stories, Reels, profile media, repost/remix, user-media analysis, originality/provenance, intelligent sharing, friend/interest projections and viral-loop instrumentation.

Ownership remains distributed: M02 owns identity/profile/avatar; M03 owns social publishing/private media; M05 owns SYSTEM presentation/progression; M07 owns discovery/ranking; M10 owns social challenges; M11 owns communities/membership; M12 owns event state; M13 owns adaptive memory/convergence; M14 owns rewards; M15 owns AI orchestration and creative generation.

## 15. Media originality rule
Changing a few words, characters, pitch values or file properties is never treated as a copyright-avoidance mechanism. For third-party media, MORISE extracts permitted high-level semantics, creates a materially new creative brief, generates a new artifact, performs provenance/originality/safety validation and keeps attribution/permission state. User-owned or explicitly licensed media can be transformed according to its permissions.

## 16. Social primitives without navigation explosion
Photos, Reels, Stories, music, groups, private messages, profile media, reposts, remix, collections and challenges are capabilities inside the six main doors. The SYSTEM reveals only the next relevant action. A capability never creates a new global button by itself.

## 17. Viral product principle
MOIRISE optimizes for a truthful loop:
DISCOVERY → PARTICIPATION → CREATION/PLAY → MEANINGFUL SHARE → NEW DISCOVERY.
No fake users, fake counters, fake scarcity, fake urgency or artificial social proof.

## 18. Universal Gate
PLAN → TECHNICAL DESIGN → code/migrations → auth/security → tests → desktop/mobile browser → resilience → production evidence → DONE.


# D10 — EXPANSION CANONIQUE — SOCIAL MEDIA + CRÉATION + VIRALITÉ — 2026-10-02

## 15. Principe d'évolution produit
MOIRISE ne concurrence pas les grandes plateformes par addition de boutons. Il combine leurs primitives les plus utiles dans une boucle unique : découvrir → ressentir → interagir → créer → transformer → jouer → rejoindre → partager → revenir. Les portes globales restent SYSTEM, PLAYER, SOCIAL, WORLD, PLAY et CREATE. Aucune nouvelle capability sociale ou média ne crée une porte globale.

## 16. Médias comme Living Objects
Image, photo, vidéo, Reel, Story, audio et musique sont des objets versionnés avec owner, provenance, visibilité, privacyClass, moderationState, lifecycle, derivationGraph, usagePolicy, createdAt, updatedAt et deletion/retention policy. Une dérivation est une nouvelle création avec une nouvelle identité ; elle ne remplace pas silencieusement la source.

## 17. Creative Transformation Loop
Pour tout média utilisateur explicitement autorisé à être analysé :
DISCOVER_SOURCE → AUTHORIZE_USE → PRIVACY_FILTER → CONTENT_ANALYSIS → CONCEPT_ABSTRACTION → PROTECTED_ELEMENT_DETECTION → CREATIVE_BRIEF → GENERATION → ORIGINALITY/SAFETY/QUALITY_VALIDATION → OWNER_REVIEW_WHEN_REQUIRED → PUBLISH_OR_SAVE.
Le système ne transforme pas une œuvre protégée en simple paraphrase mécanique. Il vise une nouvelle expression à partir de concepts autorisés et de contributions créatives significatives.

## 18. Social surfaces minimales
SOCIAL expose une projection adaptative pouvant regrouper Feed, Reels, Stories, Photos, Friends, Groups, Conversations, reposts, saves et discovery sans afficher simultanément toutes les surfaces. Le SYSTEM choisit le prochain contexte en fonction de l'intention et du contexte, sans masquer les commandes essentielles.

## 19. Viral loop contractuelle
Une fonctionnalité sociale n'est considérée complète que si elle définit :
1. valeur immédiate pour l'auteur ;
2. raison concrète pour un tiers de regarder ;
3. action de réponse/remix/jeu ou conversation ;
4. mécanisme de retour ;
5. découverte hors du cercle initial lorsque la visibilité l'autorise ;
6. anti-spam et anti-manipulation.
Aucune mesure de succès n'est inventée et aucun compteur n'est simulé.

## 20. Cold-start
Un nouveau Player reçoit un environnement non vide uniquement avec du contenu réellement disponible. La personnalisation initiale combine choix explicites très courts, signaux de session, découverte multi-thèmes et nouveautés. Aucun faux ami, faux follower, faux groupe ou faux compteur n'est créé.

## 21. Global media learning boundary
MORISE peut apprendre des patrons de fabrication à partir de médias utilisateur seulement selon la classe de consentement, la privacy et la provenance. Le contenu privé n'entre pas dans la mémoire globale par défaut. Les sorties générées à partir d'une source restent liées à sourceRef et policyRef.

## 22. Market-informed principles
Les grandes plateformes convergent actuellement vers : davantage de contenu original, recommandations plus fraîches, surfaces sociales autour des amis, création assistée par IA et transparence sur le contenu synthétique. MOIRISE doit donc différencier son expérience par l'orchestration « découverte → transformation → création → jeu », pas par un simple clone de Reels/Stories.

## 23. Quality gate global
Aucune nouvelle capability média/sociale n'est DONE tant que les scénarios nominal, permissions, privacy, blocage, suppression, panne provider, réseau interrompu, mobile, desktop, accessibilité, observabilité et fallback déterministe ne sont pas testés.


## 24. Detail-level governance
Chaque demande « détaille » augmente d'un facteur 10 la précision d'ingénierie de tous les PLAN.md et TECHNICAL_DESIGN.md actifs, conformément à docs/moirise/DETAIL_LEVEL_GOVERNANCE.md. Le facteur concerne la couverture des contrats et cas limites, pas une inflation artificielle de texte.

## 25. Project-time governance
Chaque expansion de détail déclenche une révision de l'estimation de délai conformément à docs/moirise/PROJECT_TIME_MODEL.md. Le temps n'est jamais multiplié mécaniquement par 10 : il est recalculé selon les nouvelles tâches, dépendances, tests, intégration et automatisation disponibles.


## 26. Formal fabrication completeness
Le plan canonique comprend désormais 30 documents actifs de module : 15 PLAN.md + 15 TECHNICAL_DESIGN.md. Chaque paire doit converger vers le modèle D100K : comportement/propriétés dans PLAN, fabrication/contrats/preuves dans TECHNICAL_DESIGN, sans transfert d'autorité ni troisième source de vérité.

# RECOVERED FUNCTIONAL FUSION — HISTORICAL FEATURES RECONCILED — 2026-10-03

Historical MOIRISE documents contained additional product mechanics that were deleted during documentation consolidation. They are now explicitly preserved as canonical cross-module capabilities. Restoring a feature here does not restore an old document as an authority; current owner documents remain authoritative.

## First-session / First Contact
Canonical first-session experience: PLAYER ACTION -> CONSEQUENCE -> DISCOVERY -> NEW POSSIBILITY -> PLAYER CHOICE -> SYSTEM REACTION.

The approximately two-minute First Contact experience may use:
- 0:00–0:15 SYSTEM invitation and immediate meaningful choice;
- 0:15–1:00 small interactive micro-world/objective;
- 0:40–1:20 reaction or anomaly produced by a real permitted action;
- 1:00–1:40 bounded adaptive challenge;
- 1:40–2:00 reveal, temporary session descriptor and contextual continuation.
Historical wording examples are guidance, not immutable dialogue. First Contact must remain auditable, optional, reversible, privacy-safe and functional without AI through deterministic fallback.

## MORISE Moment / Relay / Living Stories
Preserved:
- MORISE Moment detection from real meaningful events;
- compact Moment artifacts and replay/reconstruction;
- optional share-to-experience handoff;
- MORISE Relay, where another Player performs one controlled transformation;
- Dynamic Stories derived from validated experience chains;
- Living Stories with lineage, branches and versions;
- attribution and provenance across Moment -> Relay -> Story -> new experience.
These remain contextual capabilities; none creates a new navigation door.

## Evolution and emergent experience
The Evolution Engine preserves Trace, Living World, Hidden Possibilities, Unexplored Paths, Evolving Identity, MORISE Double, Fun & Surprise and the MORISE Emergent Experience Engine.
Supported patterns include What If, You Missed Something, Hidden Rule, Play Against Your Trace, Worlds That Remember, One Problem/Many Approaches, Mutation, Role Inversion, Mystery Investigation, AI Fallibility, Player Laboratory, Emergent Experience and MORISE Dream/Hypothesis Synthesis.

## Experience Economy
Preserved mechanics:
- Day-1 solo value;
- contextual or daily Moment;
- personal evolving world;
- SYSTEM companion continuity;
- leaving traces for future Players;
- Remix-me;
- Creator DNA and creative lineage;
- creation-to-world progression;
- collaborative media/music chains;
- discovery broadcasts;
- Living Museum;
- creator capability progression;
- creator economic bridge;
- Proof of Impossible / beat-my-result challenges;
- low-population World Events;
- return-after-absence experiences;
- meaningful optional sharing.

## Creator Economy and owner operations
Preserved historical capabilities:
- AI-orchestrated creator eligibility;
- progressive creator activation thresholds;
- eligibility stages;
- creator contribution chains;
- economic capability activation;
- anti-manipulation and fraud review;
- free-first growth;
- controlled monetization activation;
- high-threshold owner/admin alerts;
- Owner/Admin Control Center;
- administrative hierarchy and permissions;
- audited operational control.
These are permissioned operational/creator surfaces and do not create public global navigation doors.

## Native creation, tooling and agents
Preserved:
- MORISE Creation Runtime;
- MORISE Creation Tools;
- scoped World Agents;
- code generation, inspection, modification and refactoring tools;
- 2D/3D scene and world construction;
- asset, character, animation, material, lighting and camera tooling;
- input, collision, physics, gameplay and state tooling;
- build, execution, diagnostics, testing, correction and optimization tooling;
- bounded agents for playtest, simulation, balance, exploration and validation.

## On-device and infrastructure-light AI
Preserved:
- browser/on-device inference when eligible;
- device capability detection;
- adaptive execution tiers;
- controlled burst use of underused device resources;
- local model lifecycle;
- device-aware media routing;
- cache, local and degraded fallbacks;
- offline deterministic experiences;
- resource and UX safeguards.
External providers remain optional instruments.

## Internationalization and local translation
Preserved:
- 20 canonical locales;
- complete UI/content translation contracts;
- RTL and locale formatting;
- browser/on-device-first translation;
- deferred owner-controlled translation node;
- private-message translation with privacy boundaries;
- locale fallback to English when necessary;
- no mandatory provider API key for core navigation.

## Infrastructure-light retention mechanics
Preserved:
- persistent world state;
- multi-solution puzzles;
- auditable anomalies;
- secret/discovery titles;
- hidden map areas;
- personal Memory Cards;
- deterministic no-AI Remix;
- asynchronous community challenges;
- MORISE Laboratory;
- distributed public secrets;
- collective legends/history;
- consequence-based branching;
- SYSTEM presentation styles;
- seasons;
- deterministic player construction;
- shareable Moment cards;
- Easter eggs;
- transparent rarity.
These capabilities reuse existing state, event, storage, runtime and module owners. New experience does not imply new infrastructure.

## Canonical owner rule
Recovered features are distributed to existing owners: M03 social/media/Moment/Relay publication; M04 World presentation and discovery handoffs; M05 SYSTEM presentation, First Contact and progression/evolution presentation; M06 play/result experiences; M07 discovery/ranking; M08 creation factory; M09 runtime; M10 social challenges; M11 communities; M12 temporal events/seasons; M13 adaptive world/convergence/memory retrieval; M14 rewards/collection/economic ledger; M15 AI orchestration, creation tools, World Agents, on-device/provider routing, creator eligibility analysis, collective intelligence and AI Lab; M01 security, auth and operational boundaries.
No historical file is reintroduced as a competing source of truth.


## RECOVERED FUNCTIONAL D100K COMPLETION — CONTEXT INTELLIGENCE
The recovered features now have a concrete transversal technical owner for context comprehension and memory:
docs/moirise/transversal/CONTEXT_MEMORY_TECHNICAL_DESIGN.md.

This contract is mandatory for all AI-capable modules. It solves the specific failure mode where an AI remembers only the last coarse answer instead of progressively enriching the underlying state.

Canonical pattern:
PARTIAL FACT → ENRICHMENT → RELATION → TEMPORAL/SENSITIVITY CLASSIFICATION → VALIDATED MEMORY → RETRIEVAL → CONTEXT-AWARE ACTION.

Location is a graph, not a single string. Profile facts, conversation facts, transient appearance/context and World state are separate domains. The AI never invents missing nodes, and corrections supersede previous values according to policy.

D100K completion therefore requires both feature-level technical design and this shared ContextPacket/Memory contract. Documentation completion is not implementation completion.

