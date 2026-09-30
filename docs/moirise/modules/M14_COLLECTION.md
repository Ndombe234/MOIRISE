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
