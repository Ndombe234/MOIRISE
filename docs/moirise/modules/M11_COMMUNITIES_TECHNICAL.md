# M11 — COMMUNITIES — TECHNICAL DESIGN

## Boundary
M11 owns communities/groups, membership, roles, community content and moderation configuration. Private one-to-one messaging remains M03.

## Data
`communities`, `community_members`, `community_roles`, `community_posts`, `community_moderation_events`, `community_invites`.

## Types
```ts
interface Community { id:string; name:string; description:string; visibility:"public"|"private"; ownerId:string; createdAt:string; }
interface Membership { communityId:string; userId:string; role:"owner"|"admin"|"moderator"|"member"; status:"active"|"pending"|"banned"; }
interface ModerationEvent { id:string; communityId:string; actorId:string; action:string; targetId:string; createdAt:string; }
```

## Authorization
Every mutation checks membership and role server-side. Role escalation is impossible from client-supplied role values. Owner transfer is an explicit audited operation.

## Moderation
Report, hide, delete, mute, ban and appeal actions are logged. AI may classify/summarize content through capabilities but cannot silently grant permissions or bypass appeals.

## UI
Communities is one primary door. Community creation, membership management, moderation and settings are contextual screens within it.

## Privacy
Private communities expose content only to active members. Invitations are scoped and expire. Removed/banned members lose access immediately.

## Performance
Paginate posts/members, virtualize long lists and lazy-load media. Realtime subscriptions are scoped to visible community contexts.

## Tests
RLS, role escalation, join/leave, invite expiry, ban/unban, private visibility, moderation audit, appeals, realtime reconnect and mobile layout.

## Done gate
Community permissions remain correct even when the client is modified or AI services are unavailable.