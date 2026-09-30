# M02 — PLAYER

## Goal
Profiles, identity, preferences, progression summary and player-owned settings.

## Data
Profile, locale, preferences, avatar metadata, public stats and privacy settings. Private data remains scoped.

## UI
Profile page, edit profile, player card and contextual SYSTEM panel. Do not create permanent buttons for every statistic.

## MORISE
Uses explicit player preferences and permitted history to personalize recommendations. It must distinguish preference from fact.

## Security
Owner-only writes for private profile fields. Public profile reads follow visibility rules.

## Acceptance
Create/read/update profile, privacy checks, mobile layout, empty profile, invalid input and rollback of failed updates.
