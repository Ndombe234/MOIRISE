# M01 — Foundation / Identity Boundary — PLAN DE MODULE

## 1. Mission
Construire le socle runtime fiable de MOIRISE : bootstrap, configuration, session, routing, shell partagé, erreurs, événements, feature flags et frontières de sécurité.

## 2. Périmètre
Le module est propriétaire des comportements explicitement listés dans ce document. Il ne devient pas propriétaire d'une règle appartenant à un autre module simplement parce qu'il l'affiche.

### Inclus
- toutes les commandes : BOOT_APPLICATION, RESTORE_SESSION, SIGN_OUT, OPEN_ROUTE, RETRY_RESOURCE, TOGGLE_ALLOWED_PREFERENCE, REGISTER_FEATURE_FLAG_OVERRIDE.;
- toutes les lectures : GET_RUNTIME_CONFIG, GET_ROUTE_META, GET_SESSION, GET_FEATURE_FLAGS, GET_HEALTH.;
- tous les événements : APPLICATION_BOOT_STARTED, APPLICATION_READY, SESSION_RESTORED, SESSION_EXPIRED, FEATURE_FLAG_CHANGED, ERROR_OCCURRED.;
- tous les états : COLD → BOOTING → CONFIGURED → SESSION_RESTORING → READY; READY → DEGRADED; toute étape peut → FATAL_SHELL_ERROR avec récupération.;
- les surfaces UI et comportements décrits plus bas;
- les validations, erreurs, observabilité et tests associés.

### Exclus
Toute règle métier d'un autre propriétaire. Les contrats communs sont référencés dans docs/moirise/transversal/ et ne sont pas recopiés.

## 3. Dépendances
aucun module métier; consomme uniquement les primitives du runtime et du fournisseur d'identité configuré.

Le module doit consommer les dépendances par contrats typés. Il ne doit pas importer directement la couche de persistance d'un voisin lorsque le voisin possède un service canonique.

## 4. Acteurs et intentions
visiteur non authentifié; Player authentifié; administrateur; runtime; adaptateurs d'identité.

Chaque intention utilisateur est transformée en une commande explicite. Une simple ouverture d'écran ne doit pas être confondue avec une mutation.

## 5. Modèle conceptuel
Entités principales : AppConfig; RouteMeta; Session; FeatureFlag; SystemEvent; RequestTrace; CapabilityDefinition; AppError.

Les identifiants de données sont stables et indépendants des libellés d'interface. Les projections d'affichage ne deviennent jamais des sources d'autorité.

## 6. Commandes
1. BOOT_APPLICATION : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
2. RESTORE_SESSION : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
3. SIGN_OUT : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
4. OPEN_ROUTE : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
5. RETRY_RESOURCE : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
6. TOGGLE_ALLOWED_PREFERENCE : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
7. REGISTER_FEATURE_FLAG_OVERRIDE. : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.

## 7. Lectures
1. GET_RUNTIME_CONFIG : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
2. GET_ROUTE_META : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
3. GET_SESSION : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
4. GET_FEATURE_FLAGS : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
5. GET_HEALTH. : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.

## 8. Machine d'état
COLD → BOOTING → CONFIGURED → SESSION_RESTORING → READY; READY → DEGRADED; toute étape peut → FATAL_SHELL_ERROR avec récupération.

Aucune transition non documentée ne doit être introduite par le client. Les états persistants et temporaires sont distingués.

## 9. Expérience utilisateur
Shell desktop minimal; navigation mobile basse; loading/error/not-found boundaries; primitives Button/Card/Dialog/Drawer/Input/Toast/Skeleton/Empty/Error.

Chaque action visible possède un retour de succès, un état d'attente et une réponse récupérable en cas d'échec. Les écrans mobiles privilégient le contenu primaire et les actions au pouce.

## 10. Comportement du SYSTEM et de l'IA
Aucun appel IA pendant le boot normal. Expose seulement les contrats Capability et AI Gateway; l'IA peut ensuite utiliser le shell comme surface.

Le SYSTEM peut présenter le résultat et suggérer l'étape suivante, mais le module propriétaire garde l'autorité sur la donnée et la mutation. L'IA ne reçoit que le minimum de contexte nécessaire.

## 11. Données
configuration validée; session; flags; route registry; event envelopes; traces.

Pour toute donnée, définir owner, sensibilité, rétention, index, cache, suppression et projection. Les données privées ne sont pas envoyées aux analytics généraux.

## 12. Sécurité
aucun secret navigateur; session serveur autoritaire; config publique explicitement allow-listée; admin routes server-authorized.

La sécurité critique est serveur-side. Les champs de rôle, propriétaire, récompense ou statut ne sont pas acceptés comme vérités venant du navigateur.

## 13. Performance
boot sans appel IA obligatoire; lazy routes; configuration courte et cacheable.

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
boot stable; deep links; auth redirect; erreur isolée sans écran blanc; desktop/mobile; aucune clé secrète dans le bundle.

Le module n'est DONE que lorsque code, données, autorisations, UX, états de récupération, tests et vérification navigateur sont cohérents.

## 19. Handoff vers la conception technique
La conception technique ci-jointe transforme chacun des points ci-dessus en contrats exécutables, données concrètes, transitions, APIs, tests et runbook d'implémentation.