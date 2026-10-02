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

## 13. AI MODULE CONTRACT — M04

### 13.1 ContextCard proposal
AIContextCardProposal = { actionType, targetRef?, sourceEventRef, reasonKeyCandidate, relevance, expiresAt?, cooldownKey, evidenceRefs[] }.
M04 vérifie toutes les références avant exposition.

### 13.2 IntentEnvelope
originModule, actorRef(server), intentType, targetRef?, sourceEventRef?, uiContextSafe, createdAt, expiresAt.
Aucun targetRef n'est exécuté sans revalidation.

### 13.3 AI output rules
Provider output est candidat. M04 l'accepte, le dégrade ou le supprime. L'IA ne peut pas augmenter la fréquence au-delà de presentation budget/cooldown.

### 13.4 Tests
private signal not public, card suppression during typing, expired source, target forbidden, provider down, deterministic fallback, repeated suggestions bounded, no invented future event.

# D10 — M04 WORLD — CONCEPTION TECHNIQUE
## WorldProjection
`WorldObject = objectRef,type,visibility,safetyState,sourceOwner,projectionVersion,expiresAt,actions[]`.
## Ingestion
Owner event → policy/visibility filter → projection builder → versioned WorldObject. M04 never copies mutable owner state as authority.
## Handoff
Action target contains ownerModule + capabilityId + targetRef + expectedVersion?. Client calls M01/M15/M03/etc through normal boundaries.
## Cache
World projections are safe-to-cache only with source version and revocation timestamp. Source deletion invalidates projection.
## Adaptive input
M13 outputs proposal/signal; M04 validates and projects. No direct world mutation from model output.
## Tests
source deletion, privacy change, blocked creator, stale projection, adaptive provider outage, deep-link, mobile navigation.

# D100K — M04 World — FABRICATION / CONTRACT / EVIDENCE LAYER

## 1. Task record
Every implementation unit owned by M04 resolves to:
TASK_ID → FEATURE_ID → FILES → SYMBOLS → INPUT_SCHEMA → OUTPUT_SCHEMA → AUTHORITATIVE_STATE → MUTATIONS → EVENTS → DEPENDENCIES → TESTS → BROWSER → EXPECTED → EVIDENCE → STATUS.

## 2. File contract
For every file:
- exact path;
- owner M04;
- exported symbols;
- allowed dependencies;
- forbidden ownership;
- side effects;
- persistence/event access;
- error contract;
- direct tests;
- affected browser surfaces.

## 3. Function contract
For every non-trivial function:
- symbol and types;
- preconditions;
- authoritative reads/writes;
- idempotency;
- concurrency/version rule;
- error behavior;
- observability fields;
- direct callers;
- direct tests.

## 4. D10K adversarial matrix
At minimum test:
forged actor/reference, authorization denial, replay, duplicate command, concurrent writers, stale version, malformed provider/AI output, dependency timeout, partial network failure, private-data leakage, and client-side bypass of authoritative state.

## 5. D100K evidence
Fresh evidence must link:
TASK_ID → COMMIT → TEST/SCENARIO → EXPECTED → ACTUAL → ENVIRONMENT → STATUS.
Older evidence cannot verify a newer commit.

## 6. Impact firewall
A task attempting to mutate a state owned outside M04 is rejected and redirected to that owner. Consumers may call contracts, consume events or read projections only.

## 7. Production lock
Unit tests passing alone never yields VERIFIED. A user-facing feature remains PARTIAL/UNVERIFIED until the applicable desktop/mobile, resilience, security and production evidence exists.

## 8. Current status semantics
PLANNED = no implementation evidence.
IMPLEMENTED = code/test evidence only.
PARTIAL = missing applicable proof.
BLOCKED = prerequisite unavailable.
INCONCLUSIVE = evidence does not prove outcome.
VERIFIED = all applicable evidence is fresh and successful.
