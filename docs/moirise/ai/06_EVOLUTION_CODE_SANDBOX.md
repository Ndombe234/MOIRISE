# MORISE AI — EVOLUTION / CODE GENERATION / SANDBOX

## Goal

Allow MORISE to discover and test improvements without giving it unrestricted self-modification.

## Gap detector

Signals:
- repeated failure;
- high latency;
- low quality;
- repeated fallback;
- memory inefficiency;
- user dissatisfaction;
- provider outage;
- test failure.

## Evolution loop

`OBSERVE → GAP → HYPOTHESIS → CANDIDATE → IMPLEMENT → SANDBOX → TEST → SECURITY → BENCHMARK → COMPARE → POLICY → CANARY → PROMOTE/REJECT`

## Candidate

```ts
interface EvolutionCandidate {
  id: string;
  target: string;
  baselineVersion: string;
  proposedVersion: string;
  hypothesis: string;
  tests: string[];
  benchmarkBefore?: Benchmark;
  benchmarkAfter?: Benchmark;
  securityStatus: "pending" | "passed" | "failed";
  policyStatus: "pending" | "approved" | "rejected";
}
```

## Sandbox restrictions

Generated code cannot:
- access production secrets;
- access arbitrary user data;
- change RLS;
- deploy itself;
- install arbitrary system software;
- call unregistered network endpoints;
- write production tables;
- alter permissions;
- disable safety checks.

## Tests

At minimum:
- typecheck;
- lint;
- unit;
- integration;
- security;
- regression;
- performance benchmark.

## Compare

No candidate is promoted if it improves one metric while causing unacceptable regressions elsewhere.

## Canary

Small controlled rollout.
Monitor:
- errors;
- latency;
- cost;
- quality;
- user-facing regressions.

## Rollback

Every promoted version must reference its previous stable version.
