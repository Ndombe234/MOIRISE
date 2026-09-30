# MOIRISE — PLAN MAÎTRE COMPLET

Version: 2.0 — consolidation exhaustive

## Source de vérité
Ce document fixe la vision globale, les responsabilités canoniques, les dépendances et les invariants. Les conceptions techniques des modules sont séparées et ne doivent pas être remplacées par ce résumé.

## Vision
MOIRISE est une plateforme sociale, créative et ludique dans laquelle le SYSTEM est la couche d'interaction transverse. Le produit n'est ni un simple quiz ni un réseau social auquel on ajoute un mini-RPG. Social, création, jeux 2D/3D, découverte, progression et IA forment un même système.

## Principes non négociables
- Une règle métier possède une source canonique.
- Les modules communiquent par contrats.
- Les permissions sont autoritaires côté serveur.
- Les opérations critiques sont idempotentes.
- Les sorties asynchrones sont récupérables.
- Les Community Workers sont opt-in et isolés.
- L'IA ne peut pas s'accorder elle-même des permissions.
- Une fonctionnalité n'est terminée que lorsque comportement, erreurs, sécurité et tests sont définis.
- Pas de fausse urgence, faux événements, faux compteurs ou friction artificielle.
- Toute promesse de suite ou de retour correspond à une vraie condition future.

## Modules canoniques
M01 Foundation / Identity Boundary
M02 Player Identity & Profile
M03 SYSTEM / Platform Layer
M04 Social Feed / Posts
M05 Messaging / Communication
M06 Communities / Groups / Clans
M07 Discovery / Recommendation / Otaku Content
M08 Games & Quiz Platform
M09 Game Creation
M10 Creative Studio
M11 Progression / Rewards / Titles / Collection
M12 Events / Activities
M13 Moderation / Trust & Safety
M14 Notifications / Engagement Context
M15 Localization / Internationalization
M16 Observability / Analytics
M17 Monetization
M18 Distributed Workers
M19 AI Platform
M20 Administration / Operations

## Responsabilités critiques
M03 possède le SYSTEM transverse.
M07 possède découverte/recommandation et métadonnées anime/manga.
M08 possède consommation des jeux 2D/3D et quiz.
M09 possède la création de jeux 2D/3D assistée par IA.
M10 possède la création image/vidéo/audio/musique/texte.
M11 possède XP, niveaux, titres, achievements, collections, gacha/roulette et récompenses validées.
M12 possède les événements et continuations réelles.
M14 possède les notifications et rappels.
M18 possède le calcul distribué et les workers.
M19 possède l'orchestration IA, mais ne possède pas les faits métier des autres modules.

## Parcours utilisateur
Arrivée → orientation → première valeur → découverte → participation → création/connexion → continuité → retour réel → maîtrise.

Pendant les deux premières minutes, le comportement peut être adaptatif : entrée claire, activité immédiatement compréhensible, révélation progressive, observation de la réaction et proposition d'une suite cohérente. Une continuation pour demain doit être un véritable état futur ou événement planifié, jamais une invention de l'IA.

## Ordre de construction
M01 → M02 → M03 → M13/M15 → M04/M05 → M06 → M08 → M11/M12/M14 → M07 → M18 → M19 → M09/M10 → M16 → M20 → M17.

## Règle de cohérence
Une conception de niveau inférieur ne peut pas silencieusement contredire le Master Plan ou un contrat canonique. Toute contradiction remonte au niveau de vérité approprié, est résolue, puis propagée aux dépendants et aux tests.
