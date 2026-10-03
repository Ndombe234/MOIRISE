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

# D100K — M14 Collection / Reward — FABRICATION / EVIDENCE

Every task resolves to TASK_ID → FEATURE_ID → FILE/SYMBOL → dependency order → exact contract → authoritative state → validation → tests → browser scenarios → evidence → status.

File contracts specify exact path, owner M14, symbols, allowed authorities, forbidden writes, persistence/event side effects and direct tests. Function contracts specify types, preconditions, state access, idempotency, concurrency, errors and observability.

Adversarial proof must include replay, duplicate command, stale state, unauthorized access, malformed upstream/AI output, dependency failure and privacy leakage where applicable.

Evidence is fresh only when tied to the exact commit and exact scenario/check. Unit tests cannot alone certify a user-facing or production-sensitive feature.

Ownership firewall: M14 may consume other modules through contracts, events or projections, but may not assume their private authority.
\n\n# D100K — CONTEXT/MEMORY INTEGRATION — M14 COLLECTION/REWARD
## Owner scope
M14 owns reward/collection ledgers. Context can explain or select an eligible experience, never mint rewards.
## Integrity
Reward eligibility must reference authoritative Player/Play/Event evidence. AI context is advisory.
## D100K tests
Duplicate grant, context-only reward attempt, rollback, ledger reconciliation, deleted profile, stale eligibility, provider outage.\n

# D100K — RECOVERED FEATURE FABRICATION BINDING — M14
## RF-M14-01 Experience Economy
Value events derive from real contribution, completion, replay, collaboration or validated reuse. No raw-time reward by itself.
## RF-M14-02 Creator Economy eligibility
Eligibility stages are configurable, auditable and independent from AI preference. Stage changes require measurable evidence and anti-manipulation checks.
## RF-M14-03 Transparent rarity/collection
Rarity tables are versioned and deterministic/auditable. No hidden odds changes or fake scarcity.
## RF-M14-04 Creator value bridge
Contribution chains resolve from source → transformation → reuse → audience participation. Rewards are ledger entries, never AI text.
## RF-M14-05 Reward safety
All grants require an authoritative source event and are idempotent/reconcilable.



# D100K — RESTORED COLLECTION/REWARD TECHNICAL CONTRACTS

`Item={id,definitionId,ownerId,quantity,acquiredAt}`
`EquipState={playerId,slot,itemId,updatedAt}`
`RewardGrant={id,playerId,source,sourceId,ruleVersion,itemDefinitionIds[],idempotencyKey}`

Item definitions and rarity/reward rules are immutable/versioned. Reward transactions carry source/provenance/rule-version evidence. Client cannot mint items, change quantity or manipulate rarity. Canonical reward sequence:
validated source → eligibility → rule → transaction → inventory → history → notification.

D100K: duplicate grant, client mint attempt, quantity/rarity manipulation, stale rule, transaction rollback, provider outage and notification failure.



# D100K — RESTORED RARE OBJECT TECHNICAL CONTRACT

Rare-object status is derived only from authoritative immutable definitions and reward rules. Public collection cards contain verified ownership/acquisition data only.

D100K: rarity spoofing, client mint, stale definition, duplicate grant, provider outage and source-event deletion.



# D100K — EXPLICIT COLLECTION RULE RESTORATION

Collection item definitions and rarity/reward rules are immutable/versioned. Source event, source ID, rule version, provenance and timestamp are mandatory reward evidence. Provider imagery is non-authoritative and has deterministic/degraded fallback.

D100K: client mint prevention, rarity tampering, duplicate reward, provider outage and source-event revocation.

