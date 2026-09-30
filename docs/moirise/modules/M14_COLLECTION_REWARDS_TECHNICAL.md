# M14 — COLLECTION & REWARDS — COMPLETE TECHNICAL CONTRACT

## Responsibility
M14 owns collectibles, cards, cosmetics, achievements, inventory, equipment, titles and reward history. M05 owns XP/progression; M13 owns adaptive activation.

## Data
`inventory_items`, `item_definitions`, `reward_grants`, `achievements`, `achievement_progress`, `equipped_items`, `titles`, `reward_history`.

## Types
```ts
interface Item { id:string; definitionId:string; ownerId:string; quantity:number; acquiredAt:string; }
interface RewardGrant { id:string; playerId:string; source:string; sourceId:string; ruleVersion:number; itemDefinitionIds:string[]; idempotencyKey:string; }
interface EquipState { playerId:string; slot:string; itemId:string; updatedAt:string; }
```

## Integrity
Definitions are versioned. Production grants are server-authorized, transactional and idempotent. Client cannot mint arbitrary IDs, quantities, rarity or titles.

## Acquisition pipeline
`validated source event → eligibility → reward rule → transaction → inventory update → reward history → notification`. Duplicate source events do not duplicate rewards unless the rule explicitly permits repetition.

## Equipment
Validate ownership, definition status, slot compatibility and quantity. Equip/unequip is transactional and produces one authoritative state.

## AI boundary
AI can recommend collections, explain achievements and propose cosmetic concepts. It cannot mint production rewards or bypass inventory validation.

## Economy safety
Reject negative quantities, overflow, invalid definitions and unauthorized transfers. All arithmetic is server-side. Reward definitions cannot be changed retroactively without a migration/version.

## UI
Collection and titles appear contextually under Profile/SYSTEM, posts and game results. Do not add a permanent Collection navigation door.

## Tests
Grant idempotency; duplicate source; ownership; equip/unequip; quantity bounds; concurrent grants; deleted definition; migration; failed transaction recovery; AI outage.

## Done gate
Inventory is authoritative, auditable and recoverable and cannot be corrupted by clients or AI/provider failures.