# M15 — META SYSTEM + MORISE AI LAB — CONCEPTION TECHNIQUE

## 0. Autorité documentaire

Ce fichier décrit uniquement les contrats techniques spécifiques au module M15 :
- boundary d'entrée/sortie ;
- intégration avec les modules ;
- AI Lab ;
- projections SYSTEM ;
- orchestration des use-cases M15.

La fabrication des mécanismes centraux de MORISE AI est définie une seule fois dans :
docs/moirise/ai/AI_TECHNICAL_DESIGN.md

Ne pas recréer ici :
- Request Gate ;
- Actor Resolver ;
- Context Engine ;
- Intent Compiler ;
- Requirements Compiler ;
- Planner ;
- Policy Engine ;
- Capability Registry ;
- Tool Registry ;
- Provider Router ;
- Validation Engine ;
- Memory Service ;
- Evolution Engine.

## 1. Interface M15

M15 reçoit une AIRequest conforme au contrat central.

Le module caller fournit :
- sourceModule ;
- intent ;
- inputRefs ;
- constraints ;
- requested output ;
- requested autonomy.

Le serveur fournit :
- actorId ;
- permissions ;
- requestId ;
- traceId.

Le provider n'est jamais une entrée du module caller.

## 2. Use-case boundary

Use-cases M15 typiques :
- runAIRequest ;
- createTaskGraph ;
- createCreativeArtifact ;
- createGameSpecification ;
- analyzeWorldSignal ;
- proposeConvergence ;
- proposeMission ;
- proposeWorldMemoryCandidate ;
- createImprovementCandidate.

Chaque use-case appelle les services centraux AI et ne réimplémente pas leurs algorithmes.

## 3. Projection SYSTEM

Le frontend peut recevoir une projection M15 :
- request status ;
- task progress ;
- proposal ;
- artifact ref ;
- validation result ;
- degraded state.

La projection ne doit pas exposer :
- provider secrets ;
- internal prompt ;
- raw private context ;
- admin diagnostics ;
- hidden policy rules.

## 4. AI Lab boundary

Entrée :
ImprovementCandidate.

Le Lab crée :
- candidate workspace ;
- candidate branch ;
- build/test artifacts ;
- benchmark result ;
- canary proposal.

Sortie :
- PROMOTE_CANDIDATE ;
- REJECT_CANDIDATE ;
- ROLLBACK_CANDIDATE.

La promotion réelle suit le pipeline central d'évolution.

## 5. M15 → M08

M15 fournit :
- GameRequirements ;
- GameSpecification ;
- TaskGraph reference.

M08 fournit :
- factory result ;
- build artifact ;
- package refs ;
- publish proposal.

M15 ne déclare pas le jeu publié.

## 6. M15 → M09

M15 peut produire :
- engine configuration candidate ;
- generated content;
- runtime test candidate.

M09 reste propriétaire du runtime.

## 7. M15 → M05

M15 peut fournir :
- validated progression signal ;
- title proposal ;
- mission proposal ;
- SYSTEM presentation proposal.

M05 valide et committe les mutations de progression.

## 8. M15 → M11

M15 peut fournir :
- affinity candidate ;
- convergence candidate ;
- community proposal.

M11 décide :
- création ;
- membership ;
- roles ;
- visibility.

## 9. M15 → M12

M15 peut produire :
- event concept ;
- content proposal ;
- personalization proposal.

M12 reste owner de :
- schedule ;
- eligibility ;
- registration ;
- state ;
- results.

## 10. M15 → M14

M15 peut analyser :
- reward economy;
- collection patterns;
- title patterns;
- balance signals.

M14 reste owner :
- ledger ;
- reward grant ;
- roulette outcome ;
- title unlock.

## 11. Supabase boundary

M15 ne doit pas contourner les tables propriétaires des autres modules.

Pour un module externe :
1. M15 produit une proposition ;
2. proposition transmise au module owner ;
3. owner valide ;
4. owner committe ;
5. event publié ;
6. M15 reçoit le résultat validé.

