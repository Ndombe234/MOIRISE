# M04 — Social Feed / Posts — PLAN DE MODULE

## 1. Mission
Permettre publication, lecture, réaction, commentaire, partage et visibilité de contenus sociaux avec contrôle d'accès et propagation d'événements.

## 2. Périmètre
Le module est propriétaire des comportements explicitement listés dans ce document. Il ne devient pas propriétaire d'une règle appartenant à un autre module simplement parce qu'il l'affiche.

### Inclus
- toutes les commandes : CREATE_POST, EDIT_POST, DELETE_POST, REACT_POST, REMOVE_REACTION, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, SHARE_POST, UPDATE_VISIBILITY.;
- toutes les lectures : GET_FEED, GET_POST, GET_COMMENTS, GET_REACTIONS, GET_SHARED_CONTEXT.;
- tous les événements : POST_CREATED, POST_UPDATED, POST_DELETED, POST_REACTED, COMMENT_CREATED, COMMENT_DELETED, POST_SHARED.;
- tous les états : DRAFT → PUBLISHED → EDITED/ARCHIVED/DELETED; interaction requests → VALIDATING → APPLIED/REJECTED.;
- les surfaces UI et comportements décrits plus bas;
- les validations, erreurs, observabilité et tests associés.

### Exclus
Toute règle métier d'un autre propriétaire. Les contrats communs sont référencés dans docs/moirise/transversal/ et ne sont pas recopiés.

## 3. Dépendances
M01, M02, M03, M13.

Le module doit consommer les dépendances par contrats typés. Il ne doit pas importer directement la couche de persistance d'un voisin lorsque le voisin possède un service canonique.

## 4. Acteurs et intentions
author; viewer; moderator; SYSTEM; notifier.

Chaque intention utilisateur est transformée en une commande explicite. Une simple ouverture d'écran ne doit pas être confondue avec une mutation.

## 5. Modèle conceptuel
Entités principales : Post; PostMedia; Reaction; Comment; Share; VisibilityPolicy; FeedCursor; SocialInteraction.

Les identifiants de données sont stables et indépendants des libellés d'interface. Les projections d'affichage ne deviennent jamais des sources d'autorité.

## 6. Commandes
1. CREATE_POST : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
2. EDIT_POST : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
3. DELETE_POST : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
4. REACT_POST : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
5. REMOVE_REACTION : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
6. ADD_COMMENT : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
7. EDIT_COMMENT : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
8. DELETE_COMMENT : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
9. SHARE_POST : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
10. UPDATE_VISIBILITY. : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.

## 7. Lectures
1. GET_FEED : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
2. GET_POST : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
3. GET_COMMENTS : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
4. GET_REACTIONS : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
5. GET_SHARED_CONTEXT. : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.

## 8. Machine d'état
DRAFT → PUBLISHED → EDITED/ARCHIVED/DELETED; interaction requests → VALIDATING → APPLIED/REJECTED.

Aucune transition non documentée ne doit être introduite par le client. Les états persistants et temporaires sont distingués.

## 9. Expérience utilisateur
feed; composer; post card; comment thread; share sheet; empty/loading/error; attachment preview.

Chaque action visible possède un retour de succès, un état d'attente et une réponse récupérable en cas d'échec. Les écrans mobiles privilégient le contenu primaire et les actions au pouce.

## 10. Comportement du SYSTEM et de l'IA
drafting, translation, content assist, recommendation and moderation assistance only through typed capability contracts.

Le SYSTEM peut présenter le résultat et suggérer l'étape suivante, mais le module propriétaire garde l'autorité sur la donnée et la mutation. L'IA ne reçoit que le minimum de contexte nécessaire.

## 11. Données
posts; media refs; interactions; comments; visibility; feed projections.

Pour toute donnée, définir owner, sensibilité, rétention, index, cache, suppression et projection. Les données privées ne sont pas envoyées aux analytics généraux.

## 12. Sécurité
owner checks; visibility enforcement server-side; block/mute/moderation filters applied before display.

La sécurité critique est serveur-side. Les champs de rôle, propriétaire, récompense ou statut ne sont pas acceptés comme vérités venant du navigateur.

## 13. Performance
cursor pagination; media lazy load; deduplicated feed pages; bounded comment depth.

Les opérations lourdes sont asynchrones. Les longues listes sont paginées. Les médias et moteurs lourds sont lazy-loadés.

## 14. Résilience
Le module doit définir un comportement lorsque chaque dépendance critique est indisponible. Le noyau du module reste utilisable lorsqu'une capacité facultative, fournisseur IA ou worker n'est pas disponible.

## 15. Cas limites obligatoires
- double-clic ou double-soumission ;
- session expirée pendant la commande ;
- concurrence sur la même entité ;
- donnée supprimée avant lecture ;
- utilisateur bloqué/modéré ;
- dépendance indisponible ;
- timeout ;
- retry après reconnect ;
- payload volontairement invalide ;
- cache obsolète ;
- changement de schéma versionné.

## 16. Notifications
Le module ne décide pas seul de la fréquence de notification. Il émet un événement ou un candidat d'engagement ; M14 applique la politique globale.

## 17. Analytics
Seuls les événements sûrs et minimisés sont envoyés à M16. Le contenu sensible n'est pas copié dans les analytics.

## 18. Définition de fini
post lifecycle, visibility matrix, interactions, moderation hooks, mobile composer and offline-safe draft recovery.

Le module n'est DONE que lorsque code, données, autorisations, UX, états de récupération, tests et vérification navigateur sont cohérents.

## 19. Handoff vers la conception technique
La conception technique ci-jointe transforme chacun des points ci-dessus en contrats exécutables, données concrètes, transitions, APIs, tests et runbook d'implémentation.