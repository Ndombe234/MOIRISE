# M02 — Player Identity & Profile — PLAN DE MODULE

## 1. Mission
Fournir une identité Player persistante après authentification, avec profil public, paramètres privés, préférences explicites, confidentialité et gestion des données.

## 2. Périmètre
Le module est propriétaire des comportements explicitement listés dans ce document. Il ne devient pas propriétaire d'une règle appartenant à un autre module simplement parce qu'il l'affiche.

### Inclus
- toutes les commandes : ENSURE_PROFILE, UPDATE_PROFILE, UPDATE_PREFERENCES, REQUEST_AVATAR, UPDATE_PRIVACY, DELETE_ALLOWED_DATA.;
- toutes les lectures : GET_MY_PROFILE, GET_PUBLIC_PROFILE, GET_MY_PREFERENCES, GET_PROFILE_ACTIVITY, GET_PROFILE_CREATORS.;
- tous les événements : PLAYER_CREATED, PROFILE_UPDATED, PREFERENCE_UPDATED, AVATAR_REQUESTED, AVATAR_CREATED, PLAYER_DATA_REMOVED.;
- tous les états : ABSENT → BOOTSTRAPPING → READY; READY → UPDATE_PENDING → READY ou CONFLICT/ERROR; DISABLED_ACCOUNT terminal.;
- les surfaces UI et comportements décrits plus bas;
- les validations, erreurs, observabilité et tests associés.

### Exclus
Toute règle métier d'un autre propriétaire. Les contrats communs sont référencés dans docs/moirise/transversal/ et ne sont pas recopiés.

## 3. Dépendances
M01.

Le module doit consommer les dépendances par contrats typés. Il ne doit pas importer directement la couche de persistance d'un voisin lorsque le voisin possède un service canonique.

## 4. Acteurs et intentions
Player; autre Player selon visibilité; administrateur autorisé; AI assistant sous invocation.

Chaque intention utilisateur est transformée en une commande explicite. Une simple ouverture d'écran ne doit pas être confondue avec une mutation.

## 5. Modèle conceptuel
Entités principales : PlayerProfile; PlayerPreferences; PublicProfileProjection; PrivacySettings; AvatarReference; PlayerActivityReference.

Les identifiants de données sont stables et indépendants des libellés d'interface. Les projections d'affichage ne deviennent jamais des sources d'autorité.

## 6. Commandes
1. ENSURE_PROFILE : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
2. UPDATE_PROFILE : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
3. UPDATE_PREFERENCES : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
4. REQUEST_AVATAR : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
5. UPDATE_PRIVACY : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
6. DELETE_ALLOWED_DATA. : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.

## 7. Lectures
1. GET_MY_PROFILE : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
2. GET_PUBLIC_PROFILE : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
3. GET_MY_PREFERENCES : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
4. GET_PROFILE_ACTIVITY : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
5. GET_PROFILE_CREATORS. : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.

## 8. Machine d'état
ABSENT → BOOTSTRAPPING → READY; READY → UPDATE_PENDING → READY ou CONFLICT/ERROR; DISABLED_ACCOUNT terminal.

Aucune transition non documentée ne doit être introduite par le client. Les états persistants et temporaires sont distingués.

## 9. Expérience utilisateur
Profile; Edit; Avatar; Preferences; activity; creations; games played; privacy.

Chaque action visible possède un retour de succès, un état d'attente et une réponse récupérable en cas d'échec. Les écrans mobiles privilégient le contenu primaire et les actions au pouce.

## 10. Comportement du SYSTEM et de l'IA
bio assistance; translation; avatar generation; recommendation de personnalisation, toujours explicite et sans modification d'identité/permission.

Le SYSTEM peut présenter le résultat et suggérer l'étape suivante, mais le module propriétaire garde l'autorité sur la donnée et la mutation. L'IA ne reçoit que le minimum de contexte nécessaire.

## 11. Données
profiles; preferences; privacy; public projection; avatar references.

Pour toute donnée, définir owner, sensibilité, rétention, index, cache, suppression et projection. Les données privées ne sont pas envoyées aux analytics généraux.

## 12. Sécurité
auth user id comme clé; self-write only; public/private projection séparées; blocked users non autorisés.

La sécurité critique est serveur-side. Les champs de rôle, propriétaire, récompense ou statut ne sont pas acceptés comme vérités venant du navigateur.

## 13. Performance
profile card cache public borné; private data user-scoped; pagination activity.

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
création idempotente; handle collision; unauthorized mutation impossible; profil fonctionne sans IA.

Le module n'est DONE que lorsque code, données, autorisations, UX, états de récupération, tests et vérification navigateur sont cohérents.

## 19. Handoff vers la conception technique
La conception technique ci-jointe transforme chacun des points ci-dessus en contrats exécutables, données concrètes, transitions, APIs, tests et runbook d'implémentation.