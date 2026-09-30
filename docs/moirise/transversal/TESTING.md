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
