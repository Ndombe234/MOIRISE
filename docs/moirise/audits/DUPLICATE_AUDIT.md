# DUPLICATE AUDIT — MOIRISE

## 1. Canonical ownership
Exactly 15 product modules exist. Every business mechanism has one owner.

M15 owns central AI orchestration:
- Request Gate
- Actor resolution
- Data classification
- Context Engine
- Intent Compiler
- Requirements Compiler
- Reasoning orchestration
- Planner
- Policy Engine
- Capability Registry
- Tool Registry
- Resource / Provider Router
- Provider adapters
- Validation Engine
- AI Memory / Learning
- Evolution / AI Lab

M15 does not own M01 identity, M03 private messaging, M05 progression, M11 membership, M12 Event state or M14 reward/economy state.

## 2. Exactly two canonical AI documents

### AI_MASTER_PLAN.md
Canonical source for WHAT:
- identity
- architecture
- responsibilities
- ownership
- invariants
- capability families
- provider catalogue/status
- global completion criteria

### AI_TECHNICAL_DESIGN.md
Canonical source for HOW:
- file tree
- TypeScript contracts
- algorithms
- decision branches
- state machines
- SQL
- HTTP routes
- provider adapters
- worker scheduler
- leases
- sandbox
- validation
- memory
- evolution
- security
- tests
- assembly order

The technical document must not create a second AI behavior authority. The master plan must not become a second implementation manual.

## 3. Removed duplicate provider registries
The following competing documents were deliberately deleted:
- docs/moirise/ai/PROVIDER_REGISTRY.md
- docs/moirise/transversal/PROVIDER_REGISTRY.md

Reason:
their provider lists/contracts are now represented in the canonical AI pair. Keeping them would create a third source of truth for provider routing.

## 4. Removed aggregate duplicates
Historical aggregate files are forbidden as active authorities:
- FUNCTIONAL_BEHAVIOR_SPEC.md
- TECHNICAL_IMPLEMENTATION_SPEC.md

Their useful requirements belong in canonical owner documents.

## 5. Forbidden duplicate authorities
Never create:
- second AI brain
- second Request Gate
- second Context Engine
- second Intent Compiler
- second Requirements Compiler
- second Policy Engine
- second Capability Registry
- second Tool Registry
- second Provider Router
- second Validation Engine
- second Memory Service
- second Evolution pipeline
- second progression/XP authority
- second community membership authority
- second reward/roulette ledger
- second World Memory lifecycle
- second Living Object lifecycle
- second Event scheduling/future-state authority
- second Play result authority

## 6. Provider rule
Providers are execution adapters only.

Forbidden:
- direct provider calls from UI
- direct provider calls from module business logic
- module-specific provider routers
- hidden fallback trees outside M15
- client-supplied provider URL
- model-supplied arbitrary provider URL

All provider selection goes through the single M15 router.

## 7. AI precision rule
Every new AI mechanism must follow:
ACTOR → TRIGGER → PRECONDITIONS → INPUTS → FILE → CONTRACT → ALGORITHM → DECISIONS → OUTPUT → STATE → EVENTS → ERRORS → RECOVERY → SECURITY → OBSERVABILITY → TESTS → DONE.

A sentence that cannot be implemented without guessing is not sufficient documentation.

## 8. Maintenance rule
When a new AI feature is proposed:
1. identify whether a canonical M15 mechanism already exists;
2. extend the existing mechanism if it is the same concern;
3. update AI_MASTER_PLAN only when WHAT changes;
4. update AI_TECHNICAL_DESIGN when HOW changes;
5. avoid creating a third AI document;
6. remove any competing source;
7. re-run this audit.

## 9. Final verification targets
- canonical AI plan = 1
- canonical AI technical design = 1
- separate AI provider registry = 0
- separate transversal provider registry = 0
- aggregate functional AI spec = 0
- aggregate technical AI spec = 0
- second AI brain = 0
- second Provider Router = 0
- second Validation Engine = 0
- active M16-M20 module files = 0


## 10. Vérification AI ↔ modules — 2026-09-30

L'architecture « AI first → environnement compris → modules adaptés » est maintenant documentée dans les 30 fichiers actifs des 15 modules.

Chaque PLAN.md contient un contrat AI d'intégration spécifiant :
- position du module par rapport à MORISE AI ;
- responsabilités et non-responsabilités ;
- contextes autorisés ;
- capacités AI ;
- frontières de mutation ;
- fallback sans AI ;
- critères DONE.

