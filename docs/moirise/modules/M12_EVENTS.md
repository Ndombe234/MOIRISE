# MOIRISE Module 12 — EVENTS

## 1. Purpose

Système d'événements individuels et collectifs : activités, défis, compétitions, événements communautaires et SYSTEM.

## 2. Event lifecycle

DRAFT → VALIDATED → SCHEDULED → ACTIVE → COMPLETED → ARCHIVED

## 3. UI

Créer/voir/rejoindre/annuler lorsque permis.
Afficher horaires, objectif, participants, récompenses et statut.

## 4. MORISE

Peut proposer :
« Votre communauté semble prête pour une activité. »

Elle ne publie pas un événement sensible sans autorisation.

## 5. Data

events
event_participants
event_rules
event_results
event_rewards

## 6. Events

EVENT_CREATED
EVENT_STARTED
EVENT_JOINED
EVENT_COMPLETED
EVENT_CANCELLED

## 7. AI

EVENT_PLANNING
TEXT_GENERATION
RECOMMENDATION
MODERATION
CREATIVE_MEDIA

## 8. Provider independence

Un événement simple doit fonctionner sans provider externe.

## 9. Security

Permissions organisateur/participant.
Validation côté serveur.
Protections contre double participation et faux résultats.

## 10. Performance

Scheduler central.
Pas de polling agressif par navigateur.

## 11. Tests

- lifecycle ;
- timezone ;
- join/leave ;
- duplicate ;
- cancelled event ;
- expired event ;
- mobile ;
- provider down.

## 12. Acceptance

Aucun événement ne peut être annoncé comme actif s'il n'existe pas dans l'état serveur.

## 13. Do not modify

Adaptive World transforme éventuellement les signaux d'événements, mais ne doit pas être implémenté ici.


---

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



## 17. Canonical implementation runbook

1. Store all event timestamps in UTC and expose localized presentation only.
2. Enforce a server-side state machine for draft, scheduled, live, completed, cancelled, expired and archived.
3. Create occurrence IDs for recurring events and use them for participation/reminder idempotency.
4. Make join/withdraw operations transactional and duplicate-safe.
5. Use scheduled jobs/queue processing rather than aggressive browser polling.
6. Generate reminders with a unique key per event/user/occurrence/channel.
7. Verify organizer permissions before publish/cancel/edit operations.
8. Keep AI event planning and copy generation advisory; publication is an explicit authorized action.
9. Test timezone boundaries, expiry, recurrence, duplicate participation, cancellation, reminder failure and reconnect.

### Canonical server contracts
createEvent, updateEventDraft, publishEvent, joinEvent, withdrawEvent, cancelEvent, completeEvent, listUpcomingEvents.

### Completion proof
No event is shown as live unless the authoritative server state says it is live.

## 20. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.