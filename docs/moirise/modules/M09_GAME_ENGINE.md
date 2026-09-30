# MOIRISE Module 09 — SHARED GAME ENGINE

## 1. Purpose

Créer les primitives communes permettant de faire fonctionner de nombreux jeux sans dupliquer un moteur complet pour chaque expérience.

## 2. Engine services

- Scene
- Entity
- Input
- Camera
- Physics
- Collision
- Quest
- Dialogue
- Inventory
- Save
- Audio
- UI
- Multiplayer adapter
- telemetry

## 3. Game Manifest

Chaque jeu déclare :
- engine ;
- version ;
- assets ;
- capabilities ;
- limits ;
- save schema ;
- multiplayer requirements.

## 4. Architecture

GAME → Engine Adapter → Shared Engine.

Un jeu ne doit pas importer tous les sous-systèmes si son manifest n'en a pas besoin.

## 5. Performance

- tree-shaking ;
- dynamic imports ;
- asset streaming ;
- memory cleanup ;
- frame budget ;
- configurable simulation frequency.

## 6. Security

Le runtime doit sandboxer les contenus générés et appliquer des quotas :
- CPU ;
- mémoire ;
- nombre d'entités ;
- taille des assets ;
- durée de session.

## 7. Tests

- deterministic simulation where expected ;
- save/load ;
- asset failure ;
- engine mismatch ;
- memory leak smoke ;
- mobile ;
- long session ;
- corrupted manifest.

## 8. Acceptance

Plusieurs jeux peuvent partager le moteur sans importer inutilement toute sa surface.

## 9. Do not modify

Ne pas créer de jeu métier dans le moteur partagé.

## 10. New-AI handoff

Toute nouvelle primitive doit avoir une interface stable, un test et une justification de réutilisation.
