# MOIRISE Module 06 — PLAY

## 1. Purpose

Reconstruire l'espace de jeu depuis zéro. Le module doit supporter des expériences 2D, 3D et hybrides sans charger tous les moteurs au démarrage.

## 2. UI

Entrées :
- découvrir ;
- jouer ;
- reprendre ;
- solo ;
- collectif ;
- création si autorisée.

Chaque jeu est une unité lazy-loaded décrite par un Game Manifest.

## 3. Actions

- lancer ;
- mettre en pause ;
- reprendre ;
- quitter ;
- terminer ;
- partager ;
- recommencer ;
- signaler un problème.

## 4. MORISE

Avant le jeu :
« Prêt ? Cette expérience a été sélectionnée pour toi. »

Pendant :
intervention minimale, uniquement si l'expérience le prévoit.

Après :
« Session terminée. »
Puis résultats validés.

MORISE ne doit pas distraire le joueur avec des messages inutiles.

## 5. Play Session

Créer :
play_sessions
play_events
play_results

Lifecycle :
STARTED → ACTIVE → PAUSED? → COMPLETED/ABANDONED/FAILED

## 6. Server validation

Un résultat de jeu n'est jamais accepté uniquement depuis le client.

Pipeline :
CLIENT RESULT → AUTH → SESSION CHECK → GAME RULE VALIDATION → DUPLICATE CHECK → PROGRESSION EVENT

## 7. AI

Capabilities :
- game recommendation ;
- narrative ;
- hint ;
- dynamic difficulty selon règles ;
- analysis ;
- game generation via Module 8.

## 8. Provider usage

Aucun jeu ne dépend d'un provider externe pour son fonctionnement de base.

## 9. Performance

- engine lazy loading ;
- assets lazy ;
- texture/audio streaming ;
- cleanup à la sortie ;
- mémoire libérée après session lorsque possible.

## 10. Security

- session token ;
- anti-tamper ;
- validation serveur ;
- rate limiting ;
- payload limits.

## 11. Tests

- start/stop/resume ;
- completion ;
- tampered result ;
- duplicate result ;
- auth/unauth;
- mobile ;
- slow network ;
- provider unavailable ;
- engine loading failure ;
- no blank screen.

## 12. Acceptance

PLAY fonctionne avec au moins une expérience réelle, validée et réversible. Le module ne doit pas être considéré terminé sur la seule présence d'une interface.

## 13. Do not modify

Ne pas construire ici Game Factory complète ni Shared Game Engine complet.

## 14. New-AI handoff

Tout nouveau jeu doit passer par Game Registry/Game Manifest et respecter les contrats du Shared Engine.