Chaque TECHNICAL_DESIGN.md contient un contrat technique AI spécifiant :
- structure de contexte ;
- boundary de capability ;
- séquence de validation/commit ;
- sécurité ;
- idempotence ou recovery selon le module ;
- tests de contrat.

Le détail central de la compréhension de l'IA de fabrication reste dans AI_MASTER_PLAN.md et AI_TECHNICAL_DESIGN.md. Les modules n'imitent pas le cerveau central : ils décrivent comment leur domaine communique avec lui.

### Nouveaux invariants vérifiés
- 15/15 modules possèdent un AI integration contract dans PLAN.
- 15/15 modules possèdent un AI module contract dans TECHNICAL_DESIGN.
- 1 seul cerveau d'orchestration.
- 1 seul Context Engine.
- 1 seul Capability Registry.
- 1 seul Provider Router.
- 1 seule Validation Engine.
- aucun provider choisi directement par un module/UI.
- aucune autorité métier M01–M14 transférée à M15.
- les sorties AI restent proposition/evidence jusqu'au commit de l'owner.

## 11. Native Game Platform verification — 2026-09-30

The 2D/3D game platform is now represented across the canonical AI design and the adapted module boundaries.

Verified scope:
- AI_MASTER_PLAN: native reusable Game Platform, 2D/3D fabrication pipeline, repair loop, agent/Codex boundary, reuse and ownership.
- AI_TECHNICAL_DESIGN: GameSpecification, GameProject, GameArtifact, GameBuild, GameIntegration, fabrication state machine, task graph, repair controller, runtime selection, agent boundary and final game tests.
- M06: PLAY integration.
- M07: game catalog/discovery integration.
- M08: permanent Game Factory Platform.
- M09: reusable 2D/3D runtime and sandbox.
- M10: social game hooks.
- M15: AI orchestration of game fabrication and repair.

Invariant:
game generation does not recreate MOIRISE per game. It reuses the permanent game platform and only creates the game-specific specification, artifacts and build.

## 12. Game fabrication memory verification — 2026-09-30

Le savoir-faire de fabrication des jeux est rattaché au MemoryService central. Aucun GameMemoryService parallèle n'a été créé.

Vérifications :
- Game Fabrication Knowledge = dataClass GAME_* dans la mémoire centrale.
- M08 produit les evidence bundles et possède artifacts/GameSpecification.
- M15 orchestre retrieval, learning, benchmark, policy, canary et promotion.
- Les corrections/échecs sont versionnés et ne deviennent pas automatiquement des recettes.
- Codex est un execution target optionnel ; il ne possède ni mémoire, ni vérité, ni publication authority.
- Les connaissances validées restent disponibles lorsque Codex est désactivé.
- Une projection GameKnowledge est reconstruisible et n'est pas une deuxième source de vérité.

## 12. Game fabrication memory verification — 2026-09-30

Le savoir-faire de fabrication des jeux est rattaché au MemoryService central. Aucun GameMemoryService parallèle n'a été créé.

Vérifications :
- Game Fabrication Knowledge utilise les dataClass GAME_* de la mémoire centrale.
- M08 produit les evidence bundles et possède artifacts/GameSpecification.
- M15 orchestre retrieval, learning, benchmark, policy, canary et promotion.
- Les corrections et échecs sont versionnés et ne deviennent pas automatiquement des recettes.
- Codex est une cible d'exécution optionnelle ; il ne possède ni mémoire, ni vérité, ni autorité de publication.
- Les connaissances validées restent disponibles lorsque Codex est désactivé.
- Les projections GameKnowledge sont reconstruisibles et ne deviennent pas une deuxième source de vérité.


## D100K AI layer — 2026-10-02
La formalisation AI est maintenant complète dans les deux seules sources canoniques :
- AI_MASTER_PLAN.md : propriétés formelles de cognition, autonomie, capacités, mémoire, évolution, authority et proof.
- AI_TECHNICAL_DESIGN.md : fabrication fichier/symbole, pipeline RequestGate→Validation→OwnerCommit, adversarial tests, property checks, evidence graph et Dependency Impact Layer.

Objectif vérifiable : aucun troisième « AI brain », router, provider registry, memory authority ou evolution authority documentaire ne doit apparaître.