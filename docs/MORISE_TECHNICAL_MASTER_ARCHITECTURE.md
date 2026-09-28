# MORISE — TECHNICAL MASTER ARCHITECTURE

Date: 2026-09-29
Status: CANONICAL TECHNICAL DESIGN — DRAFT FOR IMPLEMENTATION
Functional source: `docs/MORISE_MASTER_PLAN_V3.md`
Current functional point: MODULE 6 — PLAY / FINAL QA

## 0. Purpose

This document translates the Master Plan into an implementation-oriented architecture. MORISE exposes a simple, immersive interface while internally coordinating many capabilities.

Core doctrine:

`FEW USER-FACING DOORS → MORISE AI ORCHESTRATES MANY INTERNAL CAPABILITIES → CONTEXTUAL EXPERIENCE`

`CAPABILITY ≠ PROVIDER`

`NEW EXPERIENCE ≠ NEW INFRASTRUCTURE`

The PLAYER expresses intent. The AI Orchestrator resolves context, capabilities, policy, provider availability, execution and validation. The OWNER/Superadmin controls policy, permissions and exceptions rather than manually operating every feature.

---

## 1. System layers

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
  ├─ Capability Registry
  └─ Dependency Registry
  ↓
AI ORCHESTRATOR
  ├─ Browser AI
  ├─ Local Computer AI
  ├─ Cloud AI
  └─ External APIs
  ↓
EXPERIENCE ENGINE
  ├─ World
  ├─ Play
  ├─ Creation
  ├─ Social
  ├─ Memory
  ├─ Challenges
  └─ Economy
  ↓
VALIDATOR / AUDIT
  ↓
DATABASE / STORAGE / EVENTS
```

Cross-cutting concerns: authentication, authorization, RLS, validation, rate limiting, localization, telemetry, feature flags, health checks, accessibility, performance and privacy.

---

## 2. Architecture doctrine

### 2.1 Capability is not a provider

A capability describes **what MORISE can do**. A provider describes **how that capability is executed**.

Example: `VIDEO_GENERATION` may use Browser/WebCodecs, a local PC/GPU, a local model, a cloud GPU, an external API, deterministic composition, or no provider yet.

Application code must depend on capability contracts, never directly on one provider SDK.

### 2.2 Capability lifecycle

Every capability has a runtime state:

`PLANNED → AVAILABLE → CONFIGURED → AUTHORIZED → ENABLED → EXECUTING`

Exceptional states:

`PENDING_DEPENDENCY`, `DISABLED`, `MAINTENANCE`, `DEGRADED`, `ERROR`, `UNAVAILABLE`.

Architecture may contain future capabilities without activating them.

### 2.3 AI-first coordination

Normal PLAYERS request outcomes, not infrastructure. The AI decides the valid technical route. Technical choices such as GPU, model, API, encoder and storage provider remain internal unless the user needs to understand a limitation.

### 2.4 Human control remains authoritative

The OWNER/Superadmin defines policies, permissions, provider authorization, maintenance and sensitive exceptions. The AI cannot override OWNER security policy.

### 2.5 Safe degradation

If a dependency is unavailable, MORISE must detect it, avoid the unavailable provider, choose a valid fallback when one exists, otherwise return an honest unavailable/pending state and keep unrelated functionality operational.

No missing optional infrastructure may cause a blank screen or global application failure.

---

## 3. Proposed code boundaries

```text
src/
├── core/
│   ├── types/
│   ├── rules/
│   ├── state/
│   ├── events/
│   ├── policies/
│   ├── capabilities/
│   └── dependencies/
├── system/
│   ├── orchestrator/
│   ├── context/
│   ├── intents/
│   ├── decisions/
│   └── presentation/
├── ai/
│   ├── contracts/
│   ├── router/
│   ├── browser/
│   ├── local/
│   ├── cloud/
│   └── api/
├── experience/
│   ├── engine/
│   ├── world/
│   ├── play/
│   ├── challenges/
│   ├── seasons/
│   └── laboratory/
├── creation/
│   ├── roman/
│   ├── comic/
│   ├── manga/
│   ├── manhwa/
│   ├── image/
│   ├── audio/
│   ├── music/
│   ├── video/
│   └── remix/
├── social/
├── memory/
│   ├── vault/
│   ├── moments/
│   ├── cards/
│   └── albums/
├── economy/
│   ├── creator/
│   ├── advertising/
│   ├── affiliation/
│   └── sponsorship/
├── admin/
├── i18n/
├── media/
├── security/
└── infrastructure/
```

Actual directory names may follow existing repository conventions; the architectural boundaries remain mandatory.

---

## 4. MORISE Core

### 4.1 Rules Engine

Responsibilities:

- evaluate conditions;
- calculate consequences;
- validate transitions;
- determine unlock conditions;
- calculate deterministic variants;
- enforce rarity rules;
- evaluate challenge outcomes;
- evaluate monetization/creator thresholds where authorized.

Rules should be versioned when historical reproducibility matters.

### 4.2 State Engine

Maintains validated state transitions.

A transition should identify:

```text
actor
previous_state/reference
trigger_event/rule
resulting_state
timestamp
version
validation_status
```

### 4.3 Event Engine

Events are immutable records describing meaningful transitions.

Examples:

- discovery;
- challenge completion;
- object evolution;
- title unlock;
- world change;
- memory creation;
- creator milestone;
- capability failure/recovery.

Where deterministic generation is used, record seed/rule version where practical.

### 4.4 Capability Registry

```text
capability_id
name
category
required_dependencies
optional_dependencies
providers
fallbacks
policy
status
risk_level
```

### 4.5 Dependency Registry

```text
dependency_id
kind
provider
required_config
health_state
availability
cost_class
privacy_class
supported_targets
```

---

## 5. AI Orchestrator

```text
USER INTENT
  ↓
