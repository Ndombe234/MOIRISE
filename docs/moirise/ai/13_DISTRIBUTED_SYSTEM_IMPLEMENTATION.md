# MORISE AI — DISTRIBUTED SYSTEM IMPLEMENTATION

## Authority
`12_DISTRIBUTED_WORKER_CLUSTER.md` is the sole authority for worker identity, trust domains, quotas, worker states, job contracts and security policy.

This file is implementation-only. It defines where code lives, runtime interfaces, lifecycle wiring, persistence, scheduling mechanics, failure handling, tests and rollout. It must reuse the contracts from file 12 rather than redefining them.

## 1. Components

```text
MOIRISE
├── Control Plane / Orchestrator
├── Worker Registry
├── Task Queue
├── Worker Gateway
├── Worker Runtime
├── Resource Monitor
├── Quota Manager
├── Sandbox Adapter
├── Retry/Lease Manager
├── Result Validator
└── Admin Worker Dashboard
```

The website is the control surface. The Worker is a separate executable/runtime installed only after explicit opt-in/enrollment.

## 2. Source-of-truth rule

Implementation imports/reuses the canonical contracts from file 12:

```ts
import type {
  WorkerDescriptor,
  WorkerHardware,
  TrustedWorkerPolicy,
  WorkerJob,
} from "@morise/worker-contracts";
```

Do not create another `WorkerDescriptor`, `WorkerHardware`, `WorkerLimits`, `WorkerJob` or worker-state enum in this file.

## 3. Worker configuration

File: `apps/worker/src/config.ts`

```ts
export interface WorkerConfig {
  workerId: string;
  domain: "trusted" | "community";
  enabled: boolean;
  heartbeatIntervalMs: number;
  jobPollIntervalMs: number;
  workerVersion: string;
  allowedTaskClasses: string[];
}
```

Startup rejects invalid configuration. Effective community limits are calculated from the policy in file 12 and may never be increased by the worker itself.

## 4. Resource monitor

File: `apps/worker/src/hardware-monitor.ts`

```ts
export interface HardwareMonitor {
  getSnapshot(): Promise<WorkerHardware>;
}
```

Use OS/runtime telemetry. Browser JavaScript is not authoritative hardware telemetry.

Measure:
- CPU usage/capacity;
- RAM total/available/used;
- GPU/VRAM where permitted;
- network class;
- timestamp.

## 5. Quota manager

File: `apps/worker/src/quota-manager.ts`

```ts
export interface QuotaDecision {
  allowed: boolean;
  reason?: string;
}

export interface QuotaManager {
  validateTask(task: WorkerJob): QuotaDecision;
  canStart(task: WorkerJob, hardware: WorkerHardware): QuotaDecision;
  reserve(task: WorkerJob): Promise<void>;
  release(task: WorkerJob): Promise<void>;
}
```

Effective quota is the minimum of:

```text
server policy
    ↓
worker policy
    ↓
job quota
```

A JavaScript value such as `ramMb = 512` is not enforcement. Actual limits must be enforced by the runtime/sandbox/OS facilities available to the deployment.

## 6. Worker core

File: `apps/worker/src/worker.ts`

Implementation state uses the canonical worker states from file 12.

Startup sequence:

```text
LOAD CONFIG
 → VALIDATE CONFIG
 → INITIALIZE SECURITY
 → INITIALIZE RESOURCE MONITOR
 → INITIALIZE QUOTA MANAGER
 → INITIALIZE SANDBOX
 → REGISTER
 → AUTHENTICATE
 → RECEIVE EFFECTIVE POLICY
 → START HEARTBEAT
 → START JOB RECEIVER
 → READY
```

Failure is fail-closed: the worker does not accept jobs if security, registration, policy or sandbox initialization fails.

## 7. Heartbeat

File: `apps/worker/src/heartbeat.ts`

```ts
export interface HeartbeatPayload {
  workerId: string;
  workerVersion: string;
  status: WorkerStatus;
  availableCpuLogicalCores: number;
  availableRamMb: number;
  gpuAvailable: boolean;
  activeJobId?: string;
  timestamp: string;
}
```

Initial interval: 10 seconds. The exact threshold/timeout policy remains centralized in the control plane.

Heartbeat contains operational metadata only.

## 8. Worker authentication

File: `packages/security/src/worker-auth.ts`

