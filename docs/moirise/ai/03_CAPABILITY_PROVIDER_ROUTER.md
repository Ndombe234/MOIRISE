# MORISE AI — CAPABILITY REGISTRY / PROVIDER ROUTER

## Authority
This file is the **sole owner of capability identifiers and capability contracts**.
Provider configuration, credentials, provider lists and provider health contracts belong only to `10_PROVIDER_REGISTRY.md`.
AI action identifiers belong only to `09_AI_ACTIONS_AND_CONTRACTS.md`.

## Principle

Modules request a capability. They never know which provider, worker or local implementation will execute it.

## Canonical capability IDs

```ts
export type CapabilityId =
  | "TEXT_GENERATION"
  | "REASONING"
  | "VISION"
  | "IMAGE_GENERATION"
  | "VIDEO_GENERATION"
  | "MUSIC_GENERATION"
  | "TTS"
  | "STT"
  | "TRANSLATION"
  | "EMBEDDING"
  | "SEARCH"
  | "MODERATION"
  | "GAME_2D"
  | "GAME_3D"
  | "CODE_GENERATION"
  | "CODE_TESTING";
```

If a new capability is required, add it here first. Do not create an alias in a module.

## Capability contract

```ts
export interface CapabilityDefinition {
  id: CapabilityId;
  version: string;
  inputSchema: string;
  outputSchema: string;
  permissions: string[];
  resourceClass: "light" | "medium" | "heavy";
  validationContract: string;
  fallbackPolicy: string;
}
```

## Resolution pipeline

```text
REQUEST
  ↓
CAPABILITY ID
  ↓
POLICY CHECK
  ↓
AVAILABLE EXECUTION TARGETS
  ↓
RESOURCE ROUTER
  ↓
PROVIDER / LOCAL / WORKER ADAPTER
  ↓
RESULT VALIDATION
```

## Provider boundary

The router may select a provider adapter, but provider configuration is never stored here.

Provider endpoint, authentication mode, Supabase secret name, health state, rate limits, privacy class and verification state are owned by `10_PROVIDER_REGISTRY.md`.

## Execution targets

A capability may be implemented by:

- local code/model;
- trusted worker;
- eligible community worker;
- configured external provider;
- approved anonymous endpoint adapter.

The capability contract does not promise that every target is always available.

## Selection criteria

The router evaluates:

- capability compatibility;
- permission/privacy policy;
- resource requirements;
- target health;
- latency;
- configured quota;
- quality history;
- estimated cost when applicable;
- fallback policy.

Hard authorization and privacy constraints are evaluated before optimization criteria.

## Anonymous endpoints

Anonymous access is only an execution mode. It is never assumed to be permanent, private, unlimited or free.

Exact endpoint configuration belongs to `10_PROVIDER_REGISTRY.md` and must be verified before enabling production use.

## Circuit behavior

The router consumes target health from the authoritative health registry.

When a target is degraded, rate-limited, unauthorized or offline, the router removes it from eligible candidates and evaluates the configured fallback policy.

No capability failure may create a blank UI by itself.

## Versioning

Capability contracts are versioned independently of providers.

Example:

```text
IMAGE_GENERATION:v1
IMAGE_GENERATION:v2
```

A provider may support one or more capability versions. Modules request a compatible capability contract, not a provider version.

## No duplicate contracts

Do not redefine:

- `AIRequest` — owned by `01_CORE_ORCHESTRATOR.md`;
- `AIActionId` — owned by `09_AI_ACTIONS_AND_CONTRACTS.md`;
- provider credentials/endpoints — owned by `10_PROVIDER_REGISTRY.md`;
- worker identity/security — owned by `12_DISTRIBUTED_WORKER_CLUSTER.md`;
- worker implementation — owned by `13_DISTRIBUTED_SYSTEM_IMPLEMENTATION.md`.
