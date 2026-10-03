# MOIRISE — Coordinator Bootstrap

## Purpose

This file is a reusable, repository-local bootstrap contract for the Codex root coordinator.

It does not create a second AI authority and does not redefine product behavior. It only specifies how the root agent should orchestrate execution against the canonical MOIRISE documents.

## Root behavior

When a substantial implementation, debugging, migration, test, or verification task is received:

### Phase A — Understand

- Read `AGENTS.md`.
- Read `.codex/MULTI_AGENT_CONTRACT.md`.
- Inspect repository status/diff.
- For every module in scope, load its complete PLAN.md + TECHNICAL_DESIGN.md pair. For AI work, load both AI_MASTER_PLAN.md + AI_TECHNICAL_DESIGN.md. Load transversal contracts required by impact.
- Do not use the old legacy runtime as product authority.

### Phase B — Plan

Build a bounded graph:

```text
REQUEST
→ MODULES / FEATURES
→ DEPENDENCIES
→ WRITE SURFACES
→ ELIGIBLE WORKERS
→ VERIFICATION
```

Classify each node as:

- `INDEPENDENT`
- `ORDERED`
- `BLOCKED`
- `UNRESOLVED`

Never silently classify `UNRESOLVED` as safe.

### Phase C — Delegate automatically

When multi-agent orchestration is available:

- the root agent remains coordinator;
- spawn bounded workers for independent nodes;
- use at most 3 concurrent subagents by default;
- give each worker one owner, one write surface, one acceptance target, and one evidence requirement;
- do not ask the user to manually create or route those workers;
- do not delegate tasks that overlap a shared mutable surface;
- keep shared contracts and ordered migrations serialized.

AI gate: an AI task cannot be delegated until the AI comprehension bridge has been read and both canonical AI documents have been loaded.

Canonical document gate: a worker cannot receive a module task with only PLAN.md or only TECHNICAL_DESIGN.md. The coordinator must pass the complete pair and record the pair in the task dossier.

Recommended worker packet:

```text
TASK_ID
ROLE
OBJECTIVE
CANONICAL_SOURCES
ALLOWED_WRITE_SURFACES
FORBIDDEN_SURFACES
DEPENDENCIES
ACCEPTANCE_CRITERIA
REQUIRED_TESTS
REQUIRED_BROWSER/MOBILE/SECURITY CHECKS
HANDOFF_FORMAT
```

### Phase D — Integrate

For every returned worker handoff:

1. inspect actual changed files;
2. inspect commit/tree/diff;
3. validate scope and ownership;
4. check dependency impact;
5. run fresh verification against the integrated state;
6. rework/reassign when evidence is insufficient.

A worker message is never the final proof.

### Phase E — Continue automatically

After a task becomes `VERIFIED`, immediately recompute the dependency graph and start every newly eligible independent node, subject to ownership and concurrency limits.

Do not stop merely because one worker finished when other eligible independent work remains.

### Phase F — Lock

Only the root coordinator may mark integrated work:

```text
READY_FOR_MERGE
→ VERIFIED
→ LOCKED
```

The root must retain explicit states for:

```text
BLOCKED
PARTIAL
INCONCLUSIVE
STALE
UNRESOLVED
```

## Sequential fallback

If the harness does not expose subagent tools, follow the exact same graph and evidence gates sequentially. Do not alter product behavior simply because delegation is unavailable.

## No secret propagation

Never put API keys, passwords, OAuth tokens, browser session data, private credentials, or secrets into worker prompts, handoffs, commits, or repository files.
