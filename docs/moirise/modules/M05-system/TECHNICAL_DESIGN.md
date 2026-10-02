# M05 — SYSTEM / PROGRESSION / EVOLUTION — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. Command contract
```
ProgressCommand {
 commandId,
 actorId: serverDerived,
 sourceEventId,
 ruleVersion,
 actionType,
 targetRef?,
 expectedVersion?
}
```

## 2. XP ledger
XPTransaction possède id, playerId, sourceEventId, ruleVersion, amount, reasonKey, createdAt.
Unique : (playerId, sourceEventId, ruleVersion).
Le ledger est la source d'autorité; ProgressionProjection est reconstruisible.

## 3. Level/rank calculation
Entrée = total XP confirmé + LevelRuleVersion.
Sortie = level, rank, thresholdRemaining.
Le calcul est pur et testable. Aucun modèle AI ne choisit le résultat.

## 4. Mission state
Mission definition immuable par version; MissionProgress contient currentState, progress values, acceptedEventRefs, version.
Progress update vérifie state + event type + payload constraints avant transaction.

## 5. Title/achievement integrity
Unlock unique par Player + DefinitionVersion. Evidence refs sont conservées. Une invalidation d'une evidence déclenche une revue/recalculation selon policy; elle ne réécrit jamais l'historique sans event correctif.

## 6. SYSTEM presentation
M05 reçoit des candidates contextuelles, puis applique : activity suppression → priority → cooldown → presentation budget.
Les candidates rejetées sont marquées suppressed avec reasonKey; elles ne sont pas repoussées immédiatement.

## 7. Errors
INVALID_SOURCE, RULE_VERSION_UNKNOWN, DUPLICATE_EVENT, PROGRESSION_CONFLICT, MISSION_NOT_ELIGIBLE, TITLE_NOT_ELIGIBLE, SURPRISE_SUPPRESSED, DEPENDENCY_UNAVAILABLE.

## 8. Recovery
Replay exact d'un event déjà consommé → résultat existant.
Network lost after XP commit → GET source transaction.
Rule version retired → résoudre migration explicite ou marquer INCONCLUSIVE.
M15 unavailable → progression core still operational.

## 9. Security
Server-side entitlement; RLS/policy; event signature/provenance; no client writes to ledger; no arbitrary reward reference from AI.

## 10. Performance
Progression calculation is small and synchronous when possible. Large Trace/history reads are paginated. Context candidates are bounded.

## 11. Browser/tests
SYSTEM deep link, refresh, mobile bottom navigation, desktop sidebar, typing suppression, mission start/progress/complete, retry after network interruption, no duplicate XP/title.

## 12. DONE
Progression is deterministic, replay-safe, explainable by source evidence and rule version, and cannot be self-awarded by client or AI.

## 13. AI MODULE CONTRACT — M05

### 13.1 Candidate schemas
MissionCandidate, TitleCandidate, SurpriseCandidate et ExplanationProposal contiennent sourceRefs, ruleCompatibility, policyClass, expiry/cooldown et reasonKey.

### 13.2 Authority sequence
AI proposal → evidence resolver → M05 eligibility calculation → transaction → authoritative event → projection.
Aucun chemin AI→ledger direct.

### 13.3 Rule versions
L'IA reçoit la ruleVersion applicable ou demande sa résolution à M05. Une version inconnue produit INCONCLUSIVE et non un guess.

### 13.4 Tests
AI cannot grant XP, duplicate source event, create illegal mission, unlock title from text-only claim, bypass activity suppression, invent future event, or alter ledger on retry.

# D10 — M05 SYSTEM — CONCEPTION TECHNIQUE
## ProgressionCommand
`ProgressionCommand={commandId,actorRef,eventRef,ruleVersion,expectedVersion}`.
## Authority
M14 owns reward ledger; M05 owns progression state and visible SYSTEM. Cross-owner awards use events/use-cases.
## Title lifecycle
PROPOSED → VALIDATED → UNLOCKED → REVOKED? with immutable audit record. One deterministic title grammar can address large title space without materializing all titles.
## SYSTEM projection
`SystemCard={cardId,type,priority,contextRef,copyKey,cta,expiresAt,dismissPolicy}`.
## Anti-spam
Deduplicate equivalent cards by semantic key + context window; do not generate repeated alerts merely to create engagement.
## Tests
duplicate event, out-of-order event, reward owner boundary, title share privacy, SYSTEM overload, AI unavailable, mobile overlay and accessibility.

