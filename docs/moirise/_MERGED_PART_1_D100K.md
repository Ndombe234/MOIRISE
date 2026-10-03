# MOIRISE — FUSION D100K — PARTIE 1 : MASTER + PLANS

# SOURCE 1 — docs/moirise/MASTER_PLAN.md

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


## PLAN → TECHNICAL DESIGN traceability
`docs/moirise/PLAN_TO_TECHNICAL_MATRIX.md` est la matrice canonique de correspondance. Toute capacité historique fusionnée doit être couverte dans le PLAN du owner et dans son TECHNICAL_DESIGN, avec les contrats transversaux applicables.



# ENGINEERING GROWTH MODEL — FUSION HISTORIQUE CANONIQUE — 2026-10-03

La capacité de MOIRISE doit être conçue pour évoluer sur deux axes indépendants mais complémentaires :

1. **Évolution logicielle** : le code, les algorithmes, les skills, les validateurs, les stratégies de planification et les composants de fabrication peuvent évoluer via M15 AI Lab.
2. **Évolution de capacité d'exécution** : de nouvelles ressources CPU/RAM/GPU/VRAM peuvent être ajoutées via des runtimes/workers autorisés ; le scheduler exploite automatiquement la capacité réellement disponible.

La croissance du code ne crée pas physiquement de calcul. L'ajout de ressources n'est pas supposé produire une augmentation linéaire : réseau, synchronisation, sérialisation, contention GPU, dépendances et taille des tâches restent des limites mesurées.

## Growth loop

OBSERVE → GAP DETECTED → HYPOTHESIS → CANDIDATE → SANDBOX → TEST → BENCHMARK → POLICY/SECURITY → CANARY → PROMOTE/REJECT → MONITOR → ROLLBACK

En parallèle :

DISCOVER CAPACITY → REGISTER RESOURCE → AUTHENTICATE → CAPABILITY CHECK → QUOTA/RESOURCE POLICY → SCHEDULER → EXECUTE → VALIDATE → RELEASE/RETRY

## Canonical ownership

- M15 : AI Core, orchestration, capability/resource/provider routing, AI memory, learning, evolution, worker control plane.
- M08 : fabrication A→Z des jeux/expériences et graphes de tâches.
- M09 : exécution runtime, sandbox, allocation et isolation 2D/3D.
- M01/M02/M03/... : restent propriétaires de leurs états métier autoritatifs.

## Historical fusion rule

Les anciens documents AI/worker/resource/evolution sont désormais absorbés par les PLAN.md et TECHNICAL_DESIGN.md canoniques. Ils ne constituent plus des autorités séparées. Toute nouvelle évolution de ces mécanismes se fait dans le couple PLAN + TECHNICAL_DESIGN du owner concerné.



# D100K — RESTORED RETENTION / EXPERIENCE ECONOMY COVERAGE — 2026-10-03

The infrastructure-light retention mechanics found in historical documentation are canonical capabilities, not new modules.

## Ownership and exact mechanics

| Mechanic | Primary owner | Required behavior |
|---|---|---|
| World That Remembers | M04/M13 | Validated Player actions can alter versioned world state; the world never claims a change that was not persisted. |
| Evolving Puzzles | M06/M13 | A puzzle can expose multiple valid solution branches; branch state is deterministic/versioned and recoverable. |
| Hidden/Discoverable Map Areas | M04/M13 | Areas unlock only from real discovery conditions; no fabricated secret locations or fake unlock state. |
| No-AI Deterministic Remix | M13/M15 | Validated inputs can be remixed using deterministic rules when AI is unavailable; lineage remains intact. |
| Async Community Challenges | M10 | A challenge persists independently of simultaneous presence; target/result rules are explicit and auditable. |
| Distributed Community Secrets | M11/M13 | A secret can require contributions across Players; private data is never exposed merely to solve the collective secret. |
| Consequence Branching | M06/M13 | Real choices can lead to versioned consequences and reversible recovery where designed. |
| Personal/Shareable Memory Cards | M05/M03 | Cards derive from real events/creations and respect visibility/provenance. |
| Rare Objects | M14 | Rarity is explicit and auditable; no fake scarcity or fabricated acquisition history. |
| Personal Moment | M05 | A meaningful validated event can become a compact Moment artifact. |
| Leave Something for the Next Player | M05/M10 | Puzzle/object/message/sound/scene/challenge/rule contribution is persisted with attribution and policy. |
| Creation → World | M08/M04 | A validated creation may become a world object/scene without losing source lineage. |
| Community Music / Collaborative Media | M03/M11/M15 | Each contribution is versioned, attributable and permission-scoped. |
| One Problem / Many Approaches | M13 | Equivalent valid solution classes may be recognized without ranking human worth. |

## Infrastructure-light invariant
A new experience must reuse existing storage, event, artifact, runtime and memory infrastructure whenever possible. NEW EXPERIENCE ≠ NEW INFRASTRUCTURE.

## D100K proof
For every mechanic: source event → eligibility → state mutation → lineage → visibility → event → projection → recovery → no-AI fallback → tests → browser/mobile evidence.



# D100K — RESTORED INTERNATIONALIZATION / CAPABILITY ORCHESTRATION

## Canonical supported locale set
`fr,en,hi,es,de,it,pt,ar,ja,ko,ru,tr,id,th,vi,pl,nl,ro,bn,ur`.

Locale support is a product capability, not a new navigation area. Unsupported locale input falls back deterministically according to M01/M02 rules.

## Cross-domain orchestration
MORISE may compose mechanics from multiple domains internally — e.g. music + game + world + story + visual creation — without creating a new module or permanent button.

Canonical loop:
`INTENT → PLAN → CAPABILITY SELECTION → PARAMETERIZATION → EXECUTION → OBSERVATION → RESULT → ERROR/SUCCESS ANALYSIS → LESSON CANDIDATE → BENCHMARK → RETAIN/REVISE/REJECT`.

The learning target is orchestration strategy, not uncontrolled production self-rewriting.

---

# SOURCE 2 — docs/moirise/CREATIVE_MEDIA_VIRALITY_PLAN.md

# MOIRISE — CREATIVE MEDIA + SOCIAL VIRALITY PLAN — CANONICAL CROSS-MODULE CONTRACT

## 0. Purpose
This document adds the missing product layer for photos, short videos/Reels, Stories, music/audio, profile media and intelligent social discovery without creating a new global module or a new navigation button.

It is a cross-module contract. Business ownership remains with M02/M03/M05/M07/M10/M11/M12/M13/M14/M15 as defined by MASTER_PLAN.md.

## 1. Product objective
MOIRISE must provide the familiar social primitives users already understand:
- profile photo/avatar;
- posts with text/photo/video/audio;
- short vertical video/Reels;
- Stories/temporary moments;
- private messaging and media sharing;
- groups/communities;
- reactions/comments/shares/reposts;
- creator/profile surfaces;
- discovery/recommendations.

The differentiation is not the existence of these primitives. The differentiation is the SYSTEM layer that connects them into a single creative loop:

DISCOVER → REACT → CREATE → REMIX SAFELY → SHARE → PLAY → MEET → FORM GROUP → CREATE AGAIN → SYSTEM LEARNS.

## 2. Six visible doors remain unchanged
SYSTEM / PLAYER / SOCIAL / WORLD / PLAY / CREATE.

Reels, Stories, Photos, Music, Groups, Messages and AI creation are capabilities or surfaces inside these doors. They do not become separate top-level buttons.

## 3. Viral loop architecture
Every eligible public creation can expose a compact action surface:
- react;
- comment;
- share;
- save;
- repost/remix when permitted;
- message;
- challenge/create-from-this.

The SYSTEM chooses which secondary action is most relevant instead of displaying every possible action simultaneously.

Example:
A user watches an interest-based Reel → SYSTEM identifies an available creative action → “Transform this idea” → user creates a materially different image/video/song → publishes → original inspiration is credited when applicable → discovery can show both works → new viewers enter the loop.

## 4. Reels / short video
Reels are short-form vertical video experiences with:
- watch;
- pause/seek;
- like/react;
- comment;
- share to DM/group/story;
- repost with attribution;
- save;
- create-from-concept;
- follow creator;
- not interested;
- report.

Ranking signals must include watch choice, watch duration/completion, explicit feedback, shares, follows, freshness, novelty, diversity and safety. No single engagement signal is sufficient.

## 5. Stories
Stories are temporary media sequences with:
- text/photo/video/audio;
- replies;
- reactions;
- mention/tag;
- poll/question/challenge primitives where useful;
- music/audio attachment through licensed/authorized sources;
- close-friends/private audience;
- 24-hour default visibility window;
- optional archive for the owner;
- recap generation from eligible owner-owned media.

Stories must be fast to create and must not require navigating to a new module.

## 6. Intelligent Story engine
M15 may propose a Story from eligible user-owned media:
1. detect candidate moments;
2. group related media;
3. propose sequence;
4. propose caption/title/music mood;
5. produce a private preview;
6. user approves audience and publication;
7. M03 commits publication.

No automatic public publication from private camera/media without explicit user action and permission.

## 7. Profile media
M02 owns profile identity and avatar. A profile can expose:
- avatar/profile image;
- optional profile video/animated identity;
- creator highlights;
- selected public creations;
- collections/reposts where applicable;
- current SYSTEM status/progression projection only when public policy permits.

Profile media must remain lightweight; the profile is an identity surface, not another feed competing with SOCIAL.

## 8. Music/audio
MOIRISE supports:
- user-uploaded audio where the user has rights/permission;
- AI-generated music through approved capabilities;
- licensed/authorized catalogs when available;
- sound effects;
- audio attached to a Reel/Story/game/creation;
- audio discovery by mood/theme rather than copying a protected recording.

Music generation must never be specified as “change a few words/notes to avoid copyright.” It must generate a new work from permitted semantic/creative constraints and avoid reproducing protected expressive material.

## 9. User media as AI input
With explicit permission and within the user's rights, uploaded photos/videos/audio can be analyzed by MORISE AI to derive a non-expressive creative description:
- subjects/objects;
- composition;
- colors;
- lighting;
- camera movement;
- pacing;
- mood;
- broad genre;
- scene structure;
- audio characteristics;
- user-provided intent.

The system then creates a new creative brief rather than storing or reproducing the original expression as a generation target.

Pipeline:
USER MEDIA
→ permission/rights check
→ provenance record
→ modality analysis
→ semantic feature extraction
→ originality transformation
→ creative brief
→ generation
→ similarity/safety/provenance validation
→ private preview
→ user approval
→ publish.

## 10. Originality transformation
The transformation layer must separate:
- facts/concepts that can be reused;
- user-owned expressive elements that may be reused when authorized;
- third-party expressive elements that must not be reproduced;
- protected names/characters/logos/lyrics/melodies/recordings that require special handling.

Example: “banana” may remain a generic concept. Replacing “banana” with “anebane” is NOT itself an originality or copyright solution.

For third-party content, MORISE should produce a new concept-level brief such as:
“yellow tropical fruit on a bright table, playful poster composition, warm light”
without copying the source's exact image, text, melody, lyrics, recording, character design or other protected expression.

## 11. Provenance
Every creative artifact stores:
- sourceRefs;
- sourceOwnershipClass;
- userPermissionState;
- generationMethod;
- provider/tool refs;
- model/capability version;
- transformation class;
- validation status;
- publish decision;
- derivative relationship when applicable.

Private source media remains private unless the owner explicitly publishes it.

## 12. AI-generated content from user media
The AI can create:
- image from photo concept;
- new image series from a user's own photo;
- short video from a user's own image/storyboard;
- new song from user-provided permitted musical input or high-level mood/structure;
- trailer/teaser for a game;
- profile visual;
- Story recap;
- Reel concept;
- meme/template from eligible content.

Each generation must pass the central AI validation pipeline.

## 13. Safe remix
A remix is allowed only when the source's visibility/license/permission permits it.

A remix must declare:
- source;
- transformation type;
- creator attribution where required;
- new contribution;
- audience;
- downstream sharing policy.

Simple re-upload, speed change, border, caption-only or trivial alteration is not treated as a meaningful original transformation.

## 14. Intelligent repost
Repost is a distribution primitive, not a copy operation. It preserves the original creator reference and allows an optional user note.

The recommender may use a repost as a discovery signal, but must not erase original attribution.

## 15. Friend/interest layer
Inside SOCIAL, MORISE can create compact contextual shelves such as:
- “Tes amis aiment”;
- “Dans ton cercle”;
- “Nouveau pour toi”;
- “À transformer”;
- “À jouer ensemble”;
- “Ton groupe pourrait aimer”.

These are projections, not new modules.

## 16. Group formation
Users can create groups manually. M11 owns membership.

MORISE may propose or create a group only under an explicit bounded policy:
- detect a stable convergence/interest cluster;
- verify minimum evidence;
- generate a proposed purpose/name/topic;
- avoid sensitive inference;
- show the proposal or create automatically only if the user/community policy explicitly permits autonomous creation;
- assign creator/owner correctly;
- notify invited members;
- allow immediate leave/mute/delete/report.

No fake members or fake activity are ever created to make a group appear popular.

## 17. Three-layer virality model
MOIRISE should optimize for:

A. DISCOVERY — a stranger finds something relevant quickly.
B. PARTICIPATION — the stranger can react, transform, play or join with low friction.
C. INVITATION — the result naturally gives a reason to send it to another person.

The product must never fabricate scarcity, fake counters, fake popularity or fake social proof.

## 18. First-session conversion
The first session should expose multiple reasons to stay without dumping buttons on the user. The SYSTEM can progressively reveal:
- a personalized discovery;
- one quick creative action;
- one playable experience;
- one social connection opportunity;
- one collectible/progression opportunity;
- one “make this yours” action.

The exact sequence adapts to user actions, not to a fixed onboarding wall.

## 19. Anti-fatigue rule
Do not show a share prompt after every action.

A share invitation should be triggered only when there is a meaningful shareable outcome:
- creation completed;
- surprising game result;
- challenge completed;
- collectible unlocked;
- collaborative result;
- personalized discovery worth sending.

## 20. Virality health metrics
Measure:
- activation;
- first meaningful action;
- first creation;
- first share;
- invite acceptance;
- D1/D7/D30 retention;
- session depth;
- content completion;
- creator-to-viewer conversion;
- viewer-to-creator conversion;
- share-to-open conversion;
- group formation and survival;
- recommendation diversity;
- negative feedback;
- hide/not-interested rate;
- report rate;
- originality/reuse rate.

No metric may be manufactured.

## 21. What makes MOIRISE different
The product is not differentiated by having “a feed + Stories + Reels.” Large social platforms already have those primitives. Current Meta products explicitly combine Reels, Stories, DMs, reposts, friend activity, AI translation and AI creation. YouTube and TikTok also use personalized recommendation loops based on viewing/interaction signals.

MOIRISE's intended differentiation is the integrated SYSTEM:
- social identity;
- interest discovery;
- games created by the platform;
- AI-assisted creation;
- adaptive world;
- community formation;
- progression;
- collection/rewards;
- user media → new creative artifacts;
- validated memory of successful creation patterns;
- all coordinated through a small number of visible doors.

The user should feel that the site is not “another social app with cosmetic theming,” but a social world whose SYSTEM actively connects social, creative and playable experiences.

## 22. Anti-differentiation risks
The following reduce differentiation/retention and must be controlled:
- too many buttons;
- generic feed with anime colors only;
- AI everywhere without useful outcomes;
- repetitive generated media;
- recommendation bubbles with no explanation/control;
- fake virality;
- copied/copyright-risk content;
- groups created with no real social reason;
- games disconnected from social activity;
- slow media creation;
- empty new-user experience;
- excessive notifications;
- personalization that feels invasive;
- provider outages breaking core social functionality.

## 23. DONE
The cross-module social/creative layer is DONE only when:
- Reels/short video work;
- Stories work;
- profile media works;
- photo/video/audio publishing works;
- user media analysis is permissioned;
- generation produces new creative briefs rather than copy instructions;
- provenance exists;
- remix/repost attribution exists;
- discovery learns from valid feedback;
- groups work manually and AI proposals respect M11;
- share loops are meaningful rather than spammy;
- no new top-level navigation button was introduced;
- desktop/mobile and degraded states are tested.


# D10 — EXPANSION — BOUCLE DE VALEUR ET DE DÉCOUVERTE

## 12. Core loop
Le produit optimise une boucle de valeur, pas un compteur d'engagement :
SEE → UNDERSTAND → FEEL → ACT → CREATE/PLAY → SHARE/INVITE → DISCOVER_NEW_VALUE → RETURN.

## 13. User value classes
V1 spectacle ; V2 expression ; V3 découverte ; V4 relation ; V5 jeu ; V6 progression ; V7 création assistée ; V8 appartenance. Chaque surface sociale doit fournir au moins une valeur primaire et une action secondaire cohérente.

## 14. Reels
Reel = clip public ou autorisé + metadata + caption + audio provenance + safety + derivativeGraph + ranking eligibility. Les remixes doivent documenter la source et apporter une transformation significative ou une contribution nouvelle.

## 15. Stories
Story = segment éphémère versionné. Les éléments peuvent être image, vidéo, texte, audio, interaction et réponse. Audience et expiration sont décidées au niveau de la Story, pas au niveau du moteur de recommendation.

## 16. Photo/profile
Le profil doit devenir une vitrine dynamique de l'identité et des créations sélectionnées, sans remplacer le feed. Une photo de profil peut être générée ou transformée par MORISE uniquement après validation/usage autorisé.

## 17. Music
Musique utilisateur = objet analysable si autorisé. Une nouvelle musique générée à partir d'une source doit partir d'un concept/structure/features abstraits et non d'une reproduction servile.

## 18. Viral loops
L1 private-to-friend : share → DM → return.
L2 public-to-friend : share → profile → follow.
L3 media-to-create : view → create from concept → publish.
L4 media-to-game : view → play → share result.
L5 group-to-world : group action → event/world projection.
L6 creator-to-community : repeated creation → community formation proposal.
L7 cross-language : publish → translation/dubbing → new audience.

## 19. Cold-start activation
Dans les premières minutes, le système propose un mix réellement disponible :
- un spectacle immédiat ;
- une action créative en moins de quelques étapes ;
- une découverte personnalisée ;
- un jeu court ;
- une possibilité de suivre/rejoindre/interagir.
Aucun faux signal social n'est utilisé.

## 20. Viral quality gates
Before publish-to-discovery:
originality/status, safety, visibility, media integrity, provenance, spam risk, feedback eligibility, device compatibility.
Before share:
recipient eligibility, privacy, revoked-source check, share-token generation.

## 21. Anti-virality failures
La boucle doit casser proprement si le contenu est privé, supprimé, bloqué, signalé, expiré ou non validé. Elle ne doit pas conserver une URL publique orpheline.

## 22. Measurement
Mesures principales : activation, successful creation, meaningful share, invitation acceptance, repeat creation, return within defined cohort window, content diversity, creator retention, safety incidents. Ne pas optimiser sur un seul chiffre.


# D100K — RESTORED HISTORICAL SHARING PRINCIPLE

Sharing is a truthful consequence of something the Player actually did, found, created, remixed or achieved. It is not an advertisement disguised as a share.

A shareable artifact must answer: source event/artifact, owner, visibility, reason to view, permitted response/remix/play action, lineage and return path. No fake social proof, fake counters, fake participants or artificial scarcity.

D100K: share revoked after source deletion, private media leakage, duplicate derivative, blocked recipient, no-source artifact and mobile share/deep-link recovery.

---

# SOURCE 3 — docs/moirise/ai/AI_MASTER_PLAN.md

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

## 15.0 — INVARIANT ABSOLU : MORISE AI CORE EST ZERO-DEPENDENCY PROVIDER

**MORISE AI CORE MUST NEVER REQUIRE AN EXTERNAL AI API, API KEY, PROVIDER, REMOTE INFERENCE ENDPOINT, OAUTH TOKEN OR THIRD-PARTY AI SERVICE TO EXIST OR TO PERFORM ITS CORE INTELLIGENCE.**

This is stronger than “provider optional”.

The following must remain true:

- no API key configured → MORISE AI Core remains operational;
- no external provider configured → MORISE AI Core remains operational;
- all external AI providers unavailable → MORISE AI Core remains operational;
- network unavailable → offline-capable core capabilities remain operational;
- provider quota exhausted → the core does not fail;
- provider authentication invalid → the core does not fail;
- provider endpoint deleted → the core does not fail;
- provider terms/capability change → the core does not become unusable;
- provider model discontinued → the core does not become unusable.

External providers are **capability extensions**, never prerequisites.

The canonical dependency direction is:

`MORISE AI CORE → local/on-device/native execution → optional execution adapters`

and never:

`MORISE AI CORE → mandatory external provider`

A provider may improve a result, add a modality, accelerate a task or enable a workload unsuitable for the local runtime. It must never define MORISE's identity, memory, context, authority, permissions, reasoning contract or authoritative state.

### Core vs extension classification

**CORE — must not depend on external provider**
- request/context understanding;
- context graph and ContextPacket construction;
- identity and actor resolution;
- memory policy and retrieval authorization;
- intent/requirements compilation;
- policy enforcement;
- capability selection;
- tool authorization;
- deterministic planning/validation mechanisms;
- state ownership and owner commits;
- event contracts;
- provenance;
- privacy enforcement;
- error/recovery state;
- degraded-mode behavior;
- AI evolution governance;
- provider-independent tests and benchmarks.

**EXTENSIONS — may use external providers**
- remote LLM inference;
- remote image generation;
- remote music/audio generation;
- remote video generation;
- remote embeddings when no local equivalent is available;
- remote search/retrieval;
- optional specialized models/services.

An extension failure MUST resolve to a validated alternative or an explicit degraded/unavailable state. It must never be represented as successful execution.

### Absolute forbidden dependency

No production code may contain a startup invariant equivalent to:

`require(API_KEY) && require(PROVIDER) => startMORISEAI()`

No core capability may contain:

`if (!API_KEY) throw fatalError`

when the requested capability has a valid deterministic/local/degraded path.

Provider configuration must therefore be capability-scoped, not application-scoped.

## 15.1 — RESOURCE / PROVIDER ROUTING


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


# D100K — MORISE AI — FORMAL COGNITION / AUTHORITY / EVOLUTION LAYER

## 40. Purpose

This layer formalizes MORISE AI as a machine-verifiable orchestration system. It does not create a second AI specification. AI_MASTER_PLAN remains the canonical WHAT; this section defines the properties that every implementation must preserve.

## 41. Canonical cognition state machine

The canonical request lifecycle is:

REQUESTED
→ AUTHENTICATED
→ CLASSIFIED
→ CONTEXT_READY
→ INTENT_READY
→ REQUIREMENTS_READY
→ PLAN_READY
→ POLICY_ALLOWED
→ RESOURCES_RESERVED
→ EXECUTING
→ VALIDATING
→ OWNER_COMMIT_PENDING
→ COMMITTED
→ MEMORY_ELIGIBLE
→ EVALUATED
→ EVOLUTION_ELIGIBLE

Terminal branches:
REJECTED, BLOCKED, DEGRADED, INCONCLUSIVE, CANCELLED, ROLLED_BACK.

A transition must define:
actor, trigger, preconditions, input schema, authoritative state, guards, state mutation, emitted events, recovery and proof obligation.

## 42. AI authority invariants

The following are mandatory invariants:

1. A provider is never the AI authority.
2. A tool is never a permission authority.
3. A worker is never a business-state authority.
4. A memory record is never authoritative merely because AI retrieved it.
5. A generated artifact is never valid merely because a model produced it.
6. An AI proposal never bypasses the owner module's commit boundary.
7. Requested autonomy never overrides policy.
8. Private context never becomes global memory without an explicit permitted policy.
9. An INCONCLUSIVE validation result can never become VALID by default.
10. Evolution candidates never become production behavior without the promotion gate.

## 43. Formal intent contract

Every AI request resolves to:

