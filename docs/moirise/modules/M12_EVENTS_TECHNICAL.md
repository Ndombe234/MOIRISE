# M12 — EVENTS — COMPLETE TECHNICAL CONTRACT

## Responsibility
M12 owns scheduled system/community events, participation, reminders, lifecycle and event results. M11 remains authority for community membership permissions.

## Data
`events`, `event_participants`, `event_steps`, `event_results`, `event_reminders`.

## Types
```ts
interface Event { id:string; title:string; startsAt:string; endsAt:string; status:'draft'|'scheduled'|'live'|'completed'|'cancelled'|'expired'|'archived'; creatorId:string; visibility:'public'|'community'|'private'; rulesHash:string; }
interface Participation { eventId:string; userId:string; status:'joined'|'withdrawn'|'completed'; idempotencyKey:string; }
```

## Lifecycle
Only valid server transitions are accepted: `draft → scheduled → live → completed → archived`. `cancelled` and `expired` are terminal. Invalid transitions are rejected and audited.

## Time
Store UTC timestamps. Server time determines eligibility. Client timezone is presentation only. Recurring events use explicit recurrence rules and occurrence IDs.

## Participation
Join/withdraw/complete operations are idempotent. Eligibility and community membership are evaluated at operation time. Concurrent joins use transactional constraints.

## Reminders
Reminder jobs are keyed by event/user/occurrence/channel. Retries cannot duplicate participation or event state.

## AI boundary
AI can propose concepts, descriptions, translations and recommendations. Publication, cancellation, eligibility and participation changes remain deterministic authorized actions.

## UI
Events appear contextually in Home, Communities, Play and SYSTEM. No permanent Events navigation door.

## Failure states
Past event with stale client state is reconciled from server. Reminder outage does not alter event lifecycle. Cancelled events show cancellation state, not a broken page.

## Tests
Timezone conversion; lifecycle transitions; duplicate participation; cancellation; expiry; recurrence; reminders; concurrent joins; reconnect; mobile calendar; AI outage.

## Done gate
Event behavior is deterministic across timezones, retries and reconnects.