# M03 — SOCIAL + PRIVATE MESSAGING — CONCEPTION TECHNIQUE DÉTAILLÉE

## 1. Boundary
UI → server boundary → M03 use-case → policy → repository/adapter → persistence → event → projection.

## 2. Command
```
{ commandId, actorId(server-derived), capabilityId, targetRef?, expectedVersion?, payload }
```
Reject : actorId arbitraire, capability inconnue, payload hors schema, target hors scope, version périmée, commandId réutilisé avec payload différent.

## 3. Capability contracts
### M03.C1 Post
Input : actor + contexte minimal + payload validé.
Guards : content and visibility valid.
Execution : validate → moderation hook → persist → event → feed projection.
Output authority : Post.
Failure policy : failure leaves draft; no phantom post.
Security boundary : visibility/block enforced.

### M03.C2 Comment/reaction
Input : actor + contexte minimal + payload validé.
Guards : target visible and active.
Execution : authorize target → validate state → idempotent mutation → projection.
Output authority : Comment/Reaction.
Failure policy : deleted target = safe unavailable.
Security boundary : no cross-scope access.

### M03.C3 Follow
Input : actor + contexte minimal + payload validé.
Guards : target policy permits.
Execution : check block/privacy/self → unique relation → event.
Output authority : Follow.
Failure policy : duplicate = prior state.
Security boundary : block dominates ranking.

### M03.C4 Conversation
Input : actor + contexte minimal + payload validé.
Guards : participant policy passes.
Execution : resolve/create conversation → membership → bounded history.
Output authority : Conversation/Participant.
Failure policy : invalid membership = no partial create.
Security boundary : member-scoped access.

### M03.C5 Message
Input : actor + contexte minimal + payload validé.
Guards : membership + payload + attachments valid.
Execution : validate → idempotency → persist → delivery/read receipt separately.
Output authority : Message.
Failure policy : retry returns same result; failed upload blocks send.
Security boundary : private content absent general telemetry.

### M03.C6 Translation
Input : actor + contexte minimal + payload validé.
Guards : source accessible, locale supported.
Execution : mask handles/URLs/IDs/code → local/cache → provider if necessary → show translated view.
Output authority : TranslationCache/View.
Failure policy : provider down leaves source intact.
Security boundary : source canonical.

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

## 13. AI MODULE CONTRACT — M03

### 13.1 Context classes
SOCIAL_PUBLIC, SOCIAL_PRIVATE, DM_PRIVATE, SHARE_PUBLIC_CANDIDATE, MODERATION_RESTRICTED.
Chaque classe possède un allowlist de champs.

### 13.2 Translation contract
Input = sourceText + sourceLocale + targetLocale + protectedRanges[] + privacyClass.
Output = translatedText + preservedRanges + modelEvidence + validationStatus.
Handles, URLs, IDs, code et termes protégés restent inchangés.

### 13.3 Moderation contract
AI output = candidate labels/evidence, pas décision de mutation automatique si la policy exige une revue. M03 applique la décision selon son owner policy.

### 13.4 Tests
DM not leaked to public context, private prompt injection blocked, translation preserves protected ranges, provider failure keeps source, duplicate translation idempotent, revoked share token invalidated, moderation output INCONCLUSIVE handled safely.

## 14. CREATIVE MEDIA TECHNICAL INTEGRATION
Canonical cross-module design = `docs/moirise/CREATIVE_MEDIA_VIRALITY_TECHNICAL_DESIGN.md`.

### 14.1 Media upload
`client → signed upload → quarantine → file validation → safety/originality state → M03 commit → event → projection`.
The original asset is canonical; thumbnails, streaming renditions and AI-analysis representations are derivatives.

### 14.2 Reel contract
`Reel = { id, ownerRef, mediaRef, captionRef, audioRef?, visibility, remixPolicy, attributionRef, rankingSignalsVersion, status }`.
M03 validates publication; M07 ranks it.

### 14.3 Story contract
`Story = { id, ownerRef, itemRefs[], audiencePolicy, expiresAt, archivePolicy, replyPolicy, provenanceRefs[], status }`.
Expiration is authoritative server state, not a client timer.

### 14.4 Repost/remix contract
Repost stores source reference + actor + optional note. Remix stores sourceRef + permission + transformationType + newAssetRef + attribution. No ownership duplication.

### 14.5 User media AI contract
M03 sends `MediaAnalysisRequest` only when permission allows. M15 creates semantic features/creative brief. The generator must not receive an instruction to copy a third-party expressive work. `originalityStatus` can be VALID, INCONCLUSIVE or REJECTED.

### 14.6 Viral share opportunity
`ShareOpportunity` is emitted only after a meaningful event and includes sourceEventRef, recipient candidates, reasonKey, cooldownKey, expiry and privacyClass. The UI renders only a small contextually relevant action.

### 14.7 Failure modes
Provider down → source media and normal social publishing remain available. Transcoding failure → retry/degraded preview. Originality inconclusive → no automatic public publish. Permission revoked → invalidate dependent private AI candidates. Recipient loses access → shared projection returns unavailable.

### 14.8 Test matrix
Upload, duplicate upload, invalid MIME, large file, corrupt media, Story expiry, Reel playback, share, DM share, group share, repost attribution, remix authorization, private-media leakage, provider outage, originality inconclusive, mobile and desktop.

