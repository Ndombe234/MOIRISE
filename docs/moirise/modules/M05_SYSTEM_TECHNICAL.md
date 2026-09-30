# M05 — SYSTEM / PROGRESSION

## Goal
Provide the Solo-Leveling-inspired progression layer without turning the site into a spammy RPG UI.

## State
Level, XP, rank, achievements, quests, streaks and rewards use deterministic server-side rules.

## MORISE SYSTEM
Shows contextual panels/notifications such as quest unlocked, reward received or progression completed. It does not create permanent navigation clutter.

## Integrity
XP/reward calculations are deterministic and validated server-side. AI may recommend a quest but cannot directly grant arbitrary rewards.

## Acceptance
Progress updates are idempotent, impossible states are rejected, refresh preserves state, and notifications do not flood the interface.