INTENT_ID
→ ACTOR
→ SOURCE_MODULE
→ CAPABILITY
→ GOAL
→ INPUT_REFS
→ CONTEXT_SCOPE
→ CONSTRAINTS
→ PRIVACY_CLASS
→ REQUESTED_AUTONOMY
→ RESOURCE_BUDGET
→ DEADLINE
→ EXPECTED_OUTPUT_CLASS.

Intent is a description of what the system is allowed to attempt. It is not an authorization by itself.

## 44. Requirements contract

Requirements Compiler output must distinguish:

- MUST: mandatory functional/property constraint;
- SHOULD: preferred behavior;
- MAY: optional behavior;
- MUST_NOT: forbidden behavior.

Every MUST_NOT becomes a validator/policy obligation where technically applicable.

Ambiguous requirements that could change security, privacy, ownership, public behavior or persistence are not silently interpreted. They become unresolved requirements.

## 45. Autonomy contract

A0 = answer.
A1 = propose.
A2 = execute after explicit confirmation.
A3 = execute bounded authorized graph.
A4 = execute bounded long workflow.

An operation can downgrade requested autonomy after policy evaluation. It can never silently upgrade autonomy.

Public publication, private-media use, financial/economic mutations, identity changes and other high-impact actions require their module owner and applicable policy gates regardless of model confidence.

## 46. Capability contract

A capability is defined by:

CAPABILITY_ID
→ VERSION
→ OWNER
→ INPUT_SCHEMA
→ OUTPUT_SCHEMA
→ REQUIRED_CONTEXT
→ PRIVACY_CLASS
→ ALLOWED_AUTONOMY
→ RESOURCE_BUDGET
→ TOOLS
→ PROVIDER_POLICY
→ VALIDATORS
→ FALLBACK
→ OBSERVABILITY
→ EVIDENCE_REQUIREMENTS.

Capability IDs are stable references. Providers/models are implementation details behind M15 routing.

## 47. Memory truth model

Memory classes are distinct:

- FACT: validated durable evidence;
- EXPERIENCE: observed execution outcome;
- PATTERN: derived statistical/semantic pattern;
- PROPOSAL: candidate not yet committed;
- EPHEMERAL_CONTEXT: request-scoped information;
- PRIVATE_MEMORY: user-scoped authorized memory.

Only permitted classes enter long-lived memory. A proposal cannot be promoted to FACT without validation/evidence.

## 48. Evolution state machine

EVOLUTION_GAP
→ ROOT_CAUSE
→ HYPOTHESIS
→ CANDIDATE
→ STATIC_CHECK
→ SANDBOX_CHECK
→ TEST
→ BENCHMARK
→ SECURITY/POLICY
→ CANARY
→ PROMOTION_DECISION
→ PROMOTED or REJECTED
→ MONITOR
→ ROLLBACK when required.

Self-improvement cannot modify its own production authorization boundary.

## 49. Provider/worker invariants

Provider selection:
request → policy → resource availability → router → adapter → normalized output → validator.

Worker selection:
task → capability → policy → resource reservation → lease → sandbox → execution → result validation.

Neither path may write another module's private business state directly.

## 50. Creative AI proof contract

For generated image/video/audio/music/game artifacts:

AUTHORIZED SOURCE/BRIEF
→ PRIVACY CHECK
→ CONTENT ANALYSIS
→ CREATIVE SPECIFICATION
→ GENERATION
→ ORIGINALITY/SAFETY/QUALITY VALIDATION
→ PROVENANCE
→ OWNER REVIEW WHEN REQUIRED
→ OWNER COMMIT
→ PUBLISH/STORE.

The presence of an original file or source does not by itself authorize unrestricted transformation.

## 51. Game AI proof contract

Game fabrication is:

INTENT
→ REQUIREMENTS
→ GAME_SPECIFICATION
→ TASK_GRAPH
→ TEMPLATE/COMPONENT PLAN
→ BUILD
→ STATIC VALIDATION
→ SECURITY VALIDATION
→ SIMULATION
→ BEHAVIOR TEST
→ RESOURCE TEST
→ RUNTIME VALIDATION
→ OWNER PUBLICATION.

M08 owns the package; M09 owns runtime execution; M06 owns Play result admission.

## 52. Formal safety properties

MORISE AI must satisfy:

- unauthorized capability execution = impossible by policy;
- provider-selected permission bypass = impossible;
- cross-owner mutation = rejected;
- secret exposure to client = forbidden;
- private context leak = forbidden;
- invalid model output = non-authoritative;
- duplicate command = idempotent according to capability contract;
- failed validation = no authoritative commit;
- rollback candidate = auditable;
- stale capability version = rejected or explicitly migrated.

## 53. Formal liveness/recovery properties

For each retryable capability:
- retry policy is explicit;
- committed result is recoverable after response loss;
- provider timeout does not imply success;
- worker loss does not silently erase committed state;
- degraded mode is explicit;
- recovery never fabricates an outcome.

## 54. Evidence contract for MORISE AI

A capability is VERIFIED only when applicable proof exists for:

CONTRACT
→ IMPLEMENTATION
→ UNIT
→ INTEGRATION
→ SECURITY
→ PROVIDER/WORKER FAILURE
→ BROWSER when user-facing
→ MOBILE when user-facing
→ RESILIENCE
→ OBSERVABILITY
→ PRODUCTION.

AI self-assessment is never evidence of its own correctness.

## 55. D100K completion criterion

An independent implementation agent must be able to determine:
- what MORISE may do;
- what MORISE must not do;
- who owns each mutation;
- which capability is required;
- what context is legal;
- what evidence is mandatory;
- what happens on failure;
- what happens on replay;
- how evolution is promoted or rejected;
- how a change impacts dependent modules.

If any of these remain materially ambiguous, the relevant AI contract is not closed.


# CONTEXT INTELLIGENCE WORKSTREAM — CANONICAL ADDITION
The AI roadmap explicitly includes a Context Intelligence layer.

## Objective
MORISE should understand cumulative user statements as structured state rather than isolated prompts. The system preserves hierarchy, continuity, corrections, provenance and privacy across turns.

## Work packages
CI-01 multilingual extraction
CI-02 entity/coreference resolution
CI-03 location hierarchy
CI-04 profile/context separation
CI-05 temporal memory
CI-06 conflict/correction engine
CI-07 privacy classifier
CI-08 ContextPacket builder
CI-09 retrieval ranking
CI-10 cache/index invalidation
CI-11 deterministic fallback
CI-12 adversarial memory testing

## Non-goals
No hidden psychological profiling. No silent inference of sensitive traits. No automatic persistence of exact private location. No provider-owned memory authority.



# 56. PROVIDER INDEPENDENCE — ACCEPTANCE GATE

A MORISE AI implementation is not accepted as provider-independent until all applicable tests prove:

1. boot without AI provider secrets;
2. boot without provider configuration;
3. core context/memory/policy paths operate without remote inference;
4. provider outage does not break core navigation or authoritative state;
5. invalid/expired key produces normalized extension failure, not core failure;
6. quota/rate-limit exhaustion produces controlled degradation;
7. network loss preserves all supported offline/local capabilities;
8. no browser bundle contains privileged provider secrets;
9. no module business owner calls an external provider directly;
10. provider removal leaves the Core architecture intact;
11. provider-specific adapters can be disabled independently;
12. no successful result is fabricated when every execution path is unavailable.

**Evidence requirement:** these tests must be backed by runtime/CI evidence before implementation DONE. Documentation alone proves architecture, not runtime independence.



# FUSION DES ANCIENS PLANS AI — CAPACITÉ, ÉVOLUTION ET COMPUTE — CANONIQUE

Les anciens documents `00_MASTER_AI`, `01_CORE_ORCHESTRATOR`, `02_CONTEXT_INTENT_REASONING`, `03_CAPABILITY_PROVIDER_ROUTER`, `04_MEMORY_EXPERIENCE_LEARNING`, `05_CREATIVE_MEDIA_GAME_CREATOR`, `06_EVOLUTION_CODE_SANDBOX`, `07_DATA_SECURITY_PROVENANCE`, `08_RESOURCE_SCHEDULER_OBSERVABILITY`, `09_AI_ACTIONS_AND_CONTRACTS`, `11_GAME_CREATION_RUNTIME_CONTRACT`, `12_DISTRIBUTED_WORKER_CLUSTER`, `13_DISTRIBUTED_SYSTEM_IMPLEMENTATION` et `14_DETAILED_AI_DESIGN_INDEX` ont été fusionnés fonctionnellement dans cette source maître et sa conception technique associée.

## 1. Logiciel évolutif

MORISE ne doit pas être architecturée comme un logiciel dont les capacités sont figées à la première version. Une limitation mesurée peut devenir une tâche d'amélioration :

OBSERVATION → LIMIT/GAP → ROOT CAUSE → HYPOTHESIS → CANDIDATE → IMPLEMENTATION → SANDBOX → TESTS → BENCHMARK → POLICY/SECURITY → CANARY → PROMOTION → MONITORING → ROLLBACK

L'évolution peut toucher, selon policy :
- algorithmes ;
- règles non autoritaires ;
- planners ;
- stratégies de routing ;
- skills ;
- parsers ;
- retrieval ;
- optimiseurs ;
- templates/components ;
- validateurs ;
- outils ;
- composants de fabrication ;
- code de support.

L'état métier autoritatif et les contrôles de sécurité ne peuvent pas être remplacés par une sortie générée sans leurs gates propres.

## 2. Croissance des ressources

Le Resource Engine doit mesurer et utiliser la capacité réelle :
- CPU/logical cores ;
- RAM disponible ;
- GPU ;
- VRAM ;
- stockage ;
- réseau ;
- concurrence ;
- latence ;
- queue depth.

Le scheduler choisit selon capability, privacy, trust, health, resource fit, locality, queue age, reliability et budget.

L'ajout d'un worker augmente la capacité agrégée lorsqu'il est autorisé, sain et réellement disponible. Il ne crée pas de RAM partagée entre machines.

## 3. Compute pool évolutif

Le modèle cible est :

LOCAL RUNTIME → TRUSTED WORKER → COMMUNITY WORKER OPT-IN → PROVIDER/REMOTE EXTENSION

Un worker est un moteur de calcul, pas un second cerveau et pas une autorité métier.

Les tâches lourdes doivent être décomposables en jobs avec :
- capability ;
- resource requirements ;
- privacy class ;
- payload/reference ;
- idempotency ;
- timeout ;
- output schema ;
- validation ;
- retry/recovery.

## 4. Fabrication multimodale

MORISE AI doit orchestrer, selon les capacités disponibles :
TEXT, REASONING, VISION, IMAGE, VIDEO, MUSIC, AUDIO, TTS, STT, TRANSLATION, EMBEDDING, SEARCH, MODERATION, CODE, GAME_2D, GAME_3D.

Pour une création complexe, la demande devient un DAG de tâches avec dépendances, budgets de ressources, validators et provenance.

## 5. Jeu 2D/3D

La fabrication suit :

PLAYER IDEA → INTENT → GAME SPECIFICATION → TASK GRAPH → ENGINE → CODE/ASSETS/CONTENT → BUILD → SECURITY → SIMULATION → TEST → PLAYTEST → BALANCE → PREVIEW → PUBLISH

L'exécution suit ensuite M08 → M09. Le runtime n'a aucune dépendance obligatoire au provider qui a fabriqué le jeu.

## 6. Règle d'indépendance

Provider, worker, Codex ou autre agent sont des mécanismes d'exécution facultatifs. La connaissance, les contrats, la mémoire, l'orchestration, les validators, la provenance et les règles d'évolution appartiennent à MORISE.

La suppression d'un provider, d'un worker ou d'un agent doit réduire une capacité d'exécution disponible sans supprimer l'identité ou le cerveau contractuel de MORISE.



# D100K — HISTORICAL COVERAGE RESTORATION — AI PLAN

## Canonical invariants restored
- Une panne, quota, suppression ou indisponibilité d'un provider ne doit pas détruire les fonctions sociales ordinaires ni l'état métier autoritatif.
- Plus de code ne crée pas physiquement de CPU/RAM/GPU. La croissance logicielle et la croissance de capacité sont deux axes distincts.
- La capacité d'exécution peut croître par ressources locales supplémentaires et workers autorisés, sans changer les contrats de capability.
- Aucun module ne hard-code une URL provider.
- Une variable présente dans le navigateur n'est jamais une frontière de sécurité.
- Les artefacts de jeux publiés restent utilisables sans le provider qui les a créés.
- Les opérations à haut risque génèrent une trace d'audit.
- Les modules consomment les contrats AI canoniques au lieu de recréer un second cerveau.
- Les données privées/sensibles ne constituent jamais automatiquement une matière d'apprentissage globale.
- Toute capacité AI doit être déclarée, versionnée, observable et testable.

## D100K proof
For each invariant: nominal path + provider outage + worker outage + unauthorized path + malformed output + retry/replay + evidence record.



# D100K — PROVIDER / ENDPOINT HISTORICAL COVERAGE

Historical provider candidates are preserved as **candidates/unverified until current evidence exists**: SiliconFlow, SambaNova Cloud, Cehpoint AI, OVH AI Endpoints, Quillly, LLM7, AI Horde, AI Horde OpenAI-compatible API, Replicate, Firecrawl, Openverse, Internet Archive, LibreTranslate, Cloudflare Workers AI and FreeToUse Music API, in addition to already documented Gemini, DeepSeek, Pollinations, OpenRouter, Puter, Hugging Face, Kilo and others.

Historical endpoint reference preserved for verification only:
`https://api.freetouse.com/v3/openapi.json`.

Canonical provider fields:
`id, baseUrl, authMode, secretName, capabilities, healthCheck, privacyClass, rateLimit, fallbacks, enabled, lastVerifiedAt`.

No provider is enabled from documentation alone. A provider can be removed without changing the MORISE Core. No provider URL is supplied by the user/model as a direct execution destination.

Historical secret-name spellings are evidence only; canonical configuration uses verified environment/secret names. Secret values never enter repository documentation.



# D100K — RESTORED CAPABILITY ORCHESTRATION / CROSS-DOMAIN LEARNING

MORISE AI learns how to select, sequence, parameterize, combine, test and recover from validated capabilities. It may learn orchestration strategies from actual execution trajectories without granting a provider or agent authority over production policy.

Cross-domain mechanics may be translated into MORISE-native experiences: music/audio can alter game/world state; visual creation can seed a Living Object; story structure can drive a playable scene. The domain is an internal source of mechanics, not a new navigation category.

Music/audio remains a SYSTEM capability and can support Living Objects, communities, events, game/world mechanics and collaborative experiences. External music distribution, when ever enabled, requires provenance, rights/licence verification and explicit publication authorization; internal performance never implies distribution rights.

Creation Runtime is the controlled environment used when an experience must be assembled, built, executed, tested, diagnosed and corrected. AI orchestration composes existing capabilities and runtime contracts rather than inventing an unbounded execution surface.



# D100K — MORISE-NATIVE AI MISSION RESTORATION

MORISE AI is specifically the native intelligence of MORISE. Its primary mission is to understand, operate, assist, personalize, create, test, optimize and evolve MORISE itself and the experiences governed by MORISE contracts.

Its capability domain includes PLAYER, WORLD, SOCIAL, PLAY, CREATE, communities, events, discovery, translation, moderation, progression explanations, games, creative media, resource orchestration, memory and internal AI Lab workflows.

This does not make MORISE AI a generic autonomous agent for arbitrary unrelated external systems. External tools/providers are execution extensions subject to policy, not a second product identity.

All self-improvement remains MORISE-scoped: candidate → sandbox → benchmark → policy/security → canary → promotion/rejection → rollback. Production-critical ownership boundaries remain intact.

---

# SOURCE 4 — docs/moirise/modules/M01-foundation/PLAN.md

# M01 — FOUNDATION — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité obligatoire
La description doit aller de la « France » jusqu'à la « porte » quand cela est nécessaire : acteur → déclencheur → préconditions → entrées → ordre précis → mutation → projection → événements → erreurs → reprise → sécurité → tests. Aucune phrase ne doit laisser une décision d'implémentation importante à deviner.

## 1. Owner
socle runtime, shell, session, routing, configuration, capabilities et événements
**Owner unique : M01.** Un consommateur peut afficher une projection mais ne peut pas recopier la règle métier.

## 2. Capacités
### M01.1 Boot
**Acteur :** visiteur/Player
**Déclencheur :** open ou refresh
**Préconditions :** assets/config publique accessibles
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. valider config → monter shell → restaurer session → résoudre route → READY ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** aucune mutation métier
**Échec/reprise :** optionnel down = DEGRADED; critique down = RECOVERABLE_ERROR
**Sécurité :** secrets jamais client
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M01.2 Route
**Acteur :** visiteur/Player
**Déclencheur :** clic ou deep-link
**Préconditions :** RouteDefinition existe ou 404 gérable
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. normaliser URL → auth guard → feature flag → owner module → projection ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** navigation seulement
**Échec/reprise :** route inconnue = 404; non autorisée = sign-in/forbidden
**Sécurité :** URL n'autorise rien
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M01.3 Session
**Acteur :** user authentifié
**Déclencheur :** callback/refresh
**Préconditions :** session valide
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. lire session → dériver actorId serveur → créer SessionContext minimal ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** SessionContext
**Échec/reprise :** expiration avant commit = reauth sans write
**Sécurité :** client actorId non fiable
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M01.4 Capability registry
**Acteur :** service interne
**Déclencheur :** register/resolve
**Préconditions :** schema, owner, version fournis
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. valider → unique id+version → health → résolution par capabilityId ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** CapabilityDefinition
**Échec/reprise :** doublon/schema invalide = reject
**Sécurité :** provider non choisi par UI
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M01.5 AI gateway
**Acteur :** module autorisé
**Déclencheur :** request capability AI
**Préconditions :** actor+privacy+schema valides
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. validate → minimize context → policy/autonomy → M15 → validate output ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** execution ref/normalized result
**Échec/reprise :** provider down = fallback; invalid output = INCONCLUSIVE
**Sécurité :** keys/URLs server-only
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M01.6 Event bus
**Acteur :** module owner
**Déclencheur :** post-commit
**Préconditions :** event schema valide
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. envelope → persist/publish → consumer dedupe ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** SystemEvent
**Échec/reprise :** duplicate delivery = no second mutation
**Sécurité :** payload privé minimisé
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.


## 3. États
Chaque capacité définit explicitement ses états et transitions. Une transition est trigger → auth guard → business guard → mutation → event → projection. Une guard échouée n'écrit rien. Un résultat INCONCLUSIVE n'est jamais traité comme VALID.

## 4. Données
Toutes les entités ont id, owner/actor relation, status, version, createdAt, updatedAt, privacyClass et retentionPolicy. Les données privées possèdent une portée de lecture explicite.

## 5. Cross-module
Échange uniquement par use-case, event ou projection versionnée. M01 reste owner des frontières; M02 de l'identité; M03 du contenu social/privé.

## 6. UX
LOADING, READY, EMPTY réel, ERROR, UNAVAILABLE et DEGRADED. Aucun écran blanc. Pas de nouvelle porte principale créée automatiquement.

## 7. IA
Toute assistance passe par M15/CAPABILITY_ID. La sortie AI est une proposition/evidence jusqu'à validation du owner. Aucun provider n'est appelé directement par l'interface.

## 8. Security
Server authority, schema validation, access checks, rate limits, secrets server-only, provenance, private-data minimization, no raw private message telemetry.

## 9. DONE
Persistence, permissions, events, idempotence, recovery, tests, browser desktop/mobile, observability et anti-doublon d'autorité validés.

## AI-INTÉGRATION M01 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position dans MORISE AI
M01 est la porte d'entrée technique entre l'application et MORISE AI. M01 ne raisonne pas à la place de M15 : il authentifie l'acteur, valide la requête, applique les frontières de session/privacy/capability, transmet une demande conforme à M15 et rend le résultat normalisé au consommateur.

### B. Ce que l'IA de fabrication doit comprendre
M01 possède : boot, route, session, capability registry, AI gateway et event bus. M01 ne possède pas la progression, Player, Social, World, Play, rewards ou communautés. Toute modification de ces domaines doit être remise à leur owner.

### C. Entrée AI
Acteur → requestId/traceId → sourceModule → capabilityId/version → targetRef éventuel → payload validé → privacyClass → autonomy → resource budget. actorId vient du serveur.

### D. Séquence obligatoire
1. dériver actorId serveur;
2. vérifier session et permission;
3. valider capabilityId/version;
4. charger le contexte minimal autorisé;
5. vérifier privacy/policy/autonomy;
6. créer le contrat d'appel M15;
7. exécuter via M15;
8. valider la sortie;
9. retourner le résultat sans lui attribuer d'autorité métier;
10. journaliser uniquement les métadonnées autorisées.

### E. Ce que M01 laisse faire à l'IA
M15 peut choisir une capability existante, planifier, router, utiliser un provider/worker autorisé et produire une proposition/résultat validable.

### F. Ce que M01 interdit
Provider choisi par UI, capability inconnue, actorId client fiable, secret exposé, write cross-owner, bypass policy, contexte privé ajouté silencieusement.

### G. Fallback
MORISE AI indisponible : la fonctionnalité qui peut être déterministe continue sans IA. Une dépendance critique ne doit jamais produire un écran blanc.

### H. DONE AI
Chaque capability possède contrat, version, schema, validator, policy, observability, fallback et test. Le gateway doit empêcher un second AI router dans un autre module.

# D10 — M01 FOUNDATION — EXPANSION COMPORTEMENTALE
## Autorité et parcours
M01 possède les frontières qui rendent tout le reste fiable : session réelle, routing, permissions de base, capability boundary, event envelope et erreurs globales. Aucun module ne peut contourner M01.
## Bootstrap exact
APP_START → ENV_VALIDATE → SESSION_RESOLVE → DEVICE_CONTEXT → ROUTE_GUARD → PLAYER_BOOTSTRAP → CAPABILITY_DISCOVERY → PROJECTION. Une dépendance non critique ne doit pas rendre le shell vide.
## Navigation
Chaque route possède authClass, ownership, preload policy, loading/empty/error/degraded states, deep-link rule, back/forward behavior et mobile/desktop behavior. SYSTEM contextuel peut ouvrir une capability sans créer une nouvelle route globale.
## Security
Server-derived actor, CSP/headers, CSRF where applicable, IDOR prevention, secret isolation, safe redirect allowlist, upload quarantine, rate limit et session expiry handling. Les URLs externes sont des données, pas des instructions.
## Social/viral foundation
Les share links, invite links et media derivative links doivent utiliser des tokens signés/versionnés et révocables. M01 fournit l'identité de la session et la politique de partage sans posséder le contenu métier.
## AI boundary
Toute AIRequest passe par l'auth/policy boundary M01 avant M15. Aucun provider direct dans les composants frontend.
## DONE D10
Startup, auth loss, refresh, deep-link, revoked session, invalid capability, expired share token, provider outage, slow network, mobile keyboard and desktop navigation all produce recoverable states.

# D100K — M01 Foundation — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M01. Scope: runtime/shell/session/routing/capabilities/events. Dependencies: M02+.
Primary invariant: server-derived identity; no cross-owner writes.

For every capability of M01, the canonical state transition is:
ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

No capability is complete if an implementation decision remains inferable from prose alone.

## 2. Forbidden states
A transition must have zero mutation when:
- authorization fails;
- input/schema validation fails;
- required version is incompatible;
- target is outside owner scope;
- idempotency conflict occurs;
- a required authoritative dependency is unavailable.

## 3. AI boundary
AI/M15 may propose, classify, summarize or generate candidates only within the capability contract. M01 remains the owner of its authoritative state. AI output without validated evidence is non-authoritative.

## 4. Proof obligations
Each user-visible capability must prove:
SUCCESS + EMPTY/NO-DATA + ERROR + UNAVAILABLE/DEGRADED where applicable + REFRESH/REOPEN + MOBILE + DESKTOP + PERMISSION DENIAL + RETRY/REPLAY behavior.

