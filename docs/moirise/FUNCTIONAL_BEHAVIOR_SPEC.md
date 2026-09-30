# MOIRISE — FUNCTIONAL BEHAVIOR SPECIFICATION — IMPLEMENTATION-GRADE DETAIL

> **Canonical rule:** a feature is not sufficiently specified when a developer/AI still has to guess what a sentence means. This document expands the module plans into operational behavior. It is a supplement, not a second competing architecture. If an older document describes the same mechanism differently, the canonical owner and contracts in the Master Plan prevail.

## 0. How to read this document

For every capability, the implementation must be answerable in this order:

1. **Actor** — who can trigger it.
2. **Trigger** — exact UI/system/event trigger.
3. **Preconditions** — what must already be true.
4. **Inputs** — exact values required.
5. **Decision** — deterministic policy and, where AI is involved, the AI's bounded role.
6. **Mutation** — exactly what is created/changed/deleted.
7. **Projection** — exactly what the user sees.
8. **Events** — emitted events and owners.
9. **Failure** — what happens when each dependency fails.
10. **Recovery** — retry/resume/rollback behavior.
11. **Privacy/security** — what may and may not cross boundaries.
12. **Tests/DONE** — observable proof that the behavior works.

The implementation must not invent a missing rule silently. If a rule is genuinely unresolved, it becomes an explicit design decision before coding.

---

# M01 — FOUNDATION

## M01.1 Application shell
**Actor:** any visitor/session. **Trigger:** application boot or navigation. **Preconditions:** static assets available enough to render shell. **Inputs:** runtime config, viewport, session token if present. **Decision:** validate configuration, restore session, resolve route. **Mutation:** none during normal boot. **Projection:** shell with one clear loading/degraded state. **Failure:** missing optional service never produces a white screen. **Recovery:** retry optional service while shell remains usable. **Security:** no secret is sent to browser. **DONE:** boot works with full and degraded dependencies.

## M01.2 Routing boundary
Route request is normalized, authentication requirement checked, feature flag checked, then handed to the owning module. Unknown/disabled route becomes a recoverable navigation state. Direct route access cannot bypass authorization.

## M01.3 Session/auth boundary
Auth provider proves identity; M01 creates the session context used by downstream modules. Client-supplied user IDs are never authoritative. Expiration produces re-authentication rather than partial writes.

## M01.4 Event bus
An owner emits a typed event containing eventId, actor/session reference where permitted, timestamp, schema version and payload reference. Consumers subscribe without writing the owner's tables. Duplicate delivery is tolerated by idempotent consumers.

## M01.5 Capability registry
A capability has ID, version, owner, input/output schema, policy class, provider adapters, resource profile and enabled state. A module asks for a capability; it never selects a provider by UI code.

## M01.6 AI gateway
Request → validate schema → authorization → capability policy → context minimization → M15 → provider adapter if needed → normalized response → validation → module. Provider outage returns a typed degraded result.

## M01.7 Configuration/feature flags
Configuration is environment-specific and validated at boot. Feature flags can disable a capability without deleting its data. A disabled feature returns a safe unavailable state.

## M01.8 Loading/error/degraded states
Every major surface has explicit LOADING, READY, EMPTY, ERROR and DEGRADED states. No module may rely on a blank screen as an error state.

## M01.9 Observability
Critical mutations receive requestId/traceId. Logs record metadata, not private content by default. Metrics distinguish user action, provider failure, validation failure and internal failure.

## M01.10 Rate limiting and validation
Every externally triggerable expensive operation has schema validation and a bounded rate/resource policy. Retry keys prevent repeated charges/mutations.

---

# M02 — PLAYER

## M02.1 Player bootstrap
**Trigger:** first authenticated entry. Ensure exactly one Player record exists for auth.users.id. Create defaults atomically/idempotently. Emit PLAYER_CREATED only on first creation. A retry returns the existing Player.

## M02.2 Public/private profile
Public projection contains only fields allowed by privacy settings. Private fields remain behind owner authorization. Updating a private field invalidates affected public projection only after successful persistence.

