# MOIRISE Module 08 — GAME A→Z FACTORY

## 1. Purpose

Permettre à MORISE de concevoir des jeux à partir d'une idée naturelle du joueur, puis de produire une spécification validée avant toute exécution.

## 2. User flow

USER IDEA
→ clarification
→ concept
→ game design
→ GameSpecification
→ validation
→ prototype
→ simulation
→ test
→ preview
→ publication si approuvé.

## 3. UI

Créer un espace :
- idée ;
- aperçu ;
- règles ;
- assets ;
- simulation ;
- problèmes ;
- publier.

Le joueur ne voit pas les détails techniques inutiles.

## 4. MORISE dialogue

Exemple :
« Décris-moi le jeu que tu imagines. »
Puis :
« J'ai compris : exploration, énigmes et progression. Voici une première version. »

Elle doit demander clarification seulement lorsque nécessaire.

## 5. GameSpecification

Contrat conceptuel :
- metadata ;
- genre ;
- objective ;
- rules ;
- entities ;
- levels/scenes ;
- controls ;
- rewards ;
- audio;
- visual direction ;
- multiplayer mode ;
- engineTarget ;
- safety constraints.

## 6. Base engines

La première génération utilise des moteurs contrôlés :
- Adventure 2D ;
- Battle 2D ;
- Puzzle 2D.

Le 3D passe par un moteur/adaptateur validé séparé.

## 7. Security

L'utilisateur et le modèle ne doivent jamais fournir directement du code arbitraire au navigateur.

Le Factory produit une DSL/spec contrôlée.

## 8. Validation

Game Validator :
- schema validation ;
- rules validation ;
- asset validation ;
- security validation ;
- performance limits ;
- simulation ;
- regression.

## 9. Providers

Text/design providers : via AI Gateway.
Image/video/audio : via Creative capabilities.
Aucun provider n'est indispensable pour le runtime si les assets de fallback existent.

## 10. Secrets

Utiliser uniquement les secrets déjà enregistrés lorsque le provider correspondant est choisi par Router.

## 11. Events

GAME_CREATION_STARTED
GAME_SPEC_CREATED
GAME_VALIDATION_FAILED
GAME_SIMULATION_COMPLETED
GAME_CREATION_COMPLETED
GAME_PUBLISHED

## 12. Tests

- natural-language intent ;
- ambiguous idea ;
- invalid specification ;
- unsafe instruction ;
- endless loop ;
- excessive asset request ;
- provider unavailable ;
- simulation failure ;
- successful preview.

## 13. Acceptance

Aucune génération de jeu ne peut passer directement de texte utilisateur à production sans validation/simulation.

## 14. Do not modify

Ne pas placer ici le runtime partagé ; voir Module 9.

## 15. New-AI handoff

Le Game Factory fabrique des spécifications et des créations validées ; il n'a pas un accès général au système.


---

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



## 17. Canonical implementation runbook

1. Accept a natural-language idea and normalize it into a bounded GameSpecification.
2. Ask clarification only for unresolved gameplay decisions that materially change the package.
3. Split generation into independent code, visual, audio, level and validation tasks.
4. Route tasks through the canonical AI capability router and, when authorized, the Worker Cluster.
5. Treat every generated artifact as untrusted until provenance, schema, static analysis and safety checks pass.
6. Build the package in a sandbox with strict CPU/RAM/time/network limits.
7. Run deterministic and behavioral tests plus a runtime smoke test.
8. Produce a signed/content-addressed GamePackage with a stable manifest and dependency graph.
9. Generate a playable preview before publication.
10. Keep finished gameplay independent from the creation provider and from the creation conversation.
11. Preserve provider provenance, model/version metadata and artifact hashes.
12. Reject malformed, unsafe, oversized or dependency-incomplete creations.
13. Test both a real 2D package and a real 3D package, not only specifications.

### Canonical server contracts
createGameDraft, generateGameSpec, createGameTasks, runSandboxBuild, runGameValidation, createGamePreview, publishGamePackage, revokeGamePackage.

### Completion proof
A natural-language request reaches a real validated playable preview and a portable package without giving arbitrary production access to generated code.

## 21. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.