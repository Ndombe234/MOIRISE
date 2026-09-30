# M07 — Discovery / Recommendation / Otaku Content — PLAN DE MODULE

## 1. Mission
Fournir recherche et découverte de joueurs, contenus sociaux, jeux et metadata Otaku avec recommandations explicables et sans pièges comportementaux.

## 2. Scope et ownership
Le module est l'autorité des capacités suivantes : SAVE_SEARCH; FOLLOW_TOPIC; DISMISS_RECOMMENDATION; REPORT_RESULT; UPDATE_DISCOVERY_PREFERENCE.. Les règles transversales de sécurité, d'erreur, d'événements, d'observabilité et de documentation appartiennent aux contrats transversaux.

## 3. Dépendances
M02, M04, M06, M15, M16.

## 4. Actors
Player; discovery index; content provider; recommendation engine; moderator.

## 5. Domain model
DiscoveryDocument; SearchQuery; RankingContext; Recommendation; ContentMetadata; SourceReference; PreferenceSignal.

## 6. Command behavior
1. SAVE_SEARCH : session → policy → validation → préconditions → mutation → événement → réponse.
2. FOLLOW_TOPIC : session → policy → validation → préconditions → mutation → événement → réponse.
3. DISMISS_RECOMMENDATION : session → policy → validation → préconditions → mutation → événement → réponse.
4. REPORT_RESULT : session → policy → validation → préconditions → mutation → événement → réponse.
5. UPDATE_DISCOVERY_PREFERENCE. : session → policy → validation → préconditions → mutation → événement → réponse.

## 7. Query behavior
1. SEARCH_GLOBAL : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
2. SEARCH_OTAKU : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
3. GET_TRENDING : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
4. GET_RECOMMENDATIONS : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
5. GET_CONTENT_METADATA : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
6. GET_SIMILAR_ITEMS. : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.

## 8. State model
query IDLE → EXECUTING → RESULTS/EMPTY/DEGRADED; recommendation CANDIDATE → FILTERED → RANKED → PRESENTED/DISMISSED.

Les transitions invalides sont rejetées sans effet partiel. Les états asynchrones doivent être récupérables.

## 9. Player experience
search; filters; result cards; topic pages; recommendation rail; explanation affordance; no infinite forced loop.

Le produit doit rester compréhensible sans connaissance de l'architecture interne. Les actions longues disposent d'un état de progression et d'un résultat persistant.

## 10. AI behavior
ranking assistance, metadata summarization, translation and semantic retrieval; recommendations must respect blocks, privacy and moderation.

Une capacité IA n'est jamais appelée directement depuis un composant UI. Le module demande une capability contractuelle à M19.

## 11. Data and privacy
indexed public content only, source refs, safe preference signals; no raw private messages.

Les données externes ont une provenance. Les données privées ne sont pas injectées automatiquement dans les modèles ou analytics.

## 12. Security
ACL filter before ranking; blocked/muted content removed or suppressed; source licenses/provenance tracked.

## 13. Performance and scaling
query budgets; cached metadata; pagination; ranking on bounded candidate sets.

Les opérations lourdes sont asynchrones, idempotentes et observables.

## 14. Failure branches
Validation, permission, conflict, timeout, provider unavailable, worker unavailable, corrupted artifact, duplicate submission, session expiry et reconnect doivent avoir des comportements documentés.

## 15. Cross-module effects
Les événements peuvent alimenter progression, notifications, analytics ou discovery, mais le module ne modifie jamais directement les données propriétaires d'un voisin.

## 16. Acceptance
search correctness, source provenance, blocked-content exclusion, explainable recommendation signals and degraded fallback.

## 17. Definition of done
Le module est DONE uniquement après tests unitaires, intégration, sécurité, navigation, mobile, récupération et vérification navigateur de toutes les actions visibles.