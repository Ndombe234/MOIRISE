# MOIRISE — IMPLEMENTATION HANDOFF

## Rule
An implementation agent reads the canonical 15-module documents first, then compares with code/migrations and only then changes code.

## Required reading
MASTER_PLAN
FUSION_MATRIX
module PLAN
module TECHNICAL_DESIGN
CROSS_MODULE_MECHANICS
SECURITY
CONTRACTS
AI_MASTER_PLAN
AI_TECHNICAL_DESIGN

## Before coding
Identify owner.
Identify current code.
Identify schema.
Identify permissions.
Identify events.
Identify test coverage.
Identify recovery behavior.

## Do not
invent a provider;
invent a permission;
create a new navigation tab for an internal capability;
create a second AI;
create a second memory model;
write production code outside the sandbox for generated code;
allow AI to grant itself authority.

## Browser verification
Open the app.
Test each primary door.
Click every visible action on the touched surface.
Reload.
Back/forward.
Error/retry.
Mobile.
No blank screen.
Authenticated and unauthenticated paths.


## Canonical reading order before implementation
1. docs/moirise/PRODUCT_CONSTITUTION.md
2. docs/moirise/ARCHITECTURE_MASTER.md
3. docs/moirise/MASTER_PLAN.md
4. module PLAN.md
5. module TECHNICAL_DESIGN.md
6. docs/moirise/SPECIFICATION_STANDARD.md
7. docs/moirise/IMPLEMENTATION_CONTRACT_STANDARD.md
8. transversal contracts/dependencies/security/events/testing
9. current code and migrations
10. tests/browser evidence

For AI work, insert docs/moirise/ai/AI_CONSTITUTION.md before AI_MASTER_PLAN.md and AI_TECHNICAL_DESIGN.md.

A fabrication task is BLOCKED as SPECIFICATION_GAP when the agent would otherwise need to invent ownership, schema, permission, API route, event semantics, privacy class or recovery behavior.
