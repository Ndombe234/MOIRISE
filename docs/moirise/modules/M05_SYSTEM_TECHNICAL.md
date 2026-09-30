# M05 — SYSTEM / PROGRESSION — TECHNICAL DESIGN

## Boundary
M05 owns player progression state, XP/level/rank calculations, System notifications and progression rules. Reward inventory minting belongs to M14.

## Data
`player_progression`, `xp_events`, `system_notifications`, `progression_rules`.

## Types
```ts
interface Progression { playerId:string; level:number; xp:number; rank:string; version:number; }
interface XPEvent { id:string; playerId:string; source:string; amount:number; idempotencyKey:string; createdAt:string; }
interface SystemNotice { id:string; playerId:string; kind:string; priority:"low"|"normal"|"high"; readAt?:string; }
```

## Calculation
XP/level/rank are deterministic versioned functions. Never calculate authoritative progression from UI state. Each XP mutation is idempotent and auditable.

## SYSTEM UX
Use contextual HUD/toasts/panels with restrained animation. Do not spam SYSTEM messages for every trivial action. Critical notices persist; low-priority notices can be grouped.

## AI boundary
AI may explain progression, recommend next actions and generate cosmetic text. It cannot directly grant XP or change rank.

## Security
Server-side authorization and transaction integrity prevent forged XP events. Negative/overflow values are rejected unless explicitly defined by a versioned rule.

## Tests
XP idempotency, concurrent events, level thresholds, rule-version migration, unauthorized mutation, notification read state and mobile HUD behavior.

## Done gate
Progression is deterministic, auditable, recoverable and independent of provider/API availability.