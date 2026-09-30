# MOIRISE — CANONICAL REBUILD MASTER PLAN V3

## Authority and purpose
This is the entry point for the complete MOIRISE rebuild. It defines the product puzzle: every capability has an owner, every dependency has an order, and every implementation must be derived from a canonical contract. Detailed behavior and technical implementation remain in the numbered module files and AI specialist contracts; they are not duplicated here.

## Product identity
MOIRISE is an Otaku social network whose visible experience is coordinated by a contextual SYSTEM. The product is not a quiz-only site and not a social network with an unrelated RPG layer. The SYSTEM is the coherent interaction model: social, discovery, play, creation, progression and AI capabilities are presented contextually through a small number of permanent navigation doors.

Permanent doors: Home, Discover, Play, Communities, Create, Profile. Private messages are first-class contextual social functionality and do not require a seventh permanent door.

## Documentation hierarchy
1. This file: product scope, module ownership and dependency order.
2. `BUILD_ORDER.md`: implementation sequence and completion gate.
3. `CONSOLIDATED_DESIGN_INDEX.md`: reconciliation, feature coverage, anti-duplication and behavior interpretation.
4. `modules/Mxx_*.md`: one canonical detailed contract per product module.
5. `ai/00_MASTER_AI.md`: AI architecture.
6. `ai/01_*` through `ai/14_*`: canonical specialist AI contracts and detailed integration design.

## Module map
M01 Foundation → M02 Player → M03 Social & Private Messaging → M04 World → M05 System → M06 Play → M07 Discovery → M08 Game Factory → M09 Game Runtime → M10 Social Gaming → M11 Communities → M12 Events → M13 Adaptive World → M14 Collection & Rewards → M15 Meta AI Lab.

The repository's historical module contracts are retained and reconciled into these canonical owners. A historical document is not a second authority.

## Cross-cutting AI
MORISE AI is a cross-cutting subsystem. Product modules request typed capabilities and actions. They do not own provider SDKs, model routing, global memory, evolution logic, worker infrastructure or provider secrets.

The complete AI design is distributed deliberately across canonical contracts to prevent duplicate definitions: `ai/00_MASTER_AI.md` owns architecture; the numbered specialist files own their specific contracts; `ai/14_DETAILED_AI_DESIGN_INDEX.md` explains how the contracts compose into one executable system.

## Distributed compute
The canonical execution path is:
`AI Orchestrator → Policy → Resource Router → Scheduler → Worker Registry → Trusted/Community Worker → Sandbox → Result → Validator`.

Trusted workers are operator-controlled machines. Community workers are explicit opt-in and isolated. Initial community limits are 1 logical CPU and 512 MB RAM, with GPU and storage disabled by default. These are policy defaults, not a claim that computers become one shared RAM pool. They form a distributed execution pool.

## Game system
Game creation and game runtime are separate responsibilities. M08 creates a validated GameSpecification/package; M09 executes it. Both 2D and 3D are first-class. A finished game must not require the provider that generated it. AI can generate code/assets/audio, but execution occurs through the MOIRISE runtime contract.

## User journey requirement
The user journey is not an afterthought. It is a system-level acceptance requirement. On first entry the product should provide a useful first action quickly and progressively reveal relevant capabilities. During approximately the first two minutes, the AI may use a state-driven discovery policy: observe authorized context, choose a suitable action, observe the result, reveal a relevant next possibility, and establish a real continuation when one exists. This is not a fixed timer script.

A future return prompt such as “reviens demain pour…” is permitted only when a real persisted continuation exists: event, challenge, creation stage, reward, social response or other scheduled state. Fake scarcity, fake activity, fake notifications, coercive loops and obstruction of exit are forbidden.

## Feature preservation
The consolidated architecture explicitly covers the established MOIRISE feature families: player identity; SYSTEM interface; social feed; private messaging; communities; discovery; Otaku content discovery; quizzes; 2D games; 3D games; AI game creation; image/video/audio/music creation; translation; progression; titles; rewards/collection; roulette/gacha mechanics where enabled; events; adaptive world behavior; moderation; analytics; administration; distributed workers; provider adapters; and AI-assisted creation.

Exact behavior belongs to the owning module; capability implementation belongs to AI contracts. See `CONSOLIDATED_DESIGN_INDEX.md` for the ownership map.

## Robustness requirements
Every module must define input/output contracts, state transitions, authorization, persistence, idempotency, concurrency behavior, error taxonomy, retry/recovery, degraded behavior, observability, mobile/desktop behavior, accessibility, performance constraints, security boundaries, tests and completion criteria. A feature description is incomplete if an implementation agent still has to invent these decisions.

## Implementation gate
A module is complete only when typecheck/lint/build pass; tests pass; server authorization/RLS is verified; every visible action produces a verified state transition; loading/empty/error/unavailable/degraded states exist; mobile and desktop are tested; performance/accessibility checks pass; provider/AI outage does not destroy core product functionality; and no duplicate implementation or contract exists.

## Conflict rule
If historical code or documentation conflicts with this plan, stop and reconcile. Do not silently choose. Product scope follows this file; implementation order follows `BUILD_ORDER.md`; AI architecture follows `ai/00_MASTER_AI.md`; provider configuration follows `ai/10_PROVIDER_REGISTRY.md`; worker security follows the worker contracts; module-specific behavior follows the relevant canonical Mxx file.

## Definition of the puzzle
Before implementation, an agent must be able to identify for each behavior: owner, inputs, outputs, states, data model, service boundary, permission, event, UI result, mobile behavior, failure path, retry/recovery path, external dependency, test and canonical source. Missing answers mean the design is not finished.
