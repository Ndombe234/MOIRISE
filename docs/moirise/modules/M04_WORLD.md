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
