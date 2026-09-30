# M03 — SYSTEM / Platform Layer — PLAN DE MODULE

## 1. Mission
Transformer l'état de MOIRISE en interface SYSTEM contextuelle : commandes, suggestions, progression visible, accès secondaire et signaux utiles sans spam.

## 2. Périmètre
Le module est propriétaire des comportements explicitement listés dans ce document. Il ne devient pas propriétaire d'une règle appartenant à un autre module simplement parce qu'il l'affiche.

### Inclus
- toutes les commandes : OPEN_SYSTEM, EXECUTE_CONTEXTUAL_COMMAND, DISMISS_SUGGESTION, SNOOZE_CONTEXT, EXPAND_SURFACE, ACCEPT_SUGGESTION.;
- toutes les lectures : GET_SYSTEM_CONTEXT, GET_AVAILABLE_ACTIONS, GET_ACTIVE_PROGRESS, GET_CONTEXTUAL_SUGGESTIONS.;
- tous les événements : SYSTEM_SESSION_STARTED, SYSTEM_CONTEXT_CHANGED, SYSTEM_COMMAND_ACCEPTED, SYSTEM_COMMAND_REJECTED, SYSTEM_SURFACE_SHOWN, SYSTEM_SUGGESTION_DISMISSED.;
- tous les états : CONTEXT_UNAVAILABLE → READY; READY → SUGGESTING → READY; command → EXECUTING → SUCCESS/REJECTED/FAILED.;
- les surfaces UI et comportements décrits plus bas;
- les validations, erreurs, observabilité et tests associés.

### Exclus
Toute règle métier d'un autre propriétaire. Les contrats communs sont référencés dans docs/moirise/transversal/ et ne sont pas recopiés.

## 3. Dépendances
M01, M02.

Le module doit consommer les dépendances par contrats typés. Il ne doit pas importer directement la couche de persistance d'un voisin lorsque le voisin possède un service canonique.

## 4. Acteurs et intentions
Player; SYSTEM runtime; modules propriétaires de données; AI Platform indirectement.

Chaque intention utilisateur est transformée en une commande explicite. Une simple ouverture d'écran ne doit pas être confondue avec une mutation.

## 5. Modèle conceptuel
Entités principales : SystemContext; SystemSurface; SystemCommand; Suggestion; ContextSnapshot; SystemNotificationCandidate; ActiveTaskReference.

Les identifiants de données sont stables et indépendants des libellés d'interface. Les projections d'affichage ne deviennent jamais des sources d'autorité.

## 6. Commandes
1. OPEN_SYSTEM : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
2. EXECUTE_CONTEXTUAL_COMMAND : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
3. DISMISS_SUGGESTION : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
4. SNOOZE_CONTEXT : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
5. EXPAND_SURFACE : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.
6. ACCEPT_SUGGESTION. : valider l'identité, la policy, les préconditions métier, appliquer la mutation idempotente si nécessaire, puis émettre l'événement propriétaire.

## 7. Lectures
1. GET_SYSTEM_CONTEXT : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
2. GET_AVAILABLE_ACTIONS : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
3. GET_ACTIVE_PROGRESS : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.
4. GET_CONTEXTUAL_SUGGESTIONS. : résultat borné, privacy-aware, avec pagination lorsque la cardinalité peut croître.

## 8. Machine d'état
CONTEXT_UNAVAILABLE → READY; READY → SUGGESTING → READY; command → EXECUTING → SUCCESS/REJECTED/FAILED.

Aucune transition non documentée ne doit être introduite par le client. Les états persistants et temporaires sont distingués.

## 9. Expérience utilisateur
HUD/panels/drawers SYSTEM; visual hierarchy; quiet mode; context-aware overlays; mobile drawer.

Chaque action visible possède un retour de succès, un état d'attente et une réponse récupérable en cas d'échec. Les écrans mobiles privilégient le contenu primaire et les actions au pouce.

## 10. Comportement du SYSTEM et de l'IA
AI may propose context, but SYSTEM validates capability, permissions, priority and suppression before display.

Le SYSTEM peut présenter le résultat et suggérer l'étape suivante, mais le module propriétaire garde l'autorité sur la donnée et la mutation. L'IA ne reçoit que le minimum de contexte nécessaire.

## 11. Données
context snapshots; surface state; suggestion history; user suppression preferences.

Pour toute donnée, définir owner, sensibilité, rétention, index, cache, suppression et projection. Les données privées ne sont pas envoyées aux analytics généraux.

## 12. Sécurité
SYSTEM cannot grant permissions; command must route to owner module; sensitive content masked.

La sécurité critique est serveur-side. Les champs de rôle, propriétaire, récompense ou statut ne sont pas acceptés comme vérités venant du navigateur.

## 13. Performance
context aggregation bounded; no full profile/private message hydration by default.

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
contextual actions work; no fake urgency; no spam loop; dismissal respected; owner module executes mutation.

Le module n'est DONE que lorsque code, données, autorisations, UX, états de récupération, tests et vérification navigateur sont cohérents.

## 19. Handoff vers la conception technique
La conception technique ci-jointe transforme chacun des points ci-dessus en contrats exécutables, données concrètes, transitions, APIs, tests et runbook d'implémentation.