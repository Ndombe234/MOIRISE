# DEFINITION OF DONE — MOIRISE 15 MODULES

## Product
- behavior defined;
- owner unique;
- user journey complete;
- SOLO path where relevant;
- COLLECTIVE path where relevant.

## Backend
- schema/contracts;
- ownership/RLS/policy;
- idempotency;
- state machine;
- errors;
- recovery;
- events.

## Frontend
- loading;
- empty;
- error;
- unavailable;
- degraded;
- mobile;
- desktop;
- touch/keyboard;
- no blank-screen route.

## AI
- capability ID;
- context policy;
- provider adapter;
- fallback;
- validator;
- provenance for artifacts;
- no secrets;
- sandbox for code;
- evolution gates where applicable.

## Security
- unauthorized access tests;
- replay tests;
- injection tests;
- privacy leakage tests;
- abuse/rate-limit tests.

## Verification
typecheck; tests; production build; browser; mobile; security; resilience.

A visual page is never sufficient proof of completion.


## Machine-fabrication gate

For every feature/task considered DONE, the evidence chain must be traceable:

REQ → FEATURE_ID → TASK_ID → FILE/SYMBOL → TEST → BROWSER ACTION → EXPECTED → ACTUAL → STATUS.

Required statuses:
- VERIFIED when all applicable evidence is fresh and successful;
- PARTIAL when implementation exists but one or more applicable proof layers are missing;
- BLOCKED when a prerequisite prevents execution;
- INCONCLUSIVE when the evidence does not prove the expected behavior.

Implementation presence is never sufficient by itself.

## Cross-module regression gate

When a changed contract has impacted dependents, DONE requires either:
- fresh verification of the affected dependents; or
- an explicit deterministic proof that the affected path is not exercised by the change.

## Context/Memory D100K gate
A context-capable feature is DONE at documentation level only when its owner Technical Design binds to CONTEXT_MEMORY_TECHNICAL_DESIGN, defines authorized fields, privacy class, correction semantics, retrieval scope, adversarial tests and browser acceptance. Runtime DONE still requires actual implementation evidence.


## Provider-independence gate
For any AI capability declared part of the MORISE Core:
- no external API is required to boot the Core;
- no API key is required for Core operation;
- provider outage, invalid credentials and quota exhaustion cannot break authoritative Core state;
- no privileged secret reaches browser code, logs or prompts;
- provider-specific capabilities have truthful degraded/unavailable behavior;
- zero-provider tests are present and fresh;
- runtime evidence, not documentation alone, proves independence.


## D100K HISTORICAL COVERAGE GATE

A canonical feature cannot be declared documentation-complete when an applicable historical requirement has no mapped current owner.

Required evidence:
1. historical source identified;
2. feature/mechanic extracted;
3. current owner assigned;
4. PLAN behavior contract restored;
5. TECHNICAL_DESIGN implementation contract restored;
6. data/events/errors/security/tests/recovery specified;
7. duplicate authority avoided;
8. verification matrix updated;
9. runtime implementation status distinguished from specification status.

Deleted historical documentation is considered reconciled only after these conditions hold.



## QA Agent gate

For every user-facing module, DONE requires the applicable browser evidence in all three modes:
- PUBLIC_TEST for anonymous/public behavior;
- AUTH_TEST for authenticated behavior;
- ADVERSARIAL_TEST for authorization, failure and abuse boundaries.

PUBLIC_TEST must execute the real application components without authentication and must not be a privileged bypass. AUTH_TEST must use isolated test identities/data. Test mutations must never contaminate production metrics, rewards, rankings, creator eligibility or real user state.

Required browser evidence includes route, actor mode, viewport, action sequence, expected result, actual result and runtime/network error state.

Production smoke testing is read-only by default. Any mutation-capable production test requires an explicit, reversible, audited contract.
