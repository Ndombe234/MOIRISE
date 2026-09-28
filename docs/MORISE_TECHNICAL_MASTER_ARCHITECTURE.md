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

## 2. Capability and provider abstraction

A capability describes the desired outcome; a provider describes the execution mechanism.

Example: `VIDEO_GENERATION` may use Browser/WebCodecs, a local PC/GPU, a local model, a cloud GPU, an external API, deterministic composition, or no provider yet.

Application code must depend on capability contracts, never directly on one provider SDK.

Every capability has states:

`PLANNED → AVAILABLE → CONFIGURED → AUTHORIZED → ENABLED → EXECUTING`

Exceptional states:

`PENDING_DEPENDENCY`, `DISABLED`, `MAINTENANCE`, `DEGRADED`, `ERROR`, `UNAVAILABLE`.

Architecture can contain future capabilities without activating them.

## 3. AI Orchestrator

```text
USER INTENT
  ↓
CONTEXT RESOLUTION
  ↓
CAPABILITY MATCHING
  ↓
POLICY CHECK
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

The PLAYER normally asks for an outcome. The AI chooses the technical path according to availability, policy, privacy, device capability, latency, cost and quality.

Normal PLAYERS do not choose GPUs, models, APIs, encoders or storage backends.

## 4. Provider possibilities

### Text / reasoning

Browser AI, WebAssembly, WebGPU, local computer models, Ollama, llama.cpp, cloud LLMs, external APIs and deterministic rules for non-AI tasks.

### Translation

Local dictionaries, limited deterministic rules, Browser AI, WebAssembly/WebGPU, local models, server models, optional future Cloudflare Workers AI, external translation APIs, cached translations and English fallback.

Required languages:

`fr, en, hi, es, de, it, pt, ar, ja, ko, ru, tr, id, th, vi, pl, nl, ro, bn, ur`

English is the default display fallback.

### Image

Canvas/SVG/CSS procedural generation, Browser AI, WebGPU/WASM, local image models, ComfyUI/local workflows, cloud providers, external APIs and user import.

### Music/audio

Web Audio API, procedural synthesis, local assets, local models, Browser AI, cloud models, external APIs and user import.

### Video

Canvas, WebCodecs, browser processing, local PC/GPU, local video workflows/models, cloud GPU, external APIs, user import and deterministic editing/composition.

### Speech

Browser speech APIs, local speech models, WebAssembly/WebGPU, local PC, cloud speech services and external APIs.

No listed provider is mandatory.

## 5. Infrastructure and capability control plane

The AI coordinates capability selection. The OWNER/Superadmin controls high-level policy, authorization, maintenance, provider authorization, thresholds, dependency visibility, audit and monetization policy.

Example:

```text
PLAYER asks for VIDEO
        ↓
AI ORCHESTRATOR
        ↓
Capability + dependency check
        ↓
Provider unavailable?
        ├─ YES → valid fallback
        │          └─ none → honest unavailable state + optional OWNER alert
        └─ NO  → execute → validate
```

If video, music, image, local AI or another infrastructure is not yet available, that capability can remain `PENDING_DEPENDENCY` or `DISABLED` while unrelated MORISE functionality remains operational.

The OWNER does not need a button for every internal decision. Manual controls are policy-level exceptions; normal coordination remains AI-driven.

## 6. MORISE Core

### Rules Engine

Evaluates conditions, consequences, unlocks, deterministic variants, rarity and challenge outcomes. Rules should be versioned when historical reproducibility matters.

### State Engine

Tracks validated transitions with actor, previous state/reference, event/rule, resulting state, timestamp, version and validation status.

### Event Engine

Immutable events include discovery, challenge completion, object evolution, title unlock, world change, memory creation and creator milestones. Record seeds/rule versions for deterministic generation where practical.

### Capability Registry

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

### Dependency Registry

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

## 7. Experience Engine

Central architecture:

```text
MORISE CORE (RULES + STATE + EVENTS)
                 ↓
        EXPERIENCE ENGINE
                 ↓
          MANY EXPERIENCES
```

Internal capabilities include worlds that remember, evolving puzzles, auditable anomalies, secret titles, hidden areas, evolving objects, Memory Cards, deterministic Remix, asynchronous challenges, Laboratory combinations, distributed secrets, collective legends, branching choices, SYSTEM presentation styles, seasons, player construction, Easter eggs and transparent rarity.

These are cross-module capabilities, not automatic navigation tabs.

## 8. Personal Memory Vault — photos, videos and life memories

### 8.1 Purpose

**MORISE Memory Vault** is a privacy-first personal memory layer. A PLAYER can intentionally preserve personal photos and videos as memories, alongside audio, text, stories, creations, MORISE Moments, Memory Cards and selected world/play milestones.

This is distinct from the generated Memory Card concept: the Vault preserves the user's original personal media, while a Memory Card is a derived presentation/reference artifact.

### 8.2 Storage separation

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

### 8.3 AI coordination

When explicitly authorized, MORISE AI may organize memories, suggest collections, create captions, generate Memory Cards, search authorized memories or summarize a selected set.

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

### 8.4 Privacy and ownership

Private memories are private by default.

MORISE must not:

- publish personal media automatically;
- share memories automatically;
- use private media for advertising without appropriate explicit authorization;
- infer sensitive traits from private memories for profiling;
- train external models on private media without an explicit valid consent flow;
- silently delete memories.

### 8.5 Export, deletion and sharing

The PLAYER must be able to inspect visibility, revoke sharing, delete memories/collections and export/download personal media where supported.

Deletion behavior must clearly distinguish immediate deletion from provider backup-retention behavior.

### 8.6 Storage failure

If storage is unavailable, MORISE must not claim an upload succeeded. It should expose honest `PENDING`/`FAILED` state, allow retry and keep unrelated functionality working.

## 9. Creation Engine

```text
CREATION REQUEST
 ↓
