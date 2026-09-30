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