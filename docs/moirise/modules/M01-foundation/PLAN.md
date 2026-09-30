# M01 — FOUNDATION — PLAN CANONIQUE

## Mission
Construire le socle invisible de MOIRISE : shell, routing, design system, auth boundary, erreurs, événements, configuration, capabilities et point d'entrée de l'IA.

## Portes
Le Foundation prépare les six portes : SYSTEM, PLAYER, SOCIAL, WORLD, PLAY, CREATE.

## Fonctionnalités détaillées
1. Application shell : monte l'application, les providers globaux et les boundaries sans contenir la logique métier.
2. Routing : connaît uniquement les points d'entrée; une capability interne ne crée pas automatiquement une route.
3. Design System : Button, Card, Dialog, Drawer, Input, Avatar, Badge, Progress, Toast, Skeleton, ErrorState, EmptyState.
4. Responsive : base commune mobile/tablette/desktop.
5. Loading/empty/error/unavailable/degraded : aucune panne ne produit un écran blanc.
6. Event Bus : eventId/eventType/schemaVersion/moduleId/actorId/requestId.
7. Capability Registry : TEXT, TRANSLATION, IMAGE, VIDEO, MUSIC, SEARCH, MODERATION, CODE, GAME et extensions.
8. AI Gateway : aucune UI n'appelle directement un provider.
9. Provider Registry : identité, capacités, health, policy.
10. Feature Flags : activation progressive.
11. Storage abstraction : services partagés plutôt que duplication.
12. Observability : requestId, traceId, latency, outcome.
13. Security : secrets côté serveur, validation et autorisation serveur.
14. Lazy loading : modules lourds, media et AI à la demande.
15. Health : état sûr du runtime et des dépendances.

## Flux
BOOT → CONFIG → SESSION RESTORE → ROUTE RESOLUTION → READY. Une dépendance optionnelle en panne donne READY/DEGRADED; une panne du shell donne une erreur récupérable.

## Règles
Foundation fonctionne sans IA. Aucun appel modèle n'est requis pour afficher le shell. Les secrets réels ne figurent jamais dans la documentation.

## DONE
Boot stable, routes stables, états de récupération, Event Bus testé, Capability Registry testé, AI Gateway sécurisé, responsive validé, build et tests passés.