# D10 — M03 SOCIAL — CONCEPTION TECHNIQUE
## Core schemas
Post/Photo/Reel/Story/Share/Remix all carry ownerId, visibilityClass, privacyClass, lifecycleState, moderationState, version, timestamps and provenanceRef.
## Story state machine
DRAFT → VALIDATED → PUBLISHED → ACTIVE → EXPIRED → ARCHIVED/DELETED. Cache must check lifecycle state before projection.
## Reel state machine
DRAFT → UPLOADING → SCANNING → READY → PUBLISHED → RANKING_ELIGIBLE → REMOVED/EXPIRED.
## Remix contract
`Remix = sourceRef[],transformRef,creatorContribution,provenanceRef,originalityStatus`. OriginalityStatus controls discovery eligibility.
## Social ranking input
M03 emits bounded events; M07 owns ranking. M03 never mutates ranking scores directly.
## AI media call
M03 sends MediaRef/inputRefs/privacyClass/capability to M15. M15 returns artifactRef/analysisRef/validationStatus. M03 commits publication only after owner validation.
## DM privacy
DM bodies are never general analytics memory; only bounded operational metadata may be logged.
## Tests
story expiration, reel removal cache invalidation, repost provenance, remix originality failure, private share denial, DM context leakage, upload resume, provider outage.

# D100K — M03 Social — FABRICATION / CONTRACT / EVIDENCE LAYER

## 1. Task record
Every implementation unit owned by M03 resolves to:
TASK_ID → FEATURE_ID → FILES → SYMBOLS → INPUT_SCHEMA → OUTPUT_SCHEMA → AUTHORITATIVE_STATE → MUTATIONS → EVENTS → DEPENDENCIES → TESTS → BROWSER → EXPECTED → EVIDENCE → STATUS.

## 2. File contract
For every file:
- exact path;
- owner M03;
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
A task attempting to mutate a state owned outside M03 is rejected and redirected to that owner. Consumers may call contracts, consume events or read projections only.

## 7. Production lock
Unit tests passing alone never yields VERIFIED. A user-facing feature remains PARTIAL/UNVERIFIED until the applicable desktop/mobile, resilience, security and production evidence exists.

## 8. Current status semantics
PLANNED = no implementation evidence.
IMPLEMENTED = code/test evidence only.
PARTIAL = missing applicable proof.
BLOCKED = prerequisite unavailable.
INCONCLUSIVE = evidence does not prove outcome.
VERIFIED = all applicable evidence is fresh and successful.
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M03 SOCIAL
## Owner scope
M03 owns conversation context and the social surface, but not the durable Player memory store.
## Message pipeline
message.persist → context.extract proposal → privacy/policy gate → optional durable-memory request → M02 owner commit → context.fact.* event.
## Conversation references
Support « celui-là », « ma dernière création », « chez moi », « le groupe précédent » by resolving against the active conversation/session frame.
## Privacy
DM context is private by default. No DM memory may enter feed ranking, group recommendations or provider prompts without an authorized purpose.
## D100K tests
Multi-turn enrichment; pronoun resolution; multilingual turns; deletion; blocked user; message retry; private/public boundary; attachment-derived claims never treated as explicit user facts.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M03
## RF-M03-01 MORISE Moment
Candidate source: real committed Player/Play/World/Event state. Create Moment only after source validation. Schema: momentId, sourceRef, artifactRef, provenance, visibility, lineage, replayRef?, state.
State: CANDIDATE→VALIDATED→PUBLISHED/PRIVATE→ARCHIVED/DELETED.
No fabricated rarity/popularity.

## RF-M03-02 Relay
Input: validated Moment. Receiver may apply one permitted modification. Store parentMomentId + transformationType + contributorRefs + resulting state. Every branch remains attributable.
Events: relay.started, relay.committed, relay.failed.
Tests: one-modification rule, provenance, privacy, replay, deletion.

## RF-M03-03 Living Stories
Build narrative only from validated Moment/Relay/event lineage. Every chapter records source events, transformation, branch, contributors and version. No synthetic event is presented as historical fact.
Tests: lineage integrity, branch merge, contributor removal, recap regeneration.

## RF-M03-04 Leave Something / Remix-me / collaborative media
A contribution may be puzzle/object/message/sound/visual/scene/micro-story/rule. Publication contract requires owner, visibility and lineage. Collaborative media stores contributor chain and rights state.



# D100K — RESTORED SOCIAL TECHNICAL CONTRACTS

`Post={id:string,authorId:string,body:string,visibility:'public'|'followers'|'private',createdAt:string}`
`Conversation={id:string,memberIds:string[],updatedAt:string,lastMessageId?:string}`
`Message={id:string,conversationId:string,senderId:string,body:string,createdAt:string,clientNonce:string,status:'pending'|'sent'|'failed'}`

Operations:
`createPost, editPost, deletePost, addComment, toggleReaction, followPlayer, createConversation, sendMessage, markMessageRead, getConversationPage`.
Retryable mutations require idempotency. Realtime subscriptions are scope-filtered to authorized conversations/visible social contexts. Conversations are paginated and never globally preloaded.

Before each social mutation/send, server evaluates current block/report policy. Blocked relationships override client UI. Moderation deletion/rewriting requires explicit policy and audit path.

D100K: offline send/retry/reconnect, duplicate clientNonce, message ordering, RLS/privacy, block/report, unauthorized realtime subscription, edit/delete authorization, mobile keyboard and public/private projection separation.



# D100K — PRIVATE TRANSLATION TECHNICAL CONTRACT

Private message flow:
`message → member/privacy authorization → target locale → cache lookup → browser/local translation → authorized fallback → render`.

The original message remains canonical and in its original language. Translation is a derived projection. A translation outage never blocks the original message. Translation permission follows the conversation privacy boundary.

D100K: unauthorized translation read, provider leak, cache cross-user contamination, source deletion, locale mismatch and offline fallback.