## 12. API boundary

Endpoint central :
POST /api/ai

Task projection :
GET /api/ai/tasks/:taskId

Provider health :
GET /api/ai/providers/health

Capability projection :
GET /api/ai/capabilities

M15 ne crée pas un deuxième endpoint par provider.

## 13. Security boundary

M15 ne possède aucun secret client-side.

M15 ne peut pas :
- modifier RLS ;
- créer un admin ;
- accéder au service role depuis un model output ;
- exécuter arbitrary shell ;
- écrire arbitrary files ;
- appeler arbitrary URLs.

## 14. DONE

M15 technique est DONE lorsqu'il :
- expose les use-cases M15 ;
- consomme le cerveau AI central ;
- respecte les owners ;
- expose des projections sécurisées ;
- isole AI Lab ;
- n'introduit aucune deuxième implémentation des mécanismes centraux.

## AI MODULE CONTRACT — M15

Canonical components = RequestGate, ContextEngine, IntentCompiler, RequirementsCompiler, Reasoner, Planner, PolicyEngine, CapabilityRegistry, ToolRegistry, ProviderRouter, ResourcePlanner, ValidationEngine, MemoryService, ExperienceService, EvolutionPipeline.
Module cognition input = moduleId, owner, capabilities, schemas, event contracts, context scopes, dependencies, authority boundaries.
Execution = REQUEST → ACTOR → CONTEXT → INTENT → REQUIREMENTS → PLAN → POLICY → RESERVE → EXECUTE → VALIDATE → OWNER COMMIT → EVENT → MEMORY → EVALUATE.
Evolution candidates are isolated; benchmark baseline is mandatory; security/policy before canary; promotion reversible.
Tests : single-brain invariant, forbidden cross-owner write, context leakage, provider invalid output, capability mismatch, planner cycle, memory scope violation, failed canary rollback.

## GAME PLATFORM — INTERFACE TECHNIQUE M15

### GameCreationGraph
GameCreationGraph = requestRef + gameRequirementsRef + gameSpecificationRef + taskGraphId + selectedComponents[] + runtimeTarget + resourcePlan + validatorRefs[] + repairBudget + autonomy + status.

### Capability families
GAME_SPECIFICATION, GAME_TEMPLATE_RESOLUTION, GAME_CODE_GENERATION, GAME_ASSET_GENERATION, GAME_AUDIO_GENERATION, GAME_TEST_GENERATION, GAME_BUILD, GAME_STATIC_VALIDATION, GAME_SECURITY_VALIDATION, GAME_RESOURCE_VALIDATION, GAME_RUNTIME_VALIDATION, GAME_REPAIR, GAME_INTEGRATION.

### Orchestration rule
M15 peut planifier et exécuter ces capabilities. Les commits restent chez M08, M09, M06 et autres owners selon la phase.

### Agent adapter
Un agent comme Codex est résolu comme execution target spécialisée. Contract : workspaceRef + taskNode + toolAllowlist + resourceProfile + deadline + outputRefs. Son output reste candidate artifact.

### Game repair loop
M15 ne corrige pas en boucle sans borne. Chaque cycle exige diagnosticRef, hypothesis, candidateRevision, impactedTests, attemptNumber et maxAttempts. Même échec répété = oscillation/escalade.

### Provider/agent independence
Ni Codex ni un provider de code/image/audio ne devient le moteur de décision de MORISE. Leur sortie entre dans le même pipeline validation → owner commit.

### Final orchestration test
Une demande de jeu 2D et une demande de jeu 3D doivent traverser le même orchestrateur, différer seulement par les exigences/runtime capabilities pertinentes, puis aboutir à des artifacts et manifests validés avant intégration.

## GAME FABRICATION MEMORY — M15

M15 consulte le MemoryService central pour retrouver les connaissances GAME_* validées avant une fabrication et pour enregistrer les nouvelles connaissances après validation. Le cycle est : retrieval → fabrication → validation → observation → candidate → benchmark/policy → promotion ou rejet.

