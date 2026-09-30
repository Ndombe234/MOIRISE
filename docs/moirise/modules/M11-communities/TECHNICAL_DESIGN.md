# M11 — COMMUNITIES / GUILDS — CONCEPTION TECHNIQUE

## Domain
Community(owner, visibility, status, settingsVersion)
Membership(communityId, playerId, role, status)
Invitation(single-use token, expiry, inviter, invitee)
JoinRequest
CommunityCandidate(evidenceRefs, confidence, existingMatches, proposalState)

## Create
authenticate → validate → authorize → transaction(create community + owner membership) → event.

## Membership
invite/request → eligibility → approve → active membership.
Leave/remove are distinct operations. Owner transfer/disband is explicit.

## Roles
OWNER, ADMIN, MODERATOR, MEMBER. All server-authorized. Optimistic version check prevents stale role mutations.

## AI community formation
authorized non-sensitive signals → candidate cluster → remove sensitive features → search existing communities → confidence/diversity → abuse check → proposal → user/policy decision → create/onboard.
Private messages and sensitive attributes are excluded by default.

## Living Objects / Convergence
A stable contributor pattern around a Living Object may produce a candidate. A temporary Convergence Space never automatically becomes a persistent Guild.

## Security
RLS/policy on memberships; private community visibility protection; invite replay prevention; blocked users protected; AI cannot assign roles.

## Events
COMMUNITY_CREATED; MEMBER_INVITED; MEMBER_JOINED; MEMBER_LEFT; ROLE_CHANGED; COMMUNITY_CANDIDATE_CREATED; COMMUNITY_PROPOSAL_ACCEPTED; COMMUNITY_PROPOSAL_REJECTED.

## Tests
Role matrix; invitation replay; private community access; sensitive-data exclusion; owner transfer; archive/delete; concurrent membership; mobile admin.