# M08 — GAME A→Z FACTORY — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
Créer un jeu ne signifie pas « appeler un modèle ». La chaîne complète est : idée → exigences → GameSpecification → task graph → moteur → règles → contenu/assets/code → build → sécurité → simulation → tests → playtest → balance → preview → version → publish.

## 1. Owner
M08 possède le pipeline de fabrication. M09 possède le runtime. M15 possède l'orchestration AI/ressources. Le code généré reste non fiable jusqu'à validation.

## 2. Natural-language intake
Acteur : creator. Déclencheur : entrer une idée dans CREATE.
Préconditions : texte reçu; capability de création disponible.
Étapes : extraire goal/genre/mode/core loop → détecter ambiguïtés bloquantes → poser seulement les questions nécessaires → créer DraftSpec → permettre édition.
Une ambiguïté non bloquante doit devenir un défaut explicite et réversible, pas une décision cachée.

## 3. GameSpecification
La spec contient au minimum : identity, genre, 2D/3D mode, engine, camera, scenes, entities, controls, rules, difficulty, win/loss, quests, rewards, assets, audio, save, share, multiplayer, accessibility, performance, security, testPlan, publication.
Chaque version possède specVersion et hash d'entrée.

## 4. Task graph
La spec validée devient un DAG. Chaque node possède taskId, dependencies, capabilityId, capabilityVersion, inputRefs, outputRefs, resourceProfile, timeout, validatorRef et idempotencyKey.
Un cycle ou une dépendance impossible bloque le graph avant exécution.

## 5. 2D
Adventure 2D : exploration, NPC, quêtes.
Battle 2D : combat, stats, loot.
Puzzle 2D : logique, états et interactions déterministes.
L'engine est choisi depuis la spec, jamais arbitrairement parce qu'un provider le propose.

## 6. 3D
3D est retenu lorsque la spatialité apporte une valeur réelle. Avant génération : scene graph, camera model, collisions, lighting, asset budget, loading strategy, device capability, fallback et test budget sont définis.

## 7. Artifacts
Code, data, scenes, images, audio, vidéo et manifest sont des ArtifactRefs versionnés. Chaque artifact conserve creator/source, generating node, hash, validation status et provenance.

## 8. Validation / correction
Échecs classés : schema, static/type, build, security, runtime, behavior, content, resource. M15 peut générer un candidat de correction dans un workspace isolé. La version stable reste inchangée tant que le candidat n'est pas promu.

## 9. Publication
Gates obligatoires : manifest, build valide, static checks, security/resource checks, simulation, behavior tests, preview, policy checks et authorized publish command. La version publiée est immuable; activeVersion pointe vers elle.

## 10. Living Object
Un Living Object peut devenir seed de projet. Fork/merge/conversion conserve owner, attribution, lineage, contributors et source refs. Une conversion ne modifie pas silencieusement l'original.

## 11. Tests / DONE
Tester idée ambiguë, spec incohérente, cycle DAG, build failure, malicious dependency, 2D, 3D, resource overrun, rollback et publication non autorisée. DONE seulement avec version reproductible et rollback.

## AI-INTÉGRATION M08 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

### A. Position
M08 est l'atelier de fabrication A→Z. M15 est le cerveau d'orchestration qui comprend le brief, compile les exigences, planifie les capabilities et gère les ressources, mais M08 reste owner du GameSpecification et de l'acceptation du package.

### B. AI cases
Game design, code generation, asset generation, audio/music, test generation, 2D/3D scene planning, documentation, repair proposals.

### C. Pipeline
brief → intent → requirements → GameSpecification → TaskGraph → capabilities → resource plan → sandbox → artifacts → validators → build → M09 runtime validation.

### D. Untrusted rule
Tout code, script, asset, prompt result, image, audio ou fichier produit par un provider/worker est NON_TRUSTED jusqu'à validation. Un provider ne publie jamais directement.

### E. 2D/3D
La 3D n'est retenue que si elle apporte une valeur réelle. La génération doit préciser engine, version, scene graph, camera, collisions, lighting, asset budget, loading, device capability, fallback et test budget.

### F. DONE
Un jeu généré n'est publiable que si tous les nodes du DAG sont VALID, les artifacts sont validés, le manifest runtime est compatible et les tests passent.

## GAME PLATFORM — FONDATION PERMANENTE M08

M08 possède la Game Factory Platform : GameSpecification, templates, composants réutilisables, artifact lineage, build orchestration et réparation bornée.

La chaîne est : demande → requirements → GameSpecification → recherche de fondations compatibles → TaskGraph → génération → build → tests → réparation → validation → GameBuild.

Avant de créer une nouvelle brique, M08 cherche template 2D/3D, gameplay component, input, UI, audio, save, share hook, test fixture, runtime adapter et artifact validé compatibles.

Le choix 2D/3D vient de la GameSpecification. La 3D doit expliciter scene graph, camera, collisions, lighting, physics, asset budget, loading et device/performance profile.

Codex peut agir comme agent de modification sur un workspace candidat limité. Il n'est jamais l'autorité de publication et n'obtient pas automatiquement les secrets de production.

Build/test error → diagnostic → correction ciblée → nouvelle revision → tests → validation. La stable build n'est jamais modifiée directement.

## GAME FABRICATION MEMORY — M08

M08 ne possède pas une deuxième mémoire AI. Il produit les preuves et artifacts qui alimentent le Memory Service central.