## M02.3 Handle uniqueness
Normalize requested handle → check canonical uniqueness → reserve/change atomically → return conflict if occupied. Case/Unicode normalization rules are centralized.

## M02.4 Avatar upload
Validate type, size, dimensions and ownership → quarantine/process → publish approved reference → update profile. Failed processing leaves previous avatar intact.

## M02.5 AI avatar generation
Player supplies prompt/preferences → M15 validates capability and policy → provider generates candidate → safety/format validation → preview → explicit confirmation → avatar reference saved. Provider is replaceable; generation failure never corrupts the current avatar.

## M02.6 Preferences
A preference change records actor, key, old/new version and timestamp. Preferences influence contextual presentation only where the consuming module declares that key.

## M02.7 Privacy controls
Visibility is checked at read/projection time, not merely at UI time. A change immediately affects future reads and invalidates cached public views.

## M02.8 Activity/creation/game history
History is derived from authoritative events/results rather than manually typed counters. Deleted/private source objects disappear from projections according to retention rules.

## M02.9 Player Memory
Only explicit/validated memories are stored. Each memory has source, confidence/state, privacy class, created/updated time and deletion behavior. Memory is not a free-form dump of private conversations.

## M02.10 MORISE DNA signals
Validated actions can create evidence records. M15 may transform evidence into a candidate pattern; M02 does not infer sensitive traits. Candidate patterns remain versioned and can be invalidated.

## M02.11 Export/delete
Verify ownership → enumerate data classes → export/delete/anonymize according to retention policy → invalidate caches/references → emit completion event. Partial failure creates a resumable job rather than claiming completion.

## M02.12 Block/mute preferences
Block/mute is an enforceable relation consumed by Social, Discovery and Communities. A blocked actor cannot regain visibility through recommendation ranking.

---

# M03 — SOCIAL + PRIVATE MESSAGING

## M03.1 Feed
Request page cursor → apply visibility/block/mute rules → retrieve approved posts → rank according to M13/M07 contract → return projection plus cursor. No fake activity counts.

## M03.2 Post creation
Compose → validate length/media/policy → resolve visibility → persist → emit POST_CREATED → update feed projection. A failed publish keeps draft locally/server-side according to draft policy and never creates a phantom post.

## M03.3 Comments/reactions
Authorize target → validate target state → create idempotent mutation → emit event → update counts/projection. Deleted target causes a safe unavailable state rather than orphaned writes.

## M03.4 Follow/relations
Check self-follow/block/privacy → create relation idempotently → emit relation event. Unfollow reverses only that relation. Recommendation cannot override a block.

## M03.5 Sharing/Moment Cards
Source object → privacy projection → create share token with expiry/scope → recipient opens allowed projection. Private source content never leaks through a public card.

## M03.6 Private conversations
Create/open conversation → verify participant policy → establish participant membership → fetch bounded history. Only participants and explicitly authorized systems can access message content.

## M03.7 Message send/edit/delete
Validate sender membership → validate payload → create client idempotency key → persist → delivery event. Edit/delete checks author/policy and keeps an audit-safe version reference where required. Retry returns prior result.

## M03.8 Read receipts/presence/typing
Ephemeral presence is time-limited and privacy-controlled. Typing indicators are not durable messages. Read receipt is written only for authorized participant and is idempotent.

## M03.9 Attachments
Upload to controlled storage → validate ownership/type/size → create AttachmentRef → attach only after upload succeeds. Failed upload cannot create a message containing a dead reference.

## M03.10 Translation
Source message remains canonical. Translation is a view. Explicit language request → local/cache path → approved provider path if necessary → store bounded translation cache keyed by source hash + language + policy version. Never overwrite original text.

## M03.11 Social recommendations
Use only allowed signals. Produce candidate + safe reason key. Blocked/muted/private users are filtered before presentation. Recommendation feedback can suppress repeated suggestions.

## M03.12 Reports/moderation hooks
Report creates a moderation case reference, not an immediate punishment. The moderation owner decides action. Reporter privacy is protected.

---

# M04 — WORLD

