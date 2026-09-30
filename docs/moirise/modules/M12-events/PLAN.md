# M12 — Events / Activities — PLAN DE MODULE

## 1. Mission
Créer des événements, défis, tournois, quêtes et activités temporelles réelles, avec éligibilité, états, inscription, progression et continuations persistées.

## 2. Ownership
Owner de : EventDefinition; EventInstance; EligibilityRule; Registration; Quest; Challenge; Tournament; EventState; Continuation.
Commands : CREATE_EVENT; PUBLISH_EVENT; REGISTER_EVENT; START_ACTIVITY; RECORD_PROGRESS; COMPLETE_ACTIVITY; CANCEL_EVENT; SCHEDULE_CONTINUATION.
Queries : LIST_ACTIVE_EVENTS; GET_EVENT; GET_ELIGIBILITY; GET_REGISTRATION; GET_ACTIVITY_STATE; GET_FUTURE_CONTINUATIONS.
Events : EVENT_PUBLISHED; EVENT_JOINED; EVENT_STARTED; EVENT_PROGRESS; EVENT_COMPLETED; EVENT_CANCELLED; EVENT_CONTINUATION_SCHEDULED.

## 3. Dependencies
M06, M11, M13, M14.

## 4. Lifecycle
DRAFT → SCHEDULED → ACTIVE → COMPLETED/CANCELLED; registration AVAILABLE → JOINED → WITHDRAWN; activity AVAILABLE → IN_PROGRESS → COMPLETED/FAILED.

## 5. User experience
events hub; activity detail; progress; tournament bracket; countdown only for real schedule; return cards.
Toutes les mutations doivent afficher un état transitoire et un état de récupération. Les résultats importants doivent être persistés avant d'être présentés comme définitifs.

## 6. AI boundary
AI may recommend a real event or generate activity content under M12 rules; it cannot fabricate event dates, scarcity or participation counts.

## 7. Data
event definitions; schedule; eligibility; registrations; activity state; continuation refs.

## 8. Security
eligibility server-side; organizer permissions; anti-abuse; no false event metrics.

## 9. Performance
schedule indexes; batch eligibility evaluation; bounded leaderboards.

## 10. Failure and edge cases
Double submit; concurrent mutation; session expiry; policy change mid-operation; retry after reconnect; timezone change; dependency outage; malformed external data; deleted entity; replayed command.

## 11. Cross-module behavior
Le module publie des événements. Les voisins consomment ces événements mais ne modifient pas directement ses tables.

## 12. Acceptance
only real future states can produce return prompts; schedule transitions robust to timezone changes.

## 13. Definition of done
Behavior + authorization + persistence + events + UI states + tests + browser mobile/desktop + observability + recovery.