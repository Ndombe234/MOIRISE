# M12 — EVENTS — PLAN D'IMPLÉMENTATION DÉTAILLÉ REPRIS À ZÉRO

## 0. Granularité
M12 est la seule autorité des états futurs réels : événement, inscription, calendrier, tournoi et continuation. « Reviens demain » n'est permis que si une vraie continuation est enregistrée.

## 1. Owner
M12 possède Event, EventVersion, registration, brackets/matches et ContinuationRef. Notification delivery est transversal; M12 fournit la vérité de l'état.

## 2. Create event
Owner autorisé → validate title, description, timezone, start/end, rules, visibility → créer EventVersion → état DRAFT/SCHEDULED → schedule transition.
Un événement ne devient futur qu'après commit d'un état SCHEDULED valide.

## 3. Registration
Player → open event → vérification state OPEN, eligibility, block/privacy, capacity → unique EventRegistration → event REGISTERED.
Retry avec même commandId = même registration. Event complet/fermé = état explicite, jamais faux succès.

## 4. Start/end scheduler
Trusted server time → charger EventVersion → vérifier state attendu + fenêtre temporelle → transition SCHEDULED→LIVE ou LIVE→ENDED → event.
Une relance du scheduler doit être idempotente grâce à la guard state+version.

## 5. Tournament
Freeze entrants avant bracket. Générer bracket avec rulesVersion déterministe. Chaque match reçoit participants, round, seed, state et result source.
Aucun résultat final ne vient d'un bouton client; il vient d'une source validée M06/M10 selon contrat.

## 6. Continuation
Créer ContinuationRef seulement lorsque le prochain état réel existe : targetEvent, nextStartAt, sourceRef, eligibility et dedupeKey. Sans état futur confirmé, ne rien afficher.

## 7. Notification hook
M12 signale « event started/ending/reminder eligible ». Le service de notification déduplique par event+recipient+type et respecte quiet hours/preferences. Une notification ne crée pas l'événement.

## 8. États
Event DRAFT→SCHEDULED→LIVE→ENDED/CANCELLED. Registration OPEN/CLOSED. Tournament DRAFT→LOCKED→RUNNING→COMPLETED.

## 9. Tests / DONE
Timezone, daylight change, scheduler retry, event cancellation, full capacity, duplicate registration, tournament invalid result, continuation absent, quiet hours, mobile/desktop.

## AI-INTÉGRATION M12 — CONTRAT DE COMPRÉHENSION POUR L'IA DE FABRICATION

M12 est owner du lifecycle Event, des permissions organizer/participant et de l'admission des résultats. AI peut aider à rédiger un Event, proposer un planning, localiser le texte, suggérer des participants, préparer des rappels ou résumer les résultats. Toute modification passe par M12. Le contenu d'un Event est une donnée et non une instruction de confiance : aucune URL ou instruction injectée dans le texte n'est exécutée automatiquement. Participant privacy et organizer authorization sont revalidées avant commit. Sans AI, le lifecycle Event reste fonctionnel. DONE exige tests de permission, participant privacy, schedule conflict, prompt/tool injection, duplicate reminder et recovery.

# D10 — M12 EVENTS — EXPANSION COMPORTEMENTALE
## Event types
Real scheduled events, game tournaments, community activities, creator drops and world moments when backed by real state.
## State machine
DRAFT → SCHEDULED → ACTIVE → COMPLETED/CANCELLED. Registration and eligibility are real state, never fabricated.
## Social integration
Events can be surfaced from Stories/Reels/communities and can launch games or live interactions. M12 owns schedule/eligibility/results.
## AI role
M15 may propose themes, descriptions or personalization; M12 commits event state.
## Viral loop
Upcoming event → reminder/Story/share → registration → participation → validated result → recap → future discovery.
## Anti-spam
Reminder preferences, event dedupe, time-zone correctness and cancellation propagation.
## DONE
Timezones, registration, capacity where applicable, cancellation, expired event, reminders and cross-module deep-links validated.

# D100K — M12 Events — FORMAL BEHAVIOR / PROOF LAYER

## 1. Machine-complete behavior contract
Owner: M12. Scope: future event definitions, scheduling, lifecycle. Dependencies: M05,M11,M14. Primary invariant: future state exists only when backed by authoritative event state.
Capability transition: ACTOR → TRIGGER → PRECONDITIONS → INPUTS → AUTHORITY → GUARDS → STATE → POSTCONDITIONS → EVENTS → PROJECTIONS → FAILURE → RECOVERY → EVIDENCE.

## 2. Forbidden states
No authoritative mutation on failed auth/policy/schema/version/ownership/idempotency guards or unavailable critical dependency.

## 3. AI and cross-module boundary
M15 may propose/analyze but cannot mutate M12 private authority. Consumers use defined contracts/events/projections only.

## 4. Proof obligations
Nominal, empty/no-data, error, unavailable/degraded, retry/replay, refresh/reopen, permission denial, concurrency where relevant, desktop and mobile, plus adversarial cases specific to M12.

## 5. Impact obligation
M12 → consumers → events → projections → routes/UI → AI capabilities → tests → security/resilience. Unknown impact remains UNRESOLVED.

## 6. Formal properties
Authority is unique; duplicate commands are idempotent; stale versions do not overwrite; projections remain rebuildable; privacy follows the object; VERIFIED requires fresh applicable evidence.

## 7. Completion
This section defines proof requirements, not implementation completion.


# RECOVERED EVENT / SEASON / LOW-POPULATION FUSION — 2026-10-03

## Seasons
M12 may group real activities, discoveries, challenges, secrets, collection goals and collective events into bounded seasons with explicit start/end state and retrospective output. Absence does not create hidden punishment or irreversible loss.

## Low-population World Events
Events remain useful when population is small by using solo contribution, asynchronous participation, deterministic state and validated collective accumulation. M12 must not simulate a crowd to make a low-population event look populated.

## Return-after-absence event continuation
A Player returning after absence may receive a real event consequence, updated state or missed-but-available activity when such state exists. No fabricated urgency is allowed.

## Emergence / Living Object conversion
Validated Living Object outcomes may become event candidates through the existing owner handoff. M12 owns the event state only after its normal eligibility and authorization rules are satisfied.


# D100K — HISTORICAL CONTRACT RESTORATION — M12 EVENTS

## Restored operations
`createEvent`, `updateEventDraft`, `publishEvent`, `joinEvent`, `withdrawEvent`, `cancelEvent`, `completeEvent`, `listUpcomingEvents`.

All timestamps are persisted in UTC and localized only for presentation. Recurring events use explicit recurrence rules and occurrence IDs. Reminder jobs use a unique event/user/occurrence/channel key.

`Event={id,title,startsAt,endsAt,status:'draft'|'scheduled'|'live'|'completed'|'cancelled'|'expired'|'archived',creatorId,visibility:'public'|'community'|'private',rulesHash}`
`Participation={eventId,userId,status:'joined'|'withdrawn'|'completed',idempotencyKey}`

M12 never shows an event as live without authoritative server state. AI event planning/copy is advisory; publishing is an authorized action.

## D100K proof
Timezone boundary, recurrence occurrence, duplicate join/withdraw, reminder retry, stale client state, cancellation, server outage, community membership authorization and AI outage.



# D100K — EXPLICIT EVENT SURFACE RESTORATION

Events are surfaced contextually through Home, Communities, Play and SYSTEM; there is no permanent Events navigation door. Event lifecycle behavior is deterministic across timezones, retries and reconnects. The UI reconciles stale client state from authoritative server state and does not show an event as live without server confirmation.

Recurring occurrences have explicit IDs used for participation/reminder idempotency.

