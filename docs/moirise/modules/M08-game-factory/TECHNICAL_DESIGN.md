# M08 — GAME A→Z FACTORY — CONCEPTION TECHNIQUE APPROFONDIE

## 1. Boundary
M08 owns the creator-facing A→Z pipeline. M09 owns execution runtime. M15 owns AI orchestration/resources.

## 2. GameSpecification
Required sections:
identity; genre; 2D/3D mode; engine; camera; controls; core loop; entities; scenes; rules; difficulty; win/loss; quests; rewards; assets; audio; networking; save model; share model; accessibility; performance; security; tests; publication.

## 3. Task graph
IDEA → REQUIREMENTS → SPEC → TEST PLAN → parallel generation → BUILD → STATIC CHECK → SIMULATION → BEHAVIOR TEST → PACKAGE → PREVIEW → PUBLISH.

Every task has taskId, capabilityId, dependencies, resource, validator, timeout, idempotency.

## 4. Engines
Adventure 2D; Battle 2D; Puzzle 2D.
3D is a separate approved adapter path.
The AI selects an engine according to requirements; it does not embed engine-specific code into product shell.

## 5. Generated code
Generated code is an artifact.
Checks:
dependency allowlist;
type/build;
security;
network permissions;
filesystem;
resource limits;
runtime behavior.

## 6. Assets
Asset requests include type, dimensions, style/originality profile, source policy and validator.
External source metadata/provenance remains attached.

## 7. Build
Build happens in a sandbox worker/provider environment. Production secrets are never available.

## 8. Simulation
Test start, controls, state transitions, win/lose, edge states, missing resources, mobile and degraded network where relevant.

## 9. Correction
Failed validation creates a structured failure report. A bounded correction task can modify only the candidate workspace. Re-run affected validators first, then regression suite.

## 10. Publication
Publish gate requires:
all required validators pass;
manifest exists;
package hash;
version;
privacy/content policy;
performance budget;
preview;
creator acceptance if required.

## 11. Living Object integration
A Living Object may be the game seed. Branches keep lineage. A branch converted to a game must keep contributor attribution and source refs.

## 12. Tests
Specification schema; dependency policy; build; sandbox; runtime; result integrity; save; mobile; publication authorization; rollback.

## 13. DONE
A player can go from natural language idea to a validated package without the system inventing missing state or bypassing safety.

## 14. GameSpecification schema sections
identity, genre, mode, engine, scenes, entities, controls, rules, quests, rewards, assets, audio, difficulty, win/loss, save, share, multiplayer, accessibility, performance, security, testPlan, publication.

## 15. Task idempotency
Each generation node uses projectId + nodeKey + inputHash + capabilityVersion.
If the same task is retried, it returns the prior artifact rather than duplicating files or charges.

## 16. Build isolation
Generated source is placed in an isolated workspace.
Dependency allowlist is resolved before install.
No package can read project secrets.
Network access uses an allowlist.
Build process has CPU/memory/time quotas.

## 17. Test classes
Schema;
static;
type/build;
runtime;
behavior;
security;
resource;
mobile;
save/load;
publication.

## 18. Publication rollback
Every published version remains immutable.
Rollback changes activeVersion pointer and leaves prior versions auditable.

## 19. AI autonomy
Player can request full generation, assisted steps or checkpoints.
Autonomy cannot exceed M15 A-level and project policy.

## 20. Acceptance
A game is never marked PUBLISHED from a model output alone.
