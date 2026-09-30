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