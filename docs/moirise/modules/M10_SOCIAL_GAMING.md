# MOIRISE Module 10 — SOCIAL GAMING

## 1. Purpose

Relier les jeux aux interactions sociales : coop, défis, scores, compétitions, partage, parties collectives.

## 2. UX

Afficher l'activité sociale dans le contexte du jeu sans transformer PLAY en réseau social complet.

## 3. Modes

- solo ;
- duo ;
- groupe ;
- compétition ;
- coop ;
- spectateur lorsque le jeu le permet.

## 4. MORISE

Elle peut :
- proposer un partenaire ;
- expliquer les règles ;
- préparer un défi ;
- résumer une session.

Elle ne choisit pas arbitrairement un adversaire pour un joueur sans règle/permission.

## 5. Data

game_groups
game_sessions_social
game_invites
game_scores
game_challenges

## 6. Events

MATCH_CREATED
PLAYER_JOINED
PLAYER_LEFT
CHALLENGE_CREATED
CHALLENGE_COMPLETED
SOCIAL_RESULT_SHARED

## 7. AI

RECOMMENDATION
MATCHMAKING
MODERATION
TRANSLATION
GAME_ASSISTANCE

## 8. Security

- membership checks ;
- anti-cheat ;
- score validation ;
- invite permissions ;
- private lobby isolation.

## 9. Performance

Realtime uniquement là où nécessaire.
Ne pas maintenir des subscriptions sur toutes les communautés et parties du système.

## 10. Tests

- invite ;
- join/leave ;
- score ;
- tampered result ;
- disconnect ;
- reconnect ;
- moderation unavailable ;
- mobile.

## 11. Acceptance

Les expériences collectives fonctionnent sans dépendre d'un provider IA.

## 12. Do not modify

Ne pas construire ici la gestion générale des communautés.
