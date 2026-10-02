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


## D1K fabrication update — 2026-10-02

The project now has a machine-fabrication contract layered onto the canonical documentation, with M01 represented as a dependency-ordered file/symbol/test/browser task graph.

This is an execution-control improvement, not a new product scope. Therefore the global estimate remains:
- aggressive: approximately 4–5 months;
- central: approximately 5–6 months;
- integration-safe: approximately 6–8 months.

For M01, the previous remaining envelope of approximately 16–28 hours remains the working estimate for closing the full DONE gate. The D1K layer makes the work more traceable; it does not justify multiplying the estimate by ten.

The estimate must be revised if the next fabrication pass discovers additional persistence, browser, security, concurrency or production work beyond the currently documented gaps.


## D100K scope clarification — 2026-10-02

D100K is a specification/verifiability expansion, not an automatic increase in implementation scope.

It can expose additional engineering work when formal properties reveal:
- previously undocumented edge cases;
- missing validators;
- missing concurrency controls;
- missing evidence paths;
- compatibility obligations;
- rollback/recovery gaps.

Time is recalculated only from those newly exposed engineering obligations. Documentation depth itself does not multiply the project duration.


## D100K update — 2026-10-02
La profondeur D100K a été appliquée aux 15 modules sur leurs 30 documents actifs. Elle ne multiplie pas artificiellement le délai. L'estimation est recalculée uniquement lorsqu'une propriété formelle révèle une obligation d'implémentation, de sécurité, de concurrence, de récupération, de test ou de preuve supplémentaire.

La bande globale reste environ 4–5 mois agressif, 5–6 mois central, 6–8 mois intégration-safe jusqu'à découverte d'un nouveau travail matériel.