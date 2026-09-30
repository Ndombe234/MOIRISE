# MORISE AI — DISTRIBUTED SYSTEM IMPLEMENTATION

## Authority
This file converts the worker architecture into an implementation-level design. The security/trust contract remains in `12_DISTRIBUTED_WORKER_CLUSTER.md`; this file defines concrete modules, interfaces, state transitions, variables, and implementation order.

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
└── Admin Worker Dashboard
```

The website is the control surface. The Worker is a separate executable/runtime installed on a machine that explicitly opts in.

## 2. Canonical types

Do not create multiple names for the same concept.

```ts
export type WorkerDomain = "trusted" | "community";
export type WorkerStatus = "online" | "busy" | "degraded" | "draining" | "offline" | "quarantined";
export type TrustLevel = "unverified" | "occasional" | "reliable" | "active" | "specialized";
export type TrustState = "pending" | "verified" | "revoked" | "quarantined";
export type TaskState = "queued" | "assigned" | "accepted" | "running" | "result_uploaded" | "validating" | "completed" | "rejected" | "expired" | "cancelled";

export interface WorkerLimits {
  cpuLogicalCores: number;
  ramMb: number;
  gpuEnabled: boolean;
  maxGpuVramMb?: number;
  storageMb: number;
  networkMbPerDay?: number;
}

export interface WorkerHardware {
  cpuLogicalCores: number;
  cpuUsagePercent: number;
  ramTotalMb: number;
  ramAvailableMb: number;
  ramUsageMb: number;
  gpu?: {
    vendor: string;
    model: string;
    vramTotalMb: number;
    vramAvailableMb: number;
    utilizationPercent?: number;
  };
  networkClass: "poor" | "normal" | "good" | "excellent";
}

export interface WorkerDescriptor {
  workerId: string;
  domain: WorkerDomain;
  enabled: boolean;
  workerVersion: string;
  status: WorkerStatus;
  trustLevel: TrustLevel;
  trustState: TrustState;
  hardware: WorkerHardware;
  limits: WorkerLimits;
  capabilities: string[];
  maxConcurrentTasks: number;
  lastHeartbeatAt: string;
  priority: "HIGH" | "NORMAL" | "LOW";
}
```

## 3. Worker configuration

File: `apps/worker/src/config.ts`

```ts
export interface WorkerConfig {
  workerId: string;
  domain: WorkerDomain;
  enabled: boolean;
  limits: WorkerLimits;
  allowedTaskClasses: string[];
  heartbeatIntervalMs: number;
  jobPollIntervalMs: number;
  workerVersion: string;
}
```

Startup must reject invalid configuration. Community limits can never exceed the server-defined community maximum.

## 4. Resource Monitor

File: `apps/worker/src/hardware-monitor.ts`

```ts
export interface HardwareMonitor {
  getSnapshot(): Promise<WorkerHardware>;
}
```

The implementation must use OS/runtime telemetry. Browser JavaScript is not considered authoritative hardware telemetry.

Monitor:
- CPU usage;
- available CPU capacity;
- total/available/used RAM;
- GPU/VRAM when permitted;
- network class;
- timestamp.

## 5. Quota Manager

File: `apps/worker/src/quota-manager.ts`

```ts
export interface QuotaDecision {
  allowed: boolean;
  reason?: string;
}

export interface QuotaManager {
  validateTask(task: WorkerTask): QuotaDecision;
  canStart(task: WorkerTask, hardware: WorkerHardware): QuotaDecision;
  reserve(task: WorkerTask): Promise<void>;
  release(task: WorkerTask): Promise<void>;
}
```

Effective quota:

```text
community server maximum
        ↓
worker configured maximum
        ↓
job requested maximum
        ↓
minimum of all three
```

A JavaScript number such as `ramMb = 512` is not enforcement. Actual CPU/RAM/network/storage restrictions must be applied by the worker sandbox/runtime.

## 6. Worker Core

File: `apps/worker/src/worker.ts`

Startup state machine:

```text
CREATED
  ↓
CONFIG_VALIDATED
  ↓
SECURITY_READY
  ↓
REGISTERING
  ↓
AUTHENTICATED
  ↓
VERIFIED/RESTRICTED
  ↓
READY
  ↓
RUNNING ↔ IDLE
  ↓
DRAINING
  ↓