## M04.1 Home World
Build a small contextual surface from current Player context and approved recommendations. Show only a limited number of primary actions. Internal capabilities remain behind those doors.

## M04.2 First-arrival behavior
On a new session, show orientation, one immediately understandable action and at most a small number of contextual opportunities. The system may create suspense through legitimate events, but must not fabricate popularity, people or rewards.

## M04.3 Context cards
Each card contains action, reason key, expiry/cooldown and source reference. Dismissal is recorded so the same card is not immediately repeated.

## M04.4 Detours
A detour is an optional contextual opportunity selected from eligible signals. It must have relevance, a bounded presentation frequency and a return path. If dismissed, the World remains usable.

## M04.5 Doors
World maps complex systems to 5–6 principal navigation doors. Adding an internal capability does not automatically add a new button. The SYSTEM can surface a capability contextually when appropriate.

## M04.6 Handoff
World → Play/Create/Community/Events passes an explicit intent object. The destination owns execution and validation.

## M04.7 Solo-first orientation
A Player can progress alone. Social and multiplayer opportunities are invitations, not prerequisites unless an experience explicitly requires collaboration.

---

# M05 — SYSTEM / PROGRESSION

## M05.1 SYSTEM surface
SYSTEM is the site's interaction language, not a separate RPG mini-game. It presents relevant status, objectives, discoveries, rewards and next actions without spamming system text.

## M05.2 Progression
Validated event/result → rule version lookup → eligibility → XP/progression mutation → progression event. Client cannot award itself progression.

## M05.3 Titles
A title is unlocked only from an explicit rule/evidence chain. The rule version and source event are retained. The UI may present the title as a discovery rather than a constant notification.

## M05.4 Objectives/quests
Objective has definition, prerequisites, progress state, completion rule, reward reference and expiry where applicable. Progress updates are idempotent.

## M05.5 Rewards handoff
M05 determines progression eligibility; M14 owns collection/economy grant. No duplicate reward is created by retry.

## M05.6 Adaptive SYSTEM events
M15 may propose an event, but M05 checks policy, timing, Player state and cooldown before presenting it. Rejected/expired events are not silently repeated.

---

# M06 — PLAY

## M06.1 Launch
Player chooses Play → M06 asks Discovery for an eligible experience → preview → explicit launch → create server-owned session. No game starts merely because a card was rendered.

## M06.2 Session
Session contains experienceId, rulesVersion, runtime version, Player reference, start time, expiry, save version and idempotency key. Client state is not authoritative for rewards.

## M06.3 Result
Runtime submits attempt evidence → validator checks session ownership, allowed transitions, score bounds, completion rules and idempotency → authoritative result → M05/M14 events.

## M06.4 Recovery
Runtime crash → preserve last valid save → return to Play shell → offer resume/restart. Provider outage affects only optional adaptive content, not the core result path when the game can run locally.

## M06.5 Shareable moment
Validated result → privacy projection → M03 share/moment contract. A private session never becomes public merely because the Player taps share.

---

# M07 — GAME DISCOVERY

## M07.1 Search
Normalize query → visibility/moderation filter → retrieve candidates → deterministic/semantic ranking → paginate. Search remains functional without AI.

## M07.2 Recommendation
Inputs: explicit preferences, validated history, progression context, freshness, novelty budget and diversity budget. Exclude blocked/private/unsafe candidates first. Produce candidate + safe reason.

## M07.3 Novelty
Reserve a bounded portion of recommendations for relevant unfamiliar experiences. Novelty never bypasses safety or visibility.

## M07.4 Research
Research evidence stores source, URL/reference, retrieval time, claim, confidence and usage/licensing note. External research informs decisions; it is not treated as unquestionable truth.

## M07.5 Feedback
Play, completion, dismiss, share and explicit ratings become normalized signals. Burst manipulation is rate-limited and new/untrusted signals are bounded.

---

# M08 — GAME FACTORY

## M08.1 Natural-language creation
Player describes idea → extract requirements → detect ambiguity → ask only necessary clarification → produce GameSpecification → preview editable plan.

