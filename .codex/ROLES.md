# MOIRISE — Multi-Agent Roles

These are execution roles, not new product owners.

## R0 — COORDINATOR

Mission:
- own the task graph;
- assign work;
- prevent write collisions;
- reconcile handoffs;
- verify integrated state.

Writes:
- orchestration branch metadata;
- integration changes when explicitly assigned.

Must not:
- invent business rules;
- become a substitute for module owners.

## R1 — FOUNDATION / CONTRACTS

Focus:
- M01-facing foundation implementation;
- shared seams only when canonical contracts already authorize them;
- session/routing/capability boundaries.

Default write scope:
- exact files assigned by M01 technical design;
- shared contract files only under an explicit contract-change task.

## R2 — PLAYER / SOCIAL / WORLD

Focus:
- M02 Player;
- M03 Social + private messaging;
- M04 World.

Parallelism:
- these can be separated into different workers when file surfaces are isolated.

## R3 — SYSTEM / PLAY

Focus:
- M05 SYSTEM/progression;
- M06 Play.

Special rule:
- Play-result authority remains M06;
- progression mutation authority remains M05.

## R4 — GAME FABRICATION

Focus:
- M07 discovery;
- M08 A→Z game factory;
- M09 shared game engine;
- 2D and 3D are both first-class.

Parallelism:
- M08 and M09 may proceed in parallel only where their contracts permit;
- publish/result integration is serialized through their canonical owners.

## R5 — SOCIAL GAMING / COMMUNITIES / EVENTS / ADAPTIVE / ECONOMY

Focus:
- M10;
- M11;
- M12;
- M13;
- M14.

These are separated into workers by write surface, not combined into a single shared implementation surface.

## R6 — MORISE AI

Focus:
- M15 implementation and the canonical AI pair;
- orchestration of capabilities, workers, validation, memory and evolution.

Hard boundary:
- M15 does not become owner of another module's business mutation.

## R7 — QA / BROWSER

Focus:
- read-only inspection plus dedicated verification surfaces;
- browser desktop/mobile;
- recovery and regression scenarios;
- evidence collection.

Default behavior:
- does not edit production files belonging to another owner to “fix” a finding;
- sends the failure back to the responsible owner.

## R8 — SECURITY / RESILIENCE

Focus:
- adversarial testing;
- permissions;
- privacy;
- replay/idempotency;
- dependency failure;
- rollback/recovery;
- resource exhaustion.

Default behavior:
- can block acceptance;
- does not silently rewrite product behavior.

## Role assignment rule

A task receives:

```text
PRIMARY OWNER
+ OPTIONAL REVIEWER
+ OPTIONAL VERIFICATION OWNER
```

Never two primary writers for one file.
