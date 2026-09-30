# M03 — SOCIAL + PRIVATE MESSAGING — TECHNICAL CONTRACT

## Boundary
M03 owns feed interactions, posts/comments/reactions and one-to-one private messaging. It does not own communities, events or AI memory.

## Data
`posts(id,author_id,body,media_refs,visibility,created_at,updated_at)`
`comments(id,post_id,author_id,body,created_at)`
`reactions(user_id,post_id,type,created_at)`
`conversations(id,created_at)`
`conversation_members(conversation_id,user_id)`
`messages(id,conversation_id,sender_id,body,media_refs,created_at,edited_at)`
`message_receipts(message_id,user_id,read_at)`

## Contracts
```ts
interface FeedQuery { cursor?:string; limit:number; }
interface SendMessageInput { conversationId:string; body:string; mediaRefs?:string[]; clientMessageId:string; }
interface Message { id:string; conversationId:string; senderId:string; body:string; createdAt:string; editedAt?:string; }
```

## Private messages
A conversation is valid only when the authenticated user is a member. Message insertion checks membership server-side. RLS prevents cross-conversation reads. `clientMessageId` prevents duplicate sends.

## UI
Messages are accessible from Profile, notifications and contextual SYSTEM actions. Do not add a seventh permanent navigation button just for messages. Mobile uses a dedicated full-screen conversation route; desktop can use a split-pane surface.

## Realtime
Use realtime subscriptions only for the active conversation/feed surface. Unsubscribe on route change. Persist messages before acknowledging success.

## Moderation
Never send all private messages to an external AI provider automatically. Moderation is policy-driven, minimal-data and auditable.

## Tests
RLS membership, send/read/edit/delete, duplicate message prevention, blocked user behavior, realtime reconnect, pagination, offline retry, mobile keyboard behavior.

## Done gate
Two users can exchange private messages securely, refresh without losing state, reconnect after network loss, and never read another user's conversation.