## 5. Change-impact obligation
A change to a M01 contract requires traversal:
M01 → direct consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience scenarios.
Unknown impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
- owner authority cannot be bypassed;
- duplicate commands do not duplicate authoritative mutation;
- stale versions do not silently overwrite newer state;
- projections can be rebuilt from authoritative state;
- privacy/visibility constraints survive every handoff;
- VERIFIED cannot be emitted without applicable evidence.

## 7. Completion
D100K means the feature definition is machine-checkable. It does not mean the code is already fabricated.


# D100K — HISTORICAL CONTRACT RESTORATION — M01 FOUNDATION

## Restored behavioral contracts
- L'application reste mobile-first, sombre/glass, avec des contrôles permanents rares.
- Une opération longue utilise une surface de progression/status et n'ajoute pas un bouton global.
- Les portes permanentes restent limitées ; les messages privés et sous-fonctions restent contextuels.
- Les panneaux SYSTEM sont fermables sauf contrainte de sécurité.
- Aucune action destructive n'est implicite.
- Aucune fonction AI ne reçoit un accès global implicite.
- La mémoire AI n'est pas chargée massivement au démarrage.
- Aucun média lourd n'est préchargé sans besoin explicite.
- Les fonctions protégées côté serveur utilisent la session/JWT selon le boundary d'autorité.
- RLS reste la protection d'accès persistante pour les futures tables.

## Canonical bootstrap objects
`AppConfig={version,environment,defaultLocale,supportedLocales}`
`RouteMeta={id,path,auth,primary}`
`AsyncState<T>={status,data?,error?}`
`SystemEvent={eventId,eventType,occurredAt,actorId?,moduleId,requestId?,schemaVersion,metadata}`

## D100K proof
Boot public, boot authenticated, expired session, unauthorized route, refresh, deep-link, slow network, provider unavailable, no-AI mode, mobile viewport and evidence of zero secret leakage.



# D100K — EXPLICIT FOUNDATION EXCLUSIONS / UX RESTORATION

M01 does not implement full machine learning or other module business features; it supplies the boundaries they consume. It must remain mobile-first/dark-glass, keep permanent controls sparse, allow opening the SYSTEM panel when available, and avoid loading large AI memory or heavy media at boot without a concrete need.

Protected Edge/server functions require the repository's authenticated/JWT boundary when protection is applicable. This is implementation evidence to be verified at the runtime gate, not a client-only assertion.



# D100K — HISTORICAL UI/RESPONSIVENESS RESTORATION

Historical UI invariants retained:
- calm futuristic/premium presentation rather than permanent high-neon effects;
- no flashing/rapid particle loops by default;
- motion defaults around 160–260ms; long transitions ≤700ms unless explicitly gameplay; respect `prefers-reduced-motion`;
- touch-friendly controls and no hover-only dependency;
- desktop and mobile preserve one information architecture rather than duplicating navigation;
- low-memory/low-quality displays preserve logical functionality with reduced visual/media cost;
- optional capability failure never prevents shell rendering or produces a blank screen;
- unsupported locale follows deterministic fallback policy;
- current primary-door labels come only from the canonical Master Plan, not deprecated historical navigation labels.

D100K browser proof: 320px/390x844/1440x900, keyboard/touch, reduced motion, long names, zero progress, unavailable provider, slow network and no horizontal overflow.



# D100K — RESTORED OWNER / RBAC CONTRACT

Canonical administrative roles from historical contracts: OWNER, ADMIN, MODERATOR, PLAYER.

The initial OWNER is the already-existing authenticated owner account resolved at bootstrap; no email, UUID or identity is invented or hard-coded. Client input cannot self-assign a role.

Role mutation:
requester → authorizeRoleMutation → validateTarget → writeRole → audit → event.

Only OWNER can grant/revoke ADMIN or MODERATOR unless an explicit policy says otherwise. ADMIN/MODERATOR permissions are explicit and narrower than OWNER. All privileged routes/actions re-check authorization server-side.

---

# SOURCE 5 — docs/moirise/modules/M02-player/PLAN.md

# M02 — PLAYER — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité obligatoire
La description doit aller de la « France » jusqu'à la « porte » quand cela est nécessaire : acteur → déclencheur → préconditions → entrées → ordre précis → mutation → projection → événements → erreurs → reprise → sécurité → tests. Aucune phrase ne doit laisser une décision d'implémentation importante à deviner.

## 1. Owner
identité, profil, préférences, confidentialité, avatars, mémoire et preuves DNA
**Owner unique : M02.** Un consommateur peut afficher une projection mais ne peut pas recopier la règle métier.

## 2. Capacités
### M02.1 Bootstrap
**Acteur :** user authentifié
**Déclencheur :** première entrée
**Préconditions :** auth user id présent
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. lookup player → create defaults atomically if missing → return existing on retry ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Player
**Échec/reprise :** race = unique constraint + existing
**Sécurité :** auth id serveur
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.2 Public profile
**Acteur :** player
**Déclencheur :** view/edit profile
**Préconditions :** player active
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. load public projection → validate fields → versioned update → invalidate cache ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** PublicProfileProjection
**Échec/reprise :** invalid field = no partial write
**Sécurité :** privacy server-enforced
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.3 Private settings
**Acteur :** player
**Déclencheur :** change preference/privacy
**Préconditions :** setting key known
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. check current version → validate value → commit → emit change event ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Preferences/PrivacySettings
**Échec/reprise :** stale version = conflict/reload
**Sécurité :** private values not public
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.4 Handle
**Acteur :** player
**Déclencheur :** confirm handle
**Préconditions :** normalized format valid
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. Unicode normalize → uniqueness check → atomic change ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** HandleRef
**Échec/reprise :** taken = conflict without owner leak
**Sécurité :** canonical uniqueness
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.5 Avatar
**Acteur :** player
**Déclencheur :** upload/generate
**Préconditions :** file/provider result allowed
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. quarantine → MIME/size/dimensions → safety → publish ref → replace ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** AvatarRef
**Échec/reprise :** failure keeps old avatar
**Sécurité :** safe storage
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M02.6 Memory/DNA evidence
**Acteur :** system/validated action
**Déclencheur :** validated event or explicit memory
**Préconditions :** source/provenance/privacy class known
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. store evidence → confidence/version → optional M15 pattern → invalidation path ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** MemoryEntry/DNAEvidence
**Échec/reprise :** low confidence stays evidence
**Sécurité :** no sensitive inference/global private chats
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

## 3. États
Chaque capacité définit explicitement ses états et transitions. Une transition est trigger → auth guard → business guard → mutation → event → projection. Une guard échouée n'écrit rien. Un résultat INCONCLUSIVE n'est jamais traité comme VALID.

## 4. Données
Toutes les entités ont id, owner/actor relation, status, version, createdAt, updatedAt, privacyClass et retentionPolicy. Les données privées possèdent une portée de lecture explicite.

## 5. Cross-module
Échange uniquement par use-case, event ou projection versionnée. M01 reste owner des frontières; M02 de l'identité; M03 du contenu social/privé.

## 6. UX
LOADING, READY, EMPTY réel, ERROR, UNAVAILABLE et DEGRADED. Aucun écran blanc. Pas de nouvelle porte principale créée automatiquement.

## 7. IA
Toute assistance passe par M15/CAPABILITY_ID. La sortie AI est une proposition/evidence jusqu'à validation du owner. Aucun provider n'est appelé directement par l'interface.

## 8. Security
Server authority, schema validation, access checks, rate limits, secrets server-only, provenance, private-data minimization, no raw private message telemetry.

## 9. DONE
Persistence, permissions, events, idempotence, recovery, tests, browser desktop/mobile, observability et anti-doublon d'autorité validés.

## AI-INTÉGRATION M02 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M02 est l'autorité de l'état Player. MORISE AI comprend le Player via des projections et scopes autorisés; il ne possède jamais les tables Player.

### B. Surfaces
Bootstrap, profil public, préférences, privacy, handle, avatar, mémoire Player, preuves DNA.

### C. Contextes transmis à MORISE AI
Seulement le minimum nécessaire : playerId dérivé côté serveur, locale, préférences explicitement autorisées, intérêts déclarés, historique validé, mémoire avec scope et provenance, signaux de session. La privacy profile est appliquée avant routage.

### D. Capacités AI permises
Personnalisation, résumé de profil, suggestions, retrieval de mémoire Player, analyse de préférences, aide créative liée au profil, traduction de champs autorisés.

### E. Frontière de mutation
M15 peut proposer une modification mais M02 valide et écrit. Un provider ne peut pas écrire profile/preferences/avatar/memory.

### F. Mémoire
Une mémoire Player doit porter scope, provenance, retention, sourceRef et consentement/policy applicable. Une mémoire privée ne devient jamais mémoire World ou mémoire globale par simple sortie IA.

### G. Fallback
Sans IA, le profil, les préférences, la privacy et les projections déterministes restent opérationnels.

### H. DONE AI
Chaque capacité de personnalisation possède schema, privacy policy, validator, owner commit et tests d'isolation entre Player.

## 10. CREATIVE MEDIA / PROFILE VIRALITY INTEGRATION
M02 remains the sole owner of identity/profile/avatar. The cross-module contract `CREATIVE_MEDIA_VIRALITY_PLAN.md` and its technical design define the shared media pipeline.

### Profile media behavior
A Player may expose avatar, optional profile visual/video, public creator highlights and selected public creations. These are projections of M02-owned identity plus M03-owned published content; M02 never duplicates the social feed rules.

### AI-generated profile media
The sequence is upload/generate request → M02 privacy/identity guard → M15 capability request → media originality/provenance validation → M02 owner commit → profile projection.

### User media learning
M02 may expose explicitly permitted Player-owned media references to M15. It must not silently promote private media into global training/memory. The context includes provenance, permission, scope, retention and sourceRef.

### DONE
Profile photo/avatar generation, profile media, deletion, privacy changes and AI creative suggestions remain functional when AI providers are unavailable.

# D10 — M02 PLAYER — EXPANSION COMPORTEMENTALE
## Identity surface
Profile = identity + preferences + privacy + avatar + public creations projection + selected highlights. No direct AI write.
## Profile evolution
VIEW_PUBLIC → FOLLOW/INTERACT → VIEW_CREATIONS → OPEN_HIGHLIGHT → CREATE_FROM_PROFILE_MEDIA when policy permits. Private settings never enter public ranking without explicit allowed signals.
## Avatar/media
Upload/generate path uses quarantine, MIME/size/dimension checks, moderation, provenance and replace transaction. Generated avatar retains source/derivation metadata.
## Personalization
PlayerAIContext may include explicit interests, locale, current activity and validated memory; sensitive inference is forbidden.
## Viral hooks
Profile has shareable safe entry points: profile card, selected Reel/Photo/Story highlight, creator collection. Every shared surface resolves through M01 token policy.
## Player memory
Store only validated memories with scope/provenance/retention/consent. Promotion to broader scope requires owner/policy.
## DONE D10
Cold-start profile, profile editing, avatar generation, media highlight, privacy changes, account deletion propagation, AI outage and cross-player isolation are validated.

# D100K — M02 Player — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M02. Scope: identity/profile/preferences/privacy. Dependencies: M01.
Primary invariant: identity is authoritative here.

For every capability of M02, the canonical state transition is:
ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

No capability is complete if an implementation decision remains inferable from prose alone.

## 2. Forbidden states
A transition must have zero mutation when:
- authorization fails;
- input/schema validation fails;
- required version is incompatible;
- target is outside owner scope;
- idempotency conflict occurs;
- a required authoritative dependency is unavailable.

## 3. AI boundary
AI/M15 may propose, classify, summarize or generate candidates only within the capability contract. M02 remains the owner of its authoritative state. AI output without validated evidence is non-authoritative.

## 4. Proof obligations
Each user-visible capability must prove:
SUCCESS + EMPTY/NO-DATA + ERROR + UNAVAILABLE/DEGRADED where applicable + REFRESH/REOPEN + MOBILE + DESKTOP + PERMISSION DENIAL + RETRY/REPLAY behavior.

## 5. Change-impact obligation
A change to a M02 contract requires traversal:
M02 → direct consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience scenarios.
Unknown impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
- owner authority cannot be bypassed;
- duplicate commands do not duplicate authoritative mutation;
- stale versions do not silently overwrite newer state;
- projections can be rebuilt from authoritative state;
- privacy/visibility constraints survive every handoff;
- VERIFIED cannot be emitted without applicable evidence.

## 7. Completion
D100K means the feature definition is machine-checkable. It does not mean the code is already fabricated.


# D100K — HISTORICAL CONTRACT RESTORATION — M02 PLAYER

## Restored behavior
- Un seul Player peut modifier son propre profil/préférences.
- Aucune mutation de profil d'un autre Player depuis client ou AI.
- Les préférences explicites peuvent servir à la personnalisation non sensible.
- La suppression de données est contrôlée et traçable.
- Une mise à jour échouée possède une stratégie de rollback/retry sûre.
- PLAYER DATA et MORISE MEMORY restent deux domaines différents.
- Les changements d'identité/sécurité attendent une confirmation serveur.

## Canonical contracts
`PlayerProfile={id,handle,displayName,avatarRef?,bio,locale,createdAt}`
`PlayerPreferences={locale,theme:'dark',interests,privacy:'public'|'friends'|'private'}`
`PlayerPatch={displayName?,bio?,avatarRef?,locale?,interests?,privacy?}`

## D100K proof
Other-player mutation denial, privacy-policy enforcement at persistence layer, malformed avatar, invalid locale, deletion scope, retry/duplicate mutation, session expiry, audit event and mobile profile flow.



# D100K — RESTORED DEVICE CAPABILITY CONTRACT

M02 owns the Player device capability profile used for adaptive execution. It may record non-sensitive operational capability data such as device class, RAM class, WebGPU/WASM/WebCodecs availability, browser family and a bounded capability map.

A device profile must not be interpreted as consent to use device resources. Resource sharing requires the separate worker opt-in flow defined by M15.

D100K: stale device profile, spoofed capability, privacy boundary, unsupported locale, low-memory fallback and update idempotency.



# D100K — RESTORED MEMORY VAULT OWNER CONTRACT

M02 owns Player identity-linked private memory references, while M03 owns social publication. The Memory Vault is private by default.

Lifecycle:
SELECT → VALIDATE → UPLOAD → METADATA → INDEX → READY → optional ORGANIZE → optional SHARE → DELETE.

Media may be photo/video/audio/text/creation/Moment/Card according to current contracts. STORE, ANALYZE, SHARE and TRAIN are independent permissions. Private media is never silently sent to external models or promoted to global training memory.

D100K: upload cancellation, invalid MIME/size, checksum mismatch, duplicate object, deletion propagation, revoked share and provider outage.

---

# SOURCE 6 — docs/moirise/modules/M03-social/PLAN.md

# M03 — SOCIAL + PRIVATE MESSAGING — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité obligatoire
La description doit aller de la « France » jusqu'à la « porte » quand cela est nécessaire : acteur → déclencheur → préconditions → entrées → ordre précis → mutation → projection → événements → erreurs → reprise → sécurité → tests. Aucune phrase ne doit laisser une décision d'implémentation importante à deviner.

## 1. Owner
feed, contenu social, relations, conversations privées, pièces jointes et traduction
**Owner unique : M03.** Un consommateur peut afficher une projection mais ne peut pas recopier la règle métier.

## 2. Capacités
### M03.1 Post
**Acteur :** player
**Déclencheur :** publish
**Préconditions :** content and visibility valid
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. validate → moderation hook → persist → event → feed projection ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Post
**Échec/reprise :** failure leaves draft; no phantom post
**Sécurité :** visibility/block enforced
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.2 Comment/reaction
**Acteur :** player
**Déclencheur :** interact target
**Préconditions :** target visible and active
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. authorize target → validate state → idempotent mutation → projection ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Comment/Reaction
**Échec/reprise :** deleted target = safe unavailable
**Sécurité :** no cross-scope access
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.3 Follow
**Acteur :** player
**Déclencheur :** follow/unfollow
**Préconditions :** target policy permits
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. check block/privacy/self → unique relation → event ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Follow
**Échec/reprise :** duplicate = prior state
**Sécurité :** block dominates ranking
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.4 Conversation
**Acteur :** participant
**Déclencheur :** open/create
**Préconditions :** participant policy passes
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. resolve/create conversation → membership → bounded history ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Conversation/Participant
**Échec/reprise :** invalid membership = no partial create
**Sécurité :** member-scoped access
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.5 Message
**Acteur :** participant
**Déclencheur :** send/edit/delete
**Préconditions :** membership + payload + attachments valid
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. validate → idempotency → persist → delivery/read receipt separately ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** Message
**Échec/reprise :** retry returns same result; failed upload blocks send
**Sécurité :** private content absent general telemetry
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

### M03.6 Translation
**Acteur :** participant
**Déclencheur :** request language view
**Préconditions :** source accessible, locale supported
**Entrées minimales :** identité serveur, targetRef si nécessaire, payload validé, expectedVersion et commandId pour mutation rejouable.
**Ordre exact :**
1. dériver l'acteur réel ;
2. charger le minimum de contexte ;
3. vérifier permissions/visibilité ;
4. valider schéma, tailles, format et policy ;
5. mask handles/URLs/IDs/code → local/cache → provider if necessary → show translated view ;
6. commit atomique si plusieurs écritures font une seule opération ;
7. construire la projection depuis la donnée autoritative ;
8. publier l'événement après commit.
**Mutation :** TranslationCache/View
**Échec/reprise :** provider down leaves source intact
**Sécurité :** source canonical
**Idempotence :** même commandId + même payload retourne le résultat précédent; même commandId + payload différent = conflict.
**Concurrence :** contrainte unique ou expectedVersion; aucune écriture partielle.
**Réseau :** perte de réponse après commit = récupération par commandId, jamais seconde mutation.
**Tests :** nominal, chaque guard, double clic, deux clients concurrents, session expirée, cible supprimée, réseau coupé après commit, dépendance indisponible, mobile et desktop.

## 3. États
Chaque capacité définit explicitement ses états et transitions. Une transition est trigger → auth guard → business guard → mutation → event → projection. Une guard échouée n'écrit rien. Un résultat INCONCLUSIVE n'est jamais traité comme VALID.

## 4. Données
Toutes les entités ont id, owner/actor relation, status, version, createdAt, updatedAt, privacyClass et retentionPolicy. Les données privées possèdent une portée de lecture explicite.

## 5. Cross-module
Échange uniquement par use-case, event ou projection versionnée. M01 reste owner des frontières; M02 de l'identité; M03 du contenu social/privé.

## 6. UX
LOADING, READY, EMPTY réel, ERROR, UNAVAILABLE et DEGRADED. Aucun écran blanc. Pas de nouvelle porte principale créée automatiquement.

## 7. IA
Toute assistance passe par M15/CAPABILITY_ID. La sortie AI est une proposition/evidence jusqu'à validation du owner. Aucun provider n'est appelé directement par l'interface.

## 8. Security
Server authority, schema validation, access checks, rate limits, secrets server-only, provenance, private-data minimization, no raw private message telemetry.

## 9. DONE
Persistence, permissions, events, idempotence, recovery, tests, browser desktop/mobile, observability et anti-doublon d'autorité validés.

## AI-INTÉGRATION M03 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M03 est l'autorité sociale et privée. Il peut embarquer de nombreuses fonctionnalités IA, mais toutes passent par MORISE AI et restent soumises à la privacy de M03.

### B. Cas AI
Traduction, modération, résumé, suggestion de réponse, aide à la création de post, classification, détection de contenu à risque, génération de projection de partage, recommandation sociale bornée.

### C. Contexte
Pour un post public : contenu et métadonnées publiques nécessaires. Pour un DM : uniquement participants, message/cadre strictement nécessaire et policy applicable. Les DMs ne sont pas utilisés comme mémoire globale par défaut.

### D. Séquence DM
M03 reçoit le message → policy/privacy → capability TRANSLATION/MODERATION si nécessaire → M15 → provider/worker → validation → M03 décide l'affichage/envoi → event.

### E. Partage
Une sortie AI ne transforme jamais un contenu privé en public. M03 construit la projection partageable, vérifie privacy et émet le token.

### F. Fallback
Message original conservé. Si traduction/modération AI indisponible, le produit utilise le fallback déterministe/politiques existantes et n'invente pas un résultat.

### G. DONE
Aucune capability AI de M03 ne permet un provider direct depuis UI; chaque action possède privacy class, validator, reason/error code et recovery.

## 10. CREATIVE MEDIA / REELS / STORIES / SHARING
The canonical cross-module plan is `docs/moirise/CREATIVE_MEDIA_VIRALITY_PLAN.md` and the canonical technical contract is `docs/moirise/CREATIVE_MEDIA_VIRALITY_TECHNICAL_DESIGN.md`.

### M03.7 Media post
Actor = player. Trigger = publish media. Preconditions = authenticated owner + media asset validated + visibility policy + originality/provenance state. Exact order = derive actor → load asset ref → check ownership/permission → validate MIME/size/status → moderation/originality gate → persist Post/Media relation → commit → event → feed projection.

### M03.8 Reel
A Reel is a published media projection owned by M03. It has owner, mediaRef, caption, optional audioRef, visibility, remixPolicy, attributionRef and status. Draft → Validated → Published → Distributed → Removed/Archived. Feed ranking belongs to M07.

### M03.9 Story
A Story contains one or more eligible media refs, audience policy and expiresAt. Default lifecycle = Draft → Validated → Published → Expired → Archived/Deleted. Private/close-friends audience is server-enforced.

### M03.10 Repost/remix
Repost references the original object and preserves attribution. Remix requires source permission and records sourceRef, transformation type, new creator and resulting asset. A trivial copy is not treated as original creation.

### M03.11 Share-to-DM/group
M03 creates a permission-checked share reference; it never copies private media into a public projection. Recipient access is evaluated at open time as well as share time.

### M03.12 User media → AI creation
M03 may request M15 analysis of explicitly permitted media. M15 receives only the minimum allowed context and returns a creative proposal/artifact candidate. M03 commits publication only after validator + privacy + provenance + owner decision.

### M03.13 Intelligent sharing
M03 emits meaningful `ShareOpportunity` events only after completed creations, games, challenges, collection milestones or similarly valuable outcomes. Cooldowns, dedupe and recipient relevance prevent spam.

### M03.14 Viral loop tests
Test upload → Reel → watch → share → recipient open → follow → create-from-concept → publish; Story expiry; repost attribution; remix permission; private-media leakage; duplicate share; provider outage; mobile/desktop; no-button-explosion UX.

# D10 — M03 SOCIAL — EXPANSION COMPORTEMENTALE
## Social object families
Post, Comment, Reaction, Follow, Conversation, Message, Photo, Reel, Story, Share, Repost, Remix, Save, Highlight.
## Feed/reels/stories
Feed may mix posts/media; Reels is immersive short video; Stories are ephemeral; Friends projection surfaces social context. All are projections of authoritative M03 objects.
## Story flow
CREATE_DRAFT → ASSET_CHECK → AUDIENCE → PREVIEW → PUBLISH → ACTIVE → EXPIRE → ARCHIVE/DELETE.
## Reel flow
DRAFT → UPLOAD → SCAN → READY → PUBLISH → DISCOVERY_ELIGIBLE → REMOVE/EXPIRE.
## Creation from media
A user can choose CREATE_FROM_SOURCE on permitted media. M03 authorizes source; M15 analyzes/generates; M03 owns resulting social publication.
## Repost/remix
Repost is pointer-based and keeps source provenance. Remix requires meaningful transformation metadata. Minor-copy content is not treated as original.
## Share
Share recipient may be friend, group, conversation or public share-token scope. Privacy/block checks precede token issuance.
## Viral loops
Every public social object may expose at most one primary next-action cluster in the current context: react/share/create/follow/play depending on object type.
## DONE
Posts, photos, Reels, Stories, DMs, repost/remix/share all obey privacy, idempotence, deletion, moderation, mobile/desktop and AI fallback.

# D100K — M03 Social — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M03. Scope: feed/posts/reactions/private messaging/published media. Dependencies: M01,M02.
Primary invariant: private state remains private; publishing is explicit.

For every capability of M03, the canonical state transition is:
ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

