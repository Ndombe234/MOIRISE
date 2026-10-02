# MOIRISE — Multi-Agent Execution Protocol

## State machine

```text
QUEUED
  ↓
DEPENDENCIES_CHECKED
  ↓
ASSIGNED
  ↓
WORKSPACE_RESERVED
  ↓
WORKING
  ├──────────────→ BLOCKED
  ├──────────────→ PARTIAL
  └──────────────→ HANDOFF_READY
                         ↓
                    COORDINATOR_REVIEW
                      ├──→ REWORK
                      ├──→ INCONCLUSIVE
                      └──→ INTEGRATE
                               ↓
                         POST_INTEGRATION_VERIFY
                               ├──→ REWORK
                               └──→ VERIFIED
                                      ↓
                                    LOCKED
```

## Assignment sequence

1. Coordinator reads the relevant canonical sources.
2. Coordinator creates a bounded task dossier.
3. Coordinator checks the dependency graph.
4. Coordinator reserves the write surface.
5. Worker receives isolated workspace when concurrent.
6. Worker fabricates only within scope.
7. Worker runs the narrowest useful checks.
8. Worker runs required browser/mobile/security/resilience checks.
9. Worker creates the handoff.
10. Coordinator inspects actual changed files and evidence.
11. Coordinator integrates only compatible work.
12. Coordinator re-runs the affected verification after integration.
13. Coordinator locks the task only when its acceptance evidence is current.

## Parallel execution gate

A new worker can start only if:

```text
dependencies satisfied
AND
write surface free
AND
shared contracts stable
AND
workspace isolated
AND
rollback/recovery path understood
```

## Failure handling

### Worker failure

```text
worker failure
→ preserve workspace
→ capture exact status
→ classify product/test/environment issue
→ retry or reassign
```

### Conflict

```text
overlap detected
→ stop conflicting writer
→ identify canonical owner
→ serialize
→ rebase/reconcile
→ re-run affected checks
```

### Contract change during parallel work

```text
contract changes
→ mark dependent tasks STALE
→ compute impact
→ notify workers
→ reconcile
→ resume from valid dependency point
```

### Evidence failure

Never convert:

```text
missing evidence → assumed success
```

Instead:

```text
missing evidence → INCONCLUSIVE / PARTIAL
```

## Integration rule

The coordinator must inspect the integrated diff rather than trusting summaries.

The final verification must be executed against the exact integrated commit that is being considered for merge.

## Sequential fallback

When multi-agent execution is unavailable, run the same task graph sequentially. No business behavior changes are permitted merely because parallel execution is unavailable.
