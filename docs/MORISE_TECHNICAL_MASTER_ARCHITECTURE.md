# MORISE — TECHNICAL MASTER ARCHITECTURE

Date: 2026-09-29
Status: CANONICAL TECHNICAL DESIGN — DRAFT FOR IMPLEMENTATION
Functional source: `docs/MORISE_MASTER_PLAN_V3.md`
Current functional point: MODULE 6 — PLAY / FINAL QA

## 0. Purpose

This document translates the Master Plan into an implementation-oriented architecture. MORISE must expose a simple interface while internally coordinating many capabilities.

Core doctrine:

`FEW USER-FACING DOORS → MORISE AI ORCHESTRATES MANY INTERNAL CAPABILITIES → CONTEXTUAL EXPERIENCE`

`CAPABILITY ≠ PROVIDER`

`NEW EXPERIENCE ≠ NEW INFRASTRUCTURE`

The PLAYER expresses intent. The AI Orchestrator resolves context, capabilities, policy, provider availability, execution and validation. The OWNER/Superadmin controls policy, permissions and exceptions rather than manually operating every feature.

## 1. Global architecture

```text
PLAYER
  ↓
MORISE SYSTEM UI
  ↓
MORISE CORE
  ├─ Intent / Context
  ├─ Rules
  ├─ State
  ├─ Events
  ├─ Policy / Permissions
  └─ Capability Registry
  ↓
AI ORCHESTRATOR
  ↓
EXPERIENCE ENGINE
  ├─ World
  ├─ Play
  ├─ Social
  ├─ Creation
  ├─ Memory
  ├─ Translation
  └─ Economy
  ↓
PROVIDER ROUTER
  ├─ Browser / WebGPU / WASM
  ├─ Local computer
  ├─ Optional cloud
  └─ Optional external APIs
  ↓
VALIDATOR
  ↓
PERSISTENCE / STORAGE / ANALYTICS
```

## 2. Capability lifecycle

Every capability has a runtime state: `AVAILABLE`, `DISABLED`, `PENDING`, `MAINTENANCE`, `DEGRADED`, `ERROR`, or `UNAVAILABLE`.

Resolution:

`PLAYER INTENT → CAPABILITY → DEPENDENCY CHECK → POLICY CHECK → HEALTH CHECK → PROVIDER SELECTION → EXECUTION → VALIDATION → STATE/EVENT COMMIT → PLAYER RESULT`

Missing infrastructure must never be treated as available. MORISE chooses a valid fallback or gives a coherent unavailable/deferred result. No missing capability may produce a blank screen.

Activation lifecycle:

`PLANNED → IMPLEMENTED → CONFIGURED → AVAILABLE → ENABLED`

## 3. AI Orchestrator

Responsibilities:

- interpret intent and context;
- identify required capabilities;
- consult policies and permissions;
- inspect provider availability and health;
- select an execution path;
- execute tools/providers;
- validate output;
- persist state/events;
- return a natural SYSTEM response.

The orchestrator is the default coordinator. PLAYER-facing UX must not require technical provider selection for ordinary tasks.

## 4. Provider abstraction

A capability is independent of its provider. Every provider is an adapter behind a normalized contract.

Example:

`VIDEO_GENERATION → Browser | Local GPU | Cloud GPU | API A | API B | Deterministic fallback | UNAVAILABLE`

### Browser/device possibilities

- Web APIs;
- WebGPU;
- WebAssembly;
- WebCodecs;
- Canvas;
- Web Audio API;
- browser-native AI where supported;
- quantized models;
- local cache.

### Local computer possibilities

- Ollama;
- llama.cpp;
- ComfyUI;
- Whisper-compatible local speech recognition;
- local text/image/audio/music/video models;
- local GPU acceleration.

### Optional cloud/API possibilities

- Cloudflare Workers AI;
- LLM providers;
- image providers;
- music providers;
- video providers;
- speech providers;
- translation providers;
- anime/data APIs;
- future services.

Cloudflare AI remains optional and disabled until explicitly configured.

## 5. Infrastructure Control Plane

The system computes readiness from required and optional dependencies. The OWNER/Superadmin may change policy states, but ordinary PLAYERS do not configure infrastructure.

Example:

`VIDEO_GENERATION: required video provider; optional GPU/encoder/cloud; current=PENDING`

Health failure:

`Provider health failure → DEGRADED/MAINTENANCE → orchestrator excludes provider → fallback/unavailable result → OWNER alert`

## 6. Experience Engine

Reusable primitives:

- rules;
- state variables;
- objects;
- characters;
- environments;
- conditions;
- triggers;
- consequences;
- branches;
- events;
- discoveries;
- titles;
- memories;
- challenges;
- seasons;
- rewards.