No capability is complete if an implementation decision remains inferable from prose alone.

## 2. Forbidden states
A transition must have zero mutation when:
- authorization fails;
- input/schema validation fails;
- required version is incompatible;
- target is outside owner scope;
- idempotency conflict occurs;
- a required authoritative dependency is unavailable.

## 3. AI boundary
AI/M15 may propose, classify, summarize or generate candidates only within the capability contract. M03 remains the owner of its authoritative state. AI output without validated evidence is non-authoritative.

## 4. Proof obligations
Each user-visible capability must prove:
SUCCESS + EMPTY/NO-DATA + ERROR + UNAVAILABLE/DEGRADED where applicable + REFRESH/REOPEN + MOBILE + DESKTOP + PERMISSION DENIAL + RETRY/REPLAY behavior.

## 5. Change-impact obligation
A change to a M03 contract requires traversal:
M03 → direct consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience scenarios.
Unknown impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
- owner authority cannot be bypassed;
- duplicate commands do not duplicate authoritative mutation;
- stale versions do not silently overwrite newer state;
- projections can be rebuilt from authoritative state;
- privacy/visibility constraints survive every handoff;
- VERIFIED cannot be emitted without applicable evidence.

## 7. Completion
D100K means the feature definition is machine-checkable. It does not mean the code is already fabricated.


# RECOVERED MOMENT / RELAY / LIVING STORIES FUSION — 2026-10-03

## MORISE Moment
M03 preserves the social publication/presentation side of meaningful Moments: candidate Moment from a real validated event; compact artifact/replay/reference; source event and provenance; optional share; privacy/visibility checks; recipient handoff to an underlying experience when allowed.

Moment generation must never fabricate rarity, popularity or a result that did not occur.

## MORISE Relay
A shared Moment may expose one controlled transformation to another Player: change one eligible rule, objective, object, scene, music layer or behavior; record sourceRef and contributor; create a new branch/version; preserve original attribution; send the result into existing Social/Play/World contracts.
Relay is contextual and does not create a new navigation surface.

## Living Stories
Validated chains of Moments, Relays and discoveries may be represented as dynamic narrative artifacts or interactive continuations. M03 owns social publication and audience permissions; M15 handles AI transformation/generation; domain owners remain authoritative for game, world and event state.

Lineage must preserve: original event; narrative interpretation; Player transformation; resulting branch; contributors; permissions; version.

## Experience-economy social primitives
M03 also preserves Leave Something for the Next Player; Remix-me on eligible public/shared creations; creator attribution and creative lineage; collaborative media/music contribution chains; contextual discovery broadcast; optional sharing driven by meaningful outcomes.

Private content never becomes public merely because it enters a Moment, Relay or Living Story pipeline.


# D100K — HISTORICAL CONTRACT RESTORATION — M03 SOCIAL

## Restored actions
`createPost`, `editPost`, `deletePost`, `addComment`, `toggleReaction`, `followPlayer`, `createConversation`, `sendMessage`, `markMessageRead`, `getConversationPage`.

Actions with retryable side effects require idempotency. Realtime subscriptions remain scope-filtered to authorized conversations/public social contexts. Conversations are paginated; there is no preload of all private conversations.

## Restored visibility/security
- Messages remain contextual, not a permanent seventh navigation door.
- Block/report policy is evaluated server-side before every social mutation or message send.
- Moderation actions must have an explicit policy/audit path.
- Offline send/retry/reconnect must not duplicate messages.

## Canonical contracts
`Post={id,authorId,body,visibility,createdAt}`
`Conversation={id,memberIds,updatedAt,lastMessageId?}`
`Message={id,conversationId,senderId,body,createdAt,clientNonce,status:'pending'|'sent'|'failed'}`

## D100K proof
RLS/privacy, block override, duplicate send, ordering, reconnect, pagination, unauthorized realtime subscription, delete/edit authorization, mobile keyboard and evidence.



# D100K — EXPLICIT SOCIAL ACTION RESTORATION

M03 supports the explicit player action to report a moderation risk and to modify/delete a publication only when the current server policy authorizes it. A conversation/message surface is opened contextually from Home/profile/notification/deep link rather than as a seventh permanent door.

D100K: report action authorization, moderation audit, edit/delete policy and contextual message navigation.

---

# SOURCE 7 — docs/moirise/modules/M04-world/PLAN.md

# M04 — WORLD — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Décrire une fonction comme « elle existe en France » n'est pas suffisant : la documentation doit pouvoir descendre jusqu'à Paris, la rue, le bâtiment, l'appartement et la porte. Dans MOIRISE cela signifie acteur → déclencheur → préconditions → entrées → étapes → mutation → projection → événement → erreur → reprise → sécurité → tests.

## 1. Owner
M04 possède la surface WORLD, sa contextualisation et ses handoffs. M04 ne devient pas propriétaire des données métier de PLAY, SOCIAL, COMMUNITIES ou EVENTS.

## 2. Home World
**Acteur :** visiteur ou Player.  
**Déclencheur :** ouverture de Home ou retour d'un autre écran.
**Préconditions :** shell READY; contexte minimal disponible.
**Entrées :** session context, locale, viewport, états réels récents autorisés.
**Séquence :** charger contexte minimal → vérifier privacy → sélectionner les 5–6 portes principales → sélectionner seulement les cartes éligibles → rendre LOADING puis READY.
**Mutation :** uniquement impression/dismissal lorsque cela est nécessaire; aucune mutation métier d'une autre feature.
**Projection :** SYSTEM, PLAYER, SOCIAL, WORLD, PLAY, CREATE, plus des cartes contextuelles.
**Échec :** une dépendance optionnelle absente donne DEGRADED; aucune donnée fictive n'est créée.
**Sécurité :** aucun faux compteur, faux utilisateur, fausse récompense ou contenu inventé.
**Tests :** premier passage, session absente, session expirée, aucune carte, source optionnelle indisponible, mobile, desktop.

## 3. Context Cards
**Acteur :** Player.
**Déclencheur :** un événement réel rend une action potentiellement pertinente.
**Préconditions :** source réelle; cooldown absent; player non occupé par une tâche qui doit rester prioritaire.
**Séquence :** récupérer source → vérifier visibilité → calculer pertinence → générer reasonKey → définir expiration/cooldown → afficher → enregistrer dismissal ou action.
**Mutation :** ContextCard + état d'exposition.
**Projection :** une action compréhensible avec raison courte.
**Échec :** source supprimée → carte retirée; player dismiss → suppression temporaire.
**Sécurité :** reasonKey ne doit pas révéler une donnée privée.

## 4. Detours
Un Detour est une possibilité facultative, pas une obligation.
**Suppression obligatoire pendant :** saisie de texte, lecture, partie, création, paiement ou autre tâche où une intervention interrompt l'intention; seuls les cas réellement critiques peuvent contourner cette règle.
**Étapes :** détecter contexte → vérifier signal réel → cooldown → choisir une action → présenter → retour à l'activité.
**Interdit :** faux compte à rebours, fausse rareté, « reviens demain » sans futur Event réel.

## 5. Handoffs
Lorsqu'un Player touche PLAY, CREATE, SOCIAL, PLAYER ou SYSTEM :
1. M04 crée un IntentEnvelope ;
2. il contient originModule, actorRef, intentType, targetRef éventuel, sourceEventRef et UI context minimal ;
3. la destination revalide l'autorisation ;
4. la destination possède la mutation.
M04 ne peut pas écrire directement les tables privées de la destination.

## 6. Solo-first orientation
Première visite :
1. afficher une explication minimale ;
2. donner une action réalisable seul ;
3. présenter ensuite des possibilités sociales sans les rendre obligatoires ;
4. enregistrer l'étape d'orientation ;
5. reprendre au même point en cas de retour.
Aucune progression artificielle n'est accordée pour simplement regarder une carte.

## 7. Shareable Discovery
Le partage suit : source → privacy projection → share token scoped → expiration → projection publique.
Si la source devient privée, le token est révoqué. Une carte publique ne doit jamais contenir une donnée qui n'était visible qu'en privé.

## 8. États
BOOTING → READY.  
READY → CONTEXTUALIZING → READY.  
READY → DEGRADED si dépendance optionnelle indisponible.
Une erreur de rendu ne doit pas supprimer la navigation de secours.

## 9. Données
WorldContext, DoorDefinition, ContextCard, Detour, WorldSurfaceState, IntentEnvelope, ShareToken.

## 10. IA
M15 peut proposer la présentation contextuelle. M04 contrôle l'expérience et applique les suppressions. M15 ne peut pas inventer de futur, d'utilisateur ou de récompense.

## 11. Tests et DONE
Vérifier deep links, refresh, mobile/desktop, suppression pendant typing/reading/playing/creating, absence de faux contenu, handoff refusé, token révoqué, dépendance optionnelle indisponible.

## AI-INTÉGRATION M04 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M04 est le contexte visible de MOIRISE : portes principales, cartes et détours. MORISE AI fournit l'intelligence de contextualisation mais M04 contrôle l'expérience et les suppressions.

### B. AI responsibilities
Classer des actions contextuelles, produire une reasonKey, proposer une carte, détecter une opportunité réelle, contextualiser l'ordre d'affichage et suggérer un handoff.

### C. Context
WorldContext = état courant + viewport + session + signaux réels autorisés + état d'activité. Les signaux sensibles sont minimisés.

### D. Suppressions
Typing, reading, playing, creating et autres tâches prioritaires suppriment les détours non critiques. L'IA ne doit pas réintroduire une carte rejetée par la policy.

### E. Handoff
M04 construit IntentEnvelope. La destination revalide toujours actor/permission/target. M15 ne possède pas la mutation destination.

### F. Interdits
Fausse rareté, faux utilisateur, faux compte à rebours, événement futur inventé, récompense inventée, exposition de signaux privés dans une card publique.

### G. Fallback
AI down = sélection World déterministe et suppression par règles. Le shell reste utilisable.

### H. DONE
Les cards AI sont explicables, suppressibles, bornées par cooldown et privacy et leurs handoffs passent par destination owner.

# D10 — M04 WORLD — EXPANSION COMPORTEMENTALE
## World as projection
WORLD presents safe projections from events, communities, creations, discoveries and adaptive signals. It does not own source mutations.
## Exploration
ENTER → CONTEXT → DISCOVER → INTERACT → HANDOFF. Every handoff references an owner capability.
## Social world
Public media, games, events and community activity may appear as World objects when visibility/safety allow it. Private content never becomes a world object accidentally.
## Adaptive surfaces
M13 may propose changes; M04 applies only validated projections. World novelty must be bounded.
## Viral discovery
World can expose “why this is here” explanation keys, related creations, playable actions or community context without fabricating popularity.
## DONE
World deep-link, empty real state, safe projections, deletion propagation, blocked item filtering, adaptive update fallback and mobile/desktop verified.

# D100K — M04 World — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M04. Scope: world surfaces, contextual handoffs, adaptive presentation. Dependencies: M01,M02,M03,M05,M07,M13.
Primary invariant: World is projection/orchestration surface, not owner of others' state.

For every capability of M04, the canonical state transition is:
ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

No capability is complete if an implementation decision remains inferable from prose alone.

## 2. Forbidden states
A transition must have zero mutation when:
- authorization fails;
- input/schema validation fails;
- required version is incompatible;
- target is outside owner scope;
- idempotency conflict occurs;
- a required authoritative dependency is unavailable.

## 3. AI boundary
AI/M15 may propose, classify, summarize or generate candidates only within the capability contract. M04 remains the owner of its authoritative state. AI output without validated evidence is non-authoritative.

## 4. Proof obligations
Each user-visible capability must prove:
SUCCESS + EMPTY/NO-DATA + ERROR + UNAVAILABLE/DEGRADED where applicable + REFRESH/REOPEN + MOBILE + DESKTOP + PERMISSION DENIAL + RETRY/REPLAY behavior.

## 5. Change-impact obligation
A change to a M04 contract requires traversal:
M04 → direct consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience scenarios.
Unknown impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
- owner authority cannot be bypassed;
- duplicate commands do not duplicate authoritative mutation;
- stale versions do not silently overwrite newer state;
- projections can be rebuilt from authoritative state;
- privacy/visibility constraints survive every handoff;
- VERIFIED cannot be emitted without applicable evidence.

## 7. Completion
D100K means the feature definition is machine-checkable. It does not mean the code is already fabricated.


# RECOVERED WORLD / EXPERIENCE ECONOMY FUSION — 2026-10-03

## Personal evolving world
M04 preserves the World-facing projection of a real personal world state: environments, objects, characters, narrative fragments, music identity, visual identity, unlocked interaction patterns, Living Objects and contextual discoveries. Durable state remains owned by its canonical module; M04 presents only authorized projections and handoffs.

## Asynchronous traces and discovery
The World may expose a validated trace left by another Player, a discovery broadcast, a Living Museum item, a hidden area or an unexplored path when visibility and permissions allow. Encountering a trace never grants access to private data.

## Return-after-absence
When an eligible real state changed during the Player's absence, World may present the concrete consequence on return. It must never fabricate activity, messages, scarcity or social proof.

## Continuation
A World projection after First Contact can point to a real next possibility: changed world state, discovered path, playable experience, mission, object evolution or collective opportunity. The handoff is contextual and reversible.


# D100K — HISTORICAL CONTRACT RESTORATION — M04 WORLD

## Restored world contracts
M04 remains the owner of the coherent world model: zones, nodes, themes, categories, contextual navigation metadata and feature availability. It does not own progression, games or AI internals.

`WorldZone={id,key,titleKey,descriptionKey,order,enabled,version}`
`WorldNode={id,zoneId,kind,targetRef,visibility}`
`WorldContext={zoneId,locale,playerId,availableActions}`

World configuration is server-authoritative and versioned. Public world metadata may be cached by version/locale; Player-specific availability must never be mixed into a public cache entry. World events are emitted only after authoritative persistence.

## D100K proof
Stale version, unauthorized global mutation, personalized-cache leakage, missing node, disabled zone, locale fallback, authoritative persistence failure and rebuildable projection.



# D100K — RESTORED LIVING WORLD / HIDDEN AREAS

M04/M13 support a versioned world-memory surface. Real validated Player actions may alter world state, reveal hidden map areas or open discoverable routes. Unlock state must be persisted and attributable.

Public cache never contains Player-specific discovery conditions. A hidden area is discoverable only from a real rule/event/condition; no fake secret marker is rendered.

D100K: hidden-area false positive, stale world version, unauthorized unlock, cache leak, replayed discovery event, deletion/recovery and mobile navigation.



# D100K — RESTORED WORLD REACTIVITY CONTRACT

World is presented as a place that reacts to real Player actions, not as a directory of feature buttons. Even with one Player, the World can provide exploration, discovery, deterministic challenges, evolving objects, memories, contextual SYSTEM opportunities and asynchronous traces.

World mechanisms such as World Memory, Living Objects, World Agents, anomaly detection and Convergence are cross-module capabilities owned according to the current master ownership map; they never create new global navigation doors.

D100K: one-player mode, real world mutation, anomaly provenance, versioned snapshots and dependency-degraded rendering.

---

# SOURCE 8 — docs/moirise/modules/M05-system/PLAN.md

# M05 — SYSTEM / PROGRESSION / EVOLUTION — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Le SYSTEM est le langage d'interaction de MOIRISE. Une description du type « le système donne de l'XP » est insuffisante. Il faut préciser : quelle action produit le signal, qui valide le signal, quelle règle est chargée, quelle transaction écrit l'XP, quel événement prouve le commit, ce que le Player voit et comment un retry est traité.

## 1. Owner
M05 possède la progression visible et les mutations de progression : XP, niveaux, ranks, missions, achievements, présentation des titres et orchestration visuelle SYSTEM. M14 possède le ledger de récompenses/collection; M15 propose de l'intelligence mais ne possède aucune de ces mutations.

## 2. SYSTEM HUD
**Acteur :** Player.
**Déclencheur :** ouverture /system ou possibilité contextuelle autorisée.
**Préconditions :** session valide ou état visiteur explicitement prévu.
**Séquence :** charger progression confirmée → charger objectifs actifs → charger cards contextuelles autorisées → appliquer suppression si Player est en train d'écrire/lire/jouer/créer → composer HUD → afficher.
**Mutation :** aucune lors d'un simple affichage.
**Projection :** statut, progression, objectif, découverte ou prochaine action; pas de mur de messages SYSTEM.
**Échec :** M15 indisponible → statut de base reste disponible; source progression indisponible → ERROR/RETRY.

## 3. XP
**Déclencheur :** événement de résultat validé provenant de M06, M12 ou une autre source autorisée.
**Préconditions :** source event signé, owner connu, ruleVersion connue, événement non déjà consommé.
**Séquence exacte :** vérifier event → charger règle → calculer entitlement → créer XPTransaction avec sourceEventId+ruleVersion → commit atomique → recalculer projection → publier XP_GRANTED.
**Interdit :** le navigateur ou M15 ne peut pas appeler « grant XP » avec une valeur arbitraire.
**Retry :** même sourceEventId + règle = même transaction.

## 4. Level et Rank
Une fois XP commitée :
1. lire les seuils de la règle versionnée ;
2. calculer le niveau résultant ;
3. comparer au niveau précédent ;
4. écrire uniquement si différent ;
5. publier LEVEL_CHANGED/RANK_CHANGED ;
6. déclencher la présentation d'un milestone.
Une migration de règle ne modifie pas silencieusement l'histoire; elle produit une nouvelle version ou un correctif explicite.

## 5. Titles / Achievements
**Données nécessaires :** definitionId, ruleVersion, evidenceRefs, unlock condition.
**Séquence :** recevoir evidence → vérifier que la preuve appartient au Player → calculer éligibilité → créer unlock idempotent → transmettre ownership à M14 si nécessaire.
Une sortie IA qui « pense que le joueur mérite » n'est pas une preuve d'éligibilité.

## 6. Missions
Mission = définition + instance Player + progression.
**Création :** candidate validée → prerequisites → instance ACTIVE.
**Progression :** seuls les événements définis dans le contrat peuvent avancer une mission.
**Completion :** vérifier chaque condition à partir d'états autoritatifs → marquer COMPLETED → déclencher handoff reward.
**Échec :** FAILED seulement lorsqu'une règle d'échec réelle existe. Pas d'échec inventé.
**Reconnexion :** progression recalculable/idempotente à partir des events acceptés.

## 7. Trace
Trace n'est pas un journal de données privées. Elle conserve les jalons utiles au Player : création, découverte, progression, accomplissement, erreurs utiles et transformations Living Object approuvées.
Chaque entrée possède sourceRef, type, timestamp, privacyClass et deletion behavior.

## 8. Fun & Surprise
**Éligibilité :** signal réel + contexte approprié + cooldown + budget de fréquence.
**Suppression absolue :** typing, reading, gameplay actif, creation flow sauf intervention réellement critique.
**Séquence :** candidate → policy → presentation → reaction → cooldown.
Aucune surprise ne doit créer une fausse rareté, une fausse urgence ou un futur inexistant.

## 9. Hidden Possibilities / Unexplored Paths
Ce sont des possibilités générées à partir d'états existants, jamais des récompenses cachées attribuées automatiquement.
Une possibilité doit avoir sourceRef, reasonKey, expiration/cooldown et action possible.
Dismissal = suppression temporaire; absence d'un signal réel = aucune possibilité.

## 10. États
SYSTEM IDLE → CONTEXTUALIZING → READY.
Mission AVAILABLE → ACTIVE → COMPLETED ou FAILED.
Title LOCKED → UNLOCKED → EQUIPPED/UNSELECTED.
Toute mutation est idempotente.

## 11. Données
SystemContext, SystemCommand, XPTransaction, ProgressionProjection, LevelRule, RankRule, TitleDefinition, UnlockedTitle, Achievement, Mission, MissionProgress, TraceEntry, SurpriseCandidate, DNAProjection.

## 12. Sécurité
Server authority. Le client ne peut créer XPTransaction, MissionCompletion, UnlockTitle ou RankChange. M15 n'a pas accès direct aux tables M05.

## 13. Cross-module
M06 fournit les résultats de jeu validés. M12 fournit les résultats d'événements. M14 applique collection/reward grants. M15 fournit contexte/propositions. M05 reste la décision finale sur progression.

## 14. Tests et DONE
Tester XP doublée, résultat falsifié, replay event, level boundary, title déjà débloqué, mission avec progression hors ordre, surprise supprimée pendant typing, provider AI down, mobile, desktop, réseau perdu après commit.

## AI-INTÉGRATION M05 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M05 est l'autorité absolue de progression visible et de ses mutations. MORISE AI peut comprendre le Player et proposer des candidats, mais ne peut pas attribuer de progression.

### B. AI cases
Mission candidate, title candidate, achievement explanation, next-action proposal, contextual surprise candidate, progression explanation, SYSTEM wording localisé, pattern analysis.

### C. Evidence rule
Toute proposition M15 doit référencer une evidence réelle : event, Player state, rule version, context snapshot ou autre source autorisée. Une « intuition AI » n'est pas une preuve d'éligibilité.

### D. XP
M15 peut analyser ou expliquer. Seul le pipeline M05 valide sourceEventId + ruleVersion + entitlement et écrit XPTransaction.

### E. Titles/missions
M15 peut proposer une définition/candidate. M05 vérifie prerequisites, evidence et ruleVersion puis crée l'instance/unlock.

### F. Surprise
AI candidate → policy → suppression activité → cooldown → presentation budget → reaction. Aucun faux futur ni fausse rareté.

### G. Fallback
M15 unavailable ne bloque jamais le cœur XP/level/rank/mission déjà déterministe.

### H. DONE
Tests prouvent qu'un provider ou M15 ne peut ni écrire le ledger XP, ni forcer un title, ni terminer une mission, ni bypasser une règle.

# D10 — M05 SYSTEM — EXPANSION COMPORTEMENTALE
## SYSTEM visibility
Le SYSTEM est une couche contextuelle, pas une suite de popups. Il peut présenter une suggestion, progression, mission, titre, recommandation créative, alerte ou handoff seulement quand le contexte le justifie.
## Progression
EVENT_VALIDATED → PROGRESSION_RULE → XP/TITLE/MISSION_PROPOSAL → OWNER_VALIDATION → COMMIT → SYSTEM_PROJECTION. M15 ne donne jamais directement XP/titres.
## Adaptive messaging
Le texte du SYSTEM dépend du contexte, mais les règles de mutation sont déterministes et versionnées. AI peut proposer la présentation, pas modifier le ledger.
## Viral hooks
Achievements and creations can produce shareable projections: title reveal, challenge result, creation transformation, game result. Sharing is optional and respects privacy.
## Surprise
Fun & Surprise can schedule bounded surprises from real state. No fake scarcity or fake urgency. Surprise must be reversible/observable.
## DONE
Progression remains correct when AI is unavailable; SYSTEM overlays never block reading/playing/creating; duplicate events cannot award twice.

# D100K — M05 System / Progression — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M05. Scope: XP/levels/rank/titles/missions/SYSTEM presentation. Dependencies: M01,M02. Primary invariant: M05 alone validates progression authority.
For every capability: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
Authorization failure, invalid schema, incompatible version, ownership violation, idempotency conflict or critical dependency failure must produce zero unauthorized authoritative mutation.

## 3. AI boundary
M15 may propose or analyze only through capability contracts. M05 remains authoritative for XP/levels/rank/titles/missions/SYSTEM presentation.

## 4. Proof obligations
SUCCESS + NO-DATA + ERROR + DEGRADED/UNAVAILABLE + REFRESH/REOPEN + DESKTOP + MOBILE + PERMISSION DENIAL + RETRY/REPLAY where applicable.

## 5. Impact obligation
M05 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. UNKNOWN impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
Owner authority cannot be bypassed; duplicate commands cannot duplicate authoritative mutation; stale versions cannot silently overwrite current state; projections remain rebuildable; privacy survives handoffs; VERIFIED requires applicable evidence.

## 7. Completion
This D100K section defines what must be provable. It does not claim implementation completion.