STOPPED
```

Startup sequence:
1. load configuration;
2. validate configuration;
3. initialize authentication;
4. initialize resource monitor;
5. initialize quota manager;
6. initialize sandbox;
7. register with control plane;
8. authenticate;
9. receive effective policy;
10. start heartbeat;
11. start task receiver.

Failure must be fail-closed.

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

Initial interval: 10 seconds, configurable centrally.

Heartbeat contains operational metadata only, never private user content.

## 8. Authentication

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

Rules:
- short-lived credentials;
- scoped permissions;
- rotation;
- revocation;
- audit events;
- TLS transport;
- no production master secrets on workers.

## 9. Sandbox

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
  run(task: WorkerTask, policy: SandboxPolicy): Promise<WorkerResult>;
}
```

Generated/untrusted code must execute inside an OS/container-level isolation mechanism appropriate to the deployment platform.

## 10. Worker contracts

File: `packages/worker-contracts/src/tasks.ts`

```ts
export interface WorkerTask {
  jobId: string;
  capability: string;
  taskClass: string;
  payloadRef: string;
  payloadHash: string;
  timeoutMs: number;
  expiresAt: string;
  resourceQuota: WorkerLimits;
  permissions: string[];
  outputSchema: string;
  idempotencyKey: string;
  signature: string;
}

export interface WorkerResult {
  jobId: string;
  workerId: string;
  success: boolean;
  outputRef?: string;
  outputHash?: string;
  errorCode?: string;
  startedAt: string;
  completedAt: string;
}
```

Never place provider master keys in a task payload.

## 11. Task Runner

File: `apps/worker/src/task-runner.ts`

Execution sequence:

```text
RECEIVE
 ↓
VERIFY SIGNATURE
 ↓
VERIFY EXPIRATION
 ↓
CHECK CAPABILITY
 ↓
CHECK QUOTA
 ↓
RESERVE RESOURCES
 ↓
CREATE SANDBOX
 ↓
EXECUTE
 ↓
COLLECT RESULT
 ↓
HASH RESULT
 ↓
UPLOAD ARTIFACT
 ↓
RELEASE RESOURCES
```

No task executes before signature, expiration, capability and quota checks pass.

## 12. Control Plane

Directory: `services/control-plane/`

The Control Plane owns:
- registry state;
- task queue;
- assignment decisions;
- job leases;
- retries;
- expiration;
- validation state;
- health state;
- audit events.

It must not execute arbitrary user-generated code.

## 13. Worker Registry

File: `services/control-plane/registry/worker-registry.ts`

```ts
export interface WorkerRegistry {
  register(worker: WorkerDescriptor): Promise<void>;
  heartbeat(workerId: string, heartbeat: HeartbeatPayload): Promise<void>;
  get(workerId: string): Promise<WorkerDescriptor | null>;
  listEligible(requirements: TaskRequirements): Promise<WorkerDescriptor[]>;
  updateTrust(workerId: string, level: TrustLevel): Promise<void>;
  quarantine(workerId: string, reason: string): Promise<void>;
  revoke(workerId: string, reason: string): Promise<void>;
}
```

Registry is authoritative for worker operational state.

## 14. Task Queue

File: `services/control-plane/queue/task-queue.ts`

```ts
export interface TaskQueue {
  enqueue(task: WorkerTask): Promise<void>;
  reserve(jobId: string, workerId: string): Promise<boolean>;
  release(jobId: string): Promise<void>;
  complete(jobId: string, result: WorkerResult): Promise<void>;
  expire(jobId: string): Promise<void>;
  retry(jobId: string): Promise<void>;
}
```

Reservation must be atomic.

## 15. Scheduler

File: `services/control-plane/scheduler/scheduler.ts`

### Hard constraints
Reject a worker if any required condition fails:
- capability;
- privacy/trust level;
- minimum RAM;
- minimum CPU;
- GPU requirement;
- network requirement;
- available quota;
- worker status;
- compatible software version.

### Ranking
Among eligible workers, rank using:

```text
capability match
resource headroom
availability
recent task success
latency
queue wait
priority
```

Hard security/privacy constraints always win over ranking.

## 16. Retry and lease manager

File: `services/control-plane/jobs/retry-manager.ts`

Every assigned task has a lease and expiration.

```text
ASSIGNED
 ↓ lease
WORKER ACCEPTS
 ↓
RUNNING
 ↓
RESULT
```

If heartbeat disappears and the lease expires:

