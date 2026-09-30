# M01 — FOUNDATION — TECHNICAL DESIGN

## Boundary
M01 owns application boot, routing shell, theme system, localization foundation, error boundaries, loading states, configuration loading and shared UI primitives. It does not own player data, social data, games or AI internals.

## Runtime
React + TypeScript + Vite. Tailwind is the styling layer. Supabase/Firebase access is isolated behind typed data services. No provider URL or secret is embedded in UI code.

## Primary navigation
Keep the product to 5–6 permanent doors: Home, Discover, Play, Communities, Create, Profile. Private messages are contextual and first-class, reachable from profile/notifications/message surfaces, not another permanent global button.

## Core modules
`AppShell`, `Router`, `SystemOverlay`, `BottomNav`, `DesktopSidebar`, `LoadingBoundary`, `ErrorBoundary`, `I18nProvider`, `ThemeProvider`, `ToastHost`.

## Types
```ts
interface AppConfig { version:string; environment:"dev"|"staging"|"prod"; defaultLocale:string; supportedLocales:string[]; }
interface RouteMeta { id:string; path:string; auth:"public"|"user"|"admin"; primary:boolean; }
interface AsyncState<T> { status:"idle"|"loading"|"success"|"error"; data?:T; error?:string; }
```

## State rules
Global state only for session, locale, theme, notifications and SYSTEM status. Feature state stays local to its module. Never duplicate the same entity in multiple global stores.

## UI rules
Mobile-first. One shared shell. Dark glassmorphism. Secondary actions appear contextually in panels/drawers/modals. No page creates a new permanent navigation button without changing the master contract.

## Performance
Lazy-load module routes; dynamic import heavy game/media/AI screens; virtualize long lists; avoid global rerenders; cache static translations and icons.

## Security
Route guards are UX only; server authorization remains authoritative. Never expose private credentials in Vite client variables. Sanitize user-generated HTML/markdown.

## Failure states
Every async surface has loading, empty, error, retry and unavailable states. A module failure must not blank the whole application.

## Tests
boot, route guards, deep links, mobile navigation, desktop navigation, locale switching, persistence, error boundary recovery, lazy-route loading and no-blank-screen regression.

## Done gate
Production build succeeds, every primary door resolves, deep links work, mobile/desktop shells are stable, and an isolated feature failure does not destroy the shell.