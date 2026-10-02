# MOIRISE — Multi-Agent Control Plane

This directory is the **new coordination layer** for Codex multi-agent execution.

It does not define product behavior. It does not replace the canonical module plans, technical designs, AI documents, or transversal fabrication protocol.

## Files

| File | Purpose |
|---|---|
| `CONFIG.yaml` | execution policy, automatic delegation policy, and concurrency limits |
| `MULTI_AGENT_CONTRACT.md` | governing rules for delegated work |
| `ROLES.md` | agent role definitions and responsibilities |
| `OWNERSHIP.yaml` | write-surface ownership and conflict boundaries |
| `TASK_GRAPH.yaml` | parallelizable module waves and dependencies |
| `HANDOFF_CONTRACT.md` | exact worker → coordinator handoff format |
| `EXECUTION_PROTOCOL.md` | lifecycle from assignment to lock |
| `TASK_DOSSIER_TEMPLATE.md` | bounded task packet template |
| `COORDINATOR_BOOTSTRAP.md` | exact automatic coordinator behavior and session expectations |

## Automatic mode

The repository is configured so that, whenever the Codex execution harness exposes multi-agent/subagent orchestration, the root agent should proactively:

1. inspect the canonical specification;
2. derive the dependency graph;
3. spawn independent bounded workers without asking the user to manually create them;
4. isolate concurrent writers;
5. collect handoffs;
6. independently verify the integrated result;
7. continue into the next eligible wave.

The repository cannot itself flip a product/session-level multi-agent switch. That capability is supplied by the Codex execution harness. When the harness is unavailable, the same graph executes sequentially.

## What this layer deliberately does not contain

It does not contain:

- database schemas;
- business rules;
- feature specifications;
- duplicated AI architecture;
- provider registries;
- game specifications;
- replacement module plans;
- alternative definitions of DONE.

Those remain in the canonical project documentation.

## Intended flow

```text
CANONICAL SPEC
    ↓
COORDINATOR
    ↓
TASK GRAPH
    ↓
AUTOMATIC DELEGATION
    ↓
ROLE ASSIGNMENT
    ↓
ISOLATED WORKTREE
    ↓
FABRICATION
    ↓
TEST / BROWSER / EVIDENCE
    ↓
HANDOFF
    ↓
INTEGRATION
    ↓
INDEPENDENT VERIFICATION
    ↓
NEXT ELIGIBLE WAVE
    ↓
LOCK
```
