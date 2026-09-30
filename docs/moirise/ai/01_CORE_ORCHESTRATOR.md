# MORISE AI — CORE ORCHESTRATOR

## Authority
This file is the sole owner of the orchestration request/plan contracts and execution sequence. AI action identifiers and action contracts are owned by `09_AI_ACTIONS_AND_CONTRACTS.md`.

## Role
The Orchestrator is the operational entry point for AI reasoning. It never owns provider details and never executes arbitrary commands.

## Internal components

- Context Engine
- Intent Engine
- Policy Engine
- Planning Engine
- Decision Engine
- Action Executor
- Validation Coordinator
- Response Composer
- Event Publisher

## Canonical request contract

```ts
export interface AIRequest {
  requestId: string;
  actorId?: string;
  moduleId: string;
  capability?: CapabilityId;
  input: unknown;
  context?: Partial<AIContext>;
  privacy: PrivacyLevel;
  priority: "low" | "normal" | "high";
  idempotencyKey?: string;
}
```

## Canonical plan contract

```ts
export interface AIPlan {
  id: string;
  requestId: string;
  intent: string;
  steps: PlanStep[];
  requiredCapabilities: CapabilityId[];
  risks: Risk[];
  expectedOutcome: string;
}

export interface PlanStep {
  id: string;
  action: AIActionId;
  capability: CapabilityId;
  input: unknown;
  requiresConfirmation: boolean;
  timeoutMs: number;
}
```

`AIActionId` is imported from the action registry. It must not be redefined here.

## Execution sequence

1. Verify authentication and actor/session state.
2. Validate request format.
3. Build the minimum authorized Context Pack.
4. Resolve intent.
5. Apply policy and privacy rules.
6. Build an executable plan.
7. Resolve required capabilities.
8. Ask the Resource Router for eligible execution targets.
9. Execute each plan step through an allow-listed action adapter.
10. Validate every output.
11. Compose the user response from verified results.
12. Emit the appropriate event.
13. Create an experience record only when the learning policy permits it.

A failed step produces a structured error and recovery/degraded path, never a blank screen.

## Confirmation policy

- Low-risk action: execute according to policy.
- External, irreversible or sensitive action: request confirmation according to the action contract.
- Owner-level production change: require owner authorization.
- Forbidden action: reject; never bypass policy.

The detailed confirmation matrix is owned by `09_AI_ACTIONS_AND_CONTRACTS.md`.

## Response contract

The Orchestrator never exposes hidden chain-of-thought. It returns only:

- interpreted intent when useful;
- action/status;
- verified result;
- limitation/degraded state when applicable;
- recovery instruction when necessary.

## Failure contract

Every plan step has a bounded timeout and a defined terminal state. Retries require an idempotency strategy. A provider/worker outage may trigger a configured fallback or an explicit `unavailable` result.

## No duplicate ownership

Do not redefine in this file:

- `CapabilityId` — `03_CAPABILITY_PROVIDER_ROUTER.md`;
- `AIContext`, `Intent`, `Decision` — `02_CONTEXT_INTENT_REASONING.md`;
- `AIActionId` and action definitions — `09_AI_ACTIONS_AND_CONTRACTS.md`;
- provider configuration — `10_PROVIDER_REGISTRY.md`;
- worker contracts — `12_DISTRIBUTED_WORKER_CLUSTER.md`.
