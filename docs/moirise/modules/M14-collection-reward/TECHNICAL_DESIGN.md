# M14 — COLLECTION / REWARD ECONOMY — CONCEPTION TECHNIQUE REPRISE À ZÉRO

## 1. Ledger schema
RewardLedgerEntry {id, playerId, sourceEventId, rewardRuleVersion, itemId?, quantity, reasonKey, createdAt, status}.
Unique: sourceEventId + rewardRuleVersion + rewardSlot where required.
Ledger is immutable after COMMITTED; corrections are compensating entries.

## 2. Roulette schema
RouletteConfig {version, pullsPerDay:3, common:0.50, rare:0.30, epic:0.13, legendary:0.05, mythic:0.02}.
RoulettePull {id, playerId, configVersion, commandId, reservedAt, outcome?, status}.
RNG result is recorded before reward grant commit. Same commandId returns same pull.

## 3. Title grammar
TitleDefinitionRule {version, grammarId, prefixSetRef, coreSetRef, suffixSetRef, constraints}. Unlock identity can be deterministic from player evidence + rule version. Only earned title rows are materialized.

## 4. Reconciliation
Read ledger → rebuild expected projections → compare counts/quantities → emit mismatch report. If mismatch affects money-like integrity, freeze only the affected grant path until corrected.

## 5. Security
No client-side grant, no model-generated outcome, no editable ledger, no negative quantity unless an explicit revocation rule exists, no direct admin mutation from Player UI.

## 6. Failure/recovery
Allowance reservation succeeds then network fails → query pull by commandId. RNG failure before outcome commit → mark FAILED and do not consume allowance. Duplicate source event → existing ledger entry.

## 7. Observability
rewardRuleVersion, sourceEventId, ledgerId, roulettePullId, rarity, quantity, validation code. Avoid raw private content.

## 8. Tests
Odds configuration, daily reset/time boundary, concurrent pulls, duplicate grants, title grammar determinism, rollback/compensation, reconciliation mismatch, mobile/desktop.

## 9. DONE
Every reward has a traceable source/rule, roulette is replay-safe, and collection state can be rebuilt from authoritative ledger data.

## AI MODULE CONTRACT — M14

EconomyAIContext = { playerCollectionProjection, validatedEntitlements, rewardDefinitionVersion, rouletteConfigVersion, boundedHistory, privacyClass }.
RewardProposal is non-authoritative.
Roulette authority = M14 configuration, selection algorithm, pull ledger, daily-limit policy.
Commit = evidence validation → entitlement → reward transaction → event → projection.
Tests : AI cannot mint/grant/roll; duplicate pull; version mismatch; invalid reward reference; replay safety; economic invariants.

# D10 — M14 COLLECTION / REWARD — CONCEPTION TECHNIQUE
## RewardGrant
`RewardGrant={grantId,playerId,rewardId,sourceEvent,reason,ledgerVersion,createdAt}` unique by sourceEvent+reward target where appropriate.
## RouletteDraw
`RouletteDraw={drawId,playerId,configVersion,seedCommit?,outcomeTier,outcomeRef,createdAt}` with server-authoritative outcome and idempotency.
## Share projection
RewardShareProjection contains rewardRef, display fields, privacy-safe metadata and M01 share token reference.
## AI boundary
Analysis proposal → M14 rules → optional config change through governed admin process. Model output can never directly write ledger.
## Audit
Every grant/draw/config version is traceable. No silent probability changes.
## Tests
double grant, replayed draw, quota edge, config version migration, forged reward claim, private collection share, provider outage.