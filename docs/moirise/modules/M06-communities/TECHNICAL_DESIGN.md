# M06 — Communities / Groups / Clans — CONCEPTION TECHNIQUE

## 1. Boundary and architecture
Permettre la création et la vie de communautés, groupes et clans avec adhésion, rôles, invitations, activité, gouvernance locale et intégration sociale.

~~~text
Route/UI
→ use case
→ policy
→ domain
→ repository/adapter
→ storage or job system
→ event + observability
~~~

Dependencies: M02, M04, M05, M13.

## 2. Canonical contracts

Command envelope:
~~~text
{ commandId, actorIdFromSession, requestId, idempotencyKey?, payload, schemaVersion }
~~~

Result envelope:
~~~text
{ ok, data?, error?, traceId, version? }
~~~

No client-supplied actorId or role is authoritative.

## 3. Domain entities
Community; Membership; RoleBinding; Invitation; CommunityPostReference; CommunityEventReference; Clan; JoinRequest.

Each persistent entity must specify owner key, lifecycle, uniqueness, indexes, timestamps, privacy class and delete/retention behavior.

## 4. Commands
### 1. CREATE_COMMUNITY
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED..

### 2. UPDATE_COMMUNITY
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED..

### 3. INVITE_MEMBER
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED..

### 4. ACCEPT_INVITE
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED..

### 5. REQUEST_JOIN
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED..

### 6. APPROVE_JOIN
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED..

### 7. CHANGE_MEMBER_ROLE
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED..

### 8. REMOVE_MEMBER
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED..

### 9. LEAVE_COMMUNITY
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED..

### 10. CREATE_CLAN
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED..

### 11. UPDATE_CLAN.
Input: typed payload + server actor identity.
Authorize: owner/role/policy defined by this module.
Validate: schema, size, refs, current state.
Execute: transaction or durable task according to operation cost.
Idempotency: required for replayable commands.
Output: authoritative entity projection plus traceId.
Event: appropriate event from COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED..

## 5. Queries
### 1. GET_COMMUNITY
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 2. LIST_COMMUNITIES
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 3. LIST_MEMBERS
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 4. GET_MEMBERSHIP
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 5. LIST_JOIN_REQUESTS
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

### 6. GET_COMMUNITY_ACTIVITY.
Use a bounded projection. Apply visibility before ranking/sorting. Return a stable cursor when possible. Do not leak existence of restricted records.

## 6. State machines
community DRAFT → ACTIVE → FROZEN/ARCHIVED; membership INVITED → PENDING → ACTIVE → MUTED/REMOVED; clan FORMING → ACTIVE → DISBANDED.

Transition implementation requirements:
- explicit enum;
- guard function per transition;
- side effects after successful state persistence;
- recovery state for asynchronous work;
- no client-side direct state promotion.

## 7. Storage design
Storage entities: Community; Membership; RoleBinding; Invitation; CommunityPostReference; CommunityEventReference; Clan; JoinRequest.
Required index categories:
- ownership lookup;
- current-state lookup;
- createdAt/recent lookup;
- foreign-key lookup;
- uniqueness where business-critical.

For large collections use cursor pagination and projections.

## 8. Async task design

When a command becomes an asynchronous task:
~~~text
created → queued → leased → running → validating → completed
                          ↘ failed → retryable/terminal
~~~

Lease expiry must not cause duplicate side effects. Use an idempotency key and result reference.

## 9. UI/state handling
directory; community page; member roster; invitations; moderation panel; clan panel; activity tabs.

Each action has:
IDLE → SUBMITTING/LOADING → SUCCESS | EMPTY | ERROR | UNAVAILABLE | DEGRADED.

The UI never decides whether the player is allowed to perform a privileged action.

## 10. AI integration
community description drafting, translation, discovery and moderation assistance; never grant role or membership silently.

Integration pattern:
~~~text
module request
→ M19 capability ID
→ policy/context
→ provider/local/worker route
→ result validation
→ module-specific validation
→ commit
~~~

For generated artifacts, keep provenance and version refs.

## 11. Security
role transitions server-authorized; private community membership hidden; invite tokens single-use; moderator actions audited.

Threat model:
- forged identity;
- replay;
- privilege escalation;
- cross-user read;
- data leakage;
- untrusted generated output;
- resource exhaustion.

Mitigation: server auth, RLS/policy, bounded inputs, rate limits, sandboxing, content validation and audit.

## 12. Events
Owned events: COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED.
An event contains IDs and safe metadata rather than full private payloads.

## 13. Failure matrix

| Failure | Action | Persistent result |
|---|---|---|
| invalid input | reject | none |
| unauthorized | reject | none |
| dependency timeout | retry if policy permits | queued/degraded |
| provider unavailable | fallback/degrade | no false success |
| worker lost | expire lease | requeue if idempotent |
| duplicate request | return prior proof | no duplicate side effect |
| stale version | conflict | authoritative state preserved |
| storage failure | rollback | no partial completion |

## 14. Observability

Record requestId/traceId, operation, latency, outcome, dependency result, cache behavior and error code. For media/game jobs include jobId and artifactId. Avoid raw private content.

## 15. Performance

Use progressive disclosure, bounded queries, lazy loading, worker queues for heavy work, and backpressure. Never make the entire application wait for optional AI generation.

## 16. Test plan

Unit: validators, guards, transitions, idempotency.
Integration: auth + storage + event.
Contract: AI capabilities/provider adapters when relevant.
E2E: every button, route, save/reload and recovery.
Mobile: touch, keyboard, viewport.
Resilience: retries, reconnect, dependency outage, concurrent mutation.

## 17. Implementation runbook

1. Inventory existing source that maps to this responsibility.
2. Mark code that is reusable, obsolete or conflicting.
3. Freeze the canonical types.
4. Establish server authorization.
5. Establish data migrations and constraints.
6. Implement repository adapters.
7. Implement domain transitions.
8. Implement event publication.
9. Implement UI states.
10. Add AI integration only through M19.
11. Add tests.
12. Run build/typecheck/lint.
13. Browser test desktop/mobile.
14. Verify no blank-screen path.
15. Record completion evidence.

## 18. Puzzle sheet

Owner: M06
Commands: CREATE_COMMUNITY; UPDATE_COMMUNITY; INVITE_MEMBER; ACCEPT_INVITE; REQUEST_JOIN; APPROVE_JOIN; CHANGE_MEMBER_ROLE; REMOVE_MEMBER; LEAVE_COMMUNITY; CREATE_CLAN; UPDATE_CLAN.
Queries: GET_COMMUNITY; LIST_COMMUNITIES; LIST_MEMBERS; GET_MEMBERSHIP; LIST_JOIN_REQUESTS; GET_COMMUNITY_ACTIVITY.
States: community DRAFT → ACTIVE → FROZEN/ARCHIVED; membership INVITED → PENDING → ACTIVE → MUTED/REMOVED; clan FORMING → ACTIVE → DISBANDED.
Events: COMMUNITY_CREATED; COMMUNITY_UPDATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; MEMBER_ROLE_CHANGED; CLAN_CREATED; COMMUNITY_ACTIVITY_RECORDED.
AI: community description drafting, translation, discovery and moderation assistance; never grant role or membership silently.
Critical data: communities; memberships; roles; invites; clans; moderation hooks; community settings.
Security: role transitions server-authorized; private community membership hidden; invite tokens single-use; moderator actions audited.
Acceptance: membership matrix, role permissions, invitation replay protection, leave/remove behavior, mobile admin controls.

Any unresolved field is a documentation defect, not a coding invitation to guess.