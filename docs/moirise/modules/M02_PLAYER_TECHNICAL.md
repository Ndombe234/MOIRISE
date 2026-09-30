# M02 — PLAYER — TECHNICAL DESIGN

## Boundary
M02 owns player identity, profile, preferences, progression-facing identity fields and account settings. It does not own posts, private messages, communities or reward minting.

## Data
`profiles`, `profile_preferences`, `player_settings`, `player_stats_public`.

## Types
```ts
interface PlayerProfile { id:string; handle:string; displayName:string; avatarRef?:string; bio:string; locale:string; createdAt:string; }
interface PlayerPreferences { locale:string; theme:"dark"; interests:string[]; privacy:"public"|"friends"|"private"; }
```

## Identity rules
The authenticated user ID is the immutable identity key. Handle uniqueness is server-enforced. Display name is mutable. Never use display name as a database foreign key.

## UI
Profile is one primary door. Edit profile, preferences, inventory/collection and player statistics are contextual sections. Do not create duplicate profile pages for each setting.

## Security
RLS/server authorization controls read/write scope. A user may edit only their own private profile fields. Public profile fields have explicit visibility rules. Admin operations are separate.

## AI boundary
AI may assist with bio drafting, translation, profile suggestions or personalization through typed capabilities. It cannot silently change identity, privacy or account permissions.

## Caching
Public profile cards may be cached briefly by ID. Private settings are user-scoped and never shared across accounts.

## Performance
Optimistic UI only for non-sensitive preferences. Profile image upload is asynchronous and uses bounded size/type checks.

## Tests
handle uniqueness, authorization, privacy visibility, profile update rollback, locale persistence, avatar failure, deleted account references and mobile profile layout.

## Done gate
A new user can create/modify their identity safely; another user cannot mutate it; profile remains usable without AI.