# M08 — Games & Quiz Platform — PLAN DE MODULE

## 1. Mission
Fournir l'entrée Play, catalogue, lancement et exécution des jeux 2D/3D et quiz, sessions, sauvegarde, validation des résultats et partage.

## 2. Scope et ownership
Le module est l'autorité des capacités suivantes : PUBLISH_GAME; START_GAME; PAUSE_GAME; SAVE_GAME; RESUME_GAME; SUBMIT_RESULT; SHARE_RESULT; START_QUIZ; SUBMIT_QUIZ.. Les règles transversales de sécurité, d'erreur, d'événements, d'observabilité et de documentation appartiennent aux contrats transversaux.

## 3. Dépendances
M01, M02, M03, M11, M13, M16.

## 4. Actors
Player; game runtime; game author; validator; SYSTEM; spectator/share recipient.

## 5. Domain model
GameDefinition; GameVersion; GameSession; GameSave; QuizDefinition; Attempt; Result; LeaderboardEntry; ShareToken.

## 6. Command behavior
1. PUBLISH_GAME : session → policy → validation → préconditions → mutation → événement → réponse.
2. START_GAME : session → policy → validation → préconditions → mutation → événement → réponse.
3. PAUSE_GAME : session → policy → validation → préconditions → mutation → événement → réponse.
4. SAVE_GAME : session → policy → validation → préconditions → mutation → événement → réponse.
5. RESUME_GAME : session → policy → validation → préconditions → mutation → événement → réponse.
6. SUBMIT_RESULT : session → policy → validation → préconditions → mutation → événement → réponse.
7. SHARE_RESULT : session → policy → validation → préconditions → mutation → événement → réponse.
8. START_QUIZ : session → policy → validation → préconditions → mutation → événement → réponse.
9. SUBMIT_QUIZ. : session → policy → validation → préconditions → mutation → événement → réponse.

## 7. Query behavior
1. LIST_GAMES : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
2. GET_GAME : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
3. GET_VERSION : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
4. GET_SESSION : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
5. GET_SAVE : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
6. GET_RESULT : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
7. GET_LEADERBOARD : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
8. GET_QUIZ. : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.

## 8. State model
version DRAFT → TESTING → VALIDATED → PUBLISHED/DEPRECATED; session CREATED → RUNNING → PAUSED → COMPLETED/ABANDONED; result SUBMITTED → VALIDATING → ACCEPTED/REJECTED.

Les transitions invalides sont rejetées sans effet partiel. Les états asynchrones doivent être récupérables.

## 9. Player experience
Play hub; game card; runtime shell; save/resume; quiz flow; results; leaderboard; share.

Le produit doit rester compréhensible sans connaissance de l'architecture interne. Les actions longues disposent d'un état de progression et d'un résultat persistant.

## 10. AI behavior
game recommendation and optional adaptive content; AI-generated games enter M09 and must pass validation before execution.

Une capacité IA n'est jamais appelée directement depuis un composant UI. Le module demande une capability contractuelle à M19.

## 11. Data and privacy
catalog; versions; runtime sessions; saves; attempts; results; leaderboards.

Les données externes ont une provenance. Les données privées ne sont pas injectées automatiquement dans les modèles ou analytics.

## 12. Security
result validation server-side where competitive; share token privacy; runtime package sandbox; no arbitrary privileged JS.

## 13. Performance and scaling
runtime lazy-load; assets streaming; bounded saves; leaderboard pagination.

Les opérations lourdes sont asynchrones, idempotentes et observables.

## 14. Failure branches
Validation, permission, conflict, timeout, provider unavailable, worker unavailable, corrupted artifact, duplicate submission, session expiry et reconnect doivent avoir des comportements documentés.

## 15. Cross-module effects
Les événements peuvent alimenter progression, notifications, analytics ou discovery, mais le module ne modifie jamais directement les données propriétaires d'un voisin.

## 16. Acceptance
2D and 3D runtime boundaries, save/resume, result validation, quiz path, share, mobile controls.

## 17. Definition of done
Le module est DONE uniquement après tests unitaires, intégration, sécurité, navigation, mobile, récupération et vérification navigateur de toutes les actions visibles.