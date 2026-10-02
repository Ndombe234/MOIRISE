# M11 — COMMUNITIES / GUILDS — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. Core schemas
Community {id, ownerId, name, description, visibility, status, ruleSetVersion, createdAt, version}
Membership {communityId, playerId, role, status, joinedAt, version}
Invitation {id, communityId, inviterId, targetId, scope, expiresAt, status, tokenHash}

## 2. Create transaction
Validate fields → insert Community → insert OWNER Membership → commit → emit. Unique constraint protects owner membership. Failure of any required write rolls back the transaction.

## 3. Membership authorization
Every read/write first resolves current Membership status and role. Client-provided role/community owner values are ignored as authority.

## 4. Invitation security
Tokens are scoped, expiring and revocable. Acceptance rechecks community state, target block state and invitation status before creating membership.

## 5. Role transition
Allowed transitions are expressed by role hierarchy and explicit operations. Last-owner protection is evaluated inside the transaction to avoid race conditions.

## 6. AI proposal boundary
CommunityProposal is a separate non-authoritative entity. M15 can write the proposal through a capability, but actual Community/Membership creation always passes through M11's normal command and policy path.

## 7. Failure/recovery
Duplicate join → current membership.
Expired invite → no mutation.
Concurrent role change → optimistic conflict.
Group closed during join → reject.
Network loss after creation → commandId lookup.

## 8. Security
IDOR tests on community/member IDs; role escalation tests; private group leakage tests; token replay tests; no sensitive-attribute clustering.

## 9. Observability
communityId, commandId, membership mutation, role transition, invitation state, policy outcome. Avoid logging private community message content here; M03 owns it.

## 10. Browser tests
Public/private create, join/leave, invite accept/reject, role management, closure, mobile and desktop.

## 11. DONE
Membership and role authority exists only once, is enforced server-side, and AI-assisted discovery cannot bypass it.

## AI MODULE CONTRACT — M11

CommunityProposal = { proposalId, sourceRefs, creatorRef, nameCandidate, descriptionCandidate, topicTags, audience, policyClass, expiresAt, status }.
MembershipCommand est la seule porte de création/join/leave/role-change.
AI result = proposal/evidence; never MembershipState.
Validation = actor → community policy → block/privacy → membership version → business rule → commit → event.
Tests : role escalation denied, blocked user denied, private context excluded, stale version conflict, duplicate join idempotency, owner-safety, AI unavailable.

# D10 — M11 COMMUNITIES — CONCEPTION TECHNIQUE
## Community
`Community={communityId,ownerId,visibility,state,settingsVersion,createdAt}`.
## Membership
`Membership={communityId,playerId,role,status,version,joinedAt,leftAt?}` with unique (communityId,playerId).
## Creation transaction
validate → policy → create community → owner membership → settings → event → projection. Any failure rolls back all creation parts.
## AI proposal
AffinityProposal → policy → M11 decision → commit. No provider can insert membership.
## Invite
Invite record has inviter, target, scope, expiry, status and dedupeKey. Block/mute/privacy enforced before sending.
## Tests
concurrent create, duplicate membership, unauthorized role change, invite abuse, private community leakage, deleted creator, AI outage.

# D100 — TECHNICAL CONTRACT DETAIL
## Community
```
Community { communityId, ownerId, visibility, state, settingsVersion, version,
 createdAt, updatedAt }
```
## Membership
```
Membership { communityId, playerId, role, status, version, joinedAt, leftAt? }
```
Unique communityId/playerId. Role changes use expectedVersion and policy.
## Creation transaction
all validation → community insert → OWNER membership insert → default settings → event. On any failure, rollback transaction.
## Invite
```
CommunityInvite { inviteId, communityId, inviterRef, targetRef, scope,
 expiresAt, status, dedupeKey }
```
## AI boundary
AffinityProposal cannot write membership. M11 resolves policy and commits.
## Tests
concurrent create, duplicate membership, unauthorized role escalation, private community leak, invite replay, blocked target, AI outage, owner deletion and leave/rejoin.