# RECOVERED FIRST CONTACT + EXPERIENCE EVOLUTION FUSION — 2026-10-03

## First Contact
First Contact is the canonical first-session experience layer, not a new module.

Target: approximately two minutes, with flexible termination when the meaningful discovery is reached.

Canonical sequence:
1. SYSTEM invitation with one immediate meaningful choice;
2. small interactive objective or micro-world;
3. real-time observation of permitted actions;
4. auditable anomaly or reaction when an unusual valid action occurs;
5. bounded adaptation of objective, rules or options;
6. reveal and temporary, non-sensitive session descriptor;
7. contextual continuation grounded in a real resulting state.

Historical example dialogue may inspire presentation but is not an immutable script. The SYSTEM must not pretend to observe actions it did not observe. AI failure uses deterministic fallback.

## Post-contact continuity
Continuation may expose a real unanswered discovery, new path, changed object/world state, contextual mission, new playable experience, validated experiment, music/audio reaction or collective possibility. No fake anomaly, fake scarcity or fabricated personalization is allowed.

## Evolution mechanics restored from historical V3
M05 explicitly preserves these presentation/experience projections of the Evolution Engine: Trace; Living World; Hidden Possibilities; Unexplored Paths; Evolving Identity; MORISE Double; Fun & Surprise; Emergent Experience patterns; SYSTEM companion continuity.

Durable lifecycle remains with the owner defined by the canonical architecture. M05 owns how eligible progression/evolution state is presented through SYSTEM and how progression-sensitive mutations are authorized.


# D100K — HISTORICAL CONTRACT RESTORATION — M05 SYSTEM

## Restored contracts
`Progression={playerId,level,xp,rank,version}`
`XPEvent={id,playerId,source,amount,idempotencyKey,ruleVersion,createdAt}`
`SystemNotice={id,playerId,kind,priority:'low'|'normal'|'high',readAt?}`

Canonical operations:
`getProgression`, `recordValidatedProgressionEvent`, `listSystemNotices`, `markSystemNoticeRead`, `explainProgression`.
Only the first two mutate authoritative progression and both are server-authorized.

Authoritative sequence:
`validated source event → authorize → validate amount/source → insert XP event → recompute progression → emit SYSTEM notice → invalidate player cache`.

Rules are immutable/versioned after publication. Retries use idempotency. Negative/overflow/impossible source events are rejected. Low-priority notices are grouped to prevent SYSTEM spam. AI can explain or recommend; it cannot grant XP, alter rank/rules or validate its own source event.

## Contextual experience
M05 may present a contextual SYSTEM experience when a real eligible signal exists. It must never fabricate rewards, counters, events or notifications.

## D100K proof
Exact threshold boundaries, concurrent grants, duplicate events, forged payloads, ruleset upgrades, rollback, notice grouping/read state, reconnect, mobile HUD, provider outage and no-AI fallback.



# D100K — RESTORED SYSTEM COMPANION / MEMORY CARD BEHAVIOR

A validated meaningful event may become a Personal Moment or Shareable Memory Card. Examples include a first discovery, surprising world reaction, unusual creation or validated challenge result. The artifact preserves provenance and visibility.

SYSTEM companion continuity may surface selected persisted memories, propose a follow-up experiment or explain progression. It must never fabricate a past interaction.

A Player may leave something for a future Player: puzzle, object, message, sound, scene, micro-story, challenge or permitted rule modification. Attribution and privacy are mandatory.

Future-return prompts require a real persisted backing state and remain dismissible.

D100K: fabricated-memory attempt, deleted source, privacy mismatch, stale reference, unauthorized share, duplicate card and no-AI deterministic presentation.



# D100K — RESTORED SYSTEM PRESENTATION CONTRACT

SYSTEM is the central orchestration/presentation layer, not a permanent chatbot window. It may appear through contextual cards, status changes, short messages, suggestions, reactions, discovery moments and Play transitions.

Progressive disclosure prevents UI overload. SYSTEM messages are grouped/rate-limited by policy; low-value interactions do not generate constant text spam. Internal capabilities appear only when a real condition, event, availability state or contextual usefulness justifies them.

D100K: message flood, repeated click, unavailable capability, long text, mobile HUD and reduced-motion presentation.



# D100K — RESTORED V1 PROGRESSION CONTRACT

### Starting state
Every Player entering the SYSTEM for the first time must have:
- level = 1;
- total XP = 0;
- all seven v1 dimensions = 0;
- one initialization memory derived from a real Player creation event.

### Canonical v1 dimensions
`exploration`, `creation`, `knowledge`, `social`, `community`, `play`, `contribution`.

The dimension key remains extensible; a future dimension requires a controlled versioned migration.

### Canonical v1 level curve
`threshold(1)=0`.
For level >= 2:
`threshold(level)=floor(100 * (level-1)^1.65)`.

Level = greatest L >= 1 where total XP >= threshold(L).

The progression UI uses:
- current level;
- current total XP;
- XP remaining to next level;
- current-level percentage.

Changing the curve requires an explicit ruleset/version migration; no silent formula replacement is allowed.

### First positive XP event
Event type: `player_identity_completed`.

Only valid after the Player's existing onboarding/identity state changes from false to true following a valid server-authorized identity save.

V1:
- reward = 25 XP;
- no dimension assignment;
- one deterministic memory;
- exactly once per Player;
- replayed save cannot grant a second award.

Opening SYSTEM never grants XP.

### D100K
Test zero state, seven zero dimensions, exact threshold boundaries, curve version, 25 XP milestone, concurrent duplicate milestone requests, forged playerId, replayed save and provider/M15 outage.

---

# SOURCE 9 — docs/moirise/modules/M06-play/PLAN.md

# M06 — PLAY — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
PLAY n'est pas « une page qui lance un jeu ». La chaîne exacte est : expérience sélectionnée → version publiée → compatibilité → session serveur → runtime → tentative → validation → résultat autoritatif → progression/récompense éventuelle → partage.

## 1. Owner
M06 possède l'expérience de jeu côté produit, les PlaySession, la coordination des résultats et la reprise. M07 choisit les candidats. M09 fournit le runtime. M05/M14 décident respectivement progression et économie.

## 2. Sélection
**Acteur :** Player.
**Déclencheur :** ouverture de PLAY.
**Préconditions :** catalogue lisible.
**Séquence :** demander candidates à M07 → filtrer visibilité, publication, device et runtime → afficher preview → n'appeler le runtime qu'après Start.
Aucun rendu de carte de jeu ne doit démarrer une session.
**Échec :** M07 absent → fallback catalogue déterministe; aucun jeu inventé pour remplir la page.

## 3. Launch
**Acteur :** Player.
**Déclencheur :** tap Start.
**Préconditions :** gameVersion immutable publiée, Player autorisé, runtime compatible.
**Séquence :**
1. vérifier activeVersion ;
2. vérifier policy ;
3. créer commandId ;
4. créer PlaySession côté serveur ;
5. allouer runtime ;
6. transmettre manifest minimal ;
7. marquer STARTING ;
8. seulement ensuite lancer ACTIVE.
**Mutation :** PlaySession.
**Retry :** même commandId retourne la même session ou son état.
**Échec :** allocation runtime échouée → session ABORTED/preview conservée.

## 4. Runtime attempt
Le client/runtime fournit des actions et des snapshots, jamais la décision de récompense.
**Sandbox :** filesystem limité, réseau limité, pas de secrets production, CPU/RAM/temps bornés.
Les snapshots sont versionnés et checksummés lorsqu'ils sont persistés.
Crash → dernier snapshot valide ou RESTART, jamais un score inventé.

## 5. Résultat
**Trigger :** finish, timeout ou quit.
**Validation exacte :**
- session appartient au Player ;
- session ACTIVE ;
- gameVersion/rulesVersion correspondent ;
- transitions autorisées ;
- score dans bounds ;
- completion rule satisfaite ;
- attempt non déjà consommée.
Puis créer AuthoritativeResult une seule fois.
Un résultat INCONCLUSIVE n'appelle pas M05/M14 comme s'il était valide.

## 6. Sauvegarde / reprise
Save = schemaVersion + payload bounded + checksum + updatedAt.
Au Resume : session ownership → checksum → schema compatibility → migration connue uniquement → reprise.
Schema inconnu = INCOMPATIBLE et proposition de restart, pas lecture arbitraire.

## 7. Partage
Après résultat validé : result → privacy projection → M03 ShareToken.
Tap Share n'entraîne jamais une publication publique automatique d'une session privée.

## 8. États
DISCOVERED → PREVIEWED → STARTING → ACTIVE → FINISHED/ABORTED.
Save : VALID → STALE/INCOMPATIBLE.
Result : PENDING → VALID / INCONCLUSIVE.

## 9. Données
ExperienceRef, PlaySession, RuntimeSnapshot, SaveRecord, AttemptEvidence, AuthoritativeResult, MomentRef.

## 10. Security
Toutes les décisions de score/récompense sont serveur-authoritative. Toute tentative d'envoyer un score hors bounds ou un sessionId d'un autre Player est rejetée.

## 11. Tests
Launch double tap; expired session; runtime crash; malicious result; score overflow; replay same result; save corruption; mobile; desktop; offline/degraded network; share privacy revoked.

## AI-INTÉGRATION M06 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M06 est l'autorité produit des PlaySession, du lancement/reprise et de l'admission du résultat autoritatif. M15 peut assister le jeu mais ne décide jamais du score ou de la récompense.

### B. AI cases
Aide contextuelle, adaptive content autorisé, génération de variantes de contenu déjà prévues par la GameSpecification, analyse de session et suggestions post-partie.

### C. Contexte
Player/session/gameVersion/rulesVersion/runtimeCapabilities et seulement les snapshots autorisés. Aucun accès aux secrets ou aux tables économiques.

### D. Résultat
Runtime evidence → M06 validator → VALID/INVALID/INCONCLUSIVE → AuthoritativeResult. Une sortie AI ne peut pas devenir un score valide sans passer cette chaîne.

### E. Fallback
Le jeu doit continuer sans IA lorsqu'un contenu adaptatif n'est pas critique. Sinon UNAVAILABLE explicite, jamais résultat inventé.

### F. DONE
Tests couvrent runtime AI down, résultat falsifié par AI/client, version mismatch, retry et reprise.

## GAME PLATFORM — INTÉGRATION M06 / PLAY

M06 ne fabrique pas le moteur des jeux. Il transforme un GameBuild validé en expérience jouable dans MOIRISE.

Flux obligatoire : GameBuild VALIDATED → vérifier publication/version/device compatibility → créer PlaySession → demander RuntimeRef à M09 → démarrer → collecter evidence → valider résultat → produire AuthoritativeResult → handoff M05/M14/M10 selon contrats → partage via M03.

M06 consomme le RuntimeManifest produit/validé par M09. Il ne choisit pas arbitrairement l'engine ou la sandbox. Une incompatibilité device déclenche uniquement le fallback défini ou UNAVAILABLE.

La grande porte PLAY reste stable pour l'utilisateur. Les détails 2D/3D sont internes à l'expérience.

DONE : un jeu fabriqué par M08 et validé par M09 peut être lancé, repris, terminé et partagé sans recopier la logique de session dans chaque jeu.

# D10 — M06 PLAY — EXPANSION COMPORTEMENTALE
## Play entry points
PLAY may start from catalog, post, Reel, Story, DM, group, event, World or challenge. The entry always resolves to a validated GameBuild reference.
## Session
OPEN_GAME → DEVICE_CHECK → LOAD_MANIFEST → START → PLAY → RESULT → VALIDATE → COMMIT → SHARE/REMATCH/HANDOFF.
## Social result loop
A result may generate a compact share card, challenge invitation or group rematch. It never falsifies scores or rankings.
## Media-to-game
M15 may transform an authorized media concept into a game requirement; M08 builds; M09 runs; M06 launches and validates result.
## Viral protection
Sharing a game must not bypass content/safety/publication checks. Failed builds are never exposed as playable links.
## DONE
2D/3D build, result integrity, resume/retry, social entry, network loss, mobile controls and desktop controls all work with real states.

# D100K — M06 Play — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M06. Scope: PlaySession, launch/resume, result admission. Dependencies: M01,M02,M05,M09. Primary invariant: client/runtime never becomes result authority.
For every capability: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
Authorization failure, invalid schema, incompatible version, ownership violation, idempotency conflict or critical dependency failure must produce zero unauthorized authoritative mutation.

## 3. AI boundary
M15 may propose or analyze only through capability contracts. M06 remains authoritative for PlaySession, launch/resume, result admission.

## 4. Proof obligations
SUCCESS + NO-DATA + ERROR + DEGRADED/UNAVAILABLE + REFRESH/REOPEN + DESKTOP + MOBILE + PERMISSION DENIAL + RETRY/REPLAY where applicable.

## 5. Impact obligation
M06 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. UNKNOWN impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
Owner authority cannot be bypassed; duplicate commands cannot duplicate authoritative mutation; stale versions cannot silently overwrite current state; projections remain rebuildable; privacy survives handoffs; VERIFIED requires applicable evidence.

## 7. Completion
This D100K section defines what must be provable. It does not claim implementation completion.


# RECOVERED PLAY / MOMENT / SOCIAL CHALLENGE FUSION — 2026-10-03

## Result-driven Moments
A validated Play result may become a Moment candidate or shareable result card when it is genuinely meaningful. The result remains authoritative in M06; M03 controls social publication and M05/M14 control progression/reward ownership.

## Proof of Impossible
Play may expose a beat-my-result or proof challenge based on a real score, time, puzzle solution or other validated outcome. A recipient must be challenged against the actual source result; no fabricated record is permitted.

## Async challenge families
Preserved Play-compatible patterns include Duel, beat-my-score, beat-my-time, solve-my-puzzle, survive-my-rules and remix-my-world where the authoritative owner contracts permit them. Real-time multiplayer is not required when asynchronous play provides the intended value.


# D100K — HISTORICAL CONTRACT RESTORATION — M06 PLAY

## Restored contracts
`PlayEntry={gameId,title,mode:'2d'|'3d',status:'ready'|'processing'|'unavailable',packageVersion,thumbnailRef?}`
`PlaySession={id,gameId,playerId,startedAt,endedAt?,status:'active'|'completed'|'aborted'}`

Canonical launch sequence:
`select → authorization/eligibility → package metadata → integrity/version check → preload → M09 mount → create session → play → result/save → unmount → history`.

Dynamic difficulty is permitted only when bounded by GameSpecification/rules; it cannot rewrite authoritative scoring rules. Runtime memory must be released after the session whenever technically possible.

## D100K proof
Unauthorized launch, missing/invalid package, version mismatch, runtime unavailable, duplicate result, dynamic difficulty bounds, save failure, cleanup/unmount, reconnect, worker loss and mobile/desktop Play.



# D100K — RESTORED EXPERIENCE FAMILIES / CONSEQUENCE BRANCHING

PLAY remains one primary entry surface. Historical experience families are retained as content patterns behind it:
- Pulse: short skill/reaction/memory/rhythm challenges;
- Drift: small exploration micro-worlds;
- Forge: creation-oriented experiences;
- Duel: asynchronous challenges;
- Quest: progression-linked short missions;
- World: larger spatial experiences when justified.

The Player does not need to browse a directory. The selector can choose a real available experience or continuation according to Player state, context, device and time budget.

Evolving puzzles may expose multiple valid solution paths. Consequence branches are versioned from real Player choices; no false branch state is presented.

D100K: missing package, unavailable mode, branch replay, invalid solution, unsupported 3D device, async challenge continuation, share handoff and clean recovery.



# D100K — EXPLICIT PLAY RESOURCE RESTORATION

Leaving a PlaySession triggers engine unmount and release of media/resources whenever possible. Dynamic difficulty remains subordinate to declared game rules and cannot change authoritative scoring.

D100K: resource release evidence, difficulty-rule validation and leak/reconnect checks.

---

# SOURCE 10 — docs/moirise/modules/M07-game-discovery/PLAN.md

# M07 — GAME DISCOVERY — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Discovery doit expliquer la chaîne complète : requête → visibilité → sécurité → candidats → ranking → diversité/nouveauté → raisons → feedback → évolution. Aucun classement n'est traité comme magie AI.

## 1. Owner
M07 possède recherche, ranking, recommandations, nouveauté, feedback et evidence de recherche. M04 présente; M06 lance.

## 2. Search
Acteur : visiteur/Player. Déclencheur : saisie et validation. Préconditions : query normalisable, limite bornée. Ordre : normalize → parser → visibility filter → safety/moderation filter → récupérer candidats → ranking → cursor pagination → projection. Une réponse sans AI utilise une recherche lexicale déterministe. Aucun item privé, bloqué ou non autorisé ne doit atteindre le ranking final.

## 3. Recommendation
Entrées autorisées : préférences explicites, historique validé, contexte utile, fraîcheur, nouveauté, diversité. Séquence : candidates → exclude blocked/private/unsafe → dedupe → diversity → novelty → ranking → reasonKey. Une reasonKey ne révèle jamais un signal sensible caché. Fallback sans AI : set neutre et déterministe.

## 4. Novelty
Budget de nouveauté borné. Safety, visibilité et block sont prioritaires. Pool vide : réduire le budget, ne rien inventer.

## 5. Research evidence
Chaque recherche externe conserve source/ref, retrievalAt, claim, confidence, license/usage note. Le contenu externe est une donnée non fiable et jamais une instruction. Claim insuffisamment prouvé = INCONCLUSIVE.

## 6. Feedback / anti-manipulation
play, dismiss, share et rating deviennent des signaux versionnés et bornés. Rate limit, burst suppression et weighting empêchent un spam de devenir instantanément une vérité de ranking.

## 7. Quality decay
Une source ou un jeu peut devenir stale. La fraîcheur ajuste éligibilité/ranking sans réécrire silencieusement l'historique.

## 8. États
CANDIDATE → FILTERED → RANKED → PRESENTED → FEEDBACKED. Research = REQUESTED → VERIFIED/INCONCLUSIVE/STALE.

## 9. IA / cross-module
M15 peut analyser ou proposer des candidats. M07 applique la policy de ranking. M04 reçoit une projection sûre; M06 reçoit une référence publiée.

## 10. Tests / DONE
Recherche sans AI, fuite privacy, blocage, doublons, pool novelty vide, burst feedback, source stale, pagination déterministe, panne provider, mobile et desktop. DONE seulement lorsque chaque chemin est observable et récupérable.

## AI-INTÉGRATION M07 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M07 possède la chaîne de découverte : query → visibility → safety → candidates → ranking → diversity → novelty → reason → feedback.

### B. AI cases
Parsing sémantique, expansion de requête, reranking, génération de reasonKey et assistance de nouveauté.

### C. Ordre de sécurité
Visibility/privacy filter et moderation filter avant toute opération IA sur les candidats. L'IA ne doit jamais voir un item que l'utilisateur n'est pas autorisé à découvrir.

### D. Ranking
AI score = signal parmi d'autres, jamais autorité absolue. Le résultat final est assemblé par M07 et reste déterministe lorsque l'IA est indisponible.

### E. Feedback
Les retours utilisateur sont des signaux versionnés, dédupliqués et bornés. L'IA ne doit pas fabriquer des préférences à partir d'un simple clic ambigu.

### F. DONE
La découverte fonctionne avec baseline sans IA et ne réintroduit jamais blocked/private items.

## GAME PLATFORM — INTÉGRATION M07 / DISCOVERY

M07 traite les jeux comme des Experience/GameBuild versionnés, jamais comme du code arbitraire.

Seules les versions PUBLISHED et autorisées par visibility/safety/privacy entrent dans le catalogue.

Les métadonnées de découverte peuvent inclure genre, mode 2D/3D, durée, contrôles, difficulté, tags, version et compatibilité device.

M07 ne crée jamais un faux jeu pour remplir le catalogue. Une version retirée disparaît de la projection discovery.

## 11. CREATIVE SOCIAL DISCOVERY
M07 also owns discovery ranking for public social media projections consumed by SOCIAL/WORLD/PLAY. It must not create a second feed owner.

Candidate flow for public media:
`candidate → visibility → block/mute → recommendation eligibility → safety → dedupe → quality floor → diversity → novelty → relevance/personalization → ranking → reasonKey → projection`.

Signals may include watch choice, completion, dwell quality, explicit likes/dislikes/not-interested, shares, follows, saves, freshness, novelty and creator diversity. Signals are versioned and rate-limited.

## 12. Friends/interest projection
M07 may expose compact projections such as `FRIENDS_ACTIVITY`, `NEW_FOR_YOU`, `YOUR_GROUP_LIKES`, `CREATIVE_TO_TRY` when the underlying public/permissioned activity is eligible. It never exposes hidden private activity.

## 13. Creation-loop discovery
A public creation may expose `CREATE_FROM_CONCEPT` as a capability. The user receives a new creative brief rather than a copy instruction. Source attribution and permission state travel with the candidate.

## 14. Viral share signal
A share is a discovery signal only after dedupe/burst controls. Recipient opens and meaningful downstream actions may increase relevance; repeated self-sharing or automated bursts must not manufacture ranking.

## 15. Tests
Public Reel discovery, Story discovery within lifetime, expired Story exclusion, friend activity privacy, not-interested suppression, originality-inconclusive candidate handling, share burst suppression, creator diversity, cold-start discovery and fallback without AI.

# D10 — M07 GAME DISCOVERY — EXPANSION COMPORTEMENTALE
## Discovery universe
M07 ranks games and also provides transferable discovery primitives to public media only when the owner contract delegates that projection. It never invents catalogue entries.
## Candidate pipeline
REQUEST → NORMALIZE → VISIBILITY → SAFETY → COMPATIBILITY → DEDUPE → DIVERSITY → NOVELTY → RANKING → REASON → PROJECTION.
## Social context
Friend activity, group interest, recently played and creator affinity are bounded signals. No sensitive inference.
## Viral hooks
“Play because…”, “friend played”, “created for your group”, “new for you” and “remix this concept” are reason keys tied to factual evidence.
## Cold-start
First-session ranking mixes explicit interests, diverse real popular content, novelty and short games; no fake personalization.
## DONE
Ranking works without AI and remains safe when AI scores disappear or stale data exists.

# D100K — M07 Game Discovery — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M07. Scope: candidate discovery, ranking, recommendations. Dependencies: M01,M02,M03,M06,M13. Primary invariant: ranking is explainable and no fake engagement signals.
For every capability: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
Authorization failure, invalid schema, incompatible version, ownership violation, idempotency conflict or critical dependency failure must produce zero unauthorized authoritative mutation.

## 3. AI boundary
M15 may propose or analyze only through capability contracts. M07 remains authoritative for candidate discovery, ranking, recommendations.

## 4. Proof obligations
SUCCESS + NO-DATA + ERROR + DEGRADED/UNAVAILABLE + REFRESH/REOPEN + DESKTOP + MOBILE + PERMISSION DENIAL + RETRY/REPLAY where applicable.

## 5. Impact obligation
M07 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. UNKNOWN impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
Owner authority cannot be bypassed; duplicate commands cannot duplicate authoritative mutation; stale versions cannot silently overwrite current state; projections remain rebuildable; privacy survives handoffs; VERIFIED requires applicable evidence.

## 7. Completion
This D100K section defines what must be provable. It does not claim implementation completion.


# D100K — HISTORICAL CONTRACT RESTORATION — M07 DISCOVERY

## Restored contracts
`DiscoveryQuery={text?,kinds?,tags?,cursor?,limit,locale}`
`Candidate={id,kind,score,reasons[]}`
`DiscoveryResult={items:Candidate[],nextCursor?,rankingVersion}`

M07 retrieves a bounded candidate set from authoritative public catalog data, applies deterministic relevance/freshness/diversity rules, then presents the result. Recommendations use explicit preferences, safe history and permitted aggregate signals; popularity/ratings are never fabricated.

AI recommendation is optional and must not be regenerated on every scroll. Deterministic fallback remains available. Catalog pagination and lazy thumbnail loading are required.

