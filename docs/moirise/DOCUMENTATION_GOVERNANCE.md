# MOIRISE — DOCUMENTATION GOVERNANCE

## Canonical hierarchy
MASTER_PLAN → module PLAN → module TECHNICAL_DESIGN → AI MASTER/TECHNICAL → transversal contracts → audits.

## Historical material
HISTORICAL_INVENTORY and FUSION_MATRIX preserve names and mappings. They do not override canonical ownership.

## Rule ownership
One rule has one authoritative owner.
Cross-module rules belong in transversal/CROSS_MODULE_MECHANICS.md.
Module-specific rules belong in the module.
AI-specific rules belong in AI documents.

## Detail requirement
A feature is not documented by name only. It requires actor, trigger, context, input, state, logic, permission, data, events, failure, recovery, UX, AI interaction and tests.

## Versioning
SchemaVersion and capability versions are explicit.
Old semantics remain readable for historical audit.

## Change procedure
update owner → dependencies → tests → audits → implementation handoff.
