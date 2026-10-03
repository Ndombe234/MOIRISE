# MOIRISE — INVENTAIRE HISTORIQUE COMPLET FUSIONNÉ

## Sources utilisées
- MORISE_MASTER_PLAN_V3 historique ;
- Module status/execution template ;
- Navigation specifications ;
- Home/World design ;
- SYSTEM core/HUD/navigation specs ;
- PLAY engine and PLAY lab specs/plans ;
- AI architecture commits ;
- current canonical documentation ;
- current repository evidence.

## Règle de lecture
Un nom historique peut être :
A. un module ;
B. une sous-fonction ;
C. un mécanisme transversal ;
D. un ancien alias ;
E. un document technique supprimé après consolidation.

Il ne doit pas être transformé automatiquement en module.

## Inventaire

### Core/SYSTEM
Foundation; Player; World; Social; Private Messaging; Play; Guilds/Communities; System Orchestrator; Context Engine; Intent Engine; Reasoning Engine; Planner; Capability Registry; Tool Registry; Provider Registry; Provider Router; Resource Planner; Resource Scheduler; Validation Engine; Event Bus; Health/Observability.

### AI-native
MORISE AI Core; AI Gateway; AI Request; Context Pack; Intent Parsing; Reasoning; Planning; Task Graph; Capability maturity; Autonomy levels; Policy Engine; Tool Registry; Provider Adapters; Resource Router; Orchestrator; Task Engine; Validators; Self-Correction; Evaluation; Benchmarking; Canary; Rollback; AI Lab.

### Memory/Learning
Session Memory; Player Memory; Experience Memory; World Memory; Community Memory; Creator Memory; System Observation; memory provenance; scope; consent; retention; deletion; Task-Experience Learning Loop; Feedback Learning; Learning Candidate; Failure Analysis; Capability Gap Detection; Improvement Hypothesis; Offline Evaluation; Regression Evaluation; Pattern Detection.

### Evolution
Evolution Engine; Self-Improvement; Self-Evaluation; Self-Development; Controlled Self-Evolution; Code Candidate; Refactoring Candidate; Algorithm Candidate; Sandbox; Experimental Branch; Benchmark; Security Validation; Canary; Promotion; Rejection; Rollback.

### Signature mechanics
Living Objects; Trace; Living World; Hidden Possibilities; Unexplored Paths; Evolving Identity; MORISE Double; Fun & Surprise; MORISE DNA; Convergence; Convergence Space; Emergence Event; Emergent Mission; Missions From Reality; World Memory.

### Social
Feed; Posts; Comments; Reactions; Follows; Sharing; Moments; Moment Cards; Private Messaging; Conversation Context; Translation; Social Intelligence; Relationship Intelligence; Social Discovery; Social Recommendations.

### Communities
User-created groups; GUILDS; membership; roles; invitations; community feed; community goals; challenges; events; moderation; community intelligence; affinity detection; adaptive community proposal; Living Object community seed; Convergence collaboration.

### World/Discovery
Home World; Discover; Curiosity Map concepts; recommendation; search; game discovery; people discovery; community discovery; content discovery; novelty; diversity; freshness; detours; Adaptive World; Living Object discovery; World Memory retrieval.

### Play
Play Now; experience selector; Pulse micro-games; Drift exploration; Forge creation games; Duel asynchronous challenges; Quest progression experiences; World larger 3D experiences; Play sessions; save/resume; result validation; Moments; shareable results; mobile controls.

### Game creation
Market research; demand research; concept; Game Designer AI; core loop; rules; visual direction; Game Specification; engine selection; Adventure 2D; Battle 2D; Puzzle 2D; approved 3D engines; content generation; code generation; asset generation; audio; frontend/backend/data; security; anti-cheat; build; simulation; testing; playtest; balancing; mobile optimization; preview; versioning; publish; iteration.

### Creative
Creative Brief; text; image; video; audio; music; voice/TTS; STT; composition; artifact version; provenance; originality policy; license/source metadata; moderation; storage; export.

### Social Gaming
Challenges; rematches; invitations; co-op; community challenges; asynchronous competition; cohort leaderboards; shared milestones; result cards; Living Object playable branches; Convergence game experiments.

### Events
Activities; challenges; tournaments; quests; schedules; eligibility; registration; progress; completion; real future continuations; Event Memory; Living Object→Event conversion; Fun & Surprise events; Emergence Events.

### Progression/Rewards
XP; levels; ranks; titles; achievements; reward eligibility; collection; cards/objects; roulette; streaks; contribution rewards; creator incentives; fraud/anomaly analysis; fair economy.

