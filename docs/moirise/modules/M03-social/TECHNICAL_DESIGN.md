# M03 — SOCIAL — CONCEPTION TECHNIQUE

## Write pipeline
Session → authorization → content schema → ownership/membership → mutation → event → projection.

## Private messaging
Conversation membership is checked server-side on every read/write. Message SEND uses an idempotency key. Read windows are paginated. Attachments require owner/recipient authorization and signed access.

## Translation
Source text remains canonical. Translation cache key = source hash + target locale + policy version. Protected names/handles/IDs are marked noTranslate.

## AI boundary
M15 receives only the context authorized for the requested capability. Provider output is treated as untrusted content. Social remains usable without AI.

## State
Conversation ACTIVE/ARCHIVED. Message COMPOSING → SENT → DELIVERED/READ or FAILED/RETRYING. Failed translation falls back to source text.

## Security
RLS/membership, block/mute filters, anti-spam/rate limits, no private message content in generic telemetry.

## Tests
Feed/post/comment/reaction/follow/share; private access matrix; duplicate-send; reconnect; translation fallback; attachment authorization; mobile keyboard.
