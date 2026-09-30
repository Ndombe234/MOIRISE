# M11 — COMMUNITIES — TECHNICAL CONTRACT

## Boundary
M11 owns communities/groups, membership, roles, community posts and moderation settings. Private one-to-one messaging remains M03.

## Data
`communities`, `community_members`, `community_roles`, `community_posts`, `community_moderation_events`.

## Roles
`owner`, `admin`, `moderator`, `member`. Every mutation checks membership and role server-side.

## Types
```ts
interface Community { id:string; name:string; description:string; visibility:"public"|"private"; ownerId:string; }
interface Membership { communityId:string; userId:string; role:"owner"|"admin"|"moderator"|"member"; status:"active"|"pending"|"banned"; }
```

## UI
Communities is one primary door. Creation, membership and moderation are contextual within it. Avoid duplicate community management screens.

## Moderation
Actions are logged. AI can assist classification/summarization only through capabilities; final permission-changing actions remain server-authorized.

## Tests
membership RLS, role escalation prevention, join/leave, invite, ban/unban, moderation audit, private community visibility and mobile layout.

## Done gate
Membership and permissions remain correct when the client is modified or AI services are unavailable.