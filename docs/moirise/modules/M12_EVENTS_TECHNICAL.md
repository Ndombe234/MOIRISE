# M12 — EVENTS — TECHNICAL DESIGN

## Boundary
M12 owns scheduled system/community events, participation, reminders, lifecycle and event results. M11 owns community membership permissions.

## Data
`events`, `event_participants`, `event_steps`, `event_results`, `event_reminders`.

## Types
```ts
interface Event { id:string; title:string; startsAt:string; endsAt:string; status:"draft"|"scheduled"|"live"|"completed"|"cancelled"|"expired"|"archived"; creatorId:string; visibility:"public"|"community"|"private"; rulesHash:string; }
interface Participation { eventId:string; userId:string; status:"joined"|"withdrawn"|"completed"; idempotencyKey:string; }
```

## Lifecycle
Only server-authorized transitions are valid: `draft → scheduled → live → completed → archived`, with `cancelled` and `expired` terminal branches. Invalid transitions are rejected.

## Time
Store UTC timestamps. Server time decides eligibility and lifecycle. Client timezone is presentation-only. Recurring events use explicit recurrence rules and generated occurrence IDs.

## Reminders
Create idempotent reminder jobs keyed by event/user/occurrence/channel. A failed notification must not duplicate participation or event state.

## AI boundary
AI can propose event concepts, descriptions, translations and recommendations. Publication, cancellation and participation changes remain deterministic authorized actions.

## UI
Events are contextual under Communities, Home and the System panel. Do not create a permanent Events navigation door.

## Tests
timezone conversion, lifecycle transitions, duplicate participation, cancellation, expiry, recurrence, reminders, reconnect and mobile calendar behavior.

## Done gate
Event behavior is deterministic across timezones, retries and reconnects.