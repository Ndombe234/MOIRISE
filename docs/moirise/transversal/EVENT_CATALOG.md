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



# D100K — LEGACY EVENT DELIVERY CONTRACT RESTORATION

Business events that drive secondary processing must preserve request/event identity, actor, module, schema version, occurredAt and safe metadata. When transactionally required, authoritative persistence precedes delivery/consumption.

Retryable consumers are idempotent. An event delivery failure cannot silently roll back an already committed authoritative state. Rebuildable projections use immutable source events rather than mutable UI state.

Time-based events use UTC persistence and explicit occurrence identifiers when recurrence exists.


# D100K — RESTORED CROSS-MODULE EVENT CATALOG

The following historical event identifiers are retained as canonical logical event names where the corresponding capability exists. They do not create new modules or owners.

## Identity / Player
`auth.session.created`, `auth.session.expired`, `player.created`, `player.updated`, `player.role.granted`, `player.role.revoked`, `player.preferences.updated`, `player.device.updated`.

## Social / Messaging
`social.post.created`, `social.post.updated`, `social.post.deleted`, `social.message.sent`, `social.message.read`, `social.message.revoked`, `social.translation.requested`, `social.translation.completed`, `social.translation.failed`.

## World / Agents
`world.created`, `world.state.changed`, `world.object.changed`, `world.discovery.unlocked`, `world.agent.action.proposed`, `world.agent.action.validated`.

## SYSTEM / AI orchestration
`system.intent.created`, `system.plan.created`, `system.capability.selected`, `system.capability.fallback`.

## Play / Games
`play.session.created`, `play.action.accepted`, `play.action.rejected`, `play.session.completed`, `play.result.validated`, `game.discovery.requested`, `game.experience.selected`, `game.build.requested`, `game.build.completed`, `game.build.failed`, `game.validation.completed`, `game.session.created`, `game.action.accepted`, `game.result.created`.

## Communities / Events
`community.created`, `community.member.joined`, `community.member.left`, `community.role.changed`, `community.moderation.action`, `community.post.created`, `event.created`, `event.started`, `event.stage.started`, `event.participation.recorded`, `event.completed`.

## Adaptive / Economy
`adaptive.proposal.created`, `adaptive.proposal.accepted`, `adaptive.proposal.rejected`, `adaptive.world.changed`, `reward.issued`, `reward.rejected`, `ledger.credit.posted`, `ledger.debit.posted`, `creator.threshold.reached`.

## Media / Memory / Infrastructure
`memory.upload.requested`, `memory.upload.completed`, `memory.shared`, `memory.deleted`, `media.job.created`, `media.job.completed`, `media.job.failed`, `provider.health.changed`, `capability.state.changed`.

## AI Lab / Administration
`ai.learning.candidate.created`, `ai.experiment.started`, `ai.experiment.completed`, `ai.experiment.rejected`, `admin.configuration.changed`, `audit.event.created`.

Every emitted event must carry request/trace correlation, actor when applicable, owner module, schemaVersion, occurredAt and safe metadata. Event names are contracts; they do not authorize a consumer to mutate another owner's state.


# D100K — RESTORED EVENT PAYLOAD CONTRACTS

Selected payloads that were explicit in historical implementation contracts remain canonical logical shapes:
`PlayActionAcceptedPayload={sessionId,actionId,sequenceNo,actionType,stateVersionBefore,stateVersionAfter}`
`MessageSentPayload={messageId,conversationId,senderId,sourceLocale,hasAttachment}`
`MemorySharedPayload={memoryId,ownerId,targetType:'player'|'community',permission:'view'|'download',expiresAt?}`
`CapabilityStateChangedPayload={capabilityId,previous,next,reason,changedBy}`.

Payload fields are versioned when evolved. Sensitive/private fields are excluded unless the event's privacy contract explicitly allows them.

