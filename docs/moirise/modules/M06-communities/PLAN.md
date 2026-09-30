# M06 — Communities / Groups / Clans — PLAN DE MODULE

## 1. Mission
Permettre la création et la vie de communautés, groupes et clans avec adhésion, rôles, invitations, activité, gouvernance locale et intégration sociale.

## 2. Scope et ownership
Le module est l'autorité des capacités suivantes : CREATE_COMMUNITY; UPDATE_COMMUNITY; INVITE_MEMBER; ACCEPT_INVITE; REQUEST_JOIN; APPROVE_JOIN; CHANGE_MEMBER_ROLE; REMOVE_MEMBER; LEAVE_COMMUNITY; CREATE_CLAN; UPDATE_CLAN.. Les règles transversales de sécurité, d'erreur, d'événements, d'observabilité et de documentation appartiennent aux contrats transversaux.

## 3. Dépendances
M02, M04, M05, M13.

## 4. Actors
owner; moderator; member; guest; invited player; admin policy.

## 5. Domain model
Community; Membership; RoleBinding; Invitation; CommunityPostReference; CommunityEventReference; Clan; JoinRequest.

## 6. Command behavior
1. CREATE_COMMUNITY : session → policy → validation → préconditions → mutation → événement → réponse.
2. UPDATE_COMMUNITY : session → policy → validation → préconditions → mutation → événement → réponse.
3. INVITE_MEMBER : session → policy → validation → préconditions → mutation → événement → réponse.
4. ACCEPT_INVITE : session → policy → validation → préconditions → mutation → événement → réponse.
5. REQUEST_JOIN : session → policy → validation → préconditions → mutation → événement → réponse.
6. APPROVE_JOIN : session → policy → validation → préconditions → mutation → événement → réponse.
7. CHANGE_MEMBER_ROLE : session → policy → validation → préconditions → mutation → événement → réponse.
8. REMOVE_MEMBER : session → policy → validation → préconditions → mutation → événement → réponse.
9. LEAVE_COMMUNITY : session → policy → validation → préconditions → mutation → événement → réponse.
10. CREATE_CLAN : session → policy → validation → préconditions → mutation → événement → réponse.
11. UPDATE_CLAN. : session → policy → validation → préconditions → mutation → événement → réponse.

## 7. Query behavior
1. GET_COMMUNITY : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
2. LIST_COMMUNITIES : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
3. LIST_MEMBERS : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
4. GET_MEMBERSHIP : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
5. LIST_JOIN_REQUESTS : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.
6. GET_COMMUNITY_ACTIVITY. : projection minimale, privacy check, pagination, cache policy et provenance si la source est externe.

## 8. State model
community DRAFT → ACTIVE → FROZEN/ARCHIVED; membership INVITED → PENDING → ACTIVE → MUTED/REMOVED; clan FORMING → ACTIVE → DISBANDED.

Les transitions invalides sont rejetées sans effet partiel. Les états asynchrones doivent être récupérables.

## 9. Player experience
directory; community page; member roster; invitations; moderation panel; clan panel; activity tabs.

Le produit doit rester compréhensible sans connaissance de l'architecture interne. Les actions longues disposent d'un état de progression et d'un résultat persistant.

## 10. AI behavior
community description drafting, translation, discovery and moderation assistance; never grant role or membership silently.

Une capacité IA n'est jamais appelée directement depuis un composant UI. Le module demande une capability contractuelle à M19.

## 11. Data and privacy
communities; memberships; roles; invites; clans; moderation hooks; community settings.

Les données externes ont une provenance. Les données privées ne sont pas injectées automatiquement dans les modèles ou analytics.

## 12. Security
role transitions server-authorized; private community membership hidden; invite tokens single-use; moderator actions audited.

## 13. Performance and scaling
member pagination; activity feeds bounded; role changes transactional.

Les opérations lourdes sont asynchrones, idempotentes et observables.

## 14. Failure branches
Validation, permission, conflict, timeout, provider unavailable, worker unavailable, corrupted artifact, duplicate submission, session expiry et reconnect doivent avoir des comportements documentés.

## 15. Cross-module effects
Les événements peuvent alimenter progression, notifications, analytics ou discovery, mais le module ne modifie jamais directement les données propriétaires d'un voisin.

## 16. Acceptance
membership matrix, role permissions, invitation replay protection, leave/remove behavior, mobile admin controls.

## 17. Definition of done
Le module est DONE uniquement après tests unitaires, intégration, sécurité, navigation, mobile, récupération et vérification navigateur de toutes les actions visibles.