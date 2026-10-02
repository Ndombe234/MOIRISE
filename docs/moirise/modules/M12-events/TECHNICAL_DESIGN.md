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

# D100K — M12 EVENTS — FABRICATION / EVIDENCE

Every M12 task resolves to TASK_ID → FEATURE_ID → FILE/SYMBOL → state machine → persistence authority → events → consumers → tests → browser scenarios → evidence.

Function contracts specify exact input/output, guards, state mutation, idempotency, versioning, failure/recovery and observability. Schedule and lifecycle operations must remain replay-safe.

Evidence = commit + exact check/scenario + expected + actual + environment + status. Unit tests alone do not produce VERIFIED.

Ownership firewall: M12 owns event lifecycle state; consumers use contracts/events/projections and do not write M12 private state directly.


## AI FABRICATION CONTEXT CONTRACT — ANTI-AMBIGUITY AND PROOF GATE

This document is an authoritative fabrication input for **M12-events** within its declared ownership. It must be read together with the complete paired PLAN + TECHNICAL_DESIGN, applicable transversal contracts, dependency rules, definition of done, and the current repository state before implementation.

### Controlled context
Before changing code, the agent MUST record current branch/commit; exact in-scope files/symbols; EXISTS/MISSING/TO_MODIFY/FORBIDDEN/AFFECTED_DEPENDENCY classification; direct/transitive dependencies; data/API/event/schema contracts; acceptance criteria; tests; browser/mobile checks; security/privacy constraints; and required DONE evidence. Missing details are resolved from canonical repository evidence, never invented silently.

### Understanding before fabrication
The sequence is **READ → MODEL CURRENT STATE → CHECK DEPENDENCIES → PLAN → FABRICATE → TEST → VERIFY → INTEGRATE → REGRESSION → LOCK**. Generated code, a green isolated test, or a worker handoff is not sufficient proof of integrated correctness. The coordinator verifies the actual integrated commit.

### Measurable quality target
The goal is to reduce avoidable errors by reducing what the agent must guess. Track first-pass task success, correction count, integration defects, regressions, test failures, and browser failures independently. An 80% first-pass target or 10–20% error envelope can be an engineering KPI, never a guarantee and never a reason to skip verification.

### Evidence gate
DONE requires the applicable chain: **code exists → type/build → focused tests → integration/contracts → runtime/route accessibility → desktop/mobile verification where relevant → error/reload/permissions → dependency regression → fresh evidence**. Anything not demonstrated is **UNVERIFIED**.

### Conflict rule
Conflicting documentation, repository state, or dependencies block the affected fabrication path until the coordinator resolves the authority. This section improves traceability without creating another business or AI authority.