CONTEXT RESOLUTION
  ↓
CAPABILITY MATCHING
  ↓
POLICY CHECK
  ↓
DEVICE / ENVIRONMENT CHECK
  ↓
DEPENDENCY / HEALTH CHECK
  ↓
PROVIDER SELECTION
  ↓
EXECUTION
  ↓
VALIDATION
  ↓
PERSISTENCE
  ↓
RESPONSE
```

Provider selection can consider:

- capability availability;
- OWNER policy;
- privacy requirements;
- device class;
- CPU/RAM/GPU/WebGPU support;
- latency;
- cost policy;
- quality target;
- network availability;
- current provider health;
- fallback availability.

The orchestrator must never assume that a listed provider is configured.

---

## 6. Provider possibilities

### 6.1 Text / reasoning

Possible routes:

- Browser AI;
- WebAssembly;
- WebGPU;
- local computer models;
- Ollama;
- llama.cpp;
- cloud LLMs;
- external APIs;
- deterministic rules for non-AI tasks.

### 6.2 Translation

Possible routes:

- local dictionaries;
- limited deterministic rules;
- Browser AI;
- WebAssembly/WebGPU models;
- local models;
- server models;
- optional future Cloudflare Workers AI;
- external translation APIs;
- cached translations;
- English fallback.

Required languages:

`fr, en, hi, es, de, it, pt, ar, ja, ko, ru, tr, id, th, vi, pl, nl, ro, bn, ur`

English is the default display fallback whenever a requested UI language is unavailable.

### 6.3 Image

Possible routes:

- Canvas/SVG/CSS procedural generation;
- Browser AI;
- WebGPU/WASM;
- local image models;
- ComfyUI/local workflows;
- cloud providers;
- external APIs;
- user import.

### 6.4 Music / audio

Possible routes:

- Web Audio API;
- procedural synthesis;
- local audio assets;
- local models;
- Browser AI;
- cloud models;
- external APIs;
- user import.

### 6.5 Video

Possible routes:

- Canvas;
- WebCodecs;
- browser processing;
- local PC/GPU;
- local video workflows/models;
- cloud GPU;
- external APIs;
- user import;
- deterministic editing/composition.

### 6.6 Speech

Possible routes:

- browser speech APIs;
- local speech models;
- WebAssembly/WebGPU;
- local PC;
- cloud speech services;
- external APIs.

No provider listed in this section is mandatory.

---

## 7. Capability & Infrastructure Control Plane

The control plane prevents infrastructure availability from becoming an application-wide failure.

### 7.1 Feature state

```text
PLANNED
PENDING_DEPENDENCY
AVAILABLE
CONFIGURED
AUTHORIZED
ENABLED
EXECUTING
DEGRADED
MAINTENANCE
DISABLED
ERROR
UNAVAILABLE
```

### 7.2 AI-coordinated activation

The AI coordinates normal capability selection. Normal PLAYERS do not need technical buttons.

### 7.3 OWNER/Superadmin controls

The OWNER/Superadmin can:

- authorize or disable a capability;
- place a capability in maintenance;
- authorize providers;
- configure thresholds;
- inspect dependency health;
- inspect audit logs;
- manage roles;
- manage monetization policy;
- inspect why a capability is unavailable.

These are policy-level controls, not a button for every internal action.

### 7.4 Example: missing video infrastructure

```text
PLAYER asks for VIDEO
        ↓
