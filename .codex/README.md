# MOIRISE — Multi-Agent Control Plane

This directory is the **new coordination layer** for Codex multi-agent execution.

It does not define product behavior. It does not replace the canonical module plans, technical designs, AI documents, or transversal fabrication protocol.

## Files

| File | Purpose |
|---|---|
| `CONFIG.yaml` | execution policy and concurrency limits |
| `MULTI_AGENT_CONTRACT.md` | governing rules for delegated work |
| `ROLES.md` | agent role definitions and responsibilities |
| `OWNERSHIP.yaml` | write-surface ownership and conflict boundaries |
| `TASK_GRAPH.yaml` | parallelizable module waves and dependencies |
| `HANDOFF_CONTRACT.md` | exact worker → coordinator handoff format |
| `EXECUTION_PROTOCOL.md` | lifecycle from assignment to lock |
| `TASK_DOSSIER_TEMPLATE.md` | bounded task packet template |

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
LOCK
```

## Important

This layer prepares the repository for multi-agent Codex execution. It does not itself turn on multi-agent execution in the ChatGPT/Codex product; that capability is provided by the execution harness.
