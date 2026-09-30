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


---

# M01 — FOUNDATION — COMPLETE TECHNICAL CONTRACT

## 1. Responsibility
M01 is the application shell. It owns boot, routing, shared providers, localization, theme, global notifications, loading/error boundaries and shared UI primitives. It does not own player, social, game, provider or AI business logic.

## 2. Stack contract
React + TypeScript + Vite + Tailwind. Keep backend access behind typed services. Do not import provider SDKs into UI modules. No secret is exposed through `VITE_*` variables.

## 3. Directory contract
`src/app/AppShell.tsx` — shell composition.
`src/app/router.tsx` — route table.
`src/app/providers/*` — session/locale/theme/SYSTEM providers.
`src/app/states/*` — loading/error/empty state primitives.
`src/components/system/*` — reusable SYSTEM UI.
`src/lib/config.ts` — validated public configuration.
`src/lib/i18n/*` — locale loading and fallback.

## 4. Primary navigation
Exactly 5–6 permanent doors: Home, Discover, Play, Communities, Create, Profile. Private messages are a first-class contextual surface and do not become a seventh permanent door. Secondary features are opened through SYSTEM panels, drawers, tabs or contextual actions.

## 5. Boot sequence
`HTML → React mount → config validation → providers → session restore → locale load → router → shell → route module lazy-load`.

If configuration fails, render a diagnostic state. If one feature fails, preserve the shell.

## 6. Canonical types
```ts
interface AppConfig { version:string; environment:'dev'|'staging'|'prod'; defaultLocale:string; supportedLocales:string[]; }
interface RouteMeta { id:string; path:string; auth:'public'|'user'|'admin'; primary:boolean; }
interface AsyncState<T> { status:'idle'|'loading'|'success'|'error'; data?:T; error?:string; }
```

## 7. Route rules
Primary routes are stable and deep-linkable. Unknown routes render a recoverable 404 inside the shell. Auth redirects preserve the intended destination. Admin routes require server authorization; client guards are only UX.

## 8. Global state
Global state may contain session identity, locale, theme, notification count and SYSTEM shell state. Feature entities remain local to their module/cache. One entity must have one canonical cache key and source.

## 9. UI rules
Mobile-first. Dark glassmorphism. Keep permanent controls sparse. Long operations use a progress/status surface rather than adding buttons. System overlays must be dismissible unless security-critical.

## 10. Failure contract
Every async feature exposes loading, empty, error, retry, unavailable and degraded states. Never throw an uncaught feature error into the root. Root error boundary offers recovery without losing navigation state.

## 11. Performance
Lazy-load routes. Dynamically load game engines, heavy media tooling and AI Lab. Virtualize long feeds. Avoid global context updates on high-frequency feature state. Preload only the next likely route.

## 12. Security
Sanitize rendered user content. Do not trust route parameters, local storage or client role fields. Never place Supabase service-role keys or provider master keys in the browser.

## 13. Tests
Boot; deep links; auth redirects; route preservation; locale fallback; theme persistence; mobile/desktop navigation; error-boundary recovery; lazy loading; no-blank-screen regression; keyboard focus; reduced-motion behavior.

## 14. Done gate
Build/typecheck/lint pass, all six doors resolve, deep links work, mobile and desktop shells are stable, secondary features remain contextual, and an isolated module failure cannot destroy the application shell.



## 19. Canonical implementation runbook

Repository reality: the current repository is Next.js 16.3.6 + React 19.3.0 + TypeScript 7 + Supabase SSR/JS. This supersedes any older Vite wording. Do not create a second application root.

### Exact construction
1. Keep the existing root app/ as the Next.js App Router root.
2. Keep src/ for non-route shared code only; do not create a second src/app route tree.
3. Define the shell in app/layout.tsx and keep route composition in the App Router.
4. Create typed core folders for config, events, capabilities, AI gateway, security, logging and shared UI.
5. Define a single route metadata table and use it for navigation, auth intent preservation and analytics names.
6. Define one AsyncState<T> / state-machine convention used by every later module.
7. Define one SystemEvent contract with eventId, eventType, occurredAt, actorId, moduleId, requestId, schemaVersion and safe metadata.
8. Define one CapabilityDefinition registry entry shape. Module code asks for a capability; it never selects a provider.
9. Add root loading/error/not-found recovery so no child failure can blank the whole shell.
10. Add accessibility primitives: visible focus, keyboard navigation, semantic buttons/links, reduced-motion behavior and dialog focus trapping.
11. Keep all provider secrets server-only; public runtime config may contain only non-sensitive configuration explicitly listed as public.
12. Add CI gates for typecheck, test, lint and next build.

### Canonical routes
/, /home, /discover, /play, /communities, /create, /profile, /system plus protected admin surfaces later. Private messaging remains contextual.

### M01 completion proof
The module is complete only after a browser check confirms every primary route, deep link, auth redirect, loading/error/empty state and mobile shell works, and a production build succeeds.

## 20. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.