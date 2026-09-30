# M09 — Game Creation — PLAN DE MODULE

## 1. Mission
Permettre au Player de décrire un jeu puis faire produire par l'IA une spécification, un graphe de tâches, du code/assets/audio, un build sandboxé, des tests, une preview et un versionnement.

## 2. Scope et ownership
Le module est l'autorité des capacités suivantes : CREATE_GAME_PROJECT; INTERPRET_GAME_IDEA; GENERATE_SPEC; GENERATE_CODE; GENERATE_ASSET; BUILD_GAME; RUN_SIMULATION; RUN_TESTS; CREATE_PREVIEW; CREATE_VERSION; PUBLISH_GAME; ROLLBACK_VERSION.. Les règles transversales de sécurité, d'erreur, d'événements, d'observabilité et de documentation appartiennent aux contrats transversaux.

## 3. Dépendances
M03, M08, M18, M19, M13.

## 4. Actors
creator; AI orchestrator; provider adapters; trusted worker; sandbox; validator; publisher.

## 5. Domain model
GameIdea; GameSpecification; GameTaskGraph; CodeArtifact; AssetArtifact; Build; TestRun; Preview; GamePackage; Version; Publication.

## 6. Command behavior
1. CREATE_GAME_PROJECT : session → policy → validation → préconditions → mutation → événement → réponse.
2. INTERPRET_GAME_IDEA : session → policy → validation → préconditions → mutation → événement → réponse.
3. GENERATE_SPEC : session → policy → validation → préconditions → mutation → événement → réponse.
4. GENERATE_CODE : session → policy → validation → préconditions → mutation → événement → réponse.
5. GENERATE_ASSET : session → policy → validation → préconditions → mutation → événement → réponse.
6. BUILD_GAME : session → policy → validation → préconditions → mutation → événement → réponse.
7. RUN_SIMULATION : session → policy → validation → préconditions → mutation → événement → réponse.
8. RUN_TESTS : session → policy → validation → préconditions → mutation → événement → réponse.
9. CREATE_PREVIEW : session → policy → validation → préconditions → mutation → événement → réponse.
10. CREATE_VERSION : session → policy → validation → préconditions → mutation → événement → réponse.
11. PUBLISH_GAME : session → policy → validation → préconditions → mutation → événement → réponse.
12. ROLLBACK_VERSION. : session → policy → validation → préconditions → mutation → événement → réponse.

## 7. Query behavior
1. GET_PROJECT : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
2. GET_SPEC : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
3. GET_TASK_GRAPH : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
4. GET_ARTIFACTS : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
5. GET_BUILD : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
6. GET_TESTS : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
7. GET_PREVIEW : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
8. GET_VERSIONS. : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.

## 8. State model
project IDEA → SPECIFYING → PLANNING → GENERATING → BUILDING → TESTING → PREVIEW → PUBLISHED/REJECTED; task QUEUED → RUNNING → VALIDATING → DONE/FAILED/RETRY.

Les transitions invalides sont rejetées sans effet partiel. Les états asynchrones doivent être récupérables.

## 9. Player experience
creation prompt; spec review; task graph; progress; artifact panel; build log summarized; preview; version history; publish gate.

Le produit doit rester compréhensible sans connaissance de l'architecture interne. Les actions longues disposent d'un état de progression et d'un résultat persistant.

## 10. AI behavior
core AI capability; model/provider agnostic; generated code always untrusted until sandbox validation; user may accept/reject checkpoints.

Une capacité IA n'est jamais appelée directement depuis un composant UI. Le module demande une capability contractuelle à M19.

## 11. Data and privacy
projects; specs; tasks; artifacts; builds; validation evidence; versions; provenance.

Les données externes ont une provenance. Les données privées ne sont pas injectées automatiquement dans les modèles ou analytics.

## 12. Security
sandbox, minimal worker payload, no production secrets, restricted network, signed package, provenance chain.

## 13. Performance and scaling
parallel independent tasks; cache deterministic artifacts; backpressure; resource quotas.

Les opérations lourdes sont asynchrones, idempotentes et observables.

## 14. Failure branches
Validation, permission, conflict, timeout, provider unavailable, worker unavailable, corrupted artifact, duplicate submission, session expiry et reconnect doivent avoir des comportements documentés.

## 15. Cross-module effects
Les événements peuvent alimenter progression, notifications, analytics ou discovery, mais le module ne modifie jamais directement les données propriétaires d'un voisin.

## 16. Acceptance
natural-language idea becomes executable GameSpecification, testable package, preview and publication only after all gates.

## 17. Definition of done
Le module est DONE uniquement après tests unitaires, intégration, sécurité, navigation, mobile, récupération et vérification navigateur de toutes les actions visibles.