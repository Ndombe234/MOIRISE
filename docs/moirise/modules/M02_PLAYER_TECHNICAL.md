# M02 — PLAYER — COMPLETE TECHNICAL CONTRACT

## Responsibility
M02 owns authenticated player identity, profile, preferences and public identity presentation. Progression arithmetic is M05; rewards/inventory are M14; social content/messages are M03.

## Data
`profiles`, `profile_preferences`, `player_settings`, `player_stats_public`.

## Canonical identity
`auth.user.id` is the immutable identity key. `handle` is unique and server-validated. `displayName` is presentation only. Never use display name as a foreign key.

## Types
```ts
interface PlayerProfile { id:string; handle:string; displayName:string; avatarRef?:string; bio:string; locale:string; createdAt:string; }
interface PlayerPreferences { locale:string; theme:'dark'; interests:string[]; privacy:'public'|'friends'|'private'; }
interface PlayerPatch { displayName?:string; bio?:string; avatarRef?:string; locale?:string; interests?:string[]; privacy?:PlayerPreferences['privacy']; }
```

## Profile lifecycle
`AUTHENTICATED → ENSURE_PROFILE → LOAD_PROFILE → READY`. Missing profile is created once through an idempotent server transaction. Deleted/disabled accounts cannot create new profile rows.

## Writes
Validate string lengths, locale membership, avatar MIME/size and privacy enum before mutation. Use optimistic UI only for reversible preferences. Identity/security changes wait for server acknowledgement.

## Privacy
Public profile fields and private settings use separate authorization policies. Blocked users cannot retrieve restricted profile data. Admin access is explicit and audited.

## AI boundary
AI may draft a bio, translate text, suggest interests or explain settings only after explicit invocation. It cannot change identity, privacy, email, roles or permissions.

## Caching
Public profile cards may use short TTL cache keyed by player ID. Private settings are user-scoped. Invalidate profile caches after authoritative writes.

## UI
Profile is one permanent door. Edit/profile settings/statistics/collection are contextual sections. Avoid separate pages for each setting.

## Failure handling
Avatar upload failure leaves previous avatar intact. Profile save conflict reloads the authoritative version. Deleted profile references render a safe fallback card.

## Tests
Handle uniqueness; self-only mutation; privacy matrix; blocked-user access; avatar validation; locale persistence; concurrent edits; deleted-account references; AI-offline operation; mobile layout.

## Done gate
A player can create and edit identity safely, another user cannot mutate it, private settings never leak, and the profile works with AI/providers completely offline.