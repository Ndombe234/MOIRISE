# M08 — GAME FACTORY — TECHNICAL CONTRACT

## Boundary
M08 converts a user request into a structured game project. It creates; it does not execute. Provider APIs are optional adapters and never become part of the finished game runtime.

## Pipeline
`request → GameIntent → GameSpecification → plan → code/assets/audio generation → static validation → build → simulation → tests → signed GamePackage`.

## Canonical types
```ts
interface GameSpecification { id:string; mode:"2d"|"3d"; engine:string; scenes:unknown[]; entities:unknown[]; controls:unknown; rules:unknown; levels:unknown[]; assets:AssetRef[]; audio:AssetRef[]; tests:TestSpec[]; }
interface AssetRef { id:string; kind:"image"|"model"|"texture"|"audio"|"font"; ref:string; license:"owned"|"generated"|"open"; provenance:string; }
```

## AI flow
AI Orchestrator creates the plan and requests capabilities for code, images, audio, video and validation. Provider selection comes only from the canonical provider registry. No provider URL is hard-coded in M08.

## Safety
Generated code is untrusted. It is statically inspected, built in an isolated sandbox and tested before preview/publication. No generated package receives MOIRISE database credentials.

## Provenance
Every asset records source/provenance and allowed usage. Generation output is not automatically trusted as factual or legally cleared.

## Runtime independence
A published package contains the resources and runtime manifest required for gameplay. It must not call the creation provider during normal gameplay.

## Acceptance
A player can request a small game, inspect a real preview, retry generation, receive diagnostics on failure, and publish only a validated package.