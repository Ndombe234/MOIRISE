# M02 — PLAYER — CONCEPTION TECHNIQUE APPROFONDIE

## 1. Boundary
M02 owns persistent Player identity, public/private profile projections, preferences, attribution, profile history and personal-data lifecycle. M02 exposes a bounded Player Context to M05/M15.

## 2. Bootstrap
Auth session exists → lookup Player by auth user id → if absent, transaction creates Player + default privacy/preferences → unique handle constraints → emit PLAYER_CREATED.
Operation is idempotent.

## 3. Profile model
PublicProfileProjection never contains private preferences or moderation-only state.
Fields are classified PUBLIC, PLAYER_PRIVATE, SENSITIVE.
Handle uniqueness is case-normalized.
Display names have length and normalization constraints.

## 4. Preferences
Preferences include locale, explicit interests, notification choices, recommendation controls and privacy choices.
A preference update is versioned and emits PLAYER_PREFERENCE_UPDATED.

## 5. Avatar pipeline
REQUEST → policy → upload/generation capability → MIME/content validation → preview → confirmation if required → storage reference → profile update.
Generated avatars keep artifact provenance.
An external provider never receives profile secrets.

## 6. Activity/history
References may point to games, creations, social activities and collections.
History pages are projections with cursor pagination.
Deletion/visibility policies can hide an activity without corrupting unrelated records.

## 7. Player Memory
Memory is separate from profile. It stores only allowed useful context.
Entry: scope, source, sensitivity, confidence, utility, retention, deletion rule.
Private messages are not automatically written here.

## 8. MORISE DNA
DNAEvidence derives from validated outcomes. Example:
successful exploration → exploration evidence;
validated creation → creation evidence.
Evidence has source event, rule version, weight and timestamp.
DNA never infers medical, political, religious, sexual or other sensitive traits.

## 9. Privacy
Per-field visibility policy.
Block/mute references are consumed by M03.
AI requests only receive the minimum permitted projection.
Export/deletion must update caches and memory refs.

## 10. Commands
ENSURE_PLAYER; UPDATE_PROFILE; UPDATE_PREFERENCES; REQUEST_AVATAR; CONFIRM_AVATAR; UPDATE_PRIVACY; REQUEST_DATA_EXPORT; REQUEST_DATA_DELETION.
Every mutation derives actorId from session.

## 11. State
Player ABSENT → BOOTSTRAPPING → ACTIVE.
Account restriction can transition ACTIVE → LIMITED.
Deletion enters DELETION_REQUESTED → DELETING → DELETED/ANONYMIZED according to retention law.

## 12. Concurrency
Profile updates use optimistic versioning.
Handle changes use unique database constraints.
Duplicate avatar requests use idempotency keys.

## 13. Security
Owner write only.
Public projection separate.
No client role field is authoritative.
Signed upload URLs are scoped.
Sensitive fields are excluded from logs.

## 14. Performance
Public profiles can be cached by version.
Private profile remains player-scoped.
Activity uses cursor pagination.
Avatar transformations are asynchronous.

## 15. Events
PLAYER_CREATED; PROFILE_UPDATED; PREFERENCE_UPDATED; AVATAR_CREATED; PRIVACY_UPDATED; PLAYER_DATA_DELETION_REQUESTED; PLAYER_DNA_SIGNAL_RECORDED.

## 16. AI
M15 may assist bio drafting, translation, avatar creation, recommendation preferences and contextual personalization. It cannot change owner, role, privacy or identity without an authorized Player command.

## 17. Tests
Bootstrap idempotency; handle collision; unauthorized profile mutation; privacy projection; avatar validation; delete/export; DNA sensitive-feature rejection; cache invalidation; mobile profile edit.

## 18. DONE
Identity, privacy, profile, avatar, memory boundary and DNA evidence are all server-verifiable.