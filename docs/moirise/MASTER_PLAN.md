# MOIRISE — PLAN MAÎTRE CANONIQUE — RÉFÉRENCE UNIQUE

## 1. Produit
MOIRISE est un réseau social Otaku, ludique et créatif dont le SYSTEM constitue le langage d'interaction central. Le produit garde peu de portes principales, mais chaque porte expose une profondeur importante au bon moment. SOLO reste utile; COLLECTIVE est utilisé lorsqu'il apporte une vraie valeur.

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

## 27. AI fabrication context and error-reduction contract

MOIRISE is presented to ChatGPT/Codex through controlled canonical context, not through a single informal project prompt. Before any substantial implementation task, the agent MUST read the complete canonical pair for every affected module, the relevant transversal contracts, dependency rules, definition of done, the applicable AI pair when MORISE AI is involved, and the current repository state.

The pre-fabrication context MUST distinguish:
- what EXISTS now;
- what is MISSING;
- what must be TO_MODIFY;
- what is FORBIDDEN to change;
- what is an AFFECTED_DEPENDENCY;
- which document/module owns each decision.

The agent MUST separate understanding from fabrication:
READ → CURRENT-STATE RECONCILIATION → DEPENDENCY CHECK → PLAN → FABRICATE → TEST → VERIFY → INTEGRATE → REGRESSION → LOCK.

A task must expose implementation-critical facts rather than forcing the agent to infer them: exact files/functions, routes, schemas, events, states, commands, guards, permissions, dependencies, acceptance criteria and evidence requirements. When evidence or canonical sources conflict, the affected fabrication path is blocked until the coordinator resolves the authority. Legacy runtime code is never treated as current architecture merely because it exists in the repository.

## 28. Quality metrics and realistic success targets

MOIRISE does not claim a guaranteed 80% success rate or a guaranteed 10–20% error rate. Instead, engineering quality is measured with separate observable metrics:
- first-pass task success;
- correction count;
- integration defects;
- regressions;
- focused/integration test failures;
- browser failures;
- unresolved assumptions.

An 80% first-pass success target or a 10–20% error envelope may be used as an operational KPI. It is not a correctness guarantee and never permits bypassing verification.

The primary strategy for improving these metrics is to reduce the agent's guess surface through canonical context, precise ownership, dependency visibility, deterministic tests and independent integrated verification.

## 29. Universal fabrication proof gate

No module, AI capability, game, social surface, media workflow or cross-module mechanism is DONE from code generation alone. The applicable proof chain is:

CODE EXISTS → TYPE/BUILD → FOCUSED TESTS → CONTRACT/INTEGRATION → RUNTIME/ROUTE → DESKTOP/MOBILE BROWSER WHERE RELEVANT → ERROR/RELOAD/PERMISSION/SECURITY CASES → DEPENDENCY REGRESSION → FRESH EVIDENCE → LOCKED.

A worker handoff, generated code, isolated green test, successful build or previous run is evidence input, not the final proof of integrated correctness.
