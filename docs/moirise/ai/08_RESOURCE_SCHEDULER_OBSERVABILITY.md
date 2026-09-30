# MORISE AI — RESOURCE ENGINE / SCHEDULER / OBSERVABILITY

## Authority
This file owns resource classes, task scheduling, cancellation, safe caching and observability. Worker identity, worker states, trust, quotas and worker security are owned by `12_DISTRIBUTED_WORKER_CLUSTER.md`. Provider health/configuration is owned by `10_PROVIDER_REGISTRY.md`.

## Resource classes

- interactive;
- background;
- batch;
- low priority.

Interactive user requests take precedence over learning/background workloads within the limits of safety and fairness policy.

## Scheduler contract

```ts
interface TaskRequest {
  id: string;
  priority: "interactive" | "normal" | "background" | "batch";
  capability: CapabilityId;
  estimatedCost?: number;
  timeoutMs: number;
  cancellable: boolean;
  privacyClass: PrivacyClass;
  requiredResources?: ResourceRequirement;
  allowedWorkerClasses?: string[];
}

interface ResourceRequirement {
  minRamMb?: number;
  minCpuCores?: number;
  minGpuVramMb?: number;
  requiresGpu?: boolean;
  requiresLocalOnly?: boolean;
}
```

## Target selection

The Scheduler can dispatch to:

- local runtime;
- configured provider;
- trusted worker;
- eligible community worker.

Selection considers:

- capability match;
- CPU availability;
- RAM availability;
- GPU/VRAM availability;
- current concurrency;
- latency;
- health;
- privacy policy;
- task locality;
- quota;
- reliability history.

Hard authorization/privacy constraints are evaluated first. Raw hardware capacity alone never authorizes a target.

## Worker boundary

Worker states and worker trust levels are imported from `12_DISTRIBUTED_WORKER_CLUSTER.md`. This file must not define another worker-state enum.

## Concurrency

Use capability-, provider- and worker-specific concurrency limits.

Do not allow background learning jobs to consume the resources required for active user interactions.

## Cancellation

Cancel obsolete or superseded work where technically possible:

- autocomplete requests;
- previous image drafts;
- previous recommendation calculations;
- unnecessary background analyses;
- queued distributed tasks whose result is no longer needed.

Cancellation is best-effort for already-running external work and must not create inconsistent state.

## Caching

Cache only data whose policy allows sharing:

- translations;
- provider metadata;
- model capability metadata;
- worker capability metadata;
- repeated deterministic calculations;
- safe generated assets by content hash.

Never place private information into a public/shared cache.

## Resource optimization

Measure:

- latency;
- CPU;
- GPU where available;
- RAM;
- storage;
- network;
- provider quota;
- worker utilization;
- failure rate;
- cache hit rate;
- queue wait time.

Strategies:

- batching;
- compression;
- local execution;
- caching;
- offloading;
- model selection;
- worker selection;
- concurrency control.

Code cannot create physical RAM or compute. It can optimize usage and coordinate additional machines/providers.

## Capacity scaling

Adding an authorized healthy worker increases aggregate execution capacity only when it has actual spare resources.

Scaling is not assumed linear because network, synchronization, serialization, GPU contention and task dependencies can become bottlenecks.

## PostHog

PostHog is an observation/experiment layer, not the AI brain.

Allowed aggregate signals include:

- page/module usage;
- latency;
- error rate;
- capability success;
- game completion;
- aggregate product signals;
- worker utilization aggregates.

Raw private messages and private media are not sent as normal analytics.

## Observability metrics

Track:

- task success rate;
- correction rate;
- validation pass rate;
- fallback rate;
- latency;
- tool success;
- benchmark improvement;
- regression rate;
- memory retrieval quality;
- worker failure rate;
- queue wait time;
- resource utilization.

Health state definitions for providers/workers are consumed from their authoritative registries rather than redefined here.