Une connaissance de fabrication doit conserver ses conditions d'application, preuves, compatibilité 2D/3D, version runtime, utilité, confiance, statut et références d'artifacts/tests. Les échecs et réparations sont versionnés ; une réparation échouée n'est jamais proposée comme recette validée.

Les outils de développement sont des cibles d'exécution interchangeables. Leur utilisation enrichit l'expérience, mais la connaissance appartient à MORISE et reste disponible indépendamment de cet outil.

## CREATIVE MEDIA TECHNICAL ORCHESTRATION

Canonical cross-module contract = `docs/moirise/CREATIVE_MEDIA_VIRALITY_TECHNICAL_DESIGN.md`.

### MediaAnalysisTask
```ts
MediaAnalysisTask = {
  mediaRef,
  actorRef,
  purpose,
  privacyClass,
  permissionState,
  sourceOwnershipClass,
  requiredCapabilities,
  retention,
  outputScope,
  status
}
```

### GenerationTask
```ts
GenerationTask = {
  creativeBriefRef,
  sourceRefs,
  transformationClass,
  capabilityId,
  providerPolicy,
  originalityPolicy,
  validatorRefs,
  outputScope,
  status
}
```

### Mandatory pipeline
`REQUEST → PERMISSION → PROVENANCE → ANALYZE → SEMANTIC PROFILE → TRANSFORM → CREATIVE BRIEF → ROUTE → GENERATE → VALIDATE → ORIGINALITY CHECK → ARTIFACT CANDIDATE → OWNER COMMIT`.

### Modality behavior
IMAGE uses vision → semantic composition → image generation. VIDEO uses frame/scene/motion/audio analysis → storyboard → video generation/editing. MUSIC uses audio feature analysis → new musical brief → music generation → audio validation. AUDIO uses waveform/speech/environment features → new audio artifact where permitted.

### Copyright-risk boundary
The system must not implement a “rename words/notes to escape copyright” routine. The safe technical abstraction is semantic transformation + new expression + provenance + validation. Rights uncertainty produces INCONCLUSIVE, not automatic publication.

### Provider independence
A media request never contains a provider URL chosen by the client. The Capability Registry resolves the capability; Provider Router applies hard filters; adapter executes; Validator evaluates; M15 decides next action; owner commits publication.

## VIRALITY TECHNICAL ORCHESTRATION

### ShareOpportunity
```ts
ShareOpportunity = {
  sourceEventRef,
  contentRef,
  audienceCandidates,
  reasonKey,
  cooldownKey,
  privacyClass,
  expiresAt
}
```

### Recommendation loop
M07 owns ranking. M15 can generate features/proposals but cannot bypass M07 policy. `reasonKey` is enumerated and privacy-safe.

### First-session task graph
The SYSTEM can create a bounded graph that chooses one relevant discovery, one low-friction interaction, one creative/playable action and one optional social connection. It must terminate when the user disengages.

### Tests
Private media never enters public context; source permission revoked invalidates generation; malformed provider output rejected; originality inconclusive cannot publish; share cooldown enforced; recommendation reason never leaks hidden sensitive signals; AI outage leaves social/feed functions usable.