## D100K proof
Cursor replay, duplicate candidates, stale rankingVersion, empty catalog, deterministic tie-breaking, fabricated metric prevention, AI/provider outage, cache isolation, unauthorized private candidate leakage and mobile scroll behavior.



# D100K — EXPLICIT DISCOVERY GENERATION RESTORATION

AI recommendations are not regenerated on every scroll. The discovery surface uses bounded paginated queries, lazy thumbnails and cached public metadata. When deterministic ranking is sufficient it is preferred; AI remains an optional enhancement.

D100K: repeat-scroll stability, query bounds, cache separation and provider-free discovery.

---

# SOURCE 11 — docs/moirise/modules/M08-game-factory/PLAN.md

# M08 — GAME A→Z FACTORY — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Créer un jeu ne signifie pas « appeler un modèle ». La chaîne complète est : idée → exigences → GameSpecification → task graph → moteur → règles → contenu/assets/code → build → sécurité → simulation → tests → playtest → balance → preview → version → publish.

## 1. Owner
M08 possède le pipeline de fabrication. M09 possède le runtime. M15 possède l'orchestration AI/ressources. Le code généré reste non fiable jusqu'à validation.

## 2. Natural-language intake
Acteur : creator. Déclencheur : entrer une idée dans CREATE.
Préconditions : texte reçu; capability de création disponible.
Étapes : extraire goal/genre/mode/core loop → détecter ambiguïtés bloquantes → poser seulement les questions nécessaires → créer DraftSpec → permettre édition.
Une ambiguïté non bloquante doit devenir un défaut explicite et réversible, pas une décision cachée.

## 3. GameSpecification
La spec contient au minimum : identity, genre, 2D/3D mode, engine, camera, scenes, entities, controls, rules, difficulty, win/loss, quests, rewards, assets, audio, save, share, multiplayer, accessibility, performance, security, testPlan, publication.
Chaque version possède specVersion et hash d'entrée.

## 4. Task graph
La spec validée devient un DAG. Chaque node possède taskId, dependencies, capabilityId, capabilityVersion, inputRefs, outputRefs, resourceProfile, timeout, validatorRef et idempotencyKey.
Un cycle ou une dépendance impossible bloque le graph avant exécution.

## 5. 2D
Adventure 2D : exploration, NPC, quêtes.
Battle 2D : combat, stats, loot.
Puzzle 2D : logique, états et interactions déterministes.
L'engine est choisi depuis la spec, jamais arbitrairement parce qu'un provider le propose.

## 6. 3D
3D est retenu lorsque la spatialité apporte une valeur réelle. Avant génération : scene graph, camera model, collisions, lighting, asset budget, loading strategy, device capability, fallback et test budget sont définis.

## 7. Artifacts
Code, data, scenes, images, audio, vidéo et manifest sont des ArtifactRefs versionnés. Chaque artifact conserve creator/source, generating node, hash, validation status et provenance.

## 8. Validation / correction
Échecs classés : schema, static/type, build, security, runtime, behavior, content, resource. M15 peut générer un candidat de correction dans un workspace isolé. La version stable reste inchangée tant que le candidat n'est pas promu.

## 9. Publication
Gates obligatoires : manifest, build valide, static checks, security/resource checks, simulation, behavior tests, preview, policy checks et authorized publish command. La version publiée est immuable; activeVersion pointe vers elle.

## 10. Living Object
Un Living Object peut devenir seed de projet. Fork/merge/conversion conserve owner, attribution, lineage, contributors et source refs. Une conversion ne modifie pas silencieusement l'original.

## 11. Tests / DONE
Tester idée ambiguë, spec incohérente, cycle DAG, build failure, malicious dependency, 2D, 3D, resource overrun, rollback et publication non autorisée. DONE seulement avec version reproductible et rollback.

## AI-INTÉGRATION M08 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M08 est l'atelier de fabrication A→Z. M15 est le cerveau d'orchestration qui comprend le brief, compile les exigences, planifie les capabilities et gère les ressources, mais M08 reste owner du GameSpecification et de l'acceptation du package.

### B. AI cases
Game design, code generation, asset generation, audio/music, test generation, 2D/3D scene planning, documentation, repair proposals.

### C. Pipeline
brief → intent → requirements → GameSpecification → TaskGraph → capabilities → resource plan → sandbox → artifacts → validators → build → M09 runtime validation.

### D. Untrusted rule
Tout code, script, asset, prompt result, image, audio ou fichier produit par un provider/worker est NON_TRUSTED jusqu'à validation. Un provider ne publie jamais directement.

### E. 2D/3D
La 3D n'est retenue que si elle apporte une valeur réelle. La génération doit préciser engine, version, scene graph, camera, collisions, lighting, asset budget, loading, device capability, fallback et test budget.

### F. DONE
Un jeu généré n'est publiable que si tous les nodes du DAG sont VALID, les artifacts sont validés, le manifest runtime est compatible et les tests passent.

## GAME PLATFORM — FONDATION PERMANENTE M08

M08 possède la Game Factory Platform : GameSpecification, templates, composants réutilisables, artifact lineage, build orchestration et réparation bornée.

La chaîne est : demande → requirements → GameSpecification → recherche de fondations compatibles → TaskGraph → génération → build → tests → réparation → validation → GameBuild.

Avant de créer une nouvelle brique, M08 cherche template 2D/3D, gameplay component, input, UI, audio, save, share hook, test fixture, runtime adapter et artifact validé compatibles.

Le choix 2D/3D vient de la GameSpecification. La 3D doit expliciter scene graph, camera, collisions, lighting, physics, asset budget, loading et device/performance profile.

Codex peut agir comme agent de modification sur un workspace candidat limité. Il n'est jamais l'autorité de publication et n'obtient pas automatiquement les secrets de production.

Build/test error → diagnostic → correction ciblée → nouvelle revision → tests → validation. La stable build n'est jamais modifiée directement.

## GAME FABRICATION MEMORY — M08

M08 ne possède pas une deuxième mémoire AI. Il produit les preuves et artifacts qui alimentent le Memory Service central.

Après chaque build/test/repair, M08 doit fournir :
- project/build/task refs ;
- artifact hashes ;
- test results ;
- failure fingerprints ;
- successful repair refs ;
- resource/performance observations ;
- runtime compatibility observations ;
- reuse decision refs.

Avant une nouvelle fabrication, M08 demande au MemoryService les connaissances GAME_* pertinentes. Il vérifie leur compatibilité et ne réutilise qu'un pattern VALIDATED.

Une connaissance candidate n'est jamais traitée comme recette avant promotion. M08 reste owner des artifacts et de la GameSpecification ; M15 reste owner de l'orchestration et du learning.

# D10 — M08 GAME FACTORY — EXPANSION COMPORTEMENTALE
## Permanent fabrication platform
M08 is not a one-off generator. Every new game request should first search existing templates, components, runtime patterns and validated fabrication memory.
## Pipeline
DEMAND → INTENT → REQUIREMENTS → SPEC → REUSE SEARCH → TASK GRAPH → GENERATE → BUILD → TEST → DIAGNOSE → BOUNDED REPAIR → REBUILD → VALIDATE → READY_FOR_INTEGRATION.
## 2D/3D choice
2D if interaction/performance goals dominate and 3D adds no meaningful value; 3D when spatial interaction/visualization materially improves the game. The choice is evidence-driven and versioned.
## Media-to-game
An authorized image/video/music concept may become theme/mechanic inspiration. The factory stores the original source reference and derivative policy, but does not package protected source media without permission.
## Viral hooks
Every publishable game should define one social hook: challenge, score card, rematch, co-op invite, creator attribution or shareable outcome.
## Fabrication memory
Store successful architecture, component compatibility, failures and repair patterns only after validation.
## DONE
Reproducible build, sandboxing, tests, resource budget, security and publication handoff validated.

# D100K — M08 Game Factory — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M08. Scope: research→spec→task graph→build→validation→publish. Dependencies: M01,M05,M07,M09,M15. Primary invariant: M08 produces packages; M09 owns execution.
For every capability: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
Authorization failure, invalid schema, incompatible version, ownership violation, idempotency conflict or critical dependency failure must produce zero unauthorized authoritative mutation.

## 3. AI boundary
M15 may propose or analyze only through capability contracts. M08 remains authoritative for research→spec→task graph→build→validation→publish.

## 4. Proof obligations
SUCCESS + NO-DATA + ERROR + DEGRADED/UNAVAILABLE + REFRESH/REOPEN + DESKTOP + MOBILE + PERMISSION DENIAL + RETRY/REPLAY where applicable.

## 5. Impact obligation
M08 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. UNKNOWN impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
Owner authority cannot be bypassed; duplicate commands cannot duplicate authoritative mutation; stale versions cannot silently overwrite current state; projections remain rebuildable; privacy survives handoffs; VERIFIED requires applicable evidence.

## 7. Completion
This D100K section defines what must be provable. It does not claim implementation completion.



# HISTORICAL FUSION — M08 GAME FACTORY — PLAN

Les anciens contrats Game Factory/runtime sont intégrés à M08. La fabrication est un pipeline complet et versionné, pas une simple génération de code.

PLAYER IDEA → INTENT → GAME SPECIFICATION → TASK GRAPH → ENGINE SELECTION → CODE/ASSETS/AUDIO/CONTENT → BUILD → SECURITY → SIMULATION → TEST → PLAYTEST → BALANCE → PREVIEW → PUBLISH.

Chaque étape peut demander des ressources différentes et être distribuée lorsqu'elle est indépendante. Les tâches déclarent leurs dépendances, resource profile, timeout, retry/idempotency et validator.

M08 fabrique pour 2D et 3D. 3D n'est pas une capability de second rang ; le choix dépend de la GameSpecification, du device et du resource budget.

La fabrication doit rester utilisable sans provider spécifique ni Codex. Un provider/agent absent réduit une target d'exécution mais ne supprime pas les contrats ni les connaissances de fabrication.

Les réparations suivent :
DIAGNOSIS → HYPOTHESIS → PATCH → IMPACTED TESTS → BUILD → REGRESSION → BENCHMARK.

Une réparation répétant le même failure fingerprint est escaladée au lieu de boucler.



# D100K — HISTORICAL CONTRACT RESTORATION — M08 GAME FACTORY

## Restored exact fabrication contracts
`AssetRef={id,kind,ref,license:'owned'|'generated'|'open',provenance,hash}`
`GameSpecification={id,mode:'2d'|'3d',engine,scenes[],entities[],rules[],controls[],levels[],assets[],audio[],tests[]}`
`GamePackage={id,specHash,engineVersion,manifestRef,artifactRef,signature}`

Generated code is untrusted. Dependencies are allowlisted. Generated assets retain source/license/provenance metadata. Unsupported or unverifiable assets are rejected instead of silently published.

Published packages include the resources required by M09 and a runtime manifest. Playing a published package never calls the provider/agent that created it.

## D100K proof
Schema mismatch, missing dependency, malicious asset, unverifiable license, provider outage, agent output injection, build reproducibility, artifact hash/signature mismatch, 2D/3D resource overrun and publish denial until all validators pass.

---

# SOURCE 12 — docs/moirise/modules/M09-shared-game-engine/PLAN.md

# M09 — SHARED GAME ENGINE — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
M09 n'est pas « un moteur de jeu ». C'est la frontière qui transforme un GameVersion publié en runtime contrôlé : manifest → allocation → input → state → save → result evidence → destruction.

## 1. Owner
M09 possède les runtimes, bridges et sandbox. M06 possède la session produit et M08 le package de jeu.

## 2. Runtime manifest
Avant lancement, valider engineId/version, entrypoint, assets, input map, save schema, network policy, resource profile et capability allowlist. Un manifest invalide bloque le lancement.

## 3. Runtime allocation
**Déclencheur :** M06 demande runtime pour une PlaySession.
**Séquence :** vérifier GameVersion → vérifier device/runtime compatibility → créer SandboxLease → monter package → injecter uniquement les paramètres autorisés → marquer READY → rendre runtimeRef.
Une allocation incomplète ne doit pas produire ACTIVE côté M06.

## 4. Input bridge
Seules les actions définies dans inputMap passent au jeu. Les événements inconnus sont ignorés. Le runtime n'accède pas directement aux tables MOIRISE.

## 5. Save/load
Save = schemaVersion + bounded payload + checksum + timestamp. Load vérifie Player/session ownership, checksum et version. Une migration ne s'exécute que si une migration connue existe.

## 6. 2D runtime
Canvas/state machine adapté au type d'expérience. Le runtime collecte les evidence nécessaires et respecte le fixed-step/turn semantics défini par la GameSpecification.

## 7. 3D runtime
Lazy-load moteur/asset; contrôle mémoire, frame budget, texture budget, scene size et timeout. Si le device ne respecte pas les contraintes, utiliser seulement un fallback prévu dans la spec ou refuser le lancement proprement.

## 8. Sandbox
Filesystem limité; réseau deny-by-default; aucune clé production; process/time/memory limits; workspace temporaire détruit après session.

## 9. Worker loss / crash
Si worker perdu : mark lease LOST. Requeue uniquement les tâches idempotentes. Une session déjà ACTIVE ne doit pas être dupliquée sans procédure de reprise. Crash local → dernier save valide ou restart.

## 10. États
ALLOCATING → READY → RUNNING → PAUSED/FINISHED/ABORTED → DESTROYED.
Chaque transition possède un owner et une preuve.

## 11. Tests / DONE
Manifest malveillant, input inconnu, save corrompu, 3D over budget, worker loss, runtime crash, network denied, secrets scan, mobile, desktop et destruction après TTL.

## AI-INTÉGRATION M09 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M09 est l'autorité du runtime commun. L'IA peut fabriquer/repair des éléments compatibles mais ne peut jamais contourner le manifest, la sandbox ou l'allowlist.

### B. AI input
Seulement GamePackage validé, runtime compatibility, capability allowlist et resource profile. Aucun code arbitraire venant directement d'un provider vers le navigateur.

### C. Runtime
Manifest → engine/version validation → resource reservation → sandbox → bridge allowlist → execute.

### D. AI adaptive support
Une capability runtime AI est explicitement inscrite dans allowedCapabilities[]. Un jeu qui ne l'a pas ne peut pas l'utiliser simplement parce que M15 la possède.

### E. DONE
Toute exécution AI/jeu est traçable, versionnée, bornée et récupérable.

## GAME PLATFORM — RUNTIME COMMUN M09

M09 est la fondation d'exécution réutilisée par les jeux 2D et 3D.

Deux classes de runtime peuvent être supportées et versionnées : 2D et 3D. Le GameBuild déclare explicitement engineId/engineVersion et ses budgets.

M09 fournit via contrat les services communs nécessaires : input, lifecycle, save bridge, asset loading, audio, timing, error boundary, resource monitoring et capability bridge.

Le jeu ne peut utiliser que les APIs présentes dans RuntimeManifest.allowedCapabilities. Une capability présente dans M15 n'est pas automatiquement disponible dans un jeu.

Si le budget 3D ou la compatibilité device échoue, M09 applique uniquement le fallback déclaré ou renvoie INCOMPATIBLE. Il ne réécrit pas le jeu arbitrairement.

# D10 — M09 SHARED GAME ENGINE — EXPANSION COMPORTEMENTALE
## Runtime role
M09 executes validated GameBuilds from M08. It is not a game generator and does not publish games.
## Runtime lifecycle
RESOLVE_BUILD → VERIFY_HASH → CHECK_COMPATIBILITY → SANDBOX → LOAD_RUNTIME → RUN → COLLECT_VALID_TELEMETRY → SHUTDOWN.
## 2D/3D
The engine exposes separate runtime packages/capability sets but a common session interface. Device profile selects a safe preset; unsupported features degrade or block before launch.
## Safety
Game code/assets run inside bounded runtime. No arbitrary filesystem, unrestricted network, secrets or admin APIs.
## Social hooks
Engine may emit allowed gameplay events (started, milestone, finished) consumed by M06/M10; it never decides rewards or ranking.
## DONE
2D/3D sandbox, performance budget, clean shutdown, malformed build rejection, offline/degraded behavior and mobile/desktop verification.

# D100K — M09 Shared Game Engine — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M09. Scope: runtime réutilisable, sandbox, capacités 2D/3D. Dependencies: M01,M08. Primary invariant: runtime cannot access production secrets or arbitrary network.
Capability transition: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
No authoritative mutation on failed auth/policy/schema/version/ownership/idempotency guards or unavailable critical dependency.

## 3. AI and cross-module boundary
M15 may propose/analyze but cannot mutate M09 private authority. Consumers use defined contracts/events/projections only.

## 4. Proof obligations
Nominal, empty/no-data, error, unavailable/degraded, retry/replay, refresh/reopen, permission denial, concurrency where relevant, desktop and mobile, plus adversarial cases specific to M09.

## 5. Impact obligation
M09 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.

## 6. Formal properties
Authority is unique; duplicate commands are idempotent; stale versions do not overwrite; projections remain rebuildable; privacy follows the object; VERIFIED requires fresh applicable evidence.

## 7. Completion
This section defines proof requirements, not implementation completion.



# HISTORICAL FUSION — M09 SHARED GAME ENGINE — PLAN

M09 absorbe les anciens contrats de runtime partagé et d'exécution distribuée.

Le runtime commun prend un GameBuild validé et vérifie manifest, hash, compatibilité device, resource profile et sandbox avant exécution.

2D et 3D sont deux routes de premier niveau avec une interface de session commune.

Les allocations peuvent être locales ou distribuées, mais M09 ne traite jamais le provider de fabrication comme une dépendance d'exécution. Un jeu publié doit continuer à fonctionner lorsque le provider qui l'a créé devient indisponible.

Lorsqu'un runtime/worker dépasse son budget ou disparaît, M09 applique le protocole de lease/recovery approprié : DEGRADED, PAUSED, TERMINATED ou RESTART, sans contournement silencieux des limites.



# D100K — HISTORICAL CONTRACT RESTORATION — M09 SHARED GAME ENGINE

## Restored exact runtime contracts
`RuntimeLimits={maxEntities,maxAssetBytes,maxSessionMs,maxSaveBytes,maxSimulationHz}`
`GamePermissions={network:'none'|'approved',storageMb,fullscreen,input[]}`
`GameManifest={gameId,engineVersion,mode:'2d'|'3d',entryScene,assets[],capabilities[],limits,saveSchema,multiplayer?}`
`GameSession={id,gameId,playerId,startedAt,state:'loading'|'running'|'paused'|'ended'|'failed'}`
`GamePackage={id,version,engine,manifest,entry,assets[],integrityHash,signature,permissions}`

Stable runtime operations:
`verifyGamePackage`, `createRuntimeSession`, `saveGameState`, `reportRuntimeEvent`, `finalizeGameSession`, `terminateRuntime`.

Subsystems are capability/lazy-loaded. 2D must not load unused 3D/multiplayer systems. Deterministic simulation uses a declared seed when reproducibility is required. Supported adapter families include Canvas/WebGL/Phaser for 2D and Three.js/Babylon/PlayCanvas/WebGL/WebGPU for 3D, behind the common runtime bridge.

## D100K proof
Manifest tamper, package hash/signature, save schema mismatch, deterministic seed, forbidden API/network, filesystem escape, CPU/RAM/entity/session limits, memory release, crash/restart, worker loss and mobile/desktop runtime.

---

# SOURCE 13 — docs/moirise/modules/M10-social-gaming/PLAN.md

# M10 — SOCIAL GAMING — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Un défi n'est pas juste un bouton. La chaîne exacte est : résultat validé → règle de défi immutable → cible/visibilité → invitation → tentative indépendante → validation → comparaison → rematch éventuel.

## 1. Owner
M10 possède l'état des challenges et comparaisons. M06 possède les sessions de jeu; M11 possède membership des communautés; M05/M14 consomment les résultats validés.

## 2. Create Challenge
Acteur Player. Déclencheur Share/Challenge depuis un résultat validé.
Préconditions : resultId valide; source partageable; target policy.
Étapes : vérifier résultat → copier uniquement les paramètres nécessaires de rulesVersion → définir target/visibility/expiry → créer Challenge immutable → créer invite/ref.
Source privée jamais exposée par la challenge card.

## 3. Async Attempt
Le destinataire ouvre → vérifier que Challenge est ACTIVE et qu'il n'est ni expiré ni interdit par block/privacy → créer ChallengeAttempt → demander une nouvelle PlaySession à M06 → associer result au challenge après validation.
L'ancienne tentative n'est jamais modifiée.

## 4. Comparison
Comparer seulement AuthoritativeResults. Utiliser la même rulesVersion/tie rule pour tous. Le client reçoit une ComparisonProjection, jamais une victoire calculée localement considérée comme officielle.

## 5. Rematch
Rematch crée un nouveau Challenge avec une nouvelle session. L'ancien challenge et son résultat restent immuables. Rate limits évitent une création infinie.

## 6. Community Challenge
M10 reçoit une demande depuis M11 mais revalide membership/permissions au moment de l'action. La communauté ne devient pas source de vérité de membership.

## 7. Abuse controls
Avant création, accept, attempt ou rematch : block/mute check, rate limit, expiry, dedupe, result integrity. Abuse flags peuvent créer un hook vers la modération, pas une punition autonome.

## 8. États
Challenge DRAFT → ACTIVE → COMPLETED/EXPIRED/CANCELLED.
Attempt PENDING → ACTIVE → VALID/INCONCLUSIVE.
Comparison READY seulement si les inputs autoritatifs sont valides.

## 9. Tests / DONE
Duplicate challenge, blocked target, expired challenge, concurrent rematch, invalid score, private result sharing, community membership revoked, mobile/desktop, network loss and idempotent retry.

## AI-INTÉGRATION M10 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M10 possède les interactions sociales autour du jeu partagé : participants, party, coordination et règles sociales de la session.

### B. AI cases
Suggestion d'équipe, coordination, matchmaking assistance, suggestion d'activité et synthèse de session.

### C. Context
Participant IDs nécessaires, rôle/permission, game/session state autorisé, préférences explicitement consenties. Pas de lecture libre des DMs ou communautés.

### D. Authority
AI proposal → M10 policy → participant checks → commit. M15 ne peut pas ajouter/supprimer un participant ni modifier un rôle sans use-case M10 autorisé.

### E. DONE
Les suggestions sont réversibles, explicables et n'exposent aucun participant privé non nécessaire.

## GAME PLATFORM — INTÉGRATION M10 / JEUX SOCIAUX

M10 permet à un jeu fabriqué par M08 et exécuté par M09 d'utiliser une couche sociale commune.

GameSpecification peut déclarer des hooks : party, invite, challenge, shared score, spectator ou cooperative objective.

Le jeu produit des événements de gameplay validables. M10 possède l'état social partagé et vérifie membership, permissions et privacy.

M15 peut proposer composition d'équipe, matchmaking assistance, résumé ou événement social. La proposition devient active seulement après validation M10.

Un jeu sans hook social reste un jeu solo. Aucun social layer n'est ajouté artificiellement.

# D10 — M10 SOCIAL GAMING — EXPANSION COMPORTEMENTALE
## Social game objects
Challenge, rematch, party, co-op invite, spectator projection, team, result card and game-linked conversation.
## Loop
PLAY → RESULT → SOCIAL_ACTION → INVITE/SHARE/REMATCH → NEW_SESSION.
## Boundaries
M10 owns social hooks; M06 owns play session; M11 owns membership; M14 owns rewards.
## Media integration
A validated Reel/Story/photo can include a game launch action. A game result can produce a media card only from authoritative result data.
## Anti-spam
Invite dedupe, recipient controls, mute, frequency caps and block enforcement.
## Viral loops
Challenge links should make the next action obvious and reversible: play, join group, rematch or share result.
## DONE
Friend/group challenge, privacy, block, duplicate invite, build removal and mobile/desktop behavior tested.

# D100K — M10 Social Gaming — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M10. Scope: challenges, rematch, social game events. Dependencies: M03,M06,M11,M12. Primary invariant: social state cannot falsify game results.
Capability transition: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
No authoritative mutation on failed auth/policy/schema/version/ownership/idempotency guards or unavailable critical dependency.

