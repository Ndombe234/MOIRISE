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
