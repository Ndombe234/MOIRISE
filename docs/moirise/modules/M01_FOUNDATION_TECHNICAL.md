# M01 — FOUNDATION — TECHNICAL CONTRACT

## Purpose
Build the non-negotiable application foundation. M01 owns runtime boot, configuration, global error handling, routing shell, design tokens, localization bootstrap, accessibility baseline and observability bootstrap. It does not own social, games or AI behavior.

## Source of truth
`docs/moirise/MASTER_REBUILD_V2.md` → module order and boundaries.

## File map
- `app/layout.tsx`: root shell only.
- `app/globals.css`: tokens/reset only.
- `lib/config/*`: validated public configuration.
- `lib/i18n/*`: locale registry and fallback.
- `components/system/*`: shared SYSTEM shell primitives.
- `lib/observability/*`: PostHog/event adapter; no business logic.
- `app/error.tsx`, `app/not-found.tsx`: recovery UI.

## Core types
```ts
export type Locale = "fr"|"en"|"hi"|"es"|"de"|"it"|"pt"|"ar"|"ja"|"ko"|"ru"|"tr"|"id"|"th"|"vi"|"pl"|"nl"|"ro"|"bn"|"ur";
export interface AppConfig { locale: Locale; environment: "development"|"preview"|"production"; featureFlags: Record<string,boolean>; }
```

## Boot sequence
`config → auth/session hydration → locale → theme tokens → shell → route → feature module`.
A failed optional provider must degrade only its feature; it must never blank the whole application.

## UI contract
Exactly one global shell. Desktop: sidebar. Mobile: bottom navigation. Main navigation exposes only the canonical 5–6 doors. Secondary features are contextual SYSTEM actions.

## Performance
Lazy-load feature modules, games and media. Never import heavy game engines or media libraries from the root layout. Use route-level code splitting. Define loading skeletons for every async surface.

## Security
No secret is read by client code. Public configuration is explicitly allow-listed. Server-only secrets stay server-side. Every API route validates input and authenticated context.

## Observability
Emit stable event names: `app_boot`, `route_view`, `error_boundary`, `feature_degraded`. Never send private message bodies, provider secrets or raw personal content to analytics.

## Tests
- config validation;
- locale fallback;
- route boot;
- error boundary;
- mobile shell;
- no-JS/degraded provider behavior;
- build/typecheck;
- no blank screen after navigation.

## Done gate
M01 is complete only when the application boots on mobile and desktop, every primary route resolves, failures render recovery UI, and heavy features are lazy-loaded.