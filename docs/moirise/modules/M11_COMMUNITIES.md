# MOIRISE Module 11 — COMMUNITIES

## 1. Purpose

Créer les groupes, clans, communautés et espaces collectifs structurés.

## 2. Community structure

Community
→ members
→ roles
→ posts
→ events
→ games
→ moderation
→ settings

## 3. Roles

Minimum :
- owner ;
- admin ;
- moderator ;
- member.

Les permissions doivent être explicites et testées.

## 4. UI

Page communauté avec :
- identité ;
- contenu ;
- membres ;
- activités ;
- événements ;
- jeux ;
- administration selon rôle.

Mobile : sections empilées, pas de dashboard minuscule illisible.

## 5. MORISE

Peut :
- résumer une communauté ;
- proposer une activité ;
- assister un admin ;
- traduire ;
- aider à organiser.

Elle ne doit pas attribuer des rôles critiques seule.

## 6. Data

communities
community_members
community_roles
community_posts
community_settings
community_events

## 7. Events

COMMUNITY_CREATED
MEMBER_JOINED
MEMBER_LEFT
ROLE_CHANGED
COMMUNITY_EVENT_CREATED
COMMUNITY_ACTIVITY_CREATED

## 8. AI

TEXT_ASSISTANCE
TRANSLATION
MODERATION
RECOMMENDATION
EVENT_PLANNING

## 9. Security

RLS stricte par communauté.
Administration vérifiée côté serveur.

## 10. Performance

Paginer membres et contenus.
Charger l'onglet actif uniquement.

## 11. Tests

- create/join/leave ;
- roles ;
- RLS ;
- moderation ;
- mobile ;
- empty community ;
- unavailable AI.

## 12. Acceptance

Une communauté peut fonctionner entièrement sans IA.

## 13. Do not modify

Ne pas mettre ici le moteur d'événements global ni AI Lab.


---

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



## 17. Canonical implementation runbook

1. Create community, membership and role tables with explicit visibility/status fields.
2. Make every mutation role-checked on the server from the authenticated membership row.
3. Keep owner transfer as a dedicated audited transaction.
4. Separate private-community content access from public cache paths.
5. Make invites scoped, expiring and revocable.
6. Log moderation actions with actor, target, reason, timestamp and rule/version references.
7. Keep AI moderation/classification advisory unless a deterministic policy says otherwise.
8. Ensure removed/banned members lose read access immediately.
9. Scope realtime subscriptions to the visible/authorized community.
10. Test role escalation, private-community leakage, invite expiry, ban/unban, appeals, realtime reconnect and mobile layouts.

### Canonical server contracts
createCommunity, requestMembership, approveMembership, leaveCommunity, changeMemberRole, inviteMember, moderateCommunityContent, listCommunityFeed.

### Completion proof
A user cannot gain community permissions by modifying the browser, and AI outage never breaks basic community operation.

## 20. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.