```ts
export interface WorkerCredential {
  workerId: string;
  credentialId: string;
  issuedAt: string;
  expiresAt: string;
  scopes: string[];
}
```

Required mechanics:
- short-lived credentials;
- scoped permissions;
- rotation;
- revocation;
- audit events;
- TLS transport;
- no production master secrets on workers.

## 9. Sandbox adapter

File: `packages/worker-sandbox/src/sandbox.ts`

```ts
export interface SandboxPolicy {
  maxCpuLogicalCores: number;
  maxRamMb: number;
  maxExecutionMs: number;
  maxStorageMb: number;
  networkMode: "none" | "restricted" | "approved";
  allowedDomains?: string[];
  readPaths: string[];
  writePaths: string[];
}

export interface SandboxRunner {
  run(task: WorkerJob, policy: SandboxPolicy): Promise<WorkerResult>;
}
```

Generated/untrusted code must run in an OS/container-level isolation mechanism appropriate to the host. The sandbox must prevent access to host credentials, arbitrary filesystem paths, production secrets, unrelated jobs and unauthorized network destinations.

## 10. Worker result

The result contract is owned by file 12. The implementation only adds runtime transport behavior:

```ts
export interface WorkerResultTransport {
  upload(result: WorkerResult): Promise<void>;
  fetch(jobId: string): Promise<WorkerResult>;
}
```

The worker hashes output before upload. The control plane validates the hash and schema before completion.

## 11. Task runner

File: `apps/worker/src/task-runner.ts`

Execution sequence:

```text
RECEIVE
 ↓
VERIFY AUTH/SIGNATURE
 ↓
VERIFY EXPIRATION
 ↓
CHECK CAPABILITY
 ↓
CHECK POLICY
 ↓
CHECK QUOTA
 ↓
RESERVE RESOURCES
 ↓
CREATE SANDBOX
 ↓
EXECUTE
 ↓
COLLECT OUTPUT
 ↓
HASH OUTPUT
 ↓
UPLOAD ARTIFACT/RESULT
 ↓
RELEASE RESOURCES
```

No job executes before all checks pass.

## 12. Control plane implementation

Directory: `services/control-plane/`

Owns:
- worker registry persistence;
- task queue;
- leases;
- scheduling decisions;
- retry/expiration;
- result validation;
- health state;
- audit events.

It never executes arbitrary generated user code.

## 13. Worker Registry implementation

File: `services/control-plane/registry/worker-registry.ts`

```ts
export interface WorkerRegistry {
  register(worker: WorkerDescriptor): Promise<void>;
  heartbeat(workerId: string, heartbeat: HeartbeatPayload): Promise<void>;
  get(workerId: string): Promise<WorkerDescriptor | null>;
  listEligible(requirements: TaskRequirements): Promise<WorkerDescriptor[]>;
  quarantine(workerId: string, reason: string): Promise<void>;
  revoke(workerId: string, reason: string): Promise<void>;
}
```

The registry is authoritative for current worker operational state. Trust policy and state definitions remain in file 12.

## 14. Task queue implementation

File: `services/control-plane/queue/task-queue.ts`

```ts
export interface TaskQueue {
  enqueue(task: WorkerJob): Promise<void>;
  reserve(jobId: string, workerId: string): Promise<boolean>;
  release(jobId: string): Promise<void>;
  complete(jobId: string, result: WorkerResult): Promise<void>;
  expire(jobId: string): Promise<void>;
  retry(jobId: string): Promise<void>;
}
```

Reservation must be atomic. A job cannot be simultaneously owned by two workers.

## 15. Scheduler implementation

File: `services/control-plane/scheduler/scheduler.ts`

### Hard constraints
Reject a worker if any required condition fails:
- capability;
- privacy/trust policy;
- minimum RAM;
- minimum CPU;
- GPU requirement;
- network requirement;
- available quota;
- worker status;
- compatible worker version.

### Ranking
Only after hard constraints pass, rank candidates using:

```text
capability match
resource headroom
availability
recent success
latency
queue wait
priority
```

Security/privacy constraints always win over optimization.

## 16. Retry and lease manager

File: `services/control-plane/jobs/retry-manager.ts`

Every assignment has a lease and expiration.

```text
ASSIGNED
 ↓
LEASE ACTIVE
 ↓
ACCEPTED/RUNNING
 ↓
RESULT
```

