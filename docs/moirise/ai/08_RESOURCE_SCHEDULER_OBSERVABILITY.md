# MORISE AI — RESOURCE ENGINE / SCHEDULER / OBSERVABILITY

## Resource classes

- interactive;
- background;
- batch;
- low priority.

## Scheduler

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

Interactive requests get priority over learning/background tasks.

## Distributed workers

The scheduler can dispatch a task to the local runtime, a configured provider, or an authorized worker.

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

A worker is never selected solely because it has more raw hardware. Privacy and authorization are hard constraints.

## Worker states

`online | busy | degraded | draining | offline | quarantined`

## Concurrency

Use capability/provider/worker-specific concurrency limits.
Do not allow learning jobs to consume the full system while a user is playing.

## Cancellation

Cancel obsolete:
- autocomplete requests;
- previous image drafts;
- previous recommendation calculations;
- background analyses no longer needed.

Queued distributed jobs must support cancellation and expiration when technically possible.

## Caching

Cache only when safe:
- translations;
- provider metadata;
- model capabilities;
- worker capabilities;
- repeated deterministic calculations;
- safe generated assets by content hash.

Never cache private information in a public/shared scope.

## Resource optimization

Measure:
- latency;
- CPU;
- GPU if available;
- RAM;
- storage;
- network;
- provider quota;
- worker utilization;
- failure rate;
- cache hit rate.

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

Adding a worker increases available aggregate capacity only when that worker is authorized, healthy and actually has spare resources.

The system must not assume that capacity scales linearly: network, synchronization, GPU contention, serialization and task dependencies can become bottlenecks.

## PostHog

PostHog is an observation/experiment layer.

Allowed examples:
- page/module usage;
- latency;
- error rate;
- capability success;
- game completion;
- aggregate product signals;
- worker utilization aggregates.

No raw private messages or private media by default.

## Health registry

Provider, capability and worker health must be represented as structured state:
unknown / healthy / degraded / rate_limited / unauthorized / offline / quarantined.

## Metrics for intelligence

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
