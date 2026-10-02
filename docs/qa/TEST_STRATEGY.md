# MOIRISE — QA TEST STRATEGY

## Purpose
Operational companion to `docs/moirise/transversal/TESTING.md`, `DEFINITION_OF_DONE.md` and `AGENT_FABRICATION_PROTOCOL.md`.

This document does not create business ownership. It defines how the existing testing contract is executed during development and release.

## Verification layers
1. Unit — pure logic, validators, state machines, deterministic algorithms.
2. Integration — server actions, auth, database, events, idempotency and owner boundaries.
3. Contract — AI, provider, worker and module event contracts.
4. Browser E2E — real user journeys and visible UI behavior.
5. Mobile — touch, viewport, keyboard, overflow, low bandwidth and responsive states.
6. Resilience — timeouts, retries, reconnection, duplicate commands, stale state and dependency failures.
7. Security — authorization, privacy leakage, replay, injection, IDOR and role boundaries.
8. Production smoke — deployed artifact, routes, auth, primary actions and critical recovery paths.

## Feature test contract
For every meaningful feature define:
- happy path;
- alternate path;
- validation failure;
- permission failure;
- loading/empty/error/unavailable/degraded states;
- retry/recovery;
- duplicate/replay behavior;
- concurrency behavior when relevant;
- mobile behavior;
- desktop behavior;
- internationalization/Unicode behavior;
- browser evidence;
- regression scope.

## Evidence rule
A test name without a successful execution result is not evidence.
A local success without deployed smoke verification is not production evidence.
A desktop success without mobile verification is not sufficient for a mobile-relevant feature.

## International QA baseline
At minimum, use test data covering:
- accented Latin text;
- Japanese/Korean/Chinese scripts when relevant;
- Arabic or another RTL sample where supported;
- emoji;
- combining characters;
- long names/handles;
- locale-specific dates/times/numbers;
- at least two contrasting timezones;
- language switching.

## Browser baseline
For interactive features, verify:
OPEN → LOAD → AUTH/SESSION → NAVIGATE → PRIMARY ACTION → SECONDARY ACTION → BACK → REFRESH → REOPEN → SUCCESS → ERROR → RECOVERY.

## Bug loop
DISCOVER → REPRODUCE → CAPTURE EVIDENCE → ROOT CAUSE → MINIMAL FIX → TARGETED TEST → BROWSER RETEST → REGRESSION → DEPLOYED SMOKE.

## Completion
Use the statuses VERIFIED, PARTIAL, BLOCKED or INCONCLUSIVE. Never convert PARTIAL/BLOCKED/INCONCLUSIVE to VERIFIED without new evidence.
