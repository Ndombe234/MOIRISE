# MORISE AI — DISTRIBUTED WORKER CLUSTER

## Authority
This file is the single technical contract for distributed workers. The general resource scheduler is defined in `08_RESOURCE_SCHEDULER_OBSERVABILITY.md`; this file defines worker identity, registration, trust, quotas, job transport, security and lifecycle.

## Goal

Allow MORISE to use multiple computers with different CPU, RAM and GPU capacities without making the development computer a permanent compute bottleneck.

```text
MOIRISE AI ORCHESTRATOR
        │
        ▼
   TASK SCHEDULER
        │
        ▼
   WORKER REGISTRY
        │
   ┌────┼──────────────┐
   ▼    ▼              ▼
 CODE  MEDIA          GAME
 W01   W02            W03
   │    │              │
   ▼    ▼              ▼
 CPU   GPU           2D/3D
```

## 1. Separate MOIRISE Worker

A participating user's machine does not become a trusted worker merely because the user activates `Participer`.

The client must install/run a separate `MOIRISE Worker` component and explicitly consent to resource sharing.

Lifecycle:

`PARTICIPATE → INSTALL/ACTIVATE WORKER → DIAGNOSTIC → QUOTA CONFIGURATION → REGISTRATION → TRUST EVALUATION → VERIFIED/RESTRICTED`

The worker must have visible controls to pause, resume and stop participation.

It must never operate as a hidden background process.

## 2. Initial machine diagnostic

During registration the worker measures, without exceeding the user's selected quota:

- logical CPU cores;
- available RAM;
- GPU presence and VRAM where permitted;
- network latency/bandwidth class;
- worker version;
- heartbeat stability;
- availability history;
- task success history once jobs exist.

The diagnostic reports capabilities, not private user files.

```ts
interface WorkerHardware {
  cpuLogicalCores: number;
  ramTotalMb: number;
  ramAvailableMb: number;
  gpu?: {
    vendor: string;
    model: string;
    vramMb: number;
  };
  networkClass: "poor" | "normal" | "good" | "excellent";
}
```

## 3. User resource quota

The quota is a technical limit enforced by the worker sandbox/runtime, not merely a UI setting.

Default levels:

| Level | CPU | RAM | GPU | Storage |
|---|---:|---:|---|---:|
| OFF | 0 | 0 | disabled | 0 |
| LIGHT | 0.25 logical core | 256 MB | disabled | 0 |
| NORMAL | 0.5 logical core | 512 MB | disabled | 0 |
| VOLUNTARY+ | 1 logical core | 1 GB | disabled by default | 0 |

Network usage is separately quota-controlled.

The quota is not reserved permanently. It is a maximum budget while an assigned task is executing.

The worker must throttle, reject or terminate a task that exceeds its configured limits.

## 4. Worker identity

```ts
interface WorkerDescriptor {
  workerId: string;
  workerVersion: string;
  status: "online" | "busy" | "degraded" | "draining" | "offline" | "quarantined";
  trustLevel: "unverified" | "occasional" | "reliable" | "active" | "specialized";
  capabilities: string[];
  hardware: WorkerHardware;
  quota: {
    cpuLogicalCores: number;
    ramMb: number;
    gpuEnabled: boolean;
    storageMb: number;
    networkMbPerDay?: number;
  };
  maxConcurrentTasks: number;
  lastHeartbeatAt: string;
  trustState: "pending" | "verified" | "revoked" | "quarantined";
}
```

A worker advertises capabilities but never receives permission to choose arbitrary server operations.

## 5. Trust levels

Trust is technical reliability, not a reward or social ranking.

### 🟢 Reliable worker

Conditions can include:
- stable heartbeat;
- sufficient availability history;
- high task success rate;
- low failure rate;
- current compatible worker version;
- no security violations.

Can receive normal eligible tasks.

### 🔵 Active worker

A worker with consistently high availability and sufficient recent capacity.

Can receive larger non-sensitive workloads when policy permits.

### 🟣 Specialized worker

A worker with verified specialized resources, for example:
- GPU/VRAM;
- 3D workload capability;
- media processing;
- build/test capacity.

Specialization never bypasses security policy.

### 🟡 Occasional worker

Irregular availability or insufficient history.

Receives small, resumable or easily retryable tasks.

### 🔴 Inactive / quarantined

No new tasks.

Quarantine is used for repeated failures, invalid results, security violations or incompatible software until re-verification.

## 6. Technical Worker Score

The orchestrator maintains an internal technical reliability profile.

Example:

```text
Worker #4821

CPU available       ✓
RAM available       ✓
Connection          ✓
Availability        96 %
Tasks successful    99.4 %
Failure rate        0.6 %
Latency             42 ms
Last heartbeat      8 s
```

This is not a user-facing popularity score and does not grant social status.

A possible internal score is composed from:

```text
reliability
+ availability
+ recent success
+ latency
+ resource headroom
+ protocol compatibility
- failures
- timeouts
- invalid outputs
- security incidents
```

Do not use a single score as the sole authorization mechanism. Hard security/privacy constraints are evaluated first.

## 7. Registration and authentication

`INSTALL WORKER → AUTHENTICATE → VERSION CHECK → REGISTER → CAPABILITY CHECK → TRUST EVALUATION`

Unverified workers cannot receive production or private-data jobs.

Every worker requires:
- unique identity;
- short-lived scoped credentials;
- credential rotation;
- revocation support;
- audit events.

Never place Supabase, Gemini, DeepSeek, Pollinations, OpenRouter or other production secrets inside a user worker.

## 8. Job contract

