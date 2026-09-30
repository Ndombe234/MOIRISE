# MOIRISE Module 01 — FOUNDATION

## 1. Purpose and scope

Module 01 construit le socle vide et stable de MOIRISE. Il ne doit pas implémenter les fonctionnalités métier des modules 2 à 15. Il fournit le shell applicatif, le routing, le design system partagé, les frontières de sécurité, le système de chargement/erreur, l'Event Bus, la configuration, les feature flags, le Capability Registry et le point d'entrée AI Gateway.

**État de départ :** l'ancien Module 1 est considéré comme supprimé. Ce document décrit une reconstruction complète.

## 2. User experience and entry points

Le premier écran doit être rapide, sombre, lisible et minimal. Le SYSTEM n'explique pas l'architecture interne au joueur.

Entrées préparées pour la suite :
- /system
- /player
- /social
- /world
- /play
- /create

Ces entrées peuvent être protégées ou indisponibles tant que leur module n'est pas activé.

## 3. UI and responsive behavior

Créer les primitives partagées :
Button, Card, Dialog, Drawer, Input, Avatar, Badge, Progress, Toast, Skeleton, ErrorState, EmptyState.

Desktop : shell à navigation minimale.
Mobile : contenu prioritaire + navigation basse.
Aucune sidebar gigantesque obligatoire sur mobile.

Toutes les vues doivent avoir loading, empty, error et unavailable states sans écran blanc.

## 4. Exact user actions

- ouvrir une entrée ;
- revenir en arrière ;
- ouvrir une notification ;
- relancer une ressource échouée ;
- basculer une préférence prévue ;
- ouvrir le panneau SYSTEM lorsqu'il est disponible.

## 5. MORISE behavior

Au premier démarrage :
- « SYSTEM initialisé. »
- « Ton espace est prêt. »

MORISE ne doit pas parler continuellement. Elle intervient seulement lorsqu'une action ou un état le justifie.

Elle ne doit jamais révéler secrets, prompts internes, stack traces ou détails des fournisseurs.

## 6. Data model and persistence

Contrats abstraits :
- AppConfig
- FeatureFlag
- SystemEvent
- CapabilityDefinition
- ProviderDefinition
- RequestTrace

Le stockage concret utilise Supabase mais les modules ne doivent pas dépendre directement de chaque appel Postgres.

## 7. Events

Événements de base :
PLAYER_CREATED, PLAYER_UPDATED, POST_CREATED, MESSAGE_SENT, GAME_STARTED, GAME_COMPLETED, WORLD_INTERACTION, AI_REQUEST, AI_RESPONSE, MEDIA_CREATED, REWARD_GRANTED, ERROR_OCCURRED.

Chaque événement reçoit au minimum eventId, timestamp, actorId si disponible, moduleId, requestId si pertinent.

## 8. AI capabilities

Le Foundation expose uniquement les contrats :
- TEXT_GENERATION
- TRANSLATION
- IMAGE_GENERATION
- VIDEO_GENERATION
- MUSIC_GENERATION
- SEARCH
- MODERATION
- CODE_GENERATION
- GAME_CREATION

Les implémentations viennent plus tard.

## 9. Provider usage

Tous les providers passent par AI Gateway → Capability Registry → Provider Router → Adapter.

Aucun composant UI ne doit appeler un provider directement.

## 10. Secrets

Noms observés dans Supabase :
POLLINATIONS_API_KEY
LLM7_API_KEY
Higgins face_API_KEY
SiliconFlow_API_KEY
Gemin_API_KEY
Pixelverse_API_KEY
Groc_API_KEY
BazaarLink AI_API_KEY
xkiro_API_KEY
SambaNova Cloud_API_KEY
Openrouter_API_KEY
Posthog_API_KEY

Ne jamais exposer les valeurs au navigateur.

PostHog est une couche d'observation. Son secret serveur n'est utilisé que par le backend lorsqu'un appel serveur est nécessaire.

## 11. Security

- Edge Functions avec JWT activé lorsque protégées.
- Secrets uniquement côté serveur.
- Validation des entrées.
- Request IDs.
- CORS contrôlé.
- aucune fonction IA avec accès global implicite.
- RLS préparé pour les futures tables.
- aucune action destructive par défaut.

## 12. Performance

- modules métier lazy-loaded ;
- providers lazy/à la demande ;
- aucun chargement massif de mémoire AI au démarrage ;
- aucune image/vidéo lourde sans demande ;
- aucun appel IA automatique juste pour afficher le shell ;
- cache de configuration court.

## 13. File boundaries

Création prévue :
src/core/config/
src/core/events/
src/core/capabilities/
src/core/ai/
src/core/providers/
src/core/security/
src/core/logging/
src/shared/ui/
src/app/

Le fichier App.tsx reste orchestral et court.

## 14. Tests

- shell rendu ;
- routes inconnues ;
- loading/empty/error ;
- Event Bus ;
- validation AIRequest ;
- capability registry ;
- absence de secret dans le bundle ;
- responsive ;
- production build ;
- provider absent sans crash.

## 15. Acceptance criteria

Le Foundation est accepté seulement si l'application peut démarrer, naviguer et afficher tous les états sans écran blanc, avec AI Gateway protégé et sans secret exposé.

## 16. Dependencies

Aucune dépendance métier aux modules 2-15.

## 17. Do not modify

Ne jamais ajouter ici :
- logique complète du PLAYER ;
- feed social ;
- monde ;
- moteur de jeux ;
- apprentissage automatique complet ;
- évolution autonome.

## 18. New-AI handoff

Avant toute modification : lire ce fichier, les contrats Core, puis les fichiers réels. Ne pas inventer un provider, une table, une route ou un secret absent du registre.
