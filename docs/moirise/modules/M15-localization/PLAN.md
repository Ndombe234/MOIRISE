# M15 — Localization / Internationalization — PLAN DE MODULE

## 1. Mission
Fournir locales, traduction, formats, timezone, pluralisation, fallback et cache de traduction sans traduire accidentellement identifiants, handles ou noms propres.

## 2. Ownership
Owner de : LocaleDefinition; TranslationKey; SourceText; Translation; TranslationCache; TimezoneProfile; FormatPolicy.
Commands : SET_LOCALE; TRANSLATE_TEXT; CACHE_TRANSLATION; INVALIDATE_TRANSLATION; UPDATE_FORMAT_PREFERENCE.
Queries : GET_LOCALES; GET_TRANSLATION; GET_FORMAT_POLICY; GET_TIMEZONE; GET_TRANSLATION_CACHE.
Events : LOCALE_CHANGED; TRANSLATION_REQUESTED; TRANSLATION_CACHED; TRANSLATION_INVALIDATED.

## 3. Dependencies
M01.

## 4. Lifecycle
locale DETECTED → SELECTED → ACTIVE; translation MISS → FETCHING → CACHED/FAILED.

## 5. User experience
language selector; translated labels; locale-aware dates/numbers; direction support where necessary.
Toutes les mutations doivent afficher un état transitoire et un état de récupération. Les résultats importants doivent être persistés avant d'être présentés comme définitifs.

## 6. AI boundary
translation capability may use browser/local cache or M19 provider adapter; original source text retained.

## 7. Data
keys, translations, source language, target locale, versions, timestamps.

## 8. Security
user content only translated when authorized; private messages retain source ownership.

## 9. Performance
browser cache first; batch translation; avoid translation of stable IDs and names.

## 10. Failure and edge cases
Double submit; concurrent mutation; session expiry; policy change mid-operation; retry after reconnect; timezone change; dependency outage; malformed external data; deleted entity; replayed command.

## 11. Cross-module behavior
Le module publie des événements. Les voisins consomment ces événements mais ne modifient pas directement ses tables.

## 12. Acceptance
20+ target locales can be added; fallback deterministic; no accidental username/id translation.

## 13. Definition of done
Behavior + authorization + persistence + events + UI states + tests + browser mobile/desktop + observability + recovery.