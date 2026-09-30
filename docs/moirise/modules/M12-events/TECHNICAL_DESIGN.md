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