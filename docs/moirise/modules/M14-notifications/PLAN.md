# M14 — Notifications / Engagement Context — PLAN DE MODULE

## 1. Mission
Gérer notifications et rappels avec priorité, déduplication, quiet periods, préférences et suppression contextuelle pour rester utile sans spam.

## 2. Ownership
Owner de : Notification; NotificationCandidate; DeliveryAttempt; NotificationPreference; QuietPeriod; DedupeKey; ReturnPrompt.
Commands : CREATE_CANDIDATE; EVALUATE_CANDIDATE; MARK_READ; DISMISS; UPDATE_PREFERENCE; SET_QUIET_PERIOD; CANCEL_PENDING_NOTIFICATION.
Queries : LIST_NOTIFICATIONS; GET_UNREAD_COUNT; GET_PREFERENCES; GET_QUIET_PERIOD; GET_PENDING_CONTINUATIONS.
Events : NOTIFICATION_CANDIDATE; NOTIFICATION_DELIVERED; NOTIFICATION_READ; NOTIFICATION_DISMISSED; NOTIFICATION_CANCELLED.

## 3. Dependencies
M03, M12, M16, M13.

## 4. Lifecycle
candidate CREATED → FILTERED → QUEUED → DELIVERED/DROPPED; notification UNREAD → READ/DISMISSED.

## 5. User experience
notification center; contextual SYSTEM cards; quiet-period controls; return prompts.
Toutes les mutations doivent afficher un état transitoire et un état de récupération. Les résultats importants doivent être persistés avant d'être présentés comme définitifs.

## 6. AI boundary
AI suggests content relevance only; M14 owns frequency, suppression, dedupe and delivery policy.

## 7. Data
candidates; delivery attempts; preferences; quiet periods; dedupe records.

## 8. Security
private content shown only to authorized recipient; external delivery adapters optional.

## 9. Performance
dedupe indexes; priority queues; batched delivery.

## 10. Failure and edge cases
Double submit; concurrent mutation; session expiry; policy change mid-operation; retry after reconnect; timezone change; dependency outage; malformed external data; deleted entity; replayed command.

## 11. Cross-module behavior
Le module publie des événements. Les voisins consomment ces événements mais ne modifient pas directement ses tables.

## 12. Acceptance
no duplicate floods; quiet periods honored; meaningful return prompts only from real state.

## 13. Definition of done
Behavior + authorization + persistence + events + UI states + tests + browser mobile/desktop + observability + recovery.