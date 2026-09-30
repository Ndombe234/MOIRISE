# M12 — EVENTS — CONCEPTION TECHNIQUE

## Domain
EventDefinition(schedule, timezone, eligibility, sourceRef)
EventInstance(status, startsAt, endsAt, organizerId)
Registration(eventId, playerId, status)
ActivityState(progress, checkpoints)
Continuation(sourceEventId, futureType, targetAt, state)

## Lifecycle
DRAFT → SCHEDULED → ACTIVE → COMPLETED/CANCELLED.
Registration AVAILABLE → JOINED → WITHDRAWN.
Activity AVAILABLE → IN_PROGRESS → COMPLETED/FAILED.

## Scheduling
Persist canonical timestamps. Present localized time separately. Countdown only from persisted startsAt/endsAt. Timezone changes do not mutate historical event truth.

## Eligibility
Server evaluates eligibility. Sensitive eligibility rules must not be derived from inferred attributes. Re-evaluate at start for events where eligibility can change.

## Continuation
Completion can schedule a real future state. Only a persisted continuation can generate a return prompt.

## AI
AI may propose event content, personalize discovery and assist scheduling. M12 owns actual event state.

## Living Object / Emergence
A contributor can explicitly transform a Living Object into event/challenge/tournament. M15 can submit Emergence Event candidates; M12 validates schedule, eligibility and safety.

## Security
Organizer permissions; registration idempotency; no fake participant counts; no false countdowns; audit cancellations.

## Tests
Timezone, duplicate registration, late join, cancellation, progress tampering, continuation existence, mobile event view, recovery after dependency outage.