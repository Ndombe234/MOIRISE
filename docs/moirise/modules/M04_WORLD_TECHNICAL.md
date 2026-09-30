# M04 — WORLD — TECHNICAL CONTRACT

## Boundary
M04 defines the contextual MOIRISE world: player-facing states, discovery context, system notifications and world surfaces. It does not implement the AI brain or game runtime.

## State
```ts
interface WorldContext { locale:string; playerId:string; currentRoute:string; activeEntities:string[]; activeEvents:string[]; systemMode:"calm"|"active"|"alert"; }
```
World context is derived, short-lived state. It must not become a second memory database.

## UI
The SYSTEM layer is elegant and contextual: status panels, alerts, missions/prompts and contextual actions. Never flood the user with repeated SYSTEM text. Persistent navigation remains 5–6 primary doors.

## Data flow
`route/player state → WorldContextBuilder → SystemPresenter → UI`.
The builder may request AI suggestions through the AI capability interface but never calls a provider directly.

## Performance
World context is memoized per route/session and invalidated only when relevant state changes. Avoid polling; use events/subscriptions.

## Tests
Context derivation, route transitions, stale context invalidation, mobile rendering, alert throttling, degraded AI behavior.

## Done gate
World presentation remains coherent while social, games and AI features can fail independently.