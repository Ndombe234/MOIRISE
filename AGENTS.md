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
        +-- bounded worker tasks
        |      |
        |      +-- independent module work
        |      +-- game work
        |      +-- AI work
        |      +-- verification work
        |
        +-- reconcile
        +-- verify integrated state
        +-- lock accepted tasks
```

The coordinator is the only role allowed to declare the integrated task graph READY_FOR_MERGE.
