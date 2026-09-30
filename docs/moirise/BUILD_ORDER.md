# MOIRISE — ORDRE DE CONSTRUCTION CANONIQUE

## Séquence

M01 Foundation
→ M02 Player
→ M03 SYSTEM
→ M13 Moderation
→ M15 Localization
→ M04 Social
→ M05 Messaging
→ M06 Communities
→ M08 Games
→ M11 Progression
→ M12 Events
→ M14 Notifications
→ M07 Discovery
→ M18 Workers
→ M19 AI
→ M09 Game Creation
→ M10 Creative Studio
→ M16 Observability
→ M20 Administration
→ M17 Optional Monetization.

## Pour chaque module

1. Lire le Plan.
2. Lire la Conception technique.
3. Lire les contrats transversaux dont dépend le module.
4. Inspecter le code réel et identifier les divergences.
5. Définir les types et frontières serveur.
6. Définir persistence et authorization.
7. Implémenter les transitions d'état.
8. Implémenter l'UI et les états de récupération.
9. Brancher l'IA par Capability ID uniquement.
10. Ajouter les tests unitaires/intégration.
11. Tester navigateur desktop/mobile.
12. Tester chaque action visible.
13. Tester panne provider/worker et reprise.
14. Vérifier l'absence d'écran blanc.
15. Vérifier accessibilité et performance.
16. Effectuer l'audit de sécurité.
17. Seulement ensuite marquer le module DONE.

## Interdictions

Ne pas créer un second App Router.
Ne pas créer un second cerveau IA dans un module.
Ne pas appeler directement un provider depuis l'UI.
Ne pas dupliquer un contrat transversal.
Ne pas stocker une décision critique uniquement dans localStorage.
