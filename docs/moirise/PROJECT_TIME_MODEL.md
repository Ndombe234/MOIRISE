# MOIRISE — PROJECT TIME MODEL

## Current planning baseline — 2026-10-02

Owner supervision capacity used for estimates: approximately 3 hours/day.

The technical work is intended to be executed primarily by ChatGPT/Codex/agents, not manually by the owner. Estimates therefore refer to total engineering work translated into the expected elapsed project time under automated execution and supervision.

## Current state

Architecture and documentation are substantially specified across 15 modules, central MORISE AI, game platform, creative media and social/virality contracts. The repository still contains implementation gaps and a non-green CI path.

## Time bands

### A. Aggressive
Approximately 5 months.
Requires:
- continuous agent execution;
- low interruption;
- rapid CI/browser feedback;
- limited rework;
- reuse of Game Factory and common infrastructure;
- no major architecture reset.

### B. Working target
Approximately 5–7 months.
This is the preferred planning band for the current architecture.

### C. Integration-safe
Approximately 6–8 months.
Allows more time for:
- cross-module defects;
- media pipeline issues;
- 2D/3D runtime complexity;
- privacy/security corrections;
- browser/mobile verification;
- provider outages or substitutions.

## Time must be recalculated after every D10 expansion

A more detailed plan can reveal:
- hidden dependencies;
- additional validators;
- missing migrations;
- extra test paths;
- observability requirements;
- recovery paths;
- browser edge cases.

Therefore each new detail request requires a fresh estimate rather than blindly adding ten times the previous duration.

## Definition of done

For each module:
PLAN → TECHNICAL DESIGN → implementation → migrations/auth/security → tests → desktop/mobile browser → resilience → production evidence → DONE.

For the whole project:
all 15 modules + MORISE AI + game platform + media creation + social surfaces + security/privacy + performance + production validation.


## Agent-execution recalibration — 2026-10-02

The current execution model assumes ChatGPT/Codex/agents perform the main construction loop:
ANALYZE → IMPLEMENT → TEST → BROWSER AS USER → CORRECT → RETEST.

For the currently documented scope, including the 15 canonical modules, MORISE AI, native 2D/3D game platform, creative media/social contracts and production verification:

- Aggressive: approximately 4–5 months.
- Central working estimate: approximately 5–6 months.
- Integration-safe: approximately 6–8 months.

The central estimate assumes the agent also performs browser verification and iterative correction rather than stopping after code generation.

The estimate is not multiplied by the detail factor. A deeper document can reduce ambiguity and agent rework while revealing hidden implementation, integration, security, recovery, browser and mobile work. The estimate therefore follows newly discovered engineering work, not document length.


# D100 — PROJECT TIME MODEL — RÉVISION 2026-10-02
## Why the estimate changed
D100 added implementation-ready decisions for state machines, schemas, idempotency, privacy, ownership, browser acceptance, media provenance, 2D/3D runtime constraints, AI task graphs and recovery. This does not multiply coding time by 100; it makes hidden work visible and should reduce agent guesswork.
## Current remaining work bands
Aggressive elapsed project target: approximately 5–6 months.
Central working target: approximately 6–8 months.
Integration-safe target: approximately 7–9 months.
These are elapsed-time planning bands under the assumption that ChatGPT/Codex/agents execute the technical work and the owner provides roughly 3 hours/day of supervision/decisions.
## Main remaining cost centers
1. Stabilize repository/CI and current implementation blockers.
2. Implement missing foundation and domain flows.
3. Build M15 central AI execution infrastructure.
4. Build M08/M09 reusable 2D/3D game platform.
5. Implement image/video/audio/music creation pipelines with provenance and validation.
6. Implement Reels/Stories/social discovery loops.
7. Integrate all modules and run desktop/mobile/browser resilience tests.
8. Production evidence, monitoring and rollback validation.
## What reduces time
Reuse existing contracts, common primitives, Game Factory, fabrication memory, parallel isolated agents, fast CI, targeted tests, browser automation and strict owner boundaries.
## What can increase time
Major schema changes, provider instability, 3D runtime issues, media processing limits, security/privacy remediation, cross-module regressions and production incidents.
