# MORISE AI — ACTIONS / TOOLS / CONTRACTS

## Rule

The model selects from explicit actions. It never receives arbitrary program execution.

## Action contract

```ts
interface AIActionDefinition {
  id: AIActionId;
  inputSchema: string;
  outputSchema: string;
  permission: string;
  confirmation: "none" | "user" | "owner";
  resourceClass: "light" | "medium" | "heavy";
}
```

## Core actions

READ_PROFILE
READ_CONTEXT
SEARCH
TRANSLATE
GENERATE_TEXT
GENERATE_IMAGE
GENERATE_VIDEO
GENERATE_MUSIC
GENERATE_AUDIO
CREATE_GAME
RUN_GAME_TEST
CREATE_EVENT
SEND_PRIVATE_MESSAGE
CREATE_POST
PROPOSE_IMPROVEMENT

## Tool execution

`MODEL → ACTION PLAN → POLICY CHECK → TOOL ADAPTER → VALIDATE RESULT`

The model does not directly call:
- database SQL;
- shell;
- filesystem outside sandbox;
- secrets;
- arbitrary HTTP;
- deployment;
- RLS changes.

## Confirmation

Require user confirmation for:
- sending a message when not explicitly requested;
- publishing;
- destructive changes;
- external distribution;
- sensitive data processing.

Require OWNER confirmation for:
- production architecture changes;
- permission changes;
- global policy changes;
- production evolution promotion where configured.

## Idempotency

Actions with external side effects require an idempotency key.

## Output status

```ts
type ActionStatus =
  | "accepted"
  | "running"
  | "completed"
  | "partial"
  | "rejected"
  | "failed"
  | "unavailable";
```

## No fake success

MORISE may only say an action succeeded when the underlying action was verified.
