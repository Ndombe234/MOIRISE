# M03 — SOCIAL + PRIVATE MESSAGING — CONCEPTION TECHNIQUE APPROFONDIE

## 1. Boundary
M03 owns public/social content and one-to-one/private messaging. It is the privacy boundary for conversations.

## 2. Feed
Feed query pipeline:
visibility filter → block/mute filter → moderation filter → ranking/projection → pagination.
No fake users, counts or popularity.

Posts support text and validated media references.
Post lifecycle: DRAFT → PUBLISHED → EDITED → DELETED/ARCHIVED.

## 3. Interactions
Reaction commands are idempotent by actor + target + reaction type.
Comments use bounded depth and pagination.
Shares create share references; they do not duplicate private content.

## 4. Private conversations
Conversation creation verifies participant policy.
Message send checks membership, block state, abuse/rate policy, attachment constraints and idempotency.
Read receipts and presence are scoped to conversation members.

Message state:
COMPOSING → SENT → DELIVERED → READ.
Failed delivery is retriable; duplicate clientMessageId returns prior proof.

## 5. Attachments
Validate MIME/magic bytes, size, ownership and malware/content scanning where available.
Use signed scoped URLs.
Attachment metadata excludes private URL tokens from analytics.

## 6. Translation
Source message remains canonical.
Translation view = source + target locale + translation policy version.
Cache key uses source hash, locale and policy version.
NoTranslate markers protect handles, URLs, code, IDs and names.

## 7. Moment Cards
A validated game result, creation or discovery can become a Moment.
Moment projection strips private data.
Share token references public/authorized source and cannot mutate it.
The recipient can open the relevant experience without exposing private state.

## 8. Commands
CREATE_POST; EDIT_POST; DELETE_POST; REACT; COMMENT; SHARE; CREATE_CONVERSATION; SEND_MESSAGE; EDIT_MESSAGE; DELETE_MESSAGE; MARK_READ; SET_PRESENCE; TRANSLATE_MESSAGE.
Every mutation is authenticated and rate-limited.

## 9. Security
Private messages do not enter normal logs, recommendations or World Memory automatically.
Block/mute are enforced before display.
Moderation access to private content requires explicit M13 policy and audit.

## 10. AI
AI may help drafting, translation, social discovery and community candidate detection using allowed public/non-sensitive context.
AI cannot infer sensitive relationships or expose another person's private conversation.

## 11. Persistence
Tables:
posts;
post_media_refs;
comments;
reactions;
follows;
conversations;
conversation_members;
messages;
read_receipts;
presence;
share_tokens;
translation_cache.

Use RLS/policy per owner/member relationship.

## 12. Realtime
Use realtime only where value is clear: message delivery, typing/presence. Throttle presence. Reconnect reconciles from source of truth.

## 13. Observability
Track counts/latency/outcome, not raw private content.

## 14. Tests
Visibility matrix; blocked user; private message access; duplicate send; reconnect; attachment validation; translation cache; share token privacy; mobile keyboard; loading/error states.

## 15. DONE
Social and private messaging behave as one coherent product surface and remain useful without AI availability.