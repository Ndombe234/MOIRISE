# M05 — Messaging / Communication — PLAN DE MODULE

## 1. Mission
Fournir conversations privées et discussions avec présence, lecture, pièces jointes et traduction contextuelle sans exposer les données privées hors autorisation.

## 2. Périmètre
Le module est propriétaire des comportements explicitement listés dans ce document. Il ne devient pas propriétaire d'une règle appartenant à un autre module simplement parce qu'il l'affiche.

### Inclus
- toutes les commandes : CREATE_CONVERSATION, SEND_MESSAGE, EDIT_MESSAGE, DELETE_MESSAGE, MARK_READ, SET_PRESENCE, ATTACH_MEDIA, TRANSLATE_MESSAGE.;
- toutes les lectures : GET_CONVERSATIONS, GET_MESSAGES, GET_UNREAD, GET_PRESENCE, GET_MESSAGE_ATTACHMENTS.;
- tous les événements : CONVERSATION_CREATED, MESSAGE_SENT, MESSAGE_EDITED, MESSAGE_DELETED, MESSAGE_READ, PRESENCE_CHANGED.;
- tous les états : conversation ACTIVE/ARCHIVED; message COMPOSING → SENT → DELIVERED → READ, ou FAILED/RETRYING.;
- les surfaces UI et comportements décrits plus bas;
- les validations, erreurs, observabilité et tests associés.

### Exclus
Toute règle métier d'un autre propriétaire. Les contrats communs sont référencés dans docs/moirise/transversal/ et ne sont pas recopiés.

## 3. Dépendances
M01, M02, M03, M13, M15.

Le module doit consommer les dépendances par contrats typés. Il ne doit pas importer directement la couche de persistance d'un voisin lorsque le voisin possède un service canonique.

## 4. Acteurs et intentions
sender; recipient; conversation members; moderator only under policy; SYSTEM; translation service.

Chaque intention utilisateur est transformée en une commande explicite. Une simple ouverture d'écran ne doit pas être confondue avec une mutation.

## 5. Modèle conceptuel
Entités principales : Conversation; Participant; Message; AttachmentReference; ReadReceipt; Presence; TranslationCacheEntry.

Les identifiants de données sont stables et indépendants des libellés d'interface. Les projections d'affichage ne deviennent jamais des sources d'autorité.

## 6. Commandes
1. CREATE_CONVERSATION : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
2. SEND_MESSAGE : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
3. EDIT_MESSAGE : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
4. DELETE_MESSAGE : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
5. MARK_READ : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
6. SET_PRESENCE : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
7. ATTACH_MEDIA : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
8. TRANSLATE_MESSAGE. : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.

## 7. Lectures
1. GET_CONVERSATIONS : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
2. GET_MESSAGES : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
3. GET_UNREAD : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
4. GET_PRESENCE : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
5. GET_MESSAGE_ATTACHMENTS. : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.

## 8. Machine d'état
conversation ACTIVE/ARCHIVED; message COMPOSING → SENT → DELIVERED → READ, ou FAILED/RETRYING.

Aucune transition non documentée ne doit être introduite par le client. Les états persistants et temporaires sont distingués.

## 9. Expérience utilisateur
conversation list; thread; composer; typing/presence; attachment tray; translation toggle.

Chaque action visible possède un retour de succès, un état d'attente et une réponse récupérable en cas d'échec. Les écrans mobiles privilégient le contenu primaire et les actions au pouce.

## 10. Comportement du SYSTEM et de l'IA
translation and optional drafting only when invoked; no automatic training on private messages.

Le SYSTEM peut présenter le résultat et suggérer l'étape suivante, mais le module propriétaire garde l'autorité sur la donnée et la mutation. L'IA ne reçoit que le minimum de contexte nécessaire.

## 11. Données
conversations; participants; messages; receipts; presence; attachment refs; local translation cache.

Pour toute donnée, définir owner, sensibilité, rétention, index, cache, suppression et projection. Les données privées ne sont pas envoyées aux analytics généraux.

## 12. Sécurité
recipient membership; block rules; private data excluded from general analytics/logging; attachment signed access.

La sécurité critique est serveur-side. Les champs de rôle, propriétaire, récompense ou statut ne sont pas acceptés comme vérités venant du navigateur.

## 13. Performance
windowed message pagination; send queue; optimistic text send with reconciliation; presence throttled.

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
private access matrix, duplicate-send prevention, reconnect recovery, translation cache, mobile keyboard behavior.

Le module n'est DONE que lorsque code, données, autorisations, UX, états de récupération, tests et vérification navigateur sont cohérents.

## 19. Handoff vers la conception technique
La conception technique ci-jointe transforme chacun des points ci-dessus en contrats exécutables, données concrètes, transitions, APIs, tests et runbook d'implémentation.