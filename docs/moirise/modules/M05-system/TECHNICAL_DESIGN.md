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