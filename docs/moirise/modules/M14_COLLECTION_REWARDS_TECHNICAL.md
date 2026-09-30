# M14 — COLLECTION & REWARDS — TECHNICAL DESIGN

## Boundary
M14 owns collectibles/cards, achievements, cosmetics, titles, inventory, equipment state and reward history. M05 owns XP/progression; M13 owns adaptation.

## Data
`inventory_items`, `item_definitions`, `reward_grants`, `achievements`, `achievement_progress`, `equipped_items`, `titles`, `reward_history`.

## Types
```ts
interface Item { id:string; definitionId:string; ownerId:string; quantity:number; acquiredAt:string; }
interface RewardGrant { id:string; playerId:string; source:string; sourceId:string; itemDefinitionIds:string[]; idempotencyKey:string; }
interface EquipState { playerId:string; slot:string; itemId:string; updatedAt:string; }
```

## Integrity
Production reward definitions are versioned. Grants are server-authorized and idempotent. The client cannot mint arbitrary item IDs, quantities or rarity values.

## Acquisition
Every grant records source, source ID, rule version and timestamp. Duplicate source events must not produce duplicate grants unless the rule explicitly permits repeatable rewards.

## AI boundary
AI may recommend collections, propose cosmetic concepts or explain achievements. It cannot mint production rewards or bypass inventory validation.

## UI
Collection is contextual under Profile/SYSTEM. Titles/cosmetics can appear in profile, posts and game results. Avoid a permanent Collection navigation door.

## Economy safety
No client-controlled currency arithmetic. All transfers/grants are transactional. Negative quantities and integer overflow are rejected.

## Tests
grant idempotency, duplicate event, equip/unequip, ownership checks, quantity bounds, migration, deleted definition, concurrent grants and recovery after failed writes.

## Done gate
Inventory is authoritative, auditable and recoverable; AI/provider availability cannot corrupt rewards.