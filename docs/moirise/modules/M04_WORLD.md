# MOIRISE Module 04 — WORLD

## 1. Purpose

Construire le WORLD comme environnement contextuel et extensible. Le monde n'est pas une immense carte chargée en permanence.

## 2. World model

WORLD est composé de zones :
- social ;
- discovery ;
- play ;
- create ;
- communities ;
- activities ;
- events ;
- futures zones adaptatives.

## 3. UI

Afficher uniquement la zone utile.
Navigation minimale.
Les éléments dynamiques sont chargés selon le contexte.

## 4. Actions

- entrer dans une zone ;
- interagir avec un objet ;
- découvrir ;
- créer ;
- ouvrir une activité ;
- rejoindre une expérience.

## 5. MORISE

MORISE observe les interactions autorisées et peut déclencher des conséquences contextualisées.

Elle ne doit pas prétendre qu'un monde a changé si aucun état réel n'a changé.

## 6. Data

Concepts :
world_zones
world_objects
world_states
world_interactions
world_events

Les états globaux doivent être versionnés lorsque nécessaire.

## 7. Events

WORLD_ZONE_ENTERED
WORLD_INTERACTION
WORLD_OBJECT_CHANGED
WORLD_EVENT_STARTED
WORLD_EVENT_COMPLETED

## 8. AI

Capabilities :
- WORLD_REASONING ;
- RECOMMENDATION ;
- NARRATIVE ;
- SEARCH ;
- CREATION ;
- GAME.

Le monde appelle les capacités, pas les providers directement.

## 9. Providers

Interchangeables via Capability Registry.

## 10. Security

- permissions par zone ;
- ownership des objets privés ;
- validation des changements ;
- aucune modification globale directement depuis le navigateur.

## 11. Performance

- streaming/lazy load des zones ;
- objets chargés à proximité ;
- textures/media lazy ;
- états mondiaux minimisés.

## 12. Tests

- zone ;
- interaction ;
- objet ;
- états persistants ;
- monde vide ;
- provider absent ;
- mobile ;
- navigation sans blank screen.

## 13. Acceptance

Le joueur peut explorer un monde contextuel sans charger un monde géant complet.

## 14. Do not modify

Ne pas implémenter ici l'évolution autonome globale ; celle-ci appartient au Module 13 et au Core AI.

## 15. New-AI handoff

WORLD STATE doit rester auditable. Pas de mutation silencieuse.


---

# M04 — WORLD — COMPLETE TECHNICAL CONTRACT

## Responsibility
M04 owns the coherent MOIRISE world model: zones, nodes, themes, categories, contextual navigation metadata and feature availability. It does not own progression, games or AI internals.

## Data
`world_zones`, `world_nodes`, `world_tags`, `world_feature_flags`, `world_versions`.

## Types
```ts
interface WorldZone { id:string; key:string; titleKey:string; descriptionKey:string; order:number; enabled:boolean; version:number; }
interface WorldNode { id:string; zoneId:string; kind:string; targetRef:string; visibility:string; }
interface WorldContext { zoneId:string; locale:string; playerId:string; availableActions:string[]; }
```

## Resolution
`route/context → load world version → validate feature flags → resolve locale → resolve player eligibility → expose contextual actions`.

## Placement rule
World zones are sections inside the six primary doors, never six-plus additional permanent buttons. The SYSTEM can surface the next useful action without trapping the player or hiding core navigation.

## Versioning
World configuration is versioned and server-authoritative. A disabled node remains available only for migration/admin recovery. Published world versions are immutable; changes create a new version.

## AI boundary
AI may propose text, recommendations or adaptation candidates. It cannot directly activate production world configuration. M13 owns adaptive activation.

## Caching
Static world metadata is cacheable by version/locale. Player-specific context is user-scoped. Never mix personalized availability into public cache entries.

## Failure states
Unknown zone → safe Home context. Missing translation → fallback locale. Disabled feature → contextual unavailable state. Failed world fetch → cached last-known-safe version where valid.

## Tests
Feature-flag authorization; version rollback; locale fallback; invalid route; direct deep link; player eligibility; stale cache; mobile layout; AI unavailable; world-version migration.

## Done gate
The player always knows where they are, has a valid next action, and can reach all primary product areas without a large permanent control surface.



## 16. Canonical implementation runbook

1. Define versioned world configuration as server-authoritative data.
2. Create zone/node/tag tables with stable IDs and explicit ordering.
3. Build one world resolver that maps route + player + locale + feature flags to available contextual actions.
4. Version and publish world configurations immutably; modifications create a new version.
5. Cache public world metadata by version and locale only.
6. Keep player-specific eligibility outside public caches.
7. Make world interaction writes explicit commands with server authorization.
8. Emit world events only after authoritative persistence.
9. Provide safe fallback to Home or last-known-safe world version on fetch failures.
10. Leave adaptive activation to M13 and AI internals to AI Core.
11. Test deep links, disabled zones, stale cache, locale fallback, state version rollback and mobile exploration.

### Canonical server contracts
resolveWorldContext, getWorldVersion, publishWorldVersion, recordWorldInteraction. No client action may directly update a global world state.

### Completion proof
World navigation is contextual, versioned and auditable, with no giant always-loaded world graph.

## 20. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.