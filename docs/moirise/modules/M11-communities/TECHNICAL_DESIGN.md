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

# D100K — M11 Communities / Guilds — FABRICATION / CONTRACT / EVIDENCE LAYER

## 1. Task record
TASK_ID → FEATURE_ID → FILES → SYMBOLS → INPUT/OUTPUT → AUTHORITY → MUTATIONS → EVENTS → DEPENDENCIES → TESTS → BROWSER → EXPECTED → ACTUAL → EVIDENCE → STATUS.

## 2. File/function contract
Each implementation file and non-trivial symbol must specify path, owner M11, inputs/outputs, authoritative state, side effects, idempotency, concurrency/version policy, errors, telemetry and direct tests.

## 3. M11 adversarial focus
Test the module-specific invariant above, plus replay, forged references, authorization bypass, stale state, duplicate commands, race conditions, malformed upstream data, partial network failure and privacy leakage.

## 4. Evidence contract
Evidence must reference exact commit + exact command/scenario + expected + actual + environment. Old evidence never certifies a new commit.

## 5. Ownership firewall
No task owned by M11 may silently take authority from another module. Cross-module effects are use-case/event/projection handoffs.

## 6. Production lock
Tests passing without applicable browser/mobile/security/resilience/production proof leave the task non-VERIFIED.


## AI FABRICATION CONTEXT CONTRACT — ANTI-AMBIGUITY AND PROOF GATE

This document is an authoritative fabrication input for **M11-communities** within its declared ownership. It must be read together with the complete paired PLAN + TECHNICAL_DESIGN, applicable transversal contracts, dependency rules, definition of done, and the current repository state before implementation.

### Controlled context
Before changing code, the agent MUST record current branch/commit; exact in-scope files/symbols; EXISTS/MISSING/TO_MODIFY/FORBIDDEN/AFFECTED_DEPENDENCY classification; direct/transitive dependencies; data/API/event/schema contracts; acceptance criteria; tests; browser/mobile checks; security/privacy constraints; and required DONE evidence. Missing details are resolved from canonical repository evidence, never invented silently.

### Understanding before fabrication
The sequence is **READ → MODEL CURRENT STATE → CHECK DEPENDENCIES → PLAN → FABRICATE → TEST → VERIFY → INTEGRATE → REGRESSION → LOCK**. Generated code, a green isolated test, or a worker handoff is not sufficient proof of integrated correctness. The coordinator verifies the actual integrated commit.

### Measurable quality target
The goal is to reduce avoidable errors by reducing what the agent must guess. Track first-pass task success, correction count, integration defects, regressions, test failures, and browser failures independently. An 80% first-pass target or 10–20% error envelope can be an engineering KPI, never a guarantee and never a reason to skip verification.

### Evidence gate
DONE requires the applicable chain: **code exists → type/build → focused tests → integration/contracts → runtime/route accessibility → desktop/mobile verification where relevant → error/reload/permissions → dependency regression → fresh evidence**. Anything not demonstrated is **UNVERIFIED**.

### Conflict rule
Conflicting documentation, repository state, or dependencies block the affected fabrication path until the coordinator resolves the authority. This section improves traceability without creating another business or AI authority.
