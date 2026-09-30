# M11 — COMMUNITIES / GUILDS

Users can create their own groups. Community lifecycle: create → configure visibility → invite/request join → roles → feed/activity/events/games → moderate → leave/remove/archive.

Roles: owner, admin, moderator, member. Server-side authorization and RLS are mandatory.

AI Community Agent may detect sustained non-sensitive affinity, check whether a suitable community already exists, build a candidate proposal and present it through SYSTEM. Persistent group creation or membership changes require the explicit action required by policy.

Community intelligence includes summaries, translations, activity proposals, discovery and organization assistance. Private content and sensitive attributes cannot be used to expose or manufacture relationships.

## Detailed role matrix
OWNER: manage ownership/settings and transfer.
ADMIN: configure allowed settings and roles.
MODERATOR: local safety actions.
MEMBER: participate.
GUEST: read only when public.

## AI candidate rules
AI candidate is evidence-based, privacy filtered, non-sensitive, and expires if ignored. A candidate cannot repeatedly propose the same community beyond a cooldown.

## Community lifecycle edge cases
Owner leaves without transfer → policy-defined transfer/closure.
Private group changes to public → membership/history visibility migration is explicit.
AI proposal rejected → candidate is suppressed for a policy window.
