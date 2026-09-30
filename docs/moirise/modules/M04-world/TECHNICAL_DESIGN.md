# M04 — WORLD — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. Boundary
WorldRoute → M04 use-case → privacy/context policy → repositories → projection.

## 2. IntentEnvelope
```
{
  intentId,
  originModule:"M04",
  actorId:serverDerived,
  intentType,
  targetRef?,
  sourceEventRef?,
  uiContextSafe,
  createdAt,
  expiresAt?
}
```
Aucun targetRef n'est exécuté avant revalidation par le module destination.

## 3. ContextCard contract
cardId, sourceRef, actionType, reasonKey, scope, expiresAt, cooldownKey, status, createdAt.
ReasonKey est une référence à un texte localisé; il ne contient pas de donnée privée.

## 4. Handoff state
CREATED → ACCEPTED_BY_DESTINATION → COMPLETED ou REJECTED.
Le reject n'efface pas les données du destination owner et ne crée jamais un état partiel.

## 5. Cache
World cache est jetable. Clé inclut actor/scope lorsque nécessaire. Invalidation sur changement de privacy, source deletion ou feature flag.

## 6. Failure handling
Source unavailable → card suppressed.
Destination unavailable → return World with action to retry.
Session expired → auth boundary.
AI unavailable → deterministic World presentation.
Network lost after a mutation → command status lookup.

## 7. Security
No IDOR through targetRef, no private-to-public share, no trusted instruction from ContextCard text, no provider call from browser.

## 8. Browser validation
Mobile 390px class, desktop wide viewport, keyboard/focus, back navigation, deep-link, refresh, no horizontal overflow, no white screen.

## 9. Observability
requestId, intentId, cardId, sourceRef, decision state, suppression reason, errorCode; no private source payload in general logs.

## 10. DONE
World renders valid surfaces, contextual cards are explainable/suppressible, handoffs are revalidated by destination, private data stays private, and degraded dependencies never blank the shell.