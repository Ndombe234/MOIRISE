# MOIRISE Module 03 — SOCIAL

## 1. Purpose

Créer le réseau social MOIRISE : publications, feed, réactions, commentaires, abonnements et messagerie privée.

## 2. UI

Surface principale :
FEED
+ contexte
+ composer
+ navigation minimaliste.

Mobile : feed plein écran, actions tactiles.

## 3. User actions

- publier ;
- modifier/supprimer sa publication selon permission ;
- commenter ;
- réagir ;
- suivre/ne plus suivre ;
- partager ;
- rechercher ;
- envoyer un message privé ;
- ouvrir une conversation.

## 4. MORISE

MORISE peut :
- traduire ;
- résumer si demandé ;
- aider à reformuler ;
- proposer des contenus ;
- signaler un risque de modération.

Elle ne doit pas publier ou envoyer un message privé sans action autorisée de l'utilisateur.

## 5. Data

Tables conceptuelles :
profiles
posts
comments
reactions
follows
private_conversations
private_messages
notifications

Chaque table doit avoir RLS appropriée.

## 6. Events

POST_CREATED
POST_UPDATED
COMMENT_CREATED
REACTION_CREATED
FOLLOW_CREATED
MESSAGE_SENT
MESSAGE_READ
NOTIFICATION_CREATED

## 7. AI

Capabilities :
- TRANSLATION ;
- MODERATION ;
- SEARCH ;
- TEXT_ASSISTANCE ;
- RECOMMENDATION.

Traduction prioritairement browser/on-device ou cache local lorsque possible.

## 8. Providers

Provider-neutral. Les providers externes ne doivent jamais être une dépendance critique pour afficher le réseau social.

## 9. Secrets

Aucun secret de provider requis pour les fonctions sociales de base. Les capacités IA utilisent le Gateway.

## 10. Security

- RLS ;
- ownership ;
- conversation membership ;
- contrôle d'accès aux messages ;
- anti-abus ;
- rate limiting ;
- validation du contenu.

Les messages privés ne doivent jamais être envoyés à PostHog comme contenu brut.

## 11. Performance

- pagination ;
- infinite loading contrôlé ;
- images lazy ;
- cache des préférences ;
- pagination des messages ;
- pas de préchargement de toutes les conversations.

## 12. Failure states

Feed indisponible : état récupérable.
Traduction indisponible : texte original.
Moderation indisponible : appliquer la politique fail-safe adaptée.
Pas de données : état empty.

## 13. Tests

- feed ;
- publication ;
- commentaire ;
- réaction ;
- follow ;
- messagerie ;
- RLS ;
- accès conversation ;
- mobile ;
- fournisseur IA absent ;
- réseau offline.

## 14. Acceptance

Le réseau social fonctionne complètement sans IA. L'IA améliore l'expérience mais ne devient pas un point de panne.

## 15. Do not modify

Ne pas placer ici les communautés, événements, jeu, monde adaptatif ou AI Lab.

## 16. New-AI handoff

Toute donnée sociale envoyée à un provider doit respecter minimisation, consentement et filtrage de confidentialité.


---

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



## 17. Canonical implementation runbook

1. Create canonical social tables and keep all private messaging tables separate from public feed projections.
2. Make every post/comment/reaction/follow/message mutation go through an authorization check before persistence.
3. Add clientNonce idempotency for message sends and any retryable social mutation.
4. Implement cursor pagination for feed, comments and message history; never rely on unbounded offset pagination for hot paths.
5. Realtime subscriptions must be scope-filtered to authorized conversations or visible social contexts.
6. Persist before broadcast; realtime delivery is never the source of truth.
7. Enforce block/report restrictions server-side on every affected action.
8. Keep raw private message content out of PostHog and generic analytics.
9. Implement translation as an optional enhancement with original-text fallback.
10. Add moderation as a policy layer that cannot silently delete or rewrite user content without an explicit rule/audit path.
11. Add attachment MIME/size/ownership checks and per-conversation authorization on reads.
12. Test offline send/retry/reconnect, duplicate prevention, ordering, RLS, privacy, block behavior and mobile keyboard layout.

### Canonical server contracts
createPost, editPost, deletePost, addComment, toggleReaction, followPlayer, createConversation, sendMessage, markMessageRead, getConversationPage. All actions must be idempotent where retries are possible.

### Completion proof
Feed and private messaging remain usable with AI/provider availability forced to zero.

## 20. Canonical status

This file is the single authoritative technical specification for this module. Do not create or consult a second _TECHNICAL.md file for implementation.