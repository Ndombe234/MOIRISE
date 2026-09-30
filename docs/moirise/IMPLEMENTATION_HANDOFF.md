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
