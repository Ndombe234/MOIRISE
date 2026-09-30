# MOIRISE Module 08 — GAME A→Z FACTORY

## 1. Purpose

Permettre à MORISE de concevoir des jeux à partir d'une idée naturelle du joueur, puis de produire une spécification validée avant toute exécution.

## 2. User flow

USER IDEA
→ clarification
→ concept
→ game design
→ GameSpecification
→ validation
→ prototype
→ simulation
→ test
→ preview
→ publication si approuvé.

## 3. UI

Créer un espace :
- idée ;
- aperçu ;
- règles ;
- assets ;
- simulation ;
- problèmes ;
- publier.

Le joueur ne voit pas les détails techniques inutiles.

## 4. MORISE dialogue

Exemple :
« Décris-moi le jeu que tu imagines. »
Puis :
« J'ai compris : exploration, énigmes et progression. Voici une première version. »

Elle doit demander clarification seulement lorsque nécessaire.

## 5. GameSpecification

Contrat conceptuel :
- metadata ;
- genre ;
- objective ;
- rules ;
- entities ;
- levels/scenes ;
- controls ;
- rewards ;
- audio;
- visual direction ;
- multiplayer mode ;
- engineTarget ;
- safety constraints.

## 6. Base engines

La première génération utilise des moteurs contrôlés :
- Adventure 2D ;
- Battle 2D ;
- Puzzle 2D.

Le 3D passe par un moteur/adaptateur validé séparé.

## 7. Security

L'utilisateur et le modèle ne doivent jamais fournir directement du code arbitraire au navigateur.

Le Factory produit une DSL/spec contrôlée.

## 8. Validation

Game Validator :
- schema validation ;
- rules validation ;
- asset validation ;
- security validation ;
- performance limits ;
- simulation ;
- regression.

## 9. Providers

Text/design providers : via AI Gateway.
Image/video/audio : via Creative capabilities.
Aucun provider n'est indispensable pour le runtime si les assets de fallback existent.

## 10. Secrets

Utiliser uniquement les secrets déjà enregistrés lorsque le provider correspondant est choisi par Router.

## 11. Events

GAME_CREATION_STARTED
GAME_SPEC_CREATED
GAME_VALIDATION_FAILED
GAME_SIMULATION_COMPLETED
GAME_CREATION_COMPLETED
GAME_PUBLISHED

## 12. Tests

- natural-language intent ;
- ambiguous idea ;
- invalid specification ;
- unsafe instruction ;
- endless loop ;
- excessive asset request ;
- provider unavailable ;
- simulation failure ;
- successful preview.

## 13. Acceptance

Aucune génération de jeu ne peut passer directement de texte utilisateur à production sans validation/simulation.

## 14. Do not modify

Ne pas placer ici le runtime partagé ; voir Module 9.

## 15. New-AI handoff

Le Game Factory fabrique des spécifications et des créations validées ; il n'a pas un accès général au système.
