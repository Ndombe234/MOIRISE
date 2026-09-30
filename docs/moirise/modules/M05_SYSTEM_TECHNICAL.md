# M05 — SYSTEM / PROGRESSION — COMPLETE TECHNICAL CONTRACT

## Responsibility
M05 owns authoritative XP, level, rank, progression rules, SYSTEM notifications and progression-facing HUD state. M14 owns inventory/rewards.

## Data
`player_progression`, `xp_events`, `system_notifications`, `progression_rules`.

## Types
```ts
interface Progression { playerId:string; level:number; xp:number; rank:string; version:number; }
interface XPEvent { id:string; playerId:string; source:string; amount:number; idempotencyKey:string; ruleVersion:number; createdAt:string; }
interface SystemNotice { id:string; playerId:string; kind:string; priority:'low'|'normal'|'high'; readAt?:string; }
```

## Authoritative calculation
All progression mutations run through one deterministic server function using a versioned ruleset. UI never calculates authoritative XP/rank. Each source event is idempotent and auditable.

## Event pipeline
`validated source event → authorize → validate amount/source → insert XP event → recompute progression → emit SYSTEM notice → invalidate player cache`.

## SYSTEM UX
Use concise contextual HUD/panels/toasts. Group low-priority changes. Persist important notices. Do not display SYSTEM text for every trivial action. Animation is subordinate to readability and can be reduced/disabled.

## AI boundary
AI can explain progression, recommend next actions or generate cosmetic text. It cannot grant XP, change rank, alter rules or mark events as valid.

## Security
Reject negative/overflow values unless explicitly defined by the ruleset. Server transactions prevent forged XP. Rule versions are immutable after publication.

## Performance
Cache progression read models per player with explicit invalidation after writes. Batch non-critical notification creation. Avoid polling; use realtime/event delivery where supported.

## Tests
XP idempotency; concurrent events; threshold boundaries; ruleset migration; unauthorized mutation; notice grouping/read state; cache invalidation; reconnect; mobile HUD; provider outage.

## Done gate
Progression is deterministic, versioned, auditable, recoverable and works with every AI provider offline.