### Distributed compute
Local/on-device; browser compute; Trusted Worker; Community Worker; capability manifest; resource quota; heartbeat; lease; sandbox; scheduling; health; drain; revocation; task recovery; fallback worker.

### Providers
Pollinations; Puter; LLM7; Vireonix; Murakumo; Kilo AI; AI Horde; AI Horde OpenAI API; Cehpoint AI; OVH AI Endpoints; Quillly; Openverse; Internet Archive; Gemini; DeepSeek; OpenRouter; other verified adapters.

## Canonical ownership
15 modules are ownership boundaries; the mechanisms above remain inside those boundaries unless the master plan explicitly marks them transversal.

## Preservation
When an old document is deleted, a mechanism is not considered deleted until its behavior has been:
- mapped to a canonical owner;
- rewritten into the appropriate Plan;
- rewritten into the appropriate Technical Design;
- covered by the feature matrix;
- given tests/acceptance rules.

## Status vocabulary
PRESERVED = behavior explicitly represented.
MERGED = behavior retained under another owner.
AUXILIARY = provider/tool rather than product mechanism.
HISTORICAL_ALIAS = name retained only for traceability.
REJECTED = intentionally not in current product, with reason.


## Recovered V3 features now explicitly preserved

The historical MORISE_MASTER_PLAN_V3.md contained a second layer of functionality that was not fully visible in the earlier inventory. These names are now retained here for traceability and canonical reconciliation.

### First-session
MORISE First Contact; 120-second discovery experience; SYSTEM invitation; meaningful first choice; living micro-world; anomaly/reaction; adaptive challenge; reveal/continuation; post-contact curiosity continuation.

### Memorable/social continuity
MORISE Moment; Moment artifact; shareable experience; MORISE Relay; Living Stories; dynamic stories; story lineage; story branching; player experience replay/reconstruction.

### Evolution
Trace; Living World; Hidden Possibilities; Unexplored Paths; Evolving Identity; MORISE Double; Fun & Surprise; MORISE Emergent Experience Engine; What If; You Missed Something; Hidden Rule; Play Against Your Trace; Worlds That Remember; One Problem, Many Approaches; Mutation; Role Inversion; Mystery Investigation; AI Fallibility; Player Laboratory; Emergent Experience; MORISE Dream / Hypothesis Synthesis.

### Experience Economy
Day-1 solo rule; personal Moment of the day; personal evolving world; SYSTEM companion continuity; Leave Something for the Next Player; Remix-me; Creator DNA/creative lineage; creation-to-world conversion; community music/collaborative media; MORISE discovery broadcast; Living Museum; creator capability progression; creator economic bridge; Proof of Impossible; low-population World Events; return-after-absence experience.

### Creator / operational economy
Creator Economy eligibility; progressive activation thresholds; eligibility stages; Creator Eligibility Engine; economic capability activation; creator contribution chains; controlled monetization activation; free-first growth; high-threshold owner alerts; Owner/Admin Control Center; permission hierarchy; operational audit.

### Native execution
MORISE Creation Runtime; MORISE Creation Tools; World Agents; bounded playtest/simulation/opponent/exploration agents; browser/on-device capability routing; device-tier execution; local model lifecycle; controlled browser compute; infrastructure-light retention engine.

These historical mechanisms are now RECOVERED-FUSED, not deleted product scope.

## D100K technical reconciliation status — 2026-10-03
Recovered historical behaviors are now represented in the canonical module TECHNICAL_DESIGN layer through explicit recovered-feature fabrication bindings. The transversal Context/Memory contract is centralized and reused by all modules. This closes the documentation-level reconciliation of the recovered feature set; it does not claim runtime implementation.


## AI / COMPUTE HISTORICAL FUSION — STATUS — 2026-10-03

The deleted AI specialist documents covering orchestration, reasoning/context, capabilities/providers, memory/learning, creative generation, evolution/code sandbox, data/security/provenance, resource scheduling, actions/tools, game runtime and distributed workers have been functionally absorbed.

Canonical ownership after fusion:
- M15 PLAN + TECHNICAL_DESIGN: AI Core, orchestration, capability routing, provider independence, resource scheduling, worker control plane, memory/learning, evolution and multimodal orchestration.
- M08 PLAN + TECHNICAL_DESIGN: game fabrication DAG, artifacts, repairs, fabrication memory and 2D/3D factory concerns.
- M09 PLAN + TECHNICAL_DESIGN: game runtime, resource enforcement, sandbox, worker/runtime leases and 2D/3D execution.

Deleted documents are not restored as sources of truth. Their verified requirements are represented by the current canonical plans/designs and the traceability matrix.