## M08.2 GameSpecification
Contains identity, genre, mode, engine, scenes, entities, controls, rules, quests, rewards, assets, audio, difficulty, win/loss, save, share, multiplayer, accessibility, performance and test plan.

## M08.3 A→Z pipeline
Research → concept → core loop → design → prototype → assets → implementation → integration → security → tests → balancing → performance → preview → publish → observe → iterate.

## M08.4 2D
Adventure 2D = exploration/NPC/quest runtime. Battle 2D = combat/state/loot runtime. Puzzle 2D = deterministic rules/interaction runtime. The selected runtime is based on the specification, not on arbitrary provider choice.

## M08.5 3D
3D is selected when spatial interaction materially benefits the experience. Scene graph, camera, lighting, collision, asset budgets, loading strategy, device capability and fallback are specified before generation.

## M08.6 Generated artifacts
Every generated source/asset is versioned and linked to the specification node that created it. An artifact is not production-ready until validated.

## M08.7 Correction loop
Build/test failure → structured diagnostics → identify failing node → bounded correction candidate → isolated workspace → rerun tests. Stable version is never overwritten until promotion.

## M08.8 Publication
Build → static/type checks → runtime checks → security/resource checks → preview → authorized publish command → immutable version → activeVersion pointer. Rollback points to a previous immutable version.

## M08.9 Living Object conversion
Living Object → eligibility check → branch specification → preserve lineage/attribution → generate game branch → validate → publish as separate version.

---

# M09 — SHARED GAME ENGINE

## M09.1 Runtime manifest
Declares engineId, 2D/3D mode, entrypoint, assets, bridge capabilities, input map, save schema, network policy and resource budget.

## M09.2 Bridge
Runtime receives only explicit functions: safe context, save request, share request, completion attempt and permitted telemetry. No arbitrary database or secret access.

## M09.3 Save/load
Save is versioned and checksummed. Known schema resumes directly; known migration transforms explicitly; unknown schema returns a safe incompatibility state.

## M09.4 3D loading
3D engine and heavy assets are code-split/lazy-loaded. The normal site shell does not pay the 3D cost before launch.

## M09.5 Isolation
Malicious package, infinite loop, memory exhaustion, unauthorized network and sibling-file access are treated as runtime threats and constrained by sandbox/resource policy.

---

# M10 — SOCIAL GAMING

## M10.1 Challenge
Validated result → challenge rules/version → visibility/target → expiry → invitation. Private source details are projected only when permitted.

## M10.2 Async play
Recipient plays independently. The original challenge remains immutable in rules version; the response creates a new attempt.

## M10.3 Comparison
Only authoritative validated results are compared. Tie rules and scoring rules are versioned.

## M10.4 Rematch
Rematch creates a new session, never edits the old result.

## M10.5 Community challenge
M11 owns membership. M10 owns challenge state. M05/M14 consume validated completion for progression/rewards.

## M10.6 Abuse controls
Expiry, rate limits, duplicate prevention, block/mute enforcement and result validation apply before presentation.

---

# M11 — COMMUNITIES / GROUPS

## M11.1 User-created group
User taps Create Group → validates identity/permissions → enters name/description/visibility/rules → validates → creates community → creates OWNER membership → emits COMMUNITY_CREATED → opens group management view.

## M11.2 Join public group
User requests/open join → visibility and block rules → membership mutation → welcome projection. Private groups require invitation/approval according to policy.

## M11.3 Roles
OWNER controls ownership-level settings; ADMIN manages allowed settings; MODERATOR performs moderation actions; MEMBER participates; GUEST is read-only where enabled. Every role mutation is authorized server-side.

## M11.4 AI-created group
M15 detects a candidate only from allowed non-sensitive signals. It checks existing groups, duplicate proposals, blocked relations and cooldown. If policy allows automatic creation, it creates using a versioned rule; otherwise it proposes to users. Rejected proposals are suppressed temporarily.

## M11.5 Group activity
Posts, events, challenges and games are linked by references. The group does not copy their authoritative data.