If the worker disappears and the lease expires:

```text
LEASE EXPIRED
 ↓
RETURN JOB TO QUEUE
 ↓
SELECT COMPATIBLE WORKER
```

Use idempotency keys for side-effecting tasks. Do not endlessly retry deterministic invalid tasks.

## 17. Result validator

File: `services/control-plane/jobs/result-validator.ts`

Validate:
- job identity;
- worker identity;
- output schema;
- output hash;
- artifact integrity;
- output size/type;
- policy compliance;
- required tests.

Generated code is tested in a separate sandbox before a job can become `completed`.

## 18. Persistence

The database model is owned by the distributed worker architecture in file 12. Implementation migrations must use the same canonical entities:

- `workers`;
- `worker_jobs`;
- `worker_events`.

Never create parallel worker tables with alternate names.

Never store provider master secrets in worker tables.

## 19. Admin dashboard implementation

Internal/admin route example:

`/admin/system/workers`

This is an internal SYSTEM surface, not a new public navigation button.

Display per trusted worker:
- worker ID;
- state;
- CPU/RAM/GPU telemetry;
- active task;
- queue;
- availability;
- task success/failure;
- version;
- trust state;
- configured quota;
- allowed task classes.

Actions:
- add/enroll trusted worker;
- pause;
- drain;
- quarantine;
- revoke;
- change quota;
- change priority;
- inspect history.

Critical actions require authenticated administrative authorization and produce an audit event.

## 20. Enrollment implementation

### Trusted machine

```text
ADMIN
 → CREATE ENROLLMENT
 → ONE-TIME ENROLLMENT CREDENTIAL
 → INSTALL WORKER
 → AUTHENTICATE
 → DIAGNOSTIC
 → ADMIN POLICY CONFIRMATION
 → VERIFIED
```

### Community machine

```text
USER
 → EXPLICIT PARTICIPATION
 → ACTIVATE WORKER
 → SELECT QUOTA
 → DIAGNOSTIC
 → REGISTER
 → RESTRICTED
```

Revocation must immediately prevent new jobs and must stop further participation after active work is safely drained or terminated according to policy.

## 21. First infrastructure test

Do not begin with distributed model training.

First job:

```text
HASH_ARTIFACT
INPUT: fixed test payload
WORKER: calculate SHA-256
RESULT: hash
VALIDATOR: compare expected hash
```

Then:

```text
hash
 → file transformation
 → build
 → automated tests
 → game tests
 → media processing
 → provider-assisted generation
```

This isolates distributed-infrastructure failures from AI/provider failures.

## 22. Required failure tests

Test at minimum:

1. worker disappears during task;
2. invalid result;
3. quota exceeded;
4. expired credential;
5. revoked worker;
6. duplicate task;
7. duplicate result;
8. network disconnect;
9. control-plane restart;
10. missing artifact;
11. incompatible worker version;
12. corrupted output;
13. unauthorized task class;
14. community worker attempts private-data access;
15. forged worker identity.

Each test requires an expected state transition and an observable audit/metric result.

## 23. Rollout

### Phase 1 — one trusted PC
- register worker;
- show heartbeat;
- enforce quota;
- execute HASH_ARTIFACT;
- validate result;
- stop worker cleanly.

### Phase 2 — second trusted PC
- register without changing capability contracts;
- schedule automatically;
- execute concurrently;
- retry on second worker when first worker disappears.

### Phase 3 — admin dashboard
- show resource state;
- show job state;
- pause/drain/revoke workers.

### Phase 4 — community workers
Start with the canonical NORMAL quota from file 12: `0.5 logical CPU / 512 MB RAM / GPU OFF`.

Only after security/isolation tests pass.

## 24. Implementation invariants

1. Web client is not the worker.
2. Worker is a separate runtime.
3. Browser variables are not security boundaries.
4. Actual resource limits are enforced by runtime/sandbox mechanisms.
5. Community workers are untrusted by default.
6. Trusted workers still authenticate and authorize.
7. No worker receives production master secrets.
8. Private data is not distributed by default.
9. Jobs are recoverable.
10. Results are validated.
11. Scheduler decisions are inspectable.
12. Adding workers does not require rewriting MORISE AI capability contracts.
13. Worker administration stays behind the SYSTEM/admin layer.
14. No worker available must not break normal MORISE operation.
15. Scale only after the one-worker path is verified.