# D100K — M05 System / Progression — FABRICATION / CONTRACT / EVIDENCE LAYER

## 1. Task record
Every implementation unit: TASK_ID → FEATURE_ID → FILES → SYMBOLS → INPUT/OUTPUT SCHEMA → AUTHORITY → MUTATIONS → EVENTS → DEPENDENCIES → TESTS → BROWSER → EXPECTED → EVIDENCE → STATUS.

## 2. File contract
Exact path, owner M05, exports, allowed dependencies, forbidden ownership, side effects, persistence/events, errors, tests, browser surfaces.

## 3. Function contract
Exact symbol/types, preconditions, authoritative reads/writes, idempotency, concurrency/version, errors, observability, callers, direct tests.

## 4. Adversarial verification
Forged references/results, permission bypass, replay, duplicate commands, races, stale versions, malformed AI/provider output, dependency timeout, partial network failure, privacy leakage and client-side authority bypass.

## 5. Evidence
TASK_ID → COMMIT → TEST/SCENARIO → EXPECTED → ACTUAL → ENVIRONMENT → STATUS. Evidence from older commits cannot certify newer code.

## 6. Ownership firewall
A task cannot write another module's authoritative state. It must use an allowed use-case, event or projection.

## 7. Production lock
Unit tests alone never produce VERIFIED for a user-facing capability.


## AI FABRICATION CONTEXT CONTRACT — ANTI-AMBIGUITY AND PROOF GATE

This document is an authoritative fabrication input for **M05-system** within its declared ownership. It is not a prompt substitute and it must never be interpreted in isolation. A fabrication agent MUST read the complete paired PLAN + TECHNICAL_DESIGN, the applicable transversal contracts, dependency rules, definition of done, and the current repository state before changing code.

### Controlled context before fabrication

The agent MUST establish a concrete context record containing: current branch/commit; exact in-scope files and symbols; existing behavior; missing behavior; files that may be modified; files that are forbidden; direct and transitive dependencies; relevant database/schema/event/API contracts; acceptance criteria; required tests; browser/mobile checks; security/privacy constraints; and evidence required for DONE. Ambiguity MUST be resolved from repository evidence or canonical documents. The agent MUST NOT silently invent a route, field, event, authority, provider, state, interface, or fallback because a detail was omitted from a short task description.

The repository state MUST be classified explicitly as **EXISTS**, **MISSING**, **TO_MODIFY**, **FORBIDDEN**, or **AFFECTED_DEPENDENCY**. Legacy behavior is not current authority unless the canonical documentation explicitly adopts it.

### Separation of understanding and fabrication

The required sequence is: **READ → MODEL CURRENT STATE → CHECK DEPENDENCIES → PLAN → FABRICATE → TEST → VERIFY → INTEGRATE → RECHECK REGRESSION → LOCK**. A successful code generation step is not evidence of correctness. A worker handoff is never proof of integration. The coordinator MUST inspect the integrated commit and re-run the relevant checks.

### Error-reduction contract

The objective is to minimize avoidable implementation errors by reducing what the agent must guess. Quality is measured from observed evidence rather than a guaranteed percentage. Track first-pass task success, correction count, integration defects, regressions, test failures, and browser failures separately. A target such as 80% first-pass success or a 10–20% error envelope may be used as an engineering KPI, but it is never treated as a guarantee or as permission to skip verification.

### Evidence gate

For behavior owned by this document, DONE requires the applicable chain: **code exists → type/build checks → focused tests → contract/integration tests → route/runtime accessibility → desktop/mobile browser verification where relevant → error/reload/permission cases → dependency regression check → fresh evidence recorded**. Anything not freshly demonstrated is **UNVERIFIED**, not implicitly successful.

### Conflict rule

If documentation, repository state, or dependencies disagree, the agent MUST stop the affected fabrication path, identify the conflicting authority, and escalate to the coordinator rather than selecting an undocumented interpretation. This contract strengthens traceability; it does not create a second business or AI authority.