## M11.6 Closure/transfer
Owner transfer or closure is explicit. A deleted/closed group cannot continue receiving new activity. Historical records follow retention policy.

---

# M12 — EVENTS / ACTIVITIES

## M12.1 Create event
Authorized creator supplies title, description, time, visibility, capacity/rules and activity definition → validate → draft/publish → event becomes discoverable.

## M12.2 Registration
eventId + playerId idempotency key. Validate open registration, visibility, capacity and eligibility → create registration. Retry returns same registration.

## M12.3 Progress
Progress is checkpointed and versioned. Duplicate checkpoint signals are ignored. Client cannot mark authoritative completion without validation.

## M12.4 Completion
All required checkpoints/rules satisfied → completion validator → immutable completion record → emit EVENT_COMPLETED → downstream progression/reward handling.

## M12.5 Continuation
A continuation may be proposed from real event history. It must contain trigger, timing, target, action and expiry. Notification layer decides delivery and quiet periods.

## M12.6 Cancellation
Cancel event → prevent future registration/progress → notify according to policy → preserve historical fact that the event existed and was cancelled.

---

# M13 — ADAPTIVE WORLD / INTELLIGENCE

## M13.1 Context assembly
Collect only allowed context references → remove blocked/private data → normalize → attach context version → request ranking/recommendation.

## M13.2 Ranking
Apply protected filters first, then relevance, freshness, diversity and bounded exploration. Ranking policy is versioned and benchmarkable.

## M13.3 Adaptation
Observe validated behavior → aggregate pattern → determine whether enough evidence exists → create adaptation candidate → policy check → activate or reject. One isolated action must not cause a major permanent adaptation.

## M13.4 Explainability
Return a safe reason key, not hidden sensitive features. Example: “because you explored puzzle games recently.”

## M13.5 Exploration
Exploration must remain relevant. Random candidates are not acceptable as “AI intelligence”.

## M13.6 Rollback
If a ranking/adaptation version causes measurable regression, disable that version and return to baseline. Keep evidence for debugging.

---

# M14 — COLLECTION / REWARD ECONOMY

## M14.1 Claim reward
Validated eligibility → server derives Player → atomic grant/idempotency → collection update → reward event. Client never decides reward ownership.

## M14.2 Roulette
Start pull → check allowance → lock/idempotency → server-side outcome → record rule/config version → grant result → return result. Retry with same key returns the same outcome.

## M14.3 Rarity
Configured rarity table is versioned. The client displays the result but does not perform authoritative RNG.

## M14.4 Collection
Collection item belongs to Player. Public view is a projection respecting visibility. Creator attribution is retained where applicable.

## M14.5 Titles
M05 determines eligibility; M14 owns collection/equipped state where configured. A title cannot be equipped if it is not owned.

## M14.6 Reward abuse
Concurrent requests, replayed requests and forged client results are rejected or resolved idempotently.

---

# M15 — META / MORISE AI LAB

## M15.1 Intent
Input is normalized into Intent with actor, source, allowed context, desired outcome and authorization boundary. Ambiguity becomes a clarification task instead of a guessed mutation when risk is material.

## M15.2 Planning
Intent → Plan with ordered tasks, dependencies, expected outputs, resource limits and rollback points. Plans are not automatically executed if required permissions are absent.

## M15.3 Capability use
AI requests Capability ID, not provider name. Registry resolves adapter. Provider response is normalized and validated before returning to the module.

## M15.4 Tool use
Tool definition specifies input schema, permission, resource budget, timeout, allowed network/data scope and output schema. Tool output is untrusted until validated.

## M15.5 Memory
Memory is classified into session, Player, system knowledge, evidence and task state. Each class has owner, retention, privacy and deletion policy.

## M15.6 Study/comprehension loop
Observe authorized evidence → retrieve relevant knowledge → form hypothesis → test against evidence → identify limitation → propose capability improvement. “Learning” is not merely appending text to memory.

## M15.7 Self-code improvement
ImprovementCandidate contains problem statement, baseline version, proposed change, generated diff/artifacts, tests, benchmark, resource profile and rollback reference. Candidate is isolated before execution.