# D10 — M15 META SYSTEM + MORISE AI LAB — CONCEPTION TECHNIQUE
## ModuleManifest
`ModuleManifest={moduleId,owner,capabilities,schemas,events,dependencies,contextScopes,authorityBoundaries,validators,autonomyMax,version}`.
## Request pipeline
REQUEST → ACTOR → CONTEXT → INTENT → REQUIREMENTS → PLAN → POLICY → RESERVE → EXECUTE → VALIDATE → OWNER COMMIT → EVENT → MEMORY → EVALUATE.
## TaskGraph node
`TaskNode={taskId,graphId,capabilityId,version,dependencies,inputRefs,outputRefs,resourceProfile,validatorId,idempotencyKey,timeout,retryPolicy,state,lease?}`.
## Media pipeline
MediaRef → MediaAnalysis → ConceptAbstraction → CreativeBrief → GenerationTask → Validation → ArtifactRef → OwnerCommit.
## Provider adapter
ProviderAdapter = capabilityVersion + requestSchema + responseSchema + authMode + healthProbe + privacyClass + resourceProfile + validator.
## Output validation
Every provider result is VALID/INVALID/DEGRADED/INCONCLUSIVE before becoming evidence. INCONCLUSIVE cannot promote memory or publish sensitive content.
## Memory
MemoryRecord carries scope, provenance, confidence, utility, evidenceRefs, validationStatus, policyVersion and expiry. Private DM content is not global memory by default.
## Agent boundary
Agent output is candidate artifact. Workspace allowlist, resource profile, deadline and filesystem/network restrictions are mandatory.
## Evolution
Candidate changes are isolated, compared to baseline, tested for regression/security/policy, canaried and reversible.
## Failure control
Dependency failure selects degraded/fallback route. Oscillation uses failure fingerprints and maxAttempts. No unbounded auto-repair.
## Tests
single-brain invariant, cross-owner write denied, privacy-scope violation, provider invalid output, task graph cycle, memory promotion abuse, agent prompt injection, rollback.

# D100K — M15 Meta System / MORISE AI Lab — FABRICATION / EVIDENCE

Every task resolves to TASK_ID → FEATURE_ID → FILE/SYMBOL → dependency order → exact contract → authoritative state → validation → tests → browser scenarios → evidence → status.

File contracts specify exact path, owner M15, symbols, allowed authorities, forbidden writes, persistence/event side effects and direct tests. Function contracts specify types, preconditions, state access, idempotency, concurrency, errors and observability.

Adversarial proof must include replay, duplicate command, stale state, unauthorized access, malformed upstream/AI output, dependency failure and privacy leakage where applicable.

Evidence is fresh only when tied to the exact commit and exact scenario/check. Unit tests cannot alone certify a user-facing or production-sensitive feature.

Ownership firewall: M15 may consume other modules through contracts, events or projections, but may not assume their private authority.
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M15 META AI LAB
## Owner scope
M15 owns parsing orchestration, ContextPacket construction, provider routing and AI proposals. It is not the ultimate owner of Player/World/Reward mutations.
## Required pipeline
OBSERVE → EXTRACT → RESOLVE → CLASSIFY → POLICY → RETRIEVE → PLAN → PROPOSE → OWNER VALIDATE → COMMIT → EVENT → EVALUATE.
## Structured memory
Never rely on a single free-text summary. Provide field-level facts, relations, provenance, confidence, temporal scope, sensitivity and conflicts.
## Hierarchical comprehension
When a user gives progressively finer details, append/enrich the graph at the correct node. Example: country then city then street then building then unit; each remains independently addressable.
## Sensitive data
M15 must redact exact location and other sensitive fields unless the current capability is explicitly authorized to use them. It must never infer protected traits from appearance/media.
## Correction
User correction produces ContextCorrection and supersedes the target fact according to policy; every downstream cache is invalidated.
## Provider boundary
Providers receive a task-scoped ContextPacket after privacy filtering. Provider responses are untrusted candidates and cannot mutate Player memory directly.
## D100K tests
Multi-turn enrichment, language switch, coreference, correction, conflict, sensitive-field redaction, provider injection, tool-call leakage, memory deletion, degraded mode, deterministic parser fallback.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M15
## RF-M15-01 First-session orchestration
M15 creates the task graph for First Contact/post-contact curiosity but M05/M04/M06 own their mutations.
## RF-M15-02 Creation Runtime + tools + world agents
Capability registry exposes typed tools. Agent execution has max autonomy, context class, validator, timeout, budget and rollback.
## RF-M15-03 On-device / zero-API routing
Route local/on-device first, then cache, trusted worker, opted-in community worker, verified client-side provider, key provider, explicit paid provider, degraded. Provider is never the brain.
## RF-M15-04 Collective intelligence
Aggregate only permitted shared signals. No private memory leakage into collective models.
## RF-M15-05 Creator Economy orchestration
AI may evaluate evidence and propose eligibility; M14 commits economic state.
## RF-M15-06 Owner/Admin control center
Administrative actions require explicit privileged actor, audit event, policy check and safe rollback where applicable. AI never grants itself admin authority.
## RF-M15-07 Self-evolution
Observe gap→hypothesis→candidate→static checks→sandbox→tests→benchmark→security/policy→canary→promote/reject→monitor→rollback. Production self-modification without gates is prohibited.




