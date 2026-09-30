# M02 — PLAYER — TECHNICAL CONTRACT

## Boundary
M02 owns player identity/profile state and player-facing progression metadata. Authentication remains an infrastructure dependency from M01; M02 consumes the authenticated user id.

## Data
Canonical profile fields: `user_id`, `username`, `display_name`, `avatar_ref`, `bio`, `locale`, `country`, `city`, `level`, `xp`, `rank`, `created_at`, `updated_at`.
Never store provider API keys or private messages in the profile table.

## Types
```ts
export interface PlayerProfile { userId:string; username:string; displayName:string; avatarRef?:string; bio?:string; locale:Locale; country?:string; city?:string; level:number; xp:number; rank:string; }
export interface ProgressDelta { source:string; xp:number; reason:string; idempotencyKey:string; }
```

## Services
`PlayerRepository`, `PlayerProgressService`, `PlayerProfileService`, `PlayerVisibilityService`.
All writes are server-authorized and idempotent.

## UI
Profile page is one surface, not multiple permanent navigation buttons. SYSTEM overlays can show level/rank/progress contextually. Editing profile uses a modal/sheet and optimistic UI only when rollback is possible.

## Progress rules
XP is never incremented directly from the browser. Browser sends an action id; server validates the action and records a `ProgressDelta`. Duplicate idempotency keys produce one effect.

## Privacy
Profile visibility must be explicit. Private fields are never included in public profile queries. Country/city are user-controlled display data unless verified through an explicit mechanism.

## Tests
Profile CRUD, visibility, duplicate XP events, invalid XP deltas, unauthorized edits, locale changes, mobile profile layout.

## Done gate
A new account can create/view/edit its profile, progression remains consistent after refresh, and unauthorized users cannot modify another profile.