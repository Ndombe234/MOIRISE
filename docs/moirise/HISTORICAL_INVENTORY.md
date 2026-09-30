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