# HISTORICAL FUSION — M15 AI LAB — TECHNICAL DESIGN

## ResourceEngine

`ResourceProfile` doit représenter CPU, RAM, GPU/VRAM, storage, network, concurrency, timeout et locality. La réservation précède l'exécution lorsqu'une tâche est lourde ou distribuée.

## WorkerRegistry / Scheduler

`WorkerDescriptor` : workerId, version, status, trustState, capabilities, hardware, availableResources, maxConcurrency, heartbeat.

`WorkerJob` : jobId, capability, payloadRef/hash, privacy/inputPolicy, resourceQuota, timeout, permissions, outputSchema, idempotency/signature.

Sélection :
capability → policy/trust → resource fit → health → quota → locality → queue/concurrency → optimization.

Lease expiration permet le ré-assignement uniquement des tâches sûres/idempotentes.

## EvolutionCandidate

`EvolutionCandidate` contient baseline/proposed version, hypothesis, evidence, changed artifacts, tests, benchmarkBefore/After, security/policy status, canary state et rollback reference.

Le pipeline est strictement :

OBSERVE → GAP → CANDIDATE → STATIC → SANDBOX → TEST → SECURITY → BENCHMARK → POLICY → CANARY → PROMOTE/REJECT → MONITOR → ROLLBACK.

## Safety boundary

Generated code = untrusted artifact. Les sandbox/workers n'ont pas accès aux secrets production, permissions globales, RLS, SQL arbitraire ou réseau non autorisé.

## Multimodal DAG

Les capacités texte/image/vidéo/audio/musique/vision/traduction/code/jeu utilisent un graph de tâches versionné, avec ressources, dépendances, validators et provenance par node.

## Evidence

Chaque évolution ou job distribué produit une trace :
requestId → target → resource reservation → execution → validation → outcome → artifact/result → event.

## Acceptance

M15 reste opérationnel avec zéro provider et zéro Community Worker. La perte d'un worker ou provider dégrade l'exécution disponible, pas le cerveau ni l'état métier.



# D100K — RESTORED META AI LAB TECHNICAL CONTRACTS

`EvolutionProposal={id,target,rationale,patchRef,testsRef,baselineMetrics,status:'draft'|'testing'|'canary'|'approved'|'rejected'|'rolled_back'}`
`SystemAction={id,capability,actorId,authorization,status:'requested'|'running'|'completed'|'failed'}`

Every proposal carries baseline metrics, explicit tests, security/policy result, canary state and rollback reference. Production security policy, provider registry, RLS, worker trust policy and destructive operations cannot be changed autonomously.

AI Lab Control Plane handoff:
request → auth/policy → capability → resource reservation → worker/provider/local target → sandbox → execution → validation → owner decision → evidence.

D100K: prompt injection, data leakage, cross-player isolation, malicious patch, stale proposal, provider disagreement, worker failure, resource exhaustion, rejected canary and rollback.



# D100K — RESTORED AI LAB CONTINUITY TECHNICAL CONTRACT

Provider/worker/model loss selects the highest eligible remaining execution mode:
DETERMINISTIC_LOCAL → ON_DEVICE → CACHE → TRUSTED_WORKER → COMMUNITY_WORKER → VERIFIED_PROVIDER → DEGRADED/UNAVAILABLE according to policy.

An AI fallibility experiment is a versioned sandboxed experiment with hypothesis, expected effect, reversibility and explicit player-visible framing. A provider failure is never converted into a success or authoritative fact.

D100K: zero-provider boot, zero-worker operation, malformed provider output, worker loss, deterministic fallback, no-fake-success and rollback.

