# M03 — SOCIAL + PRIVATE MESSAGING

## Goal
Posts, reactions, comments, follows and one-to-one private messaging.

## Primary UX
Social feed remains simple. Private messages are accessible from profile, notification and message surfaces; they are not required to become a permanent seventh main button.

## Message model
Conversation, participant membership, message, attachment metadata, read state and delivery state. Server authorization is mandatory.

## MORISE
Can help draft, translate or summarize only when the user explicitly invokes the capability. Raw private conversations are not global learning data and are not sent to analytics by default.

## Events
`POST_CREATED`, `MESSAGE_SENT`, `MESSAGE_READ`, `REACTION_ADDED`, `COMMENT_CREATED`.

## Safety
Rate limiting, abuse reporting, blocking, visibility checks and moderation where required.

## Acceptance
Two users can message privately; unauthorized users cannot read; attachments fail safely; translation is optional; offline send shows pending state; duplicate sends are prevented with idempotency.
