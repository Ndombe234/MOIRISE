# STRATÉGIE DE TEST

## Pyramide

Unit → integration → contract → database/RLS → browser E2E → mobile viewport → resilience.

## Unit

Validators, state machines, deterministic algorithms, entitlement rules, selection rules, adapters.

## Integration

Server action + auth + database + event emission + idempotency.

## Contract

AI capabilities, provider adapters, worker task contracts, module events.

## Browser

Lancer MOIRISE, ouvrir chaque porte, déclencher chaque action visible, vérifier résultat, retour arrière, rechargement, erreur, retry et absence d'écran blanc.

## Mobile

Tester largeur mobile réelle et interactions tactiles. La navigation permanente doit rester utilisable au pouce.

## Resilience

Provider indisponible.
Worker disparu avant résultat.
Timeout.
Duplicate command.
Network reconnect.
Session expiry.
Concurrent update.
Invalid external data.
Corrupted artifact.
Unauthorized access.

## Definition of done

Aucune action critique n'est seulement testée visuellement. Toute mutation importante possède au moins un test d'autorisation, un test nominal, un test d'échec et un test d'idempotence lorsque pertinent.


# CONTEXT/MEMORY D100K TEST MATRIX
## Parsing
Progressive enrichment; corrections; pronouns; ellipsis; multilingual input; typo tolerance; ambiguity.
## State
ACTIVE/SUPERSEDED/EXPIRED/DELETED; cache invalidation; reconnect; session reset.
## Privacy
Cross-account reads; sensitive-field redaction; provider filtering; telemetry redaction; export/delete.
## AI
ContextPacket integrity; no free-text-only memory; provider injection; deterministic fallback; no hallucinated facts.
## Browser
Multi-turn UI, correction UI, deletion UI, refresh, deep-link, mobile, desktop, offline/degraded.



# D100K — LEGACY CONTRACT TEST RESTORATION

Applicable tests must cover:
- UUID/idempotency/replay invariants;
- UTC/timezone/recurrence behavior;
- RLS plus server authorization;
- role mutation and audit;
- private memory permission separation (STORE/ANALYZE/SHARE/TRAIN);
- message translation privacy and failure fallback;
- async job lifecycle, timeout, cancellation and duplicate prevention;
- provider outage and malformed output;
- media license/provenance enforcement;
- rollback of promoted/evolving behavior;
- browser/mobile evidence for user-facing flows.

Legacy tests may be used as intent/reference only. They are not fresh evidence for the canonical rebuild.



# QA AGENT / ANONYMOUS PUBLIC TEST CONTRACT

The browser QA agent must test the real MOIRISE application through three complementary modes:

1. PUBLIC_TEST — anonymous, real public UI/components, read-only or explicitly sandboxed actions, no private access and no production mutation;
2. AUTH_TEST — dedicated isolated test accounts and test data for authenticated journeys and role/permission checks;
3. ADVERSARIAL_TEST — invalid permissions, expired sessions, replay, duplicates, malformed input, network interruption, provider failure and concurrency cases.

PUBLIC_TEST is not a fake demo surface. It uses the same application components and contracts as the real product wherever practical. A dedicated test deployment is acceptable only when its state and side effects are isolated from production.

The agent must record route, actor mode, viewport, action sequence, expected/actual result, console/network failures and evidence. A successful page render is not proof of correctness.

Production protection is mandatory: automated tests must not manufacture users, likes, followers, views, scores, rewards, scarcity, popularity or other social/economic signals.

Canonical loop:
OPEN → INSPECT → ACT → OBSERVE → ASSERT → EVIDENCE → DIAGNOSE → PATCH → REBUILD → REPEAT.
