# CATALOGUE D'ÉVÉNEMENTS

Les événements sont stables, versionnés et consommables par plusieurs modules.

## Identity
PLAYER_CREATED
PLAYER_PROFILE_UPDATED
PLAYER_PREFERENCES_UPDATED

## SYSTEM
SYSTEM_SESSION_STARTED
SYSTEM_COMMAND_ACCEPTED
SYSTEM_COMMAND_REJECTED
SYSTEM_CONTEXT_CHANGED

## Social
POST_CREATED
POST_UPDATED
POST_DELETED
POST_REACTED
POST_COMMENTED
POST_SHARED

## Messaging
CONVERSATION_CREATED
MESSAGE_SENT
MESSAGE_READ
PRESENCE_CHANGED

## Communities
COMMUNITY_CREATED
COMMUNITY_JOINED
COMMUNITY_LEFT
ROLE_CHANGED

## Games
GAME_STARTED
GAME_COMPLETED
GAME_RESULT_VALIDATED
GAME_SAVED

## Creation
GAME_BUILD_STARTED
GAME_BUILD_VALIDATED
ARTIFACT_CREATED
ARTIFACT_VERSIONED

## Progression
XP_GRANTED
LEVEL_CHANGED
TITLE_UNLOCKED
ACHIEVEMENT_UNLOCKED
REWARD_GRANTED
COLLECTION_UPDATED
ROULETTE_PULL_RESOLVED

## Events
EVENT_PUBLISHED
EVENT_JOINED
EVENT_COMPLETED
EVENT_CONTINUATION_SCHEDULED

## Safety
REPORT_CREATED
MODERATION_DECISION
USER_BLOCKED
USER_MUTED

## AI
AI_REQUEST_STARTED
AI_ACTION_EXECUTED
AI_RESULT_VALIDATED
AI_RESULT_REJECTED
AI_TASK_RETRY
AI_TASK_COMPLETED

## Worker
WORKER_REGISTERED
WORKER_HEARTBEAT
WORKER_LEASE_GRANTED
WORKER_REVOKED
WORKER_TASK_COMPLETED

## Observability

Les événements sécurité/audit et les événements produit ne doivent pas être confondus.


# CONTEXT/MEMORY EVENTS D100K
## Event types
context.fact.observed
context.fact.normalized
context.relation.created
context.correction.recorded
context.fact.superseded
context.fact.expired
context.fact.deleted
context.retrieval.performed

## Payload rule
Events use references and classified metadata. Exact addresses, sensitive attributes and private raw text are not placed into public/shared event payloads.
## Ordering
Fact mutation commits first; event is emitted after commit. Consumers must be idempotent using eventId/schemaVersion.

