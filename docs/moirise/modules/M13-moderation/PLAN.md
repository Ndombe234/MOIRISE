# M13 — Moderation / Trust & Safety — PLAN DE MODULE

## 1. Mission
Être l'autorité de sécurité applicative : reports, blocks, mutes, rate limits, abuse prevention, moderation decisions, appeals, escalation and audit.

## 2. Ownership
Owner de : Report; ModerationCase; Decision; PolicyRule; Block; Mute; RateLimitBucket; Appeal; SafetyAudit.
Commands : REPORT_CONTENT; BLOCK_PLAYER; UNBLOCK_PLAYER; MUTE_PLAYER; UNMUTE_PLAYER; APPLY_DECISION; ESCALATE_CASE; FILE_APPEAL; RESOLVE_APPEAL; UPDATE_POLICY_RULE.
Queries : GET_REPORT; GET_MODERATION_CASE; GET_USER_BLOCKS; CHECK_ACCESS_POLICY; GET_APPEAL; GET_RATE_LIMIT_STATE.
Events : REPORT_CREATED; MODERATION_DECISION; USER_BLOCKED; USER_UNBLOCKED; USER_MUTED; APPEAL_FILED; APPEAL_RESOLVED; SAFETY_POLICY_CHANGED.

## 3. Dependencies
M01.

## 4. Lifecycle
report OPEN → TRIAGED → DECIDED → CLOSED/ESCALATED; appeal FILED → REVIEW → RESOLVED; enforcement ACTIVE/REVOKED.

## 5. User experience
report flow; safety settings; moderation console; appeal status; audit views.
Toutes les mutations doivent afficher un état transitoire et un état de récupération. Les résultats importants doivent être persistés avant d'être présentés comme définitifs.

## 6. AI boundary
AI assists triage/classification and evidence summarization only; final policy enforcement remains M13.

## 7. Data
reports; evidence refs; decisions; policies; sanctions; appeals; rate-limit state.

## 8. Security
least privilege; evidence access controlled; audit immutable enough for investigations; protected admin surface.

## 9. Performance
queues; priority lanes; bounded evidence processing.

## 10. Failure and edge cases
Double submit; concurrent mutation; session expiry; policy change mid-operation; retry after reconnect; timezone change; dependency outage; malformed external data; deleted entity; replayed command.

## 11. Cross-module behavior
Le module publie des événements. Les voisins consomment ces événements mais ne modifient pas directement ses tables.

## 12. Acceptance
block/mute enforcement consistent across modules; report lifecycle; appeals; rate limit correctness; audit trail.

## 13. Definition of done
Behavior + authorization + persistence + events + UI states + tests + browser mobile/desktop + observability + recovery.