Après chaque build/test/repair, M08 doit fournir :
- project/build/task refs ;
- artifact hashes ;
- test results ;
- failure fingerprints ;
- successful repair refs ;
- resource/performance observations ;
- runtime compatibility observations ;
- reuse decision refs.

Avant une nouvelle fabrication, M08 demande au MemoryService les connaissances GAME_* pertinentes. Il vérifie leur compatibilité et ne réutilise qu'un pattern VALIDATED.

Une connaissance candidate n'est jamais traitée comme recette avant promotion. M08 reste owner des artifacts et de la GameSpecification ; M15 reste owner de l'orchestration et du learning.

# D10 — M08 GAME FACTORY — EXPANSION COMPORTEMENTALE
## Permanent fabrication platform
M08 is not a one-off generator. Every new game request should first search existing templates, components, runtime patterns and validated fabrication memory.
## Pipeline
DEMAND → INTENT → REQUIREMENTS → SPEC → REUSE SEARCH → TASK GRAPH → GENERATE → BUILD → TEST → DIAGNOSE → BOUNDED REPAIR → REBUILD → VALIDATE → READY_FOR_INTEGRATION.
## 2D/3D choice
2D if interaction/performance goals dominate and 3D adds no meaningful value; 3D when spatial interaction/visualization materially improves the game. The choice is evidence-driven and versioned.
## Media-to-game
An authorized image/video/music concept may become theme/mechanic inspiration. The factory stores the original source reference and derivative policy, but does not package protected source media without permission.
## Viral hooks
Every publishable game should define one social hook: challenge, score card, rematch, co-op invite, creator attribution or shareable outcome.
## Fabrication memory
Store successful architecture, component compatibility, failures and repair patterns only after validation.
## DONE
Reproducible build, sandboxing, tests, resource budget, security and publication handoff validated.

# D100K — M08 Game Factory — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M08. Scope: research→spec→task graph→build→validation→publish. Dependencies: M01,M05,M07,M09,M15. Primary invariant: M08 produces packages; M09 owns execution.
For every capability: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE TRANSITION → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
Authorization failure, invalid schema, incompatible version, ownership violation, idempotency conflict or critical dependency failure must produce zero unauthorized authoritative mutation.

## 3. AI boundary
M15 may propose or analyze only through capability contracts. M08 remains authoritative for research→spec→task graph→build→validation→publish.

## 4. Proof obligations
SUCCESS + NO-DATA + ERROR + DEGRADED/UNAVAILABLE + REFRESH/REOPEN + DESKTOP + MOBILE + PERMISSION DENIAL + RETRY/REPLAY where applicable.

## 5. Impact obligation
M08 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. UNKNOWN impact is UNRESOLVED, never assumed safe.

## 6. Formal acceptance properties
Owner authority cannot be bypassed; duplicate commands cannot duplicate authoritative mutation; stale versions cannot silently overwrite current state; projections remain rebuildable; privacy survives handoffs; VERIFIED requires applicable evidence.

## 7. Completion
This D100K section defines what must be provable. It does not claim implementation completion.



# HISTORICAL FUSION — M08 GAME FACTORY — PLAN

Les anciens contrats Game Factory/runtime sont intégrés à M08. La fabrication est un pipeline complet et versionné, pas une simple génération de code.

PLAYER IDEA → INTENT → GAME SPECIFICATION → TASK GRAPH → ENGINE SELECTION → CODE/ASSETS/AUDIO/CONTENT → BUILD → SECURITY → SIMULATION → TEST → PLAYTEST → BALANCE → PREVIEW → PUBLISH.

Chaque étape peut demander des ressources différentes et être distribuée lorsqu'elle est indépendante. Les tâches déclarent leurs dépendances, resource profile, timeout, retry/idempotency et validator.

M08 fabrique pour 2D et 3D. 3D n'est pas une capability de second rang ; le choix dépend de la GameSpecification, du device et du resource budget.

La fabrication doit rester utilisable sans provider spécifique ni Codex. Un provider/agent absent réduit une target d'exécution mais ne supprime pas les contrats ni les connaissances de fabrication.

Les réparations suivent :
DIAGNOSIS → HYPOTHESIS → PATCH → IMPACTED TESTS → BUILD → REGRESSION → BENCHMARK.

Une réparation répétant le même failure fingerprint est escaladée au lieu de boucler.



# D100K — HISTORICAL CONTRACT RESTORATION — M08 GAME FACTORY

## Restored exact fabrication contracts
`AssetRef={id,kind,ref,license:'owned'|'generated'|'open',provenance,hash}`
`GameSpecification={id,mode:'2d'|'3d',engine,scenes[],entities[],rules[],controls[],levels[],assets[],audio[],tests[]}`
`GamePackage={id,specHash,engineVersion,manifestRef,artifactRef,signature}`

Generated code is untrusted. Dependencies are allowlisted. Generated assets retain source/license/provenance metadata. Unsupported or unverifiable assets are rejected instead of silently published.

Published packages include the resources required by M09 and a runtime manifest. Playing a published package never calls the provider/agent that created it.

## D100K proof
Schema mismatch, missing dependency, malicious asset, unverifiable license, provider outage, agent output injection, build reproducibility, artifact hash/signature mismatch, 2D/3D resource overrun and publish denial until all validators pass.

