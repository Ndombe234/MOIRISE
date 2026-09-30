# M10 — Creative Studio — PLAN DE MODULE

## 1. Mission
Centraliser la création image, vidéo, audio, musique, texte et artefacts composés avec orchestration IA, versions, provenance, révisions et export.

## 2. Scope et ownership
Le module est l'autorité des capacités suivantes : CREATE_PROJECT; GENERATE_TEXT; GENERATE_IMAGE; GENERATE_VIDEO; GENERATE_AUDIO; GENERATE_MUSIC; COMPOSE_ARTIFACT; CREATE_REVISION; RENDER_EXPORT; APPROVE_ARTIFACT; ARCHIVE_VERSION.. Les règles transversales de sécurité, d'erreur, d'événements, d'observabilité et de documentation appartiennent aux contrats transversaux.

## 3. Dépendances
M03, M18, M19, M15, M13.

## 4. Actors
creator; AI orchestrator; provider; worker; validator; collaborator.

## 5. Domain model
CreativeProject; PromptRevision; Artifact; ArtifactVersion; RenderJob; Composition; Export; ProvenanceRecord; Review.

## 6. Command behavior
1. CREATE_PROJECT : session → policy → validation → préconditions → mutation → événement → réponse.
2. GENERATE_TEXT : session → policy → validation → préconditions → mutation → événement → réponse.
3. GENERATE_IMAGE : session → policy → validation → préconditions → mutation → événement → réponse.
4. GENERATE_VIDEO : session → policy → validation → préconditions → mutation → événement → réponse.
5. GENERATE_AUDIO : session → policy → validation → préconditions → mutation → événement → réponse.
6. GENERATE_MUSIC : session → policy → validation → préconditions → mutation → événement → réponse.
7. COMPOSE_ARTIFACT : session → policy → validation → préconditions → mutation → événement → réponse.
8. CREATE_REVISION : session → policy → validation → préconditions → mutation → événement → réponse.
9. RENDER_EXPORT : session → policy → validation → préconditions → mutation → événement → réponse.
10. APPROVE_ARTIFACT : session → policy → validation → préconditions → mutation → événement → réponse.
11. ARCHIVE_VERSION. : session → policy → validation → préconditions → mutation → événement → réponse.

## 7. Query behavior
1. GET_PROJECT : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
2. GET_ARTIFACT : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
3. GET_VERSION : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
4. GET_RENDER_JOB : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
5. GET_PROVENANCE : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
6. LIST_PROJECT_ASSETS. : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.

## 8. State model
project ACTIVE/ARCHIVED; artifact REQUESTED → GENERATING → VALIDATING → READY/REJECTED; render QUEUED → RUNNING → COMPLETE/FAILED.

Les transitions invalides sont rejetées sans effet partiel. Les états asynchrones doivent être récupérables.

## 9. Player experience
studio canvas; prompt controls; generation history; variants; timeline where needed; preview; export; provenance panel.

Le produit doit rester compréhensible sans connaissance de l'architecture interne. Les actions longues disposent d'un état de progression et d'un résultat persistant.

## 10. AI behavior
multimodal capability router chooses model/provider/local/worker; prompt and source data minimized; revisions are reproducible where possible.

Une capacité IA n'est jamais appelée directement depuis un composant UI. Le module demande une capability contractuelle à M19.

## 11. Data and privacy
artifacts, versions, metadata, hashes, prompt references, provider evidence, export refs.

Les données externes ont une provenance. Les données privées ne sont pas injectées automatiquement dans les modèles ou analytics.

## 12. Security
license/provenance metadata; user isolation; signed URLs; no provider secrets client-side.

## 13. Performance and scaling
large media async; thumbnails/previews; resumable uploads; deduplication by content hash when appropriate.

Les opérations lourdes sont asynchrones, idempotentes et observables.

## 14. Failure branches
Validation, permission, conflict, timeout, provider unavailable, worker unavailable, corrupted artifact, duplicate submission, session expiry et reconnect doivent avoir des comportements documentés.

## 15. Cross-module effects
Les événements peuvent alimenter progression, notifications, analytics ou discovery, mais le module ne modifie jamais directement les données propriétaires d'un voisin.

## 16. Acceptance
all supported media surfaces have validation, recovery, versioning, provenance and export behavior.

## 17. Definition of done
Le module est DONE uniquement après tests unitaires, intégration, sécurité, navigation, mobile, récupération et vérification navigateur de toutes les actions visibles.