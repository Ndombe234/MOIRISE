# M03 — SOCIAL + PRIVATE MESSAGING — TECHNICAL DESIGN

## Boundary
M03 owns feed/posts/comments/reactions/follows and one-to-one private messaging. Group/community membership belongs to M11.

## Data
`posts`, `post_media`, `comments`, `reactions`, `follows`, `conversations`, `conversation_members`, `messages`, `message_reads`, `message_attachments`.

## Types
```ts
interface Message { id:string; conversationId:string; senderId:string; body:string; createdAt:string; clientNonce:string; status:"pending"|"sent"|"failed"; }
interface Conversation { id:string; memberIds:string[]; updatedAt:string; lastMessageId?:string; }
```

## Messaging invariants
Only conversation members may read/write messages. Sender identity comes from authenticated session, never from client-supplied `senderId`. `clientNonce` prevents duplicate sends after retries.

## Feed
Use cursor pagination, not offset pagination. Media is referenced by IDs/URLs with bounded metadata. Mutations are server-authorized and idempotent where retried.

## Realtime
Realtime subscriptions are scoped by user/conversation. Disconnects move pending messages to retry state. Never assume delivery from a successful websocket send; persist server acknowledgement.

## AI boundary
AI may translate, summarize or assist composition only through capabilities. AI never reads private messages unless the user explicitly invokes an action whose authorization permits the exact conversation data. Provider prompts must be minimized and not retain secrets.

## UI
Feed is part of Home. Private messages are accessible from message icon/contextual profile actions and have a dedicated screen/drawer, but are not a seventh permanent navigation door.

## Security
RLS/authorization for every table; attachment MIME/size validation; rate limits; block/report checks; message access audit for privileged tooling.

## Tests
message authorization, duplicate send, offline retry, read receipts, pagination, reaction idempotency, block behavior, private-media access, realtime reconnect and notification deep links.

## Done gate
Users can publish, interact, privately message and recover from network failures without cross-user data leakage.