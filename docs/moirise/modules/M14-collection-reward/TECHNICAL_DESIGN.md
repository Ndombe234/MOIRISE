# M14 — COLLECTION / REWARD ECONOMY — CONCEPTION TECHNIQUE

## Ledger
RewardLedgerEntry(playerId, sourceEventId, rewardType, amount/ref, ruleVersion, idempotencyKey).
CollectionItem(playerId, itemId, source, quantity, version).
RoulettePull(playerId, configVersion, outcome, auditRef, idempotencyKey).

## Reward authority
M05 owns progression projection. M14 owns collection/economy records. Browser never supplies reward amount or rarity.

## Roulette transaction
authenticate → check daily allowance → transactionally reserve allowance → resolve using immutable config version → persist outcome/audit → event → return proof.
Duplicate command returns same pull.

## Baseline
3 pulls/day, configurable.
Common 50%; Rare 30%; Epic 13%; Legendary 5%; Mythic 2%.
Historical results keep their configuration version.

## Titles
Deterministic title grammar/version + normalized evidence can generate a design space of up to one million or more possible titles. Only actually unlocked titles are materialized per Player.

## Economy safeguards
caps, anomaly signals, duplicate protection, contribution quality checks, non-pay-to-win core, no hidden cash payout promises.

## AI
M15 may simulate economy and identify anomaly candidates. It cannot mutate production economy without M14 policy/admin path.

## Tests
daily allowance, concurrency, duplicate, config version, negative amount, collection ownership, exploit attempts, rollback.