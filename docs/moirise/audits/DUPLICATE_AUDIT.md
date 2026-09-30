# DUPLICATE AUDIT — MOIRISE

## 1. Canonical ownership
Exactly 15 product modules exist. Each business mechanism has one owner.

MORISE AI is M15 and owns the central AI orchestration mechanisms:
- Request Gate
- Context Engine
- Intent/Requirements Compiler
- Reasoning orchestration
- Planner
- Policy Engine
- Capability Registry
- Tool Registry
- Resource/Provider Router
- Validation Engine
- Memory/Learning
- Evolution/AI Lab
- provider adapters as execution infrastructure

M15 does not become owner of M01 identity, M03 private messaging, M05 progression, M11 membership, M12 event state or M14 reward/economy state.

## 2. Forbidden duplicate authorities
Never create:
- second AI brain;
- second AI Request Gate;
- second Context Engine;
- second Intent Compiler;
- second Requirements Compiler;
- second Policy Engine;
- second Provider Router;
- second Capability Registry;
- second Tool Registry;
- second Validation Engine;
- second Memory Service;
- second Evolution pipeline;
- second progression/XP authority;
- second community membership authority;
- second reward/roulette ledger;
- second World Memory lifecycle;
- second Living Object lifecycle;
- second event scheduling/future-state authority;
- second Play result authority.

## 3. Canonical split for AI documentation

### AI_MASTER_PLAN.md
The single source of truth for WHAT MORISE AI is:
- mission;
- global architecture;
- three-piece puzzle;
- global lifecycle;
- capability families;
- autonomy levels;
- provider catalogue/status;
- ownership boundaries;
- global invariants;
- completion criteria.

### AI_TECHNICAL_DESIGN.md
The single source of truth for HOW MORISE AI is built:
- file tree;
- TypeScript contracts;
- state machines;
- exact algorithms;
- decision branches;
- API routes;
- provider adapter contracts;
- concrete provider URLs;
- secret names;
- Supabase persistence;
- worker/lease/sandbox mechanics;
- validation;
- error recovery;
- test matrix;
- implementation assembly order.

These two files are complementary, not duplicate authorities. The technical file may repeat a short contract name for navigation, but it must not copy the whole master-plan behavior section.

## 4. Removed aggregate duplicates
The historical aggregate files:
- FUNCTIONAL_BEHAVIOR_SPEC.md
- TECHNICAL_IMPLEMENTATION_SPEC.md

must not return as competing sources of truth.

Their requirements belong in the canonical owner documents.

## 5. Historical material
Old M16–M20 concepts are historical inventory only and do not define active modules.

## 6. AI-specific duplication rule
When a new AI feature is requested:
1. search for the existing central mechanism;
2. extend that mechanism if it is the same concern;
3. extend AI_MASTER_PLAN only when the global WHAT changes;
4. extend AI_TECHNICAL_DESIGN when the HOW changes;
5. add module-owner references instead of copying business rules;
6. delete any competing implementation/documentation authority;
7. rerun this audit.

## 7. Provider duplication rule
Providers are adapters, not brains.

Forbidden:
- module-specific provider router;
- feature-specific hidden fallback tree;
- direct provider calls from UI/business modules;
- provider URL supplied by user/model as an execution destination.

All provider selection goes through the single M15 Resource/Provider Router.

## 8. Verification targets
After the AI rebuild:
- AI_MASTER_PLAN = 1 canonical AI behavior plan;
- AI_TECHNICAL_DESIGN = 1 canonical AI implementation design;
- aggregate AI specifications = 0;
- second AI router = 0;
- second AI brain = 0;
- second validation authority = 0;
- exact duplicate documentation blobs = 0;
- active M16–M20 docs = 0.

## 9. Maintenance rule
Every documentation change must preserve:
- one owner;
- one behavior source;
- one technical source;
- one provider router;
- one validation authority;
- no secret in Git;
- no invented endpoint;
- no duplicated business state machine.
