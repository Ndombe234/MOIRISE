# M10 — SOCIAL GAMING — CONCEPTION TECHNIQUE APPROFONDIE

## 1. Boundary
M10 owns cross-over mechanics between Play and Social.

## 2. Challenge
Challenge = source result/rules + creator + recipient/cohort + expiry + validation policy.
No challenge can fabricate a score or opponent.

## 3. Async flow
Player A result → create challenge → recipient sees allowed projection → recipient starts own session → server validates → compare → event.

Both players need not be online simultaneously.

## 4. Rematch
Rematch copies ruleset/version but creates a new attempt/session and new idempotency key.

## 5. Community challenge
M11 owns community membership and moderation.
M10 owns challenge execution.
M05/M14 consume completion for progression/notifications.

## 6. Cohort leaderboards
Only real validated results.
Pagination and time windows.
Tie rules deterministic.
Private results stay private.

## 7. Living Object branch
A game branch can be created from an evolving Living Object; contributors are linked to versions. Publishing a branch requires permissions.

## 8. Convergence
Compatible independent game trajectories can produce an optional experiment. It should not automatically connect private users.

## 9. Abuse protection
Rate limits, duplicate prevention, block enforcement, false-result detection, challenge expiry and report hooks.

## 10. AI
AI selects eligible challenges and explains why.
It cannot invent an opponent or alter a result.

## 11. Tests
Create/accept challenge; expiry; duplicate; blocked user; privacy; result validation; rematch; community integration; mobile share flow.

## 12. DONE
Play creates natural shareable/async social loops without making friendship or simultaneous presence mandatory.

## 13. Challenge model
Challenge {sourceResultRef, rulesVersion, creatorId, targetRef/cohortRef, visibility, expiresAt}.
A challenge cannot expose source private data.

## 14. Comparison
Comparison is deterministic from validated results and rulesVersion.
Tie behavior is versioned.
No comparison uses client-reported score directly.

## 15. Community goals
M11 owns community membership.
M10 owns challenge progress.
M14/M05 consume validated completion for reward/progression.

## 16. Async fairness
No simultaneous session requirement.
Expired challenge cannot be completed.
Rematch uses new attempt and idempotency.

## 17. Acceptance
A shared result can become a challenge without exposing a private session, and a recipient can play asynchronously.
