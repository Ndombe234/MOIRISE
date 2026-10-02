# M12 — EVENTS — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. Event schema
Event {id, ownerId, visibility, status, timezone, startAt, endAt, ruleVersion, version}
EventRegistration unique(eventId, playerId).
ContinuationRef unique(eventId, recipientId, continuationType) where applicable.

## 2. Scheduler
Use trusted server time. Transition uses compare-and-set on state/version. If two scheduler workers run simultaneously, only one commits the transition; the other reads the new state and exits.

## 3. Tournament
BracketVersion immutable after LOCKED. Match result points to an authoritative result ref. No client score becomes final merely by being displayed.

## 4. Notification contract
NotificationDelivery {eventId, recipientId, type, scheduledAt, status, dedupeKey}. Delivery failure does not modify Event state.

## 5. Failure/recovery
Scheduler down → state remains truthful; recovery job catches missed transitions. Duplicate registration → existing row. Event cancelled → future continuation invalidated. Network loss after registration → commandId lookup.

## 6. Security
Organizer permissions checked server-side. Participant privacy is minimized. Event content cannot inject arbitrary AI instructions or provider URLs.

## 7. Observability
eventId, version, transition, schedulerRef, registration count, notification outcome and error code. No unnecessary private participant data.

## 8. Browser/tests
Timezone views, register/unregister, cancelled event, scheduler retry, tournament rounds, notification quiet hours, mobile/desktop.

## 9. DONE
Future state is factual, transitions are time/version guarded, duplicate schedules are safe, and no notification fabricates an event.

## AI MODULE CONTRACT — M12

EventAIContext = { eventRef, lifecycleState, organizerPermissionProjection, participantScope, locale, scheduleWindow, approvedContentRefs }.
EventProposal = { fieldChanges, evidenceRefs, confidence, requestedAutonomy, expiresAt }.
M12 validates lifecycle, organizer authority, participant scope, version and conflicts before commit.
Event content never becomes trusted tool instruction. Tests cover unauthorized organizer mutation, participant leakage, injected provider URL, stale proposal, duplicate notification, AI outage.

# D10 — M12 EVENTS — CONCEPTION TECHNIQUE
## EventState
`Event={eventId,ownerRef,startAt,endAt,status,timezone,eligibilityVersion,visibility,version}`.
## Registration
`EventRegistration={eventId,playerId,status,registeredAt,sourceRef?}`. Unique event/player.
## Reminder
Reminder job derives from real EventState, recalculates after update/cancel, and never schedules a reminder for already completed/cancelled state.
## AI proposal
EventContentProposal contains factual fields + creative fields separately; only safe factual fields are trusted automatically.
## Results
Results are immutable facts after owner commit; recap projections may include validated media links.
## Tests
timezone boundary, duplicate registration, cancellation, reminder race, stale projection, unauthorized access, AI-generated factual hallucination.

# D100 — TECHNICAL CONTRACT DETAIL
## Event
```
Event { eventId, ownerRef, startAt, endAt, timezone, status, visibility,
 eligibilityVersion, version, createdAt, updatedAt }
```
## Registration
```
EventRegistration { eventId, playerId, status, registeredAt, sourceRef? }
```
Unique event/player. Capacity allocation uses transaction/constraint appropriate to configuration.
## Reminder job
Re-read authoritative Event before dispatch. If version/status/time changed, recompute or cancel. Dispatch command carries eventVersion.
## Proposal split
AI content proposal separates factual fields from creative copy. Factual fields require owner verification when externally sourced.
## Tests
timezone/DST edge, event edit race, cancel race, duplicate registration, stale reminder, unauthorized registration, recap with deleted media.