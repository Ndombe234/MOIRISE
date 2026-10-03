# M02 — PLAYER — CONCEPTION TECHNIQUE DÉTAILLÉE

## 1. Boundary
UI → server boundary → M02 use-case → policy → repository/adapter → persistence → event → projection.

## 2. Command
```
{ commandId, actorId(server-derived), capabilityId, targetRef?, expectedVersion?, payload }
```
Reject : actorId arbitraire, capability inconnue, payload hors schema, target hors scope, version périmée, commandId réutilisé avec payload différent.

## 3. Capability contracts
### M02.C1 Bootstrap
Input : actor + contexte minimal + payload validé.
Guards : auth user id présent.
Execution : lookup player → create defaults atomically if missing → return existing on retry.
Output authority : Player.
Failure policy : race = unique constraint + existing.
Security boundary : auth id serveur.

### M02.C2 Public profile
Input : actor + contexte minimal + payload validé.
Guards : player active.
Execution : load public projection → validate fields → versioned update → invalidate cache.
Output authority : PublicProfileProjection.
Failure policy : invalid field = no partial write.
Security boundary : privacy server-enforced.

### M02.C3 Private settings
Input : actor + contexte minimal + payload validé.
Guards : setting key known.
Execution : check current version → validate value → commit → emit change event.
Output authority : Preferences/PrivacySettings.
Failure policy : stale version = conflict/reload.
Security boundary : private values not public.

### M02.C4 Handle
Input : actor + contexte minimal + payload validé.
Guards : normalized format valid.
Execution : Unicode normalize → uniqueness check → atomic change.
Output authority : HandleRef.
Failure policy : taken = conflict without owner leak.
Security boundary : canonical uniqueness.

### M02.C5 Avatar
Input : actor + contexte minimal + payload validé.
Guards : file/provider result allowed.
Execution : quarantine → MIME/size/dimensions → safety → publish ref → replace.
Output authority : AvatarRef.
Failure policy : failure keeps old avatar.
Security boundary : safe storage.

### M02.C6 Memory/DNA evidence
Input : actor + contexte minimal + payload validé.
Guards : source/provenance/privacy class known.
Execution : store evidence → confidence/version → optional M15 pattern → invalidation path.
Output authority : MemoryEntry/DNAEvidence.
Failure policy : low confidence stays evidence.
Security boundary : no sensitive inference/global private chats.

## 4. State/persistence
State transition = trigger + guards + transaction + event + projection. Unique constraints sur les opérations uniques; optimistic version quand plusieurs writers. Projection/cache n'est jamais source d'autorité.

## 5. Event envelope
eventId, eventType, schemaVersion, producerModule, occurredAt, commandId?, requestId?, actorRef?, payloadRef. Event = fait déjà committé. Consumers idempotents.

## 6. Error model
VALIDATION, AUTH_REQUIRED, FORBIDDEN, NOT_FOUND, CONFLICT, RATE_LIMITED, TIMEOUT, DEPENDENCY_UNAVAILABLE, INCONCLUSIVE, INTERNAL. Aucun stack trace/secret dans UI.

## 7. Recovery
Commit puis réseau coupé → GET by commandId. Worker/provider down → fallback si capacité optionnelle. Data deleted before commit → transaction abort. Unknown event version → quarantine. Duplicate event → dedupe.

## 8. Security
IDOR prevention, server-derived actor, input/output schema, session controls, secret isolation, rate limits, privacy scope before provider routing, no privileged client bundle.

## 9. Observability
requestId, traceId, commandId, module, capability, stateBefore/After, validation outcome, duration, errorCode. Pas de contenu privé brut.

## 10. Browser/tests
Deep-link, refresh, mobile, desktop, back, keyboard, double tap, concurrent tabs, provider outage, degraded state, no white screen, production build.

## 11. Performance
Pagination/cursor, bounded payloads, async heavy work, lazy assets, cache invalidation, no AI dependency on critical boot.

## 12. DONE
Build + tests + security + recovery + observability + mobile/desktop + no duplicate authority.

## 13. AI MODULE CONTRACT — M02