```text
LEASE EXPIRED
 ↓
RETURN TO QUEUE
 ↓
SELECT COMPATIBLE WORKER
```

Use idempotency keys to prevent duplicate side effects.

Do not endlessly retry deterministic invalid tasks.

## 17. Result validation

File: `services/control-plane/jobs/result-validator.ts`

Validate:
- job identity;
- worker identity;
- schema;
- output hash;
- artifact integrity;
- output size/type;
- policy compliance;
- required tests.

For generated code, validation occurs in a separate sandbox.

## 18. Database model

### `workers`

```text
id
worker_id
owner_scope
domain
status
trust_level
trust_state
worker_version
hardware_json
limits_json
capabilities_json
priority
last_heartbeat_at
created_at
updated_at
```

### `worker_jobs`

```text
job_id
worker_id
capability
task_class
state
priority
payload_ref
payload_hash
resource_quota_json
idempotency_key
attempt
max_attempts
expires_at
assigned_at
started_at
completed_at
result_ref
result_hash
error_code
created_at
updated_at
```

### `worker_events`

```text
event_id
worker_id
event_type
metadata_json
created_at
```

Never store provider master secrets in these tables.

## 19. Admin Dashboard

Internal/admin route example:

`/admin/system/workers`

This is not a new public navigation button.

Display:

```text
PC-001
TRUSTED · ONLINE
CPU 32%
RAM 3.1 / 4 GB
GPU disabled
TASK: GAME_BUILD
```

Admin actions:
- add trusted worker;
- pause;
- drain;
- quarantine;
- revoke;
- change quota;
- change priority;
- inspect task history.

All critical actions are authenticated and audited.

## 20. Enrollment

### Trusted computer

```text
ADMIN
 ↓
ADD TRUSTED COMPUTER
 ↓
ENROLLMENT CODE
 ↓
INSTALL WORKER
 ↓
WORKER AUTHENTICATES
 ↓
HARDWARE DIAGNOSTIC
 ↓
ADMIN CONFIRMS
 ↓
POLICY CREATED
 ↓
VERIFIED
```

### Community computer

```text
USER
 ↓
PARTICIPATE
 ↓
EXPLICIT CONSENT
 ↓
WORKER ACTIVATED
 ↓
SELECT QUOTA
 ↓
DIAGNOSTIC
 ↓
REGISTER
 ↓
RESTRICTED
```

## 21. First real task

Do not start with distributed model training.

First task:

```text
HASH_ARTIFACT
INPUT: fixed test payload
WORKER: calculate SHA-256
RESULT: hash
VALIDATOR: compare expected hash
```

Then progress:

```text
hash
 → file transformation
 → build
 → automated tests
 → game tests
 → media processing
 → provider-assisted generation
```

This separates infrastructure bugs from AI/model bugs.

## 22. Failure tests

The implementation must test:

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
11. incompatible version;
12. corrupted output;
13. unauthorized task class;
14. community worker attempts private-data access;
15. forged worker identity.

Every case must have a documented expected state transition.

## 23. Rollout

### Phase 1 — one trusted PC

Acceptance:
- worker registers;
- heartbeat visible;
- quota enforced;
- test task executes;
- validated result returns;
- worker can be stopped.

### Phase 2 — second trusted PC

Acceptance:
- second worker registers without scheduler code changes;
- scheduler selects automatically;
- both workers execute tasks;
- failure of PC1 triggers retry on PC2.

### Phase 3 — admin dashboard

Acceptance:
- resource state visible;
- task state visible;
- worker can be paused/drained/revoked.

### Phase 4 — community workers

Start with NORMAL:

`0.5 logical CPU / 512 MB RAM / GPU OFF`

Only after security tests pass.

## 24. Non-negotiable implementation rules

1. Web client is not the worker.
2. Worker is a separate runtime.
3. Browser variables are not security boundaries.
4. Actual resource limits are enforced by the runtime/sandbox.
5. Community workers are untrusted by default.
6. Trusted workers still authenticate and authorize.
7. No worker receives production master secrets.
8. Private data is not distributed by default.
9. Jobs are recoverable.
10. Results are validated.
11. Scheduler decisions are inspectable.
12. Adding workers does not require rewriting MORISE AI.
13. Worker administration stays behind the SYSTEM/admin layer.
14. No worker available must not break normal MORISE operation.
15. Scale only after the one-worker path is verified.