```ts
interface WorkerJob {
  jobId: string;
  capability: string;
  payloadRef: string;
  payloadHash: string;
  inputPolicy: string;
  expiresAt: string;
  timeoutMs: number;
  permissions: string[];
  resourceQuota: {
    maxCpuLogicalCores: number;
    maxRamMb: number;
    gpuAllowed: boolean;
    maxStorageMb: number;
    maxNetworkMb?: number;
  };
  outputSchema: string;
  signature: string;
}
```

The job's resource quota must never exceed the worker owner's configured quota.

The worker receives only the minimum payload required by the task.

## 9. Job lifecycle

```text
QUEUED
  ↓
ASSIGNED
  ↓
ACCEPTED
  ↓
RUNNING
  ↓
RESULT_UPLOADED
  ↓
VALIDATING
  ↓
COMPLETED / REJECTED
```

Timeout, heartbeat loss or invalid output moves the job to retry/fallback.

## 10. Recoverable tasks

MORISE must not depend on a particular user worker.

Example:

```text
Task #18472
    ↓
Worker A
    ↓
A disappears
    ↓
Heartbeat timeout
    ↓
Task returned to queue
    ↓
Worker B
    ↓
Result
    ↓
Validation
```

Jobs must have:
- unique IDs;
- expiration;
- retry policy;
- idempotency key where appropriate;
- output hash;
- validation state.

A disconnected worker is never assumed to have completed the task.

## 11. Worker heartbeat

The worker sends periodic health information containing only operational metadata:

- worker ID;
- version;
- status;
- resource availability;
- current job ID if policy allows;
- timestamp.

The server tracks heartbeat age.

Suggested states:

```text
healthy → degraded → offline
```

The exact thresholds are configurable and must not be hard-coded into UI components.

## 12. Worker sandbox

Generated code and untrusted workloads execute inside an isolated environment.

A worker job must not automatically access:
- host filesystem;
- host credentials;
- production database;
- production secrets;
- arbitrary network destinations;
- other users' jobs;
- worker administration APIs.

Resource limits must be enforced by the runtime/sandbox, not merely by JavaScript variables.

## 13. Data isolation

Default policy:

```text
PRIVATE DATA
    → local/trusted authorized worker only

PUBLIC TASK
    → any verified compatible worker

SENSITIVE TASK
    → explicitly trusted worker only
```

A worker owned by another user must never receive another user's private content unless that exact transfer is explicitly authorized by policy.

## 14. Artifact model

Prefer references and hashes instead of copying large files through the orchestrator.

```text
ARTIFACT STORE
    ├── input hash
    ├── output hash
    ├── metadata
    └── provenance
```

Large game builds, images, audio and video should be transferred as artifacts, not embedded in job-control messages.

## 15. Worker classes

Initial logical classes:

- `CODE_CPU`
- `REASONING_CPU`
- `IMAGE_GPU`
- `VIDEO_GPU`
- `AUDIO_GPU`
- `GAME_2D`
- `GAME_3D`
- `TEST_RUNNER`
- `BUILD_RUNNER`

One physical computer may advertise multiple classes.

## 16. Scheduling example

For a 3D game creation request:

```text
USER REQUEST
    ↓
MORISE PLAN
    ↓
CODE TASK ─────────→ CODE_WORKER
3D ASSET TASK ─────→ SPECIALIZED_GPU_WORKER
AUDIO TASK ────────→ AUDIO_WORKER
BUILD TASK ────────→ BUILD_WORKER
TEST TASK ─────────→ TEST_WORKER
    ↓
VALIDATION
    ↓
GAME PACKAGE
```

Independent tasks can run concurrently. Dependent tasks wait for their required artifacts.

## 17. Fault tolerance

If a worker disappears:

`HEARTBEAT LOST → MARK DEGRADED/OFFLINE → EXPIRE/CANCEL JOB → RETRY ELSEWHERE → VALIDATE`

Repeated failures can move the worker to quarantine.

## 18. User-owned voluntary workers

This is an opt-in feature, never an implicit requirement.

The owner must be able to:
- choose OFF/LIGHT/NORMAL/VOLUNTARY+;
- pause;
- stop;
- change quota;
- see current resource usage;
- see task category;
- revoke participation.

The worker must not secretly continue after participation is revoked.

## 19. Server/worker trust separation

MOIRISE trusted infrastructure and user workers are separate security domains.

User workers must never receive:
- the complete production database;
- Supabase service-role keys;
- provider master keys;
- authentication signing secrets;
- administrative credentials;
- instructions for controlling the central system.

The central system sends scoped jobs; workers return scoped results.

## 20. Security boundary

Four independent questions must always be answered:

**Authentication:** Who is this worker?

**Authorization:** What may this worker do?

**Sandbox:** What can this worker physically access?

**Validation:** Can MORISE trust this result?

Authentication alone is never sufficient.

## 21. Integration points

- `00_MASTER_AI.md` — global AI authority
- `08_RESOURCE_SCHEDULER_OBSERVABILITY.md` — scheduling and metrics
- `10_PROVIDER_REGISTRY.md` — external AI providers
- `11_GAME_CREATION_RUNTIME_CONTRACT.md` — game creation/runtime boundary
- `M08 Game Factory` — game generation
- `M09 Game Runtime` — game execution

## Non-negotiable rules

1. Participation requires explicit consent.
2. User workers are untrusted by default.
3. Quotas are technically enforced.
4. GPU is disabled by default.
5. Private data is not distributed by default.
6. Production secrets never enter user workers.
7. A worker disappearing must not lose the job permanently.
8. A worker cannot become authoritative over MORISE.
9. Adding workers increases available distributed capacity; it does not create infinite compute.
10. The orchestrator must measure actual capacity and degrade gracefully when workers disappear.