### 13.1 Context projection
PlayerAIContext = { playerRef, locale, explicitPreferences, publicProfileProjection?, allowedMemoryRefs[], currentActivity?, privacyVersion, contextHash }.
Aucun secret d'authentification, token, email privé ou champ non autorisé n'est ajouté par défaut.

### 13.2 Write boundary
AIProposal → M02 validation → mutation transactionnelle → event → projection.
AIProposal n'est jamais une mutation.

### 13.3 Memory rules
Read scope doit être explicitement déclaré. Write scope doit être plus restrictif que read scope. Toute promotion de mémoire vers un scope plus large exige une policy/consentement/owner decision.

### 13.4 Tests
Cross-player read denied; private preference leakage denied; stale version conflict; duplicate profile suggestion; memory scope escalation; AI outage; deterministic personalization fallback; deletion propagation; cache invalidation.

## 14. CREATIVE MEDIA TECHNICAL INTEGRATION
The shared technical contract is `docs/moirise/CREATIVE_MEDIA_VIRALITY_TECHNICAL_DESIGN.md`.

### 14.1 Profile media
M02 stores only the authoritative profile reference and policy fields. Published social content remains owned by M03. A profile projection may reference M03 content without copying M03's publication rules.

### 14.2 Avatar/profile generation
`M02 → M15 → CREATIVE_MEDIA validator → M02 commit`.
The client never receives provider credentials and never selects a provider directly.

### 14.3 User-owned media analysis
A permitted Player media reference can be sent through the M15 media-analysis capability. The request must carry `privacyClass`, `permissionState`, `sourceOwnershipClass`, `purpose`, `retention` and `provenanceRef`.

### 14.4 Deletion
When a profile media source is deleted or its permission is revoked, dependent AI analysis caches, creative candidates and projections must be invalidated according to retention policy. Published derivatives remain only when their publication rights independently permit them.

### 14.5 Tests
Profile media privacy, unauthorized media-analysis request, revoked permission, provider outage, stale cache, deletion propagation, duplicate generation request, mobile upload, desktop upload and degraded no-AI operation.

# D10 — M02 PLAYER — CONCEPTION TECHNIQUE
## PlayerProjection
`PlayerProjection = playerRef,handle,displayName,avatarRef,bio,locale,publicCreations[],highlights[],privacyVersion`.
## Media permission classes
PLAYER_PRIVATE, PLAYER_PUBLIC, PUBLIC_CREATION, SHAREABLE_HIGHLIGHT. Provider context allowlists are derived from class.
## Avatar pipeline
upload → quarantine → inspect → safety → provenance → publish ref → transactional replace → event.
## Profile share
M02 asks M01 for ShareToken; it never signs tokens itself. Target projection contains only fields permitted by privacy.
## AI proposal
AIProposal(ProfileChange) → M02 validate → transaction → event → projection. Model/provider cannot mutate Player tables.
## Tests
private field leakage, avatar unsafe file, duplicate handle, concurrent profile edit, stale version, deletion cascade, share token revocation, deterministic fallback without AI.

# D100K — M02 Player — FABRICATION / CONTRACT / EVIDENCE LAYER

## 1. Task record
Every implementation unit owned by M02 resolves to:
TASK_ID → FEATURE_ID → FILES → SYMBOLS → INPUT_SCHEMA → OUTPUT_SCHEMA → AUTHORITATIVE_STATE → MUTATIONS → EVENTS → DEPENDENCIES → TESTS → BROWSER → EXPECTED → EVIDENCE → STATUS.

## 2. File contract
For every file:
- exact path;
- owner M02;
- exported symbols;
- allowed dependencies;
- forbidden ownership;
- side effects;
- persistence/event access;
- error contract;
- direct tests;
- affected browser surfaces.

## 3. Function contract
For every non-trivial function:
- symbol and types;
- preconditions;
- authoritative reads/writes;
- idempotency;
- concurrency/version rule;
- error behavior;
- observability fields;
- direct callers;
- direct tests.

## 4. D10K adversarial matrix
At minimum test:
forged actor/reference, authorization denial, replay, duplicate command, concurrent writers, stale version, malformed provider/AI output, dependency timeout, partial network failure, private-data leakage, and client-side bypass of authoritative state.