AI ORCHESTRATOR
        ↓
Capability check
        ↓
Dependency check
        ↓
No authorized provider
        ↓
Try valid fallback
        ↓
Fallback exists? ─ YES → execute fallback
        │
        NO
        ↓
PENDING/UNAVAILABLE response
        ↓
Optional OWNER alert
```

If video, music, image, local AI or another future capability is unavailable, it can remain pending/disabled while unrelated functions continue normally.

### 7.5 Health checks

Each infrastructure adapter should expose a normalized health contract:

```text
provider_id
capability_id
health_state
last_checked_at
latency_ms (optional)
error_class (optional)
configuration_state
availability_reason
```

Health checks must not expose secrets.

---

## 8. Experience Engine

Central architecture:

```text
MORISE CORE (RULES + STATE + EVENTS)
                 ↓
        EXPERIENCE ENGINE
                 ↓
          MANY EXPERIENCES
```

Internal capabilities include:

- worlds that remember;
- evolving puzzles;
- auditable anomalies;
- secret titles;
- hidden areas;
- evolving objects;
- Memory Cards;
- deterministic Remix;
- asynchronous challenges;
- Laboratory combinations;
- distributed community secrets;
- collective legends;
- branching choices;
- SYSTEM presentation styles;
- seasons;
- player-created experiences;
- Easter eggs;
- transparent rarity.

These are cross-module capabilities, not automatic navigation tabs.

---

## 9. Personal Memory Vault — photos, videos and life memories

### 9.1 Purpose

**MORISE Memory Vault** is a privacy-first personal memory layer. A PLAYER can intentionally preserve personal photos and videos as memories, alongside audio, text, stories, creations, MORISE Moments, Memory Cards and selected world/play milestones.

This is distinct from generated Memory Cards: the Vault preserves the user's original personal media, while a Memory Card is a derived presentation/reference artifact.

### 9.2 Storage separation

Separate:

1. binary media/object storage;
2. metadata;
3. memory/event references;
4. visibility and permissions;
5. derived previews/cards.

Conceptual model:

```text
memory_items
├── id
├── owner_id
├── type                  # photo | video | audio | text | creation | moment
├── storage_reference
├── title
├── description
├── captured_at           # optional/user supplied
├── created_at
├── visibility            # private by default
├── status                # pending | ready | failed | deleted
├── checksum/reference
└── metadata_reference

memory_collections
├── id
├── owner_id
├── title
├── description
└── visibility

memory_collection_items
├── collection_id
└── memory_item_id

memory_moments
├── id
├── owner_id
├── event_id
├── title
├── summary
├── created_at
└── provenance
```

The final schema must be reconciled with the production Supabase schema before implementation.

### 9.3 Memory ingestion flow

```text
USER SELECTS PHOTO/VIDEO
          ↓
CLIENT VALIDATION
(type/size/basic safety checks)
          ↓
UPLOAD SESSION
          ↓
OBJECT STORAGE
          ↓
METADATA RECORD
          ↓
MEMORY INDEX
          ↓
READY
```

An upload is not marked `READY` until the storage write and metadata persistence have been confirmed.

### 9.4 AI coordination

When explicitly authorized, MORISE AI may:

- organize memories;
- suggest collections;
- create captions;
- generate Memory Cards;
- search authorized memories;
- summarize a selected set;
- identify relationships between selected memories and MORISE events.

The AI does not automatically publish, share, delete or repurpose private memories.

```text
PERSONAL PHOTO / VIDEO / EVENT
            ↓
AUTHORIZED MEMORY INDEX
            ↓
       AI ORCHESTRATOR
            ↓
collection / caption / card / search suggestion
            ↓
       PLAYER DECISION
            ↓
       optional save/share
```

### 9.5 Privacy and ownership

Private memories are private by default.

MORISE must not:

- publish personal media automatically;
- share memories automatically;
- use private media for advertising without appropriate explicit authorization;
- infer sensitive traits from private memories for profiling;
- train external models on private media without an explicit valid consent flow;
- silently delete memories.

### 9.6 Sharing model

A memory may conceptually be:

`PRIVATE → SELECTED_USERS → GROUP → PUBLIC`

The actual implementation must enforce authorization at read time, not merely hide UI controls.

A revoked share must stop new access according to the storage/access model.

### 9.7 Export and deletion

The PLAYER must be able to:

- inspect visibility;
- revoke sharing;
- delete a memory;
- delete a collection;
- export/download personal media where supported.

Deletion semantics must distinguish immediate deletion from provider backup-retention behavior.

### 9.8 Storage failure

If storage is unavailable, MORISE must not claim upload success. It exposes an honest `PENDING` or `FAILED` state, allows retry and keeps unrelated functionality operational.

---

## 10. Creation Engine

```text
CREATION REQUEST
 ↓