## M15.8 Promotion gate
Candidate → static validation → sandbox → unit/integration/behavior/security/resource tests → benchmark against baseline → policy check → canary if applicable → authorized promotion → monitoring. Failed candidate is rejected without changing stable production code.

## M15.9 Provider independence
Pollinations, Puter, LLM7, Vireonix, Murakumo, Kilo AI, AI Horde, AI Horde OpenAI API, Cehpoint AI, OVH AI Endpoints, Quillly, Openverse and Internet Archive are external capabilities/adapters where technically and legally usable. They are not the AI's “brain”. Removing one must not destroy the core architecture.

## M15.10 Text/image/video/music
The AI selects a capability and provider adapter according to the registry. The provider produces an artifact; M15 validates metadata/content/schema and records provenance. A provider is an execution instrument, not the source of the AI's identity or memory.

## M15.11 Code generation
AI generates code only in an isolated workspace. It cannot directly overwrite production. Build/test/security/resource checks precede promotion.

## M15.12 Distributed workers
Heavy jobs can be delegated to approved workers. Worker receives a bounded task lease, not production secrets. Result is validated before commit. Lost worker → lease expires → safe retry if idempotent.

## M15.13 On-device / zero-provider mode
Where a capability can run locally, the registry may select a local implementation. If no provider is available, the system uses deterministic/local fallback or reports unavailable rather than pretending it succeeded.

## M15.14 Research and evidence
Research result stores provenance, retrieval time and claim/source relationship. AI must distinguish source fact, inference and hypothesis.

## M15.15 Self-evaluation
Every high-impact AI task produces a validation report: expected output, actual output, tests, confidence/limitations, policy result and rollback reference where applicable.

## M15.16 Resource awareness
AI tasks have CPU, memory, execution time, storage and network budgets. Larger jobs are scheduled rather than allowed to consume the browser/device without limits.

## M15.17 AI-created community/game/event
M15 may propose or orchestrate creation but the domain module remains authoritative. M11 owns communities, M08 owns game artifacts, M12 owns events, M05 owns progression and M14 owns reward grants.

---

# 16. CROSS-MODULE USER JOURNEY — FIRST VISIT

1. Visitor opens MOIRISE.
2. M01 boots without requiring AI.
3. M04 shows a small orientation, not dozens of buttons.
4. If the visitor is authenticated, M02 restores Player context.
5. M15 may compute a contextual suggestion using only allowed signals.
6. The first action is easy to understand and reversible where possible.
7. If the Player plays, M06 creates a session.
8. If the Player creates, M08 builds a specification before generating a large artifact.
9. If the Player socializes, M03 controls posts/messages and M11 controls groups.
10. Validated actions emit events.
11. M05 can turn validated events into progression.
12. M14 grants eligible rewards exactly once.
13. M13 learns only from validated, permitted signals.
14. M12 can create future activities from real events, subject to policy.
15. The SYSTEM can present a reason to return without fabricated urgency or false claims.

# 17. FIVE/SIX-DOOR UX RULE

The visible navigation remains deliberately small. A typical principal set is **SYSTEM / PLAYER / SOCIAL / WORLD / PLAY / CREATE**. This is a navigation model, not a requirement that every screen must display exactly six icons. Internal capabilities are contextually surfaced by SYSTEM and World. Adding a capability must not automatically add a new primary button.

# 18. ANTI-DUPLICATION RULE

A feature has exactly one canonical owner. Consumers use its contract rather than copying its database logic. A historical synonym is mapped to the canonical feature name. Before adding a new feature, search the inventory and module ownership matrix; if an equivalent capability exists, extend it instead of creating a duplicate.

# 19. IMPLEMENTATION HANDOFF RULE

For every capability, the implementing AI must be able to answer: file/module location, domain owner, input schema, output schema, persistence operation, authorization rule, event names, UI states, error codes, fallback, retry/idempotency, tests, observability and DONE evidence. If one is missing, the capability remains **SPECIFICATION-INCOMPLETE** and must not be silently guessed.
