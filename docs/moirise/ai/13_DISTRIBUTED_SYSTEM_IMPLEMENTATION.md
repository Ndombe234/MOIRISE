# MORISE AI — DISTRIBUTED SYSTEM IMPLEMENTATION

## Purpose

This document converts the worker architecture into an implementation sequence. It is intentionally separate from the worker security contract so a future builder can implement the infrastructure without duplicating policy definitions.

## Components

```text
MOIRISE
├── Control Plane / Orchestrator
├── Worker Registry
├── Task Queue
├── Worker Gateway
├── Worker Runtime
└── Admin Worker Dashboard
```

The website is the control surface. The Worker is a separate executable/runtime installed on a machine that has explicitly opted in.

## Phase 1 — Local worker

Target: the initial 16 GB development computer.

Build:
- worker identity;
- local registration;
- capability discovery;
- quota enforcement;
- heartbeat;
- task polling/receiving;
- sandboxed execution;
- result upload;
- cancellation;
- logs;
- local health state.

First worker example:

```json
{
  "workerId": "worker-rudy-001",
  "domain": "trusted",
  "enabled": true,
  "limits": {
    "cpuCores": 4,
    "ramMB": 4096,
    "gpu": false
  },
  "allowedTasks": ["code", "game2d", "game3d", "testing"]
}
```

This is an example configuration only. The actual machine must be diagnosed before limits are accepted.

## Phase 2 — Control plane

The Control Plane owns:
- worker registry state;
- task queue;
- assignment decisions;
- job leases;
- retries;
- expiration;
- validation state;
- worker health;
- audit events.

It does not execute arbitrary user code itself.

## Phase 3 — Task protocol

Every task must contain:

```ts
interface TaskEnvelope {
  taskId: string;
  capability: string;
  priority: "interactive" | "normal" | "background" | "batch";
  privacyClass: string;
  payloadRef: string;
  payloadHash: string;
  resourceRequirements: {
    cpuCores?: number;
    ramMB?: number;
    gpu?: boolean;
    gpuVramMB?: number;
  };
  expiresAt: string;
  idempotencyKey?: string;
}
```

The scheduler compares the requirements against each worker's effective quota.

## Phase 4 — Second trusted computer

Install a second worker with a different policy.

Example:

```json
{
  "workerId": "worker-rudy-002",
  "domain": "trusted",
  "enabled": true,
  "limits": {
    "cpuCores": 8,
    "ramMB": 16384,
    "gpu": true
  },
  "allowedTasks": ["image", "video", "3d", "ai"]
}
```

The scheduler must discover it automatically after registration.

## Phase 5 — Automatic distribution

Example:

```text
IMAGE GENERATION  → GPU-capable worker
3D BUILD           → 3D-capable worker
TEST               → compatible idle worker
CODE               → CPU/code worker
```

No manual machine selection is required for normal operation.

## Phase 6 — Admin dashboard

The trusted-worker dashboard must display:

```text
MOIRISE WORKERS

🟢 PC-001 TRUSTED
CPU 32%   RAM 3.1 / 4 GB
Task: Game Builder

🟢 PC-002 TRUSTED
CPU 71%   RAM 11 / 16 GB
GPU 48%
Task: Image Generation

🔴 PC-003 OFFLINE
Last heartbeat: 12 min
```

Admin actions:
- add worker;
- pause;
- drain;
- stop assignment;
- quarantine;
- revoke;
- change quota;
- change priority;
- inspect task history.

## Phase 7 — Failure recovery

Test deliberately:

```text
Worker A receives Task X
        ↓
Worker A is disconnected
        ↓
heartbeat expires
        ↓
lease expires
        ↓
Task X returns to queue
        ↓
Worker B receives X
        ↓
result validation
```

The test must prove that a single machine is not a single point of failure for recoverable tasks.

## Phase 8 — Community workers

Only after trusted-worker operation is stable.

Community workers receive:
- explicit consent flow;
- LIGHT/NORMAL/VOLUNTARY+ quotas;
- sandboxed non-sensitive tasks;
- no production secrets;
- no private data by default;
- visible pause/stop controls.

## Phase 9 — Security validation

Before accepting community workers:

- attempt filesystem escape;
- attempt environment-variable access;
- attempt secret access;
- attempt unauthorized network access;
- attempt quota bypass;
- attempt cross-job access;
- attempt forged worker identity;
- attempt forged result;
- revoke worker during active task;
- verify credentials expire.

All tests must fail safely.

## Phase 10 — Scaling

Scaling sequence:

```text
1 trusted worker
      ↓
2 trusted workers
      ↓
3+ trusted workers
      ↓
community workers
      ↓
large distributed pool
```

The orchestrator remains the same logical component. Capacity comes from registered workers.

## Website integration rule

Do not add dozens of permanent buttons to MOIRISE.

Worker infrastructure belongs behind the SYSTEM layer.

Normal user interface:
- approximately 5–6 major navigation areas;
- SYSTEM coordinates worker activity internally;
- only worker owners see participation controls;
- administrators see the worker dashboard through an administrative area.

## Critical distinction

The distributed network increases **available execution capacity**. It does not create physical RAM/CPU out of nothing, and aggregate capacity is not equivalent to one shared RAM pool.

Tasks must therefore be decomposed into independently executable jobs whenever possible.

## Acceptance gate

The distributed architecture is considered operational only when:

1. one trusted worker can register;
2. the control plane can assign a task;
3. the worker enforces its quota;
4. the worker returns a validated result;
5. a second trusted worker can register without code changes to the scheduler;
6. the scheduler can route tasks automatically;
7. a failed worker causes retry/fallback;
8. the admin can revoke a worker;
9. no worker receives production secrets;
10. community workers remain sandboxed and quota-limited.
