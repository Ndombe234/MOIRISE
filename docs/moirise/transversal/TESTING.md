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