Architecture:

`MORISE CORE (RULES + STATE + EVENTS) → EXPERIENCE ENGINE → MANY EXPERIENCES`

A new experience should normally require configuration/content and reusable rules, not a new server, GPU or vendor.

## 7. World / State / Events

State must be explicit and versionable. It may represent player, world, object, discovery, challenge, season, creation-version and memory state.

Events should preserve, where appropriate:

- event id;
- type;
- actor;
- source/context;
- timestamp;
- rule/version reference;
- deterministic seed;
- input state reference;
- consequence;
- visibility;
- validation status.

Core world-memory loop:

`ACTION → VALIDATED STATE CHANGE → WORLD REMEMBERS → FUTURE EXPERIENCE REACTS`

No fake personalization.

## 8. Puzzles, secrets and anomalies

Support:

- multiple valid puzzle solutions;
- procedural variations;
- hidden rules;
- secret titles;
- hidden map areas;
- Easter eggs;
- auditable anomalies;
- community-distributed clues;
- consequence-based branches.

Randomness must be auditable when materially relevant. Anomalies must be real system events, not fabricated engagement bait.

## 9. Remix, Laboratory and asynchronous challenges

### Deterministic Remix

`ORIGINAL → PARAMETERS → NEW VERSION → VALIDATION → SHARE/PLAY`

Parameters may modify theme, difficulty, objective, timing, environment, object behavior, text, layout, sound/music layer or speed.

### Laboratory

Controlled combinations such as `OBJECT + OBJECT`, `RULE + RULE`, `CHARACTER + ENVIRONMENT`, or `PUZZLE + PARAMETER`, executed against schemas, permissions and validation.

### Async challenges

`CREATOR → CHALLENGE → PLAYER ATTEMPT → VALIDATED RESULT → CREATOR NOTIFICATION`

No simultaneous presence is required.

## 10. Creation Engine

Reserve provider-independent pipelines for:

- novels;
- comics;
- manga/manhwa-style works;
- images;
- music;
- audio;
- video;
- interactive experiences;
- remixes.

Every artifact should have owner, creation id, version, provenance, validation state, visibility and lifecycle metadata. AI is optional at execution time.

## 11. MORISE Memory Vault — personal photos and videos

The Memory Vault is the explicit personal-memory layer. It extends MORISE Moments/Memory Cards and covers user-owned memories, not only generated content.

A PLAYER may voluntarily preserve:

- personal photos;
- personal videos;
- audio recordings;
- text memories;
- personal creations;
- MORISE Moments;
- Memory Cards;
- selected experience results;
- albums/collections.

### Storage separation

Large binary media belongs in the configured object/media storage layer. Database records hold metadata and references, not duplicate media blobs.

Conceptual record:

```text
MEMORY RECORD
├─ owner_id
├─ media_reference
├─ media_type
├─ created_at
├─ captured_at (optional)
├─ title
├─ description
├─ collection_id (optional)
├─ visibility
├─ consent flags
├─ provenance
└─ deletion/export state
```

### Privacy

Default visibility is private. Supported states include private, selected-person, and public/community sharing when explicitly chosen.

The system must support deletion, export/download, access control and lifecycle management.

MORISE must never automatically publish, sell, advertise against, or share personal photos/videos merely because they exist in the Vault.

### AI consent

`STORE ≠ ANALYZE ≠ SHARE`

Storing personal media does not grant permission to analyze it. Analysis does not grant permission to share it.

Where authorized, the orchestrator may organize memories, build timelines, group collections, create captions/summaries or generate Memory Cards. It must not invent dates, people, events or claims unsupported by the source or user input.

### Memory Cards

`EVENT → RESULT → VISUAL → TITLE → LINK`

A Memory Card is a presentation artifact over real underlying media/state. It cannot create a false event.

## 12. Translation architecture

Target: 20 languages, with English as the default fallback when a requested language is unavailable.

Possible layers:

1. static/local dictionaries;
2. browser-native/local AI;
3. local computer model;
4. configured cloud model;
5. specialized translation API;
6. cached translations;
7. English fallback.

Private conversation translation must respect privacy boundaries and use local/browser routes when configured before requiring a paid external API.

## 13. Social and communication

The Social Engine covers profiles, posts, comments, reactions, private conversations, groups/guilds, asynchronous challenges and sharing of eligible creations/memories.

Authorization and privacy checks occur before AI orchestration or translation.

## 14. OWNER / Superadmin

The already-created OWNER account is the highest-authority administrative identity.