Intent
 ↓
Creation Spec
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

Supported creation families: roman/novel, BD/comic, manga, manhwa, image, music, audio, video, interactive experiences and deterministic remix.

## 10. Social and translation

Social capabilities include profiles, feed/posts, comments/reactions, private conversations, groups/guilds, asynchronous challenges and sharing.

Private conversation translation must respect permissions and privacy and use configured local/browser/cache routes before optional cloud/API routes according to policy.

## 11. Creator Economy and advertising

Potential models include discreet banner advertising, affiliation, direct sponsorship, sponsored placements, creator rewards, future premium capabilities, tips/donations where supported and digital products.

Creator features may unlock after verified thresholds such as views, engagement or completed projects. The AI/Rules layer evaluates eligibility and the OWNER receives configured high-value milestone alerts.

Initial advertising policy: discreet banners only; no forced popups/popunders or deceptive redirects.

## 12. Admin / OWNER security model

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

OWNER controls global policy, role assignment, capability policy, provider authorization, feature maintenance, monetization policy, thresholds, audit review and security controls. Critical operations must be authorized and auditable.

## 13. Performance and device strategy

Support capability-aware operation across approximately 2 GB RAM-class phones where browser/runtime limits permit, standard phones, high-end phones/tablets, PCs without GPUs, PCs with GPUs, workstations and future dedicated/cloud GPU infrastructure.

Heavy AI/media work must not be assumed to run on low-end phones. Use progressive enhancement and lightweight fallbacks.

## 14. Offline/degraded operation

Where validated, deterministic experiences may use localStorage, IndexedDB, service workers/PWA caching, WebAssembly, WebGPU, Web Audio, Canvas and WebCodecs.

Server-authoritative operations remain authoritative for security, multiplayer, ownership, economy and shared persistent state. Never claim synchronization before it succeeds.

## 15. Security and data integrity

Deny by default; RLS for user-owned data; server-side authorization for sensitive operations; no secrets in client bundles; input/output validation; rate limits; audit logs; idempotency for retryable mutations; provenance; explicit privacy boundaries; safe errors.

Personal memory media receives the same or stronger access controls as other private user data.

## 16. Observability

Important telemetry should identify capability requested, provider selected, selection reason, dependency health, outcome, latency, failure category, fallback and user-visible result.

Do not log private media contents or unnecessary sensitive data.

## 17. Testing architecture

### Unit

Rules, state transitions, eligibility, feature guards, provider selection and localization fallback.

### Integration

Database/RLS, storage permissions, Memory Vault, event persistence and provider adapters.

### E2E

First Contact, authentication, creation, memory upload/view/delete, sharing permissions, private conversation translation, admin controls and graceful unavailable capabilities.

### Mobile

Low-memory behavior, touch interactions, responsive layout and offline/degraded flows.

### Regression

Missing providers must never regress unrelated features.

## 18. Capability dependency matrix

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

Final production matrix must be reconciled against the actual implementation repository.

## 19. Feature state machine

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

## 20. No-button principle

Normal PLAYERS request outcomes. They do not select technical infrastructure.

Example:

> PLAYER: “Fais une vidéo de cette scène.”

MORISE decides the valid route. The OWNER/Superadmin retains high-level policy controls, not a technical button for every internal action.

## 21. Implementation gate

Before a capability is production-ready, verify: contract exists; dependencies are documented; provider adapter or deterministic implementation exists; capability state is represented; fallback exists; authorization is enforced; tests exist; mobile behavior is verified; failure isolation works; observability exists; privacy/security review is complete; and no unnecessary infrastructure dependency was introduced.

## 22. Current activation policy

Future capabilities may remain unactivated.

- Cloudflare AI is optional and not required until explicitly configured.
- Future local PC AI may remain pending until the computer/environment exists.
- Video and music engines may remain pending/disabled until an appropriate execution path exists.
- Browser AI may be used when supported by the actual browser/device.
- Existing MORISE capabilities continue independently of unavailable future engines.

The OWNER must be able to see the reason for a capability state without exposing technical complexity to normal PLAYERS.

## 23. Relationship to the Master Plan

This document is the technical interpretation of `docs/MORISE_MASTER_PLAN_V3.md`. If implementation details conflict with product doctrine, the conflict must be surfaced and resolved rather than silently changing the product plan.

**Current functional position remains MODULE 6 — PLAY / FINAL QA.**
