# MOIRISE — Agent Entry Contract

This file is the repository entry point for coordinated coding agents.

## Scope

This file adds an **agent-orchestration layer only**. It does not replace, rewrite, summarize, or supersede the canonical MOIRISE fabrication documentation.

The canonical fabrication understanding remains governed by the existing project documents, especially:

1. `docs/moirise/MASTER_PLAN.md`
2. the target module `PLAN.md`
3. the target module `TECHNICAL_DESIGN.md`
4. `docs/moirise/transversal/CONTRACTS.md`
5. `docs/moirise/transversal/DEPENDENCIES.md`
6. relevant transversal contracts
7. the canonical AI pair when AI is involved
8. `docs/moirise/transversal/AGENT_FABRICATION_PROTOCOL.md`

The files in `.codex/` define only **who works, when they may work in parallel, how they hand off, and how conflicts are prevented**.

## Required multi-agent entry point

Before taking a delegated task, read:

`/.codex/MULTI_AGENT_CONTRACT.md`

Then load only the canonical fabrication sources required by the task.

## Automatic coordinator mode

When Codex has multi-agent/subagent orchestration available, the root agent MUST act as the MOIRISE coordinator by default.

Do not wait for the user to manually split the work when the requested task is large enough to contain independent workstreams.

At the start of a substantial task, the coordinator must:

1. inspect the current repository state and relevant canonical sources;
2. derive a bounded dependency graph from the canonical documents and `.codex/TASK_GRAPH.yaml`;
3. identify independent nodes and reserve their write surfaces;
4. delegate independent nodes to subagents automatically;
5. keep dependent work in the coordinator until its prerequisites are satisfied;
6. maintain the one-writer-per-surface rule;
7. collect evidence from workers, then independently verify the integrated state;
8. continue to the next eligible wave without asking the user to manually orchestrate the workers.

Do **not** spawn workers for trivial one-file tasks, ordered chains that cannot be parallelized safely, or work that would create contention over the same mutable resource.

The coordinator may reduce concurrency when contention, rate limits, resource pressure, or dependency risk appears.

The preferred starting budget is **3 active subagents**, excluding the coordinator. More parallelism requires a concrete benefit and must never violate ownership or dependency rules.

### Automatic delegation decision

Use this decision before implementation:

```text
SUBSTANTIAL TASK?
  no  → stay single-agent
  yes
    ↓
CAN IT BE SPLIT INTO INDEPENDENT BOUNDED NODES?
  no  → execute ordered path in coordinator
  yes
    ↓
DO NODES HAVE NON-OVERLAPPING WRITE SURFACES?
  no  → serialize / isolate / reassign
  yes
    ↓
ARE SHARED CONTRACTS STABLE?
  no  → stabilize contract first
  yes
    ↓
SPAWN INDEPENDENT WORKERS
    ↓
COLLECT HANDOFFS
    ↓
VERIFY INTEGRATED STATE
    ↓
ADVANCE NEXT ELIGIBLE WAVE
```

The coordinator must never treat a worker summary as proof of integration.

## Non-negotiable collaboration rules

- One coordinator owns integration and final acceptance.
- Parallel work is allowed only for independent task nodes.
- One writer owns each mutable file at a time.
- A worktree or equivalent isolated workspace is required for concurrent writers.
- Agents must not silently overwrite another agent's work.
- A handoff is not a completion claim.
- A worker may report PASS only for checks it actually executed.
- The coordinator must verify the integrated result independently.
- A contract/ownership change triggers dependency-impact analysis before unrelated parallel work continues.
- The orchestration layer never becomes a second business owner.
- Existing canonical fabrication documents must not be rewritten just to serve orchestration.
- Never put credentials, tokens, browser session data, or secrets in agent packets, commits, or repository files.

## Operational model

Use the current Codex multi-agent capability when available. The repository contract remains valid even when execution is sequential.

```text
ROOT / COORDINATOR
        |
        +-- inspect canonical state
        +-- build task graph
        |
        +-- bounded worker tasks
        |      |
        |      +-- independent module work
        |      +-- game work
        |      +-- AI work
        |      +-- verification work
        |
        +-- reconcile
        +-- verify integrated state
        +-- advance next eligible wave
        +-- lock accepted tasks
```

The coordinator is the only role allowed to declare the integrated task graph READY_FOR_MERGE.
