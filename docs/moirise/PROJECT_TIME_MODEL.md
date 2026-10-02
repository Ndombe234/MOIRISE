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