Intent
 ↓
Creation Spec
 ↓
Capability check
 ↓
Provider Selection
 ↓
Generation / Composition
 ↓
Validation
 ↓
Version
 ↓
Storage
 ↓
Provenance
```

Supported creation families:

- roman/novel;
- BD/comic;
- manga;
- manhwa;
- image;
- music;
- audio;
- video;
- interactive experiences;
- deterministic remix.

Every generated artifact should have provenance indicating the relevant creation route and version when technically applicable.

---

## 11. Social Engine

Social capabilities include:

- profiles;
- feed/posts;
- comments/reactions;
- private conversations;
- groups/guilds;
- asynchronous challenges;
- sharing;
- creator relationships.

Private conversation translation must respect permissions and privacy and use configured local/browser/cache routes before optional cloud/API routes according to policy.

---

## 12. Localization

Required product language set:

`fr, en, hi, es, de, it, pt, ar, ja, ko, ru, tr, id, th, vi, pl, nl, ro, bn, ur`

Rules:

- English is the default display fallback.
- UI strings are externalized.
- Missing translation falls back to English.
- User-generated content is not automatically rewritten unless translation is requested or policy permits it.
- Translation cache reduces repeated work.
- Translation provider is replaceable.
- Language capability is independently health-checked.

---

## 13. Creator Economy, thresholds and alerts

Potential models include:

- discreet banner advertising;
- affiliation;
- direct sponsorship;
- sponsored placements;
- creator rewards;
- future premium capabilities;
- tips/donations where supported;
- digital products where applicable.

Creator features may unlock after verified thresholds such as views, engagement or completed projects.

Conceptual flow:

```text
PROJECT / CREATOR ACTIVITY
          ↓
METRICS
          ↓
ANTI-FRAUD / VALIDATION
          ↓
RULES ENGINE
          ↓
THRESHOLD REACHED?
      ├── NO → continue monitoring
      └── YES
            ↓
      capability eligible
            ↓
      OWNER notification
            ↓
      OWNER policy / AI coordination
```

The system must never claim that a creator has earned money merely because a threshold was reached unless a configured monetization program actually exists.

### Advertising

Initial policy: discreet banners only; no forced popups/popunders or deceptive redirects.

Ad providers must be adapters behind an advertising capability, not hard-coded throughout the application.

---

## 14. Admin / OWNER security model

The already-created OWNER account is the highest-control account.

```text
OWNER / SUPERADMIN
  ↓
ADMIN
  ↓
MODERATOR
  ↓
