# M11 — COMMUNITIES — COMPLETE TECHNICAL CONTRACT

## Responsibility
M11 owns communities/groups, membership, roles, community content, invitations and moderation configuration. M03 owns private one-to-one messaging.

## Data
`communities`, `community_members`, `community_roles`, `community_posts`, `community_moderation_events`, `community_invites`.

## Types
```ts
interface Community { id:string; name:string; description:string; visibility:'public'|'private'; ownerId:string; createdAt:string; }
interface Membership { communityId:string; userId:string; role:'owner'|'admin'|'moderator'|'member'; status:'active'|'pending'|'banned'; }
interface ModerationEvent { id:string; communityId:string; actorId:string; action:string; targetId:string; createdAt:string; }
```

## Authorization
Every read/write checks current membership and role server-side. Never accept role/owner values as authority from the client. Owner transfer is an explicit audited transaction.

## Membership lifecycle
`invite/request → pending → active → left/banned`. Invites expire. Banned users cannot rejoin until an authorized unban.

## Moderation
Report, hide, delete, mute, ban and appeal actions are auditable. Soft-delete where recovery is required. AI may classify/summarize through capabilities but cannot silently grant permissions or bypass appeals.

## Private communities
All content queries enforce membership visibility. Removed/banned members lose access immediately, including media URLs where access control permits.

## Performance
Cursor paginate posts and members. Virtualize long lists. Lazy-load media. Realtime subscriptions are scoped to the currently viewed community.

## UI
Communities is one primary door. Creation, membership, moderation, settings and community events are contextual screens. Avoid permanent buttons for each community feature.

## Tests
RLS; role escalation; join/leave; invite expiry; ban/unban; private visibility; moderation audit; appeals; realtime reconnect; concurrent membership changes; mobile layout.

## Done gate
Community permissions remain correct when the client is modified and when AI/provider services are unavailable.