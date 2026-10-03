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
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M05 SYSTEM
## Owner scope
M05 turns authorized context into SYSTEM presentation/progression behavior; it does not own sensitive raw facts.
## Presentation contract
ContextPacket → SYSTEM decision → bounded presentation. The SYSTEM may say « je me souviens que tu as choisi X » only when X is an authorized real memory.
## Anti-fabrication
No fake memory, fake personalization, hidden psychological classification or fabricated anomaly.
## Continuity
SYSTEM session descriptors expire according to temporal scope. Durable titles/achievements come from authoritative ledgers, not inferred context.
## D100K tests
Memory-present/memory-absent paths; correction after personalization; no-context fallback; sensitive-memory redaction; adaptive-message rate limit; deterministic fallback without AI.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M05
## RF-M05-01 MORISE First Contact
Sequence: invitation→meaningful choice→micro-world→observable reaction→adaptive challenge→reveal→continuation. The experience remains optional/restartable and has deterministic fallback.
Acceptance: no tutorial dump, no fake anomaly, no sensitive profiling.

## RF-M05-02 Evolution Engine presentation
Inputs are validated Trace/Living World/World Memory/Player capability evidence. Output is bounded contextual change/proposal. Loop: ACTION→PERMITTED SIGNAL→EVOLUTION→CHANGE/PROPOSAL→PLAYER RESPONSE→FEEDBACK.
Tests: same input deterministic under same rule version; no random novelty without objective.

## RF-M05-03 Fun & Surprise
Rare event, mystery, system memory or visual surprise requires a real trigger and auditable state. It cannot fabricate scarcity, reward or memory.

## RF-M05-04 Hidden Possibilities / Unexplored Paths
Every hinted possibility has a resolvable condition/state or is explicitly framed as hypothetical. No fake unfinished-world claims.

## RF-M05-05 SYSTEM companion continuity
Remember only authorized memories. Surface memory with source/time and allow correction/removal. Never generate a false recollection.



# D100K — RESTORED SYSTEM TECHNICAL CONTRACTS

`Progression={playerId:string,level:number,xp:number,rank:string,version:number}`
`XPEvent={id:string,playerId:string,source:string,amount:number,idempotencyKey:string,ruleVersion:number,createdAt:string}`
`SystemNotice={id:string,playerId:string,kind:string,priority:'low'|'normal'|'high',readAt?:string}`

Canonical server methods:
`getProgression`, `recordValidatedProgressionEvent`, `listSystemNotices`, `markSystemNoticeRead`, `explainProgression`.

Authoritative progression sequence:
validated source event → authorization → amount/source validation → XP event insert → progression recomputation → SYSTEM notice → cache invalidation.

Rules are immutable/versioned. Negative/overflow/impossible sources are rejected. Idempotency protects retried events. Low-priority notices are grouped. AI remains explanatory/advisory and cannot mutate progression or validate its own source event.

D100K: threshold boundaries, concurrent grants, duplicate source event, forged amount, ruleset migration, rollback, notice grouping/read state, reconnect, provider outage and mobile HUD.

