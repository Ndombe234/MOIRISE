# M15 — Localization / Internationalization — CONCEPTION TECHNIQUE

## 1. Architecture
Fournir locales, traduction, formats, timezone, pluralisation, fallback et cache de traduction sans traduire accidentellement identifiants, handles ou noms propres.
Dependency boundary: M01.

~~~text
command/query
→ auth/policy
→ validator
→ domain state machine
→ transaction or queue
→ event
→ cache/read model
~~~

## 2. Canonical envelopes
~~~text
Command(commandId, actorIdFromSession, requestId, idempotencyKey?, schemaVersion, payload)
Query(requestId, actorIdFromSession?, cursor?, limit, filters)
Result(ok, data?, error?, traceId)
~~~

## 3. Entity implementation
LocaleDefinition; TranslationKey; SourceText; Translation; TranslationCache; TimezoneProfile; FormatPolicy.
Every persistent entity needs owner, state, timestamps, version, indexes, uniqueness and privacy.

## 4. Commands
### 1 SET_LOCALE
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 2 TRANSLATE_TEXT
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 3 CACHE_TRANSLATION
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 4 INVALIDATE_TRANSLATION
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

### 5 UPDATE_FORMAT_PREFERENCE.
Validate schema and current state.
Authorize from server session and owner/role policy.
Apply transaction or durable task.
Use idempotency key where replay is possible.
Emit canonical event only after authoritative persistence.
Return evidence of final state.

## 5. Queries
### 1 GET_LOCALES
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 2 GET_TRANSLATION
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 3 GET_FORMAT_POLICY
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 4 GET_TIMEZONE
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

### 5 GET_TRANSLATION_CACHE.
Apply access policy before projection.
Use cursor pagination for unbounded results.
Never expose restricted existence or sensitive metadata.
Cache only by declared privacy class.

## 6. State machine
locale DETECTED → SELECTED → ACTIVE; translation MISS → FETCHING → CACHED/FAILED.
Guard functions must be pure/testable. Every asynchronous state has a recovery path.

## 7. UI states
language selector; translated labels; locale-aware dates/numbers; direction support where necessary.
~~~text
IDLE → LOADING → SUCCESS
             ↘ EMPTY
             ↘ ERROR
             ↘ UNAVAILABLE
             ↘ DEGRADED
~~~

## 8. AI
translation capability may use browser/local cache or M19 provider adapter; original source text retained.
All AI calls use M19 capabilities and M13 policy. No direct provider endpoint.

## 9. Security
user content only translated when authorized; private messages retain source ownership.
Threats include replay, privilege escalation, hidden-data leakage, abuse automation and race conditions. Use server-side authorization, RLS where applicable, rate limits, immutable or append-only audit for security decisions and conflict detection.

## 10. Events
LOCALE_CHANGED; TRANSLATION_REQUESTED; TRANSLATION_CACHED; TRANSLATION_INVALIDATED.
Events contain safe identifiers and refs, not private payloads by default.

## 11. Special rules
Localization integrity:
- Source content remains canonical.
- Translation cache key = source hash + target locale + translation policy version.
- Names, handles, IDs, code, URLs and protected terms can be marked noTranslate.
- Locale fallback is deterministic and observable.

## 12. Failure matrix

| Failure | Response |
|---|---|
| validation | reject, no side effect |
| unauthorized | FORBIDDEN |
| conflict | reload and return CONFLICT |
| duplicate | return previous proof |
| dependency outage | retry/degrade |
| timeout | bounded retry |
| policy changed | re-evaluate before commit |
| session expired | AUTH_REQUIRED |

## 13. Testing
Unit: state transitions, validators, deterministic rules.
Integration: storage, RLS/policy, events.
E2E: all visible actions and mobile.
Security: unauthorized access and replay.
Resilience: outage, reconnect, concurrency.

## 14. Runbook
Types → schema → authorization → domain service → event → read model → UI states → tests → browser verification → performance → security → DONE.

## 15. Puzzle sheet
Owner=M15
Commands=SET_LOCALE; TRANSLATE_TEXT; CACHE_TRANSLATION; INVALIDATE_TRANSLATION; UPDATE_FORMAT_PREFERENCE.
Queries=GET_LOCALES; GET_TRANSLATION; GET_FORMAT_POLICY; GET_TIMEZONE; GET_TRANSLATION_CACHE.
States=locale DETECTED → SELECTED → ACTIVE; translation MISS → FETCHING → CACHED/FAILED.
Events=LOCALE_CHANGED; TRANSLATION_REQUESTED; TRANSLATION_CACHED; TRANSLATION_INVALIDATED.
Data=keys, translations, source language, target locale, versions, timestamps.
AI=translation capability may use browser/local cache or M19 provider adapter; original source text retained.
Security=user content only translated when authorized; private messages retain source ownership.
Acceptance=20+ target locales can be added; fallback deterministic; no accidental username/id translation.

The document is incomplete if an implementation agent still has to guess ownership or critical state transitions.