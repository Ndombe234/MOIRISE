# M02 — PLAYER — CONCEPTION TECHNIQUE

## Data boundary
Player/auth user is canonical identity. PublicProfile is a projection. PlayerPreferences and PrivacySettings are private.

## Commands
ENSURE_PLAYER is idempotent. UPDATE_PROFILE, UPDATE_PREFERENCES, UPDATE_PRIVACY and DELETE_ALLOWED_DATA derive actorId from session. GENERATE_AVATAR creates a durable AI task; confirmation is a separate mutation.

## MORISE DNA
Persist evidence, not sensitive inference. DNA update = validated event + rule/version + evidence refs. A model suggestion never writes DNA directly.

## State
ABSENT → BOOTSTRAPPING → READY. Avatar REQUESTED → GENERATING → VALIDATING → PREVIEW → CONFIRMED/REJECTED.

## Security
Self-write only; public projection excludes private fields; signed media URLs; deletion policy; block/mute respected by consuming modules.

## Cache
Public profile projection can cache; private profile is player-scoped. Avatar generation result is isolated per player.

## Tests
Auth ownership, handle collision, duplicate bootstrap, privacy projection, deletion, avatar validation, provider unavailable, mobile profile/edit.

## DONE
Player identity remains stable even if M15 or any external provider is unavailable.
