# M08 — GAME A→Z FACTORY — TECHNICAL DESIGN

## Boundary
M08 transforms a natural-language game request into a validated, portable game package. It creates; M09 executes. M08 never gives generated code production credentials.

## Pipeline
`request → intent extraction → GameSpecification → task graph → code/assets/audio generation → static analysis → sandbox build → tests → preview → signed package`.

## Types
```ts
interface GameSpecification { id:string; mode:"2d"|"3d"; engine:"phaser"|"three"|"babylon"|"playcanvas"|"custom"; scenes:SceneSpec[]; entities:EntitySpec[]; rules:RuleSpec[]; controls:ControlSpec[]; levels:LevelSpec[]; assets:AssetRef[]; audio:AssetRef[]; tests:TestSpec[]; }
interface AssetRef { id:string; kind:string; ref:string; license:"owned"|"generated"|"open"; provenance:string; hash:string; }
interface GamePackage { id:string; specHash:string; engineVersion:string; manifestRef:string; artifactRef:string; signature:string; }
```

## Task graph
Separate code, art, audio, level design and validation tasks. Independent tasks may be distributed to trusted/community workers according to worker policy. Results are content-addressed and validated before assembly.

## Provider independence
AI providers are adapters selected by the canonical provider registry. M08 never hard-codes provider endpoints or keys. If every provider is unavailable, M08 returns a clear degraded state rather than silently producing broken output.

## Safety
Generated code is untrusted. Static checks, dependency allowlists, sandbox build, runtime smoke test and resource limits are mandatory. Assets retain provenance/license metadata.

## Runtime independence
Published packages contain all required game resources and runtime manifest. Normal gameplay must not call the creation provider.

## UI
Create is a primary door. Wizard/chat, templates, preview, diagnostics and publish controls are contextual inside Create.

## Tests
small 2D game, small 3D game, malformed request, provider failure, build failure, malicious generated code, oversized asset, missing dependency, deterministic package hash and mobile preview.

## Done gate
A requested game can reach a real playable validated preview and a portable package without coupling gameplay to an AI provider.