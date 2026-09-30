# MOIRISE Module 07 — GAME DISCOVERY ENGINE

## 1. Purpose

Créer le moteur qui aide un joueur à découvrir des expériences sans enfermer son profil dans une bulle.

## 2. User experience

Entrées : suggestions, recherche, nouveautés, tendances, collections, expériences communautaires.

## 3. Ranking

Le classement combine :
- préférences explicites ;
- historique autorisé ;
- contexte courant ;
- nouveauté ;
- diversité ;
- qualité mesurée ;
- disponibilité.

Aucune règle ne doit dire « l'utilisateur aime X, donc montrer uniquement X ».

## 4. MORISE

Exemple :
« Tu joues beaucoup aux puzzles. Je t'en propose un qui fonctionne autrement. »

MORISE doit expliquer une recommandation lorsqu'elle le juge utile.

## 5. Data

discovery_candidates
discovery_impressions
discovery_interactions
discovery_feedback
recommendation_profiles

## 6. AI

Capabilities :
RECOMMENDATION
SEARCH
EMBEDDING
RANKING
TRANSLATION

## 7. Observation

PostHog peut recevoir des signaux d'observation autorisés, mais ne devient pas la source de vérité de la recommandation.

## 8. Providers

Provider-neutral. Le module doit fonctionner avec un fallback non-IA.

## 9. Performance

- pagination ;
- ranking batch ;
- embeddings asynchrones ;
- cache ;
- ne pas générer une recommandation IA à chaque scroll.

## 10. Security

Ne jamais utiliser de données sensibles pour profiler un joueur.

## 11. Tests

- diversité ;
- nouveautés ;
- recherche ;
- provider unavailable ;
- no data ;
- cold start ;
- mobile ;
- recommendation determinism where expected.

## 12. Acceptance

Le joueur peut découvrir des expériences pertinentes et nouvelles sans dépendance obligatoire à un provider.

## 13. Do not modify

Le module ne crée pas les jeux. Il les découvre.

## 14. New-AI handoff

L'algorithme de recommandation doit être versionné.
