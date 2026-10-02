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
