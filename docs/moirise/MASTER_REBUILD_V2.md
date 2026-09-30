# MOIRISE — CANONICAL REBUILD MASTER PLAN V2

## Authority

This document is the entry point for the rebuild. The previous implementation of Modules 1–6 is NOT considered implemented. All Modules 1–15 are rebuilt from zero.

## Product principle

MOIRISE is an Otaku social network whose visible interface stays simple: about 5–6 primary navigation doors. The MORISE SYSTEM coordinates secondary capabilities contextually instead of exposing hundreds of permanent buttons.

Primary doors: Home, Discover, Play, Communities, Create, Profile. Private messages are a first-class social capability accessible from profiles, notifications and the message surface without requiring another permanent main-navigation button.

## Module order

M01 Foundation → M02 Player → M03 Social & Private Messaging → M04 World → M05 System → M06 Play → M07 Game Discovery → M08 Game Factory → M09 Game Runtime → M10 Social Gaming → M11 Communities → M12 Events → M13 Adaptive World → M14 Collection & Rewards → M15 Meta System.

## AI separation

MORISE AI is a separate cross-cutting subsystem. Product modules request capabilities; they do not own providers, model SDKs, memory logic, self-evolution logic, or worker infrastructure.

## Distributed compute separation

MORISE can use multiple computers through a separate Worker Cluster:

`AI Orchestrator → Scheduler → Worker Registry → Trusted/Community Worker → Sandbox → Result → Validation`

Trusted workers are operator-controlled machines with individually configured CPU/RAM/GPU policies. Community workers are opt-in and strictly quota-limited.

The Worker Cluster is defined by:
- `docs/moirise/ai/12_DISTRIBUTED_WORKER_CLUSTER.md`
- `docs/moirise/ai/13_DISTRIBUTED_SYSTEM_IMPLEMENTATION.md`

Workers never receive production master secrets or unrestricted access to the central system.

## Game principle

Game creation and game execution are separate:
- AI creates a GameSpecification, code/assets/audio and a validated package.
- The MOIRISE runtime executes the package locally in the browser when possible.
- 2D runtime may use Canvas/WebGL/Phaser.
- 3D runtime may use Three.js/Babylon.js/PlayCanvas/WebGPU/WebGL.
- An AI API is useful for creation but is not required to execute a finished game.

## AI evolution principle

External providers may accelerate early creation. They are adapters, not permanent dependencies. Experiences produced by providers become evidence with provenance and are never automatically treated as truth. MORISE may analyze validated experiences, propose new algorithms/code, test them in a sandbox, benchmark against a baseline, canary them and roll back regressions.

## Implementation gate for every module

A module is complete only when: typecheck/lint/build pass; unit/integration tests pass; browser testing passes; every button/action has a verified result; loading, empty, error, unavailable and degraded states exist; mobile layout is tested; no blank-screen regression exists; accessibility basics are covered; performance budgets are respected; security/RLS rules are verified.

## Single-source rules

Provider URLs/configuration live only in `docs/moirise/ai/10_PROVIDER_REGISTRY.md`.

AI architecture lives only in `docs/moirise/ai/00_MASTER_AI.md` and its numbered AI contracts.

Worker architecture lives only in `docs/moirise/ai/12_DISTRIBUTED_WORKER_CLUSTER.md` and `docs/moirise/ai/13_DISTRIBUTED_SYSTEM_IMPLEMENTATION.md`.

Module behavior and implementation live only in the single canonical numbered module files under docs/moirise/modules/. Each module now has exactly one authoritative file; duplicate *_TECHNICAL.md variants are forbidden.

Do not duplicate provider endpoints, worker security policy, or AI internals inside modules. Historical product notes remain reference-only and never override canonical module contracts.

## Build rule

Implement one module at a time. Do not mark later modules complete because their UI exists. Cross-module contracts may be stubbed with typed interfaces until their authoritative module is implemented.

## Document priority

When documents conflict:

1. This file for overall product scope and module order.
2. `docs/moirise/BUILD_ORDER.md` for implementation sequence.
3. `docs/moirise/ai/00_MASTER_AI.md` for AI architecture.
4. `docs/moirise/ai/10_PROVIDER_REGISTRY.md` for provider configuration.
5. `docs/moirise/ai/12_DISTRIBUTED_WORKER_CLUSTER.md` for worker trust, quotas and security.
6. `docs/moirise/ai/13_DISTRIBUTED_SYSTEM_IMPLEMENTATION.md` for worker implementation.
7. The relevant canonical numbered module file for product behavior and implementation.
8. Existing source code is evidence to inspect, never authority over these documents.