Roles: OWNER/Superadmin, Admin, Moderator, Player.

The control plane governs roles, permissions, capability policy, provider configuration, maintenance, security, moderation, creator thresholds, monetization, advertising, analytics visibility and audit logs.

The AI coordinates ordinary operations; the Superadmin is the authority for policy and exceptions.

## 15. Creator Economy and monetization

Eligibility may use validated views, engagement, project completion, activity and fraud/abuse checks. The orchestrator can monitor thresholds and alert OWNER automatically.

Advertising starts with discreet responsive banners. The architecture does not require popunders, forced redirects or disruptive overlays.

Reserved revenue adapters: advertising, affiliate links, sponsorships, sponsored placements, creator revenue sharing, premium features, voluntary support, digital products and future partner programs.

No revenue adapter is active merely because it exists in the architecture.

## 16. Data architecture

Separate identity/auth, profiles, social data, world state, events, creations, versions, media references, memories, challenges, titles, seasons, permissions, capability/provider state and analytics/audit data.

Where Supabase is used, RLS must enforce ownership and role boundaries. Service-role credentials must never be exposed to the client.

Large media belongs in object storage and is referenced from relational records.

## 17. Security

Required controls:

- authenticated identity;
- server-authoritative authorization;
- RLS/ownership checks;
- least privilege;
- input/output validation;
- rate limiting;
- abuse prevention;
- audit trails;
- safe provider credentials;
- private-memory isolation;
- explicit consent for AI analysis of personal media.

Client-provided roles/OWNER flags are never trusted for authorization.

## 18. Device/performance profiles

Support low-end phones, standard phones, high-end phones, tablets, PCs without dedicated GPU, GPU PCs, workstations and future cloud/server GPU.

`DETECT → SELECT LIGHTEST VALID PATH → EXECUTE → FALLBACK`

Use lazy loading, code splitting, compressed assets, cache reuse, memory budgets, battery-aware behavior and reduced visual effects on constrained devices.

## 19. Offline/degraded mode

Where technically validated, deterministic mechanics can continue locally: puzzles, deterministic remix, selected creation tools, cached memory browsing and presentation preferences.

Server-authoritative operations must not be falsely marked successful offline. Synchronization must use explicit conflict handling and idempotent operations where required.

## 20. Contracts and events

Recommended typed contracts:

`CapabilityRequest`, `CapabilityResult`, `ProviderHealth`, `StateTransition`, `DomainEvent`, `ValidationResult`, `MemoryRecord`, `MediaReference`, `CreationVersion`, `PermissionDecision`.

Retryable commands require idempotency behavior. Async work requires explicit `pending`, `running`, `succeeded`, `failed`, `cancelled` and `unavailable` states.

## 21. Observability

Separate product analytics, operational logs, security audit logs, AI/provider telemetry and creator/economy events.

PostHog may provide product analytics when configured. Private memory contents must not be sent to analytics events. Provider failures should be visible to OWNER without exposing secrets.

## 22. Verification

Every major capability requires proportionate unit, integration, authorization/security, persistence, fallback, mobile and end-to-end verification. Offline/degraded behavior is tested where supported.

Critical QA path:

`DEPLOY → OPEN → VISUAL CHECK → INTERACT → CONSOLE/RUNTIME CHECK → AUTH/PERMISSIONS → DATA/STATE → MOBILE → PROVIDER FALLBACK → REGRESSION`

No completion claim is valid without fresh verification evidence for the affected surface.

## 23. Capability dependency matrix

Every capability records:

| Field | Meaning |
|---|---|
| Capability | What MORISE wants to accomplish |
| Required dependencies | Must exist |
| Optional dependencies | Enhancements only |
| Providers | Execution options |
| Fallback | Safe alternative |
| Current state | Available/Pending/etc. |
| Owner policy | Allowed/blocked |
| Security class | Required authorization |
| Persistence | What must be saved |
| Verification | How it is tested |

This matrix prevents hidden infrastructure dependencies.

## 24. Integrity rules

MORISE must not depend on fake engagement, fake social proof, fabricated anomalies, fake rarity, fake activity, hidden psychological profiling, coercive sharing, deceptive monetization, unauthorized personal-media use or silent publication of private memories.

Retention comes from genuine discovery, creation, consequences, memory, social participation and new possibilities.

## 25. Implementation rule

This document is the technical design. It does not authorize activating every capability immediately. Implementation order remains governed by the canonical Master Plan and its current module position.

Future capabilities may be implemented behind capability flags and provider adapters before the required infrastructure exists.

**THE ARCHITECTURE MUST BE READY BEFORE THE INFRASTRUCTURE IS READY.**
