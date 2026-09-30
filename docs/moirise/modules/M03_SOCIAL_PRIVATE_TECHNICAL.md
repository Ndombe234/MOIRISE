# M03 — SOCIAL + PRIVATE MESSAGING — COMPLETE TECHNICAL CONTRACT

## Responsibility
M03 owns feed/posts/comments/reactions/follows and one-to-one private messaging. Communities/group membership are M11.

## Data
`posts`, `post_media`, `comments`, `reactions`, `follows`, `conversations`, `conversation_members`, `messages`, `message_reads`, `message_attachments`, plus notification references.

## Types
```ts
interface Message { id:string; conversationId:string; senderId:string; body:string; createdAt:string; clientNonce:string; status:'pending'|'sent'|'failed'; }
interface Conversation { id:string; memberIds:string[]; updatedAt:string; lastMessageId?:string; }
interface Post { id:string; authorId:string; body:string; visibility:'public'|'followers'|'private'; createdAt:string; }
```

## Feed pipeline
`query → authorization filter → cursor retrieval → moderation/status filter → render`. Use cursor pagination. Never expose private records through search or cached pages.

## Private message pipeline
`compose → local validation → clientNonce → send → server auth → persist → acknowledgement → realtime fan-out → read state`.
Sender identity comes from the authenticated session. A client-provided sender ID is ignored.

## Retry/idempotency
`clientNonce` is unique per sender/conversation retry window. Duplicate requests return the existing message rather than creating a second message.

## Realtime
Subscribe only to conversations the authenticated user belongs to. Persist before broadcast. Websocket delivery is not proof of persistence. On disconnect, reload the authoritative cursor and reconcile pending messages.

## Attachments
Validate MIME, size, ownership and access before storing. Private attachments require conversation authorization on every retrieval. Never place storage master credentials in the browser.

## Block/report
Before every social mutation or message send, evaluate current block/report restrictions server-side. A blocked relationship must override client UI state.

## AI boundary
AI can translate, summarize or assist composition only after explicit user action and only with the minimum permitted content. AI cannot silently inspect private conversations, delete messages, change privacy or impersonate a sender.

## UI
Feed belongs to Home. Messages are first-class but contextual: message icon, profile action, notification deep-link and dedicated message screen/drawer. Do not add a seventh permanent navigation door.

## Tests
RLS; unauthorized read/write; duplicate sends; offline retry; realtime reconnect; message ordering; read receipts; attachment privacy; block behavior; cursor pagination; reaction idempotency; notification deep links; mobile keyboard behavior.

## Done gate
Social interaction and private messaging remain recoverable, permission-correct and independent of AI/provider availability.