PLAYER
```

OWNER controls:

- global policy;
- role assignment;
- capability policy;
- provider authorization;
- feature maintenance;
- monetization policy;
- thresholds;
- audit review;
- security controls.

Lower roles use least privilege.

Critical operations must be authorized and auditable.

---

## 15. Performance and device strategy

Support capability-aware operation across:

- approximately 2 GB RAM-class phones where browser/runtime constraints permit;
- standard phones;
- high-end phones/tablets;
- PCs without GPUs;
- PCs with GPUs;
- workstations;
- future dedicated/cloud GPU infrastructure.

Heavy AI/media work must not be assumed to run on low-end phones.

### Device capability profile

The runtime may normalize:

```text
device_class
ram_class
cpu_class
gpu_available
webgpu_supported
wasm_supported
webcodecs_supported
network_class
storage_capacity_estimate
battery_saver_state (where available)
```

The profile is used to select lightweight or enhanced execution paths. It must not be used to infer sensitive personal characteristics.

---

## 16. Offline and degraded operation

Where validated, deterministic experiences may use:

- localStorage for small state;
- IndexedDB for larger browser state/cache;
- service workers/PWA caching;
- WebAssembly;
- WebGPU;
- Web Audio;
- Canvas;
- WebCodecs.

Server-authoritative operations remain authoritative for security, multiplayer, ownership, economy and shared persistent state.

Never claim synchronization before it succeeds.

---

## 17. Data/security principles

Core principles:

- deny by default;
- RLS for user-owned data;
- server-side authorization for sensitive operations;
- no secrets in client bundles;
- input validation;
- output validation;
- rate limits;
- audit logs;
- idempotency for retryable mutations;
- provenance for generated content;
- explicit privacy boundaries;
- safe error messages.

Personal memory media receives the same or stronger access controls as other private user data.

### Secret/configuration rule

Provider credentials, API keys, service-role credentials and signing secrets must never be stored in source code or browser bundles. They belong in the appropriate secret/configuration mechanism of the deployed environment.

---

## 18. Observability

Important telemetry should identify:

- capability requested;
- provider selected;
- selection reason;
- dependency health;
- outcome;
- latency;
- failure category;
- fallback used;
- user-visible result.

Do not log private media contents or unnecessary sensitive data.

---

## 19. Testing architecture

### Unit

Rules, state transitions, eligibility, feature guards, provider selection, localization fallback and memory permission decisions.

### Integration

Database/RLS, storage permissions, Memory Vault, event persistence, provider adapters and health checks.

### E2E

- first contact;
- authentication;
- creation;
- memory upload/view/delete;
- memory sharing/revocation;
- private conversation translation;
- admin controls;
- graceful unavailable capabilities;
- provider fallback;
- no blank-screen regression.

### Mobile

- low-memory behavior;
- touch interactions;
- responsive layout;
- offline/degraded flows;
- upload recovery.

### Regression

Missing providers must never regress unrelated features.

---

## 20. Capability dependency matrix

| Capability | Code | DB | Storage | Browser | Local PC | GPU | Cloud/API | Fallback |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Profile | ✓ | ✓ | optional | ✓ | no | no | no | local read-only |
| Puzzle | ✓ | optional | no | ✓ | no | no | no | deterministic |
| Deterministic Remix | ✓ | optional | optional | ✓ | no | no | no | reduced remix |
| Memory Vault | ✓ | ✓ | ✓ | ✓ | no | no | no | pending upload |
| Roman AI | ✓ | optional | optional | possible | possible | optional | optional | deterministic drafting |
| Image AI | ✓ | optional | optional | possible | possible | optional | optional | procedural/import |
| Music AI | ✓ | optional | optional | possible | possible | optional | optional | procedural/import |
| Video AI | ✓ | optional | ✓ | limited | possible | often | optional | composition/import |
| Translation | ✓ | optional | optional | possible | possible | optional | optional | English |
| Social | ✓ | ✓ | optional | ✓ | no | no | no | read-only/degraded |

This matrix is architectural. The final production matrix must be reconciled against the actual implementation repository before production claims are made.

---

## 21. Feature state machine

```text
PLANNED
  ↓ dependency discovered
PENDING_DEPENDENCY
  ↓ dependency available
AVAILABLE
  ↓ configuration complete
CONFIGURED
  ↓ OWNER policy allows
AUTHORIZED
  ↓ capability enabled
ENABLED
  ↓ request
EXECUTING
  ├─ success → ENABLED
  ├─ recoverable failure → DEGRADED / RETRY
  ├─ dependency failure → PENDING_DEPENDENCY
  └─ policy action → DISABLED / MAINTENANCE
```

The AI Orchestrator reads this state before execution.

---

## 22. No-button principle

Normal PLAYERS request outcomes. They do not select technical infrastructure.

Example:

> PLAYER: “Fais une vidéo de cette scène.”

MORISE decides the valid route. The OWNER/Superadmin retains high-level policy controls, not a technical button for every internal action.

---

## 23. Implementation gate

Before a capability is production-ready, verify:

1. contract exists;
2. dependencies are documented;
3. provider adapter or deterministic implementation exists;
4. capability state is represented;
5. fallback exists;
6. authorization is enforced;
7. tests exist;
8. mobile behavior is verified;
9. failure isolation works;
10. observability exists;
11. privacy/security review is complete;
12. no unnecessary infrastructure dependency was introduced.

---

## 24. Current activation policy

Future capabilities may remain unactivated.

- Cloudflare AI is optional and not required until explicitly configured.
- Future local PC AI may remain pending until the computer/environment exists.
- Video and music engines may remain pending/disabled until an appropriate execution path exists.
- Browser AI may be used when supported by the actual browser/device.
- Existing MORISE capabilities continue independently of unavailable future engines.
- Memory Vault can be implemented independently of future generative video/music engines.

The OWNER must be able to see the reason for a capability state without exposing technical complexity to normal PLAYERS.

---

## 25. Relationship to the Master Plan

This document is the technical interpretation of `docs/MORISE_MASTER_PLAN_V3.md`. If implementation details conflict with product doctrine, the conflict must be surfaced and resolved rather than silently changing the product plan.

**Current functional position remains MODULE 6 — PLAY / FINAL QA.**
