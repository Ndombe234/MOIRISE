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
}
```

Interactive requests get priority over learning/background tasks.

## Concurrency

Use capability/provider-specific concurrency limits.
Do not allow learning jobs to consume the full system while a user is playing.

## Cancellation

Cancel obsolete:
- autocomplete requests;
- previous image drafts;
- previous recommendation calculations;
- background analyses no longer needed.

## Caching

Cache only when safe:
- translations;
- provider metadata;
- model capabilities;
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
- failure rate;
- cache hit rate.

Strategies:
- batching;
- compression;
- local execution;
- caching;
- offloading;
- model selection;
- concurrency control.

Code cannot create physical RAM or compute. It can optimize usage and coordinate additional machines/providers.

## PostHog

PostHog is an observation/experiment layer.

Allowed examples:
- page/module usage;
- latency;
- error rate;
- capability success;
- game completion;
- aggregate product signals.

No raw private messages or private media by default.

## Health registry

Provider and capability health must be represented as structured state:
unknown / healthy / degraded / rate_limited / unauthorized / offline.

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
- memory retrieval quality.
