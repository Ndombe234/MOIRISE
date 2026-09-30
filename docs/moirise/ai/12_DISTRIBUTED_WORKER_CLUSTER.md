# MORISE AI — DISTRIBUTED WORKER CLUSTER

## Authority
This file is the single technical contract for distributed workers. The general resource scheduler is defined in `08_RESOURCE_SCHEDULER_OBSERVABILITY.md`; this file defines worker identity, registration, security, job transport and lifecycle.

## Goal

Allow MORISE to use multiple computers with different CPU, RAM and GPU capacities without making the development computer a permanent compute bottleneck.

Example:

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

## Worker identity

```ts
interface WorkerDescriptor {
  workerId: string;
  workerVersion: string;
  status: "online" | "busy" | "degraded" | "draining" | "offline" | "quarantined";
  capabilities: string[];
  cpu: {
    cores: number;
    architecture: string;
  };
  memory: {
    totalMb: number;
    availableMb: number;
  };
  gpu?: {
    vendor: string;
    model: string;
    vramMb: number;
  };
  maxConcurrentTasks: number;
  lastHeartbeatAt: string;
  trustState: "pending" | "verified" | "revoked" | "quarantined";
}
```

A worker advertises capabilities but never receives permission to choose arbitrary server operations.

## Registration

`INSTALL WORKER → AUTHENTICATE → ATTEST/VERSION CHECK → REGISTER → CAPABILITY CHECK → VERIFIED`

Unverified workers cannot receive production or private-data jobs.

## Authentication

Every worker requires a unique identity and short-lived credentials.

Rules:
- never place Supabase/Gemini/provider production secrets inside the worker;
- use scoped worker credentials;
- rotate credentials;
- revoke compromised workers;
- reject expired credentials;
- bind jobs to worker identity;
- audit registration and revocation.

## Job contract

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
  outputSchema: string;
  signature: string;
}
```

The worker receives the minimum payload required by the task.

## Job lifecycle

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

Timeout, heartbeat loss or invalid output moves the job to a retry/fallback state.

## Worker sandbox

Generated code and untrusted workloads execute inside an isolated environment.

A worker job must not automatically access:
- host filesystem;
- host credentials;
- production database;
- production secrets;
- arbitrary network destinations;
- other users' jobs;
- worker administration APIs.

Use resource limits for CPU, RAM, storage, execution time and network according to the runtime available on the worker.

## Data isolation

Default policy:

```text
PRIVATE DATA → LOCAL/AUTHORIZED TRUSTED WORKER ONLY
PUBLIC TASK → ANY VERIFIED COMPATIBLE WORKER
SENSITIVE TASK → EXPLICITLY TRUSTED WORKER ONLY
```

A worker owned by another user must never receive another user's private content unless the policy explicitly authorizes that exact transfer.

## Artifact model

Prefer references and hashes instead of copying large files through the orchestrator.

```text
OBJECT STORE / ARTIFACT STORE
          │
          ├── input hash
          ├── output hash
          ├── metadata
          └── provenance
```

Large game builds, images, audio and video should be transferred as artifacts, not embedded inside job-control messages.

## Worker classes

Initial logical classes may include:

- `CODE_CPU`
- `REASONING_CPU`
- `IMAGE_GPU`
- `VIDEO_GPU`
- `AUDIO_GPU`
- `GAME_2D`
- `GAME_3D`
- `TEST_RUNNER`
- `BUILD_RUNNER`

A physical computer may advertise several classes.

## Scheduling example

For a 3D game creation request:

```text
USER REQUEST
    ↓
MORISE PLAN
    ↓
CODE TASK ─────────→ CODE_WORKER
3D ASSET TASK ─────→ GPU_WORKER
AUDIO TASK ────────→ AUDIO_WORKER
BUILD TASK ────────→ BUILD_WORKER
TEST TASK ─────────→ TEST_WORKER
    ↓
VALIDATION
    ↓
GAME PACKAGE
```

Tasks that have dependencies wait for their required artifacts. Independent tasks may run concurrently.

## Fault tolerance

If a worker disappears:

`HEARTBEAT LOST → MARK DEGRADED/OFFLINE → CANCEL/EXPIRE JOB → RETRY ELSEWHERE → VALIDATE`

Do not assume the previous worker completed a job merely because the connection disappeared.

## User-owned voluntary workers

This is an opt-in feature, never an implicit requirement.

A participating user's machine must run a separate worker application with:
- explicit consent;
- visible resource limits;
- pause/stop controls;
- task categories shown to the owner;
- no access to private user data outside the worker's own scope;
- automatic credential revocation;
- secure update mechanism.

The worker must never become a hidden background process.

## Security boundary

The worker is untrusted by default even when authenticated.

Authentication answers: "Who is this worker?"

Authorization answers: "What may this worker do?"

Sandbox answers: "What can this worker physically access?"

Validation answers: "Can MORISE trust this result?"

All four layers are required.

## Integration points

- `00_MASTER_AI.md` — global AI authority
- `08_RESOURCE_SCHEDULER_OBSERVABILITY.md` — scheduling and metrics
- `10_PROVIDER_REGISTRY.md` — external AI providers
- `11_GAME_CREATION_RUNTIME_CONTRACT.md` — game creation/runtime boundary
- `M08 Game Factory` — game generation
- `M09 Game Runtime` — game execution

## Non-negotiable rule

Adding workers increases available resources; it does not magically create infinite computation. MORISE must measure actual capacity, schedule around bottlenecks and degrade gracefully when workers disappear.
