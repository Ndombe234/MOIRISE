# M08 — GAME A→Z FACTORY — COMPLETE TECHNICAL CONTRACT

## Responsibility
M08 converts a natural-language game request into a validated portable GamePackage. M09 executes it. M08 never receives production master credentials.

## Pipeline
`request → intent extraction → GameSpecification → task graph → code/assets/audio/level generation → provenance → static analysis → sandbox build → tests → preview → package hash → signature`.

## Types
```ts
interface GameSpecification { id:string; mode:'2d'|'3d'; engine:string; scenes:SceneSpec[]; entities:EntitySpec[]; rules:RuleSpec[]; controls:ControlSpec[]; levels:LevelSpec[]; assets:AssetRef[]; audio:AssetRef[]; tests:TestSpec[]; }
interface AssetRef { id:string; kind:string; ref:string; license:'owned'|'generated'|'open'; provenance:string; hash:string; }
interface GamePackage { id:string; specHash:string; engineVersion:string; manifestRef:string; artifactRef:string; signature:string; }
```

## Task graph
Separate code, art, audio, level design, testing and packaging tasks. Independent work may be distributed through the Worker Cluster. Every result is content-addressed, provenance-tagged and validated before assembly.

## Provider routing
M08 requests capabilities such as `code.generate`, `image.generate`, `audio.generate` and `video.generate`; the canonical Provider Registry/Router chooses providers. M08 never hard-codes endpoints or keys.

## Generation rules
Generated code is untrusted. Dependencies are allowlisted. Generated assets retain source/license/provenance metadata. Unsupported or unverifiable assets are rejected rather than silently published.

## Validation
Static scan → dependency validation → sandbox build → unit/smoke tests → package integrity → preview. A failed stage blocks publication.

## Runtime independence
Published packages include required resources and a runtime manifest. Playing a published game must not call its creation provider.

## UI
Create is one primary door. The creator workflow is a contextual wizard/chat with specification preview, generation progress, diagnostics, playable preview and publish/export actions.

## Resource policy
Long generation tasks are asynchronous and resumable. Worker/API failure requeues only the affected task. Intermediate artifacts are immutable/content-addressed.

## Tests
2D generation; 3D generation; malformed request; provider failure; worker failure; build failure; malicious code; oversized asset; missing dependency; license/provenance rejection; deterministic package hash; mobile preview.

## Done gate
A user request can reach a real playable validated preview and portable package without gameplay depending on an AI provider.