## 3. AI and cross-module boundary
M15 may propose/analyze but cannot mutate M10 private authority. Consumers use defined contracts/events/projections only.

## 4. Proof obligations
Nominal, empty/no-data, error, unavailable/degraded, retry/replay, refresh/reopen, permission denial, concurrency where relevant, desktop and mobile, plus adversarial cases specific to M10.

## 5. Impact obligation
M10 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.

## 6. Formal properties
Authority is unique; duplicate commands are idempotent; stale versions do not overwrite; projections remain rebuildable; privacy follows the object; VERIFIED requires fresh applicable evidence.

## 7. Completion
This section defines proof requirements, not implementation completion.


# D100K — HISTORICAL CONTRACT RESTORATION — M10 SOCIAL GAMING

## Restored contracts
`Challenge={id,gameId,creatorId,targetId?,rulesHash,expiresAt}`
`ScoreSubmission={gameId,sessionId,playerId,score,stats:Record<string,number>,clientNonce}`
`LeaderboardEntry={playerId,score,rank,seasonId}`

Server validates session, package version, scoring-rules hash, timing bounds, identity and nonce before accepting a score. Invalid/suspicious results are rejected or quarantined. Leaderboards use deterministic ordering, stable tie-breakers, pagination and explicit season/rules versions.

Spectator mode is optional when a game declares it. AI matchmaking/recommendation is advisory; deterministic fallback is mandatory.

## D100K proof
Forged score, duplicate submission, stale rulesHash, expired challenge, block/privacy restriction, season rollover, tie handling, spectator permission, AI outage and public/private share separation.



# D100K — RESTORED ASYNC / SHARE LOOP

Social gaming remains solo-first. A Player can publish a challenge result, invite asynchronously, collaborate, rematch or contribute to a community goal without simultaneous presence.

Sharing communicates something the Player actually did or created rather than advertising MORISE. A dead friend list must not make PLAY appear empty; available public/community activities can provide truthful alternatives.

D100K: stale target, expired challenge, private result leakage, duplicate participation, blocked recipient, empty friend list, async retry and public share reconstruction.



# D100K — EXPLICIT SPECTATOR / SOCIAL VALIDATION RESTORATION

Spectator behavior is available only when the GameSpecification/RuntimeManifest declares it. Social invitations/share operations resolve current block, privacy and eligibility rules before producing any public action.

D100K: unauthorized spectator, blocked invite, private result leak and stale eligibility.

---

# SOURCE 14 — docs/moirise/modules/M11-communities/PLAN.md

# M11 — COMMUNITIES / GUILDS — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Un groupe ne se résume pas à « create group ». La chaîne exacte est : acteur → permission de création → nom/description/visibility/rules → validation → community row → OWNER membership → events → management projection.

## 1. Owner
M11 est la seule autorité pour Community, Membership, roles et invitations. Posts, events, challenges et games liés à une communauté restent la propriété de leurs modules respectifs.

## 2. Create Group
Acteur Player; trigger Create Group.
Préconditions : authentifié, policy create=true, name/description/visibility/rules conformes.
Ordre : server actor → validate fields → normalize name → check uniqueness policy → create Community DRAFT/ACTIVE → create OWNER membership dans la même transaction → emit COMMUNITY_CREATED → ouvrir management view.
Si membership échoue, aucun Community partiellement créé ne doit rester actif.

## 3. Join public
Player ouvre groupe → server vérifie group ACTIVE, visibility PUBLIC, block/mute policy, membership inexistante → insert membership unique → emit JOINED → projection welcome.
Double clic retourne le membership existant.

## 4. Private invitation
Owner/Admin autorisé → cible autorisée → créer Invitation avec expiry, inviter, target and scope → notification selon préférence → accept crée membership uniquement après nouvelle vérification.
Invitation expirée ou révoquée ne peut jamais produire membership.

## 5. Roles
Role hierarchy versionnée : OWNER > ADMIN > MODERATOR > MEMBER, avec GUEST facultatif si activé.
Avant changement : vérifier actor role → target membership → règle de transfert/owner safety → écrire role → audit event.
Le dernier OWNER ne peut pas être supprimé sans transfert/closure policy.

## 6. AI-assisted community formation
M15 peut détecter une candidate à partir de signaux non sensibles et autorisés. Pipeline : candidate → existing-group check → duplicate proposal check → confidence/diversity → proposal → consent/policy → appel du même use-case Create Group.
AI ne doit pas écrire directement Community/Membership.

## 7. Group closure/transfer
Freeze joins → revoke pending invites → transfer ownership ou mark CLOSED → publish event → preserve audit references. Les données privées de l'ancien groupe restent protégées par les permissions historiques/retention.

## 8. États
Community DRAFT → ACTIVE → FROZEN → CLOSED.
Membership INVITED/PENDING/ACTIVE/LEFT/REMOVED.
Invitation CREATED → ACCEPTED/REJECTED/EXPIRED/REVOKED.

## 9. Tests / DONE
Create rollback, duplicate join, expired invite, block, role escalation, last-owner safety, AI proposal rejection, community closure, mobile/desktop, private data isolation.

## AI-INTÉGRATION M11 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

M11 reste l'unique autorité pour Communities/Guilds, membership, rôles, invitations et gouvernance. MORISE AI peut découvrir des communautés, proposer une formation, résumer ou assister la modération, mais toute mutation passe par le command path M11. Une CommunityProposal est une proposition non autoritative : proposal → policy → M11 validation → commit → event. Les données privées ne traversent la frontière AI que par scope explicite. Aucune sortie AI ne peut ajouter un membre, élever un rôle, contourner un block ou supprimer la protection du dernier owner. Sans AI, discovery et gouvernance restent déterministes. DONE exige des tests de role escalation, private-data leakage, duplicate join, stale membership, proposal rejection et provider outage.

# D10 — M11 COMMUNITIES — EXPANSION COMPORTEMENTALE
## Community role
Communities/guilds create durable belonging around Otaku interests, games, creations and events.
## Creation
PROPOSAL/CREATE → POLICY → OWNER MEMBERSHIP → DEFAULT SETTINGS → EVENT → DISCOVERY PROJECTION.
## AI role
M15 can propose affinity/convergence/community creation but M11 decides actual creation, membership, roles and visibility.
## Media/game integration
Communities can host feeds, Stories/Reels projects, challenges, game sessions and events without owning their internal source records.
## Viral growth
A community grows from a real shared action (play, creation, event, discussion), not from fake recommendations or auto-added users. Invitations are scoped and rate-limited.
## DONE
Public/private membership, moderation, roles, invite controls, cross-module projections and leave/delete recovery validated.

# D100K — M11 Communities / Guilds — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M11. Scope: membership, roles, moderation, community state. Dependencies: M02,M03,M12,M13. Primary invariant: membership/role authority is M11 only.
Capability transition: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
No authoritative mutation on failed auth/policy/schema/version/ownership/idempotency guards or unavailable critical dependency.

## 3. AI and cross-module boundary
M15 may propose/analyze but cannot mutate M11 private authority. Consumers use defined contracts/events/projections only.

## 4. Proof obligations
Nominal, empty/no-data, error, unavailable/degraded, retry/replay, refresh/reopen, permission denial, concurrency where relevant, desktop and mobile, plus adversarial cases specific to M11.

## 5. Impact obligation
M11 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.

## 6. Formal properties
Authority is unique; duplicate commands are idempotent; stale versions do not overwrite; projections remain rebuildable; privacy follows the object; VERIFIED requires fresh applicable evidence.

## 7. Completion
This section defines proof requirements, not implementation completion.


# D100K — HISTORICAL CONTRACT RESTORATION — M11 COMMUNITIES

## Restored contracts
`Community={id,name,description,visibility:'public'|'private',ownerId,createdAt}`
`Membership={communityId,userId,role:'owner'|'admin'|'moderator'|'member',status:'active'|'pending'|'banned'}`
`ModerationEvent={id,communityId,actorId,action,targetId,createdAt}`

Moderation actions log actor, target, reason, timestamp and rule/version references. Community creation, membership, moderation, settings and community events remain contextual screens behind the primary Communities surface.

## D100K proof
Unauthorized role change, banned membership, private community access, duplicate invite/join, moderation audit, actor spoofing, stale role version and privacy propagation.



# D100K — RESTORED COMMUNITY SECRETS / COLLABORATIVE MEDIA

M11 can host distributed community secrets and collaborative media chains when a real shared objective exists. A community secret may require several independently valid contributions, but solving it must not expose private messages, private profiles or hidden moderation data.

Community media contributions preserve contributor, source, version and permission lineage. A contribution may be accepted, rejected or transformed according to the canonical media policy; it cannot silently become anonymous global training data.

D100K: malicious contribution, private-data leakage, duplicate contribution, contributor attribution loss, permission revocation and community deletion recovery.

---

# SOURCE 15 — docs/moirise/modules/M12-events/PLAN.md

# M12 — EVENTS — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
M12 est la seule autorité des états futurs réels : événement, inscription, calendrier, tournoi et continuation. « Reviens demain » n'est permis que si une vraie continuation est enregistrée.

## 1. Owner
M12 possède Event, EventVersion, registration, brackets/matches et ContinuationRef. Notification delivery est transversal; M12 fournit la vérité de l'état.

## 2. Create event
Owner autorisé → validate title, description, timezone, start/end, rules, visibility → créer EventVersion → état DRAFT/SCHEDULED → schedule transition.
Un événement ne devient futur qu'après commit d'un état SCHEDULED valide.

## 3. Registration
Player → open event → vérification state OPEN, eligibility, block/privacy, capacity → unique EventRegistration → event REGISTERED.
Retry avec même commandId = même registration. Event complet/fermé = état explicite, jamais faux succès.

## 4. Start/end scheduler
Trusted server time → charger EventVersion → vérifier state attendu + fenêtre temporelle → transition SCHEDULED→LIVE ou LIVE→ENDED → event.
Une relance du scheduler doit être idempotente grâce à la guard state+version.

## 5. Tournament
Freeze entrants avant bracket. Générer bracket avec rulesVersion déterministe. Chaque match reçoit participants, round, seed, state et result source.
Aucun résultat final ne vient d'un bouton client; il vient d'une source validée M06/M10 selon contrat.

## 6. Continuation
Créer ContinuationRef seulement lorsque le prochain état réel existe : targetEvent, nextStartAt, sourceRef, eligibility et dedupeKey. Sans état futur confirmé, ne rien afficher.

## 7. Notification hook
M12 signale « event started/ending/reminder eligible ». Le service de notification déduplique par event+recipient+type et respecte quiet hours/preferences. Une notification ne crée pas l'événement.

## 8. États
Event DRAFT→SCHEDULED→LIVE→ENDED/CANCELLED. Registration OPEN/CLOSED. Tournament DRAFT→LOCKED→RUNNING→COMPLETED.

## 9. Tests / DONE
Timezone, daylight change, scheduler retry, event cancellation, full capacity, duplicate registration, tournament invalid result, continuation absent, quiet hours, mobile/desktop.

## AI-INTÉGRATION M12 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

M12 est owner du lifecycle Event, des permissions organizer/participant et de l'admission des résultats. AI peut aider à rédiger un Event, proposer un planning, localiser le texte, suggérer des participants, préparer des rappels ou résumer les résultats. Toute modification passe par M12. Le contenu d'un Event est une donnée et non une instruction de confiance : aucune URL ou instruction injectée dans le texte n'est exécutée automatiquement. Participant privacy et organizer authorization sont revalidées avant commit. Sans AI, le lifecycle Event reste fonctionnel. DONE exige tests de permission, participant privacy, schedule conflict, prompt/tool injection, duplicate reminder et recovery.

# D10 — M12 EVENTS — EXPANSION COMPORTEMENTALE
## Event types
Real scheduled events, game tournaments, community activities, creator drops and world moments when backed by real state.
## State machine
DRAFT → SCHEDULED → ACTIVE → COMPLETED/CANCELLED. Registration and eligibility are real state, never fabricated.
## Social integration
Events can be surfaced from Stories/Reels/communities and can launch games or live interactions. M12 owns schedule/eligibility/results.
## AI role
M15 may propose themes, descriptions or personalization; M12 commits event state.
## Viral loop
Upcoming event → reminder/Story/share → registration → participation → validated result → recap → future discovery.
## Anti-spam
Reminder preferences, event dedupe, time-zone correctness and cancellation propagation.
## DONE
Timezones, registration, capacity where applicable, cancellation, expired event, reminders and cross-module deep-links validated.

# D100K — M12 Events — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M12. Scope: future event definitions, scheduling, lifecycle. Dependencies: M05,M11,M14. Primary invariant: future state exists only when backed by authoritative event state.
Capability transition: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
No authoritative mutation on failed auth/policy/schema/version/ownership/idempotency guards or unavailable critical dependency.

## 3. AI and cross-module boundary
M15 may propose/analyze but cannot mutate M12 private authority. Consumers use defined contracts/events/projections only.

## 4. Proof obligations
Nominal, empty/no-data, error, unavailable/degraded, retry/replay, refresh/reopen, permission denial, concurrency where relevant, desktop and mobile, plus adversarial cases specific to M12.

## 5. Impact obligation
M12 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.

## 6. Formal properties
Authority is unique; duplicate commands are idempotent; stale versions do not overwrite; projections remain rebuildable; privacy follows the object; VERIFIED requires fresh applicable evidence.

## 7. Completion
This section defines proof requirements, not implementation completion.


# RECOVERED EVENT / SEASON / LOW-POPULATION FUSION — 2026-10-03

## Seasons
M12 may group real activities, discoveries, challenges, secrets, collection goals and collective events into bounded seasons with explicit start/end state and retrospective output. Absence does not create hidden punishment or irreversible loss.

## Low-population World Events
Events remain useful when population is small by using solo contribution, asynchronous participation, deterministic state and validated collective accumulation. M12 must not simulate a crowd to make a low-population event look populated.

## Return-after-absence event continuation
A Player returning after absence may receive a real event consequence, updated state or missed-but-available activity when such state exists. No fabricated urgency is allowed.

## Emergence / Living Object conversion
Validated Living Object outcomes may become event candidates through the existing owner handoff. M12 owns the event state only after its normal eligibility and authorization rules are satisfied.


# D100K — HISTORICAL CONTRACT RESTORATION — M12 EVENTS

## Restored operations
`createEvent`, `updateEventDraft`, `publishEvent`, `joinEvent`, `withdrawEvent`, `cancelEvent`, `completeEvent`, `listUpcomingEvents`.

All timestamps are persisted in UTC and localized only for presentation. Recurring events use explicit recurrence rules and occurrence IDs. Reminder jobs use a unique event/user/occurrence/channel key.

`Event={id,title,startsAt,endsAt,status:'draft'|'scheduled'|'live'|'completed'|'cancelled'|'expired'|'archived',creatorId,visibility:'public'|'community'|'private',rulesHash}`
`Participation={eventId,userId,status:'joined'|'withdrawn'|'completed',idempotencyKey}`

M12 never shows an event as live without authoritative server state. AI event planning/copy is advisory; publishing is an authorized action.

## D100K proof
Timezone boundary, recurrence occurrence, duplicate join/withdraw, reminder retry, stale client state, cancellation, server outage, community membership authorization and AI outage.



# D100K — EXPLICIT EVENT SURFACE RESTORATION

Events are surfaced contextually through Home, Communities, Play and SYSTEM; there is no permanent Events navigation door. Event lifecycle behavior is deterministic across timezones, retries and reconnects. The UI reconciles stale client state from authoritative server state and does not show an event as live without server confirmation.

Recurring occurrences have explicit IDs used for participation/reminder idempotency.



# D100K — EXPLICIT EVENT TIME / SURFACE RESTORATION

All event behavior is deterministic across timezone changes, retries and reconnects. The contextual event surface appears through Home, Communities, Play and SYSTEM. It never becomes a permanent global navigation door.

D100K: UTC persistence, occurrence IDs, stale-client reconciliation and contextual rendering.

---

# SOURCE 16 — docs/moirise/modules/M13-adaptive/PLAN.md

# M13 — ADAPTIVE WORLD — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
M13 transforme les signaux autorisés en exploration contextualisée. Un signal n'est jamais directement une décision : signal → contexte → filtre privacy → candidate → policy → projection → feedback.

## 1. Adaptive surface
Acteur Player/system. Déclencheur ouverture World/Play ou action autorisée.
Préconditions : context scope connu; privacy pass.
Séquence : récupérer signaux autorisés → filtrer blocked/private/unsafe → diversité → nouveauté → choisir candidate → produire reasonKey → rendre projection.
Manque de signal = défaut neutre, pas d'inférence.

## 2. Living Object discovery
Un objet possède owner, lineage, version et permissions. M13 peut le faire découvrir; transformation/fork est exécuté par le owner approprié.
La découverte conserve attribution. Si l'objet devient privé ou révoqué, la projection disparaît immédiatement.

## 3. Convergence
**Source :** trajectoires validées et non sensibles.
**Étapes :** batch borné → détecter motifs compatibles → confidence → diversity/anti-manipulation → privacy filter → candidate → proposition.
Un seul actor ne peut pas fabriquer artificiellement une convergence en répétant une action. Une convergence faible est rejetée.

## 4. Convergence Space
Si acceptée : créer un espace scoped → consentement/permissions → expérience ou prototype → collecter outcome → fermer/convertir.
Solo-first : le Player peut voir une convergence pertinente sans obligation de rejoindre un groupe.

## 5. World Memory retrieval
Une question/task peut demander des connaissances collectives. M13 récupère uniquement des MemoryCandidates déjà validées : claim, sources, attribution, confidence, scope, retention, correction path.
Le système ne transforme pas automatiquement tous les messages privés en mémoire.

## 6. Adaptive feedback
Accept/dismiss/play/share fournit un signal borné. Rate limit et privacy filter avant stockage. Les feedbacks deviennent evidence, jamais ordre.

## 7. États
Adaptive candidate CREATED→FILTERED→PRESENTED→ACTED/DISMISSED.
Convergence DETECTED→PROPOSED→ACCEPTED→RUNNING→RESOLVED/REJECTED.
Living Object DISCOVERED→VIEWED→BRANCHED/TRANSFORMED via owner contract.

## 8. Tests / DONE
Sensitive inference attempt, blocked actor, low-confidence convergence, repeated manipulation, revoked object, private memory leak, solo path, mobile/desktop, AI unavailable.

## AI-INTÉGRATION M13 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

M13 est owner de l'adaptation du World, du ranking contextualisé et des réponses du monde vivant. M15 fournit l'intelligence et le calcul de propositions à partir de signaux réels. Les signaux doivent avoir sourceModule/sourceRef, timestamp, privacyClass, provenance et expiry. Une convergence ou emergence ne peut être déclenchée que par plusieurs signaux réels satisfaisant une règle versionnée. AI ne peut pas créer artificiellement des utilisateurs, événements, engagements ou récompenses pour provoquer une adaptation. Toute adaptation doit rester bornée, versionnée, explicable et, lorsque possible, réversible. Fallback = baseline déterministe.

# D10 — M13 ADAPTIVE WORLD — EXPANSION COMPORTEMENTALE
## Purpose
M13 observes validated world/social/game signals and proposes adaptive projections. It never silently rewrites owner truth.
## Convergence
SIGNALS → NORMALIZE → PRIVACY FILTER → CLUSTER/RELATION HYPOTHESIS → EVIDENCE → PROPOSAL → OWNER VALIDATION → PROJECTION.
## Missions
M13 may propose emergent missions from real activity, but M05/M06/M11/M12 commit the corresponding domain state.
## World memory
Only validated/public-or-authorized observations enter broader World Memory. Private conversations remain scoped.
## Adaptation
Changes are bounded by policy, rate and novelty budgets. A failed provider does not freeze the world; deterministic fallback remains.
## Viral value
Adaptive surfaces can expose timely communities, games, stories or creative prompts that connect existing real states without manufacturing popularity.
## DONE
Privacy boundaries, convergence evidence, mission proposal, rollback, stale signals and provider failure validated.

# D100K — M13 Adaptive World — FORMAL VERIFICATION

Owner: M13. Scope: adaptation, ranking, convergence, memory retrieval. Dependencies: M01,M02,M03,M04,M07,M15. Invariant: adaptive output is a projection/proposal unless an owner commits it.

Canonical transition: ACTOR → INTENT → PRECONDITIONS → CONTEXT/POLICY → INPUTS → AUTHORITY → GUARDS → STATE → OUTPUT → VALIDATION → COMMIT → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

Forbidden: hidden owner transfer, unauthorized mutation, silent privacy expansion, stale overwrite, duplicate authoritative mutation, or treating an unverified proposal as fact.

Proof must cover nominal, empty/no-data, failure, degraded/unavailable, replay, concurrency where relevant, refresh/reopen, permissions, mobile and desktop, and the module-specific invariant.

Impact path: M13 → consumers → contracts/events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.


# D100K — HISTORICAL CONTRACT RESTORATION — M13 ADAPTIVE WORLD

## Restored contracts
`AdaptationCandidate={id,target,changes:Record<string,unknown>,reasonRefs[],createdBy,version}`
`AdaptationDecision={candidateId,status:'rejected'|'approved'|'canary'|'active'|'rolled_back',baseline,metrics,rollbackThreshold}`

M13 consumes only authorized aggregate observations: engagement trends, completion rates, explicit feedback, event outcomes and public interaction statistics. Secrets, exact private content and sensitive attributes are excluded.

Every active adaptation has immutable version metadata. Historical metrics are never mutated to hide regression. Data poisoning, low sample size, stale signals, provider disagreement, version conflict and unauthorized activation are explicit rejection/rollback cases.

## D100K proof
Candidate isolation, signal provenance, low-sample rejection, poisoned signal, stale version, canary regression, automatic rollback and recovery after rollback.



# D100K — RESTORED ADAPTIVE RETENTION MECHANICS

M13 owns the adaptive state used for:
- World That Remembers;
- hidden/discoverable routes;
- evolving puzzles;
- consequence branching;
- one-problem/many-approaches recognition;
- deterministic no-AI remix fallback.

Adaptation is based on validated signals, not hidden psychological profiling. A no-AI deterministic path must exist for every mechanic that requires a degraded mode.

A branch or world mutation always carries version, source-event refs, owner scope, visibility, recovery state and rollback semantics.

D100K: poisoned signal, low sample, branch conflict, stale version, rollback, no-AI fallback, privacy boundary and mobile state restoration.

---

# SOURCE 17 — docs/moirise/modules/M14-collection-reward/PLAN.md

# M14 — COLLECTION / REWARD ECONOMY — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
M14 est la seule autorité des grants, collection ownership, roulette et économie. Un modèle AI, une interface ou M05 ne peut pas écrire directement un reward ledger.

## 1. Reward grant
**Acteur :** M05/M06/M12 via événement validé. **Déclencheur :** entitlement event.
**Préconditions :** source event valide, reward rule version connue, event non déjà consommé.
**Séquence :** vérifier source → charger RewardRuleVersion → calculer grant → créer ledger entry avec sourceEventId → commit → projection collection → event REWARD_GRANTED.
Retry = même ledger entry.

## 2. Collection ownership
CollectionOwnership référence itemId, ownerId, quantity selon policy, acquisitionSource et version. Une acquisition doit être dérivable d'un ledger ou d'une règle explicite. Le client ne peut jamais augmenter quantity.

## 3. Titles
M05 confirme l'eligibility; M14 conserve ownership/collection si ce titre est collectible. Unlock et ownership sont deux étapes distinctes pour éviter une double autorité.

## 4. Roulette
Baseline documentée : 3 pulls/jour. Odds configurées : Common 50%, Rare 30%, Epic 13%, Legendary 5%, Mythic 2%.
**Séquence :** vérifier allowance → réserver Pull avec commandId → choisir résultat par RNG auditable/config version → commit outcome → ledger grant → projection.
Le modèle AI ne choisit jamais l'issue aléatoire.
Retry de la même pull = même outcome; RNG failure avant commit = aucune consommation.

