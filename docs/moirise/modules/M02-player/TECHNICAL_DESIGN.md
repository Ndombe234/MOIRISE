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