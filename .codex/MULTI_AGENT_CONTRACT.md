# MOIRISE — Multi-Agent Contract

## 1. Purpose

Create a bounded execution system around the existing MOIRISE fabrication model so several Codex agents can work concurrently without corrupting ownership, context, contracts, or Git state.

This is an **orchestration contract**. It is not a new product specification.

## 2. Authority hierarchy

For implementation meaning, the agent reads the existing canonical sources first.

```text
Canonical product / module / AI documents
        ↓
Existing transversal contracts
        ↓
Existing fabrication protocol
        ↓
Current repository implementation
        ↓
.codex orchestration layer
```

The `.codex/` layer can constrain execution, but it cannot redefine what a module owns.

## 3. Coordinator

The root coordinator:

- decomposes work into bounded tasks;
- resolves dependencies;
- assigns exactly one primary writer per mutable surface;
- creates isolated workspaces for parallel writers;
- prevents conflicting assignments;
- receives handoffs;
- integrates changes;
- runs fresh post-integration verification;
- decides READY / BLOCKED / PARTIAL / INCONCLUSIVE;
- never converts missing evidence into VERIFIED.

The coordinator does not automatically edit every module.

## 4. Worker

A worker:

- receives one bounded task dossier;
- reads the minimum relevant canonical context;
- changes only its assigned write surfaces;
- keeps unrelated work untouched;
- runs focused verification;
- records exact evidence;
- reports unresolved issues immediately;
- hands off through the standard contract.

A worker must not:

- silently change another module's authority;
- change shared contracts without impact analysis;
- rewrite canonical plans to simplify its own task;
- publish unvalidated AI output;
- declare integrated completion.

## 5. Parallelism rule

Parallelize only when all are true:

1. tasks are independent enough to progress separately;
2. write surfaces do not overlap;
3. shared contracts are already stable for the wave;
4. each worker has a clear owner;
5. integration order is known.

Prefer parallelism for:

- separate module implementation;
- separate game families;
- independent test suites;
- read-only audits;
- independent browser verification;
- bounded AI capability work.

Serialize:

- shared schema migrations;
- shared lockfile/package changes;
- contract rewrites;
- dependency-sensitive refactors;
- release/deployment operations;
- writes to the same file or shared mutable resource.

## 6. Conflict protocol

If a worker discovers overlap:

```text
DETECT
→ STOP CONFLICTING WRITE
→ REPORT SURFACE
→ IDENTIFY OWNER
→ UPDATE TASK GRAPH
→ REASSIGN OR SERIALIZE
→ RESUME
```

No worker should “just merge around” a conflict.

## 7. Handoff rule

The worker's message is evidence metadata, not proof by itself.

The coordinator verifies the actual branch state, diff, tests, and required browser/runtime evidence before integration.

## 8. Contract-change firewall

Any change to a shared contract causes:

```text
changed contract
→ direct consumers
→ transitive consumers
→ event consumers
→ routes/projections
→ AI callers
→ affected tests
→ security/resilience
→ revalidation
```

Tasks depending on the changed contract are paused or explicitly marked stale until the coordinator reconciles them.

## 9. Evidence age

Evidence is bound to:

- task ID;
- commit SHA;
- test/browser run identity;
- environment where relevant;
- timestamp.

Evidence from an older implementation must not certify a newer commit unless the check is deterministic and explicitly re-run or formally proven applicable.

## 10. Completion

A worker can finish with:

- VERIFIED: its own bounded acceptance evidence exists;
- PARTIAL: some work exists but required evidence is missing;
- BLOCKED: external dependency or conflict prevents progress;
- INCONCLUSIVE: available evidence cannot establish the property.

Only the coordinator can promote the integrated task graph to READY_FOR_MERGE.