## 5. D100K evidence
Fresh evidence must link:
TASK_ID → COMMIT → TEST/SCENARIO → EXPECTED → ACTUAL → ENVIRONMENT → STATUS.
Older evidence cannot verify a newer commit.

## 6. Impact firewall
A task attempting to mutate a state owned outside M02 is rejected and redirected to that owner. Consumers may call contracts, consume events or read projections only.

## 7. Production lock
Unit tests passing alone never yields VERIFIED. A user-facing feature remains PARTIAL/UNVERIFIED until the applicable desktop/mobile, resilience, security and production evidence exists.

## 8. Current status semantics
PLANNED = no implementation evidence.
IMPLEMENTED = code/test evidence only.
PARTIAL = missing applicable proof.
BLOCKED = prerequisite unavailable.
INCONCLUSIVE = evidence does not prove outcome.
VERIFIED = all applicable evidence is fresh and successful.
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M02 PLAYER
## Owner scope
M02 is the authoritative owner of durable Player facts: profile fields, preferences, privacy choices and explicitly retained memory.
## Fact classes
profile.basic, profile.preference, profile.appearance.opt_in, profile.age_declared, profile.life_context and user_selected_memory. Sensitive classes require explicit consent and purpose. Exact address defaults to session/task scope.
## Required functions
observePlayerFact(), validatePlayerFact(), mergePlayerFact(), supersedePlayerFact(), deletePlayerFact(), listAuthorizedPlayerMemory().
## Merge rule
Latest explicit correction supersedes the prior fact; unrelated facts remain intact. Partial location enrichment never replaces the parent hierarchy.
## D100K tests
Country→city→street→building→unit merge; correction; deletion; visibility; consent; cross-user isolation; stale-cache invalidation; SUPERSEDED retrieval rejection.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M02
## RF-M02-01 Evolving identity
Inputs: explicit profile update + verified player capability evidence. State: proposed→validated→committed→projected. Never infer identity traits from behavior.
Events: player.identity.updated, player.preference.updated.

## RF-M02-02 Player memory / memory cards
A durable memory is created only from explicit user-selected facts or validated product events. MemoryCard fields: memoryId, ownerRef, sourceRef, title, summary, visibility, retention, createdAt, state. Exact location defaults to non-durable session context.
Tests: create/edit/delete/export, visibility, ownership, stale retrieval.

## RF-M02-03 Creator DNA
Creator DNA stores contribution evidence: meaningful creations, validated remixes, successful transformations, collaboration and reuse. It is an evidence projection, not a personality score.
Events: creator.evidence.added, creator.evidence.superseded.
Tests: duplicate evidence, deletion, attribution, no hidden scoring.

## RF-M02-04 Preferences and current appearance
Preferences may persist when selected by the player. Current appearance/tenue/coiffure are contextual by default and expire. Sensitive self-described attributes require explicit retention choice; never infer them.



# D100K — RESTORED PLAYER TECHNICAL CONTRACTS

`PlayerProfile={id:string,handle:string,displayName:string,avatarRef?:string,bio:string,locale:string,createdAt:string}`
`PlayerPreferences={locale:string,theme:'dark',interests:string[],privacy:'public'|'friends'|'private'}`
`PlayerPatch={displayName?:string,bio?:string,avatarRef?:string,locale?:string,interests?:string[],privacy?:PlayerPreferences['privacy']}`

Canonical operations:
`ensureProfile()`, `getMyProfile()`, `updateMyProfile(patch)`, `updateMyPreferences(patch)`, `removeProfileData(scope)`.
Every mutation derives userId from the authenticated server session, never from an arbitrary client-supplied owner id.

Validate string lengths, locale membership, avatar MIME/size and privacy enum before mutation. Identity/security changes await server acknowledgement. Public fields/private settings use separate policies; blocked users cannot retrieve restricted data. Audit identity/security changes.

D100K: other-user mutation denial, persistence-level privacy enum, failed-update rollback/retry, deletion scope, duplicate mutation, session expiry and mobile profile evidence.

