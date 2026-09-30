# M05 — SYSTEM — TECHNICAL CONTRACT

## Boundary
M05 owns the visible MORISE SYSTEM presentation and command coordination. It is not the AI core; it consumes typed capabilities from the AI subsystem.

## Core interfaces
```ts
interface SystemAction { id:string; label:string; icon:string; capability:string; priority:number; visible:boolean; }
interface SystemNotice { id:string; severity:"info"|"success"|"warning"|"error"; title:string; body?:string; expiresAt?:string; }
interface SystemCommand { commandId:string; actorId:string; capability:string; input:unknown; idempotencyKey:string; }
```

## Coordinator
`SystemCoordinator` maps contextual user intent to a capability request. It may open a modal, route, drawer or action sheet. It must never create arbitrary navigation buttons at runtime.

## UI constraints
5–6 permanent main doors only. Secondary actions appear contextually. SYSTEM visuals use the project's dark/glass/neon language but remain readable and calm. Notifications are deduplicated by `notice.id` and throttled.

## Security
Every command is authorized twice: UI visibility is not authorization; server/capability layer enforces permission.

## Tests
Action registry, authorization, duplicate commands, notice throttling, route transitions, keyboard/mobile behavior, failure fallback.

## Done gate
SYSTEM can coordinate features without duplicating feature logic and without turning the site into a button-heavy dashboard.