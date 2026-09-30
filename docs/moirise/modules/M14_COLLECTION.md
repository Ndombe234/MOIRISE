# MOIRISE Module 14 — COLLECTION / REWARD ECONOMY

## 1. Purpose

Gérer objets, cartes originales, titres, badges, récompenses, collections et raretés.

## 2. Principle

Les visuels créés pour MOIRISE doivent être originaux et respecter les règles de provenance/licence.

Aucun système ne doit dépendre d'assets de personnages ou œuvres protégés importés sans autorisation.

## 3. UI

- collection ;
- item detail ;
- progression ;
- récompense obtenue ;
- historique.

Pas de marketplace obligatoire.

## 4. MORISE

« Nouveau titre débloqué. »
« Tu as obtenu un objet. »
Elle explique les règles de rareté lorsqu'elles sont pertinentes.

## 5. Data

items
collections
player_items
reward_events
rarity_rules
provenance_records

## 6. Reward pipeline

ACTION
→ VALIDATED EVENT
→ REWARD RULE
→ REWARD GENERATED
→ PROVENANCE
→ GRANT
→ COLLECTION

## 7. AI

IMAGE_GENERATION
TEXT_GENERATION
RECOMMENDATION
PROVENANCE_ANALYSIS
MODERATION

## 8. Secrets/providers

Provider Router uniquement. Les clés observées restent dans Supabase.

## 9. Security

Un client ne peut jamais s'auto-attribuer une récompense.
Règles de récompense côté serveur.

## 10. Performance

Images lazy.
Thumbnails séparées.
Collection paginée.
Métadonnées légères.

## 11. Tests

- valid reward ;
- duplicate reward ;
- tampered claim ;
- invalid provenance ;
- unavailable image provider ;
- empty collection ;
- mobile.

## 12. Acceptance

Les récompenses sont auditables, réversibles lorsque nécessaire, et indépendantes du fonctionnement d'un provider.

## 13. Do not modify

Ne pas construire la logique de progression de Module 5 ici.


---

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



## 17. Canonical implementation runbook

1. Define immutable item definitions and versioned rarity/reward rules.
2. Bind every player-owned item to the authenticated owner ID.
3. Make every reward grant transactional and idempotent.
4. Record source event, source ID, rule version, provenance and timestamp.
5. Prevent client-side minting, quantity changes or rarity manipulation.
6. Keep equipment/title/cosmetic state separate from authoritative progression math.
7. Validate generated/third-party asset provenance before allowing collection publication.
8. Use lazy thumbnails and paginated collection reads.
9. Provide safe fallback if an image provider is unavailable; collection metadata must still work.
10. Test duplicate grants, concurrent grants, invalid definitions, deleted definitions, ownership, quantity overflow and failed writes.

### Canonical server contracts
grantReward, listInventory, equipItem, unequipItem, unlockAchievement, setTitle, getRewardHistory.

### Completion proof
Inventory and rewards remain authoritative, auditable and provider-independent.

## 20. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.