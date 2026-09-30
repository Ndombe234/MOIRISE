# M12 — EVENTS — TECHNICAL CONTRACT

## Boundary
M12 owns scheduled community/system events, participation, reminders, state transitions and event results.

## Data
`events`, `event_participants`, `event_steps`, `event_results`.

## State machine
`draft → scheduled → live → completed → archived` plus `cancelled` and `expired`. Every transition is server-authorized.

## Types
```ts
interface Event { id:string; title:string; startsAt:string; endsAt:string; status:string; creatorId:string; visibility:string; rules:unknown; }
interface EventParticipation { eventId:string; userId:string; status:"joined"|"withdrawn"|"completed"; idempotencyKey:string; }
```

## Time
Server timestamps are authoritative. Store UTC; localize only for presentation. Device time never decides eligibility.

## AI boundary
AI can propose concepts, descriptions and recommendations through capabilities, but cannot silently publish events or change participation.

## Tests
timezone conversion, lifecycle transitions, duplicate participation, cancellation, reminders, expiry, reconnect and mobile calendar behavior.

## Done gate
Events behave deterministically across timezones and reconnects.