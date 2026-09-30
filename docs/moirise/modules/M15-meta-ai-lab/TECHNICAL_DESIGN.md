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