## 5. One-million titles
Les 1 000 000 titres ne sont pas préinsérés comme 1 000 000 rows. Le catalogue utilise une grammaire/règle versionnée; une identité de titre est matérialisée pour un Player seulement lorsqu'elle est effectivement débloquée. Le titre débloqué conserve la règle, evidence et version qui l'ont produit.

## 6. Reconciliation
Le ledger est source d'autorité. Une tâche de reconciliation compare projections et ledger. Mismatch simple → rebuild projection. Mismatch grave → freeze du grant path concerné + rapport, jamais correction silencieuse d'un montant.

## 7. Reward presentation
Afficher source, nom, rarity, ruleVersion et delta collection. Ne pas afficher un compteur de rareté fictif ou un gain qui n'est pas encore commité.

## 8. États
Grant REQUESTED→VALIDATED→COMMITTED/FAILED. Roulette READY→RESERVED→RESOLVED/FAILED. Ownership ACTIVE/REVOKED.

## 9. Tests / DONE
Duplicate grant, invalid source, concurrent pulls, allowance limit, RNG interruption, one-million-title deterministic generation, reconciliation mismatch, mobile/desktop. DONE lorsque l'économie est entièrement server-authoritative et replay-safe.

## AI-INTÉGRATION M14 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

M14 est l'unique autorité de collection, rewards, roulette et intégrité économique. AI peut analyser la collection, expliquer une rareté, suggérer une présentation, détecter des anomalies ou recommander une action. AI ne grant jamais, ne mint jamais, ne roll jamais et ne modifie jamais le ledger. Roulette = configuration versionnée + algorithme M14 + ledger idempotent + limites d'usage. Reward = evidence validée → entitlement → ledger → event. Toute proposition AI reste descriptive jusqu'à validation M14. Fallback : ledger et algorithmes déterministes continuent sans AI. DONE exige impossibilité technique de l'écriture directe par AI.

# D10 — M14 COLLECTION / REWARD — EXPANSION COMPORTEMENTALE
## Reward surfaces
Collection, titles, roulette, cards/collectibles and validated reward drops. M14 owns ledger/outcome; M05 owns progression.
## Roulette
Default 3 pulls/day with versioned odds (Common 50, Rare 30, Epic 13, Legendary 5, Mythic 2) unless product configuration is intentionally changed and audited.
## Viral surfaces
A player may share a newly earned title/item/result through a safe projection. Share never exposes private inventory details when policy forbids it.
## Collection loops
Discover → earn → inspect → customize/display → share → discover next related item. No fake scarcity or cash-purchase pressure.
## AI role
M15 can analyze collection balance and propose content ideas. It cannot grant rewards or choose lottery outcomes.
## DONE
Ledger idempotence, outcome audit, daily limit, duplicate prevention, share privacy, rollback and AI outage validated.

# D100K — M14 Collection / Reward — FORMAL VERIFICATION

Owner: M14. Scope: collection, reward ledger, roulette, economy. Dependencies: M05,M06,M10,M11,M12. Invariant: M14 alone owns authoritative reward/economy mutation.

Canonical transition: ACTOR → INTENT → PRECONDITIONS → CONTEXT/POLICY → INPUTS → AUTHORITY → GUARDS → STATE → OUTPUT → VALIDATION → COMMIT → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

Forbidden: hidden owner transfer, unauthorized mutation, silent privacy expansion, stale overwrite, duplicate authoritative mutation, or treating an unverified proposal as fact.

Proof must cover nominal, empty/no-data, failure, degraded/unavailable, replay, concurrency where relevant, refresh/reopen, permissions, mobile and desktop, and the module-specific invariant.

Impact path: M14 → consumers → contracts/events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.


# RECOVERED CREATOR / ECONOMY FUSION — 2026-10-03

## Creator value bridge
M14 may represent validated creator-related rewards, collection items, contribution recognition and other economic outcomes through its authoritative ledger. Creator capability progression and eligibility analysis can be proposed by M02/M15, but M14 remains the grant/ledger authority for applicable rewards.

## Eligibility stages
Historical creator-economy stages are preserved as configurable proposals and policy inputs. No creator reward or economic entitlement is granted from a raw AI score, follower count or fabricated popularity signal.

## Creator contribution chains
Validated contribution lineage may support reward attribution across original creation, remix, collaboration, event, game or media transformation. Every grant must reference an authoritative source event and policy version.

## Monetization safeguards
Any future economic activation remains free-first and policy-controlled, with fraud/anomaly checks, reconciliation and explicit owner/admin oversight. Provider output or AI recommendation never writes the economic ledger.


# D100K — HISTORICAL CONTRACT RESTORATION — M14 COLLECTION / REWARD

## Restored contracts
`Item={id,definitionId,ownerId,quantity,acquiredAt}`
`EquipState={playerId,slot,itemId,updatedAt}`
`RewardGrant={id,playerId,source,sourceId,ruleVersion,itemDefinitionIds[],idempotencyKey}`

Item definitions and rarity/reward rules are immutable/versioned. Reward transactions record source event, source ID, rule version, provenance and timestamp. The client cannot mint items, alter quantity or manipulate rarity.

Canonical reward sequence:
`validated source event → eligibility → reward rule → transaction → inventory update → reward history → notification`.

Collection metadata remains functional when an image provider is unavailable.

## D100K proof
Duplicate reward event, client mint attempt, quantity manipulation, rarity manipulation, stale rule version, rollback/transaction failure, provider outage and notification failure.



# D100K — RESTORED RARE OBJECTS / TRUTHFUL SCARCITY

Rare collection objects remain valid only when rarity and acquisition are derived from authoritative definitions/rules. The Player may share a real collection card, but the system cannot invent scarcity, popularity, ownership or acquisition history.

D100K: duplicate acquisition, rarity spoof, client mint attempt, stale definition, provider image outage, deleted source event and truthful share reconstruction.



# D100K — EXPLICIT COLLECTION FALLBACK RESTORATION

When an image/creative provider is unavailable, collection definitions, ownership, rarity, inventory and reward history remain functional. Provider-dependent visuals degrade independently and never become the authority for collection state.



# D100K — RESTORED REWARD / LEDGER INVARIANT

Historical economy contracts require immutable/versioned reward definitions and an audit ledger. A reward operation is:
validated source → eligibility → ruleVersion → ledger transaction → inventory/collection mutation → history → notification.

The ledger is authoritative for economic mutations; UI and AI are descriptive/proposal layers only. Duplicate idempotency keys cannot produce a second economic side effect.

Optional monetization/advertising telemetry must remain truthful and non-authoritative; an impression event never creates a fake player, reward or popularity signal.

---

# SOURCE 18 — docs/moirise/modules/M15-meta-ai-lab/PLAN.md

# M15 — META SYSTEM + MORISE AI LAB — PLAN D’IMPLÉMENTATION

## 0. Autorité documentaire

Ce document décrit uniquement le comportement propre au module M15 :
- rôle du Meta System ;
- rôle du MORISE AI Lab ;
- interfaces M15 avec les autres modules ;
- responsabilités de M15 ;
- limites d'autorité ;
- états métier M15 ;
- résultats attendus.

La fabrication interne du cerveau IA est décrite une seule fois dans :
- docs/moirise/ai/AI_MASTER_PLAN.md
- docs/moirise/ai/AI_TECHNICAL_DESIGN.md

Ne pas recopier ici Request Gate, Context Engine, Provider Router, Memory Service, Validation Engine ou Evolution Engine.

## 1. Mission M15

M15 fournit le système d'orchestration qui permet à MORISE AI d'être utilisée par les autres modules.

M15 coordonne :
- demandes AI ;
- capabilities ;
- outils autorisés ;
- exécution ;
- validation ;
- expérience ;
- AI Lab.

M15 ne remplace pas les owners métier.

## 2. Entrées M15

M15 reçoit :
- requête AI ;
- événement système ;
- demande d'un module ;
- proposition d'évolution ;
- demande de création ;
- demande de traduction ;
- demande d'analyse ;
- demande de génération créative.

Chaque entrée doit être conforme aux contrats centraux de l'AI Technical Design.

## 3. Sorties M15

M15 peut retourner :
- réponse AI ;
- proposition ;
- artifact ref ;
- task reference ;
- validation result ;
- event proposal ;
- improvement candidate ;
- degraded state.

Une sortie ne devient un état métier durable qu'après le commit de son module owner.

## 4. Frontières M15

M15 ne devient jamais propriétaire :
- de l'identité M01 ;
- du profil/état Player M02 ;
- des DMs M03 ;
- des règles de progression M05 ;
- de l'exécution des PlaySessions M06 ;
- des communautés M11 ;
- des événements M12 ;
- des changements globaux du World M13 ;
- des récompenses/ledger M14.

## 5. SYSTEM

Les fonctions internes de M15 sont présentées au Player à travers le SYSTEM contextuel.

Le Player n'a pas besoin d'un onglet distinct pour chaque capability interne.

Le SYSTEM doit supprimer les interventions non critiques lorsque le Player :
- écrit ;
- lit ;
- joue ;
- crée ;
- réalise une action nécessitant de la concentration.

## 6. AI Lab

Le AI Lab permet :
- d'examiner une limitation ;
- de formuler une candidate d'amélioration ;
- de produire un patch candidat ;
- de lancer les tests ;
- de comparer au baseline ;
- de proposer un canary ;
- d'autoriser ou rejeter selon les règles centrales.

Le AI Lab ne possède pas :
- secrets production ;
- admin ;
- service role ;
- comptes financiers ;
- pouvoir de promotion sans la chaîne centrale.

## 7. Capabilities consommées par M15

M15 consomme le catalogue central :
- text ;
- reasoning ;
- vision ;
- image ;
- video ;
- audio ;
- music ;
- TTS ;
- STT ;
- translation ;
- search ;
- embedding ;
- moderation ;
- code ;
- game;
- recommendation ;
- evolution.

La définition et la fabrication de ces capabilities ne sont pas redéfinies ici.

## 8. Interaction avec les modules

### M02 Player
M15 peut exploiter les données autorisées mais ne modifie pas directement l'identité Player.

### M03 Social
M15 peut assister traduction, rédaction, découverte et modération selon policy. Les messages privés ne deviennent pas mémoire globale par défaut.

### M05 System
M15 fournit intelligence et propositions. M05 reste owner de progression, XP, titres et état SYSTEM métier.

### M08 Game Factory
M15 produit requirements/spec/task graph. M08 reste owner de la fabrication.

### M09 Game Engine
M15 décrit ou génère les besoins. M09 reste owner du runtime.

### M11 Communities
M15 peut proposer des affinités/convergences. M11 reste owner du membership.

### M12 Events
M15 peut proposer contenu/personnalisation. M12 reste owner de l'état événementiel.

### M14 Economy
M15 peut analyser ou proposer des ajustements. M14 reste owner du ledger et des récompenses.

## 9. Living Objects / Convergence / Missions / World Memory

M15 peut détecter, proposer et orchestrer.

Les lifecycles durables restent chez les owners définis par l'architecture.

Les données provenant de sources privées doivent respecter les contrats de destination et de confidentialité centraux.

## 10. DONE M15

M15 est fonctionnel lorsque :
- les demandes AI peuvent entrer par le contrat central ;
- les modules peuvent appeler les capabilities sans connaître les providers ;
- les résultats sont validés avant mutation ;
- le AI Lab peut produire une candidate isolée ;
- les frontières M01–M14 sont respectées ;
- aucune logique AI concurrente n'est recréée dans M15.

## AI-INTÉGRATION M15 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

M15 est le seul cerveau MORISE AI et l'owner de l'AI Lab. Il connaît les modules via leurs contrats, manifests cognitifs, capabilities, scopes, dependencies, validators et authority boundaries. Cette connaissance permet à M15 de comprendre où intervenir et où s'arrêter. Elle ne transforme jamais M15 en owner des tables M01–M14. M15 possède Request Gate, Context Engine, Intent Compiler, Requirements Compiler, Reasoning, Planner, Policy, Capability/Tool Registry, Provider Router, Resource Planner, Validation, Memory, Experience, Evaluation et Evolution. AI Lab reste isolé de production secrets/admin/service-role. Evolution = limitation → gap → root cause → candidate → sandbox → tests → benchmark → security/policy → canary → promotion/rejection → monitor → rollback. DONE exige un seul cerveau et aucun router concurrent.

## GAME PLATFORM — RÔLE M15

M15 orchestre la fabrication et l'évolution des jeux mais ne possède pas la fabrication métier de M08 ni l'exécution M09.

Pour une demande de jeu, M15 doit :
1. comprendre l'intention ;
2. compiler GameRequirements ;
3. choisir 2D/3D selon les contraintes et la valeur réelle ;
4. résoudre les capabilities disponibles ;
5. construire le TaskGraph ;
6. planifier ressources et workers ;
7. sélectionner les templates/components compatibles ;
8. coordonner génération, build, tests et validation ;
9. analyser les échecs ;
10. produire une correction bornée ;
11. recommencer dans le budget autorisé ;
12. remettre à M08/M09/M06 les contrats validés.

M15 peut utiliser Codex comme agent de fabrication assistée lorsque cet outil est autorisé. Codex reste un worker/agent dans un workspace candidat. M15 conserve l'orchestration, la policy et la validation des handoffs.

M15 doit privilégier la réutilisation des fondations de la Game Platform avant de demander une nouvelle implémentation.

## GAME FABRICATION MEMORY — RÔLE M15

M15 utilise la mémoire centrale pour rendre la Game Factory cumulative : chaque fabrication validée peut améliorer les suivantes.

Cycle :
retrieve → apply → fabricate → validate → observe → learn candidate → benchmark/policy → promote/reject → retrieve on next task.

M15 doit distinguer :
- ce que MORISE sait déjà ;
- ce qui a seulement été tenté ;
- ce qui a échoué ;
- ce qui a été validé ;
- ce qui est devenu un pattern réutilisable.

Codex peut enrichir l'expérience, mais sa présence ou absence ne doit pas supprimer le savoir accumulé.

M15 ne transforme jamais une sortie de provider/agent en connaissance vraie sans evidence et validation.

## CREATIVE MEDIA INTELLIGENCE — M15

M15 is the sole AI orchestrator for user-authorized creative media analysis and generation. It does not own social publication.

For user media:
`permission → provenance → modality analysis → semantic profile → originality transformation → creative brief → capability routing → generation → validation → artifact candidate → owner commit`.

### Semantic analysis
For images, video and audio, M15 may derive broad non-expressive features such as subjects, scene structure, colors, lighting, motion, pacing, mood, genre hints and audio characteristics. It must keep protected expressive elements and source ownership classification separate from generic concepts.

### Creative transformation
M15 must never use “replace a word/character/pitch slightly” as a copyright-avoidance strategy. For third-party material it must produce a materially new brief or use an authorized remix/catalog path. For user-owned/authorized material it may perform transformations allowed by the permission class.

### Originality state
`VALID`, `INCONCLUSIVE`, `REJECTED`. INCONCLUSIVE cannot become public publication automatically.

### Artifact provenance
Every generated artifact carries sourceRefs, permission state, generation capability/version, transformation class, validation state and owner commit reference.

### Media types
The same orchestration handles IMAGE_GENERATION, VIDEO_GENERATION, MUSIC_GENERATION and AUDIO_GENERATION. A provider is selected only after privacy/capability/resource/health hard filters.

## SOCIAL VIRALITY INTELLIGENCE — M15

M15 may propose:
- personalized discovery;
- creative transformations;
- Story sequences;
- Reel concepts;
- share opportunities;
- challenge concepts;
- community proposals;
- creator insights;
- content recaps.

M15 may not fabricate popularity, social proof, users, engagement or scarcity.

A share opportunity must have a source event, audience policy, cooldown and privacy class. M15 proposes; M03 publishes; M07 ranks; M11 owns community state.

## COLD START / FIRST SESSION

M15 should optimize the first session as a sequence of meaningful experiences instead of a wall of buttons: discover → interact → create → play → connect → optionally share. The sequence adapts to actual user actions and remains functional without AI using deterministic fallback paths.

## VIRALITY SAFETY

The goal is sustainable sharing, not compulsive manipulation. M15 must respect mute, not-interested, block, privacy and notification controls. No hidden sensitive inference may be exposed as a recommendation reason.

# D10 — M15 META SYSTEM + MORISE AI LAB — EXPANSION COMPORTEMENTALE
## Single brain
M15 remains the sole MORISE AI orchestration authority. Modules expose manifests; M15 reads capabilities/dependencies/validators/authority boundaries and decides how to coordinate.
## Module cognition
For each request: load relevant manifests → identify owner → compile requirements → construct bounded graph → execute capabilities → validate → hand off to owner → record experience.
## Media
Vision/video/audio/music analysis and generation use the same central pipeline. Provider outputs are untrusted until validated.
## Social intelligence
M15 can propose discovery, creative prompts, translation, summaries, remix concepts, community candidates and game concepts, but it never owns social mutations.
## AI Lab
Limit → gap → candidate → isolated workspace → tests → benchmark → security/policy → canary → promote/reject → monitor → rollback.
## Game Factory memory
Successful game patterns, failures and repair recipes become retrievable knowledge only after validation. Codex is an interchangeable agent, not the knowledge owner.
## Viral optimization
M15 can optimize user value and content quality, but not through dark patterns, fake scarcity, fake popularity or hidden manipulation.
## DONE
All modules can call capabilities through one brain; all mutations return to owners; media and game creation survive provider changes.

# D100K — M15 Meta System / MORISE AI Lab — FORMAL VERIFICATION

Owner: M15. Scope: AI brain, routing, workers, memory, validation, evolution. Dependencies: all contract surfaces. Invariant: AI/provider outputs are untrusted until validated and committed by the module owner.

Canonical transition: ACTOR → INTENT → PRECONDITIONS → CONTEXT/POLICY → INPUTS → AUTHORITY → GUARDS → STATE → OUTPUT → VALIDATION → COMMIT → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

Forbidden: hidden owner transfer, unauthorized mutation, silent privacy expansion, stale overwrite, duplicate authoritative mutation, or treating an unverified proposal as fact.

Proof must cover nominal, empty/no-data, failure, degraded/unavailable, replay, concurrency where relevant, refresh/reopen, permissions, mobile and desktop, and the module-specific invariant.

Impact path: M15 → consumers → contracts/events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.


# RECOVERED AI / CREATOR / EXECUTION FUSION — 2026-10-03

## First-session orchestration
M15 may orchestrate First Contact through the existing capability registry, but M05 owns SYSTEM/progression presentation and module owners own durable state. First-session behavior remains functional without AI.

## MORISE Moment / Relay / Living Stories
M15 may detect Moment candidates from permitted signals; generate artifact and narrative proposals; propose Relay transformations; generate Living Story representations; and evaluate candidate quality/provenance. M03 and the relevant domain owner perform authoritative commit.

## Creation Runtime + Creation Tools
Preserved tool families include code generation/inspection/modification/refactoring; 2D/3D scene/world construction; assets/characters/animation/materials/lighting/camera; input/collision/physics/rules/state; UI/HUD/audio; persistence/networking/multiplayer adapters; build/execute/test/diagnose/correct/optimize; performance profiling. Tools are permissioned, versioned, observable and sandboxed.

## World Agents
M15 may orchestrate scoped World Agents for playtest, opponent/teammate simulation, exploration, event facilitation, validation and balancing. Agent observations are evidence candidates only; agents never become a second unrestricted AI authority.

## On-device / zero-API execution
M15 may route eligible tasks to local/browser/on-device execution, cache, trusted worker, optional community worker, approved provider, then degraded fallback. Device capability detection, memory/CPU budgets, local model lifecycle and UX safeguards are mandatory. External providers remain optional instruments.

## Collective Intelligence
M15 preserves the Collective Intelligence Engine mechanisms: Resonance; Proof of Discovery; Collective Lab; Knowledge Conflicts; Skill Transfer; Adaptive Roles; World Simulations; Contribution Intelligence. M15 orchestrates these capabilities but does not replace M13, M11, M12, M05 or M14 domain ownership.

## Creator Economy
M15 may orchestrate creator eligibility analysis, staged eligibility, contribution-chain analysis, economic capability proposals, fraud/anomaly analysis and owner/admin alerts. M14 and domain owners remain authoritative for economic/reward mutation and publication.

## Operational control
Owner/Admin Control Center behavior is constrained by M01 security and explicit administrative policy. M15 may provide analysis and alerts but cannot become an unrestricted superuser.



# HISTORICAL FUSION — M15 AI LAB — PLAN

M15 absorbe les anciens plans AI d'orchestration, context/reasoning, capability routing, memory/learning, evolution, resource scheduling, workers distribués, actions/tools et orchestration créative.

## M15 doit évoluer avec le code

Une limite observée peut déclencher une candidate d'amélioration. Les candidates peuvent concerner les algorithmes, skills, planners, parsers, retrieval, optimisations, validators ou composants de fabrication. Elles passent obligatoirement par sandbox, tests, benchmark, policy, canary et rollback.

## M15 doit évoluer avec les ressources

Le Resource Engine détecte les capacités disponibles des runtimes/workers. Une augmentation réelle de CPU/RAM/GPU/VRAM ou l'ajout d'un worker augmente l'espace d'exécution disponible sans modifier le contrat de capability.

M15 ne suppose jamais que la puissance est infinie et ne traite jamais plusieurs machines comme une seule RAM physique.

## Worker control plane

M15 possède :
- registry logique ;
- scheduler ;
- lease/retry ;
- health/heartbeat ;
- trust state ;
- resource selection ;
- task routing ;
- validation de résultats.

Le worker lui-même reste un runtime séparé. M15 ne lui délègue pas son autorité.

## Provider relationship

Les providers accélèrent ou étendent des capabilities mais ne définissent ni la mémoire, ni la policy, ni l'autorité, ni l'identité de MORISE.

## AI Lab progression

OBSERVE → DIAGNOSE → HYPOTHESIZE → FABRICATE → TEST → BENCHMARK → VALIDATE → CANARY → PROMOTE → MONITOR → ROLLBACK.

Le succès d'une évolution doit être mesurable ; l'augmentation du volume de code n'est jamais une preuve suffisante.



# D100K — HISTORICAL CONTRACT RESTORATION — M15 META AI LAB

## Restored contracts
`EvolutionProposal={id,target,rationale,patchRef,testsRef,baselineMetrics,status:'draft'|'testing'|'canary'|'approved'|'rejected'|'rolled_back'}`
`SystemAction={id,capability,actorId,authorization,status:'requested'|'running'|'completed'|'failed'}`

Evolution input is filtered by provenance, privacy, consent, safety and aggregation policy. External provider output is evidence, never unquestioned truth.

Autonomous production changes are forbidden for security policy, provider registry, RLS, worker trust policy and destructive operations. M15 may submit work to the Control Plane; scheduler selects trusted/community workers; workers never receive production master secrets or unrestricted database access.

Required test families include prompt injection, data leakage, cross-user isolation, malicious patches, stale proposals, worker failure, provider disagreement, rollback and canary regression.

## D100K proof
Every proposal has baseline metrics, measurable acceptance criteria, candidate artifact lineage, sandbox result, security/policy result, canary result, promotion decision and rollback reference.



# D100K — RESTORED AI LAB FAILURE / NO-AI CONTINUITY

M15 must preserve useful deterministic capabilities when providers, workers or model execution targets are unavailable. The AI Layer can fall back to rules, cached validated knowledge, deterministic planners, local computation, previously promoted skills or degraded presentation.

AI fallibility itself can be a controlled experiment only when the experiment is real, reversible and clearly distinguishable from system corruption. A provider error must never be presented as a MORISE truth.

D100K: zero providers, zero community workers, worker loss, provider disagreement, malformed output, deterministic fallback, false-success prevention and rollback evidence.



# D100K — RESTORED ORCHESTRATION LEARNING CONTRACT

M15 may retain validated orchestration lessons:
which capability was selected, in what order, with which parameters, under which resource/privacy constraints, and how the result behaved.

A lesson candidate is not production behavior. It requires benchmark comparison, policy/security review and controlled promotion.

Cross-domain compositions are one MORISE experience graph, not separate AI brains or navigation modules.

---
